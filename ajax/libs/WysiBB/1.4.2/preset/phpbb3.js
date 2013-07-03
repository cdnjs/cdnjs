WBBPRESET = {
	bodyClass: "content content-phpbb3",
	buttons: 'bold,italic,underline,|,quote,code,bullist,numlist,|,img,link,smilebox,fontsize,fontcolor',
	traceTextarea: true,
	allButtons: {
		quote: {
			transform: {
				'<blockquote class="uncited"><div>{SELTEXT}</div></blockquote>':'[quote]{SELTEXT}[/quote]',
				'<blockquote><div><cite>{AUTHOR} писал(а):</cite>{SELTEXT}</div></blockquote>':'[quote="{AUTHOR}"]{SELTEXT}[/quote]'
			}
		},
		code: {
			transform: {
				'<dl class="codebox"><dt>Код: <a href="#">Выделить всё</a></dt><dd><code>{SELTEXT}</code></dd></dl>':'[code]{SELTEXT}[/code]'
			}
		},
		bullist: {
			transform: {
				'<ul>{SELTEXT}</ul>':'[list]{SELTEXT}[/list]',
				'<li>{SELTEXT}</li>':'[*]{SELTEXT[^\[\]\*]}'
			}
		},
		numlist: {
			transform: {
				'<ol>{SELTEXT}</ol>':'[list=1]{SELTEXT}[/list]',
				'<li>{SELTEXT}</li>':'[*]{SELTEXT[^\[\]\*]}'
			}
		},
		attach: {
			title: CURLANG.add_attach,
			buttonHTML: '<span class="fonticon ve-tlb-attach1">\uE017</span>',
			hotkey: 'ctrl+shift+5',
 			modal: {
				title: CURLANG.add_attach,
				width: "600px",
				tabs: [
					{
						title: CURLANG.add_attach,
						html: '<div id="imguploader"> <form id="fupform" class="upload" action="{img_uploadurl}" method="post" enctype="multipart/form-data" target="fupload"><input type="hidden" name="iframe" value="1"/><input type="hidden" name="idarea" value="message" /><div class="fileupload"><input id="fileupl" class="file" type="file" name="img" /><button id="nicebtn" class="wbb-button">'+CURLANG.modal_img_btn+'</button> </div> </form> </div><iframe id="fupload" name="fupload" src="about:blank" frameborder="0" style="width:0px;height:0px;display:none"></iframe></div>'
					}
				],
				onLoad: fileModal
			},
 			transform: {
				'<div class="inline-attachment" numimg="{NUM[0-9]}" contenteditable="false"><dl class="file"><dt class="attach-image"><img src="./download/file.php?id={ID[0-9]}"></dt><dd>{ALT} Просмотров: 0</dd></dl></div>':'[attachment={NUM[0-9]}]{ID[0-9]}: {ALT}[/attachment]',
				'<div class="inline-attachment" num="{NUM[0-9]}" contenteditable="false"><dl class="file"><dt><img src="./styles/prosilver/imageset/icon_topic_attach.gif" width="7" height="10" alt="" title=""><a class="postlink" href="./download/file.php?id={ID[0-9]}">{ALTFILE}</a></dt><dd>Скачиваний: 0</dd></dl></div>':'[attachment={NUM[0-9]}]{ID[0-9]}; {ALTFILE}[/attachment]'
				
			}
		}
	},
	smilefind: "#smiley-box"
}

//hide smilelist
$(document).ready(function() {
	$("#format-buttons").hide();
	$("#smiley-box").hide();
	$("#message-box").css("width","100%");
});

(function($) {
	//for attachments process
	$.wysibb.prototype.traceTextareaEvent = function(e) {
		var data = this.$txtArea.val();
		if (this.options.bbmode===false && data!="" && $(e.target).closest("div.wysibb").size()==0 && !this.$txtArea.attr("wbbsync")) {
			if (data.indexOf("[attachment=")!=-1) {
				var num = data.replace(/\[attachment=(\d+?)\].*/,"$1");
				var idfile = $("input[name='attachment_data["+num+"][attach_id]']").val();
				var ext = $("input[name='attachment_data["+num+"][real_filename]']").val().replace(/.*?\.(\w+)$/,"$1");
				if (ext.match(/(jpg|gif|png|bmp)/)) {
					data = data.replace(/(\[attachment=\d+\])(.*?)(\[\/attachment\])/,"$1"+idfile+":$2$3");
				}else{
					data = data.replace(/(\[attachment=\d+\])(.*?)(\[\/attachment\])/,"$1"+";"+idfile+" $2$3");
				}
			}
			this.insertAtCursor(this.getHTML(data,true));
			this.$txtArea.val("");
		}
	}
	
	$.wysibb.prototype.txtAreaInitContent = function() { 
		var tdata = this.txtArea.value;
		tdata = tdata.replace(/(\[attachment=(\d+?)\])([^:;]*?)(\[\/attachment\])/g,function(m,left,num,cont,right) {
			var idfile = $("input[name='attachment_data["+num+"][attach_id]']").val();
			var ext = $("input[name='attachment_data["+num+"][real_filename]']").val();
			if (ext) {
				ext = ext.replace(/.*?\.(\w+)$/,"$1");
				if (ext.match(/(jpg|gif|png|bmp)/)) {
					return (left+idfile+":"+cont+right);
				}else{
					return (left+cont+";"+idfile+right);
				}
			}else{
				return m;
			}
		});
		this.$body.html(this.getHTML(tdata,true));
	}
	
	$.fn.closeModal = function() {
		this.data("wbb").closeModal();
		return this.data("wbb");
	}
	$.fn.insertAttach = function(id,alt,isimg) {
		var num=0;
		while (num<30) {
			if ($("input[name='attachment_data["+num+"][attach_id]']").size()==0) {
				break;
			}
			num++;
		}
		
		this.data("wbb").$txtArea.after('<input type="hidden" name="attachment_data['+num+'][attach_id]" value="'+id+'" /><input type="hidden" name="attachment_data['+num+'][is_orphan]" value="1" /><input type="hidden" name="attachment_data['+num+'][real_filename]" value="'+id+":"+alt+'" /><input type="hidden" name="attachment_data['+num+'][attach_comment]" value="" />');
		var data = (isimg===true) ? this.data("wbb").getCodeByCommand("attach",{"id":id,"num":num,"alt":alt}):this.data("wbb").getCodeByCommand("attach",{"id":id,"num":num,"altfile":alt});

		this.data("wbb").insertAtCursor(data);
		return this.data("wbb");
	}
})(jQuery);

function fileModal() {
	$.log("fileModal");
	if (this.options.imgupload===true) {
		this.$modal.find("#fupform").append('<input type="hidden" name="upload_type" value="1" />');
		this.$modal.find("#imguploader").dragfileupload({
			url: this.strf(this.options.img_uploadurl,this.options),
			themePrefix: this.options.themePrefix,
			themeName: this.options.themeName,
			extraParams: {
				upload_type:this.options.upload_type
			},
			success: $.proxy(function(data) {
				$.log("Success");
				if (data && data.status==1) {
					var num=0;
					while (num<30) {
						if ($("input[name='attachment_data["+num+"][attach_id]']").size()==0) {
							break;
						}
						num++;
					}
					
					this.$txtArea.after('<input type="hidden" name="attachment_data['+num+'][attach_id]" value="'+data.id+'" /><input type="hidden" name="attachment_data['+num+'][is_orphan]" value="1" /><input type="hidden" name="attachment_data['+num+'][real_filename]" value="'+data.id+":"+data.alt+'" /><input type="hidden" name="attachment_data['+num+'][attach_comment]" value="" />');
					var datastr = (data.isimg===true) ? this.getCodeByCommand("attach",{"id":data.id,"num":num,"alt":data.alt}):this.getCodeByCommand("attach",{"id":data.id,"num":num,"altfile":data.alt});
					this.insertAtCursor(datastr);
				}
				this.closeModal();
				this.updateUI();
			},this),
			validation: ".*$"
		});
		
		if ($.browser.msie) {
			//ie not posting form by security reason, show default file upload
			$.log("IE not posting form by security reason, show default file upload");
			this.$modal.find("#nicebtn").hide();
			this.$modal.find("#fileupl").css("opacity",1);
		}
		
		this.$modal.find("#fileupl").bind("change",function() {
			$("#fupform").submit();
		});
		this.$modal.find("#fupform").bind("submit",$.proxy(function(e) {
			$(e.target).parents("#imguploader").hide().after('<div class="loader"><img src="'+this.options.themePrefix+'/'+this.options.themeName+'/img/loader.gif" /><br/><span>'+CURLANG.loading+'</span></div>').parent().css("text-align","center");
		},this))
		
	}else{
		this.$modal.find(".hastabs").removeClass("hastabs");
		this.$modal.find("#imguploader").parents(".tab-cont").remove();
		this.$modal.find(".wbbm-tablist").remove();
	}
}