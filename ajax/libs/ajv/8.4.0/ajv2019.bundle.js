(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ajv2019 = {}));
}(this, (function (exports) { 'use strict';

    class _CodeOrName {
    }
    const IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class Name extends _CodeOrName {
        constructor(s) {
            super();
            if (!IDENTIFIER.test(s))
                throw new Error("CodeGen: name must be a valid identifier");
            this.str = s;
        }
        toString() {
            return this.str;
        }
        emptyStr() {
            return false;
        }
        get names() {
            return { [this.str]: 1 };
        }
    }
    class _Code extends _CodeOrName {
        constructor(code) {
            super();
            this._items = typeof code === "string" ? [code] : code;
        }
        toString() {
            return this.str;
        }
        emptyStr() {
            if (this._items.length > 1)
                return false;
            const item = this._items[0];
            return item === "" || item === '""';
        }
        get str() {
            var _a;
            return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
        }
        get names() {
            var _a;
            return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
                if (c instanceof Name)
                    names[c.str] = (names[c.str] || 0) + 1;
                return names;
            }, {})));
        }
    }
    const nil = new _Code("");
    function _(strs, ...args) {
        const code = [strs[0]];
        let i = 0;
        while (i < args.length) {
            addCodeArg(code, args[i]);
            code.push(strs[++i]);
        }
        return new _Code(code);
    }
    const plus = new _Code("+");
    function str(strs, ...args) {
        const expr = [safeStringify(strs[0])];
        let i = 0;
        while (i < args.length) {
            expr.push(plus);
            addCodeArg(expr, args[i]);
            expr.push(plus, safeStringify(strs[++i]));
        }
        optimize(expr);
        return new _Code(expr);
    }
    function addCodeArg(code, arg) {
        if (arg instanceof _Code)
            code.push(...arg._items);
        else if (arg instanceof Name)
            code.push(arg);
        else
            code.push(interpolate(arg));
    }
    function optimize(expr) {
        let i = 1;
        while (i < expr.length - 1) {
            if (expr[i] === plus) {
                const res = mergeExprItems(expr[i - 1], expr[i + 1]);
                if (res !== undefined) {
                    expr.splice(i - 1, 3, res);
                    continue;
                }
                expr[i++] = "+";
            }
            i++;
        }
    }
    function mergeExprItems(a, b) {
        if (b === '""')
            return a;
        if (a === '""')
            return b;
        if (typeof a == "string") {
            if (b instanceof Name || a[a.length - 1] !== '"')
                return;
            if (typeof b != "string")
                return `${a.slice(0, -1)}${b}"`;
            if (b[0] === '"')
                return a.slice(0, -1) + b.slice(1);
            return;
        }
        if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
            return `"${a}${b.slice(1)}`;
        return;
    }
    function strConcat(c1, c2) {
        return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
    }
    // TODO do not allow arrays here
    function interpolate(x) {
        return typeof x == "number" || typeof x == "boolean" || x === null
            ? x
            : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
        return new _Code(safeStringify(x));
    }
    function safeStringify(x) {
        return JSON.stringify(x)
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
    }
    function getProperty(key) {
        return typeof key == "string" && IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
    }
    function regexpCode(rx) {
        return new _Code(rx.toString());
    }

    class ValueError extends Error {
        constructor(name) {
            super(`CodeGen: "code" for ${name} not defined`);
            this.value = name.value;
        }
    }
    var UsedValueState;
    (function (UsedValueState) {
        UsedValueState[UsedValueState["Started"] = 0] = "Started";
        UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
    })(UsedValueState || (UsedValueState = {}));
    const varKinds = {
        const: new Name("const"),
        let: new Name("let"),
        var: new Name("var"),
    };
    class Scope {
        constructor({ prefixes, parent } = {}) {
            this._names = {};
            this._prefixes = prefixes;
            this._parent = parent;
        }
        toName(nameOrPrefix) {
            return nameOrPrefix instanceof Name ? nameOrPrefix : this.name(nameOrPrefix);
        }
        name(prefix) {
            return new Name(this._newName(prefix));
        }
        _newName(prefix) {
            const ng = this._names[prefix] || this._nameGroup(prefix);
            return `${prefix}${ng.index++}`;
        }
        _nameGroup(prefix) {
            var _a, _b;
            if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
                throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
            }
            return (this._names[prefix] = { prefix, index: 0 });
        }
    }
    class ValueScopeName extends Name {
        constructor(prefix, nameStr) {
            super(nameStr);
            this.prefix = prefix;
        }
        setValue(value, { property, itemIndex }) {
            this.value = value;
            this.scopePath = _ `.${new Name(property)}[${itemIndex}]`;
        }
    }
    const line = _ `\n`;
    class ValueScope extends Scope {
        constructor(opts) {
            super(opts);
            this._values = {};
            this._scope = opts.scope;
            this.opts = { ...opts, _n: opts.lines ? line : nil };
        }
        get() {
            return this._scope;
        }
        name(prefix) {
            return new ValueScopeName(prefix, this._newName(prefix));
        }
        value(nameOrPrefix, value) {
            var _a;
            if (value.ref === undefined)
                throw new Error("CodeGen: ref must be passed in value");
            const name = this.toName(nameOrPrefix);
            const { prefix } = name;
            const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
            let vs = this._values[prefix];
            if (vs) {
                const _name = vs.get(valueKey);
                if (_name)
                    return _name;
            }
            else {
                vs = this._values[prefix] = new Map();
            }
            vs.set(valueKey, name);
            const s = this._scope[prefix] || (this._scope[prefix] = []);
            const itemIndex = s.length;
            s[itemIndex] = value.ref;
            name.setValue(value, { property: prefix, itemIndex });
            return name;
        }
        getValue(prefix, keyOrRef) {
            const vs = this._values[prefix];
            if (!vs)
                return;
            return vs.get(keyOrRef);
        }
        scopeRefs(scopeName, values = this._values) {
            return this._reduceValues(values, (name) => {
                if (name.scopePath === undefined)
                    throw new Error(`CodeGen: name "${name}" has no value`);
                return _ `${scopeName}${name.scopePath}`;
            });
        }
        scopeCode(values = this._values, usedValues, getCode) {
            return this._reduceValues(values, (name) => {
                if (name.value === undefined)
                    throw new Error(`CodeGen: name "${name}" has no value`);
                return name.value.code;
            }, usedValues, getCode);
        }
        _reduceValues(values, valueCode, usedValues = {}, getCode) {
            let code = nil;
            for (const prefix in values) {
                const vs = values[prefix];
                if (!vs)
                    continue;
                const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
                vs.forEach((name) => {
                    if (nameSet.has(name))
                        return;
                    nameSet.set(name, UsedValueState.Started);
                    let c = valueCode(name);
                    if (c) {
                        const def = this.opts.es5 ? varKinds.var : varKinds.const;
                        code = _ `${code}${def} ${name} = ${c};${this.opts._n}`;
                    }
                    else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                        code = _ `${code}${c}${this.opts._n}`;
                    }
                    else {
                        throw new ValueError(name);
                    }
                    nameSet.set(name, UsedValueState.Completed);
                });
            }
            return code;
        }
    }

    const operators = {
        GT: new _Code(">"),
        GTE: new _Code(">="),
        LT: new _Code("<"),
        LTE: new _Code("<="),
        EQ: new _Code("==="),
        NEQ: new _Code("!=="),
        NOT: new _Code("!"),
        OR: new _Code("||"),
        AND: new _Code("&&"),
        ADD: new _Code("+"),
    };
    class Node {
        optimizeNodes() {
            return this;
        }
        optimizeNames(_names, _constants) {
            return this;
        }
    }
    class Def extends Node {
        constructor(varKind, name, rhs) {
            super();
            this.varKind = varKind;
            this.name = name;
            this.rhs = rhs;
        }
        render({ es5, _n }) {
            const varKind = es5 ? varKinds.var : this.varKind;
            const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
            return `${varKind} ${this.name}${rhs};` + _n;
        }
        optimizeNames(names, constants) {
            if (!names[this.name.str])
                return;
            if (this.rhs)
                this.rhs = optimizeExpr(this.rhs, names, constants);
            return this;
        }
        get names() {
            return this.rhs instanceof _CodeOrName ? this.rhs.names : {};
        }
    }
    class Assign extends Node {
        constructor(lhs, rhs, sideEffects) {
            super();
            this.lhs = lhs;
            this.rhs = rhs;
            this.sideEffects = sideEffects;
        }
        render({ _n }) {
            return `${this.lhs} = ${this.rhs};` + _n;
        }
        optimizeNames(names, constants) {
            if (this.lhs instanceof Name && !names[this.lhs.str] && !this.sideEffects)
                return;
            this.rhs = optimizeExpr(this.rhs, names, constants);
            return this;
        }
        get names() {
            const names = this.lhs instanceof Name ? {} : { ...this.lhs.names };
            return addExprNames(names, this.rhs);
        }
    }
    class AssignOp extends Assign {
        constructor(lhs, op, rhs, sideEffects) {
            super(lhs, rhs, sideEffects);
            this.op = op;
        }
        render({ _n }) {
            return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
        }
    }
    class Label extends Node {
        constructor(label) {
            super();
            this.label = label;
            this.names = {};
        }
        render({ _n }) {
            return `${this.label}:` + _n;
        }
    }
    class Break extends Node {
        constructor(label) {
            super();
            this.label = label;
            this.names = {};
        }
        render({ _n }) {
            const label = this.label ? ` ${this.label}` : "";
            return `break${label};` + _n;
        }
    }
    class Throw extends Node {
        constructor(error) {
            super();
            this.error = error;
        }
        render({ _n }) {
            return `throw ${this.error};` + _n;
        }
        get names() {
            return this.error.names;
        }
    }
    class AnyCode extends Node {
        constructor(code) {
            super();
            this.code = code;
        }
        render({ _n }) {
            return `${this.code};` + _n;
        }
        optimizeNodes() {
            return `${this.code}` ? this : undefined;
        }
        optimizeNames(names, constants) {
            this.code = optimizeExpr(this.code, names, constants);
            return this;
        }
        get names() {
            return this.code instanceof _CodeOrName ? this.code.names : {};
        }
    }
    class ParentNode extends Node {
        constructor(nodes = []) {
            super();
            this.nodes = nodes;
        }
        render(opts) {
            return this.nodes.reduce((code, n) => code + n.render(opts), "");
        }
        optimizeNodes() {
            const { nodes } = this;
            let i = nodes.length;
            while (i--) {
                const n = nodes[i].optimizeNodes();
                if (Array.isArray(n))
                    nodes.splice(i, 1, ...n);
                else if (n)
                    nodes[i] = n;
                else
                    nodes.splice(i, 1);
            }
            return nodes.length > 0 ? this : undefined;
        }
        optimizeNames(names, constants) {
            const { nodes } = this;
            let i = nodes.length;
            while (i--) {
                // iterating backwards improves 1-pass optimization
                const n = nodes[i];
                if (n.optimizeNames(names, constants))
                    continue;
                subtractNames(names, n.names);
                nodes.splice(i, 1);
            }
            return nodes.length > 0 ? this : undefined;
        }
        get names() {
            return this.nodes.reduce((names, n) => addNames(names, n.names), {});
        }
    }
    class BlockNode extends ParentNode {
        render(opts) {
            return "{" + opts._n + super.render(opts) + "}" + opts._n;
        }
    }
    class Root extends ParentNode {
    }
    class Else extends BlockNode {
    }
    Else.kind = "else";
    class If extends BlockNode {
        constructor(condition, nodes) {
            super(nodes);
            this.condition = condition;
        }
        render(opts) {
            let code = `if(${this.condition})` + super.render(opts);
            if (this.else)
                code += "else " + this.else.render(opts);
            return code;
        }
        optimizeNodes() {
            super.optimizeNodes();
            const cond = this.condition;
            if (cond === true)
                return this.nodes; // else is ignored here
            let e = this.else;
            if (e) {
                const ns = e.optimizeNodes();
                e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
            }
            if (e) {
                if (cond === false)
                    return e instanceof If ? e : e.nodes;
                if (this.nodes.length)
                    return this;
                return new If(not(cond), e instanceof If ? [e] : e.nodes);
            }
            if (cond === false || !this.nodes.length)
                return undefined;
            return this;
        }
        optimizeNames(names, constants) {
            var _a;
            this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
            if (!(super.optimizeNames(names, constants) || this.else))
                return;
            this.condition = optimizeExpr(this.condition, names, constants);
            return this;
        }
        get names() {
            const names = super.names;
            addExprNames(names, this.condition);
            if (this.else)
                addNames(names, this.else.names);
            return names;
        }
    }
    If.kind = "if";
    class For extends BlockNode {
    }
    For.kind = "for";
    class ForLoop extends For {
        constructor(iteration) {
            super();
            this.iteration = iteration;
        }
        render(opts) {
            return `for(${this.iteration})` + super.render(opts);
        }
        optimizeNames(names, constants) {
            if (!super.optimizeNames(names, constants))
                return;
            this.iteration = optimizeExpr(this.iteration, names, constants);
            return this;
        }
        get names() {
            return addNames(super.names, this.iteration.names);
        }
    }
    class ForRange extends For {
        constructor(varKind, name, from, to) {
            super();
            this.varKind = varKind;
            this.name = name;
            this.from = from;
            this.to = to;
        }
        render(opts) {
            const varKind = opts.es5 ? varKinds.var : this.varKind;
            const { name, from, to } = this;
            return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
        }
        get names() {
            const names = addExprNames(super.names, this.from);
            return addExprNames(names, this.to);
        }
    }
    class ForIter extends For {
        constructor(loop, varKind, name, iterable) {
            super();
            this.loop = loop;
            this.varKind = varKind;
            this.name = name;
            this.iterable = iterable;
        }
        render(opts) {
            return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
        }
        optimizeNames(names, constants) {
            if (!super.optimizeNames(names, constants))
                return;
            this.iterable = optimizeExpr(this.iterable, names, constants);
            return this;
        }
        get names() {
            return addNames(super.names, this.iterable.names);
        }
    }
    class Func extends BlockNode {
        constructor(name, args, async) {
            super();
            this.name = name;
            this.args = args;
            this.async = async;
        }
        render(opts) {
            const _async = this.async ? "async " : "";
            return `${_async}function ${this.name}(${this.args})` + super.render(opts);
        }
    }
    Func.kind = "func";
    class Return extends ParentNode {
        render(opts) {
            return "return " + super.render(opts);
        }
    }
    Return.kind = "return";
    class Try extends BlockNode {
        render(opts) {
            let code = "try" + super.render(opts);
            if (this.catch)
                code += this.catch.render(opts);
            if (this.finally)
                code += this.finally.render(opts);
            return code;
        }
        optimizeNodes() {
            var _a, _b;
            super.optimizeNodes();
            (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
            (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
            return this;
        }
        optimizeNames(names, constants) {
            var _a, _b;
            super.optimizeNames(names, constants);
            (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
            (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
            return this;
        }
        get names() {
            const names = super.names;
            if (this.catch)
                addNames(names, this.catch.names);
            if (this.finally)
                addNames(names, this.finally.names);
            return names;
        }
    }
    class Catch extends BlockNode {
        constructor(error) {
            super();
            this.error = error;
        }
        render(opts) {
            return `catch(${this.error})` + super.render(opts);
        }
    }
    Catch.kind = "catch";
    class Finally extends BlockNode {
        render(opts) {
            return "finally" + super.render(opts);
        }
    }
    Finally.kind = "finally";
    class CodeGen {
        constructor(extScope, opts = {}) {
            this._values = {};
            this._blockStarts = [];
            this._constants = {};
            this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
            this._extScope = extScope;
            this._scope = new Scope({ parent: extScope });
            this._nodes = [new Root()];
        }
        toString() {
            return this._root.render(this.opts);
        }
        // returns unique name in the internal scope
        name(prefix) {
            return this._scope.name(prefix);
        }
        // reserves unique name in the external scope
        scopeName(prefix) {
            return this._extScope.name(prefix);
        }
        // reserves unique name in the external scope and assigns value to it
        scopeValue(prefixOrName, value) {
            const name = this._extScope.value(prefixOrName, value);
            const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
            vs.add(name);
            return name;
        }
        getScopeValue(prefix, keyOrRef) {
            return this._extScope.getValue(prefix, keyOrRef);
        }
        // return code that assigns values in the external scope to the names that are used internally
        // (same names that were returned by gen.scopeName or gen.scopeValue)
        scopeRefs(scopeName) {
            return this._extScope.scopeRefs(scopeName, this._values);
        }
        scopeCode() {
            return this._extScope.scopeCode(this._values);
        }
        _def(varKind, nameOrPrefix, rhs, constant) {
            const name = this._scope.toName(nameOrPrefix);
            if (rhs !== undefined && constant)
                this._constants[name.str] = rhs;
            this._leafNode(new Def(varKind, name, rhs));
            return name;
        }
        // `const` declaration (`var` in es5 mode)
        const(nameOrPrefix, rhs, _constant) {
            return this._def(varKinds.const, nameOrPrefix, rhs, _constant);
        }
        // `let` declaration with optional assignment (`var` in es5 mode)
        let(nameOrPrefix, rhs, _constant) {
            return this._def(varKinds.let, nameOrPrefix, rhs, _constant);
        }
        // `var` declaration with optional assignment
        var(nameOrPrefix, rhs, _constant) {
            return this._def(varKinds.var, nameOrPrefix, rhs, _constant);
        }
        // assignment code
        assign(lhs, rhs, sideEffects) {
            return this._leafNode(new Assign(lhs, rhs, sideEffects));
        }
        // `+=` code
        add(lhs, rhs) {
            return this._leafNode(new AssignOp(lhs, operators.ADD, rhs));
        }
        // appends passed SafeExpr to code or executes Block
        code(c) {
            if (typeof c == "function")
                c();
            else if (c !== nil)
                this._leafNode(new AnyCode(c));
            return this;
        }
        // returns code for object literal for the passed argument list of key-value pairs
        object(...keyValues) {
            const code = ["{"];
            for (const [key, value] of keyValues) {
                if (code.length > 1)
                    code.push(",");
                code.push(key);
                if (key !== value || this.opts.es5) {
                    code.push(":");
                    addCodeArg(code, value);
                }
            }
            code.push("}");
            return new _Code(code);
        }
        // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
        if(condition, thenBody, elseBody) {
            this._blockNode(new If(condition));
            if (thenBody && elseBody) {
                this.code(thenBody).else().code(elseBody).endIf();
            }
            else if (thenBody) {
                this.code(thenBody).endIf();
            }
            else if (elseBody) {
                throw new Error('CodeGen: "else" body without "then" body');
            }
            return this;
        }
        // `else if` clause - invalid without `if` or after `else` clauses
        elseIf(condition) {
            return this._elseNode(new If(condition));
        }
        // `else` clause - only valid after `if` or `else if` clauses
        else() {
            return this._elseNode(new Else());
        }
        // end `if` statement (needed if gen.if was used only with condition)
        endIf() {
            return this._endBlockNode(If, Else);
        }
        _for(node, forBody) {
            this._blockNode(node);
            if (forBody)
                this.code(forBody).endFor();
            return this;
        }
        // a generic `for` clause (or statement if `forBody` is passed)
        for(iteration, forBody) {
            return this._for(new ForLoop(iteration), forBody);
        }
        // `for` statement for a range of values
        forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? varKinds.var : varKinds.let) {
            const name = this._scope.toName(nameOrPrefix);
            return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
        }
        // `for-of` statement (in es5 mode replace with a normal for loop)
        forOf(nameOrPrefix, iterable, forBody, varKind = varKinds.const) {
            const name = this._scope.toName(nameOrPrefix);
            if (this.opts.es5) {
                const arr = iterable instanceof Name ? iterable : this.var("_arr", iterable);
                return this.forRange("_i", 0, _ `${arr}.length`, (i) => {
                    this.var(name, _ `${arr}[${i}]`);
                    forBody(name);
                });
            }
            return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
        }
        // `for-in` statement.
        // With option `ownProperties` replaced with a `for-of` loop for object keys
        forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? varKinds.var : varKinds.const) {
            if (this.opts.ownProperties) {
                return this.forOf(nameOrPrefix, _ `Object.keys(${obj})`, forBody);
            }
            const name = this._scope.toName(nameOrPrefix);
            return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
        }
        // end `for` loop
        endFor() {
            return this._endBlockNode(For);
        }
        // `label` statement
        label(label) {
            return this._leafNode(new Label(label));
        }
        // `break` statement
        break(label) {
            return this._leafNode(new Break(label));
        }
        // `return` statement
        return(value) {
            const node = new Return();
            this._blockNode(node);
            this.code(value);
            if (node.nodes.length !== 1)
                throw new Error('CodeGen: "return" should have one node');
            return this._endBlockNode(Return);
        }
        // `try` statement
        try(tryBody, catchCode, finallyCode) {
            if (!catchCode && !finallyCode)
                throw new Error('CodeGen: "try" without "catch" and "finally"');
            const node = new Try();
            this._blockNode(node);
            this.code(tryBody);
            if (catchCode) {
                const error = this.name("e");
                this._currNode = node.catch = new Catch(error);
                catchCode(error);
            }
            if (finallyCode) {
                this._currNode = node.finally = new Finally();
                this.code(finallyCode);
            }
            return this._endBlockNode(Catch, Finally);
        }
        // `throw` statement
        throw(error) {
            return this._leafNode(new Throw(error));
        }
        // start self-balancing block
        block(body, nodeCount) {
            this._blockStarts.push(this._nodes.length);
            if (body)
                this.code(body).endBlock(nodeCount);
            return this;
        }
        // end the current self-balancing block
        endBlock(nodeCount) {
            const len = this._blockStarts.pop();
            if (len === undefined)
                throw new Error("CodeGen: not in self-balancing block");
            const toClose = this._nodes.length - len;
            if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
                throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
            }
            this._nodes.length = len;
            return this;
        }
        // `function` heading (or definition if funcBody is passed)
        func(name, args = nil, async, funcBody) {
            this._blockNode(new Func(name, args, async));
            if (funcBody)
                this.code(funcBody).endFunc();
            return this;
        }
        // end function definition
        endFunc() {
            return this._endBlockNode(Func);
        }
        optimize(n = 1) {
            while (n-- > 0) {
                this._root.optimizeNodes();
                this._root.optimizeNames(this._root.names, this._constants);
            }
        }
        _leafNode(node) {
            this._currNode.nodes.push(node);
            return this;
        }
        _blockNode(node) {
            this._currNode.nodes.push(node);
            this._nodes.push(node);
        }
        _endBlockNode(N1, N2) {
            const n = this._currNode;
            if (n instanceof N1 || (N2 && n instanceof N2)) {
                this._nodes.pop();
                return this;
            }
            throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
        }
        _elseNode(node) {
            const n = this._currNode;
            if (!(n instanceof If)) {
                throw new Error('CodeGen: "else" without "if"');
            }
            this._currNode = n.else = node;
            return this;
        }
        get _root() {
            return this._nodes[0];
        }
        get _currNode() {
            const ns = this._nodes;
            return ns[ns.length - 1];
        }
        set _currNode(node) {
            const ns = this._nodes;
            ns[ns.length - 1] = node;
        }
    }
    function addNames(names, from) {
        for (const n in from)
            names[n] = (names[n] || 0) + (from[n] || 0);
        return names;
    }
    function addExprNames(names, from) {
        return from instanceof _CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
        if (expr instanceof Name)
            return replaceName(expr);
        if (!canOptimize(expr))
            return expr;
        return new _Code(expr._items.reduce((items, c) => {
            if (c instanceof Name)
                c = replaceName(c);
            if (c instanceof _Code)
                items.push(...c._items);
            else
                items.push(c);
            return items;
        }, []));
        function replaceName(n) {
            const c = constants[n.str];
            if (c === undefined || names[n.str] !== 1)
                return n;
            delete names[n.str];
            return c;
        }
        function canOptimize(e) {
            return (e instanceof _Code &&
                e._items.some((c) => c instanceof Name && names[c.str] === 1 && constants[c.str] !== undefined));
        }
    }
    function subtractNames(names, from) {
        for (const n in from)
            names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
        return typeof x == "boolean" || typeof x == "number" || x === null ? !x : _ `!${par(x)}`;
    }
    const andCode = mappend(operators.AND);
    // boolean AND (&&) expression with the passed arguments
    function and(...args) {
        return args.reduce(andCode);
    }
    const orCode = mappend(operators.OR);
    // boolean OR (||) expression with the passed arguments
    function or(...args) {
        return args.reduce(orCode);
    }
    function mappend(op) {
        return (x, y) => (x === nil ? y : y === nil ? x : _ `${par(x)} ${op} ${par(y)}`);
    }
    function par(x) {
        return x instanceof Name ? x : _ `(${x})`;
    }

    // TODO refactor to use Set
    function toHash(arr) {
        const hash = {};
        for (const item of arr)
            hash[item] = true;
        return hash;
    }
    function alwaysValidSchema(it, schema) {
        if (typeof schema == "boolean")
            return schema;
        if (Object.keys(schema).length === 0)
            return true;
        checkUnknownRules(it, schema);
        return !schemaHasRules(schema, it.self.RULES.all);
    }
    function checkUnknownRules(it, schema = it.schema) {
        const { opts, self } = it;
        if (!opts.strictSchema)
            return;
        if (typeof schema === "boolean")
            return;
        const rules = self.RULES.keywords;
        for (const key in schema) {
            if (!rules[key])
                checkStrictMode(it, `unknown keyword: "${key}"`);
        }
    }
    function schemaHasRules(schema, rules) {
        if (typeof schema == "boolean")
            return !schema;
        for (const key in schema)
            if (rules[key])
                return true;
        return false;
    }
    function schemaHasRulesButRef(schema, RULES) {
        if (typeof schema == "boolean")
            return !schema;
        for (const key in schema)
            if (key !== "$ref" && RULES.all[key])
                return true;
        return false;
    }
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
        if (!$data) {
            if (typeof schema == "number" || typeof schema == "boolean")
                return schema;
            if (typeof schema == "string")
                return _ `${schema}`;
        }
        return _ `${topSchemaRef}${schemaPath}${getProperty(keyword)}`;
    }
    function unescapeFragment(str) {
        return unescapeJsonPointer(decodeURIComponent(str));
    }
    function escapeFragment(str) {
        return encodeURIComponent(escapeJsonPointer(str));
    }
    function escapeJsonPointer(str) {
        if (typeof str == "number")
            return `${str}`;
        return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    function unescapeJsonPointer(str) {
        return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    function eachItem(xs, f) {
        if (Array.isArray(xs)) {
            for (const x of xs)
                f(x);
        }
        else {
            f(xs);
        }
    }
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
        return (gen, from, to, toName) => {
            const res = to === undefined
                ? from
                : to instanceof Name
                    ? (from instanceof Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                    : from instanceof Name
                        ? (mergeToName(gen, to, from), from)
                        : mergeValues(from, to);
            return toName === Name && !(res instanceof Name) ? resultToName(gen, res) : res;
        };
    }
    const mergeEvaluated = {
        props: makeMergeEvaluated({
            mergeNames: (gen, from, to) => gen.if(_ `${to} !== true && ${from} !== undefined`, () => {
                gen.if(_ `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, _ `${to} || {}`).code(_ `Object.assign(${to}, ${from})`));
            }),
            mergeToName: (gen, from, to) => gen.if(_ `${to} !== true`, () => {
                if (from === true) {
                    gen.assign(to, true);
                }
                else {
                    gen.assign(to, _ `${to} || {}`);
                    setEvaluated(gen, to, from);
                }
            }),
            mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
            resultToName: evaluatedPropsToName,
        }),
        items: makeMergeEvaluated({
            mergeNames: (gen, from, to) => gen.if(_ `${to} !== true && ${from} !== undefined`, () => gen.assign(to, _ `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
            mergeToName: (gen, from, to) => gen.if(_ `${to} !== true`, () => gen.assign(to, from === true ? true : _ `${to} > ${from} ? ${to} : ${from}`)),
            mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
            resultToName: (gen, items) => gen.var("items", items),
        }),
    };
    function evaluatedPropsToName(gen, ps) {
        if (ps === true)
            return gen.var("props", true);
        const props = gen.var("props", _ `{}`);
        if (ps !== undefined)
            setEvaluated(gen, props, ps);
        return props;
    }
    function setEvaluated(gen, props, ps) {
        Object.keys(ps).forEach((p) => gen.assign(_ `${props}${getProperty(p)}`, true));
    }
    const snippets = {};
    function useFunc(gen, f) {
        return gen.scopeValue("func", {
            ref: f,
            code: snippets[f.code] || (snippets[f.code] = new _Code(f.code)),
        });
    }
    var Type;
    (function (Type) {
        Type[Type["Num"] = 0] = "Num";
        Type[Type["Str"] = 1] = "Str";
    })(Type || (Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
        // let path
        if (dataProp instanceof Name) {
            const isNumber = dataPropType === Type.Num;
            return jsPropertySyntax
                ? isNumber
                    ? _ `"[" + ${dataProp} + "]"`
                    : _ `"['" + ${dataProp} + "']"`
                : isNumber
                    ? _ `"/" + ${dataProp}`
                    : _ `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
        }
        return jsPropertySyntax ? getProperty(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
        if (!mode)
            return;
        msg = `strict mode: ${msg}`;
        if (mode === true)
            throw new Error(msg);
        it.self.logger.warn(msg);
    }

    const names = {
        // validation function arguments
        data: new Name("data"),
        // args passed from referencing schema
        valCxt: new Name("valCxt"),
        instancePath: new Name("instancePath"),
        parentData: new Name("parentData"),
        parentDataProperty: new Name("parentDataProperty"),
        rootData: new Name("rootData"),
        dynamicAnchors: new Name("dynamicAnchors"),
        // function scoped variables
        vErrors: new Name("vErrors"),
        errors: new Name("errors"),
        this: new Name("this"),
        // "globals"
        self: new Name("self"),
        scope: new Name("scope"),
        // JTD serialize/parse name for JSON string and position
        json: new Name("json"),
        jsonPos: new Name("jsonPos"),
        jsonLen: new Name("jsonLen"),
        jsonPart: new Name("jsonPart"),
    };

    const keywordError = {
        message: ({ keyword }) => str `should pass "${keyword}" keyword validation`,
    };
    const keyword$DataError = {
        message: ({ keyword, schemaType }) => schemaType
            ? str `"${keyword}" keyword must be ${schemaType} ($data)`
            : str `"${keyword}" keyword is invalid ($data)`,
    };
    function reportError(cxt, error = keywordError, errorPaths, overrideAllErrors) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
            addError(gen, errObj);
        }
        else {
            returnErrors(it, _ `[${errObj}]`);
        }
    }
    function reportExtraError(cxt, error = keywordError, errorPaths) {
        const { it } = cxt;
        const { gen, compositeRule, allErrors } = it;
        const errObj = errorObjectCode(cxt, error, errorPaths);
        addError(gen, errObj);
        if (!(compositeRule || allErrors)) {
            returnErrors(it, names.vErrors);
        }
    }
    function resetErrorsCount(gen, errsCount) {
        gen.assign(names.errors, errsCount);
        gen.if(_ `${names.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign(_ `${names.vErrors}.length`, errsCount), () => gen.assign(names.vErrors, null)));
    }
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
        /* istanbul ignore if */
        if (errsCount === undefined)
            throw new Error("ajv implementation error");
        const err = gen.name("err");
        gen.forRange("i", errsCount, names.errors, (i) => {
            gen.const(err, _ `${names.vErrors}[${i}]`);
            gen.if(_ `${err}.instancePath === undefined`, () => gen.assign(_ `${err}.instancePath`, strConcat(names.instancePath, it.errorPath)));
            gen.assign(_ `${err}.schemaPath`, str `${it.errSchemaPath}/${keyword}`);
            if (it.opts.verbose) {
                gen.assign(_ `${err}.schema`, schemaValue);
                gen.assign(_ `${err}.data`, data);
            }
        });
    }
    function addError(gen, errObj) {
        const err = gen.const("err", errObj);
        gen.if(_ `${names.vErrors} === null`, () => gen.assign(names.vErrors, _ `[${err}]`), _ `${names.vErrors}.push(${err})`);
        gen.code(_ `${names.errors}++`);
    }
    function returnErrors(it, errs) {
        const { gen, validateName, schemaEnv } = it;
        if (schemaEnv.$async) {
            gen.throw(_ `new ${it.ValidationError}(${errs})`);
        }
        else {
            gen.assign(_ `${validateName}.errors`, errs);
            gen.return(false);
        }
    }
    const E = {
        keyword: new Name("keyword"),
        schemaPath: new Name("schemaPath"),
        params: new Name("params"),
        propertyName: new Name("propertyName"),
        message: new Name("message"),
        schema: new Name("schema"),
        parentSchema: new Name("parentSchema"),
    };
    function errorObjectCode(cxt, error, errorPaths) {
        const { createErrors } = cxt.it;
        if (createErrors === false)
            return _ `{}`;
        return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
        const { gen, it } = cxt;
        const keyValues = [
            errorInstancePath(it, errorPaths),
            errorSchemaPath(cxt, errorPaths),
        ];
        extraErrorProps(cxt, error, keyValues);
        return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
        const instPath = instancePath
            ? str `${errorPath}${getErrorPath(instancePath, Type.Str)}`
            : errorPath;
        return [names.instancePath, strConcat(names.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
        let schPath = parentSchema ? errSchemaPath : str `${errSchemaPath}/${keyword}`;
        if (schemaPath) {
            schPath = str `${schPath}${getErrorPath(schemaPath, Type.Str)}`;
        }
        return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
        const { keyword, data, schemaValue, it } = cxt;
        const { opts, propertyName, topSchemaRef, schemaPath } = it;
        keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || _ `{}`]);
        if (opts.messages) {
            keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
        }
        if (opts.verbose) {
            keyValues.push([E.schema, schemaValue], [E.parentSchema, _ `${topSchemaRef}${schemaPath}`], [names.data, data]);
        }
        if (propertyName)
            keyValues.push([E.propertyName, propertyName]);
    }

    const boolError = {
        message: "boolean schema is false",
    };
    function topBoolOrEmptySchema(it) {
        const { gen, schema, validateName } = it;
        if (schema === false) {
            falseSchemaError(it, false);
        }
        else if (typeof schema == "object" && schema.$async === true) {
            gen.return(names.data);
        }
        else {
            gen.assign(_ `${validateName}.errors`, null);
            gen.return(true);
        }
    }
    function boolOrEmptySchema(it, valid) {
        const { gen, schema } = it;
        if (schema === false) {
            gen.var(valid, false); // TODO var
            falseSchemaError(it);
        }
        else {
            gen.var(valid, true); // TODO var
        }
    }
    function falseSchemaError(it, overrideAllErrors) {
        const { gen, data } = it;
        // TODO maybe some other interface should be used for non-keyword validation errors...
        const cxt = {
            gen,
            keyword: "false schema",
            data,
            schema: false,
            schemaCode: false,
            schemaValue: false,
            params: {},
            it,
        };
        reportError(cxt, boolError, undefined, overrideAllErrors);
    }

    const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    const jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
        return typeof x == "string" && jsonTypes.has(x);
    }
    function getRules() {
        const groups = {
            number: { type: "number", rules: [] },
            string: { type: "string", rules: [] },
            array: { type: "array", rules: [] },
            object: { type: "object", rules: [] },
        };
        return {
            types: { ...groups, integer: true, boolean: true, null: true },
            rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
            post: { rules: [] },
            all: {},
            keywords: {},
        };
    }

    function schemaHasRulesForType({ schema, self }, type) {
        const group = self.RULES.types[type];
        return group && group !== true && shouldUseGroup(schema, group);
    }
    function shouldUseGroup(schema, group) {
        return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    function shouldUseRule(schema, rule) {
        var _a;
        return (schema[rule.keyword] !== undefined ||
            ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
    }

    var DataType;
    (function (DataType) {
        DataType[DataType["Correct"] = 0] = "Correct";
        DataType[DataType["Wrong"] = 1] = "Wrong";
    })(DataType || (DataType = {}));
    function getSchemaTypes(schema) {
        const types = getJSONTypes(schema.type);
        const hasNull = types.includes("null");
        if (hasNull) {
            if (schema.nullable === false)
                throw new Error("type: null contradicts nullable: false");
        }
        else {
            if (!types.length && schema.nullable !== undefined) {
                throw new Error('"nullable" cannot be used without "type"');
            }
            if (schema.nullable === true)
                types.push("null");
        }
        return types;
    }
    function getJSONTypes(ts) {
        const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
        if (types.every(isJSONType))
            return types;
        throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    function coerceAndCheckDataType(it, types) {
        const { gen, data, opts } = it;
        const coerceTo = coerceToTypes(types, opts.coerceTypes);
        const checkTypes = types.length > 0 &&
            !(coerceTo.length === 0 && types.length === 1 && schemaHasRulesForType(it, types[0]));
        if (checkTypes) {
            const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
            gen.if(wrongType, () => {
                if (coerceTo.length)
                    coerceData(it, types, coerceTo);
                else
                    reportTypeError(it);
            });
        }
        return checkTypes;
    }
    const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
        return coerceTypes
            ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
            : [];
    }
    function coerceData(it, types, coerceTo) {
        const { gen, data, opts } = it;
        const dataType = gen.let("dataType", _ `typeof ${data}`);
        const coerced = gen.let("coerced", _ `undefined`);
        if (opts.coerceTypes === "array") {
            gen.if(_ `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
                .assign(data, _ `${data}[0]`)
                .assign(dataType, _ `typeof ${data}`)
                .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
        }
        gen.if(_ `${coerced} !== undefined`);
        for (const t of coerceTo) {
            if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
                coerceSpecificType(t);
            }
        }
        gen.else();
        reportTypeError(it);
        gen.endIf();
        gen.if(_ `${coerced} !== undefined`, () => {
            gen.assign(data, coerced);
            assignParentData(it, coerced);
        });
        function coerceSpecificType(t) {
            switch (t) {
                case "string":
                    gen
                        .elseIf(_ `${dataType} == "number" || ${dataType} == "boolean"`)
                        .assign(coerced, _ `"" + ${data}`)
                        .elseIf(_ `${data} === null`)
                        .assign(coerced, _ `""`);
                    return;
                case "number":
                    gen
                        .elseIf(_ `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                        .assign(coerced, _ `+${data}`);
                    return;
                case "integer":
                    gen
                        .elseIf(_ `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                        .assign(coerced, _ `+${data}`);
                    return;
                case "boolean":
                    gen
                        .elseIf(_ `${data} === "false" || ${data} === 0 || ${data} === null`)
                        .assign(coerced, false)
                        .elseIf(_ `${data} === "true" || ${data} === 1`)
                        .assign(coerced, true);
                    return;
                case "null":
                    gen.elseIf(_ `${data} === "" || ${data} === 0 || ${data} === false`);
                    gen.assign(coerced, null);
                    return;
                case "array":
                    gen
                        .elseIf(_ `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                        .assign(coerced, _ `[${data}]`);
            }
        }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
        // TODO use gen.property
        gen.if(_ `${parentData} !== undefined`, () => gen.assign(_ `${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
        const EQ = correct === DataType.Correct ? operators.EQ : operators.NEQ;
        let cond;
        switch (dataType) {
            case "null":
                return _ `${data} ${EQ} null`;
            case "array":
                cond = _ `Array.isArray(${data})`;
                break;
            case "object":
                cond = _ `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
                break;
            case "integer":
                cond = numCond(_ `!(${data} % 1) && !isNaN(${data})`);
                break;
            case "number":
                cond = numCond();
                break;
            default:
                return _ `typeof ${data} ${EQ} ${dataType}`;
        }
        return correct === DataType.Correct ? cond : not(cond);
        function numCond(_cond = nil) {
            return and(_ `typeof ${data} == "number"`, _cond, strictNums ? _ `isFinite(${data})` : nil);
        }
    }
    function checkDataTypes(dataTypes, data, strictNums, correct) {
        if (dataTypes.length === 1) {
            return checkDataType(dataTypes[0], data, strictNums, correct);
        }
        let cond;
        const types = toHash(dataTypes);
        if (types.array && types.object) {
            const notObj = _ `typeof ${data} != "object"`;
            cond = types.null ? notObj : _ `!${data} || ${notObj}`;
            delete types.null;
            delete types.array;
            delete types.object;
        }
        else {
            cond = nil;
        }
        if (types.number)
            delete types.integer;
        for (const t in types)
            cond = and(cond, checkDataType(t, data, strictNums, correct));
        return cond;
    }
    const typeError = {
        message: ({ schema }) => `must be ${schema}`,
        params: ({ schema, schemaValue }) => typeof schema == "string" ? _ `{type: ${schema}}` : _ `{type: ${schemaValue}}`,
    };
    function reportTypeError(it) {
        const cxt = getTypeErrorContext(it);
        reportError(cxt, typeError);
    }
    function getTypeErrorContext(it) {
        const { gen, data, schema } = it;
        const schemaCode = schemaRefOrVal(it, schema, "type");
        return {
            gen,
            keyword: "type",
            data,
            schema: schema.type,
            schemaCode,
            schemaValue: schemaCode,
            parentSchema: schema,
            params: {},
            it,
        };
    }

    function assignDefaults(it, ty) {
        const { properties, items } = it.schema;
        if (ty === "object" && properties) {
            for (const key in properties) {
                assignDefault(it, key, properties[key].default);
            }
        }
        else if (ty === "array" && Array.isArray(items)) {
            items.forEach((sch, i) => assignDefault(it, i, sch.default));
        }
    }
    function assignDefault(it, prop, defaultValue) {
        const { gen, compositeRule, data, opts } = it;
        if (defaultValue === undefined)
            return;
        const childData = _ `${data}${getProperty(prop)}`;
        if (compositeRule) {
            checkStrictMode(it, `default is ignored for: ${childData}`);
            return;
        }
        let condition = _ `${childData} === undefined`;
        if (opts.useDefaults === "empty") {
            condition = _ `${condition} || ${childData} === null || ${childData} === ""`;
        }
        // `${childData} === undefined` +
        // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
        gen.if(condition, _ `${childData} = ${stringify(defaultValue)}`);
    }

    function checkReportMissingProp(cxt, prop) {
        const { gen, data, it } = cxt;
        gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
            cxt.setParams({ missingProperty: _ `${prop}` }, true);
            cxt.error();
        });
    }
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
        return or(...properties.map((prop) => and(noPropertyInData(gen, data, prop, opts.ownProperties), _ `${missing} = ${prop}`)));
    }
    function reportMissingProp(cxt, missing) {
        cxt.setParams({ missingProperty: missing }, true);
        cxt.error();
    }
    function hasPropFunc(gen) {
        return gen.scopeValue("func", {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            ref: Object.prototype.hasOwnProperty,
            code: _ `Object.prototype.hasOwnProperty`,
        });
    }
    function isOwnProperty(gen, data, property) {
        return _ `${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    function propertyInData(gen, data, property, ownProperties) {
        const cond = _ `${data}${getProperty(property)} !== undefined`;
        return ownProperties ? _ `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    function noPropertyInData(gen, data, property, ownProperties) {
        const cond = _ `${data}${getProperty(property)} === undefined`;
        return ownProperties ? or(cond, not(isOwnProperty(gen, data, property))) : cond;
    }
    function allSchemaProperties(schemaMap) {
        return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    function schemaProperties(it, schemaMap) {
        return allSchemaProperties(schemaMap).filter((p) => !alwaysValidSchema(it, schemaMap[p]));
    }
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
        const dataAndSchema = passSchema ? _ `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
        const valCxt = [
            [names.instancePath, strConcat(names.instancePath, errorPath)],
            [names.parentData, it.parentData],
            [names.parentDataProperty, it.parentDataProperty],
            [names.rootData, names.rootData],
        ];
        if (it.opts.dynamicRef)
            valCxt.push([names.dynamicAnchors, names.dynamicAnchors]);
        const args = _ `${dataAndSchema}, ${gen.object(...valCxt)}`;
        return context !== nil ? _ `${func}.call(${context}, ${args})` : _ `${func}(${args})`;
    }
    function usePattern({ gen, it: { opts } }, pattern) {
        const u = opts.unicodeRegExp ? "u" : "";
        return gen.scopeValue("pattern", {
            key: pattern,
            ref: new RegExp(pattern, u),
            code: _ `new RegExp(${pattern}, ${u})`,
        });
    }
    function validateArray(cxt) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        if (it.allErrors) {
            const validArr = gen.let("valid", true);
            validateItems(() => gen.assign(validArr, false));
            return validArr;
        }
        gen.var(valid, true);
        validateItems(() => gen.break());
        return valid;
        function validateItems(notValid) {
            const len = gen.const("len", _ `${data}.length`);
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword,
                    dataProp: i,
                    dataPropType: Type.Num,
                }, valid);
                gen.if(not(valid), notValid);
            });
        }
    }
    function validateUnion(cxt) {
        const { gen, schema, keyword, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const alwaysValid = schema.some((sch) => alwaysValidSchema(it, sch));
        if (alwaysValid && !it.opts.unevaluated)
            return;
        const valid = gen.let("valid", false);
        const schValid = gen.name("_valid");
        gen.block(() => schema.forEach((_sch, i) => {
            const schCxt = cxt.subschema({
                keyword,
                schemaProp: i,
                compositeRule: true,
            }, schValid);
            gen.assign(valid, _ `${valid} || ${schValid}`);
            const merged = cxt.mergeValidEvaluated(schCxt, schValid);
            // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
            // or if all properties and items were evaluated (it.props === true && it.items === true)
            if (!merged)
                gen.if(not(valid));
        }));
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }

    function macroKeywordCode(cxt, def) {
        const { gen, keyword, schema, parentSchema, it } = cxt;
        const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
        const schemaRef = useKeyword(gen, keyword, macroSchema);
        if (it.opts.validateSchema !== false)
            it.self.validateSchema(macroSchema, true);
        const valid = gen.name("valid");
        cxt.subschema({
            schema: macroSchema,
            schemaPath: nil,
            errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            topSchemaRef: schemaRef,
            compositeRule: true,
        }, valid);
        cxt.pass(valid, () => cxt.error(true));
    }
    function funcKeywordCode(cxt, def) {
        var _a;
        const { gen, keyword, schema, parentSchema, $data, it } = cxt;
        checkAsyncKeyword(it, def);
        const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
        const validateRef = useKeyword(gen, keyword, validate);
        const valid = gen.let("valid");
        cxt.block$data(valid, validateKeyword);
        cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
        function validateKeyword() {
            if (def.errors === false) {
                assignValid();
                if (def.modifying)
                    modifyData(cxt);
                reportErrs(() => cxt.error());
            }
            else {
                const ruleErrs = def.async ? validateAsync() : validateSync();
                if (def.modifying)
                    modifyData(cxt);
                reportErrs(() => addErrs(cxt, ruleErrs));
            }
        }
        function validateAsync() {
            const ruleErrs = gen.let("ruleErrs", null);
            gen.try(() => assignValid(_ `await `), (e) => gen.assign(valid, false).if(_ `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, _ `${e}.errors`), () => gen.throw(e)));
            return ruleErrs;
        }
        function validateSync() {
            const validateErrs = _ `${validateRef}.errors`;
            gen.assign(validateErrs, null);
            assignValid(nil);
            return validateErrs;
        }
        function assignValid(_await = def.async ? _ `await ` : nil) {
            const passCxt = it.opts.passContext ? names.this : names.self;
            const passSchema = !(("compile" in def && !$data) || def.schema === false);
            gen.assign(valid, _ `${_await}${callValidateCode(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
        }
        function reportErrs(errors) {
            var _a;
            gen.if(not((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
        }
    }
    function modifyData(cxt) {
        const { gen, data, it } = cxt;
        gen.if(it.parentData, () => gen.assign(data, _ `${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
        const { gen } = cxt;
        gen.if(_ `Array.isArray(${errs})`, () => {
            gen
                .assign(names.vErrors, _ `${names.vErrors} === null ? ${errs} : ${names.vErrors}.concat(${errs})`)
                .assign(names.errors, _ `${names.vErrors}.length`);
            extendErrors(cxt);
        }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
        if (def.async && !schemaEnv.$async)
            throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
        if (result === undefined)
            throw new Error(`keyword "${keyword}" failed to compile`);
        return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: stringify(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
        // TODO add tests
        return (!schemaType.length ||
            schemaType.some((st) => st === "array"
                ? Array.isArray(schema)
                : st === "object"
                    ? schema && typeof schema == "object" && !Array.isArray(schema)
                    : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
    }
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
        /* istanbul ignore if */
        if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
            throw new Error("ajv implementation error");
        }
        const deps = def.dependencies;
        if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
            throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
        }
        if (def.validateSchema) {
            const valid = def.validateSchema(schema[keyword]);
            if (!valid) {
                const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                    self.errorsText(def.validateSchema.errors);
                if (opts.validateSchema === "log")
                    self.logger.error(msg);
                else
                    throw new Error(msg);
            }
        }
    }

    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
        if (keyword !== undefined && schema !== undefined) {
            throw new Error('both "keyword" and "schema" passed, only one allowed');
        }
        if (keyword !== undefined) {
            const sch = it.schema[keyword];
            return schemaProp === undefined
                ? {
                    schema: sch,
                    schemaPath: _ `${it.schemaPath}${getProperty(keyword)}`,
                    errSchemaPath: `${it.errSchemaPath}/${keyword}`,
                }
                : {
                    schema: sch[schemaProp],
                    schemaPath: _ `${it.schemaPath}${getProperty(keyword)}${getProperty(schemaProp)}`,
                    errSchemaPath: `${it.errSchemaPath}/${keyword}/${escapeFragment(schemaProp)}`,
                };
        }
        if (schema !== undefined) {
            if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
                throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
            }
            return {
                schema,
                schemaPath,
                topSchemaRef,
                errSchemaPath,
            };
        }
        throw new Error('either "keyword" or "schema" must be passed');
    }
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
        if (data !== undefined && dataProp !== undefined) {
            throw new Error('both "data" and "dataProp" passed, only one allowed');
        }
        const { gen } = it;
        if (dataProp !== undefined) {
            const { errorPath, dataPathArr, opts } = it;
            const nextData = gen.let("data", _ `${it.data}${getProperty(dataProp)}`, true);
            dataContextProps(nextData);
            subschema.errorPath = str `${errorPath}${getErrorPath(dataProp, dpType, opts.jsPropertySyntax)}`;
            subschema.parentDataProperty = _ `${dataProp}`;
            subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
        }
        if (data !== undefined) {
            const nextData = data instanceof Name ? data : gen.let("data", data, true); // replaceable if used once?
            dataContextProps(nextData);
            if (propertyName !== undefined)
                subschema.propertyName = propertyName;
            // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
        }
        if (dataTypes)
            subschema.dataTypes = dataTypes;
        function dataContextProps(_nextData) {
            subschema.data = _nextData;
            subschema.dataLevel = it.dataLevel + 1;
            subschema.dataTypes = [];
            it.definedProperties = new Set();
            subschema.parentData = it.data;
            subschema.dataNames = [...it.dataNames, _nextData];
        }
    }
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
        if (compositeRule !== undefined)
            subschema.compositeRule = compositeRule;
        if (createErrors !== undefined)
            subschema.createErrors = createErrors;
        if (allErrors !== undefined)
            subschema.allErrors = allErrors;
        subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
        subschema.jtdMetadata = jtdMetadata; // not inherited
    }

    // do not edit .js files directly - edit src/index.jst



    var fastDeepEqual = function equal(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == 'object' && typeof b == 'object') {
        if (a.constructor !== b.constructor) return false;

        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0;)
            if (!equal(a[i], b[i])) return false;
          return true;
        }



        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0;)
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = length; i-- !== 0;) {
          var key = keys[i];

          if (!equal(a[key], b[key])) return false;
        }

        return true;
      }

      // true if both NaN, false otherwise
      return a!==a && b!==b;
    };

    var equal = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), fastDeepEqual, {
        'default': fastDeepEqual
    }));

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var jsonSchemaTraverse = createCommonjsModule(function (module) {

    var traverse = module.exports = function (schema, opts, cb) {
      // Legacy support for v0.3.1 and earlier.
      if (typeof opts == 'function') {
        cb = opts;
        opts = {};
      }

      cb = opts.cb || cb;
      var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
      var post = cb.post || function() {};

      _traverse(opts, pre, post, schema, '', schema);
    };


    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };

    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };

    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };

    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };


    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i=0; i<sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == 'object') {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
            _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }


    function escapeJsonPtr(str) {
      return str.replace(/~/g, '~0').replace(/\//g, '~1');
    }
    });

    var traverse = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.assign(/*#__PURE__*/Object.create(null), jsonSchemaTraverse, {
        'default': jsonSchemaTraverse
    }));

    /** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */

    var uri_all = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
    	factory(exports) ;
    }(commonjsGlobal, (function (exports) {
    function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
            sets[_key] = arguments[_key];
        }

        if (sets.length > 1) {
            sets[0] = sets[0].slice(0, -1);
            var xl = sets.length - 1;
            for (var x = 1; x < xl; ++x) {
                sets[x] = sets[x].slice(1, -1);
            }
            sets[xl] = sets[xl].slice(1);
            return sets.join('');
        } else {
            return sets[0];
        }
    }
    function subexp(str) {
        return "(?:" + str + ")";
    }
    function typeOf(o) {
        return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
    }
    function toUpperCase(str) {
        return str.toUpperCase();
    }
    function toArray(obj) {
        return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
    }
    function assign(target, source) {
        var obj = target;
        if (source) {
            for (var key in source) {
                obj[key] = source[key];
            }
        }
        return obj;
    }

    function buildExps(isIRI) {
        var ALPHA$$ = "[A-Za-z]",
            DIGIT$$ = "[0-9]",
            HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
            PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
            //expanded
        GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
            SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
            RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
            UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
            //subset, excludes bidi control characters
        IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
            //subset
        UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
            subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
            subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*");
            var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
            //relaxed parsing rules
        IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
            H16$ = subexp(HEXDIG$$ + "{1,4}"),
            LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
            IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
            //                           6( h16 ":" ) ls32
        IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
            //                      "::" 5( h16 ":" ) ls32
        IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
            //[               h16 ] "::" 4( h16 ":" ) ls32
        IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
            //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
        IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
            //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
        IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
            //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
        IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
            //[ *4( h16 ":" ) h16 ] "::"              ls32
        IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
            //[ *5( h16 ":" ) h16 ] "::"              h16
        IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
            //[ *6( h16 ":" ) h16 ] "::"
        IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
            ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+");
            //RFC 6874, with relaxed parsing rules
        subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+");
            //RFC 6874
        subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*");
            var PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]"));
            subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+");
            subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
        return {
            NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
            NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
            NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
            ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
            UNRESERVED: new RegExp(UNRESERVED$$, "g"),
            OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
            PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
            IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
            IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
        };
    }
    var URI_PROTOCOL = buildExps(false);

    var IRI_PROTOCOL = buildExps(true);

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();













    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    /** Highest positive signed 32-bit float value */

    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'

    /** Regular expressions */
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

    /** Error messages */
    var errors = {
    	'overflow': 'Overflow: input needs wider integers to process',
    	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    	'invalid-input': 'Invalid input'
    };

    /** Convenience shortcuts */
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error$1(type) {
    	throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, fn) {
    	var result = [];
    	var length = array.length;
    	while (length--) {
    		result[length] = fn(array[length]);
    	}
    	return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(string, fn) {
    	var parts = string.split('@');
    	var result = '';
    	if (parts.length > 1) {
    		// In email addresses, only the domain name should be punycoded. Leave
    		// the local part (i.e. everything up to `@`) intact.
    		result = parts[0] + '@';
    		string = parts[1];
    	}
    	// Avoid `split(regex)` for IE8 compatibility. See #17.
    	string = string.replace(regexSeparators, '\x2E');
    	var labels = string.split('.');
    	var encoded = map(labels, fn).join('.');
    	return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
    	var output = [];
    	var counter = 0;
    	var length = string.length;
    	while (counter < length) {
    		var value = string.charCodeAt(counter++);
    		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
    			// It's a high surrogate, and there is a next character.
    			var extra = string.charCodeAt(counter++);
    			if ((extra & 0xFC00) == 0xDC00) {
    				// Low surrogate.
    				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
    			} else {
    				// It's an unmatched surrogate; only append this code unit, in case the
    				// next code unit is the high surrogate of a surrogate pair.
    				output.push(value);
    				counter--;
    			}
    		} else {
    			output.push(value);
    		}
    	}
    	return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    var ucs2encode = function ucs2encode(array) {
    	return String.fromCodePoint.apply(String, toConsumableArray(array));
    };

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    var basicToDigit = function basicToDigit(codePoint) {
    	if (codePoint - 0x30 < 0x0A) {
    		return codePoint - 0x16;
    	}
    	if (codePoint - 0x41 < 0x1A) {
    		return codePoint - 0x41;
    	}
    	if (codePoint - 0x61 < 0x1A) {
    		return codePoint - 0x61;
    	}
    	return base;
    };

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    var digitToBasic = function digitToBasic(digit, flag) {
    	//  0..25 map to ASCII a..z or A..Z
    	// 26..35 map to ASCII 0..9
    	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    var adapt = function adapt(delta, numPoints, firstTime) {
    	var k = 0;
    	delta = firstTime ? floor(delta / damp) : delta >> 1;
    	delta += floor(delta / numPoints);
    	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
    		delta = floor(delta / baseMinusTMin);
    	}
    	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    var decode = function decode(input) {
    	// Don't use UCS-2.
    	var output = [];
    	var inputLength = input.length;
    	var i = 0;
    	var n = initialN;
    	var bias = initialBias;

    	// Handle the basic code points: let `basic` be the number of input code
    	// points before the last delimiter, or `0` if there is none, then copy
    	// the first basic code points to the output.

    	var basic = input.lastIndexOf(delimiter);
    	if (basic < 0) {
    		basic = 0;
    	}

    	for (var j = 0; j < basic; ++j) {
    		// if it's not a basic code point
    		if (input.charCodeAt(j) >= 0x80) {
    			error$1('not-basic');
    		}
    		output.push(input.charCodeAt(j));
    	}

    	// Main decoding loop: start just after the last delimiter if any basic code
    	// points were copied; start at the beginning otherwise.

    	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

    		// `index` is the index of the next character to be consumed.
    		// Decode a generalized variable-length integer into `delta`,
    		// which gets added to `i`. The overflow checking is easier
    		// if we increase `i` as we go, then subtract off its starting
    		// value at the end to obtain `delta`.
    		var oldi = i;
    		for (var w = 1, k = base;; /* no condition */k += base) {

    			if (index >= inputLength) {
    				error$1('invalid-input');
    			}

    			var digit = basicToDigit(input.charCodeAt(index++));

    			if (digit >= base || digit > floor((maxInt - i) / w)) {
    				error$1('overflow');
    			}

    			i += digit * w;
    			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

    			if (digit < t) {
    				break;
    			}

    			var baseMinusT = base - t;
    			if (w > floor(maxInt / baseMinusT)) {
    				error$1('overflow');
    			}

    			w *= baseMinusT;
    		}

    		var out = output.length + 1;
    		bias = adapt(i - oldi, out, oldi == 0);

    		// `i` was supposed to wrap around from `out` to `0`,
    		// incrementing `n` each time, so we'll fix that now:
    		if (floor(i / out) > maxInt - n) {
    			error$1('overflow');
    		}

    		n += floor(i / out);
    		i %= out;

    		// Insert `n` at position `i` of the output.
    		output.splice(i++, 0, n);
    	}

    	return String.fromCodePoint.apply(String, output);
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    var encode = function encode(input) {
    	var output = [];

    	// Convert the input in UCS-2 to an array of Unicode code points.
    	input = ucs2decode(input);

    	// Cache the length.
    	var inputLength = input.length;

    	// Initialize the state.
    	var n = initialN;
    	var delta = 0;
    	var bias = initialBias;

    	// Handle the basic code points.
    	var _iteratorNormalCompletion = true;
    	var _didIteratorError = false;
    	var _iteratorError = undefined;

    	try {
    		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    			var _currentValue2 = _step.value;

    			if (_currentValue2 < 0x80) {
    				output.push(stringFromCharCode(_currentValue2));
    			}
    		}
    	} catch (err) {
    		_didIteratorError = true;
    		_iteratorError = err;
    	} finally {
    		try {
    			if (!_iteratorNormalCompletion && _iterator.return) {
    				_iterator.return();
    			}
    		} finally {
    			if (_didIteratorError) {
    				throw _iteratorError;
    			}
    		}
    	}

    	var basicLength = output.length;
    	var handledCPCount = basicLength;

    	// `handledCPCount` is the number of code points that have been handled;
    	// `basicLength` is the number of basic code points.

    	// Finish the basic string with a delimiter unless it's empty.
    	if (basicLength) {
    		output.push(delimiter);
    	}

    	// Main encoding loop:
    	while (handledCPCount < inputLength) {

    		// All non-basic code points < n have been handled already. Find the next
    		// larger one:
    		var m = maxInt;
    		var _iteratorNormalCompletion2 = true;
    		var _didIteratorError2 = false;
    		var _iteratorError2 = undefined;

    		try {
    			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    				var currentValue = _step2.value;

    				if (currentValue >= n && currentValue < m) {
    					m = currentValue;
    				}
    			}

    			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    			// but guard against overflow.
    		} catch (err) {
    			_didIteratorError2 = true;
    			_iteratorError2 = err;
    		} finally {
    			try {
    				if (!_iteratorNormalCompletion2 && _iterator2.return) {
    					_iterator2.return();
    				}
    			} finally {
    				if (_didIteratorError2) {
    					throw _iteratorError2;
    				}
    			}
    		}

    		var handledCPCountPlusOne = handledCPCount + 1;
    		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
    			error$1('overflow');
    		}

    		delta += (m - n) * handledCPCountPlusOne;
    		n = m;

    		var _iteratorNormalCompletion3 = true;
    		var _didIteratorError3 = false;
    		var _iteratorError3 = undefined;

    		try {
    			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    				var _currentValue = _step3.value;

    				if (_currentValue < n && ++delta > maxInt) {
    					error$1('overflow');
    				}
    				if (_currentValue == n) {
    					// Represent delta as a generalized variable-length integer.
    					var q = delta;
    					for (var k = base;; /* no condition */k += base) {
    						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
    						if (q < t) {
    							break;
    						}
    						var qMinusT = q - t;
    						var baseMinusT = base - t;
    						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
    						q = floor(qMinusT / baseMinusT);
    					}

    					output.push(stringFromCharCode(digitToBasic(q, 0)));
    					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
    					delta = 0;
    					++handledCPCount;
    				}
    			}
    		} catch (err) {
    			_didIteratorError3 = true;
    			_iteratorError3 = err;
    		} finally {
    			try {
    				if (!_iteratorNormalCompletion3 && _iterator3.return) {
    					_iterator3.return();
    				}
    			} finally {
    				if (_didIteratorError3) {
    					throw _iteratorError3;
    				}
    			}
    		}

    		++delta;
    		++n;
    	}
    	return output.join('');
    };

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    var toUnicode = function toUnicode(input) {
    	return mapDomain(input, function (string) {
    		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    	});
    };

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    var toASCII = function toASCII(input) {
    	return mapDomain(input, function (string) {
    		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    	});
    };

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    var punycode = {
    	/**
      * A string representing the current Punycode.js version number.
      * @memberOf punycode
      * @type String
      */
    	'version': '2.1.0',
    	/**
      * An object of methods to convert from JavaScript's internal character
      * representation (UCS-2) to Unicode code points, and back.
      * @see <https://mathiasbynens.be/notes/javascript-encoding>
      * @memberOf punycode
      * @type Object
      */
    	'ucs2': {
    		'decode': ucs2decode,
    		'encode': ucs2encode
    	},
    	'decode': decode,
    	'encode': encode,
    	'toASCII': toASCII,
    	'toUnicode': toUnicode
    };

    /**
     * URI.js
     *
     * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/uri-js
     */
    /**
     * Copyright 2011 Gary Court. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification, are
     * permitted provided that the following conditions are met:
     *
     *    1. Redistributions of source code must retain the above copyright notice, this list of
     *       conditions and the following disclaimer.
     *
     *    2. Redistributions in binary form must reproduce the above copyright notice, this list
     *       of conditions and the following disclaimer in the documentation and/or other materials
     *       provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
     * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
     * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
     * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     * The views and conclusions contained in the software and documentation are those of the
     * authors and should not be interpreted as representing official policies, either expressed
     * or implied, of Gary Court.
     */
    var SCHEMES = {};
    function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
    }
    function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
            var c = parseInt(str.substr(i + 1, 2), 16);
            if (c < 128) {
                newStr += String.fromCharCode(c);
                i += 3;
            } else if (c >= 194 && c < 224) {
                if (il - i >= 6) {
                    var c2 = parseInt(str.substr(i + 4, 2), 16);
                    newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
                } else {
                    newStr += str.substr(i, 6);
                }
                i += 6;
            } else if (c >= 224) {
                if (il - i >= 9) {
                    var _c = parseInt(str.substr(i + 4, 2), 16);
                    var c3 = parseInt(str.substr(i + 7, 2), 16);
                    newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
                } else {
                    newStr += str.substr(i, 9);
                }
                i += 9;
            } else {
                newStr += str.substr(i, 3);
                i += 3;
            }
        }
        return newStr;
    }
    function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved(str) {
            var decStr = pctDecChars(str);
            return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
    }

    function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
    }
    function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];

        var _matches = slicedToArray(matches, 2),
            address = _matches[1];

        if (address) {
            return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
            return host;
        }
    }
    function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];

        var _matches2 = slicedToArray(matches, 3),
            address = _matches2[1],
            zone = _matches2[2];

        if (address) {
            var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
                _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
                last = _address$toLowerCase$2[0],
                first = _address$toLowerCase$2[1];

            var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
            var lastFields = last.split(":").map(_stripLeadingZeros);
            var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
            var fieldCount = isLastFieldIPv4Address ? 7 : 8;
            var lastFieldsStart = lastFields.length - fieldCount;
            var fields = Array(fieldCount);
            for (var x = 0; x < fieldCount; ++x) {
                fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
            }
            if (isLastFieldIPv4Address) {
                fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
            }
            var allZeroFields = fields.reduce(function (acc, field, index) {
                if (!field || field === "0") {
                    var lastLongest = acc[acc.length - 1];
                    if (lastLongest && lastLongest.index + lastLongest.length === index) {
                        lastLongest.length++;
                    } else {
                        acc.push({ index: index, length: 1 });
                    }
                }
                return acc;
            }, []);
            var longestZeroFields = allZeroFields.sort(function (a, b) {
                return b.length - a.length;
            })[0];
            var newHost = void 0;
            if (longestZeroFields && longestZeroFields.length > 1) {
                var newFirst = fields.slice(0, longestZeroFields.index);
                var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
                newHost = newFirst.join(":") + "::" + newLast.join(":");
            } else {
                newHost = fields.join(":");
            }
            if (zone) {
                newHost += "%" + zone;
            }
            return newHost;
        } else {
            return host;
        }
    }
    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
    function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
            if (NO_MATCH_IS_UNDEFINED) {
                //store each component
                components.scheme = matches[1];
                components.userinfo = matches[3];
                components.host = matches[4];
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = matches[7];
                components.fragment = matches[8];
                //fix port number
                if (isNaN(components.port)) {
                    components.port = matches[5];
                }
            } else {
                //IE FIX for improper RegExp matching
                //store each component
                components.scheme = matches[1] || undefined;
                components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
                components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
                components.port = parseInt(matches[5], 10);
                components.path = matches[6] || "";
                components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
                components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
                //fix port number
                if (isNaN(components.port)) {
                    components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
                }
            }
            if (components.host) {
                //normalize IP hosts
                components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
            }
            //determine reference type
            if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
                components.reference = "same-document";
            } else if (components.scheme === undefined) {
                components.reference = "relative";
            } else if (components.fragment === undefined) {
                components.reference = "absolute";
            } else {
                components.reference = "uri";
            }
            //check for reference errors
            if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
                components.error = components.error || "URI is not a " + options.reference + " reference.";
            }
            //find scheme handler
            var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
            //check if scheme can't handle IRIs
            if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
                //if host component is a domain name
                if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                    }
                }
                //convert IRI -> URI
                _normalizeComponentEncoding(components, URI_PROTOCOL);
            } else {
                //normalize encodings
                _normalizeComponentEncoding(components, protocol);
            }
            //perform scheme specific parsing
            if (schemeHandler && schemeHandler.parse) {
                schemeHandler.parse(components, options);
            }
        } else {
            components.error = components.error || "URI can not be parsed.";
        }
        return components;
    }

    function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== undefined) {
            uriTokens.push(components.userinfo);
            uriTokens.push("@");
        }
        if (components.host !== undefined) {
            //normalize IP hosts, add brackets and escape zone separator for IPv6
            uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
                return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
            }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
            uriTokens.push(":");
            uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : undefined;
    }

    var RDS1 = /^\.\.?\//;
    var RDS2 = /^\/\.(\/|$)/;
    var RDS3 = /^\/\.\.(\/|$)/;
    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
    function removeDotSegments(input) {
        var output = [];
        while (input.length) {
            if (input.match(RDS1)) {
                input = input.replace(RDS1, "");
            } else if (input.match(RDS2)) {
                input = input.replace(RDS2, "/");
            } else if (input.match(RDS3)) {
                input = input.replace(RDS3, "/");
                output.pop();
            } else if (input === "." || input === "..") {
                input = "";
            } else {
                var im = input.match(RDS5);
                if (im) {
                    var s = im[0];
                    input = input.slice(s.length);
                    output.push(s);
                } else {
                    throw new Error("Unexpected dot segment condition");
                }
            }
        }
        return output.join("");
    }

    function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //perform scheme specific serialization
        if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
        if (components.host) {
            //if host component is an IPv6 address
            if (protocol.IPV6ADDRESS.test(components.host)) ;
            //TODO: normalize IPv6 address as per RFC 5952

            //if host component is a domain name
            else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                    //convert IDN via punycode
                    try {
                        components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                    } catch (e) {
                        components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                }
        }
        //normalize encoding
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
            uriTokens.push(components.scheme);
            uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== undefined) {
            if (options.reference !== "suffix") {
                uriTokens.push("//");
            }
            uriTokens.push(authority);
            if (components.path && components.path.charAt(0) !== "/") {
                uriTokens.push("/");
            }
        }
        if (components.path !== undefined) {
            var s = components.path;
            if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
                s = removeDotSegments(s);
            }
            if (authority === undefined) {
                s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
            }
            uriTokens.push(s);
        }
        if (components.query !== undefined) {
            uriTokens.push("?");
            uriTokens.push(components.query);
        }
        if (components.fragment !== undefined) {
            uriTokens.push("#");
            uriTokens.push(components.fragment);
        }
        return uriTokens.join(""); //merge tokens into a string
    }

    function resolveComponents(base, relative) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var skipNormalization = arguments[3];

        var target = {};
        if (!skipNormalization) {
            base = parse(serialize(base, options), options); //normalize base components
            relative = parse(serialize(relative, options), options); //normalize relative components
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
            target.scheme = relative.scheme;
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
                //target.authority = relative.authority;
                target.userinfo = relative.userinfo;
                target.host = relative.host;
                target.port = relative.port;
                target.path = removeDotSegments(relative.path || "");
                target.query = relative.query;
            } else {
                if (!relative.path) {
                    target.path = base.path;
                    if (relative.query !== undefined) {
                        target.query = relative.query;
                    } else {
                        target.query = base.query;
                    }
                } else {
                    if (relative.path.charAt(0) === "/") {
                        target.path = removeDotSegments(relative.path);
                    } else {
                        if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                            target.path = "/" + relative.path;
                        } else if (!base.path) {
                            target.path = relative.path;
                        } else {
                            target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                        }
                        target.path = removeDotSegments(target.path);
                    }
                    target.query = relative.query;
                }
                //target.authority = base.authority;
                target.userinfo = base.userinfo;
                target.host = base.host;
                target.port = base.port;
            }
            target.scheme = base.scheme;
        }
        target.fragment = relative.fragment;
        return target;
    }

    function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: 'null' }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
    }

    function normalize(uri, options) {
        if (typeof uri === "string") {
            uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
            uri = parse(serialize(uri, options), options);
        }
        return uri;
    }

    function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
            uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
            uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
            uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
            uriB = serialize(uriB, options);
        }
        return uriA === uriB;
    }

    function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
    }

    function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
    }

    var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse(components, options) {
            //report missing host
            if (!components.host) {
                components.error = components.error || "HTTP URIs must have a host.";
            }
            return components;
        },
        serialize: function serialize(components, options) {
            var secure = String(components.scheme).toLowerCase() === "https";
            //normalize the default port
            if (components.port === (secure ? 443 : 80) || components.port === "") {
                components.port = undefined;
            }
            //normalize the empty path
            if (!components.path) {
                components.path = "/";
            }
            //NOTE: We do not parse query strings for HTTP URIs
            //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
            //and not the HTTP spec.
            return components;
        }
    };

    var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
    };

    function isSecure(wsComponents) {
        return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
    }
    //RFC 6455
    var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse(components, options) {
            var wsComponents = components;
            //indicate if the secure flag is set
            wsComponents.secure = isSecure(wsComponents);
            //construct resouce name
            wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
            wsComponents.path = undefined;
            wsComponents.query = undefined;
            return wsComponents;
        },
        serialize: function serialize(wsComponents, options) {
            //normalize the default port
            if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
                wsComponents.port = undefined;
            }
            //ensure scheme matches secure flag
            if (typeof wsComponents.secure === 'boolean') {
                wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
                wsComponents.secure = undefined;
            }
            //reconstruct path from resource name
            if (wsComponents.resourceName) {
                var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                    _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                    path = _wsComponents$resourc2[0],
                    query = _wsComponents$resourc2[1];

                wsComponents.path = path && path !== '/' ? path : undefined;
                wsComponents.query = query;
                wsComponents.resourceName = undefined;
            }
            //forbid fragment component
            wsComponents.fragment = undefined;
            return wsComponents;
        }
    };

    var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
    };

    var O = {};
    //RFC 3986
    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + ("\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" ) + "]";
    var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
    //RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
    //const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
    //const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
    //const VCHAR$$ = "[\\x21-\\x7E]";
    //const WSP$$ = "[\\x20\\x09]";
    //const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
    //const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
    //const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
    //const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
    var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
    var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
    var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
    var NOT_HFVALUE = NOT_HFNAME;
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
    }
    var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
            var mailtoComponents = components;
            var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
            mailtoComponents.path = undefined;
            if (mailtoComponents.query) {
                var unknownHeaders = false;
                var headers = {};
                var hfields = mailtoComponents.query.split("&");
                for (var x = 0, xl = hfields.length; x < xl; ++x) {
                    var hfield = hfields[x].split("=");
                    switch (hfield[0]) {
                        case "to":
                            var toAddrs = hfield[1].split(",");
                            for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                                to.push(toAddrs[_x]);
                            }
                            break;
                        case "subject":
                            mailtoComponents.subject = unescapeComponent(hfield[1], options);
                            break;
                        case "body":
                            mailtoComponents.body = unescapeComponent(hfield[1], options);
                            break;
                        default:
                            unknownHeaders = true;
                            headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                            break;
                    }
                }
                if (unknownHeaders) mailtoComponents.headers = headers;
            }
            mailtoComponents.query = undefined;
            for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
                var addr = to[_x2].split("@");
                addr[0] = unescapeComponent(addr[0]);
                if (!options.unicodeSupport) {
                    //convert Unicode IDN -> ASCII IDN
                    try {
                        addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                    } catch (e) {
                        mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                    }
                } else {
                    addr[1] = unescapeComponent(addr[1], options).toLowerCase();
                }
                to[_x2] = addr.join("@");
            }
            return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
            var components = mailtoComponents;
            var to = toArray(mailtoComponents.to);
            if (to) {
                for (var x = 0, xl = to.length; x < xl; ++x) {
                    var toAddr = String(to[x]);
                    var atIdx = toAddr.lastIndexOf("@");
                    var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                    var domain = toAddr.slice(atIdx + 1);
                    //convert IDN via punycode
                    try {
                        domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                    } catch (e) {
                        components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                    }
                    to[x] = localPart + "@" + domain;
                }
                components.path = to.join(",");
            }
            var headers = mailtoComponents.headers = mailtoComponents.headers || {};
            if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
            if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
            var fields = [];
            for (var name in headers) {
                if (headers[name] !== O[name]) {
                    fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
                }
            }
            if (fields.length) {
                components.query = fields.join("&");
            }
            return components;
        }
    };

    var URN_PARSE = /^([^\:]+)\:(.*)/;
    //RFC 2141
    var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
            var matches = components.path && components.path.match(URN_PARSE);
            var urnComponents = components;
            if (matches) {
                var scheme = options.scheme || urnComponents.scheme || "urn";
                var nid = matches[1].toLowerCase();
                var nss = matches[2];
                var urnScheme = scheme + ":" + (options.nid || nid);
                var schemeHandler = SCHEMES[urnScheme];
                urnComponents.nid = nid;
                urnComponents.nss = nss;
                urnComponents.path = undefined;
                if (schemeHandler) {
                    urnComponents = schemeHandler.parse(urnComponents, options);
                }
            } else {
                urnComponents.error = urnComponents.error || "URN can not be parsed.";
            }
            return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = urnComponents.nid;
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            if (schemeHandler) {
                urnComponents = schemeHandler.serialize(urnComponents, options);
            }
            var uriComponents = urnComponents;
            var nss = urnComponents.nss;
            uriComponents.path = (nid || options.nid) + ":" + nss;
            return uriComponents;
        }
    };

    var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
    //RFC 4122
    var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse(urnComponents, options) {
            var uuidComponents = urnComponents;
            uuidComponents.uuid = uuidComponents.nss;
            uuidComponents.nss = undefined;
            if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
                uuidComponents.error = uuidComponents.error || "UUID is not valid.";
            }
            return uuidComponents;
        },
        serialize: function serialize(uuidComponents, options) {
            var urnComponents = uuidComponents;
            //normalize UUID
            urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
            return urnComponents;
        }
    };

    SCHEMES[handler.scheme] = handler;
    SCHEMES[handler$1.scheme] = handler$1;
    SCHEMES[handler$2.scheme] = handler$2;
    SCHEMES[handler$3.scheme] = handler$3;
    SCHEMES[handler$4.scheme] = handler$4;
    SCHEMES[handler$5.scheme] = handler$5;
    SCHEMES[handler$6.scheme] = handler$6;

    exports.SCHEMES = SCHEMES;
    exports.pctEncChar = pctEncChar;
    exports.pctDecChars = pctDecChars;
    exports.parse = parse;
    exports.removeDotSegments = removeDotSegments;
    exports.serialize = serialize;
    exports.resolveComponents = resolveComponents;
    exports.resolve = resolve;
    exports.normalize = normalize;
    exports.equal = equal;
    exports.escapeComponent = escapeComponent;
    exports.unescapeComponent = unescapeComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

    })));
    //# sourceMappingURL=uri.all.js.map
    });

    // TODO refactor to use keyword definitions
    const SIMPLE_INLINED = new Set([
        "type",
        "format",
        "pattern",
        "maxLength",
        "minLength",
        "maxProperties",
        "minProperties",
        "maxItems",
        "minItems",
        "maximum",
        "minimum",
        "uniqueItems",
        "multipleOf",
        "required",
        "enum",
        "const",
    ]);
    function inlineRef(schema, limit = true) {
        if (typeof schema == "boolean")
            return true;
        if (limit === true)
            return !hasRef(schema);
        if (!limit)
            return false;
        return countKeys(schema) <= limit;
    }
    const REF_KEYWORDS = new Set([
        "$ref",
        "$recursiveRef",
        "$recursiveAnchor",
        "$dynamicRef",
        "$dynamicAnchor",
    ]);
    function hasRef(schema) {
        for (const key in schema) {
            if (REF_KEYWORDS.has(key))
                return true;
            const sch = schema[key];
            if (Array.isArray(sch) && sch.some(hasRef))
                return true;
            if (typeof sch == "object" && hasRef(sch))
                return true;
        }
        return false;
    }
    function countKeys(schema) {
        let count = 0;
        for (const key in schema) {
            if (key === "$ref")
                return Infinity;
            count++;
            if (SIMPLE_INLINED.has(key))
                continue;
            if (typeof schema[key] == "object") {
                eachItem(schema[key], (sch) => (count += countKeys(sch)));
            }
            if (count === Infinity)
                return Infinity;
        }
        return count;
    }
    function getFullPath(id = "", normalize) {
        if (normalize !== false)
            id = normalizeId(id);
        const p = uri_all.parse(id);
        return _getFullPath(p);
    }
    function _getFullPath(p) {
        return uri_all.serialize(p).split("#")[0] + "#";
    }
    const TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
        return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    function resolveUrl(baseId, id) {
        id = normalizeId(id);
        return uri_all.resolve(baseId, id);
    }
    const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema) {
        if (typeof schema == "boolean")
            return {};
        const schemaId = normalizeId(schema.$id);
        const baseIds = { "": schemaId };
        const pathPrefix = getFullPath(schemaId, false);
        const localRefs = {};
        const schemaRefs = new Set();
        traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
            if (parentJsonPtr === undefined)
                return;
            const fullPath = pathPrefix + jsonPtr;
            let baseId = baseIds[parentJsonPtr];
            if (typeof sch.$id == "string")
                baseId = addRef.call(this, sch.$id);
            addAnchor.call(this, sch.$anchor);
            addAnchor.call(this, sch.$dynamicAnchor);
            baseIds[jsonPtr] = baseId;
            function addRef(ref) {
                ref = normalizeId(baseId ? uri_all.resolve(baseId, ref) : ref);
                if (schemaRefs.has(ref))
                    throw ambiguos(ref);
                schemaRefs.add(ref);
                let schOrRef = this.refs[ref];
                if (typeof schOrRef == "string")
                    schOrRef = this.refs[schOrRef];
                if (typeof schOrRef == "object") {
                    checkAmbiguosRef(sch, schOrRef.schema, ref);
                }
                else if (ref !== normalizeId(fullPath)) {
                    if (ref[0] === "#") {
                        checkAmbiguosRef(sch, localRefs[ref], ref);
                        localRefs[ref] = sch;
                    }
                    else {
                        this.refs[ref] = fullPath;
                    }
                }
                return ref;
            }
            function addAnchor(anchor) {
                if (typeof anchor == "string") {
                    if (!ANCHOR.test(anchor))
                        throw new Error(`invalid anchor "${anchor}"`);
                    addRef.call(this, `#${anchor}`);
                }
            }
        });
        return localRefs;
        function checkAmbiguosRef(sch1, sch2, ref) {
            if (sch2 !== undefined && !equal(sch1, sch2))
                throw ambiguos(ref);
        }
        function ambiguos(ref) {
            return new Error(`reference "${ref}" resolves to more than one schema`);
        }
    }

    // schema compilation - generates validation function, subschemaCode (below) is used for subschemas
    function validateFunctionCode(it) {
        if (isSchemaObj(it)) {
            checkKeywords(it);
            if (schemaCxtHasRules(it)) {
                topSchemaObjCode(it);
                return;
            }
        }
        validateFunction(it, () => topBoolOrEmptySchema(it));
    }
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
        if (opts.code.es5) {
            gen.func(validateName, _ `${names.data}, ${names.valCxt}`, schemaEnv.$async, () => {
                gen.code(_ `"use strict"; ${funcSourceUrl(schema, opts)}`);
                destructureValCxtES5(gen, opts);
                gen.code(body);
            });
        }
        else {
            gen.func(validateName, _ `${names.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
        }
    }
    function destructureValCxt(opts) {
        return _ `{${names.instancePath}="", ${names.parentData}, ${names.parentDataProperty}, ${names.rootData}=${names.data}${opts.dynamicRef ? _ `, ${names.dynamicAnchors}={}` : nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
        gen.if(names.valCxt, () => {
            gen.var(names.instancePath, _ `${names.valCxt}.${names.instancePath}`);
            gen.var(names.parentData, _ `${names.valCxt}.${names.parentData}`);
            gen.var(names.parentDataProperty, _ `${names.valCxt}.${names.parentDataProperty}`);
            gen.var(names.rootData, _ `${names.valCxt}.${names.rootData}`);
            if (opts.dynamicRef)
                gen.var(names.dynamicAnchors, _ `${names.valCxt}.${names.dynamicAnchors}`);
        }, () => {
            gen.var(names.instancePath, _ `""`);
            gen.var(names.parentData, _ `undefined`);
            gen.var(names.parentDataProperty, _ `undefined`);
            gen.var(names.rootData, names.data);
            if (opts.dynamicRef)
                gen.var(names.dynamicAnchors, _ `{}`);
        });
    }
    function topSchemaObjCode(it) {
        const { schema, opts, gen } = it;
        validateFunction(it, () => {
            if (opts.$comment && schema.$comment)
                commentKeyword(it);
            checkNoDefault(it);
            gen.let(names.vErrors, null);
            gen.let(names.errors, 0);
            if (opts.unevaluated)
                resetEvaluated(it);
            typeAndKeywords(it);
            returnResults(it);
        });
        return;
    }
    function resetEvaluated(it) {
        // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
        const { gen, validateName } = it;
        it.evaluated = gen.const("evaluated", _ `${validateName}.evaluated`);
        gen.if(_ `${it.evaluated}.dynamicProps`, () => gen.assign(_ `${it.evaluated}.props`, _ `undefined`));
        gen.if(_ `${it.evaluated}.dynamicItems`, () => gen.assign(_ `${it.evaluated}.items`, _ `undefined`));
    }
    function funcSourceUrl(schema, opts) {
        return typeof schema == "object" && schema.$id && (opts.code.source || opts.code.process)
            ? _ `/*# sourceURL=${schema.$id} */`
            : nil;
    }
    // schema compilation - this function is used recursively to generate code for sub-schemas
    function subschemaCode(it, valid) {
        if (isSchemaObj(it)) {
            checkKeywords(it);
            if (schemaCxtHasRules(it)) {
                subSchemaObjCode(it, valid);
                return;
            }
        }
        boolOrEmptySchema(it, valid);
    }
    function schemaCxtHasRules({ schema, self }) {
        if (typeof schema == "boolean")
            return !schema;
        for (const key in schema)
            if (self.RULES.all[key])
                return true;
        return false;
    }
    function isSchemaObj(it) {
        return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
        const { schema, gen, opts } = it;
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        updateContext(it);
        checkAsyncSchema(it);
        const errsCount = gen.const("_errs", names.errors);
        typeAndKeywords(it, errsCount);
        // TODO var
        gen.var(valid, _ `${errsCount} === ${names.errors}`);
    }
    function checkKeywords(it) {
        checkUnknownRules(it);
        checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
        if (it.opts.jtd)
            return schemaKeywords(it, [], false, errsCount);
        const types = getSchemaTypes(it.schema);
        const checkedTypes = coerceAndCheckDataType(it, types);
        schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
        const { schema, errSchemaPath, opts, self } = it;
        if (schema.$ref && opts.ignoreKeywordsWithRef && schemaHasRulesButRef(schema, self.RULES)) {
            self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
        }
    }
    function checkNoDefault(it) {
        const { schema, opts } = it;
        if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
            checkStrictMode(it, "default is ignored in the schema root");
        }
    }
    function updateContext(it) {
        if (it.schema.$id)
            it.baseId = resolveUrl(it.baseId, it.schema.$id);
    }
    function checkAsyncSchema(it) {
        if (it.schema.$async && !it.schemaEnv.$async)
            throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
        const msg = schema.$comment;
        if (opts.$comment === true) {
            gen.code(_ `${names.self}.logger.log(${msg})`);
        }
        else if (typeof opts.$comment == "function") {
            const schemaPath = str `${errSchemaPath}/$comment`;
            const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
            gen.code(_ `${names.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
        }
    }
    function returnResults(it) {
        const { gen, schemaEnv, validateName, ValidationError, opts } = it;
        if (schemaEnv.$async) {
            // TODO assign unevaluated
            gen.if(_ `${names.errors} === 0`, () => gen.return(names.data), () => gen.throw(_ `new ${ValidationError}(${names.vErrors})`));
        }
        else {
            gen.assign(_ `${validateName}.errors`, names.vErrors);
            if (opts.unevaluated)
                assignEvaluated(it);
            gen.return(_ `${names.errors} === 0`);
        }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
        if (props instanceof Name)
            gen.assign(_ `${evaluated}.props`, props);
        if (items instanceof Name)
            gen.assign(_ `${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
        const { gen, schema, data, allErrors, opts, self } = it;
        const { RULES } = self;
        if (schema.$ref && (opts.ignoreKeywordsWithRef || !schemaHasRulesButRef(schema, RULES))) {
            gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
            return;
        }
        if (!opts.jtd)
            checkStrictTypes(it, types);
        gen.block(() => {
            for (const group of RULES.rules)
                groupKeywords(group);
            groupKeywords(RULES.post);
        });
        function groupKeywords(group) {
            if (!shouldUseGroup(schema, group))
                return;
            if (group.type) {
                gen.if(checkDataType(group.type, data, opts.strictNumbers));
                iterateKeywords(it, group);
                if (types.length === 1 && types[0] === group.type && typeErrors) {
                    gen.else();
                    reportTypeError(it);
                }
                gen.endIf();
            }
            else {
                iterateKeywords(it, group);
            }
            // TODO make it "ok" call?
            if (!allErrors)
                gen.if(_ `${names.errors} === ${errsCount || 0}`);
        }
    }
    function iterateKeywords(it, group) {
        const { gen, schema, opts: { useDefaults }, } = it;
        if (useDefaults)
            assignDefaults(it, group.type);
        gen.block(() => {
            for (const rule of group.rules) {
                if (shouldUseRule(schema, rule)) {
                    keywordCode(it, rule.keyword, rule.definition, group.type);
                }
            }
        });
    }
    function checkStrictTypes(it, types) {
        if (it.schemaEnv.meta || !it.opts.strictTypes)
            return;
        checkContextTypes(it, types);
        if (!it.opts.allowUnionTypes)
            checkMultipleTypes(it, types);
        checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
        if (!types.length)
            return;
        if (!it.dataTypes.length) {
            it.dataTypes = types;
            return;
        }
        types.forEach((t) => {
            if (!includesType(it.dataTypes, t)) {
                strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
            }
        });
        it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
    }
    function checkMultipleTypes(it, ts) {
        if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
            strictTypesError(it, "use allowUnionTypes to allow union type keyword");
        }
    }
    function checkKeywordTypes(it, ts) {
        const rules = it.self.RULES.all;
        for (const keyword in rules) {
            const rule = rules[keyword];
            if (typeof rule == "object" && shouldUseRule(it.schema, rule)) {
                const { type } = rule.definition;
                if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                    strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
                }
            }
        }
    }
    function hasApplicableType(schTs, kwdT) {
        return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
    }
    function includesType(ts, t) {
        return ts.includes(t) || (t === "integer" && ts.includes("number"));
    }
    function strictTypesError(it, msg) {
        const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
        msg += ` at "${schemaPath}" (strictTypes)`;
        checkStrictMode(it, msg, it.opts.strictTypes);
    }
    class KeywordCxt {
        constructor(it, def, keyword) {
            validateKeywordUsage(it, def, keyword);
            this.gen = it.gen;
            this.allErrors = it.allErrors;
            this.keyword = keyword;
            this.data = it.data;
            this.schema = it.schema[keyword];
            this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
            this.schemaValue = schemaRefOrVal(it, this.schema, keyword, this.$data);
            this.schemaType = def.schemaType;
            this.parentSchema = it.schema;
            this.params = {};
            this.it = it;
            this.def = def;
            if (this.$data) {
                this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
            }
            else {
                this.schemaCode = this.schemaValue;
                if (!validSchemaType(this.schema, def.schemaType, def.allowUndefined)) {
                    throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
                }
            }
            if ("code" in def ? def.trackErrors : def.errors !== false) {
                this.errsCount = it.gen.const("_errs", names.errors);
            }
        }
        result(condition, successAction, failAction) {
            this.gen.if(not(condition));
            if (failAction)
                failAction();
            else
                this.error();
            if (successAction) {
                this.gen.else();
                successAction();
                if (this.allErrors)
                    this.gen.endIf();
            }
            else {
                if (this.allErrors)
                    this.gen.endIf();
                else
                    this.gen.else();
            }
        }
        pass(condition, failAction) {
            this.result(condition, undefined, failAction);
        }
        fail(condition) {
            if (condition === undefined) {
                this.error();
                if (!this.allErrors)
                    this.gen.if(false); // this branch will be removed by gen.optimize
                return;
            }
            this.gen.if(condition);
            this.error();
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
        fail$data(condition) {
            if (!this.$data)
                return this.fail(condition);
            const { schemaCode } = this;
            this.fail(_ `${schemaCode} !== undefined && (${or(this.invalid$data(), condition)})`);
        }
        error(append, errorParams, errorPaths) {
            if (errorParams) {
                this.setParams(errorParams);
                this._error(append, errorPaths);
                this.setParams({});
                return;
            }
            this._error(append, errorPaths);
        }
        _error(append, errorPaths) {
            (append ? reportExtraError : reportError)(this, this.def.error, errorPaths);
        }
        $dataError() {
            reportError(this, this.def.$dataError || keyword$DataError);
        }
        reset() {
            if (this.errsCount === undefined)
                throw new Error('add "trackErrors" to keyword definition');
            resetErrorsCount(this.gen, this.errsCount);
        }
        ok(cond) {
            if (!this.allErrors)
                this.gen.if(cond);
        }
        setParams(obj, assign) {
            if (assign)
                Object.assign(this.params, obj);
            else
                this.params = obj;
        }
        block$data(valid, codeBlock, $dataValid = nil) {
            this.gen.block(() => {
                this.check$data(valid, $dataValid);
                codeBlock();
            });
        }
        check$data(valid = nil, $dataValid = nil) {
            if (!this.$data)
                return;
            const { gen, schemaCode, schemaType, def } = this;
            gen.if(or(_ `${schemaCode} === undefined`, $dataValid));
            if (valid !== nil)
                gen.assign(valid, true);
            if (schemaType.length || def.validateSchema) {
                gen.elseIf(this.invalid$data());
                this.$dataError();
                if (valid !== nil)
                    gen.assign(valid, false);
            }
            gen.else();
        }
        invalid$data() {
            const { gen, schemaCode, schemaType, def, it } = this;
            return or(wrong$DataType(), invalid$DataSchema());
            function wrong$DataType() {
                if (schemaType.length) {
                    /* istanbul ignore if */
                    if (!(schemaCode instanceof Name))
                        throw new Error("ajv implementation error");
                    const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                    return _ `${checkDataTypes(st, schemaCode, it.opts.strictNumbers, DataType.Wrong)}`;
                }
                return nil;
            }
            function invalid$DataSchema() {
                if (def.validateSchema) {
                    const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                    return _ `!${validateSchemaRef}(${schemaCode})`;
                }
                return nil;
            }
        }
        subschema(appl, valid) {
            const subschema = getSubschema(this.it, appl);
            extendSubschemaData(subschema, this.it, appl);
            extendSubschemaMode(subschema, appl);
            const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
            subschemaCode(nextContext, valid);
            return nextContext;
        }
        mergeEvaluated(schemaCxt, toName) {
            const { it, gen } = this;
            if (!it.opts.unevaluated)
                return;
            if (it.props !== true && schemaCxt.props !== undefined) {
                it.props = mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
            }
            if (it.items !== true && schemaCxt.items !== undefined) {
                it.items = mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
            }
        }
        mergeValidEvaluated(schemaCxt, valid) {
            const { it, gen } = this;
            if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
                gen.if(valid, () => this.mergeEvaluated(schemaCxt, Name));
                return true;
            }
        }
    }
    function keywordCode(it, keyword, def, ruleType) {
        const cxt = new KeywordCxt(it, def, keyword);
        if ("code" in def) {
            def.code(cxt, ruleType);
        }
        else if (cxt.$data && def.validate) {
            funcKeywordCode(cxt, def);
        }
        else if ("macro" in def) {
            macroKeywordCode(cxt, def);
        }
        else if (def.compile || def.validate) {
            funcKeywordCode(cxt, def);
        }
    }
    const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
        let jsonPointer;
        let data;
        if ($data === "")
            return names.rootData;
        if ($data[0] === "/") {
            if (!JSON_POINTER.test($data))
                throw new Error(`Invalid JSON-pointer: ${$data}`);
            jsonPointer = $data;
            data = names.rootData;
        }
        else {
            const matches = RELATIVE_JSON_POINTER.exec($data);
            if (!matches)
                throw new Error(`Invalid JSON-pointer: ${$data}`);
            const up = +matches[1];
            jsonPointer = matches[2];
            if (jsonPointer === "#") {
                if (up >= dataLevel)
                    throw new Error(errorMsg("property/index", up));
                return dataPathArr[dataLevel - up];
            }
            if (up > dataLevel)
                throw new Error(errorMsg("data", up));
            data = dataNames[dataLevel - up];
            if (!jsonPointer)
                return data;
        }
        let expr = data;
        const segments = jsonPointer.split("/");
        for (const segment of segments) {
            if (segment) {
                data = _ `${data}${getProperty(unescapeJsonPointer(segment))}`;
                expr = _ `${expr} && ${data}`;
            }
        }
        return expr;
        function errorMsg(pointerType, up) {
            return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
        }
    }

    class ValidationError extends Error {
        constructor(errors) {
            super("validation failed");
            this.errors = errors;
            this.ajv = this.validation = true;
        }
    }

    class MissingRefError extends Error {
        constructor(baseId, ref, msg) {
            super(msg || `can't resolve reference ${ref} from id ${baseId}`);
            this.missingRef = resolveUrl(baseId, ref);
            this.missingSchema = normalizeId(getFullPath(this.missingRef));
        }
    }

    class SchemaEnv {
        constructor(env) {
            var _a;
            this.refs = {};
            this.dynamicAnchors = {};
            let schema;
            if (typeof env.schema == "object")
                schema = env.schema;
            this.schema = env.schema;
            this.root = env.root || this;
            this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : normalizeId(schema === null || schema === void 0 ? void 0 : schema.$id);
            this.schemaPath = env.schemaPath;
            this.localRefs = env.localRefs;
            this.meta = env.meta;
            this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
            this.refs = {};
        }
    }
    // let codeSize = 0
    // let nodeCount = 0
    // Compiles schema in SchemaEnv
    function compileSchema(sch) {
        // TODO refactor - remove compilations
        const _sch = getCompilingSchema.call(this, sch);
        if (_sch)
            return _sch;
        const rootId = getFullPath(sch.root.baseId); // TODO if getFullPath removed 1 tests fails
        const { es5, lines } = this.opts.code;
        const { ownProperties } = this.opts;
        const gen = new CodeGen(this.scope, { es5, lines, ownProperties });
        let _ValidationError;
        if (sch.$async) {
            _ValidationError = gen.scopeValue("Error", {
                ref: ValidationError,
                code: _ `require("ajv/dist/runtime/validation_error").default`,
            });
        }
        const validateName = gen.scopeName("validate");
        sch.validateName = validateName;
        const schemaCxt = {
            gen,
            allErrors: this.opts.allErrors,
            data: names.data,
            parentData: names.parentData,
            parentDataProperty: names.parentDataProperty,
            dataNames: [names.data],
            dataPathArr: [nil],
            dataLevel: 0,
            dataTypes: [],
            definedProperties: new Set(),
            topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
                ? { ref: sch.schema, code: stringify(sch.schema) }
                : { ref: sch.schema }),
            validateName,
            ValidationError: _ValidationError,
            schema: sch.schema,
            schemaEnv: sch,
            rootId,
            baseId: sch.baseId || rootId,
            schemaPath: nil,
            errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
            errorPath: _ `""`,
            opts: this.opts,
            self: this,
        };
        let sourceCode;
        try {
            this._compilations.add(sch);
            validateFunctionCode(schemaCxt);
            gen.optimize(this.opts.code.optimize);
            // gen.optimize(1)
            const validateCode = gen.toString();
            sourceCode = `${gen.scopeRefs(names.scope)}return ${validateCode}`;
            // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
            if (this.opts.code.process)
                sourceCode = this.opts.code.process(sourceCode, sch);
            // console.log("\n\n\n *** \n", sourceCode)
            const makeValidate = new Function(`${names.self}`, `${names.scope}`, sourceCode);
            const validate = makeValidate(this, this.scope.get());
            this.scope.value(validateName, { ref: validate });
            validate.errors = null;
            validate.schema = sch.schema;
            validate.schemaEnv = sch;
            if (sch.$async)
                validate.$async = true;
            if (this.opts.code.source === true) {
                validate.source = { validateName, validateCode, scopeValues: gen._values };
            }
            if (this.opts.unevaluated) {
                const { props, items } = schemaCxt;
                validate.evaluated = {
                    props: props instanceof Name ? undefined : props,
                    items: items instanceof Name ? undefined : items,
                    dynamicProps: props instanceof Name,
                    dynamicItems: items instanceof Name,
                };
                if (validate.source)
                    validate.source.evaluated = stringify(validate.evaluated);
            }
            sch.validate = validate;
            return sch;
        }
        catch (e) {
            delete sch.validate;
            delete sch.validateName;
            if (sourceCode)
                this.logger.error("Error compiling schema, function code:", sourceCode);
            // console.log("\n\n\n *** \n", sourceCode, this.opts)
            throw e;
        }
        finally {
            this._compilations.delete(sch);
        }
    }
    function resolveRef(root, baseId, ref) {
        var _a;
        ref = resolveUrl(baseId, ref);
        const schOrFunc = root.refs[ref];
        if (schOrFunc)
            return schOrFunc;
        let _sch = resolve.call(this, root, ref);
        if (_sch === undefined) {
            const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
            if (schema)
                _sch = new SchemaEnv({ schema, root, baseId });
        }
        if (_sch === undefined)
            return;
        return (root.refs[ref] = inlineOrCompile.call(this, _sch));
    }
    function inlineOrCompile(sch) {
        if (inlineRef(sch.schema, this.opts.inlineRefs))
            return sch.schema;
        return sch.validate ? sch : compileSchema.call(this, sch);
    }
    // Index of schema compilation in the currently compiled list
    function getCompilingSchema(schEnv) {
        for (const sch of this._compilations) {
            if (sameSchemaEnv(sch, schEnv))
                return sch;
        }
    }
    function sameSchemaEnv(s1, s2) {
        return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    // resolve and compile the references ($ref)
    // TODO returns AnySchemaObject (if the schema can be inlined) or validation function
    function resolve(root, // information about the root schema for the current schema
    ref // reference to resolve
    ) {
        let sch;
        while (typeof (sch = this.refs[ref]) == "string")
            ref = sch;
        return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    // Resolve schema, its root and baseId
    function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
    ref // reference to resolve
    ) {
        const p = uri_all.parse(ref);
        const refPath = _getFullPath(p);
        let baseId = getFullPath(root.baseId);
        // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
        if (Object.keys(root.schema).length > 0 && refPath === baseId) {
            return getJsonPointer.call(this, p, root);
        }
        const id = normalizeId(refPath);
        const schOrRef = this.refs[id] || this.schemas[id];
        if (typeof schOrRef == "string") {
            const sch = resolveSchema.call(this, root, schOrRef);
            if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
                return;
            return getJsonPointer.call(this, p, sch);
        }
        if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
            return;
        if (!schOrRef.validate)
            compileSchema.call(this, schOrRef);
        if (id === normalizeId(ref)) {
            const { schema } = schOrRef;
            if (schema.$id)
                baseId = resolveUrl(baseId, schema.$id);
            return new SchemaEnv({ schema, root, baseId });
        }
        return getJsonPointer.call(this, p, schOrRef);
    }
    const PREVENT_SCOPE_CHANGE = new Set([
        "properties",
        "patternProperties",
        "enum",
        "dependencies",
        "definitions",
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
        var _a;
        if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
            return;
        for (const part of parsedRef.fragment.slice(1).split("/")) {
            if (typeof schema == "boolean")
                return;
            schema = schema[unescapeFragment(part)];
            if (schema === undefined)
                return;
            // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
            if (!PREVENT_SCOPE_CHANGE.has(part) && typeof schema == "object" && schema.$id) {
                baseId = resolveUrl(baseId, schema.$id);
            }
        }
        let env;
        if (typeof schema != "boolean" && schema.$ref && !schemaHasRulesButRef(schema, this.RULES)) {
            const $ref = resolveUrl(baseId, schema.$ref);
            env = resolveSchema.call(this, root, $ref);
        }
        // even though resolution failed we need to return SchemaEnv to throw exception
        // so that compileAsync loads missing schema.
        env = env || new SchemaEnv({ schema, root, baseId });
        if (env.schema !== env.root.schema)
            return env;
        return undefined;
    }

    var $id$7 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
    var description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
    var type$7 = "object";
    var required = [
    	"$data"
    ];
    var properties$7 = {
    	$data: {
    		type: "string",
    		anyOf: [
    			{
    				format: "relative-json-pointer"
    			},
    			{
    				format: "json-pointer"
    			}
    		]
    	}
    };
    var additionalProperties = false;
    var data = {
    	$id: $id$7,
    	description: description,
    	type: type$7,
    	required: required,
    	properties: properties$7,
    	additionalProperties: additionalProperties
    };

    var $dataRefSchema = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $id: $id$7,
        description: description,
        type: type$7,
        required: required,
        properties: properties$7,
        additionalProperties: additionalProperties,
        'default': data
    });

    const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    const EXT_SCOPE_NAMES = new Set([
        "validate",
        "serialize",
        "parse",
        "wrapper",
        "root",
        "schema",
        "keyword",
        "pattern",
        "formats",
        "validate$data",
        "func",
        "obj",
        "Error",
    ]);
    const removedOptions = {
        errorDataPath: "",
        format: "`validateFormats: false` can be used instead.",
        nullable: '"nullable" keyword is supported by default.',
        jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
        extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
        missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
        processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
        sourceCode: "Use option `code: {source: true}`",
        schemaId: "JSON Schema draft-04 is not supported in Ajv v7/8.",
        strictDefaults: "It is default now, see option `strict`.",
        strictKeywords: "It is default now, see option `strict`.",
        uniqueItems: '"uniqueItems" keyword is always validated.',
        unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
        cache: "Map is used as cache, schema object as key.",
        serialize: "Map is used as cache, schema object as key.",
        ajvErrors: "It is default now.",
    };
    const deprecatedOptions = {
        ignoreKeywordsWithRef: "",
        jsPropertySyntax: "",
        unicode: '"minLength"/"maxLength" account for unicode characters by default.',
    };
    const MAX_EXPRESSION = 200;
    // eslint-disable-next-line complexity
    function requiredOptions(o) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const s = o.strict;
        const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
        const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
        return {
            strictSchema: (_c = (_b = o.strictSchema) !== null && _b !== void 0 ? _b : s) !== null && _c !== void 0 ? _c : true,
            strictNumbers: (_e = (_d = o.strictNumbers) !== null && _d !== void 0 ? _d : s) !== null && _e !== void 0 ? _e : true,
            strictTypes: (_g = (_f = o.strictTypes) !== null && _f !== void 0 ? _f : s) !== null && _g !== void 0 ? _g : "log",
            strictTuples: (_j = (_h = o.strictTuples) !== null && _h !== void 0 ? _h : s) !== null && _j !== void 0 ? _j : "log",
            strictRequired: (_l = (_k = o.strictRequired) !== null && _k !== void 0 ? _k : s) !== null && _l !== void 0 ? _l : false,
            code: o.code ? { ...o.code, optimize } : { optimize },
            loopRequired: (_m = o.loopRequired) !== null && _m !== void 0 ? _m : MAX_EXPRESSION,
            loopEnum: (_o = o.loopEnum) !== null && _o !== void 0 ? _o : MAX_EXPRESSION,
            meta: (_p = o.meta) !== null && _p !== void 0 ? _p : true,
            messages: (_q = o.messages) !== null && _q !== void 0 ? _q : true,
            inlineRefs: (_r = o.inlineRefs) !== null && _r !== void 0 ? _r : true,
            addUsedSchema: (_s = o.addUsedSchema) !== null && _s !== void 0 ? _s : true,
            validateSchema: (_t = o.validateSchema) !== null && _t !== void 0 ? _t : true,
            validateFormats: (_u = o.validateFormats) !== null && _u !== void 0 ? _u : true,
            unicodeRegExp: (_v = o.unicodeRegExp) !== null && _v !== void 0 ? _v : true,
        };
    }
    class Ajv {
        constructor(opts = {}) {
            this.schemas = {};
            this.refs = {};
            this.formats = {};
            this._compilations = new Set();
            this._loading = {};
            this._cache = new Map();
            opts = this.opts = { ...opts, ...requiredOptions(opts) };
            const { es5, lines } = this.opts.code;
            this.scope = new ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
            this.logger = getLogger(opts.logger);
            const formatOpt = opts.validateFormats;
            opts.validateFormats = false;
            this.RULES = getRules();
            checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
            checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
            this._metaOpts = getMetaSchemaOptions.call(this);
            if (opts.formats)
                addInitialFormats.call(this);
            this._addVocabularies();
            this._addDefaultMetaSchema();
            if (opts.keywords)
                addInitialKeywords.call(this, opts.keywords);
            if (typeof opts.meta == "object")
                this.addMetaSchema(opts.meta);
            addInitialSchemas.call(this);
            opts.validateFormats = formatOpt;
        }
        _addVocabularies() {
            this.addKeyword("$async");
        }
        _addDefaultMetaSchema() {
            const { $data, meta } = this.opts;
            if (meta && $data)
                this.addMetaSchema($dataRefSchema, $id$7, false);
        }
        defaultMeta() {
            const { meta } = this.opts;
            return (this.opts.defaultMeta = typeof meta == "object" ? meta.$id || meta : undefined);
        }
        validate(schemaKeyRef, // key, ref or schema object
        data // to be validated
        ) {
            let v;
            if (typeof schemaKeyRef == "string") {
                v = this.getSchema(schemaKeyRef);
                if (!v)
                    throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
            }
            else {
                v = this.compile(schemaKeyRef);
            }
            const valid = v(data);
            if (!("$async" in v))
                this.errors = v.errors;
            return valid;
        }
        compile(schema, _meta) {
            const sch = this._addSchema(schema, _meta);
            return (sch.validate || this._compileSchemaEnv(sch));
        }
        compileAsync(schema, meta) {
            if (typeof this.opts.loadSchema != "function") {
                throw new Error("options.loadSchema should be a function");
            }
            const { loadSchema } = this.opts;
            return runCompileAsync.call(this, schema, meta);
            async function runCompileAsync(_schema, _meta) {
                await loadMetaSchema.call(this, _schema.$schema);
                const sch = this._addSchema(_schema, _meta);
                return sch.validate || _compileAsync.call(this, sch);
            }
            async function loadMetaSchema($ref) {
                if ($ref && !this.getSchema($ref)) {
                    await runCompileAsync.call(this, { $ref }, true);
                }
            }
            async function _compileAsync(sch) {
                try {
                    return this._compileSchemaEnv(sch);
                }
                catch (e) {
                    if (!(e instanceof MissingRefError))
                        throw e;
                    checkLoaded.call(this, e);
                    await loadMissingSchema.call(this, e.missingSchema);
                    return _compileAsync.call(this, sch);
                }
            }
            function checkLoaded({ missingSchema: ref, missingRef }) {
                if (this.refs[ref]) {
                    throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
                }
            }
            async function loadMissingSchema(ref) {
                const _schema = await _loadSchema.call(this, ref);
                if (!this.refs[ref])
                    await loadMetaSchema.call(this, _schema.$schema);
                if (!this.refs[ref])
                    this.addSchema(_schema, ref, meta);
            }
            async function _loadSchema(ref) {
                const p = this._loading[ref];
                if (p)
                    return p;
                try {
                    return await (this._loading[ref] = loadSchema(ref));
                }
                finally {
                    delete this._loading[ref];
                }
            }
        }
        // Adds schema to the instance
        addSchema(schema, // If array is passed, `key` will be ignored
        key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
        _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
        _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
        ) {
            if (Array.isArray(schema)) {
                for (const sch of schema)
                    this.addSchema(sch, undefined, _meta, _validateSchema);
                return this;
            }
            let id;
            if (typeof schema === "object") {
                id = schema.$id;
                if (id !== undefined && typeof id != "string")
                    throw new Error("schema $id must be string");
            }
            key = normalizeId(key || id);
            this._checkUnique(key);
            this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
            return this;
        }
        // Add schema that will be used to validate other schemas
        // options in META_IGNORE_OPTIONS are alway set to false
        addMetaSchema(schema, key, // schema key
        _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
        ) {
            this.addSchema(schema, key, true, _validateSchema);
            return this;
        }
        //  Validate schema against its meta-schema
        validateSchema(schema, throwOrLogError) {
            if (typeof schema == "boolean")
                return true;
            let $schema;
            $schema = schema.$schema;
            if ($schema !== undefined && typeof $schema != "string") {
                throw new Error("$schema must be a string");
            }
            $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
            if (!$schema) {
                this.logger.warn("meta-schema not available");
                this.errors = null;
                return true;
            }
            const valid = this.validate($schema, schema);
            if (!valid && throwOrLogError) {
                const message = "schema is invalid: " + this.errorsText();
                if (this.opts.validateSchema === "log")
                    this.logger.error(message);
                else
                    throw new Error(message);
            }
            return valid;
        }
        // Get compiled schema by `key` or `ref`.
        // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
        getSchema(keyRef) {
            let sch;
            while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
                keyRef = sch;
            if (sch === undefined) {
                const root = new SchemaEnv({ schema: {} });
                sch = resolveSchema.call(this, root, keyRef);
                if (!sch)
                    return;
                this.refs[keyRef] = sch;
            }
            return (sch.validate || this._compileSchemaEnv(sch));
        }
        // Remove cached schema(s).
        // If no parameter is passed all schemas but meta-schemas are removed.
        // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
        // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
        removeSchema(schemaKeyRef) {
            if (schemaKeyRef instanceof RegExp) {
                this._removeAllSchemas(this.schemas, schemaKeyRef);
                this._removeAllSchemas(this.refs, schemaKeyRef);
                return this;
            }
            switch (typeof schemaKeyRef) {
                case "undefined":
                    this._removeAllSchemas(this.schemas);
                    this._removeAllSchemas(this.refs);
                    this._cache.clear();
                    return this;
                case "string": {
                    const sch = getSchEnv.call(this, schemaKeyRef);
                    if (typeof sch == "object")
                        this._cache.delete(sch.schema);
                    delete this.schemas[schemaKeyRef];
                    delete this.refs[schemaKeyRef];
                    return this;
                }
                case "object": {
                    const cacheKey = schemaKeyRef;
                    this._cache.delete(cacheKey);
                    let id = schemaKeyRef.$id;
                    if (id) {
                        id = normalizeId(id);
                        delete this.schemas[id];
                        delete this.refs[id];
                    }
                    return this;
                }
                default:
                    throw new Error("ajv.removeSchema: invalid parameter");
            }
        }
        // add "vocabulary" - a collection of keywords
        addVocabulary(definitions) {
            for (const def of definitions)
                this.addKeyword(def);
            return this;
        }
        addKeyword(kwdOrDef, def // deprecated
        ) {
            let keyword;
            if (typeof kwdOrDef == "string") {
                keyword = kwdOrDef;
                if (typeof def == "object") {
                    this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                    def.keyword = keyword;
                }
            }
            else if (typeof kwdOrDef == "object" && def === undefined) {
                def = kwdOrDef;
                keyword = def.keyword;
                if (Array.isArray(keyword) && !keyword.length) {
                    throw new Error("addKeywords: keyword must be string or non-empty array");
                }
            }
            else {
                throw new Error("invalid addKeywords parameters");
            }
            checkKeyword.call(this, keyword, def);
            if (!def) {
                eachItem(keyword, (kwd) => addRule.call(this, kwd));
                return this;
            }
            keywordMetaschema.call(this, def);
            const definition = {
                ...def,
                type: getJSONTypes(def.type),
                schemaType: getJSONTypes(def.schemaType),
            };
            eachItem(keyword, definition.type.length === 0
                ? (k) => addRule.call(this, k, definition)
                : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
            return this;
        }
        getKeyword(keyword) {
            const rule = this.RULES.all[keyword];
            return typeof rule == "object" ? rule.definition : !!rule;
        }
        // Remove keyword
        removeKeyword(keyword) {
            // TODO return type should be Ajv
            const { RULES } = this;
            delete RULES.keywords[keyword];
            delete RULES.all[keyword];
            for (const group of RULES.rules) {
                const i = group.rules.findIndex((rule) => rule.keyword === keyword);
                if (i >= 0)
                    group.rules.splice(i, 1);
            }
            return this;
        }
        // Add format
        addFormat(name, format) {
            if (typeof format == "string")
                format = new RegExp(format);
            this.formats[name] = format;
            return this;
        }
        errorsText(errors = this.errors, // optional array of validation errors
        { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
        ) {
            if (!errors || errors.length === 0)
                return "No errors";
            return errors
                .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
                .reduce((text, msg) => text + separator + msg);
        }
        $dataMetaSchema(metaSchema, keywordsJsonPointers) {
            const rules = this.RULES.all;
            metaSchema = JSON.parse(JSON.stringify(metaSchema));
            for (const jsonPointer of keywordsJsonPointers) {
                const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
                let keywords = metaSchema;
                for (const seg of segments)
                    keywords = keywords[seg];
                for (const key in rules) {
                    const rule = rules[key];
                    if (typeof rule != "object")
                        continue;
                    const { $data } = rule.definition;
                    const schema = keywords[key];
                    if ($data && schema)
                        keywords[key] = schemaOrData(schema);
                }
            }
            return metaSchema;
        }
        _removeAllSchemas(schemas, regex) {
            for (const keyRef in schemas) {
                const sch = schemas[keyRef];
                if (!regex || regex.test(keyRef)) {
                    if (typeof sch == "string") {
                        delete schemas[keyRef];
                    }
                    else if (sch && !sch.meta) {
                        this._cache.delete(sch.schema);
                        delete schemas[keyRef];
                    }
                }
            }
        }
        _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
            let id;
            if (typeof schema == "object") {
                id = schema.$id;
            }
            else {
                if (this.opts.jtd)
                    throw new Error("schema must be object");
                else if (typeof schema != "boolean")
                    throw new Error("schema must be object or boolean");
            }
            let sch = this._cache.get(schema);
            if (sch !== undefined)
                return sch;
            const localRefs = getSchemaRefs.call(this, schema);
            baseId = normalizeId(id || baseId);
            sch = new SchemaEnv({ schema, meta, baseId, localRefs });
            this._cache.set(sch.schema, sch);
            if (addSchema && !baseId.startsWith("#")) {
                // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
                if (baseId)
                    this._checkUnique(baseId);
                this.refs[baseId] = sch;
            }
            if (validateSchema)
                this.validateSchema(schema, true);
            return sch;
        }
        _checkUnique(id) {
            if (this.schemas[id] || this.refs[id]) {
                throw new Error(`schema with key or id "${id}" already exists`);
            }
        }
        _compileSchemaEnv(sch) {
            if (sch.meta)
                this._compileMetaSchema(sch);
            else
                compileSchema.call(this, sch);
            /* istanbul ignore if */
            if (!sch.validate)
                throw new Error("ajv implementation error");
            return sch.validate;
        }
        _compileMetaSchema(sch) {
            const currentOpts = this.opts;
            this.opts = this._metaOpts;
            try {
                compileSchema.call(this, sch);
            }
            finally {
                this.opts = currentOpts;
            }
        }
    }
    Ajv.ValidationError = ValidationError;
    Ajv.MissingRefError = MissingRefError;
    function checkOptions(checkOpts, options, msg, log = "error") {
        for (const key in checkOpts) {
            const opt = key;
            if (opt in options)
                this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
        }
    }
    function getSchEnv(keyRef) {
        keyRef = normalizeId(keyRef); // TODO tests fail without this line
        return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
        const optsSchemas = this.opts.schemas;
        if (!optsSchemas)
            return;
        if (Array.isArray(optsSchemas))
            this.addSchema(optsSchemas);
        else
            for (const key in optsSchemas)
                this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
        for (const name in this.opts.formats) {
            const format = this.opts.formats[name];
            if (format)
                this.addFormat(name, format);
        }
    }
    function addInitialKeywords(defs) {
        if (Array.isArray(defs)) {
            this.addVocabulary(defs);
            return;
        }
        this.logger.warn("keywords option as map is deprecated, pass array");
        for (const keyword in defs) {
            const def = defs[keyword];
            if (!def.keyword)
                def.keyword = keyword;
            this.addKeyword(def);
        }
    }
    function getMetaSchemaOptions() {
        const metaOpts = { ...this.opts };
        for (const opt of META_IGNORE_OPTIONS)
            delete metaOpts[opt];
        return metaOpts;
    }
    const noLogs = { log() { }, warn() { }, error() { } };
    function getLogger(logger) {
        if (logger === false)
            return noLogs;
        if (logger === undefined)
            return console;
        if (logger.log && logger.warn && logger.error)
            return logger;
        throw new Error("logger must implement log, warn and error methods");
    }
    const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
        const { RULES } = this;
        eachItem(keyword, (kwd) => {
            if (RULES.keywords[kwd])
                throw new Error(`Keyword ${kwd} is already defined`);
            if (!KEYWORD_NAME.test(kwd))
                throw new Error(`Keyword ${kwd} has invalid name`);
        });
        if (!def)
            return;
        if (def.$data && !("code" in def || "validate" in def)) {
            throw new Error('$data keyword must have "code" or "validate" function');
        }
    }
    function addRule(keyword, definition, dataType) {
        var _a;
        const post = definition === null || definition === void 0 ? void 0 : definition.post;
        if (dataType && post)
            throw new Error('keyword with "post" flag cannot have "type"');
        const { RULES } = this;
        let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
        if (!ruleGroup) {
            ruleGroup = { type: dataType, rules: [] };
            RULES.rules.push(ruleGroup);
        }
        RULES.keywords[keyword] = true;
        if (!definition)
            return;
        const rule = {
            keyword,
            definition: {
                ...definition,
                type: getJSONTypes(definition.type),
                schemaType: getJSONTypes(definition.schemaType),
            },
        };
        if (definition.before)
            addBeforeRule.call(this, ruleGroup, rule, definition.before);
        else
            ruleGroup.rules.push(rule);
        RULES.all[keyword] = rule;
        (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
        const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
        if (i >= 0) {
            ruleGroup.rules.splice(i, 0, rule);
        }
        else {
            ruleGroup.rules.push(rule);
            this.logger.warn(`rule ${before} is not defined`);
        }
    }
    function keywordMetaschema(def) {
        let { metaSchema } = def;
        if (metaSchema === undefined)
            return;
        if (def.$data && this.opts.$data)
            metaSchema = schemaOrData(metaSchema);
        def.validateSchema = this.compile(metaSchema, true);
    }
    const $dataRef = {
        $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
    };
    function schemaOrData(schema) {
        return { anyOf: [schema, $dataRef] };
    }

    const def$C = {
        keyword: "id",
        code() {
            throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
        },
    };

    const def$B = {
        keyword: "$ref",
        schemaType: "string",
        code(cxt) {
            const { gen, schema: $ref, it } = cxt;
            const { baseId, schemaEnv: env, validateName, opts, self } = it;
            const { root } = env;
            if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
                return callRootRef();
            const schOrEnv = resolveRef.call(self, root, baseId, $ref);
            if (schOrEnv === undefined)
                throw new MissingRefError(baseId, $ref);
            if (schOrEnv instanceof SchemaEnv)
                return callValidate(schOrEnv);
            return inlineRefSchema(schOrEnv);
            function callRootRef() {
                if (env === root)
                    return callRef(cxt, validateName, env, env.$async);
                const rootName = gen.scopeValue("root", { ref: root });
                return callRef(cxt, _ `${rootName}.validate`, root, root.$async);
            }
            function callValidate(sch) {
                const v = getValidate(cxt, sch);
                callRef(cxt, v, sch, sch.$async);
            }
            function inlineRefSchema(sch) {
                const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: stringify(sch) } : { ref: sch });
                const valid = gen.name("valid");
                const schCxt = cxt.subschema({
                    schema: sch,
                    dataTypes: [],
                    schemaPath: nil,
                    topSchemaRef: schName,
                    errSchemaPath: $ref,
                }, valid);
                cxt.mergeEvaluated(schCxt);
                cxt.ok(valid);
            }
        },
    };
    function getValidate(cxt, sch) {
        const { gen } = cxt;
        return sch.validate
            ? gen.scopeValue("validate", { ref: sch.validate })
            : _ `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    function callRef(cxt, v, sch, $async) {
        const { gen, it } = cxt;
        const { allErrors, schemaEnv: env, opts } = it;
        const passCxt = opts.passContext ? names.this : nil;
        if ($async)
            callAsyncRef();
        else
            callSyncRef();
        function callAsyncRef() {
            if (!env.$async)
                throw new Error("async schema referenced by sync schema");
            const valid = gen.let("valid");
            gen.try(() => {
                gen.code(_ `await ${callValidateCode(cxt, v, passCxt)}`);
                addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
                if (!allErrors)
                    gen.assign(valid, true);
            }, (e) => {
                gen.if(_ `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
                addErrorsFrom(e);
                if (!allErrors)
                    gen.assign(valid, false);
            });
            cxt.ok(valid);
        }
        function callSyncRef() {
            cxt.result(callValidateCode(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
        }
        function addErrorsFrom(source) {
            const errs = _ `${source}.errors`;
            gen.assign(names.vErrors, _ `${names.vErrors} === null ? ${errs} : ${names.vErrors}.concat(${errs})`); // TODO tagged
            gen.assign(names.errors, _ `${names.vErrors}.length`);
        }
        function addEvaluatedFrom(source) {
            var _a;
            if (!it.opts.unevaluated)
                return;
            const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
            // TODO refactor
            if (it.props !== true) {
                if (schEvaluated && !schEvaluated.dynamicProps) {
                    if (schEvaluated.props !== undefined) {
                        it.props = mergeEvaluated.props(gen, schEvaluated.props, it.props);
                    }
                }
                else {
                    const props = gen.var("props", _ `${source}.evaluated.props`);
                    it.props = mergeEvaluated.props(gen, props, it.props, Name);
                }
            }
            if (it.items !== true) {
                if (schEvaluated && !schEvaluated.dynamicItems) {
                    if (schEvaluated.items !== undefined) {
                        it.items = mergeEvaluated.items(gen, schEvaluated.items, it.items);
                    }
                }
                else {
                    const items = gen.var("items", _ `${source}.evaluated.items`);
                    it.items = mergeEvaluated.items(gen, items, it.items, Name);
                }
            }
        }
    }

    const core$2 = [
        "$schema",
        "$id",
        "$defs",
        "$vocabulary",
        { keyword: "$comment" },
        "definitions",
        def$C,
        def$B,
    ];

    const ops = operators;
    const KWDs = {
        maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
        minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
        exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
        exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
    };
    const error$l = {
        message: ({ keyword, schemaCode }) => str `must be ${KWDs[keyword].okStr} ${schemaCode}`,
        params: ({ keyword, schemaCode }) => _ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
    };
    const def$A = {
        keyword: Object.keys(KWDs),
        type: "number",
        schemaType: "number",
        $data: true,
        error: error$l,
        code(cxt) {
            const { keyword, data, schemaCode } = cxt;
            cxt.fail$data(_ `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
        },
    };

    const error$k = {
        message: ({ schemaCode }) => str `must be multiple of ${schemaCode}`,
        params: ({ schemaCode }) => _ `{multipleOf: ${schemaCode}}`,
    };
    const def$z = {
        keyword: "multipleOf",
        type: "number",
        schemaType: "number",
        $data: true,
        error: error$k,
        code(cxt) {
            const { gen, data, schemaCode, it } = cxt;
            // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
            const prec = it.opts.multipleOfPrecision;
            const res = gen.let("res");
            const invalid = prec
                ? _ `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
                : _ `${res} !== parseInt(${res})`;
            cxt.fail$data(_ `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
        },
    };

    // https://mathiasbynens.be/notes/javascript-encoding
    // https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
    function ucs2length(str) {
        const len = str.length;
        let length = 0;
        let pos = 0;
        let value;
        while (pos < len) {
            length++;
            value = str.charCodeAt(pos++);
            if (value >= 0xd800 && value <= 0xdbff && pos < len) {
                // high surrogate, and there is a next character
                value = str.charCodeAt(pos);
                if ((value & 0xfc00) === 0xdc00)
                    pos++; // low surrogate
            }
        }
        return length;
    }
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';

    const error$j = {
        message({ keyword, schemaCode }) {
            const comp = keyword === "maxLength" ? "more" : "fewer";
            return str `must NOT have ${comp} than ${schemaCode} characters`;
        },
        params: ({ schemaCode }) => _ `{limit: ${schemaCode}}`,
    };
    const def$y = {
        keyword: ["maxLength", "minLength"],
        type: "string",
        schemaType: "number",
        $data: true,
        error: error$j,
        code(cxt) {
            const { keyword, data, schemaCode, it } = cxt;
            const op = keyword === "maxLength" ? operators.GT : operators.LT;
            const len = it.opts.unicode === false ? _ `${data}.length` : _ `${useFunc(cxt.gen, ucs2length)}(${data})`;
            cxt.fail$data(_ `${len} ${op} ${schemaCode}`);
        },
    };

    const error$i = {
        message: ({ schemaCode }) => str `must match pattern "${schemaCode}"`,
        params: ({ schemaCode }) => _ `{pattern: ${schemaCode}}`,
    };
    const def$x = {
        keyword: "pattern",
        type: "string",
        schemaType: "string",
        $data: true,
        error: error$i,
        code(cxt) {
            const { data, $data, schema, schemaCode, it } = cxt;
            // TODO regexp should be wrapped in try/catchs
            const u = it.opts.unicodeRegExp ? "u" : "";
            const regExp = $data ? _ `(new RegExp(${schemaCode}, ${u}))` : usePattern(cxt, schema);
            cxt.fail$data(_ `!${regExp}.test(${data})`);
        },
    };

    const error$h = {
        message({ keyword, schemaCode }) {
            const comp = keyword === "maxProperties" ? "more" : "fewer";
            return str `must NOT have ${comp} than ${schemaCode} items`;
        },
        params: ({ schemaCode }) => _ `{limit: ${schemaCode}}`,
    };
    const def$w = {
        keyword: ["maxProperties", "minProperties"],
        type: "object",
        schemaType: "number",
        $data: true,
        error: error$h,
        code(cxt) {
            const { keyword, data, schemaCode } = cxt;
            const op = keyword === "maxProperties" ? operators.GT : operators.LT;
            cxt.fail$data(_ `Object.keys(${data}).length ${op} ${schemaCode}`);
        },
    };

    const error$g = {
        message: ({ params: { missingProperty } }) => str `must have required property '${missingProperty}'`,
        params: ({ params: { missingProperty } }) => _ `{missingProperty: ${missingProperty}}`,
    };
    const def$v = {
        keyword: "required",
        type: "object",
        schemaType: "array",
        $data: true,
        error: error$g,
        code(cxt) {
            const { gen, schema, schemaCode, data, $data, it } = cxt;
            const { opts } = it;
            if (!$data && schema.length === 0)
                return;
            const useLoop = schema.length >= opts.loopRequired;
            if (it.allErrors)
                allErrorsMode();
            else
                exitOnErrorMode();
            if (opts.strictRequired) {
                const props = cxt.parentSchema.properties;
                const { definedProperties } = cxt.it;
                for (const requiredKey of schema) {
                    if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                        const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                        const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                        checkStrictMode(it, msg, it.opts.strictRequired);
                    }
                }
            }
            function allErrorsMode() {
                if (useLoop || $data) {
                    cxt.block$data(nil, loopAllRequired);
                }
                else {
                    for (const prop of schema) {
                        checkReportMissingProp(cxt, prop);
                    }
                }
            }
            function exitOnErrorMode() {
                const missing = gen.let("missing");
                if (useLoop || $data) {
                    const valid = gen.let("valid", true);
                    cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                    cxt.ok(valid);
                }
                else {
                    gen.if(checkMissingProp(cxt, schema, missing));
                    reportMissingProp(cxt, missing);
                    gen.else();
                }
            }
            function loopAllRequired() {
                gen.forOf("prop", schemaCode, (prop) => {
                    cxt.setParams({ missingProperty: prop });
                    gen.if(noPropertyInData(gen, data, prop, opts.ownProperties), () => cxt.error());
                });
            }
            function loopUntilMissing(missing, valid) {
                cxt.setParams({ missingProperty: missing });
                gen.forOf(missing, schemaCode, () => {
                    gen.assign(valid, propertyInData(gen, data, missing, opts.ownProperties));
                    gen.if(not(valid), () => {
                        cxt.error();
                        gen.break();
                    });
                }, nil);
            }
        },
    };

    const error$f = {
        message({ keyword, schemaCode }) {
            const comp = keyword === "maxItems" ? "more" : "fewer";
            return str `must NOT have ${comp} than ${schemaCode} items`;
        },
        params: ({ schemaCode }) => _ `{limit: ${schemaCode}}`,
    };
    const def$u = {
        keyword: ["maxItems", "minItems"],
        type: "array",
        schemaType: "number",
        $data: true,
        error: error$f,
        code(cxt) {
            const { keyword, data, schemaCode } = cxt;
            const op = keyword === "maxItems" ? operators.GT : operators.LT;
            cxt.fail$data(_ `${data}.length ${op} ${schemaCode}`);
        },
    };

    // https://github.com/ajv-validator/ajv/issues/889
    fastDeepEqual.code = 'require("ajv/dist/runtime/equal").default';

    const error$e = {
        message: ({ params: { i, j } }) => str `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
        params: ({ params: { i, j } }) => _ `{i: ${i}, j: ${j}}`,
    };
    const def$t = {
        keyword: "uniqueItems",
        type: "array",
        schemaType: "boolean",
        $data: true,
        error: error$e,
        code(cxt) {
            const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
            if (!$data && !schema)
                return;
            const valid = gen.let("valid");
            const itemTypes = parentSchema.items ? getSchemaTypes(parentSchema.items) : [];
            cxt.block$data(valid, validateUniqueItems, _ `${schemaCode} === false`);
            cxt.ok(valid);
            function validateUniqueItems() {
                const i = gen.let("i", _ `${data}.length`);
                const j = gen.let("j");
                cxt.setParams({ i, j });
                gen.assign(valid, true);
                gen.if(_ `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
            }
            function canOptimize() {
                return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
            }
            function loopN(i, j) {
                const item = gen.name("item");
                const wrongType = checkDataTypes(itemTypes, item, it.opts.strictNumbers, DataType.Wrong);
                const indices = gen.const("indices", _ `{}`);
                gen.for(_ `;${i}--;`, () => {
                    gen.let(item, _ `${data}[${i}]`);
                    gen.if(wrongType, _ `continue`);
                    if (itemTypes.length > 1)
                        gen.if(_ `typeof ${item} == "string"`, _ `${item} += "_"`);
                    gen
                        .if(_ `typeof ${indices}[${item}] == "number"`, () => {
                        gen.assign(j, _ `${indices}[${item}]`);
                        cxt.error();
                        gen.assign(valid, false).break();
                    })
                        .code(_ `${indices}[${item}] = ${i}`);
                });
            }
            function loopN2(i, j) {
                const eql = useFunc(gen, equal);
                const outer = gen.name("outer");
                gen.label(outer).for(_ `;${i}--;`, () => gen.for(_ `${j} = ${i}; ${j}--;`, () => gen.if(_ `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                    cxt.error();
                    gen.assign(valid, false).break(outer);
                })));
            }
        },
    };

    const error$d = {
        message: "must be equal to constant",
        params: ({ schemaCode }) => _ `{allowedValue: ${schemaCode}}`,
    };
    const def$s = {
        keyword: "const",
        $data: true,
        error: error$d,
        code(cxt) {
            const { gen, data, schemaCode } = cxt;
            // TODO optimize for scalar values in schema
            cxt.fail$data(_ `!${useFunc(gen, equal)}(${data}, ${schemaCode})`);
        },
    };

    const error$c = {
        message: "must be equal to one of the allowed values",
        params: ({ schemaCode }) => _ `{allowedValues: ${schemaCode}}`,
    };
    const def$r = {
        keyword: "enum",
        schemaType: "array",
        $data: true,
        error: error$c,
        code(cxt) {
            const { gen, data, $data, schema, schemaCode, it } = cxt;
            if (!$data && schema.length === 0)
                throw new Error("enum must have non-empty array");
            const useLoop = schema.length >= it.opts.loopEnum;
            const eql = useFunc(gen, equal);
            let valid;
            if (useLoop || $data) {
                valid = gen.let("valid");
                cxt.block$data(valid, loopEnum);
            }
            else {
                /* istanbul ignore if */
                if (!Array.isArray(schema))
                    throw new Error("ajv implementation error");
                const vSchema = gen.const("vSchema", schemaCode);
                valid = or(...schema.map((_x, i) => equalCode(vSchema, i)));
            }
            cxt.pass(valid);
            function loopEnum() {
                gen.assign(valid, false);
                gen.forOf("v", schemaCode, (v) => gen.if(_ `${eql}(${data}, ${v})`, () => gen.assign(valid, true).break()));
            }
            function equalCode(vSchema, i) {
                const sch = schema[i];
                return sch && typeof sch === "object"
                    ? _ `${eql}(${data}, ${vSchema}[${i}])`
                    : _ `${data} === ${sch}`;
            }
        },
    };

    const validation$2 = [
        // number
        def$A,
        def$z,
        // string
        def$y,
        def$x,
        // object
        def$w,
        def$v,
        // array
        def$u,
        def$t,
        // any
        { keyword: "type", schemaType: ["string", "array"] },
        { keyword: "nullable", schemaType: "boolean" },
        def$s,
        def$r,
    ];

    const error$b = {
        message: ({ params: { len } }) => str `must NOT have more than ${len} items`,
        params: ({ params: { len } }) => _ `{limit: ${len}}`,
    };
    const def$q = {
        keyword: "additionalItems",
        type: "array",
        schemaType: ["boolean", "object"],
        before: "uniqueItems",
        error: error$b,
        code(cxt) {
            const { parentSchema, it } = cxt;
            const { items } = parentSchema;
            if (!Array.isArray(items)) {
                checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas');
                return;
            }
            validateAdditionalItems(cxt, items);
        },
    };
    function validateAdditionalItems(cxt, items) {
        const { gen, schema, data, keyword, it } = cxt;
        it.items = true;
        const len = gen.const("len", _ `${data}.length`);
        if (schema === false) {
            cxt.setParams({ len: items.length });
            cxt.pass(_ `${len} <= ${items.length}`);
        }
        else if (typeof schema == "object" && !alwaysValidSchema(it, schema)) {
            const valid = gen.var("valid", _ `${len} <= ${items.length}`); // TODO var
            gen.if(not(valid), () => validateItems(valid));
            cxt.ok(valid);
        }
        function validateItems(valid) {
            gen.forRange("i", items.length, len, (i) => {
                cxt.subschema({ keyword, dataProp: i, dataPropType: Type.Num }, valid);
                if (!it.allErrors)
                    gen.if(not(valid), () => gen.break());
            });
        }
    }

    const def$p = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "array", "boolean"],
        before: "uniqueItems",
        code(cxt) {
            const { schema, it } = cxt;
            if (Array.isArray(schema))
                return validateTuple(cxt, "additionalItems", schema);
            it.items = true;
            if (alwaysValidSchema(it, schema))
                return;
            cxt.ok(validateArray(cxt));
        },
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
        const { gen, parentSchema, data, keyword, it } = cxt;
        checkStrictTuple(parentSchema);
        if (it.opts.unevaluated && schArr.length && it.items !== true) {
            it.items = mergeEvaluated.items(gen, schArr.length, it.items);
        }
        const valid = gen.name("valid");
        const len = gen.const("len", _ `${data}.length`);
        schArr.forEach((sch, i) => {
            if (alwaysValidSchema(it, sch))
                return;
            gen.if(_ `${len} > ${i}`, () => cxt.subschema({
                keyword,
                schemaProp: i,
                dataProp: i,
            }, valid));
            cxt.ok(valid);
        });
        function checkStrictTuple(sch) {
            const { opts, errSchemaPath } = it;
            const l = schArr.length;
            const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
            if (opts.strictTuples && !fullTuple) {
                const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
                checkStrictMode(it, msg, opts.strictTuples);
            }
        }
    }

    const def$o = {
        keyword: "prefixItems",
        type: "array",
        schemaType: ["array"],
        before: "uniqueItems",
        code: (cxt) => validateTuple(cxt, "items"),
    };

    const error$a = {
        message: ({ params: { len } }) => str `must NOT have more than ${len} items`,
        params: ({ params: { len } }) => _ `{limit: ${len}}`,
    };
    const def$n = {
        keyword: "items",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        error: error$a,
        code(cxt) {
            const { schema, parentSchema, it } = cxt;
            const { prefixItems } = parentSchema;
            it.items = true;
            if (alwaysValidSchema(it, schema))
                return;
            if (prefixItems)
                validateAdditionalItems(cxt, prefixItems);
            else
                cxt.ok(validateArray(cxt));
        },
    };

    const error$9 = {
        message: ({ params: { min, max } }) => max === undefined
            ? str `must contain at least ${min} valid item(s)`
            : str `must contain at least ${min} and no more than ${max} valid item(s)`,
        params: ({ params: { min, max } }) => max === undefined ? _ `{minContains: ${min}}` : _ `{minContains: ${min}, maxContains: ${max}}`,
    };
    const def$m = {
        keyword: "contains",
        type: "array",
        schemaType: ["object", "boolean"],
        before: "uniqueItems",
        trackErrors: true,
        error: error$9,
        code(cxt) {
            const { gen, schema, parentSchema, data, it } = cxt;
            let min;
            let max;
            const { minContains, maxContains } = parentSchema;
            if (it.opts.next) {
                min = minContains === undefined ? 1 : minContains;
                max = maxContains;
            }
            else {
                min = 1;
            }
            const len = gen.const("len", _ `${data}.length`);
            cxt.setParams({ min, max });
            if (max === undefined && min === 0) {
                checkStrictMode(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
                return;
            }
            if (max !== undefined && min > max) {
                checkStrictMode(it, `"minContains" > "maxContains" is always invalid`);
                cxt.fail();
                return;
            }
            if (alwaysValidSchema(it, schema)) {
                let cond = _ `${len} >= ${min}`;
                if (max !== undefined)
                    cond = _ `${cond} && ${len} <= ${max}`;
                cxt.pass(cond);
                return;
            }
            it.items = true;
            const valid = gen.name("valid");
            if (max === undefined && min === 1) {
                validateItems(valid, () => gen.if(valid, () => gen.break()));
            }
            else {
                gen.let(valid, false);
                const schValid = gen.name("_valid");
                const count = gen.let("count", 0);
                validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
            }
            cxt.result(valid, () => cxt.reset());
            function validateItems(_valid, block) {
                gen.forRange("i", 0, len, (i) => {
                    cxt.subschema({
                        keyword: "contains",
                        dataProp: i,
                        dataPropType: Type.Num,
                        compositeRule: true,
                    }, _valid);
                    block();
                });
            }
            function checkLimits(count) {
                gen.code(_ `${count}++`);
                if (max === undefined) {
                    gen.if(_ `${count} >= ${min}`, () => gen.assign(valid, true).break());
                }
                else {
                    gen.if(_ `${count} > ${max}`, () => gen.assign(valid, false).break());
                    if (min === 1)
                        gen.assign(valid, true);
                    else
                        gen.if(_ `${count} >= ${min}`, () => gen.assign(valid, true));
                }
            }
        },
    };

    const error$8 = {
        message: ({ params: { property, depsCount, deps } }) => {
            const property_ies = depsCount === 1 ? "property" : "properties";
            return str `must have ${property_ies} ${deps} when property ${property} is present`;
        },
        params: ({ params: { property, depsCount, deps, missingProperty } }) => _ `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
    };
    const def$l = {
        keyword: "dependencies",
        type: "object",
        schemaType: "object",
        error: error$8,
        code(cxt) {
            const [propDeps, schDeps] = splitDependencies(cxt);
            validatePropertyDeps(cxt, propDeps);
            validateSchemaDeps(cxt, schDeps);
        },
    };
    function splitDependencies({ schema }) {
        const propertyDeps = {};
        const schemaDeps = {};
        for (const key in schema) {
            if (key === "__proto__")
                continue;
            const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
            deps[key] = schema[key];
        }
        return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
        const { gen, data, it } = cxt;
        if (Object.keys(propertyDeps).length === 0)
            return;
        const missing = gen.let("missing");
        for (const prop in propertyDeps) {
            const deps = propertyDeps[prop];
            if (deps.length === 0)
                continue;
            const hasProperty = propertyInData(gen, data, prop, it.opts.ownProperties);
            cxt.setParams({
                property: prop,
                depsCount: deps.length,
                deps: deps.join(", "),
            });
            if (it.allErrors) {
                gen.if(hasProperty, () => {
                    for (const depProp of deps) {
                        checkReportMissingProp(cxt, depProp);
                    }
                });
            }
            else {
                gen.if(_ `${hasProperty} && (${checkMissingProp(cxt, deps, missing)})`);
                reportMissingProp(cxt, missing);
                gen.else();
            }
        }
    }
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
        const { gen, data, keyword, it } = cxt;
        const valid = gen.name("valid");
        for (const prop in schemaDeps) {
            if (alwaysValidSchema(it, schemaDeps[prop]))
                continue;
            gen.if(propertyInData(gen, data, prop, it.opts.ownProperties), () => {
                const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
                cxt.mergeValidEvaluated(schCxt, valid);
            }, () => gen.var(valid, true) // TODO var
            );
            cxt.ok(valid);
        }
    }

    const error$7 = {
        message: "property name must be valid",
        params: ({ params }) => _ `{propertyName: ${params.propertyName}}`,
    };
    const def$k = {
        keyword: "propertyNames",
        type: "object",
        schemaType: ["object", "boolean"],
        error: error$7,
        code(cxt) {
            const { gen, schema, data, it } = cxt;
            if (alwaysValidSchema(it, schema))
                return;
            const valid = gen.name("valid");
            gen.forIn("key", data, (key) => {
                cxt.setParams({ propertyName: key });
                cxt.subschema({
                    keyword: "propertyNames",
                    data: key,
                    dataTypes: ["string"],
                    propertyName: key,
                    compositeRule: true,
                }, valid);
                gen.if(not(valid), () => {
                    cxt.error(true);
                    if (!it.allErrors)
                        gen.break();
                });
            });
            cxt.ok(valid);
        },
    };

    const error$6 = {
        message: "must NOT have additional properties",
        params: ({ params }) => _ `{additionalProperty: ${params.additionalProperty}}`,
    };
    const def$j = {
        keyword: "additionalProperties",
        type: ["object"],
        schemaType: ["boolean", "object"],
        allowUndefined: true,
        trackErrors: true,
        error: error$6,
        code(cxt) {
            const { gen, schema, parentSchema, data, errsCount, it } = cxt;
            /* istanbul ignore if */
            if (!errsCount)
                throw new Error("ajv implementation error");
            const { allErrors, opts } = it;
            it.props = true;
            if (opts.removeAdditional !== "all" && alwaysValidSchema(it, schema))
                return;
            const props = allSchemaProperties(parentSchema.properties);
            const patProps = allSchemaProperties(parentSchema.patternProperties);
            checkAdditionalProperties();
            cxt.ok(_ `${errsCount} === ${names.errors}`);
            function checkAdditionalProperties() {
                gen.forIn("key", data, (key) => {
                    if (!props.length && !patProps.length)
                        additionalPropertyCode(key);
                    else
                        gen.if(isAdditional(key), () => additionalPropertyCode(key));
                });
            }
            function isAdditional(key) {
                let definedProp;
                if (props.length > 8) {
                    // TODO maybe an option instead of hard-coded 8?
                    const propsSchema = schemaRefOrVal(it, parentSchema.properties, "properties");
                    definedProp = isOwnProperty(gen, propsSchema, key);
                }
                else if (props.length) {
                    definedProp = or(...props.map((p) => _ `${key} === ${p}`));
                }
                else {
                    definedProp = nil;
                }
                if (patProps.length) {
                    definedProp = or(definedProp, ...patProps.map((p) => _ `${usePattern(cxt, p)}.test(${key})`));
                }
                return not(definedProp);
            }
            function deleteAdditional(key) {
                gen.code(_ `delete ${data}[${key}]`);
            }
            function additionalPropertyCode(key) {
                if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                    deleteAdditional(key);
                    return;
                }
                if (schema === false) {
                    cxt.setParams({ additionalProperty: key });
                    cxt.error();
                    if (!allErrors)
                        gen.break();
                    return;
                }
                if (typeof schema == "object" && !alwaysValidSchema(it, schema)) {
                    const valid = gen.name("valid");
                    if (opts.removeAdditional === "failing") {
                        applyAdditionalSchema(key, valid, false);
                        gen.if(not(valid), () => {
                            cxt.reset();
                            deleteAdditional(key);
                        });
                    }
                    else {
                        applyAdditionalSchema(key, valid);
                        if (!allErrors)
                            gen.if(not(valid), () => gen.break());
                    }
                }
            }
            function applyAdditionalSchema(key, valid, errors) {
                const subschema = {
                    keyword: "additionalProperties",
                    dataProp: key,
                    dataPropType: Type.Str,
                };
                if (errors === false) {
                    Object.assign(subschema, {
                        compositeRule: true,
                        createErrors: false,
                        allErrors: false,
                    });
                }
                cxt.subschema(subschema, valid);
            }
        },
    };

    const def$i = {
        keyword: "properties",
        type: "object",
        schemaType: "object",
        code(cxt) {
            const { gen, schema, parentSchema, data, it } = cxt;
            if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
                def$j.code(new KeywordCxt(it, def$j, "additionalProperties"));
            }
            const allProps = allSchemaProperties(schema);
            for (const prop of allProps) {
                it.definedProperties.add(prop);
            }
            if (it.opts.unevaluated && allProps.length && it.props !== true) {
                it.props = mergeEvaluated.props(gen, toHash(allProps), it.props);
            }
            const properties = allProps.filter((p) => !alwaysValidSchema(it, schema[p]));
            if (properties.length === 0)
                return;
            const valid = gen.name("valid");
            for (const prop of properties) {
                if (hasDefault(prop)) {
                    applyPropertySchema(prop);
                }
                else {
                    gen.if(propertyInData(gen, data, prop, it.opts.ownProperties));
                    applyPropertySchema(prop);
                    if (!it.allErrors)
                        gen.else().var(valid, true);
                    gen.endIf();
                }
                cxt.it.definedProperties.add(prop);
                cxt.ok(valid);
            }
            function hasDefault(prop) {
                return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
            }
            function applyPropertySchema(prop) {
                cxt.subschema({
                    keyword: "properties",
                    schemaProp: prop,
                    dataProp: prop,
                }, valid);
            }
        },
    };

    const def$h = {
        keyword: "patternProperties",
        type: "object",
        schemaType: "object",
        code(cxt) {
            const { gen, schema, data, parentSchema, it } = cxt;
            const { opts } = it;
            const patterns = schemaProperties(it, schema);
            // TODO mark properties matching patterns with always valid schemas as evaluated
            if (patterns.length === 0)
                return;
            const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
            const valid = gen.name("valid");
            if (it.props !== true && !(it.props instanceof Name)) {
                it.props = evaluatedPropsToName(gen, it.props);
            }
            const { props } = it;
            validatePatternProperties();
            function validatePatternProperties() {
                for (const pat of patterns) {
                    if (checkProperties)
                        checkMatchingProperties(pat);
                    if (it.allErrors) {
                        validateProperties(pat);
                    }
                    else {
                        gen.var(valid, true); // TODO var
                        validateProperties(pat);
                        gen.if(valid);
                    }
                }
            }
            function checkMatchingProperties(pat) {
                for (const prop in checkProperties) {
                    if (new RegExp(pat).test(prop)) {
                        checkStrictMode(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                    }
                }
            }
            function validateProperties(pat) {
                gen.forIn("key", data, (key) => {
                    gen.if(_ `${usePattern(cxt, pat)}.test(${key})`, () => {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: Type.Str,
                        }, valid);
                        if (it.opts.unevaluated && props !== true) {
                            gen.assign(_ `${props}[${key}]`, true);
                        }
                        else if (!it.allErrors) {
                            // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                            // or if all properties were evaluated (props === true)
                            gen.if(not(valid), () => gen.break());
                        }
                    });
                });
            }
        },
    };

    const def$g = {
        keyword: "not",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        code(cxt) {
            const { gen, schema, it } = cxt;
            if (alwaysValidSchema(it, schema)) {
                cxt.fail();
                return;
            }
            const valid = gen.name("valid");
            cxt.subschema({
                keyword: "not",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, valid);
            cxt.result(valid, () => cxt.error(), () => cxt.reset());
        },
        error: { message: "must NOT be valid" },
    };

    const def$f = {
        keyword: "anyOf",
        schemaType: "array",
        trackErrors: true,
        code: validateUnion,
        error: { message: "must match a schema in anyOf" },
    };

    const error$5 = {
        message: "must match exactly one schema in oneOf",
        params: ({ params }) => _ `{passingSchemas: ${params.passing}}`,
    };
    const def$e = {
        keyword: "oneOf",
        schemaType: "array",
        trackErrors: true,
        error: error$5,
        code(cxt) {
            const { gen, schema, parentSchema, it } = cxt;
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            if (it.opts.discriminator && parentSchema.discriminator)
                return;
            const schArr = schema;
            const valid = gen.let("valid", false);
            const passing = gen.let("passing", null);
            const schValid = gen.name("_valid");
            cxt.setParams({ passing });
            // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
            gen.block(validateOneOf);
            cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
            function validateOneOf() {
                schArr.forEach((sch, i) => {
                    let schCxt;
                    if (alwaysValidSchema(it, sch)) {
                        gen.var(schValid, true);
                    }
                    else {
                        schCxt = cxt.subschema({
                            keyword: "oneOf",
                            schemaProp: i,
                            compositeRule: true,
                        }, schValid);
                    }
                    if (i > 0) {
                        gen
                            .if(_ `${schValid} && ${valid}`)
                            .assign(valid, false)
                            .assign(passing, _ `[${passing}, ${i}]`)
                            .else();
                    }
                    gen.if(schValid, () => {
                        gen.assign(valid, true);
                        gen.assign(passing, i);
                        if (schCxt)
                            cxt.mergeEvaluated(schCxt, Name);
                    });
                });
            }
        },
    };

    const def$d = {
        keyword: "allOf",
        schemaType: "array",
        code(cxt) {
            const { gen, schema, it } = cxt;
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const valid = gen.name("valid");
            schema.forEach((sch, i) => {
                if (alwaysValidSchema(it, sch))
                    return;
                const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
                cxt.ok(valid);
                cxt.mergeEvaluated(schCxt);
            });
        },
    };

    const error$4 = {
        message: ({ params }) => str `must match "${params.ifClause}" schema`,
        params: ({ params }) => _ `{failingKeyword: ${params.ifClause}}`,
    };
    const def$c = {
        keyword: "if",
        schemaType: ["object", "boolean"],
        trackErrors: true,
        error: error$4,
        code(cxt) {
            const { gen, parentSchema, it } = cxt;
            if (parentSchema.then === undefined && parentSchema.else === undefined) {
                checkStrictMode(it, '"if" without "then" and "else" is ignored');
            }
            const hasThen = hasSchema(it, "then");
            const hasElse = hasSchema(it, "else");
            if (!hasThen && !hasElse)
                return;
            const valid = gen.let("valid", true);
            const schValid = gen.name("_valid");
            validateIf();
            cxt.reset();
            if (hasThen && hasElse) {
                const ifClause = gen.let("ifClause");
                cxt.setParams({ ifClause });
                gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
            }
            else if (hasThen) {
                gen.if(schValid, validateClause("then"));
            }
            else {
                gen.if(not(schValid), validateClause("else"));
            }
            cxt.pass(valid, () => cxt.error(true));
            function validateIf() {
                const schCxt = cxt.subschema({
                    keyword: "if",
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                }, schValid);
                cxt.mergeEvaluated(schCxt);
            }
            function validateClause(keyword, ifClause) {
                return () => {
                    const schCxt = cxt.subschema({ keyword }, schValid);
                    gen.assign(valid, schValid);
                    cxt.mergeValidEvaluated(schCxt, valid);
                    if (ifClause)
                        gen.assign(ifClause, _ `${keyword}`);
                    else
                        cxt.setParams({ ifClause: keyword });
                };
            }
        },
    };
    function hasSchema(it, keyword) {
        const schema = it.schema[keyword];
        return schema !== undefined && !alwaysValidSchema(it, schema);
    }

    const def$b = {
        keyword: ["then", "else"],
        schemaType: ["object", "boolean"],
        code({ keyword, parentSchema, it }) {
            if (parentSchema.if === undefined)
                checkStrictMode(it, `"${keyword}" without "if" is ignored`);
        },
    };

    function getApplicator(draft2020 = false) {
        const applicator = [
            // any
            def$g,
            def$f,
            def$e,
            def$d,
            def$c,
            def$b,
            // object
            def$k,
            def$j,
            def$l,
            def$i,
            def$h,
        ];
        // array
        if (draft2020)
            applicator.push(def$o, def$n);
        else
            applicator.push(def$q, def$p);
        applicator.push(def$m);
        return applicator;
    }

    const error$3 = {
        message: ({ schemaCode }) => str `must match format "${schemaCode}"`,
        params: ({ schemaCode }) => _ `{format: ${schemaCode}}`,
    };
    const def$a = {
        keyword: "format",
        type: ["number", "string"],
        schemaType: "string",
        $data: true,
        error: error$3,
        code(cxt, ruleType) {
            const { gen, data, $data, schema, schemaCode, it } = cxt;
            const { opts, errSchemaPath, schemaEnv, self } = it;
            if (!opts.validateFormats)
                return;
            if ($data)
                validate$DataFormat();
            else
                validateFormat();
            function validate$DataFormat() {
                const fmts = gen.scopeValue("formats", {
                    ref: self.formats,
                    code: opts.code.formats,
                });
                const fDef = gen.const("fDef", _ `${fmts}[${schemaCode}]`);
                const fType = gen.let("fType");
                const format = gen.let("format");
                // TODO simplify
                gen.if(_ `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, _ `${fDef}.type || "string"`).assign(format, _ `${fDef}.validate`), () => gen.assign(fType, _ `"string"`).assign(format, fDef));
                cxt.fail$data(or(unknownFmt(), invalidFmt()));
                function unknownFmt() {
                    if (opts.strictSchema === false)
                        return nil;
                    return _ `${schemaCode} && !${format}`;
                }
                function invalidFmt() {
                    const callFormat = schemaEnv.$async
                        ? _ `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                        : _ `${format}(${data})`;
                    const validData = _ `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                    return _ `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
                }
            }
            function validateFormat() {
                const formatDef = self.formats[schema];
                if (!formatDef) {
                    unknownFormat();
                    return;
                }
                if (formatDef === true)
                    return;
                const [fmtType, format, fmtRef] = getFormat(formatDef);
                if (fmtType === ruleType)
                    cxt.pass(validCondition());
                function unknownFormat() {
                    if (opts.strictSchema === false) {
                        self.logger.warn(unknownMsg());
                        return;
                    }
                    throw new Error(unknownMsg());
                    function unknownMsg() {
                        return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                    }
                }
                function getFormat(fmtDef) {
                    const code = fmtDef instanceof RegExp
                        ? regexpCode(fmtDef)
                        : opts.code.formats
                            ? _ `${opts.code.formats}${getProperty(schema)}`
                            : undefined;
                    const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                    if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                        return [fmtDef.type || "string", fmtDef.validate, _ `${fmt}.validate`];
                    }
                    return ["string", fmtDef, fmt];
                }
                function validCondition() {
                    if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                        if (!schemaEnv.$async)
                            throw new Error("async format in sync schema");
                        return _ `await ${fmtRef}(${data})`;
                    }
                    return typeof format == "function" ? _ `${fmtRef}(${data})` : _ `${fmtRef}.test(${data})`;
                }
            }
        },
    };

    const format$2 = [def$a];

    const metadataVocabulary = [
        "title",
        "description",
        "default",
        "deprecated",
        "readOnly",
        "writeOnly",
        "examples",
    ];
    const contentVocabulary = [
        "contentMediaType",
        "contentEncoding",
        "contentSchema",
    ];

    const draft7Vocabularies = [
        core$2,
        validation$2,
        getApplicator(),
        format$2,
        metadataVocabulary,
        contentVocabulary,
    ];

    const def$9 = {
        keyword: "$dynamicAnchor",
        schemaType: "string",
        code: (cxt) => dynamicAnchor(cxt, cxt.schema),
    };
    function dynamicAnchor(cxt, anchor) {
        const { gen, it } = cxt;
        it.schemaEnv.root.dynamicAnchors[anchor] = true;
        const v = _ `${names.dynamicAnchors}${getProperty(anchor)}`;
        const validate = it.errSchemaPath === "#" ? it.validateName : _getValidate(cxt);
        gen.if(_ `!${v}`, () => gen.assign(v, validate));
    }
    function _getValidate(cxt) {
        const { schemaEnv, schema, self } = cxt.it;
        const { root, baseId, localRefs, meta } = schemaEnv.root;
        const sch = new SchemaEnv({ schema, root, baseId, localRefs, meta });
        compileSchema.call(self, sch);
        return getValidate(cxt, sch);
    }

    const def$8 = {
        keyword: "$dynamicRef",
        schemaType: "string",
        code: (cxt) => dynamicRef(cxt, cxt.schema),
    };
    function dynamicRef(cxt, ref) {
        const { gen, keyword, it } = cxt;
        if (ref[0] !== "#")
            throw new Error(`"${keyword}" only supports hash fragment reference`);
        const anchor = ref.slice(1);
        if (it.allErrors) {
            _dynamicRef();
        }
        else {
            const valid = gen.let("valid", false);
            _dynamicRef(valid);
            cxt.ok(valid);
        }
        function _dynamicRef(valid) {
            // TODO the assumption here is that `recursiveRef: #` always points to the root
            // of the schema object, which is not correct, because there may be $id that
            // makes # point to it, and the target schema may not contain dynamic/recursiveAnchor.
            // Because of that 2 tests in recursiveRef.json fail.
            // This is a similar problem to #815 (`$id` doesn't alter resolution scope for `{ "$ref": "#" }`).
            // (This problem is not tested in JSON-Schema-Test-Suite)
            if (it.schemaEnv.root.dynamicAnchors[anchor]) {
                const v = gen.let("_v", _ `${names.dynamicAnchors}${getProperty(anchor)}`);
                gen.if(v, _callRef(v, valid), _callRef(it.validateName, valid));
            }
            else {
                _callRef(it.validateName, valid)();
            }
        }
        function _callRef(validate, valid) {
            return valid
                ? () => gen.block(() => {
                    callRef(cxt, validate);
                    gen.let(valid, true);
                })
                : () => callRef(cxt, validate);
        }
    }

    const def$7 = {
        keyword: "$recursiveAnchor",
        schemaType: "boolean",
        code(cxt) {
            if (cxt.schema)
                dynamicAnchor(cxt, "");
            else
                checkStrictMode(cxt.it, "$recursiveAnchor: false is ignored");
        },
    };

    const def$6 = {
        keyword: "$recursiveRef",
        schemaType: "string",
        code: (cxt) => dynamicRef(cxt, cxt.schema),
    };

    const dynamic = [def$9, def$8, def$7, def$6];

    const def$5 = {
        keyword: "dependentRequired",
        type: "object",
        schemaType: "object",
        error: error$8,
        code: (cxt) => validatePropertyDeps(cxt),
    };

    const def$4 = {
        keyword: "dependentSchemas",
        type: "object",
        schemaType: "object",
        code: (cxt) => validateSchemaDeps(cxt),
    };

    const def$3 = {
        keyword: ["maxContains", "minContains"],
        type: "array",
        schemaType: "number",
        code({ keyword, parentSchema, it }) {
            if (parentSchema.contains === undefined) {
                checkStrictMode(it, `"${keyword}" without "contains" is ignored`);
            }
        },
    };

    const next = [def$5, def$4, def$3];

    const error$2 = {
        message: "must NOT have unevaluated properties",
        params: ({ params }) => _ `{unevaluatedProperty: ${params.unevaluatedProperty}}`,
    };
    const def$2 = {
        keyword: "unevaluatedProperties",
        type: "object",
        schemaType: ["boolean", "object"],
        trackErrors: true,
        error: error$2,
        code(cxt) {
            const { gen, schema, data, errsCount, it } = cxt;
            /* istanbul ignore if */
            if (!errsCount)
                throw new Error("ajv implementation error");
            const { allErrors, props } = it;
            if (props instanceof Name) {
                gen.if(_ `${props} !== true`, () => gen.forIn("key", data, (key) => gen.if(unevaluatedDynamic(props, key), () => unevaluatedPropCode(key))));
            }
            else if (props !== true) {
                gen.forIn("key", data, (key) => props === undefined
                    ? unevaluatedPropCode(key)
                    : gen.if(unevaluatedStatic(props, key), () => unevaluatedPropCode(key)));
            }
            it.props = true;
            cxt.ok(_ `${errsCount} === ${names.errors}`);
            function unevaluatedPropCode(key) {
                if (schema === false) {
                    cxt.setParams({ unevaluatedProperty: key });
                    cxt.error();
                    if (!allErrors)
                        gen.break();
                    return;
                }
                if (!alwaysValidSchema(it, schema)) {
                    const valid = gen.name("valid");
                    cxt.subschema({
                        keyword: "unevaluatedProperties",
                        dataProp: key,
                        dataPropType: Type.Str,
                    }, valid);
                    if (!allErrors)
                        gen.if(not(valid), () => gen.break());
                }
            }
            function unevaluatedDynamic(evaluatedProps, key) {
                return _ `!${evaluatedProps} || !${evaluatedProps}[${key}]`;
            }
            function unevaluatedStatic(evaluatedProps, key) {
                const ps = [];
                for (const p in evaluatedProps) {
                    if (evaluatedProps[p] === true)
                        ps.push(_ `${key} !== ${p}`);
                }
                return and(...ps);
            }
        },
    };

    const error$1 = {
        message: ({ params: { len } }) => str `must NOT have more than ${len} items`,
        params: ({ params: { len } }) => _ `{limit: ${len}}`,
    };
    const def$1 = {
        keyword: "unevaluatedItems",
        type: "array",
        schemaType: ["boolean", "object"],
        error: error$1,
        code(cxt) {
            const { gen, schema, data, it } = cxt;
            const items = it.items || 0;
            if (items === true)
                return;
            const len = gen.const("len", _ `${data}.length`);
            if (schema === false) {
                cxt.setParams({ len: items });
                cxt.fail(_ `${len} > ${items}`);
            }
            else if (typeof schema == "object" && !alwaysValidSchema(it, schema)) {
                const valid = gen.var("valid", _ `${len} <= ${items}`);
                gen.if(not(valid), () => validateItems(valid, items));
                cxt.ok(valid);
            }
            it.items = true;
            function validateItems(valid, from) {
                gen.forRange("i", from, len, (i) => {
                    cxt.subschema({ keyword: "unevaluatedItems", dataProp: i, dataPropType: Type.Num }, valid);
                    if (!it.allErrors)
                        gen.if(not(valid), () => gen.break());
                });
            }
        },
    };

    const unevaluated = [def$2, def$1];

    var DiscrError;
    (function (DiscrError) {
        DiscrError["Tag"] = "tag";
        DiscrError["Mapping"] = "mapping";
    })(DiscrError || (DiscrError = {}));

    const error = {
        message: ({ params: { discrError, tagName } }) => discrError === DiscrError.Tag
            ? `tag "${tagName}" must be string`
            : `value of tag "${tagName}" must be in oneOf`,
        params: ({ params: { discrError, tag, tagName } }) => _ `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
    };
    const def = {
        keyword: "discriminator",
        type: "object",
        schemaType: "object",
        error,
        code(cxt) {
            const { gen, data, schema, parentSchema, it } = cxt;
            const { oneOf } = parentSchema;
            if (!it.opts.discriminator) {
                throw new Error("discriminator: requires discriminator option");
            }
            const tagName = schema.propertyName;
            if (typeof tagName != "string")
                throw new Error("discriminator: requires propertyName");
            if (schema.mapping)
                throw new Error("discriminator: mapping is not supported");
            if (!oneOf)
                throw new Error("discriminator: requires oneOf keyword");
            const valid = gen.let("valid", false);
            const tag = gen.const("tag", _ `${data}${getProperty(tagName)}`);
            gen.if(_ `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: DiscrError.Tag, tag, tagName }));
            cxt.ok(valid);
            function validateMapping() {
                const mapping = getMapping();
                gen.if(false);
                for (const tagValue in mapping) {
                    gen.elseIf(_ `${tag} === ${tagValue}`);
                    gen.assign(valid, applyTagSchema(mapping[tagValue]));
                }
                gen.else();
                cxt.error(false, { discrError: DiscrError.Mapping, tag, tagName });
                gen.endIf();
            }
            function applyTagSchema(schemaProp) {
                const _valid = gen.name("valid");
                const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
                cxt.mergeEvaluated(schCxt, Name);
                return _valid;
            }
            function getMapping() {
                var _a;
                const oneOfMapping = {};
                const topRequired = hasRequired(parentSchema);
                let tagRequired = true;
                for (let i = 0; i < oneOf.length; i++) {
                    const sch = oneOf[i];
                    const propSch = (_a = sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                    if (typeof propSch != "object") {
                        throw new Error(`discriminator: oneOf schemas must have "properties/${tagName}"`);
                    }
                    tagRequired = tagRequired && (topRequired || hasRequired(sch));
                    addMappings(propSch, i);
                }
                if (!tagRequired)
                    throw new Error(`discriminator: "${tagName}" must be required`);
                return oneOfMapping;
                function hasRequired({ required }) {
                    return Array.isArray(required) && required.includes(tagName);
                }
                function addMappings(sch, i) {
                    if (sch.const) {
                        addMapping(sch.const, i);
                    }
                    else if (sch.enum) {
                        for (const tagValue of sch.enum) {
                            addMapping(tagValue, i);
                        }
                    }
                    else {
                        throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                    }
                }
                function addMapping(tagValue, i) {
                    if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                        throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                    }
                    oneOfMapping[tagValue] = i;
                }
            }
        },
    };

    var $schema$6 = "https://json-schema.org/draft/2019-09/schema";
    var $id$6 = "https://json-schema.org/draft/2019-09/schema";
    var $vocabulary$6 = {
    	"https://json-schema.org/draft/2019-09/vocab/core": true,
    	"https://json-schema.org/draft/2019-09/vocab/applicator": true,
    	"https://json-schema.org/draft/2019-09/vocab/validation": true,
    	"https://json-schema.org/draft/2019-09/vocab/meta-data": true,
    	"https://json-schema.org/draft/2019-09/vocab/format": false,
    	"https://json-schema.org/draft/2019-09/vocab/content": true
    };
    var $recursiveAnchor$6 = true;
    var title$6 = "Core and Validation specifications meta-schema";
    var allOf = [
    	{
    		$ref: "meta/core"
    	},
    	{
    		$ref: "meta/applicator"
    	},
    	{
    		$ref: "meta/validation"
    	},
    	{
    		$ref: "meta/meta-data"
    	},
    	{
    		$ref: "meta/format"
    	},
    	{
    		$ref: "meta/content"
    	}
    ];
    var type$6 = [
    	"object",
    	"boolean"
    ];
    var properties$6 = {
    	definitions: {
    		$comment: "While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
    		type: "object",
    		additionalProperties: {
    			$recursiveRef: "#"
    		},
    		"default": {
    		}
    	},
    	dependencies: {
    		$comment: "\"dependencies\" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to \"dependentSchemas\" and \"dependentRequired\"",
    		type: "object",
    		additionalProperties: {
    			anyOf: [
    				{
    					$recursiveRef: "#"
    				},
    				{
    					$ref: "meta/validation#/$defs/stringArray"
    				}
    			]
    		}
    	}
    };
    var schema = {
    	$schema: $schema$6,
    	$id: $id$6,
    	$vocabulary: $vocabulary$6,
    	$recursiveAnchor: $recursiveAnchor$6,
    	title: title$6,
    	allOf: allOf,
    	type: type$6,
    	properties: properties$6
    };

    var metaSchema = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$6,
        $id: $id$6,
        $vocabulary: $vocabulary$6,
        $recursiveAnchor: $recursiveAnchor$6,
        title: title$6,
        allOf: allOf,
        type: type$6,
        properties: properties$6,
        'default': schema
    });

    var $schema$5 = "https://json-schema.org/draft/2019-09/schema";
    var $id$5 = "https://json-schema.org/draft/2019-09/meta/applicator";
    var $vocabulary$5 = {
    	"https://json-schema.org/draft/2019-09/vocab/applicator": true
    };
    var $recursiveAnchor$5 = true;
    var title$5 = "Applicator vocabulary meta-schema";
    var type$5 = [
    	"object",
    	"boolean"
    ];
    var properties$5 = {
    	additionalItems: {
    		$recursiveRef: "#"
    	},
    	unevaluatedItems: {
    		$recursiveRef: "#"
    	},
    	items: {
    		anyOf: [
    			{
    				$recursiveRef: "#"
    			},
    			{
    				$ref: "#/$defs/schemaArray"
    			}
    		]
    	},
    	contains: {
    		$recursiveRef: "#"
    	},
    	additionalProperties: {
    		$recursiveRef: "#"
    	},
    	unevaluatedProperties: {
    		$recursiveRef: "#"
    	},
    	properties: {
    		type: "object",
    		additionalProperties: {
    			$recursiveRef: "#"
    		},
    		"default": {
    		}
    	},
    	patternProperties: {
    		type: "object",
    		additionalProperties: {
    			$recursiveRef: "#"
    		},
    		propertyNames: {
    			format: "regex"
    		},
    		"default": {
    		}
    	},
    	dependentSchemas: {
    		type: "object",
    		additionalProperties: {
    			$recursiveRef: "#"
    		}
    	},
    	propertyNames: {
    		$recursiveRef: "#"
    	},
    	"if": {
    		$recursiveRef: "#"
    	},
    	then: {
    		$recursiveRef: "#"
    	},
    	"else": {
    		$recursiveRef: "#"
    	},
    	allOf: {
    		$ref: "#/$defs/schemaArray"
    	},
    	anyOf: {
    		$ref: "#/$defs/schemaArray"
    	},
    	oneOf: {
    		$ref: "#/$defs/schemaArray"
    	},
    	not: {
    		$recursiveRef: "#"
    	}
    };
    var $defs$1 = {
    	schemaArray: {
    		type: "array",
    		minItems: 1,
    		items: {
    			$recursiveRef: "#"
    		}
    	}
    };
    var applicator = {
    	$schema: $schema$5,
    	$id: $id$5,
    	$vocabulary: $vocabulary$5,
    	$recursiveAnchor: $recursiveAnchor$5,
    	title: title$5,
    	type: type$5,
    	properties: properties$5,
    	$defs: $defs$1
    };

    var applicator$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$5,
        $id: $id$5,
        $vocabulary: $vocabulary$5,
        $recursiveAnchor: $recursiveAnchor$5,
        title: title$5,
        type: type$5,
        properties: properties$5,
        $defs: $defs$1,
        'default': applicator
    });

    var $schema$4 = "https://json-schema.org/draft/2019-09/schema";
    var $id$4 = "https://json-schema.org/draft/2019-09/meta/content";
    var $vocabulary$4 = {
    	"https://json-schema.org/draft/2019-09/vocab/content": true
    };
    var $recursiveAnchor$4 = true;
    var title$4 = "Content vocabulary meta-schema";
    var type$4 = [
    	"object",
    	"boolean"
    ];
    var properties$4 = {
    	contentMediaType: {
    		type: "string"
    	},
    	contentEncoding: {
    		type: "string"
    	},
    	contentSchema: {
    		$recursiveRef: "#"
    	}
    };
    var content = {
    	$schema: $schema$4,
    	$id: $id$4,
    	$vocabulary: $vocabulary$4,
    	$recursiveAnchor: $recursiveAnchor$4,
    	title: title$4,
    	type: type$4,
    	properties: properties$4
    };

    var content$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$4,
        $id: $id$4,
        $vocabulary: $vocabulary$4,
        $recursiveAnchor: $recursiveAnchor$4,
        title: title$4,
        type: type$4,
        properties: properties$4,
        'default': content
    });

    var $schema$3 = "https://json-schema.org/draft/2019-09/schema";
    var $id$3 = "https://json-schema.org/draft/2019-09/meta/core";
    var $vocabulary$3 = {
    	"https://json-schema.org/draft/2019-09/vocab/core": true
    };
    var $recursiveAnchor$3 = true;
    var title$3 = "Core vocabulary meta-schema";
    var type$3 = [
    	"object",
    	"boolean"
    ];
    var properties$3 = {
    	$id: {
    		type: "string",
    		format: "uri-reference",
    		$comment: "Non-empty fragments not allowed.",
    		pattern: "^[^#]*#?$"
    	},
    	$schema: {
    		type: "string",
    		format: "uri"
    	},
    	$anchor: {
    		type: "string",
    		pattern: "^[A-Za-z][-A-Za-z0-9.:_]*$"
    	},
    	$ref: {
    		type: "string",
    		format: "uri-reference"
    	},
    	$recursiveRef: {
    		type: "string",
    		format: "uri-reference"
    	},
    	$recursiveAnchor: {
    		type: "boolean",
    		"default": false
    	},
    	$vocabulary: {
    		type: "object",
    		propertyNames: {
    			type: "string",
    			format: "uri"
    		},
    		additionalProperties: {
    			type: "boolean"
    		}
    	},
    	$comment: {
    		type: "string"
    	},
    	$defs: {
    		type: "object",
    		additionalProperties: {
    			$recursiveRef: "#"
    		},
    		"default": {
    		}
    	}
    };
    var core = {
    	$schema: $schema$3,
    	$id: $id$3,
    	$vocabulary: $vocabulary$3,
    	$recursiveAnchor: $recursiveAnchor$3,
    	title: title$3,
    	type: type$3,
    	properties: properties$3
    };

    var core$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$3,
        $id: $id$3,
        $vocabulary: $vocabulary$3,
        $recursiveAnchor: $recursiveAnchor$3,
        title: title$3,
        type: type$3,
        properties: properties$3,
        'default': core
    });

    var $schema$2 = "https://json-schema.org/draft/2019-09/schema";
    var $id$2 = "https://json-schema.org/draft/2019-09/meta/format";
    var $vocabulary$2 = {
    	"https://json-schema.org/draft/2019-09/vocab/format": true
    };
    var $recursiveAnchor$2 = true;
    var title$2 = "Format vocabulary meta-schema";
    var type$2 = [
    	"object",
    	"boolean"
    ];
    var properties$2 = {
    	format: {
    		type: "string"
    	}
    };
    var format = {
    	$schema: $schema$2,
    	$id: $id$2,
    	$vocabulary: $vocabulary$2,
    	$recursiveAnchor: $recursiveAnchor$2,
    	title: title$2,
    	type: type$2,
    	properties: properties$2
    };

    var format$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$2,
        $id: $id$2,
        $vocabulary: $vocabulary$2,
        $recursiveAnchor: $recursiveAnchor$2,
        title: title$2,
        type: type$2,
        properties: properties$2,
        'default': format
    });

    var $schema$1 = "https://json-schema.org/draft/2019-09/schema";
    var $id$1 = "https://json-schema.org/draft/2019-09/meta/meta-data";
    var $vocabulary$1 = {
    	"https://json-schema.org/draft/2019-09/vocab/meta-data": true
    };
    var $recursiveAnchor$1 = true;
    var title$1 = "Meta-data vocabulary meta-schema";
    var type$1 = [
    	"object",
    	"boolean"
    ];
    var properties$1 = {
    	title: {
    		type: "string"
    	},
    	description: {
    		type: "string"
    	},
    	"default": true,
    	deprecated: {
    		type: "boolean",
    		"default": false
    	},
    	readOnly: {
    		type: "boolean",
    		"default": false
    	},
    	writeOnly: {
    		type: "boolean",
    		"default": false
    	},
    	examples: {
    		type: "array",
    		items: true
    	}
    };
    var metaData = {
    	$schema: $schema$1,
    	$id: $id$1,
    	$vocabulary: $vocabulary$1,
    	$recursiveAnchor: $recursiveAnchor$1,
    	title: title$1,
    	type: type$1,
    	properties: properties$1
    };

    var metadata = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema$1,
        $id: $id$1,
        $vocabulary: $vocabulary$1,
        $recursiveAnchor: $recursiveAnchor$1,
        title: title$1,
        type: type$1,
        properties: properties$1,
        'default': metaData
    });

    var $schema = "https://json-schema.org/draft/2019-09/schema";
    var $id = "https://json-schema.org/draft/2019-09/meta/validation";
    var $vocabulary = {
    	"https://json-schema.org/draft/2019-09/vocab/validation": true
    };
    var $recursiveAnchor = true;
    var title = "Validation vocabulary meta-schema";
    var type = [
    	"object",
    	"boolean"
    ];
    var properties = {
    	multipleOf: {
    		type: "number",
    		exclusiveMinimum: 0
    	},
    	maximum: {
    		type: "number"
    	},
    	exclusiveMaximum: {
    		type: "number"
    	},
    	minimum: {
    		type: "number"
    	},
    	exclusiveMinimum: {
    		type: "number"
    	},
    	maxLength: {
    		$ref: "#/$defs/nonNegativeInteger"
    	},
    	minLength: {
    		$ref: "#/$defs/nonNegativeIntegerDefault0"
    	},
    	pattern: {
    		type: "string",
    		format: "regex"
    	},
    	maxItems: {
    		$ref: "#/$defs/nonNegativeInteger"
    	},
    	minItems: {
    		$ref: "#/$defs/nonNegativeIntegerDefault0"
    	},
    	uniqueItems: {
    		type: "boolean",
    		"default": false
    	},
    	maxContains: {
    		$ref: "#/$defs/nonNegativeInteger"
    	},
    	minContains: {
    		$ref: "#/$defs/nonNegativeInteger",
    		"default": 1
    	},
    	maxProperties: {
    		$ref: "#/$defs/nonNegativeInteger"
    	},
    	minProperties: {
    		$ref: "#/$defs/nonNegativeIntegerDefault0"
    	},
    	required: {
    		$ref: "#/$defs/stringArray"
    	},
    	dependentRequired: {
    		type: "object",
    		additionalProperties: {
    			$ref: "#/$defs/stringArray"
    		}
    	},
    	"const": true,
    	"enum": {
    		type: "array",
    		items: true
    	},
    	type: {
    		anyOf: [
    			{
    				$ref: "#/$defs/simpleTypes"
    			},
    			{
    				type: "array",
    				items: {
    					$ref: "#/$defs/simpleTypes"
    				},
    				minItems: 1,
    				uniqueItems: true
    			}
    		]
    	}
    };
    var $defs = {
    	nonNegativeInteger: {
    		type: "integer",
    		minimum: 0
    	},
    	nonNegativeIntegerDefault0: {
    		$ref: "#/$defs/nonNegativeInteger",
    		"default": 0
    	},
    	simpleTypes: {
    		"enum": [
    			"array",
    			"boolean",
    			"integer",
    			"null",
    			"number",
    			"object",
    			"string"
    		]
    	},
    	stringArray: {
    		type: "array",
    		items: {
    			type: "string"
    		},
    		uniqueItems: true,
    		"default": [
    		]
    	}
    };
    var validation = {
    	$schema: $schema,
    	$id: $id,
    	$vocabulary: $vocabulary,
    	$recursiveAnchor: $recursiveAnchor,
    	title: title,
    	type: type,
    	properties: properties,
    	$defs: $defs
    };

    var validation$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $schema: $schema,
        $id: $id,
        $vocabulary: $vocabulary,
        $recursiveAnchor: $recursiveAnchor,
        title: title,
        type: type,
        properties: properties,
        $defs: $defs,
        'default': validation
    });

    const META_SUPPORT_DATA = ["/properties"];
    function addMetaSchema2019($data) {
        [
            metaSchema,
            applicator$1,
            content$1,
            core$1,
            with$data(this, format$1),
            metadata,
            with$data(this, validation$1),
        ].forEach((sch) => this.addMetaSchema(sch, undefined, false));
        return this;
        function with$data(ajv, sch) {
            return $data ? ajv.$dataMetaSchema(sch, META_SUPPORT_DATA) : sch;
        }
    }

    const META_SCHEMA_ID = "https://json-schema.org/draft/2019-09/schema";
    class Ajv2019 extends Ajv {
        constructor(opts = {}) {
            super({
                ...opts,
                dynamicRef: true,
                next: true,
                unevaluated: true,
            });
        }
        _addVocabularies() {
            super._addVocabularies();
            this.addVocabulary(dynamic);
            draft7Vocabularies.forEach((v) => this.addVocabulary(v));
            this.addVocabulary(next);
            this.addVocabulary(unevaluated);
            if (this.opts.discriminator)
                this.addKeyword(def);
        }
        _addDefaultMetaSchema() {
            super._addDefaultMetaSchema();
            const { $data, meta } = this.opts;
            if (!meta)
                return;
            addMetaSchema2019.call(this, $data);
            this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
        }
        defaultMeta() {
            return (this.opts.defaultMeta =
                super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
        }
    }
    module.exports = exports = Ajv2019;
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.CodeGen = CodeGen;
    exports.KeywordCxt = KeywordCxt;
    exports.Name = Name;
    exports._ = _;
    exports.default = Ajv2019;
    exports.nil = nil;
    exports.str = str;
    exports.stringify = stringify;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
