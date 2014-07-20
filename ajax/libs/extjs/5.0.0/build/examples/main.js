window.onload = function() {
    var html = '',
        groups = Ext.samples.samplesCatalog,
        ln = groups.length,
        i = 0,
        groupIndex = 0,
        bodyEl = document.getElementById('body'),
        group, example, j, examples, expanded, exampleLn;

    function addListener(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else {
            element.attachEvent('on' + eventName, handler);
        }
    }
    
    for (; i < ln; i++) {
        group = groups[i];
        expanded = !groupIndex;
        html +=

            '<div class="group-header ' + (expanded ? 'expanded' : 'collapsed') + '">' +
                '<div class="wrap">' +
                    '<div class="group-title">' + group.title + '</div>' +
                    '<div class="group-action">' +
                        '<div class="group-action-icon icon-' + (expanded ? 'minus' : 'plus') + '"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="group">' +
                '<div class="wrap">';
                    examples = group.items;
                    exampleLn = examples.length;
        
                    for (j = 0; j < exampleLn; j++) {
                        example = examples[j];
                        html +=
                            '<a class="example" target="_blank" href="' + example.url + '">' +
                                '<div class="example-icon-wrap icon-border-hexagon">' +
                                    '<div class="example-icon icon-' + example.icon + '"></div>' +
                                '</div>' +
                                '<div class="example-text-wrap">' +
                                    '<div class="example-text-wrap-inner">' +
                                        '<div class="example-title">' + example.text + '</div>' +
                                        '<div class="example-description">' + example.desc + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</a>';
                    }
        
        html +=
                '</div>' + // end wrap
            '</div>'; // end group
            
        ++groupIndex;
    }
    
    bodyEl.innerHTML = html;
    
    addListener(document.body, 'click', function(e) {
        var target = e.target || e.srcElement,
            groupHeaderClicked = false,
            expander, className, expanderClassName;
        
        while (target) {
            if (target.className && target.className.indexOf('group-header') !== -1) {
                groupHeaderClicked = true;
                break;
            }
            target = target.parentNode;
        }
        
        if (groupHeaderClicked) {
            className = target.className;
            expander = target.querySelector('.group-action-icon');
            expanderClassName = expander.className;
            
            if (className.indexOf('collapsed') !== -1) {
                className = className.replace('collapsed', 'expanded');
                expanderClassName = expanderClassName.replace('plus', 'minus');
            } else {
                className = className.replace('expanded', 'collapsed');
                expanderClassName = expanderClassName.replace('minus', 'plus');
            }
            target.className = className;
            expander.className = expanderClassName;
            
            // IE8 needs a repaint of the body el to trigger the stylesheet rules that hide
            // and show the group
            bodyEl.className = bodyEl.className;
        }
    });
};
