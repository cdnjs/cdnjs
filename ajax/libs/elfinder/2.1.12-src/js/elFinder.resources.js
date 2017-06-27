"use strict"
/**
 * elFinder resources registry.
 * Store shared data
 *
 * @type Object
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.resources = {
	'class' : {
		hover       : 'ui-state-hover',
		active      : 'ui-state-active',
		disabled    : 'ui-state-disabled',
		draggable   : 'ui-draggable',
		droppable   : 'ui-droppable',
		adroppable  : 'elfinder-droppable-active',
		cwdfile     : 'elfinder-cwd-file',
		cwd         : 'elfinder-cwd',
		tree        : 'elfinder-tree',
		treeroot    : 'elfinder-navbar-root',
		navdir      : 'elfinder-navbar-dir',
		navdirwrap  : 'elfinder-navbar-dir-wrapper',
		navarrow    : 'elfinder-navbar-arrow',
		navsubtree  : 'elfinder-navbar-subtree',
		navcollapse : 'elfinder-navbar-collapsed',
		navexpand   : 'elfinder-navbar-expanded',
		treedir     : 'elfinder-tree-dir',
		placedir    : 'elfinder-place-dir',
		searchbtn   : 'elfinder-button-search'
	},
	tpl : {
		perms      : '<span class="elfinder-perms"/>',
		lock       : '<span class="elfinder-lock"/>',
		symlink    : '<span class="elfinder-symlink"/>',
		navicon    : '<span class="elfinder-nav-icon"/>',
		navspinner : '<span class="elfinder-navbar-spinner"/>',
		navdir     : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree"/></div>',
		placedir   : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}" title="{title}"><span class="elfinder-navbar-arrow"/><span class="elfinder-navbar-icon" {style}/>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree"/></div>'
		
	},
	
	mimes : {
		text : [
			'application/x-empty',
			'application/javascript', 
			'application/xhtml+xml', 
			'audio/x-mp3-playlist', 
			'application/x-web-config',
			'application/docbook+xml',
			'application/x-php',
			'application/x-perl',
			'application/x-awk',
			'application/x-config',
			'application/x-csh',
			'application/xml'
		]
	},
	
	mixin : {
		make : function() {
			var fm   = this.fm,
				cmd  = this.name,
				wz   = fm.getUI('workzone'),
				cwd  = fm.getUI('cwd'),
				tarea= (fm.storage('view') != 'list'),
				sel  = fm.selected(),
				move = this.move || false,
				empty= wz.hasClass('elfinder-cwd-wrapper-empty'),
				rest = function(){
					if (!overlay.is(':hidden')) {
						overlay.addClass('ui-front')
							.elfinderoverlay('hide')
							.off('click', cancel);
					}
					node.removeClass('ui-front').css('position', '');
					if (tarea) {
						nnode.css('max-height', '');
					} else {
						pnode.css('width', '')
							.parent('td').css('overflow', '');
					}
				}, colwidth,
				dfrd = $.Deferred()
					.fail(function(error) {
						empty && wz.addClass('elfinder-cwd-wrapper-empty');
						if (sel) {
							move && fm.trigger('unlockfiles', {files: sel});
							fm.clipboard([]);
							fm.trigger('selectfiles', { files: sel })
						}
						error && fm.error(error);
					})
					.always(function() {
						rest();
						input.remove();
						node.remove();
						fm.enable();
					}),
				id    = 'tmp_'+parseInt(Math.random()*100000),
				phash = fm.cwd().hash,
				date = new Date(),
				file   = {
					hash  : id,
					name  : fm.uniqueName(this.prefix),
					mime  : this.mime,
					read  : true,
					write : true,
					date  : 'Today '+date.getHours()+':'+date.getMinutes(),
					move  : move
				},
				data = this.data || {},
				node = cwd.trigger('create.'+fm.namespace, file).find('#'+fm.cwdHash2Id(id))
					.on('unselect.'+fm.namespace, function() {
						setTimeout(function() {
							input && input.blur();
						}, 50);
					}),
				nnode, pnode,
				overlay = fm.getUI().children('.elfinder-overlay'),
				cancel = function(e) { 
					if (! inError) {
						input.remove();
						node.remove();
						e.stopPropagation();
						dfrd.reject();
					}
				},
				input = $(tarea? '<textarea/>' : '<input type="text"/>')
					.on('keyup text', function(){
						if (tarea) {
							this.style.height = '1px';
							this.style.height = this.scrollHeight + 'px';
						} else if (colwidth) {
							this.style.width = colwidth + 'px';
							if (this.scrollWidth > colwidth) {
								this.style.width = this.scrollWidth + 10 + 'px';
							}
						}
					})
					.keydown(function(e) {
						e.stopImmediatePropagation();
						if (e.keyCode == $.ui.keyCode.ESCAPE) {
							dfrd.reject();
						} else if (e.keyCode == $.ui.keyCode.ENTER) {
							input.blur();
						}
					})
					.mousedown(function(e) {
						e.stopPropagation();
					})
					.blur(function() {
						var name   = $.trim(input.val()),
							parent = input.parent(),
							valid  = true,
							cut;

						if (!inError && parent.length) {

							if (fm.options.validName && fm.options.validName.test) {
								try {
									valid = fm.options.validName.test(name);
								} catch(e) {
									valid = false;
								}
							}
							if (!name || name === '..' || !valid) {
								inError = true;
								fm.error('errInvName', {modal: true, close: select});
								return false;
							}
							if (fm.fileByName(name, phash)) {
								inError = true;
								fm.error(['errExists', name], {modal: true, close: select});
								return false;
							}

							cut = (sel && move)? fm.exec('cut', sel) : null;

							$.when(cut)
							.done(function() {
								rest();
								parent.html(fm.escape(name));

								fm.lockfiles({files : [id]});

								fm.request({
										data        : $.extend({cmd : cmd, name : name, target : phash}, data || {}), 
										notify      : {type : cmd, cnt : 1},
										preventFail : true,
										syncOnFail  : true
									})
									.fail(function(error) {
										dfrd.reject(error);
									})
									.done(function(data) {
										dfrd.resolve(data);
										if (data.added && data.added[0]) {
											var dirhash = data.added[0].hash,
												newItem = cwd.find('#'+fm.cwdHash2Id(dirhash));
											if (sel && move) {
												fm.exec('paste', dirhash).done(function() {
													fm.trigger('selectfiles', { files: [dirhash] });
												});
											}
											if (newItem.length) {
												newItem.trigger('scrolltoview');
											}
										}
									});
							})
							.fail(function() {
								dfrd.reject();
							});
						}
					}),
				select = function() {
					var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
					inError = false;
					if (fm.UA.Mobile) {
						overlay.on('click', cancel)
							.removeClass('ui-front').elfinderoverlay('show');
					}
					input.select().focus();
					input[0].setSelectionRange && input[0].setSelectionRange(0, name.length);
				},
				inError = false;

			if (this.disabled() || !node.length) {
				return dfrd.reject();
			}

			empty && wz.removeClass('elfinder-cwd-wrapper-empty');
			nnode = node.find('.elfinder-cwd-filename');
			pnode = nnode.parent();
			node.css('position', 'relative').addClass('ui-front');
			if (tarea) {
				nnode.css('max-height', 'none');
			} else {
				colwidth = pnode.width();
				pnode.width(colwidth - 15)
					.parent('td').css('overflow', 'visible');
			}
			nnode.empty('').append(input.val(file.name));
			
			input.trigger('keyup');
			select();

			return dfrd;

		}
	},
	blink: function(elm, mode) {
		mode = mode || 'slowonce';
		if (mode === 'slowonce') {
			elm.stop(true, true).delay(250).fadeIn(750).delay(500).fadeOut(3500);
		}
	}
};
