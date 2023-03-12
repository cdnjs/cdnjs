/*! AnabolicSet v1.1.0 | (c) ColonelParrot and other contributors | MIT License */

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
                this.serializer = serializer;
            } else {
                this.serializer = (a) => a;
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
                this.values = arr.reduce((acc, curr) => {
                    acc[this.serializer(curr)] = curr
                    return acc
                }, {})
            }
            if (values !== undefined) {
                this.clear()
                if (Array.isArray(values)) {
                    setArrayValues(values)
                } else if (typeof values === 'object') {
                    setArrayValues(Object.values(values))
                } else if (typeof values === 'number' || typeof values === 'string') {
                    setArrayValues([values])
                } else {
                    throw new Error('Unsupported value type')
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
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        this.values[this.serializer(val)] = val
                    })
                } else if (typeof value === 'object') {
                    Object.values(value).forEach(val => {
                        this.values[this.serializer(val)] = val
                    })
                } else if (typeof value === 'number' || typeof value == 'string') {
                    this.values[this.serializer(value)] = value
                } else {
                    throw new Error('Unsupported value type')
                }
            }
        }

        /**
         * Clears all items in the AnabolicSet
         */
        clear() {
            this.values = {}
        }

        /**
         * Removes value from set
         * @param {*} value item to be removed
         */
        delete(value) {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        delete this.values[this.serializer(val)]
                    })
                } else if (typeof value === 'object') {
                    Object.values(value).forEach(val => {
                        delete this.values[this.serializer(val)]
                    })
                } else if (typeof value === 'number' || typeof value == 'string') {
                    delete this.values[this.serializer(value)]
                } else {
                    throw new Error('Unsupported value type')
                }
            }
        }

        /**
         * `[[value, value], [value2, value2]]`
         * @returns an array of the items in the Set in groups of 2
         */
        entries() {
            return Object.values(this.values).reduce((acc, curr) => {
                acc.push([curr, curr])
                return acc;
            }, [])
        }

        /**
         * Calls callback on each item in AnabolicSet
         * @param {*} callback callback function
         */
        forEach(callback) {
            Object.values(this.values).forEach(callback)
        }

        /**
         * Checks whether the AnabolicSet contains the value
         * @param {*} value 
         * @returns `true` if contains, `false` otherwise
         */
        has(value) {
            return this.values.hasOwnProperty(this.serializer(value))
        }

        /**
         * Get items in AnabolicSet as an array
         * @returns an array of items
         */
        getValues() {
            return Object.values(this.values)
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
            this.serializer = serializer
        }

        /**
         * Applies union with another set
         * @param {*} set other set
         * @param {*} conflictHandler function with 2 parameters called if a conflict occurs (possibly from different serializers producing same key)
         * @returns new AnabolicSet with union
         */
        union(set, conflictHandler) {
            conflictHandler = conflictHandler || ((a, b) => a);
            if (set !== undefined) {
                const values = { ...this.values }
                const setValues = { ...set.values }
                Object.values(setValues).forEach(val => {
                    const key = this.serializer(val)
                    if (values.hasOwnProperty(key)) {
                        values[key] = conflictHandler(values[key], setValues[key])
                    } else {
                        values[key] = val;
                    }
                })
                return new AnabolicSet(values, this.serializer)
            }
        }

        /**
         * Gets intersection between sets
         * @param {*} set 
         * @returns array of intersections
         */
        intersect(set) {
            return Object.keys(this.values).reduce((acc, curr) => {
                if (set.values.hasOwnProperty(curr)) {
                    acc.push(this.values[curr])
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
            return Object.keys(this.values).reduce((acc, curr) => {
                if (!set.values.hasOwnProperty(curr)) {
                    acc.push(this.values[curr])
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
            return new AnabolicSet({...this.values}, this.serializer)
        }
    }
    return AnabolicSet
})));