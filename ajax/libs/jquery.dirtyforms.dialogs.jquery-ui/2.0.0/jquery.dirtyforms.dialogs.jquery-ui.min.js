/*!
jQuery UI dialog module (for jQuery Dirty Forms) | v2.0.0 | github.com/snikch/jquery.dirtyforms
(c) 2015 Shad Storhaug
License MIT
*/
!function(t,e,i,o){var n=t('<div style="display:none;" />');t("body").append(n),t.DirtyForms.dialog={title:"Are you sure you want to do that?",proceedButtonText:"Leave This Page",stayButtonText:"Stay Here",preMessageText:'<span class="ui-icon ui-icon-alert" style="float:left; margin:2px 7px 25px 0;"></span>',postMessageText:"",width:430,open:function(e,o){var s=e.isDF1?t.DirtyForms.choiceCommit:e.commit;if(n.dialog({open:function(){t(this).parents(".ui-dialog").find(".ui-dialog-buttonpane button:eq(1)").focus()},close:s,title:this.title,width:this.width,modal:!0,buttons:[{text:this.proceedButtonText,click:function(){e.proceed=t.DirtyForms.choiceContinue=!0,t(this).dialog("close")}},{text:this.stayButtonText,click:function(){t(this).dialog("close")}}]}),n.html(this.preMessageText+o+this.postMessageText),e.isDF1){var c=function(t){return 27==t.which?(t.preventDefault(),n.dialog("close"),!1):void 0};t(i).unbind("keydown",c).keydown(c)}},close:function(){n.dialog("close")},fire:function(t,e){this.title=e,this.open({isDF1:!0},t)},bind:function(){},stash:function(){return!1},refire:function(){return!1},selector:"no-op"}}(jQuery,window,document);
//# sourceMappingURL=jquery.dirtyforms.dialogs.jquery-ui.min.js.map
