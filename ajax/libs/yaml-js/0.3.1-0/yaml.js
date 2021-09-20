(function() {
    var root = this, modules, require_from, register, error;
    if (typeof global == "undefined") {
        var global = typeof window === "undefined" ? root : window;
    }
    modules = {};
    require_from = function(parent, from) {
        return function(name) {
            if (modules[from] && modules[from][name]) {
                modules[from][name].parent = parent;
                if (modules[from][name].initialize) {
                    modules[from][name].initialize();
                }
                return modules[from][name].exports;
            } else {
                return error(name, from);
            }
        };
    };
    register = function(names, directory, callback) {
        var module = {
            exports: {},
            initialize: function() {
                callback.call(module.exports, global, module, module.exports, require_from(module, directory), undefined);
                delete module.initialize;
            },
            parent: null
        };
        for (var from in names) {
            modules[from] = modules[from] || {};
            for (var j in names[from]) {
                var name = names[from][j];
                modules[from][name] = module;
            }
        }
    };
    error = function anonymous(name, from) {
        var message = "Warn: could not find module " + name;
        console.log(message);
    };
    register({
        "0": [ "./events" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            this.Event = class Event {
                constructor(start_mark1, end_mark1) {
                    this.start_mark = start_mark1;
                    this.end_mark = end_mark1;
                }
            };
            this.NodeEvent = class NodeEvent extends this.Event {
                constructor(anchor1, start_mark, end_mark) {
                    super(start_mark, end_mark);
                    this.anchor = anchor1;
                }
            };
            this.CollectionStartEvent = class CollectionStartEvent extends this.NodeEvent {
                constructor(anchor, tag, implicit, start_mark, end_mark, flow_style) {
                    super(anchor, start_mark, end_mark);
                    this.tag = tag;
                    this.implicit = implicit;
                    this.flow_style = flow_style;
                }
            };
            this.CollectionEndEvent = class CollectionEndEvent extends this.Event {};
            this.StreamStartEvent = class StreamStartEvent extends this.Event {
                constructor(start_mark, end_mark, encoding) {
                    super(start_mark, end_mark);
                    this.encoding = encoding;
                }
            };
            this.StreamEndEvent = class StreamEndEvent extends this.Event {};
            this.DocumentStartEvent = class DocumentStartEvent extends this.Event {
                constructor(start_mark, end_mark, explicit, version, tags) {
                    super(start_mark, end_mark);
                    this.explicit = explicit;
                    this.version = version;
                    this.tags = tags;
                }
            };
            this.DocumentEndEvent = class DocumentEndEvent extends this.Event {
                constructor(start_mark, end_mark, explicit) {
                    super(start_mark, end_mark);
                    this.explicit = explicit;
                }
            };
            this.AliasEvent = class AliasEvent extends this.NodeEvent {};
            this.ScalarEvent = class ScalarEvent extends this.NodeEvent {
                constructor(anchor, tag, implicit, value, start_mark, end_mark, style) {
                    super(anchor, start_mark, end_mark);
                    this.tag = tag;
                    this.implicit = implicit;
                    this.value = value;
                    this.style = style;
                }
            };
            this.SequenceStartEvent = class SequenceStartEvent extends this.CollectionStartEvent {};
            this.SequenceEndEvent = class SequenceEndEvent extends this.CollectionEndEvent {};
            this.MappingStartEvent = class MappingStartEvent extends this.CollectionStartEvent {};
            this.MappingEndEvent = class MappingEndEvent extends this.CollectionEndEvent {};
        }).call(this);
    });
    register({
        "0": [ "./errors" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var indexOf = [].indexOf;
            this.Mark = class Mark {
                constructor(line, column, buffer, pointer) {
                    this.line = line;
                    this.column = column;
                    this.buffer = buffer;
                    this.pointer = pointer;
                }
                get_snippet(indent = 4, max_length = 75) {
                    var break_chars, end, head, ref, ref1, start, tail;
                    if (this.buffer == null) {
                        return null;
                    }
                    break_chars = "\0\r\n\u2028\u2029";
                    head = "";
                    start = this.pointer;
                    while (start > 0 && (ref = this.buffer[start - 1], indexOf.call(break_chars, ref) < 0)) {
                        start--;
                        if (this.pointer - start > max_length / 2 - 1) {
                            head = " ... ";
                            start += 5;
                            break;
                        }
                    }
                    tail = "";
                    end = this.pointer;
                    while (end < this.buffer.length && (ref1 = this.buffer[end], indexOf.call(break_chars, ref1) < 0)) {
                        end++;
                        if (end - this.pointer > max_length / 2 - 1) {
                            tail = " ... ";
                            end -= 5;
                            break;
                        }
                    }
                    return `${new Array(indent).join(" ")}${head}${this.buffer.slice(start, end)}${tail}\n${new Array(indent + this.pointer - start + head.length).join(" ")}^`;
                }
                toString() {
                    var snippet, where;
                    snippet = this.get_snippet();
                    where = `  on line ${this.line + 1}, column ${this.column + 1}`;
                    if (snippet) {
                        return where;
                    } else {
                        return `${where}:\n${snippet}`;
                    }
                }
            };
            this.YAMLError = class YAMLError extends Error {
                constructor(message) {
                    super(message);
                    Object.defineProperty(this, "stack", {
                        get: function() {
                            return this.toString() + "\n" + new Error().stack.split("\n").slice(1).join("\n");
                        }
                    });
                }
                toString() {
                    return this.message;
                }
            };
            this.MarkedYAMLError = class MarkedYAMLError extends this.YAMLError {
                constructor(context, context_mark, problem, problem_mark, note) {
                    super();
                    this.context = context;
                    this.context_mark = context_mark;
                    this.problem = problem;
                    this.problem_mark = problem_mark;
                    this.note = note;
                }
                toString() {
                    var lines;
                    lines = [];
                    if (this.context != null) {
                        lines.push(this.context);
                    }
                    if (this.context_mark != null && (this.problem == null || this.problem_mark == null || this.context_mark.line !== this.problem_mark.line || this.context_mark.column !== this.problem_mark.column)) {
                        lines.push(this.context_mark.toString());
                    }
                    if (this.problem != null) {
                        lines.push(this.problem);
                    }
                    if (this.problem_mark != null) {
                        lines.push(this.problem_mark.toString());
                    }
                    if (this.note != null) {
                        lines.push(this.note);
                    }
                    return lines.join("\n");
                }
            };
        }).call(this);
    });
    register({
        "0": [ "./nodes" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var unique_id;
            unique_id = 0;
            this.Node = class Node {
                constructor(tag1, value1, start_mark1, end_mark1) {
                    this.tag = tag1;
                    this.value = value1;
                    this.start_mark = start_mark1;
                    this.end_mark = end_mark1;
                    this.unique_id = `node_${unique_id++}`;
                }
            };
            this.ScalarNode = function() {
                class ScalarNode extends this.Node {
                    constructor(tag, value, start_mark, end_mark, style) {
                        super(tag, value, start_mark, end_mark);
                        this.style = style;
                    }
                }
                ScalarNode.prototype.id = "scalar";
                return ScalarNode;
            }.call(this);
            this.CollectionNode = class CollectionNode extends this.Node {
                constructor(tag, value, start_mark, end_mark, flow_style) {
                    super(tag, value, start_mark, end_mark);
                    this.flow_style = flow_style;
                }
            };
            this.SequenceNode = function() {
                class SequenceNode extends this.CollectionNode {}
                SequenceNode.prototype.id = "sequence";
                return SequenceNode;
            }.call(this);
            this.MappingNode = function() {
                class MappingNode extends this.CollectionNode {}
                MappingNode.prototype.id = "mapping";
                return MappingNode;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./composer" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var MarkedYAMLError, events, nodes;
            events = require("./events");
            ({MarkedYAMLError: MarkedYAMLError} = require("./errors"));
            nodes = require("./nodes");
            this.ComposerError = class ComposerError extends MarkedYAMLError {};
            this.Composer = function() {
                var ctor;
                class Composer {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise() {
                        return this.anchors = {};
                    }
                    check_node() {
                        if (this.check_event(events.StreamStartEvent)) {
                            this.get_event();
                        }
                        return !this.check_event(events.StreamEndEvent);
                    }
                    get_node() {
                        if (!this.check_event(events.StreamEndEvent)) {
                            return this.compose_document();
                        }
                    }
                    get_single_node() {
                        var document, event;
                        this.get_event();
                        document = null;
                        if (!this.check_event(events.StreamEndEvent)) {
                            document = this.compose_document();
                        }
                        if (!this.check_event(events.StreamEndEvent)) {
                            event = this.get_event();
                            throw new exports.ComposerError("expected a single document in the stream", document.start_mark, "but found another document", event.start_mark);
                        }
                        this.get_event();
                        return document;
                    }
                    compose_document() {
                        var node;
                        this.get_event();
                        node = this.compose_node();
                        this.get_event();
                        this.anchors = {};
                        return node;
                    }
                    compose_node(parent, index) {
                        var anchor, event, node;
                        if (this.check_event(events.AliasEvent)) {
                            event = this.get_event();
                            anchor = event.anchor;
                            if (!(anchor in this.anchors)) {
                                throw new exports.ComposerError(null, null, `found undefined alias ${anchor}`, event.start_mark);
                            }
                            return this.anchors[anchor];
                        }
                        event = this.peek_event();
                        anchor = event.anchor;
                        if (anchor !== null && anchor in this.anchors) {
                            throw new exports.ComposerError(`found duplicate anchor ${anchor}; first occurence`, this.anchors[anchor].start_mark, "second occurrence", event.start_mark);
                        }
                        this.descend_resolver(parent, index);
                        if (this.check_event(events.ScalarEvent)) {
                            node = this.compose_scalar_node(anchor);
                        } else if (this.check_event(events.SequenceStartEvent)) {
                            node = this.compose_sequence_node(anchor);
                        } else if (this.check_event(events.MappingStartEvent)) {
                            node = this.compose_mapping_node(anchor);
                        }
                        this.ascend_resolver();
                        return node;
                    }
                    compose_scalar_node(anchor) {
                        var event, node, tag;
                        event = this.get_event();
                        tag = event.tag;
                        if (tag === null || tag === "!") {
                            tag = this.resolve(nodes.ScalarNode, event.value, event.implicit);
                        }
                        node = new nodes.ScalarNode(tag, event.value, event.start_mark, event.end_mark, event.style);
                        if (anchor !== null) {
                            this.anchors[anchor] = node;
                        }
                        return node;
                    }
                    compose_sequence_node(anchor) {
                        var end_event, index, node, start_event, tag;
                        start_event = this.get_event();
                        tag = start_event.tag;
                        if (tag === null || tag === "!") {
                            tag = this.resolve(nodes.SequenceNode, null, start_event.implicit);
                        }
                        node = new nodes.SequenceNode(tag, [], start_event.start_mark, null, start_event.flow_style);
                        if (anchor !== null) {
                            this.anchors[anchor] = node;
                        }
                        index = 0;
                        while (!this.check_event(events.SequenceEndEvent)) {
                            node.value.push(this.compose_node(node, index));
                            index++;
                        }
                        end_event = this.get_event();
                        node.end_mark = end_event.end_mark;
                        return node;
                    }
                    compose_mapping_node(anchor) {
                        var end_event, item_key, item_value, node, start_event, tag;
                        start_event = this.get_event();
                        tag = start_event.tag;
                        if (tag === null || tag === "!") {
                            tag = this.resolve(nodes.MappingNode, null, start_event.implicit);
                        }
                        node = new nodes.MappingNode(tag, [], start_event.start_mark, null, start_event.flow_style);
                        if (anchor !== null) {
                            this.anchors[anchor] = node;
                        }
                        while (!this.check_event(events.MappingEndEvent)) {
                            item_key = this.compose_node(node);
                            item_value = this.compose_node(node, item_key);
                            node.value.push([ item_key, item_value ]);
                        }
                        end_event = this.get_event();
                        node.end_mark = end_event.end_mark;
                        return node;
                    }
                }
                ctor = Composer.prototype.initialise;
                return Composer;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./util" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var ref, ref1, ref2, hasProp = {}.hasOwnProperty;
            this.StringStream = class StringStream {
                constructor() {
                    this.string = "";
                }
                write(chunk) {
                    return this.string += chunk;
                }
            };
            this.clone = (obj => {
                return Object.assign({}, obj);
            });
            this.extend = function(destination, ...sources) {
                var i, j, len, len1, name, ref, source;
                for (i = 0, len = sources.length; i < len; i++) {
                    source = sources[i];
                    while (source !== Object.prototype) {
                        ref = Object.getOwnPropertyNames(source);
                        for (j = 0, len1 = ref.length; j < len1; j++) {
                            name = ref[j];
                            if (destination[name] == null) {
                                destination[name] = source[name];
                            }
                        }
                        source = Object.getPrototypeOf(source);
                    }
                }
                return destination;
            };
            this.is_empty = function(obj) {
                var key;
                if (Array.isArray(obj) || typeof obj === "string") {
                    return obj.length === 0;
                }
                for (key in obj) {
                    if (!hasProp.call(obj, key)) continue;
                    return false;
                }
                return true;
            };
            this.inspect = (ref = (ref1 = (ref2 = require("util")) != null ? ref2.inspect : void 0) != null ? ref1 : global.inspect) != null ? ref : function(a) {
                return `${a}`;
            };
            this.pad_left = function(str, char, length) {
                str = String(str);
                if (str.length >= length) {
                    return str;
                } else if (str.length + 1 === length) {
                    return `${char}${str}`;
                } else {
                    return `${new Array(length - str.length + 1).join(char)}${str}`;
                }
            };
            this.to_hex = function(num) {
                if (typeof num === "string") {
                    num = num.charCodeAt(0);
                }
                return num.toString(16);
            };
        }).call(this);
    });
    register({
        "0": [ "./constructor" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var MarkedYAMLError, nodes, util, indexOf = [].indexOf;
            ({MarkedYAMLError: MarkedYAMLError} = require("./errors"));
            nodes = require("./nodes");
            util = require("./util");
            this.ConstructorError = class ConstructorError extends MarkedYAMLError {};
            this.BaseConstructor = function() {
                var ctor;
                class BaseConstructor {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    static add_constructor(tag, constructor) {
                        if (!this.prototype.hasOwnProperty("yaml_constructors")) {
                            this.prototype.yaml_constructors = util.extend({}, this.prototype.yaml_constructors);
                        }
                        return this.prototype.yaml_constructors[tag] = constructor;
                    }
                    static add_multi_constructor(tag_prefix, multi_constructor) {
                        if (!this.prototype.hasOwnProperty("yaml_multi_constructors")) {
                            this.prototype.yaml_multi_constructors = util.extend({}, this.prototype.yaml_multi_constructors);
                        }
                        return this.prototype.yaml_multi_constructors[tag_prefix] = multi_constructor;
                    }
                    initialise() {
                        this.constructed_objects = {};
                        this.constructing_nodes = [];
                        return this.deferred_constructors = [];
                    }
                    check_data() {
                        return this.check_node();
                    }
                    get_data() {
                        if (this.check_node()) {
                            return this.construct_document(this.get_node());
                        }
                    }
                    get_single_data() {
                        var node;
                        node = this.get_single_node();
                        if (node != null) {
                            return this.construct_document(node);
                        }
                        return null;
                    }
                    construct_document(node) {
                        var data;
                        data = this.construct_object(node);
                        while (!util.is_empty(this.deferred_constructors)) {
                            this.deferred_constructors.pop()();
                        }
                        return data;
                    }
                    defer(f) {
                        return this.deferred_constructors.push(f);
                    }
                    construct_object(node) {
                        var constructor, object, ref, tag_prefix, tag_suffix;
                        if (node.unique_id in this.constructed_objects) {
                            return this.constructed_objects[node.unique_id];
                        }
                        if (ref = node.unique_id, indexOf.call(this.constructing_nodes, ref) >= 0) {
                            throw new exports.ConstructorError(null, null, "found unconstructable recursive node", node.start_mark);
                        }
                        this.constructing_nodes.push(node.unique_id);
                        constructor = null;
                        tag_suffix = null;
                        if (node.tag in this.yaml_constructors) {
                            constructor = this.yaml_constructors[node.tag];
                        } else {
                            for (tag_prefix in this.yaml_multi_constructors) {
                                if (node.tag.indexOf(tag_prefix === 0)) {
                                    tag_suffix = node.tag.slice(tag_prefix.length);
                                    constructor = this.yaml_multi_constructors[tag_prefix];
                                    break;
                                }
                            }
                            if (constructor == null) {
                                if (null in this.yaml_multi_constructors) {
                                    tag_suffix = node.tag;
                                    constructor = this.yaml_multi_constructors[null];
                                } else if (null in this.yaml_constructors) {
                                    constructor = this.yaml_constructors[null];
                                } else if (node instanceof nodes.ScalarNode) {
                                    constructor = this.construct_scalar;
                                } else if (node instanceof nodes.SequenceNode) {
                                    constructor = this.construct_sequence;
                                } else if (node instanceof nodes.MappingNode) {
                                    constructor = this.construct_mapping;
                                }
                            }
                        }
                        object = constructor.call(this, tag_suffix != null ? tag_suffix : node, node);
                        this.constructed_objects[node.unique_id] = object;
                        this.constructing_nodes.pop();
                        return object;
                    }
                    construct_scalar(node) {
                        if (!(node instanceof nodes.ScalarNode)) {
                            throw new exports.ConstructorError(null, null, `expected a scalar node but found ${node.id}`, node.start_mark);
                        }
                        return node.value;
                    }
                    construct_sequence(node) {
                        var child, i, len, ref, results;
                        if (!(node instanceof nodes.SequenceNode)) {
                            throw new exports.ConstructorError(null, null, `expected a sequence node but found ${node.id}`, node.start_mark);
                        }
                        ref = node.value;
                        results = [];
                        for (i = 0, len = ref.length; i < len; i++) {
                            child = ref[i];
                            results.push(this.construct_object(child));
                        }
                        return results;
                    }
                    construct_mapping(node) {
                        var i, key, key_node, len, mapping, ref, value, value_node;
                        if (!(node instanceof nodes.MappingNode)) {
                            throw new ConstructorError(null, null, `expected a mapping node but found ${node.id}`, node.start_mark);
                        }
                        mapping = {};
                        ref = node.value;
                        for (i = 0, len = ref.length; i < len; i++) {
                            [key_node, value_node] = ref[i];
                            key = this.construct_object(key_node);
                            if (typeof key === "object") {
                                throw new exports.ConstructorError("while constructing a mapping", node.start_mark, "found unhashable key", key_node.start_mark);
                            }
                            value = this.construct_object(value_node);
                            mapping[key] = value;
                        }
                        return mapping;
                    }
                    construct_pairs(node) {
                        var i, key, key_node, len, pairs, ref, value, value_node;
                        if (!(node instanceof nodes.MappingNode)) {
                            throw new exports.ConstructorError(null, null, `expected a mapping node but found ${node.id}`, node.start_mark);
                        }
                        pairs = [];
                        ref = node.value;
                        for (i = 0, len = ref.length; i < len; i++) {
                            [key_node, value_node] = ref[i];
                            key = this.construct_object(key_node);
                            value = this.construct_object(value_node);
                            pairs.push([ key, value ]);
                        }
                        return pairs;
                    }
                }
                BaseConstructor.prototype.yaml_constructors = {};
                BaseConstructor.prototype.yaml_multi_constructors = {};
                ctor = BaseConstructor.prototype.initialise;
                return BaseConstructor;
            }.call(this);
            this.Constructor = function() {
                var BOOL_VALUES, TIMESTAMP_PARTS, TIMESTAMP_REGEX;
                class Constructor extends this.BaseConstructor {
                    construct_scalar(node) {
                        var i, key_node, len, ref, value_node;
                        if (node instanceof nodes.MappingNode) {
                            ref = node.value;
                            for (i = 0, len = ref.length; i < len; i++) {
                                [key_node, value_node] = ref[i];
                                if (key_node.tag === "tag:yaml.org,2002:value") {
                                    return this.construct_scalar(value_node);
                                }
                            }
                        }
                        return super.construct_scalar(node);
                    }
                    flatten_mapping(node) {
                        var i, index, j, key_node, len, len1, merge, ref, submerge, subnode, value, value_node;
                        merge = [];
                        index = 0;
                        while (index < node.value.length) {
                            [key_node, value_node] = node.value[index];
                            if (key_node.tag === "tag:yaml.org,2002:merge") {
                                node.value.splice(index, 1);
                                if (value_node instanceof nodes.MappingNode) {
                                    this.flatten_mapping(value_node);
                                    merge = merge.concat(value_node.value);
                                } else if (value_node instanceof nodes.SequenceNode) {
                                    submerge = [];
                                    ref = value_node.value;
                                    for (i = 0, len = ref.length; i < len; i++) {
                                        subnode = ref[i];
                                        if (!(subnode instanceof nodes.MappingNode)) {
                                            throw new exports.ConstructorError("while constructing a mapping", node.start_mark, `expected a mapping for merging, but found ${subnode.id}`, subnode.start_mark);
                                        }
                                        this.flatten_mapping(subnode);
                                        submerge.push(subnode.value);
                                    }
                                    submerge.reverse();
                                    for (j = 0, len1 = submerge.length; j < len1; j++) {
                                        value = submerge[j];
                                        merge = merge.concat(value);
                                    }
                                } else {
                                    throw new exports.ConstructorError("while constructing a mapping", node.start_mark, `expected a mapping or list of mappings for merging but found ${value_node.id}`, value_node.start_mark);
                                }
                            } else if (key_node.tag === "tag:yaml.org,2002:value") {
                                key_node.tag = "tag:yaml.org,2002:str";
                                index++;
                            } else {
                                index++;
                            }
                        }
                        if (merge.length) {
                            return node.value = merge.concat(node.value);
                        }
                    }
                    construct_mapping(node) {
                        if (node instanceof nodes.MappingNode) {
                            this.flatten_mapping(node);
                        }
                        return super.construct_mapping(node);
                    }
                    construct_yaml_null(node) {
                        this.construct_scalar(node);
                        return null;
                    }
                    construct_yaml_bool(node) {
                        var value;
                        value = this.construct_scalar(node);
                        return BOOL_VALUES[value.toLowerCase()];
                    }
                    construct_yaml_int(node) {
                        var base, digit, digits, i, len, part, ref, sign, value;
                        value = this.construct_scalar(node);
                        value = value.replace(/_/g, "");
                        sign = value[0] === "-" ? -1 : 1;
                        if (ref = value[0], indexOf.call("+-", ref) >= 0) {
                            value = value.slice(1);
                        }
                        if (value === "0") {
                            return 0;
                        } else if (value.indexOf("0b") === 0) {
                            return sign * parseInt(value.slice(2), 2);
                        } else if (value.indexOf("0x") === 0) {
                            return sign * parseInt(value.slice(2), 16);
                        } else if (value.indexOf("0o") === 0) {
                            return sign * parseInt(value.slice(2), 8);
                        } else if (value[0] === "0") {
                            return sign * parseInt(value, 8);
                        } else if (indexOf.call(value, ":") >= 0) {
                            digits = function() {
                                var i, len, ref1, results;
                                ref1 = value.split(/:/g);
                                results = [];
                                for (i = 0, len = ref1.length; i < len; i++) {
                                    part = ref1[i];
                                    results.push(parseInt(part));
                                }
                                return results;
                            }();
                            digits.reverse();
                            base = 1;
                            value = 0;
                            for (i = 0, len = digits.length; i < len; i++) {
                                digit = digits[i];
                                value += digit * base;
                                base *= 60;
                            }
                            return sign * value;
                        } else {
                            return sign * parseInt(value);
                        }
                    }
                    construct_yaml_float(node) {
                        var base, digit, digits, i, len, part, ref, sign, value;
                        value = this.construct_scalar(node);
                        value = value.replace(/_/g, "").toLowerCase();
                        sign = value[0] === "-" ? -1 : 1;
                        if (ref = value[0], indexOf.call("+-", ref) >= 0) {
                            value = value.slice(1);
                        }
                        if (value === ".inf") {
                            return sign * Infinity;
                        } else if (value === ".nan") {
                            return 0 / 0;
                        } else if (indexOf.call(value, ":") >= 0) {
                            digits = function() {
                                var i, len, ref1, results;
                                ref1 = value.split(/:/g);
                                results = [];
                                for (i = 0, len = ref1.length; i < len; i++) {
                                    part = ref1[i];
                                    results.push(parseFloat(part));
                                }
                                return results;
                            }();
                            digits.reverse();
                            base = 1;
                            value = 0;
                            for (i = 0, len = digits.length; i < len; i++) {
                                digit = digits[i];
                                value += digit * base;
                                base *= 60;
                            }
                            return sign * value;
                        } else {
                            return sign * parseFloat(value);
                        }
                    }
                    construct_yaml_binary(node) {
                        var error, value;
                        value = this.construct_scalar(node);
                        try {
                            if (typeof window !== "undefined" && window !== null) {
                                return atob(value);
                            }
                            return new Buffer(value, "base64").toString("ascii");
                        } catch (error1) {
                            error = error1;
                            throw new exports.ConstructorError(null, null, `failed to decode base64 data: ${error}`, node.start_mark);
                        }
                    }
                    construct_yaml_timestamp(node) {
                        var date, day, fraction, hour, index, key, match, millisecond, minute, month, second, tz_hour, tz_minute, tz_sign, value, values, year;
                        value = this.construct_scalar(node);
                        match = node.value.match(TIMESTAMP_REGEX);
                        values = {};
                        for (key in TIMESTAMP_PARTS) {
                            index = TIMESTAMP_PARTS[key];
                            values[key] = match[index];
                        }
                        year = parseInt(values.year);
                        month = parseInt(values.month) - 1;
                        day = parseInt(values.day);
                        if (!values.hour) {
                            return new Date(Date.UTC(year, month, day));
                        }
                        hour = parseInt(values.hour);
                        minute = parseInt(values.minute);
                        second = parseInt(values.second);
                        millisecond = 0;
                        if (values.fraction) {
                            fraction = values.fraction.slice(0, 6);
                            while (fraction.length < 6) {
                                fraction += "0";
                            }
                            fraction = parseInt(fraction);
                            millisecond = Math.round(fraction / 1e3);
                        }
                        if (values.tz_sign) {
                            tz_sign = values.tz_sign === "-" ? 1 : -1;
                            if (tz_hour = parseInt(values.tz_hour)) {
                                hour += tz_sign * tz_hour;
                            }
                            if (tz_minute = parseInt(values.tz_minute)) {
                                minute += tz_sign * tz_minute;
                            }
                        }
                        date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
                        return date;
                    }
                    construct_yaml_pair_list(type, node) {
                        var list;
                        list = [];
                        if (!(node instanceof nodes.SequenceNode)) {
                            throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a sequence but found ${node.id}`, node.start_mark);
                        }
                        this.defer(() => {
                            var i, key, key_node, len, ref, results, subnode, value, value_node;
                            ref = node.value;
                            results = [];
                            for (i = 0, len = ref.length; i < len; i++) {
                                subnode = ref[i];
                                if (!(subnode instanceof nodes.MappingNode)) {
                                    throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a mapping of length 1 but found ${subnode.id}`, subnode.start_mark);
                                }
                                if (subnode.value.length !== 1) {
                                    throw new exports.ConstructorError(`while constructing ${type}`, node.start_mark, `expected a mapping of length 1 but found ${subnode.id}`, subnode.start_mark);
                                }
                                [key_node, value_node] = subnode.value[0];
                                key = this.construct_object(key_node);
                                value = this.construct_object(value_node);
                                results.push(list.push([ key, value ]));
                            }
                            return results;
                        });
                        return list;
                    }
                    construct_yaml_omap(node) {
                        return this.construct_yaml_pair_list("an ordered map", node);
                    }
                    construct_yaml_pairs(node) {
                        return this.construct_yaml_pair_list("pairs", node);
                    }
                    construct_yaml_set(node) {
                        var data;
                        data = [];
                        this.defer(() => {
                            var item, results;
                            results = [];
                            for (item in this.construct_mapping(node)) {
                                results.push(data.push(item));
                            }
                            return results;
                        });
                        return data;
                    }
                    construct_yaml_str(node) {
                        return this.construct_scalar(node);
                    }
                    construct_yaml_seq(node) {
                        var data;
                        data = [];
                        this.defer(() => {
                            var i, item, len, ref, results;
                            ref = this.construct_sequence(node);
                            results = [];
                            for (i = 0, len = ref.length; i < len; i++) {
                                item = ref[i];
                                results.push(data.push(item));
                            }
                            return results;
                        });
                        return data;
                    }
                    construct_yaml_map(node) {
                        var data;
                        data = {};
                        this.defer(() => {
                            var key, ref, results, value;
                            ref = this.construct_mapping(node);
                            results = [];
                            for (key in ref) {
                                value = ref[key];
                                results.push(data[key] = value);
                            }
                            return results;
                        });
                        return data;
                    }
                    construct_yaml_object(node, klass) {
                        var data;
                        data = new klass();
                        this.defer(() => {
                            var key, ref, results, value;
                            ref = this.construct_mapping(node, true);
                            results = [];
                            for (key in ref) {
                                value = ref[key];
                                results.push(data[key] = value);
                            }
                            return results;
                        });
                        return data;
                    }
                    construct_undefined(node) {
                        throw new exports.ConstructorError(null, null, `could not determine a constructor for the tag ${node.tag}`, node.start_mark);
                    }
                }
                BOOL_VALUES = {
                    on: true,
                    off: false,
                    true: true,
                    false: false,
                    yes: true,
                    no: false
                };
                TIMESTAMP_REGEX = /^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[\x20\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\.([0-9]*))?(?:[\x20\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$/;
                TIMESTAMP_PARTS = {
                    year: 1,
                    month: 2,
                    day: 3,
                    hour: 4,
                    minute: 5,
                    second: 6,
                    fraction: 7,
                    tz: 8,
                    tz_sign: 9,
                    tz_hour: 10,
                    tz_minute: 11
                };
                return Constructor;
            }.call(this);
            this.Constructor.add_constructor("tag:yaml.org,2002:null", this.Constructor.prototype.construct_yaml_null);
            this.Constructor.add_constructor("tag:yaml.org,2002:bool", this.Constructor.prototype.construct_yaml_bool);
            this.Constructor.add_constructor("tag:yaml.org,2002:int", this.Constructor.prototype.construct_yaml_int);
            this.Constructor.add_constructor("tag:yaml.org,2002:float", this.Constructor.prototype.construct_yaml_float);
            this.Constructor.add_constructor("tag:yaml.org,2002:binary", this.Constructor.prototype.construct_yaml_binary);
            this.Constructor.add_constructor("tag:yaml.org,2002:timestamp", this.Constructor.prototype.construct_yaml_timestamp);
            this.Constructor.add_constructor("tag:yaml.org,2002:omap", this.Constructor.prototype.construct_yaml_omap);
            this.Constructor.add_constructor("tag:yaml.org,2002:pairs", this.Constructor.prototype.construct_yaml_pairs);
            this.Constructor.add_constructor("tag:yaml.org,2002:set", this.Constructor.prototype.construct_yaml_set);
            this.Constructor.add_constructor("tag:yaml.org,2002:str", this.Constructor.prototype.construct_yaml_str);
            this.Constructor.add_constructor("tag:yaml.org,2002:seq", this.Constructor.prototype.construct_yaml_seq);
            this.Constructor.add_constructor("tag:yaml.org,2002:map", this.Constructor.prototype.construct_yaml_map);
            this.Constructor.add_constructor(null, this.Constructor.prototype.construct_undefined);
        }).call(this);
    });
    register({
        "0": [ "./emitter" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var ScalarAnalysis, YAMLError, events, util, hasProp = {}.hasOwnProperty, indexOf = [].indexOf;
            events = require("./events");
            util = require("./util");
            ({YAMLError: YAMLError} = require("./errors"));
            this.EmitterError = class EmitterError extends YAMLError {};
            this.Emitter = function() {
                var C_WHITESPACE, DEFAULT_TAG_PREFIXES, ESCAPE_REPLACEMENTS, ctor;
                class Emitter {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise(stream, options) {
                        var ref;
                        this.stream = stream;
                        this.encoding = null;
                        this.states = [];
                        this.state = this.expect_stream_start;
                        this.events = [];
                        this.event = null;
                        this.indents = [];
                        this.indent = null;
                        this.flow_level = 0;
                        this.root_context = false;
                        this.sequence_context = false;
                        this.mapping_context = false;
                        this.simple_key_context = false;
                        this.line = 0;
                        this.column = 0;
                        this.whitespace = true;
                        this.indentation = true;
                        this.open_ended = false;
                        ({canonical: this.canonical, allow_unicode: this.allow_unicode} = options);
                        if (this.canonical == null) {
                            this.canonical = false;
                        }
                        if (this.allow_unicode == null) {
                            this.allow_unicode = true;
                        }
                        this.best_indent = 1 < options.indent && options.indent < 10 ? options.indent : 2;
                        this.best_width = options.width > this.indent * 2 ? options.width : 80;
                        this.best_line_break = (ref = options.line_break) === "\r" || ref === "\n" || ref === "\r\n" ? options.line_break : "\n";
                        this.tag_prefixes = null;
                        this.prepared_anchor = null;
                        this.prepared_tag = null;
                        this.analysis = null;
                        return this.style = null;
                    }
                    dispose() {
                        this.states = [];
                        return this.state = null;
                    }
                    emit(event) {
                        var results;
                        this.events.push(event);
                        results = [];
                        while (!this.need_more_events()) {
                            this.event = this.events.shift();
                            this.state();
                            results.push(this.event = null);
                        }
                        return results;
                    }
                    need_more_events() {
                        var event;
                        if (this.events.length === 0) {
                            return true;
                        }
                        event = this.events[0];
                        if (event instanceof events.DocumentStartEvent) {
                            return this.need_events(1);
                        } else if (event instanceof events.SequenceStartEvent) {
                            return this.need_events(2);
                        } else if (event instanceof events.MappingStartEvent) {
                            return this.need_events(3);
                        } else {
                            return false;
                        }
                    }
                    need_events(count) {
                        var event, i, len, level, ref;
                        level = 0;
                        ref = this.events.slice(1);
                        for (i = 0, len = ref.length; i < len; i++) {
                            event = ref[i];
                            if (event instanceof events.DocumentStartEvent || event instanceof events.CollectionStartEvent) {
                                level++;
                            } else if (event instanceof events.DocumentEndEvent || event instanceof events.CollectionEndEvent) {
                                level--;
                            } else if (event instanceof events.StreamEndEvent) {
                                level = -1;
                            }
                            if (level < 0) {
                                return false;
                            }
                        }
                        return this.events.length < count + 1;
                    }
                    increase_indent(options = {}) {
                        this.indents.push(this.indent);
                        if (this.indent == null) {
                            return this.indent = options.flow ? this.best_indent : 0;
                        } else if (!options.indentless) {
                            return this.indent += this.best_indent;
                        }
                    }
                    expect_stream_start() {
                        if (this.event instanceof events.StreamStartEvent) {
                            if (this.event.encoding && !("encoding" in this.stream)) {
                                this.encoding = this.event.encoding;
                            }
                            this.write_stream_start();
                            return this.state = this.expect_first_document_start;
                        } else {
                            return this.error("expected StreamStartEvent, but got", this.event);
                        }
                    }
                    expect_nothing() {
                        return this.error("expected nothing, but got", this.event);
                    }
                    expect_first_document_start() {
                        return this.expect_document_start(true);
                    }
                    expect_document_start(first = false) {
                        var explicit, handle, i, k, len, prefix, ref;
                        if (this.event instanceof events.DocumentStartEvent) {
                            if ((this.event.version || this.event.tags) && this.open_ended) {
                                this.write_indicator("...", true);
                                this.write_indent();
                            }
                            if (this.event.version) {
                                this.write_version_directive(this.prepare_version(this.event.version));
                            }
                            this.tag_prefixes = util.clone(DEFAULT_TAG_PREFIXES);
                            if (this.event.tags) {
                                ref = function() {
                                    var ref, results;
                                    ref = this.event.tags;
                                    results = [];
                                    for (k in ref) {
                                        if (!hasProp.call(ref, k)) continue;
                                        results.push(k);
                                    }
                                    return results;
                                }.call(this).sort();
                                for (i = 0, len = ref.length; i < len; i++) {
                                    handle = ref[i];
                                    prefix = this.event.tags[handle];
                                    this.tag_prefixes[prefix] = handle;
                                    this.write_tag_directive(this.prepare_tag_handle(handle), this.prepare_tag_prefix(prefix));
                                }
                            }
                            explicit = !first || this.event.explicit || this.canonical || this.event.version || this.event.tags || this.check_empty_document();
                            if (explicit) {
                                this.write_indent();
                                this.write_indicator("---", true);
                                if (this.canonical) {
                                    this.write_indent();
                                }
                            }
                            return this.state = this.expect_document_root;
                        } else if (this.event instanceof events.StreamEndEvent) {
                            if (this.open_ended) {
                                this.write_indicator("...", true);
                                this.write_indent();
                            }
                            this.write_stream_end();
                            return this.state = this.expect_nothing;
                        } else {
                            return this.error("expected DocumentStartEvent, but got", this.event);
                        }
                    }
                    expect_document_end() {
                        if (this.event instanceof events.DocumentEndEvent) {
                            this.write_indent();
                            if (this.event.explicit) {
                                this.write_indicator("...", true);
                                this.write_indent();
                            }
                            this.flush_stream();
                            return this.state = this.expect_document_start;
                        } else {
                            return this.error("expected DocumentEndEvent, but got", this.event);
                        }
                    }
                    expect_document_root() {
                        this.states.push(this.expect_document_end);
                        return this.expect_node({
                            root: true
                        });
                    }
                    expect_node(expect = {}) {
                        this.root_context = !!expect.root;
                        this.sequence_context = !!expect.sequence;
                        this.mapping_context = !!expect.mapping;
                        this.simple_key_context = !!expect.simple_key;
                        if (this.event instanceof events.AliasEvent) {
                            return this.expect_alias();
                        } else if (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent) {
                            this.process_anchor("&");
                            this.process_tag();
                            if (this.event instanceof events.ScalarEvent) {
                                return this.expect_scalar();
                            } else if (this.event instanceof events.SequenceStartEvent) {
                                if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_sequence()) {
                                    return this.expect_flow_sequence();
                                } else {
                                    return this.expect_block_sequence();
                                }
                            } else if (this.event instanceof events.MappingStartEvent) {
                                if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_mapping()) {
                                    return this.expect_flow_mapping();
                                } else {
                                    return this.expect_block_mapping();
                                }
                            }
                        } else {
                            return this.error("expected NodeEvent, but got", this.event);
                        }
                    }
                    expect_alias() {
                        if (!this.event.anchor) {
                            this.error("anchor is not specified for alias");
                        }
                        this.process_anchor("*");
                        return this.state = this.states.pop();
                    }
                    expect_scalar() {
                        this.increase_indent({
                            flow: true
                        });
                        this.process_scalar();
                        this.indent = this.indents.pop();
                        return this.state = this.states.pop();
                    }
                    expect_flow_sequence() {
                        this.write_indicator("[", true, {
                            whitespace: true
                        });
                        this.flow_level++;
                        this.increase_indent({
                            flow: true
                        });
                        return this.state = this.expect_first_flow_sequence_item;
                    }
                    expect_first_flow_sequence_item() {
                        if (this.event instanceof events.SequenceEndEvent) {
                            this.indent = this.indents.pop();
                            this.flow_level--;
                            this.write_indicator("]", false);
                            return this.state = this.states.pop();
                        } else {
                            if (this.canonical || this.column > this.best_width) {
                                this.write_indent();
                            }
                            this.states.push(this.expect_flow_sequence_item);
                            return this.expect_node({
                                sequence: true
                            });
                        }
                    }
                    expect_flow_sequence_item() {
                        if (this.event instanceof events.SequenceEndEvent) {
                            this.indent = this.indents.pop();
                            this.flow_level--;
                            if (this.canonical) {
                                this.write_indicator(",", false);
                                this.write_indent();
                            }
                            this.write_indicator("]", false);
                            return this.state = this.states.pop();
                        } else {
                            this.write_indicator(",", false);
                            if (this.canonical || this.column > this.best_width) {
                                this.write_indent();
                            }
                            this.states.push(this.expect_flow_sequence_item);
                            return this.expect_node({
                                sequence: true
                            });
                        }
                    }
                    expect_flow_mapping() {
                        this.write_indicator("{", true, {
                            whitespace: true
                        });
                        this.flow_level++;
                        this.increase_indent({
                            flow: true
                        });
                        return this.state = this.expect_first_flow_mapping_key;
                    }
                    expect_first_flow_mapping_key() {
                        if (this.event instanceof events.MappingEndEvent) {
                            this.indent = this.indents.pop();
                            this.flow_level--;
                            this.write_indicator("}", false);
                            return this.state = this.states.pop();
                        } else {
                            if (this.canonical || this.column > this.best_width) {
                                this.write_indent();
                            }
                            if (!this.canonical && this.check_simple_key()) {
                                this.states.push(this.expect_flow_mapping_simple_value);
                                return this.expect_node({
                                    mapping: true,
                                    simple_key: true
                                });
                            } else {
                                this.write_indicator("?", true);
                                this.states.push(this.expect_flow_mapping_value);
                                return this.expect_node({
                                    mapping: true
                                });
                            }
                        }
                    }
                    expect_flow_mapping_key() {
                        if (this.event instanceof events.MappingEndEvent) {
                            this.indent = this.indents.pop();
                            this.flow_level--;
                            if (this.canonical) {
                                this.write_indicator(",", false);
                                this.write_indent();
                            }
                            this.write_indicator("}", false);
                            return this.state = this.states.pop();
                        } else {
                            this.write_indicator(",", false);
                            if (this.canonical || this.column > this.best_width) {
                                this.write_indent();
                            }
                            if (!this.canonical && this.check_simple_key()) {
                                this.states.push(this.expect_flow_mapping_simple_value);
                                return this.expect_node({
                                    mapping: true,
                                    simple_key: true
                                });
                            } else {
                                this.write_indicator("?", true);
                                this.states.push(this.expect_flow_mapping_value);
                                return this.expect_node({
                                    mapping: true
                                });
                            }
                        }
                    }
                    expect_flow_mapping_simple_value() {
                        this.write_indicator(":", false);
                        this.states.push(this.expect_flow_mapping_key);
                        return this.expect_node({
                            mapping: true
                        });
                    }
                    expect_flow_mapping_value() {
                        if (this.canonical || this.column > this.best_width) {
                            this.write_indent();
                        }
                        this.write_indicator(":", true);
                        this.states.push(this.expect_flow_mapping_key);
                        return this.expect_node({
                            mapping: true
                        });
                    }
                    expect_block_sequence() {
                        var indentless;
                        indentless = this.mapping_context && !this.indentation;
                        this.increase_indent({
                            indentless: indentless
                        });
                        return this.state = this.expect_first_block_sequence_item;
                    }
                    expect_first_block_sequence_item() {
                        return this.expect_block_sequence_item(true);
                    }
                    expect_block_sequence_item(first = false) {
                        if (!first && this.event instanceof events.SequenceEndEvent) {
                            this.indent = this.indents.pop();
                            return this.state = this.states.pop();
                        } else {
                            this.write_indent();
                            this.write_indicator("-", true, {
                                indentation: true
                            });
                            this.states.push(this.expect_block_sequence_item);
                            return this.expect_node({
                                sequence: true
                            });
                        }
                    }
                    expect_block_mapping() {
                        this.increase_indent();
                        return this.state = this.expect_first_block_mapping_key;
                    }
                    expect_first_block_mapping_key() {
                        return this.expect_block_mapping_key(true);
                    }
                    expect_block_mapping_key(first = false) {
                        if (!first && this.event instanceof events.MappingEndEvent) {
                            this.indent = this.indents.pop();
                            return this.state = this.states.pop();
                        } else {
                            this.write_indent();
                            if (this.check_simple_key()) {
                                this.states.push(this.expect_block_mapping_simple_value);
                                return this.expect_node({
                                    mapping: true,
                                    simple_key: true
                                });
                            } else {
                                this.write_indicator("?", true, {
                                    indentation: true
                                });
                                this.states.push(this.expect_block_mapping_value);
                                return this.expect_node({
                                    mapping: true
                                });
                            }
                        }
                    }
                    expect_block_mapping_simple_value() {
                        this.write_indicator(":", false);
                        this.states.push(this.expect_block_mapping_key);
                        return this.expect_node({
                            mapping: true
                        });
                    }
                    expect_block_mapping_value() {
                        this.write_indent();
                        this.write_indicator(":", true, {
                            indentation: true
                        });
                        this.states.push(this.expect_block_mapping_key);
                        return this.expect_node({
                            mapping: true
                        });
                    }
                    check_empty_document() {
                        var event;
                        if (!(this.event instanceof events.DocumentStartEvent) || this.events.length === 0) {
                            return false;
                        }
                        event = this.events[0];
                        return event instanceof events.ScalarEvent && event.anchor == null && event.tag == null && event.implicit && event.value === "";
                    }
                    check_empty_sequence() {
                        return this.event instanceof events.SequenceStartEvent && this.events[0] instanceof events.SequenceEndEvent;
                    }
                    check_empty_mapping() {
                        return this.event instanceof events.MappingStartEvent && this.events[0] instanceof events.MappingEndEvent;
                    }
                    check_simple_key() {
                        var length;
                        length = 0;
                        if (this.event instanceof events.NodeEvent && this.event.anchor != null) {
                            if (this.prepared_anchor == null) {
                                this.prepared_anchor = this.prepare_anchor(this.event.anchor);
                            }
                            length += this.prepared_anchor.length;
                        }
                        if (this.event.tag != null && (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent)) {
                            if (this.prepared_tag == null) {
                                this.prepared_tag = this.prepare_tag(this.event.tag);
                            }
                            length += this.prepared_tag.length;
                        }
                        if (this.event instanceof events.ScalarEvent) {
                            if (this.analysis == null) {
                                this.analysis = this.analyze_scalar(this.event.value);
                            }
                            length += this.analysis.scalar.length;
                        }
                        return length < 128 && (this.event instanceof events.AliasEvent || this.event instanceof events.ScalarEvent && !this.analysis.empty && !this.analysis.multiline || this.check_empty_sequence() || this.check_empty_mapping());
                    }
                    process_anchor(indicator) {
                        if (this.event.anchor == null) {
                            this.prepared_anchor = null;
                            return;
                        }
                        if (this.prepared_anchor == null) {
                            this.prepared_anchor = this.prepare_anchor(this.event.anchor);
                        }
                        if (this.prepared_anchor) {
                            this.write_indicator(`${indicator}${this.prepared_anchor}`, true);
                        }
                        return this.prepared_anchor = null;
                    }
                    process_tag() {
                        var tag;
                        tag = this.event.tag;
                        if (this.event instanceof events.ScalarEvent) {
                            if (this.style == null) {
                                this.style = this.choose_scalar_style();
                            }
                            if ((!this.canonical || tag == null) && (this.style === "" && this.event.implicit[0] || this.style !== "" && this.event.implicit[1])) {
                                this.prepared_tag = null;
                                return;
                            }
                            if (this.event.implicit[0] && tag == null) {
                                tag = "!";
                                this.prepared_tag = null;
                            }
                        } else if ((!this.canonical || tag == null) && this.event.implicit) {
                            this.prepared_tag = null;
                            return;
                        }
                        if (tag == null) {
                            this.error("tag is not specified");
                        }
                        if (this.prepared_tag == null) {
                            this.prepared_tag = this.prepare_tag(tag);
                        }
                        this.write_indicator(this.prepared_tag, true);
                        return this.prepared_tag = null;
                    }
                    process_scalar() {
                        var split;
                        if (this.analysis == null) {
                            this.analysis = this.analyze_scalar(this.event.value);
                        }
                        if (this.style == null) {
                            this.style = this.choose_scalar_style();
                        }
                        split = !this.simple_key_context;
                        switch (this.style) {
                          case '"':
                            this.write_double_quoted(this.analysis.scalar, split);
                            break;

                          case "'":
                            this.write_single_quoted(this.analysis.scalar, split);
                            break;

                          case ">":
                            this.write_folded(this.analysis.scalar);
                            break;

                          case "|":
                            this.write_literal(this.analysis.scalar);
                            break;

                          default:
                            this.write_plain(this.analysis.scalar, split);
                        }
                        this.analysis = null;
                        return this.style = null;
                    }
                    choose_scalar_style() {
                        var ref;
                        if (this.analysis == null) {
                            this.analysis = this.analyze_scalar(this.event.value);
                        }
                        if (this.event.style === '"' || this.canonical) {
                            return '"';
                        }
                        if (!this.event.style && this.event.implicit[0] && !(this.simple_key_context && (this.analysis.empty || this.analysis.multiline)) && (this.flow_level && this.analysis.allow_flow_plain || !this.flow_level && this.analysis.allow_block_plain)) {
                            return "";
                        }
                        if (this.event.style && (ref = this.event.style, indexOf.call("|>", ref) >= 0) && !this.flow_level && !this.simple_key_context && this.analysis.allow_block) {
                            return this.event.style;
                        }
                        if ((!this.event.style || this.event.style === "'") && this.analysis.allow_single_quoted && !(this.simple_key_context && this.analysis.multiline)) {
                            return "'";
                        }
                        return '"';
                    }
                    prepare_version([major, minor]) {
                        var version;
                        version = `${major}.${minor}`;
                        if (major === 1) {
                            return version;
                        } else {
                            return this.error("unsupported YAML version", version);
                        }
                    }
                    prepare_tag_handle(handle) {
                        var char, i, len, ref;
                        if (!handle) {
                            this.error("tag handle must not be empty");
                        }
                        if (handle[0] !== "!" || handle.slice(-1) !== "!") {
                            this.error("tag handle must start and end with '!':", handle);
                        }
                        ref = handle.slice(1, -1);
                        for (i = 0, len = ref.length; i < len; i++) {
                            char = ref[i];
                            if (!("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0)) {
                                this.error(`invalid character '${char}' in the tag handle:`, handle);
                            }
                        }
                        return handle;
                    }
                    prepare_tag_prefix(prefix) {
                        var char, chunks, end, start;
                        if (!prefix) {
                            this.error("tag prefix must not be empty");
                        }
                        chunks = [];
                        start = 0;
                        end = +(prefix[0] === "!");
                        while (end < prefix.length) {
                            char = prefix[end];
                            if ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?!:@&=+$,_.~*'()[]", char) >= 0) {
                                end++;
                            } else {
                                if (start < end) {
                                    chunks.push(prefix.slice(start, end));
                                }
                                start = end = end + 1;
                                chunks.push(char);
                            }
                        }
                        if (start < end) {
                            chunks.push(prefix.slice(start, end));
                        }
                        return chunks.join("");
                    }
                    prepare_tag(tag) {
                        var char, chunks, end, handle, i, k, len, prefix, ref, start, suffix, suffix_text;
                        if (!tag) {
                            this.error("tag must not be empty");
                        }
                        if (tag === "!") {
                            return tag;
                        }
                        handle = null;
                        suffix = tag;
                        ref = function() {
                            var ref, results;
                            ref = this.tag_prefixes;
                            results = [];
                            for (k in ref) {
                                if (!hasProp.call(ref, k)) continue;
                                results.push(k);
                            }
                            return results;
                        }.call(this).sort();
                        for (i = 0, len = ref.length; i < len; i++) {
                            prefix = ref[i];
                            if (tag.indexOf(prefix) === 0 && (prefix === "!" || prefix.length < tag.length)) {
                                handle = this.tag_prefixes[prefix];
                                suffix = tag.slice(prefix.length);
                            }
                        }
                        chunks = [];
                        start = end = 0;
                        while (end < suffix.length) {
                            char = suffix[end];
                            if ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?!:@&=+$,_.~*'()[]", char) >= 0 || char === "!" && handle !== "!") {
                                end++;
                            } else {
                                if (start < end) {
                                    chunks.push(suffix.slice(start, end));
                                }
                                start = end = end + 1;
                                chunks.push(char);
                            }
                        }
                        if (start < end) {
                            chunks.push(suffix.slice(start, end));
                        }
                        suffix_text = chunks.join("");
                        if (handle) {
                            return `${handle}${suffix_text}`;
                        } else {
                            return `!<${suffix_text}>`;
                        }
                    }
                    prepare_anchor(anchor) {
                        var char, i, len;
                        if (!anchor) {
                            this.error("anchor must not be empty");
                        }
                        for (i = 0, len = anchor.length; i < len; i++) {
                            char = anchor[i];
                            if (!("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0)) {
                                this.error(`invalid character '${char}' in the anchor:`, anchor);
                            }
                        }
                        return anchor;
                    }
                    analyze_scalar(scalar) {
                        var allow_block, allow_block_plain, allow_double_quoted, allow_flow_plain, allow_single_quoted, block_indicators, break_space, char, flow_indicators, followed_by_whitespace, i, index, leading_break, leading_space, len, line_breaks, preceded_by_whitespace, previous_break, previous_space, ref, ref1, space_break, special_characters, trailing_break, trailing_space, unicode_characters;
                        if (!scalar) {
                            new ScalarAnalysis(scalar, true, false, false, true, true, true, false);
                        }
                        block_indicators = false;
                        flow_indicators = false;
                        line_breaks = false;
                        special_characters = false;
                        unicode_characters = false;
                        leading_space = false;
                        leading_break = false;
                        trailing_space = false;
                        trailing_break = false;
                        break_space = false;
                        space_break = false;
                        if (scalar.indexOf("---") === 0 || scalar.indexOf("...") === 0) {
                            block_indicators = true;
                            flow_indicators = true;
                        }
                        preceded_by_whitespace = true;
                        followed_by_whitespace = scalar.length === 1 || (ref = scalar[1], indexOf.call("\0 \t\r\n\u2028\u2029", ref) >= 0);
                        previous_space = false;
                        previous_break = false;
                        index = 0;
                        for (index = i = 0, len = scalar.length; i < len; index = ++i) {
                            char = scalar[index];
                            if (index === 0) {
                                if (indexOf.call("#,[]{}&*!|>'\"%@`", char) >= 0 || char === "-" && followed_by_whitespace) {
                                    flow_indicators = true;
                                    block_indicators = true;
                                } else if (indexOf.call("?:", char) >= 0) {
                                    flow_indicators = true;
                                    if (followed_by_whitespace) {
                                        block_indicators = true;
                                    }
                                }
                            } else {
                                if (indexOf.call(",?[]{}", char) >= 0) {
                                    flow_indicators = true;
                                } else if (char === ":") {
                                    flow_indicators = true;
                                    if (followed_by_whitespace) {
                                        block_indicators = true;
                                    }
                                } else if (char === "#" && preceded_by_whitespace) {
                                    flow_indicators = true;
                                    block_indicators = true;
                                }
                            }
                            if (indexOf.call("\n\u2028\u2029", char) >= 0) {
                                line_breaks = true;
                            }
                            if (!(char === "\n" || " " <= char && char <= "~")) {
                                if (char !== "\ufeff" && (char === "" || " " <= char && char <= "퟿" || "" <= char && char <= "�")) {
                                    unicode_characters = true;
                                    if (!this.allow_unicode) {
                                        special_characters = true;
                                    }
                                } else {
                                    special_characters = true;
                                }
                            }
                            if (char === " ") {
                                if (index === 0) {
                                    leading_space = true;
                                }
                                if (index === scalar.length - 1) {
                                    trailing_space = true;
                                }
                                if (previous_break) {
                                    break_space = true;
                                }
                                previous_break = false;
                                previous_space = true;
                            } else if (indexOf.call("\n\u2028\u2029", char) >= 0) {
                                if (index === 0) {
                                    leading_break = true;
                                }
                                if (index === scalar.length - 1) {
                                    trailing_break = true;
                                }
                                if (previous_space) {
                                    space_break = true;
                                }
                                previous_break = true;
                                previous_space = false;
                            } else {
                                previous_break = false;
                                previous_space = false;
                            }
                            preceded_by_whitespace = indexOf.call(C_WHITESPACE, char) >= 0;
                            followed_by_whitespace = index + 2 >= scalar.length || (ref1 = scalar[index + 2], 
                            indexOf.call(C_WHITESPACE, ref1) >= 0);
                        }
                        allow_flow_plain = true;
                        allow_block_plain = true;
                        allow_single_quoted = true;
                        allow_double_quoted = true;
                        allow_block = true;
                        if (leading_space || leading_break || trailing_space || trailing_break) {
                            allow_flow_plain = allow_block_plain = false;
                        }
                        if (trailing_space) {
                            allow_block = false;
                        }
                        if (break_space) {
                            allow_flow_plain = allow_block_plain = allow_single_quoted = false;
                        }
                        if (space_break || special_characters) {
                            allow_flow_plain = allow_block_plain = allow_single_quoted = allow_block = false;
                        }
                        if (line_breaks) {
                            allow_flow_plain = allow_block_plain = false;
                        }
                        if (flow_indicators) {
                            allow_flow_plain = false;
                        }
                        if (block_indicators) {
                            allow_block_plain = false;
                        }
                        return new ScalarAnalysis(scalar, false, line_breaks, allow_flow_plain, allow_block_plain, allow_single_quoted, allow_double_quoted, allow_block);
                    }
                    write_stream_start() {
                        if (this.encoding && this.encoding.indexOf("utf-16") === 0) {
                            return this.stream.write("\ufeff", this.encoding);
                        }
                    }
                    write_stream_end() {
                        return this.flush_stream();
                    }
                    write_indicator(indicator, need_whitespace, options = {}) {
                        var data;
                        data = this.whitespace || !need_whitespace ? indicator : " " + indicator;
                        this.whitespace = !!options.whitespace;
                        this.indentation && (this.indentation = !!options.indentation);
                        this.column += data.length;
                        this.open_ended = false;
                        return this.stream.write(data, this.encoding);
                    }
                    write_indent() {
                        var data, indent, ref;
                        indent = (ref = this.indent) != null ? ref : 0;
                        if (!this.indentation || this.column > indent || this.column === indent && !this.whitespace) {
                            this.write_line_break();
                        }
                        if (this.column < indent) {
                            this.whitespace = true;
                            data = new Array(indent - this.column + 1).join(" ");
                            this.column = indent;
                            return this.stream.write(data, this.encoding);
                        }
                    }
                    write_line_break(data) {
                        this.whitespace = true;
                        this.indentation = true;
                        this.line += 1;
                        this.column = 0;
                        return this.stream.write(data != null ? data : this.best_line_break, this.encoding);
                    }
                    write_version_directive(version_text) {
                        this.stream.write(`%YAML ${version_text}`, this.encoding);
                        return this.write_line_break();
                    }
                    write_tag_directive(handle_text, prefix_text) {
                        this.stream.write(`%TAG ${handle_text} ${prefix_text}`, this.encoding);
                        return this.write_line_break();
                    }
                    write_single_quoted(text, split = true) {
                        var br, breaks, char, data, end, i, len, ref, spaces, start;
                        this.write_indicator("'", true);
                        spaces = false;
                        breaks = false;
                        start = end = 0;
                        while (end <= text.length) {
                            char = text[end];
                            if (spaces) {
                                if (char == null || char !== " ") {
                                    if (start + 1 === end && this.column > this.best_width && split && start !== 0 && end !== text.length) {
                                        this.write_indent();
                                    } else {
                                        data = text.slice(start, end);
                                        this.column += data.length;
                                        this.stream.write(data, this.encoding);
                                    }
                                    start = end;
                                }
                            } else if (breaks) {
                                if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
                                    if (text[start] === "\n") {
                                        this.write_line_break();
                                    }
                                    ref = text.slice(start, end);
                                    for (i = 0, len = ref.length; i < len; i++) {
                                        br = ref[i];
                                        if (br === "\n") {
                                            this.write_line_break();
                                        } else {
                                            this.write_line_break(br);
                                        }
                                    }
                                    this.write_indent();
                                    start = end;
                                }
                            } else if ((char == null || indexOf.call(" \n\u2028\u2029", char) >= 0 || char === "'") && start < end) {
                                data = text.slice(start, end);
                                this.column += data.length;
                                this.stream.write(data, this.encoding);
                                start = end;
                            }
                            if (char === "'") {
                                this.column += 2;
                                this.stream.write("''", this.encoding);
                                start = end + 1;
                            }
                            if (char != null) {
                                spaces = char === " ";
                                breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
                            }
                            end++;
                        }
                        return this.write_indicator("'", false);
                    }
                    write_double_quoted(text, split = true) {
                        var char, data, end, start;
                        this.write_indicator('"', true);
                        start = end = 0;
                        while (end <= text.length) {
                            char = text[end];
                            if (char == null || indexOf.call('"\\\u2028\u2029\ufeff', char) >= 0 || !(" " <= char && char <= "~" || this.allow_unicode && (" " <= char && char <= "퟿" || "" <= char && char <= "�"))) {
                                if (start < end) {
                                    data = text.slice(start, end);
                                    this.column += data.length;
                                    this.stream.write(data, this.encoding);
                                    start = end;
                                }
                                if (char != null) {
                                    data = char in ESCAPE_REPLACEMENTS ? "\\" + ESCAPE_REPLACEMENTS[char] : char <= "ÿ" ? `\\x${util.pad_left(util.to_hex(char), "0", 2)}` : char <= "￿" ? `\\u${util.pad_left(util.to_hex(char), "0", 4)}` : `\\U${util.pad_left(util.to_hex(char), "0", 16)}`;
                                    this.column += data.length;
                                    this.stream.write(data, this.encoding);
                                    start = end + 1;
                                }
                            }
                            if (split && (0 < end && end < text.length - 1) && (char === " " || start >= end) && this.column + (end - start) > this.best_width) {
                                data = `${text.slice(start, end)}\\`;
                                if (start < end) {
                                    start = end;
                                }
                                this.column += data.length;
                                this.stream.write(data, this.encoding);
                                this.write_indent();
                                this.whitespace = false;
                                this.indentation = false;
                                if (text[start] === " ") {
                                    data = "\\";
                                    this.column += data.length;
                                    this.stream.write(data, this.encoding);
                                }
                            }
                            end++;
                        }
                        return this.write_indicator('"', false);
                    }
                    write_folded(text) {
                        var br, breaks, char, data, end, hints, i, leading_space, len, ref, results, spaces, start;
                        hints = this.determine_block_hints(text);
                        this.write_indicator(`>${hints}`, true);
                        if (hints.slice(-1) === "+") {
                            this.open_ended = true;
                        }
                        this.write_line_break();
                        leading_space = true;
                        breaks = true;
                        spaces = false;
                        start = end = 0;
                        results = [];
                        while (end <= text.length) {
                            char = text[end];
                            if (breaks) {
                                if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
                                    if (!leading_space && char != null && char !== " " && text[start] === "\n") {
                                        this.write_line_break();
                                    }
                                    leading_space = char === " ";
                                    ref = text.slice(start, end);
                                    for (i = 0, len = ref.length; i < len; i++) {
                                        br = ref[i];
                                        if (br === "\n") {
                                            this.write_line_break();
                                        } else {
                                            this.write_line_break(br);
                                        }
                                    }
                                    if (char != null) {
                                        this.write_indent();
                                    }
                                    start = end;
                                }
                            } else if (spaces) {
                                if (char !== " ") {
                                    if (start + 1 === end && this.column > this.best_width) {
                                        this.write_indent();
                                    } else {
                                        data = text.slice(start, end);
                                        this.column += data.length;
                                        this.stream.write(data, this.encoding);
                                    }
                                    start = end;
                                }
                            } else if (char == null || indexOf.call(" \n\u2028\u2029", char) >= 0) {
                                data = text.slice(start, end);
                                this.column += data.length;
                                this.stream.write(data, this.encoding);
                                if (char == null) {
                                    this.write_line_break();
                                }
                                start = end;
                            }
                            if (char != null) {
                                breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
                                spaces = char === " ";
                            }
                            results.push(end++);
                        }
                        return results;
                    }
                    write_literal(text) {
                        var br, breaks, char, data, end, hints, i, len, ref, results, start;
                        hints = this.determine_block_hints(text);
                        this.write_indicator(`|${hints}`, true);
                        if (hints.slice(-1) === "+") {
                            this.open_ended = true;
                        }
                        this.write_line_break();
                        breaks = true;
                        start = end = 0;
                        results = [];
                        while (end <= text.length) {
                            char = text[end];
                            if (breaks) {
                                if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
                                    ref = text.slice(start, end);
                                    for (i = 0, len = ref.length; i < len; i++) {
                                        br = ref[i];
                                        if (br === "\n") {
                                            this.write_line_break();
                                        } else {
                                            this.write_line_break(br);
                                        }
                                    }
                                    if (char != null) {
                                        this.write_indent();
                                    }
                                    start = end;
                                }
                            } else {
                                if (char == null || indexOf.call("\n\u2028\u2029", char) >= 0) {
                                    data = text.slice(start, end);
                                    this.stream.write(data, this.encoding);
                                    if (char == null) {
                                        this.write_line_break();
                                    }
                                    start = end;
                                }
                            }
                            if (char != null) {
                                breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
                            }
                            results.push(end++);
                        }
                        return results;
                    }
                    write_plain(text, split = true) {
                        var br, breaks, char, data, end, i, len, ref, results, spaces, start;
                        if (!text) {
                            return;
                        }
                        if (this.root_context) {
                            this.open_ended = true;
                        }
                        if (!this.whitespace) {
                            data = " ";
                            this.column += data.length;
                            this.stream.write(data, this.encoding);
                        }
                        this.whitespace = false;
                        this.indentation = false;
                        spaces = false;
                        breaks = false;
                        start = end = 0;
                        results = [];
                        while (end <= text.length) {
                            char = text[end];
                            if (spaces) {
                                if (char !== " ") {
                                    if (start + 1 === end && this.column > this.best_width && split) {
                                        this.write_indent();
                                        this.whitespace = false;
                                        this.indentation = false;
                                    } else {
                                        data = text.slice(start, end);
                                        this.column += data.length;
                                        this.stream.write(data, this.encoding);
                                    }
                                    start = end;
                                }
                            } else if (breaks) {
                                if (indexOf.call("\n\u2028\u2029", char) < 0) {
                                    if (text[start] === "\n") {
                                        this.write_line_break();
                                    }
                                    ref = text.slice(start, end);
                                    for (i = 0, len = ref.length; i < len; i++) {
                                        br = ref[i];
                                        if (br === "\n") {
                                            this.write_line_break();
                                        } else {
                                            this.write_line_break(br);
                                        }
                                    }
                                    this.write_indent();
                                    this.whitespace = false;
                                    this.indentation = false;
                                    start = end;
                                }
                            } else {
                                if (char == null || indexOf.call(" \n\u2028\u2029", char) >= 0) {
                                    data = text.slice(start, end);
                                    this.column += data.length;
                                    this.stream.write(data, this.encoding);
                                    start = end;
                                }
                            }
                            if (char != null) {
                                spaces = char === " ";
                                breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
                            }
                            results.push(end++);
                        }
                        return results;
                    }
                    determine_block_hints(text) {
                        var first, hints, i, last, penultimate;
                        hints = "";
                        first = text[0], i = text.length - 2, penultimate = text[i++], last = text[i++];
                        if (indexOf.call(" \n\u2028\u2029", first) >= 0) {
                            hints += this.best_indent;
                        }
                        if (indexOf.call("\n\u2028\u2029", last) < 0) {
                            hints += "-";
                        } else if (text.length === 1 || indexOf.call("\n\u2028\u2029", penultimate) >= 0) {
                            hints += "+";
                        }
                        return hints;
                    }
                    flush_stream() {
                        var base;
                        return typeof (base = this.stream).flush === "function" ? base.flush() : void 0;
                    }
                    error(message, context) {
                        var ref, ref1;
                        if (context) {
                            context = (ref = context != null ? (ref1 = context.constructor) != null ? ref1.name : void 0 : void 0) != null ? ref : util.inspect(context);
                        }
                        throw new exports.EmitterError(`${message}${context ? ` ${context}` : ""}`);
                    }
                }
                C_WHITESPACE = "\0 \t\r\n\u2028\u2029";
                DEFAULT_TAG_PREFIXES = {
                    "!": "!",
                    "tag:yaml.org,2002:": "!!"
                };
                ESCAPE_REPLACEMENTS = {
                    "\0": "0",
                    "": "a",
                    "\b": "b",
                    "\t": "t",
                    "\n": "n",
                    "\v": "v",
                    "\f": "f",
                    "\r": "r",
                    "": "e",
                    '"': '"',
                    "\\": "\\",
                    "": "N",
                    " ": "_",
                    "\u2028": "L",
                    "\u2029": "P"
                };
                ctor = Emitter.prototype.initialise;
                return Emitter;
            }.call(this);
            ScalarAnalysis = class ScalarAnalysis {
                constructor(scalar1, empty, multiline, allow_flow_plain1, allow_block_plain1, allow_single_quoted1, allow_double_quoted1, allow_block1) {
                    this.scalar = scalar1;
                    this.empty = empty;
                    this.multiline = multiline;
                    this.allow_flow_plain = allow_flow_plain1;
                    this.allow_block_plain = allow_block_plain1;
                    this.allow_single_quoted = allow_single_quoted1;
                    this.allow_double_quoted = allow_double_quoted1;
                    this.allow_block = allow_block1;
                }
            };
        }).call(this);
    });
    register({
        "0": [ "./serializer" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var YAMLError, events, nodes, util;
            events = require("./events");
            nodes = require("./nodes");
            util = require("./util");
            ({YAMLError: YAMLError} = require("./errors"));
            this.SerializerError = class SerializerError extends YAMLError {};
            this.Serializer = function() {
                var ctor;
                class Serializer {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise({encoding: encoding, explicit_start: explicit_start, explicit_end: explicit_end, version: version, tags: tags} = {}) {
                        this.encoding = encoding;
                        this.explicit_start = explicit_start;
                        this.explicit_end = explicit_end;
                        this.version = version;
                        this.tags = tags;
                        this.serialized_nodes = {};
                        this.anchors = {};
                        this.last_anchor_id = 0;
                        return this.closed = null;
                    }
                    open() {
                        if (this.closed === null) {
                            this.emit(new events.StreamStartEvent(this.encoding));
                            return this.closed = false;
                        } else if (this.closed) {
                            throw new SerializerError("serializer is closed");
                        } else {
                            throw new SerializerError("serializer is already open");
                        }
                    }
                    close() {
                        if (this.closed === null) {
                            throw new SerializerError("serializer is not opened");
                        } else if (!this.closed) {
                            this.emit(new events.StreamEndEvent());
                            return this.closed = true;
                        }
                    }
                    serialize(node) {
                        if (this.closed === null) {
                            throw new SerializerError("serializer is not opened");
                        } else if (this.closed) {
                            throw new SerializerError("serializer is closed");
                        }
                        if (node != null) {
                            this.emit(new events.DocumentStartEvent(void 0, void 0, this.explicit_start, this.version, this.tags));
                            this.anchor_node(node);
                            this.serialize_node(node);
                            this.emit(new events.DocumentEndEvent(void 0, void 0, this.explicit_end));
                        }
                        this.serialized_nodes = {};
                        this.anchors = {};
                        return this.last_anchor_id = 0;
                    }
                    anchor_node(node) {
                        var base, i, item, j, key, len, len1, name, ref, ref1, results, results1, value;
                        if (node.unique_id in this.anchors) {
                            return (base = this.anchors)[name = node.unique_id] != null ? base[name] : base[name] = this.generate_anchor(node);
                        } else {
                            this.anchors[node.unique_id] = null;
                            if (node instanceof nodes.SequenceNode) {
                                ref = node.value;
                                results = [];
                                for (i = 0, len = ref.length; i < len; i++) {
                                    item = ref[i];
                                    results.push(this.anchor_node(item));
                                }
                                return results;
                            } else if (node instanceof nodes.MappingNode) {
                                ref1 = node.value;
                                results1 = [];
                                for (j = 0, len1 = ref1.length; j < len1; j++) {
                                    [key, value] = ref1[j];
                                    this.anchor_node(key);
                                    results1.push(this.anchor_node(value));
                                }
                                return results1;
                            }
                        }
                    }
                    generate_anchor(node) {
                        return `id${util.pad_left(++this.last_anchor_id, "0", 4)}`;
                    }
                    serialize_node(node, parent, index) {
                        var alias, default_tag, detected_tag, i, implicit, item, j, key, len, len1, ref, ref1, value;
                        alias = this.anchors[node.unique_id];
                        if (node.unique_id in this.serialized_nodes) {
                            return this.emit(new events.AliasEvent(alias));
                        } else {
                            this.serialized_nodes[node.unique_id] = true;
                            this.descend_resolver(parent, index);
                            if (node instanceof nodes.ScalarNode) {
                                detected_tag = this.resolve(nodes.ScalarNode, node.value, [ true, false ]);
                                default_tag = this.resolve(nodes.ScalarNode, node.value, [ false, true ]);
                                implicit = [ node.tag === detected_tag, node.tag === default_tag ];
                                this.emit(new events.ScalarEvent(alias, node.tag, implicit, node.value, void 0, void 0, node.style));
                            } else if (node instanceof nodes.SequenceNode) {
                                implicit = node.tag === this.resolve(nodes.SequenceNode, node.value, true);
                                this.emit(new events.SequenceStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
                                ref = node.value;
                                for (index = i = 0, len = ref.length; i < len; index = ++i) {
                                    item = ref[index];
                                    this.serialize_node(item, node, index);
                                }
                                this.emit(new events.SequenceEndEvent());
                            } else if (node instanceof nodes.MappingNode) {
                                implicit = node.tag === this.resolve(nodes.MappingNode, node.value, true);
                                this.emit(new events.MappingStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
                                ref1 = node.value;
                                for (j = 0, len1 = ref1.length; j < len1; j++) {
                                    [key, value] = ref1[j];
                                    this.serialize_node(key, node, null);
                                    this.serialize_node(value, node, key);
                                }
                                this.emit(new events.MappingEndEvent());
                            }
                            return this.ascend_resolver();
                        }
                    }
                }
                ctor = Serializer.prototype.initialise;
                return Serializer;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./representer" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var YAMLError, nodes, hasProp = {}.hasOwnProperty;
            nodes = require("./nodes");
            ({YAMLError: YAMLError} = require("./errors"));
            this.RepresenterError = class RepresenterError extends YAMLError {};
            this.BaseRepresenter = function() {
                var ctor;
                class BaseRepresenter {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    static add_representer(data_type, handler) {
                        if (!this.prototype.hasOwnProperty("yaml_representers_types")) {
                            this.prototype.yaml_representers_types = [].concat(this.prototype.yaml_representers_types);
                        }
                        if (!this.prototype.hasOwnProperty("yaml_representers_handlers")) {
                            this.prototype.yaml_representers_handlers = [].concat(this.prototype.yaml_representers_handlers);
                        }
                        this.prototype.yaml_representers_types.push(data_type);
                        return this.prototype.yaml_representers_handlers.push(handler);
                    }
                    static add_multi_representer(data_type, handler) {
                        if (!this.prototype.hasOwnProperty("yaml_multi_representers_types")) {
                            this.prototype.yaml_multi_representers_types = [].concat(this.prototype.yaml_multi_representers_types);
                        }
                        if (!this.prototype.hasOwnProperty("yaml_multi_representers_handlers")) {
                            this.prototype.yaml_multi_representers_handlers = [].concat(this.prototype.yaml_multi_representers_handlers);
                        }
                        this.prototype.yaml_multi_representers_types.push(data_type);
                        return this.prototype.yaml_multi_representers_handlers.push(handler);
                    }
                    initialise({default_style: default_style, default_flow_style: default_flow_style} = {}) {
                        this.default_style = default_style;
                        this.default_flow_style = default_flow_style;
                        this.represented_objects = {};
                        this.object_keeper = [];
                        return this.alias_key = null;
                    }
                    represent(data) {
                        var node;
                        node = this.represent_data(data);
                        this.serialize(node);
                        this.represented_objects = {};
                        this.object_keeper = [];
                        return this.alias_key = null;
                    }
                    represent_data(data) {
                        var data_type, i, j, len, ref, representer, type;
                        if (this.ignore_aliases(data)) {
                            this.alias_key = null;
                        } else if ((i = this.object_keeper.indexOf(data)) !== -1) {
                            this.alias_key = i;
                            if (this.alias_key in this.represented_objects) {
                                return this.represented_objects[this.alias_key];
                            }
                        } else {
                            this.alias_key = this.object_keeper.length;
                            this.object_keeper.push(data);
                        }
                        representer = null;
                        data_type = data === null ? "null" : typeof data;
                        if (data_type === "object") {
                            data_type = data.constructor;
                        }
                        if ((i = this.yaml_representers_types.lastIndexOf(data_type)) !== -1) {
                            representer = this.yaml_representers_handlers[i];
                        }
                        if (representer == null) {
                            ref = this.yaml_multi_representers_types;
                            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                                type = ref[i];
                                if (!(data instanceof type)) {
                                    continue;
                                }
                                representer = this.yaml_multi_representers_handlers[i];
                                break;
                            }
                        }
                        if (representer == null) {
                            if ((i = this.yaml_multi_representers_types.lastIndexOf(void 0)) !== -1) {
                                representer = this.yaml_multi_representers_handlers[i];
                            } else if ((i = this.yaml_representers_types.lastIndexOf(void 0)) !== -1) {
                                representer = this.yaml_representers_handlers[i];
                            }
                        }
                        if (representer != null) {
                            return representer.call(this, data);
                        } else {
                            return new nodes.ScalarNode(null, `${data}`);
                        }
                    }
                    represent_scalar(tag, value, style = this.default_style) {
                        var node;
                        node = new nodes.ScalarNode(tag, value, null, null, style);
                        if (this.alias_key != null) {
                            this.represented_objects[this.alias_key] = node;
                        }
                        return node;
                    }
                    represent_sequence(tag, sequence, flow_style) {
                        var best_style, item, j, len, node, node_item, ref, value;
                        value = [];
                        node = new nodes.SequenceNode(tag, value, null, null, flow_style);
                        if (this.alias_key != null) {
                            this.represented_objects[this.alias_key] = node;
                        }
                        best_style = true;
                        for (j = 0, len = sequence.length; j < len; j++) {
                            item = sequence[j];
                            node_item = this.represent_data(item);
                            if (!(node_item instanceof nodes.ScalarNode || node_item.style)) {
                                best_style = false;
                            }
                            value.push(node_item);
                        }
                        if (flow_style == null) {
                            node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
                        }
                        return node;
                    }
                    represent_mapping(tag, mapping, flow_style) {
                        var best_style, item_key, item_value, node, node_key, node_value, ref, value;
                        value = [];
                        node = new nodes.MappingNode(tag, value, flow_style);
                        if (this.alias_key) {
                            this.represented_objects[this.alias_key] = node;
                        }
                        best_style = true;
                        for (item_key in mapping) {
                            if (!hasProp.call(mapping, item_key)) continue;
                            item_value = mapping[item_key];
                            node_key = this.represent_data(item_key);
                            node_value = this.represent_data(item_value);
                            if (!(node_key instanceof nodes.ScalarNode || node_key.style)) {
                                best_style = false;
                            }
                            if (!(node_value instanceof nodes.ScalarNode || node_value.style)) {
                                best_style = false;
                            }
                            value.push([ node_key, node_value ]);
                        }
                        if (!flow_style) {
                            node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
                        }
                        return node;
                    }
                    ignore_aliases(data) {
                        return false;
                    }
                }
                BaseRepresenter.prototype.yaml_representers_types = [];
                BaseRepresenter.prototype.yaml_representers_handlers = [];
                BaseRepresenter.prototype.yaml_multi_representers_types = [];
                BaseRepresenter.prototype.yaml_multi_representers_handlers = [];
                ctor = BaseRepresenter.prototype.initialise;
                return BaseRepresenter;
            }.call(this);
            this.Representer = class Representer extends this.BaseRepresenter {
                represent_boolean(data) {
                    return this.represent_scalar("tag:yaml.org,2002:bool", data ? "true" : "false");
                }
                represent_null(data) {
                    return this.represent_scalar("tag:yaml.org,2002:null", "null");
                }
                represent_number(data) {
                    var tag, value;
                    tag = `tag:yaml.org,2002:${data % 1 === 0 ? "int" : "float"}`;
                    value = data !== data ? ".nan" : data === Infinity ? ".inf" : data === -Infinity ? "-.inf" : data.toString();
                    return this.represent_scalar(tag, value);
                }
                represent_string(data) {
                    return this.represent_scalar("tag:yaml.org,2002:str", data);
                }
                represent_array(data) {
                    return this.represent_sequence("tag:yaml.org,2002:seq", data);
                }
                represent_date(data) {
                    return this.represent_scalar("tag:yaml.org,2002:timestamp", data.toISOString());
                }
                represent_object(data) {
                    return this.represent_mapping("tag:yaml.org,2002:map", data);
                }
                represent_undefined(data) {
                    throw new exports.RepresenterError(`cannot represent an onbject: ${data}`);
                }
                ignore_aliases(data) {
                    var ref;
                    if (data == null) {
                        return true;
                    }
                    if ((ref = typeof data) === "boolean" || ref === "number" || ref === "string") {
                        return true;
                    }
                    return false;
                }
            };
            this.Representer.add_representer("boolean", this.Representer.prototype.represent_boolean);
            this.Representer.add_representer("null", this.Representer.prototype.represent_null);
            this.Representer.add_representer("number", this.Representer.prototype.represent_number);
            this.Representer.add_representer("string", this.Representer.prototype.represent_string);
            this.Representer.add_representer(Array, this.Representer.prototype.represent_array);
            this.Representer.add_representer(Date, this.Representer.prototype.represent_date);
            this.Representer.add_representer(Object, this.Representer.prototype.represent_object);
            this.Representer.add_representer(null, this.Representer.prototype.represent_undefined);
        }).call(this);
    });
    register({
        "0": [ "./resolver" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var YAMLError, nodes, util, indexOf = [].indexOf;
            nodes = require("./nodes");
            util = require("./util");
            ({YAMLError: YAMLError} = require("./errors"));
            this.ResolverError = class ResolverError extends YAMLError {};
            this.BaseResolver = function() {
                var DEFAULT_MAPPING_TAG, DEFAULT_SCALAR_TAG, DEFAULT_SEQUENCE_TAG, ctor;
                class BaseResolver {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    static add_implicit_resolver(tag, regexp, first = [ null ]) {
                        var base, char, i, len, results;
                        if (!this.prototype.hasOwnProperty("yaml_implicit_resolvers")) {
                            this.prototype.yaml_implicit_resolvers = util.extend({}, this.prototype.yaml_implicit_resolvers);
                        }
                        results = [];
                        for (i = 0, len = first.length; i < len; i++) {
                            char = first[i];
                            results.push(((base = this.prototype.yaml_implicit_resolvers)[char] != null ? base[char] : base[char] = []).push([ tag, regexp ]));
                        }
                        return results;
                    }
                    initialise() {
                        this.resolver_exact_paths = [];
                        return this.resolver_prefix_paths = [];
                    }
                    descend_resolver(current_node, current_index) {
                        var depth, exact_paths, i, j, kind, len, len1, path, prefix_paths, ref, ref1;
                        if (util.is_empty(this.yaml_path_resolvers)) {
                            return;
                        }
                        exact_paths = {};
                        prefix_paths = [];
                        if (current_node) {
                            depth = this.resolver_prefix_paths.length;
                            ref = this.resolver_prefix_paths.slice(-1)[0];
                            for (i = 0, len = ref.length; i < len; i++) {
                                [path, kind] = ref[i];
                                if (this.check_resolver_prefix(depth, path, kind, current_node, current_index)) {
                                    if (path.length > depth) {
                                        prefix_paths.push([ path, kind ]);
                                    } else {
                                        exact_paths[kind] = this.yaml_path_resolvers[path][kind];
                                    }
                                }
                            }
                        } else {
                            ref1 = this.yaml_path_resolvers;
                            for (j = 0, len1 = ref1.length; j < len1; j++) {
                                [path, kind] = ref1[j];
                                if (!path) {
                                    exact_paths[kind] = this.yaml_path_resolvers[path][kind];
                                } else {
                                    prefix_paths.push([ path, kind ]);
                                }
                            }
                        }
                        this.resolver_exact_paths.push(exact_paths);
                        return this.resolver_prefix_paths.push(prefix_paths);
                    }
                    ascend_resolver() {
                        if (util.is_empty(this.yaml_path_resolvers)) {
                            return;
                        }
                        this.resolver_exact_paths.pop();
                        return this.resolver_prefix_paths.pop();
                    }
                    check_resolver_prefix(depth, path, kind, current_node, current_index) {
                        var index_check, node_check;
                        [node_check, index_check] = path[depth - 1];
                        if (typeof node_check === "string") {
                            if (current_node.tag !== node_check) {
                                return;
                            }
                        } else if (node_check !== null) {
                            if (!(current_node instanceof node_check)) {
                                return;
                            }
                        }
                        if (index_check === true && current_index !== null) {
                            return;
                        }
                        if ((index_check === false || index_check === null) && current_index === null) {
                            return;
                        }
                        if (typeof index_check === "string") {
                            if (!(current_index instanceof nodes.ScalarNode) && index_check === current_index.value) {
                                return;
                            }
                        } else if (typeof index_check === "number") {
                            if (index_check !== current_index) {
                                return;
                            }
                        }
                        return true;
                    }
                    resolve(kind, value, implicit) {
                        var empty, exact_paths, i, k, len, ref, ref1, ref2, regexp, resolvers, tag;
                        if (kind === nodes.ScalarNode && implicit[0]) {
                            if (value === "") {
                                resolvers = (ref = this.yaml_implicit_resolvers[""]) != null ? ref : [];
                            } else {
                                resolvers = (ref1 = this.yaml_implicit_resolvers[value[0]]) != null ? ref1 : [];
                            }
                            resolvers = resolvers.concat((ref2 = this.yaml_implicit_resolvers[null]) != null ? ref2 : []);
                            for (i = 0, len = resolvers.length; i < len; i++) {
                                [tag, regexp] = resolvers[i];
                                if (value.match(regexp)) {
                                    return tag;
                                }
                            }
                            implicit = implicit[1];
                        }
                        empty = true;
                        for (k in this.yaml_path_resolvers) {
                            if ({}[k] == null) {
                                empty = false;
                            }
                        }
                        if (!empty) {
                            exact_paths = this.resolver_exact_paths.slice(-1)[0];
                            if (indexOf.call(exact_paths, kind) >= 0) {
                                return exact_paths[kind];
                            }
                            if (indexOf.call(exact_paths, null) >= 0) {
                                return exact_paths[null];
                            }
                        }
                        if (kind === nodes.ScalarNode) {
                            return DEFAULT_SCALAR_TAG;
                        }
                        if (kind === nodes.SequenceNode) {
                            return DEFAULT_SEQUENCE_TAG;
                        }
                        if (kind === nodes.MappingNode) {
                            return DEFAULT_MAPPING_TAG;
                        }
                    }
                }
                DEFAULT_SCALAR_TAG = "tag:yaml.org,2002:str";
                DEFAULT_SEQUENCE_TAG = "tag:yaml.org,2002:seq";
                DEFAULT_MAPPING_TAG = "tag:yaml.org,2002:map";
                BaseResolver.prototype.yaml_implicit_resolvers = {};
                BaseResolver.prototype.yaml_path_resolvers = {};
                ctor = BaseResolver.prototype.initialise;
                return BaseResolver;
            }.call(this);
            this.Resolver = class Resolver extends this.BaseResolver {};
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:bool", /^(?:yes|Yes|YES|true|True|TRUE|on|On|ON|no|No|NO|false|False|FALSE|off|Off|OFF)$/, "yYnNtTfFoO");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:float", /^(?:[-+]?(?:[0-9][0-9_]*)\.[0-9_]*(?:[eE][-+][0-9]+)?|\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/, "-+0123456789.");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:int", /^(?:[-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[0-9a-fA-F_]+|[-+]?0o[0-7_]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)$/, "-+0123456789");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:merge", /^(?:<<)$/, "<");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:null", /^(?:~|null|Null|NULL|)$/, [ "~", "n", "N", "" ]);
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:timestamp", /^(?:[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?(?:[Tt]|[\x20\t]+)[0-9][0-9]?:[0-9][0-9]:[0-9][0-9](?:\.[0-9]*)?(?:[\x20\t]*(?:Z|[-+][0-9][0-9]?(?::[0-9][0-9])?))?)$/, "0123456789");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:value", /^(?:=)$/, "=");
            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:yaml", /^(?:!|&|\*)$/, "!&*");
        }).call(this);
    });
    register({
        "0": [ "./dumper" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var emitter, representer, resolver, serializer, util;
            util = require("./util");
            emitter = require("./emitter");
            serializer = require("./serializer");
            representer = require("./representer");
            resolver = require("./resolver");
            this.make_dumper = function(Emitter = emitter.Emitter, Serializer = serializer.Serializer, Representer = representer.Representer, Resolver = resolver.Resolver) {
                var Dumper, components;
                components = [ Emitter, Serializer, Representer, Resolver ];
                return Dumper = function() {
                    var component;
                    class Dumper {
                        constructor(stream, options = {}) {
                            var i, len, ref;
                            components[0].prototype.initialise.call(this, stream, options);
                            ref = components.slice(1);
                            for (i = 0, len = ref.length; i < len; i++) {
                                component = ref[i];
                                component.prototype.initialise.call(this, options);
                            }
                        }
                    }
                    util.extend(Dumper.prototype, ...function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = components.length; i < len; i++) {
                            component = components[i];
                            results.push(component.prototype);
                        }
                        return results;
                    }());
                    return Dumper;
                }.call(this);
            };
            this.Dumper = this.make_dumper();
        }).call(this);
    });
    register({
        "0": [ "./reader" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var Mark, YAMLError, indexOf = [].indexOf;
            ({Mark: Mark, YAMLError: YAMLError} = require("./errors"));
            this.ReaderError = class ReaderError extends YAMLError {
                constructor(position1, character1, reason) {
                    super();
                    this.position = position1;
                    this.character = character1;
                    this.reason = reason;
                }
                toString() {
                    return `unacceptable character #${this.character.charCodeAt(0).toString(16)}: ${this.reason}\n  position ${this.position}`;
                }
            };
            this.Reader = function() {
                var NON_PRINTABLE, ctor;
                class Reader {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise(string) {
                        this.string = string;
                        this.line = 0;
                        this.column = 0;
                        this.index = 0;
                        this.check_printable();
                        return this.string += "\0";
                    }
                    peek(index = 0) {
                        return this.string[this.index + index];
                    }
                    prefix(length = 1) {
                        return this.string.slice(this.index, this.index + length);
                    }
                    forward(length = 1) {
                        var char, results;
                        results = [];
                        while (length) {
                            char = this.string[this.index];
                            this.index++;
                            if (indexOf.call("\n₂\u2029", char) >= 0 || char === "\r" && this.string[this.index] !== "\n") {
                                this.line++;
                                this.column = 0;
                            } else {
                                this.column++;
                            }
                            results.push(length--);
                        }
                        return results;
                    }
                    get_mark() {
                        return new Mark(this.line, this.column, this.string, this.index);
                    }
                    check_printable() {
                        var character, match, position;
                        match = NON_PRINTABLE.exec(this.string);
                        if (match) {
                            character = match[0];
                            position = this.string.length - this.index + match.index;
                            throw new exports.ReaderError(position, character, "special characters are not allowed");
                        }
                    }
                }
                NON_PRINTABLE = /[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uFFFD]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
                ctor = Reader.prototype.initialise;
                return Reader;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./tokens" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            this.Token = class Token {
                constructor(start_mark1, end_mark1) {
                    this.start_mark = start_mark1;
                    this.end_mark = end_mark1;
                }
            };
            this.DirectiveToken = function() {
                class DirectiveToken extends this.Token {
                    constructor(name, value, start_mark, end_mark) {
                        super(start_mark, end_mark);
                        this.name = name;
                        this.value = value;
                    }
                }
                DirectiveToken.prototype.id = "<directive>";
                return DirectiveToken;
            }.call(this);
            this.DocumentStartToken = function() {
                class DocumentStartToken extends this.Token {}
                DocumentStartToken.prototype.id = "<document start>";
                return DocumentStartToken;
            }.call(this);
            this.DocumentEndToken = function() {
                class DocumentEndToken extends this.Token {}
                DocumentEndToken.prototype.id = "<document end>";
                return DocumentEndToken;
            }.call(this);
            this.StreamStartToken = function() {
                class StreamStartToken extends this.Token {
                    constructor(start_mark, end_mark, encoding) {
                        super(start_mark, end_mark);
                        this.encoding = encoding;
                    }
                }
                StreamStartToken.prototype.id = "<stream start>";
                return StreamStartToken;
            }.call(this);
            this.StreamEndToken = function() {
                class StreamEndToken extends this.Token {}
                StreamEndToken.prototype.id = "<stream end>";
                return StreamEndToken;
            }.call(this);
            this.BlockSequenceStartToken = function() {
                class BlockSequenceStartToken extends this.Token {}
                BlockSequenceStartToken.prototype.id = "<block sequence start>";
                return BlockSequenceStartToken;
            }.call(this);
            this.BlockMappingStartToken = function() {
                class BlockMappingStartToken extends this.Token {}
                BlockMappingStartToken.prototype.id = "<block mapping end>";
                return BlockMappingStartToken;
            }.call(this);
            this.BlockEndToken = function() {
                class BlockEndToken extends this.Token {}
                BlockEndToken.prototype.id = "<block end>";
                return BlockEndToken;
            }.call(this);
            this.FlowSequenceStartToken = function() {
                class FlowSequenceStartToken extends this.Token {}
                FlowSequenceStartToken.prototype.id = "[";
                return FlowSequenceStartToken;
            }.call(this);
            this.FlowMappingStartToken = function() {
                class FlowMappingStartToken extends this.Token {}
                FlowMappingStartToken.prototype.id = "{";
                return FlowMappingStartToken;
            }.call(this);
            this.FlowSequenceEndToken = function() {
                class FlowSequenceEndToken extends this.Token {}
                FlowSequenceEndToken.prototype.id = "]";
                return FlowSequenceEndToken;
            }.call(this);
            this.FlowMappingEndToken = function() {
                class FlowMappingEndToken extends this.Token {}
                FlowMappingEndToken.prototype.id = "}";
                return FlowMappingEndToken;
            }.call(this);
            this.KeyToken = function() {
                class KeyToken extends this.Token {}
                KeyToken.prototype.id = "?";
                return KeyToken;
            }.call(this);
            this.ValueToken = function() {
                class ValueToken extends this.Token {}
                ValueToken.prototype.id = ":";
                return ValueToken;
            }.call(this);
            this.BlockEntryToken = function() {
                class BlockEntryToken extends this.Token {}
                BlockEntryToken.prototype.id = "-";
                return BlockEntryToken;
            }.call(this);
            this.FlowEntryToken = function() {
                class FlowEntryToken extends this.Token {}
                FlowEntryToken.prototype.id = ",";
                return FlowEntryToken;
            }.call(this);
            this.AliasToken = function() {
                class AliasToken extends this.Token {
                    constructor(value, start_mark, end_mark) {
                        super(start_mark, end_mark);
                        this.value = value;
                    }
                }
                AliasToken.prototype.id = "<alias>";
                return AliasToken;
            }.call(this);
            this.AnchorToken = function() {
                class AnchorToken extends this.Token {
                    constructor(value, start_mark, end_mark) {
                        super(start_mark, end_mark);
                        this.value = value;
                    }
                }
                AnchorToken.prototype.id = "<anchor>";
                return AnchorToken;
            }.call(this);
            this.TagToken = function() {
                class TagToken extends this.Token {
                    constructor(value, start_mark, end_mark) {
                        super(start_mark, end_mark);
                        this.value = value;
                    }
                }
                TagToken.prototype.id = "<tag>";
                return TagToken;
            }.call(this);
            this.ScalarToken = function() {
                class ScalarToken extends this.Token {
                    constructor(value, plain, start_mark, end_mark, style) {
                        super(start_mark, end_mark);
                        this.value = value;
                        this.plain = plain;
                        this.style = style;
                    }
                }
                ScalarToken.prototype.id = "<scalar>";
                return ScalarToken;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./scanner" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var MarkedYAMLError, SimpleKey, tokens, util, hasProp = {}.hasOwnProperty, indexOf = [].indexOf;
            ({MarkedYAMLError: MarkedYAMLError} = require("./errors"));
            tokens = require("./tokens");
            util = require("./util");
            this.ScannerError = class ScannerError extends MarkedYAMLError {};
            SimpleKey = class SimpleKey {
                constructor(token_number1, required1, index, line, column1, mark1) {
                    this.token_number = token_number1;
                    this.required = required1;
                    this.index = index;
                    this.line = line;
                    this.column = column1;
                    this.mark = mark1;
                }
            };
            this.Scanner = function() {
                var C_LB, C_NUMBERS, C_WS, ESCAPE_CODES, ESCAPE_REPLACEMENTS, ctor;
                class Scanner {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise() {
                        this.done = false;
                        this.flow_level = 0;
                        this.tokens = [];
                        this.fetch_stream_start();
                        this.tokens_taken = 0;
                        this.indent = -1;
                        this.indents = [];
                        this.allow_simple_key = true;
                        return this.possible_simple_keys = {};
                    }
                    check_token(...choices) {
                        var choice, i, len;
                        while (this.need_more_tokens()) {
                            this.fetch_more_tokens();
                        }
                        if (this.tokens.length !== 0) {
                            if (choices.length === 0) {
                                return true;
                            }
                            for (i = 0, len = choices.length; i < len; i++) {
                                choice = choices[i];
                                if (this.tokens[0] instanceof choice) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    peek_token() {
                        while (this.need_more_tokens()) {
                            this.fetch_more_tokens();
                        }
                        if (this.tokens.length !== 0) {
                            return this.tokens[0];
                        }
                    }
                    get_token() {
                        while (this.need_more_tokens()) {
                            this.fetch_more_tokens();
                        }
                        if (this.tokens.length !== 0) {
                            this.tokens_taken++;
                            return this.tokens.shift();
                        }
                    }
                    need_more_tokens() {
                        if (this.done) {
                            return false;
                        }
                        if (this.tokens.length === 0) {
                            return true;
                        }
                        this.stale_possible_simple_keys();
                        if (this.next_possible_simple_key() === this.tokens_taken) {
                            return true;
                        }
                        return false;
                    }
                    fetch_more_tokens() {
                        var char;
                        this.scan_to_next_token();
                        this.stale_possible_simple_keys();
                        this.unwind_indent(this.column);
                        char = this.peek();
                        if (char === "\0") {
                            return this.fetch_stream_end();
                        }
                        if (char === "%" && this.check_directive()) {
                            return this.fetch_directive();
                        }
                        if (char === "-" && this.check_document_start()) {
                            return this.fetch_document_start();
                        }
                        if (char === "." && this.check_document_end()) {
                            return this.fetch_document_end();
                        }
                        if (char === "[") {
                            return this.fetch_flow_sequence_start();
                        }
                        if (char === "{") {
                            return this.fetch_flow_mapping_start();
                        }
                        if (char === "]") {
                            return this.fetch_flow_sequence_end();
                        }
                        if (char === "}") {
                            return this.fetch_flow_mapping_end();
                        }
                        if (char === ",") {
                            return this.fetch_flow_entry();
                        }
                        if (char === "-" && this.check_block_entry()) {
                            return this.fetch_block_entry();
                        }
                        if (char === "?" && this.check_key()) {
                            return this.fetch_key();
                        }
                        if (char === ":" && this.check_value()) {
                            return this.fetch_value();
                        }
                        if (char === "*") {
                            return this.fetch_alias();
                        }
                        if (char === "&") {
                            return this.fetch_anchor();
                        }
                        if (char === "!") {
                            return this.fetch_tag();
                        }
                        if (char === "|" && this.flow_level === 0) {
                            return this.fetch_literal();
                        }
                        if (char === ">" && this.flow_level === 0) {
                            return this.fetch_folded();
                        }
                        if (char === "'") {
                            return this.fetch_single();
                        }
                        if (char === '"') {
                            return this.fetch_double();
                        }
                        if (this.check_plain()) {
                            return this.fetch_plain();
                        }
                        throw new exports.ScannerError("while scanning for the next token", null, `found character ${char} that cannot start any token`, this.get_mark());
                    }
                    next_possible_simple_key() {
                        var key, level, min_token_number, ref;
                        min_token_number = null;
                        ref = this.possible_simple_keys;
                        for (level in ref) {
                            if (!hasProp.call(ref, level)) continue;
                            key = ref[level];
                            if (min_token_number === null || key.token_number < min_token_number) {
                                min_token_number = key.token_number;
                            }
                        }
                        return min_token_number;
                    }
                    stale_possible_simple_keys() {
                        var key, level, ref, results;
                        ref = this.possible_simple_keys;
                        results = [];
                        for (level in ref) {
                            if (!hasProp.call(ref, level)) continue;
                            key = ref[level];
                            if (key.line === this.line && this.index - key.index <= 1024) {
                                continue;
                            }
                            if (!key.required) {
                                results.push(delete this.possible_simple_keys[level]);
                            } else {
                                throw new exports.ScannerError("while scanning a simple key", key.mark, "could not find expected ':'", this.get_mark());
                            }
                        }
                        return results;
                    }
                    save_possible_simple_key() {
                        var required, token_number;
                        required = this.flow_level === 0 && this.indent === this.column;
                        if (required && !this.allow_simple_key) {
                            throw new Error("logic failure");
                        }
                        if (!this.allow_simple_key) {
                            return;
                        }
                        this.remove_possible_simple_key();
                        token_number = this.tokens_taken + this.tokens.length;
                        return this.possible_simple_keys[this.flow_level] = new SimpleKey(token_number, required, this.index, this.line, this.column, this.get_mark());
                    }
                    remove_possible_simple_key() {
                        var key;
                        if (!(key = this.possible_simple_keys[this.flow_level])) {
                            return;
                        }
                        if (!key.required) {
                            return delete this.possible_simple_keys[this.flow_level];
                        } else {
                            throw new exports.ScannerError("while scanning a simple key", key.mark, "could not find expected ':'", this.get_mark());
                        }
                    }
                    unwind_indent(column) {
                        var mark, results;
                        if (this.flow_level !== 0) {
                            return;
                        }
                        results = [];
                        while (this.indent > column) {
                            mark = this.get_mark();
                            this.indent = this.indents.pop();
                            results.push(this.tokens.push(new tokens.BlockEndToken(mark, mark)));
                        }
                        return results;
                    }
                    add_indent(column) {
                        if (!(column > this.indent)) {
                            return false;
                        }
                        this.indents.push(this.indent);
                        this.indent = column;
                        return true;
                    }
                    fetch_stream_start() {
                        var mark;
                        mark = this.get_mark();
                        return this.tokens.push(new tokens.StreamStartToken(mark, mark, this.encoding));
                    }
                    fetch_stream_end() {
                        var mark;
                        this.unwind_indent(-1);
                        this.remove_possible_simple_key();
                        this.allow_possible_simple_key = false;
                        this.possible_simple_keys = {};
                        mark = this.get_mark();
                        this.tokens.push(new tokens.StreamEndToken(mark, mark));
                        return this.done = true;
                    }
                    fetch_directive() {
                        this.unwind_indent(-1);
                        this.remove_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_directive());
                    }
                    fetch_document_start() {
                        return this.fetch_document_indicator(tokens.DocumentStartToken);
                    }
                    fetch_document_end() {
                        return this.fetch_document_indicator(tokens.DocumentEndToken);
                    }
                    fetch_document_indicator(TokenClass) {
                        var start_mark;
                        this.unwind_indent(-1);
                        this.remove_possible_simple_key();
                        this.allow_simple_key = false;
                        start_mark = this.get_mark();
                        this.forward(3);
                        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
                    }
                    fetch_flow_sequence_start() {
                        return this.fetch_flow_collection_start(tokens.FlowSequenceStartToken);
                    }
                    fetch_flow_mapping_start() {
                        return this.fetch_flow_collection_start(tokens.FlowMappingStartToken);
                    }
                    fetch_flow_collection_start(TokenClass) {
                        var start_mark;
                        this.save_possible_simple_key();
                        this.flow_level++;
                        this.allow_simple_key = true;
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
                    }
                    fetch_flow_sequence_end() {
                        return this.fetch_flow_collection_end(tokens.FlowSequenceEndToken);
                    }
                    fetch_flow_mapping_end() {
                        return this.fetch_flow_collection_end(tokens.FlowMappingEndToken);
                    }
                    fetch_flow_collection_end(TokenClass) {
                        var start_mark;
                        this.remove_possible_simple_key();
                        this.flow_level--;
                        this.allow_simple_key = false;
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
                    }
                    fetch_flow_entry() {
                        var start_mark;
                        this.allow_simple_key = true;
                        this.remove_possible_simple_key();
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new tokens.FlowEntryToken(start_mark, this.get_mark()));
                    }
                    fetch_block_entry() {
                        var mark, start_mark;
                        if (this.flow_level === 0) {
                            if (!this.allow_simple_key) {
                                throw new exports.ScannerError(null, null, "sequence entries are not allowed here", this.get_mark());
                            }
                            if (this.add_indent(this.column)) {
                                mark = this.get_mark();
                                this.tokens.push(new tokens.BlockSequenceStartToken(mark, mark));
                            }
                        }
                        this.allow_simple_key = true;
                        this.remove_possible_simple_key();
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new tokens.BlockEntryToken(start_mark, this.get_mark()));
                    }
                    fetch_key() {
                        var mark, start_mark;
                        if (this.flow_level === 0) {
                            if (!this.allow_simple_key) {
                                throw new exports.ScannerError(null, null, "mapping keys are not allowed here", this.get_mark());
                            }
                            if (this.add_indent(this.column)) {
                                mark = this.get_mark();
                                this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
                            }
                        }
                        this.allow_simple_key = !this.flow_level;
                        this.remove_possible_simple_key();
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new tokens.KeyToken(start_mark, this.get_mark()));
                    }
                    fetch_value() {
                        var key, mark, start_mark;
                        if (key = this.possible_simple_keys[this.flow_level]) {
                            delete this.possible_simple_keys[this.flow_level];
                            this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.KeyToken(key.mark, key.mark));
                            if (this.flow_level === 0) {
                                if (this.add_indent(key.column)) {
                                    this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.BlockMappingStartToken(key.mark, key.mark));
                                }
                            }
                            this.allow_simple_key = false;
                        } else {
                            if (this.flow_level === 0) {
                                if (!this.allow_simple_key) {
                                    throw new exports.ScannerError(null, null, "mapping values are not allowed here", this.get_mark());
                                }
                                if (this.add_indent(this.column)) {
                                    mark = this.get_mark();
                                    this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
                                }
                            }
                            this.allow_simple_key = !this.flow_level;
                            this.remove_possible_simple_key();
                        }
                        start_mark = this.get_mark();
                        this.forward();
                        return this.tokens.push(new tokens.ValueToken(start_mark, this.get_mark()));
                    }
                    fetch_alias() {
                        this.save_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_anchor(tokens.AliasToken));
                    }
                    fetch_anchor() {
                        this.save_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_anchor(tokens.AnchorToken));
                    }
                    fetch_tag() {
                        this.save_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_tag());
                    }
                    fetch_literal() {
                        return this.fetch_block_scalar("|");
                    }
                    fetch_folded() {
                        return this.fetch_block_scalar(">");
                    }
                    fetch_block_scalar(style) {
                        this.allow_simple_key = true;
                        this.remove_possible_simple_key();
                        return this.tokens.push(this.scan_block_scalar(style));
                    }
                    fetch_single() {
                        return this.fetch_flow_scalar("'");
                    }
                    fetch_double() {
                        return this.fetch_flow_scalar('"');
                    }
                    fetch_flow_scalar(style) {
                        this.save_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_flow_scalar(style));
                    }
                    fetch_plain() {
                        this.save_possible_simple_key();
                        this.allow_simple_key = false;
                        return this.tokens.push(this.scan_plain());
                    }
                    check_directive() {
                        if (this.column === 0) {
                            return true;
                        }
                        return false;
                    }
                    check_document_start() {
                        var ref;
                        if (this.column === 0 && this.prefix(3) === "---" && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
                            return true;
                        }
                        return false;
                    }
                    check_document_end() {
                        var ref;
                        if (this.column === 0 && this.prefix(3) === "..." && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
                            return true;
                        }
                        return false;
                    }
                    check_block_entry() {
                        var ref;
                        return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
                    }
                    check_key() {
                        var ref;
                        if (this.flow_level !== 0) {
                            return true;
                        }
                        return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
                    }
                    check_value() {
                        var ref;
                        if (this.flow_level !== 0) {
                            return true;
                        }
                        return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
                    }
                    check_plain() {
                        var char, ref;
                        char = this.peek();
                        return indexOf.call(C_LB + C_WS + "\0-?:,[]{}#&*!|>'\"%@`", char) < 0 || (ref = this.peek(1), 
                        indexOf.call(C_LB + C_WS + "\0", ref) < 0) && (char === "-" || this.flow_level === 0 && indexOf.call("?:", char) >= 0);
                    }
                    scan_to_next_token() {
                        var found, ref, results;
                        if (this.index === 0 && this.peek() === "\ufeff") {
                            this.forward();
                        }
                        found = false;
                        results = [];
                        while (!found) {
                            while (this.peek() === " ") {
                                this.forward();
                            }
                            if (this.peek() === "#") {
                                while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
                                    this.forward();
                                }
                            }
                            if (this.scan_line_break()) {
                                if (this.flow_level === 0) {
                                    results.push(this.allow_simple_key = true);
                                } else {
                                    results.push(void 0);
                                }
                            } else {
                                results.push(found = true);
                            }
                        }
                        return results;
                    }
                    scan_directive() {
                        var end_mark, name, ref, start_mark, value;
                        start_mark = this.get_mark();
                        this.forward();
                        name = this.scan_directive_name(start_mark);
                        value = null;
                        if (name === "YAML") {
                            value = this.scan_yaml_directive_value(start_mark);
                            end_mark = this.get_mark();
                        } else if (name === "TAG") {
                            value = this.scan_tag_directive_value(start_mark);
                            end_mark = this.get_mark();
                        } else {
                            end_mark = this.get_mark();
                            while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
                                this.forward();
                            }
                        }
                        this.scan_directive_ignored_line(start_mark);
                        return new tokens.DirectiveToken(name, value, start_mark, end_mark);
                    }
                    scan_directive_name(start_mark) {
                        var char, length, value;
                        length = 0;
                        char = this.peek(length);
                        while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
                            length++;
                            char = this.peek(length);
                        }
                        if (length === 0) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected alphanumeric or numeric character but found ${char}`, this.get_mark());
                        }
                        value = this.prefix(length);
                        this.forward(length);
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0 ", char) < 0) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected alphanumeric or numeric character but found ${char}`, this.get_mark());
                        }
                        return value;
                    }
                    scan_yaml_directive_value(start_mark) {
                        var major, minor, ref;
                        while (this.peek() === " ") {
                            this.forward();
                        }
                        major = this.scan_yaml_directive_number(start_mark);
                        if (this.peek() !== ".") {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected a digit or '.' but found ${this.peek()}`, this.get_mark());
                        }
                        this.forward();
                        minor = this.scan_yaml_directive_number(start_mark);
                        if (ref = this.peek(), indexOf.call(C_LB + "\0 ", ref) < 0) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected a digit or ' ' but found ${this.peek()}`, this.get_mark());
                        }
                        return [ major, minor ];
                    }
                    scan_yaml_directive_number(start_mark) {
                        var char, length, ref, value;
                        char = this.peek();
                        if (!("0" <= char && char <= "9")) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected a digit but found ${char}`, this.get_mark());
                        }
                        length = 0;
                        while ("0" <= (ref = this.peek(length)) && ref <= "9") {
                            length++;
                        }
                        value = parseInt(this.prefix(length));
                        this.forward(length);
                        return value;
                    }
                    scan_tag_directive_value(start_mark) {
                        var handle, prefix;
                        while (this.peek() === " ") {
                            this.forward();
                        }
                        handle = this.scan_tag_directive_handle(start_mark);
                        while (this.peek() === " ") {
                            this.forward();
                        }
                        prefix = this.scan_tag_directive_prefix(start_mark);
                        return [ handle, prefix ];
                    }
                    scan_tag_directive_handle(start_mark) {
                        var char, value;
                        value = this.scan_tag_handle("directive", start_mark);
                        char = this.peek();
                        if (char !== " ") {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected ' ' but found ${char}`, this.get_mark());
                        }
                        return value;
                    }
                    scan_tag_directive_prefix(start_mark) {
                        var char, value;
                        value = this.scan_tag_uri("directive", start_mark);
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0 ", char) < 0) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected ' ' but found ${char}`, this.get_mark());
                        }
                        return value;
                    }
                    scan_directive_ignored_line(start_mark) {
                        var char, ref;
                        while (this.peek() === " ") {
                            this.forward();
                        }
                        if (this.peek() === "#") {
                            while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
                                this.forward();
                            }
                        }
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0", char) < 0) {
                            throw new exports.ScannerError("while scanning a directive", start_mark, `expected a comment or a line break but found ${char}`, this.get_mark());
                        }
                        return this.scan_line_break();
                    }
                    scan_anchor(TokenClass) {
                        var char, indicator, length, name, start_mark, value;
                        start_mark = this.get_mark();
                        indicator = this.peek();
                        if (indicator === "*") {
                            name = "alias";
                        } else {
                            name = "anchor";
                        }
                        this.forward();
                        length = 0;
                        char = this.peek(length);
                        while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
                            length++;
                            char = this.peek(length);
                        }
                        if (length === 0) {
                            throw new exports.ScannerError(`while scanning an ${name}`, start_mark, `expected alphabetic or numeric character but found '${char}'`, this.get_mark());
                        }
                        value = this.prefix(length);
                        this.forward(length);
                        char = this.peek();
                        if (indexOf.call(C_LB + C_WS + "\0" + "?:,]}%@`", char) < 0) {
                            throw new exports.ScannerError(`while scanning an ${name}`, start_mark, `expected alphabetic or numeric character but found '${char}'`, this.get_mark());
                        }
                        return new TokenClass(value, start_mark, this.get_mark());
                    }
                    scan_tag() {
                        var char, handle, length, start_mark, suffix, use_handle;
                        start_mark = this.get_mark();
                        char = this.peek(1);
                        if (char === "<") {
                            handle = null;
                            this.forward(2);
                            suffix = this.scan_tag_uri("tag", start_mark);
                            if (this.peek() !== ">") {
                                throw new exports.ScannerError("while parsing a tag", start_mark, `expected '>' but found ${this.peek()}`, this.get_mark());
                            }
                            this.forward();
                        } else if (indexOf.call(C_LB + C_WS + "\0", char) >= 0) {
                            handle = null;
                            suffix = "!";
                            this.forward();
                        } else {
                            length = 1;
                            use_handle = false;
                            while (indexOf.call(C_LB + "\0 ", char) < 0) {
                                if (char === "!") {
                                    use_handle = true;
                                    break;
                                }
                                length++;
                                char = this.peek(length);
                            }
                            if (use_handle) {
                                handle = this.scan_tag_handle("tag", start_mark);
                            } else {
                                handle = "!";
                                this.forward();
                            }
                            suffix = this.scan_tag_uri("tag", start_mark);
                        }
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0 ", char) < 0) {
                            throw new exports.ScannerError("while scanning a tag", start_mark, `expected ' ' but found ${char}`, this.get_mark());
                        }
                        return new tokens.TagToken([ handle, suffix ], start_mark, this.get_mark());
                    }
                    scan_block_scalar(style) {
                        var breaks, chomping, chunks, end_mark, folded, increment, indent, leading_non_space, length, line_break, max_indent, min_indent, ref, ref1, ref2, start_mark;
                        folded = style === ">";
                        chunks = [];
                        start_mark = this.get_mark();
                        this.forward();
                        [chomping, increment] = this.scan_block_scalar_indicators(start_mark);
                        this.scan_block_scalar_ignored_line(start_mark);
                        min_indent = this.indent + 1;
                        if (min_indent < 1) {
                            min_indent = 1;
                        }
                        if (increment == null) {
                            [breaks, max_indent, end_mark] = this.scan_block_scalar_indentation();
                            indent = Math.max(min_indent, max_indent);
                        } else {
                            indent = min_indent + increment - 1;
                            [breaks, end_mark] = this.scan_block_scalar_breaks(indent);
                        }
                        line_break = "";
                        while (this.column === indent && this.peek() !== "\0") {
                            chunks = chunks.concat(breaks);
                            leading_non_space = (ref = this.peek(), indexOf.call(" \t", ref) < 0);
                            length = 0;
                            while (ref1 = this.peek(length), indexOf.call(C_LB + "\0", ref1) < 0) {
                                length++;
                            }
                            chunks.push(this.prefix(length));
                            this.forward(length);
                            line_break = this.scan_line_break();
                            [breaks, end_mark] = this.scan_block_scalar_breaks(indent);
                            if (this.column === indent && this.peek() !== "\0") {
                                if (folded && line_break === "\n" && leading_non_space && (ref2 = this.peek(), indexOf.call(" \t", ref2) < 0)) {
                                    if (util.is_empty(breaks)) {
                                        chunks.push(" ");
                                    }
                                } else {
                                    chunks.push(line_break);
                                }
                            } else {
                                break;
                            }
                        }
                        if (chomping !== false) {
                            chunks.push(line_break);
                        }
                        if (chomping === true) {
                            chunks = chunks.concat(breaks);
                        }
                        return new tokens.ScalarToken(chunks.join(""), false, start_mark, end_mark, style);
                    }
                    scan_block_scalar_indicators(start_mark) {
                        var char, chomping, increment;
                        chomping = null;
                        increment = null;
                        char = this.peek();
                        if (indexOf.call("+-", char) >= 0) {
                            chomping = char === "+";
                            this.forward();
                            char = this.peek();
                            if (indexOf.call(C_NUMBERS, char) >= 0) {
                                increment = parseInt(char);
                                if (increment === 0) {
                                    throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected indentation indicator in the range 1-9 but found 0", this.get_mark());
                                }
                                this.forward();
                            }
                        } else if (indexOf.call(C_NUMBERS, char) >= 0) {
                            increment = parseInt(char);
                            if (increment === 0) {
                                throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected indentation indicator in the range 1-9 but found 0", this.get_mark());
                            }
                            this.forward();
                            char = this.peek();
                            if (indexOf.call("+-", char) >= 0) {
                                chomping = char === "+";
                                this.forward();
                            }
                        }
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0 ", char) < 0) {
                            throw new exports.ScannerError("while scanning a block scalar", start_mark, `expected chomping or indentation indicators, but found ${char}`, this.get_mark());
                        }
                        return [ chomping, increment ];
                    }
                    scan_block_scalar_ignored_line(start_mark) {
                        var char, ref;
                        while (this.peek() === " ") {
                            this.forward();
                        }
                        if (this.peek() === "#") {
                            while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
                                this.forward();
                            }
                        }
                        char = this.peek();
                        if (indexOf.call(C_LB + "\0", char) < 0) {
                            throw new exports.ScannerError("while scanning a block scalar", start_mark, `expected a comment or a line break but found ${char}`, this.get_mark());
                        }
                        return this.scan_line_break();
                    }
                    scan_block_scalar_indentation() {
                        var chunks, end_mark, max_indent, ref;
                        chunks = [];
                        max_indent = 0;
                        end_mark = this.get_mark();
                        while (ref = this.peek(), indexOf.call(C_LB + " ", ref) >= 0) {
                            if (this.peek() !== " ") {
                                chunks.push(this.scan_line_break());
                                end_mark = this.get_mark();
                            } else {
                                this.forward();
                                if (this.column > max_indent) {
                                    max_indent = this.column;
                                }
                            }
                        }
                        return [ chunks, max_indent, end_mark ];
                    }
                    scan_block_scalar_breaks(indent) {
                        var chunks, end_mark, ref;
                        chunks = [];
                        end_mark = this.get_mark();
                        while (this.column < indent && this.peek() === " ") {
                            this.forward();
                        }
                        while (ref = this.peek(), indexOf.call(C_LB, ref) >= 0) {
                            chunks.push(this.scan_line_break());
                            end_mark = this.get_mark();
                            while (this.column < indent && this.peek() === " ") {
                                this.forward();
                            }
                        }
                        return [ chunks, end_mark ];
                    }
                    scan_flow_scalar(style) {
                        var chunks, double, quote, start_mark;
                        double = style === '"';
                        chunks = [];
                        start_mark = this.get_mark();
                        quote = this.peek();
                        this.forward();
                        chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
                        while (this.peek() !== quote) {
                            chunks = chunks.concat(this.scan_flow_scalar_spaces(double, start_mark));
                            chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
                        }
                        this.forward();
                        return new tokens.ScalarToken(chunks.join(""), false, start_mark, this.get_mark(), style);
                    }
                    scan_flow_scalar_non_spaces(double, start_mark) {
                        var char, chunks, code, i, k, length, ref, ref1, ref2;
                        chunks = [];
                        while (true) {
                            length = 0;
                            while (ref = this.peek(length), indexOf.call(C_LB + C_WS + "'\"\\\0", ref) < 0) {
                                length++;
                            }
                            if (length !== 0) {
                                chunks.push(this.prefix(length));
                                this.forward(length);
                            }
                            char = this.peek();
                            if (!double && char === "'" && this.peek(1) === "'") {
                                chunks.push("'");
                                this.forward(2);
                            } else if (double && char === "'" || !double && indexOf.call('"\\', char) >= 0) {
                                chunks.push(char);
                                this.forward();
                            } else if (double && char === "\\") {
                                this.forward();
                                char = this.peek();
                                if (char in ESCAPE_REPLACEMENTS) {
                                    chunks.push(ESCAPE_REPLACEMENTS[char]);
                                    this.forward();
                                } else if (char in ESCAPE_CODES) {
                                    length = ESCAPE_CODES[char];
                                    this.forward();
                                    for (k = i = 0, ref1 = length; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
                                        if (ref2 = this.peek(k), indexOf.call(`${C_NUMBERS}ABCDEFabcdef`, ref2) < 0) {
                                            throw new exports.ScannerError("while scanning a double-quoted scalar", start_mark, `expected escape sequence of ${length} hexadecimal numbers, but found ${this.peek(k)}`, this.get_mark());
                                        }
                                    }
                                    code = parseInt(this.prefix(length), 16);
                                    chunks.push(String.fromCharCode(code));
                                    this.forward(length);
                                } else if (indexOf.call(C_LB, char) >= 0) {
                                    this.scan_line_break();
                                    chunks = chunks.concat(this.scan_flow_scalar_breaks(double, start_mark));
                                } else {
                                    throw new exports.ScannerError("while scanning a double-quoted scalar", start_mark, `found unknown escape character ${char}`, this.get_mark());
                                }
                            } else {
                                return chunks;
                            }
                        }
                    }
                    scan_flow_scalar_spaces(double, start_mark) {
                        var breaks, char, chunks, length, line_break, ref, whitespaces;
                        chunks = [];
                        length = 0;
                        while (ref = this.peek(length), indexOf.call(C_WS, ref) >= 0) {
                            length++;
                        }
                        whitespaces = this.prefix(length);
                        this.forward(length);
                        char = this.peek();
                        if (char === "\0") {
                            throw new exports.ScannerError("while scanning a quoted scalar", start_mark, "found unexpected end of stream", this.get_mark());
                        }
                        if (indexOf.call(C_LB, char) >= 0) {
                            line_break = this.scan_line_break();
                            breaks = this.scan_flow_scalar_breaks(double, start_mark);
                            if (line_break !== "\n") {
                                chunks.push(line_break);
                            } else if (breaks.length === 0) {
                                chunks.push(" ");
                            }
                            chunks = chunks.concat(breaks);
                        } else {
                            chunks.push(whitespaces);
                        }
                        return chunks;
                    }
                    scan_flow_scalar_breaks(double, start_mark) {
                        var chunks, prefix, ref, ref1, ref2;
                        chunks = [];
                        while (true) {
                            prefix = this.prefix(3);
                            if (prefix === "---" || prefix === "..." && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
                                throw new exports.ScannerError("while scanning a quoted scalar", start_mark, "found unexpected document separator", this.get_mark());
                            }
                            while (ref1 = this.peek(), indexOf.call(C_WS, ref1) >= 0) {
                                this.forward();
                            }
                            if (ref2 = this.peek(), indexOf.call(C_LB, ref2) >= 0) {
                                chunks.push(this.scan_line_break());
                            } else {
                                return chunks;
                            }
                        }
                    }
                    scan_plain() {
                        var char, chunks, end_mark, indent, length, ref, ref1, spaces, start_mark;
                        chunks = [];
                        start_mark = end_mark = this.get_mark();
                        indent = this.indent + 1;
                        spaces = [];
                        while (true) {
                            length = 0;
                            if (this.peek() === "#") {
                                break;
                            }
                            while (true) {
                                char = this.peek(length);
                                if (indexOf.call(C_LB + C_WS + "\0", char) >= 0 || this.flow_level === 0 && char === ":" && (ref = this.peek(length + 1), 
                                indexOf.call(C_LB + C_WS + "\0", ref) >= 0) || this.flow_level !== 0 && indexOf.call(",:?[]{}", char) >= 0) {
                                    break;
                                }
                                length++;
                            }
                            if (this.flow_level !== 0 && char === ":" && (ref1 = this.peek(length + 1), indexOf.call(C_LB + C_WS + "\0,[]{}", ref1) < 0)) {
                                this.forward(length);
                                throw new exports.ScannerError("while scanning a plain scalar", start_mark, "found unexpected ':'", this.get_mark(), "Please check http://pyyaml.org/wiki/YAMLColonInFlowContext");
                            }
                            if (length === 0) {
                                break;
                            }
                            this.allow_simple_key = false;
                            chunks = chunks.concat(spaces);
                            chunks.push(this.prefix(length));
                            this.forward(length);
                            end_mark = this.get_mark();
                            spaces = this.scan_plain_spaces(indent, start_mark);
                            if (spaces == null || spaces.length === 0 || this.peek() === "#" || this.flow_level === 0 && this.column < indent) {
                                break;
                            }
                        }
                        return new tokens.ScalarToken(chunks.join(""), true, start_mark, end_mark);
                    }
                    scan_plain_spaces(indent, start_mark) {
                        var breaks, char, chunks, length, line_break, prefix, ref, ref1, ref2, ref3, whitespaces;
                        chunks = [];
                        length = 0;
                        while (ref = this.peek(length), indexOf.call(" ", ref) >= 0) {
                            length++;
                        }
                        whitespaces = this.prefix(length);
                        this.forward(length);
                        char = this.peek();
                        if (indexOf.call(C_LB, char) >= 0) {
                            line_break = this.scan_line_break();
                            this.allow_simple_key = true;
                            prefix = this.prefix(3);
                            if (prefix === "---" || prefix === "..." && (ref1 = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref1) >= 0)) {
                                return;
                            }
                            breaks = [];
                            while (ref3 = this.peek(), indexOf.call(C_LB + " ", ref3) >= 0) {
                                if (this.peek() === " ") {
                                    this.forward();
                                } else {
                                    breaks.push(this.scan_line_break());
                                    prefix = this.prefix(3);
                                    if (prefix === "---" || prefix === "..." && (ref2 = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref2) >= 0)) {
                                        return;
                                    }
                                }
                            }
                            if (line_break !== "\n") {
                                chunks.push(line_break);
                            } else if (breaks.length === 0) {
                                chunks.push(" ");
                            }
                            chunks = chunks.concat(breaks);
                        } else if (whitespaces) {
                            chunks.push(whitespaces);
                        }
                        return chunks;
                    }
                    scan_tag_handle(name, start_mark) {
                        var char, length, value;
                        char = this.peek();
                        if (char !== "!") {
                            throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected '!' but found ${char}`, this.get_mark());
                        }
                        length = 1;
                        char = this.peek(length);
                        if (char !== " ") {
                            while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
                                length++;
                                char = this.peek(length);
                            }
                            if (char !== "!") {
                                this.forward(length);
                                throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected '!' but found ${char}`, this.get_mark());
                            }
                            length++;
                        }
                        value = this.prefix(length);
                        this.forward(length);
                        return value;
                    }
                    scan_tag_uri(name, start_mark) {
                        var char, chunks, length;
                        chunks = [];
                        length = 0;
                        char = this.peek(length);
                        while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?:@&=+$,_.!~*'()[]%", char) >= 0) {
                            if (char === "%") {
                                chunks.push(this.prefix(length));
                                this.forward(length);
                                length = 0;
                                chunks.push(this.scan_uri_escapes(name, start_mark));
                            } else {
                                length++;
                            }
                            char = this.peek(length);
                        }
                        if (length !== 0) {
                            chunks.push(this.prefix(length));
                            this.forward(length);
                            length = 0;
                        }
                        if (chunks.length === 0) {
                            throw new exports.ScannerError(`while parsing a ${name}`, start_mark, `expected URI but found ${char}`, this.get_mark());
                        }
                        return chunks.join("");
                    }
                    scan_uri_escapes(name, start_mark) {
                        var bytes, i, k, mark;
                        bytes = [];
                        mark = this.get_mark();
                        while (this.peek() === "%") {
                            this.forward();
                            for (k = i = 0; i <= 2; k = ++i) {
                                throw new exports.ScannerError(`while scanning a ${name}`, start_mark, `expected URI escape sequence of 2 hexadecimal numbers but found ${this.peek(k)}`, this.get_mark());
                            }
                            bytes.push(String.fromCharCode(parseInt(this.prefix(2), 16)));
                            this.forward(2);
                        }
                        return bytes.join("");
                    }
                    scan_line_break() {
                        var char;
                        char = this.peek();
                        if (indexOf.call("\r\n", char) >= 0) {
                            if (this.prefix(2) === "\r\n") {
                                this.forward(2);
                            } else {
                                this.forward();
                            }
                            return "\n";
                        } else if (indexOf.call("\u2028\u2029", char) >= 0) {
                            this.forward();
                            return char;
                        }
                        return "";
                    }
                }
                C_LB = "\r\n\u2028\u2029";
                C_WS = "\t ";
                C_NUMBERS = "0123456789";
                ESCAPE_REPLACEMENTS = {
                    "0": "\0",
                    a: "",
                    b: "\b",
                    t: "\t",
                    "\t": "\t",
                    n: "\n",
                    v: "\v",
                    f: "\f",
                    r: "\r",
                    e: "",
                    " ": " ",
                    '"': '"',
                    "\\": "\\",
                    N: "",
                    _: " ",
                    L: "\u2028",
                    P: "\u2029"
                };
                ESCAPE_CODES = {
                    x: 2,
                    u: 4,
                    U: 8
                };
                ctor = Scanner.prototype.initialise;
                return Scanner;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./parser" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var MarkedYAMLError, events, tokens, hasProp = {}.hasOwnProperty;
            events = require("./events");
            ({MarkedYAMLError: MarkedYAMLError} = require("./errors"));
            tokens = require("./tokens");
            this.ParserError = class ParserError extends MarkedYAMLError {};
            this.Parser = function() {
                var DEFAULT_TAGS, ctor;
                class Parser {
                    constructor() {
                        return ctor.apply(this, arguments);
                    }
                    initialise() {
                        this.current_event = null;
                        this.yaml_version = null;
                        this.tag_handles = {};
                        this.states = [];
                        this.marks = [];
                        return this.state = "parse_stream_start";
                    }
                    dispose() {
                        this.states = [];
                        return this.state = null;
                    }
                    check_event(...choices) {
                        var choice, i, len;
                        if (this.current_event === null) {
                            if (this.state != null) {
                                this.current_event = this[this.state]();
                            }
                        }
                        if (this.current_event !== null) {
                            if (choices.length === 0) {
                                return true;
                            }
                            for (i = 0, len = choices.length; i < len; i++) {
                                choice = choices[i];
                                if (this.current_event instanceof choice) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    peek_event() {
                        if (this.current_event === null && this.state != null) {
                            this.current_event = this[this.state]();
                        }
                        return this.current_event;
                    }
                    get_event() {
                        var event;
                        if (this.current_event === null && this.state != null) {
                            this.current_event = this[this.state]();
                        }
                        event = this.current_event;
                        this.current_event = null;
                        return event;
                    }
                    parse_stream_start() {
                        var event, token;
                        token = this.get_token();
                        event = new events.StreamStartEvent(token.start_mark, token.end_mark);
                        this.state = "parse_implicit_document_start";
                        return event;
                    }
                    parse_implicit_document_start() {
                        var end_mark, event, start_mark, token;
                        if (!this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.StreamEndToken)) {
                            this.tag_handles = DEFAULT_TAGS;
                            token = this.peek_token();
                            start_mark = end_mark = token.start_mark;
                            event = new events.DocumentStartEvent(start_mark, end_mark, false);
                            this.states.push("parse_document_end");
                            this.state = "parse_block_node";
                            return event;
                        } else {
                            return this.parse_document_start();
                        }
                    }
                    parse_document_start() {
                        var end_mark, event, start_mark, tags, token, version;
                        while (this.check_token(tokens.DocumentEndToken)) {
                            this.get_token();
                        }
                        if (!this.check_token(tokens.StreamEndToken)) {
                            start_mark = this.peek_token().start_mark;
                            [version, tags] = this.process_directives();
                            if (!this.check_token(tokens.DocumentStartToken)) {
                                throw new exports.ParserError(`expected '<document start>', but found ${this.peek_token().id}`, this.peek_token().start_mark);
                            }
                            token = this.get_token();
                            end_mark = token.end_mark;
                            event = new events.DocumentStartEvent(start_mark, end_mark, true, version, tags);
                            this.states.push("parse_document_end");
                            this.state = "parse_document_content";
                        } else {
                            token = this.get_token();
                            event = new events.StreamEndEvent(token.start_mark, token.end_mark);
                            if (this.states.length !== 0) {
                                throw new Error("assertion error, states should be empty");
                            }
                            if (this.marks.length !== 0) {
                                throw new Error("assertion error, marks should be empty");
                            }
                            this.state = null;
                        }
                        return event;
                    }
                    parse_document_end() {
                        var end_mark, event, explicit, start_mark, token;
                        token = this.peek_token();
                        start_mark = end_mark = token.start_mark;
                        explicit = false;
                        if (this.check_token(tokens.DocumentEndToken)) {
                            token = this.get_token();
                            end_mark = token.end_mark;
                            explicit = true;
                        }
                        event = new events.DocumentEndEvent(start_mark, end_mark, explicit);
                        this.state = "parse_document_start";
                        return event;
                    }
                    parse_document_content() {
                        var event;
                        if (this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.DocumentEndToken, tokens.StreamEndToken)) {
                            event = this.process_empty_scalar(this.peek_token().start_mark);
                            this.state = this.states.pop();
                            return event;
                        } else {
                            return this.parse_block_node();
                        }
                    }
                    process_directives() {
                        var handle, major, minor, prefix, ref, tag_handles_copy, token, value;
                        this.yaml_version = null;
                        this.tag_handles = {};
                        while (this.check_token(tokens.DirectiveToken)) {
                            token = this.get_token();
                            if (token.name === "YAML") {
                                if (this.yaml_version !== null) {
                                    throw new exports.ParserError(null, null, "found duplicate YAML directive", token.start_mark);
                                }
                                [major, minor] = token.value;
                                if (major !== 1) {
                                    throw new exports.ParserError(null, null, "found incompatible YAML document (version 1.* is required)", token.start_mark);
                                }
                                this.yaml_version = token.value;
                            } else if (token.name === "TAG") {
                                [handle, prefix] = token.value;
                                if (handle in this.tag_handles) {
                                    throw new exports.ParserError(null, null, `duplicate tag handle ${handle}`, token.start_mark);
                                }
                                this.tag_handles[handle] = prefix;
                            }
                        }
                        tag_handles_copy = null;
                        ref = this.tag_handles;
                        for (handle in ref) {
                            if (!hasProp.call(ref, handle)) continue;
                            prefix = ref[handle];
                            if (tag_handles_copy == null) {
                                tag_handles_copy = {};
                            }
                            tag_handles_copy[handle] = prefix;
                        }
                        value = [ this.yaml_version, tag_handles_copy ];
                        for (handle in DEFAULT_TAGS) {
                            if (!hasProp.call(DEFAULT_TAGS, handle)) continue;
                            prefix = DEFAULT_TAGS[handle];
                            if (!(prefix in this.tag_handles)) {
                                this.tag_handles[handle] = prefix;
                            }
                        }
                        return value;
                    }
                    parse_block_node() {
                        return this.parse_node(true);
                    }
                    parse_flow_node() {
                        return this.parse_node();
                    }
                    parse_block_node_or_indentless_sequence() {
                        return this.parse_node(true, true);
                    }
                    parse_node(block = false, indentless_sequence = false) {
                        var anchor, end_mark, event, handle, implicit, node, start_mark, suffix, tag, tag_mark, token;
                        if (this.check_token(tokens.AliasToken)) {
                            token = this.get_token();
                            event = new events.AliasEvent(token.value, token.start_mark, token.end_mark);
                            this.state = this.states.pop();
                        } else {
                            anchor = null;
                            tag = null;
                            start_mark = end_mark = tag_mark = null;
                            if (this.check_token(tokens.AnchorToken)) {
                                token = this.get_token();
                                start_mark = token.start_mark;
                                end_mark = token.end_mark;
                                anchor = token.value;
                                if (this.check_token(tokens.TagToken)) {
                                    token = this.get_token();
                                    tag_mark = token.start_mark;
                                    end_mark = token.end_mark;
                                    tag = token.value;
                                }
                            } else if (this.check_token(tokens.TagToken)) {
                                token = this.get_token();
                                start_mark = tag_mark = token.start_mark;
                                end_mark = token.end_mark;
                                tag = token.value;
                                if (this.check_token(tokens.AnchorToken)) {
                                    token = this.get_token();
                                    end_mark = token.end_mark;
                                    anchor = token.value;
                                }
                            }
                            if (tag !== null) {
                                [handle, suffix] = tag;
                                if (handle !== null) {
                                    if (!(handle in this.tag_handles)) {
                                        throw new exports.ParserError("while parsing a node", start_mark, `found undefined tag handle ${handle}`, tag_mark);
                                    }
                                    tag = this.tag_handles[handle] + suffix;
                                } else {
                                    tag = suffix;
                                }
                            }
                            if (start_mark === null) {
                                start_mark = end_mark = this.peek_token().start_mark;
                            }
                            event = null;
                            implicit = tag === null || tag === "!";
                            if (indentless_sequence && this.check_token(tokens.BlockEntryToken)) {
                                end_mark = this.peek_token().end_mark;
                                event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark);
                                this.state = "parse_indentless_sequence_entry";
                            } else {
                                if (this.check_token(tokens.ScalarToken)) {
                                    token = this.get_token();
                                    end_mark = token.end_mark;
                                    if (token.plain && tag === null || tag === "!") {
                                        implicit = [ true, false ];
                                    } else if (tag === null) {
                                        implicit = [ false, true ];
                                    } else {
                                        implicit = [ false, false ];
                                    }
                                    event = new events.ScalarEvent(anchor, tag, implicit, token.value, start_mark, end_mark, token.style);
                                    this.state = this.states.pop();
                                } else if (this.check_token(tokens.FlowSequenceStartToken)) {
                                    end_mark = this.peek_token().end_mark;
                                    event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
                                    this.state = "parse_flow_sequence_first_entry";
                                } else if (this.check_token(tokens.FlowMappingStartToken)) {
                                    end_mark = this.peek_token().end_mark;
                                    event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
                                    this.state = "parse_flow_mapping_first_key";
                                } else if (block && this.check_token(tokens.BlockSequenceStartToken)) {
                                    end_mark = this.peek_token().end_mark;
                                    event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
                                    this.state = "parse_block_sequence_first_entry";
                                } else if (block && this.check_token(tokens.BlockMappingStartToken)) {
                                    end_mark = this.peek_token().end_mark;
                                    event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
                                    this.state = "parse_block_mapping_first_key";
                                } else if (anchor !== null || tag !== null) {
                                    event = new events.ScalarEvent(anchor, tag, [ implicit, false ], "", start_mark, end_mark);
                                    this.state = this.states.pop();
                                } else {
                                    if (block) {
                                        node = "block";
                                    } else {
                                        node = "flow";
                                    }
                                    token = this.peek_token();
                                    throw new exports.ParserError(`while parsing a ${node} node`, start_mark, `expected the node content, but found ${token.id}`, token.start_mark);
                                }
                            }
                        }
                        return event;
                    }
                    parse_block_sequence_first_entry() {
                        var token;
                        token = this.get_token();
                        this.marks.push(token.start_mark);
                        return this.parse_block_sequence_entry();
                    }
                    parse_block_sequence_entry() {
                        var event, token;
                        if (this.check_token(tokens.BlockEntryToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.BlockEntryToken, tokens.BlockEndToken)) {
                                this.states.push("parse_block_sequence_entry");
                                return this.parse_block_node();
                            } else {
                                this.state = "parse_block_sequence_entry";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        }
                        if (!this.check_token(tokens.BlockEndToken)) {
                            token = this.peek_token();
                            throw new exports.ParserError("while parsing a block collection", this.marks.slice(-1)[0], `expected <block end>, but found ${token.id}`, token.start_mark);
                        }
                        token = this.get_token();
                        event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
                        this.state = this.states.pop();
                        this.marks.pop();
                        return event;
                    }
                    parse_indentless_sequence_entry() {
                        var event, token;
                        if (this.check_token(tokens.BlockEntryToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.BlockEntryToken, tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
                                this.states.push("parse_indentless_sequence_entry");
                                return this.parse_block_node();
                            } else {
                                this.state = "parse_indentless_sequence_entry";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        }
                        token = this.peek_token();
                        event = new events.SequenceEndEvent(token.start_mark, token.start_mark);
                        this.state = this.states.pop();
                        return event;
                    }
                    parse_block_mapping_first_key() {
                        var token;
                        token = this.get_token();
                        this.marks.push(token.start_mark);
                        return this.parse_block_mapping_key();
                    }
                    parse_block_mapping_key() {
                        var event, token;
                        if (this.check_token(tokens.KeyToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
                                this.states.push("parse_block_mapping_value");
                                return this.parse_block_node_or_indentless_sequence();
                            } else {
                                this.state = "parse_block_mapping_value";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        }
                        if (!this.check_token(tokens.BlockEndToken)) {
                            token = this.peek_token();
                            throw new exports.ParserError("while parsing a block mapping", this.marks.slice(-1)[0], `expected <block end>, but found ${token.id}`, token.start_mark);
                        }
                        token = this.get_token();
                        event = new events.MappingEndEvent(token.start_mark, token.end_mark);
                        this.state = this.states.pop();
                        this.marks.pop();
                        return event;
                    }
                    parse_block_mapping_value() {
                        var token;
                        if (this.check_token(tokens.ValueToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
                                this.states.push("parse_block_mapping_key");
                                return this.parse_block_node_or_indentless_sequence();
                            } else {
                                this.state = "parse_block_mapping_key";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        } else {
                            this.state = "parse_block_mapping_key";
                            token = this.peek_token();
                            return this.process_empty_scalar(token.start_mark);
                        }
                    }
                    parse_flow_sequence_first_entry() {
                        var token;
                        token = this.get_token();
                        this.marks.push(token.start_mark);
                        return this.parse_flow_sequence_entry(true);
                    }
                    parse_flow_sequence_entry(first = false) {
                        var event, token;
                        if (!this.check_token(tokens.FlowSequenceEndToken)) {
                            if (!first) {
                                if (this.check_token(tokens.FlowEntryToken)) {
                                    this.get_token();
                                } else {
                                    token = this.peek_token();
                                    throw new exports.ParserError("while parsing a flow sequence", this.marks.slice(-1)[0], `expected ',' or ']', but got ${token.id}`, token.start_mark);
                                }
                            }
                            if (this.check_token(tokens.KeyToken)) {
                                token = this.peek_token();
                                event = new events.MappingStartEvent(null, null, true, token.start_mark, token.end_mark, true);
                                this.state = "parse_flow_sequence_entry_mapping_key";
                                return event;
                            } else if (!this.check_token(tokens.FlowSequenceEndToken)) {
                                this.states.push("parse_flow_sequence_entry");
                                return this.parse_flow_node();
                            }
                        }
                        token = this.get_token();
                        event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
                        this.state = this.states.pop();
                        this.marks.pop();
                        return event;
                    }
                    parse_flow_sequence_entry_mapping_key() {
                        var token;
                        token = this.get_token();
                        if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
                            this.states.push("parse_flow_sequence_entry_mapping_value");
                            return this.parse_flow_node();
                        } else {
                            this.state = "parse_flow_sequence_entry_mapping_value";
                            return this.process_empty_scalar(token.end_mark);
                        }
                    }
                    parse_flow_sequence_entry_mapping_value() {
                        var token;
                        if (this.check_token(tokens.ValueToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
                                this.states.push("parse_flow_sequence_entry_mapping_end");
                                return this.parse_flow_node();
                            } else {
                                this.state = "parse_flow_sequence_entry_mapping_end";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        } else {
                            this.state = "parse_flow_sequence_entry_mapping_end";
                            token = this.peek_token();
                            return this.process_empty_scalar(token.start_mark);
                        }
                    }
                    parse_flow_sequence_entry_mapping_end() {
                        var token;
                        this.state = "parse_flow_sequence_entry";
                        token = this.peek_token();
                        return new events.MappingEndEvent(token.start_mark, token.start_mark);
                    }
                    parse_flow_mapping_first_key() {
                        var token;
                        token = this.get_token();
                        this.marks.push(token.start_mark);
                        return this.parse_flow_mapping_key(true);
                    }
                    parse_flow_mapping_key(first = false) {
                        var event, token;
                        if (!this.check_token(tokens.FlowMappingEndToken)) {
                            if (!first) {
                                if (this.check_token(tokens.FlowEntryToken)) {
                                    this.get_token();
                                } else {
                                    token = this.peek_token();
                                    throw new exports.ParserError("while parsing a flow mapping", this.marks.slice(-1)[0], `expected ',' or '}', but got ${token.id}`, token.start_mark);
                                }
                            }
                            if (this.check_token(tokens.KeyToken)) {
                                token = this.get_token();
                                if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
                                    this.states.push("parse_flow_mapping_value");
                                    return this.parse_flow_node();
                                } else {
                                    this.state = "parse_flow_mapping_value";
                                    return this.process_empty_scalar(token.end_mark);
                                }
                            } else if (!this.check_token(tokens.FlowMappingEndToken)) {
                                this.states.push("parse_flow_mapping_empty_value");
                                return this.parse_flow_node();
                            }
                        }
                        token = this.get_token();
                        event = new events.MappingEndEvent(token.start_mark, token.end_mark);
                        this.state = this.states.pop();
                        this.marks.pop();
                        return event;
                    }
                    parse_flow_mapping_value() {
                        var token;
                        if (this.check_token(tokens.ValueToken)) {
                            token = this.get_token();
                            if (!this.check_token(tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
                                this.states.push("parse_flow_mapping_key");
                                return this.parse_flow_node();
                            } else {
                                this.state = "parse_flow_mapping_key";
                                return this.process_empty_scalar(token.end_mark);
                            }
                        } else {
                            this.state = "parse_flow_mapping_key";
                            token = this.peek_token();
                            return this.process_empty_scalar(token.start_mark);
                        }
                    }
                    parse_flow_mapping_empty_value() {
                        this.state = "parse_flow_mapping_key";
                        return this.process_empty_scalar(this.peek_token().start_mark);
                    }
                    process_empty_scalar(mark) {
                        return new events.ScalarEvent(null, null, [ true, false ], "", mark, mark);
                    }
                }
                DEFAULT_TAGS = {
                    "!": "!",
                    "!!": "tag:yaml.org,2002:"
                };
                ctor = Parser.prototype.initialise;
                return Parser;
            }.call(this);
        }).call(this);
    });
    register({
        "0": [ "./loader" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var composer, constructor, parser, reader, resolver, scanner, util;
            util = require("./util");
            reader = require("./reader");
            scanner = require("./scanner");
            parser = require("./parser");
            composer = require("./composer");
            resolver = require("./resolver");
            constructor = require("./constructor");
            this.make_loader = function(Reader = reader.Reader, Scanner = scanner.Scanner, Parser = parser.Parser, Composer = composer.Composer, Resolver = resolver.Resolver, Constructor = constructor.Constructor) {
                var Loader, components;
                components = [ Reader, Scanner, Parser, Composer, Resolver, Constructor ];
                return Loader = function() {
                    var component;
                    class Loader {
                        constructor(stream) {
                            var i, len, ref;
                            components[0].prototype.initialise.call(this, stream);
                            ref = components.slice(1);
                            for (i = 0, len = ref.length; i < len; i++) {
                                component = ref[i];
                                component.prototype.initialise.call(this);
                            }
                        }
                    }
                    util.extend(Loader.prototype, ...function() {
                        var i, len, results;
                        results = [];
                        for (i = 0, len = components.length; i < len; i++) {
                            component = components[i];
                            results.push(component.prototype);
                        }
                        return results;
                    }());
                    return Loader;
                }.call(this);
            };
            this.Loader = this.make_loader();
        }).call(this);
    });
    register({
        "": [ "yaml" ]
    }, 0, function(global, module, exports, require, window) {
        (function() {
            var composer, constructor, dumper, errors, events, loader, nodes, parser, reader, resolver, scanner, tokens, util;
            composer = this.composer = require("./composer");
            constructor = this.constructor = require("./constructor");
            dumper = this.dumper = require("./dumper");
            errors = this.errors = require("./errors");
            events = this.events = require("./events");
            loader = this.loader = require("./loader");
            nodes = this.nodes = require("./nodes");
            parser = this.parser = require("./parser");
            reader = this.reader = require("./reader");
            resolver = this.resolver = require("./resolver");
            scanner = this.scanner = require("./scanner");
            tokens = this.tokens = require("./tokens");
            util = require("./util");
            this.scan = function(stream, Loader = loader.Loader) {
                var _loader, results;
                _loader = new Loader(stream);
                results = [];
                while (_loader.check_token()) {
                    results.push(_loader.get_token());
                }
                return results;
            };
            this.parse = function(stream, Loader = loader.Loader) {
                var _loader, results;
                _loader = new Loader(stream);
                results = [];
                while (_loader.check_event()) {
                    results.push(_loader.get_event());
                }
                return results;
            };
            this.compose = function(stream, Loader = loader.Loader) {
                var _loader;
                _loader = new Loader(stream);
                return _loader.get_single_node();
            };
            this.compose_all = function(stream, Loader = loader.Loader) {
                var _loader, results;
                _loader = new Loader(stream);
                results = [];
                while (_loader.check_node()) {
                    results.push(_loader.get_node());
                }
                return results;
            };
            this.load = function(stream, Loader = loader.Loader) {
                var _loader;
                _loader = new Loader(stream);
                return _loader.get_single_data();
            };
            this.load_all = function(stream, Loader = loader.Loader) {
                var _loader, results;
                _loader = new Loader(stream);
                results = [];
                while (_loader.check_data()) {
                    results.push(_loader.get_data());
                }
                return results;
            };
            this.emit = function(events, stream, Dumper = dumper.Dumper, options = {}) {
                var _dumper, dest, event, i, len;
                dest = stream || new util.StringStream();
                _dumper = new Dumper(dest, options);
                try {
                    for (i = 0, len = events.length; i < len; i++) {
                        event = events[i];
                        _dumper.emit(event);
                    }
                } finally {
                    _dumper.dispose();
                }
                return stream || dest.string;
            };
            this.serialize = function(node, stream, Dumper = dumper.Dumper, options = {}) {
                return exports.serialize_all([ node ], stream, Dumper, options);
            };
            this.serialize_all = function(nodes, stream, Dumper = dumper.Dumper, options = {}) {
                var _dumper, dest, i, len, node;
                dest = stream || new util.StringStream();
                _dumper = new Dumper(dest, options);
                try {
                    _dumper.open();
                    for (i = 0, len = nodes.length; i < len; i++) {
                        node = nodes[i];
                        _dumper.serialize(node);
                    }
                    _dumper.close();
                } finally {
                    _dumper.dispose();
                }
                return stream || dest.string;
            };
            this.dump = function(data, stream, Dumper = dumper.Dumper, options = {}) {
                return exports.dump_all([ data ], stream, Dumper, options);
            };
            this.dump_all = function(documents, stream, Dumper = dumper.Dumper, options = {}) {
                var _dumper, dest, document, i, len;
                dest = stream || new util.StringStream();
                _dumper = new Dumper(dest, options);
                try {
                    _dumper.open();
                    for (i = 0, len = documents.length; i < len; i++) {
                        document = documents[i];
                        _dumper.represent(document);
                    }
                    _dumper.close();
                } finally {
                    _dumper.dispose();
                }
                return stream || dest.string;
            };
        }).call(this);
    });
    root["yaml"] = require_from(null, "")("yaml");
}).call(this);