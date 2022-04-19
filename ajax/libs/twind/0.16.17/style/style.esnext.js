// src/style/index.ts
import {apply, directive, hash} from "twind";

// src/internal/util.ts
var includes = (value, search) => !!~value.indexOf(search);
var hyphenate = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));
var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk(source[key], context);
  if (isCSSProperty(key, value)) {
    target2[hyphenate(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));

// src/style/index.ts
export * from "twind/css";
var styled$ = (rules, context) => rules.reduce((result, rule) => {
  if (typeof rule == "string") {
    rule = apply(rule);
  }
  if (typeof rule == "function") {
    return merge(result, evalThunk(rule, context), context);
  }
  if (rule) {
    return merge(result, rule, context);
  }
  return result;
}, {});
var buildMediaRule = (key, value) => ({
  [key[0] == "@" ? key : `@screen ${key}`]: typeof value == "string" ? apply(value) : value
});
var createStyle = (config = {}, base) => {
  const {base: baseStyle, variants = {}, defaults, matches = []} = config;
  const id = hash(JSON.stringify([base?.className, baseStyle, variants, defaults, matches]));
  const className = (base ? base.className + " " : "") + id;
  const selector = (base || "") + "." + id;
  return Object.defineProperties((allProps) => {
    const {tw, css, class: localClass, className: localClassName, ...props} = {
      ...defaults,
      ...allProps
    };
    const rules = [
      base && base(props),
      {
        _: className + (localClassName ? " " + localClassName : "") + (localClass ? " " + localClass : "")
      },
      baseStyle
    ];
    Object.keys(variants).forEach((variantKey) => {
      const variant = variants[variantKey];
      const propsValue = props[variantKey];
      if (propsValue === Object(propsValue)) {
        Object.keys(propsValue).forEach((key) => {
          const value = variant[propsValue[key]];
          rules.push(key == "initial" ? value : buildMediaRule(key, value));
        });
      } else {
        rules.push(variant[propsValue]);
      }
    });
    matches.forEach((matcher) => {
      const ruleIndex = rules.push(matcher.use) - 1;
      if (!Object.keys(matcher).every((variantKey) => {
        const propsValue = props[variantKey];
        const compoundValue = String(matcher[variantKey]);
        if (propsValue === Object(propsValue)) {
          Object.keys(propsValue).forEach((key) => {
            if (key != "initial" && compoundValue == String(propsValue[key])) {
              rules.push(buildMediaRule(key, rules[ruleIndex]));
            }
          });
          return true;
        }
        return variantKey == "use" || compoundValue == String(propsValue);
      })) {
        rules.length = ruleIndex;
      }
    });
    rules.push(apply(tw), css);
    return directive(styled$, rules);
  }, {
    toString: {
      value: () => selector
    },
    className: {
      value: className
    },
    selector: {
      value: selector
    }
  });
};
var style = (base, config) => typeof base == "function" ? createStyle(config, base) : createStyle(base);
export {
  style
};
//# sourceMappingURL=style.esnext.js.map
