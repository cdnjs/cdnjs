/**
 * @file Create and build SOQL string from configuration
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _      = require("underscore"),
    SfDate = require("./date");


/**
 * Create SOQL
 * @private
 */
function createSOQL(query) {
  var soql = [
    "SELECT ",
    createFieldsClause(query.fields, query.includes),
    " FROM ",
    query.table
  ].join("");
  var cond = createConditionClause(query.conditions);
  if (cond) {
    soql += " WHERE " + cond;
  }
  var orderby = createOrderByClause(query.sort);
  if (orderby) {
    soql += " ORDER BY " + orderby;
  }
  if (query.limit) {
    soql += " LIMIT " + query.limit;
  }
  if (query.offset) {
    soql += " OFFSET " + query.offset;
  }
  return soql;
}

/** @private **/
function createFieldsClause(fields, childQueries) {
  childQueries = _.map(_.values(childQueries || {}), function(cquery) {
    return '(' + createSOQL(cquery) + ')';
  });
  return (fields || [ "Id" ]).concat(childQueries).join(', ');
}

/** @private **/
function createConditionClause(conditions, operator, depth) {
  if (_.isString(conditions)) {
    return conditions;
  }
  conditions = conditions || [];
  operator = operator || "AND";
  depth = depth || 0;
  if (!isArray(conditions)) { // if passed in hash object
    conditions = _.keys(conditions).map(function(key) {
      return {
        key: key,
        value: conditions[key]
      };
    });
  } else {
    conditions = conditions.map(function(cond) {
      var conds = [];
      for (var key in cond) {
        conds.push({
          key: key,
          value: cond[key]
        });
      }
      return conds.length>1 ? conds : conds[0];
    });
  }
  conditions = conditions.map(function(cond) {
    var d = depth+1, op;
    switch (cond.key) {
      case "$or" :
      case "$and" :
      case "$not" :
        if (operator !== "NOT" && conditions.length === 1) {
          d = depth; // not change tree depth
        }
        op = cond.key === "$or" ? "OR" :
             cond.key === "$and" ? "AND" :
             "NOT";
        return createConditionClause(cond.value, op, d);
      default:
        return createFieldExpression(cond.key, cond.value);
    }
  }).filter(function(expr) { return expr; });

  var paren;
  if (operator === 'NOT') {
    paren = depth > 0;
    return (paren ? "(" : "") + "NOT " + conditions[0] + (paren ? ")" : "");
  } else {
    paren = depth > 0 && conditions.length > 1;
    return (paren ? "(" : "") + conditions.join(" "+operator+" ") + (paren ? ")" : "");
  }
}

var opMap = {
  "="     : "=",
  "$eq"   : "=",
  "!="    : "!=",
  "$ne"   : "!=",
  ">"     : ">",
  "$gt"   : ">",
  "<"     : "<",
  "$lt"   : "<",
  ">="    : ">=",
  "$gte"  : ">=",
  "<="    : "<=",
  "$lte"  : "<=",
  "$like" : "LIKE",
  "$nlike" : "NOT LIKE",
  "$in"   : "IN",
  "$nin"  : "NOT IN",
  "$exists" : "EXISTS"
};

/** @private **/
function createFieldExpression(field, value) {
  var op = "$eq";
  if (_.isObject(value)) {
    var _value;
    for (var k in value) {
      if (k[0] === "$") {
        op = k;
        value = value[k];
        break;
      }
    }
  }
  var sfop = opMap[op];
  if (!sfop || _.isUndefined(value)) { return null; }
  var valueExpr = createValueExpression(value);
  if (_.isUndefined(valueExpr)) { return null; }
  switch (sfop) {
    case "NOT LIKE":
      return "(" + [ "NOT", field, 'LIKE', valueExpr ].join(" ") + ")";
    case "EXISTS":
      return [ field, value ? "!=" : "=", "null" ].join(" ");
    default:
      return [ field, sfop, valueExpr ].join(" ");
  }
}

/** @private **/
function createValueExpression(value) {
  if (isArray(value)) {
    return value.length > 0 ?
           "(" + value.map(createValueExpression).join(", ") + ")" :
           undefined;
  }
  if (value instanceof SfDate) {
    return value.toString();
  }
  if (_.isString(value)) {
    return "'" + escapeSOQLString(value) + "'";
  }
  if (_.isNumber(value)) {
    return (value).toString();
  }
  if (_.isNull(value)) {
    return "null";
  }
  return value;
}

/** @private **/
function escapeSOQLString(str) {
  return String(str || '').replace(/'/g, "\\'");
}

/** @private **/
function isArray(a) {
  return _.isObject(a) && _.isFunction(a.pop);
}


/** @private **/
function createOrderByClause(sort) {
  sort = sort || [];
  if (_.isString(sort)) {
    if (/,|\s+(asc|desc)\s*$/.test(sort)) {
      // must be specified in pure "order by" clause. Return raw config.
      return sort;
    }
    // sort order in mongoose-style expression.
    // e.g. "FieldA -FieldB" => "ORDER BY FieldA ASC, FieldB DESC"
    sort = sort.split(/\s+/).map(function(field) {
      var dir = "ASC"; // ascending
      var flag = field[0];
      if (flag === '-') {
        dir = "DESC";
        field = field.substring(1);
      } else if (flag === '+') {
        field = field.substring(1);
      }
      return [ field, dir ];
    });
  } else if (!isArray(sort)) {
    sort = _.keys(sort).map(function(field) {
      var dir = sort[field];
      return [ field, dir ];
    });
  }
  return sort.map(function(s) {
    var field = s[0], dir = s[1];
    switch (String(dir)) {
      case "DESC":
      case "desc":
      case "descending":
      case "-":
      case "-1":
        dir = "DESC";
        break;
      default:
        dir = "ASC";
    }
    return field + " " + dir;
  }).join(", ");
}


exports.createSOQL = createSOQL;

