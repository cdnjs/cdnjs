import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { getKeywordName } from "../lib/experimental.js";


const id = "https://json-schema.org/keyword/draft-04/maximum";

const compile = async (schema, _ast, parentSchema) => {
  const exclusiveMaximumKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/draft-04/exclusiveMaximum");
  const exclusiveMaximum = await Browser.step(exclusiveMaximumKeyword, parentSchema);
  const isExclusive = Browser.value(exclusiveMaximum);

  return [Browser.value(schema), isExclusive];
};

const interpret = ([maximum, isExclusive], instance) => {
  if (Instance.typeOf(instance) !== "number") {
    return true;
  }

  const value = Instance.value(instance);
  return isExclusive ? value < maximum : value <= maximum;
};

export default { id, compile, interpret };
