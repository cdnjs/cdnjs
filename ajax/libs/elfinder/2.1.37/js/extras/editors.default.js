(function(editors, elFinder) {
	if (typeof define === 'function' && define.amd) {
		define(['elfinder'], editors);
	} else if (elFinder) {
		var optEditors = elFinder.prototype._options.commandsOptions.edit.editors;
		elFinder.prototype._options.commandsOptions.edit.editors = optEditors.concat(editors(elFinder));
	}
}(function(elFinder) {
	"use strict";
	var apps = {},
		// get query of getfile
		getfile = window.location.search.match(/getfile=([a-z]+)/),
		useRequire = elFinder.prototype.hasRequire,
		hasFlash = (function() {
			var hasFlash;
			try {
				hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
			} catch (e) {
				hasFlash = !!(typeof window.orientation === 'undefined' || (navigator && navigator.mimeTypes["application/x-shockwave-flash"]));
			}
			return hasFlash;
		})(),
		initImgTag = function(id, file, content, fm) {
			var node = $(this).children('img:first'),
				spnr = $('<div/>')
					.css({
						position: 'absolute',
						top: '50%',
						textAlign: 'center',
						width: '100%',
						fontSize: '16pt'
					})
					.html(fm.i18n('ntfloadimg'))
					.hide()
					.appendTo(this);
			
			node.attr('id', id+'-img')
				.attr('src', content)
				.css({'height':'', 'max-width':'100%', 'max-height':'100%', 'cursor':'pointer'})
				.data('loading', function(done) {
					var btns = node.closest('.elfinder-dialog').find('button,.elfinder-titlebar-button');
					btns.prop('disabled', !done)[done? 'removeClass' : 'addClass']('ui-state-disabled');
					node.css('opacity', done? '' : '0.3');
					spnr[done? 'hide' : 'show']();
					return node;
				});
		},
		imgBase64 = function(node, mime) {
			var style = node.attr('style'),
				img, canvas, ctx, data;
			try {
				// reset css for getting image size
				node.attr('style', '');
				// img node
				img = node.get(0);
				// New Canvas
				canvas = document.createElement('canvas');
				canvas.width  = img.width;
				canvas.height = img.height;
				// restore css
				node.attr('style', style);
				// Draw Image
				canvas.getContext('2d').drawImage(img, 0, 0);
				// To Base64
				data = canvas.toDataURL(mime);
			} catch(e) {
				data = node.attr('src');
			}
			return data;
		},
		pixlrCallBack = function() {
			if (!hasFlash || window.parent === window) {
				return;
			}
			var pixlr = window.location.search.match(/[?&]pixlr=([^&]+)/),
				image = window.location.search.match(/[?&]image=([^&]+)/),
				p, ifm, url, node;
			if (pixlr) {
				// case of redirected from pixlr.com
				p = window.parent;
				ifm = p.$('#'+pixlr[1]+'iframe').hide();
				node = p.$('#'+pixlr[1]).data('resizeoff')();
				if (image[1].substr(0, 4) === 'http') {
					url = image[1];
					if (window.location.protocol === 'https:') {
						url = url.replace(/^http:/, 'https:');
					}
					node.on('load error', function() {
							node.data('loading')(true);
						})
						.attr('src', url)
						.data('loading')();
				} else {
					node.data('loading')(true);
				}
				ifm.remove();
			}
		},
		pixlrSetup = function(opts, fm) {
			if (!hasFlash || fm.UA.ltIE8) {
				this.disabled = true;
			}
		},
		pixlrLoad = function(mode, base) {
			var self = this,
				fm = this.fm,
				node = $(base).children('img:first')
					.data('loading')()
					.data('resizeoff', function() {
						$(window).off('resize.'+node.attr('id'));
						return node;
					})
					.on('click', function() {
						launch();
					}),
				elfNode = fm.getUI(),
				container = $('<iframe class="ui-front" allowtransparency="true">'),
				file = this.file,
				error = function(error) {
					container.remove();
					node.data('loading')(true);
					fm.error(error || 'Can not launch Pixlr.');
				},
				launch = function() {
					var src = 'https://pixlr.com/'+mode+'/?s=c',
						myurl = window.location.href.toString().replace(/#.*$/, ''),
						opts = {};

					errtm = setTimeout(error, 15000);
					myurl += (myurl.indexOf('?') === -1? '?' : '&') + 'pixlr='+node.attr('id');
					src += '&referrer=elFinder&locktitle=true';
					src += '&exit='+encodeURIComponent(myurl+'&image=0');
					src += '&target='+encodeURIComponent(myurl);
					src += '&title='+encodeURIComponent(file.name);
					src += '&locktype='+encodeURIComponent(file.mime === 'image/png'? 'png' : 'jpg');
					src += '&image='+encodeURIComponent(node.attr('src'));
					
					opts.src = src;
					opts.css = {
						width: '100%',
						height: $(window).height()+'px',
						position: 'fixed',
						display: 'block',
						backgroundColor: 'transparent',
						border: 'none',
						top: 0,
						right: 0
					};

					// trigger event 'editEditorPrepare'
					self.trigger('Prepare', {
						node: base,
						editorObj: void(0),
						instance: container,
						opts: opts
					});

					container
						.attr('id', node.attr('id')+'iframe')
						.attr('src', opts.src)
						.css(opts.css)
						.on('load', function() {
							errtm && clearTimeout(errtm);
							setTimeout(function() {
								if (container.is(':hidden')) {
									error('Please disable your ad blocker.');
								}
							}, 1000);
							fm.toFront(container);
						})
						.on('error', error)
						.appendTo(elfNode.hasClass('elfinder-fullscreen')? elfNode : 'body');
					// fit to window size
					$(window).on('resize.'+node.attr('id'), function() {
						container.css('height', $(window).height());
					});
				},
				errtm;
			launch();
		};
	
	// check callback from pixlr
	pixlrCallBack();
	
	// check getfile callback function
	if (getfile) {
		getfile = getfile[1];
		if (getfile === 'ckeditor') {
			elFinder.prototype._options.getFileCallback = function(file, fm) {
				window.opener.CKEDITOR.tools.callFunction((function() {
					var reParam = new RegExp('(?:[\?&]|&amp;)CKEditorFuncNum=([^&]+)', 'i'),
						match = window.location.search.match(reParam);
					return (match && match.length > 1) ? match[1] : '';
				})(), fm.convAbsUrl(file.url));
				fm.destroy();
				window.close();
			};
		} else if (getfile === 'tinymce') {
			elFinder.prototype._options.getFileCallback = function(file, fm) {
				// pass selected file data to TinyMCE
				parent.tinymce.activeEditor.windowManager.getParams().oninsert(file, fm);
				// close popup window
				parent.tinymce.activeEditor.windowManager.close();
			};
		}
	}
	
	// return editors Array
	return [
		{
			// Pixlr Editor
			info : {
				id : 'pixlreditor',
				name : 'Pixlr Editor',
				iconImg : 'img/edit_pixlreditor.png',
				urlAsContent: true,
				schemeContent: true,
				single: true
			},
			// MIME types to accept
			mimes : ['image/jpeg', 'image/png'],
			// HTML of this editor
			html : '<div style="width:100%;height:300px;max-height:100%;text-align:center;"><img/></div>',
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				pixlrSetup.call(this, opts, fm);
			},
			// Initialization of editing node (this: this editors HTML node)
			init : function(id, file, url, fm) {
				//initImgTag.call(this, id, file, fm.convAbsUrl(fm.openUrl(file.hash, true)), fm);
				initImgTag.call(this, id, file, fm.convAbsUrl(url), fm);
			},
			// Get data uri scheme (this: this editors HTML node)
			getContent : function() {
				return $(this).children('img:first').attr('src');
			},
			load : function(base) {
				pixlrLoad.call(this, 'editor', base);
			},
			save : function(base) {},
			close : function(base) {}
		},
		{
			// Pixlr Express
			info : {
				id: 'pixlrexpress',
				name : 'Pixlr Express',
				iconImg : 'img/edit_pixlrexpress.png',
				urlAsContent: true,
				schemeContent: true,
				single: true
			},
			// MIME types to accept
			mimes : ['image/jpeg'],
			// HTML of this editor
			html : '<div style="width:100%;height:300px;max-height:100%;text-align:center;"><img/></div>',
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				pixlrSetup.call(this, opts, fm);
			},
			// Initialization of editing node (this: this editors HTML node)
			init : function(id, file, url, fm) {
				initImgTag.call(this, id, file, fm.convAbsUrl(url), fm);
			},
			// Get data uri scheme (this: this editors HTML node)
			getContent : function() {
				return $(this).children('img:first').attr('src');
			},
			load : function(base) {
				pixlrLoad.call(this, 'express', base);
			},
			save : function(base) {},
			close : function(base) {}
		},
		{
			// Adobe Creative SDK Creative Tools Image Editor UI
			// MIME types to accept
			info : {
				id : 'creativecloud',
				name : 'Creative Cloud',
				iconImg : 'img/edit_creativecloud.png',
				schemeContent: true,
				single: true
			},
			mimes : ['image/jpeg', 'image/png'],
			// HTML of this editor
			html : '<div style="width:100%;height:300px;max-height:100%;text-align:center;"><img/></div>',
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				if (fm.UA.ltIE8 || !opts.extraOptions || !opts.extraOptions.creativeCloudApiKey) {
					this.disabled = true;
				} else {
					this.apiKey = opts.extraOptions.creativeCloudApiKey;
				}
			},
			// Initialization of editing node (this: this editors HTML node)
			init : function(id, file, content, fm) {
				initImgTag.call(this, id, file, content, fm);
			},
			// Get data uri scheme (this: this editors HTML node)
			getContent : function() {
				return $(this).children('img:first').attr('src');
			},
			// Launch Aviary Feather editor when dialog open
			load : function(base) {
				var self = this,
					fm = this.fm,
					node = $(base).children('img:first'),
					elfNode = fm.getUI(),
					dfrd = $.Deferred(),
					container = $('#elfinder-aviary-container'),
					init = function(onload) {
						var getLang = function() {
								var langMap = {
									'zh_TW' : 'zh_HANT',
									'zh_CN' : 'zh_HANS'
								};
								return langMap[fm.lang]? langMap[fm.lang] : fm.lang;
							}, opts;
							
						if (!container.length) {
							container = $('<div id="elfinder-aviary-container" class="ui-front"/>').css({
								position: 'fixed',
								top: 0,
								right: 0,
								width: '100%',
								height: $(window).height(),
								overflow: 'auto'
							}).hide().appendTo(elfNode.hasClass('elfinder-fullscreen')? elfNode : 'body');
							// fit to window size
							$(window).on('resize.'+fm.namespace, function() {
								container.css('height', $(window).height());
							});
							// bind switch fullscreen event
							elfNode.on('resize.'+fm.namespace, function(e, data) {
								e.preventDefault();
								e.stopPropagation();
								data && data.fullscreen && container.appendTo(data.fullscreen === 'on'? elfNode : 'body');
							});
							fm.bind('destroy', function() {
								container.remove();
							});
						} else {
							// always moves to last
							container.appendTo(container.parent());
						}
						node.on('click', launch).data('loading')();
						opts = {
							apiKey: self.confObj.apiKey,
							onSave: function(imageID, newURL) {
								featherEditor.showWaitIndicator();
								node.on('load error', function() {
										node.data('loading')(true);
									})
									.attr('crossorigin', 'anonymous')
									.attr('src', newURL)
									.data('loading')();
								featherEditor.close();
							},
							onLoad: onload || function(){},
							onClose: function() { $(container).hide(); },
							appendTo: container.get(0),
							maxSize: 2048,
							language: getLang()
						};
						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: base,
							editorObj: Aviary,
							instance: void(0),
							opts: opts
						});
						featherEditor = new Aviary.Feather(opts);
						container.css('z-index', $(base).closest('.elfinder-dialog').css('z-index'));
						// return editor instance
						dfrd.resolve(featherEditor);
					},
					launch = function() {
						$(container).show();
						featherEditor.launch({
							image: node.attr('id'),
							url: node.attr('src')
						});
						node.data('loading')(true);
					},
					featherEditor, extraOpts;
				
				// load script then init
				if (typeof Aviary === 'undefined') {
					fm.loadScript(['https://dme0ih8comzn4.cloudfront.net/imaging/v3/editor.js'], function() {
						init(launch);
					}, {loadType: 'tag'});
				} else {
					init();
					launch();
				}
				return dfrd;
			},
			// Convert content url to data uri scheme to save content
			save : function(base) {
				var node = $(base).children('img:first');
				if (node.attr('src').substr(0, 5) !== 'data:') {
					node.attr('src', imgBase64(node, this.file.mime));
				}
			}
		},
		{
			// ACE Editor
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				if (fm.UA.ltIE8 || !fm.options.cdns.ace) {
					this.disabled = true;
				}
			},
			// `mimes` is not set for support everything kind of text file
			info : {
				id : 'aceeditor',
				name : 'ACE Editor',
				iconImg : 'img/edit_aceeditor.png'
			},
			load : function(textarea) {
				var self = this,
					fm   = this.fm,
					dfrd = $.Deferred(),
					cdn  = fm.options.cdns.ace,
					start = function() {
						var editor, editorBase, mode,
						ta = $(textarea),
						taBase = ta.parent(),
						dialog = taBase.parent(),
						id = textarea.id + '_ace',
						ext = self.file.name.replace(/^.+\.([^.]+)|(.+)$/, '$1$2').toLowerCase(),
						// MIME/mode map
						mimeMode = {
							'text/x-php'			  : 'php',
							'application/x-php'		  : 'php',
							'text/html'				  : 'html',
							'application/xhtml+xml'	  : 'html',
							'text/javascript'		  : 'javascript',
							'application/javascript'  : 'javascript',
							'text/css'				  : 'css',
							'text/x-c'				  : 'c_cpp',
							'text/x-csrc'			  : 'c_cpp',
							'text/x-chdr'			  : 'c_cpp',
							'text/x-c++'			  : 'c_cpp',
							'text/x-c++src'			  : 'c_cpp',
							'text/x-c++hdr'			  : 'c_cpp',
							'text/x-shellscript'	  : 'sh',
							'application/x-csh'		  : 'sh',
							'text/x-python'			  : 'python',
							'text/x-java'			  : 'java',
							'text/x-java-source'	  : 'java',
							'text/x-ruby'			  : 'ruby',
							'text/x-perl'			  : 'perl',
							'application/x-perl'	  : 'perl',
							'text/x-sql'			  : 'sql',
							'text/xml'				  : 'xml',
							'application/docbook+xml' : 'xml',
							'application/xml'		  : 'xml'
						};

						// set base height
						taBase.height(taBase.height());

						// set basePath of ace
						ace.config.set('basePath', cdn);

						// Base node of Ace editor
						editorBase = $('<div id="'+id+'" style="width:100%; height:100%;"/>').text(ta.val()).insertBefore(ta.hide());

						// Editor flag
						ta.data('ace', true);

						// Aceeditor instance
						editor = ace.edit(id);

						// Ace editor configure
						editor.$blockScrolling = Infinity;
						editor.setOptions({
							theme: 'ace/theme/monokai',
							fontSize: '14px',
							wrap: true,
						});
						ace.config.loadModule('ace/ext/modelist', function() {
							// detect mode
							mode = ace.require('ace/ext/modelist').getModeForPath('/' + self.file.name).name;
							if (mode === 'text') {
								if (mimeMode[self.file.mime]) {
									mode = mimeMode[self.file.mime];
								}
							}
							// show MIME:mode in title bar
							taBase.prev().children('.elfinder-dialog-title').append(' (' + self.file.mime + ' : ' + mode.split(/[\/\\]/).pop() + ')');
							editor.setOptions({
								mode: 'ace/mode/' + mode
							});
						});
						ace.config.loadModule('ace/ext/language_tools', function() {
							ace.require('ace/ext/language_tools');
							editor.setOptions({
								enableBasicAutocompletion: true,
								enableSnippets: true,
								enableLiveAutocompletion: false
							});
						});
						ace.config.loadModule('ace/ext/settings_menu', function() {
							ace.require('ace/ext/settings_menu').init(editor);
						});
						
						// Short cuts
						editor.commands.addCommand({
							name : "saveFile",
							bindKey: {
								win : 'Ctrl-s',
								mac : 'Command-s'
							},
							exec: function(editor) {
								self.doSave();
							}
						});
						editor.commands.addCommand({
							name : "closeEditor",
							bindKey: {
								win : 'Ctrl-w|Ctrl-q',
								mac : 'Command-w|Command-q'
							},
							exec: function(editor) {
								self.doCancel();
							}
						});

						editor.resize();

						// TextArea button and Setting button
						$('<div class="ui-dialog-buttonset"/>').css('float', 'left')
						.append(
							$('<button/>').html(self.fm.i18n('TextArea'))
							.button()
							.on('click', function(){
								if (ta.data('ace')) {
									ta.removeData('ace');
									editorBase.hide();
									ta.val(editor.session.getValue()).show().trigger('focus');
									$(this).text('AceEditor');
								} else {
									ta.data('ace', true);
									editorBase.show();
									editor.setValue(ta.hide().val(), -1);
									editor.focus();
									$(this).html(self.fm.i18n('TextArea'));
								}
							})
						)
						.append(
							$('<button>Ace editor setting</button>')
							.button({
								icons: {
									primary: 'ui-icon-gear',
									secondary: 'ui-icon-triangle-1-e'
								},
								text: false
							})
							.on('click', function(){
								editor.showSettingsMenu();
								$('#ace_settingsmenu')
									.css('font-size', '80%')
									.find('div[contains="setOptions"]').hide().end()
									.parent().parent().appendTo($('#elfinder'));
							})
						)
						.prependTo(taBase.next());

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: textarea,
							editorObj: ace,
							instance: editor,
							opts: {}
						});
						
						dfrd.resolve(editor);
					};

				// check ace & start
				if (!self.confObj.loader) {
					self.confObj.loader = $.Deferred();
					self.fm.loadScript([ cdn+'/ace.js' ], function() {
						self.confObj.loader.resolve();
					}, void 0, {obj: window, name: 'ace'});
				}
				self.confObj.loader.done(start);

				return dfrd;
			},
			close : function(textarea, instance) {
				instance && instance.destroy();
			},
			save : function(textarea, instance) {
				instance && $(textarea).data('ace') && (textarea.value = instance.session.getValue());
			},
			focus : function(textarea, instance) {
				instance && $(textarea).data('ace') && instance.focus();
			},
			resize : function(textarea, instance, e, data) {
				instance && instance.resize();
			}
		},
		{
			// CodeMirror
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				if (fm.UA.ltIE10 || !fm.options.cdns.codemirror) {
					this.disabled = true;
				}
			},
			// `mimes` is not set for support everything kind of text file
			info : {
				id : 'codemirror',
				name : 'CodeMirror',
				iconImg : 'img/edit_codemirror.png'
			},
			load : function(textarea) {
				var fm = this.fm,
					cmUrl = fm.options.cdns.codemirror,
					dfrd = $.Deferred(),
					self = this,
					start = function(CodeMirror) {
						var ta   = $(textarea),
							base = ta.parent(),
							editor, editorBase, opts;
						
						// set base height
						base.height(base.height());
						
						// CodeMirror configure options
						opts = {
							lineNumbers: true,
							lineWrapping: true,
							extraKeys : {
								'Ctrl-S': function() { self.doSave(); },
								'Ctrl-Q': function() { self.doCancel(); },
								'Ctrl-W': function() { self.doCancel(); }
							}
						};

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: textarea,
							editorObj: CodeMirror,
							instance: void(0),
							opts: opts
						});

						// CodeMirror configure
						editor = CodeMirror.fromTextArea(textarea, opts);
						
						// return editor instance
						dfrd.resolve(editor);
						
						// Auto mode set
						var info, m, mode, spec;
						if (! info) {
							info = CodeMirror.findModeByMIME(self.file.mime);
						}
						if (! info && (m = self.file.name.match(/.+\.([^.]+)$/))) {
							info = CodeMirror.findModeByExtension(m[1]);
						}
						if (info) {
							CodeMirror.modeURL = useRequire? 'codemirror/mode/%N/%N.min' : cmUrl + '/mode/%N/%N.min.js';
							mode = info.mode;
							spec = info.mime;
							editor.setOption('mode', spec);
							CodeMirror.autoLoadMode(editor, mode);
							// show MIME:mode in title bar
							base.prev().children('.elfinder-dialog-title').append(' (' + spec + ' : ' + mode + ')');
						}
						
						// editor base node
						editorBase = $(editor.getWrapperElement()).css({
							// fix CSS conflict to SimpleMDE
							padding: 0,
							border: 'none'
						});
						ta.data('cm', true);
						
						// fit height to base
						editorBase.height('100%');
						
						// TextArea button and Setting button
						$('<div class="ui-dialog-buttonset"/>').css('float', 'left')
						.append(
							$('<button/>').html(self.fm.i18n('TextArea'))
							.button()
							.on('click', function(){
								if (ta.data('cm')) {
									ta.removeData('cm');
									editorBase.hide();
									ta.val(editor.getValue()).show().trigger('focus');
									$(this).text('CodeMirror');
								} else {
									ta.data('cm', true);
									editorBase.show();
									editor.setValue(ta.hide().val());
									editor.refresh();
									editor.focus();
									$(this).html(self.fm.i18n('TextArea'));
								}
							})
						)
						.prependTo(base.next());
					};
				// load script then start
				if (!self.confObj.loader) {
					self.confObj.loader = $.Deferred();
					if (useRequire) {
						require.config({
							packages: [{
								name: 'codemirror',
								location: cmUrl,
								main: 'codemirror.min'
							}],
							map: {
								'codemirror': {
									'codemirror/lib/codemirror': 'codemirror'
								}
							}
						});
						require([
							'codemirror',
							'codemirror/addon/mode/loadmode.min',
							'codemirror/mode/meta.min'
						], function(CodeMirror) {
							self.confObj.loader.resolve(CodeMirror);
						});
					} else {
						self.fm.loadScript([
							cmUrl + '/codemirror.min.js'
						], function() {
							self.fm.loadScript([
								cmUrl + '/addon/mode/loadmode.min.js',
								cmUrl + '/mode/meta.min.js'
							], function() {
								self.confObj.loader.resolve(CodeMirror);
							});
						}, {loadType: 'tag'});
					}
					self.fm.loadCss(cmUrl + '/codemirror.css');
				}
				self.confObj.loader.done(start);
				return dfrd;
			},
			close : function(textarea, instance) {
				instance && instance.toTextArea();
			},
			save : function(textarea, instance) {
				instance && $(textarea).data('cm') && (textarea.value = instance.getValue());
			},
			focus : function(textarea, instance) {
				instance && $(textarea).data('cm') && instance.focus();
			},
			resize : function(textarea, instance, e, data) {
				instance && instance.refresh();
			}
		},
		{
			// SimpleMDE
			// called on initialization of elFinder cmd edit (this: this editor's config object)
			setup : function(opts, fm) {
				if (fm.UA.ltIE10 || !fm.options.cdns.simplemde) {
					this.disabled = true;
				}
			},
			info : {
				id : 'simplemde',
				name : 'SimpleMDE',
				iconImg : 'img/edit_simplemde.png'
			},
			exts  : ['md'],
			load : function(textarea) {
				var self = this,
					fm   = this.fm,
					base = $(textarea).parent(),
					dfrd = $.Deferred(),
					cdn  = fm.options.cdns.simplemde,
					start = function(SimpleMDE) {
						var h	 = base.height(),
							delta = base.outerHeight(true) - h + 14,
							editor, editorBase, opts;
						
						// fit height function
						textarea._setHeight = function(height) {
							var h	= height || base.height(),
								ctrH = 0,
								areaH;
							base.children('.editor-toolbar,.editor-statusbar').each(function() {
								ctrH += $(this).outerHeight(true);
							});
							areaH = h - ctrH - delta;
							editorBase.height(areaH);
							editor.codemirror.refresh();
							return areaH;
						};
						
						// set base height
						base.height(h);
						
						opts = {
							element: textarea,
							autofocus: true
						};

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: textarea,
							editorObj: SimpleMDE,
							instance: void(0),
							opts: opts
						});

						// make editor
						editor = new SimpleMDE(opts);
						dfrd.resolve(editor);
						
						// editor base node
						editorBase = $(editor.codemirror.getWrapperElement());
						
						// fit height to base
						editorBase.css('min-height', '50px')
							.children('.CodeMirror-scroll').css('min-height', '50px');
						textarea._setHeight(h);
					};

				// check SimpleMDE & start
				if (!self.confObj.loader) {
					self.confObj.loader = $.Deferred();
					self.fm.loadCss(cdn+'/simplemde.min.css');
					if (useRequire) {
						require([
							cdn+'/simplemde.min.js'
						], function(SimpleMDE) {
							self.confObj.loader.resolve(SimpleMDE);
						});
					} else {
						self.fm.loadScript([cdn+'/simplemde.min.js'], function() {
							self.confObj.loader.resolve(SimpleMDE);
						}, {loadType: 'tag'});
					}
				}
				self.confObj.loader.done(start);

				return dfrd;
			},
			close : function(textarea, instance) {
				instance && instance.toTextArea();
				instance = null;
			},
			save : function(textarea, instance) {
				instance && (textarea.value = instance.value());
			},
			focus : function(textarea, instance) {
				instance && instance.codemirror.focus();
			},
			resize : function(textarea, instance, e, data) {
				instance && textarea._setHeight();
			}
		},
		{
			// CKEditor for html file
			info : {
				id : 'ckeditor',
				name : 'CKEditor',
				iconImg : 'img/edit_ckeditor.png'
			},
			exts  : ['htm', 'html', 'xhtml'],
			setup : function(opts, fm) {
				if (!fm.options.cdns.ckeditor) {
					this.disabled = true;
				} else {
					if (opts.extraOptions && opts.extraOptions.managerUrl) {
						this.managerUrl = opts.extraOptions.managerUrl;
					}
				}
			},
			load : function(textarea) {
				var self = this,
					fm   = this.fm,
					dfrd = $.Deferred(),
					init = function() {
						var base = $(textarea).parent(),
							dlg = base.closest('.elfinder-dialog'),
							h = base.height(),
							reg = /([&?]getfile=)[^&]+/,
							loc = self.confObj.managerUrl || window.location.href.replace(/#.*$/, ''),
							name = 'ckeditor',
							opts;
						
						// make manager location
						if (reg.test(loc)) {
							loc = loc.replace(reg, '$1' + name);
						} else {
							loc += '?getfile=' + name;
						}
						// set base height
						base.height(h);

						// CKEditor configure options
						opts = {
							startupFocus : true,
							fullPage: true,
							allowedContent: true,
							filebrowserBrowseUrl : loc,
							toolbarCanCollapse: true,
							toolbarStartupExpanded: !fm.UA.Mobile,
							removePlugins: 'resize',
							extraPlugins: 'colorbutton,justify,docprops',
							on: {
								'instanceReady' : function(e) {
									var editor = e.editor;
									editor.resize('100%', h);
									// re-build on dom move
									dlg.one('beforedommove.'+fm.namespace, function() {
										editor.destroy();
									}).one('dommove.'+fm.namespace, function() {
										self.load(textarea).done(function(editor) {
											self.instance = editor;
										});
									});
									// return editor instance
									dfrd.resolve(e.editor);
								}
							}
						};

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: textarea,
							editorObj: CKEDITOR,
							instance: void(0),
							opts: opts
						});

						// CKEditor configure
						CKEDITOR.replace(textarea.id, opts);
						CKEDITOR.on('dialogDefinition', function(e) {
							var dlg = e.data.definition.dialog;
							dlg.on('show', function(e) {
								fm.getUI().append($('.cke_dialog_background_cover')).append(this.getElement().$);
							});
							dlg.on('hide', function(e) {
								$('body:first').append($('.cke_dialog_background_cover')).append(this.getElement().$);
							});
						});
					};

				if (!self.confObj.loader) {
					self.confObj.loader = $.Deferred();
					window.CKEDITOR_BASEPATH = fm.options.cdns.ckeditor + '/';
					$.getScript(fm.options.cdns.ckeditor + '/ckeditor.js', function() {
						self.confObj.loader.resolve();
					});
				}
				self.confObj.loader.done(init);
				return dfrd;
			},
			close : function(textarea, instance) {
				instance && instance.destroy();
			},
			save : function(textarea, instance) {
				instance && (textarea.value = instance.getData());
			},
			focus : function(textarea, instance) {
				instance && instance.focus();
			},
			resize : function(textarea, instance, e, data) {
				var self;
				if (instance) {
					if (instance.status === 'ready') {
						instance.resize('100%', $(textarea).parent().height());
					}
				}
			}
		},
		{
			// CKEditor5 balloon mode for html file
			info : {
				id : 'ckeditor5',
				name : 'CKEditor5',
				iconImg : 'img/edit_ckeditor5.png'
			},
			exts : ['htm', 'html', 'xhtml'],
			html : '<div class="edit-editor-ckeditor5"></div>',
			setup : function(opts, fm) {
				var confObj = this;
				// check cdn and ES6 support
				if (!fm.options.cdns.ckeditor5 || typeof window.Symbol !== 'function' || typeof Symbol() !== 'symbol') {
					this.disabled = true;
				} else {
					if (opts.extraOptions && opts.extraOptions.ckeditor5Mode) {
						this.ckeditor5Mode = opts.extraOptions.ckeditor5Mode;
					}
				}
				fm.bind('destroy', function() {
					confObj.editor = null;
				});
			},
			// Prepare on before show dialog
			prepare : function(base, dialogOpts, file) {
				$(base).height(base.editor.fm.getUI().height() - 100);
			},
			init : function(id, file, data, fm) {
				var m = data.match(/^([\s\S]*<body[^>]*>)([\s\S]+)(<\/body>[\s\S]*)$/i),
					header = '',
					body = '',
					footer ='';
				this.css({
					width: '100%',
					height: '100%',
					'box-sizing': 'border-box'
				});
				if (m) {
					header = m[1];
					body = m[2];
					footer = m[3];
				} else {
					body = data;
				}
				this.data('data', {
					header: header,
					body: body,
					footer: footer
				});
			},
			load : function(editnode) {
				var self = this,
					fm   = this.fm,
					dfrd = $.Deferred(),
					mode = self.confObj.ckeditor5Mode || 'balloon',
					lang = (function() {
						var l = fm.lang.toLowerCase().replace('_', '-');
						if (l.substr(0, 2) === 'zh' && l !== 'zh-cn') {
							l = 'zh';
						}
						return l;
					})(),
					init = function(cEditor) {
						var base = $(editnode).parent(),
							opts;
						
						// set base height
						base.height(fm.getUI().height() - 100);

						// CKEditor5 configure options
						opts = {
							toolbar: ['heading', '|', 'bold', 'italic', 'link', 'imageUpload', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
							language: lang
						};

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: editnode,
							editorObj: cEditor,
							instance: void(0),
							opts: opts
						});

						cEditor
							.create(editnode, opts)
							.then(function(editor) {
								var fileRepo = editor.plugins.get('FileRepository');
								fileRepo.createUploadAdapter = function(loader) {
									return new uploder(loader);
								};
								editor.setData($(editnode).data('data').body);
								// move .ck-body to elFinder node for fullscreen mode
								fm.getUI().append($('body > div.ck-body'));
								$('div.ck-balloon-panel').css({
									'z-index': fm.getMaximizeCss().zIndex + 1
								});
								dfrd.resolve(editor);
								/*fm.log({
									plugins: cEditor.build.plugins.map(function(p) { return p.pluginName; }),
									toolbars: Array.from(editor.ui.componentFactory.names())
								});*/
							})
							['catch'](function(error) { // ['cache'] instead .cache for fix error on ie8 
								fm.error(error);
							});
					},
					uploder = function(loader) {
						this.upload = function() {
							return new Promise(function(resolve, reject) {
								fm.exec('upload', {files: [loader.file]})
									.done(function(data){
										if (data.added && data.added.length) {
											fm.url(data.added[0].hash, { async: true }).done(function(url) {
												resolve({
													'default': fm.convAbsUrl(url)
												});
											}).fail(function() {
												reject('errFileNotFound');
											});
										} else {
											reject(fm.i18n(data.error? data.error : 'errUpload'));
										}
									})
									.fail(function(error) {
										reject(fm.i18n(error? (error === 'userabort'? 'errAbort' : error) : 'errUploadNoFiles'));
									})
									.progress(function(data) {
										loader.uploadTotal = data.total;
										loader.uploaded = data.progress;
									});
							});
						};
						this.abort = function() {
							fm.getUI().trigger('uploadabort');
						};
					}, loader;

				if (!self.confObj.editor) {
					loader = $.Deferred();
					self.fm.loadScript([
						//fm.options.cdns.ckeditor5 + '/' + mode + '/ckeditor.js'
						// uses "t/ckeditor5/914" until next release
						fm.options.cdns.ckeditor5 + mode + '/5c757fcc3e924454bf5f65c806f4a159aaafd293/build/ckeditor.js'
					], function(editor) {
						if (!editor) {
							editor = window.BalloonEditor || window.InlineEditor || window.ClassicEditor;
						}
						if (fm.lang !== 'en') {
							self.fm.loadScript([
								//fm.options.cdns.ckeditor5 + '/' + mode + '/translations/' + lang + '.js'
								// uses "t/ckeditor5/914" until next release
								fm.options.cdns.ckeditor5 + mode + '/5c757fcc3e924454bf5f65c806f4a159aaafd293/build/translations/' + lang + '.js'
							], function(obj) {
								loader.resolve(editor);
							}, {
								tryRequire: true,
								loadType: 'tag',
								error: function(obj) {
									lang = 'en';
									loader.resolve(editor);
								}
							});
						} else {
							loader.resolve(editor);
						}
					}, {
						tryRequire: true,
						loadType: 'tag'
					});
					loader.done(function(editor) {
						self.confObj.editor = editor;
						init(editor);
					});
				} else {
					init(self.confObj.editor);
				}
				return dfrd;
			},
			getContent : function() {
				var data = $(this).data('data');
				return data.header + data.body + data.footer;
			},
			close : function(editnode, instance) {
				instance && instance.destroy();
			},
			save : function(editnode, instance) {
				var elm = $(editnode),
					data = elm.data('data');
				if (instance) {
					data.body = instance.getData();
					elm.data('data', data);
				}
			},
			focus : function(editnode, instance) {
				$(editnode).trigger('focus');
			}
		},
		{
			// TinyMCE for html file
			info : {
				id : 'tinymce',
				name : 'TinyMCE',
				iconImg : 'img/edit_tinymce.png'
			},
			exts  : ['htm', 'html', 'xhtml'],
			setup : function(opts, fm) {
				if (!fm.options.cdns.tinymce) {
					this.disabled = true;
				} else {
					if (opts.extraOptions && opts.extraOptions.managerUrl) {
						this.managerUrl = opts.extraOptions.managerUrl;
					}
				}
			},
			load : function(textarea) {
				var self = this,
					fm   = this.fm,
					dfrd = $.Deferred(),
					init = function() {
						var base = $(textarea).parent(),
							dlg = base.closest('.elfinder-dialog'),
							h = base.height(),
							delta = base.outerHeight(true) - h,
							opts;

						// set base height
						base.height(h);
						// fit height function
						textarea._setHeight = function(height) {
							var base = $(this).parent(),
								h	= height || base.height(),
								ctrH = 0,
								areaH;
							base.find('.mce-container-body:first').children('.mce-toolbar,.mce-toolbar-grp,.mce-statusbar').each(function() {
								ctrH += $(this).outerHeight(true);
							});
							areaH = h - ctrH - delta;
							base.find('.mce-edit-area iframe:first').height(areaH);
							return areaH;
						};

						// TinyMCE configure options
						opts = {
							selector: '#' + textarea.id,
							resize: false,
							plugins: [
								'fullpage', // require for getting full HTML
								'image', 'link', 'media',
								'code', 'fullscreen'
							],
							init_instance_callback : function(editor) {
								// fit height on init
								textarea._setHeight(h);
								// re-build on dom move
								dlg.one('beforedommove.'+fm.namespace, function() {
									tinymce.execCommand('mceRemoveEditor', false, textarea.id);
								}).one('dommove.'+fm.namespace, function() {
									self.load(textarea).done(function(editor) {
										self.instance = editor;
									});
								});
								// return editor instance
								dfrd.resolve(editor);
							},
							file_picker_callback : function (callback, value, meta) {
								var reg = /([&?]getfile=)[^&]+/,
									loc = self.confObj.managerUrl || window.location.href.replace(/#.*$/, ''),
									name = 'tinymce';
								
								// make manager location
								if (reg.test(loc)) {
									loc = loc.replace(reg, '$1' + name);
								} else {
									loc += '?getfile=' + name;
								}
								// launch TinyMCE
								tinymce.activeEditor.windowManager.open({
									file: loc,
									title: 'elFinder',
									width: 900,	 
									height: 450,
									resizable: 'yes'
								}, {
									oninsert: function (file, elf) {
										var url, reg, info;

										// URL normalization
										url = elf.convAbsUrl(file.url);
										
										// Make file info
										info = file.name + ' (' + elf.formatSize(file.size) + ')';

										// Provide file and text for the link dialog
										if (meta.filetype == 'file') {
											callback(url, {text: info, title: info});
										}

										// Provide image and alt text for the image dialog
										if (meta.filetype == 'image') {
											callback(url, {alt: info});
										}

										// Provide alternative source and posted for the media dialog
										if (meta.filetype == 'media') {
											callback(url);
										}
									}
								});
								return false;
							}
						};

						// trigger event 'editEditorPrepare'
						self.trigger('Prepare', {
							node: textarea,
							editorObj: tinymce,
							instance: void(0),
							opts: opts
						});

						// TinyMCE configure
						tinymce.init(opts);
					};
				
 				// impossible launch TineMCE in native fullscreen mode
 				fm.getUI().hasClass('elfinder-fullscreen-native') && fm.exec('fullscreen');
				
				if (!self.confObj.loader) {
					self.confObj.loader = $.Deferred();
					$.getScript(fm.options.cdns.tinymce + '/tinymce.min.js', function() {
						setTimeout(function() {
							self.confObj.loader.resolve();
						}, 0);
					});
				}
				self.confObj.loader.done(init);
				return dfrd;
			},
			close : function(textarea, instance) {
				instance && tinymce.execCommand('mceRemoveEditor', false, textarea.id);
			},
			save : function(textarea, instance) {
				instance && instance.save();
			},
			focus : function(textarea, instance) {
				instance && instance.focus();
			},
			resize : function(textarea, instance, e, data) {
				// fit height to base node on dialog resize
				instance && textarea._setHeight();
			}
		},
		{
			info : {
				id : 'zohoeditor',
				name : 'Zoho Editor',
				iconImg : 'img/edit_zohooffice.png',
				cmdCheck : 'ZohoOffice',
				preventGet: true,
				hideButtons: true
			},
			mimes : [
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				//'application/pdf',
				'application/vnd.oasis.opendocument.text',
				'application/rtf',
				'text/html',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'application/vnd.oasis.opendocument.spreadsheet',
				'application/vnd.sun.xml.calc',
				'text/csv',
				'text/tab-separated-values',
				'application/vnd.ms-powerpoint',
				'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
				'application/vnd.oasis.opendocument.presentation',
				'application/vnd.sun.xml.impress'
			],
			html : '<iframe style="width:100%;max-height:100%;border:none;"></iframe>',
			// setup on elFinder bootup
			setup : function(opts, fm) {
				if (fm.UA.Mobile || fm.UA.ltIE8) {
					this.disabled = true;
				}
			},
			// Prepare on before show dialog
			prepare : function(base, dialogOpts, file) {
				var elfNode = base.editor.fm.getUI();
				$(base).height(elfNode.height());
				dialogOpts.width = Math.max(dialogOpts.width || 0, elfNode.width() * 0.8);
			},
			// Initialization of editing node (this: this editors HTML node)
			init : function(id, file, dum, fm) {
				var ta = this,
					ifm = $(this).hide(),
					spnr = $('<div/>')
						.css({
							position: 'absolute',
							top: '50%',
							textAlign: 'center',
							width: '100%',
							fontSize: '16pt'
						})
						.html(fm.i18n('nowLoading') + '<span class="elfinder-spinner"/>')
						.appendTo(ifm.parent()),
					cdata = function() {
						var data = '';
						$.each(fm.customData, function(key, val) {
							data += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
						});
						return data;
					};
				
				$(ta).data('xhr', fm.request({
					data: {
						cmd: 'editor',
						name: 'ZohoOffice',
						method: 'init',
						'args[target]': file.hash,
						'args[lang]' : fm.lang,
						'args[cdata]' : cdata
					},
					preventDefault : true
				}).done(function(data) {
					var opts;
					if (data.zohourl) {
						opts = {
							css: {
								height: '100%'
							}
						};
						// trigger event 'editEditorPrepare'
						ta.editor.trigger('Prepare', {
							node: ta,
							editorObj: void(0),
							instance: ifm,
							opts: opts
						});

						ifm.attr('src', data.zohourl).show().css(opts.css);
					} else {
						data.error && fm.error(data.error);
						ta.elfinderdialog('destroy');
					}
				}).fail(function(error) {
					error && fm.error(error);
					ta.elfinderdialog('destroy');
				}).always(function() {
					spnr.remove();
				}));
			},
			load : function() {},
			getContent : function() {},
			save : function() {},
			// Before dialog close
			beforeclose : function(base) {
				var dfd = $.Deferred(),
					ab = 'about:blank';
				base.src = ab;
				setTimeout(function() {
					var src;
					try {
						src = base.contentWindow.location.href;
					} catch(e) {
						src = null;
					}
					if (src === ab) {
						dfd.resolve();
					} else {
						dfd.reject();
					}
				}, 10);
				return dfd;
			},
			// On dialog closed
			close : function(ta) {
				var fm = this.fm,
					xhr = $(ta).data('xhr');
				if (xhr.state() === 'pending') {
					xhr.reject();
				} else {
					fm.sync(fm.cwd().hash);
				}
			}
		},
		{
			// Zip Archive with FlySystem
			info : {
				id : 'ziparchive',
				name : 'btnMount',
				cmdCheck : 'ZipArchive',
				edit : function(file, editor) {
					var fm = this,
						dfrd = $.Deferred();
					fm.request({
						data:{
							cmd: 'netmount',
							protocol: 'ziparchive',
							host: file.hash,
							path: file.phash
						},
						notify : {type : 'netmount', cnt : 1, hideCnt : true}
					}).done(function(data) {
						var pdir;
						if (data.added && data.added.length) {
							if (data.added[0].phash) {
								if (pdir = fm.file(data.added[0].phash)) {
									if (! pdir.dirs) {
										pdir.dirs = 1;
										fm.change({ changed: [ pdir ] });
									}
								}
							}
							fm.one('netmountdone', function() {
								fm.exec('open', data.added[0].hash);
								fm.one('opendone', function() {
									data.toast && fm.toast(data.toast);
								});
							});
						}
						dfrd.resolve();
					})
					.fail(function(error) {
						dfrd.reject(error);
					});
					return dfrd;
				}
			},
			mimes : ['application/zip'],
			load : function() {},
			save : function(){}
		},
		{
			// Simple Text (basic textarea editor)
			info : {
				id : 'textarea',
				name : 'TextArea',
				useTextAreaEvent : true
			},
			load : function(textarea) {
				// trigger event 'editEditorPrepare'
				this.trigger('Prepare', {
					node: textarea,
					editorObj: void(0),
					instance: void(0),
					opts: {}
				});
			},
			save : function(){}
		}
	];
}, window.elFinder));
