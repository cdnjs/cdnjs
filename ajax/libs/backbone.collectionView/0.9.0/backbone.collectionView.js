/*!
* Backbone.CollectionView, v0.9.0
* Copyright (c)2013 Rotunda Software, LLC.
* Distributed under MIT license
* http://github.com/rotundasoftware/backbone-collection-view
*/

(function() {
	var mDefaultModelViewConstructor = Backbone.View;

	var kDefaultReferenceBy = "model";

	var kOptionsRequiringRerendering = [ "collection", "modelView", "modelViewOptions", "itemTemplate", "selectableModelsFilter", "sortableModelsFilter", "visibleModelsFilter", "itemTemplateFunction", "detachedRendering", "sortableOptions" ];

	var kStylesForEmptyListCaption = {
		"background" : "transparent",
		"border" : "none",
		"box-shadow" : "none"
	};

	Backbone.CollectionView = Backbone.View.extend( {

		tagName : "ul",

		events : {
			"mousedown li, td" : "_listItem_onMousedown",
			"dblclick li, td" : "_listItem_onDoubleClick",
			"click" : "_listBackground_onClick",
			"click ul.collection-list, table.collection-list" : "_listBackground_onClick",
			"keydown" : "_onKeydown"
		},

		// only used if Backbone.Courier is available
		spawnMessages : {
			"focus" : "focus"
		},

		//only used if Backbone.Courier is available
		passMessages : { "*" : "." },
		
		// viewOption definitions with default values.
		initializationOptions : [ { "collection" : new Backbone.Collection() },
					  { "modelView" : null },
					  { "modelViewOptions" : {} },
					  { "itemTemplate" : null },
					  { "itemTemplateFunction" : null },
					  { "selectable" : true },
					  { "clickToSelect" : true },
					  { "selectableModelsFilter" : null },
					  { "visibleModelsFilter" : null },
					  { "sortableModelsFilter" : null },
					  { "selectMultiple" : false },
					  { "clickToToggle" : false },
					  { "processKeyEvents" : true },
					  { "sortable" : false },
					  { "sortableOptions" : null },
					  { "detachedRendering" : false },
					  { "emptyListCaption" : null }
		],

		initialize : function( options ) {
			Backbone.ViewOptions.add( this, "initializationOptions" ); // setup the ViewOptions functionality.
			this.setOptions( options ); // and make use of any provided options

			this._hasBeenRendered = false;

			if( this._isBackboneCourierAvailable() ) {
				Backbone.Courier.add( this );
			}

			this.$el.data( "view", this ); // needed for connected sortable lists
			this.$el.addClass( "collection-list" );
			if( this.selectable ) this.$el.addClass( "selectable" );

			if( this.processKeyEvents )
				this.$el.attr( "tabindex", 0 ); // so we get keyboard events

			this.selectedItems = [];

			this._updateItemTemplate();

			if( this.collection )
				this._registerCollectionEvents();

			this.viewManager = new ChildViewContainer();
		},

		onOptionsChanged : function( changedOptions, originalOptions ) {
			var rerender = false;
			var _this = this;
			_.each( _.keys( changedOptions ), function( changedOptionKey ) {
				var newVal = changedOptions[ changedOptionKey ];
				var oldVal = originalOptions[ changedOptionKey ];
				switch( changedOptionKey ) {
					case "collection" :
						if ( newVal !== oldVal ) {
							_this.stopListening( oldVal );
							_this._registerCollectionEvents();
						}
						break;
					case "selectMultiple":
						if( ! newVal && _this.selectedItems.length > 1 )
							_this.setSelectedModel( _.first( _this.selectedItems ), { by : "cid" } );
						break;
					case "selectable" :
						if( ! newVal && _this.selectedItems.length > 0 )
							_this.setSelectedModels( [] );
						break;
					case "selectableModelsFilter" :
						if( newVal && _.isFunction( newVal ) )
							_this._validateSelection();
						break;
					case "itemTemplate" :
						_this._updateItemTemplate();
						break;
					case "processKeyEvents" :
						if( newVal ) _this.$el.attr( "tabindex", 0 ); // so we get keyboard events
						break;
					case "modelView" :
						//need to remove all old view instances
						_this.viewManager.each( function( view ) {
							_this.viewManager.remove( view );
							// destroy the View itself
							view.remove();
						} );
						break;
				}
				if( _.contains( kOptionsRequiringRerendering, changedOptionKey ) ) rerender = true;
			});
			if( this._hasBeenRendered && rerender ) { 
				this.render(); // Rerender the view if the rerender flag has been set.
			}
		},

		setOption : function( optionName, optionValue ) { // now is mearly a wrapper around backbone.viewOptions' setOptions()
			var optionHash = {};
			optionHash[ optionName ] = optionValue;
			this.setOptions( optionHash );
		},

		getSelectedModel : function( options ) {
			return _.first( this.getSelectedModels( options ) );
		},

		getSelectedModels : function ( options ) {
			var _this = this;

			options = _.extend( {}, {
				by : kDefaultReferenceBy
			}, options );

			var referenceBy = options.by;
			var items = [];

			switch( referenceBy ) {
				case "id" :
					_.each( this.selectedItems, function ( item ) {
						items.push( _this.collection.get( item ).id );
					} );
					break;
				case "cid" :
					items = items.concat( this.selectedItems );
					break;
				case "offset" :
					var curLineNumber = 0;

					var itemElements = this._getVisibleItemEls();

					itemElements.each( function() {
						var thisItemEl = $( this );
						if( thisItemEl.is( ".selected" ) )
							items.push( curLineNumber );
						curLineNumber++;
					} );
					break;
				case "model" :
					_.each( this.selectedItems, function ( item ) {
						items.push( _this.collection.get( item ) );
					} );
					break;
				case "view" :
					_.each( this.selectedItems, function ( item ) {
						items.push( _this.viewManager.findByModel( _this.collection.get( item ) ) );
					} );
					break;
			}

			return items;

		},

		setSelectedModels : function( newSelectedItems, options ) {
			if( ! _.isArray( newSelectedItems ) ) throw "Invalid parameter value";
			if( ! this.selectable && newSelectedItems.length > 0 ) return; // used to throw error, but there are some circumstances in which a list can be selectable at times and not at others, don't want to have to worry about catching errors

			options = _.extend( {}, {
				silent : false,
				by : kDefaultReferenceBy
			}, options );

			var referenceBy = options.by;
			var newSelectedCids = [];

			switch( referenceBy ) {
				case "cid" :
					newSelectedCids = newSelectedItems;
					break;
				case "id" :
					this.collection.each( function( thisModel ) {
						if( _.contains( newSelectedItems, thisModel.id ) ) newSelectedCids.push( thisModel.cid );
					} );
					break;
				case "model" :
					newSelectedCids = _.pluck( newSelectedItems, "cid" );
					break;
				case "view" :
					_.each( newSelectedItems, function( item ) {
						newSelectedCids.push( item.model.cid );
					} );
					break;
				case "offset" :
					var curLineNumber = 0;
					var selectedItems = [];

					var itemElements = this._getVisibleItemEls();
					itemElements.each( function() {
						var thisItemEl = $( this );
						if( _.contains( newSelectedItems, curLineNumber ) )
							newSelectedCids.push( thisItemEl.attr( "data-model-cid" ) );
						curLineNumber++;
					} );
					break;
			}

			var oldSelectedModels = this.getSelectedModels();
			var oldSelectedCids = _.clone( this.selectedItems );

			this.selectedItems = this._convertStringsToInts( newSelectedCids );
			this._validateSelection();

			var newSelectedModels = this.getSelectedModels();

			if( ! this._containSameElements( oldSelectedCids, this.selectedItems ) )
			{
				this._addSelectedClassToSelectedItems( oldSelectedCids );

				if( ! options.silent )
				{
					this.trigger( "selectionChanged", newSelectedModels, oldSelectedModels );
					if( this._isBackboneCourierAvailable() ) {
						this.spawn( "selectionChanged", {
							selectedModels : newSelectedModels,
							oldSelectedModels : oldSelectedModels
						} );
					}
				}

				this.updateDependentControls();
			}
		},

		setSelectedModel : function( newSelectedItem, options ) {
			if( ! newSelectedItem && newSelectedItem !== 0 )
				this.setSelectedModels( [], options );
			else
				this.setSelectedModels( [ newSelectedItem ], options );
		},

		render : function(){
			var _this = this;

			this._hasBeenRendered = true;

			if( this.selectable ) this._saveSelection();

			var modelViewContainerEl;

			// If collection view element is a table and it has a tbody
			// within it, render the model views inside of the tbody
			modelViewContainerEl = this._getContainerEl();

			var oldViewManager = this.viewManager;
			this.viewManager = new ChildViewContainer();

			// detach each of our subviews that we have already created to represent models
			// in the collection. We are going to re-use the ones that represent models that
			// are still here, instead of creating new ones, so that we don't loose state
			// information in the views.
			oldViewManager.each( function( thisModelView ) {
				// to boost performance, only detach those views that will be sticking around.
				// we won't need the other ones later, so no need to detach them individually.
				if( _this.collection.get( thisModelView.model.cid ) )
					thisModelView.$el.detach();
				else
					thisModelView.remove();
			} );

			modelViewContainerEl.empty();
			var fragmentContainer;

			if( this.detachedRendering )
				fragmentContainer = document.createDocumentFragment();

			this.collection.each( function( thisModel ) {
				var thisModelView = oldViewManager.findByModelCid( thisModel.cid );
				if( _.isUndefined( thisModelView ) ) {
					// if the model view has not already been created on a
					// previous render then create and initialize it now.
					thisModelView = this._createNewModelView( thisModel, this._getModelViewOptions( thisModel ) );
				}

				this._insertAndRenderModelView( thisModelView, fragmentContainer || modelViewContainerEl );
			}, this );

			if( this.detachedRendering )
				modelViewContainerEl.append( fragmentContainer );

			if( this.sortable )
			{
				var sortableOptions = _.extend( {
					axis: "y",
					distance: 10,
					forcePlaceholderSize : true,
					start : _.bind( this._sortStart, this ),
					change : _.bind( this._sortChange, this ),
					stop : _.bind( this._sortStop, this ),
					receive : _.bind( this._receive, this ),
					over : _.bind( this._over, this )
				}, _.result( this, "sortableOptions" ) );

				if( _this._isRenderedAsTable() ) {
					sortableOptions.items = "> tbody > tr:not(.not-sortable)";
				}
				else if( _this._isRenderedAsList() ) {
					sortableOptions.items = "> li:not(.not-sortable)";
				}

				this.$el = this.$el.sortable( sortableOptions );
			}

			this._showEmptyListCaptionIfAppropriate();

			this.trigger( "render" );
			if( this._isBackboneCourierAvailable() )
				this.spawn( "render" );

			if( this.selectable ) {
				this._restoreSelection();
				this.updateDependentControls();
			}

			if( _.isFunction( this.onAfterRender ) )
				this.onAfterRender();
		},

		_showEmptyListCaptionIfAppropriate : function ( ) {
			if( this.emptyListCaption ) {
				var visibleEls = this._getVisibleItemEls();

				if( visibleEls.length === 0 ) {
					var emptyListString;

					if( _.isFunction( this.emptyListCaption ) )
						emptyListString = this.emptyListCaption();
					else
						emptyListString = this.emptyListCaption;

					var $emptyCaptionEl;
					var $varEl = $( "<var class='empty-list-caption'>" + emptyListString + "</var>" );

					//need to wrap the empty caption to make it fit the rendered list structure (either with an li or a tr td)
					if( this._isRenderedAsList() )
						$emptyListCaptionEl = $varEl.wrapAll( "<li class='not-sortable'></li>" ).parent().css( kStylesForEmptyListCaption );
					else
						$emptyListCaptionEl = $varEl.wrapAll( "<tr class='not-sortable'><td></td></tr>" ).parent().parent().css( kStylesForEmptyListCaption );
					
					this._getContainerEl().append( $emptyListCaptionEl );
				}
			}
		},

		_removeEmptyListCaption : function( ) {
			if( this._isRenderedAsList() )
				this._getContainerEl().find( "> li > var.empty-list-caption" ).parent().remove();
			else
				this._getContainerEl().find( "> tr > td > var.empty-list-caption" ).parent().parent().remove();
		},

		// Render a single model view in container object "parentElOrDocumentFragment", which is either 
		// a documentFragment or a jquery object. optional arg atIndex is not support for document fragments.
		_insertAndRenderModelView : function( modelView, parentElOrDocumentFragment, atIndex ) {
			var thisModelViewWrapped = this._wrapModelView( modelView );

			if( parentElOrDocumentFragment.nodeType === 11 ) // if we are inserting into a document fragment, we need to use the DOM appendChild method
				parentElOrDocumentFragment.appendChild( thisModelViewWrapped.get( 0 ) );
			else if( ! _.isUndefined( atIndex ) && atIndex > 0 && atIndex < this.collection.length - 1 )
				parentElOrDocumentFragment.children().eq( atIndex ).before( thisModelViewWrapped );
			else
				parentElOrDocumentFragment.append( thisModelViewWrapped );

			// we have to render the modelView after it has been put in context, as opposed to in the
			// initialize function of the modelView, because some rendering might be dependent on
			// the modelView's context in the DOM tree. For example, if the modelView stretch()'s itself,
			// it must be in full context in the DOM tree or else the stretch will not behave as intended.
			var renderResult = modelView.render();

			// return false from the view's render function to hide this item
			if( renderResult === false ) {
				thisModelViewWrapped.hide();
				thisModelViewWrapped.addClass( "not-visible" );
			}
			
			var hideThisModelView = false;
			if( _.isFunction( this.visibleModelsFilter ) ) {
				hideThisModelView = ! this.visibleModelsFilter( modelView.model );
				if( hideThisModelView ) {
					if( thisModelViewWrapped.children().length === 1 )
						thisModelViewWrapped.hide();
					else modelView.$el.hide();

					thisModelViewWrapped.addClass( "not-visible" );
				}
			}

			if( ! hideThisModelView && this.emptyListCaption ) this._removeEmptyListCaption();

			this.viewManager.add( modelView );
		},

		updateDependentControls : function() {
			this.trigger( "updateDependentControls", this.getSelectedModels() );
			if( this._isBackboneCourierAvailable() ) {
				this.spawn( "updateDependentControls", {
					selectedModels : this.getSelectedModels()
				} );
			}
		},

		// Override `Backbone.View.remove` to also destroy all Views in `viewManager`
		remove : function() {
			this.viewManager.each( function( view ) {
				view.remove();
			} );

			Backbone.View.prototype.remove.apply( this, arguments );
		},

		// A method to remove the view relating to model.
		_removeModelView : function( model ) {
			var viewManager = this.viewManager;
			var view = viewManager.findByModelCid( model.cid );

			if ( this.selectable ) this._saveSelection();

			viewManager.remove( view ); // Remove the view from the viewManager
			view.remove(); // Remove the view from the DOM
			this._getContainerEl().children( "[data-model-cid=" + model.cid + "]" ).remove(); // Remove the wrapper from the DOM

			if ( this.selectable ) this._restoreSelection();

			this._showEmptyListCaptionIfAppropriate();
		},

		_validateSelectionAndRender : function() {
			this._validateSelection();
			this.render();
		},

		_registerCollectionEvents : function() {
			this.listenTo( this.collection, "add", function( model ) {
				if( this._hasBeenRendered ) {
					var modelView = this._createNewModelView( model, this._getModelViewOptions( model ) );
					this._insertAndRenderModelView( modelView, this._getContainerEl(), this.collection.indexOf( model ) );
				}

				if( this._isBackboneCourierAvailable() )
					this.spawn( "add" );
			} );

			this.listenTo( this.collection, "remove", function( model ) {
				if( this._hasBeenRendered )
					this._removeModelView( model );

				if( this._isBackboneCourierAvailable() )
					this.spawn( "remove" );
			} );

			this.listenTo( this.collection, "reset", function() {
				if( this._hasBeenRendered ) this.render();
				if( this._isBackboneCourierAvailable() )
					this.spawn( "reset" );
			} );

			// we should not be listening to change events on the model as a default behavior. the models
			// should be responsible for re-rendering themselves if necessary, and if the collection does
			// also need to re-render as a result of a model change, this should be handled by overriding
			// this method. by default the collection view should not re-render in response to model changes
			// this.listenTo( this.collection, "change", function( model ) {
			// 	if( this._hasBeenRendered ) this.viewManager.findByModel( model ).render();
			// 	if( this._isBackboneCourierAvailable() )
			// 		this.spawn( "change", { model : model } );
			// } );

			this.listenTo( this.collection, "sort", function( collection, options ) {
				if( this._hasBeenRendered && options.add !== true ) this.render();
				if( this._isBackboneCourierAvailable() )
					this.spawn( "sort" );
			} );
		},

		_getContainerEl : function() {
			if ( this._isRenderedAsTable() ) {
				// not all tables have a tbody, so we test
				var tbody = this.$el.find( "> tbody" );
				if ( tbody.length > 0 )
					return tbody;
			}
			return this.$el;
		},

		_getClickedItemId : function( theEvent ) {
			var clickedItemId = null;

			// important to use currentTarget as opposed to target, since we could be bubbling
			// an event that took place within another collectionList
			var clickedItemEl = $( theEvent.currentTarget );
			if( clickedItemEl.closest( ".collection-list" ).get(0) !== this.$el.get(0) ) return;

			// determine which list item was clicked. If we clicked in the blank area
			// underneath all the elements, we want to know that too, since in this
			// case we will want to deselect all elements. so check to see if the clicked
			// DOM element is the list itself to find that out.
			var clickedItem = clickedItemEl.closest( "[data-model-cid]" );
			if( clickedItem.length > 0 )
			{
				clickedItemId = clickedItem.attr( "data-model-cid" );
				if( $.isNumeric( clickedItemId ) ) clickedItemId = parseInt( clickedItemId, 10 );
			}

			return clickedItemId;
		},

		_updateItemTemplate : function() {
			var itemTemplateHtml;
			if( this.itemTemplate )
			{
				if( $( this.itemTemplate ).length === 0 )
					throw "Could not find item template from selector: " + this.itemTemplate;

				itemTemplateHtml = $( this.itemTemplate ).html();
			}
			else
				itemTemplateHtml = this.$( ".item-template" ).html();

			if( itemTemplateHtml ) this.itemTemplateFunction = _.template( itemTemplateHtml );

		},

		_validateSelection : function() {
			// note can't use the collection's proxy to underscore because "cid" is not an attribute,
			// but an element of the model object itself.
			var modelReferenceIds = _.pluck( this.collection.models, "cid" );
			this.selectedItems = _.intersection( modelReferenceIds, this.selectedItems );

			if( _.isFunction( this.selectableModelsFilter ) )
			{
				this.selectedItems = _.filter( this.selectedItems, function( thisItemId ) {
					return this.selectableModelsFilter.call( this, this.collection.get( thisItemId ) );
				}, this );
			}
		},

		_saveSelection : function() {
			// save the current selection. use restoreSelection() to restore the selection to the state it was in the last time saveSelection() was called.
			if( ! this.selectable ) throw "Attempt to save selection on non-selectable list";
			this.savedSelection = {
				items : _.clone( this.selectedItems ),
				offset : this.getSelectedModel( { by : "offset" } )
			};
		},

		_restoreSelection : function() {
			if( ! this.savedSelection ) throw "Attempt to restore selection but no selection has been saved!";

			// reset selectedItems to empty so that we "redraw" all "selected" classes
			// when we set our new selection. We do this because it is likely that our
			// contents have been refreshed, and we have thus lost all old "selected" classes.
			this.setSelectedModels( [], { silent : true } );

			if( this.savedSelection.items.length > 0 )
			{
				// first try to restore the old selected items using their reference ids.
				this.setSelectedModels( this.savedSelection.items, { by : "cid", silent : true } );

				// all the items with the saved reference ids have been removed from the list.
				// ok. try to restore the selection based on the offset that used to be selected.
				// this is the expected behavior after a item is deleted from a list (i.e. select
				// the line that immediately follows the deleted line).
				if( this.selectedItems.length === 0 )
					this.setSelectedModel( this.savedSelection.offset, { by : "offset" } );

				// Trigger a selection changed if the previously selected items were not all found
				if (this.selectedItems.length !== this.savedSelection.items.length)
				{
					this.trigger( "selectionChanged", this.getSelectedModels(), [] );
					if( this._isBackboneCourierAvailable() ) {
						this.spawn( "selectionChanged", {
							selectedModels : this.getSelectedModels(),
							oldSelectedModels : []
						} );
					}
				}
			}

			delete this.savedSelection;
		},

		_addSelectedClassToSelectedItems : function( oldItemsIdsWithSelectedClass ) {
			if( _.isUndefined( oldItemsIdsWithSelectedClass ) ) oldItemsIdsWithSelectedClass = [];

			// oldItemsIdsWithSelectedClass is used for optimization purposes only. If this info is supplied then we
			// only have to add / remove the "selected" class from those items that "selected" state has changed.

			var itemsIdsFromWhichSelectedClassNeedsToBeRemoved = oldItemsIdsWithSelectedClass;
			itemsIdsFromWhichSelectedClassNeedsToBeRemoved = _.without( itemsIdsFromWhichSelectedClassNeedsToBeRemoved, this.selectedItems );

			_.each( itemsIdsFromWhichSelectedClassNeedsToBeRemoved, function( thisItemId ) {
				this._getContainerEl().find( "[data-model-cid=" + thisItemId + "]" ).removeClass( "selected" );
			}, this );

			var itemsIdsFromWhichSelectedClassNeedsToBeAdded = this.selectedItems;
			itemsIdsFromWhichSelectedClassNeedsToBeAdded = _.without( itemsIdsFromWhichSelectedClassNeedsToBeAdded, oldItemsIdsWithSelectedClass );

			_.each( itemsIdsFromWhichSelectedClassNeedsToBeAdded, function( thisItemId ) {
				this._getContainerEl().find( "[data-model-cid=" + thisItemId + "]" ).addClass( "selected" );
			}, this );
		},

		_reorderCollectionBasedOnHTML : function() {
			var _this = this;

			this._getContainerEl().children().each( function() {
				var thisModelCid = $( this ).attr( "data-model-cid" );

				if( thisModelCid )
				{
					// remove the current model and then add it back (at the end of the collection).
					// When we are done looping through all models, they will be in the correct order.
					var thisModel = _this.collection.get( thisModelCid );
					if( thisModel )
					{
						_this.collection.remove( thisModel, { silent : true } );
						_this.collection.add( thisModel, { silent : true, sort : ! _this.collection.comparator } );
					}
				}
			} );

			this.collection.trigger( "reorder" );

			if( this._isBackboneCourierAvailable() ) this.spawn( "reorder" );

			if( this.collection.comparator ) this.collection.sort();

		},

		_getModelViewConstructor : function( thisModel ) {
			return this.modelView || mDefaultModelViewConstructor;
		},

		_getModelViewOptions : function( thisModel ) {
			return _.extend( { model : thisModel }, this.modelViewOptions );
		},

		_createNewModelView : function( model, modelViewOptions ) {
			var modelViewConstructor = this._getModelViewConstructor( model );
			if( _.isUndefined( modelViewConstructor ) ) throw "Could not find modelView constructor for model";

			var newModelView = new( modelViewConstructor )( modelViewOptions );
			newModelView.collectionListView = this;

			return newModelView;
		},

		_wrapModelView : function( modelView ) {
			var _this = this;

			// we use items client ids as opposed to real ids, since we may not have a representation
			// of these models on the server
			var wrappedModelView;

			if( this._isRenderedAsTable() ) {
				// if we are rendering the collection in a table, the template $el is a tr so we just need to set the data-model-cid
				wrappedModelView = modelView.$el.attr( "data-model-cid", modelView.model.cid );
			}
			else if( this._isRenderedAsList() ) {
				// if we are rendering the collection in a list, we need wrap each item in an <li></li> (if its not already an <li>)
				// and set the data-model-cid
				if( modelView.$el.prop( "tagName" ).toLowerCase() === "li" ) {
					wrappedModelView = modelView.$el.attr( "data-model-cid", modelView.model.cid );
				} else {
					wrappedModelView = modelView.$el.wrapAll( "<li data-model-cid='" + modelView.model.cid + "'></li>" ).parent();
				}
			}

			if( _.isFunction( this.sortableModelsFilter ) )
				if( ! this.sortableModelsFilter.call( _this, modelView.model ) )
					wrappedModelView.addClass( "not-sortable" );

			if( _.isFunction( this.selectableModelsFilter ) )
				if( ! this.selectableModelsFilter.call( _this, modelView.model ) )
					wrappedModelView.addClass( "not-selectable" );

			return wrappedModelView;
		},

		_convertStringsToInts : function( theArray ) {
			return _.map( theArray, function( thisEl ) {
				if( ! _.isString( thisEl ) ) return thisEl;
				var thisElAsNumber = parseInt( thisEl, 10 );
				return( thisElAsNumber == thisEl ? thisElAsNumber : thisEl );
			} );
		},

		_containSameElements : function( arrayA, arrayB ) {
			if( arrayA.length != arrayB.length ) return false;
			var intersectionSize = _.intersection( arrayA, arrayB ).length;
			return intersectionSize == arrayA.length; // and must also equal arrayB.length, since arrayA.length == arrayB.length
		},

		_isRenderedAsTable : function() {
			return this.$el.prop( "tagName" ).toLowerCase() === "table";
		},

		_isRenderedAsList : function() {
			return ! this._isRenderedAsTable();
		},

		// Returns the wrapper HTML element for each visible modelView.
		// When rendering in a table context, the returned elements are the $el of each modelView.
		// When rendering in a list context,
		//   If the $el of the modelView is an <li>, the returned elements are the $el of each modelView.
		//   Otherwise, the returned elements are the <li>'s the collectionView wrapped around each modelView $el.
		_getVisibleItemEls : function() {
			var itemElements = [];
			itemElements = this._getContainerEl().find( "> [data-model-cid]:not(.not-visible)" );

			return itemElements;
		},

		_charCodes : {
			upArrow : 38,
			downArrow : 40
		},

		_isBackboneCourierAvailable : function() {
			return !_.isUndefined( Backbone.Courier );
		},

		_sortStart : function( event, ui ) {
			var modelBeingSorted = this.collection.get( ui.item.attr( "data-model-cid" ) );
			this.trigger( "sortStart", modelBeingSorted );
			if( this._isBackboneCourierAvailable() )
				this.spawn( "sortStart", { modelBeingSorted : modelBeingSorted } );
		},

		_sortChange : function( event, ui ) {
			var modelBeingSorted = this.collection.get( ui.item.attr( "data-model-cid" ) );
			this.trigger( "sortChange", modelBeingSorted );
			if( this._isBackboneCourierAvailable() )
				this.spawn( "sortChange", { modelBeingSorted : modelBeingSorted } );
		},

		_sortStop : function( event, ui ) {
			var modelBeingSorted = this.collection.get( ui.item.attr( "data-model-cid" ) );
			var modelViewContainerEl = this._getContainerEl();
			var newIndex = modelViewContainerEl.children().index( ui.item );

			if( newIndex == -1 ) {
				// the element was removed from this list. can happen if this sortable is connected
				// to another sortable, and the item was dropped into the other sortable.
				this.collection.remove( modelBeingSorted );
			}

			this._reorderCollectionBasedOnHTML();
			this.updateDependentControls();
			this.trigger( "sortStop", modelBeingSorted, newIndex );
			if( this._isBackboneCourierAvailable() )
				this.spawn( "sortStop", { modelBeingSorted : modelBeingSorted, newIndex : newIndex } );
		},

		_receive : function( event, ui ) {
			var senderListEl = ui.sender;
			var senderCollectionListView = senderListEl.data( "view" );
			if( ! senderCollectionListView || ! senderCollectionListView.collection ) return;

			var newIndex = this._getContainerEl().children().index( ui.item );
			var modelReceived = senderCollectionListView.collection.get( ui.item.attr( "data-model-cid" ) );
			senderCollectionListView.collection.remove( modelReceived );
			this.collection.add( modelReceived, { at : newIndex } );
			modelReceived.collection = this.collection; // otherwise will not get properly set, since modelReceived.collection might already have a value.
			this.setSelectedModel( modelReceived );
		},

		_over : function( event, ui ) {
			// when an item is being dragged into the sortable,
			// hide the empty list caption if it exists
			this._getContainerEl().find( "> var.empty-list-caption" ).hide();
		},

		_onKeydown : function( event ) {
			if( ! this.processKeyEvents ) return true;

			var trap = false;

			if( this.getSelectedModels( { by : "offset" } ).length == 1 )
			{
				// need to trap down and up arrows or else the browser
				// will end up scrolling a autoscroll div.

				var currentOffset = this.getSelectedModel( { by : "offset" } );
				if( event.which === this._charCodes.upArrow && currentOffset !== 0 )
				{
					this.setSelectedModel( currentOffset - 1, { by : "offset" } );
					trap = true;
				}
				else if( event.which === this._charCodes.downArrow && currentOffset !== this.collection.length - 1 )
				{
					this.setSelectedModel( currentOffset + 1, { by : "offset" } );
					trap = true;
				}
			}

			return ! trap;
		},

		_listItem_onMousedown : function( theEvent ) {
			if( ! this.selectable || ! this.clickToSelect ) return;

			var clickedItemId = this._getClickedItemId( theEvent );

			if( clickedItemId )
			{
				// Exit if an unselectable item was clicked
				if( _.isFunction( this.selectableModelsFilter ) &&
					! this.selectableModelsFilter.call( this, this.collection.get( clickedItemId ) ) )
				{
					return;
				}

				// a selectable list item was clicked
				if( this.selectMultiple && theEvent.shiftKey )
				{
					var firstSelectedItemIndex = -1;

					if( this.selectedItems.length > 0 )
					{
						this.collection.find( function( thisItemModel ) {
							firstSelectedItemIndex++;

							// exit when we find our first selected element
							return _.contains( this.selectedItems, thisItemModel.cid );
						}, this );
					}

					var clickedItemIndex = -1;
					this.collection.find( function( thisItemModel ) {
						clickedItemIndex++;

						// exit when we find the clicked element
						return thisItemModel.cid == clickedItemId;
					}, this );

					var shiftKeyRootSelectedItemIndex = firstSelectedItemIndex == -1 ? clickedItemIndex : firstSelectedItemIndex;
					var minSelectedItemIndex = Math.min( clickedItemIndex, shiftKeyRootSelectedItemIndex );
					var maxSelectedItemIndex = Math.max( clickedItemIndex, shiftKeyRootSelectedItemIndex );

					var newSelectedItems = [];
					for( var thisIndex = minSelectedItemIndex; thisIndex <= maxSelectedItemIndex; thisIndex ++ )
						newSelectedItems.push( this.collection.at( thisIndex ).cid );
					this.setSelectedModels( newSelectedItems, { by : "cid" } );

					// shift clicking will usually highlight selectable text, which we do not want.
					// this is a cross browser (hopefully) snippet that deselects all text selection.
					if( document.selection && document.selection.empty )
						document.selection.empty();
					else if(window.getSelection) {
						var sel = window.getSelection();
						if( sel && sel.removeAllRanges )
							sel.removeAllRanges();
					}
				}
				else if( this.selectMultiple && ( this.clickToToggle || theEvent.metaKey ) )
				{
					if( _.contains( this.selectedItems, clickedItemId ) )
						this.setSelectedModels( _.without( this.selectedItems, clickedItemId ), { by : "cid" } );
					else this.setSelectedModels( _.union( this.selectedItems, clickedItemId ), { by : "cid" } );
				}
				else
					this.setSelectedModels( [ clickedItemId ], { by : "cid" } );
			}
			else
				// the blank area of the list was clicked
				this.setSelectedModels( [] );

		},

		_listItem_onDoubleClick : function( theEvent ) {
			var clickedItemId = this._getClickedItemId( theEvent );

			if( clickedItemId )
			{
				var clickedModel = this.collection.get( clickedItemId );
				this.trigger( "doubleClick", clickedModel );
				if( this._isBackboneCourierAvailable() )
					this.spawn( "doubleClick", { clickedModel : clickedModel } );
			}
		},

		_listBackground_onClick : function( theEvent ) {
			if( ! this.selectable ) return;
			if( ! $( theEvent.target ).is( ".collection-list" ) ) return;

			this.setSelectedModels( [] );
		}

	}, {
		setDefaultModelViewConstructor : function( theConstructor ) {
			mDefaultModelViewConstructor = theConstructor;
		}
	});

	// Backbone.ViewOptions
	// --------------------
	// v0.2.0
	//
	// Copyright (c)2014 Rotunda Software
	//
	// https://github.com/rotundasoftware/backbone.viewOptions

	// Backbone.ViewOptions
	// --------------------
	//
	// An plugin to declare and get/set options on views.

	/*
	 * Backbone.ViewOptions, v0.2
	 * Copyright (c)2014 Rotunda Software, LLC.
	 * Distributed under MIT license
	 * http://github.com/rotundasoftware/backbone.viewOptions
	 */

	Backbone.ViewOptions = {};
		
	Backbone.ViewOptions.add = function( view, optionsDeclarationsProperty ) {
		if( _.isUndefined( optionsDeclarationsProperty ) ) optionsDeclarationsProperty = "options";
		
		// ****************** Public methods added to view ****************** 
		
		view.setOptions = function( options ) {
			var _this = this;
			var optionsThatWereChanged = {};
			var optionsThatWereChangedOriginalValues = {};

			var optionDeclarations = _.result( this, optionsDeclarationsProperty );

			if( ! _.isUndefined( optionDeclarations ) ) {
				var normalizedOptionDeclarations = _normalizeOptionDeclarations( optionDeclarations );

				_.each( normalizedOptionDeclarations, function( thisOptionDeclaration ) {
					thisOptionName = thisOptionDeclaration.name;
					thisOptionRequired = thisOptionDeclaration.required;
					thisOptionDefaultValue = thisOptionDeclaration.defaultValue;
					
					if( thisOptionRequired ) {
						// note we do not throw an error if a required option is not supplied, but it is  
						// found on the object itself (due to a prior call of view.setOptions, most likely)
						if( ! options ||
						    ( ( ! _.contains( _.keys( options ), thisOptionName ) && _.isUndefined( _this[ thisOptionName ] ) ) ) ||
						    _.isUndefined( options[ thisOptionName ] ) )
							throw new Error( "Required option \"" + thisOptionName + "\" was not supplied." );
					}

					// attach the supplied value of this option, or the appropriate default value, to the view object
					if( options && thisOptionName in options ) {
						// if this option already exists on the view, make a note that we will be changing it
						if( ! _.isUndefined( _this[ thisOptionName ] ) ) {
							optionsThatWereChangedOriginalValues[ thisOptionName ] = _this[ thisOptionName ];
							optionsThatWereChanged[ thisOptionName ] = options[ thisOptionName ];
						}
						_this[ thisOptionName ] = options[ thisOptionName ];
						// note we do NOT delete the option off the options object here so that
						// multiple views can be passed the same options object without issue.
					}
					else if( ! _.isUndefined( thisOptionDefaultValue ) && _.isUndefined( _this[ thisOptionName ] ) ) {
						// note defaults do not write over any existing properties on the view itself.
						_this[ thisOptionName ] = thisOptionDefaultValue;
					}
				} );
			}

			if( _.keys( optionsThatWereChanged ).length > 0 ) {
				if( _.isFunction( _this.onOptionsChanged ) )
					_this.onOptionsChanged( optionsThatWereChanged, optionsThatWereChangedOriginalValues );
				else if( _.isFunction( _this._onOptionsChanged ) )
					_this._onOptionsChanged( optionsThatWereChanged, optionsThatWereChangedOriginalValues );
			}
		};

		view.getOptions = function() {
			var optionDeclarations = _.result( this, optionsDeclarationsProperty );
			if( _.isUndefined( optionDeclarations ) ) return [];

			var normalizedOptionDeclarations = _normalizeOptionDeclarations( optionDeclarations );
			var optionsNames = _.pluck( normalizedOptionDeclarations, "name" );
				
			return _.pick( this, optionsNames );
		};
	};
	
	// ****************** Private Utility Functions ****************** 

	function _normalizeOptionDeclarations( optionDeclarations ) {
		// convert our short-hand option syntax (with exclamation marks, etc.)
		// to a simple array of standard option declaration objects.
		var normalizedOptionDeclarations = [];

		if( ! _.isArray( optionDeclarations ) )  {
			throw new Error( "Option declarations must be an array." );
		}

		_.each( optionDeclarations, function( thisOptionDeclaration ) {
			var thisOptionName, thisOptionRequired, thisOptionDefaultValue;

			thisOptionRequired = false;
			thisOptionDefaultValue = undefined;

			if( _.isString( thisOptionDeclaration ) )
				thisOptionName = thisOptionDeclaration;
			else if( _.isObject( thisOptionDeclaration ) ) {
				thisOptionName = _.first( _.keys( thisOptionDeclaration ) );
				thisOptionDefaultValue = _.clone( thisOptionDeclaration[ thisOptionName ] );
			}
			else throw new Error( "Each element in the option declarations array must be either a string or an object." );

			if( thisOptionName[ thisOptionName.length - 1 ] === "!" ) {
				thisOptionRequired = true;
				thisOptionName = thisOptionName.slice( 0, thisOptionName.length - 1 );
			}

			normalizedOptionDeclarations.push( {
				name : thisOptionName,
				required : thisOptionRequired,
				defaultValue : thisOptionDefaultValue
			} );
		} );

		return normalizedOptionDeclarations;
	};


	// Backbone.BabySitter
	// -------------------
	// v0.0.6
	//
	// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://github.com/babysitterjs/backbone.babysitter

	// Backbone.ChildViewContainer
	// ---------------------------
	//
	// Provide a container to store, retrieve and
	// shut down child views.

	ChildViewContainer = (function(Backbone, _){

		// Container Constructor
		// ---------------------

		var Container = function(views){
			this._views = {};
			this._indexByModel = {};
			this._indexByCustom = {};
			this._updateLength();

			_.each(views, this.add, this);
		};

		// Container Methods
		// -----------------

		_.extend(Container.prototype, {

			// Add a view to this container. Stores the view
			// by `cid` and makes it searchable by the model
			// cid (and model itself). Optionally specify
			// a custom key to store an retrieve the view.
			add: function(view, customIndex){
				var viewCid = view.cid;

				// store the view
				this._views[viewCid] = view;

				// index it by model
				if (view.model){
					this._indexByModel[view.model.cid] = viewCid;
				}

				// index by custom
				if (customIndex){
					this._indexByCustom[customIndex] = viewCid;
				}

				this._updateLength();
			},

			// Find a view by the model that was attached to
			// it. Uses the model's `cid` to find it.
			findByModel: function(model){
				return this.findByModelCid(model.cid);
			},

			// Find a view by the `cid` of the model that was attached to
			// it. Uses the model's `cid` to find the view `cid` and
			// retrieve the view using it.
			findByModelCid: function(modelCid){
				var viewCid = this._indexByModel[modelCid];
				return this.findByCid(viewCid);
			},

			// Find a view by a custom indexer.
			findByCustom: function(index){
				var viewCid = this._indexByCustom[index];
				return this.findByCid(viewCid);
			},

			// Find by index. This is not guaranteed to be a
			// stable index.
			findByIndex: function(index){
				return _.values(this._views)[index];
			},

			// retrieve a view by it's `cid` directly
			findByCid: function(cid){
				return this._views[cid];
			},

			findIndexByCid : function( cid ) {
				var index = -1;
				var view = _.find( this._views, function ( view ) {
					index++;
					if( view.model.cid == cid )
						return view;
				} );
				return ( view ) ? index : -1;
			},

			// Remove a view
			remove: function(view){
				var viewCid = view.cid;

				// delete model index
				if (view.model){
					delete this._indexByModel[view.model.cid];
				}

				// delete custom index
				_.any(this._indexByCustom, function(cid, key) {
					if (cid === viewCid) {
						delete this._indexByCustom[key];
						return true;
					}
				}, this);

				// remove the view from the container
				delete this._views[viewCid];

				// update the length
				this._updateLength();
			},

			// Call a method on every view in the container,
			// passing parameters to the call method one at a
			// time, like `function.call`.
			call: function(method){
				this.apply(method, _.tail(arguments));
			},

			// Apply a method on every view in the container,
			// passing parameters to the call method one at a
			// time, like `function.apply`.
			apply: function(method, args){
				_.each(this._views, function(view){
					if (_.isFunction(view[method])){
						view[method].apply(view, args || []);
					}
				});
			},

			// Update the `.length` attribute on this container
			_updateLength: function(){
				this.length = _.size(this._views);
			}
		});

		// Borrowing this code from Backbone.Collection:
		// http://backbonejs.org/docs/backbone.html#section-106
		//
		// Mix in methods from Underscore, for iteration, and other
		// collection related features.
		var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
			       'select', 'reject', 'every', 'all', 'some', 'any', 'include',
			       'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
			       'last', 'without', 'isEmpty', 'pluck'];

		_.each(methods, function(method) {
			Container.prototype[method] = function() {
				var views = _.values(this._views);
				var args = [views].concat(_.toArray(arguments));
				return _[method].apply(_, args);
			};
		});

		// return the public API
		return Container;
	})(Backbone, _);
})();
