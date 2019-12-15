/* global Clipboard, AJS, $, document */
$(function () {
    if (!document.getElementById('icon-lists')) {
        return;
    }

    var globalIcons = ['add',
        'add-comment',
        'add-small',
        'approve',
        'appswitcher',
        'arrows-down',
        'arrows-left',
        'arrows-right',
        'arrows-up',
        'attachment',
        'attachment-small',
        'autocomplete-date',
        'back-page',
        'blogroll',
        'bp-decisions',
        'bp-default',
        'bp-files',
        'bp-requirements',
        'bp-howto',
        'bp-jira',
        'bp-meeting',
        'bp-retrospective',
        'bp-sharedlinks',
        'bp-troubleshooting',
        'build',
        'calendar',
        'close-dialog',
        'collapsed',
        'comment',
        'configure',
        'confluence',
        'copy-clipboard',
        'custom-bullet',
        'delete',
        'deploy',
        'details',
        'doc',
        'down',
        'drag-vertical',
        'edit',
        'edit-small',
        'email',
        'error',
        'expanded',
        'file-code',
        'file-doc',
        'file-java',
        'file-pdf',
        'file-ppt',
        'file-txt',
        'file-wav',
        'file-xls',
        'file-zip',
        'flag',
        'focus',
        'group',
        'handle-horizontal',
        'help',
        'hipchat',
        'homepage',
        'image',
        'image-extrasmall',
        'image-small',
        'info',
        'like',
        'like-small',
        'weblink',
        'link',
        'list-add',
        'list-remove',
        'locked',
        'locked-small',
        'macro-code',
        'macro-default',
        'macro-gallery',
        'macro-status',
        'more',
        'nav-children',
        'page-blank',
        'page-blogpost',
        'page-default',
        'page-template',
        'pages',
        'quote',
        'redo',
        'remove',
        'remove-label',
        'review',
        'rss',
        'search',
        'search-small',
        'share',
        'sidebar-link',
        'sourcetree',
        'space-default',
        'space-personal',
        'star',
        'success',
        'table-bg',
        'table-col-left',
        'table-col-remove',
        'table-col-right',
        'table-copy-row',
        'table-cut-row',
        'table-header-column',
        'table-header-row',
        'table-merge',
        'table-no-bg',
        'table-paste-row',
        'table-remove',
        'table-row-down',
        'table-row-remove',
        'table-row-up',
        'table-split',
        'teamcals',
        'time',
        'undo',
        'unfocus',
        'unlocked',
        'unstar',
        'unwatch',
        'up',
        'user',
        'user-status',
        'view',
        'view-card',
        'view-list',
        'view-table',
        'warning',
        'watch',
        'workbox',
        'workbox-empty',
        'configure-columns',
        'export',
        'export-list',
        'file-image',
        'admin-fusion',
        'admin-jira-fields',
        'admin-issue',
        'admin-notifications',
        'admin-roles',
        'admin-jira-screens',
        'pause',
        'priority-highest',
        'priority-high',
        'priority-medium',
        'priority-low',
        'priority-lowest',
        'refresh-small',
        'share-list',
        'switch-small',
        'version',
        'workflow',
        'admin-jira-settings',
        'component',
        'reopen',
        'roadmap',
        'deploy-success',
        'deploy-fail',
        'file-generic',
        'arrow-down',
        'arrow-up',
        'file-video',
        'blogroll-large',
        'email-large',
        'layout-1col-large',
        'layout-2col-large',
        'layout-2col-left-large',
        'layout-2col-right-large',
        'layout-3col-center-large',
        'layout-3col-large',
        'nav-children-large',
        'pages-large',
        'sidebar-link-large',
        'teamcals-large',
        'user-large',
        'jira-issues'];

    var devToolsIcons = ['devtools-arrow-left',
        'devtools-arrow-right',
        'devtools-branch',
        'devtools-branch-small',
        'devtools-browse-up',
        'devtools-checkout',
        'devtools-clone',
        'devtools-commit',
        'devtools-compare',
        'devtools-file',
        'devtools-file-binary',
        'devtools-file-commented',
        'devtools-folder-closed',
        'devtools-folder-open',
        'devtools-fork',
        'devtools-pull-request',
        'devtools-repository',
        'devtools-repository-forked',
        'devtools-repository-locked',
        'devtools-side-diff',
        'devtools-submodule',
        'devtools-tag',
        'devtools-tag-small',
        'devtools-task-cancelled',
        'devtools-task-disabled',
        'devtools-task-in-progress',
        'bitbucket'];

    var editorIcons = ['editor-align-center',
        'editor-align-left',
        'editor-align-right',
        'editor-bold',
        'editor-color',
        'editor-emoticon',
        'editor-help',
        'editor-hr',
        'editor-indent',
        'editor-italic',
        'editor-layout',
        'editor-list-bullet',
        'editor-list-number',
        'editor-macro-toc',
        'editor-mention',
        'editor-outdent',
        'editor-styles',
        'editor-symbol',
        'editor-table',
        'editor-task',
        'editor-underline'];

    var jiraIcons = ['jira',
        'jira-completed-task',
        'jira-test-session'];

    function renderIconList(iconNames, container) {
        iconNames.forEach(function(icon) {
            var iconSpan = document.createElement('span');
            iconSpan.className = 'aui-icon aui-icon-small aui-iconfont-' + icon;
            iconSpan.textContent = 'Insert meaningful text here for accessibility';

            var iconSpanApiHtml = iconSpan.outerHTML;

            iconSpan.setAttribute('data-clipboard-text', iconSpanApiHtml);
            iconSpan.title = icon;
            container.appendChild(iconSpan);

            $(iconSpan).tooltip();
        });
    }

    renderIconList(globalIcons, document.getElementById('global-icon-list'));
    renderIconList(devToolsIcons, document.getElementById('devtools-icon-list'));
    renderIconList(editorIcons, document.getElementById('editor-icon-list'));
    renderIconList(jiraIcons, document.getElementById('jira-icon-list'));

    var allIconElements = Array.prototype.slice.call(document.getElementById('icon-lists').querySelectorAll('.aui-icon'));

    function iconSearchHandler (e) {
        var query = e.target.value.toLowerCase();
        allIconElements.forEach(function (icon) {
            var shouldHighlightIcon = (query === '' || icon.className.indexOf(query) !== -1);
            if (shouldHighlightIcon) {
                $(icon).removeClass('icon-list-dimmed');
            } else {
                $(icon).addClass('icon-list-dimmed');
            }
        });
    }

    document.getElementById('search-icons').addEventListener('input', iconSearchHandler);

    var clipboard = new Clipboard('[data-clipboard-text]');

    clipboard.on('success', function (e) {
        AJS.flag({
            type: 'success',
            title: 'Copied to clipboard.',
            body: e.text + ' has been copied to the clipboard.',
            close: 'auto'
        });
    });

    clipboard.on('error', function () {
        AJS.flag({
            type: 'warning',
            title: 'Icon copying failed to load.',
            body: 'There was a problem copying the icon to the clipboard',
            close: 'auto'
        });
    });
});



