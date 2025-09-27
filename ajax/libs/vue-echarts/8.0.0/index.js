import { Teleport, computed, defineComponent, h, inject, nextTick, onBeforeUnmount, onMounted, onUnmounted, onUpdated, shallowReactive, shallowRef, toRefs, toValue, warn, watch, watchEffect } from "vue";
import { init, throttle } from "echarts/core";

//#region src/composables/api.ts
const METHOD_NAMES = [
	"getWidth",
	"getHeight",
	"getDom",
	"getOption",
	"resize",
	"dispatchAction",
	"convertToPixel",
	"convertFromPixel",
	"containPixel",
	"getDataURL",
	"getConnectedDataURL",
	"appendData",
	"clear",
	"isDisposed",
	"dispose"
];
function usePublicAPI(chart) {
	function makePublicMethod(name) {
		return (...args) => {
			if (!chart.value) throw new Error("ECharts is not initialized yet.");
			return chart.value[name].apply(chart.value, args);
		};
	}
	function makePublicMethods() {
		const methods = Object.create(null);
		METHOD_NAMES.forEach((name) => {
			methods[name] = makePublicMethod(name);
		});
		return methods;
	}
	return makePublicMethods();
}

//#endregion
//#region src/composables/autoresize.ts
function useAutoresize(chart, autoresize, root) {
	watch([
		root,
		chart,
		autoresize
	], ([root$1, chart$1, autoresize$1], _, onCleanup) => {
		let ro = null;
		if (root$1 && chart$1 && autoresize$1) {
			const { offsetWidth, offsetHeight } = root$1;
			const { throttle: wait = 100, onResize } = autoresize$1 === true ? {} : autoresize$1;
			let initialResizeTriggered = false;
			const callback = () => {
				chart$1.resize();
				onResize?.();
			};
			const resizeCallback = wait ? throttle(callback, wait) : callback;
			ro = new ResizeObserver(() => {
				if (!initialResizeTriggered) {
					initialResizeTriggered = true;
					if (root$1.offsetWidth === offsetWidth && root$1.offsetHeight === offsetHeight) return;
				}
				if (root$1.offsetWidth === 0 || root$1.offsetHeight === 0) return;
				resizeCallback();
			});
			ro.observe(root$1);
		}
		onCleanup(() => {
			if (ro) {
				ro.disconnect();
				ro = null;
			}
		});
	});
}
const autoresizeProps = { autoresize: [Boolean, Object] };

//#endregion
//#region src/composables/loading.ts
const LOADING_OPTIONS_KEY = Symbol();
function useLoading(chart, loading, loadingOptions) {
	const defaultLoadingOptions = inject(LOADING_OPTIONS_KEY, {});
	const realLoadingOptions = computed(() => ({
		...toValue(defaultLoadingOptions),
		...loadingOptions?.value
	}));
	watchEffect(() => {
		const instance = chart.value;
		if (!instance) return;
		if (loading.value) instance.showLoading(realLoadingOptions.value);
		else instance.hideLoading();
	});
}
const loadingProps = {
	loading: Boolean,
	loadingOptions: Object
};

//#endregion
//#region src/utils.ts
function isBrowser() {
	return typeof window !== "undefined" && typeof document !== "undefined";
}
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
function omitOn(attrs) {
	const result = {};
	for (const key in attrs) if (!isOn(key)) result[key] = attrs[key];
	return result;
}
function isValidArrayIndex(key) {
	const num = Number(key);
	return Number.isInteger(num) && num >= 0 && num < Math.pow(2, 32) - 1 && String(num) === key;
}
function isSameSet(a, b) {
	const setA = new Set(a);
	const setB = new Set(b);
	if (setA.size !== setB.size) return false;
	for (const val of setA) if (!setB.has(val)) return false;
	return true;
}
function isPlainObject(v) {
	return v != null && typeof v === "object" && !Array.isArray(v);
}

//#endregion
//#region src/composables/slot.ts
const SLOT_OPTION_PATHS = {
	tooltip: ["tooltip", "formatter"],
	dataView: [
		"toolbox",
		"feature",
		"dataView",
		"optionToContent"
	]
};
const SLOT_PREFIXES = Object.keys(SLOT_OPTION_PATHS);
function isValidSlotName(key) {
	return SLOT_PREFIXES.some((slotPrefix) => key === slotPrefix || key.startsWith(slotPrefix + "-"));
}
function useSlotOption(slots, onSlotsChange) {
	const detachedRoot = isBrowser() ? document.createElement("div") : void 0;
	const containers = shallowReactive({});
	const initialized = shallowReactive({});
	const params = shallowReactive({});
	const isMounted = shallowRef(false);
	const teleportedSlots = () => {
		return isMounted.value && detachedRoot ? h(Teleport, { to: detachedRoot }, Object.entries(slots).filter(([key]) => isValidSlotName(key)).map(([key, slot]) => {
			const slotName = key;
			const slotContent = initialized[slotName] ? slot?.(params[slotName]) : void 0;
			return h("div", {
				ref: (el) => containers[slotName] = el,
				style: { display: "contents" }
			}, slotContent);
		})) : void 0;
	};
	function patchOption(src) {
		const root = { ...src };
		Object.keys(slots).filter((key) => {
			const isValidSlot = isValidSlotName(key);
			if (!isValidSlot) warn(`Invalid vue-echarts slot name: ${key}`);
			return isValidSlot;
		}).forEach((key) => {
			const path = key.split("-");
			const prefix = path.shift();
			path.push(...SLOT_OPTION_PATHS[prefix]);
			let cur = root;
			for (let i = 0; i < path.length - 1; i++) {
				const seg = path[i];
				const next = cur[seg];
				cur[seg] = next ? Array.isArray(next) ? [...next] : { ...next } : isValidArrayIndex(seg) ? [] : {};
				cur = cur[seg];
			}
			cur[path[path.length - 1]] = (p) => {
				initialized[key] = true;
				params[key] = p;
				return containers[key];
			};
		});
		return root;
	}
	let slotNames = [];
	onUpdated(() => {
		const newSlotNames = Object.keys(slots).filter(isValidSlotName);
		if (!isSameSet(newSlotNames, slotNames)) {
			slotNames.forEach((key) => {
				if (!newSlotNames.includes(key)) {
					delete params[key];
					delete initialized[key];
					delete containers[key];
				}
			});
			slotNames = newSlotNames;
			onSlotsChange();
		}
	});
	onMounted(() => {
		isMounted.value = true;
	});
	onUnmounted(() => {
		detachedRoot?.remove();
	});
	return {
		teleportedSlots,
		patchOption
	};
}

//#endregion
//#region src/wc.ts
let registered = null;
const TAG_NAME = "x-vue-echarts";
function register() {
	if (registered != null) return registered;
	const registry = globalThis.customElements;
	if (!isBrowser() || !registry?.get) {
		registered = false;
		return registered;
	}
	if (!registry.get(TAG_NAME)) try {
		class ECElement extends HTMLElement {
			__dispose = null;
			disconnectedCallback() {
				if (this.__dispose) {
					this.__dispose();
					this.__dispose = null;
				}
			}
		}
		registry.define(TAG_NAME, ECElement);
	} catch {
		registered = false;
		return registered;
	}
	registered = true;
	return registered;
}

//#endregion
//#region src/smart-update.ts
/**
* Read an item's `id` as a string.
* Only accept string or number. Other types are ignored to surface inconsistent data early.
*/
function readId(item) {
	if (!isPlainObject(item)) return;
	const raw = item.id;
	if (typeof raw === "string") return raw;
	if (typeof raw === "number" && Number.isFinite(raw)) return String(raw);
}
/**
* Build a minimal signature from a full ECharts option.
* Only top-level keys are inspected.
*/
function buildSignature(option) {
	const opt = option;
	const optionsLength = Array.isArray(opt.options) ? opt.options.length : 0;
	const mediaLength = Array.isArray(opt.media) ? opt.media.length : 0;
	const arrays = Object.create(null);
	const objects = [];
	const scalars = [];
	for (const key of Object.keys(opt)) {
		if (key === "options" || key === "media") continue;
		const value = opt[key];
		if (Array.isArray(value)) {
			const items = value;
			const ids = /* @__PURE__ */ new Set();
			let noIdCount = 0;
			for (let i = 0; i < items.length; i++) {
				const id = readId(items[i]);
				if (id !== void 0) ids.add(id);
				else noIdCount++;
			}
			arrays[key] = {
				idsSorted: ids.size > 0 ? Array.from(ids).sort() : [],
				noIdCount
			};
		} else if (isPlainObject(value)) objects.push(key);
		else if (value !== void 0) scalars.push(key);
	}
	if (objects.length > 1) objects.sort();
	if (scalars.length > 1) scalars.sort();
	return {
		optionsLength,
		mediaLength,
		arrays,
		objects,
		scalars
	};
}
function diffKeys(prevKeys, nextKeys) {
	if (prevKeys.length === 0) return [];
	if (nextKeys.length === 0) return prevKeys.slice();
	const nextSet = new Set(nextKeys);
	const missing = [];
	for (let i = 0; i < prevKeys.length; i++) {
		const key = prevKeys[i];
		if (!nextSet.has(key)) missing.push(key);
	}
	return missing;
}
function hasMissingIds(prevIds, nextIds) {
	if (prevIds.length === 0) return false;
	if (nextIds.length === 0) return true;
	const nextSet = new Set(nextIds);
	for (let i = 0; i < prevIds.length; i++) if (!nextSet.has(prevIds[i])) return true;
	return false;
}
/**
* Produce an update plan plus a normalized option that encodes common deletions.
* Falls back to `notMerge: true` when the change looks complex.
*/
function planUpdate(prev, option) {
	const next = buildSignature(option);
	if (!prev) return {
		option,
		signature: next,
		plan: { notMerge: false }
	};
	if (next.optionsLength < prev.optionsLength) return {
		option,
		signature: next,
		plan: { notMerge: true }
	};
	if (next.mediaLength < prev.mediaLength) return {
		option,
		signature: next,
		plan: { notMerge: true }
	};
	if (diffKeys(prev.scalars, next.scalars).length > 0) return {
		option,
		signature: next,
		plan: { notMerge: true }
	};
	const replace = /* @__PURE__ */ new Set();
	const overrides = /* @__PURE__ */ new Map();
	const missingObjects = diffKeys(prev.objects, next.objects);
	for (let i = 0; i < missingObjects.length; i++) overrides.set(missingObjects[i], null);
	for (const key of Object.keys(prev.arrays)) {
		const prevArray = prev.arrays[key];
		if (!prevArray) continue;
		const nextArray = next.arrays[key];
		if (!nextArray) {
			if (prevArray.idsSorted.length > 0 || prevArray.noIdCount > 0) {
				overrides.set(key, []);
				replace.add(key);
			}
			continue;
		}
		if (hasMissingIds(prevArray.idsSorted, nextArray.idsSorted)) {
			replace.add(key);
			continue;
		}
		if (nextArray.noIdCount < prevArray.noIdCount) replace.add(key);
	}
	let normalizedOption = option;
	let signature = next;
	if (overrides.size > 0) {
		const clone = { ...option };
		overrides.forEach((value, key) => {
			clone[key] = value;
		});
		normalizedOption = clone;
		signature = buildSignature(normalizedOption);
	}
	const replaceMerge = replace.size > 0 ? Array.from(replace).sort() : void 0;
	return {
		option: normalizedOption,
		signature,
		plan: replaceMerge ? {
			notMerge: false,
			replaceMerge
		} : { notMerge: false }
	};
}

//#endregion
//#region src/style.css?raw
var style_default = "x-vue-echarts{display:block;width:100%;height:100%;min-width:0;}\nx-vue-echarts>:first-child,x-vue-echarts>:first-child>canvas{border-radius:inherit;}\n";

//#endregion
//#region src/style.ts
if (typeof document !== "undefined") if (Array.isArray(document.adoptedStyleSheets) && "replaceSync" in CSSStyleSheet.prototype) {
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(style_default);
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
} else {
	const styleEl = document.createElement("style");
	styleEl.textContent = style_default;
	document.head.appendChild(styleEl);
}

//#endregion
//#region src/ECharts.ts
const wcRegistered = register();
const THEME_KEY = Symbol();
const INIT_OPTIONS_KEY = Symbol();
const UPDATE_OPTIONS_KEY = Symbol();
var ECharts_default = defineComponent({
	name: "Echarts",
	inheritAttrs: false,
	props: {
		option: Object,
		theme: { type: [Object, String] },
		initOptions: Object,
		updateOptions: Object,
		group: String,
		manualUpdate: Boolean,
		...autoresizeProps,
		...loadingProps
	},
	emits: {},
	slots: Object,
	setup(props, { attrs, expose, slots }) {
		const root = shallowRef();
		const chart = shallowRef();
		const defaultTheme = inject(THEME_KEY, null);
		const defaultInitOptions = inject(INIT_OPTIONS_KEY, null);
		const defaultUpdateOptions = inject(UPDATE_OPTIONS_KEY, null);
		const { autoresize, manualUpdate, loading, loadingOptions } = toRefs(props);
		const realOption = computed(() => props.option || {});
		const realTheme = computed(() => props.theme || toValue(defaultTheme));
		const realInitOptions = computed(() => props.initOptions || toValue(defaultInitOptions) || void 0);
		const realUpdateOptions = computed(() => props.updateOptions || toValue(defaultUpdateOptions));
		const nonEventAttrs = computed(() => omitOn(attrs));
		const nativeListeners = {};
		const listeners = /* @__PURE__ */ new Map();
		const { teleportedSlots, patchOption } = useSlotOption(slots, () => {
			if (!manualUpdate.value && props.option && chart.value) applyOption(chart.value, props.option);
		});
		let lastSignature;
		function resolveUpdateOptions(plan) {
			const result = {};
			const replacements = (plan?.replaceMerge ?? []).filter((key) => key != null);
			if (replacements.length > 0) result.replaceMerge = [...new Set(replacements)];
			if (plan?.notMerge !== void 0) result.notMerge = plan.notMerge;
			return result;
		}
		function applyOption(instance, option, override, manual = false) {
			const patched = patchOption(option);
			if (manual) {
				instance.setOption(patched, override ?? {});
				lastSignature = void 0;
				return;
			}
			if (realUpdateOptions.value) {
				const updateOptions$1 = override ?? realUpdateOptions.value;
				instance.setOption(patched, updateOptions$1);
				lastSignature = void 0;
				return;
			}
			const planned = planUpdate(lastSignature, patched);
			const updateOptions = resolveUpdateOptions(planned.plan);
			instance.setOption(planned.option, updateOptions);
			lastSignature = planned.signature;
		}
		Object.keys(attrs).filter((key) => isOn(key)).forEach((key) => {
			if (key.indexOf("Native:") === 2) {
				const nativeKey = `on${key.charAt(9).toUpperCase()}${key.slice(10)}`;
				nativeListeners[nativeKey] = attrs[key];
				return;
			}
			let event = key.charAt(2).toLowerCase() + key.slice(3);
			let zr;
			if (event.indexOf("zr:") === 0) {
				zr = true;
				event = event.substring(3);
			}
			let once;
			if (event.substring(event.length - 4) === "Once") {
				once = true;
				event = event.substring(0, event.length - 4);
			}
			listeners.set({
				event,
				zr,
				once
			}, attrs[key]);
		});
		function init$1(option, manual = false, override) {
			if (!root.value) return;
			const instance = chart.value = init(root.value, realTheme.value, realInitOptions.value);
			if (props.group) instance.group = props.group;
			listeners.forEach((handler, { zr, once, event }) => {
				if (!handler) return;
				const target = zr ? instance.getZr() : instance;
				if (once) {
					const raw = handler;
					let called = false;
					handler = (...args) => {
						if (called) return;
						called = true;
						raw(...args);
						target.off(event, handler);
					};
				}
				target.on(event, handler);
			});
			function resize() {
				if (instance && !instance.isDisposed()) instance.resize();
			}
			function commit() {
				const opt = option || realOption.value;
				if (opt) {
					applyOption(instance, opt, override, manual);
					override = void 0;
				}
			}
			if (autoresize.value) nextTick(() => {
				resize();
				commit();
			});
			else commit();
		}
		const setOption = (option, notMerge, lazyUpdate) => {
			if (!props.manualUpdate) {
				warn("[vue-echarts] setOption is only available when manual-update is true.");
				return;
			}
			const updateOptions = typeof notMerge === "boolean" ? {
				notMerge,
				lazyUpdate
			} : notMerge;
			if (!chart.value) return;
			applyOption(chart.value, option, updateOptions ?? void 0, true);
		};
		function cleanup() {
			if (chart.value) {
				chart.value.dispose();
				chart.value = void 0;
			}
			lastSignature = void 0;
		}
		let unwatchOption = null;
		watch(manualUpdate, (manualUpdate$1) => {
			if (typeof unwatchOption === "function") {
				unwatchOption();
				unwatchOption = null;
			}
			if (!manualUpdate$1) unwatchOption = watch(() => props.option, (option) => {
				if (!option) {
					lastSignature = void 0;
					return;
				}
				if (!chart.value) return;
				applyOption(chart.value, option);
			}, { deep: true });
		}, { immediate: true });
		watch(realInitOptions, () => {
			cleanup();
			init$1();
		}, { deep: true });
		watch(realTheme, (theme) => {
			chart.value?.setTheme(theme || {});
		}, { deep: true });
		watchEffect(() => {
			if (props.group && chart.value) chart.value.group = props.group;
		});
		const publicApi = usePublicAPI(chart);
		useLoading(chart, loading, loadingOptions);
		useAutoresize(chart, autoresize, root);
		onMounted(() => {
			init$1();
		});
		onBeforeUnmount(() => {
			if (wcRegistered && root.value) root.value.__dispose = cleanup;
			else cleanup();
		});
		expose({
			setOption,
			root,
			chart,
			...publicApi
		});
		return (() => h(TAG_NAME, {
			...nonEventAttrs.value,
			...nativeListeners,
			ref: root,
			class: ["echarts", nonEventAttrs.value.class]
		}, teleportedSlots()));
	}
});

//#endregion
//#region src/index.ts
var src_default = ECharts_default;

//#endregion
export { INIT_OPTIONS_KEY, LOADING_OPTIONS_KEY, THEME_KEY, UPDATE_OPTIONS_KEY, src_default as default };
//# sourceMappingURL=index.js.map