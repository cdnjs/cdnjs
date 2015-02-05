
// jQuery Plugin: jKit
// A very easy to use, cross platform jQuery UI toolkit that's still small in size, has the features you need and doesn't get in your way.
// Version 1.1.6 - 9. 1. 2013
// http://jquery-jkit.com/
//
// by Fredi Bach
// http://fredibach.ch/jquery-plugins/

(function($, undefined) {

    $.jKit = function(element, options, moreoptions) {

        var defaults = {
			prefix: 'jkit',
			dataAttribute: 'data-jkit',
			activeClass: 'active',
			errorClass: 'error',
			successClass: 'success',
			ignoreFocus: false,
			ignoreViewport: false,
			keyNavigation: true,
			touchNavigation: true,
			plugins: {},
			replacements: {},
			delimiter: ',',
			macros: {
				'hide-if-empty': 'binding:selector=this;source=text;mode=css.display',
				'smooth-blink': 'loop:speed1=2000;duration1=250;speed2=250;duration2=2000'
			},
			commands: {
				'template': {
					'action': 			'set',
					'name':				'template',
					'dynamic': 			'no',
					'addhtml': 			'+' 
				},
				'lightbox': {
					'speed': 			500,
					'opacity': 			0.7,
					'clearance': 		200,
					'closer': 			'x',
					'next': 			'>',
					'prev': 			'<',
					'modal': 			'no',
					'width': 			'',
					'height': 			'',
					'titleHeight': 		20,
					'group': 			''
				},
				'scroll': {
					'speed': 			500,
					'dynamic': 			'yes',
					'easing': 			'linear'
				},
				'hide': {
					'delay': 			0,
					'speed': 			500,
					'animation': 		'fade',
					'easing': 			'linear'
				},
				'remove': {
					'delay':			0
				},
				'show': {
					'delay':			0,
					'speed':			500,
					'animation':		'fade',
					'easing':			'linear'
				},
				'showandhide': {
					'delay':			0,
					'speed':			500,
					'duration':			10000,
					'animation':		'fade',
					'easing':			'linear'
				},
				'loop': {
					'speed1':			500,
					'speed2':			500,
					'duration1':		2000,
					'duration2':		2000,
					'easing1':			'linear',
					'easing2':			'linear',
					'animation':		'fade'
				},
				'random': {
					'count': 			1,
					'remove': 			'yes'  
				},
				'partially': {
					'height':			200,
					'text':				'more ...',
					'speed':			250,
					'easing':			'linear'
				},
				'slideshow': {
					'shuffle':			'no',
					'interval':			3000,
					'speed':			250,
					'animation':		'fade',
					'easing':			'linear',
					'on': 				'' 
				},
				'animation': {
					'fps':				25,
					'loop':				'no',
					'from': 			'',
					'to': 				'',
					'speed': 			'500',
					'easing': 			'linear',
					'delay':			0,
					'on': 				''
				},
				'gallery': {
					'active':			1,
					'event':			'click',
					'showcaptions':		'yes',
					'animation':		'none',
					'speed':			500,
					'easing':			'linear'
				},
				'tabs': {
					'active':			1,
					'animation':		'none',
					'speed':			250,
					'easing':			'linear'
				},
				'accordion': {
					'active':			1,
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear'
				},
				'carousel': {
					'autoplay': 		"yes",
					'limit': 			5,
					'animation':		'grow',
					'speed':			250,
					'easing':			'linear',
					'interval':			5000,
					'prevhtml':			'&lt;',
					'nexthtml':			'&gt;'
				},
				'parallax': {
					'strength':			5,
					'axis':				'x',
					'scope':			'global'
				},
				'form': {
					'validateonly':		'no'
				},
				'plugin': {
					'script': 			'' 
				},
				'tooltip': {
					'text':				'',
					'color':			'#fff',
					'background':		'#000',
					'classname':		''
				},
				'background': {
					'distort':			'no'
				},
				'lorem': {
					'paragraphs':		0,
					'length':			'',
					'random':			'no'
				},
				'binding': {
					'selector':			'',
					'source':			'val',
					'variable':			'',
					'mode':				'text',
					'interval':			100,
					'math':				'',
					'condition': 		'',
					'if':				'',
					'else':				'',
					'speed':			0,
					'easing':			'linear',
					'search': 			''
				},
				'limit': {
					'elements':			'children',
					'count':			5,
					'animation':		'none',
					'speed':			250,
					'easing':			'linear',
					'endstring':		'...'
				},
				'chart': {
					'max':				0,
					'delaysteps':		100,
					'speed':			500,
					'easing':			'linear'
				},
				'encode': {
					'format':			'code',
					'fix': 				'yes' 
				},
				'split': {
					'separator': 		'',
					'container': 		'span',
					'before':			'',
					'after':			''
				},
				'live': {
					'interval': 		60 
				},
				'key': {},
				'ajax': {
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear',
					'when': 			'click'
				},
				'replace': {
					'modifier': 		'g',
					'search': 			'', 
					'replacement': 		''
				},
				'cycle': {
					'what': 			'class',
					'where': 			'li',
					'scope': 			'children',
					'sequence': 		'odd,even'
				},
				'fontsize': {
					'steps': 			2,
					'min': 				6,
					'max': 				72, 
					'affected':			'p'
				},
				'swap': {
					'versions': 		'_off,_on'
				},
				'ticker': {
					'speed': 			100,
					'delay': 			2000
				},
				'sort': {
					'what': 			'text',
					'by': 				'',
					'start':			0,
					'end':				0
				},
				'zoom': {
					'scale': 			2,
					'speed': 			150
				},
				'api': {
					'format': 			'json',
					'value': 			'',
					'url': 				'',
					'interval': 		-1,
					'template': 		''
				},
				'filter': {
					'by': 				'class',
					'affected': 		'',
					'animation':		'slide',
					'speed':			250,
					'easing':			'linear',
					'logic': 			'and'
				},
				'summary': {
					'what': 			'',
					'linked': 			'yes',
					'from': 			'',
					'scope': 			'children'
				}
			}
        };
		
        var plugin = this;
		
        plugin.settings = {};
		
        var $element = $(element),
             element = element;
		
		if (typeof options == 'string'){
			var singlecommand = options;
			if (moreoptions == undefined){
				moreoptions = {};
			}
			options = moreoptions;
		}
		
		var startX, startY;
		var windowhasfocus = true;
		var uid = 0;
		var lightboxes = {};
		var templates = {};
		var commandkeys = {};
		
		if (!$.browser.msie || ($.browser.msie && $.browser.version >= 9)){
			$(window).focus(function() {
			    windowhasfocus = true;
			}).blur(function() {
			    windowhasfocus = false;
			});
		}
		
		plugin.applyMacro = function($el, macro){
			
			var s = plugin.settings;
			
			if (s.macros[macro] != undefined){
				var value = s.macros[macro];
				var options = plugin.parseOptions(value);
				
				if (s.replacements[options.type] != undefined && typeof(s.replacements[options.type]) === "function"){
					s.replacements[options.type].call(plugin, $el, options.type, options);
				} else {
					plugin.executeCommand($el, options.type, options);
				}
			}
			
		};
		
        plugin.init = function($el) {
	
			if ($el == undefined) $el = $element;
			
            plugin.settings = $.extend({}, defaults, options);
			var s = plugin.settings;
			
			if (singlecommand != undefined){
				
				plugin.executeCommand($el, singlecommand, options);
				
			} else {
			
				$el.find("*[rel^=jKit], *["+s.dataAttribute+"]").each( function(){
				
					var that = this;
				
					var rel = $(this).attr('rel');
					var data = $(this).attr(s.dataAttribute);
				
					if (data != undefined){
						rel = $.trim(data).substring(1);
					} else {
						rel = $.trim(rel).substring(5);
					}
					rel = rel.substring(0, rel.length-1);
					rel = rel.replace(/\]\s+\[/g, "][");
					relsplit = rel.split('][');
				
					$.each( relsplit, function(index, value){
					
						value = value
									.replace(/\\=/g,'|jkit-eq|')
									.replace(/\\:/g,'|jkit-dp|')
									.replace(/\\;/g,'|jkit-sc|')
									.replace(/\\\[/g,'|jkit-sbo|')
									.replace(/\\\]/g,'|jkit-sbc|')
									.replace(/\\\*/g,'|jkit-st|')
									.replace(/\\ /g,'|jkit-sp|');
						
						value = $.trim(value);
						
						if (s.macros[value] != undefined) value = s.macros[value];
					
						var options = plugin.parseOptions(value);
					
						if (s.macros[options.type] != undefined){
							var macrooptions = plugin.parseOptions(s.macros[options.type]);
							options.type = macrooptions.type;
							options = $.extend({}, macrooptions, options);
						}
						
						if (options.type == 'macro' && relsplit[index-1] != undefined){
						
							plugin.settings.macros[options.name] = relsplit[index-1];
						
						} else if (options.type == 'repeat' && relsplit[index-1] != undefined){
							
							var prevoptions = plugin.parseOptions(relsplit[index-1]);
							
							$el.on( options.onevent, function(){
								if (options.delay == undefined) options.delay = 0;
								setTimeout( function(){
									plugin.executeCommand($(that), prevoptions.type, prevoptions);
								}, options.delay);
							});
							
						} else {
						
							var targets = [];
							if (options.target != undefined){
							
								var targetsplit = options.target.split('.');
								targetsplit = [targetsplit.shift(), targetsplit.join('.')]
								if (targetsplit[1] == undefined){
									targetsplit[1] = '*';
								}
								
								switch(targetsplit[0]){
									case 'children':
										$(that).children(targetsplit[1]).each( function(){
											targets.push(this);
										});
										break;
									case 'each':
										$(that).find(targetsplit[1]).each( function(){
											targets.push(this);
										});
										break;
									default:
										targets.push(that);
								}
							} else {
								targets.push(that);
							}
						
							$.each( targets, function(i,v){
								
								if (options.commandkey == undefined){
									var id = $(v).attr("id");
									if (id != undefined){
										options.commandkey = id;
									} else {
										options.commandkey = s.prefix+'-uid-'+(++uid);
									}
								}
								
								if (options.commandkey != undefined){
									commandkeys[options.commandkey] = {
										'el': v,
										'options': options,
										'execs': 0
									};
								}
								
								if (options.onevent !== undefined || options.andonevent !== undefined){
									
									var events = [];
									if (options.onevent !== undefined) events.push(options.onevent);
									if (options.andonevent !== undefined) events.push(options.andonevent);
									var e = events.join(' ');
									
									$el.on( e, function(){
										if (s.replacements[options.type] != undefined && typeof(s.replacements[options.type]) === "function"){
											s.replacements[options.type].call(plugin, v, options.type, options);
										} else {
											plugin.executeCommand(v, options.type, options);
										}
									});
									
								}
								
								if (options.onevent === undefined){
								
									if (s.replacements[options.type] != undefined && typeof(s.replacements[options.type]) === "function"){
										s.replacements[options.type].call(plugin, v, options.type, options);
									} else {
										plugin.executeCommand(v, options.type, options);
									}
									
								}
								
							});
						
						}
					
					});
				
				});
				
			}
			
        };

		plugin.parseOptions = function(string){
			
			var relsplit = string.split(':');
			var commandsplit = relsplit[0].split('.');
			
			var options = { 'type': $.trim(commandsplit[0]) };
			
			if (commandsplit[1] !== undefined){
				options['commandkey'] = commandsplit[1];
			}
			
			if (options.execute == undefined){
				options.execute = 'always';
			}
			
			if (relsplit.length > 1){
				var optionssplit = relsplit[1].split(';');
				
				$.each( optionssplit, function(key, value){
					var optionssplit2 = value.split('=');
					options[$.trim(optionssplit2[0])] = $.trim(optionssplit2[1]);
				});
			}
			
			return options;
			
		};

		plugin.addDefaults = function(command, options){
			
			if (plugin.settings.commands[command] != undefined){
				var c = plugin.settings.commands[command];
				
				$.each(c, function(i, v){
					if (options[i] == undefined) options[i] = v;
					if (i.indexOf('speed') > -1) options[i] = plugin.fixSpeed(options[i]);
				});
			}
			
			return options;
		};
		
		plugin.executeCommand = function(that, type, options){
			
			var s = plugin.settings;
			var $that = $(that);
			
			$element.trigger('jkit-commandinit', { 'element': $that, 'type': type, 'options': options });
			
			if (options.commandkey !== undefined){
				commandkeys[options.commandkey]['execs']++;
				if ((options.execute == 'once' && commandkeys[options.commandkey]['execs'] > 1) || (!isNaN(options.execute) && commandkeys[options.commandkey]['execs'] > options.execute)){
					return $that;
				}
			}
			
			options = plugin.addDefaults(type, options);
			
			$.each( options, function(i,v){
				
				if (typeof v == 'string'){
					options[i] = v = v
						.replace(/\|jkit\-eq\|/g,'=')
						.replace(/\|jkit\-dp\|/g,':')
						.replace(/\|jkit\-sc\|/g,';')
						.replace(/\|jkit\-sbo\|/g,'[')
						.replace(/\|jkit\-sbc\|/g,']')
						.replace(/\|jkit\-st\|/g,'*')
						.replace(/\|jkit\-sp\|/g,' ');
				}
				
				if (typeof v == 'string' && v.slice(-1) == '*'){
					options[i] = window[v.slice(0, -1)];
					if (typeof options[i] == 'function'){
						options[i] = options[i].call(that);
					}
				}
			});
			
			switch(type){
				case 'filter':
					
					plugin.filterElements($that, options);
					
					$that.find('.jkit-filter').on( 'change click', function(){
						plugin.triggerEvent('clicked', $that, options);
						plugin.filterElements($that, options);
					});
					
					break;
				case 'summary':
					
					var output = '';
					
					var pre = ''
					if (options.scope == 'children'){
						pre = '> ';
					}
					
					$(options.from).find(pre+options.what).each( function(){
						
						var $current = $(this);
						
						if (options.linked == 'yes'){
							
							if ($current.attr('id') !== undefined){
								var id = $current.attr('id');
							} else {
								var id = s.prefix+'-uid-'+(++uid);
								$current.attr('id', id);
							}
							
							output += '<li><a href="#'+id+'">'+$(this).text()+'</a></li>';
							
						} else {
							output += '<li>'+$(this).text()+'</li>';
						}
					});
					
					if (output != ''){
						$that.html('<ul>'+output+'</ul>');
					}
					
					break;
				case 'api':
					
					if (options.url != ''){
						plugin.readAPI($that, options);
					}
					
					break;
				case 'zoom':
					
					$that.parent().css('position', 'relative');
					
					$that.on( 'mouseover', function(){
						
						var pos = $that.position();
						var height = $that.height();
						var width = $that.width();
						
						$zoom = $('<div/>', { 
							'class': s.prefix+'-'+type+'-overlay' 
						}).css( {
							'position': 'absolute',
							'height': height+'px',
							'width': width+'px',
							'left': pos.left + 'px',
							'top': pos.top + 'px',
							'overflow': 'hidden',
							'background-image': 'url('+$that.attr('src')+')',
							'background-repeat': 'no-repeat',
							'background-color': '#000',
							'opacity': 0
						}).on( 'mouseout', function(){
							$zoom.fadeTo(options.speed, 0, function(){
								$zoom.remove();
								plugin.triggerEvent('zoomout', $that, options);
							});
						}).mousemove(function(e){
							
							var offset = $(this).offset();
							
							var x = (e.pageX - offset.left) * (options.scale-1);
							var y = (e.pageY - offset.top) * (options.scale-1);
							
							$zoom.css('background-position', '-'+x+'px -'+y+'px');
							
						}).fadeTo(options.speed, 1, function(){ 
							plugin.triggerEvent('zoomin', $that, options);
						}).insertAfter($that);
						
					});
					
					break;
				case 'sort':
					
					var text = $that.text();
					var index = $that.parent().children().index($that);
					
					$that.on('click', function(){
						
						plugin.triggerEvent('clicked', $that, options);
						
						var rows = [];
						$that.parent().parent().parent().find('tbody > tr').each( function(){
							
							var $td = $(this).find('td:nth-child('+(index+1)+')');
							
							switch(options.what){
								case 'html':
									var str = $td.html();
									break;
								case 'class':
									var str = $td.attr('class');
									break;
								default:
									var str = $td.text();
									break;
							}
							
							if (options.start > 0 || options.end > 0){
								if (options.end > options.start){
									str = str.substring(options.start, options.end);
								} else {
									str = str.substring(options.start);
								}
							}
							
							rows.push({ 'content': $(this).html(), 'search': str });
							
						});
						
						if ($that.hasClass(s.prefix+'-'+type+'-down')){
							$that.parent().find('th').removeClass(s.prefix+'-'+type+'-down').removeClass(s.prefix+'-'+type+'-up');
							$that.addClass(s.prefix+'-'+type+'-up');
							rows.sort( function(a,b){
								if (options.by == 'num'){
									a.search = Number(a.search);
									b.search = Number(b.search);
								}
								if (options.by == 'date'){
									var a = new Date(a.search);
									var b = new Date(b.search);
									return (a.getTime() - b.getTime());
								} else {
									if (a.search > b.search) return -1;
							    	if (a.search < b.search) return 1;
							    	return 0;
								}
							});
						} else {
							$that.parent().find('th').removeClass(s.prefix+'-'+type+'-down').removeClass(s.prefix+'-'+type+'-up');
							$that.addClass(s.prefix+'-'+type+'-down');
							rows.sort( function(a,b){
								if (options.by == 'num'){
									a.search = Number(a.search);
									b.search = Number(b.search);
								}
								if (options.by == 'date'){
									var a = new Date(a.search);
									var b = new Date(b.search);
									return (b.getTime() - a.getTime());
								} else {
									if (a.search < b.search) return -1;
							    	if (a.search > b.search) return 1;
							    	return 0;
								}
							});
						}
						
						var $body = $that.parent().parent().parent().find('tbody');
						$body.html('');
						
						var tbody = '';
						$.each( rows, function(i,v){
							tbody += '<tr>'+v.content+'</tr>';
						});
						
						$body.html(tbody);
						
						plugin.triggerEvent('complete', $that, options);
						
					});
					
					break;
				case 'ticker':
					
					var messages = [];
					
					$that.find('li').each( function(){
						messages.push({ 
							'href': $(this).find('a').attr('href'),
							'target': $(this).find('a').attr('target'),
							'text': $(this).text()
						});
					});
					
					if (messages.length > 0){
						var $newThat = $('<div/>');
						$that.replaceWith($newThat);
						window.setTimeout( function() { plugin.ticker($newThat, options, messages, 0, 0); }, 0);
					}
					
					break;
				case 'swap':
					
					var atribute = 'src';
					
					var versions = options.versions.split(s.delimiter);
					
					var original = $that.attr(atribute);
					var replacement = $that.attr(atribute).replace(versions[0],versions[1]);
					
					$('<img/>')[0].src = replacement;
					
					$that.mouseenter(function(){
						$that.attr(atribute, replacement );
						plugin.triggerEvent('active', $that, options);
					}).mouseleave(function(){
						$that.attr(atribute, original );
						plugin.triggerEvent('inactive', $that, options);
					});
					
					break;
				case 'fontsize':
					
					var cssoption = 'font-size';
					
					$that.on( 'click', function(){
						
						$element.find(options.affected).each( function(){
							
							var newsize = parseInt($(this).css(cssoption)) + parseInt(options.steps);
							
							if (newsize >= parseInt(options.min) && newsize <= parseInt(options.max) ){
								$(this).css(cssoption, newsize );
							}
							
						});
						
						plugin.triggerEvent('changed', $that, options);
						
					    return false;
					});
					
					break;
				case 'cycle':
					
					var seq = options.sequence.split(s.delimiter);
					var pos = 0;
					
					var sel = options.where;
					if (options.scope == 'children'){
						sel = '> '+sel;
					}
					
					$that.find(sel).each( function(){
						if (seq[pos] != undefined && seq[pos] != ''){
							switch(options.what){
								case 'class':
									$(this).addClass(seq[pos]);
									break;
								case 'html':
									$(this).html(seq[pos]);
									break;
								default:
									var what = options.what.split('.');
									if (what[0] == 'attr'){
										$(this).attr(what[1], seq[pos]);
									} else if (what[0] == 'css'){
										$(this).css(what[1], seq[pos]);
									}
							}
						}
						pos++;
						if (pos > seq.length-1) pos = 0;
					});
					
					break;
				case 'replace':
					
					var str = new RegExp(options.search, options.modifier);
					$that.html($that.html().replace(str,options.replacement));
					
					break;
				case 'ajax':
					
					if (options.href != undefined && options.href != ''){
						var href = options.href;
					} else {
						var href = $that.attr('href');
					}
					
					if (options.when == 'load' || options.when == 'viewport'){
						if (options.when == 'load'){
							$that.load(href, function(){
								plugin.triggerEvent('complete', $that, options);
							});
						} else {
							var myInterval = setInterval(function(){
								if ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport){
									if (options.src != undefined){
										$that.attr('src', options.src);
										plugin.triggerEvent('complete', $that, options);
									} else {
										$that.load(href, function(){
											plugin.triggerEvent('complete', $that, options);
										});
									}
									window.clearInterval(myInterval);
								}
							},100);
						}
					} else {
						$that.on('click', function(){
							plugin.loadAndReplace(href, options, $that);
							return false;
						});
					}
					
					break;
				case 'key':
					
					if (options.code != undefined){
						
						plugin.addKeypressEvents($that, options.code);
						$that.on( options.code, function(){
							if ($that.attr('onclick') !== undefined){
								$that.click();
							} else {
								if ($that.attr('target') !== undefined && $that.attr('target') == '_blank'){
									window.open($that.attr('href'), '_blank', false);
								} else {
									window.location.href = $that.attr('href');
								}
							}
							if (options.macro != undefined) plugin.applyMacro($that, options.macro);
							plugin.triggerEvent('pressed', $that, options);
						});
						
					}
					
					break;
				case 'live':
					
					if ($that.attr('src') !== undefined) {
						window.setInterval( function() { 
							plugin.updateSrc($that, options);
							plugin.triggerEvent('reloaded', $that, options);
						}, options.interval*1000);
					}
					
					break;
				case 'split':
					
					var parts = $that.text().split(options.separator);
					$that.html('');
					
					$.each( parts, function(i,v){
						$('<'+options.container+'/>').text(v).appendTo($that);
					});
					
					$that.html(options.before+$that.html()+options.after);
					
					break;
				case 'encode':
					
					switch(options.format) {
						case 'code':
							var src = $that.html();
							if (options.fix == 'yes'){
								src = plugin.preFix(src);
							}
							$that.html(src.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
							break;
						case 'text':
							$that.html($that.text());
							break;
						case 'esc':
							$that.html(escape($that.html()));
							break;
						case 'uri':
							$that.html(encodeURI($that.html()));
							break;
					}
					
					break;
				case 'chart':
					
					var label = $that.find('thead > tr > th.label').text();
					var id = $that.attr('id');
					
					var datalabels = [];
					
					$that.find('thead > tr > th').each( function(){
						if (!$(this).hasClass('label')){
							datalabels.push( $(this).text() );
						}
					});
					
					var max = 0;
					
					var plots = [];
					$that.find('tbody tr').each( function(){
						var plot = { 'label': $(this).find('th.label').text(), 'data': [] };
						$(this).find('th').each( function(){
							if (!$(this).hasClass('label')){
								var val = Number($(this).text());
								max = Math.max(val, max);
								plot.data.push(val);
							}
						});
						plots.push(plot);
					});
					
					if (options.max > 0 && max < options.max){
						max = options.max;
					}
					
					var $chart = $('<div/>', {
					    id: id,
						'class': s.prefix+'-'+type
					});
					
					var steps = 0;
					
					var delay = 0;
					$.each(datalabels, function(i,v){
						
						steps++;
						var $step = $('<div/>', { 'class': s.prefix+'-'+type+'-step' }).html('<label>'+v+'</label>').appendTo($chart);
						
						$.each( plots, function(i2,v2){
							
							if (plots[i2].data[i] > 0){
								
								var $plot = $('<div/>', { 'class': s.prefix+'-'+type+'-plot '+s.prefix+'-'+type+'-plot'+i2 }).appendTo($step);
							
								$('<div/>')
									.text(plots[i2].label)
									.delay(delay)
									.animate({ 'width': (plots[i2].data[i]/max*100)+'%' }, options.speed, options.easing)
									.appendTo($plot);
								
							
								$('<span/>', { 'class': s.prefix+'-'+type+'-info' })
									.text(label+' '+plots[i2].label+': '+plots[i2].data[i]+' '+options.units)
									.appendTo($plot);
									
							}
								
						});
						
						if (steps == datalabels.length){
							setTimeout( function(){
								plugin.triggerEvent('complete', $that, options);
							}, options.speed+delay);
						}
						
						delay += Number(options.delaysteps);
					});
					
					$that.replaceWith($chart);
					
					break;
				case 'lightbox':
					
					if (options.group != ''){
						if (lightboxes[options.group] == undefined){
							lightboxes[options.group] = [];
						}
						lightboxes[options.group].push(that);
					}
					
					$that.click(function() {
						
						plugin.triggerEvent('clicked', $that, options);
						
						if (options.modal == 'no'){
							var $overlay = $('<div/>', {
							    id: s.prefix+'-'+type+'-bg',
								'class': s.prefix+'-'+type+'-closer '+s.prefix+'-'+type+'-el'
							}).fadeTo(options.speed, options.opacity).appendTo('body');
						}
						
						var $content = $('<div/>', {
						    id: s.prefix+'-'+type+'-content',
							'class': s.prefix+'-'+type+'-el'
						}).fadeTo(0,0.01).appendTo('body');
						
						if ($.fn.jKit_iOS()) $content.css('top', $(window).scrollTop()+'px');
						
						if (options.width != ''){
							$content.css({ 'width': options.width });
							$content.css({ 'left': (($(window).width() - $content.outerWidth()) / 2) + 'px' });
						}
						if (options.height != ''){
							$content.css({ 'height': options.height });
							$content.css({ 'top': (($(window).height() - $content.outerHeight()) / 2) + 'px' });
						}
						
						var $nav = $('<div/>', {
						    id: s.prefix+'-'+type+'-nav',
							'class': s.prefix+'-'+type+'-el' 
						}).hide().fadeTo(options.speed, 1).appendTo('body');
						
						var $closer = $('<span/>', {
						    'class': s.prefix+'-'+type+'-closer'
						}).html(options.closer).prependTo($nav);
						
						var offset = $content.offset();
						
						$nav.css({ 
							'top': (offset.top-options.titleHeight-$(window).scrollTop())+'px', 
							'left': (offset.left+$content.outerWidth()-$nav.width())+'px'
						});
						
						if (options.group != ''){
							var $next = $('<span/>', {
							    id: s.prefix+'-'+type+'-nav-next'
							}).prependTo($nav);
							
							var $prev = $('<span/>', {
							    id: s.prefix+'-'+type+'-nav-prev'
							}).prependTo($nav);
							
							plugin.addKeypressEvents($next, 'right');
							plugin.addKeypressEvents($prev, 'left');
							
							if (lightboxes[options.group][lightboxes[options.group].length-1] != that){
								$next.html(options.next).on( 'click right', function(){
									$.each(lightboxes[options.group], function(i,v){
										if (v == that){
											$('.'+plugin.settings.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
												$(this).remove();
											});
											lightboxes[options.group][i+1].click();
										}
									});
								});
							}
							if (lightboxes[options.group][0] != that){
								$prev.html(options.prev).on( 'click left', function(){
									$.each(lightboxes[options.group], function(i,v){
										if (v == that){
											$('.'+plugin.settings.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
												$(this).remove();
											});
											lightboxes[options.group][i-1].click();
										}
									});
								});
							}
						}
						
						$title = $('<div/>', {
						    id: s.prefix+'-'+type+'-title',
							'class': s.prefix+'-'+type+'-el'
						}).css({ 
							'top': (offset.top-options.titleHeight-$(window).scrollTop())+'px', 
							'left': (offset.left)+'px', 
							'width': $content.width()+'px' 
						}).hide().text($that.attr('title')).fadeTo(options.speed, 1).appendTo('body');
						
						var img = new Image();
						$(img)
						    .load(function () {
								
								var scalex = ($(this).outerWidth() + options.clearance) / $(window).width();
								var scaley = ($(this).outerHeight() + options.clearance) / $(window).height();
								var scale = Math.max(scalex,scaley);
								if (scale > 1){
									var oh = $(this).height();
									$(this).width($(this).width() / scale);
									$(this).height(oh / scale);
								}
								
								var xmargin = ( $(window).width() - $(this).outerWidth() ) / 2;
								var ymargin = ( $(window).height() - $(this).outerHeight() ) / 2;
								
								$content
									.width($(this).width())
									.height($(this).height())
									.css({ 'left': xmargin+'px', 'top': ymargin+'px' })
									.fadeTo(options.speed, 1);
								$(this).hide().fadeTo(options.speed, 1);
								
								if ($that.attr('title') != ''){
									$title.css({ 
										'top': (ymargin-options.titleHeight)+'px', 
										'left': xmargin+'px', 
										'width': $(this).width()+'px' 
									});
								}
								
								$nav.css({ 
									'top': (ymargin-options.titleHeight)+'px', 
									'left': (xmargin+$content.outerWidth()-$nav.width())+'px'
								});
								
						    })
							.attr('src', $that.attr('href'))
							.appendTo($content)
							.error(function(){
								$content.html('<iframe id="'+s.prefix+'-'+type+'-iframe" src="'+$that.attr('href')+'" style="border:none;width:100%;height:100%"></iframe>').fadeTo(options.speed, 1);
							});
						
						$('.'+s.prefix+'-'+type+'-closer').click(function(){ 
							$('.'+s.prefix+'-'+type+'-el').fadeTo(options.speed, 0, function(){
								$(this).remove();
							});
						});
						
						return false;
						
					});
					
					break;
				case 'scroll':
					
					$that.click(function() {
						
						plugin.triggerEvent('clicked', $that, options);
						
						if ($(this).attr("href") == ''){
							var ypos = 0;
						} else {
							var ypos = $($that.attr("href")).offset().top;
						}
						
						if (options.dynamic == 'yes'){
						 	options.speed = Math.abs($(document).scrollTop() - ypos) / 1000 * options.speed;
						}
						
						$('html, body').animate({ scrollTop: ypos+'px' }, options.speed, options.easing, function(){
							plugin.triggerEvent('complete', $that, options);
						});
						return false;
					});
					
					break;
				case 'hide':
					
					$that.jKit_effect(false, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('complete', $that, options);
					});
				
					break;
				case 'remove':
					
					$that.delay(options.delay).hide(0, function(){
						$that.remove();
						plugin.triggerEvent('complete', $that, options);
					});
			
					break;
				case 'show':
					
					$that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('complete', $that, options);
					});
			
					break;
				case 'showandhide':
					
					$that.hide().jKit_effect(true, options.animation, options.speed, options.easing, options.delay, function(){
						plugin.triggerEvent('shown', $that, options);
						$that.jKit_effect(false, options.animation, options.speed, options.easing, options.duration, function(){
							plugin.triggerEvent('complete', $that, options);
						});
					});

					break;
				case 'loop':
					
					plugin.loop($that.hide(), options);

					break;
				case 'random':
					
					var childs = $that.children().size();
					var shownrs = [];
					
					while(shownrs.length < options.count){
						var shownr = Math.floor(Math.random() * childs);
						if ($.inArray(shownr, shownrs) == -1){
							shownrs.push(shownr);
						}
					}
					
					var i = 0;
					$that.children().each( function(){
						if ($.inArray(i, shownrs) == -1){
							if (options.remove == 'yes'){
								$(this).remove();
							} else {
								$(this).hide();
							}
						} else {
							$(this).show();
						}
						i++;
					});

					break;
				case 'partially':
				
					var originalHeight = $that.height();
					
					$that.css('position', 'relative');
					
					var $morediv = $('<div/>').addClass(s.prefix+'-morediv').appendTo(that).html(options.text).css( { width: $that.outerWidth()+'px', opacity: 0.9 });
					
					plugin.addKeypressEvents($that, 'down');
					
					$that.css({ 'height': options.height+'px', 'overflow': 'hidden' }).on( 'mouseenter down', function() {
						$morediv.fadeTo(options.speed, 0);
						$that.animate({ 'height': originalHeight+'px' }, options.speed, options.easing, function(){
							plugin.triggerEvent('open', $that, options);
						});
					}).on( 'mouseleave up',  function(){
						$morediv.fadeTo(options.speed, 0.9);
						$that.animate({ 'height': options.height+'px' }, options.speed, options.easing, function(){
							plugin.triggerEvent('closed', $that, options);
						});
					});
					
					$morediv.on('click', function(){
						$that.animate({ 'height': originalHeight+'px' }, options.speed, options.easing, function(){
							plugin.triggerEvent('closed', $that, options);
						});
					});
				
					break;
				case 'slideshow':
					
					var slides = $that.children();
				
					if (options.shuffle == 'yes'){
						var tmp, rand;
						var slidecount = slides.length;
						for(var i =0; i < slidecount; i++){
							rand = Math.floor(Math.random() * slidecount);
							tmp = slides[i];
							slides[i] = slides[rand];
							slides[rand] = tmp;
						}
					}
				
					$that.css( { 'position': 'relative' } );
					
					$that.html(slides[0]);
					$.data($that, 'animating', false);
					
					if (options.on != ''){
						
						if (options.on == 'mouseover'){
							$that.on( 'mouseleave', function(){
								$.data($that, 'anim', false);
							});
						}
						
						$that.on( options.on, function(){
							if (options.on == 'click'){
								if ($.data($that, 'anim')){
									$.data($that, 'anim', false);
								} else {
									$.data($that, 'anim', true);
									window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, 0);
								}
							} else if (options.on == 'mouseover'){
								if (!$.data($that, 'anim')){
									$.data($that, 'anim', true);
									window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, 0);
								}
							}
						});
						
					} else {
						$.data($that, 'anim', true);
						window.setTimeout( function() { plugin.slideshow(slides, 0, $that, options); }, options.interval);
					}
					
					break;
				case 'carousel':	
					
					var cnt = 0;

					$that.children().each( function(){
						cnt++;
						if (cnt > options.limit){
							$(this).hide();
						}
					});
					
					var $prevdiv = $('<a/>', {
					    'class': s.prefix+'-'+type+'-prev'
					}).html(options.prevhtml).on( 'click left', function(){
						plugin.carousel($that, options, 'prev');
					}).insertAfter(that);
					
					var $nextdiv = $('<a/>', {
					    'class': s.prefix+'-'+type+'-next'
					}).html(options.nexthtml).on( 'click right', function(){
						plugin.carousel($that, options, 'next');
					}).insertAfter(that);
					
					plugin.addKeypressEvents($prevdiv, 'left');
					plugin.addKeypressEvents($nextdiv, 'right');
					
					window.setTimeout( function() { plugin.carousel($that, options); }, options.interval);
					
					break;
				case 'animation':
					
					if (options.to != ''){
						
						if (options.from != ''){
							$that.css( plugin.cssFromString(options.from) );
						}
						
						setTimeout(function() {
							if (options.on != ''){
								$that.on( options.on, function(){
									$that.animate( plugin.cssFromString(options.to), options.speed, options.easing, function(){
										if (options.macro != undefined) plugin.applyMacro($that, options.macro);
										plugin.triggerEvent('complete', $that, options);
									});
								});
							} else {
								$that.animate( plugin.cssFromString(options.to), options.speed, options.easing, function(){
									if (options.macro != undefined) plugin.applyMacro($el, options.macro);
									plugin.triggerEvent('complete', $that, options);
								});
							}
						}, options.delay);
						
					} else {
					
						options.interval = 1000 / options.fps;
					
						var frames = [];
					
						var pos = 0;
						var lastframe = 0;
					
						$that.children().each( function(){
							var rel = $(this).attr('rel');
							var data = $(this).attr(s.dataAttribute);
						
							if (data != undefined){
								var start = data.indexOf('[');
								var end = data.indexOf(']');
								var optionstring = data.substring(start+1, end);
							} else {
								var start = rel.indexOf('[');
								var end = rel.indexOf(']');
								var optionstring = rel.substring(start+1, end);
							}
						
							var frame = plugin.parseOptions(optionstring);
						
							frame.el = $(this);
							if (frame.easing == undefined) frame.easing = 'linear';
						
							frame.start = pos;
							pos += parseInt(frame.steps);
							frame.end = pos;
							lastframe = pos;
							pos++;
						
							frames.push(frame);
						});
					
						options.lastframe = lastframe;
					
						$that.css('overflow', 'hidden');

						$that.html(frames[0].el);

						window.setTimeout( function() { plugin.animation(frames, -1, $that, options); }, 0);
						
					}

					break;
				case 'gallery':
					
					var images = $that.children();
					
					$that.html($that.children(':nth-child('+options.active+')').clone());
					
					var $thumbdiv = $('<div/>', {
					    id: s.prefix+'-'+$that.attr('id')+'-'+type+'-thumbs'
					}).addClass(s.prefix+'-'+type+'-thumbs').insertAfter(that);
					
					if (options.showcaptions == 'yes'){
						var $captiondiv = $('<div/>', {
						    id: s.prefix+'-'+$that.attr('id')+'-'+type+'-captions'
						}).addClass(s.prefix+'-'+type+'-captions').text($(images[options.active-1]).attr('title')).insertAfter(that);
					}
					
					$.each( images, function(index, value){
						if (options.active-1 == index){
							$(value).addClass(s.activeClass);
						}
						$(value)
							.mouseover(function() {
								if (options.event == 'mouseover'){
									
									plugin.triggerEvent('hideentry', $that, options);
									
									$that.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
										$that.find('img').attr('src', $(value).attr('src'));
										
										plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
										
										$that.jKit_effect(true, options.animation, options.speed, options.easing, 0);
										$thumbdiv.find('img').removeClass(s.activeClass);
										$(value).addClass(s.activeClass);
										
										if (options.showcaptions == 'yes'){
											$captiondiv.text($(value).attr('title'));
										}
									});
								}
							})
							.click(function() {
								if (options.event == 'click'){
									
									plugin.triggerEvent('hideentry', $that, options);
									
									$that.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
										$that.find('img').attr('src', $(value).attr('src'));
										
										plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
										
										$that.jKit_effect(true, options.animation, options.speed, options.easing, 0);
										$thumbdiv.find('img').removeClass(s.activeClass);
										$(value).addClass(s.activeClass);
										
										if (options.showcaptions == 'yes'){
											$captiondiv.text($(value).attr('title'));
										}
									});
								}
							})
							.css({ 'cursor': 'pointer' })
							.appendTo($thumbdiv);
					});

					break;
				case 'tabs':
					
					var tabs = [];
					$that.children('div').each( function(){
						tabs.push({ 'title': $(this).children('h3').html(), 'content': $(this).children('div').detach() });
					});
					
					$that.html('');
					var $tabnav = $('<ul/>', { }).appendTo(that);
					
					var $tabcontent = $;
					
					$.each( tabs, function(index, value){
						var $litemp = $('<li/>', { }).html(value.title).css('cursor', 'pointer').appendTo($tabnav);
						if (options.active-1 == index){
							$litemp.addClass(s.activeClass);
						}
						$litemp.on( 'click', function(){
							plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
							if (options.animation == 'fade'){
								$tabcontent.fadeTo(options.speed, 0, options.easing, function(){
									$(this).remove();
									$tabcontent = tabs[index].content.appendTo($that).hide().fadeTo(options.speed, 1);
								});
							} else if (options.animation == 'slide'){
								$tabcontent.slideUp(options.speed, options.easing, function(){
									$(this).remove();
									$tabcontent = tabs[index].content.appendTo($that).hide().slideDown(options.speed);
								});
							} else if (options.animation == 'grow'){
								$tabcontent.hide(options.speed, options.easing, function(){
									$(this).remove();
									$tabcontent = tabs[index].content.appendTo($that).hide().show(options.speed);
								});
							} else {
								$tabcontent.remove();
								$tabcontent = tabs[index].content.appendTo($that);
							}
							$tabnav.find('li').removeClass(s.activeClass);
							$tabnav.find('li:nth-child('+(index+1)+')').addClass(s.activeClass);
						});
					});
					
					if (tabs[options.active-1] != undefined){
						$tabcontent = tabs[options.active-1].content.appendTo($that);
					}
			
					break;
				case 'accordion':
					
					var tabs = [];
					$that.children('div').each( function(){
						tabs.push({ 
							'title': $(this).children('h3').detach(),
							'content': $(this).children('div').detach()
						});
					});
					
					$that.html('');
					var $tabnav = $('<ul/>', { }).appendTo(that);
					
					var $tabcontent = $;
					var current = 1;
					if (options.active == 0) current = -1;
					
					$.each( tabs, function(index, value){
						
						var $litemp = $('<li/>', { }).append(value.title).css('cursor', 'pointer').appendTo($tabnav);
						
						if (options.active-1 == index){
							$litemp.append(value.content).children('h3').addClass(s.activeClass);
							current = index;
						} else {
							$litemp.append(value.content.hide());
						}
						
						$litemp.find('> h3').on( 'click', function(e){
							if (index != current){
								plugin.triggerEvent('showentry showentry'+(index+1), $that, options);
								$tabnav.find('> li > h3').removeClass(s.activeClass);
								$(this).addClass(s.activeClass);
								if (options.animation == 'slide'){
									$tabnav.find('> li:nth-child('+(current+1)+') > div').slideUp(options.speed, options.easing);
									$tabnav.find('> li:nth-child('+(index+1)+') > div').slideDown(options.speed, options.easing);
								} else {
									$tabnav.find('> li:nth-child('+(current+1)+') > div').hide();
									$tabnav.find('> li:nth-child('+(index+1)+') > div').show();
								}
								current = index;
							} else {
								plugin.triggerEvent('hideentry hideentry'+(index+1), $that, options);
								$(this).removeClass(s.activeClass).next().slideUp(options.speed, options.easing);
								current = -1;
							}
						});
						
					});
					
					break;
				case 'parallax':
					
					var strength = options.strength / 10;
					
					if (options.scope == 'global'){
						var $capture = $(document);
					} else {
						var $capture = $that;
					}
					
					$capture.mousemove( function(event) {
						
						if ((windowhasfocus || !windowhasfocus && s.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport() && s.ignoreViewport)){
							var cnt = 1;
						
							$that.children().each( function(){
							
								var box = $that.offset();
							
								if (options.axis == 'x' || options.axis == 'both'){
									var offsetx = (event.pageX-box.left-($that.width()/2))*strength*cnt*-1 - $(this).width()/2 + $that.width()/2;
									$(this).css({ 'left': offsetx+'px' });
								}
								if (options.axis == 'y' || options.axis == 'both'){
									var offsety = (event.pageY-box.top-($that.height()/2))*strength*cnt*-1 - $(this).height()/2 + $that.height()/2;
									$(this).css({ 'top': offsety+'px' });
								}
							
								cnt++;
							
							});
						}
						
					});

					break;
				case 'menu':
					
					$that.find("li").hover(function(){
						
				        $(this).addClass("hover");
				        $('ul:first',this).css('visibility', 'visible');
						
				    }, function(){
						
				        $(this).removeClass("hover");
				        $('ul:first',this).css('visibility', 'hidden');
						
				    }).on( 'click', function(){
						
						$(this).addClass("hover");
				        $('ul:first',this).css('visibility', 'visible');
						
					});

					break;
				case 'form':
					
					$that.append('<input type="hidden" name="'+s.prefix+'-requireds" id="'+s.prefix+'-requireds">');
					
					if (options.error != undefined) options.formerror = options.error;
					
					var requireds = [];
					
					$that.on('submit', function() {
					
						var errors = [];
					
						$(this).find('span.'+s.errorClass).remove();
						
						$(this).find("*[rel^=jKit], *["+s.dataAttribute+"]").each( function(){
							
							var rel = $(this).attr('rel');
							var data = $(this).attr(s.dataAttribute);
							
							if (data != undefined){
								var start = data.indexOf('[');
								var end = data.indexOf(']');
								var optionstring = data.substring(start+1, end);
							} else {
								var start = rel.indexOf('[');
								var end = rel.indexOf(']');
								var optionstring = rel.substring(start+1, end);
							}
							
							var options = plugin.parseOptions(optionstring);
							
							var type = options.type;
							var elerror = false; 
							var required = false;
						
							if (options.required == undefined) options.required = false;
						
							// required?
							if (options.required == 'true'){
								if ($(this).val() == ''){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'required' } );
								}
								required = true;
								if ($.inArray($(this).attr('name'), requireds) == -1){
									requireds.push($(this).attr('name'));
								}
							}
							
							if ((required || $(this).val() != '') || options.type == 'group'){
							
								// email?
								if (options.type == 'email' && !$.fn.jKit_emailCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'email' } );
								}
						
								// url (http:// or https://)?
								if (options.type == 'url' && !$.fn.jKit_urlCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'url' } );
								}
						
								// date?
								if (options.type == 'date' && !$.fn.jKit_dateCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'date' } );
								}
								
								// older?
								if (options.type == 'date' &&  (new Date($(this).val()).getTime() <= new Date($(options.older).val()).getTime()) ){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'older' } );
								}
								
								// younger?
								if (options.type == 'date' &&  (new Date($(this).val()).getTime() >= new Date($(options.younger).val()).getTime()) ){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'younger' } );
								}
							
								// time?
								if (options.type == 'time' && !$.fn.jKit_timeCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'time' } );
								}
							
								// phone number?
								if (options.type == 'phone' && !$.fn.jKit_phoneCheck($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'phone' } );
								}
						
								// float?
								if (options.type == 'float' && isNaN($(this).val())){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'float' } );
								}
						
								// int?
								if (options.type == 'int' && parseInt($(this).val()) != $(this).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'int' } );
								}
						
								// min (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.min != undefined && $(this).val() < options.min && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'min' } );
								}
						
								// max (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.max != undefined && $(this).val() > options.max && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'max' } );
								}
								
								// bigger than (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.bigger != undefined && $(this).val() > $(options.bigger).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'bigger' } );
								}
								
								// smaller than (numeric)?
								if ((options.type == 'int' || options.type == 'float') && options.smaller != undefined && $(this).val() < $(options.smaller).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'smaller' } );
								}
						
								// min (length)?
								if ((options.type != 'int' && options.type != 'float') && options.min != undefined && $(this).val().length < options.min && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'minlength' } );
								}
						
								// max (length)?
								if ((options.type != 'int' && options.type != 'float') && options.max != undefined && $(this).val().length > options.max && options.type != 'group'){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'maxlength' } );
								}
								
								// length (string)?
								if (options.length != undefined && $(this).val().length != options.length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'length' } );
								}
								
								// longer than (length)?
								if ((options.type != 'int' && options.type != 'float') && options.longer != undefined && $(this).val().length > $(options.longer).val().length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'longer' } );
								}
								
								// shorter than (length)?
								if ((options.type != 'int' && options.type != 'float') && options.shorter != undefined && $(this).val().length < $(options.shorter).val().length){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'shorter' } );
								}
						
								// strength (password, 0=bad, 100=perfect)?
								if (options.strength != undefined && $.fn.jKit_passwordStrength($(this).val()) < options.strength){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'strength' } );
								}
						
								// same (as other field)?
								if (options.same != undefined && $(this).val() != $(options.same).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'same' } );
								}
						
								// different (as other field)?
								if (options.different != undefined && $(this).val() != $(options.different).val()){
									elerror = true;
									errors.push( { 'element': $(this), 'error': 'different' } );
								}
							
								// extension (file)?
								if (options.type == 'extension'){
									var opts = options.options.split(s.delimiter);
									var filesplit = $(this).val().split('.');
									var ext = filesplit[filesplit.length-1];
									if ($.inArray(ext,opts) == -1) {
										elerror = true;
										errors.push( { 'element': $(this), 'error': 'ext' } );
									}
								}
								
								// group (is one checked)?
								if (options.type == 'group'){
									if (options.min != undefined || options.max != undefined){
										var checked = 0;
										$(this).children('input[type=checkbox][checked]').each( function(){
											checked++;
										});
										if ((options.min != undefined && options.min > checked) || (options.max != undefined && checked > options.max)){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'group' } );
										}
									} else {
										if ($(this).find("input[name='"+options.name+"']:checked").val() == undefined){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'group' } );
										}
									}
								}
							
								// custom (function call)?
								if (options.type == 'custom' && options.checkfunction != undefined){
									var fn = window[options.checkfunction];
									if(typeof fn === 'function') {
										if ( !fn( $(this).val() ) ){
											elerror = true;
											errors.push( { 'element': $(this), 'error': 'custom' } );
										}
									}
								}
							
							}
							
							if (elerror){
								if (options.error != undefined){
									$(this).after('<span class="'+s.errorClass+'">'+options.error+'</span>');
								}
								$(this).addClass(s.errorClass);
							} else {
								$(this).removeClass(s.errorClass);
							}
						
						});
						
						if (errors.length == 0){
							
							if (options.validateonly == "yes"){
								
								plugin.triggerEvent('complete', $that, options);
								
								return true;
								
							} else {
								var action = $(this).attr('action');
								
								$that.removeClass(s.errorClass);
								
								if (options.success == undefined) options.success = 'Your form has been sent.';
								
								$that.find('input#'+s.prefix+'-requireds').val(requireds.join(s.delimiter));
								
								$.post(action, $that.serialize(), function(data, textStatus, jqXHR) {
									$that.find('.'+s.errorClass).hide();
									if (data.sent != undefined && data.sent == true){
										if (options.success.charAt(0) == '#'){
											$that.html($(options.success).show());
										} else {
											$that.html('<p class="'+s.successClass+'">'+options.success+'</p>');
										}
										plugin.triggerEvent('complete', $that, options);
										if (options.macro != undefined) plugin.applyMacro($that, options.macro);
									} else {
										for (x in data.error){
											var field = data.error[x];
											$that.find('*[name='+field+']').addClass(s.errorClass).after('<span class="'+s.errorClass+'">'+options.error+'</span>');
										}
										plugin.triggerEvent('error', $that, options);
									}
								}).error(function(xhr, ajaxOptions, thrownError){ 
									alert(thrownError);
									$that.append('<span class="'+s.errorClass+'">There was an error submitting the form: Error Code '+xhr.status+'</span>');
								});
								
								return false;
								
							}
							
						} else {
							$that.addClass(s.errorClass);
							if (options.formerror != undefined){
								$that.append('<span class="'+s.errorClass+'">'+options.formerror+'</span>');
							}
							plugin.triggerEvent('error', $that, options);
							return false;
						}
						
					});
				
					break;
				case 'plugin':
					
					if (s.plugins[options.script] != undefined){
						
						options.functioncall = s.plugins[options.script]['fn'];
						if (s.plugins[options.script]['option'] != undefined){
							options.option = s.plugins[options.script]['option'];
						}
						
						options.script = s.plugins[options.script]['path'];
					}
					
					$.ajaxSetup({ cache: true });
					if (options.script != undefined){
						$.getScript(options.script, function() {
						
							if (options.option != undefined){
								$that[ options.functioncall ]( options[options.option] );
							} else {
								delete(options.type);
								delete(options.script);
								$that[ options.functioncall ]( options );
							}
							
							plugin.triggerEvent('complete', $that, options);
						
						});
					}
					$.ajaxSetup({ cache: false });
					
					break;
				case 'tooltip':
					
					if ($('div#'+s.prefix+'-tooltip').length == 0){
						$('<div/>', {
						    id: s.prefix+'-'+type
						}).hide().appendTo('body');
					}
					
					$tip = $('div#'+s.prefix+'-'+type);
					
					$that.on('mouseenter', function(e){
						
						if (options.classname != ''){
							$tip.html(options.text).removeClass().css({ 'background': '', 'color': '' }).addClass(options.classname);
						} else {
							$tip.html(options.text).removeClass().css({ 'background': options.background, 'color': options.color });
						}
						
						$tip.css('top', (e.pageY+15-$(window).scrollTop())).css('left', e.pageX).stop(true, true).fadeIn(200);
						
						plugin.triggerEvent('open', $that, options);
						
					}).on('mouseleave click', function(e){
						
						var speed = 200;
						if ($tip.is(':animated')){
							speed = 0;
						}
						
						$tip.stop(true, true).fadeOut(speed);
						
						plugin.triggerEvent('closed', $that, options);

					});
					
					break;
				case 'background':
					
					var $bg = $('<div/>', {
					    id: s.prefix+'-'+type
					}).css({ 
						'position': 'fixed', 
						'right': '0px', 
						'top': '0px', 
						'overflow': 'hidden',
						'z-index': '-1', 
						'width': $(window).width(), 
						'height': $(window).height() 
					}).appendTo('body');
					
					$bg.append($that);
					
					var ow = $that.attr('width');
					var oh = $that.attr('height');
					
					plugin.scaleFit($bg, $that, ow, oh, options.distort);
					
					$(window).resize(function() {
						plugin.scaleFit($bg, $that, ow, oh, options.distort);
						plugin.triggerEvent('resized', $that, options);
					});

					break;
				case 'lorem':
					
					var lorem = [
						'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
						'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
						'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
						'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
						'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
						'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
					];
					
					var text = '';
					
					if (options.random == "yes"){
						lorem = $.fn.jKit_arrayShuffle(lorem);
					}
					
					if (options.paragraphs > 0){
						for ( var i=1; i<=options.paragraphs; i++ ) {
							text += '<p>'+lorem[(i%7)-1]+'</p>';
						}
					} else {
						text = lorem[0];
						if (options.length != ''){
							text = text.substring(0, options.length-1);
						}
					}
					
					$that.html(text);
					
					break;
					
				case 'binding':
					
					window.setTimeout( function() { plugin.binding($that, options); }, 0);

					break;
					
				case 'limit':
					
					if (options.elements == 'children'){
						$that.children(':gt('+(options.count-1)+')').each(function(){	
							$(this).jKit_effect(false, options.animation, options.speed, options.easing);
						});
						setTimeout( function(){
							plugin.triggerEvent('complete', $that, options);
						}, options.speed);
					} else {
						var newtext = $that.text().substr(0,options.count);
						if (newtext != $that.text()){
							newtext = newtext.substr(0,newtext.length-options.endstring.length)+options.endstring;
							$that.text(newtext);
						}
					}

					break;
				case 'template':

					if (options.action == 'apply'){
						
						$el = $that;

						if (options.children != undefined && options.children != ''){
							
							$el = $that.children(options.children);
							
							var cnt = 0;
							$el.each( function(){
								cnt++;
								plugin.applyTemplate($(this), options, cnt, $el.length);
							});
						} else {
							plugin.applyTemplate($that, options);
						}
						
						if (options.dynamic == 'yes'){
							var $addDiv = $('<a/>', {
							    'class': s.prefix+'-'+type+'-add'
							}).html(options.addhtml).on( 'click', function(){
								
								$el = $($that.get(0));
								
								var cnt = $el.children(options.children).length + 1;
								
								$el.find('.if-entry-last').hide();
								plugin.applyTemplate($('<'+options.children+'/>').appendTo($el), options, cnt, cnt);
								
								plugin.triggerEvent('added', $that, options);
								
							}).insertAfter($that);
							
						}
						
					} else {

						if (templates[options.name] == undefined){
							templates[options.name] = [];
						}
						
						if (options.vars == undefined){
							var vars = [];
						} else {
							var vars = options.vars.split(s.delimiter);
						}
						
						templates[options.name] = { 'template': $that.detach(), 'vars': vars };
						
					}

					break;
					
			}
			
			return $that;
			
		};
		
		plugin.filterElements = function($el, options){
			
			var selections = []; 
			
			$el.find('.jkit-filter').each( function(){
				var vals = [];
				var valsplit = $(this).val().split(' ');
				$.each( valsplit, function(i,v){
					v = $.trim(v);
					if (v != '') vals.push(v);
				});
				selections = selections.concat(vals);
			});
			
			$el.find(options.affected).each( function(){
				
				var $current = $(this);
				
				if (selections.length > 0){
				
					var found = [];
										
					$.each( selections, function(i,v){
						if (options.by == 'class'){
							if ($current.hasClass(v)){
								found.push(v);
							}
						} else if (options.by == 'text'){
							if ($current.text().toLowerCase().indexOf(v.toLowerCase()) > -1){
								found.push(v);
							}
						}
					});
				
					if ( found.length == selections.length || (found.length > 0 && options.logic == 'or') ){
						$current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
					} else {
						$current.jKit_effect(false, options.animation, options.speed, options.easing, 0);
					}
					
				} else {
					$current.jKit_effect(true, options.animation, options.speed, options.easing, 0);
				}
				
			});
			
			setTimeout( function(){
				plugin.triggerEvent('complete', $el, options);
			}, options.speed);
			
		};
		
		plugin.readAPI = function($el, options){
			
			if (options.format == 'json'){
				
				$.ajax({
					type: "GET",
					url: options.url,
					contentType: "application/json; charset=utf-8",
					dataType: "jsonp",
					error: function(){
						plugin.triggerEvent('error', $el, options);
					},
					success: function(data) {
						
						if (options.template != ''){
							
							$el.html(templates[options.template].template.clone().show());
							$el.find('[data-jkit-api]').each(function(){
								var value = $(this).attr('data-jkit-api');
								try {
									$(this).text(eval('data.'+value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, '')));
								} catch(err) { }
							});
							$el.find('[data-jkit-api-if]').each(function(){
								var value = $(this).attr('data-jkit-api-if');
								var test = undefined;
								try {
									eval('test = data.'+value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, ''));
								} catch(err) { }
								if (test == undefined){
									$(this).remove();
								}
							});
							
						} else {
						
							if (options.value != ''){
								try {
									$el.text(eval('data.'+options.value.replace(/[^a-zA-Z0-9\.\[\]\_]+/g, '')));
								} catch(err) { }
							} else {
								$el.text(data);
							}
							
						}
						
						if (options.macro != undefined) plugin.applyMacro($el, options.macro);
						
						plugin.triggerEvent('complete', $el, options);
						
						if (options.interval > -1){
							setTimeout( function(){
								plugin.readAPI($el, options);
							}, options.interval*1000);
						}
						
					}
				});	
			}
			
		};
		
		plugin.triggerEvent = function(event, $el, options){
			
			if (options.commandkey !== undefined){
				
				var eventsplit = event.split(' ');
				
				$.each( eventsplit, function(i,v){
					$element.trigger(options.commandkey+'.'+v, { 'element': $el, 'options': options });
				});
				
			}
			
		};
		
		plugin.cssFromString = function(css){
			var partsplit = css.split(',');
			var cssdata = {};
			$.each( partsplit, function(i,v){
				var innersplit = v.split('(');
				if (innersplit.length == 2){
					var property = innersplit[0];
					var value = innersplit[1].slice(0,-1);
					cssdata[property] = value;
				}
			});
			return cssdata;
		};
		
		plugin.preFix = function(str){
			
			var lines = str.split("\n");
			var min = 9999;
			
			$.each( lines, function(i,v){
				if ($.trim(v) != ''){
					
					var cnt = -1;
					
					while(v.charAt(cnt+1) == "\t"){
						cnt++;
					}
					cnt++;
					
					if (cnt < min){
						min = cnt;
					}
					
				}
			});
			
			$.each( lines, function(i,v){
				lines[i] = v.substr(min);
			});
			
			return lines.join("\n");
		};
		
		plugin.ticker = function($el, options, messages, currentmessage, currentchar){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				var timer =  options.speed;
			
				currentchar++;
				if (currentchar > messages[currentmessage].text.length){
				
					timer = options.delay;
				
					currentmessage++;
					if (currentmessage >= messages.length){
						currentmessage = 0;
					}
					
					setTimeout( function(){
						plugin.triggerEvent('showentry showentry'+(currentmessage+1), $el, options);
					}, timer);
				
					currentchar = 0;
				
				} else {
					if (messages[currentmessage].href != undefined){
						$el.html('<a href="'+messages[currentmessage].href+'" target="'+messages[currentmessage].target+'">'+messages[currentmessage].text.substr(0,currentchar)+'</a>');
					} else {
						$el.html(messages[currentmessage].text.substr(0,currentchar));
					}
				}
			}
			
			window.setTimeout( function() { plugin.ticker($el, options, messages, currentmessage, currentchar); }, timer);
			
		};
		
		plugin.loadAndReplace = function(href, options, $el){
			
			var tempid = plugin.settings.prefix+'_ajax_temp_'+$.fn.jKit_getUnixtime();
			
			$(options.element).jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
				
				$(options.element).html('');
				
				jQuery('<div/>', {
				    id: tempid
				}).appendTo('body');
				
				$('#'+tempid).load(href+' '+options.element, function() {
					
					plugin.triggerEvent('complete', $el, options);
					
					$(options.element).html( $('#'+tempid+' '+options.element).html() );
					$(options.element).jKit_effect(true, options.animation, options.speed, options.easing);
					
					if (options.macro != undefined) plugin.applyMacro($(options.element), options.macro);
					
					$('#'+tempid).remove();
					
				});
				
			});
			
		};
		
		plugin.updateSrc = function($el, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
			
				var srcSplit = $el.attr('src').split('?');
			
				$el.attr('src', srcSplit[0]+'?t='+$.fn.jKit_getUnixtime());
				
			}
			
		};
		
		plugin.applyTemplate = function($el, options, cnt, entries){
			
			var content = {};
			$.each( templates[options.name].vars, function(i,v){
				var $subEls = $el.find('.'+v);
				plugin.init($subEls);
				if ($subEls.val() != ''){
					content[v] = $subEls.val();
				} else {
					content[v] = $subEls.html();
				}
			});
			
			$el.html(templates[options.name].template.clone().show());
			
			$el.find('[class^="if-entry-"]').hide();
			
			plugin.renameDynamicAttributes($el, cnt);
			
			$.each( templates[options.name].vars, function(i,v){
				
				var $subEl = $el.find('.'+v);
				
				if ($subEl.is("input") || $subEl.is("select") || $subEl.is("textarea")){
					$subEl.val(content[v]);
				} else {
					$subEl.html(content[v]);
				}
				
				if (content[v] == undefined && $el.find('.if-'+v).length > 0){
					$el.find('.if-'+v).remove();
				}
				
				if (cnt == 1) $el.find('.if-entry-first').show();
				if (cnt == entries) $el.find('.if-entry-last').show();
				$el.find('.if-entry-nr-'+cnt).show();
				
			});
			
		};
		
		plugin.renameDynamicAttributes = function($el, cnt){
			$el.find('[class^="dynamic-"]').each( function(){
				
				var $subEl = $(this);
				var classList = $(this).attr('class').split(/\s+/);
				
				$.each( classList, function(i,v){
					
					var attribute = v.substr(8);
					
				    if (attribute != '' && $subEl.attr(attribute)){
						
						var currentAttr = $subEl.attr(attribute);
						var pos = currentAttr.lastIndexOf('_');
						if (pos > -1){
							currentAttr = currentAttr.substr(0,pos);
						}
					
						$subEl.attr(attribute, currentAttr+'_'+cnt);
						
					}
					
				});
				
			});
		};

		plugin.binding = function(el, options){
			
			if (windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus){
				
				if (options.value == undefined){
					if (options.selector != ''){
						var selsplit = options.selector.split('|');
						var sourcesplit = options.source.split('.');
					
						var values = [];
						$.each(selsplit, function(i, v) { 
							
							if (v == 'this'){
								v = el;
							} else if (v == 'parent'){
								v = $(el).parent().get(0);
							}
							
							$(v).each( function(){
								
								switch(sourcesplit[0]){
									case 'event':
										$(this).on( sourcesplit[1], function(e){
											options.value = 1;
											plugin.binding(el, options);
											if (options.macro != undefined) plugin.applyMacro($(el), options.macro);
										});
										break;
									case 'html':
										var temp = $(this).html();
										break;
									case 'text':
										var temp = $(this).text();
										break;
									case 'attr':
										var temp = $(this).attr(sourcesplit[1]);
										break;
									case 'css':
										if (sourcesplit[1] == 'height'){
											var temp = $(this).height();
										} else if (sourcesplit[1] == 'innerHeight'){
											var temp = $(this).innerHeight();
										} else if (sourcesplit[1] == 'outerHeight'){
											var temp = $(this).outerHeight();
										} else if (sourcesplit[1] == 'width'){
											var temp = $(this).width();
										} else if (sourcesplit[1] == 'innerWidth'){
											var temp = $(this).innerWidth();
										} else if (sourcesplit[1] == 'outerWidth'){
											var temp = $(this).outerWidth();
										} else if (sourcesplit[1] == 'scrollTop'){
											var temp = $(this).scrollTop();
										} else if (sourcesplit[1] == 'scrollLeft'){
											var temp = $(this).scrollLeft();
										} else {
											var temp = $(this).css(sourcesplit[1]);
										}
										break;
									case 'scroll':
								
										switch(sourcesplit[1]){
											case 'top':
												var temp = $(window).scrollTop();
												break;
											case 'left':
												var temp = $(window).scrollLeft();
												break;
										}
								
										break;
									case 'clearance':
								
										var cTop = el.offset().top-$(window).scrollTop();
										var cBottom = $(window).scrollTop() + $(window).height() - ( el.offset().top + el.height() );
								
										var cRight = ($(window).width() + $(window).scrollLeft()) - (el.offset().left + el.width());
										var cLeft = el.offset().left - $(window).scrollLeft();
								
										switch(sourcesplit[1]){
											case 'bottom':
												var temp = cBottom;
												break;
											case 'top':
												var temp = cTop;
												break;
											case 'right':
												var temp = cRight;
												break;
											case 'left':
												var temp = cLeft;
												break;
											default:
												var temp = Math.min.apply(Math, [ cBottom, cTop, cRight, cLeft ]);
										}
								
										break;
									case 'has':
										
										switch(sourcesplit[1]){
											case 'class':
												var temp = $(this).hasClass(options.search);
												break;
											case 'text':
												var temp = $.fn.jKit_stringOccurrences($(this).text().toLowerCase(), options.search.toLowerCase());
												break;
											case 'attribute':
												var temp = ($(this).attr(options.search) !== undefined);
												break;
											case 'val':
												var temp = $.fn.jKit_stringOccurrences($(this).val().toLowerCase(), options.search.toLowerCase());
												break;
											case 'element':
												var temp = $(this).find(options.search).length;
												break;
											case 'children':
												var temp = $(this).children(options.search).length;
												break;
										}
										
										break;
									case 'val':
									default:
										var temp = $(this).val();
								}
								
								values.push(temp);
								
							});
						});
					
						if (sourcesplit[2] != undefined){
							var value = '';
						
							switch(sourcesplit[2]){
								case 'max':
									value = Math.max.apply(Math, values);
									break;
								case 'min':
									value = Math.min.apply(Math, values);
									break;
								case 'sum':
									value = values.reduce(function(a,b){return a+b;});
									break;
								case 'avg':
									value = values.reduce(function(a,b){return a+b;}) / values.length;
									break;
							}
						
						} else {
							var value = values[0];
						}
					
					} else if (options.variable != ''){
						var value = window[options.variable];
					}
				} else {
					value = options.value;
				}
				
				if (options.condition != ''){
					var doit = false;
					eval('if ('+options.condition.replace(/[^a-zA-Z 0-9\<\>\=\.\!]+/g, '')+') doit = true;');
				} else {
					var doit = true;
				}
				
				if (!doit && options['else'] != ''){
					doit = true;
					value = options['else'];
				} else if (doit && options['if'] != ''){
					doit = true;
					value = options['if'];
				}
				
				if (doit){
					if (options.math != ''){
						eval('value = '+options.math.replace(/[^a-zA-Z 0-9\+\-\*\/\.]+/g, '')+';');
					}
				
					var modesplit = options.mode.split('.');
					switch(modesplit[0]){
						case 'text':
							el.text(value);
							break;
						case 'html':
							el.html(value);
							break;
						case 'val':
							el.val(value);
							break;
						case 'attr':
							el.attr(modesplit[1], value);
							break;
						case 'css':
							if (modesplit[1] == 'display' && ($.trim(value) == '' || $.trim(value) == 0)){
								value = 'none';
							}
							if (options.speed > 0){
								var style = {};
								style[modesplit[1]] =  value;
								el.animate(style, options.speed, options.easing);
							} else {
								el.css(modesplit[1], value);
							}
							break;
						default:
							if (modesplit[0] != undefined){
								var fn = window[modesplit[0]];
								if(typeof fn === 'function') {
									fn(value,el);
								}
							}
					}
				}
				
			}
			
			if (options.interval != -1){
				window.setTimeout( function() { plugin.binding(el, options); }, options.interval);
			}
			
		};

		plugin.fixSpeed = function(speed){
			
			if (speed != 'fast' && speed != 'slow'){
				speed = parseInt(speed);
			}
			
			return speed;
		};

		plugin.loop = function($that, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($that.jKit_inViewport() || !$that.jKit_inViewport && plugin.settings.ignoreViewport)){
				
				plugin.triggerEvent('show', $that, options);
				
				$that.jKit_effect(true, options.animation, options.speed1, options.easing1, options.duration1, function(){
					plugin.triggerEvent('hide', $that, options);
					$that.jKit_effect(false, options.animation, options.speed2, options.easing2, options.duration2, plugin.loop($that, options));
				});
				
			} else {
				window.setTimeout( function() { plugin.loop($that, options); }, 100);
			}
			
		};

		plugin.scaleFit = function(bg, element, originalWidth, originalHeight, distort){
			
			var w = $(window).width();
			var h = $(window).height();
			
			bg.css({ 
				'width': w+'px', 
				'height': h+'px'
			});
			
			var top = 0;
			var left = 0;
			
			if (distort == 'no'){
				
				var imgRatio = originalWidth / originalHeight;
				var screenRatio = w / h;
				
				if (imgRatio > screenRatio){
					w = h * imgRatio;
					left = (w - $(window).width()) / 2 * -1;
				} else {
					h = w / imgRatio;
					top = (h - $(window).height()) / 2 * -1;
				}
				
			}
			
			element.css({ 
				'position': 'fixed',
				'top': top+'px',
				'left': left+'px',
				'width': w+'px', 
				'height': h+'px'
			});
			
		};
		
		plugin.carousel = function($el, options, dir){
			
			if (dir != undefined){
				options.autoplay = false;
			}
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && ($el.jKit_inViewport() || !$el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				
				var isAnimated = false;
				$el.children().each( function(){
					if ( $(this).is(':animated') ) {
						isAnimated = true;
					}
				});
				
				if (!isAnimated){
					if (dir == 'next' || dir == undefined){
						
						plugin.triggerEvent('shownext', $el, options);
					
						$el.children(':nth-child(1)').jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
							$el.append($el.children(':nth-child(1)'));
						});
					
						$el.children(':nth-child('+(options.limit+1)+')').jKit_effect(true, options.animation, options.speed, options.easing, 0);
					
					} else if (dir == 'prev'){
						
						plugin.triggerEvent('showprev', $el, options);
					
						$el.prepend( $el.children(':last-child') );
					
						$el.children(':first-child').jKit_effect(true, options.animation, options.speed, options.easing, 0);
						$el.children(':nth-child('+(options.limit+1)+')').jKit_effect(false, options.animation, options.speed, options.easing, 0);
					
					}
				}
				
				if (options.autoplay == 'yes'){
					window.setTimeout( function() { plugin.carousel($el, options); }, options.interval);
				}
				
			} else {
				window.setTimeout( function() { plugin.carousel($el, options); }, options.interval);
			}
			
		};

		plugin.slideshow = function(slides, current, el, options){
			
			if ($.data(el, 'anim')){
				if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)){
			
					if (current < (slides.length-1)){
						current++;
					} else {
						current = 0;
					}
					
					plugin.triggerEvent('hideentry hideentry'+(current+1), el, options);
					
					el.jKit_effect(false, options.animation, options.speed, options.easing, 0, function(){
						el.html(slides[current]);
						
						plugin.triggerEvent('showentry showentry'+(current+1), el, options);
						
						el.jKit_effect(true, options.animation, options.speed, options.easing, 0, function(){
							window.setTimeout( function() { plugin.slideshow(slides, current, el, options); }, options.interval);
						});
					});
				
				} else {
					window.setTimeout( function() { plugin.slideshow(slides, current, el, options); }, options.interval);
				}
			}
			
		};
		
		plugin.animation = function(frames, current, el, options){
			
			if ((windowhasfocus || !windowhasfocus && plugin.settings.ignoreFocus) && (el.jKit_inViewport() || !el.jKit_inViewport() && plugin.settings.ignoreViewport)){
				
				plugin.triggerEvent('showframe showframe'+(current+1), el, options);
				
				$.each( frames, function(index, value){
					if (value.start == current){
					
						el.html(value.el.clone());
						var duration = (value.end - value.start) * options.interval;
					
						if (value.action == 'fadeout'){
							el.children(":first").show().fadeTo(duration, 0, value.easing);
						} else if (value.action == 'fadein'){
							el.children(":first").hide().fadeTo(duration, 1, value.easing);
						} else if (value.action == 'fadeinout'){
							el.children(":first").hide().fadeTo(duration/2, 1, value.easing).fadeTo(duration/2, 0, value.easing);
						} else if (value.action == 'tween'){
							var next = frames[index+1].el;
							el.children(":first").animate({
								'font-size': next.css('font-size'),
								'letter-spacing': next.css('letter-spacing'),
								'color': next.css('color'),
								'opacity': next.css('opacity'),
								'background-color': next.css('background-color'),
								'padding-top': next.css('padding-top'),
								'padding-bottom': next.css('padding-bottom'),
								'padding-left': next.css('padding-left'),
								'padding-right': next.css('padding-right')
							}, duration, value.easing);
						}
					
					}
				})
				
				current++;
				var nextloop = false;
				if (current > options.lastframe){
					current = 0;
					nextloop = true;
				}
			
				if ((nextloop && options.loop == "yes") || !nextloop){
					window.setTimeout( function() { plugin.animation(frames, current, el, options); }, options.interval);
				}
				
				if (options.loop == "no"){
					if (options.macro != undefined) plugin.applyMacro(el, options.macro);
					plugin.triggerEvent('complete', el, options);
				}
				
			} else {
				window.setTimeout( function() { plugin.animation(frames, current, el, options); }, options.interval);
			}
			
		};
	
		plugin.closeLightbox = function(){
			$('.'+plugin.settings.prefix+'-lightbox-el').fadeTo('fast', 0, function(){
				$(this).remove();
			});
		};
		
		plugin.addKeypressEvents = function($el, code){
			if (plugin.settings.keyNavigation){
				$(document).keydown(function(e){
					
					if ( this !== e.target && (/textarea|select/i.test( e.target.nodeName ) || e.target.type === "text") ) return;
					
					var keys = {
						8: "backspace", 
						9: "tab", 
						13: "return", 
						16: "shift", 
						17: "ctrl", 
						18: "alt", 
						19: "pause",
						20: "capslock", 
						27: "esc", 
						32: "space", 
						33: "pageup", 
						34: "pagedown", 
						35: "end", 
						36: "home",
						37: "left", 
						38: "up", 
						39: "right", 
						40: "down", 
						45: "insert", 
						46: "del", 
						96: "0", 
						97: "1", 
						98: "2", 
						99: "3", 
						100: "4", 
						101: "5", 
						102: "6", 
						103: "7",
						104: "8", 
						105: "9", 
						106: "*", 
						107: "+", 
						109: "-", 
						110: ".", 
						111 : "/", 
						112: "f1", 
						113: "f2", 
						114: "f3", 
						115: "f4", 
						116: "f5", 
						117: "f6", 
						118: "f7", 
						119: "f8", 
						120: "f9", 
						121: "f10", 
						122: "f11", 
						123: "f12", 
						144: "numlock", 
						145: "scroll", 
						191: "/", 
						224: "meta"
					};
					
					for(var i=48; i<=90; i++){
						keys[i] = String.fromCharCode(i).toLowerCase();
					}
					
					if ($.inArray(e.which, keys)){
						
						var special = '';
						if (e.altKey) special += 'alt+';
						if (e.ctrlKey) special += 'ctrl+';
						if (e.metaKey) special += 'meta+';
						if (e.shiftKey) special += 'shift+';
						
						var keycode = special+keys[e.which];
						
						if (keycode == code){
							$el.trigger(special+keys[e.which]);
							e.preventDefault();
						}
						
					}
					
				});
			}
		}
		
        plugin.init();
		
    };

	$.fn.jKit_effect = function(show, type, speed, easing, delay, fn){
		return this.each(function() {
        	if (fn == undefined) fn = function(){};
			if (delay == undefined) delay = 0;
			
			if (type == 'fade'){
				if (show){
					$(this).delay(delay).fadeTo(speed, 1.0, easing, fn);
				} else {
					$(this).delay(delay).fadeTo(speed, 0, easing, fn);
				}
			} else if (type == 'slide'){
				if (show){
					$(this).delay(delay).slideDown(speed, easing, fn);
				} else {
					$(this).delay(delay).slideUp(speed, easing, fn);
				}
			} else if (type == 'none'){
				if (show){
					$(this).delay(delay).show();
				} else {
					$(this).delay(delay).hide();
				}
				fn();
			} else {
				if (show){
					$(this).delay(delay).show(speed, easing, fn);
				} else {
					$(this).delay(delay).hide(speed, easing, fn);
				}
			}
		});
	};

	$.fn.jKit_getUnixtime = function(){
		var now = new Date;
		var unixtime_ms = now.getTime();
		return parseInt(unixtime_ms / 1000);
	};
	
	$.fn.jKit_arrayShuffle = function(arr){
		var tmp, rand;
		for(var i =0; i < arr.length; i++){
			rand = Math.floor(Math.random() * arr.length);
			tmp = arr[i]; 
			arr[i] = arr[rand]; 
			arr[rand] = tmp;
		}
		return arr;
	};
	
	$.fn.jKit_stringOccurrences = function(string, substring){
		
		var n = 0;
		var pos = 0;
		
		while (true){
			pos = string.indexOf(substring, pos);
			if (pos != -1) {
				n++;
				pos += substring.length;
			} else {
				break;
			}
		}
		
		return (n);
		
	};
	
	$.fn.jKit_emailCheck = function(string){
		var filter = /^[a-z0-9\._-]+@([a-z0-9_-]+\.)+[a-z]{2,6}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_urlCheck = function(string){
		var filter = /^(?:(ftp|http|https):\/\/)?(?:[\w\-]+\.)+[a-z]{2,6}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_dateCheck = function(string){
		var filter = /^[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_timeCheck = function(string){
		var filter = /^[0-9]{1,2}\:[0-9]{2}$/i;
		return filter.test(string);
	};
	
	$.fn.jKit_phoneCheck = function(string){
		var filter = /^(\+|0)[\d ]+(-\d*)?\d$/;
		return filter.test(string);
	};

	$.fn.jKit_passwordStrength = function(passwd){
		var intScore = 0
		
		if (passwd.length < 5){
			intScore = intScore + 5;
		} else if (passwd.length > 4 && passwd.length < 8){
			intScore = intScore + 15;
		} else if (passwd.length >= 8){
			intScore = intScore + 30;
		}
		
		if (passwd.match(/[a-z]/)) intScore = intScore + 5;
		if (passwd.match(/[A-Z]/)) intScore = intScore + 10;
		if (passwd.match(/\d+/)) intScore = intScore + 10;
		if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) intScore = intScore + 10;
		if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) intScore = intScore + 10;
		if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) intScore = intScore + 10;
		if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) intScore = intScore + 5;
		if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) intScore = intScore + 5;
		if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) intScore = intScore + 5;
		
		return intScore;
	};
	
	$.fn.jKit_getAttributes = function(){
		return this.each(function() {
        	var map = {};
            var attributes = $(this)[0].attributes;
            var aLength = attributes.length;
			
            for (var a = 0; a < aLength; a++) {
                  map[attributes[a].name.toLowerCase()] = attributes[a].value;
            }
			
            return map;
		});
	};
	
	$.fn.jKit_setAttributes = function(attr){
		return this.each(function() {
        	$.each( attr, function(i,v){
				try {
					$(this).attr(String(i),String(v));
				} catch(err) {}
			});
		});
	};
	
	$.fn.jKit_iOS = function(){
		return navigator.userAgent.match(/(iPod|iPhone|iPad)/i);
	};

	$.fn.jKit_belowTheFold = function(){
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(this).offset().top;
	};
	
	$.fn.jKit_aboveTheTop = function(){
		var top = $(window).scrollTop();
		return top >= $(this).offset().top + $(this).height();
	};
	
	$.fn.jKit_rightOfScreen = function(){
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(this).offset().left;
	};
	
	$.fn.jKit_leftOfScreen = function(){
		var left = $(window).scrollLeft();
		return left >= $(this).offset().left + $(this).width();
	};
	
	$.fn.jKit_inViewport = function(){
        return !$(this).jKit_belowTheFold() && !$(this).jKit_aboveTheTop() && !$(this).jKit_rightOfScreen() && !$(this).jKit_leftOfScreen();
	};
	

    $.fn.jKit = function(options, moreoptions) {

        return this.each(function() {
            var plugin = new $.jKit(this, options, moreoptions);
			$(this).data('jKit', plugin);
        });

    };

})(jQuery);