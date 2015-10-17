webshim.ready('jmebase es5', function(){
	var webshim = window.webshim;
	var $ = webshim.$;
	var jme = $.jme;

	jme.defineProp('currentAlternateSrc', {
		readonly: true,
		get: function(elem){
			var ret, prop;
			var data = jme.data(elem);
			var alternateSrces = data.media.jmeFn('getAlternateSrcData');
			var currentSrc = data.media.prop('currentSrc');

			if(currentSrc){
				$.each(alternateSrces.groups, function(groupName, group){
					if(group.srces.indexOf(currentSrc) != -1){
						ret = group;
					}
				});
			} else {
				for(prop in alternateSrces.groups){
					ret = alternateSrces[prop];
					break;
				}
			}
			return ret;
		}
	});


	jme.defineMethod('getAlternateSrcData', function(srces){
		var ret = {groups: {}, groupLength: 0};
		var data = jme.data(this);

		if(!srces){
			srces = data.media.jmeProp('srces');
		}

		srces.forEach(function(src){
			var group = src['data-alternate'];

			if(!ret.groups[group]){
				ret.groupLength++;
				ret.groups[group] = {
					group: group,
					label: group,
					srces: []
				};
			}

			if(src['data-label'] || src.title){
				ret.groups[group].label = src['data-label'] || src.title;
			}

			ret.groups[group].srces.push(src.src);
		});
		ret.srces = srces;
		return ret;

	});

	jme.defineMethod('orderAlternateByName', function(names, srces){
		var data = jme.data(this);

		if(!srces){
			srces = data.media.jmeProp('srces');
		}
		if(!Array.isArray(names)){
			names = [names];
		}
		names.reverse();
		srces.sort(function(src1, src2){
			return names.indexOf(src2['data-alternate']) - names.indexOf(src1['data-alternate']);
		});
		data.media.jmeProp('srces', srces);
		return srces;
	});

	jme.defineMethod('switchAlternateByName', function(names, srces){
		var data = jme.data(this);
		var isPaused = data.media.prop('paused');
		var currentTime = data.media.prop('currentTime');
		$(this).jmeFn('orderAlternateByName', names, srces);

		if(currentTime > 1){
			data.media.play();
			data.media.one('loadedmetadata', function(){
				if(isPaused){
					data.media.pause();
				}
				data.media.prop('currentTime', currentTime);
			});
		}
		if(!isPaused){
			data.media.play();
		}
	});


	function flattenSrces(src){
		return src.src || src;
	}

	function isSameSrces(newSrces, oldScres){
		var ret = true;
		if(oldScres && newSrces.length === oldScres.length){
			newSrces = newSrces.map(flattenSrces);
			$.each(oldScres, function(i, src){
				if(newSrces.indexOf(src.src || src) == -1){
					ret = false;
					return false;
				}
			});
		} else {
			ret = false;
		}
		return ret;
	}

	var radioGroup = 0;

	function createGroupList(group){
		return '<li role="presentation"><label><input type="radio" name="alternate-'+ radioGroup +'" value="'+ group.group +'" /><span>'+ group.label +'</span></label></li>';
	}

	jme.addToConfigmenu('alternate-media', function($container, media, base, menu){
		var $menu, timer, alternateSrcData;

		var itemChange = function(e){
			var value = $.prop(e.target, 'value');
			if(value && alternateSrcData && alternateSrcData.groups[value]){
				media.jmeFn('switchAlternateByName', value, alternateSrcData.srces);
				menu.hide();
			}
		};
		var updateMenuItem = function(){
			var current;
			if($menu){
				current = media.jmeProp('currentAlternateSrc');
				if(current && current.group){
					$('[value="'+ current.group +'"]', $menu).prop('checked', true);
				}

			}
		};
		var updateMenu = function(data){
			if(!$menu || !alternateSrcData || !isSameSrces(data.srces, alternateSrcData.srces)){
				alternateSrcData = data;
				radioGroup++;

				var list = $.map(alternateSrcData.groups, createGroupList);
				if($menu){
					$menu.remove();
				}
				$menu = $('<div class="media-submenu"><ul>'+ list.join('') +'</ul></div>').appendTo($container);
				$menu.on('change', itemChange);
			}
			updateMenuItem();
		};

		var addRemoveMenu = function(){
			var data = media.jmeFn('getAlternateSrcData');
			if(data.groupLength){
				updateMenu(data);
			} else if($menu) {
				$menu.remove();
				$menu = null;
				alternateSrcData = null;
			}
		};
		var timedAddRemove = function(){
			clearTimeout(timer);
			timer = setTimeout(addRemoveMenu);
		};
		addRemoveMenu();
		media.on('loadstart emptied', timedAddRemove);
		media.on('loadedmetadata', updateMenuItem);
	});


	webshim.ready('jme-base', function(){
		webshim.isReady('alternate-media', true);
	});
});
