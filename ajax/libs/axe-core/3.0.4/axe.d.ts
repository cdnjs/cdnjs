// Type definitions for axe-core 3.0.2
// Project: https://github.com/dequelabs/axe-core
// Definitions by: Marcy Sutton <https://github.com/marcysutton>

declare module axe {

	type ImpactValue = "minor" | "moderate" | "serious" | "critical";

	type TagValue = "wcag2a" | "wcag2aa" | "section508" | "best-practice";

	type ReporterVersion = "v1" | "v2";

	type RunOnlyType = "rule" | "rules" | "tag" | "tags";

	type resultGroups = "inapplicable" | "passes" | "incomplete" | "violations";

	type RunOnlyObject = {
		include?: string[] | string[][],
		exclude?: string[] | string[][]
	}

	type RunCallback = (error: Error, results:AxeResults) => void;

	type ElementContext = Node | string | RunOnlyObject;

	interface RunOnly {
		type: RunOnlyType,
		values?: TagValue[] | RunOnlyObject
	}
	interface RunOptions {
		runOnly?: RunOnly,
		rules?: Object,
		iframes?: Boolean,
		elementRef?: Boolean,
		selectors?: Boolean,
		resultTypes?: resultGroups[],
	}
	interface AxeResults {
		url: string,
		timestamp: string,
		passes: Result[],
		violations: Result[],
		incomplete: Result[],
		inapplicable: Result[]
	}
	interface Result {
		description: string,
		help: string,
		helpUrl: string,
		id: string,
		impact: ImpactValue,
		tags: TagValue[],
		nodes: NodeResult[]
	}
	interface NodeResult {
		html: string,
		impact: ImpactValue,
		target: string[],
		any: CheckResult[],
		all: CheckResult[],
		none: CheckResult[],
		failureSummary?: string
	}
	interface CheckResult {
		id: string,
		impact: string,
		message: string,
		data: any,
		relatedNodes?: RelatedNode[]
	}
	interface RelatedNode {
		target: string[],
		html: string
	}
	interface Spec {
		branding?: {
			brand: string,
			application: string
		},
		reporter?: ReporterVersion,
		checks?: Check[],
		rules?: Rule[],
		noHtml?: boolean
	}
	interface Check {
		id: string,
		evaluate: Function,
		after?: Function,
		options?: any,
		matches?: string,
		enabled?: boolean
	}
	interface Rule {
		id: string,
		selector?: string,
		excludeHidden?: boolean,
		enabled?: boolean,
		pageLevel?: boolean,
		any?: string[],
		all?: string[],
		none?: string[],
		tags?: string[],
		matches?: string
	}
	interface AxePlugin {
		id: string,
		run(...args:any[]): any,
		commands: {
			id: string,
			callback(...args:any[]): void
		}[],
		cleanup?(callback:Function): void
	}

	let plugins: any

	/**
	 * Source string to use as an injected script in Selenium
	 */
	let source: string

	/**
	 * Object for aXe Results
	 */
	var AxeResults: AxeResults

	/**
	 * Runs a number of rules against the provided HTML page and returns the resulting issue list
	 *
	 * @param   {ElementContext} context  Optional The `Context` specification object @see Context
	 * @param   {RunOptions}     options  Optional Options passed into rules or checks, temporarily modifying them.
	 * @param   {RunCallback}    callback Optional The function to invoke when analysis is complete.
	 * @returns {Promise<AxeResults>|void} If the callback was not defined, aXe will return a Promise.
	 */
	function run(context?: ElementContext): Promise<AxeResults>
	function run(options: RunOptions): Promise<AxeResults>
	function run(callback: (error: Error, results:AxeResults) => void): void
	function run(context: ElementContext, callback: RunCallback): void
	function run(options: RunOptions, callback: RunCallback): void
	function run(context: ElementContext, options: RunOptions): Promise<AxeResults>
	function run(context: ElementContext, options: RunOptions, callback: RunCallback): void

	/**
	 * Method for configuring the data format used by aXe. Helpful for adding new
	 * rules, which must be registered with the library to execute.
	 * @param  {Spec}       Spec Object with valid `branding`, `reporter`, `checks` and `rules` data
	 */
	function configure(spec: Spec): void

	/**
	 * Searches and returns rules that contain a tag in the list of tags.
	 * @param  {Array}  tags  Optional array of tags
	 * @return {Array}  Array of rules
	 */
	function getRules(tags?: string[]): Object[]

	/**
	 * Restores the default axe configuration
	 */
	function reset(): void

	/**
	 * Function to register a plugin configuration in document and its subframes
	 * @param  {Object}    plugin    A plugin configuration object
	 */
	function registerPlugin(plugin: AxePlugin): void

	/**
	 * Function to clean up plugin configuration in document and its subframes
	 */
	function cleanup(): void

}

export = axe;
