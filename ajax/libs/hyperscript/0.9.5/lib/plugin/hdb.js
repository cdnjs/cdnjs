
/**
 * @param {HyperscriptObject} _hyperscript
 */
export default _hyperscript => {
	function HDB(ctx, runtime, breakpoint) {
		this.ctx = ctx;
		this.runtime = runtime;
		this.cmd = breakpoint;
		this._hyperscript = _hyperscript;

		this.cmdMap = [];

		this.bus = new EventTarget();
	} // See below for methods

	_hyperscript.addCommand("breakpoint", function (parser, runtime, tokens) {
		if (!tokens.matchToken("breakpoint")) return;

		var hdb;

		return {
			op: function (ctx) {
				globalThis.hdb = hdb = new HDB(ctx, runtime, this);
				try {
					return hdb.break(ctx);
				} catch (e) {
					console.error(e, e.stack);
				}
			},
		};
	});
	HDB.prototype.break = function(ctx) {
		console.log("=== HDB///_hyperscript/debugger ===");
		this.ui();
		return new Promise((resolve, reject) => {
			this.bus.addEventListener(
				"continue",
				() => {
					if (this.ctx !== ctx) {
						// Context switch
						for (var attr in ctx) {
							delete ctx[attr];
						}
						Object.assign(ctx, this.ctx);
					}
					delete window['hdb'];
					resolve(this.runtime.findNext(this.cmd, this.ctx));
				},
				{ once: true }
			);
		});
	};

	HDB.prototype.continueExec = function () {
		this.bus.dispatchEvent(new Event("continue"));
	};

	HDB.prototype.stepOver = function () {
		if (!this.cmd) return this.continueExec();
		var result =
			this.cmd && this.cmd.type === "breakpointCommand"
				? this.runtime.findNext(this.cmd, this.ctx)
				: this.runtime.unifiedEval(this.cmd, this.ctx);
		if (result.type === "implicitReturn") return this.stepOut();
		if (result && result.then instanceof Function) {
			return result.then(next => {
				this.cmd = next;
				this.bus.dispatchEvent(new Event("step"));
				this.logCommand();
			});
		} else if (result.halt_flag) {
			this.bus.dispatchEvent(new Event("continue"));
		} else {
			this.cmd = result;
			this.bus.dispatchEvent(new Event("step"));
			this.logCommand();
		}
	};

	HDB.prototype.stepOut = function () {
		if (!this.ctx.meta.caller) return this.continueExec();
		var callingCmd = this.ctx.meta.callingCommand;
		var oldMe = this.ctx.me;
		this.ctx = this.ctx.meta.caller;
		console.log(
			"[hdb] stepping out into " + this.ctx.meta.feature.displayName)
		if (this.ctx.me instanceof Element && this.ctx.me !== oldMe) {
			console.log("[hdb] me: ", this.ctx.me)
		}
		this.cmd = this.runtime.findNext(callingCmd, this.ctx);
		this.cmd = this.runtime.findNext(this.cmd, this.ctx);
		this.logCommand();
		this.bus.dispatchEvent(new Event("step"));
	};

	HDB.prototype.skipTo = function (toCmd) {
		this.cmd = toCmd.cmd
		this.bus.dispatchEvent(new Event("skip"));
	}

	HDB.prototype.rewrite = function (command, newCode) {
		console.log('##', command)
		const parent = command.cmd.parent
		let prev
		for (prev of parent.children) {
			if (prev.next === command.cmd) break;
		}
		const next = command.next

		const tok = _hyperscript.internals.lexer.tokenize(newCode)
		const newcmd = _hyperscript.internals.parser.requireElement('command', tok)

		console.log(newcmd)
		newcmd.startToken    = command.startToken
		newcmd.endToken      = command.endToken
		newcmd.programSource = command.programSource
		newcmd.sourceFor = function () { return newCode }

		prev.next = newcmd
		newcmd.next = next
		newcmd.parent = parent

		this.bus.dispatchEvent(new Event('step'))
	}

	HDB.prototype.logCommand = function () {
		var hasSource = this.cmd.sourceFor instanceof Function;
		var cmdSource = hasSource ? this.cmd.sourceFor() : '-- '+this.cmd.type;
		console.log("[hdb] current command: " + cmdSource)
	}

	HDB.prototype.traverse = function (ge) {
		const rv = [];

		(function recurse (ge) {
			rv.push(ge);
			if ('children' in ge) for (const child of ge.children) recurse(child);
		})(ge);

		return rv;
	}

	var ui = `
<div class="hdb" _="
	on load trigger update end
	on step from hdb.bus trigger update end
	on skip from hdb.bus trigger update end
	on continue from hdb.bus log 'done' then remove me.getRootNode().host">

	<script type="text/hyperscript">

	def escapeHTML(unsafe)
		js(unsafe) return unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\\x22/g, "&quot;")
			.replace(/\\x27/g, "&#039;") end
		return it
	end

	def makeCommandWidget(i)
		get \`<span data-cmd=\${i}><button class=skip data-cmd=\${i}>&rdca;</button>\`
		if hdb.EXPERIMENTAL
			append \`<button class=rewrite data-cmd=\${i}>Rewrite</button></span>\`
		end
		return it
	end

	def renderCode
		set hdb.cmdMap to []
		set src to hdb.cmd.programSource

		-- Find feature
		set feat to hdb.cmd
		repeat until no feat.parent or feat.isFeature set feat to feat.parent end

		-- Traverse, finding starts
		for cmd in hdb.traverse(feat)
			if no cmd.startToken continue end
			append {
				index: cmd.startToken.start,
				widget: makeCommandWidget(hdb.cmdMap.length),
				cmd: cmd
			} to hdb.cmdMap
		end

		set rv to src.slice(0, hdb.cmdMap[0].index)
		for obj in hdb.cmdMap index i
			if obj.cmd is hdb.cmd
				append obj.widget + '<u class=current>' +
					escapeHTML(src.slice(obj.index, hdb.cmdMap[i+1].index)) + '</u>' to rv
			else
				append obj.widget + escapeHTML(src.slice(obj.index, hdb.cmdMap[i+1].index)) to rv
			end
		end
		return rv
	end

	def truncate(str, len)
		if str.length <= len return str end
		return str.substr(0, len) + '…'

	def prettyPrint(obj)
		if obj is null      return 'null'      end
		if Element.prototype.isPrototypeOf(obj)
			set rv to '&lt;<span class="token tagname">' +
				obj.tagName.toLowerCase() + "</span>"
			for attr in Array.from(obj.attributes)
				if attr.specified
					set rv to rv +
						' <span class="token attr">' + attr.nodeName +
						'</span>=<span class="token string">"' + truncate(attr.textContent, 10) +
						'"</span>'
				end
			end
			set rv to rv + '>'
			return rv
		else if obj.call
			if obj.hyperfunc
				get "def " + obj.hypername + ' ...'
			else
				get "function "+obj.name+"(...) {...}"
			end
		else if obj.toString
			call obj.toString()
		end
		return escapeHTML((it or 'undefined').trim())
	end
	</script>

	<header _="
	on pointerdown(clientX, clientY)
		halt the event
		call event.stopPropagation()
		get first .hdb
		measure its x, y
		set xoff to clientX - x
		set yoff to clientY - y
		repeat until event pointerup from document
			wait for pointermove or pointerup from document
			add {
				left: \${its clientX - xoff}px;
				top:  \${its clientY - yoff}px;
			} to .hdb
		end
	">
		<h2 class="titlebar">HDB</h2>
		<ul role="toolbar" class="toolbar" _="on pointerdown halt">
			<li><button _="on click call hdb.continueExec()">
				&#x23F5; Continue
			</button>
			<li><button _="on click call hdb.stepOver()">
				&#8631; Step Over
			</button>
		</ul>
	</header>

	<section class="sec-code">

		<div class="code-container">
			<pre class="code language-hyperscript" _="
				on update from .hdb if hdb.cmd.programSource
			    	put renderCode() into me
			    	if Prism
			    		call Prism.highlightAllUnder(me)
			    	end
			        go to bottom of .current in me
				end

				on click
					if target matches .skip
						get (target's @data-cmd) as Int
						call hdb.skipTo(hdb.cmdMap[result])
					end
					if target matches .rewrite
						set cmdNo to (target's @data-cmd) as Int
						set span to the first <span[data-cmd='\${cmdNo}'] />
						put \`<form class=rewrite><input id=cmd></form>\` into the span
					end
				end

				on submit
					halt the event
					get (closest @data-cmd to target) as Int
					call hdb.rewrite(hdb.cmdMap[result], #cmd's value)
				end
			"><code></code></pre>
		</div>
	</section>

	<section class="sec-console" _="
		-- Print context at startup
		init repeat for var in Object.keys(hdb.ctx) if var is not 'meta'
			send hdbUI:consoleEntry(input: var, output: hdb.ctx[var]) to #console">

		<ul id="console" role="list" _="
			on hdbUI:consoleEntry(input, output)
				if no hdb.consoleHistory set hdb.consoleHistory to [] end
				push(input) on hdb.consoleHistory
				set node to #tmpl-console-entry.content.cloneNode(true)
				put the node at end of me
				set entry to my lastElementChild
				go to bottom of the entry
				put escapeHTML(input) into .input in the entry
				if no output
					call hdb._hyperscript.parse(input)
					if its execute is not undefined then call its execute(hdb.ctx)
					else call its evaluate(hdb.ctx)
					end
					set output to it
				end
				put prettyPrint(output) as Fragment into .output in the entry
			">
			<template id="tmpl-console-entry">
				<li class="console-entry">
					<kbd><code class="input"></code></kbd>
					<samp class="output"></samp>
				</li>
			</template>
		</ul>

		<form id="console-form" data-hist="0" _="on submit
				send hdbUI:consoleEntry(input: #console-input's value) to #console
				set #console-input's value to ''
				set @data-hist to 0
				set element oldContent to null
				halt
			on keydown[key is 'ArrowUp' or key is 'ArrowDown']
				if no hdb.consoleHistory or exit end
				if element oldContent is null set element oldContent to #console-input.value end
				if event.key is 'ArrowUp' and hdb.consoleHistory.length > -@data-hist
					decrement @data-hist
				else if event.key is 'ArrowDown' and @data-hist < 0
					increment @data-hist
				end end
				set #console-input.value to hdb.consoleHistory[hdb.consoleHistory.length + @data-hist as Int]
					or oldContent
				halt default
			on input if @data-hist is '0' set element oldContent to #console-input.value">
			<input id="console-input" placeholder="Enter an expression&hellip;"
				autocomplete="off">
		</form>
	</section>

	<style>
	.hdb {
		border: 1px solid #888;
		border-radius: .3em;
		box-shadow: 0 .2em .3em #0008;
		position: fixed;
		top: .5em; right: .5em;
		width: min(40ch, calc(100% - 1em));
		max-height: calc(100% - 1em);
		background-color: white;
		font-family: sans-serif;
		opacity: .9;
		z-index: 2147483647;
		color: black;
		display: flex;
		flex-flow: column;
	}

	* {
		box-sizing: border-box;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .4em;
	}

	.titlebar {
		margin: 0;
		font-size: 1em;
		touch-action: none;
	}

	.toolbar {
		display: flex;
		gap: .35em;

		list-style: none;
		padding-left: 0;
		margin: 0;
	}

	.toolbar a, .toolbar button {
		background: #2183ff;
		border: 1px solid #3465a4;
		box-shadow: 0 1px #b3c6ff inset, 0 .06em .06em #000;
		border-radius: .2em;
		font: inherit;
		padding: .2em .3em;
		color: white;
		text-shadow: 0 1px black;
		font-weight: bold;
	}

	.toolbar a:hover .toolbar a:focus, .toolbar button:hover, .toolbar button:focus {
		background: #94c8ff;
	}

	.toolbar a:active, .toolbar button:active {
		background: #3465a4;
	}

	.sec-code {
		border-radius: .3em;
		overflow: hidden;
		box-shadow: 0 1px white inset, 0 .06em .06em #0008;
		background: #bdf;
		margin: 0 .4em;
		border: 1px solid #3465a4;
	}

	.hdb h3 {
		margin: 0;
		font-size: 1em;
		padding: .2em .4em 0 .4em;
	}

	.code-container {
		display: grid;
		line-height: 1.2em;
		height: calc(12 * 1.2em);
		border-radius: 0 0 .2em .2em;
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: #0003 transparent;
	}

	.code, #console, #console-input {
		font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
	}

	.code {
		width: 0;
		margin: 0;
		padding-left: 1ch;
		tab-size: 2;
		-moz-tab-size: 2;
		-o-tab-size: 2;
	}

	.current {
		font-weight: bold;
		background: #abf;
	}

	.skip {
		padding: 0;
		margin: 2px;
		border: 1px solid #3465a4;
		border-radius: 50%;
		color: #3465a4;
		background: none;
		font-weight: bold;
		font-size: 1.2em;
		width: calc(2ch / 1.2 - 4px);
		height: calc(2ch / 1.2 - 4px);
		line-height: 0.6;
	}

	.skip:hover {
		background: #3465a4;
		color: #bdf;
	}

	#console {
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #afc2db transparent;
		height: calc(12 * 1.2em);
		list-style: none;
		padding-left: 0;
		margin: 0 .4em .4em .4em;
		position: relative;
		word-wrap: break-word;
	}

	#console>*+* {
		margin-top: .5em;
	}

	.console-entry>* {
		display: block;
	}

	.console-entry .input  { color: #3465a4; }
	.console-entry .output { color: #333; }

	.console-entry .input:before  { content: '>> ' }
	.console-entry .output:before { content: '<- ' }

	#console-form {
		margin: 0 .4em .4em .4em;
	}

	#console-input {
		width: 100%;
		font-size: inherit;
	}

	.token.tagname { font-weight: bold; }
	.token.attr, .token.builtin, .token.italic { font-style: italic; }
	.token.string { opacity: .8; }
	.token.keyword { color: #3465a4; }
	.token.bold, .token.punctuation, .token.operator { font-weight: bold; }
	</style>
	</div>
	`;
	HDB.prototype.ui = function () {
		var node = document.createElement("div");
		var shadow = node.attachShadow({ mode: "open" });
		node.style.cssText = "all: initial";
		shadow.innerHTML = ui;
		document.body.appendChild(node);
		_hyperscript.processNode(shadow.querySelector(".hdb"));
	};
}
