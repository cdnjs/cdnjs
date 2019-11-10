/*!
 * bootstrap-fileinput v5.0.4
 * http://plugins.krajee.com/file-input
 *
 * Krajee Explorer theme configuration for bootstrap-fileinput. Load this theme file after loading `fileinput.js`.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2019, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */!function(e){"use strict";var t='<tr class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" data-fileid="{fileid}"',i='<td class="kv-file-content">\n';e.fn.fileinputThemes.explorer={layoutTemplates:{preview:'<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <table class="table table-bordered table-hover"><tbody class="file-preview-thumbnails">\n    </tbody></table>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>',footer:'<td class="file-details-cell"><div class="explorer-caption" title="{caption}">{caption}</div> {size}{progress}</td><td class="file-actions-cell">{indicator} {actions}</td>',actions:'{drag}\n<div class="file-actions">\n    <div class="file-footer-buttons">\n        {upload} {download} {delete} {zoom} {other}     </div>\n</div>',zoomCache:'<tr style="display:none" class="kv-zoom-cache-theme"><td><table class="kv-zoom-cache">{zoomContent}</table></td></tr>'},previewMarkupTags:{tagBefore1:t+">"+i,tagBefore2:t+' title="{caption}">'+i,tagAfter:"</td>\n{footer}</tr>\n"},previewSettings:{html:{width:"100px",height:"60px"},text:{width:"100px",height:"60px"},video:{width:"auto",height:"60px"},audio:{width:"auto",height:"60px"},flash:{width:"100%",height:"60px"},object:{width:"100%",height:"60px"},pdf:{width:"100px",height:"60px"},other:{width:"100%",height:"60px"}},frameClass:"explorer-frame"}}(window.jQuery);
