angular
    .module('ngCkeditor', [])
    .directive('ckeditor', function() {
    var index = 0;
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: false,
        link: function(scope, element, attrs, ngModel) {
            var expression = attrs.ngModel;
            var el = $(element);

            if (angular.isUndefined(CKEDITOR) || angular.isUndefined(CKEDITOR.instances)) {
                return;
            }

            /*var basePath = CKEDITOR.basePath;
            basePath = basePath.substr(0, basePath.indexOf("ckeditor/"));
            (function() {
                CKEDITOR.plugins.addExternal('aspell',basePath+'../src/plugins/aspell/', 'plugin.js');
                CKEDITOR.plugins.addExternal('aspell',basePath+'../src/plugins/youtube/', 'plugin.js');
            })();
*/
            var options = {
                toolbar: 'full',
                toolbar_full:
                [
                    { name: 'basicstyles', items : [ 'Bold','Italic','Strike','Underline' ] },
                    { name: 'paragraph', items : [ 'BulletedList','NumberedList','Blockquote' ] },
                    { name: 'editing', items : ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock' ] },
                    { name: 'links', items : [ 'Link','Unlink','Anchor' ] },
                    { name: 'tools', items : [ 'SpellChecker','Maximize' ] },
                    '/',
                    { name: 'styles', items : [ 'Format','FontSize','TextColor','PasteText','PasteFromWord','RemoveFormat' ] },
                    { name: 'insert', items : [ 'Image','Table','SpecialChar' ] },
                    { name: 'forms', items : [ 'Outdent','Indent' ] },
                    { name: 'clipboard', items : [ 'Undo','Redo' ] },
                    { name: 'document', items : [ 'PageBreak','Source' ] }
                    /*{ name: 'colors', items : ['bazalt-image'] },*/
                ],
                disableNativeSpellChecker: false,
                uiColor: '#FAFAFA',
                height: '400px',
                width: '100%'//,
                //extraPlugins: "youtube,aspell" //"backup,onchange"
            };
            CKEDITOR.config.spellerPagesServerScript = '/examples/spellcheck/handler.php';
            options = angular.extend(options, scope[attrs.ckeditor]);
            var instance = CKEDITOR.replace(el.get(0), options);

            element.bind('$destroy', function() {
                instance.destroy(false);
            });
            instance.on('instanceReady', function() {
                instance.setData(ngModel.$viewValue);
            });
            instance.on('pasteState', function() {
                ngModel.$setViewValue(instance.getData());
            });
            instance.on('change', function() {
                ngModel.$setViewValue(instance.getData());
                if (!scope.$$phase) {
                    scope.$apply();
                }
            });

            ngModel.$render = function(value) {
                instance.setData(ngModel.$viewValue);
            };

            scope.$watch(expression, function (val) {
                if (!instance) return;
                if (scope[expression] == instance.getData()) return;
                instance.setData(ngModel.$viewValue);
            });
            scope.$watch(function() {
                if (!element) {
                    return null;
                }
                return instance.getData();
            }, function (val) {
                ngModel.$setViewValue(instance.getData());
            });
            instance.on('blur', function(e) {
                if (!scope.$$phase) {
                    scope.$apply();
                }
            });
        }
    };
});
CKEDITOR.plugins.add('backup',{
    init:function(editor){
        editor.on( 'instanceReady', function(e) { 
            var div = document.createElement('div'),
                select = 0,
                style =  'display:inline-block; margin-left:10px;position:relative;margin-top:5px;overflow:hidden;float:right;',
                bname =  'backup_'+editor.name, init = true, oldtext = '';
            div.setAttribute('style',style);
            if( localStorage.getItem( bname) == undefined )
                localStorage.setItem( bname,'{}'); // создаем наше хранилище
            var format = function(_time){
                var n = new Date(parseInt(_time));
                var frm = function(dd){
                    if ( dd < 10 ) dd = '0' + dd;
                    return dd;
                };
                return n.getHours()+'.'+frm(n.getMinutes())+'.'+frm(n.getSeconds());
            };
            editor.backup = function(del){
                var chages = false,now = new Date().getTime(),bu = {};
                if(del!='del'){
                    var text = editor.getSnapshot();
                    if( text!='' ){
                        if( localStorage.getItem( bname) && oldtext && text!=oldtext ){
                            bu = JSON.parse(localStorage.getItem( bname));
                            bu[now] = text;
                            localStorage.setItem( bname,JSON.stringify(bu));
                            chages = true;
                        }
                    }
                }else{
                    if( confirm('Вы уверены, что хотите удалить весь бекап?') ){
                        localStorage.setItem( bname,'{}');
                        chages = true;
                    }
                }
                if( chages || init){
                    if(init&&localStorage.getItem( bname)){
                        bu = JSON.parse(localStorage.getItem( bname));
                    }
                    var opt = '<option>---</option>';
                    for(var r in bu)
                        opt+='<option value="'+r+'">'+format(r)+'</option>';
                    select.setHtml(opt);
                    init = false;
                }
                oldtext = text;
            },
            editor.restore = function(){
                var text = editor.getSnapshot();
                var val = select.getValue();
                var bu = JSON.parse( localStorage.getItem( bname) );
                if( bu[val]!=undefined && (text==''||confirm('Вы уверены, что хотите заменить имеющийся текст, текстом из бекапа?')) ){
                    editor.loadSnapshot( bu[val] );
                }
            };
            var mixer = 0;
            editor.on( 'change',function(){
                clearTimeout(mixer);
                mixer = setTimeout(function(){
                    editor.backup();
                },3000);
            });
            div.innerHTML = '<select style="margin-top:-5px;" id="backuper_'+editor.name+'"></select>&nbsp;<input type="image" value="del" onclick="CKEDITOR.instances[\''+editor.name+'\'].backup(\'del\'); return false;" src="'+CKEDITOR.basePath+'plugins/backup/clear.png"/>';
            div.onchange = editor.restore;
            CKEDITOR.document.getById( editor.ui.spaceId?editor.ui.spaceId("bottom"): 'cke_bottom_'+editor.name ).append(new CKEDITOR.dom.node(div));
            select = CKEDITOR.document.getById( 'backuper_'+editor.name );
            editor.backup();
        });
    }
});
/*
 * @file change event plugin for CKEditor
 * Copyright (C) 2011 Alfonso Martнnez de Lizarrondo
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 */

 // Keeps track of changes to the content and fires a "change" event
CKEDITOR.plugins.add( 'onchange',
{
	init : function( editor )
	{
//		// Test:
//		editor.on( 'change', function(e) { console.log( e ) });

		var timer,
			theMutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
			observer;
// http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#mutation-observers
// http://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/

		// Avoid firing the event too often
		function somethingChanged()
		{
			// don't fire events if the editor is readOnly as they are false detections
			if (editor.readOnly)
				return;

			if (timer)
				return;

			timer = setTimeout( function() {
				timer = 0;
				editor.fire( 'change' );
			}, editor.config.minimumChangeMilliseconds || 100);
		}
		// Kill the timer on editor destroy
		editor.on( 'destroy', function() { if ( timer ) clearTimeout( timer ); timer = null; });

		// in theory this block should be enabled only for browsers that don't support MutationObservers,
		// but it doesn't seem to fire correctly in all the situations. Maybe in the future...
		{
			// Set several listeners to watch for changes to the content
			editor.on( 'saveSnapshot', function( evt )
			{
				if ( !evt.data || !evt.data.contentOnly )
					somethingChanged();
			});

			var undoCmd = editor.getCommand('undo');
			undoCmd && undoCmd.on( 'afterUndo', somethingChanged);
			var redoCmd = editor.getCommand('redo');
			redoCmd && redoCmd.on( 'afterRedo', somethingChanged);

			editor.on( 'afterCommandExec', function( event )
			{
				if ( event.data.name == 'source' )
					return;

				if ( event.data.command.canUndo !== false )
					somethingChanged();
			} );
		}

		if ( theMutationObserver )
		{
			observer = new theMutationObserver( function( mutations ) {
				somethingChanged();
			} );

			// To check that we are using a cool browser.
			if (window.console && window.console.log)
				console.log("Detecting changes using MutationObservers");
		}

		// Changes in WYSIWYG mode
		editor.on( 'contentDom', function()
			{
				if ( observer )
				{
					// A notification is fired right now, but we don't want it so soon
					var interval = setInterval( function() {
						if ( typeof editor.document === 'object' ) {
							observer.observe( editor.document.getBody().$, {
								attributes: true,
								childList: true,
								characterData: true
							});
							clearInterval(interval);
						}
					}, 100);
				}

				editor.document.on( 'keydown', function( event )
					{
						// Do not capture CTRL hotkeys.
						if ( event.data.$.ctrlKey ||event.data.$.metaKey )
							return;

						var keyCode = event.data.$.keyCode;
						// Filter movement keys and related
						if (keyCode==8 || keyCode == 13 || keyCode == 32 || ( keyCode >= 46 && keyCode <= 90) || ( keyCode >= 96 && keyCode <= 111) || ( keyCode >= 186 && keyCode <= 222) || keyCode == 229)
							somethingChanged();
					});

					// Firefox OK
				editor.document.on( 'drop', somethingChanged);
					// IE OK
				editor.document.getBody().on( 'drop', somethingChanged);
			});

		// Detect changes in source mode
		editor.on( 'mode', function( e )
			{
				if ( editor.mode != 'source' )
					return;

				var textarea = (editor.textarea || editor._.editable);
				textarea.on( 'keydown', function( event )
					{
						// Do not capture CTRL hotkeys.
						if ( !event.data.$.ctrlKey && !event.data.$.metaKey )
							somethingChanged();
					});

				textarea.on( 'drop', somethingChanged);
				textarea.on( 'input', somethingChanged);
				if (CKEDITOR.env.ie)
				{
					textarea.on( 'cut', somethingChanged);
					textarea.on( 'paste', somethingChanged);
				}
			});

	} //Init
} );
angular.module('ngCkeditor').run(['$templateCache', function ($templateCache) {
}]);