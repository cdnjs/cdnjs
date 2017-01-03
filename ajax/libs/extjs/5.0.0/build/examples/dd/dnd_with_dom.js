Ext.onReady(function() {
    // Create an object that we'll use to implement and override drag behaviors a little later
    var overrides = {
        // Called the instance the element is dragged.
        b4StartDrag : function() {
            // Cache the drag element
            if (!this.el) {
                this.el = Ext.get(this.getEl());
            }
            
            //Cache the original XY Coordinates of the element, we'll use this later.
            this.originalXY = this.el.getXY();
        },
        // Called when element is dropped not anything other than a dropzone with the same ddgroup
        onInvalidDrop : function() {
            // Set a flag to invoke the animated repair
            this.invalidDrop = true;
        },
        // Called when the drag operation completes
        endDrag : function() {
            // Invoke the animation if the invalidDrop flag is set to true
            if (this.invalidDrop === true) {
                // Remove the drop invitation
                this.el.removeCls('dropOK');
                
                // Create the animation configuration object
                var animCfgObj = {
                    easing   : 'elasticOut',
                    duration : 1,
                    scope    : this,
                    callback : function() {
                        // Remove the position attribute
                        this.el.dom.style.position = '';
                    }
                };
                
                // Apply the repair animation
                this.el.setXY([this.originalXY[0], this.originalXY[1]], animCfgObj);
                delete this.invalidDrop;
            }
        },
        // Called upon successful drop of an element on a DDTarget with the same
        onDragDrop : function(evtObj, targetElId) {
            // Wrap the drop target element with Ext.Element
            var dropEl = Ext.get(targetElId);
            
            // Perform the node move only if the drag element's
            // parent is not the same as the drop target
            if (this.el.dom.parentNode.id != targetElId) {
                
                // Move the element
                dropEl.appendChild(this.el);
                
                // Remove the drag invitation
                this.onDragOut(evtObj, targetElId);
                
                // Clear the styles
                this.el.dom.style.position ='';
                this.el.dom.style.top = '';
                this.el.dom.style.left = '';
            }
            else {
                // This was an invalid drop, initiate a repair
                this.onInvalidDrop();
            }
        },
        // Only called when the drag element is dragged over the a drop target with the same ddgroup
        onDragEnter : function(evtObj, targetElId) {
            // Colorize the drag target if the drag node's parent is not the same as the drop target
            if (targetElId != this.el.dom.parentNode.id) {
                this.el.addCls('dropOK');
            }
            else {
                // Remove the invitation
                this.onDragOut();
            }
        },
        // Only called when element is dragged out of a dropzone with the same ddgroup
        onDragOut : function(evtObj, targetElId) {
            this.el.removeCls('dropOK');
        }
    };

    // Configure the cars to be draggable
    var carElements = Ext.get('cars').select('div');
    Ext.each(carElements.elements, function(el) {
        var dd = Ext.create('Ext.dd.DD', el, 'carsDDGroup', {
            isTarget  : false
        });
        //Apply the overrides object to the newly created instance of DD
        Ext.apply(dd, overrides);
    });

    var truckElements = Ext.get('trucks').select('div');
    Ext.each(truckElements.elements, function(el) {
        var dd = Ext.create('Ext.dd.DD', el, 'trucksDDGroup', {
            isTarget  : false
        });
        Ext.apply(dd, overrides);
    });
    
    // Instantiate instances of Ext.dd.DDTarget for the cars and trucks container
    var carsDDTarget = Ext.create('Ext.dd.DDTarget', 'cars','carsDDGroup');
    var trucksDDTarget = Ext.create('Ext.dd.DDTarget', 'trucks', 'trucksDDGroup');

    // Instantiate instnaces of DDTarget for the rented and repair drop target elements
    var rentedDDTarget = Ext.create('Ext.dd.DDTarget', 'rented', 'carsDDGroup');
    var repairDDTarget = Ext.create('Ext.dd.DDTarget', 'repair', 'carsDDGroup');

    // Ensure that the rented and repair DDTargets will participate in the trucksDDGroup
    rentedDDTarget.addToGroup('trucksDDGroup');
    repairDDTarget.addToGroup('trucksDDGroup');

});
