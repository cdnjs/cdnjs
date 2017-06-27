(function(pangu) {
    'use strict';

    var ignore_tags = /^(code|pre|textarea)$/i;
    var space_sensitive_tags = /^(a|del|pre|s|strike|u)$/i;
    var space_like_tags = /^(br|hr|i|img|pangu)$/i;
    var block_tags = /^(div|h1|h2|h3|h4|h5|h6|p)$/i;

    function can_ignore_node(node) {
        var parent_node = node.parentNode;
        while (parent_node && parent_node.nodeName && parent_node.nodeName.search(/^(html|head|body|#document)$/i) === -1) {
            if ((parent_node.getAttribute('contenteditable') === 'true') || (parent_node.getAttribute('g_editable') === 'true') || (parent_node.nodeName.search(ignore_tags) >= 0)) {
                return true;
            }
            else {
                parent_node = parent_node.parentNode;
            }
        }

        return false;
    }

    function is_first_text_child(parent_node, target_node) {
        var child_nodes = parent_node.childNodes;
        for (var i = 0; i < child_nodes.length; i++) {
            var child_node = child_nodes[i];
            if (child_node.nodeType !== 8 && child_node.textContent) {
                return child_node === target_node;
            }
        }
    }

    function is_last_text_child(parent_node, target_node) {
        var child_nodes = parent_node.childNodes;
        for (var i = child_nodes.length - 1; i > -1; i--) {
            var child_node = child_nodes[i];
            if (child_node.nodeType !== 8 && child_node.textContent) {
                return child_node === target_node;
            }
        }
    }

    function insert_space(text) {
        var old_text = text;
        var new_text;
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["])/g, '$1 $2');
        text = text.replace(/(["])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $2');
        text = text.replace(/(["'\(\[\{<\u201c]+)(\s*)(.+?)(\s*)(["'\)\]\}>\u201d]+)/g, '$1$3$5');
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])( )(')([A-Za-z])/g, '$1$3$4');
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#(\S+))/g, '$1 $2');
        text = text.replace(/((\S+)#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $3');
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\+\-\*\/=&\\|<>])([A-Za-z0-9])/g, '$1 $2 $3');
        text = text.replace(/([A-Za-z0-9])([\+\-\*\/=&\\|<>])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $2 $3');
        old_text = text;
        new_text = old_text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c]+(.*?)[\)\]\}>\u201d]+)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $2 $4');
        text = new_text;
        if (old_text === new_text) {
            text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c>])/g, '$1 $2');
            text = text.replace(/([\)\]\}>\u201d<])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $2');
        }
        text = text.replace(/([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/g, '$1$3$5');
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([~!;:,\.\?\u2026])([A-Za-z0-9])/g, '$1$2 $3');
        text = text.replace(/([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9`\$%\^&\*\-=\+\\\|/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g, '$1 $2');
        text = text.replace(/([A-Za-z0-9`~\$%\^&\*\-=\+\\\|/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g, '$1 $2');
        text = text.replace(/(Taipei)(,)(China)/g, '$1$2 $3');

        return text;
    }

    function spacing(xpath_query, context_node) {
        context_node = context_node || document;
        var had_spacing = false;

        var text_nodes = document.evaluate(xpath_query, context_node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var nodes_length = text_nodes.snapshotLength;

        var next_text_node;
        for (var i = nodes_length - 1; i > -1; --i) {
            var current_text_node = text_nodes.snapshotItem(i);

            if (can_ignore_node(current_text_node)) {
                next_text_node = current_text_node;
                continue;
            }
            var new_data = insert_space(current_text_node.data);
            if (current_text_node.data !== new_data) {
                had_spacing = true;
                current_text_node.data = new_data;
            }
            if (next_text_node) {
                if (current_text_node.nextSibling) {
                    if (current_text_node.nextSibling.nodeName.search(space_like_tags) >= 0) {
                        next_text_node = current_text_node;
                        continue;
                    }
                }
                var text = current_text_node.data.toString().substr(-1) + next_text_node.data.toString().substr(0, 1);
                var new_text = insert_space(text);

                if (text !== new_text) {
                    had_spacing = true;

                    var next_node = next_text_node;
                    while (next_node.parentNode &&
                        next_node.nodeName.search(space_sensitive_tags) === -1 &&
                        is_first_text_child(next_node.parentNode, next_node)) {
                        next_node = next_node.parentNode;
                    }

                    var current_node = current_text_node;
                    while (current_node.parentNode &&
                        current_node.nodeName.search(space_sensitive_tags) === -1 &&
                        is_last_text_child(current_node.parentNode, current_node)) {
                        current_node = current_node.parentNode;
                    }

                    if (current_node.nextSibling) {
                        if (current_node.nextSibling.nodeName.search(space_like_tags) >= 0) {
                            next_text_node = current_text_node;
                            continue;
                        }
                    }

                    if (current_node.nodeName.search(block_tags) === -1) {
                        if (next_node.nodeName.search(space_sensitive_tags) === -1) {
                            if ((next_node.nodeName.search(ignore_tags) === -1) && (next_node.nodeName.search(block_tags) === -1)) {
                                if (next_text_node.previousSibling) {
                                    if (next_text_node.previousSibling.nodeName.search(space_like_tags) === -1) {
                                        next_text_node.data = ' ' + next_text_node.data;
                                    }
                                }
                                else {
                                    if (!can_ignore_node(next_text_node)) {
                                        next_text_node.data = ' ' + next_text_node.data;
                                    }
                                }
                            }
                        }
                        else if (current_node.nodeName.search(space_sensitive_tags) === -1) {
                            current_text_node.data = current_text_node.data + ' ';
                        }
                        else {
                            var pangu_space = document.createElement('pangu');
                            pangu_space.innerHTML = ' ';
                            if (next_node.previousSibling) {
                                if (next_node.previousSibling.nodeName.search(space_like_tags) === -1) {
                                    next_node.parentNode.insertBefore(pangu_space, next_node);
                                }
                            }
                            else {
                                next_node.parentNode.insertBefore(pangu_space, next_node);
                            }
                            if (!pangu_space.previousElementSibling) {
                                if (pangu_space.parentNode) {
                                    pangu_space.parentNode.removeChild(pangu_space);
                                }
                            }
                        }
                    }
                }
            }

            next_text_node = current_text_node;
        }

        return had_spacing;
    }

    pangu.text_spacing = function(text) {
        return insert_space(text);
    };

    pangu.page_title_spacing = function() {
        var title_query = '/html/head/title/text()';
        var had_spacing = spacing(title_query);

        return had_spacing;
    };

    pangu.page_spacing = function() {
        var had_spacing_title = pangu.page_title_spacing();

        var body_query = '/html/body//*/text()[normalize-space(.)]';
        ['script', 'style', 'textarea'].forEach(function(tag) {
            body_query += '[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="' + tag + '"]';
        });
        var had_spacing_body = spacing(body_query);

        return had_spacing_title || had_spacing_body;
    };

    pangu.node_spacing = function(context_node) {
        var inserted_query = './/*/text()[normalize-space(.)]';
        ['script', 'style', 'textarea'].forEach(function(tag) {
            inserted_query += '[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="' + tag + '"]';
        });
        var had_spacing = spacing(inserted_query, context_node);

        return had_spacing;
    };
    pangu.element_spacing = function(selector_string) {
        var xpath_query;

        if (selector_string.indexOf('#') === 0) {
            var target_id = selector_string.slice(1);
            xpath_query = 'id("' + target_id + '")//text()';
        }
        else if (selector_string.indexOf('.') === 0) {
            var target_class = selector_string.slice(1);
            xpath_query = '//*[contains(concat(" ", normalize-space(@class), " "), "' + target_class + '")]//text()';
        }
        else {
            var target_tag = selector_string;
            xpath_query = '//' + target_tag + '//text()';
        }

        var had_spacing = spacing(xpath_query);

        return had_spacing;
    };

}(window.pangu = window.pangu || {}));
