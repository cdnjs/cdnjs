/*/* ===========================================================
 * trumbowyg.insertaudio.js v1.0
 * InsertAudio plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Adam Hess (AdamHess)
 */
!function(e){"use strict";var i={src:{label:"URL",required:!0},autoplay:{label:"AutoPlay",required:!1,type:"checkbox"},muted:{label:"Muted",required:!1,type:"checkbox"},preload:{label:"preload options",required:!1}};e.extend(!0,e.trumbowyg,{langs:{en:{insertAudio:"Insert Audio"},az:{insertAudio:"Səs yerləşdir"},by:{insertAudio:"Уставіць аўдыё"},ca:{insertAudio:"Inserir Audio"},da:{insertAudio:"Indsæt lyd"},es:{insertAudio:"Insertar Audio"},et:{insertAudio:"Lisa helifail"},fr:{insertAudio:"Insérer un son"},hu:{insertAudio:"Audio beszúrás"},ja:{insertAudio:"音声の挿入"},ko:{insertAudio:"소리 넣기"},pt_br:{insertAudio:"Inserir áudio"},ru:{insertAudio:"Вставить аудио"},sl:{insertAudio:"Vstavi zvočno datoteko"},tr:{insertAudio:"Ses Ekle"}},plugins:{insertAudio:{init:function(r){var t={fn:function(){r.openModalInsert(r.lang.insertAudio,i,(function(i){var t="<audio controls";i.src&&(t+=" src='"+i.src+"'"),i.autoplay&&(t+=" autoplay"),i.muted&&(t+=" muted"),i.preload&&(t+=" preload='"+i+"'");var o=e(t+="></audio>")[0];return r.range.deleteContents(),r.range.insertNode(o),!0}))}};r.addBtnDef("insertAudio",t)}}}})}(jQuery);