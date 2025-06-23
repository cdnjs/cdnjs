import { Validation } from "../experimental.js";
import * as Instance from "../instance.js";


export class BasicOutputPlugin {
  beforeSchema(_url, _intance, context) {
    context.errors ??= [];
  }

  beforeKeyword(_node, _instance, context) {
    context.errors = [];
  }

  afterKeyword(node, instance, context, valid, schemaContext, keyword) {
    if (!valid) {
      if (!keyword.simpleApplicator) {
        const [keywordId, schemaUri] = node;
        schemaContext.errors.push({
          keyword: keywordId,
          absoluteKeywordLocation: schemaUri,
          instanceLocation: Instance.uri(instance)
        });
      }
      schemaContext.errors.push(...context.errors);
    }
  }

  afterSchema(url, instance, context, valid) {
    if (typeof context.ast[url] === "boolean" && !valid) {
      context.errors.push({
        keyword: Validation.id,
        absoluteKeywordLocation: url,
        instanceLocation: Instance.uri(instance)
      });
    }

    this.errors = context.errors;
  }
}
