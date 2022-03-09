/*jshint eqeqeq:false */
/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin
$.jgrid.extend({
	setupFrozenRows : function ( options ){
		var prm = $.extend({
			first : 0,
			last : 0,
			//rowids :[],
			saveFirstLastId : false,
			classes : ""
		}, options || {});

		return this.each(function(){
			// restrictions
			if(this.p.subGrid === true ||
				this.p.treeGrid === true ||
				this.p.cellEdit === true ||
				/*$t.p.sortable ||*/ 
				this.p.scroll ||
				this.p.frozenColumns === true ||
				this.p.frozenRows === true||
				this.p.grouping === true)
			{
				return;
			}
			if(prm.first <= 0 && prm.last <= 0 && prm.rowids.length ===0 ) {
				return;
			}


			var $t = this, i, j,
				borderbox = $("#gbox_"+$.jgrid.jqID($t.p.id)).css("box-sizing") === 'border-box',
				pixelfix = borderbox ? 0 : 1,
				tid = '#'+$.jgrid.jqID($t.p.id),
				tvid ='#gview_'+$.jgrid.jqID($t.p.id),
				hth = $(".ui-jqgrid-htable", tvid).height(),//Get the height of the column header to set the top value
				htw = $(tvid).width(),//Get the width of the content
				frowms = [],//store frozen rows
				fbDiv = $('<div style="position:absolute;left:0px;top:'+(hth+pixelfix)+'px;height:0px;overflow-x:hidden;" class="frozen-rdiv ui-jqgrid-rdiv"></div>');

			$(tvid).append(fbDiv);
			$('.frozen-rdiv', tvid).css('width',htw-($.jgrid.scrollbarWidth()+2));
			frowms.push($('.jqgfirstrow', tid).clone(true));

			if(prm.rowids && prm.rowids.length > 0 ) {
				for( i =0;i<prm.rowids.length; i++ ) {
					j = $t.rows.length;
					while( j-- ) {
						if($t.rows[j].id === prm.rowids[i]) {
							frowms.push($($t.rows[j]).clone(true));
							$($t.rows[j]).insertBefore($t.rows[i+1]);
							break;
						}
					}
				}
			} else if(prm.first > 0) {
				for(i = 0; i < prm.first; i++) {
					frowms.push($($t.rows[i+1]).clone(true));
					if(prm.saveFirstLastId) {
						if(!prm.rowids) {
							prm.rowids =[];
						}
						prm.rowids.push($t.rows[i+1].id);
					}
				}
			} else if(prm.last > 0) {
				j = $t.rows.length;
				for(i = 0; i < prm.last; i++) {
					frowms.splice(1,0,$($t.rows[j-1]).clone(true));
					if(prm.saveFirstLastId) {
						if(!prm.rowids) {
							prm.rowids =[];
						}
						prm.rowids.unshift($t.rows[j-1].id);
					}
					$($t.rows[j-1]).insertBefore($t.rows[1]);
				}
			} else {
				return;
			}

			fbDiv.css("height", 'auto');
			var out = $(tid).clone(true);//Get the <table><tbody></tbody></table> tag
			out.children('tbody').empty();

			for(var j = 0 ,len = frowms.length; j <len; j++){//Loop insert the cloned row into the <tbody></tbody> tag
				frowms[j].addClass(prm.classes).appendTo(out);
			}
			out.appendTo(fbDiv);
			var tfid = $t.p.id +"_fr";
			$(tid, fbDiv).attr("id", tfid);
			tfid = '#'+$.jgrid.jqID(tfid);

			/*
			* Set the events required in freezing
			* */
			var getstyle = $.jgrid.getMethod("getStyleUI"),
			stylemodule = $t.p.styleUI + ".common",
			//disabled = getstyle(stylemodule,'disabled', true),
			highlight = getstyle(stylemodule,'highlight', true),
			hover = getstyle(stylemodule,'hover', true);

			$('.frozen-rdiv', tvid).on('click','tr',function(){//click on the frozen line to add a highlight effect
				var index = $(this).index();
				$(this).addClass(highlight).siblings().removeClass(highlight);
				$('.frozen-rdiv tr').eq(index).addClass(highlight).siblings().removeClass(highlight);
			});

			$(tfid).on('click',function(){//When the click is a frozen column, the highlighting effect of the frozen column is clear
				$('.frozen-rdiv tbody').children('tr').each(function(){
					$(this).removeClass(highlight);
				});
			});

			var bdiv = $(tvid +" .ui-jqgrid-bdiv").first();
			bdiv.on('scroll', function(){//Set the left and right scroll of the frozen line
				var curX = this.scrollLeft;
				$('.frozen-rdiv').scrollLeft(curX);
			});

			$('.frozen-rdiv tr').hover(//Set the effect of moving the mouse on the frozen line
				function(){
					var index = $(this).index();
					$('.frozen-rdiv tr').eq(index).addClass(hover);
				},
				function(){
					var index = $(this).index();
					$('.frozen-rdiv tr').eq(index).removeClass(hover);
				}
			);
			if($t.p.rownumbers) {
				var find_index = false;
				try {
					$($t.rows[0].cells).each(function(k){
						if( $(this).hasClass('jqgrid-rownumber')) {
							find_index = k;
							return false;
						}
					});
					if(find_index !== false) {
						j = $t.rows.length;
						i=1;
						while (i<j) {
							$($t.rows[i].cells[find_index]).html( i );
							i++;
						}
						j = $(tfid)[0].rows.length;
						i=1;					
						while (i<j) {
							$(tfid)[0].rows[i].cells[find_index].innerHTML =  i ;
							i++;
						}
					}
				} catch(e){}
			}

			$t.grid.frbDiv = fbDiv;
			$t.p.frozenRows = true;
			$t.p.frozenRowsPrm = prm;
		});
	},
	destroyFrozenRows : function(deep) {
		return this.each(function(){
			this.grid.frbDiv.remove();
			this.p.frozenRows = false;
			if(deep) {
				this.p.frozenRowsPrm = null;
			}
		});
	},
	setFrozenRows : function( options ) {
		return this.each(function(){

			$(this).on('jqGridAfterGridComplete.setFrozenRows', function () {  
				if(this.p.frozenRowsPrm && !$.isEmptyObject(this.p.frozenRowsPrm)) {
					$(this).jqGrid("destroyFrozenRows");
					$(this).jqGrid("setupFrozenRows", this.p.frozenRowsPrm);
				} else {
					$(this).jqGrid("setupFrozenRows", options);
				}
			});
			$(this).on('jqGridResizeStop.setFrozenRows', function () {
				if(this.p.frozenRowsPrm) {
					try {
						$(this).jqGrid("destroyFrozenRows");
						var test = this.p.frozenRowsPrm.last > 0 && !this.p.frozenRowsPrm.saveFirstLastId && this.p.frozenRowsPrm.first === 0; 
						if(test) {
							this.p.frozenRowsPrm.first = this.p.frozenRowsPrm.last;
						}
						$(this).jqGrid("setupFrozenRows", this.p.frozenRowsPrm);
						if(test) {
							this.p.frozenRowsPrm.first = 0;
						}
					} catch(e){}
				}
			});
		});
	}
});
//module end
}));