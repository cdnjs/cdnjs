(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tez = global.Tez || {})));
}(this, (function (exports) { 'use strict';

var map = {};
var _doc = document;
var litTag = "tagName";
var litChild = "childNodes";
var litNod = "nodeValue";
var litAttr = "attributes";
var litCTN = "createTextNode";
var litCE = "createElement";
map[litTag] = true;
map[litChild] = true;
map[litNod] = true;
map[litAttr] = true;
var udf;

function VPatch(renderedTree, virtualTree, noParent) {

    if (!renderedTree) {
        return null;
    } else if (!virtualTree) {
        return renderedTree;
    }
    // Quick patch for TextNode
    if (!!virtualTree.nodeName && !!renderedTree.nodeName && virtualTree[litNod] !== undefined) {
        if (virtualTree.nodeName !== renderedTree.nodeName) {
            renderedTree[litNod] = virtualTree[litNod];
        }
        return true;
    }
    if (noParent) {
        if (renderedTree.nodeType && virtualTree.length === undefined) {
            virtualTree = [virtualTree];
        }
    }
    if (Array.isArray(virtualTree)) {
        if (renderedTree.length > 0) {
            var maxLength = Math.max(renderedTree.length, virtualTree.length);
            for (var i = 0; i < maxLength; i++) {
                VPatch(renderedTree[i], virtualTree[i]);
            }
        } else {
            var renderedTreeChilds = renderedTree[litChild];
            if (renderedTreeChilds) {
                if (renderedTreeChilds.length > 0) {
                    var maxLength = Math.max(renderedTreeChilds.length, virtualTree.length);
                    for (var i = 0; i < maxLength; i++) {
                        VPatch(renderedTreeChilds[i], virtualTree[i]);
                    }
                } else {
                    for (var i = 0, len = virtualTree.length; i < len; i++) {
                        var virtualChildNode = virtualTree[i];
                        var isTextNode = virtualChildNode.nodeName === "#text";
                        var createElem = isTextNode ? _doc[litCTN](virtualChildNode[litNod]) : _doc[litCE](virtualChildNode.tagName);
                        if (isTextNode) {
                            createElem[litNod] = virtualChildNode[litNod];
                        } else {
                            VPatch(createElem, virtualChildNode);
                        }
                        renderedTree.appendChild(createElem);
                    }
                }
            }
        }
        return true;
    }

    for (var p in map) {
        var rendered = renderedTree[p],
        virtual = virtualTree[p];

        if (!virtual && !rendered) {
            continue;
        } else if (p === litNod) {
            if (rendered !== udf && virtual !== udf && rendered !== virtual) {
                renderedTree[p] = virtual;
            }
        } else if (p === litChild) {
            if ((!rendered || rendered && rendered.length === 0)) {
                if (virtual && virtual.length > 0) {
                    for (var i = 0, len = virtual.length; i < len; i++) {
                        var virtualChildNode = virtual[i];
                        if (!virtualChildNode) {
                            continue;
						}
                        var isTextNode = virtualChildNode.nodeName === "#text";
                        var createElem = isTextNode ? _doc[litCTN](virtualChildNode[litNod]) : _doc[litCE](virtualChildNode.tagName);
                        if (isTextNode) {
                            createElem[litNod] = virtualChildNode[litNod];
                        } else {
                            VPatch(createElem, virtualChildNode);
                        }
                        renderedTree.appendChild(createElem);
                    }
                }
            } else if (!virtual || virtual && virtual.length === 0) {
                if (rendered && rendered.length > 0) {
					var renderedChild, i = 0;
                    while (renderedChild = rendered[i++]) {
                        if (renderedChild === undefined) {
                            renderedChild = rendered[i++];
						}
						if (renderedChild && renderedChild.parentNode) {
                        renderedChild.parentNode.removeChild(renderedChild);
						}
						if (i >= rendered.length) {
							i = 0;
						}
                    }
                }
            } else if (virtual && rendered) {
                var maxLength = Math.max(rendered && rendered.length || 0, virtual && virtual.length || 0);
                for (var i = 0; i < maxLength; i++) {
                    var virtualChildNode = virtual[i];
					var renderedChildNode = rendered[i];
                    if (!renderedChildNode) {
                        var isTextNode = virtualChildNode.nodeName === "#text";
                        var createElem = isTextNode ? _doc[litCTN](virtualChildNode[litNod]) : _doc[litCE](virtualChildNode.tagName);
                        renderedTree.appendChild(createElem);
                        renderedChildNode = createElem;
                        VPatch(renderedChildNode, virtualChildNode);
                    } else if (!virtualChildNode) {
						if (renderedChildNode && renderedChildNode.parentNode) {
                        renderedChildNode.parentNode.removeChild(renderedChildNode);
						}
                    } else {
                        if (virtualChildNode.nodeName && virtualChildNode[litNod] !== undefined) {
                            if (renderedChildNode[litNod] !== virtualChildNode[litNod]) {
                                renderedChildNode[litNod] = virtualChildNode[litNod];
                            }
                        } else {
                            VPatch(renderedChildNode, virtualChildNode);
                        }
                    }
                }
            }
        } else if (p === litTag) {
            if ((rendered && virtual) && rendered !== virtual) {
                var createElem = _doc.createElement(virtual);
                VPatch(createElem, virtualTree);
                if (rendered && renderedTree.parentNode) {
                    renderedTree.parentNode.replaceChild(createElem, renderedTree);
                }
            }
        } else if (p === litAttr) {
            var maxLength = Math.max(rendered && rendered.length || 0, virtual && virtual.length || 0);
            for (var i = 0; i < maxLength; i++) {
                var rAttr = rendered[i];
                var vAttr = virtual && virtual[i];

                if (rAttr && !vAttr) {
                    renderedTree.removeAttribute(rAttr.name);
                } else if (!rAttr && vAttr) {
                    renderedTree.setAttribute(vAttr.name, vAttr.value);
                } else if (rAttr.value !== vAttr.value) {
                    rAttr.value = vAttr.value;
                }
            }
        }
    }
}

var linkState = function (scope, type) {
	var state = scope.state || {};
	return function (value) {
		state[type] = value.target ? value.target[type] : value[type];
		return scope.setState(state);
	}
};

var Component = function (props) {
    this.props = props;
	this.innerScope = false;
};
var p = Component.prototype;
p.shouldComponentUpdate = function (state) {
    return !!state && JSON.stringify(this.state) !== JSON.stringify(state);
};
p.setState = function (state) {
    if (this.shouldComponentUpdate(state)) {
        if (state && this.state) {
            for (var p in state) {
                this.state[p] = state[p];
            }
        }
        this.redraw();
    }
    return this;
};
p.redraw = function (el) {
    if (!this.rendered) {
        Object.defineProperty(this, 'rendered', {
            value: el,
            enumerable: false
        });
    }
    var render = this.render();
    if (!render) {
        if (this.rendered.remove) {
            this.rendered.remove();
        }
        if (this.componentDidUnmount) {
            this.componentDidUnmount();
        }
    } else {
        VPatch(this.rendered, render, this.innerScope);
        render = null;
    }
    return this;
};
p.constructor = Component;

function isComponent(_class) {
    return !!_class && (((_class instanceof Component) || _class.redraw || _class.render) || (_class.prototype && (_class.prototype.redraw || _class.prototype.render)));
}

function DOM(el, _class, innerScope) {
    if (isComponent(_class)) {
        if (_class.componentDidMount) {
            _class.componentDidMount(el);
        }
        _class.redraw(el);
    } else if (typeof _class === 'object') {
        VPatch(el, _class, innerScope);
    }
    return _class;
}

var slice = [].slice;
var isArray = Array.isArray;

function VAttr(attr) {
    if (!attr || isArray(attr))
        return attr;
    var attrs = [];
    for (var prop in attr) {
        attrs.push({
            name: prop,
            value: attr[prop]
        });
    }
    return attrs;
}

function VText(text) {
    return {
        nodeName: '#text',
        nodeValue: text
    }
}

function VHyper() {
    var children = slice.call(arguments);
    var tag = children.shift();
    var attrs = children.shift();

    var render;
    if (isComponent(tag)) {
        render = tag.render !== undefined ? tag.render() : new tag(attrs).render();
    } else if (typeof tag === 'function') {
        render = tag(attrs);
    } else if (typeof render === 'number' || typeof render === 'string') {
        render = VText(render);
    } else {
		tag = tag.toUpperCase();
        render = {
            tagName: tag,
            nodeName: tag,
            attributes: VAttr(attrs)
        };
    }
    if (children.length > 0) {
        attrs = VAttr(attrs);
        if (!render.childNodes) {
            render.childNodes = [];
        }
        render.childNodes = render.childNodes.concat(children.map(function (item) {
                    return typeof(item) === 'number' || typeof(item) === 'string' ? VText(item) : isArray(item) ? VHyper.apply(null, item) : isComponent(item) ? VHyper(item) : item;
                }));
    }
    return render;
}

var id = 0;
var slice$1 = [].slice;

function VNode(params, key) {
	if (Array.isArray(params)) {
		return params.map(function(param){
			return VNode(param);
		});
	}
	var self = {};
    if (params.id) {
        self.id = params.id;
    }
    if (params.tagName) {
        self.tagName = params.tagName.toUpperCase();
    }
    self.nodeName = params.nodeName;
    self.childNodes = slice$1.call(params.childNodes || []).map(function (node, index) {
        return VNode(node, index);
    }) || [];
    if (params.attributes) {
        self.attributes = slice$1.call(params.attributes);
    }
    self.key = key || id++;
    self.nodeValue = params.nodeValue || null;
    self.value = params.value;
    self.textContent = params.tagName === "BR" ? "" : self.childNodes.length ? undefined : params.textContent;
    self.name = params.name || "VNode_" + self.nodeName;
    self.nodeType = params.nodeType || (self.nodeName && self.nodeName.indexOf('text')) !== -1 ? 3 : 1;
    self.selectorText = self.nodeName;
	return self;
}

var attrRegExp = /\" |\' /g;
        var quotesRegExp = /"|'/g;
        var tagsRegEx = /([>]+)|([<]+)/g;
        var spaceRegEx = /([\s+]+)/g;

        var textNode = '#text';
        var tagsReplacement = "$1$TAGS$2";
        var tagsSplit = '$TAGS';
        var spaceReplacement = "$1$SPACE";
        var spaceSplit = '$SPACE';

        function VText$1(text) {
            return {
                nodeName: textNode,
                nodeValue: text
            }
        }

        function str2attr(str) {
            return (str && typeof str === 'string') ? str.split(attrRegExp).map(function (item, idx) {
                if (item.indexOf("=") !== -1) {
                    item = item.split("=");
                    return {
                        name: item[0],
                        value: item[1].replace(quotesRegExp, '')
                    }
                }
                return {
                    name: item,
                    value: true
                }
            }) : str;
        }
        function VHtml(str, innerScope) {
            if (str[0] !== "<" || str.indexOf(">") === -1) {
                return VText$1(str.replace(tagsRegEx, ''))
            }
            var _parsed = str.replace(tagsRegEx, tagsReplacement).split(tagsSplit).filter(function (p) {
                    return p
                });
            var isChildTags = innerScope !== undefined ? innerScope : false;
            var vnode = {
                tagName: null,
                childNodes: [],
                attributes: ''
            };

            var child = vnode;

            for (var i = 0, len = _parsed.length; i < len; i++) {
                var tag = _parsed[i];
                var isTag = tag.charAt(0) === "<";
                if (isTag && tag.charAt(1) === "/") {
                    if (child.parent) {
                        child = child.parent;
                    }
                    continue;
                }
                if (!isTag) {
                    tag.replace(spaceRegEx, spaceReplacement).split(spaceSplit).filter(function (p) {
                        return p;
                    }).map(function (text) {
                        child.childNodes.push(VText$1(text));
                    });
                } else {
                    var tagLen = tag.length;
                    var selfClose = tag.indexOf("/>") !== -1;
                    var isOpenTag = !selfClose && isTag;
                    var tagScopeOut = isTag && tag.substr(1, tagLen - 2);
                    var parseTag = isTag && tagScopeOut.split(" ");
                    var tagName = parseTag.shift();
                    if (parseTag.length > 0) {
                        parseTag = str2attr(parseTag.join(" "));
                    }
                    if (i === 0 && !isChildTags) {
                        child.tagName = child.nodeName = tagName.toUpperCase();
                        child.attributes = parseTag;
                    } else {
                        if (selfClose) {
                            var name = tagName.substr(0, tagName.length - 1);
                            child.childNodes.push({
                                tagName: name.toUpperCase(),
                                nodeName: name,
                                attributes: parseTag,
                                parent: vnode
                            });
                        } else {
                            var childOfVNode = {
                                tagName: tagName.toUpperCase(),
                                nodeName: tagName,
                                attributes: parseTag,
                                childNodes: [],
                                parent: vnode
                            };
                            child.childNodes.push(childOfVNode);
                            child = childOfVNode;
                        }
                    }
                }
            }

            _parsed = null;
            return isChildTags ? vnode.childNodes : vnode;
        }

exports.patch = VPatch;
exports.h = VHyper;
exports.text = VText;
exports.attr = VAttr;
exports.node = VNode;
exports.html = VHtml;
exports.Component = Component;
exports.dom = DOM;
exports.linkState = linkState;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tez.js.map
