(function (factory) {
  if (typeof breeze === "object") {
    factory(breeze);
  } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // CommonJS or Node: hard-coded dependency on "breeze"
    factory(require("breeze"));
  } else if (typeof define === "function" && define["amd"]) {
    // AMD anonymous module with hard-coded dependency on "breeze"
    define(["breeze"], factory);
  }
}(function (breeze) {
  "use strict";
  var EntityType = breeze.EntityType;
  var toODataFragmentVisitor;

  var ctor = function UriBuilderODataAdapter() {
    this.name = "odata";
  };
  var proto = ctor.prototype;

  proto.initialize = function() {};

  proto.buildUri = function (entityQuery, metadataStore) {
    // force entityType validation;
    var entityType = entityQuery._getFromEntityType(metadataStore, false);
    if (!entityType) {
      // anonymous type but still has naming convention info avail
      entityType = new EntityType(metadataStore);
    }

    var queryOptions = {};
    queryOptions["$filter"] = toWhereODataFragment(entityQuery.wherePredicate);
    queryOptions["$orderby"] = toOrderByODataFragment(entityQuery.orderByClause);

    if (entityQuery.skipCount) {
      queryOptions["$skip"] = entityQuery.skipCount;
    }

    if (entityQuery.takeCount != null) {
      queryOptions["$top"] = entityQuery.takeCount;
    }

    queryOptions["$expand"] = toExpandODataFragment(entityQuery.expandClause);
    queryOptions["$select"] = toSelectODataFragment(entityQuery.selectClause);

    if (entityQuery.inlineCountEnabled) {
      queryOptions["$inlinecount"] = "allpages";
    }

    var qoText = toQueryOptionsString(queryOptions);
    return entityQuery.resourceName + qoText;

    // private methods to this func.

    function toWhereODataFragment(wherePredicate) {
      if (!wherePredicate) return undefined;
      // validation occurs inside of the toODataFragment call here.
      return wherePredicate.visit({ entityType: entityType}, toODataFragmentVisitor );
    }

    function toOrderByODataFragment(orderByClause) {
      if (!orderByClause) return undefined;
      orderByClause.validate(entityType);
      var strings = orderByClause.items.map(function (item) {
        return entityType.clientPropertyPathToServer(item.propertyPath, "/") + (item.isDesc ? " desc" : "");
      });
      // should return something like CompanyName,Address/City desc
      return strings.join(',');
    }

    function toSelectODataFragment(selectClause) {
      if (!selectClause) return undefined;
      selectClause.validate(entityType);
      var frag = selectClause.propertyPaths.map(function (pp) {
        return  entityType.clientPropertyPathToServer(pp, "/");
      }).join(",");
      return frag;
    }

    function toExpandODataFragment(expandClause) {
      if (!expandClause) return undefined;
      // no validate on expand clauses currently.
      // expandClause.validate(entityType);
      var frag = expandClause.propertyPaths.map(function (pp) {
        return entityType.clientPropertyPathToServer(pp, "/");
      }).join(",");
      return frag;
    }

    function toQueryOptionsString(queryOptions) {
      var qoStrings = [];
      for (var qoName in queryOptions) {
        var qoValue = queryOptions[qoName];
        if (qoValue !== undefined) {
          if (qoValue instanceof Array) {
            qoValue.forEach(function (qov) {
              qoStrings.push(qoName + "=" + encodeURIComponent(qov));
            });
          } else {
            qoStrings.push(qoName + "=" + encodeURIComponent(qoValue));
          }
        }
      }

      if (qoStrings.length > 0) {
        return "?" + qoStrings.join("&");
      } else {
        return "";
      }
    }
  };

  breeze.Predicate.prototype.toODataFragment = function(context) {
    return this.visit( context, toODataFragmentVisitor);
  }

  toODataFragmentVisitor = (function () {
    var visitor = {

      passthruPredicate: function () {
        return this.value;
      },

      unaryPredicate: function (context) {
        var predVal = this.pred.visit(context);
        return odataOpFrom(this) + " " + "(" + predVal + ")";
      },

      binaryPredicate: function (context) {
        var expr1Val = this.expr1.visit(context);
        var expr2Val = this.expr2.visit(context);
        var prefix = context.prefix;
        if (prefix) {
          expr1Val = prefix + "/" + expr1Val;
        }

        var odataOp = odataOpFrom(this);

        if (this.op.key === 'in') {
          var result = expr2Val.map(function (v) {
            return "(" + expr1Val + " eq " + v + ")";
          }).join(" or ");
          return result;
        } else if (this.op.isFunction) {
          if (odataOp === "substringof") {
            return odataOp + "(" + expr2Val + "," + expr1Val + ") eq true";
          } else {
            return odataOp + "(" + expr1Val + "," + expr2Val + ") eq true";
          }
        } else {
          return expr1Val + " " + odataOp + " " + expr2Val;
        }
      },

      andOrPredicate: function (context) {
        var result = this.preds.map(function (pred) {
          var predVal = pred.visit(context);
          return "(" + predVal + ")";
        }).join(" " + odataOpFrom(this) + " ");
        return result;
      },

      anyAllPredicate: function (context) {
        var exprVal = this.expr.visit(context);
        var prefix = context.prefix;
        if (prefix) {
          exprVal = prefix + "/" + exprVal;
          prefix = "x" + (parseInt(prefix.substring(1)) + 1);
        } else {
          prefix = "x1";
        }
        // need to create a new context because of 'prefix'
        var newContext = breeze.core.extend({}, context);
        newContext.entityType = this.expr.dataType;
        newContext.prefix = prefix;
        var newPredVal = this.pred.visit(newContext);
        return exprVal + "/" + odataOpFrom(this) + "(" + prefix + ": " + newPredVal + ")";
      },

      litExpr: function () {
        if (Array.isArray(this.value)) {
          return this.value.map(function(v) { return this.dataType.fmtOData(v)}, this);
        } else {
          return this.dataType.fmtOData(this.value);
        }
      },

      propExpr: function (context) {
        var entityType = context.entityType;
        // '/' is the OData path delimiter
        return entityType ? entityType.clientPropertyPathToServer(this.propertyPath, "/") : this.propertyPath;
      },

      fnExpr: function (context) {
        var exprVals = this.exprs.map(function(expr) {
          return expr.visit(context);
        });
        return this.fnName + "(" + exprVals.join(",") + ")";
      }
    };

    var _operatorMap = {
      'contains': 'substringof'
    };

    function odataOpFrom(node) {
      var op = node.op.key;
      var odataOp = _operatorMap[op];
      return odataOp || op;
    }

    return visitor;
  }());

  breeze.config.registerAdapter("uriBuilder", ctor);

}));





