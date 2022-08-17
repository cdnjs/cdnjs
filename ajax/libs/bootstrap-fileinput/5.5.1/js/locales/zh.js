/*!
 * FileInput Chinese Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author kangqf <kangqingfei@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales['zh'] = {
        sizeUnits: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
        bitRateUnits: ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
        fileSingle: '文件',
        filePlural: '个文件',
        browseLabel: '选择 &hellip;',
        removeLabel: '移除',
        removeTitle: '清除选中文件',
        cancelLabel: '取消',
        cancelTitle: '取消进行中的上传',
        pauseLabel: '暂停',
        pauseTitle: '暂停上传',
        uploadLabel: '上传',
        uploadTitle: '上传选中文件',
        msgNo: '没有',
        msgNoFilesSelected: '未选择文件',
        msgPaused: '已暂停',
        msgCancelled: '取消',
        msgPlaceholder: '选择 {files} ...',
        msgZoomModalHeading: '详细预览',
        msgFileRequired: '必须选择一个文件上传.',
        msgSizeTooSmall: '文件 "{name}" (<b>{size}</b>) 必须大于限定大小 <b>{minSize}</b>.',
        msgSizeTooLarge: '文件 "{name}" (<b>{size}</b>) 超过了允许大小 <b>{maxSize}</b>.',
        msgFilesTooLess: '你必须选择最少 <b>{n}</b> {files} 来上传. ',
        msgFilesTooMany: '选择的上传文件个数 <b>({n})</b> 超出最大文件的限制个数 <b>{m}</b>.',
        msgTotalFilesTooMany: '你最多可以上传 <b>{m}</b> 个文件 (当前有<b>{n}</b> 个文件).',
        msgFileNotFound: '文件 "{name}" 未找到!',
        msgFileSecured: '安全限制，为了防止读取文件 "{name}".',
        msgFileNotReadable: '文件 "{name}" 不可读.',
        msgFilePreviewAborted: '取消 "{name}" 的预览.',
        msgFilePreviewError: '读取 "{name}" 时出现了一个错误.',
        msgInvalidFileName: '文件名 "{name}" 包含非法字符.',
        msgInvalidFileType: '不正确的类型 "{name}". 只支持 "{types}" 类型的文件.',
        msgInvalidFileExtension: '不正确的文件扩展名 "{name}". 只支持 "{extensions}" 的文件扩展名.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: '该文件上传被中止',
        msgUploadThreshold: '处理中 &hellip;',
        msgUploadBegin: '正在初始化 &hellip;',
        msgUploadEnd: '完成',
        msgUploadResume: '继续上传 &hellip;',
        msgUploadEmpty: '无效的文件上传.',
        msgUploadError: '上传出错',
        msgDeleteError: '删除出错',
        msgProgressError: '上传出错',
        msgValidationError: '验证错误',
        msgLoading: '加载第 {index} 文件 共 {files} &hellip;',
        msgProgress: '加载第 {index} 文件 共 {files} - {name} - {percent}% 完成.',
        msgSelected: '{n} {files} 选中',
        msgProcessing: '处理中 ...',
        msgFoldersNotAllowed: '只支持拖拽文件! 跳过 {n} 拖拽的文件夹.',
        msgImageWidthSmall: '图像文件的"{name}"的宽度必须是至少{size}像素.',
        msgImageHeightSmall: '图像文件的"{name}"的高度必须至少为{size}像素.',
        msgImageWidthLarge: '图像文件"{name}"的宽度不能超过{size}像素.',
        msgImageHeightLarge: '图像文件"{name}"的高度不能超过{size}像素.',
        msgImageResizeError: '无法获取的图像尺寸调整。',
        msgImageResizeException: '调整图像大小时发生错误。<pre>{errors}</pre>',
        msgAjaxError: '{operation} 发生错误. 请重试!',
        msgAjaxProgressError: '{operation} 失败',
        msgDuplicateFile: '文件 "{name}",大小 "{size}" 已经被选中.忽略相同的文件.',
        msgResumableUploadRetriesExceeded:  '文件 <b>{file}</b> 上传失败超过 <b>{max}</b> 次重试 ! 错误详情: <pre>{error}</pre>',
        msgPendingTime: '{time} 剩余',
        msgCalculatingTime: '计算剩余时间',
        ajaxOperations: {
            deleteThumb: '删除文件',
            uploadThumb: '上传文件',
            uploadBatch: '批量上传',
            uploadExtra: '表单数据上传'
        },
        dropZoneTitle: '拖拽文件到这里 &hellip;<br>支持多文件同时上传',
        dropZoneClickTitle: '<br>(或点击{files}按钮选择文件)',
        fileActionSettings: {
            removeTitle: '删除文件',
            uploadTitle: '上传文件',
            downloadTitle: '下载文件',
            uploadRetryTitle: '重试',
            rotateTitle: 'Rotate 90 deg. clockwise',
            zoomTitle: '查看详情',
            dragTitle: '移动 / 重置',
            indicatorNewTitle: '没有上传',
            indicatorSuccessTitle: '上传',
            indicatorErrorTitle: '上传错误',
            indicatorPausedTitle: '上传已暂停',
            indicatorLoadingTitle:  '上传 &hellip;'
        },
        previewZoomButtonTitles: {
            prev: '预览上一个文件',
            next: '预览下一个文件',
            rotate: 'Rotate 90 deg. clockwise',
            toggleheader: '缩放',
            fullscreen: '全屏',
            borderless: '无边界模式',
            close: '关闭当前预览'
        }
    };
}));
