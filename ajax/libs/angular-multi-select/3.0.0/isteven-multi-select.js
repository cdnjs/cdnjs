/* 
 * Angular JS Multi Select
 * Creates a dropdown-like button with checkboxes. 
 *
 * Project started on: Tue, 14 Jan 2014 - 5:18:02 PM
 * Current version: 3.0.0
 * 
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Ignatius Steven (https://github.com/isteven)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions: 
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

'use strict'

angular.module( 'isteven-multi-select', ['ng'] ).directive( 'istevenMultiSelect' , [ '$sce', '$timeout', '$templateCache', function ( $sce, $timeout, $templateCache ) {
    return {
        restrict: 
            'AE',

        scope: 
        {   
            // models
            inputModel      : '=',
            outputModel     : '=',

            // settings based on attribute
            buttonLabel     : '@',
            directiveId     : '@',
            helperElements  : '@',            
            isDisabled      : '=',
            itemLabel       : '@',
            maxLabels       : '@',
            orientation     : '@',
            selectionMode   : '@',    
            minSearchLength : '@',  // 3.0.0 - OK                 
                                                         
            // settings based on input model property 
            tickProperty    : '@',
            disableProperty : '@',
            groupProperty   : '@',
            searchProperty  : '@',  // 3.0.0 - OK
            maxHeight       : '@',            

            // callbacks
            onClear         : '&',  // 3.0.0 - OK
            onClose         : '&',
            onSearchChange  : '&',  // 3.0.0 - OK
            onItemClick     : '&',            
            onOpen          : '&', 
            onReset         : '&',  // 3.0.0 - OK
            onSelectAll     : '&',  // 3.0.0 - OK
            onSelectNone    : '&',  // 3.0.0 - OK                     

            // i18n
            translation     : '='   // 3.0.0 - OK
        },

        template: 
            '<span class="multiSelect inlineBlock" id={{directiveId}}>' +
                '<button type="button"' +
                    'ng-click="toggleCheckboxes( $event ); refreshSelectedItems(); refreshButton(); prepareGrouping; prepareIndex();"' +
                    'ng-bind-html="varButtonLabel">' +
                '</button>' +
                '<div class="checkboxLayer">' +

                    '<div class="helperContainer" ng-if="displayHelper( \'filter\' ) || displayHelper( \'all\' ) || displayHelper( \'none\' ) || displayHelper( \'reset\' )">' +
                        '<div class="line" ng-if="displayHelper( \'all\' ) || displayHelper( \'none\' ) || displayHelper( \'reset\' )">' +

                            '<button type="button" class="helperButton"' +
                                'ng-if="!isDisabled && displayHelper( \'all\' )"' +
                                'ng-click="select( \'all\', $event );"' +
                                'ng-bind-html="lang.selectAll">' +
                            '</button>'+

                            '<button type="button" class="helperButton"' +
                                'ng-if="!isDisabled && displayHelper( \'none\' )"' +
                                'ng-click="select( \'none\', $event );"' +
                                'ng-bind-html="lang.selectNone">' +
                            '</button>'+

                            '<button type="button" class="helperButton reset"' +
                                'ng-if="!isDisabled && displayHelper( \'reset\' )"' +
                                'ng-click="select( \'reset\', $event );"' +
                                'ng-bind-html="lang.reset">'+
                            '</button>' +
                        '</div>' +

                        '<div class="line" style="position:relative" ng-if="displayHelper( \'filter\' )">'+
                                                    
                            '<input placeholder="{{lang.search}}" type="text"' +
                                'ng-click="select( \'filter\', $event )" '+
                                'ng-model="inputLabel.labelFilter" '+
                                'ng-change="searchChanged()" class="inputFilter"'+
                                '/>'+
            
                            '<button type="button" class="clearButton" ng-click="clearClicked( $event )" >×</button> '+
                        '</div> '+
                    '</div> '+
            
                    '<div class="checkBoxContainer">'+
                        '<div '+
                            'ng-repeat="item in filteredModel | filter:removeGroupEndMarker" class="multiSelectItem"'+
                            'ng-class="{selected: item[ tickProperty ], horizontal: orientationH, vertical: orientationV, multiSelectGroup:item[ groupProperty ], disabled:itemIsDisabled( item )}"'+
                            'ng-click="syncItems( item, $event, $index );" '+
                            'ng-mouseleave="removeFocusStyle( tabIndex );"> '+
            
                            '<div class="acol" ng-if="item[ spacingProperty ] > 0" ng-repeat="i in numberToArray( item[ spacingProperty ] ) track by $index">'+
                            
                        '</div>  '+
            
                        '<div class="acol">'+

                            '<label>'+                                
                                '<input class="checkbox focusable" type="checkbox" '+
                                    'ng-disabled="itemIsDisabled( item )" '+
                                    'ng-checked="item[ tickProperty ]" '+
                                    'ng-click="syncItems( item, $event, $index )" />'+

                                '<span '+
                                    'ng-class="{disabled:itemIsDisabled( item )}" '+
                                    'ng-bind-html="writeLabel( item, \'itemLabel\' )">'+
                                '</span>'+
                            '</label>'+
                        '</div>'+
            
                        '<span class="tickMark" ng-if="item[ groupProperty ] !== true && item[ tickProperty ] === true">✔</span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</span>',                    

        link: function ( $scope, element, attrs ) {                       

            $scope.backUp           = [];
            $scope.varButtonLabel   = '';               
            $scope.spacingProperty  = '';
            $scope.indexProperty    = '';                        
            $scope.orientationH     = false;
            $scope.orientationV     = true;
            $scope.filteredModel    = [];
            $scope.inputLabel       = { labelFilter: '' };                        
            $scope.tabIndex         = 0;            
            $scope.lang             = {};
            $scope.localModel       = [];

            var 
                prevTabIndex        = 0,
                helperItems         = [],
                helperItemsLength   = 0,
                checkBoxLayer       = '',
                scrolled            = false,
                selectedItems       = [],
                formElements        = [],
                vMinSearchLength    = 0,
                clickedItem         = null;

            // v3.0.0
            // clear button clicked
            $scope.clearClicked = function( e ) {                
                $scope.inputLabel.labelFilter = '';
                $scope.updateFilter();
                $scope.select( 'clear', e );                
            }

            // A little hack so that AngularJS ng-repeat can loop using start and end index like a normal loop
            // http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
            $scope.numberToArray = function( num ) {
                return new Array( num );   
            }

            // Call this function when user type on the filter field
            $scope.searchChanged = function() {                                                
                if ( $scope.inputLabel.labelFilter.length < vMinSearchLength && $scope.inputLabel.labelFilter.length > 0 ) {
                    return false;
                }                
                $scope.updateFilter();
            }

            $scope.updateFilter = function()
            {      
                // we check by looping from end of input-model
                $scope.filteredModel = [];
                var i = 0;

                if ( typeof $scope.localModel === 'undefined' ) {
                    return false;                   
                }

                for( i = $scope.localModel.length - 1; i >= 0; i-- ) {

                    // if it's group end, we push it to filteredModel[];
                    if ( typeof $scope.localModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.localModel[ i ][ $scope.groupProperty ] === false ) {
                        $scope.filteredModel.push( $scope.localModel[ i ] );
                    }
                    
                    // if it's data 
                    var gotData = false;
                    if ( typeof $scope.localModel[ i ][ $scope.groupProperty ] === 'undefined' ) {                        
                        
                        // If we set the search-key attribute, we use this loop. 
                        if ( typeof attrs.searchProperty !== 'undefined' && $scope.searchProperty !== '' ) {

                            for (var key in $scope.localModel[ i ]  ) {
                                if ( 
                                    typeof $scope.localModel[ i ][ key ] !== 'boolean'
                                    && String( $scope.localModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                    && $scope.searchProperty.indexOf( key ) > -1
                                ) {
                                    gotData = true;
                                    break;
                                }
                            }                        
                        }
                        // if there's no search-key attribute, we use this one. Much better on performance.
                        else {
                            for ( var key in $scope.localModel[ i ]  ) {
                                if ( 
                                    typeof $scope.localModel[ i ][ key ] !== 'boolean'
                                    && String( $scope.localModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                ) {
                                    gotData = true;
                                    break;
                                }
                            }                        
                        }

                        if ( gotData === true ) {    
                            // push
                            $scope.filteredModel.push( $scope.localModel[ i ] );
                        }
                    }

                    // if it's group start
                    if ( typeof $scope.localModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.localModel[ i ][ $scope.groupProperty ] === true ) {

                        if ( typeof $scope.filteredModel[ $scope.filteredModel.length - 1 ][ $scope.groupProperty ] !== 'undefined' 
                                && $scope.filteredModel[ $scope.filteredModel.length - 1 ][ $scope.groupProperty ] === false ) {
                            $scope.filteredModel.pop();
                        }
                        else {
                            $scope.filteredModel.push( $scope.localModel[ i ] );
                        }
                    }
                }                

                $scope.filteredModel.reverse();  
                
                $timeout( function() {                    

                    $scope.getFormElements();               
                    
                    // Callback: on filter change                      
                    if ( $scope.inputLabel.labelFilter.length > vMinSearchLength ) {

                        var filterObj = [];

                        angular.forEach( $scope.filteredModel, function( value, key ) {
                            if ( typeof value !== 'undefined' ) {                   
                                if ( typeof value[ $scope.groupProperty ] === 'undefined' ) {                                                                    
                                    var tempObj = angular.copy( value );
                                    var index = filterObj.push( tempObj );                                
                                    delete filterObj[ index - 1 ][ $scope.indexProperty ];
                                    delete filterObj[ index - 1 ][ $scope.spacingProperty ];      
                                }
                            }
                        });

                        $scope.onSearchChange({ 
                            data: 
                            {
                                keyword: $scope.inputLabel.labelFilter, 
                                result: filterObj 
                            } 
                        });
                    }
                },0);
            };

            // List all the input elements.
            // This function will be called everytime the filter is updated. Not good for performance, but oh well..
            $scope.getFormElements = function() {                                     
                formElements = [];
                // Get helper - select & reset buttons
                var selectButtons = element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'button' );
                // Get helper - search
                var inputField = element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'input' );
                // Get helper - clear button
                var clearButton = element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'button' );
                // Get checkboxes
                var checkboxes = element.children().children().next().children().next()[ 0 ].getElementsByTagName( 'input' );
                // Push them into global array formElements[] 
                for ( var i = 0; i < selectButtons.length ; i++ )   { formElements.push( selectButtons[ i ] ); }
                for ( var i = 0; i < inputField.length ; i++ )      { formElements.push( inputField[ i ] ); }
                for ( var i = 0; i < clearButton.length ; i++ )     { formElements.push( clearButton[ i ] ); }
                for ( var i = 0; i < checkboxes.length ; i++ )      { formElements.push( checkboxes[ i ] ); }
                
            }            

            // check if an item has $scope.groupProperty (be it true or false)
            $scope.isGroupMarker = function( item , type ) {
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === type ) return true; 
                return false;
            }

            $scope.removeGroupEndMarker = function( item ) {
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === false ) return false; 
                return true;
            }
            

            // Show or hide a helper element 
            $scope.displayHelper = function( elementString ) {

                if ( attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE' ) {

                    switch( elementString.toUpperCase() ) {
                        case 'ALL':                                                        
                            return false;                    
                            break;
                        case 'NONE':                            
                            return false;
                            break;
                        case 'RESET':
                            if ( typeof attrs.helperElements === 'undefined' ) {
                                return true;                    
                            }
                            else if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( 'RESET' ) >= 0 ) {
                                return true;
                            }                            
                            break;
                        case 'FILTER':
                            if ( typeof attrs.helperElements === 'undefined' ) {
                                return true;                    
                            }                            
                            if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( 'FILTER' ) >= 0 ) {
                                return true;
                            }
                            break;                    
                        default:                                         
                            break;
                    }                    

                    return false;
                }

                else {
                    if ( typeof attrs.helperElements === 'undefined' ) {
                        return true;                    
                    }
                    if ( attrs.helperElements && $scope.helperElements.toUpperCase().indexOf( elementString.toUpperCase() ) >= 0 ) {
                        return true;
                    }
                    return false;
                }                
            }                

            // call this function when an item is clicked
            $scope.syncItems = function( item, e, ng_repeat_index ) {                                      

                e.preventDefault();
                e.stopPropagation();

                // if the directive is globaly disabled, do nothing
                if ( typeof attrs.disableProperty !== 'undefined' && item[ $scope.disableProperty ] === true ) {                                        
                    return false;
                }

                // if item is disabled, do nothing
                if ( typeof attrs.isDisabled !== 'undefined' && $scope.isDisabled === true ) {                        
                    return false;
                }                                

                // if end group marker is clicked, do nothing
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === false ) {
                    return false;
                }                

                var index = $scope.filteredModel.indexOf( item );       

                // if the start of group marker is clicked ( only for multiple selection! )
                //      how it works:
                //      - if, in a group, there are items which are not selected, then they all will be selected
                //      - if, in a group, all items are selected, then they all will be de-selected                
                if ( typeof item[ $scope.groupProperty ] !== 'undefined' && item[ $scope.groupProperty ] === true ) {                                  

                    // this is only for multiple selection, so if selection mode is single, do nothing
                    if ( attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE' ) {
                        return false;
                    }
                    
                    var i,j,k;
                    var startIndex = 0;
                    var endIndex = $scope.filteredModel.length - 1;
                    var tempArr = [];

                    // nest level is to mark the depth of the group.
                    // when you get into a group (start group marker), nestLevel++
                    // when you exit a group (end group marker), nextLevel--
                    var nestLevel = 0;                    

                    // we loop throughout the filtered model (not whole model)
                    for( i = index ; i < $scope.filteredModel.length ; i++) {  

                        // this break will be executed when we're done processing each group
                        if ( nestLevel === 0 && i > index ) 
                        {
                            break;
                        }
                    
                        if ( typeof $scope.filteredModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ $scope.groupProperty ] === true ) {
                            
                            // To cater multi level grouping
                            if ( tempArr.length === 0 ) {
                                startIndex = i + 1; 
                            }                            
                            nestLevel = nestLevel + 1;
                        }                                                

                        // if group end
                        else if ( typeof $scope.filteredModel[ i ][ $scope.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ $scope.groupProperty ] === false ) {

                            nestLevel = nestLevel - 1;                            

                            // cek if all are ticked or not                            
                            if ( tempArr.length > 0 && nestLevel === 0 ) {                                

                                var allTicked = true;       

                                endIndex = i;

                                for ( j = 0; j < tempArr.length ; j++ ) {                                
                                    if ( typeof tempArr[ j ][ $scope.tickProperty ] !== 'undefined' &&  tempArr[ j ][ $scope.tickProperty ] === false ) {
                                        allTicked = false;
                                        break;
                                    }
                                }                                                                                    

                                if ( allTicked === true ) {
                                    for ( j = startIndex; j <= endIndex ; j++ ) {
                                        if ( typeof $scope.filteredModel[ j ][ $scope.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.localModel[ inputModelIndex ][ $scope.tickProperty ] = false;
                                            }
                                            else if ( $scope.filteredModel[ j ][ $scope.disableProperty ] !== true ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.localModel[ inputModelIndex ][ $scope.tickProperty ] = false;
                                            }
                                        }
                                    }                                
                                }

                                else {
                                    for ( j = startIndex; j <= endIndex ; j++ ) {
                                        if ( typeof $scope.filteredModel[ j ][ $scope.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;                                                
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.localModel[ inputModelIndex ][ $scope.tickProperty ] = true;

                                            }                                            
                                            else if ( $scope.filteredModel[ j ][ $scope.disableProperty ] !== true ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.localModel[ inputModelIndex ][ $scope.tickProperty ] = true;
                                            }
                                        }
                                    }                                
                                }                                                                                    
                            }
                        }
            
                        // if data
                        else {                            
                            tempArr.push( $scope.filteredModel[ i ] );                                                                                    
                        }
                    }                                 
                }

                // if an item (not group marker) is clicked
                else {

                    // If it's single selection mode
                    if ( attrs.selectionMode && $scope.selectionMode.toUpperCase() === 'SINGLE' ) {
                        
                        // first, set everything to false
                        for( i=0 ; i < $scope.filteredModel.length ; i++) {                            
                            $scope.filteredModel[ i ][ $scope.tickProperty ] = false;                            
                        }        
                        for( i=0 ; i < $scope.localModel.length ; i++) {                            
                            $scope.localModel[ i ][ $scope.tickProperty ] = false;                            
                        }        
                        
                        // then set the clicked item to true
                        $scope.filteredModel[ index ][ $scope.tickProperty ] = true;

                        // we then hide the checkbox layer
                        $scope.toggleCheckboxes( e );                                                
                    }   

                    // Multiple
                    else {
                        $scope.filteredModel[ index ][ $scope.tickProperty ]   = !$scope.filteredModel[ index ][ $scope.tickProperty ];
                    }

                    // we refresh input model as well
                    var inputModelIndex = $scope.filteredModel[ index ][ $scope.indexProperty ];                                        
                    $scope.localModel[ inputModelIndex ][ $scope.tickProperty ] = $scope.filteredModel[ index ][ $scope.tickProperty ];                    
                }                                  

                // we execute the callback function here
                clickedItem = angular.copy( item );                                                    
                if ( clickedItem !== null ) {                        
                    $timeout( function() {
                        delete clickedItem[ $scope.indexProperty ];
                        delete clickedItem[ $scope.spacingProperty ];      
                        $scope.onItemClick( { data: clickedItem } );
                        clickedItem = null;                    
                    }, 0 );                                                 
                }                                    
                
                $scope.refreshOutputModel();
                $scope.refreshButton();                              

                // We update the index here
                prevTabIndex = $scope.tabIndex;
                $scope.tabIndex = ng_repeat_index + helperItemsLength;
                                
                // Set focus on the hidden checkbox 
                e.target.focus();

                // set & remove CSS style
                $scope.removeFocusStyle( prevTabIndex );
                $scope.setFocusStyle( $scope.tabIndex );
            }     

            // update $scope.outputModel
            $scope.refreshOutputModel = function() {            
                
                $scope.outputModel = [];

                angular.forEach( $scope.localModel, function( value, key ) {
                    if ( typeof value !== 'undefined' ) {                   
                        if ( typeof value[ $scope.groupProperty ] === 'undefined' ) {
                            if ( value[ $scope.tickProperty ] === true ) {
                                // selectedItems.push( value );                               
                                var temp = angular.copy( value );
                                var index = $scope.outputModel.push( temp );                                
                                delete $scope.outputModel[ index - 1 ][ $scope.indexProperty ];
                                delete $scope.outputModel[ index - 1 ][ $scope.spacingProperty ];      
                            }
                        }
                    }
                });                                
            }

            // refresh button label
            $scope.refreshButton = function() {

                $scope.varButtonLabel   = '';                
                var ctr                 = 0;                  

                // refresh button label...
                if ( $scope.outputModel.length === 0 ) {
                    // https://github.com/isteven/angular-multi-select/pull/19                    
                    $scope.varButtonLabel = $scope.lang.nothingSelected;
                }
                else {                
                    var tempMaxLabels = $scope.outputModel.length;
                    if ( typeof $scope.maxLabels !== 'undefined' && $scope.maxLabels !== '' ) {
                        tempMaxLabels = $scope.maxLabels;
                    }

                    // if max amount of labels displayed..
                    if ( $scope.outputModel.length > tempMaxLabels ) {
                        $scope.more = true;
                    }
                    else {
                        $scope.more = false;
                    }                
                
                    angular.forEach( $scope.outputModel, function( value, key ) {
                        if ( typeof value !== 'undefined' ) {                        
                            if ( ctr < tempMaxLabels ) {                            
                                $scope.varButtonLabel += ( $scope.varButtonLabel.length > 0 ? '</div>, <div class="buttonLabel">' : '<div class="buttonLabel">') + $scope.writeLabel( value, 'buttonLabel' );
                            }
                            ctr++;
                        }
                    });                

                    if ( $scope.more === true ) {
                        // https://github.com/isteven/angular-multi-select/pull/16
                        if (tempMaxLabels > 0) {
                            $scope.varButtonLabel += ', ... ';
                        }
                        $scope.varButtonLabel += '(' + $scope.outputModel.length + ')';                        
                    }
                }
                $scope.varButtonLabel = $sce.trustAsHtml( $scope.varButtonLabel + '<span class="caret"></span>' );                
            }

            // Check if a checkbox is disabled or enabled. It will check the granular control (disableProperty) and global control (isDisabled)
            // Take note that the granular control has higher priority.
            $scope.itemIsDisabled = function( item ) {
                
                if ( typeof attrs.disableProperty !== 'undefined' && item[ $scope.disableProperty ] === true ) {                                        
                    return true;
                }
                else {             
                    if ( $scope.isDisabled === true ) {                        
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                
            }

            // A simple function to parse the item label settings. Used on the buttons and checkbox labels.
            $scope.writeLabel = function( item, type ) {
                                
                // type is either 'itemLabel' or 'buttonLabel'
                var temp    = $scope[ type ].split( ' ' );                    
                var label   = '';

                angular.forEach( temp, function( value, key ) {                    
                    item[ value ] && ( label += '&nbsp;' + value.split( '.' ).reduce( function( prev, current ) {
                        return prev[ current ]; 
                    }, item ));        
                });
                if ( type.toUpperCase() === 'BUTTONLABEL' ) {
                    return label;
                }
                return $sce.trustAsHtml( label );
            }                                

            // UI operations to show/hide checkboxes based on click event..
            $scope.toggleCheckboxes = function( e ) {                                    
                
                // We grab the button
                var clickedEl = element.children()[0];

                // Just to make sure.. had a bug where key events were recorded twice
                angular.element( document ).off( 'click', $scope.externalClickListener );
                angular.element( document ).off( 'keydown', $scope.keyboardListener );                                    

                // clear filter
                $scope.inputLabel.labelFilter = '';                
                $scope.updateFilter();                                

                // The idea below was taken from another multi-select directive - https://github.com/amitava82/angular-multiselect 
                // His version is awesome if you need a more simple multi-select approach.                                

                // close
                if ( angular.element( checkBoxLayer ).hasClass( 'show' )) {                         

                    angular.element( checkBoxLayer ).removeClass( 'show' );                    
                    angular.element( clickedEl ).removeClass( 'buttonClicked' );                    
                    angular.element( document ).off( 'click', $scope.externalClickListener );
                    angular.element( document ).off( 'keydown', $scope.keyboardListener );                                    

                    // clear the focused element;
                    $scope.removeFocusStyle( $scope.tabIndex );

                    // close callback
                    $timeout( function() {
                        $scope.onClose();
                    }, 0 );

                    // set focus on button again
                    element.children().children()[ 0 ].focus();
                } 
                // open
                else                 
                {           
                    helperItems = [];
                    helperItemsLength = 0;

                    angular.element( checkBoxLayer ).addClass( 'show' );
                    angular.element( clickedEl ).addClass( 'buttonClicked' );       

                    // Attach change event listener on the input filter. 
                    // We need this because ng-change is apparently not an event listener.                    
                    angular.element( document ).on( 'click', $scope.externalClickListener );
                    angular.element( document ).on( 'keydown', $scope.keyboardListener );  

                    // to get the initial tab index, depending on how many helper elements we have. 
                    // priority is to always focus it on the input filter 
                    $scope.getFormElements();
                    $scope.tabIndex = 0;

                    var helperContainer = angular.element( element[ 0 ].querySelector( '.helperContainer' ) )[0];                
                    
                    if ( typeof helperContainer !== 'undefined' ) {
                        for ( var i = 0; i < helperContainer.getElementsByTagName( 'BUTTON' ).length ; i++ ) {
                            helperItems[ i ] = helperContainer.getElementsByTagName( 'BUTTON' )[ i ];
                        }
                        helperItemsLength = helperItems.length + helperContainer.getElementsByTagName( 'INPUT' ).length;
                    }
                    
                    // focus on the filter element on open. 
                    if ( element[ 0 ].querySelector( '.inputFilter' ) ) {                        
                        element[ 0 ].querySelector( '.inputFilter' ).focus();    
                        $scope.tabIndex = $scope.tabIndex + helperItemsLength - 2;
                    }
                    // if there's no filter then just focus on the first checkbox item
                    else {                                                
                        formElements[ $scope.tabIndex ].focus();                                                
                    }                       

                    // open callback
                    $scope.onOpen();
                }                            
            }
            
            // handle clicks outside the button / multi select layer
            $scope.externalClickListener = function( e ) {                   

                var targetsArr = element.find( e.target.tagName );
                for (var i = 0; i < targetsArr.length; i++) {                                        
                    if ( e.target == targetsArr[i] ) {
                        return;
                    }
                }

                angular.element( checkBoxLayer.previousSibling ).removeClass( 'buttonClicked' );                    
                angular.element( checkBoxLayer ).removeClass( 'show' );
                angular.element( document ).off( 'click', $scope.externalClickListener ); 
                angular.element( document ).off( 'keydown', $scope.keyboardListener );                
                
                // close callback                
                $timeout( function() {
                    $scope.onClose();
                }, 0 );

                // set focus on button again
                element.children().children()[ 0 ].focus();
            }
   
            // select All / select None / reset buttons
            $scope.select = function( type, e ) {

                var helperIndex = helperItems.indexOf( e.target );
                $scope.tabIndex = helperIndex;

                switch( type.toUpperCase() ) {
                    case 'ALL':
                        angular.forEach( $scope.filteredModel, function( value, key ) {                            
                            if ( typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true ) {                                
                                if ( typeof value[ $scope.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = true;
                                }
                            }
                        });                            
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                  
                        $scope.onSelectAll();                                                
                        break;
                    case 'NONE':
                        angular.forEach( $scope.filteredModel, function( value, key ) {
                            if ( typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true ) {                        
                                if ( typeof value[ $scope.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = false;
                                }
                            }
                        });               
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                                          
                        $scope.onSelectNone();                        
                        break;
                    case 'RESET':            
                        angular.forEach( $scope.filteredModel, function( value, key ) {                            
                            if ( typeof value[ $scope.groupProperty ] === 'undefined' && typeof value !== 'undefined' && value[ $scope.disableProperty ] !== true ) {                        
                                var temp = value[ $scope.indexProperty ];                                
                                value[ $scope.tickProperty ] = $scope.backUp[ temp ][ $scope.tickProperty ];
                            }
                        });               
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                                          
                        $scope.onReset();                        
                        break;
                    case 'CLEAR':
                        $scope.tabIndex = $scope.tabIndex + 1;
                        $scope.onClear();    
                        break;
                    case 'FILTER':                        
                        $scope.tabIndex = helperItems.length - 1;
                        break;
                    default:                        
                }                                                                                 
            }            

            // just to create a random variable name                
            function genRandomString( length ) {                
                var possible    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                var temp        = '';
                for( var i=0; i < length; i++ ) {
                     temp += possible.charAt( Math.floor( Math.random() * possible.length ));
                }
                return temp;
            }

            // count leading spaces
            $scope.prepareGrouping = function() {
                var spacing     = 0;                                                
                angular.forEach( $scope.filteredModel, function( value, key ) {
                    value[ $scope.spacingProperty ] = spacing;                    
                    if ( value[ $scope.groupProperty ] === true ) {
                        spacing+=2;
                    }                    
                    else if ( value[ $scope.groupProperty ] === false ) {
                        spacing-=2;
                    }                 
                });
            }

            // prepare original index
            $scope.prepareIndex = function() {
                var ctr = 0;
                angular.forEach( $scope.filteredModel, function( value, key ) {
                    value[ $scope.indexProperty ] = ctr;
                    ctr++;
                });
            }

            // navigate using up and down arrow
            $scope.keyboardListener = function( e ) { 
                
                var key = e.keyCode ? e.keyCode : e.which;      
                var isNavigationKey = false;                                                

                // ESC key (close)
                if ( key === 27 ) {
                    e.preventDefault();                   
                    $scope.toggleCheckboxes( e );
                }                    
                
                // next element ( tab, down & right key )                    
                else if ( key === 40 || key === 39 || ( !e.shiftKey && key == 9 ) ) {                    
                    
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex++;                         
                    if ( $scope.tabIndex > formElements.length - 1 ) {
                        $scope.tabIndex = 0;
                        prevTabIndex = formElements.length - 1; 
                    }                                                            
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {                                                                        
                        $scope.tabIndex++;
                        if ( $scope.tabIndex > formElements.length - 1 ) {
                            $scope.tabIndex = 0;                            
                        }                                                                                    
                    }                                
                }
                
                // prev element ( shift+tab, up & left key )
                else if ( key === 38 || key === 37 || ( e.shiftKey && key == 9 ) ) { 
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex--;                              
                    if ( $scope.tabIndex < 0 ) {
                        $scope.tabIndex = formElements.length - 1;
                        prevTabIndex = 0;
                    }                                         
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {
                        $scope.tabIndex--;
                        if ( $scope.tabIndex < 0 ) {
                            $scope.tabIndex = formElements.length - 1;
                        }                                                                 
                    }                                 
                }                    

                if ( isNavigationKey === true ) {                                         

                    
                    e.preventDefault();

                    // set focus on the checkbox
                    formElements[ $scope.tabIndex ].focus();    
                    var actEl = document.activeElement;  
                    
                    if ( actEl.type.toUpperCase() === 'CHECKBOX' ) {                                                   
                        $scope.setFocusStyle( $scope.tabIndex );
                        $scope.removeFocusStyle( prevTabIndex );
                    }                    
                    else {
                        $scope.removeFocusStyle( prevTabIndex );
                        $scope.removeFocusStyle( helperItemsLength );
                        $scope.removeFocusStyle( formElements.length - 1 );
                    } 
                }

                isNavigationKey = false;
            }

            // set (add) CSS style on selected row
            $scope.setFocusStyle = function( tabIndex ) {                                
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().addClass( 'multiSelectFocus' );                        
            }

            // remove CSS style on selected row
            $scope.removeFocusStyle = function( tabIndex ) {
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().removeClass( 'multiSelectFocus' );
            }

            /*****************************************************
             *
             * Initializations
             *
             *****************************************************/
            
            // Unfortunately I need to add these grouping properties
            var tempStr = genRandomString( 5 );
            $scope.indexProperty = 'idx_' + tempStr;
            $scope.spacingProperty = 'spc_' + tempStr;         

            // set orientation css            
            if ( typeof attrs.orientation !== 'undefined' ) {

                if ( attrs.orientation.toUpperCase() === 'HORIZONTAL' ) {                    
                    $scope.orientationH = true;
                    $scope.orientationV = false;
                }
                else 
                {
                    $scope.orientationH = false;
                    $scope.orientationV = true;
                }
            }            

            // get elements required for DOM operation
            checkBoxLayer = element.children().children().next()[0];

            // set max-height property if provided
            if ( typeof attrs.maxHeight !== 'undefined' ) {                
                var layer = element.children().children().children()[0];
                angular.element( layer ).attr( "style", "height:" + $scope.maxHeight + "; overflow-y:scroll;" );                                
            }

            // icons.. I guess you can use <img> tag here if you want to. 
            var icon        = {};
            icon.selectAll  = '&#10003;'    // a tick icon
            icon.selectNone = '&times;'     // x icon
            icon.reset      = '&#8630;'     // undo icon

            // configurable button labels                       
            if ( typeof attrs.translation !== 'undefined' ) {
                $scope.lang.selectAll       = $sce.trustAsHtml( icon.selectAll  + '&nbsp;&nbsp;' + $scope.translation.selectAll );
                $scope.lang.selectNone      = $sce.trustAsHtml( icon.selectNone + '&nbsp;&nbsp;' + $scope.translation.selectNone );
                $scope.lang.reset           = $sce.trustAsHtml( icon.reset      + '&nbsp;&nbsp;' + $scope.translation.reset );
                $scope.lang.search          = $scope.translation.search;                
                $scope.lang.nothingSelected = $sce.trustAsHtml( $scope.translation.nothingSelected );                
            }
            else {
                $scope.lang.selectAll       = $sce.trustAsHtml( icon.selectAll  + '&nbsp;&nbsp;Select All' );                
                $scope.lang.selectNone      = $sce.trustAsHtml( icon.selectNone + '&nbsp;&nbsp;Select None' );
                $scope.lang.reset           = $sce.trustAsHtml( icon.reset      + '&nbsp;&nbsp;Reset' );
                $scope.lang.search          = 'Search...';
                $scope.lang.nothingSelected = 'None Selected';                
            }
                
            // min length of keyword to trigger the filter function
            if ( typeof attrs.MinSearchLength !== 'undefined' && parseInt( attrs.MinSearchLength ) > 0 ) {
                vMinSearchLength = Math.floor( parseInt( attrs.MinSearchLength ) );
            }

            /****************************************************
             *
             * Logic starts here, initiated by watch 1 & watch 2
             *
             ****************************************************/
            
            // watch1, for changes in input model property
            // updates multi-select when user select/deselect a single checkbox programatically
            // https://github.com/isteven/angular-multi-select/issues/8
            $scope.$watch( 'inputModel' , function( newVal ) {                                 
                if ( newVal ) {                    
                    $scope.localModel = angular.copy( $scope.inputModel );                   
                    $scope.refreshOutputModel();                                    
                    $scope.refreshButton();                                                  
                }
            }, true );

            // watch2 for changes in input model as a whole
            // this on updates the multi-select when a user load a whole new input-model. We also update the $scope.backUp variable
            $scope.$watch( 'localModel' , function( newVal ) {  
                if ( newVal ) {
                    $scope.backUp = angular.copy( $scope.localModel );    
                    $scope.updateFilter();
                    $scope.prepareGrouping();
                    $scope.prepareIndex();                                                              
                    $scope.refreshOutputModel();                
                    $scope.refreshButton();                                                                                                                 
                }
            });            

            // watch for changes in directive state (disabled or enabled)
            $scope.$watch( 'isDisabled' , function( newVal ) {         
                $scope.isDisabled = newVal;                               
            });            

            // this is for touch enabled devices. We don't want to hide checkboxes on scroll. 
            angular.element( document ).on( 'touchstart', function( e ) { 
                $scope.$apply( function() {
                    scrolled = false;
                }); 
            });
            
            // also for touch enabled devices
            angular.element( document ).on( 'touchmove', function( e ) { 
                $scope.$apply( function() {
                    scrolled = true;                
                });
            });                                   
        }
    }
}]);

