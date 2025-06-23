import * as Instance from "../instance.js";


export class AnnotationsPlugin {
  beforeSchema(_url, _instance, context) {
    context.annotations ??= [];
    context.schemaAnnotations = [];
  }

  beforeKeyword(_node, _instance, context) {
    context.annotations = [];
  }

  afterKeyword(node, instance, context, valid, schemaContext, keyword) {
    if (valid) {
      const [keywordId, schemaUri, keywordValue] = node;
      const annotation = keyword.annotation?.(keywordValue, instance, context);
      if (annotation !== undefined) {
        schemaContext.schemaAnnotations.push({
          keyword: keywordId,
          absoluteKeywordLocation: schemaUri,
          instanceLocation: Instance.uri(instance),
          annotation: annotation
        });
      }
      schemaContext.schemaAnnotations.push(...context.annotations);
    }
  }

  afterSchema(_schemaNode, _instanceNode, context, valid) {
    if (valid) {
      context.annotations.push(...context.schemaAnnotations);
    }

    this.annotations = context.annotations;
  }
}
