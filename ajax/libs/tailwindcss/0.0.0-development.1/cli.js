"use strict";

// src/cli/index.ts
var import_oxide = require("@tailwindcss/oxide");

// src/index.ts
var import_lightningcss = require("lightningcss");

// src/utils/decode-arbitrary-value.ts
function decodeArbitraryValue(input) {
  if (input.startsWith("url(")) {
    return input;
  }
  return convertUnderscoresToWhitespace(input);
}
function convertUnderscoresToWhitespace(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (char === "\\" && input[i + 1] === "_") {
      output += "_";
      i += 1;
    } else if (char === "_") {
      output += " ";
    } else {
      output += char;
    }
  }
  return output;
}

// src/utils/segment.ts
function segment(input, separator) {
  let closingBracketStack = "";
  let parts = [];
  let lastPos = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (closingBracketStack.length === 0 && char === separator) {
      parts.push(input.slice(lastPos, idx));
      lastPos = idx + 1;
      continue;
    }
    switch (char) {
      case "\\":
        idx += 1;
        break;
      case "(":
        closingBracketStack += ")";
        break;
      case "[":
        closingBracketStack += "]";
        break;
      case "{":
        closingBracketStack += "}";
        break;
      case ")":
      case "]":
      case "}":
        if (closingBracketStack.length > 0 && char === closingBracketStack[closingBracketStack.length - 1]) {
          closingBracketStack = closingBracketStack.slice(0, closingBracketStack.length - 1);
        }
        break;
    }
  }
  parts.push(input.slice(lastPos));
  return parts;
}

// src/candidate.ts
var IS_VALID_PROPERTY_NAME = /^[a-zA-Z-][a-zA-Z0-9-_]+$/;
function findRoot(input, lookup) {
  let root2 = null;
  let value = null;
  {
    if (lookup.has(input)) {
      root2 = input;
      value = null;
    } else {
      let idx = input.lastIndexOf("-");
      if (idx === -1)
        return [null, null];
      do {
        let maybeRoot = input.slice(0, idx);
        if (lookup.has(maybeRoot)) {
          root2 = maybeRoot;
          value = input.slice(idx + 1);
          break;
        }
        idx = input.lastIndexOf("-", idx - 1);
      } while (idx > 0);
    }
  }
  return [root2, value];
}
function parseVariant(variant, variantMap) {
  if (variant[0] === "[" && variant[variant.length - 1] === "]") {
    if (variant[1] === "@" && variant.includes("&"))
      return null;
    return {
      kind: "arbitrary",
      selector: decodeArbitraryValue(variant.slice(1, -1))
    };
  }
  {
    let [variantWithoutModifier, modifier = null] = segment(variant, "/");
    let [root2, value] = findRoot(variantWithoutModifier, variantMap);
    if (root2 === null)
      return null;
    {
      let variant2 = {
        kind: "named",
        root: root2,
        modifier: null,
        value: null
      };
      if (modifier !== null) {
        variant2.modifier = {
          kind: "named",
          value: modifier
        };
      }
      if (value !== null) {
        if (value[0] === "[" && value[value.length - 1] === "]") {
          variant2.value = {
            kind: "arbitrary",
            value: value.slice(1, -1)
          };
        } else {
          variant2.value = {
            kind: "named",
            value
          };
        }
      }
      return variant2;
    }
  }
}
function parseCandidate(input, utilityMap, variantMap) {
  let rawVariants = segment(input, ":");
  let base = rawVariants.pop();
  let variants2 = [];
  for (let variant of rawVariants) {
    let parsedVariant = parseVariant(variant, variantMap);
    if (parsedVariant === null)
      return null;
    variants2.push(parsedVariant);
  }
  let state = {
    important: false,
    negative: false
  };
  if (base[base.length - 1] === "!") {
    state.important = true;
    base = base.slice(0, -1);
  }
  if (base[0] === "[" && base[base.length - 1] === "]") {
    let charCode = base.charCodeAt(1);
    if (charCode !== 45 && !(charCode >= 97 && charCode <= 122))
      return null;
    base = base.slice(1, -1);
    let idx = base.indexOf(":");
    if (idx === -1 || idx === 0 || idx === base.length - 1)
      return null;
    let property2 = base.slice(0, idx);
    if (!IS_VALID_PROPERTY_NAME.test(property2)) {
      return null;
    }
    if (property2.startsWith("http")) {
      return null;
    }
    let value2 = decodeArbitraryValue(base.slice(idx + 1));
    return {
      kind: "arbitrary",
      property: property2,
      value: value2,
      variants: variants2,
      important: state.important
    };
  }
  if (base[0] === "-") {
    state.negative = true;
    base = base.slice(1);
  }
  let [root2, value] = findRoot(base, utilityMap);
  if (root2 === null)
    return null;
  if (value === null) {
    return {
      kind: "named",
      root: root2,
      modifier: null,
      value: null,
      variants: variants2,
      negative: state.negative,
      important: state.important
    };
  }
  let candidate = {
    kind: "named",
    root: root2,
    modifier: null,
    value: null,
    variants: variants2,
    negative: state.negative,
    important: state.important
  };
  let [valueWithoutModifier, modifierSegment = null] = segment(value, "/");
  let startArbitraryIdx = valueWithoutModifier.indexOf("[");
  let valueIsArbitrary = startArbitraryIdx !== -1;
  let modifierIsArbitrary = modifierSegment && modifierSegment[0] === "[" && modifierSegment[modifierSegment.length - 1] === "]";
  if (modifierSegment) {
    if (modifierIsArbitrary) {
      candidate.modifier = {
        kind: "arbitrary",
        value: decodeArbitraryValue(modifierSegment.slice(1, -1))
      };
    } else {
      candidate.modifier = {
        kind: "named",
        value: modifierSegment
      };
    }
  }
  if (valueIsArbitrary) {
    let arbitraryValue = valueWithoutModifier.slice(startArbitraryIdx + 1, -1);
    let typehint = "";
    for (let i = 0; i < arbitraryValue.length; i++) {
      let code = arbitraryValue.charCodeAt(i);
      if (code === 58) {
        typehint = arbitraryValue.slice(0, i);
        arbitraryValue = arbitraryValue.slice(i + 1);
        break;
      }
      if (code === 45 || code >= 97 && code <= 122) {
        continue;
      }
      break;
    }
    let dashedIdent = null;
    if (arbitraryValue[0] === "-" && arbitraryValue[1] === "-") {
      dashedIdent = arbitraryValue;
      arbitraryValue = `var(${arbitraryValue})`;
    } else {
      arbitraryValue = decodeArbitraryValue(arbitraryValue);
    }
    candidate.value = {
      kind: "arbitrary",
      dataType: typehint || null,
      value: arbitraryValue,
      dashedIdent
    };
  } else {
    let fraction = modifierSegment === null || modifierIsArbitrary ? null : value.slice(valueWithoutModifier.lastIndexOf("-") + 1);
    candidate.value = {
      kind: "named",
      value: valueWithoutModifier,
      fraction
    };
  }
  return candidate;
}

// src/default-theme.ts
var colors = {
  black: "#000",
  white: "#fff",
  "slate-50": "#f8fafc",
  "slate-100": "#f1f5f9",
  "slate-200": "#e2e8f0",
  "slate-300": "#cbd5e1",
  "slate-400": "#94a3b8",
  "slate-500": "#64748b",
  "slate-600": "#475569",
  "slate-700": "#334155",
  "slate-800": "#1e293b",
  "slate-900": "#0f172a",
  "slate-950": "#020617",
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
  "gray-950": "#030712",
  "zinc-50": "#fafafa",
  "zinc-100": "#f4f4f5",
  "zinc-200": "#e4e4e7",
  "zinc-300": "#d4d4d8",
  "zinc-400": "#a1a1aa",
  "zinc-500": "#71717a",
  "zinc-600": "#52525b",
  "zinc-700": "#3f3f46",
  "zinc-800": "#27272a",
  "zinc-900": "#18181b",
  "zinc-950": "#09090b",
  "neutral-50": "#fafafa",
  "neutral-100": "#f5f5f5",
  "neutral-200": "#e5e5e5",
  "neutral-300": "#d4d4d4",
  "neutral-400": "#a3a3a3",
  "neutral-500": "#737373",
  "neutral-600": "#525252",
  "neutral-700": "#404040",
  "neutral-800": "#262626",
  "neutral-900": "#171717",
  "neutral-950": "#0a0a0a",
  "stone-50": "#fafaf9",
  "stone-100": "#f5f5f4",
  "stone-200": "#e7e5e4",
  "stone-300": "#d6d3d1",
  "stone-400": "#a8a29e",
  "stone-500": "#78716c",
  "stone-600": "#57534e",
  "stone-700": "#44403c",
  "stone-800": "#292524",
  "stone-900": "#1c1917",
  "stone-950": "#0c0a09",
  "red-50": "#fef2f2",
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
  "red-950": "#450a0a",
  "orange-50": "#fff7ed",
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
  "orange-950": "#431407",
  "amber-50": "#fffbeb",
  "amber-100": "#fef3c7",
  "amber-200": "#fde68a",
  "amber-300": "#fcd34d",
  "amber-400": "#fbbf24",
  "amber-500": "#f59e0b",
  "amber-600": "#d97706",
  "amber-700": "#b45309",
  "amber-800": "#92400e",
  "amber-900": "#78350f",
  "amber-950": "#451a03",
  "yellow-50": "#fefce8",
  "yellow-100": "#fef9c3",
  "yellow-200": "#fef08a",
  "yellow-300": "#fde047",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "yellow-900": "#713f12",
  "yellow-950": "#422006",
  "lime-50": "#f7fee7",
  "lime-100": "#ecfccb",
  "lime-200": "#d9f99d",
  "lime-300": "#bef264",
  "lime-400": "#a3e635",
  "lime-500": "#84cc16",
  "lime-600": "#65a30d",
  "lime-700": "#4d7c0f",
  "lime-800": "#3f6212",
  "lime-900": "#365314",
  "lime-950": "#1a2e05",
  "green-50": "#f0fdf4",
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
  "green-950": "#052e16",
  "emerald-50": "#ecfdf5",
  "emerald-100": "#d1fae5",
  "emerald-200": "#a7f3d0",
  "emerald-300": "#6ee7b7",
  "emerald-400": "#34d399",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "emerald-700": "#047857",
  "emerald-800": "#065f46",
  "emerald-900": "#064e3b",
  "emerald-950": "#022c22",
  "teal-50": "#f0fdfa",
  "teal-100": "#ccfbf1",
  "teal-200": "#99f6e4",
  "teal-300": "#5eead4",
  "teal-400": "#2dd4bf",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "teal-900": "#134e4a",
  "teal-950": "#042f2e",
  "cyan-50": "#ecfeff",
  "cyan-100": "#cffafe",
  "cyan-200": "#a5f3fc",
  "cyan-300": "#67e8f9",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "cyan-900": "#164e63",
  "cyan-950": "#083344",
  "sky-50": "#f0f9ff",
  "sky-100": "#e0f2fe",
  "sky-200": "#bae6fd",
  "sky-300": "#7dd3fc",
  "sky-400": "#38bdf8",
  "sky-500": "#0ea5e9",
  "sky-600": "#0284c7",
  "sky-700": "#0369a1",
  "sky-800": "#075985",
  "sky-900": "#0c4a6e",
  "sky-950": "#082f49",
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
  "blue-950": "#172554",
  "indigo-50": "#eef2ff",
  "indigo-100": "#e0e7ff",
  "indigo-200": "#c7d2fe",
  "indigo-300": "#a5b4fc",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "indigo-900": "#312e81",
  "indigo-950": "#1e1b4b",
  "violet-50": "#f5f3ff",
  "violet-100": "#ede9fe",
  "violet-200": "#ddd6fe",
  "violet-300": "#c4b5fd",
  "violet-400": "#a78bfa",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
  "violet-700": "#6d28d9",
  "violet-800": "#5b21b6",
  "violet-900": "#4c1d95",
  "violet-950": "#2e1065",
  "purple-50": "#faf5ff",
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
  "purple-950": "#3b0764",
  "fuchsia-50": "#fdf4ff",
  "fuchsia-100": "#fae8ff",
  "fuchsia-200": "#f5d0fe",
  "fuchsia-300": "#f0abfc",
  "fuchsia-400": "#e879f9",
  "fuchsia-500": "#d946ef",
  "fuchsia-600": "#c026d3",
  "fuchsia-700": "#a21caf",
  "fuchsia-800": "#86198f",
  "fuchsia-900": "#701a75",
  "fuchsia-950": "#4a044e",
  "pink-50": "#fdf2f8",
  "pink-100": "#fce7f3",
  "pink-200": "#fbcfe8",
  "pink-300": "#f9a8d4",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "pink-800": "#9d174d",
  "pink-900": "#831843",
  "pink-950": "#500724",
  "rose-50": "#fff1f2",
  "rose-100": "#ffe4e6",
  "rose-200": "#fecdd3",
  "rose-300": "#fda4af",
  "rose-400": "#fb7185",
  "rose-500": "#f43f5e",
  "rose-600": "#e11d48",
  "rose-700": "#be123c",
  "rose-800": "#9f1239",
  "rose-900": "#881337",
  "rose-950": "#4c0519"
};
var default_theme_default = {
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "bounce 1s infinite"
  },
  aspectRatio: {
    auto: "auto",
    square: "1 / 1",
    video: "16 / 9"
  },
  backgroundImage: {
    none: "none",
    "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
    "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
    "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
    "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
    "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
    "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
    "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
    "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
  },
  blur: {
    0: "0",
    none: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
  },
  borderColor: {
    DEFAULT: colors["gray-200"]
  },
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  borderWidth: {
    DEFAULT: "1px",
    0: "0px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none"
  },
  brightness: {
    0: "0",
    50: ".5",
    75: ".75",
    90: ".9",
    95: ".95",
    100: "1",
    105: "1.05",
    110: "1.1",
    125: "1.25",
    150: "1.5",
    200: "2"
  },
  colors,
  columns: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    "3xs": "16rem",
    "2xs": "18rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem"
  },
  contrast: {
    0: "0",
    50: ".5",
    75: ".75",
    100: "1",
    125: "1.25",
    150: "1.5",
    200: "2"
  },
  dropShadow: {
    sm: "0 1px 1px rgb(0 0 0 / 0.05)",
    DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
    md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
    lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
    xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
    "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
    none: "0 0 #0000"
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  flexBasis: {
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    full: "100%"
  },
  flexGrow: {
    0: "0",
    DEFAULT: "1"
  },
  flexShrink: {
    0: "0",
    DEFAULT: "1"
  },
  fontFamily: {
    sans: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    serif: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
    mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1" }],
    "6xl": ["3.75rem", { lineHeight: "1" }],
    "7xl": ["4.5rem", { lineHeight: "1" }],
    "8xl": ["6rem", { lineHeight: "1" }],
    "9xl": ["8rem", { lineHeight: "1" }]
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  gradientColorStopPositions: {
    "0%": "0%",
    "5%": "5%",
    "10%": "10%",
    "15%": "15%",
    "20%": "20%",
    "25%": "25%",
    "30%": "30%",
    "35%": "35%",
    "40%": "40%",
    "45%": "45%",
    "50%": "50%",
    "55%": "55%",
    "60%": "60%",
    "65%": "65%",
    "70%": "70%",
    "75%": "75%",
    "80%": "80%",
    "85%": "85%",
    "90%": "90%",
    "95%": "95%",
    "100%": "100%"
  },
  grayscale: {
    0: "0",
    DEFAULT: "100%"
  },
  gridAutoColumns: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  },
  gridAutoRows: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  },
  gridColumn: {
    auto: "auto",
    "span-1": "span 1 / span 1",
    "span-2": "span 2 / span 2",
    "span-3": "span 3 / span 3",
    "span-4": "span 4 / span 4",
    "span-5": "span 5 / span 5",
    "span-6": "span 6 / span 6",
    "span-7": "span 7 / span 7",
    "span-8": "span 8 / span 8",
    "span-9": "span 9 / span 9",
    "span-10": "span 10 / span 10",
    "span-11": "span 11 / span 11",
    "span-12": "span 12 / span 12",
    "span-full": "1 / -1"
  },
  gridColumnEnd: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridColumnStart: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridRow: {
    auto: "auto",
    "span-1": "span 1 / span 1",
    "span-2": "span 2 / span 2",
    "span-3": "span 3 / span 3",
    "span-4": "span 4 / span 4",
    "span-5": "span 5 / span 5",
    "span-6": "span 6 / span 6",
    "span-7": "span 7 / span 7",
    "span-8": "span 8 / span 8",
    "span-9": "span 9 / span 9",
    "span-10": "span 10 / span 10",
    "span-11": "span 11 / span 11",
    "span-12": "span 12 / span 12",
    "span-full": "1 / -1"
  },
  gridRowEnd: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridRowStart: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridTemplateColumns: {
    none: "none",
    subgrid: "subgrid",
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    7: "repeat(7, minmax(0, 1fr))",
    8: "repeat(8, minmax(0, 1fr))",
    9: "repeat(9, minmax(0, 1fr))",
    10: "repeat(10, minmax(0, 1fr))",
    11: "repeat(11, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))"
  },
  gridTemplateRows: {
    none: "none",
    subgrid: "subgrid",
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    7: "repeat(7, minmax(0, 1fr))",
    8: "repeat(8, minmax(0, 1fr))",
    9: "repeat(9, minmax(0, 1fr))",
    10: "repeat(10, minmax(0, 1fr))",
    11: "repeat(11, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))"
  },
  height: {
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    full: "100%",
    screen: "100vh",
    svh: "100svh",
    lvh: "100lvh",
    dvh: "100dvh",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg"
  },
  inset: {
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    full: "100%"
  },
  invert: {
    0: "0",
    DEFAULT: "100%"
  },
  keyframes: {
    spin: {
      to: {
        rotate: "360deg"
      }
    },
    ping: {
      "75%, 100%": {
        scale: "2",
        opacity: "0"
      }
    },
    pulse: {
      "50%": {
        opacity: ".5"
      }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    }
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem"
  },
  listStyleType: {
    none: "none",
    disc: "disc",
    decimal: "decimal"
  },
  listStyleImage: {
    none: "none"
  },
  margin: {
    auto: "auto"
  },
  lineClamp: {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6"
  },
  maxHeight: {
    none: "none",
    full: "100%",
    screen: "100vh",
    svh: "100svh",
    lvh: "100lvh",
    dvh: "100dvh",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  maxWidth: {
    none: "none",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch"
  },
  minHeight: {
    full: "100%",
    screen: "100vh",
    svh: "100svh",
    lvh: "100lvh",
    dvh: "100dvh",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  minWidth: {
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  objectPosition: {
    bottom: "bottom",
    center: "center",
    left: "left",
    "left-bottom": "left bottom",
    "left-top": "left top",
    right: "right",
    "right-bottom": "right bottom",
    "right-top": "right top",
    top: "top"
  },
  opacity: {
    0: "0",
    5: "0.05",
    10: "0.1",
    15: "0.15",
    20: "0.2",
    25: "0.25",
    30: "0.3",
    35: "0.35",
    40: "0.4",
    45: "0.45",
    50: "0.5",
    55: "0.55",
    60: "0.6",
    65: "0.65",
    70: "0.7",
    75: "0.75",
    80: "0.8",
    85: "0.85",
    90: "0.9",
    95: "0.95",
    100: "1"
  },
  order: {
    first: "-9999",
    last: "9999",
    none: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12"
  },
  outlineOffset: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  outlineWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  ringColor: {
    DEFAULT: colors["blue-500"]
  },
  ringOffsetWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  ringOpacity: {
    DEFAULT: "0.5"
  },
  ringWidth: {
    DEFAULT: "3px",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  rotate: {
    0: "0deg",
    1: "1deg",
    2: "2deg",
    3: "3deg",
    6: "6deg",
    12: "12deg",
    45: "45deg",
    90: "90deg",
    180: "180deg"
  },
  saturate: {
    0: "0",
    50: ".5",
    100: "1",
    150: "1.5",
    200: "2"
  },
  scale: {
    0: "0",
    50: ".5",
    75: ".75",
    90: ".9",
    95: ".95",
    100: "1",
    105: "1.05",
    110: "1.1",
    125: "1.25",
    150: "1.5"
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    0: "0deg",
    1: "1deg",
    2: "2deg",
    3: "3deg",
    6: "6deg",
    12: "12deg"
  },
  spacing: {
    px: "1px",
    0: "0px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem"
  },
  stroke: {
    none: "none"
  },
  strokeWidth: {
    0: "0",
    1: "1",
    2: "2"
  },
  textDecorationThickness: {
    auto: "auto",
    "from-font": "from-font",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  textUnderlineOffset: {
    auto: "auto",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px"
  },
  transformOrigin: {
    center: "center",
    top: "top",
    "top-right": "top right",
    right: "right",
    "bottom-right": "bottom right",
    bottom: "bottom",
    "bottom-left": "bottom left",
    left: "left",
    "top-left": "top left"
  },
  transitionDelay: {
    0: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  transitionDuration: {
    DEFAULT: "150ms",
    0: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  translate: {
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    full: "100%"
  },
  size: {
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  width: {
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    full: "100%",
    screen: "100vw",
    svw: "100svw",
    lvw: "100lvw",
    dvw: "100dvw",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  willChange: {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform"
  },
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50"
  }
};

// src/preflight.ts
var css = String.raw;
var preflight_default = css`
  :root {
    --default-border-color: #e5e7eb;
    --default-placeholder-color: #9ca3af;
  }

  /*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
  */

  *,
  ::before,
  ::after {
    box-sizing: border-box; /* 1 */
    border-width: 0; /* 2 */
    border-style: solid; /* 2 */
    border-color: var(--default-border-color, currentColor); /* 2 */
  }

  ::before,
  ::after {
    --tw-content: '';
  }

  /*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
  */

  html,
  :host {
    line-height: 1.5; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -moz-tab-size: 4; /* 3 */
    tab-size: 4; /* 3 */
    font-family: var(
      --default-font-family,
      ui-sans-serif,
      system-ui,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji'
    ); /* 4 */
    font-feature-settings: var(--default-font-feature-settings, normal); /* 5 */
    font-variation-settings: var(--default-font-variation-settings, normal); /* 6 */
    -webkit-tap-highlight-color: transparent; /* 7 */
  }

  /*
  1. Remove the margin in all browsers.
  2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
  */

  body {
    margin: 0; /* 1 */
    line-height: inherit; /* 2 */
  }

  /*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Ensure horizontal rules are visible by default.
  */

  hr {
    height: 0; /* 1 */
    color: inherit; /* 2 */
    border-top-width: 1px; /* 3 */
  }

  /*
  Add the correct text decoration in Chrome, Edge, and Safari.
  */

  abbr:where([title]) {
    text-decoration: underline dotted;
  }

  /*
  Remove the default font size and weight for headings.
  */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /*
  Reset links to optimize for opt-in styling instead of opt-out.
  */

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /*
  Add the correct font weight in Edge and Safari.
  */

  b,
  strong {
    font-weight: bolder;
  }

  /*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
  */

  code,
  kbd,
  samp,
  pre {
    font-family: var(
      --mono-font-family,
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      'Liberation Mono',
      'Courier New',
      monospace
    ); /* 4 */
    font-feature-settings: var(--mono-font-feature-settings, normal); /* 5 */
    font-variation-settings: var(--mono-font-variation-settings, normal); /* 6 */
    font-size: 1em; /* 4 */
  }

  /*
  Add the correct font size in all browsers.
  */

  small {
    font-size: 80%;
  }

  /*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
  */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
  */

  table {
    text-indent: 0; /* 1 */
    border-color: inherit; /* 2 */
    border-collapse: collapse; /* 3 */
  }

  /*
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  3. Remove default padding in all browsers.
  */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-feature-settings: inherit; /* 1 */
    font-variation-settings: inherit; /* 1 */
    font-size: 100%; /* 1 */
    font-weight: inherit; /* 1 */
    line-height: inherit; /* 1 */
    color: inherit; /* 1 */
    margin: 0; /* 2 */
    padding: 0; /* 3 */
  }

  /*
  Remove the inheritance of text transform in Edge and Firefox.
  */

  button,
  select {
    text-transform: none;
  }

  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Remove default button styles.
  */

  button,
  input:where([type='button']),
  input:where([type='reset']),
  input:where([type='submit']) {
    -webkit-appearance: button; /* 1 */
    background-color: transparent; /* 2 */
    background-image: none; /* 2 */
  }

  /*
  Use the modern Firefox focus style for all focusable elements.
  */

  :-moz-focusring {
    outline: auto;
  }

  /*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
  */

  :-moz-ui-invalid {
    box-shadow: none;
  }

  /*
  Add the correct vertical alignment in Chrome and Firefox.
  */

  progress {
    vertical-align: baseline;
  }

  /*
  Correct the cursor style of increment and decrement buttons in Safari.
  */

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  /*
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
  */

  [type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /*
  Remove the inner padding in Chrome and Safari on macOS.
  */

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to \`inherit\` in Safari.
  */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /*
  Add the correct display in Chrome and Safari.
  */

  summary {
    display: list-item;
  }

  /*
  Removes the default spacing for appropriate elements.
  */

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  fieldset {
    margin: 0;
    padding: 0;
  }

  legend {
    padding: 0;
  }

  ol,
  ul,
  menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  dialog {
    padding: 0;
  }

  /*
  Prevent resizing textareas horizontally by default.
  */

  textarea {
    resize: vertical;
  }

  /*
  1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
  2. Set the default placeholder color to the user's configured gray 400 color.
  */

  input::placeholder,
  textarea::placeholder {
    opacity: 1; /* 1 */
    color: var(--default-placeholder-color, #9ca3af); /* 2 */
  }

  /*
  Set the default cursor for buttons.
  */

  button,
  [role='button'] {
    cursor: pointer;
  }

  /*
  Make sure disabled buttons don't get the pointer cursor.
  */

  :disabled {
    cursor: default;
  }

  /*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
     This can trigger a poorly considered lint error in some tools but is included by design.
  */

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block; /* 1 */
    vertical-align: middle; /* 2 */
  }

  /*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
  */

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  /*
  Make elements with the HTML hidden attribute stay hidden by default.
  */

  [hidden] {
    display: none;
  }
`;

// src/property-order.ts
var property_order_default = [
  "pointer-events",
  "visibility",
  "position",
  // How do we make `inset-x-0` come before `top-0`?
  "inset",
  "inset-inline",
  "inset-block",
  "inset-inline-start",
  "inset-inline-end",
  "top",
  "right",
  "bottom",
  "left",
  "isolation",
  "z-index",
  "order",
  "grid-column",
  "grid-column-start",
  "grid-column-end",
  "grid-row",
  "grid-row-start",
  "grid-row-end",
  "float",
  "clear",
  // How do we make `mx-0` come before `mt-0`?
  // Idea: `margin-x` property that we compile away with a Visitor plugin?
  "margin",
  "margin-inline",
  "margin-block",
  "margin-inline-start",
  "margin-inline-end",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "box-sizing",
  "display",
  "aspect-ratio",
  "height",
  "max-height",
  "min-height",
  "width",
  "max-width",
  "min-width",
  "flex",
  "flex-shrink",
  "flex-grow",
  "flex-basis",
  "table-layout",
  "caption-side",
  "border-collapse",
  // There's no `border-spacing-x` property, we use variables, how to sort?
  "border-spacing",
  // '--tw-border-spacing-x',
  // '--tw-border-spacing-y',
  "transform-origin",
  // '--tw-translate-x',
  // '--tw-translate-y',
  "translate",
  "rotate",
  // '--tw-rotate',
  "--tw-skew-x",
  "--tw-skew-y",
  "scale",
  // '--tw-scale-x',
  // '--tw-scale-y',
  "transform",
  "animation",
  "cursor",
  "touch-action",
  "--tw-pan-x",
  "--tw-pan-y",
  "--tw-pinch-zoom",
  "resize",
  "scroll-snap-type",
  "--tw-scroll-snap-strictness",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-margin",
  "scroll-margin-inline-start",
  "scroll-margin-inline-end",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
  "scroll-padding",
  "scroll-padding-inline-start",
  "scroll-padding-inline-end",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "list-style-position",
  "list-style-type",
  "list-style-image",
  "appearance",
  "columns",
  "break-before",
  "break-inside",
  "break-after",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-template-columns",
  "grid-template-rows",
  "flex-direction",
  "flex-wrap",
  "place-content",
  "place-items",
  "align-content",
  "align-items",
  "justify-content",
  "justify-items",
  "gap",
  "column-gap",
  "row-gap",
  "--tw-space-x-reverse",
  "--tw-space-y-reverse",
  // Is there a more "real" property we could use for this?
  "divide-x-width",
  "divide-y-width",
  "--tw-divide-y-reverse",
  "divide-style",
  "divide-color",
  "--tw-divide-opacity",
  "place-self",
  "align-self",
  "justify-self",
  "overflow",
  "overflow-x",
  "overflow-y",
  "overscroll-behavior",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "scroll-behavior",
  "text-overflow",
  "hyphens",
  "white-space",
  "text-wrap",
  "overflow-wrap",
  "work-break",
  "border-radius",
  "border-start-radius",
  // Not real
  "border-end-radius",
  // Not real
  "border-top-radius",
  // Not real
  "border-right-radius",
  // Not real
  "border-bottom-radius",
  // Not real
  "border-left-radius",
  // Not real
  "border-start-start-radius",
  "border-start-end-radius",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "border-width",
  "border-inline-width",
  // Not real
  "border-inline-start-width",
  "border-inline-end-width",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-style",
  "border-color",
  "border-x-color",
  // Not real
  "border-y-color",
  // Not real
  "border-inline-start-color",
  "border-inline-end-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "--tw-border-opacity",
  "background-color",
  "--tw-bg-opacity",
  "background-image",
  "--tw-gradient-from",
  "--tw-gradient-from-position",
  "--tw-gradient-via",
  "--tw-gradient-via-position",
  "--tw-gradient-to",
  "--tw-gradient-to-position",
  "box-decoration-break",
  "background-size",
  "background-attachment",
  "background-clip",
  "background-position",
  "background-repeat",
  "background-origin",
  "fill",
  "stroke",
  "stroke-width",
  "object-fit",
  "object-position",
  "padding",
  "padding-inline",
  "padding-block",
  "padding-inline-start",
  "padding-inline-end",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "text-align",
  "text-indent",
  "vertical-align",
  "font-family",
  "font-size",
  "font-weight",
  "text-transform",
  "font-style",
  "font-variant-numeric",
  "line-height",
  "letter-spacing",
  "color",
  "--tw-text-opacity",
  "text-decoration-line",
  "text-decoration-color",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-underline-offset",
  "-webkit-font-smoothing",
  "placeholder-color",
  // Not real
  "--tw-placeholder-opacity",
  "caret-color",
  "accent-color",
  "opacity",
  "background-blend-mode",
  "mix-blend-mode",
  "--tw-shadow",
  "--tw-shadow-color",
  "--tw-ring-shadow",
  "--tw-ring-color",
  "--tw-ring-opacity",
  "--tw-ring-offset-width",
  "--tw-ring-offset-color",
  "box-shadow",
  "outline",
  "outline-width",
  "outline-offset",
  "outline-color",
  "--tw-blur",
  "--tw-brightness",
  "--tw-contast",
  "--tw-drop-shadow",
  "--tw-grayscale",
  "--tw-hue-rotate",
  "--tw-invert",
  "--tw-saturate",
  "--tw-sepia",
  "filter",
  "--tw-backdrop-blur",
  "--tw-backdrop-brightness",
  "--tw-backdrop-contast",
  "--tw-backdrop-grayscale",
  "--tw-backdrop-hue-rotate",
  "--tw-backdrop-invert",
  "--tw-backdrop-opacity",
  "--tw-backdrop-saturate",
  "--tw-backdrop-sepia",
  "backdrop-filter",
  "transition-property",
  "transition-delay",
  "transition-duration",
  "transition-timing-function",
  "will-change",
  "content",
  "forced-color-adjust"
];

// src/utils/is-color.ts
var NAMED_COLORS = [
  // CSS Level 1 colors
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
  // CSS Level 2/3 colors
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
  // Keywords
  "transparent",
  "currentcolor"
];
var SYSTEM_COLORS = [
  "Canvas",
  "CanvasText",
  "LinkText",
  "VisitedText",
  "ActiveText",
  "ButtonFace",
  "ButtonText",
  "ButtonBorder",
  "Field",
  "FieldText",
  "Highlight",
  "HighlightText",
  "SelectedItem",
  "SelectedItemText",
  "Mark",
  "MarkText",
  "GrayText",
  "AccentColor",
  "AccentColorText"
];
var IS_COLOR_FN = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
function isColor(value) {
  return value.charCodeAt(0) === 35 || SYSTEM_COLORS.includes(value) || IS_COLOR_FN.test(value) || NAMED_COLORS.includes(value.toLowerCase());
}

// src/utils/infer-data-type.ts
var checks = {
  color: isColor,
  length: isLength,
  percentage: isPercentage,
  number: isNumber,
  url: isUrl,
  position: isBackgroundPosition,
  "bg-size": isBackgroundSize,
  "line-width": isLineWidth,
  image: isImage,
  "family-name": isFamilyName,
  "generic-name": isGenericName,
  "absolute-size": isAbsoluteSize,
  "relative-size": isRelativeSize
};
function inferDataType(value, types) {
  if (value.startsWith("var("))
    return null;
  for (let type of types) {
    if (checks[type]?.(value)) {
      return type;
    }
  }
  return null;
}
var IS_URL = /^url\(.*\)$/;
function isUrl(value) {
  return IS_URL.test(value);
}
function isLineWidth(value) {
  return value === "thin" || value === "medium" || value === "thick";
}
var IS_IMAGE_FN = /^(?:element|image|cross-fade|image-set)\(/;
var IS_GRADIENT_FN = /^(repeating-)?(conic|linear|radial)-gradient\(/;
function isImage(value) {
  let count = 0;
  for (let part of segment(value, ",")) {
    if (part.startsWith("var("))
      continue;
    if (isUrl(part)) {
      count += 1;
      continue;
    }
    if (IS_GRADIENT_FN.test(part)) {
      count += 1;
      continue;
    }
    if (IS_IMAGE_FN.test(part)) {
      count += 1;
      continue;
    }
    return false;
  }
  return count > 0;
}
function isGenericName(value) {
  return value === "serif" || value === "sans-serif" || value === "monospace" || value === "cursive" || value === "fantasy" || value === "system-ui" || value === "ui-serif" || value === "ui-sans-serif" || value === "ui-monospace" || value === "ui-rounded" || value === "math" || value === "emoji" || value === "fangsong";
}
function isFamilyName(value) {
  let count = 0;
  for (let part of segment(value, ",")) {
    let char = part.charCodeAt(0);
    if (char >= 48 && char <= 57)
      return false;
    if (part.startsWith("var("))
      continue;
    count += 1;
  }
  return count > 0;
}
function isAbsoluteSize(value) {
  return value === "xx-small" || value === "x-small" || value === "small" || value === "medium" || value === "large" || value === "x-large" || value === "xx-large" || value === "xxx-large";
}
function isRelativeSize(value) {
  return value === "larger" || value === "smaller";
}
var HAS_NUMBER = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/;
var IS_NUMBER = new RegExp(`^${HAS_NUMBER.source}$`);
function isNumber(value) {
  return IS_NUMBER.test(value);
}
var IS_PERCENTAGE = new RegExp(`^${HAS_NUMBER.source}%$`);
function isPercentage(value) {
  return IS_PERCENTAGE.test(value);
}
var LENGTH_UNITS = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "vb",
  "vi",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
];
var IS_LENGTH = new RegExp(`^${HAS_NUMBER.source}(${LENGTH_UNITS.join("|")})$`);
function isLength(value) {
  return IS_LENGTH.test(value);
}
function isBackgroundPosition(value) {
  let count = 0;
  for (let part of segment(value, " ")) {
    if (part === "center" || part === "top" || part === "right" || part === "bottom" || part === "left") {
      count += 1;
      continue;
    }
    if (part.startsWith("var("))
      continue;
    if (isLength(part) || isPercentage(part)) {
      count += 1;
      continue;
    }
    return false;
  }
  return count > 0;
}
function isBackgroundSize(value) {
  let count = 0;
  for (let size of segment(value, ",")) {
    if (size === "cover" || size === "contain") {
      count += 1;
      continue;
    }
    let values = segment(size, " ");
    if (values.length !== 1 && values.length !== 2) {
      return false;
    }
    if (values.every((value2) => value2 === "auto" || isLength(value2) || isPercentage(value2))) {
      count += 1;
      continue;
    }
  }
  return count > 0;
}

// src/utils/parse-animations.ts
var DIRECTIONS = /* @__PURE__ */ new Set(["normal", "reverse", "alternate", "alternate-reverse"]);
var PLAY_STATES = /* @__PURE__ */ new Set(["running", "paused"]);
var FILL_MODES = /* @__PURE__ */ new Set(["none", "forwards", "backwards", "both"]);
var ITERATION_COUNTS = /* @__PURE__ */ new Set(["infinite"]);
var TIMINGS = /* @__PURE__ */ new Set([
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "step-start",
  "step-end"
]);
var TIMING_FNS = ["cubic-bezier", "steps"];
var TIME = /^(-?[\d.]+m?s)$/;
var DIGIT = /^-?(\d+)$/;
function parseAnimations(input) {
  let animations = [];
  for (let animation of segment(input, ",")) {
    let parts = segment(animation, " ").filter((part) => part.trim() !== "");
    for (let part of parts) {
      if (DIRECTIONS.has(part)) {
        continue;
      } else if (PLAY_STATES.has(part)) {
        continue;
      } else if (FILL_MODES.has(part)) {
        continue;
      } else if (ITERATION_COUNTS.has(part)) {
        continue;
      } else if (TIMINGS.has(part)) {
        continue;
      } else if (TIME.test(part)) {
        continue;
      } else if (DIGIT.test(part)) {
        continue;
      } else if (TIMING_FNS.some((f) => part.startsWith(`${f}(`))) {
        continue;
      } else {
        animations.push({
          value: animation,
          name: part
        });
        break;
      }
    }
  }
  return animations;
}

// src/utils/replace-shadow-colors.ts
var KEYWORDS = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]);
var LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
function replaceShadowColors(input, replacement) {
  for (let shadow of segment(input, ",")) {
    let parts = segment(shadow, " ").filter((part) => part.trim() !== "");
    let color = null;
    let offsetX = null;
    let offsetY = null;
    for (let part of parts) {
      if (KEYWORDS.has(part)) {
        continue;
      } else if (LENGTH.test(part)) {
        if (offsetX === null) {
          offsetX = part;
        } else if (offsetY === null) {
          offsetY = part;
        }
        LENGTH.lastIndex = 0;
      } else if (color === null) {
        color = part;
      }
    }
    if (offsetX !== null && offsetY !== null && color !== null) {
      input = input.replace(color, replacement);
    }
  }
  return input;
}

// src/utilities.ts
var utilities = /* @__PURE__ */ new Map();
if (false) {
  utilities = new class extends Map {
    set(key, value) {
      if (super.has(key)) {
        throw new Error(`Duplicate utility prefix [${key}]`);
      }
      super.set(key, value);
      return this;
    }
  }();
}
function atRoot(rules) {
  return rule("@at-root", rules);
}
function property(ident, initialValue, syntax) {
  return rule(`@property ${ident}`, [
    decl("syntax", syntax ? `"${syntax}"` : `"*"`),
    decl("initial-value", initialValue ?? " "),
    decl("inherits", "false")
  ]);
}
function withAlpha(value, alpha) {
  if (alpha === null) {
    return value;
  }
  return `color-mix(in srgb, ${value} ${alpha}, transparent)`;
}
function asColor(value, modifier, theme) {
  if (!modifier) {
    return value;
  }
  if (modifier.kind === "arbitrary") {
    return withAlpha(value, modifier.value);
  }
  let alpha = theme.opacity?.[modifier.value] ?? 1;
  if (alpha === 1) {
    return value;
  }
  return withAlpha(value, `${alpha * 100}%`);
}
function withNegative(value, candidate) {
  return candidate.negative ? `calc(${value} * -1)` : value;
}
function resolveThemeValue(candidateValue, theme, themeKeys) {
  for (let key of themeKeys) {
    let themeValue = theme?.[key]?.[candidateValue] ?? null;
    if (themeValue) {
      return themeValue;
    }
  }
  return null;
}
function staticUtility(className, declarations) {
  utilities.set(className, (candidate) => {
    if (candidate.negative || candidate.value) {
      return;
    }
    return declarations.map((node) => {
      return typeof node === "function" ? node() : decl(node[0], node[1]);
    });
  });
}
function dynamicUtility(classRoot, desc) {
  utilities.set(classRoot, (candidate, theme) => {
    if (!candidate.value)
      return;
    if (candidate.negative && !desc.supportsNegative)
      return;
    let value = null;
    if (candidate.value.kind === "arbitrary") {
      value = candidate.value.value;
    } else {
      value = resolveThemeValue(
        candidate.value.fraction ?? candidate.value.value,
        theme,
        desc.themeKeys
      );
      if (!value)
        return;
    }
    if (typeof value === "string") {
      value = withNegative(value, candidate);
    }
    return desc.handle(value);
  });
}
function colorUtility(classRoot, desc) {
  utilities.set(classRoot, (candidate, theme) => {
    if (!candidate.value)
      return;
    if (candidate.negative)
      return;
    let value = null;
    if (candidate.value.kind === "arbitrary") {
      value = candidate.value.value;
    } else {
      value = resolveThemeValue(candidate.value.value, theme, desc.themeKeys);
      if (!value)
        return;
    }
    value = asColor(value, candidate.modifier, theme);
    return desc.handle(value);
  });
}
staticUtility("sr-only", [
  ["position", "absolute"],
  ["width", "1px"],
  ["height", "1px"],
  ["padding", "0"],
  ["margin", "-1px"],
  ["overflow", "hidden"],
  ["clip", "rect(0, 0, 0, 0)"],
  ["white-space", "nowrap"],
  ["border-width", "0"]
]);
staticUtility("not-sr-only", [
  ["position", "static"],
  ["width", "auto"],
  ["height", "auto"],
  ["padding", "0"],
  ["margin", "0"],
  ["overflow", "visible"],
  ["clip", "auto"],
  ["white-space", "normal"]
]);
staticUtility("pointer-events-none", [["pointer-events", "none"]]);
staticUtility("pointer-events-auto", [["pointer-events", "auto"]]);
staticUtility("visible", [["visibility", "visible"]]);
staticUtility("invisible", [["visibility", "hidden"]]);
staticUtility("collapse", [["visibility", "collapse"]]);
staticUtility("static", [["position", "static"]]);
staticUtility("fixed", [["position", "fixed"]]);
staticUtility("absolute", [["position", "absolute"]]);
staticUtility("relative", [["position", "relative"]]);
staticUtility("sticky", [["position", "sticky"]]);
dynamicUtility("inset", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("inset", value)]
});
dynamicUtility("inset-x", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("--tw-sort", "inset-inline"), decl("right", value), decl("left", value)]
});
dynamicUtility("inset-y", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("--tw-sort", "inset-block"), decl("top", value), decl("bottom", value)]
});
dynamicUtility("start", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("inset-inline-start", value)]
});
dynamicUtility("end", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("inset-inline-end", value)]
});
dynamicUtility("top", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("top", value)]
});
dynamicUtility("right", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("right", value)]
});
dynamicUtility("bottom", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("bottom", value)]
});
dynamicUtility("left", {
  supportsNegative: true,
  themeKeys: ["inset", "spacing"],
  handle: (value) => [decl("left", value)]
});
staticUtility("isolate", [["isolation", "isolate"]]);
staticUtility("isolation-auto", [["isolation", "auto"]]);
dynamicUtility("z", {
  supportsNegative: true,
  themeKeys: ["zIndex"],
  handle: (value) => [decl("z-index", value)]
});
dynamicUtility("order", {
  supportsNegative: true,
  themeKeys: ["order"],
  handle: (value) => [decl("order", value)]
});
dynamicUtility("col", {
  supportsNegative: false,
  themeKeys: ["gridColumn"],
  handle: (value) => [decl("grid-column", value)]
});
dynamicUtility("col-start", {
  supportsNegative: false,
  themeKeys: ["gridColumnStart"],
  handle: (value) => [decl("grid-column-start", value)]
});
dynamicUtility("col-end", {
  supportsNegative: false,
  themeKeys: ["gridColumnEnd"],
  handle: (value) => [decl("grid-column-end", value)]
});
dynamicUtility("row", {
  supportsNegative: false,
  themeKeys: ["gridRow"],
  handle: (value) => [decl("grid-row", value)]
});
dynamicUtility("row-start", {
  supportsNegative: false,
  themeKeys: ["gridRowStart"],
  handle: (value) => [decl("grid-row-start", value)]
});
dynamicUtility("row-end", {
  supportsNegative: false,
  themeKeys: ["gridRowEnd"],
  handle: (value) => [decl("grid-row-end", value)]
});
staticUtility("float-start", [["float", "start"]]);
staticUtility("float-end", [["float", "end"]]);
staticUtility("float-right", [["float", "right"]]);
staticUtility("float-left", [["float", "left"]]);
staticUtility("float-none", [["float", "none"]]);
staticUtility("clear-start", [["clear", "start"]]);
staticUtility("clear-end", [["clear", "end"]]);
staticUtility("clear-right", [["clear", "right"]]);
staticUtility("clear-left", [["clear", "left"]]);
staticUtility("clear-both", [["clear", "both"]]);
staticUtility("clear-none", [["clear", "none"]]);
dynamicUtility("m", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin", value)]
});
dynamicUtility("mx", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [
    decl("--tw-sort", "margin-inline"),
    decl("margin-left", value),
    decl("margin-right", value)
  ]
});
dynamicUtility("my", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [
    decl("--tw-sort", "margin-block"),
    decl("margin-top", value),
    decl("margin-bottom", value)
  ]
});
dynamicUtility("ms", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-inline-start", value)]
});
dynamicUtility("me", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-inline-end", value)]
});
dynamicUtility("mt", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-top", value)]
});
dynamicUtility("mr", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-right", value)]
});
dynamicUtility("mb", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-bottom", value)]
});
dynamicUtility("ml", {
  supportsNegative: true,
  themeKeys: ["margin", "spacing"],
  handle: (value) => [decl("margin-left", value)]
});
staticUtility("box-border", [["box-sizing", "border-box"]]);
staticUtility("box-content", [["box-sizing", "content-box"]]);
staticUtility("line-clamp-none", [
  ["overlow", "visible"],
  ["display", "block"],
  ["-webkit-box-orient", "horizonal"],
  ["-webkit-line-clamp", "none"]
]);
dynamicUtility("line-clamp", {
  supportsNegative: false,
  themeKeys: ["lineClamp"],
  handle: (value) => [
    decl("overlow", "hidden"),
    decl("display", "-webkit-box"),
    decl("-webkit-box-orient", "vertical"),
    decl("-webkit-line-clamp", value)
  ]
});
staticUtility("block", [["display", "block"]]);
staticUtility("inline-block", [["display", "inline-block"]]);
staticUtility("inline", [["display", "inline"]]);
staticUtility("inline-flex", [["display", "inline-flex"]]);
staticUtility("table", [["display", "table"]]);
staticUtility("inline-table", [["display", "inline-table"]]);
staticUtility("table-caption", [["display", "table-caption"]]);
staticUtility("table-cell", [["display", "table-cell"]]);
staticUtility("table-column", [["display", "table-column"]]);
staticUtility("table-column-group", [["display", "table-column-group"]]);
staticUtility("table-footer-group", [["display", "table-footer-group"]]);
staticUtility("table-header-group", [["display", "table-header-group"]]);
staticUtility("table-row-group", [["display", "table-row-group"]]);
staticUtility("table-row", [["display", "table-row"]]);
staticUtility("flow-root", [["display", "flow-root"]]);
staticUtility("grid", [["display", "grid"]]);
staticUtility("inline-grid", [["display", "inline-grid"]]);
staticUtility("contents", [["display", "contents"]]);
staticUtility("list-item", [["display", "list-item"]]);
dynamicUtility("aspect", {
  supportsNegative: false,
  themeKeys: ["aspectRatio"],
  handle: (value) => [decl("aspect-ratio", value)]
});
dynamicUtility("size", {
  supportsNegative: false,
  themeKeys: ["size", "spacing"],
  handle: (value) => [decl("--tw-sort", "size"), decl("width", value), decl("height", value)]
});
dynamicUtility("w", {
  supportsNegative: false,
  themeKeys: ["width", "spacing"],
  handle: (value) => [decl("width", value)]
});
dynamicUtility("min-w", {
  supportsNegative: false,
  themeKeys: ["minWidth", "spacing"],
  handle: (value) => [decl("min-width", value)]
});
dynamicUtility("max-w", {
  supportsNegative: false,
  themeKeys: ["maxWidth", "spacing"],
  handle: (value) => [decl("max-width", value)]
});
dynamicUtility("h", {
  supportsNegative: false,
  themeKeys: ["height", "spacing"],
  handle: (value) => [decl("height", value)]
});
dynamicUtility("min-h", {
  supportsNegative: false,
  themeKeys: ["minHeight", "spacing"],
  handle: (value) => [decl("min-height", value)]
});
dynamicUtility("max-h", {
  supportsNegative: false,
  themeKeys: ["maxHeight", "spacing"],
  handle: (value) => [decl("max-height", value)]
});
staticUtility("flex-1", [["flex", "1 1 0%"]]);
staticUtility("flex-auto", [["flex", "1 1 auto"]]);
staticUtility("flex-initial", [["flex", "0 1 auto"]]);
staticUtility("flex-none", [["flex", "none"]]);
utilities.set("flex", (candidate) => {
  if (candidate.negative) {
    return;
  }
  if (!candidate.value) {
    return [decl("display", "flex")];
  }
  if (candidate.value.kind === "arbitrary") {
    return [decl("flex", candidate.value.value)];
  }
});
utilities.set("shrink", (candidate) => {
  if (candidate.negative) {
    return;
  }
  if (!candidate.value) {
    return [decl("flex-shrink", "1")];
  }
  if (candidate.value.kind === "arbitrary") {
    return [decl("flex-shrink", candidate.value.value)];
  }
  switch (candidate.value.value) {
    case "0":
      return [decl("flex-shrink", "0")];
  }
});
utilities.set("grow", (candidate) => {
  if (candidate.negative) {
    return;
  }
  if (!candidate.value) {
    return [decl("flex-grow", "1")];
  }
  if (candidate.value.kind === "arbitrary") {
    return [decl("flex-grow", candidate.value.value)];
  }
  switch (candidate.value.value) {
    case "0":
      return [decl("flex-grow", "0")];
  }
});
dynamicUtility("basis", {
  supportsNegative: false,
  themeKeys: ["flexBasis", "spacing"],
  handle: (value) => [decl("flex-basis", value)]
});
staticUtility("table-auto", [["table-layout", "auto"]]);
staticUtility("table-fixed", [["table-layout", "fixed"]]);
staticUtility("caption-top", [["caption-side", "top"]]);
staticUtility("caption-bottom", [["caption-side", "bottom"]]);
staticUtility("border-collapse", [["border-collapse", "collapse"]]);
staticUtility("border-separate", [["border-collapse", "separate"]]);
var borderSpacingProperties = () => atRoot([
  property("--tw-border-spacing-x", "0", "<length>"),
  property("--tw-border-spacing-y", "0", "<length>")
]);
dynamicUtility("border-spacing", {
  supportsNegative: false,
  themeKeys: ["borderSpacing", "spacing"],
  handle: (value) => [
    borderSpacingProperties(),
    decl("--tw-border-spacing-x", value),
    decl("--tw-border-spacing-y", value),
    decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
  ]
});
dynamicUtility("border-spacing-x", {
  supportsNegative: false,
  themeKeys: ["borderSpacing", "spacing"],
  handle: (value) => [
    borderSpacingProperties(),
    decl("--tw-border-spacing-x", value),
    decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
  ]
});
dynamicUtility("border-spacing-y", {
  supportsNegative: false,
  themeKeys: ["borderSpacing", "spacing"],
  handle: (value) => [
    borderSpacingProperties(),
    decl("--tw-border-spacing-y", value),
    decl("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")
  ]
});
dynamicUtility("origin", {
  supportsNegative: false,
  themeKeys: ["transformOrigin"],
  handle: (value) => [decl("transform-origin", value)]
});
var translateProperties = () => atRoot([
  property("--tw-translate-x", "0", "<length-percentage>"),
  property("--tw-translate-y", "0", "<length-percentage>")
]);
dynamicUtility("translate", {
  supportsNegative: true,
  themeKeys: ["translate", "spacing"],
  handle: (value) => [
    translateProperties(),
    decl("--tw-translate-x", value),
    decl("--tw-translate-y", value),
    decl("translate", `var(--tw-translate-x) var(--tw-translate-y)`)
  ]
});
dynamicUtility("translate-x", {
  supportsNegative: true,
  themeKeys: ["translate", "spacing"],
  handle: (value) => [
    translateProperties(),
    decl("--tw-translate-x", value),
    decl("translate", `var(--tw-translate-x) var(--tw-translate-y)`)
  ]
});
dynamicUtility("translate-y", {
  supportsNegative: true,
  themeKeys: ["translate", "spacing"],
  handle: (value) => [
    translateProperties(),
    decl("--tw-translate-y", value),
    decl("translate", `var(--tw-translate-x) var(--tw-translate-y)`)
  ]
});
dynamicUtility("rotate", {
  supportsNegative: true,
  themeKeys: ["rotate"],
  handle: (value) => [decl("rotate", value)]
});
var skewProperties = () => atRoot([property("--tw-skew-x", "0deg", "<angle>"), property("--tw-skew-y", "0deg", "<angle>")]);
dynamicUtility("skew", {
  supportsNegative: true,
  themeKeys: ["skew"],
  handle: (value) => [
    skewProperties(),
    decl("--tw-skew-x", value),
    decl("--tw-skew-y", value),
    decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
  ]
});
dynamicUtility("skew-x", {
  supportsNegative: true,
  themeKeys: ["skew"],
  handle: (value) => [
    skewProperties(),
    decl("--tw-skew-x", value),
    decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
  ]
});
dynamicUtility("skew-y", {
  supportsNegative: true,
  themeKeys: ["skew"],
  handle: (value) => [
    skewProperties(),
    decl("--tw-skew-y", value),
    decl("transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))")
  ]
});
var scaleProperties = () => atRoot([property("--tw-scale-x", "1", "<number>"), property("--tw-scale-y", "1", "<number>")]);
dynamicUtility("scale", {
  supportsNegative: true,
  themeKeys: ["scale"],
  handle: (value) => [
    scaleProperties(),
    decl("--tw-scale-x", value),
    decl("--tw-scale-y", value),
    decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
  ]
});
dynamicUtility("scale-x", {
  supportsNegative: true,
  themeKeys: ["scale"],
  handle: (value) => [
    scaleProperties(),
    decl("--tw-scale-x", value),
    decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
  ]
});
dynamicUtility("scale-y", {
  supportsNegative: true,
  themeKeys: ["scale"],
  handle: (value) => [
    scaleProperties(),
    decl("--tw-scale-y", value),
    decl("scale", "var(--tw-scale-x) var(--tw-scale-y)")
  ]
});
staticUtility("transform", [
  skewProperties,
  ["transform", "skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))"]
]);
staticUtility("transform-cpu", [["transform", "translate(0,0)"]]);
staticUtility("transform-gpu", [["transform", "translate(0,0,0)"]]);
staticUtility("transform-none", [
  ["translate", "none"],
  ["rotate", "none"],
  ["scale", "none"],
  ["transform", "none"]
]);
for (let value of [
  "auto",
  "default",
  "pointer",
  "wait",
  "text",
  "move",
  "help",
  "not-allowed",
  "none",
  "context-menu",
  "progress",
  "cell",
  "crosshair",
  "vertical-text",
  "alias",
  "copy",
  "no-drop",
  "grab",
  "grabbing",
  "all-scroll",
  "col-resize",
  "row-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "zoom-in",
  "zoom-out"
]) {
  staticUtility(`cursor-${value}`, [["cursor", value]]);
}
dynamicUtility("cursor", {
  supportsNegative: false,
  themeKeys: ["cursor"],
  handle: (value) => [decl("cursor", value)]
});
for (let value of ["auto", "none", "manipulation"]) {
  staticUtility(`touch-${value}`, [["touch-action", value]]);
}
var touchProperties = () => atRoot([property("--tw-pan-x"), property("--tw-pan-y"), property("--tw-pinch-zoom")]);
for (let value of ["x", "left", "right"]) {
  staticUtility(`touch-pan-${value}`, [
    touchProperties,
    ["--touch-pan-x", `pan-${value}`],
    ["touch-action", "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"]
  ]);
}
for (let value of ["y", "up", "down"]) {
  staticUtility(`touch-pan-${value}`, [
    touchProperties,
    ["--touch-pan-y", `pan-${value}`],
    ["touch-action", "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"]
  ]);
}
staticUtility("touch-pinch-zoom", [
  touchProperties,
  ["--touch-pan-x", `pinch-zoom`],
  ["touch-action", "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"]
]);
for (let value of ["none", "text", "all", "auto"]) {
  staticUtility(`select-${value}`, [["user-select", value]]);
}
staticUtility(`resize-none`, [["resize", "none"]]);
staticUtility(`resize-both`, [["resize", "both"]]);
staticUtility(`resize-x`, [["resize", "horizontal"]]);
staticUtility(`resize-y`, [["resize", "vertical"]]);
staticUtility(`snap-none`, [["scroll-snap-type", "none"]]);
var snapProperties = () => atRoot([property("--tw-scroll-snap-strictness", "proximity", "*")]);
for (let value of ["x", "y", "both"]) {
  staticUtility(`snap-${value}`, [
    snapProperties,
    ["scroll-snap-type", `${value} var(--tw-scroll-snap-strictness)`]
  ]);
}
staticUtility(`snap-mandatory`, [snapProperties, ["--tw-scroll-snap-strictness", "mandatory"]]);
staticUtility(`snap-proximity`, [snapProperties, ["--tw-scroll-snap-strictness", "proximity"]]);
staticUtility("snap-align-none", [["scroll-snap-align", "none"]]);
staticUtility("snap-start", [["scroll-snap-align", "start"]]);
staticUtility("snap-end", [["scroll-snap-align", "end"]]);
staticUtility("snap-center", [["scroll-snap-align", "center"]]);
staticUtility("snap-normal", [["scroll-snap-stop", "normal"]]);
staticUtility("snap-always", [["scroll-snap-stop", "always"]]);
dynamicUtility("scroll-m", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin", value)]
});
dynamicUtility("scroll-mx", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-left", value), decl("scroll-margin-right", value)]
});
dynamicUtility("scroll-my", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-top", value), decl("scroll-margin-bottom", value)]
});
dynamicUtility("scroll-ms", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-inline-start", value)]
});
dynamicUtility("scroll-me", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-inline-end", value)]
});
dynamicUtility("scroll-mt", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-top", value)]
});
dynamicUtility("scroll-mr", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-right", value)]
});
dynamicUtility("scroll-mb", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-bottom", value)]
});
dynamicUtility("scroll-ml", {
  supportsNegative: true,
  themeKeys: ["scrollMargin", "spacing"],
  handle: (value) => [decl("scroll-margin-left", value)]
});
dynamicUtility("scroll-p", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding", value)]
});
dynamicUtility("scroll-px", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-left", value), decl("scroll-padding-right", value)]
});
dynamicUtility("scroll-py", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-top", value), decl("scroll-padding-bottom", value)]
});
dynamicUtility("scroll-ps", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-inline-start", value)]
});
dynamicUtility("scroll-pe", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-inline-end", value)]
});
dynamicUtility("scroll-pt", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-top", value)]
});
dynamicUtility("scroll-pr", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-right", value)]
});
dynamicUtility("scroll-pb", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-bottom", value)]
});
dynamicUtility("scroll-pl", {
  supportsNegative: true,
  themeKeys: ["scrollPadding", "spacing"],
  handle: (value) => [decl("scroll-padding-left", value)]
});
staticUtility("list-inside", [["list-style-position", "inside"]]);
staticUtility("list-outside", [["list-style-position", "outside"]]);
staticUtility("list-none", [["list-style-type", "none"]]);
staticUtility("list-disc", [["list-style-type", "disc"]]);
staticUtility("list-decimal", [["list-style-type", "decimal"]]);
dynamicUtility("list", {
  supportsNegative: false,
  themeKeys: ["listStyleType"],
  handle: (value) => [decl("list-style-type", value)]
});
staticUtility("list-image-none", [["list-style-image", "none"]]);
dynamicUtility("list-image", {
  supportsNegative: false,
  themeKeys: ["listStyleImage"],
  handle: (value) => [decl("list-style-image", value)]
});
staticUtility("appearance-none", [["appearance", "none"]]);
staticUtility("appearance-auto", [["appearance", "auto"]]);
dynamicUtility("columns", {
  supportsNegative: false,
  themeKeys: ["columns"],
  handle: (value) => [decl("columns", value)]
});
for (let value of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) {
  staticUtility(`break-before-${value}`, [["break-before", value]]);
}
for (let value of ["auto", "avoid", "avoid-page", "avoid-column"]) {
  staticUtility(`break-inside-${value}`, [["break-inside", value]]);
}
for (let value of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) {
  staticUtility(`break-after-${value}`, [["break-after", value]]);
}
staticUtility("grid-flow-row", [["grid-auto-flow", "row"]]);
staticUtility("grid-flow-col", [["grid-auto-flow", "column"]]);
staticUtility("grid-flow-dense", [["grid-auto-flow", "dense"]]);
staticUtility("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]);
staticUtility("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]);
dynamicUtility("auto-cols", {
  supportsNegative: false,
  themeKeys: ["gridAutoColumns"],
  handle: (value) => [decl("grid-auto-columns", value)]
});
dynamicUtility("auto-rows", {
  supportsNegative: false,
  themeKeys: ["gridAutoRows"],
  handle: (value) => [decl("grid-auto-rows", value)]
});
dynamicUtility("grid-cols", {
  supportsNegative: false,
  themeKeys: ["gridTemplateColumns"],
  handle: (value) => [decl("grid-template-columns", value)]
});
dynamicUtility("grid-rows", {
  supportsNegative: false,
  themeKeys: ["gridTemplateRows"],
  handle: (value) => [decl("grid-template-rows", value)]
});
staticUtility("flex-row", [["flex-direction", "row"]]);
staticUtility("flex-row-reverse", [["flex-direction", "row-reverse"]]);
staticUtility("flex-col", [["flex-direction", "column"]]);
staticUtility("flex-col-reverse", [["flex-direction", "column-reverse"]]);
staticUtility("flex-wrap", [["flex-wrap", "wrap"]]);
staticUtility("flex-nowrap", [["flex-wrap", "nowrap"]]);
staticUtility("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]);
staticUtility("place-content-center", [["place-content", "center"]]);
staticUtility("place-content-start", [["place-content", "start"]]);
staticUtility("place-content-end", [["place-content", "end"]]);
staticUtility("place-content-between", [["place-content", "between"]]);
staticUtility("place-content-around", [["place-content", "around"]]);
staticUtility("place-content-evenly", [["place-content", "evenly"]]);
staticUtility("place-content-baseline", [["place-content", "baseline"]]);
staticUtility("place-content-stretch", [["place-content", "stretch"]]);
staticUtility("place-items-center", [["place-items", "center"]]);
staticUtility("place-items-start", [["place-items", "start"]]);
staticUtility("place-items-end", [["place-items", "end"]]);
staticUtility("place-items-baseline", [["place-items", "baseline"]]);
staticUtility("place-items-stretch", [["place-items", "stretch"]]);
staticUtility("content-normal", [["align-content", "normal"]]);
staticUtility("content-center", [["align-content", "center"]]);
staticUtility("content-start", [["align-content", "flex-start"]]);
staticUtility("content-end", [["align-content", "flex-end"]]);
staticUtility("content-between", [["align-content", "space-between"]]);
staticUtility("content-around", [["align-content", "space-around"]]);
staticUtility("content-evenly", [["align-content", "space-evenly"]]);
staticUtility("content-baseline", [["align-content", "baseline"]]);
staticUtility("content-stretch", [["align-content", "stretch"]]);
staticUtility("items-center", [["align-items", "center"]]);
staticUtility("items-start", [["align-items", "flex-start"]]);
staticUtility("items-end", [["align-items", "flex-end"]]);
staticUtility("items-baseline", [["align-items", "baseline"]]);
staticUtility("items-stretch", [["align-items", "stretch"]]);
staticUtility("justify-normal", [["justify-content", "normal"]]);
staticUtility("justify-center", [["justify-content", "center"]]);
staticUtility("justify-start", [["justify-content", "flex-start"]]);
staticUtility("justify-end", [["justify-content", "flex-end"]]);
staticUtility("justify-between", [["justify-content", "space-between"]]);
staticUtility("justify-around", [["justify-content", "space-around"]]);
staticUtility("justify-evenly", [["justify-content", "space-evenly"]]);
staticUtility("justify-baseline", [["justify-content", "baseline"]]);
staticUtility("justify-stretch", [["justify-content", "stretch"]]);
staticUtility("justify-items-normal", [["justify-items", "normal"]]);
staticUtility("justify-items-center", [["justify-items", "center"]]);
staticUtility("justify-items-start", [["justify-items", "start"]]);
staticUtility("justify-items-end", [["justify-items", "end"]]);
staticUtility("justify-items-stretch", [["justify-items", "stretch"]]);
dynamicUtility("gap", {
  supportsNegative: false,
  themeKeys: ["gap", "spacing"],
  handle: (value) => [decl("gap", value)]
});
dynamicUtility("gap-x", {
  supportsNegative: false,
  themeKeys: ["gap", "spacing"],
  handle: (value) => [decl("column-gap", value)]
});
dynamicUtility("gap-y", {
  supportsNegative: false,
  themeKeys: ["gap", "spacing"],
  handle: (value) => [decl("row-gap", value)]
});
dynamicUtility("space-x", {
  supportsNegative: true,
  themeKeys: ["space", "spacing"],
  handle: (value) => [
    atRoot([property("--tw-space-x-reverse", "0", "<number>")]),
    rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "row-gap"),
      decl("margin-inline-end", `calc(${value} * var(--tw-space-x-reverse))`),
      decl("margin-inline-start", `calc(${value} * calc(1 - var(--tw-space-x-reverse)))`)
    ])
  ]
});
dynamicUtility("space-y", {
  supportsNegative: true,
  themeKeys: ["space", "spacing"],
  handle: (value) => [
    atRoot([property("--tw-space-y-reverse", "0", "<number>")]),
    rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "column-gap"),
      decl("margin-bottom", `calc(${value} * var(--tw-space-y-reverse))`),
      decl("margin-top", `calc(${value} * calc(1 - var(--tw-space-y-reverse)))`)
    ])
  ]
});
staticUtility("space-x-reverse", [
  () => atRoot([property("--tw-space-x-reverse", "0", "<number>")]),
  () => rule("& > :not([hidden]) ~ :not([hidden])", [
    decl("--tw-sort", "row-gap"),
    decl("--tw-space-x-reverse", "1")
  ])
]);
staticUtility("space-y-reverse", [
  () => atRoot([property("--tw-space-y-reverse", "0", "<number>")]),
  () => rule("& > :not([hidden]) ~ :not([hidden])", [
    decl("--tw-sort", "column-gap"),
    decl("--tw-space-y-reverse", "1")
  ])
]);
dynamicUtility("divide-x", {
  supportsNegative: true,
  themeKeys: ["divideWidth", "borderWidth"],
  handle: (value) => [
    atRoot([property("--tw-divide-x-reverse", "0", "<number>")]),
    rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "divide-x-width"),
      decl("border-inline-end-width", `calc(${value} * var(--tw-divide-x-reverse))`),
      decl("border-inline-start-width", `calc(${value} * calc(1 - var(--tw-divide-x-reverse)))`)
    ])
  ]
});
dynamicUtility("divide-y", {
  supportsNegative: true,
  themeKeys: ["divideWidth", "borderWidth"],
  handle: (value) => [
    atRoot([property("--tw-divide-y-reverse", "0", "<number>")]),
    rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "divide-y-width"),
      decl("border-bottom-width", `calc(${value} * var(--tw-divide-y-reverse))`),
      decl("border-top-width", `calc(${value} * calc(1 - var(--tw-divide-y-reverse)))`)
    ])
  ]
});
staticUtility("divide-x-reverse", [
  () => atRoot([property("--tw-divide-x-reverse", "0", "<number>")]),
  () => rule("& > :not([hidden]) ~ :not([hidden])", [decl("--tw-divide-x-reverse", "1")])
]);
staticUtility("divide-y-reverse", [
  () => atRoot([property("--tw-divide-y-reverse", "0", "<number>")]),
  () => rule("& > :not([hidden]) ~ :not([hidden])", [decl("--tw-divide-y-reverse", "1")])
]);
for (let value of ["solid", "dashed", "dotted", "double", "none"]) {
  staticUtility(`divide-${value}`, [
    () => rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "divide-style"),
      decl("border-style", value)
    ])
  ]);
}
colorUtility("accent", {
  themeKeys: ["accentColor", "colors"],
  handle: (value) => [decl("accent-color", value)]
});
colorUtility("caret", {
  themeKeys: ["caretColor", "colors"],
  handle: (value) => [decl("caret-color", value)]
});
colorUtility("divide", {
  themeKeys: ["divideColor", "colors"],
  handle: (value) => [
    rule("& > :not([hidden]) ~ :not([hidden])", [
      decl("--tw-sort", "divide-color"),
      decl("border-color", value)
    ])
  ]
});
staticUtility("place-self-auto", [["place-self", "auto"]]);
staticUtility("place-self-start", [["place-self", "start"]]);
staticUtility("place-self-end", [["place-self", "end"]]);
staticUtility("place-self-center", [["place-self", "center"]]);
staticUtility("place-self-stretch", [["place-self", "stretch"]]);
staticUtility("self-auto", [["align-self", "auto"]]);
staticUtility("self-start", [["align-self", "flex-start"]]);
staticUtility("self-end", [["align-self", "flex-end"]]);
staticUtility("self-center", [["align-self", "center"]]);
staticUtility("self-stretch", [["align-self", "stretch"]]);
staticUtility("self-baseline", [["align-self", "baseline"]]);
staticUtility("justify-self-auto", [["justify-self", "auto"]]);
staticUtility("justify-self-start", [["justify-self", "flex-start"]]);
staticUtility("justify-self-end", [["justify-self", "flex-end"]]);
staticUtility("justify-self-center", [["justify-self", "center"]]);
staticUtility("justify-self-stretch", [["justify-self", "stretch"]]);
for (let value of ["auto", "hidden", "clip", "visible", "scroll"]) {
  staticUtility(`overflow-${value}`, [["overflow", value]]);
  staticUtility(`overflow-x-${value}`, [["overflow-x", value]]);
  staticUtility(`overflow-y-${value}`, [["overflow-y", value]]);
}
for (let value of ["auto", "contain", "none"]) {
  staticUtility(`overscroll-${value}`, [["overscroll-behavior", value]]);
  staticUtility(`overscroll-x-${value}`, [["overscroll-behavior-x", value]]);
  staticUtility(`overscroll-y-${value}`, [["overscroll-behavior-y", value]]);
}
staticUtility(`scroll-auto`, [["scroll-behavior", "auto"]]);
staticUtility(`scroll-smooth`, [["scroll-behavior", "smooth"]]);
staticUtility(`truncate`, [
  ["overflow", "hidden"],
  ["text-overflow", "ellipsis"],
  ["white-space", "nowrap"]
]);
staticUtility(`text-ellipsis`, [["text-overflow", "ellipsis"]]);
staticUtility(`text-clip`, [["text-overflow", "clip"]]);
staticUtility(`hyphens-none`, [["hyphens", "none"]]);
staticUtility(`hyphens-manual`, [["hyphens", "manual"]]);
staticUtility(`hyphens-auto`, [["hyphens", "auto"]]);
staticUtility(`whitespace-normal`, [["white-space", "normal"]]);
staticUtility(`whitespace-nowrap`, [["white-space", "nowrap"]]);
staticUtility(`whitespace-pre`, [["white-space", "pre"]]);
staticUtility(`whitespace-pre-line`, [["white-space", "pre-line"]]);
staticUtility(`whitespace-pre-wrap`, [["white-space", "pre-wrap"]]);
staticUtility(`whitespace-break-spaces`, [["white-space", "break-spaces"]]);
staticUtility("text-wrap", [["text-wrap", "wrap"]]);
staticUtility("text-nowrap", [["text-wrap", "nowrap"]]);
staticUtility("text-balance", [["text-wrap", "balance"]]);
staticUtility("text-pretty", [["text-wrap", "pretty"]]);
staticUtility("break-normal", [
  ["overflow-wrap", "normal"],
  ["word-break", "normal"]
]);
staticUtility("break-words", [["overflow-wrap", "break-word"]]);
staticUtility("break-all", [["word-break", "break-all"]]);
staticUtility("break-keep", [["word-break", "break-keep"]]);
dynamicUtility("rounded", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-radius", value)]
});
dynamicUtility("rounded-s", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [
    decl("border-start-start-radius", value),
    decl("border-end-start-radius", value)
  ]
});
dynamicUtility("rounded-e", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-start-end-radius", value), decl("border-end-end-radius", value)]
});
dynamicUtility("rounded-t", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [
    decl("border-top-left-radius", value),
    decl("border-top-right-radius", value)
  ]
});
dynamicUtility("rounded-r", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [
    decl("border-top-right-radius", value),
    decl("border-bottom-right-radius", value)
  ]
});
dynamicUtility("rounded-b", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [
    decl("border-bottom-right-radius", value),
    decl("border-bottom-left-radius", value)
  ]
});
dynamicUtility("rounded-l", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [
    decl("border-top-left-radius", value),
    decl("border-bottom-left-radius", value)
  ]
});
dynamicUtility("rounded-ss", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-start-start-radius", value)]
});
dynamicUtility("rounded-se", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-start-end-radius", value)]
});
dynamicUtility("rounded-ee", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-end-end-radius", value)]
});
dynamicUtility("rounded-es", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-end-start-radius", value)]
});
dynamicUtility("rounded-tl", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-top-left-radius", value)]
});
dynamicUtility("rounded-tr", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-top-right-radius", value)]
});
dynamicUtility("rounded-br", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-bottom-right-radius", value)]
});
dynamicUtility("rounded-bl", {
  supportsNegative: false,
  themeKeys: ["borderRadius"],
  handle: (value) => [decl("border-bottom-left-radius", value)]
});
staticUtility("border-solid", [["border-style", "solid"]]);
staticUtility("border-dashed", [["border-style", "dashed"]]);
staticUtility("border-dotted", [["border-style", "dotted"]]);
staticUtility("border-double", [["border-style", "double"]]);
staticUtility("border-hidden", [["border-style", "hidden"]]);
staticUtility("border-none", [["border-style", "none"]]);
function borderSideUtility(classRoot, desc) {
  utilities.set(classRoot, (candidate, theme) => {
    if (candidate.negative) {
      return;
    }
    if (!candidate.value) {
      let value = theme.borderWidth?.DEFAULT;
      if (!value)
        return;
      return desc.width(value);
    }
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "line-width", "length"]);
      switch (type) {
        case "line-width":
        case "length": {
          return desc.width(value);
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          return desc.color(value);
        }
      }
    }
    {
      let value = theme.borderColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
      if (value) {
        value = asColor(value, candidate.modifier, theme);
        return desc.color(value);
      }
    }
    {
      let value = theme.borderWidth?.[candidate.value.value];
      if (value) {
        return desc.width(value);
      }
    }
  });
}
borderSideUtility("border", {
  width: (value) => [decl("border-width", value)],
  color: (value) => [decl("border-color", value)]
});
borderSideUtility("border-x", {
  width: (value) => [decl("border-left-width", value), decl("border-right-width", value)],
  color: (value) => [decl("border-left-color", value), decl("border-right-color", value)]
});
borderSideUtility("border-y", {
  width: (value) => [decl("border-top-width", value), decl("border-bottom-width", value)],
  color: (value) => [decl("border-top-color", value), decl("border-bottom-color", value)]
});
borderSideUtility("border-s", {
  width: (value) => [decl("border-inline-start-width", value)],
  color: (value) => [decl("border-inline-start-color", value)]
});
borderSideUtility("border-e", {
  width: (value) => [decl("border-inline-end-width", value)],
  color: (value) => [decl("border-inline-end-color", value)]
});
borderSideUtility("border-t", {
  width: (value) => [decl("border-top-width", value)],
  color: (value) => [decl("border-top-color", value)]
});
borderSideUtility("border-r", {
  width: (value) => [decl("border-right-width", value)],
  color: (value) => [decl("border-right-color", value)]
});
borderSideUtility("border-b", {
  width: (value) => [decl("border-bottom-width", value)],
  color: (value) => [decl("border-bottom-color", value)]
});
borderSideUtility("border-l", {
  width: (value) => [decl("border-left-width", value)],
  color: (value) => [decl("border-left-color", value)]
});
staticUtility("bg-inherit", [["background-color", "inherit"]]);
staticUtility("bg-transparent", [["background-color", "transparent"]]);
staticUtility("bg-auto", [["background-size", "auto"]]);
staticUtility("bg-cover", [["background-size", "cover"]]);
staticUtility("bg-contain", [["background-size", "contain"]]);
staticUtility("bg-fixed", [["background-attachment", "fixed"]]);
staticUtility("bg-local", [["background-attachment", "local"]]);
staticUtility("bg-scroll", [["background-attachment", "scroll"]]);
staticUtility("bg-center", [["background-position", "center"]]);
staticUtility("bg-top", [["background-position", "top"]]);
staticUtility("bg-right-top", [["background-position", "right-top"]]);
staticUtility("bg-right", [["background-position", "right"]]);
staticUtility("bg-right-bottom", [["background-position", "right-bottom"]]);
staticUtility("bg-bottom", [["background-position", "bottom"]]);
staticUtility("bg-left-bottom", [["background-position", "left-bottom"]]);
staticUtility("bg-left", [["background-position", "left"]]);
staticUtility("bg-left-top", [["background-position", "left-top"]]);
staticUtility("bg-repeat", [["background-repeat", "repeat"]]);
staticUtility("bg-no-repeat", [["background-repeat", "no-repeat"]]);
staticUtility("bg-repeat-x", [["background-repeat", "repeat-x"]]);
staticUtility("bg-repeat-y", [["background-repeat", "repeat-y"]]);
staticUtility("bg-round", [["background-repeat", "round"]]);
staticUtility("bg-space", [["background-repeat", "space"]]);
utilities.set("bg", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["image", "color", "length", "percentage", "position", "bg-size", "url"]);
    switch (type) {
      case "length":
      case "percentage":
      case "position": {
        return [decl("background-position", value)];
      }
      case "size":
      case "bg-size": {
        return [decl("background-size", value)];
      }
      case "image":
      case "url": {
        return [decl("background-image", value)];
      }
      default: {
        value = asColor(value, candidate.modifier, theme);
        return [decl("background-color", value)];
      }
    }
  }
  {
    switch (candidate.value.value) {
      case "current":
        return [decl("background-color", asColor("currentColor", candidate.modifier, theme))];
    }
    let themeValue = theme.backgroundColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
    if (themeValue) {
      themeValue = asColor(themeValue, candidate.modifier, theme);
      return [decl("background-color", themeValue)];
    }
  }
  {
    let themeValue = theme.backgroundImage?.[candidate.value.value];
    if (themeValue) {
      return [decl("background-image", themeValue)];
    }
    if (candidate.value.value === "none") {
      return [decl("background-image", "none")];
    }
  }
});
var gradientStopProperties = () => {
  return atRoot([
    property("--tw-gradient-from"),
    property("--tw-gradient-to"),
    property("--tw-gradient-stops"),
    property("--tw-gradient-from-position", "0%", "<length-percentage>"),
    property("--tw-gradient-via-position", "50%", "<length-percentage>"),
    property("--tw-gradient-to-position", "100%", "<length-percentage>")
  ]);
};
function gradientStopUtility(classRoot, desc) {
  utilities.set(classRoot, (candidate, theme) => {
    if (candidate.negative || !candidate.value) {
      return;
    }
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage"]);
      switch (type) {
        case "length":
        case "percentage": {
          return desc.position(value);
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          return desc.color(value);
        }
      }
    }
    {
      let value = theme.backgroundColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
      if (value) {
        value = asColor(value, candidate.modifier, theme);
        return desc.color(value);
      }
    }
    {
      let value = candidate.value.value;
      switch (value) {
        case "0%":
        case "5%":
        case "10%":
        case "15%":
        case "20%":
        case "25%":
        case "30%":
        case "35%":
        case "40%":
        case "45%":
        case "50%":
        case "55%":
        case "60%":
        case "65%":
        case "70%":
        case "75%":
        case "80%":
        case "85%":
        case "90%":
        case "95%":
        case "100%":
          return desc.position(value);
      }
    }
  });
}
gradientStopUtility("from", {
  color: (value) => [
    gradientStopProperties(),
    decl("--tw-gradient-from", `${value} var(--tw-gradient-from-position)`),
    decl("--tw-gradient-to", `transparent var(--tw-gradient-to-position)`),
    decl("--tw-gradient-stops", "var(--tw-gradient-from), var(--tw-gradient-to)")
  ],
  position: (value) => [gradientStopProperties(), decl("--tw-gradient-from-position", value)]
});
gradientStopUtility("via", {
  color: (value) => [
    gradientStopProperties(),
    decl("--tw-gradient-to", `transparent var(--tw-gradient-to-position)`),
    decl(
      "--tw-gradient-stops",
      `var(--tw-gradient-from), ${value} var(--tw-gradient-via-position), var(--tw-gradient-to)`
    )
  ],
  position: (value) => [gradientStopProperties(), decl("--tw-gradient-via-position", value)]
});
gradientStopUtility("to", {
  color: (value) => [
    gradientStopProperties(),
    decl("--tw-gradient-to", `${value} var(--tw-gradient-to-position)`)
  ],
  position: (value) => [gradientStopProperties(), decl("--tw-gradient-to-position", value)]
});
staticUtility("decoration-slice", [["box-decoration-break", "slice"]]);
staticUtility("decoration-clone", [["box-decoration-break", "clone"]]);
staticUtility("box-decoration-slice", [["box-decoration-break", "slice"]]);
staticUtility("box-decoration-clone", [["box-decoration-break", "clone"]]);
staticUtility("bg-clip-text", [["background-clip", "text"]]);
staticUtility("bg-clip-border", [["background-clip", "border-box"]]);
staticUtility("bg-clip-padding", [["background-clip", "padding-box"]]);
staticUtility("bg-clip-content", [["background-clip", "content-box"]]);
staticUtility("bg-origin-border", [["background-origin", "border-box"]]);
staticUtility("bg-origin-padding", [["background-origin", "padding-box"]]);
staticUtility("bg-origin-content", [["background-origin", "content-box"]]);
for (let value of [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
]) {
  staticUtility(`bg-blend-${value}`, [["background-blend-mode", value]]);
  staticUtility(`mix-blend-${value}`, [["mix-blend-mode", value]]);
}
staticUtility(`mix-blend-plus-lighter`, [["mix-blend-mode", "plus-lighter"]]);
utilities.set("fill", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    return [decl("fill", asColor(candidate.value.value, candidate.modifier, theme))];
  }
  switch (candidate.value.value) {
    case "current":
      return [decl("fill", asColor("currentColor", candidate.modifier, theme))];
  }
  let themeValue = theme.fill?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
  if (themeValue) {
    return [decl("fill", asColor(themeValue, candidate.modifier, theme))];
  }
});
utilities.set("stroke", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["color", "number", "length", "percentage"]);
    switch (type) {
      case "number":
      case "length":
      case "percentage": {
        return [decl("stroke-width", value)];
      }
      default: {
        value = asColor(candidate.value.value, candidate.modifier, theme);
        return [decl("stroke", value)];
      }
    }
  }
  switch (candidate.value.value) {
    case "current":
      return [decl("stroke", asColor("currentColor", candidate.modifier, theme))];
  }
  let themeValue = theme.stroke?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
  if (themeValue) {
    return [decl("stroke", asColor(themeValue, candidate.modifier, theme))];
  }
  themeValue = theme.strokeWidth?.[candidate.value.value] ?? theme.spacing?.[candidate.value.value];
  if (themeValue) {
    return [decl("stroke-width", themeValue)];
  }
});
staticUtility("object-contain", [["object-fit", "contain"]]);
staticUtility("object-cover", [["object-fit", "cover"]]);
staticUtility("object-fill", [["object-fit", "fill"]]);
staticUtility("object-none", [["object-fit", "none"]]);
staticUtility("object-scale-down", [["object-fit", "scale-down"]]);
dynamicUtility("object", {
  supportsNegative: false,
  themeKeys: ["objectPosition"],
  handle: (value) => [decl("object-position", value)]
});
dynamicUtility("p", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding", value)]
});
dynamicUtility("px", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-left", value), decl("padding-right", value)]
});
dynamicUtility("py", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-top", value), decl("padding-bottom", value)]
});
dynamicUtility("pt", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-top", value)]
});
dynamicUtility("ps", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-inline-start", value)]
});
dynamicUtility("pe", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-inline-end", value)]
});
dynamicUtility("pr", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-right", value)]
});
dynamicUtility("pb", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-bottom", value)]
});
dynamicUtility("pl", {
  supportsNegative: false,
  themeKeys: ["padding", "spacing"],
  handle: (value) => [decl("padding-left", value)]
});
staticUtility("text-left", [["text-align", "left"]]);
staticUtility("text-center", [["text-align", "center"]]);
staticUtility("text-right", [["text-align", "right"]]);
staticUtility("text-justify", [["text-align", "justify"]]);
staticUtility("text-start", [["text-align", "start"]]);
staticUtility("text-end", [["text-align", "end"]]);
dynamicUtility("indent", {
  supportsNegative: true,
  themeKeys: ["textIndent", "spacing"],
  handle: (value) => [decl("text-indent", value)]
});
staticUtility("align-baseline", [["vertical-align", "baseline"]]);
staticUtility("align-top", [["vertical-align", "top"]]);
staticUtility("align-middle", [["vertical-align", "middle"]]);
staticUtility("align-bottom", [["vertical-align", "bottom"]]);
staticUtility("align-text-top", [["vertical-align", "text-top"]]);
staticUtility("align-text-bottom", [["vertical-align", "text-bottom"]]);
staticUtility("align-sub", [["vertical-align", "sub"]]);
staticUtility("align-super", [["vertical-align", "super"]]);
dynamicUtility("align", {
  supportsNegative: false,
  themeKeys: [],
  handle: (value) => [decl("vertical-align", value)]
});
utilities.set("font", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["number", "generic-name", "family-name"]);
    switch (type) {
      case "generic-name":
      case "family-name": {
        return [decl("font-family", value)];
      }
      default: {
        return [decl("font-weight", value)];
      }
    }
  }
  {
    let themeValue = theme.fontFamily?.[candidate.value.value];
    if (themeValue) {
      let family = themeValue;
      let [families, options = {}] = Array.isArray(family) ? family : [family];
      let { fontFeatureSettings, fontVariationSettings } = options;
      let declarations = [decl("font-family", families)];
      fontFeatureSettings && declarations.push(decl("font-feature-settings", fontFeatureSettings));
      fontVariationSettings && declarations.push(decl("font-variation-settings", fontVariationSettings));
      return declarations;
    }
  }
  {
    let themeValue = theme.fontWeight?.[candidate.value.value];
    if (themeValue) {
      return [decl("font-weight", themeValue)];
    }
  }
});
staticUtility("uppercase", [["text-transform", "uppercase"]]);
staticUtility("lowercase", [["text-transform", "lowercase"]]);
staticUtility("capitalize", [["text-transform", "capitalize"]]);
staticUtility("normal-case", [["text-transform", "none"]]);
staticUtility("italic", [["font-style", "italic"]]);
staticUtility("not-italic", [["font-style", "normal"]]);
staticUtility("underline", [["text-decoration-line", "underline"]]);
staticUtility("overline", [["text-decoration-line", "overline"]]);
staticUtility("line-through", [["text-decoration-line", "line-through"]]);
staticUtility("no-underline", [["text-decoration-line", "none"]]);
colorUtility("placeholder", {
  themeKeys: ["placeholderColor", "colors"],
  handle: (value) => [
    rule("&::placeholder", [decl("--tw-sort", "placeholder-color"), decl("color", value)])
  ]
});
staticUtility("decoration-solid", [["text-decoration-style", "solid"]]);
staticUtility("decoration-double", [["text-decoration-style", "double"]]);
staticUtility("decoration-dotted", [["text-decoration-style", "dotted"]]);
staticUtility("decoration-dashed", [["text-decoration-style", "dashed"]]);
staticUtility("decoration-wavy", [["text-decoration-style", "wavy"]]);
staticUtility("decoration-auto", [["text-decoration-thickness", "auto"]]);
staticUtility("decoration-from-font", [["text-decoration-thickness", "from-font"]]);
utilities.set("decoration", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage"]);
    switch (type) {
      case "length":
      case "percentage": {
        return [decl("text-decoration-thickness", value)];
      }
      default: {
        value = asColor(value, candidate.modifier, theme);
        return [decl("text-decoration-color", value)];
      }
    }
  }
  {
    let value = theme.textDecorationThickness?.[candidate.value.value];
    if (value) {
      return [decl("text-decoration-thickness", value)];
    }
  }
  {
    let value = theme.textDecorationColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
    if (value) {
      value = asColor(value, candidate.modifier, theme);
      return [decl("text-decoration-color", value)];
    }
  }
});
utilities.set("animate", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    return [decl("animation", candidate.value.value)];
  }
  let value = theme.animation?.[candidate.value.value];
  if (!value) {
    return;
  }
  function parseKeyframeSteps(steps) {
    let ast = [];
    for (let [step, properties] of Object.entries(steps)) {
      let props = [];
      for (let [property2, value2] of Object.entries(properties)) {
        props.push(decl(property2, value2));
      }
      ast.push(rule(step, props));
    }
    return ast;
  }
  let keyframes = [];
  let animations = [];
  for (let animation of parseAnimations(value)) {
    let keyframeDefinition = theme.keyframes?.[animation.name];
    if (!keyframeDefinition) {
      continue;
    }
    keyframes.push(rule(`@keyframes ${animation.name}`, parseKeyframeSteps(keyframeDefinition)));
    animations.push(animation.value);
  }
  return [rule("@at-root", keyframes), decl("animation", animations.join(", "))];
});
{
  let cssFilterValue = [
    "var(--tw-blur)",
    "var(--tw-brightness)",
    "var(--tw-contrast)",
    "var(--tw-grayscale)",
    "var(--tw-hue-rotate)",
    "var(--tw-invert)",
    "var(--tw-saturate)",
    "var(--tw-sepia)",
    "var(--tw-drop-shadow)"
  ].join(" ");
  let cssBackdropFilterValue = [
    "var(--tw-backdrop-blur)",
    "var(--tw-backdrop-brightness)",
    "var(--tw-backdrop-contrast)",
    "var(--tw-backdrop-grayscale)",
    "var(--tw-backdrop-hue-rotate)",
    "var(--tw-backdrop-invert)",
    "var(--tw-backdrop-opacity)",
    "var(--tw-backdrop-saturate)",
    "var(--tw-backdrop-sepia)"
  ].join(" ");
  let filterProperties = () => {
    return atRoot([
      property("--tw-blur"),
      property("--tw-brightness"),
      property("--tw-contrast"),
      property("--tw-grayscale"),
      property("--tw-hue-rotate"),
      property("--tw-invert"),
      property("--tw-opacity"),
      property("--tw-saturate"),
      property("--tw-sepia")
    ]);
  };
  let backdropFilterProperties = () => {
    return atRoot([
      property("--tw-backdrop-blur"),
      property("--tw-backdrop-brightness"),
      property("--tw-backdrop-contrast"),
      property("--tw-backdrop-grayscale"),
      property("--tw-backdrop-hue-rotate"),
      property("--tw-backdrop-invert"),
      property("--tw-backdrop-opacity"),
      property("--tw-backdrop-saturate"),
      property("--tw-backdrop-sepia")
    ]);
  };
  utilities.set("filter", (candidate) => {
    if (candidate.negative) {
      return;
    }
    if (candidate.value === null) {
      return [filterProperties(), decl("filter", cssFilterValue)];
    }
    if (candidate.value.kind === "arbitrary") {
      return;
    }
    switch (candidate.value.value) {
      case "none":
        return [decl("filter", "none")];
    }
  });
  utilities.set("backdrop-filter", (candidate) => {
    if (candidate.negative) {
      return;
    }
    if (candidate.value === null) {
      return [backdropFilterProperties(), decl("backdrop-filter", cssFilterValue)];
    }
    if (candidate.value.kind === "arbitrary") {
      return;
    }
    switch (candidate.value.value) {
      case "none":
        return [decl("backdrop-filter", "none")];
    }
  });
  dynamicUtility("blur", {
    supportsNegative: false,
    themeKeys: ["blur"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-blur", `blur(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-blur", {
    supportsNegative: false,
    themeKeys: ["backdropBlur", "blur"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-blur", `blur(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("brightness", {
    supportsNegative: false,
    themeKeys: ["brightness"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-brightness", `brightness(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-brightness", {
    supportsNegative: false,
    themeKeys: ["backdropBrightness", "brightness"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-brightness", `brightness(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("contrast", {
    supportsNegative: false,
    themeKeys: ["contrast"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-contrast", `contrast(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-contrast", {
    supportsNegative: false,
    themeKeys: ["backdropContrast", "contrast"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-contrast", `contrast(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("grayscale", {
    supportsNegative: false,
    themeKeys: ["grayscale"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-grayscale", `grayscale(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-grayscale", {
    supportsNegative: false,
    themeKeys: ["backdropGrayscale", "grayscale"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-grayscale", `grayscale(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("hue-rotate", {
    supportsNegative: false,
    themeKeys: ["hueRotate"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-hue-rotate", `hue-rotate(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-hue-rotate", {
    supportsNegative: false,
    themeKeys: ["backdropHueRotate", "hueRotate"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-hue-rotate", `hue-rotate(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("invert", {
    supportsNegative: false,
    themeKeys: ["invert"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-invert", `invert(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-invert", {
    supportsNegative: false,
    themeKeys: ["backdropInvert", "invert"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-invert", `invert(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("saturate", {
    supportsNegative: false,
    themeKeys: ["saturate"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-saturate", `saturate(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-saturate", {
    supportsNegative: false,
    themeKeys: ["backdropSaturate", "saturate"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-saturate", `saturate(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("sepia", {
    supportsNegative: false,
    themeKeys: ["sepia"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-sepia", `sepia(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-sepia", {
    supportsNegative: false,
    themeKeys: ["backdropSepia", "sepia"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-sepia", `sepia(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
  dynamicUtility("drop-shadow", {
    supportsNegative: false,
    themeKeys: ["dropShadow"],
    handle: (value) => [
      filterProperties(),
      decl("--tw-drop-shadow", `drop-shadow(${value})`),
      decl("filter", cssFilterValue)
    ]
  });
  dynamicUtility("backdrop-opacity", {
    supportsNegative: false,
    themeKeys: ["backdropOpacity", "opacity"],
    handle: (value) => [
      backdropFilterProperties(),
      decl("--tw-backdrop-opacity", `opacity(${value})`),
      decl("backdrop-filter", cssBackdropFilterValue)
    ]
  });
}
var defaultTimingFunction = "var(--todo)";
var defaultDuration = "var(--todo)";
staticUtility("transition-none", [["transition-property", "none"]]);
staticUtility("transition-all", [
  ["transition-property", "all"],
  ["transition-timing-function", defaultTimingFunction],
  ["transition-duration", defaultDuration]
]);
dynamicUtility("transition", {
  supportsNegative: false,
  themeKeys: ["transitionProperty"],
  handle: (value) => [
    decl("transition-property", value),
    decl("transition-timing-function", defaultTimingFunction),
    decl("transition-duration", defaultDuration)
  ]
});
dynamicUtility("delay", {
  supportsNegative: false,
  themeKeys: ["transitionDelay"],
  handle: (value) => [decl("transition-delay", value)]
});
dynamicUtility("duration", {
  supportsNegative: false,
  themeKeys: ["transitionDuration"],
  handle: (value) => [decl("transition-duration", value)]
});
dynamicUtility("ease", {
  supportsNegative: false,
  themeKeys: ["transitionTimingFunction"],
  handle: (value) => [decl("transition-timing-function", value)]
});
staticUtility("will-change-auto", [["will-change", "auto"]]);
staticUtility("will-change-scroll", [["will-change", "scroll-position"]]);
staticUtility("will-change-contents", [["will-change", "contents"]]);
staticUtility("will-change-transform", [["will-change", "transform"]]);
dynamicUtility("will-change", {
  supportsNegative: false,
  themeKeys: [],
  handle: (value) => [decl("will-change", value)]
});
staticUtility("content-none", [["content", "none"]]);
dynamicUtility("content", {
  supportsNegative: false,
  themeKeys: [],
  handle: (value) => [
    atRoot([property("--tw-content")]),
    decl("--tw-content", value),
    decl("content", "var(--tw-content)")
  ]
});
staticUtility("forced-color-adjust-none", [["forced-color-adjust", "none"]]);
staticUtility("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]);
dynamicUtility("leading", {
  supportsNegative: false,
  themeKeys: ["lineHeight"],
  handle: (value) => [decl("line-height", value)]
});
dynamicUtility("tracking", {
  supportsNegative: true,
  themeKeys: ["letterSpacing"],
  handle: (value) => [decl("letter-spacing", value)]
});
staticUtility("antialiased", [
  ["-webkit-font-smoothing", "antialiased"],
  ["-moz-osx-font-smoothing", "grayscale"]
]);
staticUtility("subpixel-antialiased", [
  ["-webkit-font-smoothing", "auto"],
  ["-moz-osx-font-smoothing", "auto"]
]);
{
  let cssFontVariantNumericValue = "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";
  let fontVariantNumericProperties = () => {
    return atRoot([
      property("--tw-ordinal"),
      property("--tw-slashed-zero"),
      property("--tw-numeric-figure"),
      property("--tw-numeric-spacing"),
      property("--tw-numeric-fraction")
    ]);
  };
  staticUtility("normal-nums", [["font-variant-numeric", "normal"]]);
  staticUtility("ordinal", [
    fontVariantNumericProperties,
    ["--tw-ordinal", "ordinal"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("slashed-zero", [
    fontVariantNumericProperties,
    ["--tw-slashed-zero", "slashed-zero"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("lining-nums", [
    fontVariantNumericProperties,
    ["--tw-numeric-figure", "lining-nums"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("oldstyle-nums", [
    fontVariantNumericProperties,
    ["--tw-numeric-figure", "oldstyle-nums"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("proportional-nums", [
    fontVariantNumericProperties,
    ["--tw-numeric-spacing", "proportional-nums"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("tabular-nums", [
    fontVariantNumericProperties,
    ["--tw-numeric-spacing", "tabular-nums"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("diagonal-fractions", [
    fontVariantNumericProperties,
    ["--tw-numeric-fraction", "diagonal-fractions"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
  staticUtility("stacked-fractions", [
    fontVariantNumericProperties,
    ["--tw-numeric-fraction", "stacked-fractions"],
    ["font-variant-numeric", cssFontVariantNumericValue]
  ]);
}
staticUtility("outline-none", [
  ["outline", "2px solid transparent"],
  ["outline-offset", "2px"]
]);
staticUtility("outline-dashed", [["outline-style", "dashed"]]);
staticUtility("outline-dotted", [["outline-style", "dotted"]]);
staticUtility("outline-double", [["outline-style", "double"]]);
utilities.set("outline", (candidate, theme) => {
  if (candidate.negative) {
    return;
  }
  if (candidate.value === null) {
    return [decl("outline-style", "solid")];
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "number", "percentage"]);
    switch (type) {
      case "length":
      case "number":
      case "percentage": {
        return [decl("outline-width", value)];
      }
      default: {
        value = asColor(value, candidate.modifier, theme);
        return [decl("outline-color", value)];
      }
    }
  }
  {
    let value = theme.outlineColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
    if (value) {
      value = asColor(value, candidate.modifier, theme);
      return [decl("outline-color", value)];
    }
  }
  {
    let value = theme.outlineWidth?.[candidate.value.value];
    if (value) {
      return [decl("outline-width", value)];
    }
  }
});
dynamicUtility("outline-offset", {
  supportsNegative: true,
  themeKeys: ["outlineOffset"],
  handle: (value) => [decl("outline-offset", value)]
});
dynamicUtility("opacity", {
  supportsNegative: false,
  themeKeys: ["opacity"],
  handle: (value) => [decl("opacity", value)]
});
dynamicUtility("underline-offset", {
  supportsNegative: true,
  themeKeys: ["textUnderlineOffset"],
  handle: (value) => [decl("text-underline-offset", value)]
});
utilities.set("text", (candidate, theme) => {
  if (candidate.negative || !candidate.value) {
    return;
  }
  if (candidate.value.kind === "arbitrary") {
    let value = candidate.value.value;
    let type = candidate.value.dataType ?? inferDataType(value, ["color", "length", "percentage", "absolute-size", "relative-size"]);
    switch (type) {
      case "size":
      case "length":
      case "percentage":
      case "absolute-size":
      case "relative-size": {
        if (candidate.modifier) {
          let modifier = candidate.modifier.kind === "arbitrary" ? candidate.modifier.value : theme.lineHeight?.[candidate.modifier.value];
          if (modifier) {
            return [decl("font-size", value), decl("line-height", modifier)];
          }
        }
        return [decl("font-size", value)];
      }
      default: {
        value = asColor(value, candidate.modifier, theme);
        return [decl("color", value)];
      }
    }
  }
  {
    let value = theme.textColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
    if (value) {
      value = asColor(value, candidate.modifier, theme);
      return [decl("color", value)];
    }
  }
  {
    let value = theme.fontSize?.[candidate.value.value];
    if (value) {
      let [fontSize, options = {}] = Array.isArray(value) ? value : [value];
      if (candidate.modifier) {
        let modifier = candidate.modifier.kind === "arbitrary" ? candidate.modifier.value : theme.lineHeight?.[candidate.modifier.value];
        let declarations = [decl("font-size", fontSize)];
        modifier && declarations.push(decl("line-height", modifier));
        return declarations;
      }
      if (typeof options === "string") {
        return [decl("font-size", fontSize), decl("line-height", options)];
      }
      let { lineHeight, letterSpacing, fontWeight } = options;
      return [
        decl("font-size", fontSize),
        decl("line-height", lineHeight),
        decl("letter-spacing", letterSpacing),
        decl("font-weight", fontWeight)
      ];
    }
  }
});
{
  let cssBoxShadowValue = [
    `var(--tw-ring-offset-shadow)`,
    `var(--tw-ring-shadow)`,
    `var(--tw-shadow)`
  ].join(", ");
  let boxShadowProperties = () => {
    return atRoot([
      property("--tw-ring-offset-shadow", "0 0 #0000"),
      property("--tw-ring-shadow", "0 0 #0000"),
      property("--tw-shadow", "0 0 #0000"),
      property("--tw-shadow-colored", "0 0 #0000")
    ]);
  };
  utilities.set("shadow", (candidate, theme) => {
    if (candidate.negative) {
      return;
    }
    if (!candidate.value) {
      let value = theme.boxShadow?.DEFAULT;
      if (!value)
        return;
      return [
        boxShadowProperties(),
        decl("--tw-shadow", value),
        decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
        decl("box-shadow", cssBoxShadowValue)
      ];
    }
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color"]);
      switch (type) {
        case "color": {
          value = asColor(value, candidate.modifier, theme);
          return [
            boxShadowProperties(),
            decl("--tw-shadow-color", value),
            decl("--tw-shadow", "var(--tw-shadow-colored)")
          ];
        }
        default: {
          return [
            boxShadowProperties(),
            decl("--tw-shadow", value),
            decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
            decl("box-shadow", cssBoxShadowValue)
          ];
        }
      }
    }
    switch (candidate.value.value) {
      case "none":
        return [
          boxShadowProperties(),
          decl("--tw-shadow", "0 0 #0000"),
          decl("--tw-shadow-colored", "0 0 #0000"),
          decl("box-shadow", cssBoxShadowValue)
        ];
    }
    {
      let value = theme.boxShadow?.[candidate.value.value];
      if (value) {
        return [
          boxShadowProperties(),
          decl("--tw-shadow", value),
          decl("--tw-shadow-colored", replaceShadowColors(value, "var(--tw-shadow-color)")),
          decl("box-shadow", cssBoxShadowValue)
        ];
      }
    }
    {
      let value = theme.boxShadowColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
      if (value) {
        value = asColor(value, candidate.modifier, theme);
        return [
          boxShadowProperties(),
          decl("--tw-shadow-color", value),
          decl("--tw-shadow", "var(--tw-shadow-colored)")
        ];
      }
    }
  });
}
{
  let ringProperties = () => {
    let ringColorDefault = "#3b82f6";
    return atRoot([
      property("--tw-ring-inset"),
      property("--tw-ring-offset-width", "0px", "<length>"),
      property("--tw-ring-offset-color", "#fff"),
      property("--tw-ring-color", ringColorDefault),
      property("--tw-ring-offset-shadow", "0 0 #0000"),
      property("--tw-ring-shadow", "0 0 #0000"),
      property("--tw-shadow", "0 0 #0000"),
      property("--tw-shadow-colored", "0 0 #0000")
    ]);
  };
  let cssRingValue = [
    `var(--tw-ring-offset-shadow)`,
    `var(--tw-ring-shadow)`,
    `var(--tw-shadow, 0 0 #0000)`
  ].join(", ");
  staticUtility("ring-inset", [ringProperties, ["--tw-ring-inset", "inset"]]);
  utilities.set("ring", (candidate, theme) => {
    if (candidate.negative || !candidate.value) {
      return;
    }
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "length"]);
      switch (type) {
        case "length": {
          return [
            ringProperties(),
            decl(
              "--tw-ring-offset-shadow",
              "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"
            ),
            decl(
              "--tw-ring-shadow",
              `var(--tw-ring-inset) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color)`
            ),
            decl("box-shadow", cssRingValue)
          ];
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          return [decl("--tw-ring-color", value)];
        }
      }
    }
    {
      let value = theme.ringColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
      if (value) {
        value = asColor(value, candidate.modifier, theme);
        return [decl("--tw-ring-color", value)];
      }
    }
    {
      let value = theme.ringWidth?.[candidate.value.value];
      if (value) {
        return [
          ringProperties(),
          decl(
            "--tw-ring-offset-shadow",
            "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"
          ),
          decl(
            "--tw-ring-shadow",
            `var(--tw-ring-inset) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color)`
          ),
          decl("box-shadow", cssRingValue)
        ];
      }
    }
  });
  utilities.set("ring-offset", (candidate, theme) => {
    if (candidate.negative || !candidate.value) {
      return;
    }
    if (candidate.value.kind === "arbitrary") {
      let value = candidate.value.value;
      let type = candidate.value.dataType ?? inferDataType(value, ["color", "length"]);
      switch (type) {
        case "length": {
          return [decl("--tw-ring-offset-width", value)];
        }
        default: {
          value = asColor(value, candidate.modifier, theme);
          return [decl("--tw-ring-offset-color", value)];
        }
      }
    }
    {
      let value = theme.ringOffsetWidth?.[candidate.value.value];
      if (value) {
        return [decl("--tw-ring-offset-width", value)];
      }
    }
    {
      let value = theme.ringOffsetColor?.[candidate.value.value] ?? theme.colors?.[candidate.value.value];
      if (value) {
        value = asColor(value, candidate.modifier, theme);
        return [decl("--tw-ring-offset-color", value)];
      }
    }
  });
}

// src/utils/escape.ts
function escape(value) {
  if (arguments.length == 0) {
    throw new TypeError("`CSS.escape` requires an argument.");
  }
  var string = String(value);
  var length = string.length;
  var index = -1;
  var codeUnit;
  var result = "";
  var firstCodeUnit = string.charCodeAt(0);
  if (
    // If the character is the first character and is a `-` (U+002D), and
    // there is no second character, […]
    length == 1 && firstCodeUnit == 45
  ) {
    return "\\" + string;
  }
  while (++index < length) {
    codeUnit = string.charCodeAt(index);
    if (codeUnit == 0) {
      result += "\uFFFD";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
    ) {
      result += "\\" + codeUnit.toString(16) + " ";
      continue;
    }
    if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
      result += string.charAt(index);
      continue;
    }
    result += "\\" + string.charAt(index);
  }
  return result;
}

// src/variants.ts
var variants = /* @__PURE__ */ new Map();
if (false) {
  variants = new class extends Map {
    set(key, value) {
      if (super.has(key)) {
        throw new Error(`Duplicate variant prefix [${key}]`);
      }
      super.set(key, value);
      return this;
    }
  }();
}
function staticVariant(name, selectors) {
  variants.set(name, (r) => {
    r.nodes = selectors.map((selector) => rule(selector, r.nodes));
  });
}
variants.set("force", () => {
});
staticVariant("*", ["& > *"]);
variants.set("group", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  switch (variant.value.kind) {
    case "named": {
      let subvariant = parseVariant(variant.value.value, variants);
      if (subvariant === null)
        return null;
      if (subvariant.kind !== "named")
        return null;
      if (subvariant.root.startsWith("group"))
        return null;
      if (subvariant.root.startsWith("peer"))
        return null;
      let applyVariant = variants.get(subvariant.root);
      if (applyVariant === void 0)
        return null;
      {
        let result = applyVariant(ruleNode, subvariant);
        if (result === null)
          return null;
      }
      {
        subvariant.modifier = variant.modifier;
        for (let node of ruleNode.nodes) {
          if (node.kind !== "rule")
            return null;
          if (node.selector[0] === "@")
            return null;
          let groupSelector = subvariant.modifier ? `.group\\/${subvariant.modifier.value}` : ".group";
          node.selector = node.selector.replace("&", groupSelector);
          node.selector = `&:where(${node.selector} *)`;
        }
      }
      break;
    }
    case "arbitrary": {
      if (ruleNode.kind !== "rule")
        return null;
      if (variant.value.value[0] === "@")
        return null;
      let groupSelector = variant.modifier ? `.group\\/${variant.modifier.value}` : ".group";
      let selector = decodeArbitraryValue(variant.value.value).replace("&", `${groupSelector}`);
      ruleNode.nodes = [rule(`&:where(${selector} *)`, ruleNode.nodes)];
    }
  }
});
variants.set("peer", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  switch (variant.value.kind) {
    case "named": {
      let subvariant = parseVariant(variant.value.value, variants);
      if (subvariant === null)
        return null;
      if (subvariant.kind !== "named")
        return null;
      if (subvariant.root.startsWith("group"))
        return null;
      if (subvariant.root.startsWith("peer"))
        return null;
      let applyVariant = variants.get(subvariant.root);
      if (applyVariant === void 0)
        return null;
      {
        let result = applyVariant(ruleNode, subvariant);
        if (result === null)
          return null;
      }
      {
        subvariant.modifier = variant.modifier;
        for (let node of ruleNode.nodes) {
          if (node.kind !== "rule")
            return null;
          if (node.selector[0] === "@")
            return null;
          let peerSelector = subvariant.modifier ? `.peer\\/${subvariant.modifier.value}` : ".peer";
          node.selector = node.selector.replace("&", peerSelector);
          node.selector = `&:where(${node.selector} ~ *)`;
        }
      }
      break;
    }
    case "arbitrary": {
      if (ruleNode.kind !== "rule")
        return null;
      if (variant.value.value[0] === "@")
        return null;
      let peerSelector = variant.modifier ? `.peer\\/${variant.modifier.value}` : ".peer";
      let selector = decodeArbitraryValue(variant.value.value).replace("&", `${peerSelector}`);
      ruleNode.nodes = [rule(`&:where(${selector} ~ *)`, ruleNode.nodes)];
    }
  }
});
staticVariant("first-letter", ["&::first-letter"]);
staticVariant("first-line", ["&::first-line"]);
staticVariant("marker", ["& *::marker", "&::marker"]);
staticVariant("selection", ["& *::selection", "&::selection"]);
staticVariant("file", ["&::file-selector-button"]);
staticVariant("placeholder", ["&::placeholder"]);
staticVariant("backdrop", ["&::backdrop"]);
variants.set("before", (v) => {
  v.nodes = [rule("&::before", [decl("content", '""'), ...v.nodes])];
});
variants.set("after", (v) => {
  v.nodes = [rule("&::after", [decl("content", '""'), ...v.nodes])];
});
var pseudos = [
  // Positional
  ["first", "&:first-child"],
  ["last", "&:last-child"],
  ["only", "&:only-child"],
  ["odd", "&:nth-child(odd)"],
  ["even", "&:nth-child(even)"],
  ["first-of-type", "&:first-of-type"],
  ["last-of-type", "&:last-of-type"],
  ["only-of-type", "&:only-of-type"],
  // State
  // TODO: Remove alpha vars or no?
  ["visited", "&:visited"],
  ["target", "&:target"],
  ["open", "&[open]"],
  // Forms
  ["default", "&:default"],
  ["checked", "&:checked"],
  ["indeterminate", "&:indeterminate"],
  ["placeholder-shown", "&:placeholder-shown"],
  ["autofill", "&:autofill"],
  ["optional", "&:optional"],
  ["required", "&:required"],
  ["valid", "&:valid"],
  ["invalid", "&:invalid"],
  ["in-range", "&:in-range"],
  ["out-of-range", "&:out-of-range"],
  ["read-only", "&:read-only"],
  // Content
  ["empty", "&:empty"],
  // Interactive
  ["focus-within", "&:focus-within"],
  [
    "hover",
    "&:hover"
    // TODO: Update tests for this:
    // v => {
    //   v.nodes = [
    //     rule('@media (hover: hover) and (pointer: fine)', [
    //       rule('&:hover', v.nodes),
    //     ]),
    //   ]
    // }
  ],
  ["focus", "&:focus"],
  ["focus-visible", "&:focus-visible"],
  ["active", "&:active"],
  ["enabled", "&:enabled"],
  ["disabled", "&:disabled"]
];
for (let [key, value] of pseudos) {
  staticVariant(key, [value]);
}
staticVariant("ltr", ['&:where([dir="ltr"], [dir="ltr"] *)']);
staticVariant("rtl", ['&:where([dir="rtl"], [dir="rtl"] *)']);
staticVariant("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]);
staticVariant("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]);
staticVariant("dark", ["&:where(.dark, .dark *)"]);
staticVariant("print", ["@media print"]);
var screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};
for (let [key, value] of Object.entries(screens)) {
  staticVariant(key, [`@media (min-width: ${value})`]);
}
variants.set("supports", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  if (variant.value.kind === "named")
    return null;
  let value = variant.value.value;
  if (value === null)
    return null;
  value = decodeArbitraryValue(value);
  if (/^\w*\s*\(/.test(value)) {
    let query = value.replace(/\b(and|or|not)\b/g, " $1 ");
    ruleNode.nodes = [rule(`@supports ${query}`, ruleNode.nodes)];
    return;
  }
  if (!value.includes(":")) {
    value = `${value}: var(--tw)`;
  }
  if (value[0] !== "(" || value[value.length - 1] !== ")") {
    value = `(${value})`;
  }
  ruleNode.nodes = [rule(`@supports ${value}`, ruleNode.nodes)];
});
variants.set("has", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  if (variant.value.kind !== "arbitrary")
    return null;
  ruleNode.nodes = [rule(`&:has(${variant.value.value})`, ruleNode.nodes)];
});
for (let name of [
  "busy",
  "checked",
  "disabled",
  "expanded",
  "hidden",
  "pressed",
  "readonly",
  "required",
  "selected"
]) {
  staticVariant(`aria-${name}`, [`&[aria-${name}="true"]`]);
}
variants.set("aria", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  if (variant.value.kind !== "arbitrary")
    return null;
  ruleNode.nodes = [rule(`&[aria-${variant.value.value}]`, ruleNode.nodes)];
});
variants.set("data", (ruleNode, variant) => {
  if (variant.value === null)
    return null;
  if (variant.value.kind !== "arbitrary")
    return null;
  ruleNode.nodes = [rule(`&[data-${variant.value.value}]`, ruleNode.nodes)];
});
staticVariant("portrait", ["@media (orientation: portrait)"]);
staticVariant("landscape", ["@media (orientation: landscape)"]);
staticVariant("contrast-more", ["@media (prefers-contrast: more)"]);
staticVariant("contrast-less", ["@media (prefers-contrast: less)"]);
staticVariant("forced-colors", ["@media (forced-colors: active)"]);

// src/index.ts
function rule(selector, nodes) {
  return {
    kind: "rule",
    selector,
    nodes
  };
}
function decl(property2, value) {
  return {
    kind: "declaration",
    property: property2,
    value
  };
}
function toCss(ast) {
  return ast.map(function stringify(node) {
    let css2 = "";
    if (node.kind === "rule") {
      css2 += `${node.selector}{`;
      for (let child of node.nodes) {
        css2 += stringify(child);
      }
      css2 += "}";
    } else if (node.property !== "--tw-sort" && node.value !== void 0 && node.value !== null) {
      css2 += `${node.property}:${node.value};`;
    }
    return css2;
  }).join("\n");
}
function optimizeCss(input) {
  return (0, import_lightningcss.transform)({
    filename: "input.css",
    code: Buffer.from(input),
    minify: false,
    sourceMap: false,
    drafts: {
      customMedia: true
    },
    nonStandard: {
      deepSelectorCombinator: true
    },
    include: import_lightningcss.Features.Nesting,
    exclude: import_lightningcss.Features.LogicalProperties
  }).code.toString();
}
function applyImportant(ast) {
  for (let node of ast) {
    if (node.kind === "rule" && node.selector[0] === "@" && node.selector.startsWith("@keyframes ")) {
      continue;
    }
    if (node.kind === "declaration") {
      node.value = `${node.value} !important`;
    } else {
      applyImportant(node.nodes);
    }
  }
}
function compile(rawCandidates, theme = default_theme_default) {
  rawCandidates.sort();
  let sort = /* @__PURE__ */ new Map();
  let ast = [];
  let variantOrder = Array.from(variants.keys());
  let arbitraryVariantOrder = [];
  let arbitraryVariants = /* @__PURE__ */ new Set();
  next:
    for (let rawCandidate of rawCandidates) {
      let candidate = parseCandidate(rawCandidate, utilities, variants);
      if (candidate === null)
        continue next;
      let ruleNodes = [];
      if (candidate.kind === "arbitrary") {
        ruleNodes = [decl(candidate.property, candidate.value)];
      } else if (candidate.kind === "named") {
        let matchFn = utilities.get(candidate.root);
        let matchNodes = matchFn(candidate, theme);
        if (matchNodes === void 0)
          continue next;
        for (let node2 of matchNodes) {
          if (node2.kind === "rule" && node2.selector === "@at-root") {
            for (let child of node2.nodes) {
              sort.set(child, {
                // TODO: Does the at-rule be sorted next to the rule when it has variants?
                variant: 0n,
                variants: [],
                properties: getPropertySort([child])
              });
              ast.push(child);
            }
          } else {
            ruleNodes.push(node2);
          }
        }
      }
      let propertySort = getPropertySort(ruleNodes);
      if (candidate.important) {
        applyImportant(ruleNodes);
      }
      let node = {
        kind: "rule",
        selector: `.${escape(rawCandidate)}`,
        nodes: ruleNodes
      };
      for (let variant of candidate.variants) {
        if (variant.kind === "named") {
          let applyVariant = variants.get(variant.root);
          let result = applyVariant(node, variant);
          if (result === null)
            continue next;
        } else if (variant.kind === "arbitrary") {
          node.nodes = [rule(variant.selector, node.nodes)];
          arbitraryVariants.add(variant.selector);
        }
      }
      sort.set(node, {
        variants: candidate.variants,
        variant: 0n,
        properties: propertySort
      });
      ast.push(node);
    }
  arbitraryVariantOrder = Array.from(arbitraryVariants).sort();
  for (let value of sort.values()) {
    for (let variant of value.variants) {
      if (variant.kind === "named") {
        if (variant.root === "group" && variant.kind === "named" && variant.value !== null) {
          let nested = parseVariant(variant.value.value, variants);
          if (nested === null || nested.kind !== "named")
            continue;
          value.variant |= 1n << BigInt(variantOrder.indexOf(nested.root) + variantOrder.length * 0);
        } else if (variant.root === "peer" && variant.kind === "named" && variant.value !== null) {
          let nested = parseVariant(variant.value.value, variants);
          if (nested === null || nested.kind !== "named")
            continue;
          value.variant |= 1n << BigInt(variantOrder.indexOf(nested.root) + variantOrder.length * 1);
        }
        value.variant |= 1n << BigInt(variantOrder.indexOf(variant.root) + variantOrder.length * 2);
      } else if (variant.kind === "arbitrary") {
        value.variant |= 1n << BigInt(arbitraryVariantOrder.indexOf(variant.selector) + variantOrder.length * 3);
      }
    }
  }
  ast.sort((a, z) => {
    let aSort = sort.get(a);
    let zSort = sort.get(z);
    if (aSort.variant - zSort.variant !== 0n) {
      return Number(aSort.variant - zSort.variant);
    }
    let offset = 0;
    while (aSort.properties.length < offset && zSort.properties.length < offset && aSort.properties[offset] === zSort.properties[offset]) {
      offset += 1;
    }
    return (aSort.properties[offset] ?? Infinity) - (zSort.properties[offset] ?? Infinity);
  });
  return toCss(ast);
}
function getPropertySort(nodes) {
  let propertySort = /* @__PURE__ */ new Set();
  let q = nodes.slice();
  next:
    while (q.length > 0) {
      let node = q.shift();
      if (node.kind === "declaration") {
        if (node.property[0] === "-" && node.property[1] === "-") {
          if (node.property === "--tw-sort") {
            let idx2 = property_order_default.indexOf(node.value);
            if (idx2 !== -1) {
              propertySort.add(idx2);
              break next;
            }
          }
          continue;
        }
        let idx = property_order_default.indexOf(node.property);
        if (idx !== -1)
          propertySort.add(idx);
      } else if (node.kind === "rule") {
        for (let child of node.nodes) {
          q.push(child);
        }
      }
    }
  return Array.from(propertySort).sort((a, z) => a - z);
}

// src/cli/index.ts
var root = process.cwd();
var [, candidates] = (0, import_oxide.resolveProjectCandidates)({ base: root });
console.log(optimizeCss(preflight_default + compile(candidates)));
