
/* tslint:disable */
/* eslint-disable */
(function ($) {
    class DataAdapter {
    constructor ( config ) {
        if ( !config ) {
            config = {};
        }

        const that = Object.assign( this, config );

        const generateKey = function () {
            const S4 = function () {
                return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
            };
            return S4();
        };

        that.key = generateKey();

        that.boundSource = [];
        that.dataItemById = [];

        if ( that.allowAdd === undefined ) {
            that.allowAdd = true;
        }

        if ( that.allowRemove === undefined ) {
            that.allowRemove = true;
        }

        if ( that.allowUpdate === undefined ) {
            that.allowUpdate = true;
        }

        if ( config.observable === undefined ) {
            that.observable = true;
        }


        if ( !config.dataSource ) {
            that.dataSource = [];
        }

        if ( !config.dataFields ) {
            that.dataFields = [];
        }
        else {
            /* if (config.dataSource && config.dataSource.length > 0) {
                 const keys = Object.keys(config.dataSource[0]);

                 //     that.dataFields = [];

                 for (let i = 0; i < keys.length; i++) {

                 }
             }
             */
        }

        if ( !config.dataSourceType ) {
            that.dataSourceType = 'array';
        }

        if ( !config.id ) {
            that.id = null;
        }

        if ( !config.autoFetch ) {
            that.autoFetch = true;
        }

        if ( config.dataFields ) {
            that.dataFields = config.dataFields;
        }

        Object.defineProperty( that, 'groupBy', {
            configurable: false,
            enumerable: true,
            get() {
                if ( !that._groupBy ) {
                    return [];
                }

                return that._groupBy;
            },
            set( value ) {
                const updateGrouping = () => {
                    that.boundHierarchy = null;
                    that.refreshHierarchy();

                    if ( that.onGroup ) {
                        that.onGroup();
                    }
                }

                that._groupBy = [].concat(value);
              
                if ( that.isInitialized ) {
                    updateGrouping();
                }
            }
        } );

        if ( !config.groupBy ) {
            that.groupBy = [];
        }
        else {
            if ( config.groupBy.toArray ) {
                that.groupBy = config.groupBy.toArray();
            }
            else {
                that.groupBy = config.groupBy;
            }
        }

        if ( config && config.autoBind !== false ) {
            that.dataBind();
        }

        that.isInitialized = true;
    }

    get dataFields() {
        const that = this;

        return that._dataFields;
    }

    set dataFields( value ) {
        const that = this;

        that._dataFields = that._getDataFieldObjects( value );

        return that._dataFields;
    }

    _getDataFieldObjects( dataFields ) {
        //const that = this;

        let dataFieldObjects = [];

        if ( typeof dataFields === 'number' ) {
            const charCode = 'A'.charCodeAt( 0 );
            let prefix = '';
            let index = 0;

            for ( let i = 0; i < dataFields; i++ ) {
                const letter = String.fromCharCode( charCode + index );

                index++;

                const label = prefix + letter;

                dataFieldObjects.push( { name: label, dataType: 'string' } )

                if ( index >= 26 ) {
                    index = 0;
                    prefix += 'A';
                }
            }
        }
        else if ( dataFields.length > 0 ) {
            for ( let i = 0; i < dataFields.length; i++ ) {
                const dataField = dataFields[ i ];

                if ( typeof dataField === 'string' ) {
                    const dataFieldParts = dataField.split( ':' );
                    const name = dataFieldParts[ 0 ].trim();
                    const dataType = dataFieldParts.length > 1 ? dataFieldParts[ 1 ].trim() : 'string';

                    dataFieldObjects.push( { name: name, dataType: dataType } );
                }
                else {
                    dataFieldObjects.push( dataField );
                }
            }
        }

        return dataFieldObjects;
    }

    get dataSource() {
        const that = this;

        if ( !that._dataSource ) {
            that._dataSource = [];
        }

        return that._dataSource;
    }

    set dataSource( value ) {
        const that = this;

        that._dataSource = value;

        if ( that.isInitialized ) {
            that.boundSource = false === that.observable ? [] : new JQX.ObservableArray();
            that.dataItemById = [];
            that.bindingCompleted = false;
            that.dataBind();
        }
    }

    get canNotify() {
        const that = this;

        if ( that._canNotify === undefined ) {
            that._canNotify = true;
        }

        return that._canNotify;
    }

    set canNotify( value ) {
        const that = this;

        that._canNotify = value;
    }

    _notify( changeArgs ) {
        const that = this;

        if ( !that.canNotify ) {
            return;
        }

        if ( that.notifyFn ) {
            that.notifyFn( changeArgs );
        }
    }

    notify( notifyFn ) {
        const that = this;

        if ( notifyFn ) {
            that.notifyFn = notifyFn;
        }
    }

    toArray() {
        const that = this;

        return that.boundSource.toArray();
    }

    dataBind() {
        const that = this;

        that.clear();

        const completed = () => {
       

            that._onBindingComplete();
        }

        if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.json' ) >= 0 ) ) {
            that.url = that.dataSource;
            that.dataSourceType = 'json';

            new Ajax( that, ( data/*, status*/ ) => {
                that.dataSource = data;

                that._bindToJSON();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.xlsx' ) >= 0 ) ) {
            that.url = that.dataSource;
            that.dataSourceType = 'xlsx';

            new Ajax( that, ( data/*, status*/ ) => {
                if ( !data[ 0 ] ) {
                    data = [];
                    that._bindToArray();
                    completed();
                    return;
                }

                const keys = Object.keys( data[ 0 ] );
                const dataFieldMap = {};
                const dataRows = [];

                if ( that.exportHeader !== false ) {
                    let index = 0;

                    for ( let key in keys ) {
                        const name = keys[ key ];

                        dataFieldMap[ name ] = that.dataFields[ index++ ].name;
                    }

                    for ( let i = 1; i < data.length; i++ ) {
                        const row = data[ i ];
                        const dataRow = {};

                        for ( let key in keys ) {
                            const name = keys[ key ];

                            dataRow[ dataFieldMap[ name ] ] = row[ name ];
                        }

                        dataRows.push( dataRow );
                    }

                    that.dataSource = dataRows;
                }

                that._bindToArray();
                completed();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.csv' ) >= 0 ) ) {
            that.dataSourceType = 'csv';

            new Ajax( that, (/*data, status*/ ) => {
                that._bindToArray();
            } );
        }
        else if ( typeof that.dataSource === 'string' && ( that.dataSource.indexOf( '.tsv' ) >= 0 ) ) {
            that.dataSourceType = 'tsv';

            new Ajax( that, (/*data, status*/ ) => {
            } );
        }
        else if ( that.dataSourceType === 'array' ) {
            that._bindToArray();
            completed();
        }
        else if ( that.dataSourceType === 'json' ) {
            that._bindToJSON();
            completed();
        }
    }

    _onBindingComplete() {
        const that = this;

        that._buildHierarchy();

        if ( that.onBindingComplete ) {
            that.onBindingComplete( { data: that.boundSource } );
        }

        if ( that._notify ) {
            that._notify( { action: 'bindingComplete', data: that.boundSource } );
        }

        that.bindingCompleted = true;
    }

    refreshHierarchy() {
        const that = this;

        that._buildHierarchy();
    }

    find() {
        const that = this;

        return that.boundSource.find.apply( that.boundSource, arguments );
    }

    onVirtualDataSourceRequested( requestCallback, details ) {
        const that = this;

        let first = details ? details.first : Infinity;
        let last = details ? details.last : Infinity;
        let row = details ? details.row : null;

        if ( undefined === first ) {
            first = Infinity;
        }

        if ( undefined === last ) {
            last = Infinity;
        }

        that.virtualFirstIndex = first;
        that.virtualLastIndex = last;

        if ( that.virtualDataSource ) {
            const getDataSource = function ( ExcelAdapterSettings ) {
                if ( ExcelAdapterSettings.virtualDataSourceLength !== undefined ) {
                    that.virtualDataSourceLength = ExcelAdapterSettings.virtualDataSourceLength;
                }

                new JQX.ExcelAdapter(
                    {
                        dataSource: ExcelAdapterSettings.dataSource,
                        dataFields: ExcelAdapterSettings.dataFields || that.dataFields,
                        data: details,
                        onBindingComplete( event ) {

                            if ( that.virtualDataSourceOnExpand && row ) {
                                if ( event.data && event.data.length > 0 ) {
                                    that.add( event.data, row.$.id );
                                }
                                else {
                                    row.leaf = true;
                                }

                                if ( that.onFilter ) {
                                    that.onFilter()
                                }

                                requestCallback();

                                return;
                            }

                            if ( first === Infinity ) {
                                that.add( event.data );
                            }
                            else {
                                let items = [];
                                let indexes = [];

                                for ( let i = 0; i < event.data.length; i++ ) {
                                    const item = event.data[ i ];

                                    if ( first + i <= last ) {
                                        items.push( item );
                                        indexes.push( first + i );
                                    }
                                }

                                that.update( indexes, items );
                            }


                            if ( that.onFilter ) {
                                that.onFilter()
                            }

                            requestCallback();
                        }
                    } );
            }

            let hasCache = false;

            const isEmpty = ( obj ) => Object.entries( obj ).length === 0 && ( obj.constructor === Object || obj.constructor === Array );
            const canCache = isEmpty( details.sorting ) && isEmpty( details.filtering ) && isEmpty( details.grouping ) && !details.row && ( details.action !== 'filter' && details.action !== 'sort' && details.action !== 'group' );

            if ( that.virtualDataSourceCache && first !== Infinity && canCache ) {
                let cachedCount = 0;

                for ( let i = first; i < last; i++ ) {
                    if ( !that[ i ].$.isEmpty ) {
                        cachedCount++;
                    }
                }

                if ( cachedCount === last - first ) {
                    hasCache = true;
                }
            }

            if ( hasCache ) {
                requestCallback();
            }
            else {
                if ( details.action === 'expand' ) {
                    that.virtualDataSourceOnExpand( getDataSource, {
                        first: first,
                        last: last,
                        row: details.row,
                        sorting: details.sorting,
                        filtering: details.filtering,
                        grouping: details.grouping,
                        action: details.action
                    } );
                }
                else {
                    that.virtualDataSource( getDataSource, {
                        first: first,
                        last: last,
                        sorting: details.sorting,
                        filtering: details.filtering,
                        filterOperator: details.filterOperator || 'and',
                        grouping: details.grouping,
                        action: details.action
                    } );
                }
            }
        }
        else {
            requestCallback();
        }
    }

    add( item, parentId ) {
        const that = this;

        if ( !item ) {
            return;
        }

        let result = true;

        const addItem = function ( item ) {
            const itemObject = that._getDataItem( item, that.boundSource.length );

            that[ that.boundSource.length ] = itemObject;
            that.dataItemById[ itemObject.$.id ] = itemObject;

            const pushResult = that.boundSource.push( itemObject );

            if ( parentId !== undefined ) {
                itemObject.$.parentId = parentId;
            }

            if ( !pushResult ) {
                result = false;
            }

            return itemObject;
        }

        if ( item.length ) {
            let itemObjects = [];

            for ( let i = 0; i < item.length; i++ ) {
                const itemObject = addItem( item[ i ] );

                itemObjects.push( itemObject );
            }

            that._notify( { action: 'add', data: itemObjects } );
        }
        else {
            const itemObject = addItem( item );

            that._notify( { action: 'add', data: itemObject } );
        }

        that.refreshHierarchy();

        return result;
    }

    refreshIndexes() {
        const that = this;

        for (let i = 0; i < that.boundSource.length; i++) {
            that[i] = that.boundSource[i];
            that[i].$.index = i;
            that.dataItemById[that[i].$.id] = that[i];
        }

        let i = that.boundSource.length;

        while (that[i]) {
            delete that[i];
            i++;
        }
    }

    removeLast() {
        const that = this;

        delete that[that.boundSource.length - 1];
        const result = that.boundSource.pop();
        delete that.dataItemById[result.$.id];

        that._notify({ action: 'removeLast', data: result });

        that.refreshHierarchy();

        return result;
    }

    removeAt(index) {
        const that = this;

        const item = that.boundSource[index];

        if (!item) {
            throw new Error('Invalid Item Index');
        }

        that.boundSource.splice(index, 1);
        delete that.dataItemById[item.$.id];
        that.refreshIndexes();

        that._notify({ action: 'remove', index: index, data: item });

        that.refreshHierarchy();
    }

    update( index, dataSourceItem ) {
        const that = this;

        if ( JQX.Utilities.Types.isArray( index ) && JQX.Utilities.Types.isArray( dataSourceItem ) ) {
            if ( index.length === 0 && dataSourceItem.length === 0 ) {
                that.refreshHierarchy();
                return;
            }
        }

        if ( dataSourceItem.length && index.length ) {
            let itemObjects = [];

            for ( let i = 0; i < index.length; i++ ) {
                const itemObject = that._getDataItem( dataSourceItem[ i ], index[ i ] );
                const currentIndex = index[ i ];

                itemObjects.push( itemObject );

                that.boundSource[ currentIndex ] = itemObject;
                that[ currentIndex ] = that.boundSource[ currentIndex ];
                that.dataItemById[ itemObject.$.id ] = that[ currentIndex ];
            }

            that._notify( { action: 'update', index: index, data: itemObjects } );

            that.refreshHierarchy();

            return;
        }

        const itemObject = that._getDataItem( dataSourceItem, index );

        that.boundSource[ index ] = itemObject;
        that[ index ] = that.boundSource[ index ];
        that.dataItemById[ itemObject.$.id ] = that[ index ];

        that._notify( { action: 'update', index: index, data: itemObject } );

        that.refreshHierarchy();

        return itemObject;
    }

    insert( index, item ) {
        const that = this;

        item = that._getDataItem( item, index );

        const result = that.boundSource.splice( index, 0, item );

        that.refreshIndexes();

        that._notify( { action: 'insert', index: index, data: item } );

        that.refreshHierarchy();

        return result;
    }

    move( from, to ) {
        if ( to > from && to - from === 1 || from === to ) {
            return;
        }

        const that = this,
            recordToMove = that.boundSource.splice( from, 1 )[ 0 ];

        if ( to > from ) {
            to--;
            that.boundSource.splice( to, 0, recordToMove );
        }
        else {
            that.boundSource.splice( to, 0, recordToMove );
        }

        that.refreshIndexes();

        that._notify( { action: 'move', index: to, data: that.boundSource[ to ] } );

        that.refreshHierarchy();
    }

    indexOf( item ) {
        const that = this;
        const index = that.boundSource.indexOf( item );

        return index;
    }

    get length() {
        const that = this;

        if ( that.virtualDataSourceLength !== undefined ) {
            return that.virtualDataSourceLength;
        }

        if ( that.dataSourceLength ) {
            return that.dataSourceLength;
        }

        if ( typeof ( that.dataSource ) === 'number' ) {
            return that.dataSource;
        }

        if ( that.bindingCompleted ) {
            return that.boundSource.length;
        }

        if ( that.dataSource && typeof that.dataSource !== 'string' && that.dataSource.length ) {
            return that.dataSource.length;
        }

        return that.boundSource.length;
    }

    clear() {
        const that = this;

        if ( !that.isInitialized ) {
            that._cachedValues = [];
            that.dataItemById = [];
            return;
        }

        for ( let i = 0; i < that.boundSource.length; i++ ) {
            delete that[ i ];
        }

        that._cachedValues = [];
        that.boundSource = that.observable ? new JQX.ObservableArray() : [];
        that.dataItemById = [];
        that.refreshHierarchy();
    }

    _getId( id, item, index ) {
        if ( id !== null && id.name !== undefined ) {
            if ( id.name && item.getAttribute ) {
                let result = item.getAttribute( id.name );
                if ( result !== null && result.toString().length > 0 ) {
                    return result;
                }
                else if ( id.map ) {
                    try {
                        let result = item.getAttribute( id.map );
                        if ( result !== null && result.toString().length > 0 ) {
                            return result;
                        }
                    }
                    catch ( error ) {
                        return index;
                    }
                }
                return;
            }
        }

        if ( id ) {
            if ( id.toString().length > 0 && item.getAttribute ) {
                let result = item.getAttribute( id );
                if ( result !== null && result.toString().length > 0 ) {
                    return result.trim().split( ' ' ).join( '' ).replace( /([ #;?%&,.+*~\':'!^$[\]()=>|\/@])/g, '' );
                }
                else {
                    let splitMap = id.split( this.mapChar );
                    if ( splitMap.length > 1 ) {
                        let d = item;
                        for ( let p = 0; p < splitMap.length; p++ ) {
                            if ( d !== undefined ) {
                                d = d[ splitMap[ p ] ];
                            }
                        }
                        if ( d !== undefined ) {
                            return d;
                        }
                    }
                    else {
                        if ( item[ id ] !== undefined ) {
                            return item[ id ];
                        }
                    }
                }
            }
        }

        return index;
    }

    _buildHierarchy() {
        const that = this;

        if ( !that.reservedNames ) {
            that.reservedNames = {
                leaf: 'leaf',
                parent: 'parent',
                expanded: 'expanded',
                checked: 'checked',
                selected: 'selected',
                level: 'level',
                icon: 'icon',
                data: 'data'
            }
        }
        else {
            const names = that.reservedNames;

            if ( !names.leaf ) {
                names.leaf = 'leaf';
            }
            if ( !names.parent ) {
                names.parent = 'parent';
            }
            if ( !names.expanded ) {
                names.expanded = 'expanded';
            }
            if ( !names.checked ) {
                names.checked = 'checked';
            }
            if ( !names.selected ) {
                names.selected = 'selected';
            }
            if ( !names.level ) {
                names.level = 'level';
            }
            if ( !names.data ) {
                names.data = 'data';
            }

        }

        const names = that.reservedNames;

        if ( that.childrenDataField ) {
            const hierarchy = [];

            for ( let i = 0; i < that.boundSource.length; i++ ) {
                const item = Object.assign( {}, that.boundSource[ i ] );

                if ( !item ) {
                    continue;
                }

                hierarchy.push( item );

                const addItems = function ( item ) {
                    const splitMap = that.childrenDataField.split( that.mapChar );
                    let children = null;

                    if ( splitMap.length > 1 ) {
                        let data = item;

                        for ( let p = 0; p < splitMap.length; p++ ) {
                            if ( data !== undefined ) {
                                data = data[ splitMap[ p ] ];
                            }
                        }

                        children = data;
                    }
                    else {
                        children = item[ 'children' ];
                    }

                    item[ 'children' ] = children;

                    if ( item[ 'children' ] === null || item[ 'children' ] === undefined || ( item[ 'children' ] && item[ 'children' ].length === 0 ) ) {
                        item[ names.leaf ] = true;
                    }
                }

                addItems( item );
                item[ names.level ] = 0;

                if ( !item.$ ) {
                    item.$ = {};
                }

                item[ names.parent ] = null;
                item[ names.data ] = item;

                if ( item[ names.expanded ] === undefined ) {
                    item[ names.expanded ] = false;
                }

                const drillThrough = function ( parent, children ) {
                    if ( !children ) {
                        parent[ 'children' ] = new Array();
                        return;
                    }

                    for ( let i = 0; i < children.length; i++ ) {
                        let item = that._getDataItem( children[ i ], i );

                        if ( !item ) {
                            continue;
                        }

                        addItems( item );
                        item[ names.level ] = parent[ names.level ] + 1;
                        item[ names.parent ] = parent;
                        item[ names.data ] = item;

                        if ( parent ) {
                            parent[ 'children' ][ i ] = item;
                        }


                        if ( item[ names.expanded ] === undefined ) {
                            item[ names.expanded ] = false;
                        }

                        drillThrough( item, item[ 'children' ] );
                    }
                }

                drillThrough( item, item[ 'children' ] );
            }


            that.boundHierarchy = hierarchy;

            if ( !that._boundSourceUpdate ) {
                for ( let i = 0; i < that.boundHierarchy.length; i++ ) {
                    const item = that.boundHierarchy[ i ];

                    if ( item.children ) {
                        const drillThrough = function ( item ) {
                            if ( !that.dataItemById[ item.$.id ] ) {
                                that.boundSource.canNotify = false;
                                that.dataItemById[ item.$.id ] = item;
                                that[ that.boundSource.length ] = item;
                                that.boundSource.push( item );
                                that.boundSource.canNotify = true;
                            }

                            if ( item.children ) {
                                for ( let i = 0; i < item.children.length; i++ ) {
                                    const child = item.children[ i ];

                                    if ( child.children ) {
                                        drillThrough( child );
                                    }
                                }
                            }
                        }

                        drillThrough( item );
                    }
                }

                that._boundSourceUpdate = true;
            }
        }

        if ( that.xmlRoot && that.dataSourceType === 'xml' ) {
            that.boundHierarchy = this._getHierarchy( 'uid', '_parentuid', 'children', null, that.boundSource );
        }

        if ( that.keyDataField && that.parentDataField ) {
            that.boundHierarchy = this._getHierarchy( that.keyDataField, that.parentDataField, 'children', null, that.boundSource );
        }

        if ( that.groupBy && that.groupBy.length > 0 ) {
            that.boundHierarchy = this._getGroupHierarchy( that.groupBy, 'children', 'label', null, 'data', null, 'parent', that.boundSource );
        }

        if ( that.virtualDataSourceOnExpand ) {
            that.boundHierarchy = this._getHierarchy( 'id', 'parentId', 'children', null, that.boundSource );
        }
    }


    _getGroupHierarchy( groups, collectionName, groupName, mappingFields, itemName, valueName, parentName, data, startIndex ) {
        let that = this;

        if ( !startIndex ) {
            startIndex = 0;
        }

        let names = that.reservedNames;

        const guid = function () {
            function s4() {
                return Math.floor( ( 1 + Math.random() ) * 0x10000 )
                    .toString( 16 )
                    .substring( 1 );
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        let groupHashCodes = new Array();
        for ( let iGroupColumn = 0; iGroupColumn < groups.length; iGroupColumn++ ) {
            groupHashCodes[ iGroupColumn ] = guid();
        }

        if ( !collectionName ) {
            collectionName = 'children';
        }

        if ( !groupName ) {
            groupName = 'group';
        }

        if ( !itemName ) {
            itemName = 'item';
        }

        if ( !parentName ) {
            parentName = 'parent';
        }

        if ( undefined === valueName ) {
            valueName = 'value';
        }

        const groupboundSource = new Array();
        const hashItemGroups = new Array();

        let groupboundSourceIndex = 0;

        const getItem = function ( item ) {
            let itemObj = item;
            if ( mappingFields ) {
                for ( let mappingField in mappingFields ) {
                    const mappingObject = mappingFields[ mappingField ];

                    if ( mappingObject.name && mappingObject.map ) {
                        itemObj[ mappingObject.map ] = itemObj[ mappingObject.name ];
                    }
                }
            }

            return itemObj;
        }

        for ( let obj = 0; obj < data.length; obj++ ) {
            let item = Object.assign( {}, getItem( data[ obj ] ) );

            item[ names.leaf ] = false;

            let itemKeysHierarchy = new Array();
            let keys = 0;

            for ( let iGroupColumn = 0; iGroupColumn < groups.length; iGroupColumn++ ) {
                const group = groups[ iGroupColumn ];
                const value = item[ group ];

                if ( null === value ) {
                    continue;
                }

                itemKeysHierarchy[ keys++ ] = { value: value, group: group, hash: groupHashCodes[ iGroupColumn ] };
            }

            if ( itemKeysHierarchy.length !== groups.length ) {
                break;
            }

            let parentItem = null;
            let lookupKey = '';

            for ( let q = 0; q < itemKeysHierarchy.length; q++ ) {
                const itemKey = itemKeysHierarchy[ q ].value;
                const groupDataField = itemKeysHierarchy[ q ].group;
                const columnHash = itemKeysHierarchy[ q ].hash;

                lookupKey = lookupKey + '_' + columnHash + '_' + itemKey;

                if ( hashItemGroups[ lookupKey ] !== undefined && hashItemGroups[ lookupKey ] !== null ) {
                    parentItem = hashItemGroups[ lookupKey ];
                    continue;
                }

                if ( parentItem === null ) {
                    parentItem = { $: {} };

                    parentItem[ names.level ] = 0;
                    parentItem[ names.leaf ] = false;
                    parentItem[ parentName ] = null;
                    parentItem[ groupName ] = itemKey;
                    parentItem[ itemName ] = item;
                    parentItem[ 'groupDataField' ] = groupDataField;

                    if ( !parentItem[ groupDataField ] ) {
                        parentItem[ groupDataField ] = parentItem.data[ groupDataField ];
                    }

                    if ( item[ names.expanded ] !== undefined ) {
                        parentItem[ names.expanded ] = item[ names.expanded ];
                    }
                    else {
                        parentItem[ names.expanded ] = false;
                    }

                    if ( valueName ) {
                        parentItem[ valueName ] = item[ valueName ];
                    }

                    parentItem[ collectionName ] = new Array();

                    let uid = groupboundSource.length + startIndex;

                    if ( !this.id || typeof item.$.id === 'number' || isFinite( item.$.id ) ) {
                        uid = 'Item' + uid;
                    }
                    if ( parentItem.$.id === undefined ) {
                        parentItem.$.id = uid;
                    }

                    groupboundSource[ groupboundSourceIndex++ ] = parentItem;
                }
                else {
                    const subItem = { $: {} };

                    subItem[ names.level ] = parentItem[ names.level ] + 1;
                    subItem[ parentName ] = parentItem;
                    subItem[ groupName ] = itemKey;
                    subItem[ collectionName ] = new Array();
                    subItem[ itemName ] = item;
                    subItem[ 'groupDataField' ] = groupDataField;
                    subItem[ names.leaf ] = false;

                    if ( !subItem[ groupDataField ] ) {
                        subItem[ groupDataField ] = subItem.data[ groupDataField ];
                    }

                    if ( item[ names.expanded ] !== undefined ) {
                        subItem[ names.expanded ] = item[ names.expanded ];
                    }
                    else {
                        subItem[ names.expanded ] = false;
                    }

                    if ( valueName ) {
                        subItem[ valueName ] = item[ valueName ];
                    }

                    if ( subItem.$.id === undefined ) {
                        subItem.$.id = parentItem.$.id + '_' + parentItem[ collectionName ].length;
                    }

                    parentItem[ collectionName ][ parentItem[ collectionName ].length ] = subItem;
                    parentItem = subItem;
                }

                hashItemGroups[ lookupKey ] = parentItem;
            }

            if ( item ) {
                item[ names.leaf ] = true;
            }

            if ( parentItem !== null ) {
                if ( this.id === null ) {
                    if ( undefined === item.$.id ) {
                        item.$.id = parentItem.$.id + '_' + parentItem[ collectionName ].length;
                    }
                }
                else {
                    if ( undefined === item.$.id ) {
                        if ( item.$.id.toString().indexOf( parentItem.$.id ) === -1 ) {
                            item.$.id = parentItem.$.id + '_' + item.$.id;
                        }
                    }
                }

                item[ parentName ] = parentItem;
                item[ names.level ] = parentItem[ names.level ] + 1;
                parentItem[ collectionName ][ parentItem[ collectionName ].length ] = item;
            }
            else {
                if ( undefined === item.$.id ) {
                    item.$.id = guid();
                }
            }
        }

        return groupboundSource;
    }

    _getHierarchy( fieldName, parentFieldName, collectionName, mappingFields, boundSource ) {
        const that = this;

        const databoundHierarchy = new Array();
        let flatData = this.boundSource;

        if ( boundSource ) {
            flatData = boundSource;
        }

        if ( this.boundSource.length === 0 )
            return null;

        const childrenName = collectionName !== null ? collectionName : 'children';
        let items = new Array();
        let data = flatData;
        let dataLength = data.length;
        let names = that.reservedNames;

        const getItem = function ( item ) {
            let itemObj = item;
            if ( mappingFields ) {
                for ( let mappingField in mappingFields ) {
                    const mappingObject = mappingFields[ mappingField ];

                    if ( mappingObject.name && mappingObject.map ) {
                        itemObj[ mappingObject.map ] = itemObj[ mappingObject.name ];
                    }
                }
            }

            return itemObj;
        }

        // build hierarchical source.
        for ( let i = 0; i < dataLength; i++ ) {
            let item = data[ i ];
            let parentId = item[ parentFieldName ];
            let id = item[ fieldName ];

            if ( parentFieldName === 'parentId' ) {
                parentId = item.$.parentId;
            }

            if ( fieldName === 'id' ) {
                id = item.$.id;
            }

            item[ childrenName ] = new Array();

            items[ id ] = { parentId: parentId, item: item };
        }

        for ( let i = 0; i < dataLength; i++ ) {
            const item = data[ i ];
            let parentId = item[ parentFieldName ];
            let id = item[ fieldName ];

            if ( parentFieldName === 'parentId' ) {
                parentId = item.$.parentId;
            }

            if ( fieldName === 'id' ) {
                id = item.$.id;
            }

            if ( items[ parentId ] !== undefined ) {
                let item = { parentId: parentId, item: items[ id ].item };
                let parentItem = items[ parentId ].item;
                if ( !parentItem[ childrenName ] ) {
                    parentItem[ childrenName ] = new Array();
                }
                let length = parentItem[ childrenName ].length;
                item = item.item;

                if ( !names ) {
                    if ( item.parent === undefined ) {
                        item.parent = parentItem;
                    }
                }
                else {
                    if ( item[ names.parent ] === undefined ) {
                        item[ names.parent ] = parentItem;
                    }
                }

                const itemObj = getItem( item );

                parentItem[ childrenName ][ length ] = itemObj;
                items[ parentId ].item = parentItem;
                items[ id ].item = item;

            }
            else {
                let item = items[ id ].item;
                if ( !names ) {
                    if ( item.parent === undefined ) {
                        item.parent = null;
                    }
                }
                else {
                    if ( item[ names.parent ] === undefined ) {
                        item[ names.parent ] = null;
                    }
                }

                const itemObj = getItem( item );

                if ( !names ) {
                    itemObj.level = 0;
                }
                else {
                    itemObj[ names.level ] = 0;
                }

                databoundHierarchy[ databoundHierarchy.length ] = itemObj;
            }
        }
        if ( databoundHierarchy.length !== 0 ) {
            let updateLevels = function ( level, children ) {
                for ( let i = 0; i < children.length; i++ ) {
                    const child = children[ i ];

                    if ( !names ) {
                        child.level = level;
                    }
                    else {
                        child[ names.level ] = level;
                    }

                    const childChildren = child[ childrenName ];

                    if ( childChildren ) {
                        if ( childChildren.length > 0 ) {
                            updateLevels( level + 1, childChildren );
                        }
                        else {
                            if ( that.virtualDataSourceOnExpand ) {
                                if ( child.leaf === undefined ) {
                                    child.leaf = false;
                                }
                            }
                            else {
                                if ( !names ) {
                                    child.leaf = true;
                                }
                                else {
                                    child[ names.leaf ] = true;
                                }
                            }
                        }
                    }
                    else {
                        if ( that.virtualDataSourceOnExpand ) {
                            if ( child.leaf === undefined ) {
                                child.leaf = false;
                            }
                        }
                        else {
                            if ( !names ) {
                                child.leaf = true;
                            }
                            else {
                                child[ names.leaf ] = true;
                            }
                        }
                    }
                }
            };
            updateLevels( 0, databoundHierarchy );
        }
        return databoundHierarchy;
    }

    summarize( summaryItems, boundSource ) {
        const that = this;

        if ( !Array.isArray( summaryItems ) ) {
            summaryItems = [ summaryItems ];
        }

        let tempSummaryItems = [];

        for ( let i = 0; i < summaryItems.length; i++ ) {
            const summaryItem = summaryItems[ i ];

            for ( let name in summaryItem ) {
                const functions = summaryItem[ name ];

                tempSummaryItems.push( { dataField: name, functions: functions } )
            }
        }

        summaryItems = tempSummaryItems;

        let data = {};
        let summaryByDataField = new Array();

        if ( !boundSource ) {
            boundSource = that.boundSource;
        }

        let length = boundSource.length;

        if ( length === 0 ) {
            return;
        }

        if ( length === undefined ) {
            return;
        }

        for ( let i = 0; i < length; i++ ) {
            let dataItem = boundSource[ i ];

            for ( let j = 0; j < summaryItems.length; j++ ) {
                const summaryItem = summaryItems[ j ];
                let value = dataItem[ summaryItem.dataField ];

                if ( summaryItem.functions ) {
                    data[ summaryItem.dataField ] = data[ summaryItem.dataField ] || {};
                    summaryByDataField[ summaryItem.dataField ] = summaryByDataField[ summaryItem.dataField ] || 0;
                    summaryByDataField[ summaryItem.dataField ]++;

                    const _summaryItemFunction = function ( summaryItemObject ) {
                        for ( let name in summaryItemObject ) {
                            let oldValue = data[ summaryItem.dataField ][ name ];

                            if ( oldValue === null || oldValue === undefined ) {
                                data[ summaryItem.dataField ][ name ] = 0;
                                oldValue = 0;
                            }

                            if ( typeof summaryItemObject[ name ] === 'function' ) {
                                oldValue = summaryItemObject[ name ]( oldValue, value, summaryItem.dataField, dataItem );
                            }
                            data[ summaryItem.dataField ][ name ] = oldValue;
                        }
                    }

                    let canParse = parseFloat( value );

                    if ( isNaN( canParse ) ) {
                        canParse = false;
                    }
                    else {
                        canParse = true;
                    }

                    if ( canParse ) {
                        value = parseFloat( value );
                    }

                    if ( typeof value === 'number' && isFinite( value ) ) {
                        summaryItem.functions.forEach( function ( summaryItemFunction ) {
                            let oldValue = data[ summaryItem.dataField ][ summaryItemFunction ];

                            if ( oldValue === null || oldValue === undefined ) {
                                oldValue = 0;

                                if ( summaryItemFunction === 'min' ) {
                                    oldValue = 9999999999999;
                                }

                                if ( summaryItemFunction === 'max' ) {
                                    oldValue = -9999999999999;
                                }

                                if (summaryItemFunction === 'median') {
                                    oldValue = [];
                                }
                            }

                            if ( summaryItemFunction === 'sum' || summaryItemFunction === 'avg' || summaryItemFunction === 'stdev'
                                || summaryItemFunction === 'stdevp' || summaryItemFunction === 'var' || summaryItemFunction === 'varp' ) {
                                oldValue += parseFloat( value );
                            }
                            else if ( summaryItemFunction === 'product' ) {
                                if ( i === 0 )
                                    oldValue = parseFloat( value );
                                else
                                    oldValue *= parseFloat( value );
                            }
                            else if ( summaryItemFunction === 'min' ) {
                                oldValue = Math.min( oldValue, parseFloat( value ) );
                            }
                            else if ( summaryItemFunction === 'max' ) {
                                oldValue = Math.max( oldValue, parseFloat( value ) );
                            }
                            else if ( summaryItemFunction === 'count' ) {
                                oldValue++;
                            }
                            else if (summaryItemFunction === 'median') {
                                oldValue.push(parseFloat(value));
                            }
                            else if ( typeof ( summaryItemFunction ) === 'object' ) {
                                _summaryItemFunction( summaryItemFunction );
                                return;
                            }

                            data[ summaryItem.dataField ][ summaryItemFunction ] = oldValue;
                        } );
                    }
                    else {
                        summaryItem.functions.forEach( function ( summaryItemFunction ) {
                            if ( summaryItemFunction === 'min' || summaryItemFunction === 'max' || summaryItemFunction === 'count' || summaryItemFunction === 'product' || summaryItemFunction === 'sum'
                                || summaryItemFunction === 'avg' || summaryItemFunction === 'stdev'
                                || summaryItemFunction === 'stdevp' || summaryItemFunction === 'var' || summaryItemFunction === 'varp' ) {
                                if ( value === null ) {
                                    return true;
                                }

                                let oldValue = data[ summaryItem.dataField ][ summaryItemFunction ];

                                if ( oldValue === null || oldValue === undefined ) {
                                    oldValue = 0;
                                }

                                data[ summaryItem.dataField ][ summaryItemFunction ] = oldValue;

                                return true;
                            }

                            if ( typeof ( summaryItemFunction ) === 'object' ) {
                                _summaryItemFunction( summaryItemFunction );
                            }
                        } );
                    }
                }
            }
        }

        for ( let j = 0; j < summaryItems.length; j++ ) {
            const summaryItem = summaryItems[ j ];

            if ( !summaryItem.functions ) {
                continue;
            }
            if ( !data[ summaryItem.dataField ] ) {
                data[ summaryItem.dataField ] = {};

                summaryItem.functions.forEach( function ( summaryItemFunction ) {
                    data[ summaryItem.dataField ][ summaryItemFunction ] = 0;
                } );
            }

            if ( data[ summaryItem.dataField ][ 'avg' ] !== undefined ) {
                const value = data[ summaryItem.dataField ][ 'avg' ];
                const dataValues = summaryByDataField[ summaryItem.dataField ];

                if ( dataValues === 0 || dataValues === undefined ) {
                    data[ summaryItem.dataField ][ 'avg' ] = 0;
                }
                else {
                    data[ summaryItem.dataField ][ 'avg' ] = value / dataValues;
                }
            }
            else if ( data[ summaryItem.dataField ][ 'count' ] !== undefined ) {
                data[ summaryItem.dataField ][ 'count' ] = length;
            }
            else if (data[summaryItem.dataField]['median'] !== undefined) {
                let population = data[summaryItem.dataField]['median'];

                population.sort(function (a, b) {
                    return a - b;
                });

                data[summaryItem.dataField]['median'] =
                    0.5 * (population[Math.floor((population.length + 1) / 2) - 1] + population[Math.ceil((population.length + 1) / 2) - 1]);
            }

            // stdev, stdevp, var, varp.
            // stdev - Standard deviation on a sample.
            // varp - Variance on an entire population.
            // let - Variance on a sample.
            if ( data[ summaryItem.dataField ][ 'stdev' ] || data[ summaryItem.dataField ][ 'stdevp' ]
                || data[ summaryItem.dataField ][ 'var' ] || data[ summaryItem.dataField ][ 'varp' ] ) {
                summaryItem.functions.forEach( function ( summaryItemFunction ) {
                    if ( summaryItemFunction === 'stdev' || summaryItemFunction === 'var' || summaryItemFunction === 'varp' || summaryItemFunction === 'stdevp' ) {
                        const value = data[ summaryItem.dataField ][ summaryItemFunction ];
                        const count = length;
                        const average = ( value / length );
                        let sumSq = 0.0;

                        for ( let i = 0; i < length; i++ ) {
                            let dataItem = boundSource[ i ];
                            let value = dataItem[ summaryItem.dataField ];

                            sumSq += ( value - average ) * ( value - average );
                        }

                        let denominator = ( summaryItemFunction === 'stdevp' || summaryItemFunction === 'varp' ) ? count : count - 1;

                        if ( denominator === 0 ) {
                            denominator = 1;
                        }

                        if ( summaryItemFunction === 'var' || summaryItemFunction === 'varp' ) {
                            data[ summaryItem.dataField ][ summaryItemFunction ] = sumSq / denominator;
                        }
                        else if ( summaryItemFunction === 'stdevp' || summaryItemFunction === 'stdev' ) {
                            data[ summaryItem.dataField ][ summaryItemFunction ] = Math.sqrt( sumSq / denominator );
                        }
                    }
                } );
            }
        }
        return data;
    }

    deserialize(stringValue, type, nullable) {
        const nullValue = stringValue === 'null';

        if (stringValue === undefined || (nullValue && !nullable)) {
            return undefined;
        }

        if (nullValue && nullable) {
            return null;
        }

        if (type === 'boolean' || type === 'bool') {
            if (stringValue === null) {
                return false;
            }

            // Boolean properties are set based on the presence of the attribute: if the attribute exists at all, the value is true.
            return true;
        }
        else if (type === 'number' || type === 'float') {
            if (stringValue === 'NaN') {
                return NaN;
            }

            if (stringValue === 'Infinity') {
                return Infinity;
            }

            if (stringValue === '-Infinity') {
                return -Infinity;
            }

            return parseFloat(stringValue);
        }
        else if (type === 'int' || type === 'integer') {
            if (stringValue === 'NaN') {
                return NaN;
            }

            if (stringValue === 'Infinity') {
                return Infinity;
            }

            if (stringValue === '-Infinity') {
                return -Infinity;
            }

            return parseInt(stringValue);
        }
        else if (type === 'string') {
            return stringValue;
        }
        else if (type === 'any') {
            return stringValue;
        }
        else if (type === 'date') {
            return new Date(stringValue);
        }
        else if (type === 'function') {
            if (typeof window[stringValue] === 'function') {
                return window[stringValue];
            }
        }
        else if (type === 'array' || type === 'object') {
            try {
                const jsonObject = JSON.parse(stringValue);

                if (jsonObject) {
                    return jsonObject;
                }
            }
            catch (er) {
                if (window[stringValue] && (typeof window[stringValue] === 'object')) {
                    return window[stringValue];
                }
                else if (type === 'array' && stringValue.indexOf('[') >= 0) {
                    if (stringValue.indexOf('{') >= 0) {
                        let array = stringValue.replace(/{/ig, '').replace('[', '').replace(']', '').replace(/'/ig, '').replace(/"/ig, '').trim();

                        array = array.split('},');

                        for (let i = 0; i < array.length; i++) {
                            let parsedObject = {
                            };

                            let parts = array[i].trim().split(',');

                            for (let j = 0; j < parts.length; j++) {
                                const key = parts[j].split(':')[0].trim();
                                const value = parts[j].split(':')[1].trim();

                                parsedObject[key] = value;
                            }

                            array[i] = parsedObject;
                        }

                        return array;
                    }

                    const array = stringValue.replace('[', '').replace(']', '').replace(/'/ig, '').replace(/"/ig, '').trim().split(',');

                    return array;
                }
            }
        }

        return undefined;
    }

    _getDataItem( dataSourceItem, index ) {
        const that = this;
        const itemObject = {};
        const unboundMode = typeof ( that.dataSource ) === 'number' || that.dataSourceLength;

        if ( !dataSourceItem ) {
            return { $: { id: index, isEmpty: true, index: index } }
        }

        if ( typeof dataSourceItem === 'string' ) {
            dataSourceItem = { '': dataSourceItem };
        }

        if ( unboundMode ) {
            for ( let j = 0; j < that.dataFields.length; j++ ) {
                const dataField = that.dataFields ? that.dataFields[ j ] : {};

                itemObject[ dataField.name ] = '';
            }

            itemObject.$ = {};
            itemObject.$.id = index;
            itemObject.$.index = index;

            return itemObject;
        }

        const dataItem = dataSourceItem;

        if ( dataItem.expanded !== undefined ) {
            itemObject.expanded = dataItem.expanded;

            if ( dataItem.expanded === 'true' || dataItem.expanded === true || dataItem.expanded === 1 ) {
                itemObject.expanded = true;
            }
            else {
                itemObject.expanded = false;
            }
        }

        if ( that.childrenDataField ) {
            if ( dataItem[ that.childrenDataField ] !== undefined ) {
                itemObject.children = dataItem[ that.childrenDataField ];
            }
        }
        else {
            if ( dataItem.children !== undefined ) {
                itemObject.children = dataItem.children;
            }
            else if ( dataItem.items !== undefined ) {
                itemObject.children = dataItem.items;
            }
        }
        if ( dataItem.leaf !== undefined ) {
            itemObject.leaf = dataItem.leaf;
        }

        if ( dataItem.level !== undefined ) {
            itemObject.level = dataItem.level;
        }

        if ( that.keyDataField ) {
            if ( dataItem[ that.keyDataField ] !== undefined ) {
                itemObject[ that.keyDataField ] = dataItem[ that.keyDataField ];
            }
        }

        if ( that.parentDataField ) {
            if ( dataItem[ that.parentDataField ] !== undefined ) {
                itemObject[ that.parentDataField ] = dataItem[ that.parentDataField ];
            }
        }

        if ( that.dataFields.length === 0 ) {
            const names = Object.getOwnPropertyNames( dataSourceItem );

            for ( let i = 0; i < names.length; i++ ) {
                if ( names[ i ] === '$' ) {
                    continue;
                }

                that.dataFields.push( { name: names[ i ], dataType: 'string' } );
            }
        }

        for ( let j = 0; j < that.dataFields.length; j++ ) {
            const dataField = that.dataFields ? that.dataFields[ j ] : {};
            let value = '';

            dataField.dataType = dataField.type;
            
            if ( undefined === dataField || dataField === null ) {
                continue;
            }

            if ( dataSourceItem.length ) {
                value = dataSourceItem[ j ];
            }

            if ( dataField.map ) {
                let splitMap = dataField.map.split( that.mapChar );

                if ( splitMap.length > 0 ) {
                    let dataMappedItem = dataItem;

                    for ( let p = 0; p < splitMap.length; p++ ) {
                        if ( !dataItem ) {
                            continue;
                        }

                        dataMappedItem = dataMappedItem[ splitMap[ p ] ];
                    }

                    value = dataMappedItem;
                }
                else {
                    value = dataItem[ dataField.map ];
                }
            }

            if ( value !== undefined && value !== null ) {
                value = value.toString();
            }
            else {
                if ( value === undefined && value !== null ) {
                    value = '';
                }
            }


            let isEmptyString = false;
            // searches by both selectors when necessary.
            if ( value === '' ) {
                isEmptyString = true;
                value = dataSourceItem[ dataField.name ];

                if ( value !== undefined && value !== null ) {
                    if ( dataField.dataType !== 'array' ) {
                        if ( dataField.dataType !== 'date' ) {
                            value = value.toString();
                        }
                    }
                }
                else {
                    value = '';
                }
            }

            if ( value === '[object Object]' && dataField.map && isEmptyString ) {
                value = '';
            }

            if ( that._cachedValues[ '' + value + '_' + dataField.dataType ] ) {
                value = that._cachedValues[ '' + value + '_' + dataField.dataType ];
            }
            else {
                if ( dataField.dataType === 'bool' || dataField.dataType === 'boolean' ) {
                    if ( value === 'true' || value === '1' ) {
                        value = true;
                    }
                    else if ( value === 'false' || value === '0' ) {
                        value = false;
                    }
                }
                else {
                    value = that.deserialize( '' + value, dataField.dataType, true );
                }

                that._cachedValues[ value + '_' + dataField.dataType ] = value;
            }

            if ( dataField.dataType !== 'string' && dataField.dataType !== 'boolean' && dataField.dataType !== 'bool' ) {
                if ( isNaN( value ) || value === -Infinity || value === Infinity ) {
                    value = 0;
                }
            }

            itemObject[ dataField.name ] = value;
        }

        let itemObjectId = index;

        if ( that.id ) {
            itemObjectId = dataItem[ that.id ];
            if ( typeof ( itemObjectId ) === 'object' ) {
                itemObjectId = index;
            }
        }
        else if ( !that.virtualDataSource && that.dataItemById && that.dataItemById[ itemObjectId ] ) {
            itemObjectId = that.length;
        }

        if ( !itemObject.$ ) {
            itemObject.$ = {};
        }

        itemObject.$.id = itemObjectId;
        itemObject.$.index = index;

        return new Object( itemObject );
    }

    _bindToArray() {
        const that = this;

        const unboundMode = typeof ( that.dataSource ) === 'number' || that.dataSourceLength;
        const dataArray = [];

        that.boundSource.canNotify = false;

        for ( let i = 0; i < that.length; i++ ) {
            const dataSourceItem = unboundMode ? {} : that.dataSource[ i ];
            const itemObject = that._getDataItem( dataSourceItem, i );

            dataArray.push( itemObject );
        }

        if ( unboundMode && that.dataSourceLength && that.dataSource.length > 0 ) {
            for ( let i = 0; i < that.dataSource.length; i++ ) {
                const cell = that.dataSource[ i ].cell;
                const value = that.dataSource[ i ].value;

                const row = cell.replace( /[^0-9]/g, '' );
                const dataField = cell.replace( /[0-9]/g, '' );

                dataArray[ row - 1 ][ dataField ] = value;
            }
        }

        that.boundSource = dataArray;

        for ( let i = 0; i < that.length; i++ ) {
            that[ i ] = that.boundSource[ i ];
            that.dataItemById[ that[ i ].$.id ] = that[ i ];
        }

        that.boundSource.canNotify = true;
    }

    _bindToJSON() {
        const that = this;

        const dataArray = [];

        const dataEntries = Object.entries( that.dataSource );

        that.boundSource.canNotify = false;

        for ( let i = 0; i < dataEntries.length; i++ ) {
            const dataSourceItem = dataEntries[ i ];
            const itemObject = that._getDataItem( dataSourceItem, i );

            dataArray.push( itemObject );
        }

        that.boundSource = false === that.observable ? dataArray : new JQX.ObservableArray( dataArray );

        for ( let i = 0; i < that.length; i++ ) {
            that[ i ] = that.boundSource[ i ];
            that.dataItemById[ that[ i ].$.id ] = that[ i ];
        }

        that.boundSource.canNotify = true;
    }

    sortBy( dataField, dataType, orderBy ) {
        const that = this;

        if ( !dataType ) {
            for ( let i = 0; i < that.dataFields.length; i++ ) {
                const field = that.dataFields[ i ];

                if ( field.name === dataField ) {
                    dataType = field.dataType;
                    break;
                }
            }
        }

        if ( that.boundHierarchy ) {
            if ( ( !dataField || dataField.length === 0 ) && that.groupBy.length > 0 ) {
                that.refreshHierarchy();
                return;
            }

            const sortBy = function ( hierarchy ) {
                that._sort( hierarchy, dataField, orderBy, dataType );

                for ( let i = 0; i < hierarchy.length; i++ ) {
                    const item = hierarchy[ i ];

                    if ( item[ 'children' ] ) {
                        sortBy( item[ 'children' ], dataField, orderBy, dataType );
                    }
                }
            }

            sortBy( that.boundHierarchy );
        }
        else {
            that._sort( that.boundSource, dataField, orderBy, dataType );
        }
    }

    _createFilter( dataType, filterExpressions ) {
        const filterOperators = {
            '=': 'EQUAL',
            '<>': 'NOT_EQUAL',
            '<': 'LESS_THAN',
            '>': 'GREATER_THAN',
            '<=': 'LESS_THAN_OR_EQUAL',
            '>=': 'GREATER_THAN_OR_EQUAL',
            'equal': 'EQUAL',
            'not equal': 'NOT_EQUAL',
            'less than': 'LESS_THAN',
            'greater than': 'GREATER_THAN',
            'greater than or equal': 'GREATER_THAN_OR_EQUAL',
            'less than or equal': 'LESS_THAN_OR_EQUAL',
            'starts with': 'STARTS_WITH',
            'ends with': 'ENDS_WITH',
            'null': 'null',
            '': 'EMPTY',
            'isblank': 'EMPTY',
            'isnotblank': 'NOT_EMPTY',
            'contains': 'CONTAINS',
            'notcontains': 'DOES_NOT_CONTAIN',
            'startswith': 'STARTS_WITH',
            'endswith': 'ENDS_WITH',
            'NULL': 'NULL',
            'NOT_NULL': 'NOT_NULL'
        };

        let filterExpressionsArray = [];

        for ( let i = 0; i < filterExpressions.length; i++ ) {
            const filterExpression = filterExpressions[ i ];

            const filterExpressionParts = filterExpression.indexOf( '"' ) === -1 ? filterExpression.split( ' ' ) : filterExpression.split( '"' );
            let filter = [];

            for ( let j = 0; j < filterExpressionParts.length; j++ ) {
                const part = filterExpressionParts[ j ];

                if ( part !== '' ) {
                    filter.push( part.trim() );
                }
            }

            filterExpressionsArray.push( filter );
        }

        const filterGroup = new JQX.FilterGroup();
        const filterGroupOperators = [];
        const filterSubGroups = [];

        for ( let i = 0; i < filterExpressionsArray.length; i++ ) {
            const filterExpression = filterExpressionsArray[ i ];


            if ( filterExpression.length > 1 ) {
                const filterSubGroup = new JQX.FilterGroup();

                let operator = 'and';
                let filterExpressionPartsCounter = 0;

                for ( let j = 0; j < filterExpression.length; j++ ) {
                    const value = filterExpression[ j ];

                    if ( value === 'and' || value === 'or' ) {
                        operator = value;
                        continue;
                    }

                    filterExpressionPartsCounter++;

                    if ( filterExpressionPartsCounter === 2 ) {
                        const filter = filterSubGroup.createFilter( dataType, value, filterOperators[ filterExpression[ j - 1 ] ] );

                        filterExpressionPartsCounter = 0;

                        if ( operator ) {
                            filterSubGroup.addFilter( operator, filter );
                        }
                    }
                }

                filterSubGroups.push( filterSubGroup );
            }
            else {
                const filterGroupOperator = filterExpression[ 0 ];

                if ( filterGroupOperator !== 'and' && filterGroupOperator !== 'or' ) {
                    throw new Error( 'Filter Exprresion expects "AND" or "OR", but the token is: ' + filterGroupOperator );
                }

                filterGroupOperators.push( filterGroupOperator );
            }
        }

        let operatorsCounter = 0;

        if ( filterSubGroups.length === 1 ) {
            return filterSubGroups[ 0 ];
        }

        for ( let i = 0; i < filterSubGroups.length; i++ ) {
            let operator = filterGroupOperators[ operatorsCounter ];

            if ( ( i + 1 ) % 2 === 0 ) {
                operatorsCounter++;
            }

            if ( !operator ) {
                operator = 'and';
            }

            filterGroup.addFilter( operator, filterSubGroups[ i ] );
        }

        return filterGroup;
    }

    filterBy( dataField, ...filterExpressions ) {
        const that = this;


        const dataType = ( () => {
            for ( let i = 0; i < that.dataFields.length; i++ ) {
                const field = that.dataFields[ i ];

                if ( field.name === dataField ) {
                    return field.dataType;
                }
            }
        } )();


        const filterGroup = that._createFilter( dataType, filterExpressions );

        let filteredData = that.boundSource.filter( ( value ) => {
            const evaluation = filterGroup.evaluate( value[ dataField ] );

            return evaluation;
        } );

        return filteredData;
    }

    _filter( filters, operator = 'and' ) {
        const that = this;
        const filterGroups = [];
        const dataFields = [];

        if ( filters.length === 0 ) {
            that.clearFilter();
            return;
        }

        const dataType = ( dataField ) => {
            for ( let i = 0; i < that.dataFields.length; i++ ) {
                const field = that.dataFields[ i ];

                if ( field.name === dataField ) {
                    return field.dataType;
                }
            }
        };
        let defaultResult, operatorSpecificEval;

        if ( operator === 'and' ) {
            defaultResult = true;
            operatorSpecificEval = function ( result, filterGroup, row ) {
                return result && filterGroup.evaluate( row[ filterGroup.dataField ] );
            };
        }
        else {
            defaultResult = false;
            operatorSpecificEval = function ( result, filterGroup, row ) {
                return result || filterGroup.evaluate( row[ filterGroup.dataField ] );
            };
        }

        for ( let i = 0; i < filters.length; i++ ) {
            const filter = filters[ i ];
            const dataField = filter[ 0 ];
            let filterGroup = null;

            if ( filter[ 1 ] instanceof JQX.FilterGroup ) {
                filterGroup = filter[ 1 ];
            }
            else {
                filterGroup = that._createFilter( dataType( dataField ), filter.splice( 1 ) );
            }

            if ( filterGroup ) {
                dataFields.push( dataField );
                filterGroup.dataField = dataField;
                filterGroups.push( filterGroup );
            }
        }

        if ( that.boundHierarchy ) {
            const filter = function ( row ) {
                let result = defaultResult;

                for ( let j = 0; j < filterGroups.length; j++ ) {
                    const filterGroup = filterGroups[ j ];

                    result = operatorSpecificEval( result, filterGroup, row );
                }

                row.$.filtered = result;

                return result;
            }

            const filterBy = function ( hierarchy, parentItem, root ) {
                let filteredCount = 0;

                for ( let i = 0; i < hierarchy.length; i++ ) {
                    const item = hierarchy[ i ];

                    filter( item );

                    if ( item.$.filtered ) {
                        filteredCount++;
                    }

                    if ( item[ 'children' ] ) {
                        filterBy( item[ 'children' ], item, parentItem );
                    }
                }

                if ( filteredCount > 0 && that.groupBy.length > 0 && parentItem ) {
                    parentItem.$.filtered = true;

                    if ( root && !root.$.filtered ) {
                        root.$.filtered = true;
                    }
                }
                else {
                    if ( filteredCount > 0 && filteredCount !== hierarchy.length && parentItem ) {
                        parentItem.$.filtered = null;

                        if ( root && !root.$.filtered ) {
                            root.$.filtered = null;
                        }
                    }
                }
            }

            filterBy( that.boundHierarchy, null, null );
        }
        else {
            for ( let i = 0; i < that.boundSource.length; i++ ) {
                const row = that.boundSource[ i ];

                let result = defaultResult;

                for ( let j = 0; j < filterGroups.length; j++ ) {
                    const filterGroup = filterGroups[ j ];

                    result = operatorSpecificEval( result, filterGroup, row );
                }

                row.$.filtered = result;
            }
        }

        if ( that.onFilter ) {
            that.onFilter()
        }
    }

    clearGroup() {
        const that = this;

        that.groupBy = [];
        that.boundHierarchy = null;
        that.refreshHierarchy();

        if ( that.onGroup ) {
            that.onGroup()
        }
    }

    clearFilter() {
        const that = this;

        for ( let i = 0; i < that.boundSource.length; i++ ) {
            const row = that.boundSource[ i ];

            row.$.filtered = true;
        }

        if ( that.boundHierarchy ) {
            const filterBy = function ( hierarchy, parentItem, root ) {
                //let filteredCount = 0;

                for ( let i = 0; i < hierarchy.length; i++ ) {
                    const item = hierarchy[ i ];

                    item.$.filtered = true;

                    if ( item.$.filtered ) {
                        //filteredCount++;
                    }

                    if ( item[ 'children' ] ) {
                        filterBy( item[ 'children' ], item, parentItem );
                    }
                }

                if ( parentItem ) {
                    parentItem.$.filtered = true;

                    if ( root && !root.$.filtered ) {
                        root.$.filtered = true;
                    }
                }
            }

            filterBy( that.boundHierarchy, null, null );
        }

        if ( that.onFilter ) {
            that.onFilter()
        }
    }

    clearSort() {
        const that = this;

        that._sort( that.boundSource, [], [], [] );
    }

    _sort( dataSource, sortColumns, directions, dataTypes, customSortingCallback ) {
        const that = this;

        let isObservableArray = false;

        if ( dataSource.length === 0 ) {
            return;
        }

        if ( dataSource && dataSource.constructor && dataSource instanceof JQX.ObservableArray ) {
            isObservableArray = true;
        }

        if ( !dataSource || !( Array.isArray( dataSource ) ) || dataSource.length === 0 ||
            !sortColumns || Array.isArray( sortColumns ) && sortColumns.length === 0 ) {
            if ( !isObservableArray && !that.boundHierarchy ) {
                throw new Error( 'sort: Missing or Invalid arguments!' );
            }
        }

        if ( typeof sortColumns === 'string' ) {
            sortColumns = [ sortColumns ];
        }

        const directionCoefficients = [],
            compareFunctions = [];

        if ( directions === undefined ) {
            directions = [];
        }

        const getCompareFunction = function ( a, knownDataType ) {
            // gets data type of column (not necessary if the Grid provides this information)
            const dataType = knownDataType || typeof a;
            let compareFunction;

            switch ( dataType ) {
                case 'string':
                    compareFunction = new Intl.Collator().compare;
                    break;
                case 'number':
                    compareFunction = function ( a, b ) {
                        return a - b;
                    };
                    break;
                case 'boolean':
                case 'bool':
                    compareFunction = function ( a, b ) {
                        if ( a === b ) {
                            return 0;
                        }
                        else if ( a === false ) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    };
                    break;
                case 'date':
                case 'time':
                case 'dateTime':
                    if ( a instanceof Date ) {
                        compareFunction = function ( a, b ) {
                            return a.getTime() - b.getTime();
                        };
                    }
                    else if ( a instanceof JQX.Utilities.DateTime ||
                        a instanceof JQX.Utilities.BigNumber ) {
                        compareFunction = function ( a, b ) {
                            return a.compare( b );
                        };
                    }
                    break;
                case 'object':
                    if ( a instanceof Date ) {
                        compareFunction = function ( a, b ) {
                            return a.getTime() - b.getTime();
                        };
                    }
                    else if ( a instanceof JQX.Utilities.DateTime ||
                        a instanceof JQX.Utilities.BigNumber ) {
                        compareFunction = function ( a, b ) {
                            return a.compare( b );
                        };
                    }
                    else if ( a instanceof JQX.Utilities.Complex || ( window.NIComplex && a instanceof window.NIComplex ) ) {
                        const complexNumericProcessor = new JQX.Utilities.ComplexNumericProcessor();

                        compareFunction = function ( a, b ) {
                            return complexNumericProcessor.compareComplexNumbers( a, b );
                        }
                    }

                    break;
            }

            return compareFunction;
        }

        for ( let i = 0; i < sortColumns.length; i++ ) {
            if ( directions[ i ] === undefined || directions[ i ] === 'asc' || directions[ i ] === 'ascending' ) {
                directionCoefficients[ i ] = 1;
            }
            else {
                directionCoefficients[ i ] = -1;
            }

            const value = dataSource[ 0 ][ sortColumns[ i ] ];

            compareFunctions[ i ] = getCompareFunction( value, dataTypes[ i ] );
        }

        if ( customSortingCallback ) {
            customSortingCallback( dataSource, sortColumns, directions, compareFunctions );
            return;
        }

        dataSource.sort( function ( a, b ) {
            for ( let i = 0; i < sortColumns.length; i++ ) {
                const result = compareFunctions[ i ]( a[ sortColumns[ i ] ], b[ sortColumns[ i ] ] );

                if ( result === 0 ) {
                    if ( sortColumns[ i + 1 ] ) {
                        continue;
                    }
                    else if ( a._index !== undefined ) {
                        // makes sorting stable
                        return ( a._index - b._index ) * directionCoefficients[ i ];
                    }

                    return 0;
                }

                return result * directionCoefficients[ i ];
            }

            if ( sortColumns.length === 0 ) {
                if ( a.$.index < b.$.index ) {
                    return -1;
                }

                if ( a.$.index > b.$.index ) {
                    return 1;
                }

                return 0;

            }
        } );

        for ( let i = 0; i < dataSource.length; i++ ) {
            that[ i ] = dataSource[ i ];
        }
    }

    static Filter( dataSource, filterColumns, filterGroups, customFilteringCallback, operator = 'and' ) {
        let defaultResult, operatorSpecificEval;

        if ( operator === 'and' ) {
            defaultResult = true;
            operatorSpecificEval = function ( result, dataItem, filterColumn, filterGroup ) {
                if ( customFilteringCallback ) {
                    return result && customFilteringCallback( dataItem, filterColumn, filterGroup );
                }

                return result && filterGroup.evaluate( dataItem[ filterColumn ] );
            };
        }
        else {
            defaultResult = false;
            operatorSpecificEval = function ( result, dataItem, filterColumn, filterGroup ) {
                if ( customFilteringCallback ) {
                    return result || customFilteringCallback( dataItem, filterColumn, filterGroup );
                }

                return result || filterGroup.evaluate( dataItem[ filterColumn ] );
            };
        }

        const filteredData = dataSource.filter( ( dataItem ) => {
            let result = defaultResult;

            for ( let i = 0; i < filterGroups.length; i++ ) {
                const filterGroup = filterGroups[ i ];
                const filterColumn = filterColumns[ i ];

                result = operatorSpecificEval( result, dataItem, filterColumn, filterGroup );
            }

            return result;
        } );

        return filteredData;
    }

    filter( filterColumns, filterGroups, customFilteringCallback ) {
        JQX.ExcelAdapter.Filter( this.boundSource, filterColumns, filterGroups, customFilteringCallback );
    }

    sort( sortColumns, directions, customSortingCallback ) {
        JQX.ExcelAdapter.Sort( this.boundSource, sortColumns, directions, customSortingCallback );
    }

    static Sort( dataSource, sortColumns, directions, customSortingCallback ) {
        const getCompareFunction = function ( a ) {
            // gets data type of column (not necessary if the Grid provides this information)
            const dataType = typeof a;
            let compareFunction;

            switch ( dataType ) {
                case 'string':
                    compareFunction = new Intl.Collator().compare;
                    break;
                case 'number':
                    compareFunction = function ( a, b ) {
                        return a - b;
                    };
                    break;
                case 'boolean':
                    compareFunction = function ( a, b ) {
                        if ( a === b ) {
                            return 0;
                        }
                        else if ( a === false ) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    };
                    break;
                case 'object':
                    if ( a instanceof Date ) {
                        compareFunction = function ( a, b ) {
                            return a.getTime() - b.getTime();
                        };
                    }
                    else if ( a instanceof JQX.Utilities.DateTime ||
                        a instanceof BigNumberNG ) {
                        compareFunction = function ( a, b ) {
                            return a.compare( b );
                        };
                    }
                    else if ( a instanceof JQX.Utilities.Complex || ( window.NIComplex && a instanceof window.NIComplex ) ) {
                        const complexNumericProcessor = new JQX.Utilities.ComplexNumericProcessor();

                        compareFunction = function ( a, b ) {
                            return complexNumericProcessor.compareComplexNumbers( a, b );
                        }
                    }

                    break;
            }

            return compareFunction;
        }

        if ( !dataSource || !( Array.isArray( dataSource ) ) || dataSource.length === 0 ||
            !sortColumns || Array.isArray( sortColumns ) && sortColumns.length === 0 ) {
            return;
        }

        if ( typeof sortColumns === 'string' ) {
            sortColumns = [ sortColumns ];
        }

        const directionCoefficients = [],
            compareFunctions = [];

        if ( directions === undefined ) {
            directions = [];
        }

        for ( let i = 0; i < sortColumns.length; i++ ) {
            if ( directions[ i ] === undefined || directions[ i ] === 'asc' || directions[ i ] === 'ascending' ) {
                directionCoefficients[ i ] = 1;
            }
            else {
                directionCoefficients[ i ] = -1;
            }

            compareFunctions[ i ] = getCompareFunction( dataSource[ 0 ][ sortColumns[ i ] ] );
        }

        if ( customSortingCallback ) {
            customSortingCallback( dataSource, sortColumns, directions, compareFunctions );
            return;
        }

        const sortedData = dataSource.slice( 0 );

        sortedData.sort( function ( a, b ) {
            for ( let i = 0; i < sortColumns.length; i++ ) {
                const result = compareFunctions[ i ]( a[ sortColumns[ i ] ], b[ sortColumns[ i ] ] );

                if ( result === 0 ) {
                    if ( sortColumns[ i + 1 ] ) {
                        continue;
                    }
                    else if ( a._index !== undefined ) {
                        // makes sorting stable
                        return ( a._index - b._index ) * directionCoefficients[ i ];
                    }

                    return 0;
                }

                return result * directionCoefficients[ i ];
            }
        } );

        return sortedData;
    }
}

window.jqxDataSource = DataAdapter;

class Ajax {
    constructor ( config, callback ) {
        const that = this;

        that.config = config;
        that.callback = callback;

        if ( config.autoFetch === false ) {
            return;
        }

        that.call( config );
    }

    call( config ) {
        const that = this;

        if ( !config ) {
            config = that.config;
        }

        let method = 'GET',
            url = config.url,
            body = null,
            async = true;

        if ( config.type ) {
            method = config.type;
        }

        if ( config.data ) {
            if ( method === 'GET' ) {
                url += '?';

                for ( let prop in config.data ) {
                    if ( config.data.hasOwnProperty( prop ) ) {
                        url += encodeURI( prop + '=' + config.data[ prop ] + '&' );
                    }
                }

                if ( url.charAt( url.length - 1 ) === '&' ) {
                    url = url.slice( 0, url.length - 1 );
                }
            }
            else if ( method === 'POST' ) {
                body = JSON.stringify( config.data );
            }
        }

        if ( config && config.async === false && config.dataSourceType !== 'xlsx' ) {
            async = false;
        }

        if ( window.fetch !== undefined && async ) {
            that.ajaxFetch( config, method, url, body );
        }
        else {
            that.ajaxXMLHttpRequest( config, method, url, body, async );
        }
    }

    ajaxFetch( config, method, url, body ) {
        // prepare fetch config
        const that = this;
        const fetchInit = { method: method };
        let parseMethod;

        switch ( config.dataSourceType ) {
            case 'json':
                parseMethod = 'json';
                break;
            case 'xlsx':
                parseMethod = 'arrayBuffer';
                break;
            default:
                parseMethod = 'text';
        }

        if ( config ) {
            if ( config.contentType ) {
                fetchInit.headers = new Headers( {
                    'Content-Type': config.contentType
                } );
            }
        }

        if ( body !== null ) {
            fetchInit.body = body;
        }

        let status, fetchTimeout, timeouted;

        if ( config.timeout ) {
            fetchTimeout = setTimeout( function () {
                timeouted = true;
            }, config.timeout );
        }

        if ( config.beforeSend ) {
            const beforeSendResult = config.beforeSend( fetchInit, config );

            if ( beforeSendResult === false ) {
                return;
            }
        }

        // fetch resource
        fetch( url, fetchInit )
            .then( function ( response ) {
                if ( timeouted ) {
                    status = 408;
                    throw new Error( 'timeout' );
                }

                if ( fetchTimeout ) {
                    clearTimeout( fetchTimeout );
                }

                status = response.status;

                if ( !response.ok ) {
                    throw new Error( response.statusText );
                }

                return response[ parseMethod ]();
            } )
            .then( function ( data ) {
                if ( parseMethod === 'arrayBuffer' ) {
                    return JSZip.loadAsync( data ).then( function ( zipData ) {
                        // "data" represents the whole XLSX/ZIP file
                        return zipData.files[ 'xl/worksheets/sheet1.xml' ].async( 'text' ).then( function ( sheet1 ) {
                            return zipData.files[ 'xl/sharedStrings.xml' ].async( 'text' ).then( function ( sharedStrings ) {
                                const parsedData = that.parseXLSXData( sheet1, sharedStrings );

                                that.ajaxComplete( config, parsedData, status );
                            } );
                        } );
                    } );
                }
                else {
                    that.ajaxComplete( config, data, status );
                }
            } )
            .catch( function ( error ) {
                if ( error.message === 'JSZip is not defined' ) {
                    error.message = 'JSZip is not defined. Please include a reference to JSZip to be able to load data from XLSX files.';
                }

                if ( config && config.loadError ) {
                    config.loadError( status, error );
                }

                if ( that.callback ) {
                    that.callback( error, status );
                }
            } );
    }

    ajaxXMLHttpRequest( config, method, url, body, async ) {
        const request = new XMLHttpRequest();
        const that = this;

        request.open( method, url, async );

        request.ontimeout = function () {
            if ( config && config.loadError ) {
                config.loadError( 408, 'timeout' );
            }
        };

        request.onload = function () {
            if ( request.readyState === 4 ) {
                const status = request.status;
                let data = request.response;

                if ( status >= 200 && status <= 299 ) {
                    if ( config.dataSourceType === 'json' ) {
                        data = JSON.parse( data );
                    }

                    that.ajaxComplete( config, data, status );
                }
                else if ( config && config.loadError ) {
                    config.loadError( status, data );
                }
            }
        };

        request.onerror = function () {
            if ( config && config.loadError ) {
                config.loadError( request.status, request.response );
            }
        };

        if ( config && config.contentType ) {
            request.setRequestHeader( 'Content-Type', config.contentType );
        }

        if ( async && config.timeout ) {
            request.timeout = config.timeout;
        }

        if ( config.beforeSend ) {
            const beforeSendResult = config.beforeSend( request, config );

            if ( beforeSendResult === false ) {
                return;
            }
        }

        request.send( body );
    }

    ajaxComplete( config, data, status ) {
        if ( !config ) {
            return;
        }

        if ( config.beforeLoadComplete ) {
            const processedData = config.beforeLoadComplete( data );

            if ( processedData ) {
                data = processedData;
            }
        }

        if ( config.loadComplete ) {
            config.loadComplete( data, status );
        }

        if ( this.callback ) {
            this.callback( data, status );
        }
    }

    parseXLSXData( sheet1, sharedStrings ) {
        const parser = new DOMParser(),
            sharedStringsDocument = parser.parseFromString( sharedStrings, 'text/xml' ),
            sharedStringsContainers = Array.from( sharedStringsDocument.getElementsByTagName( 'si' ) ),
            sharedStringsCollection = [],
            sheet1Document = parser.parseFromString( sheet1, 'text/xml' ),
            rows = Array.from( sheet1Document.getElementsByTagName( 'row' ) ),
            parsedData = [];

        sharedStringsContainers.forEach( function ( si ) {
            let texts = si.getElementsByTagName( 't' );

            if ( texts.length === 1 ) {
                sharedStringsCollection.push( texts[ 0 ].innerHTML );
            }
            else {
                let text = '';

                texts = Array.from( texts );
                texts.forEach( function ( t ) {
                    text += t.innerHTML;
                } );
                sharedStringsCollection.push( text );
            }
        } );

        rows.forEach( function ( row ) {
            const rowObject = {},
                cells = Array.from( row.getElementsByTagName( 'c' ) );

            cells.forEach( function ( cell/*, index*/ ) {
                const column = cell.getAttribute( 'r' ).match( /\D+/ )[ 0 ],
                    type = cell.getAttribute( 't' ),
                    xmlValue = cell.getElementsByTagName( 'v' )[ 0 ].innerHTML;
                let value;

                switch ( type ) {
                    case 's':
                        // string
                        value = sharedStringsCollection[ parseFloat( xmlValue ) ];
                        break;
                    case 'b':
                        // boolean
                        value = parseFloat( xmlValue ) === 1;
                        break;
                    default:
                        // number or date
                        value = parseFloat( xmlValue );
                }

                rowObject[ column ] = value;
            } );

            parsedData.push( rowObject );
        } );

        return parsedData;
    }
}
if ($.jqx && $.jqx.dataAdapter) {
    $.jqx.dataAdapter.Importer = DataAdapter;
}
})(jqxBaseFramework);
