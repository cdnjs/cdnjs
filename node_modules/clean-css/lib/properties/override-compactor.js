
// Compacts the given tokens according to their ability to override each other.

module.exports = (function () {
  // Default override function: only allow overrides when the two values are the same
  var sameValue = function (val1, val2) {
    return val1 === val2;
  };

  var compactOverrides = function (tokens, processable) {
    var result, can, token, t, i, ii, oldResult, matchingComponent;

    // Used when searching for a component that matches token
    var nameMatchFilter1 = function (x) {
      return x.prop === token.prop;
    };
    // Used when searching for a component that matches t
    var nameMatchFilter2 = function (x) {
      return x.prop === t.prop;
    };

    // Go from the end and always take what the current token can't override as the new result set
    // NOTE: can't cache result.length here because it will change with every iteration
    for (result = tokens, i = 0; (ii = result.length - 1 - i) >= 0; i++) {
      token = result[ii];
      can = (processable[token.prop] && processable[token.prop].canOverride) || sameValue;
      oldResult = result;
      result = [];

      // Special flag which indicates that the current token should be removed
      var removeSelf = false;
      var oldResultLength = oldResult.length;

      for (var iii = 0; iii < oldResultLength; iii++) {
        t = oldResult[iii];

        // A token can't override itself (checked by reference, not by value)
        // NOTE: except when we explicitly tell it to remove itself
        if (t === token && !removeSelf) {
          result.push(t);
          continue;
        }

        // Only an important token can even try to override tokens that come after it
        if (iii > ii && !token.isImportant) {
          result.push(t);
          continue;
        }

        // A nonimportant token can never override an important one
        if (t.isImportant && !token.isImportant) {
          result.push(t);
          continue;
        }

        if (token.isShorthand && !t.isShorthand && t.isComponentOf(token)) {
          // token (a shorthand) is trying to override t (a component)

          // Find the matching component in the shorthand
          matchingComponent = token.components.filter(nameMatchFilter2)[0];
          can = (processable[t.prop] && processable[t.prop].canOverride) || sameValue;
          if (!can(t.value, matchingComponent.value)) {
            // The shorthand can't override the component
            result.push(t);
          }
        } else if (t.isShorthand && !token.isShorthand && token.isComponentOf(t)) {
          // token (a component) is trying to override a component of t (a shorthand)

          // Find the matching component in the shorthand
          matchingComponent = t.components.filter(nameMatchFilter1)[0];
          if (can(matchingComponent.value, token.value)) {
            // The component can override the matching component in the shorthand

            if (!token.isImportant) {
              // The overriding component is non-important which means we can simply include it into the shorthand
              // NOTE: stuff that can't really be included, like inherit, is taken care of at the final step, not here
              matchingComponent.value = token.value;
              // We use the special flag to get rid of the component
              removeSelf = true;
            } else {
              // The overriding component is important; sadly we can't get rid of it,
              // but we can still mark the matching component in the shorthand as irrelevant
              matchingComponent.isIrrelevant = true;
            }
            t.isDirty = true;
          }
          result.push(t);
        } else if (token.isShorthand && t.isShorthand && token.prop === t.prop) {
          // token is a shorthand and is trying to override another instance of the same shorthand

          // Can only override other shorthand when each of its components can override each of the other's components
          for (var iiii = 0; iiii < t.components.length; iiii++) {
            can = (processable[t.components[iiii].prop] && processable[t.components[iiii].prop].canOverride) || sameValue;
            if (!can(t.components[iiii].value, token.components[iiii].value)) {
              result.push(t);
              break;
            }
          }
        } else if (t.prop !== token.prop || !can(t.value, token.value)) {
          // in every other case, use the override mechanism
          result.push(t);
        }
      }
      if (removeSelf) {
        i--;
      }
    }

    return result;
  };

  return {
    compactOverrides: compactOverrides
  };

})();
