YUI.add('datasource-polling', function(Y) {

/**
 * Extends DataSource with polling functionality.
 *
 * @module datasource
 * @submodule datasource-polling
 */
    var LANG = Y.Lang,
    
    /**
     * Adds polling to the YUI DataSource utility.
     * @class Pollable
     * @extends DataSource.Local
     */    
    Pollable = function() {};

    
Pollable.prototype = {

    /**
    * @property _intervals
    * @description Array of polling interval IDs that have been enabled,
    * stored here to be able to clear all intervals.
    * @private
    */
    _intervals: null,

    /**
     * Sets up a polling mechanism to send requests at set intervals and forward
     * responses to given callback.
     *
     * @method setInterval
     * @param msec {Number} Length of interval in milliseconds.
     * @param request {Object} Request object.
     * @param callback {Object} An object literal with the following properties:
     *     <dl>
     *     <dt><code>success</code></dt>
     *     <dd>The function to call when the data is ready.</dd>
     *     <dt><code>failure</code></dt>
     *     <dd>The function to call upon a response failure condition.</dd>
     *     <dt><code>scope</code></dt>
     *     <dd>The object to serve as the scope for the success and failure handlers.</dd>
     *     <dt><code>argument</code></dt>
     *     <dd>Arbitrary data that will be passed back to the success and failure handlers.</dd>
     *     </dl>
     * @return {Number} Interval ID.
     */
    setInterval: function(msec, request, callback) {
        if(LANG.isNumber(msec) && (msec >= 0)) {
            Y.log("Enabling polling to live data for \"" + Y.dump(request) + "\" at interval " + msec, "info", this.toString());
            var self = this,
                id = setInterval(function() {
                    self.sendRequest(request, callback);
                    //self._makeConnection(request, callback);
                }, msec);
            if(!this._intervals) {
                this._intervals = [];
            }
            this._intervals.push(id);
            return id;
        }
        else {
            Y.log("Could not enable polling to live data for \"" + Y.dump(request) + "\" at interval " + msec, "info", this.toString());
        }
    },

    /**
     * Disables polling mechanism associated with the given interval ID.
     *
     * @method clearInterval
     * @param id {Number} Interval ID.
     */
    clearInterval: function(id) {
        // Remove from tracker if there
        var tracker = this._intervals || [],
            i = tracker.length-1;

        for(; i>-1; i--) {
            if(tracker[i] === id) {
                tracker.splice(i,1);
                clearInterval(id);
            }
        }
    },

    /**
     * Clears all intervals.
     *
     * @method clearAllIntervals
     */
    clearAllIntervals: function() {
        for(var i = tracker.length-1; i>-1; i--) {
            clearInterval(id);
        }
        
        this._intervals = []
    }
};
    
Y.Base.build(Y.DataSource.Local.NAME, Y.DataSource.Local, [Pollable], {dynamic:false});



}, '@VERSION@' ,{requires:['datasource-base']});
