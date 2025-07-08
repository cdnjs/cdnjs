import { drop } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { getKeywordName, Validation } from "../lib/experimental.js";


const id = "https://json-schema.org/keyword/draft-04/additionalItems";

const compile = async (schema, ast, parentSchema) => {
  const itemsKeywordName = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/draft-04/items");
  const items = await Browser.step(itemsKeywordName, parentSchema);
  const numberOfItems = Browser.typeOf(items) === "array" ? Browser.length(items) : Number.MAX_SAFE_INTEGER;

  return [numberOfItems, await Validation.compile(schema, ast)];
};

const interpret = ([numberOfItems, additionalItems], instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  let isValid = true;
  let index = numberOfItems;
  for (const item of drop(numberOfItems, Instance.iter(instance))) {
    if (!Validation.interpret(additionalItems, item, context)) {
      isValid = false;
    }

    context.evaluatedItems?.add(index);
    index++;
  }

  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };
