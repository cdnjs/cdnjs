/*
 * Here is where we "activate" the DataView.
 * We have decided that each node with the class "patient-source" encapsulates a single draggable
 * object.
 *
 * So we inject code into the DragZone which, when passed a mousedown event, interrogates
 * the event to see if it was within an element with the class "patient-source". If so, we
 * return non-null drag data.
 *
 * Returning non-null drag data indicates that the mousedown event has begun a dragging process.
 * The data must contain a property called "ddel" which is a DOM element which provides an image
 * of the data being dragged. The actual node clicked on is not dragged, a proxy element is dragged.
 * We can insert any other data into the data object, and this will be used by a cooperating DropZone
 * to perform the drop operation.
 */
function initializePatientDragZone(v) {
    v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

//      On receipt of a mousedown event, see if it is within a draggable element.
//      Return a drag data object if so. The data object can contain arbitrary application
//      data, but it should also contain a DOM element in the ddel property to provide
//      a proxy to drag.
        getDragData: function(e) {
            var sourceEl = e.getTarget(v.itemSelector, 10), d;
            if (sourceEl) {
                d = sourceEl.cloneNode(true);
                d.id = Ext.id();
                return (v.dragData = {
                    sourceEl: sourceEl,
                    repairXY: Ext.fly(sourceEl).getXY(),
                    ddel: d,
                    patientData: v.getRecord(sourceEl).data
                });
            }
        },

//      Provide coordinates for the proxy to slide back to on failed drag.
//      This is the original XY coordinates of the draggable element.
        getRepairXY: function() {
            return this.dragData.repairXY;
        }
    });
}

/*
 * Here is where we "activate" the GridPanel.
 * We have decided that the element with class "hospital-target" is the element which can receieve
 * drop gestures. So we inject a method "getTargetFromEvent" into the DropZone. This is constantly called
 * while the mouse is moving over the DropZone, and it returns the target DOM element if it detects that
 * the mouse if over an element which can receieve drop gestures.
 *
 * Once the DropZone has been informed by getTargetFromEvent that it is over a target, it will then
 * call several "onNodeXXXX" methods at various points. These include:
 *
 * onNodeEnter
 * onNodeOut
 * onNodeOver
 * onNodeDrop
 *
 * We provide implementations of each of these to provide behaviour for these events.
 */
function initializeHospitalDropZone(v) {
    var gridView = v,
        grid = gridView.up('gridpanel');

    function getHospitalFromTarget(target) {
        var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
            mainRow = rowBody.previousSibling;

        return gridView.getRecord(mainRow);
    }

    function allowPatient(hospital, name) {
        var patients = hospital.get('patients');
        return !patients || patients.indexOf(name) === -1;
    }

    grid.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

//      If the mouse is over a target node, return that node. This is
//      provided as the "target" parameter in all "onNodeXXXX" node event handling functions
        getTargetFromEvent: function(e) {
            return e.getTarget('.hospital-target');
        },

//      On entry into a target node, highlight that node.
        onNodeEnter : function(target, dd, e, data){
            Ext.fly(target).addCls('hospital-target-hover');
        },

//      On exit from a target node, unhighlight that node.
        onNodeOut : function(target, dd, e, data){
            Ext.fly(target).removeCls('hospital-target-hover');
        },

//      While over a target node, return the default drop allowed class which
//      places a "tick" icon into the drag proxy.
        onNodeOver : function(target, dd, e, data){
            var hospital = getHospitalFromTarget(target),
                name = data.patientData.name,
                proto = Ext.dd.DropZone.prototype;

            return allowPatient(hospital, name) ? proto.dropAllowed : proto.dropNotAllowed;
        },

//      On node drop, we can interrogate the target node to find the underlying
//      application object that is the real target of the dragged data.
//      In this case, it is a Record in the GridPanel's Store.
//      We can use the data set up by the DragZone's getDragData method to read
//      any data we decided to attach.
        onNodeDrop : function(target, dd, e, data){
            var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr', null, false),
                mainRow = rowBody.previousSibling,
                hospital = gridView.getRecord(mainRow),
                targetEl = Ext.get(target),
                html = targetEl.dom.innerHTML,
                patients = hospital.get('patients'),
                name = data.patientData.name;

            if (allowPatient(hospital, name)) {
                if (!patients) {
                    patients = [];
                    hospital.set('patients', patients);
                }
                patients.push(name);
                html = patients.join(', ');
                targetEl.update(html);
                Ext.Msg.alert('Drop gesture', 'Dropped patient ' + name +
                    ' on hospital ' + hospital.get('name'));
                
                return true;
            }
            return false;
        }
    });
}


Ext.require(['*']);

Ext.onReady(function() {

    var patients = [{
        insuranceCode: '11111',
        name: 'Fred Bloggs',
        address: 'Main Street',
        telephone: '555 1234 123'
    }, {
        insuranceCode: '22222',
        name: 'Fred Bansod',
        address: 'Van Ness',
        telephone: '666 666 666'
    }, {
        insuranceCode: '33333',
        name: 'Fred Mercury',
        address: 'Over The Rainbow',
        telephone: '555 321 0987'
    }, {
        insuranceCode: '44444',
        name: 'Fred Forsyth',
        address: 'Blimp Street',
        telephone: '555 111 2222'
    }, {
        insuranceCode: '55555',
        name: 'Fred Douglass',
        address: 'Talbot County, Maryland',
        telephone: 'N/A'
    }];

    Ext.define('Patient', {
        extend: 'Ext.data.Model',
        idProperty: 'insuranceCode',
        fields: ['name', 'address', 'telephone']
    });

    var patientStore = Ext.create('Ext.data.Store', {
        model: 'Patient',
        data: patients
    });

    var hospitals = [{
        code: 'AAAAA',
        name: 'Saint Thomas',
        address: 'Westminster Bridge Road, SE1 7EH',
        telephone: '020 7188 7188'
    }, {
        code: 'BBBBB',
        name: 'Queen\'s Medical Centre',
        address: 'Derby Road, NG7 2UH',
        telephone: '0115 924 9924'
    }, {
        code: 'CCCCC',
        name: 'Saint Bartholomew',
        address: 'West Smithfield, EC1A 7BE',
        telephone: '020 7377 7000'
    }, {
        code: 'DDDDD',
        name: 'Royal London',
        address: 'Whitechapel, E1 1BB',
        telephone: '020 7377 7000'
    }];

    Ext.define('Hospital', {
        extend: 'Ext.data.Model',
        idProperty: 'code',
        fields: ['name', 'address', 'telephone', 'patients']
    });

    var hospitalStore = Ext.create('Ext.data.Store', {
        model: 'Hospital',
        data: hospitals
    });

    var patientView = Ext.create('Ext.view.View', {
        cls: 'patient-view',
        tpl: '<tpl for=".">' +
                '<div class="patient-source"><table><tbody>' +
                    '<tr><td class="patient-label">Name</td><td class="patient-name">{name}</td></tr>' +
                    '<tr><td class="patient-label">Address</td><td class="patient-name">{address}</td></tr>' +
                    '<tr><td class="patient-label">Telephone</td><td class="patient-name">{telephone}</td></tr>' +
                '</tbody></table></div>' +
             '</tpl>',
        itemSelector: 'div.patient-source',
        overItemCls: 'patient-over',
        selectedItemClass: 'patient-selected',
        singleSelect: true,
        store: patientStore,
        listeners: {
            render: initializePatientDragZone
        }
    });

    var helpWindow = Ext.create('Ext.Window', {
        title: 'Source code',
        width: 920,
        height: 500,
        closeAction: 'hide',
        layout: 'fit',
        items: [{
            xtype: 'component',
            autoScroll: true,
            itemId: 'src',
            padding: 10
        }],
        listeners: {
            render: function(w) {
                Ext.Ajax.request({
                    url: 'dragdropzones.js',
                    success: function(r) {
                        var text = Ext.htmlEncode(r.responseText);
                        w.down('#src').update('<pre>' + text + '</pre>');
                    }
                });
            }
        }
    });

    var hospitalGrid = Ext.create('Ext.grid.Panel', {
        title: 'Hospitals',
        region: 'center',
        margin: '0 5 5 0',
        bbar: [{
            text: 'View Source',
            handler: function() {
                helpWindow.show();
            }
        }],
        sortableColumns: false,
        columns: [{
            dataIndex: 'name',
            header: 'Name',
            width: 200
        }, {
            dataIndex: 'address',
            header: 'Address',
            width: 300
        }, {
            dataIndex: 'telephone',
            header: 'Telephone',
            width: 100
        }],
        features: [{
            ftype:'rowbody',
            setup: function(rows, rowValues) {
                Ext.grid.feature.RowBody.prototype.setup.apply(this, arguments);
                rowValues.rowBodyDivCls = 'hospital-target';
            },
            getAdditionalData: function(data) {
                var patients = data.patients,
                    html;
                if (patients) {
                    html = patients.join(', ');
                } else {
                    html = 'Drop patients here';
                }
                return {
                    rowBody: html
                };
            }
        }],
        viewConfig: {
            listeners: {
                render: initializeHospitalDropZone
            }
        },
        store: hospitalStore
    });

    Ext.create('Ext.Viewport', {
        layout: 'border',
        items: [{
            cls: 'app-header',
            region: 'north',
            height: 45,
            html: '<h1>Patient Hospital Assignment</h1>',
            margin: '5 5 5 5'
        }, {
            title: 'Patients',
            region: 'west',
            width: 300,
            margin: '0 5 5 5',
            items: patientView
        }, hospitalGrid ]
    });
});
