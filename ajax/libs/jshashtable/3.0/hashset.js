/**
 * Copyright %%build:year%% Tim Down.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * HashSet
 *
 * This is a JavaScript implementation of HashSet, similar in concept to those found in Java or C#'s standard libraries.
 * It is distributed as part of jshashtable and depends on jshashtable.js. It creates a single constructor function
 * called HashSet in the global scope.
 *
 * Depends on: jshashtable.js
 * Author: Tim Down <tim@timdown.co.uk>
 * Version: %%build:version%%
 * Build date: %%build:date%%
 * Website: http://www.timdown.co.uk/jshashtable/
 */

function HashSet(param1, param2) {
    var hashTable = new Hashtable(param1, param2);

    this.add = function(o) {
        hashTable.put(o, true);
    };

    this.addAll = function(arr) {
        for (var i = 0, len = arr.length; i < len; ++i) {
            hashTable.put(arr[i], true);
        }
    };

    this.values = function() {
        return hashTable.keys();
    };

    this.remove = function(o) {
        return hashTable.remove(o) ? o : null;
    };

    this.contains = function(o) {
        return hashTable.containsKey(o);
    };

    this.clear = function() {
        hashTable.clear();
    };

    this.size = function() {
        return hashTable.size();
    };

    this.isEmpty = function() {
        return hashTable.isEmpty();
    };

    this.clone = function() {
        var h = new HashSet(param1, param2);
        h.addAll(hashTable.keys());
        return h;
    };

    this.intersection = function(hashSet) {
        var intersection = new HashSet(param1, param2);
        var values = hashSet.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (hashTable.containsKey(val)) {
                intersection.add(val);
            }
        }
        return intersection;
    };

    this.union = function(hashSet) {
        var union = this.clone();
        var values = hashSet.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (!hashTable.containsKey(val)) {
                union.add(val);
            }
        }
        return union;
    };

    this.isSubsetOf = function(hashSet) {
        var values = hashTable.keys(), i = values.length;
        while (i--) {
            if (!hashSet.contains(values[i])) {
                return false;
            }
        }
        return true;
    };

    this.complement = function(hashSet) {
        var complement = new HashSet(param1, param2);
        var values = this.values(), i = values.length, val;
        while (i--) {
            val = values[i];
            if (!hashSet.contains(val)) {
                complement.add(val);
            }
        }
        return complement;
    };
}
