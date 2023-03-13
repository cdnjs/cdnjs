/*! AnabolicSet v1.4.1 | (c) ColonelParrot and other contributors | MIT License */

; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.AnabolicSet = factory()
}(this, (function () {
    'use strict';
    class AnabolicSet {

        /**
         * Initializes the AnabolicSet
         * @param {*} values the initial values in the set
         * @param {*} serializer the serializer function
         * @param {*} options options for the set
         */
        constructor(values, serializer, options) {
            if (serializer !== undefined) {
                this.setSerializer(serializer)
            } else {
                this.setSerializer((a) => a)
            }

            this.setValues(values)

            this.options = options || {}
        }

        /**
         * Set the values for the set, overwriting previous values
         * @param {*} values the values in the set
         */
        setValues(values) {
            const setArrayValues = (arr) => {
                this._values = arr.reduce((acc, curr) => {
                    acc[this._serializer(curr)] = curr
                    return acc
                }, {})
            }
            if (values !== undefined) {
                this.clear()
                if (Array.isArray(values)) {
                    setArrayValues(values)
                } else {
                    setArrayValues([values])
                }
            } else {
                this.clear()
            }
        }

        /**
         * Insert item into Set
         * @param {*} value item to be inserted
         */
        add(value) {
            if (value !== undefined) {
                this._values[this._serializer(value)] = value
            }
        }

        /**
         * Adds multiple rest parameters
         * @param  {...any} values rest parameters
         */
        addAll(...values) {
            if (values !== undefined) {
                values.forEach(value => {
                    this._values[this._serializer(value)] = value
                })
            }
        }

        /**
         * Clears all items in the AnabolicSet
         */
        clear() {
            this._values = {}
        }

        /**
         * Removes value from set
         * @param {*} value item to be removed
         */
        delete(value) {
            if (value !== undefined) {
                delete this._values[this._serializer(value)]
            }
        }

        /**
         * `[[value, value], [value2, value2]]`
         * @returns an array of the items in the Set in groups of 2
         */
        entries() {
            return Object.values(this._values).reduce((acc, curr) => {
                acc.push([curr, curr])
                return acc;
            }, [])
        }

        /**
         * Calls callback on each item in AnabolicSet
         * @param {*} callback callback function
         */
        forEach(callback) {
            Object.values(this._values).forEach(callback)
        }

        /**
         * Checks whether the AnabolicSet contains the value
         * @param {*} value 
         * @returns `true` if contains, `false` otherwise
         */
        has(value) {
            return this._values.hasOwnProperty(this._serializer(value))
        }

        /**
         * Get items in AnabolicSet as an array
         * @returns an array of items
         */
        values() {
            return Object.values(this._values)
        }

        /**
         * Synonymous with {@link getValues()}
         * @returns an array of items
         */
        keys() {
            return this.getValues()
        }

        /**
         * Sets serializer function
         * @param {*} serializer serializer function
         */
        setSerializer(serializer) {
            this._serializer = serializer
        }

        /**
         * Applies union with another set
         * @param {*} set other set
         * @returns new AnabolicSet with union
         */
        union(set) {
            if (set !== undefined) {
                const values = { ...this._values }
                const setValues = { ...set._values }
                Object.values(setValues).forEach(val => {
                    const key = this._serializer(val)
                    values[key] = val;
                })
                return new AnabolicSet(Object.values(values), this._serializer)
            }
        }

        /**
         * Gets intersection between sets
         * @param {*} set 
         * @returns array of intersections
         */
        intersect(set) {
            return this.values().reduce((acc, curr) => {
                if (set._values.hasOwnProperty(set._serializer(curr))) {
                    acc.push(curr)
                }
                return acc
            }, [])
        }

        /**
         * Gets complement of set to parameter
         * @param {*} set 
         * @returns array of complements
         */
        complement(set) {
            return this.values().reduce((acc, curr) => {
                if (!set._values.hasOwnProperty(set._serializer(curr))) {
                    acc.push(curr)
                }
                return acc
            }, [])
        }

        /**
         * Checks if current set is a subset of parameter
         * @param {*} set 
         * @returns `true` if is subset, `false` otherwise
         */
        isSubsetOf(set) {
            return this.complement(set).length == 0
        }

        /**
         * Checks if current set is a superset of parameter
         * @param {*} set 
         * @returns `true` if is superset, `false` otherwise
         */
        isSupersetOf(set) {
            return set.isSubsetOf(this)
        }

        /**
         * Clones AnabolicSet
         * @returns new AnabolicSet with identical items & serializer
         */
        clone() {
            return new AnabolicSet({ ...this._values }, this._serializer)
        }
    }

    if(typeof module !== 'undefined'){
        module.exports = { AnabolicSet }
    }
    return AnabolicSet
})));