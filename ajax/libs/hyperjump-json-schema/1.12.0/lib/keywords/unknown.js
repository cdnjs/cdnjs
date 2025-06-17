import * as Browser from "@hyperjump/browser";
import { pointerSegments } from "@hyperjump/json-pointer";


const id = "https://json-schema.org/keyword/unknown";

const compile = (schema) => {
  const keywordName = [...pointerSegments(schema.cursor)].pop();
  return [keywordName, Browser.value(schema)];
};

const interpret = () => true;
const annotation = ([, value]) => value;

export default { id, compile, interpret, annotation };
