/**
 * This class is used to hold validation errors for a record. The results of the record's
 * `{@link Ext.data.Model#validators validators}` are stored as the field values of this
 * record. The first failed validation is all that is stored per field unless the Model
 * class has defined a `validationSeparator` config.
 *
 * Application code will not need to interact with this class specifically but rather just
 * view the validation as a record.
 * @private
 * @since 5.0.0
 */
Ext.define('Ext.data.Validation', {
    extend: 'Ext.data.Model',

    isValidation: true,

    /**
     * @property {Number} syncGeneration
     * This is a capture of the `{@link Ext.data.Model#generation}` value from the last
     * time the validation state was refreshed. This is used to determine if this object
     * is potentially out-of-date with its associated `record`.
     * @private
     * @readonly
     * @since 5.0.0
     */
    syncGeneration: 0,  // Model generation starts at 1 so we start out-of-sync

    /**
     * Attaches this instance to its associated `record`.
     * @param {Ext.data.Model} record The associated record.
     * @private
     * @since 5.0.0
     */
    attach: function (record) {
        /**
         * @property {Ext.data.Model} record
         * The associated record for this validation instance.
         * @readonly
         * @since 5.0.0
         */
        this.record = record;

        // We need to remove the id property from our data as that is not meaningful for
        // a Validation pseudo-record.
        delete this.data.id;
    },

    getValidation: function () {
        return null;
    },

    /**
     * Returns true if the associated record (not this one) is valid.
     * @return {Boolean}
     */
    isValid: function () {
        var me = this;

        if (me.syncGeneration !== me.record.generation) {
            me.refresh();
        }

        return me.dirty;
    },

    /**
     * This method updates the state of this record against its associated `record`. This
     * method should not need to be called directly as it is internally called when this
     * record is returned by `{@link Ext.data.Model#getValidation}`.
     * @param {Boolean} [force=false] Pass `true` to force an update of validation state.
     * @private
     * @since 5.0.0
     */
    refresh: function (force) {
        var me = this,
            data = me.data,
            record = me.record,
            fields = record.fields,
            generation = record.generation,
            validators = record.validators,
            recordData = record.data,
            defaultMessage,
            sep = record.validationSeparator,
            values = null,
            currentValue, error, field, item, i, j, jLen, len, msg, val, name;

        if (force || me.syncGeneration !== generation) {
            me.syncGeneration = generation;

            for (i = 0, len = fields.length; i < len; ++i) {
                field = fields[i];
                name = field.name;
                val = recordData[name];
                defaultMessage = field.defaultInvalidMessage;
                error = 0;

                if (!(name in data)) {
                    // Now is the cheapest time to populate our data object with "true"
                    // for all validated fields. This ensures that our non-dirty state
                    // equates to isValid.
                    data[name] = currentValue = true; // true === valid
                } else {
                    currentValue = data[name];
                }

                if (field.validate !== Ext.emptyFn) {
                    msg = field.validate(val, sep);
                    if (msg !== true) {
                        error = msg || defaultMessage;
                    }
                }

                if ((sep || !error) && validators) {
                    item = validators[name];
                    if (item) {
                        for (j = 0, jLen = item.length; j < jLen; ++j) {
                            msg = item[j].validate(val, me);
                            if (msg !== true) {
                                if (error) {
                                    // to be here we must have a "validationSeparator"
                                    error += sep;
                                    error += msg || defaultMessage;
                                } else {
                                    error = msg || defaultMessage;
                                    if (!sep) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!error) {
                    error = true; // valid state is stored as true
                }
                if (error !== currentValue) {
                    (values || (values = {}))[name] = error;
                }
            }

            if (values) {
                // only need to do this if something changed...
                me.set(values);
            }
        }
    }
});
