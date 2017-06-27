// buckets 1.90.0 
// (c) 2013, 2015 Mauricio Santos <mauriciosantoss@gmail.com> 
// https://github.com/mauriciosantos/Buckets-JS

(function (root, factory) {
    // UMD (Universal Module Definition) https://github.com/umdjs/umd

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.buckets = factory();
    }

}(this, function () {

    'use strict';

    /**
     * Top level namespace for Buckets,
     * a JavaScript data structure library.
     * @name buckets
     */
    var buckets = {};

    /**
     * Default function to compare element order.
     * @function
     * @private
     */
    buckets.defaultCompare = function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a === b) {
            return 0;
        }
        return 1;
    };

    /**
     * Default function to test equality.
     * @function
     * @private
     */
    buckets.defaultEquals = function (a, b) {
        return a === b;
    };

    /**
     * Default function to convert an object to a string.
     * @function
     * @private
     */
    buckets.defaultToString = function (item) {
        if (item === null) {
            return 'BUCKETS_NULL';
        }
        if (buckets.isUndefined(item)) {
            return 'BUCKETS_UNDEFINED';
        }
        if (buckets.isString(item)) {
            return item;
        }
        return item.toString();
    };

    /**
     * Checks if the given argument is a function.
     * @function
     * @private
     */
    buckets.isFunction = function (func) {
        return (typeof func) === 'function';
    };

    /**
     * Checks if the given argument is undefined.
     * @function
     * @private
     */
    buckets.isUndefined = function (obj) {
        return obj === undefined;
    };

    /**
     * Checks if the given argument is a string.
     * @function
     * @private
     */
    buckets.isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    /**
     * Reverses a compare function.
     * @function
     * @private
     */
    buckets.reverseCompareFunction = function (compareFunction) {
        if (!buckets.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                if (a === b) {
                    return 0;
                }
                return -1;
            };
        }
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };

    };

    /**
     * Returns an equal function given a compare function.
     * @function
     * @private
     */
    buckets.compareToEquals = function (compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    };


    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    buckets.arrays = {};

    /**
     * Returns the index of the first occurrence of the specified item
     * within the specified array.
     * @param {*} array The array.
     * @param {*} item The element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {number} The index of the first occurrence of the specified element
     * or -1 if not found.
     */
    buckets.arrays.indexOf = function (array, item, equalsFunction) {
        var equals = equalsFunction || buckets.defaultEquals,
            length = array.length,
            i;
        for (i = 0; i < length; i += 1) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    };

    /**
     * Returns the index of the last occurrence of the specified element
     * within the specified array.
     * @param {*} array The array.
     * @param {Object} item The element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {number} The index of the last occurrence of the specified element
     * within the specified array or -1 if not found.
     */
    buckets.arrays.lastIndexOf = function (array, item, equalsFunction) {
        var equals = equalsFunction || buckets.defaultEquals,
            length = array.length,
            i;
        for (i = length - 1; i >= 0; i -= 1) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    };

    /**
     * Returns true if the array contains the specified element.
     * @param {*} array The array.
     * @param {Object} item The element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {boolean} True if the specified array contains the specified element.
     */
    buckets.arrays.contains = function (array, item, equalsFunction) {
        return buckets.arrays.indexOf(array, item, equalsFunction) >= 0;
    };

    /**
     * Removes the first ocurrence of the specified element from the specified array.
     * @param {*} array The array.
     * @param {*} item The element to remove.
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {boolean} True If the array changed after this call.
     */
    buckets.arrays.remove = function (array, item, equalsFunction) {
        var index = buckets.arrays.indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    };

    /**
     * Returns the number of elements in the array equal
     * to the specified element.
     * @param {Array} array The array.
     * @param {Object} item The element.
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {number} The number of elements in the specified array.
     * equal to the specified item.
     */
    buckets.arrays.frequency = function (array, item, equalsFunction) {
        var equals = equalsFunction || buckets.defaultEquals,
            length = array.length,
            freq = 0,
            i;
        for (i = 0; i < length; i += 1) {
            if (equals(array[i], item)) {
                freq += 1;
            }
        }
        return freq;
    };

    /**
     * Returns true if the provided arrays are equal.
     * Two arrays are considered equal if both contain the same number
     * of elements and all corresponding pairs of elements
     * are equal and are in the same order.
     * @param {Array} array1
     * @param {Array} array2
     * @param {function(Object,Object):boolean=} equalsFunction Optional function to
     * check equality between two elements. Receives two arguments and returns true if they are equal.
     * @return {boolean} True if the two arrays are equal.
     */
    buckets.arrays.equals = function (array1, array2, equalsFunction) {
        var equals = equalsFunction || buckets.defaultEquals,
            length = array1.length,
            i;

        if (array1.length !== array2.length) {
            return false;
        }
        for (i = 0; i < length; i += 1) {
            if (!equals(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    };

    /**
     * Returns a shallow copy of the specified array.
     * @param {*} array The array to copy.
     * @return {Array} A copy of the specified array.
     */
    buckets.arrays.copy = function (array) {
        return array.concat();
    };

    /**
     * Swaps the elements at the specified positions in the specified array.
     * @param {Array} array The array.
     * @param {number} i The index of the first element.
     * @param {number} j The index of second element.
     * @return {boolean} True if the array is defined and the indexes are valid.
     */
    buckets.arrays.swap = function (array, i, j) {
        var temp;

        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    };

    /**
     * Executes the provided function once per element present in the array.
     * @param {Array} array The array.
     * @param {function(Object):*} callback Function to execute,
     * invoked with an element as argument. To break the iteration you can
     * optionally return false in the callback.
     */
    buckets.arrays.forEach = function (array, callback) {
        var lenght = array.length,
            i;
        for (i = 0; i < lenght; i += 1) {
            if (callback(array[i]) === false) {
                return;
            }
        }
    };


    /**
     * Creates an empty bag.
     * @class <p>A bag is a special kind of set in which members are
     * allowed to appear more than once.</p>
     * <p>If the inserted elements are custom objects, a function
     * that maps elements to unique strings must be provided at construction time.</p>
     * <p>Example:</p>
     * <pre>
     * function petToUniqueString(pet) {
     *  return pet.type + ' ' + pet.name;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object):string=} toStrFunction Optional function
     * to convert elements to unique strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives an object and returns a
     * unique string must be provided.
     */
    buckets.Bag = function (toStrFunction) {

        /** 
         * @exports bag as buckets.Bag
         * @private
         */
        var bag = {},
            // Function to convert elements to unique strings.
            toStrF = toStrFunction || buckets.defaultToString,
            // Underlying  Storage
            dictionary = new buckets.Dictionary(toStrF),
            // Number of elements in the bag, including duplicates.
            nElements = 0;
        /**
         * Adds nCopies of the specified element to the bag.
         * @param {Object} element Element to add.
         * @param {number=} nCopies The number of copies to add, if this argument is
         * undefined 1 copy is added.
         * @return {boolean} True unless element is undefined.
         */
        bag.add = function (element, nCopies) {
            var node;
            if (isNaN(nCopies) || buckets.isUndefined(nCopies)) {
                nCopies = 1;
            }
            if (buckets.isUndefined(element) || nCopies <= 0) {
                return false;
            }

            if (!bag.contains(element)) {
                node = {
                    value: element,
                    copies: nCopies
                };
                dictionary.set(element, node);
            } else {
                dictionary.get(element).copies += nCopies;
            }
            nElements += nCopies;
            return true;
        };

        /**
         * Counts the number of copies of the specified element in the bag.
         * @param {Object} element The element to search for.
         * @return {number} The number of copies of the element, 0 if not found.
         */
        bag.count = function (element) {
            if (!bag.contains(element)) {
                return 0;
            }
            return dictionary.get(element).copies;
        };

        /**
         * Returns true if the bag contains the specified element.
         * @param {Object} element Element to search for.
         * @return {boolean} True if the bag contains the specified element,
         * false otherwise.
         */
        bag.contains = function (element) {
            return dictionary.containsKey(element);
        };

        /**
         * Removes nCopies of the specified element from the bag.
         * If the number of copies to remove is greater than the actual number
         * of copies in the bag, all copies are removed.
         * @param {Object} element Element to remove.
         * @param {number=} nCopies The number of copies to remove, if this argument is
         * undefined 1 copy is removed.
         * @return {boolean} True if at least 1 copy was removed.
         */
        bag.remove = function (element, nCopies) {
            var node;
            if (isNaN(nCopies) || buckets.isUndefined(nCopies)) {
                nCopies = 1;
            }
            if (buckets.isUndefined(element) || nCopies <= 0) {
                return false;
            }

            if (!bag.contains(element)) {
                return false;
            }
            node = dictionary.get(element);
            if (nCopies > node.copies) {
                nElements -= node.copies;
            } else {
                nElements -= nCopies;
            }
            node.copies -= nCopies;
            if (node.copies <= 0) {
                dictionary.remove(element);
            }
            return true;
        };

        /**
         * Returns an array containing all the elements in the bag in no particular order,
         * including multiple copies.
         * @return {Array} An array containing all the elements in the bag.
         */
        bag.toArray = function () {
            var a = [],
                values = dictionary.values(),
                vl = values.length,
                node,
                element,
                copies,
                i,
                j;
            for (i = 0; i < vl; i += 1) {
                node = values[i];
                element = node.value;
                copies = node.copies;
                for (j = 0; j < copies; j += 1) {
                    a.push(element);
                }
            }
            return a;
        };

        /**
         * Returns a set of unique elements in the bag.
         * @return {buckets.Set} A set of unique elements in the bag.
         */
        bag.toSet = function () {
            var set = new buckets.Set(toStrF),
                elements = dictionary.values(),
                l = elements.length,
                i;
            for (i = 0; i < l; i += 1) {
                set.add(elements[i].value);
            }
            return set;
        };

        /**
         * Executes the provided function once per element
         * present in the bag, including multiple copies.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked with an element as argument. To break the iteration you can
         * optionally return false in the callback.
         */
        bag.forEach = function (callback) {
            dictionary.forEach(function (k, v) {
                var value = v.value,
                    copies = v.copies,
                    i;
                for (i = 0; i < copies; i += 1) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in the bag, including duplicates.
         * @return {number} The number of elements in the bag.
         */
        bag.size = function () {
            return nElements;
        };

        /**
         * Returns true if the bag contains no elements.
         * @return {boolean} True if the bag contains no elements.
         */
        bag.isEmpty = function () {
            return nElements === 0;
        };

        /**
         * Removes all the elements from the bag.
         */
        bag.clear = function () {
            nElements = 0;
            dictionary.clear();
        };

        /**
         * Returns true if the bag is equal to another bag.
         * Two bags are equal if they have the same elements and
         * same number of copies per element.
         * @param {buckets.Bag} other The other bag.
         * @return {boolean} True if the bag is equal to the given bag.
         */
        bag.equals = function (other) {
            var isEqual;
            if (buckets.isUndefined(other) || typeof other.toSet !== 'function') {
                return false;
            }
            if (bag.size() !== other.size()) {
                return false;
            }

            isEqual = true;
            other.forEach(function (element) {
                isEqual = (bag.count(element) === other.count(element));
                return isEqual;
            });
            return isEqual;
        };

        return bag;
    };


    /**
     * Creates an empty binary search tree.
     * @class <p> Binary search trees keep their elements in sorted order, so that 
     * lookup and other operations can use the principle of binary search. In a BST
     * the element in any node is larger than the elements in the node's
     * left sub-tree and smaller than the elements in the node's right sub-tree.</p>
     * <p>If the inserted elements are custom objects, a compare function must
     * be provided at construction time, otherwise the <=, === and >= operators are
     * used to compare elements.</p>
     * <p>Example:</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction Optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    buckets.BSTree = function (compareFunction) {

        /** 
         * @exports tree as buckets.BSTree
         * @private
         */
        var tree = {},
            // Function to compare elements.
            compare = compareFunction || buckets.defaultCompare,
            // Number of elements in the tree.
            nElements = 0,
            // The root node of the tree.
            root;

        // Returns the sub-node containing the specified element or undefined.
        function searchNode(root, element) {
            var node = root,
                cmp;
            while (node !== undefined && cmp !== 0) {
                cmp = compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                } else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        }

        // Returns the sub-node containing the minimum element or undefined.
        function minimumAux(root) {
            var node = root;
            while (node.leftCh !== undefined) {
                node = node.leftCh;
            }
            return node;
        }

        /**
         * Inserts the specified element into the tree if it's not already present.
         * @param {Object} element The element to insert.
         * @return {boolean} True if the tree didn't already contain the element.
         */
        tree.add = function (element) {
            if (buckets.isUndefined(element)) {
                return false;
            }

            /**
             * @private
             */
            function insertNode(node) {
                var position = root,
                    parent,
                    cmp;

                while (position !== undefined) {
                    cmp = compare(node.element, position.element);
                    if (cmp === 0) {
                        return undefined;
                    }
                    if (cmp < 0) {
                        parent = position;
                        position = position.leftCh;
                    } else {
                        parent = position;
                        position = position.rightCh;
                    }
                }
                node.parent = parent;
                if (parent === undefined) {
                    // tree is empty
                    root = node;
                } else if (compare(node.element, parent.element) < 0) {
                    parent.leftCh = node;
                } else {
                    parent.rightCh = node;
                }
                return node;
            }

            var node = {
                element: element,
                leftCh: undefined,
                rightCh: undefined,
                parent: undefined
            };
            if (insertNode(node) !== undefined) {
                nElements += 1;
                return true;
            }
            return false;
        };

        /**
         * Removes all the elements from the tree.
         */
        tree.clear = function () {
            root = undefined;
            nElements = 0;
        };

        /**
         * Returns true if the tree contains no elements.
         * @return {boolean} True if the tree contains no elements.
         */
        tree.isEmpty = function () {
            return nElements === 0;
        };

        /**
         * Returns the number of elements in the tree.
         * @return {number} The number of elements in the tree.
         */
        tree.size = function () {
            return nElements;
        };

        /**
         * Returns true if the tree contains the specified element.
         * @param {Object} element Element to search for.
         * @return {boolean} True if the tree contains the element,
         * false otherwise.
         */
        tree.contains = function (element) {
            if (buckets.isUndefined(element)) {
                return false;
            }
            return searchNode(root, element) !== undefined;
        };

        /**
         * Removes the specified element from the tree.
         * @return {boolean} True if the tree contained the specified element.
         */
        tree.remove = function (element) {
            var node;

            function transplant(n1, n2) {
                if (n1.parent === undefined) {
                    root = n2;
                } else if (n1 === n1.parent.leftCh) {
                    n1.parent.leftCh = n2;
                } else {
                    n1.parent.rightCh = n2;
                }
                if (n2 !== undefined) {
                    n2.parent = n1.parent;
                }
            }

            function removeNode(node) {
                if (node.leftCh === undefined) {
                    transplant(node, node.rightCh);
                } else if (node.rightCh === undefined) {
                    transplant(node, node.leftCh);
                } else {
                    var y = minimumAux(node.rightCh);
                    if (y.parent !== node) {
                        transplant(y, y.rightCh);
                        y.rightCh = node.rightCh;
                        y.rightCh.parent = y;
                    }
                    transplant(node, y);
                    y.leftCh = node.leftCh;
                    y.leftCh.parent = y;
                }
            }

            node = searchNode(root, element);
            if (node === undefined) {
                return false;
            }
            removeNode(node);
            nElements -= 1;
            return true;
        };

        /**
         * Executes the provided function once per element present in the tree in in-order.
         * @param {function(Object):*} callback Function to execute, invoked with an element as 
         * argument. To break the iteration you can optionally return false in the callback.
         */
        tree.inorderTraversal = function (callback) {

            function inorderRecursive(node, callback, signal) {
                if (node === undefined || signal.stop) {
                    return;
                }
                inorderRecursive(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
                if (signal.stop) {
                    return;
                }
                inorderRecursive(node.rightCh, callback, signal);
            }

            inorderRecursive(root, callback, {
                stop: false
            });
        };

        /**
         * Executes the provided function once per element present in the tree in pre-order.
         * @param {function(Object):*} callback Function to execute, invoked with an element as 
         * argument. To break the iteration you can optionally return false in the callback.
         */
        tree.preorderTraversal = function (callback) {

            function preorderRecursive(node, callback, signal) {
                if (node === undefined || signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
                if (signal.stop) {
                    return;
                }
                preorderRecursive(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                preorderRecursive(node.rightCh, callback, signal);
            }

            preorderRecursive(root, callback, {
                stop: false
            });
        };

        /**
         * Executes the provided function once per element present in the tree in post-order.
         * @param {function(Object):*} callback Function to execute, invoked with an element as 
         * argument. To break the iteration you can optionally return false in the callback.
         */
        tree.postorderTraversal = function (callback) {

            function postorderRecursive(node, callback, signal) {
                if (node === undefined || signal.stop) {
                    return;
                }
                postorderRecursive(node.leftCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                postorderRecursive(node.rightCh, callback, signal);
                if (signal.stop) {
                    return;
                }
                signal.stop = callback(node.element) === false;
            }


            postorderRecursive(root, callback, {
                stop: false
            });
        };

        /**
         * Executes the provided function once per element present in the tree in level-order.
         * @param {function(Object):*} callback Function to execute, invoked with an element as 
         * argument. To break the iteration you can optionally return false in the callback.
         */
        tree.levelTraversal = function (callback) {

            function levelAux(node, callback) {
                var queue = buckets.Queue();
                if (node !== undefined) {
                    queue.enqueue(node);
                }
                while (!queue.isEmpty()) {
                    node = queue.dequeue();
                    if (callback(node.element) === false) {
                        return;
                    }
                    if (node.leftCh !== undefined) {
                        queue.enqueue(node.leftCh);
                    }
                    if (node.rightCh !== undefined) {
                        queue.enqueue(node.rightCh);
                    }
                }
            }

            levelAux(root, callback);
        };

        /**
         * Returns the minimum element of the tree.
         * @return {*} The minimum element of the tree or undefined if the tree
         * is empty.
         */
        tree.minimum = function () {
            if (tree.isEmpty()) {
                return undefined;
            }
            return minimumAux(root).element;
        };

        /**
         * Returns the maximum element of the tree.
         * @return {*} The maximum element of the tree or undefined if the tree
         * is empty.
         */
        tree.maximum = function () {

            function maximumAux(node) {
                while (node.rightCh !== undefined) {
                    node = node.rightCh;
                }
                return node;
            }

            if (tree.isEmpty()) {
                return undefined;
            }

            return maximumAux(root).element;
        };

        /**
         * Executes the provided function once per element present in the tree in in-order.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked with an element argument. To break the iteration you can
         * optionally return false in the callback.
         */
        tree.forEach = function (callback) {
            tree.inorderTraversal(callback);
        };

        /**
         * Returns an array containing all the elements in the tree in in-order.
         * @return {Array} An array containing all the elements in the tree in in-order.
         */
        tree.toArray = function () {
            var array = [];
            tree.inorderTraversal(function (element) {
                array.push(element);
            });
            return array;
        };

        /**
         * Returns the height of the tree.
         * @return {number} The height of the tree or -1 if it's empty.
         */
        tree.height = function () {

            function heightAux(node) {
                if (node === undefined) {
                    return -1;
                }
                return Math.max(heightAux(node.leftCh), heightAux(node.rightCh)) + 1;
            }

            function heightRecursive(node) {
                if (node === undefined) {
                    return -1;
                }
                return Math.max(heightAux(node.leftCh), heightAux(node.rightCh)) + 1;
            }

            return heightRecursive(root);
        };

        /**
         * Returns true if the tree is equal to another tree.
         * Two trees are equal if they have the same elements.
         * @param {buckets.BSTree} other The other tree.
         * @return {boolean} True if the tree is equal to the given tree.
         */
        tree.equals = function (other) {
            var isEqual;

            if (buckets.isUndefined(other) || typeof other.levelTraversal !== 'function') {
                return false;
            }
            if (tree.size() !== other.size()) {
                return false;
            }

            isEqual = true;
            other.forEach(function (element) {
                isEqual = tree.contains(element);
                return isEqual;
            });
            return isEqual;
        };

        return tree;
    };


    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values, each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects, a function that converts keys to unique
     * strings must be provided at construction time.</p>
     * <p>Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction Optional function used
     * to convert keys to unique strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    buckets.Dictionary = function (toStrFunction) {

        /** 
         * @exports dictionary as buckets.Dictionary
         * @private
         */
        var dictionary = {},
            // Object holding the key-value pairs.
            table = {},
            // Number of keys in the dictionary.
            nElements = 0,
            // Function to convert keys unique to strings.
            toStr = toStrFunction || buckets.defaultToString,
            // Special string to prefix keys and avoid name collisions with existing properties.
            keyPrefix = '/$ ';

        /**
         * Returns the value associated with the specified key in the dictionary.
         * @param {Object} key The key.
         * @return {*} The mapped value or
         * undefined if the dictionary contains no mapping for the provided key.
         */
        dictionary.get = function (key) {
            var pair = table[keyPrefix + toStr(key)];
            if (buckets.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };

        /**
         * Associates the specified value with the specified key in the dictionary.
         * If the dictionary previously contained a mapping for the key, the old
         * value is replaced by the specified value.
         * @param {Object} key The key.
         * @param {Object} value Value to be mapped with the specified key.
         * @return {*} Previous value associated with the provided key, or undefined if
         * there was no mapping for the key or the key/value is undefined.
         */
        dictionary.set = function (key, value) {
            var ret, k, previousElement;
            if (buckets.isUndefined(key) || buckets.isUndefined(value)) {
                return undefined;
            }

            k = keyPrefix + toStr(key);
            previousElement = table[k];
            if (buckets.isUndefined(previousElement)) {
                nElements += 1;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            table[k] = {
                key: key,
                value: value
            };
            return ret;
        };

        /**
         * Removes the value associated with the specified key from the dictionary if it exists.
         * @param {Object} key The key.
         * @return {*} Removed value associated with the specified key, or undefined if
         * there was no mapping for the key.
         */
        dictionary.remove = function (key) {
            var k = keyPrefix + toStr(key),
                previousElement = table[k];
            if (!buckets.isUndefined(previousElement)) {
                delete table[k];
                nElements -= 1;
                return previousElement.value;
            }
            return undefined;
        };

        /**
         * Returns an array containing all the keys in the dictionary.
         * @return {Array} An array containing all the keys in the dictionary.
         */
        dictionary.keys = function () {
            var array = [],
                name;
            for (name in table) {
                if (Object.prototype.hasOwnProperty.call(table, name)) {
                    array.push(table[name].key);
                }
            }
            return array;
        };

        /**
         * Returns an array containing all the values in the dictionary.
         * @return {Array} An array containing all the values in the dictionary.
         */
        dictionary.values = function () {
            var array = [],
                name;
            for (name in table) {
                if (Object.prototype.hasOwnProperty.call(table, name)) {
                    array.push(table[name].value);
                }
            }
            return array;
        };

        /**
         * Executes the provided function once per key-value pair
         * present in the dictionary.
         * @param {function(Object,Object):*} callback Function to execute. Receives
         * 2 arguments: key and value. To break the iteration you can
         * optionally return false inside the callback.
         */
        dictionary.forEach = function (callback) {
            var name, pair, ret;
            for (name in table) {
                if (Object.prototype.hasOwnProperty.call(table, name)) {
                    pair = table[name];
                    ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };

        /**
         * Returns true if the dictionary contains a mapping for the specified key.
         * @param {Object} key The key.
         * @return {boolean} True if the dictionary contains a mapping for the
         * specified key.
         */
        dictionary.containsKey = function (key) {
            return !buckets.isUndefined(dictionary.get(key));
        };

        /**
         * Removes all keys and values from the dictionary.
         * @this {buckets.Dictionary}
         */
        dictionary.clear = function () {
            table = {};
            nElements = 0;
        };

        /**
         * Returns the number of key-value pais in the dictionary.
         * @return {number} The number of key-value mappings in the dictionary.
         */
        dictionary.size = function () {
            return nElements;
        };

        /**
         * Returns true if the dictionary contains no keys.
         * @return {boolean} True if this dictionary contains no mappings.
         */
        dictionary.isEmpty = function () {
            return nElements <= 0;
        };

        /**
         * Returns true if the dictionary is equal to another dictionary.
         * Two dictionaries are equal if they have the same key-value pairs.
         * @param {buckets.Dictionary} other The other dictionary.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function to check if two values are equal. If the values in the dictionaries
         * are custom objects you should provide a custom equals function, otherwise
         * the === operator is used to check equality between values.
         * @return {boolean} True if the dictionary is equal to the given dictionary.
         */
        dictionary.equals = function (other, equalsFunction) {
            var eqf, isEqual;
            if (buckets.isUndefined(other) || typeof other.keys !== 'function') {
                return false;
            }
            if (dictionary.size() !== other.size()) {
                return false;
            }
            eqf = equalsFunction || buckets.defaultEquals;
            isEqual = true;
            other.forEach(function (k, v) {
                isEqual = eqf(dictionary.get(k), v);
                return isEqual;
            });
            return isEqual;
        };

        return dictionary;
    };


    /**
     * Creates an empty binary heap.
     * @class
     * <p>A heap is a binary tree that maintains the heap property:
     * Every node is less than or equal to each of its children. 
     * This implementation uses an array as the underlying storage.</p>
     * <p>If the inserted elements are custom objects, a compare function must be provided 
     * at construction time, otherwise the <=, === and >= operators are
     * used to compare elements.</p>
     * <p>Example:</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * <p>To create a Max-Heap (greater elements on top) you can a provide a
     * reverse compare function.</p>
     * <p>Example:</p>
     *
     * <pre>
     * function reverseCompare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return 1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return -1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object,Object):number=} compareFunction Optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    buckets.Heap = function (compareFunction) {

        /** 
         * @exports heap as buckets.Heap
         * @private
         */
        var heap = {},
            // Array used to store the elements of the heap.
            data = [],
            // Function used to compare elements.
            compare = compareFunction || buckets.defaultCompare;

        // Moves the node at the given index up to its proper place in the heap.
        function siftUp(index) {
            var parent;
            // Returns the index of the parent of the node at the given index.
            function parentIndex(nodeIndex) {
                return Math.floor((nodeIndex - 1) / 2);
            }

            parent = parentIndex(index);
            while (index > 0 && compare(data[parent], data[index]) > 0) {
                buckets.arrays.swap(data, parent, index);
                index = parent;
                parent = parentIndex(index);
            }
        }

        // Moves the node at the given index down to its proper place in the heap.
        function siftDown(nodeIndex) {
            var min;
            // Returns the index of the left child of the node at the given index.
            function leftChildIndex(nodeIndex) {
                return (2 * nodeIndex) + 1;
            }

            // Returns the index of the right child of the node at the given index.
            function rightChildIndex(nodeIndex) {
                return (2 * nodeIndex) + 2;
            }

            // Returns the index of the smaller child node if it exists, -1 otherwise.
            function minIndex(leftChild, rightChild) {
                if (rightChild >= data.length) {
                    if (leftChild >= data.length) {
                        return -1;
                    }
                    return leftChild;
                }
                if (compare(data[leftChild], data[rightChild]) <= 0) {
                    return leftChild;
                }
                return rightChild;
            }

            // Minimum child index
            min = minIndex(leftChildIndex(nodeIndex), rightChildIndex(nodeIndex));

            while (min >= 0 && compare(data[nodeIndex], data[min]) > 0) {
                buckets.arrays.swap(data, min, nodeIndex);
                nodeIndex = min;
                min = minIndex(leftChildIndex(nodeIndex), rightChildIndex(nodeIndex));
            }
        }

        /**
         * Retrieves but does not remove the root (minimum) element of the heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        heap.peek = function () {
            if (data.length > 0) {
                return data[0];
            }
            return undefined;
        };

        /**
         * Adds the given element into the heap.
         * @param {*} element The element.
         * @return True if the element was added or false if it is undefined.
         */
        heap.add = function (element) {
            if (buckets.isUndefined(element)) {
                return undefined;
            }
            data.push(element);
            siftUp(data.length - 1);
            return true;
        };

        /**
         * Retrieves and removes the root (minimum) element of the heap.
         * @return {*} The removed element or
         * undefined if the heap is empty.
         */
        heap.removeRoot = function () {
            var obj;
            if (data.length > 0) {
                obj = data[0];
                data[0] = data[data.length - 1];
                data.splice(data.length - 1, 1);
                if (data.length > 0) {
                    siftDown(0);
                }
                return obj;
            }
            return undefined;
        };

        /**
         * Returns true if the heap contains the specified element.
         * @param {Object} element Element to search for.
         * @return {boolean} True if the Heap contains the specified element, false
         * otherwise.
         */
        heap.contains = function (element) {
            var equF = buckets.compareToEquals(compare);
            return buckets.arrays.contains(data, element, equF);
        };

        /**
         * Returns the number of elements in the heap.
         * @return {number} The number of elements in the heap.
         */
        heap.size = function () {
            return data.length;
        };

        /**
         * Checks if the heap is empty.
         * @return {boolean} True if the heap contains no elements; false
         * otherwise.
         */
        heap.isEmpty = function () {
            return data.length <= 0;
        };

        /**
         * Removes all the elements from the heap.
         */
        heap.clear = function () {
            data.length = 0;
        };

        /**
         * Executes the provided function once per element present in the heap in
         * no particular order.
         * @param {function(Object):*} callback Function to execute,
         * invoked with an element as argument. To break the iteration you can
         * optionally return false.
         */
        heap.forEach = function (callback) {
            buckets.arrays.forEach(data, callback);
        };

        /**
         * Returns an array containing all the elements in the heap in no
         * particular order.
         * @return {Array.<*>} An array containing all the elements in the heap
         * in no particular order.
         */
        heap.toArray = function () {
            return buckets.arrays.copy(data);
        };

        /**
         * Returns true if the binary heap is equal to another heap.
         * Two heaps are equal if they have the same elements.
         * @param {buckets.Heap} other The other heap.
         * @return {boolean} True if the heap is equal to the given heap.
         */
        heap.equals = function (other) {
            var thisArray, otherArray, eqF;

            if (buckets.isUndefined(other) || typeof other.removeRoot !== 'function') {
                return false;
            }
            if (heap.size() !== other.size()) {
                return false;
            }

            thisArray = heap.toArray();
            otherArray = other.toArray();
            eqF = buckets.compareToEquals(compare);
            thisArray.sort(compare);
            otherArray.sort(compare);

            return buckets.arrays.equals(thisArray, otherArray, eqF);
        };

        return heap;
    };


    /**
     * Creates an empty Linked List.
     * @class A linked list is a sequence of items arranged one after 
     * another. The size is not fixed and it can grow or shrink 
     * on demand. One of the main benefits of a linked list is that 
     * you can add or remove elements at both ends in constant time. 
     * One disadvantage of a linked list against an array is 
     * that it doesn’t provide constant time random access.
     * @constructor
     */
    buckets.LinkedList = function () {

        /** 
         * @exports list as buckets.LinkedList
         * @private
         */
        var list = {},
            // Number of elements in the list
            nElements = 0,
            // First node in the list
            firstNode,
            // Last node in the list
            lastNode;

        // Returns the node at the specified index.
        function nodeAtIndex(index) {
            var node, i;
            if (index < 0 || index >= nElements) {
                return undefined;
            }
            if (index === (nElements - 1)) {
                return lastNode;
            }
            node = firstNode;
            for (i = 0; i < index; i += 1) {
                node = node.next;
            }
            return node;
        }

        /**
         * Adds an element to the list.
         * @param {Object} item Element to be added.
         * @param {number=} index Optional index to add the element. If no index is specified
         * the element is added to the end of the list.
         * @return {boolean} True if the element was added or false if the index is invalid
         * or if the element is undefined.
         */
        list.add = function (item, index) {
            var newNode, prev;

            if (buckets.isUndefined(index)) {
                index = nElements;
            }
            if (index < 0 || index > nElements || buckets.isUndefined(item)) {
                return false;
            }
            newNode = {
                element: item,
                next: undefined
            };
            if (nElements === 0) {
                // First node in the list.
                firstNode = newNode;
                lastNode = newNode;
            } else if (index === nElements) {
                // Insert at the end.
                lastNode.next = newNode;
                lastNode = newNode;
            } else if (index === 0) {
                // Change first node.
                newNode.next = firstNode;
                firstNode = newNode;
            } else {
                prev = nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            nElements += 1;
            return true;
        };

        /**
         * Returns the first element in the list.
         * @return {*} The first element in the list or undefined if the list is
         * empty.
         */
        list.first = function () {
            if (firstNode !== undefined) {
                return firstNode.element;
            }
            return undefined;
        };

        /**
         * Returns the last element in the list.
         * @return {*} The last element in the list or undefined if the list is
         * empty.
         */
        list.last = function () {
            if (lastNode !== undefined) {
                return lastNode.element;
            }
            return undefined;
        };

        /**
         * Returns the element at the specified position in the list.
         * @param {number} index Desired index.
         * @return {*} The element at the given index or undefined if the index is
         * out of bounds.
         */
        list.elementAtIndex = function (index) {
            var node = nodeAtIndex(index);
            if (node === undefined) {
                return undefined;
            }
            return node.element;
        };


        /**
         * Returns the index of the first occurrence of the
         * specified element, or -1 if the list does not contain the element.
         * <p>If the elements inside the list are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, that function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item Element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} The index in the list of the first occurrence
         * of the specified element, or -1 if the list does not contain the
         * element.
         */
        list.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || buckets.defaultEquals,
                currentNode = firstNode,
                index = 0;
            if (buckets.isUndefined(item)) {
                return -1;
            }

            while (currentNode !== undefined) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index += 1;
                currentNode = currentNode.next;
            }
            return -1;
        };

        /**
         * Returns true if the list contains the specified element.
         * <p>If the elements inside the list are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, that function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item Element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {boolean} True if the list contains the specified element, false
         * otherwise.
         */
        list.contains = function (item, equalsFunction) {
            return (list.indexOf(item, equalsFunction) >= 0);
        };

        /**
         * Removes the first occurrence of the specified element in the list.
         * <p>If the elements inside the list are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, that function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item Element to be removed from the list, if present.
         * @return {boolean} True if the list contained the specified element.
         */
        list.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || buckets.defaultEquals,
                currentNode = firstNode,
                previous;

            if (nElements < 1 || buckets.isUndefined(item)) {
                return false;
            }

            while (currentNode !== undefined) {

                if (equalsF(currentNode.element, item)) {

                    if (currentNode === firstNode) {
                        firstNode = firstNode.next;
                        if (currentNode === lastNode) {
                            lastNode = undefined;
                        }
                    } else if (currentNode === lastNode) {
                        lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = undefined;
                    } else {
                        previous.next = currentNode.next;
                        currentNode.next = undefined;
                    }
                    nElements = nElements - 1;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };

        /**
         * Removes all the elements from the list.
         */
        list.clear = function () {
            firstNode = undefined;
            lastNode = undefined;
            nElements = 0;
        };

        /**
         * Returns true if the list is equal to another list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {buckets.LinkedList} other The other list.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a custom equals function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if the list is equal to the given list.
         */
        list.equals = function (other, equalsFunction) {
            var eqf = equalsFunction || buckets.defaultEquals,
                isEqual = true,
                node = firstNode;

            if (buckets.isUndefined(other) || typeof other.elementAtIndex !== 'function') {
                return false;
            }
            if (list.size() !== other.size()) {
                return false;
            }

            other.forEach(function (element) {
                isEqual = eqf(element, node.element);
                node = node.next;
                return isEqual;
            });

            return isEqual;
        };

        /**
         * Removes the element at the specified position in the list.
         * @param {number} index Given index.
         * @return {*} Removed element or undefined if the index is out of bounds.
         */
        list.removeElementAtIndex = function (index) {
            var element, previous;

            if (index < 0 || index >= nElements) {
                return undefined;
            }

            if (nElements === 1) {
                //First node in the list.
                element = firstNode.element;
                firstNode = undefined;
                lastNode = undefined;
            } else {
                previous = nodeAtIndex(index - 1);
                if (previous === undefined) {
                    element = firstNode.element;
                    firstNode = firstNode.next;
                } else if (previous.next === lastNode) {
                    element = lastNode.element;
                    lastNode = previous;
                }
                if (previous !== undefined) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            nElements -= 1;
            return element;
        };

        /**
         * Executes the provided function once per element present in the list in order.
         * @param {function(Object):*} callback Function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false inside the callback.
         */
        list.forEach = function (callback) {
            var currentNode = firstNode;
            while (currentNode !== undefined) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };

        /**
         * Reverses the order of the elements in the linked list (makes the last
         * element first, and the first element last).
         * @memberOf buckets.LinkedList
         */
        list.reverse = function () {
            var current = firstNode,
                previous,
                temp;
            while (current !== undefined) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = firstNode;
            firstNode = lastNode;
            lastNode = temp;
        };


        /**
         * Returns an array containing all the elements in the list in proper
         * sequence.
         * @return {Array.<*>} An array containing all the elements in the list,
         * in proper sequence.
         */
        list.toArray = function () {
            var result = [];
            list.forEach(function (element) {
                result.push(element);
            });
            return result;
        };

        /**
         * Returns the number of elements in the list.
         * @return {number} The number of elements in the list.
         */
        list.size = function () {
            return nElements;
        };

        /**
         * Returns true if the list contains no elements.
         * @return {boolean} true if the list contains no elements.
         */
        list.isEmpty = function () {
            return nElements <= 0;
        };

        return list;
    };


    /**
     * Creates an empty multi dictionary.
     * @class <p>A multi dictionary is a special kind of dictionary that holds
     * multiple values against each key. Setting a value into the dictionary will
     * add the value to a list at that key. Getting a key will return a list
     * holding all the values associated with that key.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects, a function that converts keys to unique strings must be
     * provided at construction time.</p>
     * <p>Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.type + ' ' + pet.name;
     * }
     * </pre>
     * <p>If the values are custom objects, a function to check equality between values
     * must be provided.</p>
     * <p>Example:</p>
     * <pre>
     * function petsAreEqualByAge(pet1,pet2) {
     *  return pet1.age===pet2.age;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
     * function to check if two values are equal.
     *
     */
    buckets.MultiDictionary = function (toStrFunction, valuesEqualsFunction) {

        /** 
         * @exports multiDict as buckets.MultiDictionary
         * @private
         */
        var multiDict = {},
            // Call the parent constructor
            parent = new buckets.Dictionary(toStrFunction),
            equalsF = valuesEqualsFunction || buckets.defaultEquals;

        /**
         * Returns an array holding the values associated with
         * the specified key.
         * @param {Object} key The key.
         * @return {Array} An array holding the values or an 
         * empty array if the dictionary contains no 
         * mappings for the provided key.
         */
        multiDict.get = function (key) {
            var values = parent.get(key);
            if (buckets.isUndefined(values)) {
                return [];
            }
            return buckets.arrays.copy(values);
        };

        /**
         * Associates the specified value with the specified key if
         * it's not already present.
         * @param {Object} key The Key.
         * @param {Object} value The value to associate.
         * @return {boolean} True if the value was not already associated with that key.
         */
        multiDict.set = function (key, value) {
            var array;
            if (buckets.isUndefined(key) || buckets.isUndefined(value)) {
                return false;
            }
            if (!multiDict.containsKey(key)) {
                parent.set(key, [value]);
                return true;
            }
            array = parent.get(key);
            if (buckets.arrays.contains(array, value, equalsF)) {
                return false;
            }
            array.push(value);
            return true;
        };

        /**
         * Removes the specified value from the list of values associated with the
         * provided key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key The key.
         * @param {Object=} value Optional argument to specify the element to remove
         * from the list of values associated with the given key.
         * @return {*} True if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the given key.
         */
        multiDict.remove = function (key, value) {
            var v, array;
            if (buckets.isUndefined(value)) {
                v = parent.remove(key);
                if (buckets.isUndefined(v)) {
                    return false;
                }
                return true;
            }
            array = parent.get(key);
            if (buckets.arrays.remove(array, value, equalsF)) {
                if (array.length === 0) {
                    parent.remove(key);
                }
                return true;
            }
            return false;
        };

        /**
         * Returns an array containing all the keys in the dictionary.
         * @return {Array} An array containing all the keys in the dictionary.
         */
        multiDict.keys = function () {
            return parent.keys();
        };

        /**
         * Returns an array containing all the values in the dictionary.
         * @return {Array} An array containing all the values in the dictionary.
         */
        multiDict.values = function () {
            var values = parent.values(),
                array = [],
                i,
                j,
                v;
            for (i = 0; i < values.length; i += 1) {
                v = values[i];
                for (j = 0; j < v.length; j += 1) {
                    array.push(v[j]);
                }
            }
            return array;
        };

        /**
         * Returns true if the dictionary has at least one value associatted with the specified key.
         * @param {Object} key The key.
         * @return {boolean} True if the dictionary has at least one value associatted
         * the specified key.
         */
        multiDict.containsKey = function (key) {
            return parent.containsKey(key);
        };

        /**
         * Removes all keys and values from the dictionary.
         */
        multiDict.clear = function () {
            return parent.clear();
        };

        /**
         * Returns the number of keys in the dictionary.
         * @return {number} The number of keys in the dictionary.
         */
        multiDict.size = function () {
            return parent.size();
        };

        /**
         * Returns true if the dictionary contains no mappings.
         * @return {boolean} True if the dictionary contains no mappings.
         */
        multiDict.isEmpty = function () {
            return parent.isEmpty();
        };

        /**
         * Executes the provided function once per key
         * present in the multi dictionary.
         * @param {function(Object, Array):*} callback Function to execute. Receives
         * 2 arguments: key and an array of values. To break the iteration you can
         * optionally return false inside the callback.
         */
        multiDict.forEach = function (callback) {
            return parent.forEach(callback);
        };

        /**
         * Returns true if the multi dictionary is equal to another multi dictionary.
         * Two dictionaries are equal if they have the same keys and the same values per key.
         * @param {buckets.MultiDictionary} other The other dictionary.
         * @return {boolean} True if the dictionary is equal to the given dictionary.
         */
        multiDict.equals = function (other) {
            var isEqual = true,
                thisValues;

            if (buckets.isUndefined(other) || typeof other.values !== 'function') {
                return false;
            }
            if (multiDict.size() !== other.size()) {
                return false;
            }

            other.forEach(function (key, otherValues) {
                thisValues = multiDict.get(key) || [];
                if (thisValues.length !== otherValues.length) {
                    isEqual = false;
                } else {
                    buckets.arrays.forEach(thisValues, function (value) {
                        isEqual = buckets.arrays.contains(otherValues, value, equalsF);
                        return isEqual;
                    });
                }
                return isEqual;
            });
            return isEqual;
        };

        return multiDict;
    };


    /**
     * Creates an empty priority queue.
     * @class <p>In a priority queue each element is associated with a "priority",
     * elements are dequeued in highest-priority-first order (the elements with the
     * highest priority are dequeued first). This implementation uses a binary 
     * heap as the underlying storage.</p>
     *
     * <p>If the inserted elements are custom objects, a compare function must be provided,
     * otherwise the <=, === and >= operators are used to compare object priority.</p>
     * <p>Example:</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction Optional
     * function used to compare two element priorities. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    buckets.PriorityQueue = function (compareFunction) {

        /** 
         * @exports pQueue as buckets.PriorityQueue
         * @private
         */
        var pQueue = {},
            // Reversed compare function
            compare = buckets.reverseCompareFunction(compareFunction),
            // Underlying storage
            heap = new buckets.Heap(compare);

        /**
         * Inserts the specified element into the priority queue.
         * @param {Object} element The element to insert.
         * @return {boolean} True if the element was inserted, or false if it's undefined.
         */
        pQueue.enqueue = function (element) {
            return heap.add(element);
        };

        /**
         * Inserts the specified element into the priority queue. It's equivalent to enqueue.
         * @param {Object} element The element to insert.
         * @return {boolean} True if the element was inserted, or false if it's undefined.
         */
        pQueue.add = function (element) {
            return heap.add(element);
        };

        /**
         * Retrieves and removes the highest priority element of the queue.
         * @return {*} The highest priority element of the queue,
         * or undefined if the queue is empty.
         */
        pQueue.dequeue = function () {
            var elem;
            if (heap.size() !== 0) {
                elem = heap.peek();
                heap.removeRoot();
                return elem;
            }
            return undefined;
        };

        /**
         * Retrieves, but does not remove, the highest priority element of the queue.
         * @return {*} The highest priority element of the queue, or undefined if the queue is empty.
         */
        pQueue.peek = function () {
            return heap.peek();
        };

        /**
         * Returns true if the priority queue contains the specified element.
         * @param {Object} element Element to search for.
         * @return {boolean} True if the priority queue contains the specified element,
         * false otherwise.
         */
        pQueue.contains = function (element) {
            return heap.contains(element);
        };

        /**
         * Checks if the priority queue is empty.
         * @return {boolean} True if and only if the priority queue contains no items, false
         * otherwise.
         */
        pQueue.isEmpty = function () {
            return heap.isEmpty();
        };

        /**
         * Returns the number of elements in the priority queue.
         * @return {number} The number of elements in the priority queue.
         */
        pQueue.size = function () {
            return heap.size();
        };

        /**
         * Removes all elements from the priority queue.
         */
        pQueue.clear = function () {
            heap.clear();
        };

        /**
         * Executes the provided function once per element present in the queue in
         * no particular order.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked one element as argument. To break the iteration you can
         * optionally return false inside the callback.
         */
        pQueue.forEach = function (callback) {
            heap.forEach(callback);
        };

        /**
         * Returns an array containing all the elements in the queue in no
         * particular order.
         * @return {Array.<*>} An array containing all the elements in the queue
         * in no particular order.
         */
        pQueue.toArray = function () {
            return heap.toArray();
        };

        /**
         * Returns true if the queue is equal to another queue.
         * Two priority queues are equal if they have the same elements.
         * @param {buckets.PriorityQueue} other The other queue.
         * @return {boolean} True if the queue is equal to the given queue.
         */
        pQueue.equals = function (other) {
            var thisArray, otherArray, eqF;

            if (buckets.isUndefined(other) || typeof other.dequeue !== 'function') {
                return false;
            }
            if (pQueue.size() !== other.size()) {
                return false;
            }

            thisArray = pQueue.toArray();
            otherArray = other.toArray();
            eqF = buckets.compareToEquals(compare);
            thisArray.sort(compare);
            otherArray.sort(compare);

            return buckets.arrays.equals(thisArray, otherArray, eqF);
        };

        return pQueue;
    };


    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as the underlying storage.
     * @constructor
     */
    buckets.Queue = function () {

        /** 
         * @exports queue as buckets.Queue
         * @private
         */
        var queue = {},
            // Underlying list containing the elements.
            list = new buckets.LinkedList();

        /**
         * Inserts the specified element into the end of the queue.
         * @param {Object} elem The element to insert.
         * @return {boolean} True if the element was inserted, or false if it's undefined.
         */
        queue.enqueue = function (elem) {
            return list.add(elem);
        };

        /**
         * Inserts the specified element into the end of the queue. Equivalent to enqueue.
         * @param {Object} elem The element to insert.
         * @return {boolean} True if the element was inserted, or false if it's undefined.
         */
        queue.add = function (elem) {
            return list.add(elem);
        };

        /**
         * Retrieves and removes the head of the queue.
         * @return {*} The head of the queue, or undefined if the queue is empty.
         */
        queue.dequeue = function () {
            var elem;
            if (list.size() !== 0) {
                elem = list.first();
                list.removeElementAtIndex(0);
                return elem;
            }
            return undefined;
        };

        /**
         * Retrieves, but does not remove, the head of the queue.
         * @return {*} The head of the queue, or undefined if the queue is empty.
         */
        queue.peek = function () {
            if (list.size() !== 0) {
                return list.first();
            }
            return undefined;
        };

        /**
         * Returns the number of elements in the queue.
         * @return {number} The number of elements in the queue.
         */
        queue.size = function () {
            return list.size();
        };

        /**
         * Returns true if the queue contains the specified element.
         * <p>If the elements inside the queue are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem Element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function to check if two elements are equal.
         * @return {boolean} True if the queue contains the specified element,
         * false otherwise.
         */
        queue.contains = function (elem, equalsFunction) {
            return list.contains(elem, equalsFunction);
        };

        /**
         * Checks if the queue is empty.
         * @return {boolean} True if and only if the queue contains no items.
         */
        queue.isEmpty = function () {
            return list.size() <= 0;
        };

        /**
         * Removes all the elements from the queue.
         */
        queue.clear = function () {
            list.clear();
        };

        /**
         * Executes the provided function once per each element present in the queue in
         * FIFO order.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked an element as argument, to break the iteration you can
         * optionally return false inside the callback.
         */
        queue.forEach = function (callback) {
            list.forEach(callback);
        };

        /**
         * Returns an array containing all the elements in the queue in FIFO
         * order.
         * @return {Array.<*>} An array containing all the elements in the queue
         * in FIFO order.
         */
        queue.toArray = function () {
            return list.toArray();
        };

        /**
         * Returns true if the queue is equal to another queue.
         * Two queues are equal if they have the same elements in the same order.
         * @param {buckets.Queue} other The other queue.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function to check if two elements are equal. If the elements in the queues
         * are custom objects you should provide a custom equals function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} True if the queue is equal to the given queue.
         */
        queue.equals = function (other, equalsFunction) {
            var eqf, isEqual, thisElement;
            if (buckets.isUndefined(other) || typeof other.dequeue !== 'function') {
                return false;
            }
            if (queue.size() !== other.size()) {
                return false;
            }
            eqf = equalsFunction || buckets.defaultEquals;
            isEqual = true;
            other.forEach(function (element) {
                thisElement = queue.dequeue();
                queue.enqueue(thisElement);
                isEqual = eqf(thisElement, element);
                return isEqual;
            });
            return isEqual;
        };

        return queue;
    };


    /**
     * Creates an empty set.
     * @class <p>A set is a data structure that contains no duplicate items.</p>
     * <p>If the inserted elements are custom objects, a function
     * that converts elements to unique strings must be provided at construction time. 
     * <p>Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.type + ' ' + pet.name;
     * }
     * </pre>
     *
     * @param {function(Object):string=} toStringFunction Optional function used
     * to convert elements to unique strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives an object and returns a
     * unique string must be provided.
     */
    buckets.Set = function (toStringFunction) {

        /** 
         * @exports theSet as buckets.Set
         * @private
         */
        var theSet = {},
            // Underlying storage.
            dictionary = new buckets.Dictionary(toStringFunction);

        /**
         * Returns true if the set contains the specified element.
         * @param {Object} element Element to search for.
         * @return {boolean} True if the set contains the specified element,
         * false otherwise.
         */
        theSet.contains = function (element) {
            return dictionary.containsKey(element);
        };

        /**
         * Adds the specified element to the set if it's not already present.
         * @param {Object} element The element to insert.
         * @return {boolean} True if the set did not already contain the specified element.
         */
        theSet.add = function (element) {
            if (theSet.contains(element) || buckets.isUndefined(element)) {
                return false;
            }
            dictionary.set(element, element);
            return true;
        };

        /**
         * Performs an intersection between this and another set.
         * Removes all values that are not present in this set and the given set.
         * @param {buckets.Set} otherSet Other set.
         */
        theSet.intersection = function (otherSet) {
            theSet.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    theSet.remove(element);
                }
            });
        };

        /**
         * Performs a union between this and another set.
         * Adds all values from the given set to this set.
         * @param {buckets.Set} otherSet Other set.
         */
        theSet.union = function (otherSet) {
            otherSet.forEach(function (element) {
                theSet.add(element);
            });
        };

        /**
         * Performs a difference between this and another set.
         * Removes all the values that are present in the given set from this set.
         * @param {buckets.Set} otherSet other set.
         */
        theSet.difference = function (otherSet) {
            otherSet.forEach(function (element) {
                theSet.remove(element);
            });
        };

        /**
         * Checks whether the given set contains all the elements of this set.
         * @param {buckets.Set} otherSet Other set.
         * @return {boolean} True if this set is a subset of the given set.
         */
        theSet.isSubsetOf = function (otherSet) {
            var isSub = true;

            if (theSet.size() > otherSet.size()) {
                return false;
            }

            theSet.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
            });
            return isSub;
        };

        /**
         * Removes the specified element from the set.
         * @return {boolean} True if the set contained the specified element, false
         * otherwise.
         */
        theSet.remove = function (element) {
            if (!theSet.contains(element)) {
                return false;
            }
            dictionary.remove(element);
            return true;
        };

        /**
         * Executes the provided function once per element
         * present in the set.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked an element as argument. To break the iteration you can
         * optionally return false inside the callback.
         */
        theSet.forEach = function (callback) {
            dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };

        /**
         * Returns an array containing all the elements in the set in no particular order.
         * @return {Array} An array containing all the elements in the set.
         */
        theSet.toArray = function () {
            return dictionary.values();
        };

        /**
         * Returns true if the set contains no elements.
         * @return {boolean} True if the set contains no elements.
         */
        theSet.isEmpty = function () {
            return dictionary.isEmpty();
        };

        /**
         * Returns the number of elements in the set.
         * @return {number} The number of elements in the set.
         */
        theSet.size = function () {
            return dictionary.size();
        };

        /**
         * Removes all the elements from the set.
         */
        theSet.clear = function () {
            dictionary.clear();
        };

        /**
         * Returns true if the set is equal to another set.
         * Two sets are equal if they have the same elements.
         * @param {buckets.Set} other The other set.
         * @return {boolean} True if the set is equal to the given set.
         */
        theSet.equals = function (other) {
            var isEqual;
            if (buckets.isUndefined(other) || typeof other.isSubsetOf !== 'function') {
                return false;
            }
            if (theSet.size() !== other.size()) {
                return false;
            }

            isEqual = true;
            other.forEach(function (element) {
                isEqual = theSet.contains(element);
                return isEqual;
            });
            return isEqual;
        };

        return theSet;
    };


    /**
     * Creates an empty Stack.
     * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
     * element added to the stack will be the first one to be removed. This
     * implementation uses a linked list as the underlying storage.
     * @constructor
     */
    buckets.Stack = function () {

        /** 
         * @exports stack as buckets.Stack
         * @private
         */
        var stack = {},
            // Underlying list containing the elements.
            list = new buckets.LinkedList();

        /**
         * Pushes an element onto the top of the stack.
         * @param {Object} elem The element.
         * @return {boolean} True if the element was pushed or false if it's undefined.
         */
        stack.push = function (elem) {
            return list.add(elem, 0);
        };

        /**
         * Pushes an element onto the top of the stack. Equivalent to push.
         * @param {Object} elem The element.
         * @return {boolean} true If the element was pushed or false if it's undefined.
         */
        stack.add = function (elem) {
            return list.add(elem, 0);
        };

        /**
         * Removes the element at the top of the stack and returns it.
         * @return {*} The element at the top of the stack or undefined if the
         * stack is empty.
         */
        stack.pop = function () {
            return list.removeElementAtIndex(0);
        };

        /**
         * Returns the element at the top of the stack without removing it.
         * @return {*} The element at the top of the stack or undefined if the
         * stack is empty.
         */
        stack.peek = function () {
            return list.first();
        };

        /**
         * Returns the number of elements in the stack.
         * @return {number} The number of elements in the stack.
         */
        stack.size = function () {
            return list.size();
        };

        /**
         * Returns true if the stack contains the specified element.
         * <p>If the elements inside the stack are
         * not comparable with the === operator, a custom equals function must be
         * provided to perform searches, that function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem Element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {boolean} True if the stack contains the specified element,
         * false otherwise.
         */
        stack.contains = function (elem, equalsFunction) {
            return list.contains(elem, equalsFunction);
        };

        /**
         * Checks if the stack is empty.
         * @return {boolean} True if and only if this stack contains no elements, false
         * otherwise.
         */
        stack.isEmpty = function () {
            return list.isEmpty();
        };

        /**
         * Removes all the elements from the stack.
         */
        stack.clear = function () {
            list.clear();
        };

        /**
         * Executes the provided function once per element present in the stack in
         * LIFO order.
         * @param {function(Object):*} callback Function to execute, it's
         * invoked with an element as argument. To break the iteration you can
         * optionally return false inside the callback.
         */
        stack.forEach = function (callback) {
            list.forEach(callback);
        };

        /**
         * Returns an array containing all the elements in the stack in LIFO
         * order.
         * @return {Array.<*>} An array containing all the elements in the stack
         * in LIFO order.
         */
        stack.toArray = function () {
            return list.toArray();
        };

        /**
         * Returns true if the stack is equal to another stack.
         * Two stacks are equal if they have the same elements in the same order.
         * @param {buckets.Stack} other The other stack.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function to check if two elements are equal. If the elements in the stacks
         * are custom objects you should provide a custom equals function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} True if the stack is equal to the given stack.
         */
        stack.equals = function (other, equalsFunction) {
            var eqf, isEqual, thisElement;
            if (buckets.isUndefined(other) || typeof other.peek !== 'function') {
                return false;
            }
            if (stack.size() !== other.size()) {
                return false;
            }

            eqf = equalsFunction || buckets.defaultEquals;
            isEqual = true;
            other.forEach(function (element) {
                thisElement = stack.pop();
                list.add(thisElement);
                isEqual = eqf(thisElement, element);
                return isEqual;
            });

            return isEqual;
        };

        return stack;
    };


    return buckets;

}));
