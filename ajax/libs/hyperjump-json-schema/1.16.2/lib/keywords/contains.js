import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { getKeywordName, Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/contains";

const compile = async (schema, ast, parentSchema) => {
  const contains = await Validation.compile(schema, ast);

  const minContainsKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/minContains");
  const minContainsSchema = await Browser.step(minContainsKeyword, parentSchema);
  const minContains = Browser.typeOf(minContainsSchema) === "number" ? Browser.value(minContainsSchema) : 1;

  const maxContainsKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/maxContains");
  const maxContainsSchema = await Browser.step(maxContainsKeyword, parentSchema);
  const maxContains = Browser.typeOf(maxContainsSchema) === "number" ? Browser.value(maxContainsSchema) : Number.MAX_SAFE_INTEGER;

  return { contains, minContains, maxContains };
};

const interpret = ({ contains, minContains, maxContains }, instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  let matches = 0;
  let index = 0;
  for (const item of Instance.iter(instance)) {
    if (Validation.interpret(contains, item, context)) {
      matches++;
      context.evaluatedItems?.add(index);
    }
    index++;
  }
  return matches >= minContains && matches <= maxContains;
};

export default { id, compile, interpret };
