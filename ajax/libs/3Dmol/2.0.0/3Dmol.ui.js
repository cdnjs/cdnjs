/*!
 * 3dmol v2.0.0
 * JavaScript/TypeScript molecular visualization library
 * Author: David Koes and contributors
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["3Dmol.ui"] = factory();
	else
		root["3Dmol.ui"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************!*\
  !*** ./src/ui/ui.js ***!
  \**********************/
/**
 * $3Dmol.UI - UI creates panels in the viewer to assist control of the viewport
 * @constructor 
 * @param {$3Dmol.StateManager} stateManager StateManager is required to have interaction between glviewer and the ui. 
 * @param {Object} config Loads the user defined parameters to generate the ui
 * @param {Object} parentElement Refers the parent division used to hold the canvas for 3Dmol.js 
 */
$3Dmol.UI = (function () {

  /*
       The dictionaries are for dropdown menus and validation of the viewer
   */


  // prop : It is used to add the option for property in context menu in the 3dmol ui
  // the code for prop can be found under /ui/ui.js -> UI -> ContextMenu -> setProperties -> submit.ui.on 
  // gui : It is used to generate forms for different features in the 3dmol ui
  // the code for gui can be found under /ui/form.js -> Form (Form defination)
  // floatType : separates integer from float since these are used in 
  // input validation of the 3dmol ui
  var validAtomSpecs = {
    "resn": { type: "string", valid: true, prop: true, gui: true }, // Parent residue name
    "x": { type: "number", floatType: true, valid: false, step: 0.1, prop: true }, // Atom's x coordinate
    "y": { type: "number", floatType: true, valid: false, step: 0.1, prop: true }, // Atom's y coordinate
    "z": { type: "number", floatType: true, valid: false, step: 0.1, prop: true }, // Atom's z coordinate
    "color": { type: "color", gui: false }, // Atom's color, as hex code
    "surfaceColor": { type: "color", gui: false }, // Hex code for color to be used for surface patch over this atom
    "elem": { type: "element", gui: true, prop: true }, // Element abbreviation (e.g. 'H', 'Ca', etc)
    "hetflag": { type: "boolean", valid: false, gui: true }, // Set to true if atom is a heteroatom
    "chain": { type: "string", gui: true, prop: true }, // Chain this atom belongs to, if specified in input file (e.g 'A' for chain A)
    "resi": { type: "array_range", gui: true }, // Residue number 
    "icode": { type: "number", valid: false, step: 0.1 },
    "rescode": { type: "number", valid: false, step: 0.1, prop: true },
    "serial": { type: "number", valid: false, step: 0.1 }, // Atom's serial id numbermodels
    "atom": { type: "string", valid: false, gui: true, prop: true }, // Atom name; may be more specific than 'elem' (e.g 'CA' for alpha carbon)
    "bonds": { type: "array", valid: false }, // Array of atom ids this atom is bonded to
    "ss": { type: "string", valid: false }, // Secondary structure identifier (for cartoon render; e.g. 'h' for helix)
    "singleBonds": { type: "boolean", valid: false }, // true if this atom forms only single bonds or no bonds at all
    "bondOrder": { type: "array", valid: false }, // Array of this atom's bond orders, corresponding to bonds identfied by 'bonds'
    "properties": { type: "properties", valid: false }, // Optional mapping of additional properties
    "b": { type: "number", floatType: true, valid: false, step: 0.1, prop: true }, // Atom b factor data
    "pdbline": { type: "string", valid: false }, // If applicable, this atom's record entry from the input PDB file (used to output new PDB from models)
    "clickable": { type: "boolean", valid: false, gui: false }, // Set this flag to true to enable click selection handling for this atom
    "contextMenuEnabled": { type: "boolean", valid: false, gui: false }, // Set this flag to true to enable click selection handling for this atom
    "callback": { type: "function", valid: false }, // Callback click handler function to be executed on this atom and its parent viewer
    "invert": { type: "boolean", valid: false }, // for selection, inverts the meaning of the selection
    //unsure about this
    "reflectivity": { type: "number", floatType: true, gui: false, step: 0.1 }, //for describing the reflectivity of a model
    "altLoc": { type: "invalid", valid: false }, //alternative location, e.g. in PDB
    "sym": { type: 'number', gui: false }, //which symmetry
  };

  //type is irrelivent here becuase htey are are invalid
  var validExtras = {  // valid atom specs are ok too
    "model": { type: "string", valid: false }, // a single model or list of models from which atoms should be selected
    "bonds": { type: "number", valid: false, gui: true }, // overloaded to select number of bonds, e.g. {bonds: 0} will select all nonbonded atoms
    "predicate": { type: "string", valid: false }, // user supplied function that gets passed an {AtomSpec} and should return true if the atom should be selected
    "invert": { type: "boolean", valid: false, gui: true }, // if set, inverts the meaning of the selection
    "byres": { type: "boolean", valid: false, gui: true }, // if set, expands the selection to include all atoms of any residue that has any atom selected
    "expand": { type: "number", valid: false, gui: false }, // expands the selection to include all atoms within a given distance from the selection
    "within": { type: "string", valid: false }, // intersects the selection with the set of atoms within a given distance from another selection
    "and": { type: "string", valid: false }, // and boolean logic
    "or": { type: "string", valid: false }, // or boolean logic
    "not": { type: "string", valid: false }, // not boolean logic
  };

  var validAtomSelectionSpecs = $3Dmol.extend({}, validAtomSpecs);
  validAtomSelectionSpecs = $3Dmol.extend(validAtomSelectionSpecs, validExtras);

  var validLineSpec = {
    "hidden": { type: "boolean", gui: true },
    "linewidth": { type: "number", floatType: true, gui: true, step: 0.1, default: 1.0 },
    "colorscheme": { type: "colorscheme", gui: true },
    "color": { type: "color", gui: true },
    "opacity": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0, max: 1 },
  };

  var validCrossSpec = {
    "hidden": { type: "boolean", gui: true },
    "linewidth": { type: "number", floatType: true, gui: false, step: 0.1, default: 1.0, min: 0 },//deprecated
    "colorscheme": { type: "colorscheme", gui: true },
    "color": { type: "color", gui: true },
    "radius": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0.1 },
    "scale": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0 },
    "opacity": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0, max: 1 },
  };

  var validStickSpec = {
    "hidden": { type: "boolean", gui: true },
    "colorscheme": { type: "colorscheme", gui: true },
    "color": { type: "color", gui: true },
    "radius": { type: "number", floatType: true, gui: true, step: 0.1, default: 0.25, min: 0.1 },
    "singleBonds": { type: "boolean", gui: true },
    "opacity": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0, max: 1 },
  };

  var validSphereSpec = {
    "hidden": { type: "boolean", gui: false }, // needed in the new gui it has separate function to hide the spheres
    "singleBonds": { type: "boolean", gui: true },
    "colorscheme": { type: "colorscheme", gui: true },
    "color": { type: "color", gui: true },
    "radius": { type: "number", floatType: true, gui: true, step: 0.1, default: 1.5, min: 0 },
    "scale": { type: "number", floatType: true, gui: true, step: 0.1, default: 1.0, min: 0.1 },
    "opacity": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0, max: 1 },
  };

  var validCartoonSpec = {
    "style": { validItems: ["trace", "oval", "rectangle", "parabola", "edged"], gui: true },
    "color": { type: "color", gui: true, spectrum: true },
    "arrows": { type: "boolean", gui: true },
    "ribbon": { type: "boolean", gui: true },
    "hidden": { type: "boolean", gui: true },
    "tubes": { type: "boolean", gui: true },
    "thickness": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0 },
    "width": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0 },
    "opacity": { type: "number", floatType: true, gui: true, step: 0.1, default: 1, min: 0, max: 1 },
  };

  var validAtomStyleSpecs = {
    "line": { validItems: validLineSpec, type: "form", gui: true }, // draw bonds as lines
    "cross": { validItems: validCrossSpec, type: "form", gui: true }, // draw atoms as crossed lines (aka stars)
    "stick": { validItems: validStickSpec, type: "form", gui: true }, // draw bonds as capped cylinders
    "sphere": { validItems: validSphereSpec, type: "form", gui: true }, // draw atoms as spheres
    "cartoon": { validItems: validCartoonSpec, type: "form", gui: true }, // draw cartoon representation of secondary structure
    "colorfunc": { validItems: null, type: "js", valid: false },
    "clicksphere": { validItems: validSphereSpec, type: "form" } //invisible style for click handling
  };

  var validSurfaceSpecs = {
    "opacity": { type: "number", floatType: true, gui: true, step: 0.01, default: 1, min: 0, max: 1 },
    "colorscheme": { type: "colorscheme", gui: true },
    "color": { type: "color", gui: true },
    "voldata": { type: "number", floatType: true, gui: false },
    "volscheme": { type: "number", floatType: true, gui: false },
    "map": { type: "number", gui: false }
  };


  function UI(stateManager, config, parentElement) {
    config = config || {}

    // Extract the viewer and then render it
    var icons = new $3Dmol.UI.Icons();
    var _editingForm = null;
    var mainParent = $(parentElement[0]);
    // Generates the necessary UI elements
    var HEIGHT = config.height;
    this.tools = generateUI(config);

    /**
     * Creates all the jquery object of different UI features
     */
    function generateUI() {
      var modelToolBar = new ModelToolbar();
      mainParent.append(modelToolBar.ui);
      setLocation(mainParent, modelToolBar.ui, 'left', 'top');
      // modelToolBar.updateInputLength();

      var contextMenu = new ContextMenu();
      mainParent.append(contextMenu.ui);
      setPosition(contextMenu.ui, 100, 100)

      var surfaceMenu = new SurfaceMenu();
      mainParent.append(surfaceMenu.ui);
      setLocation(mainParent, surfaceMenu.ui, 'right', 'top', 0, modelToolBar.ui.height() + 5);


      var selectionBox = new SelectionBox(icons.select);
      mainParent.append(selectionBox.ui);
      setLocation(mainParent, selectionBox.ui, 'left', 'top', 0, modelToolBar.ui.height() + 5);

      // Fixing Context Menu Behaviour
      selectionBox.ui.on('mousedown', () => {
        stateManager.exitContextMenu();
      });

      surfaceMenu.ui.on('mousedown', () => {
        stateManager.exitContextMenu();
      });

      return {
        modelToolBar: modelToolBar,
        selectionBox: selectionBox,
        contextMenu: contextMenu,
        surfaceMenu: surfaceMenu
      }
    }

    /**
     * Resize the panel with respect to the new viewport
     * 
     * @function $3Dmol.UI#resize
     */
    this.resize = function () {
      var selectionBox = this.tools.selectionBox;
      var surfaceMenu = this.tools.surfaceMenu;
      var modelToolBar = this.tools.modelToolBar;
      var HEIGHT = mainParent.height();

      setLocation(mainParent, modelToolBar.ui, 'left', 'top');
      // modelToolBar.updateInputLength();
      setLocation(mainParent, selectionBox.ui, 'left', 'top', 0, modelToolBar.ui.height() + 5);
      selectionBox.updateScrollBox(HEIGHT);
      setLocation(mainParent, surfaceMenu.ui, 'right', 'top', 0, modelToolBar.ui.height() + 5);
      surfaceMenu.updateScrollBox(HEIGHT);
    }

    /*
     * ModelToolbar is part of $3Dmol.UI to edit or change the model loaded into the viewer
     * 
     * @function ModelToolbar
     */
    function ModelToolbar() {
      var boundingBox = this.ui = $('<div></div>');

      boundingBox.css({
        'position': 'relative',
        'min-width': '150px'
      });


      var modelButton = new button(icons.molecule, 20, { tooltip: 'Toggle Model Selection Bar' });
      boundingBox.append(modelButton.ui);

      modelButton.ui.css({
        'display': 'inline-block',
        'top': '3px',
      });

      var control = {
        urlType: {
          active: true,
          value: null,
          key: 'Model type'
        },

        url: {
          active: true,
          value: null,
          key: 'Url'
        },
      };

      var surroundingBox = $('<div></div>');

      surroundingBox.css({
        'display': 'inline-block',
        'background': '#e4e4e4',
        'padding': '2px',
        'border-radius': '3px',
        // 'width' : '90%'
      });

      boundingBox.append(surroundingBox);

      var currentModelBox = $('<div></div>');
      currentModelBox.css({

      });

      var currentModel = $('<div></div>');
      currentModel.css({
        'display': 'inline-block',
        'font-family': 'Arial',
        'font-size': '12px',
        'font-weight': 'bold',
        // 'padding' : '3px'
      });

      currentModelBox.append(currentModel);

      var changeButton = new button(icons.change, 16, { tooltip: 'Change Model', backgroundColor: 'white', bfr: 0.5 });
      changeButton.ui.css({
        'display': 'inline-block',
        'margin-left': '4px',
      });
      currentModelBox.append(changeButton.ui);

      currentModelBox.hide();
      surroundingBox.append(currentModelBox);

      var formBox = $('<div></div>');
      surroundingBox.append(formBox);

      var dbs = 'pdb,mmtf,cid'.split(',');
      var list = this.list = new $3Dmol.UI.Form.ListInput(control.urlType, dbs);
      list.showAlertBox = false;

      list.ui.css({
        'display': 'inline-block',
      })

      formBox.append(list.ui);

      var input = this.url = new $3Dmol.UI.Form.Input(control.url);
      formBox.append(input.ui);

      input.ui.css({
        'display': 'inline-block',
        'width': '125px'
      });

      // input.setWidth(125);

      var submitButton = new button(icons.tick, 16, { bfr: 0.5, backgroundColor: 'lightgreen', tooltip: 'Add Model' });
      submitButton.ui.css({
        'margin': '0px'
      })
      formBox.append(submitButton.ui);

      this.updateInputLength = function () {
        // var width = parentElement.width()*0.3;
        // boundingBox.width(width);
        // input.setWidth(width - 12);
      }

      modelButton.ui.on('click', () => {
        surroundingBox.toggle();
      });

      submitButton.ui.on('click', function () {
        var validateDb = list.validate();
        var validateId = input.validate();

        if (validateId && validateDb) {
          stateManager.addModel(control);
        }

      });

      /*
       * Sets the title in the ui with specified value
       * 
       * @function ModelToolbar#setModel 
       * @param {String} heading Name of the molecule that is to be displayed on the title
       */
      this.setModel = function (heading) {
        currentModel.text(heading);
        currentModelBox.show();
        formBox.hide();
      }

      changeButton.ui.on('click', function () {
        currentModelBox.hide();
        formBox.show();
        input.setValue('');
      });

      boundingBox.on('keypress', function (e) {
        if (e.key == 'Enter' || e.key == 'Return') {
          submitButton.ui.trigger('click')
        }
      });
    }


    /*
     * Selection box creates the UI panel to manipulate selections and style that are drawn 
     * on the viewport
     * 
     * @function SelectionBox  
     * @param {$3Dmol.UI.Icons} icon takes the svg code for the icon that is to be used to display
     * selection box
     * @return {Object}  Jquery element of div
     */
    function SelectionBox(icon, side = 'left') {
      var selectionBox = this.ui = $('<div></div>');
      _editingForm = false;
      var selectionObjects = [];

      var selections = $('<div></div>');
      var scrollBox = $('<div></div>');

      selections.css('opacity', '0.9');

      var showArea = $('<div></div>');
      var addArea = $('<div></div>');
      var plusButton = new button(icons.plus, 20, { tooltip: 'Add New Selection' });
      plusButton.ui.css('margin', '0px');

      var hideButton = new button(icon, 20, { tooltip: 'Toggle Selection Menu' });
      this.selectionObjects = [];

      // Content
      selectionBox.append(hideButton.ui);
      selectionBox.append(showArea);
      selectionBox.css('position', 'absolute');

      scrollBox.append(selections);
      showArea.append(scrollBox);
      addArea.append(plusButton.ui);

      var alertBox = new AlertBox();
      showArea.append(alertBox.ui);
      showArea.append(addArea);
      alertBox.ui.css('width', 162);

      // CSS
      if (side == 'left') {
        selectionBox.css('text-align', 'left');
      }
      else if (side == 'right') {
        selectionBox.css('text-align', 'right');
      }
      else {
        // Add alert box code
        selectionBox.css('text-align', 'right');
      }

      showArea.css('box-sizing', 'border-box');
      showArea.css('padding', '3px');
      // showArea.css('width', '162px');

      scrollBox.css('max-height', HEIGHT * 0.8);
      scrollBox.css('overflow-y', 'auto');
      scrollBox.css('overflow-x', 'visible');

      selections.css('box-sizing', 'content-box');

      this.updateScrollBox = function (height) {
        scrollBox.css('max-height', height * 0.8);
      }

      // Action
      var hidden = true;
      showArea.hide();

      hideButton.ui.click(toggleHide);

      function toggleHide() {
        if (hidden) {
          showArea.show(100);
        }
        else {
          showArea.hide(100);
        }
        hidden = !hidden;
      }

      /*
       * Card for manipulation of a selection form and related styles
       * 
       * @function Selection
       */
      function Selection() {
        var boundingBox = this.ui = $('<div></div>');
        var sid = this.id = null;
        selectionObjects.push(this);
        boundingBox.css({
          'background': '#e8e8e8',
          'padding': '4px 4px 2px 4px',
          'border-radius': '6px',
          'margin-bottom': '3px',
          'position': 'relative',
          'width': '156px'
        });

        var header = $('<div></div>');
        boundingBox.append(header);
        var heading = $('<div></div>');
        var controls = $('<div></div>');

        header.append(heading, controls);
        heading.css({
          'font-family': 'Arial',
          'font-weight': 'bold',
          'font-size': '12px',
          'display': 'inline-block',
          'width': '60px'
        });

        controls.css({
          'display': 'inline-block'
        });

        header.hide();
        controls.editMode = false;

        var removeButton = new button(icons.minus, 16, { bfr: 0.5, backgroundColor: '#f06f6f', tooltip: 'Remove Selection' });
        var editButton = new button(icons.pencil, 16, { tooltip: 'Edit Selection' });
        var visibleButton = new button(icons.visible, 16, { tooltip: 'Show / Hide Selection' });

        controls.append(removeButton.ui)
        controls.append(editButton.ui);
        controls.append(visibleButton.ui);

        var parameters = $('<div></div>');
        boundingBox.append(parameters);

        var styleHolder = $('<div></div>');

        removeButton.ui.on('click', function () {
          stateManager.removeSelection(sid);
          boundingBox.detach();
          //delete this;
        });

        editButton.ui.on('click', function () {
          parameters.toggle();
        });

        var hidden = false;
        visibleButton.ui.on('click', () => {
          stateManager.toggleHide(sid);
          if (hidden) {
            hidden = false;
            visibleButton.setSVG(icons.visible);
          }
          else {
            hidden = true;
            visibleButton.setSVG(icons.invisible);
          }
        });

        var styleBox = new StyleBox();

        styleHolder.append(styleBox.ui);
        styleBox.ui.css({
          'position': 'static',
          // 'left' : '0',
          'width': 'px',
          'border-radius': '4px'
        });

        styleBox.ui.hide();

        var allControl = this.allSelector = {
          key: 'Select All Atom',
          value: null,
          active: true
        }

        var allCheckBox = new $3Dmol.UI.Form.Checkbox(allControl);
        parameters.append(allCheckBox.ui);


        var selectionFormControl = this.selectionValue = {
          key: 'Selection Spec',
          value: null,
          active: true
        }

        var selectionSpecForm = new $3Dmol.UI.Form(validAtomSelectionSpecs, selectionFormControl);
        parameters.append(selectionSpecForm.ui);

        var submitControls = $('<div></div>');
        var submit = new button(icons.tick, 16, { backgroundColor: 'lightgreen', tooltip: 'Submit' });
        var cancel = new button(icons.cross, 16, { backgroundColor: 'lightcoral', tooltip: 'Cancel' });
        submitControls.append(submit.ui, cancel.ui);


        var alertBox = new AlertBox();
        parameters.append(alertBox.ui);

        parameters.append(submitControls);
        boundingBox.append(styleHolder);

        allCheckBox.update = function () {
          selectionSpecForm.ui.toggle();
        }

        function finalizeSelection(id) {
          header.show();
          controls.editMode = true;
          sid = this.id = id;
          heading.text('Sel#' + id);
          boundingBox.attr('data-id', id);
          parameters.hide();
          styleBox.setSid(id);
          styleBox.ui.show();
        }

        function checkAndAddSelection(sid = null) {
          var validate = selectionSpecForm.validate();
          if (validate) {
            selectionSpecForm.getValue();
            var checkAtoms = stateManager.checkAtoms(selectionFormControl.value);

            if (Object.keys(selectionFormControl.value).length == 0) {
              alertBox.error('Please enter some input');
            }
            else {
              if (checkAtoms) {
                var id = stateManager.addSelection(selectionFormControl.value, sid);
                finalizeSelection(id);
                if (sid == null) _editingForm = false;
              }
              else {
                alertBox.error('No atom selected');
              }
            }
          }
          else {
            alertBox.error('Invalid Input');
          }
        }

        function removeSelf() {

          // delete selectionToRemove;
        }

        submit.ui.on('click', () => {
          if (controls.editMode == false) {
            if (allControl.value) {
              let id = stateManager.addSelection({});
              finalizeSelection(id);
              _editingForm = false;
            }
            else {
              checkAndAddSelection();
            }

          }
          else {
            if (allControl.value) {
              let id = sid;
              stateManager.addSelection({}, id);
              finalizeSelection(id);
            }
            else {
              let id = sid;
              checkAndAddSelection(id);
            }
          }
        });

        var self = this;

        cancel.ui.on('click', () => {
          if (controls.editMode) {
            parameters.hide();
          }
          else {
            boundingBox.detach();
            removeSelf(self);
            _editingForm = false;
          }
        });


        boundingBox.on('keyup', (e) => {
          if (e.key == 'Enter') {
            submit.ui.trigger('click');
          }
        });

        /*
         * @function Selection#setProperty
         * @param {string} id Id of the selection created in StateManager 
         * @param {Object} specs Defination of the selection that will be used to set default 
         * values in the form
         */
        this.setProperty = function (id, specs) {
          // check for all selection
          if (Object.keys(specs).length == 0) {
            allCheckBox.setValue(true)
          } else {
            selectionSpecForm.setValue(specs);
          }

          // finalize the selection 
          finalizeSelection(id);
        }

        /*
         * Adds style to the given selection 
         * 
         * @function Selection#addStyle 
         * @param {String} selId Id of the selection to inititate the StyleBox
         * @param {String} styleId Id of the style that is created through StateManager
         * @param {AtomStyleSpecs} styleSpecs 
         */
        this.addStyle = function (selId, styleId, styleSpecs) {
          styleBox.addStyle(selId, styleId, styleSpecs);
        }
      }

      plusButton.ui.on('click', () => {
        if (!_editingForm) {
          var newSelection = new Selection();
          selections.append(newSelection.ui);
          _editingForm = true;
        } else {
          alertBox.warning('Please complete the previous form');
        }

      });


      /*
       * Remove all the selection card from the ui
       */
      this.empty = function () {
        selections.empty();
        _editingForm = false;
      }

      /*
       * Adds or create new selection card
       * 
       * @function SelectionBox#editSelection
       * @param {String} id Id created in StateManager and passed down to this function during call
       * @param {AtomSelectionSpec} selSpec Selection spec that is used to generate the selection form
       * @param {String} styleId Id of style created in StateManager
       * @param {AtomStyleSpecs} styleSpec Style spec if specified add the selection to the current selection 
       */
      this.editSelection = function (id, selSpec, styleId, styleSpec) {
        // if selection does not exist create new 

        // This thing works but I am not sure how!

        // Search selection with id 
        var selectionUI = selections.children('[data-id=' + id + ']');

        if (selectionUI.length == 0) {
          var selection = new Selection();
          selection.setProperty(id, selSpec);
          selections.append(selection.ui);

          if (styleId != null) {
            selection.addStyle(id, styleId, styleSpec);
          }
        }

      }
    }


    /*
     * Creates StyleBox for listing out different styles inside the selection
     * 
     * @function StyleBox 
     * @param {String} selId Id of the selection for which the style box is created 
     * @param {String} side Alignment of text inside the box
     */
    function StyleBox(selId, side = 'left') {
      var styleBox = this.ui = $('<div></div>');
      _editingForm = false;
      var sid = this.sid = selId; // selection id

      this.setSid = function (id) {
        sid = this.sid = id;
      }

      var styles = $('<div></div>');
      var scrollBox = $('<div></div>');

      styles.css('opacity', '0.9');

      var showArea = $('<div></div>');
      var addArea = $('<div></div>');
      addArea.css('text-align', 'center');
      var plusButton = new button(icons.plus, 20, { tooltip: 'Add New Style' });
      plusButton.ui.css('margin', '0px');

      this.selectionObjects = [];

      // Content
      styleBox.append(showArea);
      styleBox.css('position', 'absolute');

      scrollBox.append(styles);
      showArea.append(scrollBox);

      var alertBox = new AlertBox();
      showArea.append(alertBox.ui);

      addArea.append(plusButton.ui);
      showArea.append(addArea);

      // CSS
      if (side == 'left') {
        styleBox.css('text-align', 'left');
      }
      else if (side == 'right') {
        styleBox.css('text-align', 'right');
      }
      else {
        // Add alert box code
        styleBox.css('text-align', 'right');
      }

      showArea.css('box-sizing', 'border-box');
      showArea.css('padding', '3px');
      // showArea.css('width', '162px');
      showArea.css('background-color', '#a4a4a4')
      showArea.css('border-radius', '4px');

      // scrollBox.css('max-height', HEIGHT*0.8);
      scrollBox.css('overflow', 'hidden');

      // styles.css('max-height', HEIGHT*0.8);
      // styles.css('overflow', 'auto');
      styles.css('box-sizing', 'content-box');


      /*
       * Style card to define the value of the style 
       * 
       * @param {string} sid Id of the selction for which the style box is created
       * and this stye will be added under that selection
       */
      function Style(sid) {
        var boundingBox = this.ui = $('<div></div>');
        var stid = this.id = null; // style id 
        boundingBox.css({
          'background': '#e8e8e8',
          'padding': '4px 4px 2px 4px',
          'border-radius': '6px',
          'margin-bottom': '3px',
          'position': 'relative'
        });

        var header = $('<div></div>');
        boundingBox.append(header);
        var heading = $('<div></div>');
        var controls = $('<div></div>');

        header.append(heading, controls);
        heading.css({
          'font-family': 'Arial',
          'font-weight': 'bold',
          'font-size': '12px',
          'display': 'inline-block',
          'width': '60px'
        });

        controls.css({
          'display': 'inline-block'
        });

        header.hide();
        controls.editMode = false;

        var removeButton = new button(icons.minus, 16, { bfr: 0.5, backgroundColor: '#f06f6f', tooltip: 'Remove Style' });
        var editButton = new button(icons.pencil, 16, { tooltip: 'Edit Style' });
        var visibleButton = new button(icons.visible, 16, { tooltip: 'Show / Hide Style' });

        controls.append(removeButton.ui)
        controls.append(editButton.ui);
        controls.append(visibleButton.ui);

        var parameters = $('<div></div>');
        boundingBox.append(parameters);

        removeButton.ui.on('click', { parent: this, stid: stid }, function () {
          stateManager.removeStyle(sid, stid);
          boundingBox.detach();
          //delete this;
        });

        editButton.ui.on('click', function () {
          parameters.toggle();
        });

        var hidden = false;
        visibleButton.ui.on('click', () => {
          stateManager.toggleHideStyle(sid, stid);
          if (hidden) {
            hidden = false;
            visibleButton.setSVG(icons.visible);
          }
          else {
            hidden = true;
            visibleButton.setSVG(icons.invisible);
          }
        });

        var styleFormControl = this.selectionValue = {
          key: 'Style Spec',
          value: null,
          active: true
        }

        var styleSpecForm = new $3Dmol.UI.Form(validAtomStyleSpecs, styleFormControl);
        parameters.append(styleSpecForm.ui);

        var submitControls = $('<div></div>');
        var submit = new button(icons.tick, 16, { backgroundColor: 'lightgreen', tooltip: 'Submit' });
        var cancel = new button(icons.cross, 16, { backgroundColor: 'lightcoral', tooltip: 'Cancel' });
        submitControls.append(submit.ui, cancel.ui);


        var alertBox = new AlertBox();
        parameters.append(alertBox.ui);

        parameters.append(submitControls);

        function finalizeStyle(id) {
          header.show();
          controls.editMode = true;
          stid = id;
          heading.text('Sty#' + id);
          parameters.hide();
        }

        function checkAndAddStyle(stid = null) {
          var validate = styleSpecForm.validate();
          if (validate) {
            styleSpecForm.getValue();

            if (Object.keys(styleFormControl.value).length == 0) {

              alertBox.error('Please enter some value');
            }
            else {
              var id = stateManager.addStyle(styleFormControl.value, sid, stid);
              finalizeStyle(id);
              if (stid == null) _editingForm = false;
            }

          }
          else {
            alertBox.error('Invalid Input');
          }
        }

        submit.ui.on('click', () => {
          if (controls.editMode == false) {
            checkAndAddStyle();
          }
          else {
            var id = stid
            styleSpecForm.getValue();

            if (Object.keys(styleFormControl.value).length == 0) {
              alertBox.error('Please enter some value');
            }
            else {
              checkAndAddStyle(id);
            }

          }
        });

        cancel.ui.on('click', () => {
          if (controls.editMode) {
            parameters.hide();
          }
          else {
            boundingBox.detach();
            //delete this;
          }
        });

        boundingBox.on('keyup', (e) => {
          if (e.key == 'Enter') {
            submit.ui.trigger('click');
          }
        });

        /**
         * @function Style#updateStyle 
         * @param {String} styleId Id of the style created by StateManager 
         * @param {AtomStyleSpecs} styleSpec Specs for defining the style and setting default values
         */
        this.updateStyle = function (styleId, styleSpec) {
          styleSpecForm.setValue(styleSpec);

          finalizeStyle(styleId);
        }

      }

      plusButton.ui.on('click', () => {
        if (!_editingForm) {
          var newStyle = new Style(sid);
          styles.append(newStyle.ui);
          _editingForm = true;
        }
        else {
          alertBox.warning('Please complete editing the current form');
        }
      });

      /**
       * @function StyleBox#addStyle
       * @param {String} selectionId Id of the selection for which styles will be created   
       * @param {String} styleId Id of the style part of the selection 
       * @param {AtomStyleSpecs} styleSpecs Style specs that will be used to create 
       * style for the specified selection and set default values in the Style card
       */
      this.addStyle = function (selectionId, styleId, styleSpecs) {
        var style = new Style(selectionId);
        styles.append(style.ui);
        style.updateStyle(styleId, styleSpecs);
      }
    }


    /*
     * Add alert messages to different panels 
     * 
     * @function AlertBox
     * @param {Object} config Configuraiton for alert box display
     */
    function AlertBox(config) {
      var boundingBox = this.ui = $('<div></div>');
      config = config || {}
      var delay = config.delay || 5000;
      var autohide = (config.autohide == undefined) ? true : config.autohide;

      boundingBox.css({
        'font-family': 'Arial',
        'font-size': '14px',
        'padding': '3px',
        'border-radius': '4px',
        'margin-top': '2px',
        'margin-bottm': '2px',
        'font-weight': 'bold',
        'text-align': 'center',
      });

      boundingBox.hide();

      function hide() {
        if (autohide) {
          setTimeout(() => {
            boundingBox.hide();
          }, delay);
        }
      }

      /**
       * Generate Internal alert message  
       * @param {String} msg Error Message 
       */
      this.error = function (msg) {
        boundingBox.css({
          'background': 'lightcoral',
          'color': 'darkred',
          'border': '1px solid darkred'
        });

        boundingBox.text(msg);
        boundingBox.show();

        hide();
      }

      /**
       * Generates Internal warning message
       * @param {String} msg Warming message 
       */
      this.warning = function (msg) {
        boundingBox.css({
          'background': '#fff3cd',
          'color': '#856409',
          'border': '1px solid #856409'
        });

        boundingBox.text(msg);
        boundingBox.show();

        hide();
      }

      /**
       * Generates Internal Info message 
       * @param {String} msg Info message
       */
      this.message = function (msg) {
        boundingBox.css({
          'background': 'lightgreen',
          'color': 'green',
          'border': '1px solid green'
        });

        boundingBox.text(msg);
        boundingBox.show();

        hide();
      }
    }

    /*
     * Creates the panel for manipulation of labels on the viewport
     * 
     * @function ContextMenu
     */
    function ContextMenu() {
      var boundingBox = this.ui = $('<div></div>');

      boundingBox.css('position', 'absolute');
      // boundingBox.css('border', '1px solid black');
      boundingBox.css('border-radius', '3px');
      boundingBox.css('background', '#f1f1f1');
      boundingBox.css('z-index', 99);
      var contentBox = $('<div></div>');
      contentBox.css('position', 'relative');
      boundingBox.css('opacity', '0.85');

      boundingBox.append(contentBox);
      contentBox.css({
        'background': '#f1f1f1',
        'border-radius': '4px',
        'padding': '4px',
        'width': '140px'
      });
      // Context Box
      // Remove Label Button 

      var labelMenuStyle = {
        'background': '#d3e2ee',
        'padding': '2px',
        'font-family': 'Arial',
        'font-weight': 'bold',
        'font-size': '12px',
        'border-radius': '2px',
        // 'margin-top':'3px'
      }

      var removeLabelMenu = $('<div></div>');
      removeLabelMenu.text('Remove Label');
      removeLabelMenu.css(labelMenuStyle);
      removeLabelMenu.css('margin-bottom', '3px');

      contentBox.append(removeLabelMenu);
      removeLabelMenu.hide();

      // Label Property List 
      var propertyKeys = Object.keys(validAtomSpecs);
      var propertyList = [];
      var propertyObjectList = [];

      propertyKeys.forEach((prop) => {
        var propObj = validAtomSpecs;
        if (propObj[prop].prop === true) {
          propertyList.push(prop);
        }
      });

      // Property Menu 
      var propertyMenu = $('<div></div>');
      contentBox.append(propertyMenu);

      /*
       * Property object used in property menu 
       * 
       * @function Property 
       * @param {String} key Name of the atom property
       * @param {*} value Value of the property 
       */
      function Property(key, value) {
        this.row = $('<tr></tr>');
        var propLabelValue = this.control = {
          key: '',
          value: null,
          active: true,
          name: key,
        }

        this.key = key;
        this.value = value;

        var checkbox = new $3Dmol.UI.Form.Checkbox(propLabelValue);
        var checkboxHolder = $('<td></td>');
        checkboxHolder.append(checkbox.ui);
        var keyHolder = $('<td></td>');
        var separatorHolder = $('<td></td>').text(':');
        var valueHolder = $('<td></td>');

        this.row.append(checkboxHolder, keyHolder, separatorHolder, valueHolder);

        keyHolder.text(key);

        if (typeof (value) == "number") {
          valueHolder.text(value.toFixed(2));
        } else {
          valueHolder.text(value.replace(/\^/g, ''));
        }

        console.log('Type of value', typeof (value), value);
      }

      /*
       * @param {AtomSpec} atom Value of different property of the atom, if the atom has prop : true
       * then that option is made visible in the context menu
       */
      function setProperties(atom) {
        propertyMenu.empty();
        propertyObjectList = [];

        var propertyTable = $('<table></table>');

        propertyList.forEach((prop) => {
          var propObj = new Property(prop, atom[prop]);
          propertyTable.append(propObj.row);
          propertyObjectList.push(propObj);
        });

        propertyMenu.append(propertyTable);

        var labelStyleHolder = $('<div><div>');

        var labelStyle = $('<div><div>');
        labelStyle.text('Style');
        labelStyle.css({
          'display': 'inline-block',
          'font-family': 'Arial',
          'font-size': '14px',
          'margin-right': '6px',
          'margin-left': '6px'
        });

        var stylesForLabel = new $3Dmol.UI.Form.ListInput(labelStyle, Object.keys($3Dmol.labelStyles));
        stylesForLabel.ui.css({
          'display': 'inline-block'
        });

        stylesForLabel.setValue('milk');

        labelStyleHolder.append(labelStyle, stylesForLabel.ui);
        propertyMenu.append(labelStyleHolder);

        var submit = new button(icons.tick, 18, { backgroundColor: 'lightgreen', tooltip: 'Submit' });
        var cancel = new button(icons.cross, 18, { backgroundColor: 'lightcoral', tooltip: 'Cancel' });

        var controlButtons = $('<div></div>');
        controlButtons.append(submit.ui, cancel.ui);
        // controlButtons.css('text-align', 'center');

        var alertBox = new AlertBox();
        propertyMenu.append(alertBox.ui);

        propertyMenu.append(controlButtons);


        submit.ui.on('click', () => {
          var props = processPropertyList();
          var labelStyleValidation = stylesForLabel.validate();

          if (props != null) {
            if (labelStyleValidation) {
              stateManager.addAtomLabel(props, atom, stylesForLabel.getValue().value);
              stateManager.exitContextMenu(false);
            }
            else {
              alertBox.error('Select style for label');
            }
          }
          else {
            alertBox.error('No value selected for label');
          }
        });

        cancel.ui.on('click', () => {
          stateManager.exitContextMenu();
        });
      }

      // Previous Labels 
      var labelHolder = $('<div></div>');
      contentBox.append(labelHolder);

      // Add Menu 
      var addMenu = $('<div></div>');
      contentBox.append(addMenu);
      addMenu.css('width', '100%');

      var addLabelMenu = $('<div></div>');
      addMenu.append(addLabelMenu);


      addLabelMenu.text('Add Label');
      addLabelMenu.css(labelMenuStyle);
      addLabelMenu.css('margin-bottom', '3px');
      addLabelMenu.hide();

      // Edit Menu
      var editMenu = $('<div></div>');
      contentBox.append(editMenu);

      contentBox.css({
        'position': 'relative',
      });

      editMenu.css({
        'background': '#dfdfdf',
        'border-radius': '3px',
        'font-family': 'Arial',
        'font-weight': 'bold',
        'font-size': '12px',
        // 'position': 'absolute',
        // 'left' : '105%',
        // 'top' : '0',,
        'box-sizing': 'border-box',
        'width': '100%',

      });
      editMenu.hide();

      var alertBox = new AlertBox({ autohide: false });
      contentBox.append(alertBox.ui);

      // Add Label Inputs 

      /*
       * Generate input elements that are used as form values in the context menu under addLabelForm
       * @returns {Object} that holds different input elements
       */
      function generateAddLabelForm() {
        var addLabelForm = $('<div></div>');

        var addLabelValue = {
          text: {
            key: 'Label Text',
            value: null,
            active: true,
          },

          style: {
            key: 'Style',
            value: null,
            active: true,
          },

          sel: {
            key: 'Selection',
            value: null,
            active: true,
          }
        }
        var formModifierControl = $('<div></div>');
        var removeButton = new button(icons.minus, 16);
        var tick = new button(icons.tick, 16, { backgroundColor: 'lightgreen', tooltip: 'Submit' });
        var cross = new button(icons.cross, 16, { backgroundColor: 'lightcoral', tooltip: 'Cancel' });
        formModifierControl.append(removeButton.ui, tick.ui, cross.ui);
        removeButton.ui.hide();
        addLabelForm.append(formModifierControl);

        var addLabelTextBox = $('<div></div>');
        var lt = $('<div></div>').text('Label Text');
        var addLabelTextInput = new $3Dmol.UI.Form.Input(addLabelValue.text);
        addLabelTextBox.append(lt, addLabelTextInput.ui);
        var width = 126//editMenu.innerWidth()*0.8;
        addLabelTextInput.setWidth(width);
        addLabelForm.append(addLabelTextBox);

        var addLabelStyleBox = $('<div></div>');
        var ls = $('<div></div>').text('Label Style');
        var addLabelStyleInput = new $3Dmol.UI.Form.ListInput(addLabelValue.style, Object.keys($3Dmol.labelStyles));
        addLabelStyleInput.setValue('milk');
        addLabelStyleBox.append(ls, addLabelStyleInput.ui);
        addLabelForm.append(addLabelStyleBox);

        var selectionList = stateManager.getSelectionList();

        var addLabelSelectionBox = $('<div></div>');
        var lsl = $('<div></div>').text('Label Selection');
        var addLabelSelectionInput = new $3Dmol.UI.Form.ListInput(addLabelValue.sel, selectionList);
        addLabelSelectionBox.append(lsl, addLabelSelectionInput.ui);
        addLabelForm.append(addLabelSelectionBox);

        // CSS 
        addLabelForm.css({
          'padding': '2px',

        });

        tick.ui.on('click', () => {
          var validate = true;

          if (!addLabelStyleInput.validate())
            validate = false;

          if (!addLabelTextInput.validate())
            validate = false;

          if (!addLabelSelectionInput.validate())
            validate = false;

          if (validate) {
            stateManager.addLabel(addLabelValue);
          }
        });

        cross.ui.on('click', () => {
          stateManager.exitContextMenu();
        });

        removeButton.ui.on('click', () => {
          stateManager.removeLabel()
        });

        addLabelForm.on('keyup', (e) => {
          if (e.key == 'Enter') {
            tick.ui.trigger('click');
          }
        });

        return {
          boundingBox: addLabelForm,
          text: addLabelTextInput,
          style: addLabelStyleInput,
          selection: addLabelSelectionInput,
          editMode: function () {
            removeButton.ui.show();
          }
        }
      }


      function processPropertyList() {
        var propsForLabel = {};

        propertyObjectList.forEach((propObj) => {
          if (propObj.control.value === true) {
            propsForLabel[propObj.key] = propObj.value;
          }
        });

        if (Object.keys(propsForLabel).length != 0) {
          return propsForLabel
        }
        else {
          return null;
        }
      }

      // Context Menu UI Funciton 
      boundingBox.hide();
      this.hidden = true;
      this.atom = null;

      removeLabelMenu.on('click', { atom: this.atom }, function () {
        stateManager.removeAtomLabel(removeLabelMenu.atom);
      });


      /**
       * Shows the context menu 
       * 
       * @function ContextMenu#show 
       * 
       * @param {Number} x x coordinate of the mouse
       * @param {Number} y y coordinate of the mouse in the viewport in pixels
       * @param {AtomSpec} atom Value of the atoms that is selected 
       * @param {Boolean} atomExist if atom label is previously added it is set true else false
       */
      this.show = function (x, y, atom, atomExist) {

        if (atomExist) {
          removeLabelMenu.show();
          removeLabelMenu.atom = atom;
        }
        else {
          removeLabelMenu.hide();
          removeLabelMenu.atom = null;
        }

        alertBox.ui.hide();
        addLabelMenu.hide();

        if (stateManager.getSelectionList().length == 0) {
          alertBox.message('Please create selections before adding label');
        } else {
          addLabelMenu.show();
        }

        unsetForm();
        setPosition(boundingBox, x, y);
        boundingBox.show();
        this.hidden = false;

        if (atom) {
          setProperties(atom);
          this.atom = atom;
        }
        else {
          propertyMenu.empty();
        }
      }

      /**
       * Hides the context menu and if needed process the propertyMenu
       * 
       * @function ContextMenu#hide
       * @param {Boolean} processContextMenu If true then submission of the property to add label is executed
       */

      this.hide = function (processContextMenu) {
        if (processContextMenu) {
          var propsForLabel = processPropertyList();
          if (propsForLabel != null) {
            stateManager.addAtomLabel(propsForLabel, this.atom);
          }
        }

        boundingBox.hide();
        this.hidden = true;
        unsetForm();
      }

      addLabelMenu.on('click', function () {
        var addLabelMenuForm = generateAddLabelForm();
        setForm(addLabelMenuForm);
      });

      function setForm(form) {
        editMenu.children().detach();
        editMenu.append(form.boundingBox);
        editMenu.show();
      }

      function unsetForm() {
        editMenu.children().detach();
        editMenu.hide();
      }
    }

    /*
     * Creates UI panel for surface manipulations
     * 
     * @function SurfaceMenu 
     */
    function SurfaceMenu() {
      var boundingBox = this.ui = $('<div></div>');
      var _editingForm = false;
      // Selection Layout

      boundingBox.css({
        'position': 'absolute',
        'width': '140px',
        'text-align': 'right'
      });

      var surfaceButton = new button(icons.surface, 20, { tooltip: 'Toggle Surface Menu' });

      boundingBox.append(surfaceButton.ui);


      var displayBox = $('<div></div>');
      boundingBox.append(displayBox);

      // Overflow fix 
      boundingBox.css({
        'overflow': 'visible',
      });

      var newSurfaceSpace = $('<div></div>');
      newSurfaceSpace.css({
        'max-height': HEIGHT * 0.8,
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      });

      this.updateScrollBox = function (height) {
        newSurfaceSpace.css('max-height', height * 0.8);
      }
      // newSurfaceSpace.append(controlButton);
      // controlButton.hide();

      displayBox.append(newSurfaceSpace);

      var alertBox = new AlertBox();
      displayBox.append(alertBox.ui);

      var addArea = $('<div></div>');
      var addButton = new button(icons.plus, 20, { tooltip: 'Add New Surface' });
      addArea.append(addButton.ui);
      displayBox.append(addArea);
      displayBox.hide();

      var surfaces = this.surfaces = [];

      /*
       * Creates cards for manipulation of surface
       * 
       * @function Surface 
       */
      function Surface() {
        var control = {
          surfaceType: {
            key: 'Surface Type',
            value: null
          },
          surfaceStyle: {
            key: 'Surface Style',
            value: null
          },
          surfaceFor: {
            key: 'Selection Atoms',
            value: null
          },
          surfaceOf: {
            key: 'Surface Generating Atoms',
            value: null,
          },
        };

        var surfaceBox = this.ui = $('<div></div>');
        surfaceBox.css({
          'margin-top': '3px',
          'padding': '6px',
          'border-radius': '3px',
          'background-color': '#e8e8e8',
          // 'position':'relative',
          'width': '100%',
          'box-sizing': 'border-box',
          // 'left': "-100%",
          'opacity': 0.9,
          'text-align': 'left'
        });

        var heading = this.heading = $('<div></div>');
        var header = $('<div></div>');

        header.css({
          'text-align': 'right'
        })

        // Control Buttons
        var toolButtons = $('<div></div>');

        var editButton = new button(icons.pencil, 16, { tooltip: 'Edit Surface' });
        var removeButton = new button(icons.minus, 16, { bfr: 0.5, backgroundColor: '#f06f6f' });

        toolButtons.append(removeButton.ui);
        toolButtons.append(editButton.ui);

        toolButtons.editButton = editButton;
        toolButtons.removeButton = removeButton;
        toolButtons.editMode = false;

        var defaultTextStyle = {
          'font-weight': 'bold',
          'font-family': 'Arial',
          'font-size': '12px'
        }

        heading.css('display', 'inline-block');
        heading.css(defaultTextStyle);

        toolButtons.css('display', 'inline-block');
        header.hide();

        header.append(heading, toolButtons);
        surfaceBox.append(header);

        // toolButtons.hide();
        var surfacePropertyBox = $('<div></div>');
        surfaceBox.append(surfacePropertyBox);

        // Surface Type
        var surfaceType = $('<div></div>');

        var labelSurfaceType = $('<div></div>');
        labelSurfaceType.text('Surface Type');
        labelSurfaceType.css(defaultTextStyle);

        var listSurfaceType = new $3Dmol.UI.Form.ListInput(control.surfaceType, Object.keys($3Dmol.SurfaceType));


        surfaceType.append(labelSurfaceType, listSurfaceType.ui);
        surfacePropertyBox.append(surfaceType);

        listSurfaceType.setValue(Object.keys($3Dmol.SurfaceType)[0]);
        // Surface Style
        var surfaceStyle = $('<div></div>');

        var labelSurfaceStyle = $('<div></div>');
        // labelSurfaceStyle.text('Surface Style');

        var formSurfaceStyle = new $3Dmol.UI.Form(validSurfaceSpecs, control.surfaceStyle);

        surfaceStyle.append(labelSurfaceStyle, formSurfaceStyle.ui);
        surfacePropertyBox.append(surfaceStyle);

        // Surface Of
        var surfaceOf = $('<div></div>');

        var labelSurfaceOf = $('<div></div>');
        labelSurfaceOf.text('Surface Atoms');
        labelSurfaceOf.css(defaultTextStyle);

        var surfaceGeneratorAtomType = ['self', 'all'];
        var surfaceGeneratorDesc = {
          'self': 'Atoms in the selections will be used to generate the surface',
          'all': 'All the atoms will be used to generate the surface'
        }

        var listSurfaceOf = new $3Dmol.UI.Form.ListInput(control.surfaceOf, surfaceGeneratorAtomType);

        var hintbox = $('<div></div>');
        hintbox.css({
          'background-color': '#e4e4e4',
          'border': '1px solid grey',
          'color': 'grey',
          'padding': '2px',
          'border-radius': '3px',
          'font-family': 'Arial',
          'font-size': '12px',
          'font-weight': 'bold',
          'margin-top': '3px'
        });

        hintbox.hide();

        listSurfaceOf.update = function (control) {
          if (control.value == 'self') {
            hintbox.show();
            hintbox.text(surfaceGeneratorDesc['self']);
          }
          else if (control.value == 'all') {
            hintbox.show();
            hintbox.text(surfaceGeneratorDesc['all']);
          }
          else {
            hintbox.hide();
          }
        }

        listSurfaceOf.setValue('all');

        surfaceOf.append(labelSurfaceOf, listSurfaceOf.ui, hintbox);
        surfacePropertyBox.append(surfaceOf);

        // Surface For
        var selectionListElement = ['all'].concat(stateManager.getSelectionList());
        var surfaceFor = $('<div></div>');

        var labelSurfaceFor = $('<div></div>');
        labelSurfaceFor.text('Show Atoms');
        labelSurfaceFor.css(defaultTextStyle);

        var listSurfaceFor = new $3Dmol.UI.Form.ListInput(control.surfaceFor, selectionListElement);
        listSurfaceFor.setValue('all');

        surfaceFor.append(labelSurfaceFor, listSurfaceFor.ui);
        surfacePropertyBox.append(surfaceFor);

        var alertBox = new AlertBox();
        surfacePropertyBox.append(alertBox.ui);

        // Control Button
        var controlButton = $('<div></div>');
        var submit = new button(icons.tick, 16, { backgroundColor: 'lightgreen', tooltip: 'Submit' });
        var cancel = new button(icons.cross, 16, { backgroundColor: 'lightcoral', tooltip: 'Cancel' });
        controlButton.append(submit.ui);
        controlButton.append(cancel.ui);
        surfacePropertyBox.append(controlButton);

        // Functionality 
        removeButton.ui.on('click', { surfaceBox: surfaceBox }, function (e) {
          var id = e.data.surfaceBox.data('surf-id');
          surfaceBox.remove();
          stateManager.removeSurface(id);
        });

        editButton.ui.on('click', function () {
          surfacePropertyBox.toggle();

          // After creation of the surface box all the changes will be edit to the surfaces so on first submit toolButtons.editMode == true;
        });

        // Form Validation 

        var validateInput = this.validateInput = function () {
          var validated = true;

          if (!listSurfaceFor.validate()) {
            validated = false;
          }

          if (!listSurfaceOf.validate()) {
            validated = false;
          }

          if (!listSurfaceType.validate()) {
            validated = false;
          }

          if (!formSurfaceStyle.validate()) {
            validated = false;
          }

          return validated;
        }

        // edit this code to add on edit selection option to work
        // boundingBox.on('mouseenter', function(){
        //   selections = stateManager.getSelectionList();
        //   selectionListElement = selections.map( (m)=>{
        //     return m.id;
        //   });
        //   listSurfaceFor.updateList(selectionListElement);
        //   listSurfaceOf.updateList(selectionListElement);
        // });

        function finalize(id) {
          // element properties
          surfaceBox.data('surf-id', id);
          heading.text('surf#' + id);

          header.show();
          toolButtons.editMode = true;
          surfacePropertyBox.hide();
        }

        // Submit 
        submit.ui.on('click', {}, function () {
          listSurfaceFor.getValue();
          listSurfaceOf.getValue();
          listSurfaceType.getValue();
          formSurfaceStyle.getValue();

          if (validateInput()) {
            if (toolButtons.editMode === false) {
              var id = stateManager.addSurface(control);
              control.id = id;

              finalize(id);

              surfaces.push(this);
              _editingForm = false;
            }
            else {
              formSurfaceStyle.getValue();
              control.id = surfaceBox.data('surf-id');
              console.log('Edit surface called')
              stateManager.editSurface(control); // -> add updateSurface funciton to surfaceMenu
              surfacePropertyBox.hide();
            }
          }
          else {
            alertBox.error('Invalid Input');
          }
        });

        // Cancel Edit
        cancel.ui.on('click', {}, function () {
          if (toolButtons.editMode == false) {
            surfaceBox.detach();
            surfaceBox.remove();
            _editingForm = false;
          }
          else {
            surfacePropertyBox.hide();
            toolButtons.editMode = false;
          }
        });

        surfaceBox.on('keyup', (e) => {
          if (e.key == 'Enter') {
            submit.ui.trigger('click');
          }
        });

        /**
         * Finalizes the surface card with value specified in the surfaceSpec
         * 
         * @function Surface#editSurface 
         * @param {String} id Id of the surface generated by StateManager
         * @param {Object} surfaceSpec Different value of the surface menu
         */
        this.editSurface = function (id, surfaceSpec) {
          finalize(id);
          listSurfaceType.setValue(surfaceSpec.surfaceType.value);
          formSurfaceStyle.setValue(surfaceSpec.surfaceStyle.value);
          listSurfaceOf.setValue(surfaceSpec.surfaceOf.value);
          listSurfaceFor.setValue(surfaceSpec.surfaceFor.value);

          listSurfaceFor.getValue();
          listSurfaceOf.getValue();
          listSurfaceType.getValue();
          formSurfaceStyle.getValue();

        }

      }

      // Functionality

      // Surface addition

      addButton.ui.on('click', { surfaces: this }, function () {

        if (!_editingForm) {
          var newSurface = new Surface();
          newSurfaceSpace.append(newSurface.ui);
          _editingForm = true;
        } else {
          alertBox.warning('Please complete the previous form first');
        }


      });

      surfaceButton.ui.on('click', () => {
        displayBox.toggle();
      });

      /**
       * Clear all the surface cards 
       * @function SurfaceMenu#empty
       */

      this.empty = function () {
        newSurfaceSpace.empty();
        _editingForm = false;
      }

      /**
       * Add Surface in the Surface Menu 
       * 
       * @function SurfaceMenu#addSurface
       * @param {String} id Id of the surface generated in the StateManager
       * @param {Object} surfaceSpec Values of different property required for setting values in surface menu
       */
      this.addSurface = function (id, surfaceSpec) {
        var newSurface = new Surface();
        newSurfaceSpace.append(newSurface.ui);

        newSurface.editSurface(id, surfaceSpec);
      }
    }

    /*
     * Sets the css position property left and top for the element
     * 
     * @function setPosition
     * 
     * @param {object} jquery html element
     * @param {number} left : css left property
     * @param {number} top : css top peroperty
     */
    function setPosition(ele, left, top) {
      ele.css('left', left);
      ele.css('top', top);
    }


    /*
      * Sets the location of the element relative to the parseInt
      * as per position types
      * @function setLocation
      * 
      * @param  {Object} parent jquery object
      * @param  {Object} child  jquery object
      * @param  {String} x_type 'left|right'
      * @param  {String} y_type 'top|bottom'
      * @param  {Number} x_offset Offset x values in pixels
      * @param  {Number} y_offset Offset y values in pixels 
      */
    function setLocation(parent, child, x_type = 'left', y_type = 'top', x_offset = 0, y_offset = 0) {

      // p_ stands for parent
      child.css('z-index', 99);


      var p_width = getWidth(parent);
      var p_height = getHeight(parent);

      // c_ stand for child
      var c_width = child.outerWidth(); // includes padding and margin
      var c_height = child.outerHeight(); // includes padding and margin

      var padding = parseInt(parent.css('padding').replace('px', ''));
      padding = (padding) ? padding : 0;

      // Setting position
      var c_position = {
        left: 0,
        top: 0
      };

      if (x_type == 'left') {
        c_position.left = padding + x_offset;
      }
      else if (x_type == 'center') {
        c_position.left = p_width / 2 - c_width / 2 + x_offset;
      }
      else if (x_type == 'right') {
        c_position.left = p_width - c_width - padding + x_offset;
      }
      else {
        c_position.left = x_offset + padding;
      }

      if (y_type == 'top') {
        c_position.top = y_offset + padding;
      }
      else if (y_type == 'center') {
        c_position.top = p_height / 2 - c_height / 2 + y_offset;
      }
      else if (y_type == 'bottom') {
        c_position.top = p_height - c_height - y_offset - padding;
      }
      else {
        c_position.top = y_offset + padding;
      }

      setPosition(child, c_position.left, c_position.top);
    }

    // Copied from glviewer.js
    function getRect(container) {
      let div = container[0];
      let rect = div.getBoundingClientRect();
      if (rect.width == 0 && rect.height == 0 && div.style.display === 'none') {
        let oldpos = div.style.position;
        let oldvis = div.style.visibility;
        div.style.display = 'block';
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        rect = div.getBoundingClientRect();
        div.style.display = 'none';
        div.style.visibility = oldvis;
        div.style.position = oldpos;
      }
      return rect;
    }


    function getHeight(container) {
      return getRect(container).height;
    }

    function getWidth(container) {
      return getRect(container).width;
    }

    /*
      * button - generates button with the given markup as contents
      * @param {String} svg SVG markup string that contains the content of the button
      * @param {Number} height Height of the content
      * @param {Object} config Various properties to define the button 
      * 
      */
    function button(svg, height, config) {
      config = config || {};
      var borderRadius = config.bfr * height || (height / 4); // body radius factor
      var bgColor = config.backgroundColor || 'rgb(177, 194, 203)';
      var color = config.color || 'black';
      var hoverable = config.hoverable || 'true';
      var tooltipText = config.tooltip || null;

      // Button instance
      var button = this.ui = $('<div></div>');
      var innerButton = $('<div></div>');
      button.append(innerButton);

      // CSS
      button.css('box-sizing', 'border-box');
      button.css('display', 'inline-block');
      button.css('margin', '3px');
      button.css('height', height);
      button.css('width', height);
      button.css('border-radius', borderRadius + 'px');

      //  button.css('padding', '3px');
      button.css('color', color);
      button.css('background', bgColor);

      innerButton.css('display', 'flex');
      innerButton.css('justify-content', 'center');
      innerButton.css('align-items', 'center');
      innerButton.css('padding', '2px');

      // content
      this.setSVG = function (svg) {
        innerButton.empty();
        var formatted_content = $(svg);
        innerButton.append(formatted_content);

      }

      this.setSVG(svg);

      // Hover

      // Setting up tool tip
      button.css({
        'position': 'relative'
      });


      // setting up tool tip
      if (tooltipText != null) {
        button.attr('title', tooltipText);
      }

      if (hoverable == 'true') {
        button.on('mouseenter',
          () => {
            button.css('box-shadow', '0px 0px 3px black');

          }).on('mouseleave',
            () => {
              button.css('box-shadow', 'none');

            }
          );

        // click
        button.on('mousedown', () => {
          button.css('box-shadow', '0px 0px 1px black');
        });

        button.on('mouseup', () => {
          button.css('box-shadow', '0px 0px 3px black');
        });

        button.on('mousemove', () => {
          // mouseX = e.clientX;
          // mouseY = e.clientY;
        });

      }
    }
  }

  return UI;
})();

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*************************!*\
  !*** ./src/ui/state.js ***!
  \*************************/

/*
 * $3Dmol.StateManager - StateManager creates the space to preserve the state of the ui and sync it with the GLViewer
 * @constructor 
 * @param {$3Dmol.GLViewer} glviewer StateManager is required to have interaction between glviewer and the ui. 
 * @param {Object} config Loads the user defined parameters to generate the ui and handle state
 */
$3Dmol.StateManager = (function(){

  function States(glviewer, config){
    config = config || glviewer.getConfig();
    config.ui = true;

    var canvas = $(glviewer.getCanvas());
    var parentElement = $(glviewer.container);

    var height = parentElement.height();
    var width = parentElement.width();
    var offset = canvas.offset();

    var uiOverlayConfig = {
      height : height,
      width : width,
      offset : offset,
      ui : config.ui || undefined
    }

    // Selection Handlers
    var selections = {};

    // Surface handlers
    var surfaces = {};

    // Label Handlers
    var labels = {};

    var atomLabel = {};

    /**
     * Add Selection from the ui to glviewer
     * 
     * @function $3Dmol.StateManager#addSelection
     * @param {Object} spec Object that contains the output from the form 
     * @param {String} sid If surface id being edited then sid is set to some string
     * @returns String
     */
    this.addSelection = function(spec, sid = null){

      var id = sid || makeid(4);

      var selectionSpec = {
        spec : spec,
        styles : {},
        hidden : false
      };

      if(sid == null)
        selections[id] = selectionSpec;
      else 
        selections[id].spec = selectionSpec.spec;

      render();
      return id;
    }

    /**
     * Return true if the selections contain at least one atom
     * 
     * @function $3Dmol.StateManager#checkAtoms
     * @param {AtomSelectionSpec} sel Atom selection spec
     * @returns Boolean
     */
    this.checkAtoms = function(sel){
      var atoms = glviewer.selectedAtoms(sel);
      if( atoms.length > 0)
        return true

      return false;
    }

    /**
     * Toggle the hidden property of the selection 
     * @function $3Dmol.StateManager#toggleHide
     * @param {String} sid Selection id
     */
    this.toggleHide = function(sid){
      selections[sid].hidden = !selections[sid].hidden;
      render();
    }

    /**
     * Removes the selection
     * @param {String} id Selection id
     */
    this.removeSelection = function(id) {
      delete selections[id];
      render();
    }

    /**
     * Add style and renders it into the viewport
     * 
     * @function $3Dmol.StateManager#addStyle 
     * @param {String} spec Output object of style form 
     * @param {String} sid Selection Id
     * @param {String} stid Style Id
     * @returns String
     */
    this.addStyle = function( spec, sid, stid = null){
      var selection = selections[sid];
      
      
      var styleSpec = {
        spec : spec,
        hidden : false
      }
      
      var id = null; 
      
      if(stid == null) {
        id = makeid(4);
        selection.styles[id] = styleSpec
      }
      else {
        id = stid;
        selection.styles[id].spec = spec;
      }
      
      render();

      return id;
    }

    
    /**
     * Removes the style specified by stid
     * 
     * @function $3Dmol.StateManager#removeStyle 
     * @param {String} sid Selection id
     * @param {String} stid Style Id
     */
    this.removeStyle = function(sid, stid){
      delete selections[sid].styles[stid];
      render();
    }


    /**
     * Toggle hidden property of a style 
     * 
     * @function $3Dmol.StateManager#toggleHideStyle
     * @param {String} sid Selection Id
     * @param {String} stid Style Id 
     */
    this.toggleHideStyle = function(sid, stid){
      selections[sid].styles[stid].hidden = !selections[sid].styles[stid].hidden;
      render();
    }

    /**
     * Adds surface to the viewport
     * 
     * @function $3Dmol.StateManager#addSurface
     * @param {Object} property Surface output object
     * @param {Function} callback callback
     * @returns String
     */
    this.addSurface = function(property, callback){
      var id = makeid(4);
      property.id = id;

      var style = property.surfaceStyle.value;
      if(style == null)
        style = {};

      var sel = (property.surfaceFor.value == 'all') ? { spec : {} } : selections[property.surfaceFor.value];

      var generatorAtom = (property.surfaceOf.value == 'self')? sel.spec : {};


      glviewer.addSurface(
        $3Dmol.SurfaceType[property.surfaceType.value],
        style,
        sel.spec,
        generatorAtom
      ).then((surfParam)=>{
        surfaces[id] = surfParam[0];

        if(callback != undefined)
          callback(id, surfParam[0]);
      }, ()=>{

      });

      return id;
    }

    /**
     * Removes surface from the viewport 
     * @function $3Dmol.StateManager#removeSurface
     * @param {String} id Surface Id
     */
    this.removeSurface = function(id){
      glviewer.removeSurface(surfaces[id])

      delete surfaces[id];

    }

    /**
     * Edit the exisiting surface in the viewport
     * 
     * @function $3Dmol.StateManager#editSurface
     * @param {Object} surfaceProperty Surface Style
     */
    this.editSurface = function(surfaceProperty){
      var style = surfaceProperty.surfaceStyle.value || {}

      var sel = (surfaceProperty.surfaceFor.value == 'all') ? { spec : {} } : selections[surfaceProperty.surfaceFor.value];
      var generatorAtom = (surfaceProperty.surfaceOf.value == 'self')? sel.spec : {};

      glviewer.removeSurface(surfaces[surfaceProperty.id]);

      console.log(surfaceProperty);
      glviewer.addSurface(
        $3Dmol.SurfaceType[surfaceProperty.surfaceType.value],
        style,
        sel.spec,
        generatorAtom
      ).then((surfId)=>{
        surfaces[surfaceProperty.id] = surfId[0];
      });
    }

    /**
     * Returns the list of ids of selections that are created so far
     * @function $3Dmol.StateManager#getSelectionList
     * @returns <Array of selection ids>
     */
    this.getSelectionList = function(){
      return Object.keys(selections);
    }

    /**
     * Opens context menu when called from glviewer
     * 
     * @function $3Dmol.StateManager#openContextMenu
     * @param {AtomSpec} atom Atom spec obtained from context menu event
     * @param {Number} x x coordinate of mouse on viewport
     * @param {Number} y y coordinate of mouse on the viewport
     */
    this.openContextMenu = function(atom, x, y){ 
      var atomExist = false;

      if(atom){
        atomExist = Object.keys(atomLabel).find((i)=>{
          if (i == atom.index)
            return true;
          else 
            return false;
        });
  
        if(atomExist != undefined )
          atomExist = true;
        else 
          atomExist = false;
        
      }

      if(this.ui) this.ui.tools.contextMenu.show(x, y, atom, atomExist);    
    }

    glviewer.userContextMenuHandler = this.openContextMenu.bind(this);

    /**
     * Adds Label to the viewport specific to the selection
     * @function $3Dmol.StateManager#addLabel
     * @param {Object} labelValue Output object from label form of Context Menu
     */
    this.addLabel = function(labelValue){
      labels[labelValue.sel.value] = labels[labelValue.sel.value] || [];

      var labelProp = $3Dmol.labelStyles[labelValue.style.value];
      var selection = selections[labelValue.sel.value];

      var offset = labels[labelValue.sel.value].length;
      labelProp['screenOffset'] = new $3Dmol.Vector2(0, -1*offset*35);

      labels[labelValue.sel.value].push(glviewer.addLabel(labelValue.text.value, labelProp, selection.spec));

      this.ui.tools.contextMenu.hide();
    }

    /**
     * Adds atom label to the viewport
     * 
     * @function $3Dmol.StateManager#addAtomLabel
     * @param {Object} labelValue Output object from propertyMenu form of Context Menu
     * @param {AtomSpec} atom Atom spec that are to be added in the label 
     */
    this.addAtomLabel = function(labelValue, atom, styleName='milk'){
      var atomExist = Object.keys(atomLabel).find((i)=>{
        if (i == atom.index)
          return true;
        else 
          return false;
      });

      if(atomExist != undefined )
        atomExist = true;
      else 
        atomExist = false;


      if(atomExist){
        this.removeAtomLabel(atom);
      }

      
      atomLabel[atom.index] = atomLabel[atom.index] || null;
      
      var labelProp = $3Dmol.deepCopy($3Dmol.labelStyles[styleName]);
      labelProp.position = {
        x : atom.x, y : atom.y, z : atom.z
      }

      var labelText = [];
      for (let key in labelValue){
        labelText.push(`${key} : ${labelValue[key]}`);
      }
      labelText = labelText.join('\n');

      atomLabel[atom.index] = glviewer.addLabel(labelText, labelProp);
      
    }

    /**
     * Executes hide context menu and process the label if needed
     * 
     * @function $3Dmol.StateManager#exitContextMenu
     * @param {Boolean} processContextMenu Specify the need to process the values in the context menu
     */
    this.exitContextMenu = function(processContextMenu = false){
        if(this.ui) {
            this.ui.tools.contextMenu.hide(processContextMenu);
        }
    }

    glviewer.container.addEventListener('wheel', this.exitContextMenu.bind(this), { passive: false });

    /**
     * Removes the label specific to the selection 
     * 
     * (under development)
     */
    this.removeLabel = function(){
      // Add code to remove label 
      this.ui.tools.contextMenu.hide();
    }

    /**
     * Removes the atom label from the viewpoer 
     * @function $3Dmol.StateManager#removeAtomLabel
     * @param {AtomSpec} atom Atom spec
     */
    this.removeAtomLabel = function(atom){
      var label = atomLabel[atom.index];
      glviewer.removeLabel(label);
      delete atomLabel[atom.index]; 
      
      this.ui.tools.contextMenu.hide();
    }

    /**
     * Add model to the viewport
     * @function $3Dmol.StateManager#addModel
     * @param {Object} modelDesc Model Toolbar output
     */
    this.addModel = function(modelDesc){
      glviewer.removeAllModels();
      glviewer.removeAllSurfaces();
      glviewer.removeAllLabels();
      glviewer.removeAllShapes();

      var query = modelDesc.urlType.value + ':' + modelDesc.url.value;
      $3Dmol.download(query, glviewer, {}, ()=>{
        this.ui.tools.modelToolBar.setModel(modelDesc.url.value.toUpperCase());
      });

      // Remove all Selections
      selections = {};
      surfaces = {};
      atomLabel = {};
      labels = {};

      // Reset UI
      this.ui.tools.selectionBox.empty();
      this.ui.tools.surfaceMenu.empty();
    }

    // State Management helper function 
    function findSelectionBySpec(spec){
      var ids = Object.keys(selections);
      var matchingObjectIds = null;
      for(var i = 0; i < ids.length; i++){
        var lookSelection = selections[ids[i]].spec;

        var match = true;
        
        // looking for same parameters length 
        var parameters = Object.keys(spec);

        if( Object.keys(lookSelection).length == parameters.length){
          for(var j = 0; j < parameters.length; j++){
            if( lookSelection[parameters[j]] != spec[parameters[j]]){
              match = false;
              break;
            }
          }
        } else {
          match = false;
        }

        if(match){
          matchingObjectIds = ids[i];
          break;
        }
      }

      return matchingObjectIds;
    }

    // State managment function 

    /**
     * Updates the state variable for selections and styles and trigger ui to show the 
     * ui elements for these selections and styles.
     * 
     * @function $3Dmol.StateManager#createSelectionAndStyle
     * @param {AtomSelectionSpec} selSpec Atom Selection Spec
     * @param {AtomStyleSpec} styleSpec Atom Style Spec
     */
    this.createSelectionAndStyle = function(selSpec, styleSpec){

      var selId = findSelectionBySpec(selSpec);

      if(selId == null){
        selId = this.addSelection(selSpec);
      }

      var styleId = null;

      if(Object.keys(styleSpec).length != 0){
        styleId = this.addStyle(styleSpec, selId);
      }

      this.ui.tools.selectionBox.editSelection(selId, selSpec, styleId, styleSpec);
      
    };

    /**
     * Creates selection and add surface with reference to that selection 
     * and triggers updates in the ui
     * @function $3Dmol.StateManager#createSurface
     * @param {String} surfaceType Type of surface to be created
     * @param {AtomSelectionSpec} sel Atom selection spec
     * @param {AtomStyleSpec} style Atom style spec
     * @param {String} sid selection id
     */
    this.createSurface = function(surfaceType, sel, style, sid){
      var selId = findSelectionBySpec(sel);
      
      if(selId == null){
        selId = this.addSelection();

      }
      this.ui.tools.selectionBox.editSelection(selId, sel, null);

      surfaceType = Object.keys(style)[0];

      var surfaceInput = {
        surfaceType : {
          value : surfaceType
        },

        surfaceStyle : {
          value : style[surfaceType],
        },

        surfaceOf : {
          value : 'self'
        },

        surfaceFor : {
          value : selId
        }
      }

      var surfId = makeid(4);
      surfaces[surfId] = sid;

      this.ui.tools.surfaceMenu.addSurface(surfId, surfaceInput);

      // Create Surface UI
    };

    /**
     * Sets the value of title in ModelToolBar
     * @function $3Dmol.StateManager#setModelTitle
     * @param {String} title Model title
     */
    this.setModelTitle = function(title){
      this.ui.tools.modelToolBar.setModel(title);
    }

    canvas.on('click', ()=>{
      if(this.ui && this.ui.tools.contextMenu.hidden == false){
        this.ui.tools.contextMenu.hide();
      }
    });
    
    // Setting up UI generation 
    /**
     * Generates the ui and returns its reference
     * @returns $3Dmol.UI
     */
    this.showUI = function(){
      var ui = new $3Dmol.UI(this, uiOverlayConfig, parentElement);  
      return ui;
    };

    if(config.ui == true){
     this.ui = this.showUI(); 
    }

    this.initiateUI = function(){
      this.ui = new $3Dmol.UI(this, uiOverlayConfig, parentElement);
      render();
    }
    /**
     * Updates the UI on viewport change 
     * 
     * @function $3Dmol.StateManager#updateUI
     */
    this.updateUI = function(){
      if(this.ui){
        this.ui.resize();
      }
    };

    window.addEventListener("resize",this.updateUI.bind(this));

    if (typeof (window.ResizeObserver) !== "undefined") {
        this.divwatcher = new window.ResizeObserver(this.updateUI.bind(this));
        this.divwatcher.observe(glviewer.container);
    }

    
    // UI changes

    function render(){
      // glviewer.();
      glviewer.setStyle({});

      let selList = Object.keys(selections);

      selList.forEach( (selKey) =>{
        var sel = selections[selKey];

        if( !sel.hidden ) {
          var styleList = Object.keys(sel.styles);
          
          styleList.forEach((styleKey)=>{
            var style = sel.styles[styleKey];

            if( !style.hidden){
              glviewer.addStyle(sel.spec, style.spec);
            }
          });

          glviewer.setClickable(sel.spec, true, ()=>{});
          glviewer.enableContextMenu(sel.spec, true);
        }
        else {
          glviewer.setClickable(sel.spec, false, ()=>{});
          glviewer.enableContextMenu(sel.spec, false);
        }

      })

      glviewer.render();
    }

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
    }
  }

  return States;
})()

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./src/ui/icon.js ***!
  \************************/
/**
 * Generates the object to hold different icons present Icons : move, rotate, pencil, listArrow, option, minus, plus, painbrush, select, movie.play, move.pause, movie.stop, movie.next, move.previous, tick, cross, edit, remove, list, style, visible, invisible, mouse, nomouse, label, surface, molecule, change
 * @function $3Dmol.UI#Icons
 * 
 * 
 */
$3Dmol.UI.Icons = (function () {
  function Icons() {
    this.move = `<svg  id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M31.338,14.538L27.38,10.58C26.994,10.193,26.531,10,26,10c-1.188,0-2,1.016-2,2c0,0.516,0.186,0.986,0.58,1.38L25.2,14H18  V6.8l0.62,0.62C19.014,7.814,19.484,8,20,8c0.984,0,2-0.813,2-2c0-0.531-0.193-0.994-0.58-1.38l-3.973-3.974  C17.08,0.279,16.729,0,16,0s-1.135,0.334-1.463,0.662L10.58,4.62C10.193,5.006,10,5.469,10,6c0,1.188,1.016,2,2,2  c0.516,0,0.986-0.186,1.38-0.58L14,6.8V14H6.8l0.62-0.62C7.814,12.986,8,12.516,8,12c0-0.984-0.813-2-2-2  c-0.531,0-0.994,0.193-1.38,0.58l-3.958,3.958C0.334,14.866,0,15.271,0,16s0.279,1.08,0.646,1.447L4.62,21.42  C5.006,21.807,5.469,22,6,22c1.188,0,2-1.016,2-2c0-0.516-0.186-0.986-0.58-1.38L6.8,18H14v7.2l-0.62-0.62  C12.986,24.186,12.516,24,12,24c-0.984,0-2,0.813-2,2c0,0.531,0.193,0.994,0.58,1.38l3.957,3.958C14.865,31.666,15.271,32,16,32  s1.08-0.279,1.447-0.646l3.973-3.974C21.807,26.994,22,26.531,22,26c0-1.188-1.016-2-2-2c-0.516,0-0.986,0.186-1.38,0.58L18,25.2V18  h7.2l-0.62,0.62C24.186,19.014,24,19.484,24,20c0,0.984,0.813,2,2,2c0.531,0,0.994-0.193,1.38-0.58l3.974-3.973  C31.721,17.08,32,16.729,32,16S31.666,14.866,31.338,14.538z"/>
    </svg>
    `;


    this.rotate = `<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
    <style type="text/css">
    .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
    </style>
    <polyline class="st0" points="19,19 24,19 24,24 "/>
    <polyline class="st0" points="6,23 11,23 11,18 "/>
    <path class="st0" d="M24,19.4c-0.7,0.8-1.4,1.6-2.2,2.4c-7,7-15.3,10.2-18.5,7s-0.1-11.5,7-18.5s15.3-10.2,18.5-7
    c1.4,1.4,1.6,3.6,0.8,6.3"/>
    <path class="st0" d="M11,22.5c-0.3-0.2-0.5-0.5-0.8-0.8c-7-7-10.2-15.3-7-18.5s11.5-0.1,18.5,7s10.2,15.3,7,18.5
    c-1.7,1.7-4.8,1.6-8.4,0.1"/>
    </svg>`;

    this.pencil = `
    <svg
   viewBox="0 0 7.4083332 7.4083335"
   version="1.1"
   id="svg46458"
   inkscape:version="1.1 (c68e22c387, 2021-05-23)"
   sodipodi:docname="pencil.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview46460"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:document-units="mm"
     showgrid="false"
     units="px"
     inkscape:zoom="11.859035"
     inkscape:cx="39.252773"
     inkscape:cy="-0.54810532"
     inkscape:window-width="1920"
     inkscape:window-height="1017"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="layer1" />
  <defs
     id="defs46455" />
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <g
       id="g46369"
       style="opacity:0.883991"
       transform="matrix(1.4892662,-0.15686655,0.15686655,1.4892662,-53.265394,-119.92352)">
      <g
         id="g49150"
         transform="matrix(0.91743541,0,0,0.91743541,23.648257,-4.2024208)"
         style="opacity:0.883991">
        <path
           style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           d="m 3.8020268,100.20944 0.4890573,-1.325191 3.1552092,-2.461061 0.8203543,1.009666 -3.2340893,2.476838 z"
           id="path47163"
           sodipodi:nodetypes="cccccc" />
        <path
           style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           d="m 4.7012611,98.537178 -0.2738716,0.535677 0.5184006,-0.125499 -0.1893126,0.512722 0.5048334,-0.102546 -0.2287526,0.55216"
           id="path47167"
           sodipodi:nodetypes="cccccc" />
        <path
           style="fill:none;stroke:#000000;stroke-width:0.288395px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           d="m 4.0143928,99.803763 0.189158,0.257937 -0.4015317,0.14774 z"
           id="path46061" />
      </g>
      <path
         style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 29.910684,84.806844 0.691621,0.847804"
         id="path46176" />
    </g>
  </g>
</svg>

    `;

    this.listArrow = `
    <svg
    viewBox="0 0 7.4083332 7.4083335"
    version="1.1"
    id="svg41603"
    inkscape:version="1.1 (c68e22c387, 2021-05-23)"
    sodipodi:docname="listArrow.svg"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
   <sodipodi:namedview
      id="namedview41605"
      pagecolor="#ffffff"
      bordercolor="#666666"
      borderopacity="1.0"
      inkscape:pageshadow="2"
      inkscape:pageopacity="0.0"
      inkscape:pagecheckerboard="0"
      inkscape:document-units="mm"
      showgrid="false"
      units="px"
      inkscape:zoom="16.771208"
      inkscape:cx="16.635653"
      inkscape:cy="11.120248"
      inkscape:window-width="1920"
      inkscape:window-height="1017"
      inkscape:window-x="-8"
      inkscape:window-y="-8"
      inkscape:window-maximized="1"
      inkscape:current-layer="layer1" />
   <defs
      id="defs41600" />
   <g
      inkscape:label="Layer 1"
      inkscape:groupmode="layer"
      id="layer1">
     <path
        style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
        d="M 1.991198,0.89301893 5.7166459,3.7041667 1.991198,6.5153145 Z"
        id="path42297"
        sodipodi:nodetypes="cccc" />
   </g>
 </svg>
 
    `;

    this.option = ` <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>69.option</title><g id="_69.option" data-name="69.option"><rect class="cls-1" x="1" y="1" width="9" height="9" rx="2" ry="2"/><rect class="cls-1" x="14" y="1" width="9" height="9" rx="2" ry="2"/><rect class="cls-1" x="14" y="14" width="9" height="9" rx="2" ry="2"/><rect class="cls-1" x="1" y="14" width="9" height="9" rx="2" ry="2"/></g></svg>`;

    this.minus = `<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

    this.plus = `<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

    this.paintbrush = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 444.892 444.892" style="enable-background:new 0 0 444.892 444.892;" xml:space="preserve">
    <g id="XMLID_476_">
    <path id="XMLID_503_" d="M440.498,173.103c5.858-5.857,5.858-15.355,0-21.213l-22.511-22.511c-5.091-5.091-13.084-5.846-19.038-1.8
    l-47.332,32.17l31.975-47.652c3.993-5.951,3.219-13.897-1.85-18.964l-48.83-48.83c-4.508-4.508-11.372-5.675-17.114-2.908
    l-8.443,4.065l4.043-8.97c2.563-5.685,1.341-12.361-3.068-16.771L293.002,4.393c-5.857-5.857-15.355-5.857-21.213,0
    l-119.06,119.059l168.71,168.71L440.498,173.103z"/>
    <path id="XMLID_1199_" d="M130.56,145.622l-34.466,34.466c-2.813,2.813-4.394,6.628-4.394,10.606s1.58,7.794,4.394,10.606
    l32.694,32.694c6.299,6.299,9.354,14.992,8.382,23.849c-0.971,8.851-5.843,16.677-13.366,21.473
    C27.736,340.554,18.781,349.51,15.839,352.453c-21.119,21.118-21.119,55.48,0,76.6c21.14,21.14,55.504,21.098,76.6,0
    c2.944-2.943,11.902-11.902,73.136-107.965c4.784-7.505,12.607-12.366,21.462-13.339c8.883-0.969,17.575,2.071,23.859,8.354
    l32.694,32.694c5.857,5.857,15.356,5.857,21.213,0l34.467-34.467L130.56,145.622z M70.05,404.825c-8.28,8.28-21.704,8.28-29.983,0
    c-8.28-8.28-8.28-21.704,0-29.983c8.28-8.28,21.704-8.28,29.983,0C78.33,383.121,78.33,396.545,70.05,404.825z"/>
    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    `;

    this.select = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
    <g>
    <path d="M416,149.333c-8.768,0-16.939,2.667-23.723,7.211C386.432,139.947,370.581,128,352,128
    c-8.768,0-16.939,2.667-23.723,7.211c-5.845-16.597-21.696-28.544-40.277-28.544c-7.765,0-15.061,2.091-21.333,5.739V42.667
    C266.667,19.136,247.531,0,224,0s-42.667,19.136-42.667,42.667v249.408l-58.645-29.333C113.856,258.325,103.957,256,94.08,256
    c-22.485,0-40.747,18.283-40.747,40.875c0,10.901,4.245,21.12,11.947,28.821l137.941,137.941C234.389,494.827,275.883,512,320,512
    c76.459,0,138.667-62.208,138.667-138.667V192C458.667,168.469,439.531,149.333,416,149.333z M437.333,373.333
    c0,64.704-52.651,117.333-117.355,117.333c-38.421,0-74.517-14.955-101.653-42.133L80.363,310.592
    c-3.669-3.648-5.696-8.533-5.696-13.845c0-10.709,8.704-19.413,19.413-19.413c6.592,0,13.163,1.557,19.072,4.501l74.091,37.035
    c3.307,1.643,7.253,1.472,10.368-0.469c3.136-1.941,5.056-5.376,5.056-9.067V42.667c0-11.755,9.557-21.333,21.333-21.333
    s21.333,9.579,21.333,21.333v202.667c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667v-96
    c0-11.755,9.557-21.333,21.333-21.333s21.333,9.579,21.333,21.333v96c0,5.888,4.779,10.667,10.667,10.667
    s10.667-4.779,10.667-10.667v-74.667c0-11.755,9.557-21.333,21.333-21.333s21.333,9.579,21.333,21.333v74.667
    c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667V192c0-11.755,9.557-21.333,21.333-21.333
    s21.333,9.579,21.333,21.333V373.333z"/>
    </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;

    this.movie = {};
    this.movie.play = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
    <g id="XMLID_228_">
    <path id="XMLID_229_" d="M236.95,152.281l-108-67.501c-4.624-2.89-10.453-3.044-15.222-0.4C108.959,87.024,106,92.047,106,97.5v135
    c0,5.453,2.959,10.476,7.728,13.12c2.266,1.256,4.77,1.88,7.271,1.88c2.763,0,5.523-0.763,7.95-2.28l108-67.499
    c4.386-2.741,7.05-7.548,7.05-12.72C244,159.829,241.336,155.022,236.95,152.281z"/>
    <path id="XMLID_230_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300
    c-74.44,0-135-60.561-135-135S90.56,30,165,30s135,60.561,135,135S239.439,300,165,300z"/>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;

    this.movie.stop = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
    <g id="XMLID_223_">
    <path id="XMLID_224_" d="M225.75,89.25h-121.5c-8.284,0-15,6.716-15,15v121.5c0,8.284,6.716,15,15,15h121.5c8.284,0,15-6.716,15-15
    v-121.5C240.75,95.966,234.034,89.25,225.75,89.25z"/>
    <path id="XMLID_225_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300
    c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"/>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;

    this.movie.pause = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 271.953 271.953" style="enable-background:new 0 0 271.953 271.953;" xml:space="preserve">
    <g>
    <g>
    <path style="fill:#010002;" d="M135.977,271.953c75.097,0,135.977-60.879,135.977-135.977S211.074,0,135.977,0S0,60.879,0,135.977
    S60.879,271.953,135.977,271.953z M135.977,21.756c62.979,0,114.22,51.241,114.22,114.22s-51.241,114.22-114.22,114.22
    s-114.22-51.241-114.22-114.22S72.992,21.756,135.977,21.756z"/>
    <path style="fill:#010002;" d="M110.707,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598
    c-7.511,0-13.598,6.086-13.598,13.598v103.342C97.109,194.028,103.195,200.114,110.707,200.114z"/>
    <path style="fill:#010002;" d="M165.097,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598
    S151.5,75.663,151.5,83.174v103.342C151.5,194.028,157.586,200.114,165.097,200.114z"/>
    </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;
    this.movie.next = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->

    <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 30.05 30.05"
    style="enable-background:new 0 0 30.05 30.05;"
    xml:space="preserve"
    sodipodi:docname="next.svg"
    inkscape:version="1.1 (c68e22c387, 2021-05-23)"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"><defs
    id="defs73" /><sodipodi:namedview
    id="namedview71"
    pagecolor="#ffffff"
    bordercolor="#666666"
    borderopacity="1.0"
    inkscape:pageshadow="2"
    inkscape:pageopacity="0.0"
    inkscape:pagecheckerboard="0"
    showgrid="false"
    inkscape:zoom="19.851347"
    inkscape:cx="11.938737"
    inkscape:cy="15.79238"
    inkscape:window-width="1920"
    inkscape:window-height="1017"
    inkscape:window-x="-8"
    inkscape:window-y="-8"
    inkscape:window-maximized="1"
    inkscape:current-layer="Capa_1" />
    <g
    id="g38"
    transform="rotate(180,15.025,15.025)">
    <path
    d="m 20.814,11 c -0.193,-0.102 -0.43,-0.086 -0.604,0.041 l -2.383,1.73 v -1.258 c 0,-0.217 -0.121,-0.42 -0.32,-0.514 -0.191,-0.102 -0.424,-0.086 -0.602,0.041 l -4.834,3.512 c -0.15,0.109 -0.242,0.287 -0.242,0.473 0,0.184 0.092,0.357 0.242,0.471 l 4.834,3.508 c 0.102,0.076 0.221,0.111 0.342,0.111 0.088,0 0.18,-0.018 0.26,-0.066 0.199,-0.1 0.32,-0.295 0.32,-0.516 v -1.26 l 2.383,1.73 c 0.098,0.076 0.221,0.111 0.34,0.111 0.094,0 0.182,-0.018 0.264,-0.066 0.197,-0.1 0.318,-0.295 0.318,-0.516 v -7.02 C 21.133,11.297 21.012,11.094 20.814,11 Z"
    id="path2" />
    <path
    d="M 15.027,0 C 6.729,0 0,6.729 0,15.025 0,23.326 6.729,30.05 15.027,30.05 23.325,30.05 30.05,23.325 30.05,15.025 30.051,6.729 23.326,0 15.027,0 Z m 0,27.539 C 8.115,27.539 2.509,21.935 2.509,15.025 2.509,8.115 8.115,2.51 15.027,2.51 c 6.914,0 12.516,5.605 12.516,12.516 0,6.911 -5.602,12.513 -12.516,12.513 z"
    id="path4" />
    <path
    d="M 10.617,11.146 H 9.225 c -0.168,0 -0.305,0.137 -0.305,0.305 v 7.146 c 0,0.168 0.137,0.309 0.305,0.309 h 1.393 c 0.17,0 0.307,-0.141 0.307,-0.309 v -7.146 c -0.001,-0.168 -0.138,-0.305 -0.308,-0.305 z"
    id="path6" />
    <g
    id="g8">
    </g>
    <g
    id="g10">
    </g>
    <g
    id="g12">
    </g>
    <g
    id="g14">
    </g>
    <g
    id="g16">
    </g>
    <g
    id="g18">
    </g>
    <g
    id="g20">
    </g>
    <g
    id="g22">
    </g>
    <g
    id="g24">
    </g>
    <g
    id="g26">
    </g>
    <g
    id="g28">
    </g>
    <g
    id="g30">
    </g>
    <g
    id="g32">
    </g>
    <g
    id="g34">
    </g>
    <g
    id="g36">
    </g>
    </g>
    <g
    id="g40"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g42"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g44"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g46"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g48"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g50"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g52"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g54"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g56"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g58"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g60"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g62"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g64"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g66"
    transform="rotate(180,15.025,15.025)">
    </g>
    <g
    id="g68"
    transform="rotate(180,15.025,15.025)">
    </g>
    </svg>
    `;
    this.movie.previous = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 30.05 30.05" style="enable-background:new 0 0 30.05 30.05;" xml:space="preserve">
    <g>
    <path d="M20.814,11c-0.193-0.102-0.43-0.086-0.604,0.041l-2.383,1.73v-1.258c0-0.217-0.121-0.42-0.32-0.514
    c-0.191-0.102-0.424-0.086-0.602,0.041l-4.834,3.512c-0.15,0.109-0.242,0.287-0.242,0.473c0,0.184,0.092,0.357,0.242,0.471
    l4.834,3.508c0.102,0.076,0.221,0.111,0.342,0.111c0.088,0,0.18-0.018,0.26-0.066c0.199-0.1,0.32-0.295,0.32-0.516v-1.26
    l2.383,1.73c0.098,0.076,0.221,0.111,0.34,0.111c0.094,0,0.182-0.018,0.264-0.066c0.197-0.1,0.318-0.295,0.318-0.516v-7.02
    C21.133,11.297,21.012,11.094,20.814,11z"/>
    <path d="M15.027,0C6.729,0,0,6.729,0,15.025C0,23.326,6.729,30.05,15.027,30.05S30.05,23.325,30.05,15.025
    C30.051,6.729,23.326,0,15.027,0z M15.027,27.539c-6.912,0-12.518-5.604-12.518-12.514S8.115,2.51,15.027,2.51
    c6.914,0,12.516,5.605,12.516,12.516S21.941,27.539,15.027,27.539z"/>
    <path d="M10.617,11.146H9.225c-0.168,0-0.305,0.137-0.305,0.305v7.146c0,0.168,0.137,0.309,0.305,0.309h1.393
    c0.17,0,0.307-0.141,0.307-0.309v-7.146C10.924,11.283,10.787,11.146,10.617,11.146z"/>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;


    this.tick = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
      <g>
        <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M386.594,226.664
          L252.747,360.511c-7.551,7.551-17.795,11.794-28.475,11.794s-20.923-4.243-28.475-11.795l-70.388-70.389
          c-15.726-15.726-15.726-41.223,0.001-56.95c15.727-15.725,41.224-15.726,56.95,0.001l41.913,41.915l105.371-105.371
          c15.727-15.726,41.223-15.726,56.951,0.001C402.319,185.44,402.319,210.938,386.594,226.664z"/>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;

    this.cross = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve">
    <g>
      <g>
        <path d="M227.5,0C101.761,0,0,101.75,0,227.5C0,353.239,101.75,455,227.5,455C353.239,455,455,353.25,455,227.5
          C455.001,101.761,353.251,0,227.5,0z M310.759,268.333c11.715,11.716,11.715,30.711,0,42.427
          c-5.858,5.858-13.536,8.787-21.213,8.787s-15.355-2.929-21.213-8.787L227.5,269.927l-40.832,40.832
          c-5.858,5.858-13.536,8.787-21.213,8.787s-15.355-2.929-21.213-8.787c-11.715-11.716-11.715-30.711,0-42.427l40.832-40.832
          l-40.832-40.832c-11.715-11.716-11.715-30.711,0-42.427c11.716-11.716,30.711-11.716,42.427,0l40.832,40.832l40.832-40.832
          c11.716-11.716,30.711-11.716,42.427,0c11.715,11.716,11.715,30.711,0,42.427L269.927,227.5L310.759,268.333z"/>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;

    this.edit = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 490.008 490.008" style="enable-background:new 0 0 490.008 490.008;" xml:space="preserve">
    <g>
      <g>
        <g>
          <path d="M156.7,142.865h88.6c11.5,0,20.8-9.4,20.8-20.9s-9.4-20.9-20.8-20.9h-88.6c-11.5,0-20.8,9.4-20.8,20.9
            C135.9,133.465,145.3,142.865,156.7,142.865z"/>
          <path d="M266.1,223.165c0-11.5-9.4-20.9-20.8-20.9h-88.6c-11.5,0-20.8,9.4-20.8,20.9s9.4,20.9,20.8,20.9h88.6
            C256.8,244.065,266.1,234.665,266.1,223.165z"/>
          <ellipse cx="94.2" cy="122.065" rx="20.5" ry="20.5"/>
          <ellipse cx="94.2" cy="223.165" rx="20.5" ry="20.5"/>
        </g>
        <path d="M483.7,258.965l-81.3-81.3c-8.3-8.3-20.8-8.3-29.2,0l-24.3,24.2v-168.5c0-18.4-14.9-33.3-33.3-33.3H33.3
          c-18.4,0-33.3,15-33.3,33.3v281c0,18.4,14.9,33.3,33.3,33.3h169l-4.1,4c-2.1,3.1-4.2,6.3-5.2,10.4l-20.8,102.2
          c-3.9,20.1,10.4,28.2,24,25l102.1-20.9c4.2,0,7.3-2.1,10.4-5.2l175-175.1C487.9,284.065,495.5,272.165,483.7,258.965z M40,307.765
          v-267.7h269v201.5l-66.5,66.1H40V307.765z M283.7,428.965l-65.6,13.6l13.5-65.7l155.2-155.3l53.1,52.1L283.7,428.965z"/>
      </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    `;

    this.remove = `
    
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 310.285 310.285" style="enable-background:new 0 0 310.285 310.285;" xml:space="preserve">
<path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142
	C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32
	c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

    `;

    this.list = `
   <?xml version="1.0" encoding="iso-8859-1"?>
   <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
   <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
   <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 458.18 458.18" style="enable-background:new 0 0 458.18 458.18;" xml:space="preserve">
   <g>
     <path d="M36.09,5.948c-18.803,0-34.052,15.248-34.052,34.051c0,18.803,15.249,34.052,34.052,34.052
       c18.803,0,34.052-15.25,34.052-34.052C70.142,21.196,54.893,5.948,36.09,5.948z"/>
     <path d="M147.537,80h268.604c22.092,0,40-17.908,40-40s-17.908-40-40-40H147.537c-22.092,0-40,17.908-40,40S125.445,80,147.537,80z
       "/>
     <path d="M36.09,132.008c-18.803,0-34.052,15.248-34.052,34.051s15.249,34.052,34.052,34.052c18.803,0,34.052-15.249,34.052-34.052
       S54.893,132.008,36.09,132.008z"/>
     <path d="M416.142,126.06H147.537c-22.092,0-40,17.908-40,40s17.908,40,40,40h268.604c22.092,0,40-17.908,40-40
       S438.233,126.06,416.142,126.06z"/>
     <path d="M36.09,258.068c-18.803,0-34.052,15.248-34.052,34.051c0,18.803,15.249,34.052,34.052,34.052
       c18.803,0,34.052-15.249,34.052-34.052C70.142,273.316,54.893,258.068,36.09,258.068z"/>
     <path d="M416.142,252.119H147.537c-22.092,0-40,17.908-40,40s17.908,40,40,40h268.604c22.092,0,40-17.908,40-40
       S438.233,252.119,416.142,252.119z"/>
     <path d="M36.09,384.128c-18.803,0-34.052,15.248-34.052,34.051s15.249,34.053,34.052,34.053c18.803,0,34.052-15.25,34.052-34.053
       S54.893,384.128,36.09,384.128z"/>
     <path d="M416.142,378.18H147.537c-22.092,0-40,17.908-40,40s17.908,40,40,40h268.604c22.092,0,40-17.908,40-40
       S438.233,378.18,416.142,378.18z"/>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   </svg>
   `;

    this.style = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" clip-rule="evenodd" d="M13 21V13H21V21H13ZM15 15H19L19 19H15V15Z" fill="black"/>
   <path fill-rule="evenodd" clip-rule="evenodd" d="M3 11L3 3L11 3V11H3ZM5 5L9 5V9L5 9L5 5Z" fill="black"/>
   <path d="M18 6V12H16V8L12 8V6L18 6Z" fill="black"/>
   <path d="M12 18H6L6 12H8L8 16H12V18Z" fill="black"/>
   </svg>
   `;


    this.visible = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 98.48 98.48" style="enable-background:new 0 0 98.48 98.48;" xml:space="preserve"
 >
<g>
 <path d="M97.204,45.788c-0.865-1.02-21.537-24.945-47.963-24.945c-26.427,0-47.098,23.925-47.965,24.946
   c-1.701,2-1.701,4.902,0.001,6.904c0.866,1.02,21.537,24.944,47.964,24.944c26.426,0,47.098-23.926,47.964-24.946
   C98.906,50.691,98.906,47.789,97.204,45.788z M57.313,35.215c1.777-0.97,4.255,0.143,5.534,2.485
   c1.279,2.343,0.875,5.029-0.902,5.999c-1.776,0.971-4.255-0.143-5.535-2.485C55.132,38.871,55.535,36.185,57.313,35.215z
    M49.241,68.969c-18.46,0-33.995-14.177-39.372-19.729c3.631-3.75,11.898-11.429,22.567-16.021
   c-2.081,3.166-3.301,6.949-3.301,11.021c0,11.104,9.001,20.105,20.105,20.105s20.106-9.001,20.106-20.105
   c0-4.072-1.219-7.855-3.3-11.021C76.715,37.812,84.981,45.49,88.612,49.24C83.235,54.795,67.7,68.969,49.241,68.969z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g></svg>`;

    this.invisible = `<svg
version="1.1"
id="Capa_1"
x="0px"
y="0px"
viewBox="0 0 98.48 98.481"
style="enable-background:new 0 0 98.48 98.481;"
xml:space="preserve"
sodipodi:docname="invisible.svg"
inkscape:version="1.1 (c68e22c387, 2021-05-23)"
xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
xmlns="http://www.w3.org/2000/svg"
xmlns:svg="http://www.w3.org/2000/svg"><defs
id="defs45" /><sodipodi:namedview
id="namedview43"
pagecolor="#ffffff"
bordercolor="#666666"
borderopacity="1.0"
inkscape:pageshadow="2"
inkscape:pageopacity="0.0"
inkscape:pagecheckerboard="0"
showgrid="false"
inkscape:zoom="2.9869357"
inkscape:cx="4.8544735"
inkscape:cy="41.346722"
inkscape:window-width="1920"
inkscape:window-height="1017"
inkscape:window-x="-8"
inkscape:window-y="-8"
inkscape:window-maximized="1"
inkscape:current-layer="g8" />
<g
id="g10">
<g
id="g8">
 
 
 <g
id="g843"><path
  d="M69.322,44.716L49.715,64.323C60.438,64.072,69.071,55.438,69.322,44.716z"
  id="path2" /><path
  d="M97.204,45.789c-0.449-0.529-6.245-7.23-15.402-13.554l-6.2,6.2c5.99,3.954,10.559,8.275,13.011,10.806    C83.235,54.795,67.7,68.969,49.241,68.969c-1.334,0-2.651-0.082-3.952-0.222l-7.439,7.438c3.639,0.91,7.449,1.451,11.391,1.451    c26.426,0,47.098-23.927,47.964-24.946C98.906,50.692,98.906,47.79,97.204,45.789z"
  id="path4" /><path
  d="M90.651,15.901c0-0.266-0.104-0.52-0.293-0.707l-7.071-7.07c-0.391-0.391-1.022-0.391-1.414,0L66.045,23.952    c-5.202-1.893-10.855-3.108-16.804-3.108c-26.427,0-47.098,23.926-47.965,24.946c-1.701,2-1.701,4.902,0.001,6.903    c0.517,0.606,8.083,9.354,19.707,16.319l-12.86,12.86c-0.188,0.188-0.293,0.441-0.293,0.707c0,0.267,0.105,0.521,0.293,0.707    l7.071,7.07c0.195,0.194,0.451,0.293,0.707,0.293c0.256,0,0.512-0.099,0.707-0.293l73.75-73.75    C90.546,16.421,90.651,16.167,90.651,15.901z M9.869,49.241C13.5,45.49,21.767,37.812,32.436,33.22    c-2.081,3.166-3.301,6.949-3.301,11.021c0,4.665,1.601,8.945,4.27,12.352l-6.124,6.123C19.129,58.196,12.89,52.361,9.869,49.241z"
  id="path6" /></g>
</g>
</g>
<g
id="g12">
</g>
<g
id="g14">
</g>
<g
id="g16">
</g>
<g
id="g18">
</g>
<g
id="g20">
</g>
<g
id="g22">
</g>
<g
id="g24">
</g>
<g
id="g26">
</g>
<g
id="g28">
</g>
<g
id="g30">
</g>
<g
id="g32">
</g>
<g
id="g34">
</g>
<g
id="g36">
</g>
<g
id="g38">
</g>
<g
id="g40">
</g></svg>`;
    this.mouse = `<svg
  version="1.1"
  id="Capa_1"
  x="0px"
  y="0px"
  viewBox="0 0 260.366 260.366"
  style="enable-background:new 0 0 260.366 260.366;"
  xml:space="preserve"
  sodipodi:docname="arrow-svgrepo-com.svg"
  inkscape:version="1.1 (c68e22c387, 2021-05-23)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"><defs
  id="defs37" /><sodipodi:namedview
  id="namedview35"
  pagecolor="#ffffff"
  bordercolor="#666666"
  borderopacity="1.0"
  inkscape:pageshadow="2"
  inkscape:pageopacity="0.0"
  inkscape:pagecheckerboard="0"
  showgrid="false"
  inkscape:zoom="3.2339092"
  inkscape:cx="130.183"
  inkscape:cy="130.33761"
  inkscape:window-width="1920"
  inkscape:window-height="1027"
  inkscape:window-x="-8"
  inkscape:window-y="-8"
  inkscape:window-maximized="1"
  inkscape:current-layer="Capa_1" />
  <path
  d="M255.972,189.463l-47.347-47.348l41.082-41.082c3.675-3.675,5.186-8.989,3.993-14.047c-1.191-5.059-4.917-9.14-9.846-10.786  L19.754,1.316c-5.393-1.804-11.341-0.401-15.36,3.62c-4.021,4.021-5.422,9.968-3.62,15.36l74.885,224.101  c1.646,4.929,5.728,8.654,10.786,9.846c5.053,1.193,10.371-0.317,14.047-3.993l42.165-42.165l47.348,47.347  c2.929,2.929,6.768,4.394,10.606,4.394s7.678-1.465,10.606-4.394l44.755-44.755C261.83,204.819,261.83,195.321,255.972,189.463z   M200.611,223.612l-47.348-47.347c-2.929-2.929-6.768-4.394-10.606-4.394s-7.678,1.465-10.606,4.394l-35.624,35.624L38.752,39.294  l172.595,57.674l-34.541,34.541c-5.858,5.857-5.858,15.355,0,21.213l47.347,47.348L200.611,223.612z"
  id="path2"
  style="fill:#000000;fill-opacity:1" />
  <g
  id="g4">
  </g>
  <g
  id="g6">
  </g>
  <g
  id="g8">
  </g>
  <g
  id="g10">
  </g>
  <g
  id="g12">
  </g>
  <g
  id="g14">
  </g>
  <g
  id="g16">
  </g>
  <g
  id="g18">
  </g>
  <g
  id="g20">
  </g>
  <g
  id="g22">
  </g>
  <g
  id="g24">
  </g>
  <g
  id="g26">
  </g>
  <g
  id="g28">
  </g>
  <g
  id="g30">
  </g>
  <g
  id="g32">
  </g>
  <path
  style="fill:#000000;fill-opacity:1;stroke-width:38.318;stroke-linecap:round;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
  d="m 176.25727,198.8633 c -23.68772,-23.64674 -24.49906,-24.41991 -26.7503,-25.49175 -4.55216,-2.16733 -9.11388,-2.17055 -13.60334,-0.01 -2.22046,1.06878 -3.10891,1.90403 -20.87257,19.62262 L 96.477662,211.49087 67.898364,125.92225 C 52.17975,78.859514 39.258366,40.178943 39.184177,39.965428 39.077696,39.658977 210.191,96.551715 210.7197,96.998548 c 0.0763,0.06445 -7.87234,8.148712 -17.66356,17.965012 -11.29533,11.32428 -18.11231,18.38875 -18.65061,19.32772 -2.62177,4.57321 -2.71438,10.25944 -0.24786,15.21817 0.59716,1.20053 6.23919,7.02408 25.242,26.05407 l 24.47294,24.50796 -11.59335,11.5891 -11.59335,11.58911 z"
  id="path1252" /></svg>`;

    this.nomouse = `<svg
  version="1.1"
  id="Capa_1"
  x="0px"
  y="0px"
  viewBox="0 0 260.366 260.366"
  style="enable-background:new 0 0 260.366 260.366;"
  xml:space="preserve"
  sodipodi:docname="noarrow.svg"
  inkscape:version="1.1 (c68e22c387, 2021-05-23)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"><defs
  id="defs37" /><sodipodi:namedview
  id="namedview35"
  pagecolor="#ffffff"
  bordercolor="#666666"
  borderopacity="1.0"
  inkscape:pageshadow="2"
  inkscape:pageopacity="0.0"
  inkscape:pagecheckerboard="0"
  showgrid="false"
  inkscape:zoom="3.2339092"
  inkscape:cx="148.11795"
  inkscape:cy="169.91819"
  inkscape:window-width="1920"
  inkscape:window-height="1027"
  inkscape:window-x="-8"
  inkscape:window-y="-8"
  inkscape:window-maximized="1"
  inkscape:current-layer="Capa_1" />

  <g
  id="g4">
  </g>
  <g
  id="g6">
  </g>
  <g
  id="g8">
  </g>
  <g
  id="g10">
  </g>
  <g
  id="g12">
  </g>
  <g
  id="g14">
  </g>
  <g
  id="g16">
  </g>
  <g
  id="g18">
  </g>
  <g
  id="g20">
  </g>
  <g
  id="g22">
  </g>
  <g
  id="g24">
  </g>
  <g
  id="g26">
  </g>
  <g
  id="g28">
  </g>
  <g
  id="g30">
  </g>
  <g
  id="g32">
  </g>
  <rect
  style="fill:#000000;stroke:#000000;stroke-width:46.339;stroke-linecap:round"
  id="rect859"
  width="0.74869555"
  height="280.91412"
  x="179.77588"
  y="-127.59808"
  rx="12.106069"
  ry="12.080462"
  transform="matrix(0.74419993,0.66795693,-0.68686231,0.72678756,0,0)" /><g
  id="g1327"><path
    d="M255.972,189.463l-47.347-47.348l41.082-41.082c3.675-3.675,5.186-8.989,3.993-14.047c-1.191-5.059-4.917-9.14-9.846-10.786  L19.754,1.316c-5.393-1.804-11.341-0.401-15.36,3.62c-4.021,4.021-5.422,9.968-3.62,15.36l74.885,224.101  c1.646,4.929,5.728,8.654,10.786,9.846c5.053,1.193,10.371-0.317,14.047-3.993l42.165-42.165l47.348,47.347  c2.929,2.929,6.768,4.394,10.606,4.394s7.678-1.465,10.606-4.394l44.755-44.755C261.83,204.819,261.83,195.321,255.972,189.463z   M200.611,223.612l-47.348-47.347c-2.929-2.929-6.768-4.394-10.606-4.394s-7.678,1.465-10.606,4.394l-35.624,35.624L38.752,39.294  l172.595,57.674l-34.541,34.541c-5.858,5.857-5.858,15.355,0,21.213l47.347,47.348L200.611,223.612z"
    id="path2"
    style="fill:#000000;fill-opacity:1" /><path
    style="fill:#000000;stroke:#000000;stroke-width:47.3953;stroke-linecap:round"
    d="M 175.54224,197.81395 C 141.49161,163.76332 143.2267,163.93691 115.08233,191.76514 L 96.477662,210.16082 68.362417,125.87737 C 52.899031,79.521474 40.41104,41.430054 40.611324,41.22977 40.811607,41.029486 78.915195,53.517478 125.28596,68.980863 l 84.31049,28.115246 -17.78399,17.934951 c -19.09866,19.26078 -21.49193,23.16051 -19.17388,31.24308 0.79101,2.75809 8.75682,11.60498 25.8883,28.75178 l 24.74573,24.76783 -11.46147,11.41381 -11.46147,11.41382 z"
    id="path1058" /></g></svg>`;

    this.nolabel = `<svg
  version="1.1"
  id="Capa_1"
  x="0px"
  y="0px"
  viewBox="0 0 37.628 37.628"
  style="enable-background:new 0 0 37.628 37.628;"
  xml:space="preserve"
  sodipodi:docname="nolabel.svg"
  inkscape:version="1.1 (c68e22c387, 2021-05-23)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"><defs
  id="defs39" /><sodipodi:namedview
  id="namedview37"
  pagecolor="#ffffff"
  bordercolor="#666666"
  borderopacity="1.0"
  inkscape:pageshadow="2"
  inkscape:pageopacity="0.0"
  inkscape:pagecheckerboard="0"
  showgrid="false"
  inkscape:zoom="11.188477"
  inkscape:cx="7.1502135"
  inkscape:cy="14.523871"
  inkscape:window-x="-8"
  inkscape:window-y="-8"
  inkscape:window-maximized="1"
  inkscape:current-layer="Capa_1" />
  <g
  id="g4">
  <path
  d="M36.895,23.758L25.092,35.562c-0.488,0.487-1.128,0.731-1.77,0.731c-0.211,0-0.419-0.037-0.625-0.089   c0.418-0.107,0.815-0.315,1.145-0.644l11.803-11.804c0.979-0.977,0.979-2.56,0-3.534L17.488,2.067   c-0.333-0.333-0.752-0.546-1.199-0.651l0.243-0.043c0.807-0.142,1.629,0.116,2.206,0.694l18.156,18.156   C37.872,21.199,37.872,22.782,36.895,23.758z M34.228,23.758L22.425,35.562c-0.488,0.487-1.128,0.731-1.77,0.731   c-0.64,0-1.279-0.244-1.768-0.731L0.732,17.405c-0.578-0.578-0.837-1.401-0.694-2.206L1.822,5.181   c0.184-1.031,0.992-1.839,2.023-2.023l10.019-1.784c0.807-0.142,1.629,0.116,2.206,0.694l18.156,18.156   C35.206,21.199,35.206,22.782,34.228,23.758z M9.454,7.193c-0.985-1-2.595-1.012-3.595-0.027s-1.011,2.595-0.026,3.595   c0.985,0.999,2.594,1.012,3.594,0.026C10.426,9.802,10.438,8.192,9.454,7.193z"
  id="path2" />
  </g>
  <g
  id="g6">
  </g>
  <g
  id="g8">
  </g>
  <g
  id="g10">
  </g>
  <g
  id="g12">
  </g>
  <g
  id="g14">
  </g>
  <g
  id="g16">
  </g>
  <g
  id="g18">
  </g>
  <g
  id="g20">
  </g>
  <g
  id="g22">
  </g>
  <g
  id="g24">
  </g>
  <g
  id="g26">
  </g>
  <g
  id="g28">
  </g>
  <g
  id="g30">
  </g>
  <g
  id="g32">
  </g>
  <g
  id="g34">
  </g>
  <rect
  style="fill:#000000;stroke:none;stroke-width:106.948;stroke-linecap:round"
  id="rect1062"
  width="6.4875011"
  height="46.886227"
  x="23.606146"
  y="-23.715155"
  rx="3.1189909"
  ry="3.2421327"
  transform="matrix(0.68940354,0.7243775,-0.72076393,0.69318061,0,0)" /></svg>
  `;

    this.label = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 37.628 37.628" style="enable-background:new 0 0 37.628 37.628;"
    xml:space="preserve">
  <g>
    <path d="M36.895,23.758L25.092,35.562c-0.488,0.487-1.128,0.731-1.77,0.731c-0.211,0-0.419-0.037-0.625-0.089
      c0.418-0.107,0.815-0.315,1.145-0.644l11.803-11.804c0.979-0.977,0.979-2.56,0-3.534L17.488,2.067
      c-0.333-0.333-0.752-0.546-1.199-0.651l0.243-0.043c0.807-0.142,1.629,0.116,2.206,0.694l18.156,18.156
      C37.872,21.199,37.872,22.782,36.895,23.758z M34.228,23.758L22.425,35.562c-0.488,0.487-1.128,0.731-1.77,0.731
      c-0.64,0-1.279-0.244-1.768-0.731L0.732,17.405c-0.578-0.578-0.837-1.401-0.694-2.206L1.822,5.181
      c0.184-1.031,0.992-1.839,2.023-2.023l10.019-1.784c0.807-0.142,1.629,0.116,2.206,0.694l18.156,18.156
      C35.206,21.199,35.206,22.782,34.228,23.758z M9.454,7.193c-0.985-1-2.595-1.012-3.595-0.027s-1.011,2.595-0.026,3.595
      c0.985,0.999,2.594,1.012,3.594,0.026C10.426,9.802,10.438,8.192,9.454,7.193z"/>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  </svg>`;

    this.surface = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 512.011 512.011" style="enable-background:new 0 0 512.011 512.011;" xml:space="preserve">
<g>
 <g>
   <g>
     <path d="M9.881,188.672l234.667,149.333c3.499,2.219,7.488,3.328,11.456,3.328c3.989,0,7.957-1.109,11.456-3.328l234.667-149.333
       c6.144-3.925,9.877-10.709,9.877-18.005c0-7.296-3.733-14.08-9.877-17.984L267.459,3.328c-6.997-4.437-15.915-4.437-22.912,0
       L9.881,152.683c-6.144,3.904-9.877,10.688-9.877,17.984C0.003,177.963,3.737,184.747,9.881,188.672z"/>
     <path d="M502.13,323.339l-66.069-42.048l-145.685,92.715c-10.347,6.549-22.208,10.005-34.368,10.005s-24.021-3.456-34.304-9.984
       L75.954,281.291L9.885,323.339c-6.144,3.925-9.877,10.709-9.877,18.005c0,7.296,3.733,14.08,9.877,17.984l234.667,149.355
       c3.499,2.219,7.467,3.328,11.456,3.328c3.968,0,7.957-1.109,11.456-3.328L502.13,359.328c6.144-3.904,9.877-10.688,9.877-17.984
       C512.008,334.048,508.274,327.264,502.13,323.339z"/>
   </g>
 </g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`;

    this.molecule = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve">
<g>
<g>
 <path d="M361.461,225.296c-11.33-8.988-20.694-20.332-27.358-33.296l-65.887,54.064c-13.889-11.727-30.673-20.423-49.582-24.736
   c-25.298-5.773-51.19-3.108-74.431,7.392l-8.563-12.027c-9.292,11.086-21.341,19.775-35.083,25.021l8.225,11.553
   c-15.352,15.449-26.146,34.892-31.11,56.652c-14.439,63.288,25.302,126.524,88.591,140.963c8.779,2.004,17.549,2.963,26.197,2.963
   c53.687,0,102.329-37.047,114.765-91.554c6.672-29.25,1.752-58.479-11.697-82.894L361.461,225.296z M182.458,391.885
   c-1.823,7.991-8.926,13.408-16.789,13.408c-1.27,0-2.56-0.142-3.85-0.437c-32.367-7.385-52.691-39.723-45.306-72.089
   c2.117-9.281,11.358-15.09,20.638-12.971c9.281,2.117,15.088,11.358,12.971,20.638c-1.528,6.701-0.356,13.597,3.301,19.416
   c3.657,5.82,9.363,9.867,16.063,11.396C178.768,373.364,184.575,382.605,182.458,391.885z"/>
</g>
</g>
<g>
<g>
 <path d="M443.878,60.382c-22.81-5.201-46.283-1.212-66.094,11.237c-19.81,12.451-33.586,31.87-38.789,54.68
   c-10.744,47.09,18.826,94.14,65.917,104.884v0.001c6.533,1.49,13.057,2.203,19.492,2.203c39.947,0,76.139-27.565,85.393-68.122
   C520.538,118.178,490.968,71.127,443.878,60.382z"/>
</g>
</g>
<g>
<g>
 <path d="M129.651,124.586c-9.977-15.877-25.542-26.918-43.824-31.088c-37.742-8.611-75.449,15.09-84.06,52.83
   s15.088,75.449,52.828,84.059c5.236,1.195,10.466,1.767,15.622,1.767c32.016,0,61.022-22.092,68.438-54.597
   C142.827,159.274,139.63,140.463,129.651,124.586z"/>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`;

    this.change = `<svg
  version="1.1"
  id="Layer_1"
  x="0px"
  y="0px"
  viewBox="0 0 512 512"
  style="enable-background:new 0 0 512 512;"
  xml:space="preserve"
  sodipodi:docname="change.svg"
  inkscape:version="1.1 (c68e22c387, 2021-05-23)"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"><defs
  id="defs47" /><sodipodi:namedview
  id="namedview45"
  pagecolor="#ffffff"
  bordercolor="#666666"
  borderopacity="1.0"
  inkscape:pageshadow="2"
  inkscape:pageopacity="0.0"
  inkscape:pagecheckerboard="0"
  showgrid="false"
  inkscape:zoom="1"
  inkscape:cx="226"
  inkscape:cy="256.5"
  inkscape:window-width="1920"
  inkscape:window-height="1027"
  inkscape:window-x="-8"
  inkscape:window-y="-8"
  inkscape:window-maximized="1"
  inkscape:current-layer="Layer_1" />


<g
  id="g14">
</g>
<g
  id="g16">
</g>
<g
  id="g18">
</g>
<g
  id="g20">
</g>
<g
  id="g22">
</g>
<g
  id="g24">
</g>
<g
  id="g26">
</g>
<g
  id="g28">
</g>
<g
  id="g30">
</g>
<g
  id="g32">
</g>
<g
  id="g34">
</g>
<g
  id="g36">
</g>
<g
  id="g38">
</g>
<g
  id="g40">
</g>
<g
  id="g42">
</g>
<g
  id="g1800"
  transform="translate(-0.1537225,-4.3038075)"><path
    style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:22.416;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
    d="m 102.46172,128.30302 76.00859,-76.010515 0.15658,38.005766 0.1566,38.005769 h 153.53462 153.53462 v 38.00475 38.00475 H 256.15293 26.453131 Z"
    id="path1171" /><path
    style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:22.416;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
    d="m 409.84573,392.3046 -76.00859,76.01051 -0.15658,-38.00576 -0.1566,-38.00577 H 179.98934 26.454715 V 354.29883 316.29408 H 256.15452 485.85431 Z"
    id="path1796" /></g></svg>`;

  }

  return Icons;
})();
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!************************!*\
  !*** ./src/ui/form.js ***!
  \************************/
/**
 * This is a colection of contructor to make different input element
 * @function $3Dmol.UI#Form
 */
$3Dmol.UI.Form = (function () {
    /**
     * Create Color input
     * @function $3Dmol.UI#Form.Color
     * @param {Object} outerControl Reference object to store the value
     */
    Form.Color = function (outerControl) {
        var redDot = $('<div></div>');
        redDot.height(10);
        redDot.width(10);
        redDot.css('border-radius', '50%');
        redDot.css('background', 'red');
        redDot.css('margin-right', '3px');

        var blueDot = redDot.clone();
        blueDot.css('background', 'blue');

        var greenDot = redDot.clone();
        greenDot.css('background', 'green');

        var control = this.control = {
            R: {
                value: 0,
                min: 0,
                max: 255,
                label: redDot
            },
            G: {
                value: 0,
                min: 0,
                max: 255,
                label: greenDot
            },
            B: {
                value: 0,
                min: 0,
                max: 255,
                label: blueDot
            },
        };

        var surroundingBox = this.ui = $('<div></div>')
        var boundingBox = $('<div></div>');

        surroundingBox.append(boundingBox);

        var spectrumControl = {
            key: 'Spectrum',
            value: null
        }

        var spectrum = new Form.Checkbox(spectrumControl);

        boundingBox.append(spectrum.ui);

        spectrum.ui.css({
            'margin-left': '2px'
        })


        var RValue = new Form.Slider(control.R);
        var GValue = new Form.Slider(control.G);
        var BValue = new Form.Slider(control.B);

        var sliders = $('<div></div>');
        sliders.append(RValue.ui, GValue.ui, BValue.ui);

        var color = $('<div></div>');

        boundingBox.append(sliders);
        boundingBox.append(color);


        // CSS

        RValue.slide.css('color', 'red');

        // GValue.ui.css('display', 'block');
        GValue.slide.css('color', 'green');

        // BValue.ui.css('display', 'block');
        BValue.slide.css('color', 'blue');

        color.height(15);
        // color.width(50);
        color.css('margin-top', '6px');
        color.css('margin-bottom', '6px');
        color.css('border', '1px solid grey');
        color.css('border-radius', '500px');

        this.update = function () {};
        var self = this;
        // Functionality
        function updatePreview() {
            var c = `rgb(${control.R.value}, ${control.G.value}, ${control.B.value})`;
            color.css('background', c);
            outerControl.value = c;
            self.update(control);
        }

        RValue.update = GValue.update = BValue.update = updatePreview;
        updatePreview();

        spectrum.update = function (v) {
            sliders.toggle();

            if (v.value) {
                color.css({
                    'background': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
                });
                outerControl.value = 'spectrum';
            } else {
                updatePreview();
            }
        }

        this.getValue = function () {
            return outerControl;
        }

        this.validate = function () {
            return true;
        }

        this.setValue = function (colorValue) {

            if (colorValue == 'spectrum') {
                spectrum.setValue(true);
                spectrum.update(spectrumControl);
                sliders.hide();

                outerControl.value = 'spectrum';
            }
        }

        spectrum.ui.hide();

        this.enableSpectrum = function () {
            spectrum.ui.show();
        }
    }

    /**
     * Create ListInput input
     * @function $3Dmol.UI#Form.ListInput
     * @param {Object} control Reference object to store the value
     * @param {Array} listElements list of the elements through which options are generated
     */
    Form.ListInput = function (control, listElements) {
        // var label = $('<div></div>');
        // label.text(control.key);

        var surroundingBox = this.ui = $('<div></div>');
        var boundingBox = $('<div></div>');
        var itemList = listElements;
        // surroundingBox.append(label);
        surroundingBox.append(boundingBox);

        var select = $('<select></select>');
        select.css($3Dmol.defaultCSS.ListInput.select);

        boundingBox.append(select);

        this.showAlertBox = true;
        var failMessage = $('<div></div>');
        failMessage.text('Please select some value');
        failMessage.css({
            'color': 'crimson',
            'font-family': 'Arial',
            'font-weight': 'bold',
            'font-size': '10px'
        });
        failMessage.hide();
        boundingBox.append(failMessage);

        this.update = function () {}

        select.on('click', {
            parent: this
        }, (event) => {
            control.value = select.children('option:selected').val();
            event.data.parent.update(control);
        });

        this.getValue = () => {
            return control;
        }

        // this.preventAlertBox = function(){
        //     show
        // }

        this.validate = function () {
            if (control.value == 'select' || control.value == null) {
                (this.showAlertBox) ? failMessage.show(): null;
                select.css({
                    'box-shadow': '0px 0px 2px red'
                });
                return false;
            } else {
                failMessage.hide();
                boundingBox.css({
                    'box-shadow': 'none'
                });
                return true;
            }
        }

        this.setValue = function (val) {
            if (listElements.indexOf(val) != -1) {
                select.empty();
                var defaultOption = $('<option></option>');
                defaultOption.text('select');

                itemList.forEach((item) => {
                    var option = $('<option></option>');
                    option.text(item);
                    option.attr('value', item);
                    select.append(option);

                    if (val == item) {
                        option.prop('selected', true);
                    }
                });

                control.value = select.children('option:selected').val();
            } else {
                console.error('UI::Form::ListInput:incorrect value', val);
            }
        }

        this.updateList = function (newList) {
            select.empty();

            var defaultOption = $('<option></option>');
            defaultOption.text('select');
            defaultOption.attr('value', 'select');

            select.append(defaultOption);

            itemList = newList;
            itemList.forEach((item) => {
                var option = $('<option></option>');
                option.text(item);
                option.attr('value', item);
                select.append(option);
            });
        }

        this.updateList(itemList);
    }

    /**
     * Create text, numeric or range Input
     * @function $3Dmol.UI#Form.Input
     * @param {Object} control Reference object to store the value
     */
    Form.Input = function (control) {
        var surroundingBox = this.ui = $('<div></div>');
        var boundingBox = $('<div></div>');
        // surroundingBox.append(label);
        surroundingBox.append(boundingBox);

        var validationType = this.validationType = 'text';

        surroundingBox.css({
            'width': '100%',
            'box-sizing': 'border-box'
        })

        var input = this.domElement = $('<input type="text">');
        boundingBox.append(input);

        var alertBox = $('<div></div>');
        alertBox.css({
            'border': '1px solid darkred',
            'border-radius': '3px',
            'font-family': 'Arial',
            'font-size': '10px',
            'font-weight': 'bold',
            'margin': '2px',
            'margin-left': '4px',
            'padding': '2px',
            'color': 'darkred',
            'background': 'lightcoral'
        });

        var alertMessage = {
            'invalid-input': 'Invalid input please check the value entered',
        }

        boundingBox.append(alertBox);
        alertBox.hide();

        this.setWidth = function (width) {
            input.width(width - 6);
        }

        this.setWidth(75);

        input.css({
            // 'margin-left': '4px'
        });

        this.update = function () {

        }

        input.on('change', {
            parent: this,
            control: control
        }, (event) => {
            let inputString = input.val();

            if (inputString[inputString.length - 1] == ',') {
                inputString = inputString.slice(0, -1);
            }

            if (validationType == 'range') {
                control.value = inputString.split(',');
            } else {
                control.value = inputString;
            }

            // calling update function 
            event.data.parent.update(control);
        });

        input.on('select', () => {
           // selectedText = input.val().substring(e.target.selectionStart, e.target.selectionEnd);
        });


        this.getValue = () => {
            return control;
        }

        var error = this.error = function (msg) {
            alertBox.show();
            alertBox.text(msg)
        }

        this.setValue = function (val) {

            if (validationType == 'range') {
                var text = val.join(',');
                input.val(text);
            } else {
                input.val(val);
            }

            control.value = val;
        }



        function checkInputFloat() {
            var inputString = input.val();

            var dots = inputString.match(/\./g) || [];
            var checkString = inputString.replaceAll(/\./g, '').replaceAll(/[0-9]/g, '');

            if (dots.length > 1) {
                return false
            }

            if (checkString != '') return false;

            if (isNaN(parseFloat(inputString))) {
                return false;
            } else {
                return true;
            }
        }

        function checkInputNumber() {
            var inputString = input.val();

            var checkString = inputString.replaceAll(/[0-9]/g, '');

            if (checkString != '') return false;

            if (isNaN(parseInt(inputString))) {
                return false;
            } else {
                return true;
            }
        }

        // Parse Input Range Functions

        // Checks only number, comma and hyphen present
        function checkRangeTokens(inputString) {
            var finalString = inputString.replaceAll(',', '').replaceAll('-', '').replaceAll(/[0-9]/g, '').replaceAll(' ', '');

            if (finalString == '')
                return true;
            else
                return false;
        }

        function checkList(inputString) {
            inputString = inputString.replaceAll(' ', '');

            if (inputString[inputString.length - 1] == ',') {
                inputString = inputString.slice(0, -1);
            }


            var rangeList = inputString.split(',');

            // If dublicate comma return false;
            if (/,,/g.exec(inputString)) return false;

            // If first element not a number return false;
            if (isNaN(parseInt(rangeList[0]))) return false;

            var validRangeList = rangeList.map((rangeInput) => {
                return checkRangeInput(rangeInput);
            });

            return validRangeList.find((e) => {
                return e == false
            }) == undefined ? true : false;
        }

        function checkRangeInput(inputString) {
            var rangeInputs = inputString.split('-');
            if (rangeInputs.length > 2) {
                return false;
            } else {
                if (rangeInputs.length == 0) {
                    return true;
                } else if (rangeInputs.length == 1) {
                    if (isNaN(parseInt(rangeInputs[0])))
                        return false;
                    else
                        return true;
                } else if (rangeInputs.length == 2) {
                    if (isNaN(parseInt(rangeInputs[0])) || isNaN(parseInt(rangeInputs[1])))
                        return false;
                    else
                        return true;
                } else
                    return false;
            }
        }

        var checkInput = this.checkInput = function () {
            var inputString = input.val();

            if (validationType == 'number') {
                if (checkInputNumber()) {
                    alertBox.hide();
                    return true;
                } else {
                    error(alertMessage['invalid-input']);
                    return false;
                }
            } else if (validationType == 'float') {
                if (checkInputFloat()) {
                    alertBox.hide();
                    return true;
                } else {
                    error(alertMessage['invalid-input']);
                    return false;
                }
            } else if (validationType == 'range') {
                if (checkRangeTokens(inputString)) {
                    if (checkList(inputString)) {
                        alertBox.hide();
                        return true;
                    } else {
                        error(alertMessage['invalid-input']);
                        return false;
                    }
                } else {
                    error(alertMessage['invalid-input']);
                    return false;
                }

            } else {
                return true;
            }
        }

        this.validateOnlyNumber = function (floatType = false) {
            if (floatType) {
                validationType = 'float';
            } else {
                validationType = 'number';
            }

            input.on('keydown keyup paste cut', function () {
                checkInput();
            });
        }


        this.validateInputRange = function () {
            validationType = 'range';

            input.on('keydown keyup paste cut', () => {
                checkInput();
            });

        }

        this.isEmpty = function () {
            if (control.value == "") {
                return true;
            }
        }

        this.validate = function () {
            if ((control.active == true && control.value != null && control.value != "" && checkInput()) || (control.active == false)) {
                input.css('box-shadow', 'none');
                return true
            } else {
                input.css('box-shadow', '0px 0px 2px red');
                return false;
            }
        }

        // CSS 

        input.css($3Dmol.defaultCSS.Input.input);
        boundingBox.css($3Dmol.defaultCSS.Input.boundingBox);

    }

    /**
     * Create Checkbox input for boolean values
     * @function $3Dmol.UI#Form.Checkbox
     * @param {Object} control Reference object to store the value
     */
    Form.Checkbox = function (control) {
        var label = $('<div></div>');
        label.text(control.key);
        label.css($3Dmol.defaultCSS.TextDefault);

        var surroundingBox = this.ui = $('<div></div>');
        var boundingBox = $('<div></div>');
        surroundingBox.append(boundingBox);
        surroundingBox.append(label);

        var checkbox = $('<input type="checkbox" />');
        boundingBox.append(checkbox);

        this.click = () => {};

        this.update = function () {

        }

        this.getValue = () => {
            return control;
        }

        checkbox.on('click', {
            parent: this
        }, (event) => {
            control.value = checkbox.prop('checked');
            event.data.parent.update(control);
        });

        // CSS
        label.css('display', 'inline-block');
        boundingBox.css('display', 'inline-block')

        this.validate = function () {
            return true;
        }

        this.setValue = function (val) {
            checkbox.prop('checked', val);
            this.update(control);
            control.value = val;
        }
    }

    /**
     * Create input for values between two numbers
     * @function $3Dmol.UI#Form.Slider
     * @param {Object} control Reference object to store the value
     */
    Form.Slider = function (control) {
        var surroundingBox = this.ui = $('<div></div>');

        var boundingBox = $('<div></div>');
        surroundingBox.append(boundingBox);

        boundingBox.css('display', 'flex');
        var slide = this.slide = $('<input type="range">');
        slide.css('width', '100%');

        var min = control.min || 0;
        var max = control.max || 100;
        var step = control.step || 1;
        var defaultValue = control.default || min;
        var labelContent = control.label || '';

        var label = $('<div></div>');
        label.append(labelContent);
        boundingBox.append(label);

        slide.attr('min', min);
        slide.attr('max', max);
        slide.attr('step', step);
        slide.attr('value', defaultValue);
        control.value = defaultValue;
        boundingBox.append(slide);

        var setValue = false;

        this.update = function () {

        };

        this.getValue = () => {
            return control;
        }

        slide.on('mousedown', () => {
            setValue = true;
        });

        slide.on('mousemove', {
            parent: this
        }, (event) => {
            if (setValue) {
                control.value = slide.val();
                event.data.parent.update(control);
            }
        });

        slide.on('mouseup', () => {
            setValue = false;
        });

        // CSS
        boundingBox.css('align-items', 'center');
        boundingBox.height('21px');
        // boundingBox.css('border-radius', '2px');
        // label.css('line-height', '21px');
        slide.css('padding', '0px');
        slide.css('margin', '0px');

        this.validate = function () {
            return true;
        }

        this.setValue = function (val) {
            slide.val(val);
            control.value = slide.val();
        }


    }

    /**
     * Create empty element used for property that whose input cannot be taken
     * @function $3Dmol.UI#Form.EmptyElement
     * @param {Object} control Reference object to store the value
     */
    Form.EmptyElement = function (control) {
        this.ui = $('<div></div>');

        this.onUpdate = () => {
        }

        this.getValue = () => {
            return control;
        }

        this.validate = function () {
            return true;
        }
    }

    // mainControl param will be used to take in specName
    // in the form of key 
    // type will be 'form'
    // active will be used to activate deactivate form if more than one form
    /**
     * Creates Form input that takes input from different input element 
     * 
     * @function $3Dmol.UI#Form
     * @param {validSelectionSpec|validStyleSpec|validAtomSpec} specs the defination of spec is used as an input to generate the form
     * @param {Object} mainControl Reference of variable to store the value from the form
     */
    function Form(specs, mainControl) {
        specs = specs || {};
        var boundingBox = this.ui = $('<div></div>');

        var heading = $('<div></div>');
        heading.text(mainControl.key);

        // Styling heading 
        heading.css({
            'border-bottom': '1px solid black',
            'font-family': 'Arial',
            'font-size': '14px',
            'font-weight': 'bold',
            'padding-top': '2px',
            'padding-bottom': '4px'
        });

        boundingBox.append(heading);
        boundingBox.addClass('form');

        var inputs = this.inputs = [];
        // body.append(boundingBox);

        var keys = Object.keys(specs);
        keys.forEach((key) => {
            if (specs[key].gui) {
                var prop = new Property(key, specs[key].type);
                inputs.push(prop);
                boundingBox.append(prop.ui);
            }

        });

        this.update = function () {}

        var update = () => {
        };


        inputs.forEach((input) => {
            input.update = update;
        })

        this.getValue = function () {
            mainControl.value = {};

            inputs.forEach((input) => {
                var inputValue = input.getValue();

                if (inputValue.active) {
                    mainControl.value[inputValue.key] = inputValue.value;
                }
            });

            return mainControl;
        }

        var updateValues = function (inputControl) {
            mainControl.value[inputControl.key] = mainControl.value; //control =?
            update(mainControl);
        }

        this.validate = function () {
            var validations = inputs.map((i) => {

                if (i.active.getValue().value) {
                    return i.placeholder.validate();
                } else {
                    return true;
                }
            });


            if (validations.find(e => e == false) == undefined)
                return true;
            else {
                return false;
            }

        }

        this.setValue = function (val) {
            var keys = Object.keys(val);
            for (var i = 0; i < keys.length; i++) {
                var input = inputs.find((e) => {
                    if (e.control.key == keys[i])
                        return e;
                });



                input.placeholder.setValue(val[keys[i]]);
                input.active.setValue(true);
                input.placeholder.ui.show();
                input.control.active = true;
            }

            // mainControl.value = val;
            this.update(mainControl);
            this.getValue();
        }

        this.getInputs = function () {
            return inputs;
        }

        function Property(key, type) {
            var control = this.control = {
                value: null,
                type: type,
                key: key,
                active: false
            };
            var boundingBox = this.ui = $('<div></div>');
            this.placeholder = {
                ui: $('<div></div>')
            }; // default value for ui element 
            this.active = new Form.Checkbox({
                value: false,
                key: key
            });


            if (specs[key].type == 'string' || specs[key].type == 'element') {
                this.placeholder = new Form.Input(control);
                this.placeholder.ui.attr('type', 'text');
            } else if (specs[key].type == 'number') {

                var slider = false;

                if (specs[key].min != undefined && specs[key].max != undefined && specs[key].default != undefined) {
                    slider = true;
                }

                if (slider) {
                    // if( specs[key].min && spec[key].max){
                    control.min = specs[key].min;
                    control.max = specs[key].max;
                    control.default = specs[key].default;
                    control.step = specs[key].step || ((control.max - control.max) / 1000);
                    this.placeholder = new Form.Slider(control);
                } else {
                    this.placeholder = new Form.Input(control);
                    this.placeholder.ui.attr('type', 'text');
                    this.placeholder.validateOnlyNumber(specs[key].floatType);
                }
            } else if (specs[key].type == 'array_range') {
                this.placeholder = new Form.Input(control);
                this.placeholder.ui.attr('type', 'text');
                this.placeholder.validateInputRange();
            } else if (specs[key].type == 'color') {
                this.placeholder = new Form.Color(control);
                if (specs[key].spectrum) {
                    this.placeholder.enableSpectrum();
                }

            } else if (specs[key].type == 'boolean') {
                this.placeholder = new Form.Checkbox(control);

            } else if (specs[key].type == 'properties') {
                this.placeholder = new Form.Input(control);
                this.placeholder.ui.attr('type', 'text');

            } else if (specs[key].type == 'colorscheme') {
                this.placeholder = new Form.ListInput(control, Object.keys($3Dmol.builtinColorSchemes));
                this.placeholder.ui.attr('type', 'text');

            } else if (specs[key].type == undefined) {
                if (specs[key].validItems) {
                    this.placeholder = new Form.ListInput(control, specs[key].validItems);
                }

            } else if (specs[key].type == 'form') {
                this.placeholder = new Form(specs[key].validItems, control);
                this.placeholder.ui.append($('<div></div>').css($3Dmol.defaultCSS.LinkBreak));
            } else {
                this.placeholder = new Form.EmptyElement(control);
                // return new Form.EmptyElement(control);
            }

            this.getValue = function () {

                if (this.placeholder.getValue)
                    return this.placeholder.getValue();
                else
                    return null;
            }


            // Adding active control for the property
            var placeholder = this.placeholder;

            if (type != 'boolean') {
                placeholder.ui.hide();
                boundingBox.append(this.active.ui);
                this.active.update = function (c) {
                    (c.value) ? placeholder.ui.show(): placeholder.ui.hide();
                    control.active = c.value;
                }
            } else {
                this.placeholder.update = function (c) {
                    control.active = c.value;
                }
            }

            boundingBox.append(this.placeholder.ui);

            if (this.placeholder.onUpdate)
                this.placeholder.onUpdate(updateValues);
        }


    }



    return Form;
})();
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*********************************!*\
  !*** ./src/ui/defaultValues.js ***!
  \*********************************/
$3Dmol.labelStyles = {
  purple : {
    backgroundColor: 0x800080, 
    backgroundOpacity: 0.8
  },

  milk : {
    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['black'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['azure'],
    backgroundColor: $3Dmol.htmlColors['aliceblue'],
    backgroundOpacity: 0.9
  },

  blue : {
    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['aliceblue'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['darkviolet'],
    backgroundColor: $3Dmol.htmlColors['darkblue'],
    backgroundOpacity: 0.9
  },

  chocolate : {
    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['aliceblue'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['brown'],
    backgroundColor: $3Dmol.htmlColors['chocolate'],
    backgroundOpacity: 0.9
  },

  lime : {
    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['black'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['lightgreen'],
    backgroundColor: $3Dmol.htmlColors['lime'],
    backgroundOpacity: 0.9
  },

  rose : {
    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['black'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['mintcream'],
    backgroundColor: $3Dmol.htmlColors['mistyrose'],
    backgroundOpacity: 0.9
  },

  yellow : {

    font : 'Arial',
    fontSize: 12,
    fontColor: $3Dmol.htmlColors['black'],
    borderThickness: 1,
    borderColor: $3Dmol.htmlColors['orange'],
    backgroundColor: $3Dmol.htmlColors['yellow'],
    backgroundOpacity: 0.9
  },

};

$3Dmol.longPressDuration = 1500;

$3Dmol.defaultCSS = {
  ListInput : {
    select : {
      'width' : 'auto',
      'border' : 'none',
      'margin' : '0px',
      'font-family' : 'Arial',
      'padding' : '0px',
      'height' : '20px',
      'border-radius' : '4px',
      'box-sizing' : 'border-box'
    }
  },
  Input : {
    input : {
      'margin-bottom' : '0px',
      'padding' : '0px',
      'border-radius' : '4px',
      'font-family' : 'Arial',
      'width' : '96%'
    },

    boundingBox : {
      'margin-left' : '4px',
      'margin-right' : '',
    }
  },
  Checkbox : {},
  Slider : {},
  Color : {},
  TextDefault : {
    'font-family' : 'Arial',
    'margin-left' : '4px'
  },

  LinkBreak : {
    'height' : '3px',
    'border-bottom' : '1px solid #687193'
  }

}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQSx5REFBeUQsbUVBQW1FO0FBQzVILHdEQUF3RCwyQkFBMkI7QUFDbkYsNERBQTRELGtDQUFrQzs7QUFFOUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Qsa0RBQWtEO0FBQ3BHLG1EQUFtRCxrREFBa0Q7QUFDckc7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFT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QUFrRDtBQUNsRyxrREFBa0Qsa0RBQWtEO0FBQ3BHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0EsT0FBTzs7O0FBR1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCLGlCQUFpQixRQUFRO0FBQ3pCLGlCQUFpQixVQUFVO0FBQzNCLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixlQUFlLG9CQUFvQixxQkFBcUIsZUFBZSxpQkFBaUIsb0JBQW9CO0FBQ2xJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGVBQWUsb0JBQW9CO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsd0JBQXdCLGVBQWUscUJBQXFCO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixZQUFZLHFCQUFxQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtFQUErRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaURBQWlEO0FBQ2hFLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7OztBQUdiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOzs7O0FBSWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWE7OztBQUdiO0FBQ0E7QUFDQTtBQUNBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7O0FBRUEsY0FBYztBQUNkO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOzs7O0FBSUE7QUFDQSxDQUFDOzs7Ozs7OztBQ2g1QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGVBQWU7QUFDZixhQUFhO0FBQ2IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8zZG1vbC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vM2Rtb2wvLi9zcmMvdWkvdWkuanMiLCJ3ZWJwYWNrOi8vM2Rtb2wvLi9zcmMvdWkvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vM2Rtb2wvLi9zcmMvdWkvaWNvbi5qcyIsIndlYnBhY2s6Ly8zZG1vbC8uL3NyYy91aS9mb3JtLmpzIiwid2VicGFjazovLzNkbW9sLy4vc3JjL3VpL2RlZmF1bHRWYWx1ZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiM0Rtb2wudWlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiM0Rtb2wudWlcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXG4gKiAkM0Rtb2wuVUkgLSBVSSBjcmVhdGVzIHBhbmVscyBpbiB0aGUgdmlld2VyIHRvIGFzc2lzdCBjb250cm9sIG9mIHRoZSB2aWV3cG9ydFxuICogQGNvbnN0cnVjdG9yIFxuICogQHBhcmFtIHskM0Rtb2wuU3RhdGVNYW5hZ2VyfSBzdGF0ZU1hbmFnZXIgU3RhdGVNYW5hZ2VyIGlzIHJlcXVpcmVkIHRvIGhhdmUgaW50ZXJhY3Rpb24gYmV0d2VlbiBnbHZpZXdlciBhbmQgdGhlIHVpLiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgTG9hZHMgdGhlIHVzZXIgZGVmaW5lZCBwYXJhbWV0ZXJzIHRvIGdlbmVyYXRlIHRoZSB1aVxuICogQHBhcmFtIHtPYmplY3R9IHBhcmVudEVsZW1lbnQgUmVmZXJzIHRoZSBwYXJlbnQgZGl2aXNpb24gdXNlZCB0byBob2xkIHRoZSBjYW52YXMgZm9yIDNEbW9sLmpzIFxuICovXG4kM0Rtb2wuVUkgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qXG4gICAgICAgVGhlIGRpY3Rpb25hcmllcyBhcmUgZm9yIGRyb3Bkb3duIG1lbnVzIGFuZCB2YWxpZGF0aW9uIG9mIHRoZSB2aWV3ZXJcbiAgICovXG5cblxuICAvLyBwcm9wIDogSXQgaXMgdXNlZCB0byBhZGQgdGhlIG9wdGlvbiBmb3IgcHJvcGVydHkgaW4gY29udGV4dCBtZW51IGluIHRoZSAzZG1vbCB1aVxuICAvLyB0aGUgY29kZSBmb3IgcHJvcCBjYW4gYmUgZm91bmQgdW5kZXIgL3VpL3VpLmpzIC0+IFVJIC0+IENvbnRleHRNZW51IC0+IHNldFByb3BlcnRpZXMgLT4gc3VibWl0LnVpLm9uIFxuICAvLyBndWkgOiBJdCBpcyB1c2VkIHRvIGdlbmVyYXRlIGZvcm1zIGZvciBkaWZmZXJlbnQgZmVhdHVyZXMgaW4gdGhlIDNkbW9sIHVpXG4gIC8vIHRoZSBjb2RlIGZvciBndWkgY2FuIGJlIGZvdW5kIHVuZGVyIC91aS9mb3JtLmpzIC0+IEZvcm0gKEZvcm0gZGVmaW5hdGlvbilcbiAgLy8gZmxvYXRUeXBlIDogc2VwYXJhdGVzIGludGVnZXIgZnJvbSBmbG9hdCBzaW5jZSB0aGVzZSBhcmUgdXNlZCBpbiBcbiAgLy8gaW5wdXQgdmFsaWRhdGlvbiBvZiB0aGUgM2Rtb2wgdWlcbiAgdmFyIHZhbGlkQXRvbVNwZWNzID0ge1xuICAgIFwicmVzblwiOiB7IHR5cGU6IFwic3RyaW5nXCIsIHZhbGlkOiB0cnVlLCBwcm9wOiB0cnVlLCBndWk6IHRydWUgfSwgLy8gUGFyZW50IHJlc2lkdWUgbmFtZVxuICAgIFwieFwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCBzdGVwOiAwLjEsIHByb3A6IHRydWUgfSwgLy8gQXRvbSdzIHggY29vcmRpbmF0ZVxuICAgIFwieVwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCBzdGVwOiAwLjEsIHByb3A6IHRydWUgfSwgLy8gQXRvbSdzIHkgY29vcmRpbmF0ZVxuICAgIFwielwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgdmFsaWQ6IGZhbHNlLCBzdGVwOiAwLjEsIHByb3A6IHRydWUgfSwgLy8gQXRvbSdzIHogY29vcmRpbmF0ZVxuICAgIFwiY29sb3JcIjogeyB0eXBlOiBcImNvbG9yXCIsIGd1aTogZmFsc2UgfSwgLy8gQXRvbSdzIGNvbG9yLCBhcyBoZXggY29kZVxuICAgIFwic3VyZmFjZUNvbG9yXCI6IHsgdHlwZTogXCJjb2xvclwiLCBndWk6IGZhbHNlIH0sIC8vIEhleCBjb2RlIGZvciBjb2xvciB0byBiZSB1c2VkIGZvciBzdXJmYWNlIHBhdGNoIG92ZXIgdGhpcyBhdG9tXG4gICAgXCJlbGVtXCI6IHsgdHlwZTogXCJlbGVtZW50XCIsIGd1aTogdHJ1ZSwgcHJvcDogdHJ1ZSB9LCAvLyBFbGVtZW50IGFiYnJldmlhdGlvbiAoZS5nLiAnSCcsICdDYScsIGV0YylcbiAgICBcImhldGZsYWdcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgdmFsaWQ6IGZhbHNlLCBndWk6IHRydWUgfSwgLy8gU2V0IHRvIHRydWUgaWYgYXRvbSBpcyBhIGhldGVyb2F0b21cbiAgICBcImNoYWluXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgZ3VpOiB0cnVlLCBwcm9wOiB0cnVlIH0sIC8vIENoYWluIHRoaXMgYXRvbSBiZWxvbmdzIHRvLCBpZiBzcGVjaWZpZWQgaW4gaW5wdXQgZmlsZSAoZS5nICdBJyBmb3IgY2hhaW4gQSlcbiAgICBcInJlc2lcIjogeyB0eXBlOiBcImFycmF5X3JhbmdlXCIsIGd1aTogdHJ1ZSB9LCAvLyBSZXNpZHVlIG51bWJlciBcbiAgICBcImljb2RlXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgdmFsaWQ6IGZhbHNlLCBzdGVwOiAwLjEgfSxcbiAgICBcInJlc2NvZGVcIjogeyB0eXBlOiBcIm51bWJlclwiLCB2YWxpZDogZmFsc2UsIHN0ZXA6IDAuMSwgcHJvcDogdHJ1ZSB9LFxuICAgIFwic2VyaWFsXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgdmFsaWQ6IGZhbHNlLCBzdGVwOiAwLjEgfSwgLy8gQXRvbSdzIHNlcmlhbCBpZCBudW1iZXJtb2RlbHNcbiAgICBcImF0b21cIjogeyB0eXBlOiBcInN0cmluZ1wiLCB2YWxpZDogZmFsc2UsIGd1aTogdHJ1ZSwgcHJvcDogdHJ1ZSB9LCAvLyBBdG9tIG5hbWU7IG1heSBiZSBtb3JlIHNwZWNpZmljIHRoYW4gJ2VsZW0nIChlLmcgJ0NBJyBmb3IgYWxwaGEgY2FyYm9uKVxuICAgIFwiYm9uZHNcIjogeyB0eXBlOiBcImFycmF5XCIsIHZhbGlkOiBmYWxzZSB9LCAvLyBBcnJheSBvZiBhdG9tIGlkcyB0aGlzIGF0b20gaXMgYm9uZGVkIHRvXG4gICAgXCJzc1wiOiB7IHR5cGU6IFwic3RyaW5nXCIsIHZhbGlkOiBmYWxzZSB9LCAvLyBTZWNvbmRhcnkgc3RydWN0dXJlIGlkZW50aWZpZXIgKGZvciBjYXJ0b29uIHJlbmRlcjsgZS5nLiAnaCcgZm9yIGhlbGl4KVxuICAgIFwic2luZ2xlQm9uZHNcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIHRydWUgaWYgdGhpcyBhdG9tIGZvcm1zIG9ubHkgc2luZ2xlIGJvbmRzIG9yIG5vIGJvbmRzIGF0IGFsbFxuICAgIFwiYm9uZE9yZGVyXCI6IHsgdHlwZTogXCJhcnJheVwiLCB2YWxpZDogZmFsc2UgfSwgLy8gQXJyYXkgb2YgdGhpcyBhdG9tJ3MgYm9uZCBvcmRlcnMsIGNvcnJlc3BvbmRpbmcgdG8gYm9uZHMgaWRlbnRmaWVkIGJ5ICdib25kcydcbiAgICBcInByb3BlcnRpZXNcIjogeyB0eXBlOiBcInByb3BlcnRpZXNcIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIE9wdGlvbmFsIG1hcHBpbmcgb2YgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG4gICAgXCJiXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCB2YWxpZDogZmFsc2UsIHN0ZXA6IDAuMSwgcHJvcDogdHJ1ZSB9LCAvLyBBdG9tIGIgZmFjdG9yIGRhdGFcbiAgICBcInBkYmxpbmVcIjogeyB0eXBlOiBcInN0cmluZ1wiLCB2YWxpZDogZmFsc2UgfSwgLy8gSWYgYXBwbGljYWJsZSwgdGhpcyBhdG9tJ3MgcmVjb3JkIGVudHJ5IGZyb20gdGhlIGlucHV0IFBEQiBmaWxlICh1c2VkIHRvIG91dHB1dCBuZXcgUERCIGZyb20gbW9kZWxzKVxuICAgIFwiY2xpY2thYmxlXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIHZhbGlkOiBmYWxzZSwgZ3VpOiBmYWxzZSB9LCAvLyBTZXQgdGhpcyBmbGFnIHRvIHRydWUgdG8gZW5hYmxlIGNsaWNrIHNlbGVjdGlvbiBoYW5kbGluZyBmb3IgdGhpcyBhdG9tXG4gICAgXCJjb250ZXh0TWVudUVuYWJsZWRcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgdmFsaWQ6IGZhbHNlLCBndWk6IGZhbHNlIH0sIC8vIFNldCB0aGlzIGZsYWcgdG8gdHJ1ZSB0byBlbmFibGUgY2xpY2sgc2VsZWN0aW9uIGhhbmRsaW5nIGZvciB0aGlzIGF0b21cbiAgICBcImNhbGxiYWNrXCI6IHsgdHlwZTogXCJmdW5jdGlvblwiLCB2YWxpZDogZmFsc2UgfSwgLy8gQ2FsbGJhY2sgY2xpY2sgaGFuZGxlciBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbiB0aGlzIGF0b20gYW5kIGl0cyBwYXJlbnQgdmlld2VyXG4gICAgXCJpbnZlcnRcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIGZvciBzZWxlY3Rpb24sIGludmVydHMgdGhlIG1lYW5pbmcgb2YgdGhlIHNlbGVjdGlvblxuICAgIC8vdW5zdXJlIGFib3V0IHRoaXNcbiAgICBcInJlZmxlY3Rpdml0eVwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgZ3VpOiBmYWxzZSwgc3RlcDogMC4xIH0sIC8vZm9yIGRlc2NyaWJpbmcgdGhlIHJlZmxlY3Rpdml0eSBvZiBhIG1vZGVsXG4gICAgXCJhbHRMb2NcIjogeyB0eXBlOiBcImludmFsaWRcIiwgdmFsaWQ6IGZhbHNlIH0sIC8vYWx0ZXJuYXRpdmUgbG9jYXRpb24sIGUuZy4gaW4gUERCXG4gICAgXCJzeW1cIjogeyB0eXBlOiAnbnVtYmVyJywgZ3VpOiBmYWxzZSB9LCAvL3doaWNoIHN5bW1ldHJ5XG4gIH07XG5cbiAgLy90eXBlIGlzIGlycmVsaXZlbnQgaGVyZSBiZWN1YXNlIGh0ZXkgYXJlIGFyZSBpbnZhbGlkXG4gIHZhciB2YWxpZEV4dHJhcyA9IHsgIC8vIHZhbGlkIGF0b20gc3BlY3MgYXJlIG9rIHRvb1xuICAgIFwibW9kZWxcIjogeyB0eXBlOiBcInN0cmluZ1wiLCB2YWxpZDogZmFsc2UgfSwgLy8gYSBzaW5nbGUgbW9kZWwgb3IgbGlzdCBvZiBtb2RlbHMgZnJvbSB3aGljaCBhdG9tcyBzaG91bGQgYmUgc2VsZWN0ZWRcbiAgICBcImJvbmRzXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgdmFsaWQ6IGZhbHNlLCBndWk6IHRydWUgfSwgLy8gb3ZlcmxvYWRlZCB0byBzZWxlY3QgbnVtYmVyIG9mIGJvbmRzLCBlLmcuIHtib25kczogMH0gd2lsbCBzZWxlY3QgYWxsIG5vbmJvbmRlZCBhdG9tc1xuICAgIFwicHJlZGljYXRlXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24gdGhhdCBnZXRzIHBhc3NlZCBhbiB7QXRvbVNwZWN9IGFuZCBzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIGF0b20gc2hvdWxkIGJlIHNlbGVjdGVkXG4gICAgXCJpbnZlcnRcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgdmFsaWQ6IGZhbHNlLCBndWk6IHRydWUgfSwgLy8gaWYgc2V0LCBpbnZlcnRzIHRoZSBtZWFuaW5nIG9mIHRoZSBzZWxlY3Rpb25cbiAgICBcImJ5cmVzXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIHZhbGlkOiBmYWxzZSwgZ3VpOiB0cnVlIH0sIC8vIGlmIHNldCwgZXhwYW5kcyB0aGUgc2VsZWN0aW9uIHRvIGluY2x1ZGUgYWxsIGF0b21zIG9mIGFueSByZXNpZHVlIHRoYXQgaGFzIGFueSBhdG9tIHNlbGVjdGVkXG4gICAgXCJleHBhbmRcIjogeyB0eXBlOiBcIm51bWJlclwiLCB2YWxpZDogZmFsc2UsIGd1aTogZmFsc2UgfSwgLy8gZXhwYW5kcyB0aGUgc2VsZWN0aW9uIHRvIGluY2x1ZGUgYWxsIGF0b21zIHdpdGhpbiBhIGdpdmVuIGRpc3RhbmNlIGZyb20gdGhlIHNlbGVjdGlvblxuICAgIFwid2l0aGluXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIGludGVyc2VjdHMgdGhlIHNlbGVjdGlvbiB3aXRoIHRoZSBzZXQgb2YgYXRvbXMgd2l0aGluIGEgZ2l2ZW4gZGlzdGFuY2UgZnJvbSBhbm90aGVyIHNlbGVjdGlvblxuICAgIFwiYW5kXCI6IHsgdHlwZTogXCJzdHJpbmdcIiwgdmFsaWQ6IGZhbHNlIH0sIC8vIGFuZCBib29sZWFuIGxvZ2ljXG4gICAgXCJvclwiOiB7IHR5cGU6IFwic3RyaW5nXCIsIHZhbGlkOiBmYWxzZSB9LCAvLyBvciBib29sZWFuIGxvZ2ljXG4gICAgXCJub3RcIjogeyB0eXBlOiBcInN0cmluZ1wiLCB2YWxpZDogZmFsc2UgfSwgLy8gbm90IGJvb2xlYW4gbG9naWNcbiAgfTtcblxuICB2YXIgdmFsaWRBdG9tU2VsZWN0aW9uU3BlY3MgPSAkM0Rtb2wuZXh0ZW5kKHt9LCB2YWxpZEF0b21TcGVjcyk7XG4gIHZhbGlkQXRvbVNlbGVjdGlvblNwZWNzID0gJDNEbW9sLmV4dGVuZCh2YWxpZEF0b21TZWxlY3Rpb25TcGVjcywgdmFsaWRFeHRyYXMpO1xuXG4gIHZhciB2YWxpZExpbmVTcGVjID0ge1xuICAgIFwiaGlkZGVuXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwibGluZXdpZHRoXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMS4wIH0sXG4gICAgXCJjb2xvcnNjaGVtZVwiOiB7IHR5cGU6IFwiY29sb3JzY2hlbWVcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJjb2xvclwiOiB7IHR5cGU6IFwiY29sb3JcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJvcGFjaXR5XCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMSwgbWluOiAwLCBtYXg6IDEgfSxcbiAgfTtcblxuICB2YXIgdmFsaWRDcm9zc1NwZWMgPSB7XG4gICAgXCJoaWRkZW5cIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJsaW5ld2lkdGhcIjogeyB0eXBlOiBcIm51bWJlclwiLCBmbG9hdFR5cGU6IHRydWUsIGd1aTogZmFsc2UsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMS4wLCBtaW46IDAgfSwvL2RlcHJlY2F0ZWRcbiAgICBcImNvbG9yc2NoZW1lXCI6IHsgdHlwZTogXCJjb2xvcnNjaGVtZVwiLCBndWk6IHRydWUgfSxcbiAgICBcImNvbG9yXCI6IHsgdHlwZTogXCJjb2xvclwiLCBndWk6IHRydWUgfSxcbiAgICBcInJhZGl1c1wiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgZ3VpOiB0cnVlLCBzdGVwOiAwLjEsIGRlZmF1bHQ6IDEsIG1pbjogMC4xIH0sXG4gICAgXCJzY2FsZVwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgZ3VpOiB0cnVlLCBzdGVwOiAwLjEsIGRlZmF1bHQ6IDEsIG1pbjogMCB9LFxuICAgIFwib3BhY2l0eVwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgZ3VpOiB0cnVlLCBzdGVwOiAwLjEsIGRlZmF1bHQ6IDEsIG1pbjogMCwgbWF4OiAxIH0sXG4gIH07XG5cbiAgdmFyIHZhbGlkU3RpY2tTcGVjID0ge1xuICAgIFwiaGlkZGVuXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwiY29sb3JzY2hlbWVcIjogeyB0eXBlOiBcImNvbG9yc2NoZW1lXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwiY29sb3JcIjogeyB0eXBlOiBcImNvbG9yXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwicmFkaXVzXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMC4yNSwgbWluOiAwLjEgfSxcbiAgICBcInNpbmdsZUJvbmRzXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwib3BhY2l0eVwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGZsb2F0VHlwZTogdHJ1ZSwgZ3VpOiB0cnVlLCBzdGVwOiAwLjEsIGRlZmF1bHQ6IDEsIG1pbjogMCwgbWF4OiAxIH0sXG4gIH07XG5cbiAgdmFyIHZhbGlkU3BoZXJlU3BlYyA9IHtcbiAgICBcImhpZGRlblwiOiB7IHR5cGU6IFwiYm9vbGVhblwiLCBndWk6IGZhbHNlIH0sIC8vIG5lZWRlZCBpbiB0aGUgbmV3IGd1aSBpdCBoYXMgc2VwYXJhdGUgZnVuY3Rpb24gdG8gaGlkZSB0aGUgc3BoZXJlc1xuICAgIFwic2luZ2xlQm9uZHNcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJjb2xvcnNjaGVtZVwiOiB7IHR5cGU6IFwiY29sb3JzY2hlbWVcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJjb2xvclwiOiB7IHR5cGU6IFwiY29sb3JcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJyYWRpdXNcIjogeyB0eXBlOiBcIm51bWJlclwiLCBmbG9hdFR5cGU6IHRydWUsIGd1aTogdHJ1ZSwgc3RlcDogMC4xLCBkZWZhdWx0OiAxLjUsIG1pbjogMCB9LFxuICAgIFwic2NhbGVcIjogeyB0eXBlOiBcIm51bWJlclwiLCBmbG9hdFR5cGU6IHRydWUsIGd1aTogdHJ1ZSwgc3RlcDogMC4xLCBkZWZhdWx0OiAxLjAsIG1pbjogMC4xIH0sXG4gICAgXCJvcGFjaXR5XCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMSwgbWluOiAwLCBtYXg6IDEgfSxcbiAgfTtcblxuICB2YXIgdmFsaWRDYXJ0b29uU3BlYyA9IHtcbiAgICBcInN0eWxlXCI6IHsgdmFsaWRJdGVtczogW1widHJhY2VcIiwgXCJvdmFsXCIsIFwicmVjdGFuZ2xlXCIsIFwicGFyYWJvbGFcIiwgXCJlZGdlZFwiXSwgZ3VpOiB0cnVlIH0sXG4gICAgXCJjb2xvclwiOiB7IHR5cGU6IFwiY29sb3JcIiwgZ3VpOiB0cnVlLCBzcGVjdHJ1bTogdHJ1ZSB9LFxuICAgIFwiYXJyb3dzXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwicmliYm9uXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwiaGlkZGVuXCI6IHsgdHlwZTogXCJib29sZWFuXCIsIGd1aTogdHJ1ZSB9LFxuICAgIFwidHViZXNcIjogeyB0eXBlOiBcImJvb2xlYW5cIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJ0aGlja25lc3NcIjogeyB0eXBlOiBcIm51bWJlclwiLCBmbG9hdFR5cGU6IHRydWUsIGd1aTogdHJ1ZSwgc3RlcDogMC4xLCBkZWZhdWx0OiAxLCBtaW46IDAgfSxcbiAgICBcIndpZHRoXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMSwgbWluOiAwIH0sXG4gICAgXCJvcGFjaXR5XCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMSwgZGVmYXVsdDogMSwgbWluOiAwLCBtYXg6IDEgfSxcbiAgfTtcblxuICB2YXIgdmFsaWRBdG9tU3R5bGVTcGVjcyA9IHtcbiAgICBcImxpbmVcIjogeyB2YWxpZEl0ZW1zOiB2YWxpZExpbmVTcGVjLCB0eXBlOiBcImZvcm1cIiwgZ3VpOiB0cnVlIH0sIC8vIGRyYXcgYm9uZHMgYXMgbGluZXNcbiAgICBcImNyb3NzXCI6IHsgdmFsaWRJdGVtczogdmFsaWRDcm9zc1NwZWMsIHR5cGU6IFwiZm9ybVwiLCBndWk6IHRydWUgfSwgLy8gZHJhdyBhdG9tcyBhcyBjcm9zc2VkIGxpbmVzIChha2Egc3RhcnMpXG4gICAgXCJzdGlja1wiOiB7IHZhbGlkSXRlbXM6IHZhbGlkU3RpY2tTcGVjLCB0eXBlOiBcImZvcm1cIiwgZ3VpOiB0cnVlIH0sIC8vIGRyYXcgYm9uZHMgYXMgY2FwcGVkIGN5bGluZGVyc1xuICAgIFwic3BoZXJlXCI6IHsgdmFsaWRJdGVtczogdmFsaWRTcGhlcmVTcGVjLCB0eXBlOiBcImZvcm1cIiwgZ3VpOiB0cnVlIH0sIC8vIGRyYXcgYXRvbXMgYXMgc3BoZXJlc1xuICAgIFwiY2FydG9vblwiOiB7IHZhbGlkSXRlbXM6IHZhbGlkQ2FydG9vblNwZWMsIHR5cGU6IFwiZm9ybVwiLCBndWk6IHRydWUgfSwgLy8gZHJhdyBjYXJ0b29uIHJlcHJlc2VudGF0aW9uIG9mIHNlY29uZGFyeSBzdHJ1Y3R1cmVcbiAgICBcImNvbG9yZnVuY1wiOiB7IHZhbGlkSXRlbXM6IG51bGwsIHR5cGU6IFwianNcIiwgdmFsaWQ6IGZhbHNlIH0sXG4gICAgXCJjbGlja3NwaGVyZVwiOiB7IHZhbGlkSXRlbXM6IHZhbGlkU3BoZXJlU3BlYywgdHlwZTogXCJmb3JtXCIgfSAvL2ludmlzaWJsZSBzdHlsZSBmb3IgY2xpY2sgaGFuZGxpbmdcbiAgfTtcblxuICB2YXIgdmFsaWRTdXJmYWNlU3BlY3MgPSB7XG4gICAgXCJvcGFjaXR5XCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IHRydWUsIHN0ZXA6IDAuMDEsIGRlZmF1bHQ6IDEsIG1pbjogMCwgbWF4OiAxIH0sXG4gICAgXCJjb2xvcnNjaGVtZVwiOiB7IHR5cGU6IFwiY29sb3JzY2hlbWVcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJjb2xvclwiOiB7IHR5cGU6IFwiY29sb3JcIiwgZ3VpOiB0cnVlIH0sXG4gICAgXCJ2b2xkYXRhXCI6IHsgdHlwZTogXCJudW1iZXJcIiwgZmxvYXRUeXBlOiB0cnVlLCBndWk6IGZhbHNlIH0sXG4gICAgXCJ2b2xzY2hlbWVcIjogeyB0eXBlOiBcIm51bWJlclwiLCBmbG9hdFR5cGU6IHRydWUsIGd1aTogZmFsc2UgfSxcbiAgICBcIm1hcFwiOiB7IHR5cGU6IFwibnVtYmVyXCIsIGd1aTogZmFsc2UgfVxuICB9O1xuXG5cbiAgZnVuY3Rpb24gVUkoc3RhdGVNYW5hZ2VyLCBjb25maWcsIHBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge31cblxuICAgIC8vIEV4dHJhY3QgdGhlIHZpZXdlciBhbmQgdGhlbiByZW5kZXIgaXRcbiAgICB2YXIgaWNvbnMgPSBuZXcgJDNEbW9sLlVJLkljb25zKCk7XG4gICAgdmFyIF9lZGl0aW5nRm9ybSA9IG51bGw7XG4gICAgdmFyIG1haW5QYXJlbnQgPSAkKHBhcmVudEVsZW1lbnRbMF0pO1xuICAgIC8vIEdlbmVyYXRlcyB0aGUgbmVjZXNzYXJ5IFVJIGVsZW1lbnRzXG4gICAgdmFyIEhFSUdIVCA9IGNvbmZpZy5oZWlnaHQ7XG4gICAgdGhpcy50b29scyA9IGdlbmVyYXRlVUkoY29uZmlnKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYWxsIHRoZSBqcXVlcnkgb2JqZWN0IG9mIGRpZmZlcmVudCBVSSBmZWF0dXJlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdlbmVyYXRlVUkoKSB7XG4gICAgICB2YXIgbW9kZWxUb29sQmFyID0gbmV3IE1vZGVsVG9vbGJhcigpO1xuICAgICAgbWFpblBhcmVudC5hcHBlbmQobW9kZWxUb29sQmFyLnVpKTtcbiAgICAgIHNldExvY2F0aW9uKG1haW5QYXJlbnQsIG1vZGVsVG9vbEJhci51aSwgJ2xlZnQnLCAndG9wJyk7XG4gICAgICAvLyBtb2RlbFRvb2xCYXIudXBkYXRlSW5wdXRMZW5ndGgoKTtcblxuICAgICAgdmFyIGNvbnRleHRNZW51ID0gbmV3IENvbnRleHRNZW51KCk7XG4gICAgICBtYWluUGFyZW50LmFwcGVuZChjb250ZXh0TWVudS51aSk7XG4gICAgICBzZXRQb3NpdGlvbihjb250ZXh0TWVudS51aSwgMTAwLCAxMDApXG5cbiAgICAgIHZhciBzdXJmYWNlTWVudSA9IG5ldyBTdXJmYWNlTWVudSgpO1xuICAgICAgbWFpblBhcmVudC5hcHBlbmQoc3VyZmFjZU1lbnUudWkpO1xuICAgICAgc2V0TG9jYXRpb24obWFpblBhcmVudCwgc3VyZmFjZU1lbnUudWksICdyaWdodCcsICd0b3AnLCAwLCBtb2RlbFRvb2xCYXIudWkuaGVpZ2h0KCkgKyA1KTtcblxuXG4gICAgICB2YXIgc2VsZWN0aW9uQm94ID0gbmV3IFNlbGVjdGlvbkJveChpY29ucy5zZWxlY3QpO1xuICAgICAgbWFpblBhcmVudC5hcHBlbmQoc2VsZWN0aW9uQm94LnVpKTtcbiAgICAgIHNldExvY2F0aW9uKG1haW5QYXJlbnQsIHNlbGVjdGlvbkJveC51aSwgJ2xlZnQnLCAndG9wJywgMCwgbW9kZWxUb29sQmFyLnVpLmhlaWdodCgpICsgNSk7XG5cbiAgICAgIC8vIEZpeGluZyBDb250ZXh0IE1lbnUgQmVoYXZpb3VyXG4gICAgICBzZWxlY3Rpb25Cb3gudWkub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgc3RhdGVNYW5hZ2VyLmV4aXRDb250ZXh0TWVudSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHN1cmZhY2VNZW51LnVpLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgIHN0YXRlTWFuYWdlci5leGl0Q29udGV4dE1lbnUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb2RlbFRvb2xCYXI6IG1vZGVsVG9vbEJhcixcbiAgICAgICAgc2VsZWN0aW9uQm94OiBzZWxlY3Rpb25Cb3gsXG4gICAgICAgIGNvbnRleHRNZW51OiBjb250ZXh0TWVudSxcbiAgICAgICAgc3VyZmFjZU1lbnU6IHN1cmZhY2VNZW51XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIHRoZSBwYW5lbCB3aXRoIHJlc3BlY3QgdG8gdGhlIG5ldyB2aWV3cG9ydFxuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjcmVzaXplXG4gICAgICovXG4gICAgdGhpcy5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZWN0aW9uQm94ID0gdGhpcy50b29scy5zZWxlY3Rpb25Cb3g7XG4gICAgICB2YXIgc3VyZmFjZU1lbnUgPSB0aGlzLnRvb2xzLnN1cmZhY2VNZW51O1xuICAgICAgdmFyIG1vZGVsVG9vbEJhciA9IHRoaXMudG9vbHMubW9kZWxUb29sQmFyO1xuICAgICAgdmFyIEhFSUdIVCA9IG1haW5QYXJlbnQuaGVpZ2h0KCk7XG5cbiAgICAgIHNldExvY2F0aW9uKG1haW5QYXJlbnQsIG1vZGVsVG9vbEJhci51aSwgJ2xlZnQnLCAndG9wJyk7XG4gICAgICAvLyBtb2RlbFRvb2xCYXIudXBkYXRlSW5wdXRMZW5ndGgoKTtcbiAgICAgIHNldExvY2F0aW9uKG1haW5QYXJlbnQsIHNlbGVjdGlvbkJveC51aSwgJ2xlZnQnLCAndG9wJywgMCwgbW9kZWxUb29sQmFyLnVpLmhlaWdodCgpICsgNSk7XG4gICAgICBzZWxlY3Rpb25Cb3gudXBkYXRlU2Nyb2xsQm94KEhFSUdIVCk7XG4gICAgICBzZXRMb2NhdGlvbihtYWluUGFyZW50LCBzdXJmYWNlTWVudS51aSwgJ3JpZ2h0JywgJ3RvcCcsIDAsIG1vZGVsVG9vbEJhci51aS5oZWlnaHQoKSArIDUpO1xuICAgICAgc3VyZmFjZU1lbnUudXBkYXRlU2Nyb2xsQm94KEhFSUdIVCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBNb2RlbFRvb2xiYXIgaXMgcGFydCBvZiAkM0Rtb2wuVUkgdG8gZWRpdCBvciBjaGFuZ2UgdGhlIG1vZGVsIGxvYWRlZCBpbnRvIHRoZSB2aWV3ZXJcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gTW9kZWxUb29sYmFyXG4gICAgICovXG4gICAgZnVuY3Rpb24gTW9kZWxUb29sYmFyKCkge1xuICAgICAgdmFyIGJvdW5kaW5nQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgIGJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXG4gICAgICAgICdtaW4td2lkdGgnOiAnMTUwcHgnXG4gICAgICB9KTtcblxuXG4gICAgICB2YXIgbW9kZWxCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLm1vbGVjdWxlLCAyMCwgeyB0b29sdGlwOiAnVG9nZ2xlIE1vZGVsIFNlbGVjdGlvbiBCYXInIH0pO1xuICAgICAgYm91bmRpbmdCb3guYXBwZW5kKG1vZGVsQnV0dG9uLnVpKTtcblxuICAgICAgbW9kZWxCdXR0b24udWkuY3NzKHtcbiAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgJ3RvcCc6ICczcHgnLFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBjb250cm9sID0ge1xuICAgICAgICB1cmxUeXBlOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgIGtleTogJ01vZGVsIHR5cGUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXJsOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgIGtleTogJ1VybCdcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIHZhciBzdXJyb3VuZGluZ0JveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgIHN1cnJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICdiYWNrZ3JvdW5kJzogJyNlNGU0ZTQnLFxuICAgICAgICAncGFkZGluZyc6ICcycHgnLFxuICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICczcHgnLFxuICAgICAgICAvLyAnd2lkdGgnIDogJzkwJSdcbiAgICAgIH0pO1xuXG4gICAgICBib3VuZGluZ0JveC5hcHBlbmQoc3Vycm91bmRpbmdCb3gpO1xuXG4gICAgICB2YXIgY3VycmVudE1vZGVsQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIGN1cnJlbnRNb2RlbEJveC5jc3Moe1xuXG4gICAgICB9KTtcblxuICAgICAgdmFyIGN1cnJlbnRNb2RlbCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBjdXJyZW50TW9kZWwuY3NzKHtcbiAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgJ2ZvbnQtZmFtaWx5JzogJ0FyaWFsJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnLFxuICAgICAgICAvLyAncGFkZGluZycgOiAnM3B4J1xuICAgICAgfSk7XG5cbiAgICAgIGN1cnJlbnRNb2RlbEJveC5hcHBlbmQoY3VycmVudE1vZGVsKTtcblxuICAgICAgdmFyIGNoYW5nZUJ1dHRvbiA9IG5ldyBidXR0b24oaWNvbnMuY2hhbmdlLCAxNiwgeyB0b29sdGlwOiAnQ2hhbmdlIE1vZGVsJywgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLCBiZnI6IDAuNSB9KTtcbiAgICAgIGNoYW5nZUJ1dHRvbi51aS5jc3Moe1xuICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAnbWFyZ2luLWxlZnQnOiAnNHB4JyxcbiAgICAgIH0pO1xuICAgICAgY3VycmVudE1vZGVsQm94LmFwcGVuZChjaGFuZ2VCdXR0b24udWkpO1xuXG4gICAgICBjdXJyZW50TW9kZWxCb3guaGlkZSgpO1xuICAgICAgc3Vycm91bmRpbmdCb3guYXBwZW5kKGN1cnJlbnRNb2RlbEJveCk7XG5cbiAgICAgIHZhciBmb3JtQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHN1cnJvdW5kaW5nQm94LmFwcGVuZChmb3JtQm94KTtcblxuICAgICAgdmFyIGRicyA9ICdwZGIsbW10ZixjaWQnLnNwbGl0KCcsJyk7XG4gICAgICB2YXIgbGlzdCA9IHRoaXMubGlzdCA9IG5ldyAkM0Rtb2wuVUkuRm9ybS5MaXN0SW5wdXQoY29udHJvbC51cmxUeXBlLCBkYnMpO1xuICAgICAgbGlzdC5zaG93QWxlcnRCb3ggPSBmYWxzZTtcblxuICAgICAgbGlzdC51aS5jc3Moe1xuICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgfSlcblxuICAgICAgZm9ybUJveC5hcHBlbmQobGlzdC51aSk7XG5cbiAgICAgIHZhciBpbnB1dCA9IHRoaXMudXJsID0gbmV3ICQzRG1vbC5VSS5Gb3JtLklucHV0KGNvbnRyb2wudXJsKTtcbiAgICAgIGZvcm1Cb3guYXBwZW5kKGlucHV0LnVpKTtcblxuICAgICAgaW5wdXQudWkuY3NzKHtcbiAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgJ3dpZHRoJzogJzEyNXB4J1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGlucHV0LnNldFdpZHRoKDEyNSk7XG5cbiAgICAgIHZhciBzdWJtaXRCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLnRpY2ssIDE2LCB7IGJmcjogMC41LCBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGdyZWVuJywgdG9vbHRpcDogJ0FkZCBNb2RlbCcgfSk7XG4gICAgICBzdWJtaXRCdXR0b24udWkuY3NzKHtcbiAgICAgICAgJ21hcmdpbic6ICcwcHgnXG4gICAgICB9KVxuICAgICAgZm9ybUJveC5hcHBlbmQoc3VibWl0QnV0dG9uLnVpKTtcblxuICAgICAgdGhpcy51cGRhdGVJbnB1dExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdmFyIHdpZHRoID0gcGFyZW50RWxlbWVudC53aWR0aCgpKjAuMztcbiAgICAgICAgLy8gYm91bmRpbmdCb3gud2lkdGgod2lkdGgpO1xuICAgICAgICAvLyBpbnB1dC5zZXRXaWR0aCh3aWR0aCAtIDEyKTtcbiAgICAgIH1cblxuICAgICAgbW9kZWxCdXR0b24udWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzdXJyb3VuZGluZ0JveC50b2dnbGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBzdWJtaXRCdXR0b24udWkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmFsaWRhdGVEYiA9IGxpc3QudmFsaWRhdGUoKTtcbiAgICAgICAgdmFyIHZhbGlkYXRlSWQgPSBpbnB1dC52YWxpZGF0ZSgpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZUlkICYmIHZhbGlkYXRlRGIpIHtcbiAgICAgICAgICBzdGF0ZU1hbmFnZXIuYWRkTW9kZWwoY29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIC8qXG4gICAgICAgKiBTZXRzIHRoZSB0aXRsZSBpbiB0aGUgdWkgd2l0aCBzcGVjaWZpZWQgdmFsdWVcbiAgICAgICAqIFxuICAgICAgICogQGZ1bmN0aW9uIE1vZGVsVG9vbGJhciNzZXRNb2RlbCBcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkaW5nIE5hbWUgb2YgdGhlIG1vbGVjdWxlIHRoYXQgaXMgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSB0aXRsZVxuICAgICAgICovXG4gICAgICB0aGlzLnNldE1vZGVsID0gZnVuY3Rpb24gKGhlYWRpbmcpIHtcbiAgICAgICAgY3VycmVudE1vZGVsLnRleHQoaGVhZGluZyk7XG4gICAgICAgIGN1cnJlbnRNb2RlbEJveC5zaG93KCk7XG4gICAgICAgIGZvcm1Cb3guaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICBjaGFuZ2VCdXR0b24udWkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjdXJyZW50TW9kZWxCb3guaGlkZSgpO1xuICAgICAgICBmb3JtQm94LnNob3coKTtcbiAgICAgICAgaW5wdXQuc2V0VmFsdWUoJycpO1xuICAgICAgfSk7XG5cbiAgICAgIGJvdW5kaW5nQm94Lm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInIHx8IGUua2V5ID09ICdSZXR1cm4nKSB7XG4gICAgICAgICAgc3VibWl0QnV0dG9uLnVpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIFNlbGVjdGlvbiBib3ggY3JlYXRlcyB0aGUgVUkgcGFuZWwgdG8gbWFuaXB1bGF0ZSBzZWxlY3Rpb25zIGFuZCBzdHlsZSB0aGF0IGFyZSBkcmF3biBcbiAgICAgKiBvbiB0aGUgdmlld3BvcnRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gU2VsZWN0aW9uQm94ICBcbiAgICAgKiBAcGFyYW0geyQzRG1vbC5VSS5JY29uc30gaWNvbiB0YWtlcyB0aGUgc3ZnIGNvZGUgZm9yIHRoZSBpY29uIHRoYXQgaXMgdG8gYmUgdXNlZCB0byBkaXNwbGF5XG4gICAgICogc2VsZWN0aW9uIGJveFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gIEpxdWVyeSBlbGVtZW50IG9mIGRpdlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNlbGVjdGlvbkJveChpY29uLCBzaWRlID0gJ2xlZnQnKSB7XG4gICAgICB2YXIgc2VsZWN0aW9uQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgIHZhciBzZWxlY3Rpb25PYmplY3RzID0gW107XG5cbiAgICAgIHZhciBzZWxlY3Rpb25zID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHZhciBzY3JvbGxCb3ggPSAkKCc8ZGl2PjwvZGl2PicpO1xuXG4gICAgICBzZWxlY3Rpb25zLmNzcygnb3BhY2l0eScsICcwLjknKTtcblxuICAgICAgdmFyIHNob3dBcmVhID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHZhciBhZGRBcmVhID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHZhciBwbHVzQnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy5wbHVzLCAyMCwgeyB0b29sdGlwOiAnQWRkIE5ldyBTZWxlY3Rpb24nIH0pO1xuICAgICAgcGx1c0J1dHRvbi51aS5jc3MoJ21hcmdpbicsICcwcHgnKTtcblxuICAgICAgdmFyIGhpZGVCdXR0b24gPSBuZXcgYnV0dG9uKGljb24sIDIwLCB7IHRvb2x0aXA6ICdUb2dnbGUgU2VsZWN0aW9uIE1lbnUnIH0pO1xuICAgICAgdGhpcy5zZWxlY3Rpb25PYmplY3RzID0gW107XG5cbiAgICAgIC8vIENvbnRlbnRcbiAgICAgIHNlbGVjdGlvbkJveC5hcHBlbmQoaGlkZUJ1dHRvbi51aSk7XG4gICAgICBzZWxlY3Rpb25Cb3guYXBwZW5kKHNob3dBcmVhKTtcbiAgICAgIHNlbGVjdGlvbkJveC5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG5cbiAgICAgIHNjcm9sbEJveC5hcHBlbmQoc2VsZWN0aW9ucyk7XG4gICAgICBzaG93QXJlYS5hcHBlbmQoc2Nyb2xsQm94KTtcbiAgICAgIGFkZEFyZWEuYXBwZW5kKHBsdXNCdXR0b24udWkpO1xuXG4gICAgICB2YXIgYWxlcnRCb3ggPSBuZXcgQWxlcnRCb3goKTtcbiAgICAgIHNob3dBcmVhLmFwcGVuZChhbGVydEJveC51aSk7XG4gICAgICBzaG93QXJlYS5hcHBlbmQoYWRkQXJlYSk7XG4gICAgICBhbGVydEJveC51aS5jc3MoJ3dpZHRoJywgMTYyKTtcblxuICAgICAgLy8gQ1NTXG4gICAgICBpZiAoc2lkZSA9PSAnbGVmdCcpIHtcbiAgICAgICAgc2VsZWN0aW9uQm94LmNzcygndGV4dC1hbGlnbicsICdsZWZ0Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzaWRlID09ICdyaWdodCcpIHtcbiAgICAgICAgc2VsZWN0aW9uQm94LmNzcygndGV4dC1hbGlnbicsICdyaWdodCcpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIEFkZCBhbGVydCBib3ggY29kZVxuICAgICAgICBzZWxlY3Rpb25Cb3guY3NzKCd0ZXh0LWFsaWduJywgJ3JpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIHNob3dBcmVhLmNzcygnYm94LXNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgICBzaG93QXJlYS5jc3MoJ3BhZGRpbmcnLCAnM3B4Jyk7XG4gICAgICAvLyBzaG93QXJlYS5jc3MoJ3dpZHRoJywgJzE2MnB4Jyk7XG5cbiAgICAgIHNjcm9sbEJveC5jc3MoJ21heC1oZWlnaHQnLCBIRUlHSFQgKiAwLjgpO1xuICAgICAgc2Nyb2xsQm94LmNzcygnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gICAgICBzY3JvbGxCb3guY3NzKCdvdmVyZmxvdy14JywgJ3Zpc2libGUnKTtcblxuICAgICAgc2VsZWN0aW9ucy5jc3MoJ2JveC1zaXppbmcnLCAnY29udGVudC1ib3gnKTtcblxuICAgICAgdGhpcy51cGRhdGVTY3JvbGxCb3ggPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgICAgIHNjcm9sbEJveC5jc3MoJ21heC1oZWlnaHQnLCBoZWlnaHQgKiAwLjgpO1xuICAgICAgfVxuXG4gICAgICAvLyBBY3Rpb25cbiAgICAgIHZhciBoaWRkZW4gPSB0cnVlO1xuICAgICAgc2hvd0FyZWEuaGlkZSgpO1xuXG4gICAgICBoaWRlQnV0dG9uLnVpLmNsaWNrKHRvZ2dsZUhpZGUpO1xuXG4gICAgICBmdW5jdGlvbiB0b2dnbGVIaWRlKCkge1xuICAgICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgICAgc2hvd0FyZWEuc2hvdygxMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNob3dBcmVhLmhpZGUoMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBoaWRkZW4gPSAhaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogQ2FyZCBmb3IgbWFuaXB1bGF0aW9uIG9mIGEgc2VsZWN0aW9uIGZvcm0gYW5kIHJlbGF0ZWQgc3R5bGVzXG4gICAgICAgKiBcbiAgICAgICAqIEBmdW5jdGlvbiBTZWxlY3Rpb25cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gU2VsZWN0aW9uKCkge1xuICAgICAgICB2YXIgYm91bmRpbmdCb3ggPSB0aGlzLnVpID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIHNpZCA9IHRoaXMuaWQgPSBudWxsO1xuICAgICAgICBzZWxlY3Rpb25PYmplY3RzLnB1c2godGhpcyk7XG4gICAgICAgIGJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICAgJ2JhY2tncm91bmQnOiAnI2U4ZThlOCcsXG4gICAgICAgICAgJ3BhZGRpbmcnOiAnNHB4IDRweCAycHggNHB4JyxcbiAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICc2cHgnLFxuICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogJzNweCcsXG4gICAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAnd2lkdGgnOiAnMTU2cHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoZWFkZXIgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoaGVhZGVyKTtcbiAgICAgICAgdmFyIGhlYWRpbmcgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgY29udHJvbHMgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXG4gICAgICAgIGhlYWRlci5hcHBlbmQoaGVhZGluZywgY29udHJvbHMpO1xuICAgICAgICBoZWFkaW5nLmNzcyh7XG4gICAgICAgICAgJ2ZvbnQtZmFtaWx5JzogJ0FyaWFsJyxcbiAgICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCcsXG4gICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICd3aWR0aCc6ICc2MHB4J1xuICAgICAgICB9KTtcblxuICAgICAgICBjb250cm9scy5jc3Moe1xuICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaGVhZGVyLmhpZGUoKTtcbiAgICAgICAgY29udHJvbHMuZWRpdE1vZGUgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcmVtb3ZlQnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy5taW51cywgMTYsIHsgYmZyOiAwLjUsIGJhY2tncm91bmRDb2xvcjogJyNmMDZmNmYnLCB0b29sdGlwOiAnUmVtb3ZlIFNlbGVjdGlvbicgfSk7XG4gICAgICAgIHZhciBlZGl0QnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy5wZW5jaWwsIDE2LCB7IHRvb2x0aXA6ICdFZGl0IFNlbGVjdGlvbicgfSk7XG4gICAgICAgIHZhciB2aXNpYmxlQnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy52aXNpYmxlLCAxNiwgeyB0b29sdGlwOiAnU2hvdyAvIEhpZGUgU2VsZWN0aW9uJyB9KTtcblxuICAgICAgICBjb250cm9scy5hcHBlbmQocmVtb3ZlQnV0dG9uLnVpKVxuICAgICAgICBjb250cm9scy5hcHBlbmQoZWRpdEJ1dHRvbi51aSk7XG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZCh2aXNpYmxlQnV0dG9uLnVpKTtcblxuICAgICAgICB2YXIgcGFyYW1ldGVycyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGJvdW5kaW5nQm94LmFwcGVuZChwYXJhbWV0ZXJzKTtcblxuICAgICAgICB2YXIgc3R5bGVIb2xkZXIgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXG4gICAgICAgIHJlbW92ZUJ1dHRvbi51aS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RhdGVNYW5hZ2VyLnJlbW92ZVNlbGVjdGlvbihzaWQpO1xuICAgICAgICAgIGJvdW5kaW5nQm94LmRldGFjaCgpO1xuICAgICAgICAgIC8vZGVsZXRlIHRoaXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkaXRCdXR0b24udWkub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBhcmFtZXRlcnMudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdmlzaWJsZUJ1dHRvbi51aS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgc3RhdGVNYW5hZ2VyLnRvZ2dsZUhpZGUoc2lkKTtcbiAgICAgICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgICAgICBoaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHZpc2libGVCdXR0b24uc2V0U1ZHKGljb25zLnZpc2libGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICB2aXNpYmxlQnV0dG9uLnNldFNWRyhpY29ucy5pbnZpc2libGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHN0eWxlQm94ID0gbmV3IFN0eWxlQm94KCk7XG5cbiAgICAgICAgc3R5bGVIb2xkZXIuYXBwZW5kKHN0eWxlQm94LnVpKTtcbiAgICAgICAgc3R5bGVCb3gudWkuY3NzKHtcbiAgICAgICAgICAncG9zaXRpb24nOiAnc3RhdGljJyxcbiAgICAgICAgICAvLyAnbGVmdCcgOiAnMCcsXG4gICAgICAgICAgJ3dpZHRoJzogJ3B4JyxcbiAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICc0cHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0eWxlQm94LnVpLmhpZGUoKTtcblxuICAgICAgICB2YXIgYWxsQ29udHJvbCA9IHRoaXMuYWxsU2VsZWN0b3IgPSB7XG4gICAgICAgICAga2V5OiAnU2VsZWN0IEFsbCBBdG9tJyxcbiAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhbGxDaGVja0JveCA9IG5ldyAkM0Rtb2wuVUkuRm9ybS5DaGVja2JveChhbGxDb250cm9sKTtcbiAgICAgICAgcGFyYW1ldGVycy5hcHBlbmQoYWxsQ2hlY2tCb3gudWkpO1xuXG5cbiAgICAgICAgdmFyIHNlbGVjdGlvbkZvcm1Db250cm9sID0gdGhpcy5zZWxlY3Rpb25WYWx1ZSA9IHtcbiAgICAgICAgICBrZXk6ICdTZWxlY3Rpb24gU3BlYycsXG4gICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgYWN0aXZlOiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZWN0aW9uU3BlY0Zvcm0gPSBuZXcgJDNEbW9sLlVJLkZvcm0odmFsaWRBdG9tU2VsZWN0aW9uU3BlY3MsIHNlbGVjdGlvbkZvcm1Db250cm9sKTtcbiAgICAgICAgcGFyYW1ldGVycy5hcHBlbmQoc2VsZWN0aW9uU3BlY0Zvcm0udWkpO1xuXG4gICAgICAgIHZhciBzdWJtaXRDb250cm9scyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBzdWJtaXQgPSBuZXcgYnV0dG9uKGljb25zLnRpY2ssIDE2LCB7IGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Z3JlZW4nLCB0b29sdGlwOiAnU3VibWl0JyB9KTtcbiAgICAgICAgdmFyIGNhbmNlbCA9IG5ldyBidXR0b24oaWNvbnMuY3Jvc3MsIDE2LCB7IGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Y29yYWwnLCB0b29sdGlwOiAnQ2FuY2VsJyB9KTtcbiAgICAgICAgc3VibWl0Q29udHJvbHMuYXBwZW5kKHN1Ym1pdC51aSwgY2FuY2VsLnVpKTtcblxuXG4gICAgICAgIHZhciBhbGVydEJveCA9IG5ldyBBbGVydEJveCgpO1xuICAgICAgICBwYXJhbWV0ZXJzLmFwcGVuZChhbGVydEJveC51aSk7XG5cbiAgICAgICAgcGFyYW1ldGVycy5hcHBlbmQoc3VibWl0Q29udHJvbHMpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoc3R5bGVIb2xkZXIpO1xuXG4gICAgICAgIGFsbENoZWNrQm94LnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxlY3Rpb25TcGVjRm9ybS51aS50b2dnbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmFsaXplU2VsZWN0aW9uKGlkKSB7XG4gICAgICAgICAgaGVhZGVyLnNob3coKTtcbiAgICAgICAgICBjb250cm9scy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgc2lkID0gdGhpcy5pZCA9IGlkO1xuICAgICAgICAgIGhlYWRpbmcudGV4dCgnU2VsIycgKyBpZCk7XG4gICAgICAgICAgYm91bmRpbmdCb3guYXR0cignZGF0YS1pZCcsIGlkKTtcbiAgICAgICAgICBwYXJhbWV0ZXJzLmhpZGUoKTtcbiAgICAgICAgICBzdHlsZUJveC5zZXRTaWQoaWQpO1xuICAgICAgICAgIHN0eWxlQm94LnVpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQW5kQWRkU2VsZWN0aW9uKHNpZCA9IG51bGwpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdGUgPSBzZWxlY3Rpb25TcGVjRm9ybS52YWxpZGF0ZSgpO1xuICAgICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgICAgc2VsZWN0aW9uU3BlY0Zvcm0uZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIHZhciBjaGVja0F0b21zID0gc3RhdGVNYW5hZ2VyLmNoZWNrQXRvbXMoc2VsZWN0aW9uRm9ybUNvbnRyb2wudmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2VsZWN0aW9uRm9ybUNvbnRyb2wudmFsdWUpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFsZXJ0Qm94LmVycm9yKCdQbGVhc2UgZW50ZXIgc29tZSBpbnB1dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChjaGVja0F0b21zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3RhdGVNYW5hZ2VyLmFkZFNlbGVjdGlvbihzZWxlY3Rpb25Gb3JtQ29udHJvbC52YWx1ZSwgc2lkKTtcbiAgICAgICAgICAgICAgICBmaW5hbGl6ZVNlbGVjdGlvbihpZCk7XG4gICAgICAgICAgICAgICAgaWYgKHNpZCA9PSBudWxsKSBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydEJveC5lcnJvcignTm8gYXRvbSBzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guZXJyb3IoJ0ludmFsaWQgSW5wdXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVTZWxmKCkge1xuXG4gICAgICAgICAgLy8gZGVsZXRlIHNlbGVjdGlvblRvUmVtb3ZlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VibWl0LnVpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoY29udHJvbHMuZWRpdE1vZGUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChhbGxDb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGxldCBpZCA9IHN0YXRlTWFuYWdlci5hZGRTZWxlY3Rpb24oe30pO1xuICAgICAgICAgICAgICBmaW5hbGl6ZVNlbGVjdGlvbihpZCk7XG4gICAgICAgICAgICAgIF9lZGl0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNoZWNrQW5kQWRkU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWxsQ29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICBsZXQgaWQgPSBzaWQ7XG4gICAgICAgICAgICAgIHN0YXRlTWFuYWdlci5hZGRTZWxlY3Rpb24oe30sIGlkKTtcbiAgICAgICAgICAgICAgZmluYWxpemVTZWxlY3Rpb24oaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGxldCBpZCA9IHNpZDtcbiAgICAgICAgICAgICAgY2hlY2tBbmRBZGRTZWxlY3Rpb24oaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNhbmNlbC51aS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xzLmVkaXRNb2RlKSB7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBib3VuZGluZ0JveC5kZXRhY2goKTtcbiAgICAgICAgICAgIHJlbW92ZVNlbGYoc2VsZik7XG4gICAgICAgICAgICBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgYm91bmRpbmdCb3gub24oJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgc3VibWl0LnVpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBAZnVuY3Rpb24gU2VsZWN0aW9uI3NldFByb3BlcnR5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJZCBvZiB0aGUgc2VsZWN0aW9uIGNyZWF0ZWQgaW4gU3RhdGVNYW5hZ2VyIFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gc3BlY3MgRGVmaW5hdGlvbiBvZiB0aGUgc2VsZWN0aW9uIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHNldCBkZWZhdWx0IFxuICAgICAgICAgKiB2YWx1ZXMgaW4gdGhlIGZvcm1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydHkgPSBmdW5jdGlvbiAoaWQsIHNwZWNzKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGFsbCBzZWxlY3Rpb25cbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3BlY3MpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBhbGxDaGVja0JveC5zZXRWYWx1ZSh0cnVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25TcGVjRm9ybS5zZXRWYWx1ZShzcGVjcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZmluYWxpemUgdGhlIHNlbGVjdGlvbiBcbiAgICAgICAgICBmaW5hbGl6ZVNlbGVjdGlvbihpZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgKiBBZGRzIHN0eWxlIHRvIHRoZSBnaXZlbiBzZWxlY3Rpb24gXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAZnVuY3Rpb24gU2VsZWN0aW9uI2FkZFN0eWxlIFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsSWQgSWQgb2YgdGhlIHNlbGVjdGlvbiB0byBpbml0aXRhdGUgdGhlIFN0eWxlQm94XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHlsZUlkIElkIG9mIHRoZSBzdHlsZSB0aGF0IGlzIGNyZWF0ZWQgdGhyb3VnaCBTdGF0ZU1hbmFnZXJcbiAgICAgICAgICogQHBhcmFtIHtBdG9tU3R5bGVTcGVjc30gc3R5bGVTcGVjcyBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWRkU3R5bGUgPSBmdW5jdGlvbiAoc2VsSWQsIHN0eWxlSWQsIHN0eWxlU3BlY3MpIHtcbiAgICAgICAgICBzdHlsZUJveC5hZGRTdHlsZShzZWxJZCwgc3R5bGVJZCwgc3R5bGVTcGVjcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcGx1c0J1dHRvbi51aS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmICghX2VkaXRpbmdGb3JtKSB7XG4gICAgICAgICAgdmFyIG5ld1NlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oKTtcbiAgICAgICAgICBzZWxlY3Rpb25zLmFwcGVuZChuZXdTZWxlY3Rpb24udWkpO1xuICAgICAgICAgIF9lZGl0aW5nRm9ybSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWxlcnRCb3gud2FybmluZygnUGxlYXNlIGNvbXBsZXRlIHRoZSBwcmV2aW91cyBmb3JtJyk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cblxuICAgICAgLypcbiAgICAgICAqIFJlbW92ZSBhbGwgdGhlIHNlbGVjdGlvbiBjYXJkIGZyb20gdGhlIHVpXG4gICAgICAgKi9cbiAgICAgIHRoaXMuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGVjdGlvbnMuZW1wdHkoKTtcbiAgICAgICAgX2VkaXRpbmdGb3JtID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKiBBZGRzIG9yIGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGNhcmRcbiAgICAgICAqIFxuICAgICAgICogQGZ1bmN0aW9uIFNlbGVjdGlvbkJveCNlZGl0U2VsZWN0aW9uXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgSWQgY3JlYXRlZCBpbiBTdGF0ZU1hbmFnZXIgYW5kIHBhc3NlZCBkb3duIHRvIHRoaXMgZnVuY3Rpb24gZHVyaW5nIGNhbGxcbiAgICAgICAqIEBwYXJhbSB7QXRvbVNlbGVjdGlvblNwZWN9IHNlbFNwZWMgU2VsZWN0aW9uIHNwZWMgdGhhdCBpcyB1c2VkIHRvIGdlbmVyYXRlIHRoZSBzZWxlY3Rpb24gZm9ybVxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0eWxlSWQgSWQgb2Ygc3R5bGUgY3JlYXRlZCBpbiBTdGF0ZU1hbmFnZXJcbiAgICAgICAqIEBwYXJhbSB7QXRvbVN0eWxlU3BlY3N9IHN0eWxlU3BlYyBTdHlsZSBzcGVjIGlmIHNwZWNpZmllZCBhZGQgdGhlIHNlbGVjdGlvbiB0byB0aGUgY3VycmVudCBzZWxlY3Rpb24gXG4gICAgICAgKi9cbiAgICAgIHRoaXMuZWRpdFNlbGVjdGlvbiA9IGZ1bmN0aW9uIChpZCwgc2VsU3BlYywgc3R5bGVJZCwgc3R5bGVTcGVjKSB7XG4gICAgICAgIC8vIGlmIHNlbGVjdGlvbiBkb2VzIG5vdCBleGlzdCBjcmVhdGUgbmV3IFxuXG4gICAgICAgIC8vIFRoaXMgdGhpbmcgd29ya3MgYnV0IEkgYW0gbm90IHN1cmUgaG93IVxuXG4gICAgICAgIC8vIFNlYXJjaCBzZWxlY3Rpb24gd2l0aCBpZCBcbiAgICAgICAgdmFyIHNlbGVjdGlvblVJID0gc2VsZWN0aW9ucy5jaGlsZHJlbignW2RhdGEtaWQ9JyArIGlkICsgJ10nKTtcblxuICAgICAgICBpZiAoc2VsZWN0aW9uVUkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbigpO1xuICAgICAgICAgIHNlbGVjdGlvbi5zZXRQcm9wZXJ0eShpZCwgc2VsU3BlYyk7XG4gICAgICAgICAgc2VsZWN0aW9ucy5hcHBlbmQoc2VsZWN0aW9uLnVpKTtcblxuICAgICAgICAgIGlmIChzdHlsZUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRTdHlsZShpZCwgc3R5bGVJZCwgc3R5bGVTcGVjKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBDcmVhdGVzIFN0eWxlQm94IGZvciBsaXN0aW5nIG91dCBkaWZmZXJlbnQgc3R5bGVzIGluc2lkZSB0aGUgc2VsZWN0aW9uXG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uIFN0eWxlQm94IFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxJZCBJZCBvZiB0aGUgc2VsZWN0aW9uIGZvciB3aGljaCB0aGUgc3R5bGUgYm94IGlzIGNyZWF0ZWQgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNpZGUgQWxpZ25tZW50IG9mIHRleHQgaW5zaWRlIHRoZSBib3hcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdHlsZUJveChzZWxJZCwgc2lkZSA9ICdsZWZ0Jykge1xuICAgICAgdmFyIHN0eWxlQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgIHZhciBzaWQgPSB0aGlzLnNpZCA9IHNlbElkOyAvLyBzZWxlY3Rpb24gaWRcblxuICAgICAgdGhpcy5zZXRTaWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgc2lkID0gdGhpcy5zaWQgPSBpZDtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlcyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICB2YXIgc2Nyb2xsQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcblxuICAgICAgc3R5bGVzLmNzcygnb3BhY2l0eScsICcwLjknKTtcblxuICAgICAgdmFyIHNob3dBcmVhID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHZhciBhZGRBcmVhID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIGFkZEFyZWEuY3NzKCd0ZXh0LWFsaWduJywgJ2NlbnRlcicpO1xuICAgICAgdmFyIHBsdXNCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLnBsdXMsIDIwLCB7IHRvb2x0aXA6ICdBZGQgTmV3IFN0eWxlJyB9KTtcbiAgICAgIHBsdXNCdXR0b24udWkuY3NzKCdtYXJnaW4nLCAnMHB4Jyk7XG5cbiAgICAgIHRoaXMuc2VsZWN0aW9uT2JqZWN0cyA9IFtdO1xuXG4gICAgICAvLyBDb250ZW50XG4gICAgICBzdHlsZUJveC5hcHBlbmQoc2hvd0FyZWEpO1xuICAgICAgc3R5bGVCb3guY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuXG4gICAgICBzY3JvbGxCb3guYXBwZW5kKHN0eWxlcyk7XG4gICAgICBzaG93QXJlYS5hcHBlbmQoc2Nyb2xsQm94KTtcblxuICAgICAgdmFyIGFsZXJ0Qm94ID0gbmV3IEFsZXJ0Qm94KCk7XG4gICAgICBzaG93QXJlYS5hcHBlbmQoYWxlcnRCb3gudWkpO1xuXG4gICAgICBhZGRBcmVhLmFwcGVuZChwbHVzQnV0dG9uLnVpKTtcbiAgICAgIHNob3dBcmVhLmFwcGVuZChhZGRBcmVhKTtcblxuICAgICAgLy8gQ1NTXG4gICAgICBpZiAoc2lkZSA9PSAnbGVmdCcpIHtcbiAgICAgICAgc3R5bGVCb3guY3NzKCd0ZXh0LWFsaWduJywgJ2xlZnQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNpZGUgPT0gJ3JpZ2h0Jykge1xuICAgICAgICBzdHlsZUJveC5jc3MoJ3RleHQtYWxpZ24nLCAncmlnaHQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBBZGQgYWxlcnQgYm94IGNvZGVcbiAgICAgICAgc3R5bGVCb3guY3NzKCd0ZXh0LWFsaWduJywgJ3JpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIHNob3dBcmVhLmNzcygnYm94LXNpemluZycsICdib3JkZXItYm94Jyk7XG4gICAgICBzaG93QXJlYS5jc3MoJ3BhZGRpbmcnLCAnM3B4Jyk7XG4gICAgICAvLyBzaG93QXJlYS5jc3MoJ3dpZHRoJywgJzE2MnB4Jyk7XG4gICAgICBzaG93QXJlYS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI2E0YTRhNCcpXG4gICAgICBzaG93QXJlYS5jc3MoJ2JvcmRlci1yYWRpdXMnLCAnNHB4Jyk7XG5cbiAgICAgIC8vIHNjcm9sbEJveC5jc3MoJ21heC1oZWlnaHQnLCBIRUlHSFQqMC44KTtcbiAgICAgIHNjcm9sbEJveC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuXG4gICAgICAvLyBzdHlsZXMuY3NzKCdtYXgtaGVpZ2h0JywgSEVJR0hUKjAuOCk7XG4gICAgICAvLyBzdHlsZXMuY3NzKCdvdmVyZmxvdycsICdhdXRvJyk7XG4gICAgICBzdHlsZXMuY3NzKCdib3gtc2l6aW5nJywgJ2NvbnRlbnQtYm94Jyk7XG5cblxuICAgICAgLypcbiAgICAgICAqIFN0eWxlIGNhcmQgdG8gZGVmaW5lIHRoZSB2YWx1ZSBvZiB0aGUgc3R5bGUgXG4gICAgICAgKiBcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaWQgSWQgb2YgdGhlIHNlbGN0aW9uIGZvciB3aGljaCB0aGUgc3R5bGUgYm94IGlzIGNyZWF0ZWRcbiAgICAgICAqIGFuZCB0aGlzIHN0eWUgd2lsbCBiZSBhZGRlZCB1bmRlciB0aGF0IHNlbGVjdGlvblxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBTdHlsZShzaWQpIHtcbiAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBzdGlkID0gdGhpcy5pZCA9IG51bGw7IC8vIHN0eWxlIGlkIFxuICAgICAgICBib3VuZGluZ0JveC5jc3Moe1xuICAgICAgICAgICdiYWNrZ3JvdW5kJzogJyNlOGU4ZTgnLFxuICAgICAgICAgICdwYWRkaW5nJzogJzRweCA0cHggMnB4IDRweCcsXG4gICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiAnNnB4JyxcbiAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6ICczcHgnLFxuICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGJvdW5kaW5nQm94LmFwcGVuZChoZWFkZXIpO1xuICAgICAgICB2YXIgaGVhZGluZyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBjb250cm9scyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgaGVhZGVyLmFwcGVuZChoZWFkaW5nLCBjb250cm9scyk7XG4gICAgICAgIGhlYWRpbmcuY3NzKHtcbiAgICAgICAgICAnZm9udC1mYW1pbHknOiAnQXJpYWwnLFxuICAgICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcbiAgICAgICAgICAnZm9udC1zaXplJzogJzEycHgnLFxuICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgJ3dpZHRoJzogJzYwcHgnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRyb2xzLmNzcyh7XG4gICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICB9KTtcblxuICAgICAgICBoZWFkZXIuaGlkZSgpO1xuICAgICAgICBjb250cm9scy5lZGl0TW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciByZW1vdmVCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLm1pbnVzLCAxNiwgeyBiZnI6IDAuNSwgYmFja2dyb3VuZENvbG9yOiAnI2YwNmY2ZicsIHRvb2x0aXA6ICdSZW1vdmUgU3R5bGUnIH0pO1xuICAgICAgICB2YXIgZWRpdEJ1dHRvbiA9IG5ldyBidXR0b24oaWNvbnMucGVuY2lsLCAxNiwgeyB0b29sdGlwOiAnRWRpdCBTdHlsZScgfSk7XG4gICAgICAgIHZhciB2aXNpYmxlQnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy52aXNpYmxlLCAxNiwgeyB0b29sdGlwOiAnU2hvdyAvIEhpZGUgU3R5bGUnIH0pO1xuXG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZChyZW1vdmVCdXR0b24udWkpXG4gICAgICAgIGNvbnRyb2xzLmFwcGVuZChlZGl0QnV0dG9uLnVpKTtcbiAgICAgICAgY29udHJvbHMuYXBwZW5kKHZpc2libGVCdXR0b24udWkpO1xuXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgYm91bmRpbmdCb3guYXBwZW5kKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgIHJlbW92ZUJ1dHRvbi51aS5vbignY2xpY2snLCB7IHBhcmVudDogdGhpcywgc3RpZDogc3RpZCB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RhdGVNYW5hZ2VyLnJlbW92ZVN0eWxlKHNpZCwgc3RpZCk7XG4gICAgICAgICAgYm91bmRpbmdCb3guZGV0YWNoKCk7XG4gICAgICAgICAgLy9kZWxldGUgdGhpcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWRpdEJ1dHRvbi51aS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGFyYW1ldGVycy50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB2aXNpYmxlQnV0dG9uLnVpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdGF0ZU1hbmFnZXIudG9nZ2xlSGlkZVN0eWxlKHNpZCwgc3RpZCk7XG4gICAgICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICAgICAgaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB2aXNpYmxlQnV0dG9uLnNldFNWRyhpY29ucy52aXNpYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgdmlzaWJsZUJ1dHRvbi5zZXRTVkcoaWNvbnMuaW52aXNpYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBzdHlsZUZvcm1Db250cm9sID0gdGhpcy5zZWxlY3Rpb25WYWx1ZSA9IHtcbiAgICAgICAgICBrZXk6ICdTdHlsZSBTcGVjJyxcbiAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHlsZVNwZWNGb3JtID0gbmV3ICQzRG1vbC5VSS5Gb3JtKHZhbGlkQXRvbVN0eWxlU3BlY3MsIHN0eWxlRm9ybUNvbnRyb2wpO1xuICAgICAgICBwYXJhbWV0ZXJzLmFwcGVuZChzdHlsZVNwZWNGb3JtLnVpKTtcblxuICAgICAgICB2YXIgc3VibWl0Q29udHJvbHMgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgc3VibWl0ID0gbmV3IGJ1dHRvbihpY29ucy50aWNrLCAxNiwgeyBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGdyZWVuJywgdG9vbHRpcDogJ1N1Ym1pdCcgfSk7XG4gICAgICAgIHZhciBjYW5jZWwgPSBuZXcgYnV0dG9uKGljb25zLmNyb3NzLCAxNiwgeyBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGNvcmFsJywgdG9vbHRpcDogJ0NhbmNlbCcgfSk7XG4gICAgICAgIHN1Ym1pdENvbnRyb2xzLmFwcGVuZChzdWJtaXQudWksIGNhbmNlbC51aSk7XG5cblxuICAgICAgICB2YXIgYWxlcnRCb3ggPSBuZXcgQWxlcnRCb3goKTtcbiAgICAgICAgcGFyYW1ldGVycy5hcHBlbmQoYWxlcnRCb3gudWkpO1xuXG4gICAgICAgIHBhcmFtZXRlcnMuYXBwZW5kKHN1Ym1pdENvbnRyb2xzKTtcblxuICAgICAgICBmdW5jdGlvbiBmaW5hbGl6ZVN0eWxlKGlkKSB7XG4gICAgICAgICAgaGVhZGVyLnNob3coKTtcbiAgICAgICAgICBjb250cm9scy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgc3RpZCA9IGlkO1xuICAgICAgICAgIGhlYWRpbmcudGV4dCgnU3R5IycgKyBpZCk7XG4gICAgICAgICAgcGFyYW1ldGVycy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0FuZEFkZFN0eWxlKHN0aWQgPSBudWxsKSB7XG4gICAgICAgICAgdmFyIHZhbGlkYXRlID0gc3R5bGVTcGVjRm9ybS52YWxpZGF0ZSgpO1xuICAgICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgICAgc3R5bGVTcGVjRm9ybS5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3R5bGVGb3JtQ29udHJvbC52YWx1ZSkubGVuZ3RoID09IDApIHtcblxuICAgICAgICAgICAgICBhbGVydEJveC5lcnJvcignUGxlYXNlIGVudGVyIHNvbWUgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgaWQgPSBzdGF0ZU1hbmFnZXIuYWRkU3R5bGUoc3R5bGVGb3JtQ29udHJvbC52YWx1ZSwgc2lkLCBzdGlkKTtcbiAgICAgICAgICAgICAgZmluYWxpemVTdHlsZShpZCk7XG4gICAgICAgICAgICAgIGlmIChzdGlkID09IG51bGwpIF9lZGl0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guZXJyb3IoJ0ludmFsaWQgSW5wdXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdWJtaXQudWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGlmIChjb250cm9scy5lZGl0TW9kZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgY2hlY2tBbmRBZGRTdHlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHN0aWRcbiAgICAgICAgICAgIHN0eWxlU3BlY0Zvcm0uZ2V0VmFsdWUoKTtcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0eWxlRm9ybUNvbnRyb2wudmFsdWUpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFsZXJ0Qm94LmVycm9yKCdQbGVhc2UgZW50ZXIgc29tZSB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNoZWNrQW5kQWRkU3R5bGUoaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjYW5jZWwudWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGlmIChjb250cm9scy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgcGFyYW1ldGVycy5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYm91bmRpbmdCb3guZGV0YWNoKCk7XG4gICAgICAgICAgICAvL2RlbGV0ZSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYm91bmRpbmdCb3gub24oJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgc3VibWl0LnVpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uIFN0eWxlI3VwZGF0ZVN0eWxlIFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVJZCBJZCBvZiB0aGUgc3R5bGUgY3JlYXRlZCBieSBTdGF0ZU1hbmFnZXIgXG4gICAgICAgICAqIEBwYXJhbSB7QXRvbVN0eWxlU3BlY3N9IHN0eWxlU3BlYyBTcGVjcyBmb3IgZGVmaW5pbmcgdGhlIHN0eWxlIGFuZCBzZXR0aW5nIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVwZGF0ZVN0eWxlID0gZnVuY3Rpb24gKHN0eWxlSWQsIHN0eWxlU3BlYykge1xuICAgICAgICAgIHN0eWxlU3BlY0Zvcm0uc2V0VmFsdWUoc3R5bGVTcGVjKTtcblxuICAgICAgICAgIGZpbmFsaXplU3R5bGUoc3R5bGVJZCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBwbHVzQnV0dG9uLnVpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFfZWRpdGluZ0Zvcm0pIHtcbiAgICAgICAgICB2YXIgbmV3U3R5bGUgPSBuZXcgU3R5bGUoc2lkKTtcbiAgICAgICAgICBzdHlsZXMuYXBwZW5kKG5ld1N0eWxlLnVpKTtcbiAgICAgICAgICBfZWRpdGluZ0Zvcm0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGFsZXJ0Qm94Lndhcm5pbmcoJ1BsZWFzZSBjb21wbGV0ZSBlZGl0aW5nIHRoZSBjdXJyZW50IGZvcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGZ1bmN0aW9uIFN0eWxlQm94I2FkZFN0eWxlXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0aW9uSWQgSWQgb2YgdGhlIHNlbGVjdGlvbiBmb3Igd2hpY2ggc3R5bGVzIHdpbGwgYmUgY3JlYXRlZCAgIFxuICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0eWxlSWQgSWQgb2YgdGhlIHN0eWxlIHBhcnQgb2YgdGhlIHNlbGVjdGlvbiBcbiAgICAgICAqIEBwYXJhbSB7QXRvbVN0eWxlU3BlY3N9IHN0eWxlU3BlY3MgU3R5bGUgc3BlY3MgdGhhdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIFxuICAgICAgICogc3R5bGUgZm9yIHRoZSBzcGVjaWZpZWQgc2VsZWN0aW9uIGFuZCBzZXQgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIFN0eWxlIGNhcmRcbiAgICAgICAqL1xuICAgICAgdGhpcy5hZGRTdHlsZSA9IGZ1bmN0aW9uIChzZWxlY3Rpb25JZCwgc3R5bGVJZCwgc3R5bGVTcGVjcykge1xuICAgICAgICB2YXIgc3R5bGUgPSBuZXcgU3R5bGUoc2VsZWN0aW9uSWQpO1xuICAgICAgICBzdHlsZXMuYXBwZW5kKHN0eWxlLnVpKTtcbiAgICAgICAgc3R5bGUudXBkYXRlU3R5bGUoc3R5bGVJZCwgc3R5bGVTcGVjcyk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIEFkZCBhbGVydCBtZXNzYWdlcyB0byBkaWZmZXJlbnQgcGFuZWxzIFxuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiBBbGVydEJveFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgQ29uZmlndXJhaXRvbiBmb3IgYWxlcnQgYm94IGRpc3BsYXlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBbGVydEJveChjb25maWcpIHtcbiAgICAgIHZhciBib3VuZGluZ0JveCA9IHRoaXMudWkgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9XG4gICAgICB2YXIgZGVsYXkgPSBjb25maWcuZGVsYXkgfHwgNTAwMDtcbiAgICAgIHZhciBhdXRvaGlkZSA9IChjb25maWcuYXV0b2hpZGUgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiBjb25maWcuYXV0b2hpZGU7XG5cbiAgICAgIGJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICdmb250LWZhbWlseSc6ICdBcmlhbCcsXG4gICAgICAgICdmb250LXNpemUnOiAnMTRweCcsXG4gICAgICAgICdwYWRkaW5nJzogJzNweCcsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogJzRweCcsXG4gICAgICAgICdtYXJnaW4tdG9wJzogJzJweCcsXG4gICAgICAgICdtYXJnaW4tYm90dG0nOiAnMnB4JyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnLFxuICAgICAgICAndGV4dC1hbGlnbic6ICdjZW50ZXInLFxuICAgICAgfSk7XG5cbiAgICAgIGJvdW5kaW5nQm94LmhpZGUoKTtcblxuICAgICAgZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgaWYgKGF1dG9oaWRlKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBib3VuZGluZ0JveC5oaWRlKCk7XG4gICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogR2VuZXJhdGUgSW50ZXJuYWwgYWxlcnQgbWVzc2FnZSAgXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIEVycm9yIE1lc3NhZ2UgXG4gICAgICAgKi9cbiAgICAgIHRoaXMuZXJyb3IgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIGJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICAgJ2JhY2tncm91bmQnOiAnbGlnaHRjb3JhbCcsXG4gICAgICAgICAgJ2NvbG9yJzogJ2RhcmtyZWQnLFxuICAgICAgICAgICdib3JkZXInOiAnMXB4IHNvbGlkIGRhcmtyZWQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJvdW5kaW5nQm94LnRleHQobXNnKTtcbiAgICAgICAgYm91bmRpbmdCb3guc2hvdygpO1xuXG4gICAgICAgIGhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBHZW5lcmF0ZXMgSW50ZXJuYWwgd2FybmluZyBtZXNzYWdlXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIFdhcm1pbmcgbWVzc2FnZSBcbiAgICAgICAqL1xuICAgICAgdGhpcy53YXJuaW5nID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICBib3VuZGluZ0JveC5jc3Moe1xuICAgICAgICAgICdiYWNrZ3JvdW5kJzogJyNmZmYzY2QnLFxuICAgICAgICAgICdjb2xvcic6ICcjODU2NDA5JyxcbiAgICAgICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCAjODU2NDA5J1xuICAgICAgICB9KTtcblxuICAgICAgICBib3VuZGluZ0JveC50ZXh0KG1zZyk7XG4gICAgICAgIGJvdW5kaW5nQm94LnNob3coKTtcblxuICAgICAgICBoaWRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogR2VuZXJhdGVzIEludGVybmFsIEluZm8gbWVzc2FnZSBcbiAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgSW5mbyBtZXNzYWdlXG4gICAgICAgKi9cbiAgICAgIHRoaXMubWVzc2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgYm91bmRpbmdCb3guY3NzKHtcbiAgICAgICAgICAnYmFja2dyb3VuZCc6ICdsaWdodGdyZWVuJyxcbiAgICAgICAgICAnY29sb3InOiAnZ3JlZW4nLFxuICAgICAgICAgICdib3JkZXInOiAnMXB4IHNvbGlkIGdyZWVuJ1xuICAgICAgICB9KTtcblxuICAgICAgICBib3VuZGluZ0JveC50ZXh0KG1zZyk7XG4gICAgICAgIGJvdW5kaW5nQm94LnNob3coKTtcblxuICAgICAgICBoaWRlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBDcmVhdGVzIHRoZSBwYW5lbCBmb3IgbWFuaXB1bGF0aW9uIG9mIGxhYmVscyBvbiB0aGUgdmlld3BvcnRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gQ29udGV4dE1lbnVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb250ZXh0TWVudSgpIHtcbiAgICAgIHZhciBib3VuZGluZ0JveCA9IHRoaXMudWkgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXG4gICAgICBib3VuZGluZ0JveC5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAvLyBib3VuZGluZ0JveC5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgYmxhY2snKTtcbiAgICAgIGJvdW5kaW5nQm94LmNzcygnYm9yZGVyLXJhZGl1cycsICczcHgnKTtcbiAgICAgIGJvdW5kaW5nQm94LmNzcygnYmFja2dyb3VuZCcsICcjZjFmMWYxJyk7XG4gICAgICBib3VuZGluZ0JveC5jc3MoJ3otaW5kZXgnLCA5OSk7XG4gICAgICB2YXIgY29udGVudEJveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBjb250ZW50Qm94LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIGJvdW5kaW5nQm94LmNzcygnb3BhY2l0eScsICcwLjg1Jyk7XG5cbiAgICAgIGJvdW5kaW5nQm94LmFwcGVuZChjb250ZW50Qm94KTtcbiAgICAgIGNvbnRlbnRCb3guY3NzKHtcbiAgICAgICAgJ2JhY2tncm91bmQnOiAnI2YxZjFmMScsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogJzRweCcsXG4gICAgICAgICdwYWRkaW5nJzogJzRweCcsXG4gICAgICAgICd3aWR0aCc6ICcxNDBweCdcbiAgICAgIH0pO1xuICAgICAgLy8gQ29udGV4dCBCb3hcbiAgICAgIC8vIFJlbW92ZSBMYWJlbCBCdXR0b24gXG5cbiAgICAgIHZhciBsYWJlbE1lbnVTdHlsZSA9IHtcbiAgICAgICAgJ2JhY2tncm91bmQnOiAnI2QzZTJlZScsXG4gICAgICAgICdwYWRkaW5nJzogJzJweCcsXG4gICAgICAgICdmb250LWZhbWlseSc6ICdBcmlhbCcsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiAnMnB4JyxcbiAgICAgICAgLy8gJ21hcmdpbi10b3AnOiczcHgnXG4gICAgICB9XG5cbiAgICAgIHZhciByZW1vdmVMYWJlbE1lbnUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgcmVtb3ZlTGFiZWxNZW51LnRleHQoJ1JlbW92ZSBMYWJlbCcpO1xuICAgICAgcmVtb3ZlTGFiZWxNZW51LmNzcyhsYWJlbE1lbnVTdHlsZSk7XG4gICAgICByZW1vdmVMYWJlbE1lbnUuY3NzKCdtYXJnaW4tYm90dG9tJywgJzNweCcpO1xuXG4gICAgICBjb250ZW50Qm94LmFwcGVuZChyZW1vdmVMYWJlbE1lbnUpO1xuICAgICAgcmVtb3ZlTGFiZWxNZW51LmhpZGUoKTtcblxuICAgICAgLy8gTGFiZWwgUHJvcGVydHkgTGlzdCBcbiAgICAgIHZhciBwcm9wZXJ0eUtleXMgPSBPYmplY3Qua2V5cyh2YWxpZEF0b21TcGVjcyk7XG4gICAgICB2YXIgcHJvcGVydHlMaXN0ID0gW107XG4gICAgICB2YXIgcHJvcGVydHlPYmplY3RMaXN0ID0gW107XG5cbiAgICAgIHByb3BlcnR5S2V5cy5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIHZhciBwcm9wT2JqID0gdmFsaWRBdG9tU3BlY3M7XG4gICAgICAgIGlmIChwcm9wT2JqW3Byb3BdLnByb3AgPT09IHRydWUpIHtcbiAgICAgICAgICBwcm9wZXJ0eUxpc3QucHVzaChwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFByb3BlcnR5IE1lbnUgXG4gICAgICB2YXIgcHJvcGVydHlNZW51ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIGNvbnRlbnRCb3guYXBwZW5kKHByb3BlcnR5TWVudSk7XG5cbiAgICAgIC8qXG4gICAgICAgKiBQcm9wZXJ0eSBvYmplY3QgdXNlZCBpbiBwcm9wZXJ0eSBtZW51IFxuICAgICAgICogXG4gICAgICAgKiBAZnVuY3Rpb24gUHJvcGVydHkgXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IE5hbWUgb2YgdGhlIGF0b20gcHJvcGVydHlcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgb2YgdGhlIHByb3BlcnR5IFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBQcm9wZXJ0eShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMucm93ID0gJCgnPHRyPjwvdHI+Jyk7XG4gICAgICAgIHZhciBwcm9wTGFiZWxWYWx1ZSA9IHRoaXMuY29udHJvbCA9IHtcbiAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIHZhciBjaGVja2JveCA9IG5ldyAkM0Rtb2wuVUkuRm9ybS5DaGVja2JveChwcm9wTGFiZWxWYWx1ZSk7XG4gICAgICAgIHZhciBjaGVja2JveEhvbGRlciA9ICQoJzx0ZD48L3RkPicpO1xuICAgICAgICBjaGVja2JveEhvbGRlci5hcHBlbmQoY2hlY2tib3gudWkpO1xuICAgICAgICB2YXIga2V5SG9sZGVyID0gJCgnPHRkPjwvdGQ+Jyk7XG4gICAgICAgIHZhciBzZXBhcmF0b3JIb2xkZXIgPSAkKCc8dGQ+PC90ZD4nKS50ZXh0KCc6Jyk7XG4gICAgICAgIHZhciB2YWx1ZUhvbGRlciA9ICQoJzx0ZD48L3RkPicpO1xuXG4gICAgICAgIHRoaXMucm93LmFwcGVuZChjaGVja2JveEhvbGRlciwga2V5SG9sZGVyLCBzZXBhcmF0b3JIb2xkZXIsIHZhbHVlSG9sZGVyKTtcblxuICAgICAgICBrZXlIb2xkZXIudGV4dChrZXkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgdmFsdWVIb2xkZXIudGV4dCh2YWx1ZS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZUhvbGRlci50ZXh0KHZhbHVlLnJlcGxhY2UoL1xcXi9nLCAnJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1R5cGUgb2YgdmFsdWUnLCB0eXBlb2YgKHZhbHVlKSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICogQHBhcmFtIHtBdG9tU3BlY30gYXRvbSBWYWx1ZSBvZiBkaWZmZXJlbnQgcHJvcGVydHkgb2YgdGhlIGF0b20sIGlmIHRoZSBhdG9tIGhhcyBwcm9wIDogdHJ1ZVxuICAgICAgICogdGhlbiB0aGF0IG9wdGlvbiBpcyBtYWRlIHZpc2libGUgaW4gdGhlIGNvbnRleHQgbWVudVxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBzZXRQcm9wZXJ0aWVzKGF0b20pIHtcbiAgICAgICAgcHJvcGVydHlNZW51LmVtcHR5KCk7XG4gICAgICAgIHByb3BlcnR5T2JqZWN0TGlzdCA9IFtdO1xuXG4gICAgICAgIHZhciBwcm9wZXJ0eVRhYmxlID0gJCgnPHRhYmxlPjwvdGFibGU+Jyk7XG5cbiAgICAgICAgcHJvcGVydHlMaXN0LmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICB2YXIgcHJvcE9iaiA9IG5ldyBQcm9wZXJ0eShwcm9wLCBhdG9tW3Byb3BdKTtcbiAgICAgICAgICBwcm9wZXJ0eVRhYmxlLmFwcGVuZChwcm9wT2JqLnJvdyk7XG4gICAgICAgICAgcHJvcGVydHlPYmplY3RMaXN0LnB1c2gocHJvcE9iaik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BlcnR5TWVudS5hcHBlbmQocHJvcGVydHlUYWJsZSk7XG5cbiAgICAgICAgdmFyIGxhYmVsU3R5bGVIb2xkZXIgPSAkKCc8ZGl2PjxkaXY+Jyk7XG5cbiAgICAgICAgdmFyIGxhYmVsU3R5bGUgPSAkKCc8ZGl2PjxkaXY+Jyk7XG4gICAgICAgIGxhYmVsU3R5bGUudGV4dCgnU3R5bGUnKTtcbiAgICAgICAgbGFiZWxTdHlsZS5jc3Moe1xuICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgJ2ZvbnQtZmFtaWx5JzogJ0FyaWFsJyxcbiAgICAgICAgICAnZm9udC1zaXplJzogJzE0cHgnLFxuICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiAnNnB4JyxcbiAgICAgICAgICAnbWFyZ2luLWxlZnQnOiAnNnB4J1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgc3R5bGVzRm9yTGFiZWwgPSBuZXcgJDNEbW9sLlVJLkZvcm0uTGlzdElucHV0KGxhYmVsU3R5bGUsIE9iamVjdC5rZXlzKCQzRG1vbC5sYWJlbFN0eWxlcykpO1xuICAgICAgICBzdHlsZXNGb3JMYWJlbC51aS5jc3Moe1xuICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3R5bGVzRm9yTGFiZWwuc2V0VmFsdWUoJ21pbGsnKTtcblxuICAgICAgICBsYWJlbFN0eWxlSG9sZGVyLmFwcGVuZChsYWJlbFN0eWxlLCBzdHlsZXNGb3JMYWJlbC51aSk7XG4gICAgICAgIHByb3BlcnR5TWVudS5hcHBlbmQobGFiZWxTdHlsZUhvbGRlcik7XG5cbiAgICAgICAgdmFyIHN1Ym1pdCA9IG5ldyBidXR0b24oaWNvbnMudGljaywgMTgsIHsgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmVlbicsIHRvb2x0aXA6ICdTdWJtaXQnIH0pO1xuICAgICAgICB2YXIgY2FuY2VsID0gbmV3IGJ1dHRvbihpY29ucy5jcm9zcywgMTgsIHsgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRjb3JhbCcsIHRvb2x0aXA6ICdDYW5jZWwnIH0pO1xuXG4gICAgICAgIHZhciBjb250cm9sQnV0dG9ucyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGNvbnRyb2xCdXR0b25zLmFwcGVuZChzdWJtaXQudWksIGNhbmNlbC51aSk7XG4gICAgICAgIC8vIGNvbnRyb2xCdXR0b25zLmNzcygndGV4dC1hbGlnbicsICdjZW50ZXInKTtcblxuICAgICAgICB2YXIgYWxlcnRCb3ggPSBuZXcgQWxlcnRCb3goKTtcbiAgICAgICAgcHJvcGVydHlNZW51LmFwcGVuZChhbGVydEJveC51aSk7XG5cbiAgICAgICAgcHJvcGVydHlNZW51LmFwcGVuZChjb250cm9sQnV0dG9ucyk7XG5cblxuICAgICAgICBzdWJtaXQudWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHZhciBwcm9wcyA9IHByb2Nlc3NQcm9wZXJ0eUxpc3QoKTtcbiAgICAgICAgICB2YXIgbGFiZWxTdHlsZVZhbGlkYXRpb24gPSBzdHlsZXNGb3JMYWJlbC52YWxpZGF0ZSgpO1xuXG4gICAgICAgICAgaWYgKHByb3BzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsYWJlbFN0eWxlVmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICBzdGF0ZU1hbmFnZXIuYWRkQXRvbUxhYmVsKHByb3BzLCBhdG9tLCBzdHlsZXNGb3JMYWJlbC5nZXRWYWx1ZSgpLnZhbHVlKTtcbiAgICAgICAgICAgICAgc3RhdGVNYW5hZ2VyLmV4aXRDb250ZXh0TWVudShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgYWxlcnRCb3guZXJyb3IoJ1NlbGVjdCBzdHlsZSBmb3IgbGFiZWwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydEJveC5lcnJvcignTm8gdmFsdWUgc2VsZWN0ZWQgZm9yIGxhYmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjYW5jZWwudWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHN0YXRlTWFuYWdlci5leGl0Q29udGV4dE1lbnUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZpb3VzIExhYmVscyBcbiAgICAgIHZhciBsYWJlbEhvbGRlciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBjb250ZW50Qm94LmFwcGVuZChsYWJlbEhvbGRlcik7XG5cbiAgICAgIC8vIEFkZCBNZW51IFxuICAgICAgdmFyIGFkZE1lbnUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgY29udGVudEJveC5hcHBlbmQoYWRkTWVudSk7XG4gICAgICBhZGRNZW51LmNzcygnd2lkdGgnLCAnMTAwJScpO1xuXG4gICAgICB2YXIgYWRkTGFiZWxNZW51ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIGFkZE1lbnUuYXBwZW5kKGFkZExhYmVsTWVudSk7XG5cblxuICAgICAgYWRkTGFiZWxNZW51LnRleHQoJ0FkZCBMYWJlbCcpO1xuICAgICAgYWRkTGFiZWxNZW51LmNzcyhsYWJlbE1lbnVTdHlsZSk7XG4gICAgICBhZGRMYWJlbE1lbnUuY3NzKCdtYXJnaW4tYm90dG9tJywgJzNweCcpO1xuICAgICAgYWRkTGFiZWxNZW51LmhpZGUoKTtcblxuICAgICAgLy8gRWRpdCBNZW51XG4gICAgICB2YXIgZWRpdE1lbnUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgY29udGVudEJveC5hcHBlbmQoZWRpdE1lbnUpO1xuXG4gICAgICBjb250ZW50Qm94LmNzcyh7XG4gICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZScsXG4gICAgICB9KTtcblxuICAgICAgZWRpdE1lbnUuY3NzKHtcbiAgICAgICAgJ2JhY2tncm91bmQnOiAnI2RmZGZkZicsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogJzNweCcsXG4gICAgICAgICdmb250LWZhbWlseSc6ICdBcmlhbCcsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgLy8gJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICAgLy8gJ2xlZnQnIDogJzEwNSUnLFxuICAgICAgICAvLyAndG9wJyA6ICcwJywsXG4gICAgICAgICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAnd2lkdGgnOiAnMTAwJScsXG5cbiAgICAgIH0pO1xuICAgICAgZWRpdE1lbnUuaGlkZSgpO1xuXG4gICAgICB2YXIgYWxlcnRCb3ggPSBuZXcgQWxlcnRCb3goeyBhdXRvaGlkZTogZmFsc2UgfSk7XG4gICAgICBjb250ZW50Qm94LmFwcGVuZChhbGVydEJveC51aSk7XG5cbiAgICAgIC8vIEFkZCBMYWJlbCBJbnB1dHMgXG5cbiAgICAgIC8qXG4gICAgICAgKiBHZW5lcmF0ZSBpbnB1dCBlbGVtZW50cyB0aGF0IGFyZSB1c2VkIGFzIGZvcm0gdmFsdWVzIGluIHRoZSBjb250ZXh0IG1lbnUgdW5kZXIgYWRkTGFiZWxGb3JtXG4gICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGF0IGhvbGRzIGRpZmZlcmVudCBpbnB1dCBlbGVtZW50c1xuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBnZW5lcmF0ZUFkZExhYmVsRm9ybSgpIHtcbiAgICAgICAgdmFyIGFkZExhYmVsRm9ybSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGFkZExhYmVsVmFsdWUgPSB7XG4gICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAga2V5OiAnTGFiZWwgVGV4dCcsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGtleTogJ1N0eWxlJyxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZWw6IHtcbiAgICAgICAgICAgIGtleTogJ1NlbGVjdGlvbicsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1Nb2RpZmllckNvbnRyb2wgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgcmVtb3ZlQnV0dG9uID0gbmV3IGJ1dHRvbihpY29ucy5taW51cywgMTYpO1xuICAgICAgICB2YXIgdGljayA9IG5ldyBidXR0b24oaWNvbnMudGljaywgMTYsIHsgYmFja2dyb3VuZENvbG9yOiAnbGlnaHRncmVlbicsIHRvb2x0aXA6ICdTdWJtaXQnIH0pO1xuICAgICAgICB2YXIgY3Jvc3MgPSBuZXcgYnV0dG9uKGljb25zLmNyb3NzLCAxNiwgeyBiYWNrZ3JvdW5kQ29sb3I6ICdsaWdodGNvcmFsJywgdG9vbHRpcDogJ0NhbmNlbCcgfSk7XG4gICAgICAgIGZvcm1Nb2RpZmllckNvbnRyb2wuYXBwZW5kKHJlbW92ZUJ1dHRvbi51aSwgdGljay51aSwgY3Jvc3MudWkpO1xuICAgICAgICByZW1vdmVCdXR0b24udWkuaGlkZSgpO1xuICAgICAgICBhZGRMYWJlbEZvcm0uYXBwZW5kKGZvcm1Nb2RpZmllckNvbnRyb2wpO1xuXG4gICAgICAgIHZhciBhZGRMYWJlbFRleHRCb3ggPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgbHQgPSAkKCc8ZGl2PjwvZGl2PicpLnRleHQoJ0xhYmVsIFRleHQnKTtcbiAgICAgICAgdmFyIGFkZExhYmVsVGV4dElucHV0ID0gbmV3ICQzRG1vbC5VSS5Gb3JtLklucHV0KGFkZExhYmVsVmFsdWUudGV4dCk7XG4gICAgICAgIGFkZExhYmVsVGV4dEJveC5hcHBlbmQobHQsIGFkZExhYmVsVGV4dElucHV0LnVpKTtcbiAgICAgICAgdmFyIHdpZHRoID0gMTI2Ly9lZGl0TWVudS5pbm5lcldpZHRoKCkqMC44O1xuICAgICAgICBhZGRMYWJlbFRleHRJbnB1dC5zZXRXaWR0aCh3aWR0aCk7XG4gICAgICAgIGFkZExhYmVsRm9ybS5hcHBlbmQoYWRkTGFiZWxUZXh0Qm94KTtcblxuICAgICAgICB2YXIgYWRkTGFiZWxTdHlsZUJveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBscyA9ICQoJzxkaXY+PC9kaXY+JykudGV4dCgnTGFiZWwgU3R5bGUnKTtcbiAgICAgICAgdmFyIGFkZExhYmVsU3R5bGVJbnB1dCA9IG5ldyAkM0Rtb2wuVUkuRm9ybS5MaXN0SW5wdXQoYWRkTGFiZWxWYWx1ZS5zdHlsZSwgT2JqZWN0LmtleXMoJDNEbW9sLmxhYmVsU3R5bGVzKSk7XG4gICAgICAgIGFkZExhYmVsU3R5bGVJbnB1dC5zZXRWYWx1ZSgnbWlsaycpO1xuICAgICAgICBhZGRMYWJlbFN0eWxlQm94LmFwcGVuZChscywgYWRkTGFiZWxTdHlsZUlucHV0LnVpKTtcbiAgICAgICAgYWRkTGFiZWxGb3JtLmFwcGVuZChhZGRMYWJlbFN0eWxlQm94KTtcblxuICAgICAgICB2YXIgc2VsZWN0aW9uTGlzdCA9IHN0YXRlTWFuYWdlci5nZXRTZWxlY3Rpb25MaXN0KCk7XG5cbiAgICAgICAgdmFyIGFkZExhYmVsU2VsZWN0aW9uQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGxzbCA9ICQoJzxkaXY+PC9kaXY+JykudGV4dCgnTGFiZWwgU2VsZWN0aW9uJyk7XG4gICAgICAgIHZhciBhZGRMYWJlbFNlbGVjdGlvbklucHV0ID0gbmV3ICQzRG1vbC5VSS5Gb3JtLkxpc3RJbnB1dChhZGRMYWJlbFZhbHVlLnNlbCwgc2VsZWN0aW9uTGlzdCk7XG4gICAgICAgIGFkZExhYmVsU2VsZWN0aW9uQm94LmFwcGVuZChsc2wsIGFkZExhYmVsU2VsZWN0aW9uSW5wdXQudWkpO1xuICAgICAgICBhZGRMYWJlbEZvcm0uYXBwZW5kKGFkZExhYmVsU2VsZWN0aW9uQm94KTtcblxuICAgICAgICAvLyBDU1MgXG4gICAgICAgIGFkZExhYmVsRm9ybS5jc3Moe1xuICAgICAgICAgICdwYWRkaW5nJzogJzJweCcsXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGljay51aS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgdmFyIHZhbGlkYXRlID0gdHJ1ZTtcblxuICAgICAgICAgIGlmICghYWRkTGFiZWxTdHlsZUlucHV0LnZhbGlkYXRlKCkpXG4gICAgICAgICAgICB2YWxpZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKCFhZGRMYWJlbFRleHRJbnB1dC52YWxpZGF0ZSgpKVxuICAgICAgICAgICAgdmFsaWRhdGUgPSBmYWxzZTtcblxuICAgICAgICAgIGlmICghYWRkTGFiZWxTZWxlY3Rpb25JbnB1dC52YWxpZGF0ZSgpKVxuICAgICAgICAgICAgdmFsaWRhdGUgPSBmYWxzZTtcblxuICAgICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgICAgc3RhdGVNYW5hZ2VyLmFkZExhYmVsKGFkZExhYmVsVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3Jvc3MudWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHN0YXRlTWFuYWdlci5leGl0Q29udGV4dE1lbnUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVtb3ZlQnV0dG9uLnVpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBzdGF0ZU1hbmFnZXIucmVtb3ZlTGFiZWwoKVxuICAgICAgICB9KTtcblxuICAgICAgICBhZGRMYWJlbEZvcm0ub24oJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGljay51aS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBib3VuZGluZ0JveDogYWRkTGFiZWxGb3JtLFxuICAgICAgICAgIHRleHQ6IGFkZExhYmVsVGV4dElucHV0LFxuICAgICAgICAgIHN0eWxlOiBhZGRMYWJlbFN0eWxlSW5wdXQsXG4gICAgICAgICAgc2VsZWN0aW9uOiBhZGRMYWJlbFNlbGVjdGlvbklucHV0LFxuICAgICAgICAgIGVkaXRNb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW1vdmVCdXR0b24udWkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIGZ1bmN0aW9uIHByb2Nlc3NQcm9wZXJ0eUxpc3QoKSB7XG4gICAgICAgIHZhciBwcm9wc0ZvckxhYmVsID0ge307XG5cbiAgICAgICAgcHJvcGVydHlPYmplY3RMaXN0LmZvckVhY2goKHByb3BPYmopID0+IHtcbiAgICAgICAgICBpZiAocHJvcE9iai5jb250cm9sLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwcm9wc0ZvckxhYmVsW3Byb3BPYmoua2V5XSA9IHByb3BPYmoudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMocHJvcHNGb3JMYWJlbCkubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICByZXR1cm4gcHJvcHNGb3JMYWJlbFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbnRleHQgTWVudSBVSSBGdW5jaXRvbiBcbiAgICAgIGJvdW5kaW5nQm94LmhpZGUoKTtcbiAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXRvbSA9IG51bGw7XG5cbiAgICAgIHJlbW92ZUxhYmVsTWVudS5vbignY2xpY2snLCB7IGF0b206IHRoaXMuYXRvbSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlTWFuYWdlci5yZW1vdmVBdG9tTGFiZWwocmVtb3ZlTGFiZWxNZW51LmF0b20pO1xuICAgICAgfSk7XG5cblxuICAgICAgLyoqXG4gICAgICAgKiBTaG93cyB0aGUgY29udGV4dCBtZW51IFxuICAgICAgICogXG4gICAgICAgKiBAZnVuY3Rpb24gQ29udGV4dE1lbnUjc2hvdyBcbiAgICAgICAqIFxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHggeCBjb29yZGluYXRlIG9mIHRoZSBtb3VzZVxuICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgeSBjb29yZGluYXRlIG9mIHRoZSBtb3VzZSBpbiB0aGUgdmlld3BvcnQgaW4gcGl4ZWxzXG4gICAgICAgKiBAcGFyYW0ge0F0b21TcGVjfSBhdG9tIFZhbHVlIG9mIHRoZSBhdG9tcyB0aGF0IGlzIHNlbGVjdGVkIFxuICAgICAgICogQHBhcmFtIHtCb29sZWFufSBhdG9tRXhpc3QgaWYgYXRvbSBsYWJlbCBpcyBwcmV2aW91c2x5IGFkZGVkIGl0IGlzIHNldCB0cnVlIGVsc2UgZmFsc2VcbiAgICAgICAqL1xuICAgICAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKHgsIHksIGF0b20sIGF0b21FeGlzdCkge1xuXG4gICAgICAgIGlmIChhdG9tRXhpc3QpIHtcbiAgICAgICAgICByZW1vdmVMYWJlbE1lbnUuc2hvdygpO1xuICAgICAgICAgIHJlbW92ZUxhYmVsTWVudS5hdG9tID0gYXRvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZW1vdmVMYWJlbE1lbnUuaGlkZSgpO1xuICAgICAgICAgIHJlbW92ZUxhYmVsTWVudS5hdG9tID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFsZXJ0Qm94LnVpLmhpZGUoKTtcbiAgICAgICAgYWRkTGFiZWxNZW51LmhpZGUoKTtcblxuICAgICAgICBpZiAoc3RhdGVNYW5hZ2VyLmdldFNlbGVjdGlvbkxpc3QoKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIGFsZXJ0Qm94Lm1lc3NhZ2UoJ1BsZWFzZSBjcmVhdGUgc2VsZWN0aW9ucyBiZWZvcmUgYWRkaW5nIGxhYmVsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkTGFiZWxNZW51LnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVuc2V0Rm9ybSgpO1xuICAgICAgICBzZXRQb3NpdGlvbihib3VuZGluZ0JveCwgeCwgeSk7XG4gICAgICAgIGJvdW5kaW5nQm94LnNob3coKTtcbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAoYXRvbSkge1xuICAgICAgICAgIHNldFByb3BlcnRpZXMoYXRvbSk7XG4gICAgICAgICAgdGhpcy5hdG9tID0gYXRvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwcm9wZXJ0eU1lbnUuZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEhpZGVzIHRoZSBjb250ZXh0IG1lbnUgYW5kIGlmIG5lZWRlZCBwcm9jZXNzIHRoZSBwcm9wZXJ0eU1lbnVcbiAgICAgICAqIFxuICAgICAgICogQGZ1bmN0aW9uIENvbnRleHRNZW51I2hpZGVcbiAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJvY2Vzc0NvbnRleHRNZW51IElmIHRydWUgdGhlbiBzdWJtaXNzaW9uIG9mIHRoZSBwcm9wZXJ0eSB0byBhZGQgbGFiZWwgaXMgZXhlY3V0ZWRcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAocHJvY2Vzc0NvbnRleHRNZW51KSB7XG4gICAgICAgIGlmIChwcm9jZXNzQ29udGV4dE1lbnUpIHtcbiAgICAgICAgICB2YXIgcHJvcHNGb3JMYWJlbCA9IHByb2Nlc3NQcm9wZXJ0eUxpc3QoKTtcbiAgICAgICAgICBpZiAocHJvcHNGb3JMYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZU1hbmFnZXIuYWRkQXRvbUxhYmVsKHByb3BzRm9yTGFiZWwsIHRoaXMuYXRvbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYm91bmRpbmdCb3guaGlkZSgpO1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHVuc2V0Rm9ybSgpO1xuICAgICAgfVxuXG4gICAgICBhZGRMYWJlbE1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWRkTGFiZWxNZW51Rm9ybSA9IGdlbmVyYXRlQWRkTGFiZWxGb3JtKCk7XG4gICAgICAgIHNldEZvcm0oYWRkTGFiZWxNZW51Rm9ybSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gc2V0Rm9ybShmb3JtKSB7XG4gICAgICAgIGVkaXRNZW51LmNoaWxkcmVuKCkuZGV0YWNoKCk7XG4gICAgICAgIGVkaXRNZW51LmFwcGVuZChmb3JtLmJvdW5kaW5nQm94KTtcbiAgICAgICAgZWRpdE1lbnUuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1bnNldEZvcm0oKSB7XG4gICAgICAgIGVkaXRNZW51LmNoaWxkcmVuKCkuZGV0YWNoKCk7XG4gICAgICAgIGVkaXRNZW51LmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIENyZWF0ZXMgVUkgcGFuZWwgZm9yIHN1cmZhY2UgbWFuaXB1bGF0aW9uc1xuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiBTdXJmYWNlTWVudSBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdXJmYWNlTWVudSgpIHtcbiAgICAgIHZhciBib3VuZGluZ0JveCA9IHRoaXMudWkgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgdmFyIF9lZGl0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgLy8gU2VsZWN0aW9uIExheW91dFxuXG4gICAgICBib3VuZGluZ0JveC5jc3Moe1xuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxuICAgICAgICAnd2lkdGgnOiAnMTQwcHgnLFxuICAgICAgICAndGV4dC1hbGlnbic6ICdyaWdodCdcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgc3VyZmFjZUJ1dHRvbiA9IG5ldyBidXR0b24oaWNvbnMuc3VyZmFjZSwgMjAsIHsgdG9vbHRpcDogJ1RvZ2dsZSBTdXJmYWNlIE1lbnUnIH0pO1xuXG4gICAgICBib3VuZGluZ0JveC5hcHBlbmQoc3VyZmFjZUJ1dHRvbi51aSk7XG5cblxuICAgICAgdmFyIGRpc3BsYXlCb3ggPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgYm91bmRpbmdCb3guYXBwZW5kKGRpc3BsYXlCb3gpO1xuXG4gICAgICAvLyBPdmVyZmxvdyBmaXggXG4gICAgICBib3VuZGluZ0JveC5jc3Moe1xuICAgICAgICAnb3ZlcmZsb3cnOiAndmlzaWJsZScsXG4gICAgICB9KTtcblxuICAgICAgdmFyIG5ld1N1cmZhY2VTcGFjZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBuZXdTdXJmYWNlU3BhY2UuY3NzKHtcbiAgICAgICAgJ21heC1oZWlnaHQnOiBIRUlHSFQgKiAwLjgsXG4gICAgICAgICdvdmVyZmxvdy15JzogJ2F1dG8nLFxuICAgICAgICAnb3ZlcmZsb3cteCc6ICdoaWRkZW4nXG4gICAgICB9KTtcblxuICAgICAgdGhpcy51cGRhdGVTY3JvbGxCb3ggPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgICAgIG5ld1N1cmZhY2VTcGFjZS5jc3MoJ21heC1oZWlnaHQnLCBoZWlnaHQgKiAwLjgpO1xuICAgICAgfVxuICAgICAgLy8gbmV3U3VyZmFjZVNwYWNlLmFwcGVuZChjb250cm9sQnV0dG9uKTtcbiAgICAgIC8vIGNvbnRyb2xCdXR0b24uaGlkZSgpO1xuXG4gICAgICBkaXNwbGF5Qm94LmFwcGVuZChuZXdTdXJmYWNlU3BhY2UpO1xuXG4gICAgICB2YXIgYWxlcnRCb3ggPSBuZXcgQWxlcnRCb3goKTtcbiAgICAgIGRpc3BsYXlCb3guYXBwZW5kKGFsZXJ0Qm94LnVpKTtcblxuICAgICAgdmFyIGFkZEFyZWEgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgdmFyIGFkZEJ1dHRvbiA9IG5ldyBidXR0b24oaWNvbnMucGx1cywgMjAsIHsgdG9vbHRpcDogJ0FkZCBOZXcgU3VyZmFjZScgfSk7XG4gICAgICBhZGRBcmVhLmFwcGVuZChhZGRCdXR0b24udWkpO1xuICAgICAgZGlzcGxheUJveC5hcHBlbmQoYWRkQXJlYSk7XG4gICAgICBkaXNwbGF5Qm94LmhpZGUoKTtcblxuICAgICAgdmFyIHN1cmZhY2VzID0gdGhpcy5zdXJmYWNlcyA9IFtdO1xuXG4gICAgICAvKlxuICAgICAgICogQ3JlYXRlcyBjYXJkcyBmb3IgbWFuaXB1bGF0aW9uIG9mIHN1cmZhY2VcbiAgICAgICAqIFxuICAgICAgICogQGZ1bmN0aW9uIFN1cmZhY2UgXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIFN1cmZhY2UoKSB7XG4gICAgICAgIHZhciBjb250cm9sID0ge1xuICAgICAgICAgIHN1cmZhY2VUeXBlOiB7XG4gICAgICAgICAgICBrZXk6ICdTdXJmYWNlIFR5cGUnLFxuICAgICAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1cmZhY2VTdHlsZToge1xuICAgICAgICAgICAga2V5OiAnU3VyZmFjZSBTdHlsZScsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VyZmFjZUZvcjoge1xuICAgICAgICAgICAga2V5OiAnU2VsZWN0aW9uIEF0b21zJyxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdXJmYWNlT2Y6IHtcbiAgICAgICAgICAgIGtleTogJ1N1cmZhY2UgR2VuZXJhdGluZyBBdG9tcycsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdXJmYWNlQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHN1cmZhY2VCb3guY3NzKHtcbiAgICAgICAgICAnbWFyZ2luLXRvcCc6ICczcHgnLFxuICAgICAgICAgICdwYWRkaW5nJzogJzZweCcsXG4gICAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiAnM3B4JyxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZThlOGU4JyxcbiAgICAgICAgICAvLyAncG9zaXRpb24nOidyZWxhdGl2ZScsXG4gICAgICAgICAgJ3dpZHRoJzogJzEwMCUnLFxuICAgICAgICAgICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgIC8vICdsZWZ0JzogXCItMTAwJVwiLFxuICAgICAgICAgICdvcGFjaXR5JzogMC45LFxuICAgICAgICAgICd0ZXh0LWFsaWduJzogJ2xlZnQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBoZWFkaW5nID0gdGhpcy5oZWFkaW5nID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGhlYWRlciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgaGVhZGVyLmNzcyh7XG4gICAgICAgICAgJ3RleHQtYWxpZ24nOiAncmlnaHQnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQ29udHJvbCBCdXR0b25zXG4gICAgICAgIHZhciB0b29sQnV0dG9ucyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGVkaXRCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLnBlbmNpbCwgMTYsIHsgdG9vbHRpcDogJ0VkaXQgU3VyZmFjZScgfSk7XG4gICAgICAgIHZhciByZW1vdmVCdXR0b24gPSBuZXcgYnV0dG9uKGljb25zLm1pbnVzLCAxNiwgeyBiZnI6IDAuNSwgYmFja2dyb3VuZENvbG9yOiAnI2YwNmY2ZicgfSk7XG5cbiAgICAgICAgdG9vbEJ1dHRvbnMuYXBwZW5kKHJlbW92ZUJ1dHRvbi51aSk7XG4gICAgICAgIHRvb2xCdXR0b25zLmFwcGVuZChlZGl0QnV0dG9uLnVpKTtcblxuICAgICAgICB0b29sQnV0dG9ucy5lZGl0QnV0dG9uID0gZWRpdEJ1dHRvbjtcbiAgICAgICAgdG9vbEJ1dHRvbnMucmVtb3ZlQnV0dG9uID0gcmVtb3ZlQnV0dG9uO1xuICAgICAgICB0b29sQnV0dG9ucy5lZGl0TW9kZSA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBkZWZhdWx0VGV4dFN0eWxlID0ge1xuICAgICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcbiAgICAgICAgICAnZm9udC1mYW1pbHknOiAnQXJpYWwnLFxuICAgICAgICAgICdmb250LXNpemUnOiAnMTJweCdcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRpbmcuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgICBoZWFkaW5nLmNzcyhkZWZhdWx0VGV4dFN0eWxlKTtcblxuICAgICAgICB0b29sQnV0dG9ucy5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICAgIGhlYWRlci5oaWRlKCk7XG5cbiAgICAgICAgaGVhZGVyLmFwcGVuZChoZWFkaW5nLCB0b29sQnV0dG9ucyk7XG4gICAgICAgIHN1cmZhY2VCb3guYXBwZW5kKGhlYWRlcik7XG5cbiAgICAgICAgLy8gdG9vbEJ1dHRvbnMuaGlkZSgpO1xuICAgICAgICB2YXIgc3VyZmFjZVByb3BlcnR5Qm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgc3VyZmFjZUJveC5hcHBlbmQoc3VyZmFjZVByb3BlcnR5Qm94KTtcblxuICAgICAgICAvLyBTdXJmYWNlIFR5cGVcbiAgICAgICAgdmFyIHN1cmZhY2VUeXBlID0gJCgnPGRpdj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgbGFiZWxTdXJmYWNlVHlwZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGxhYmVsU3VyZmFjZVR5cGUudGV4dCgnU3VyZmFjZSBUeXBlJyk7XG4gICAgICAgIGxhYmVsU3VyZmFjZVR5cGUuY3NzKGRlZmF1bHRUZXh0U3R5bGUpO1xuXG4gICAgICAgIHZhciBsaXN0U3VyZmFjZVR5cGUgPSBuZXcgJDNEbW9sLlVJLkZvcm0uTGlzdElucHV0KGNvbnRyb2wuc3VyZmFjZVR5cGUsIE9iamVjdC5rZXlzKCQzRG1vbC5TdXJmYWNlVHlwZSkpO1xuXG5cbiAgICAgICAgc3VyZmFjZVR5cGUuYXBwZW5kKGxhYmVsU3VyZmFjZVR5cGUsIGxpc3RTdXJmYWNlVHlwZS51aSk7XG4gICAgICAgIHN1cmZhY2VQcm9wZXJ0eUJveC5hcHBlbmQoc3VyZmFjZVR5cGUpO1xuXG4gICAgICAgIGxpc3RTdXJmYWNlVHlwZS5zZXRWYWx1ZShPYmplY3Qua2V5cygkM0Rtb2wuU3VyZmFjZVR5cGUpWzBdKTtcbiAgICAgICAgLy8gU3VyZmFjZSBTdHlsZVxuICAgICAgICB2YXIgc3VyZmFjZVN0eWxlID0gJCgnPGRpdj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgbGFiZWxTdXJmYWNlU3R5bGUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAvLyBsYWJlbFN1cmZhY2VTdHlsZS50ZXh0KCdTdXJmYWNlIFN0eWxlJyk7XG5cbiAgICAgICAgdmFyIGZvcm1TdXJmYWNlU3R5bGUgPSBuZXcgJDNEbW9sLlVJLkZvcm0odmFsaWRTdXJmYWNlU3BlY3MsIGNvbnRyb2wuc3VyZmFjZVN0eWxlKTtcblxuICAgICAgICBzdXJmYWNlU3R5bGUuYXBwZW5kKGxhYmVsU3VyZmFjZVN0eWxlLCBmb3JtU3VyZmFjZVN0eWxlLnVpKTtcbiAgICAgICAgc3VyZmFjZVByb3BlcnR5Qm94LmFwcGVuZChzdXJmYWNlU3R5bGUpO1xuXG4gICAgICAgIC8vIFN1cmZhY2UgT2ZcbiAgICAgICAgdmFyIHN1cmZhY2VPZiA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGxhYmVsU3VyZmFjZU9mID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgbGFiZWxTdXJmYWNlT2YudGV4dCgnU3VyZmFjZSBBdG9tcycpO1xuICAgICAgICBsYWJlbFN1cmZhY2VPZi5jc3MoZGVmYXVsdFRleHRTdHlsZSk7XG5cbiAgICAgICAgdmFyIHN1cmZhY2VHZW5lcmF0b3JBdG9tVHlwZSA9IFsnc2VsZicsICdhbGwnXTtcbiAgICAgICAgdmFyIHN1cmZhY2VHZW5lcmF0b3JEZXNjID0ge1xuICAgICAgICAgICdzZWxmJzogJ0F0b21zIGluIHRoZSBzZWxlY3Rpb25zIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSB0aGUgc3VyZmFjZScsXG4gICAgICAgICAgJ2FsbCc6ICdBbGwgdGhlIGF0b21zIHdpbGwgYmUgdXNlZCB0byBnZW5lcmF0ZSB0aGUgc3VyZmFjZSdcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0U3VyZmFjZU9mID0gbmV3ICQzRG1vbC5VSS5Gb3JtLkxpc3RJbnB1dChjb250cm9sLnN1cmZhY2VPZiwgc3VyZmFjZUdlbmVyYXRvckF0b21UeXBlKTtcblxuICAgICAgICB2YXIgaGludGJveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGhpbnRib3guY3NzKHtcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZTRlNGU0JyxcbiAgICAgICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCBncmV5JyxcbiAgICAgICAgICAnY29sb3InOiAnZ3JleScsXG4gICAgICAgICAgJ3BhZGRpbmcnOiAnMnB4JyxcbiAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICczcHgnLFxuICAgICAgICAgICdmb250LWZhbWlseSc6ICdBcmlhbCcsXG4gICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCcsXG4gICAgICAgICAgJ21hcmdpbi10b3AnOiAnM3B4J1xuICAgICAgICB9KTtcblxuICAgICAgICBoaW50Ym94LmhpZGUoKTtcblxuICAgICAgICBsaXN0U3VyZmFjZU9mLnVwZGF0ZSA9IGZ1bmN0aW9uIChjb250cm9sKSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT0gJ3NlbGYnKSB7XG4gICAgICAgICAgICBoaW50Ym94LnNob3coKTtcbiAgICAgICAgICAgIGhpbnRib3gudGV4dChzdXJmYWNlR2VuZXJhdG9yRGVzY1snc2VsZiddKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoY29udHJvbC52YWx1ZSA9PSAnYWxsJykge1xuICAgICAgICAgICAgaGludGJveC5zaG93KCk7XG4gICAgICAgICAgICBoaW50Ym94LnRleHQoc3VyZmFjZUdlbmVyYXRvckRlc2NbJ2FsbCddKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaW50Ym94LmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0U3VyZmFjZU9mLnNldFZhbHVlKCdhbGwnKTtcblxuICAgICAgICBzdXJmYWNlT2YuYXBwZW5kKGxhYmVsU3VyZmFjZU9mLCBsaXN0U3VyZmFjZU9mLnVpLCBoaW50Ym94KTtcbiAgICAgICAgc3VyZmFjZVByb3BlcnR5Qm94LmFwcGVuZChzdXJmYWNlT2YpO1xuXG4gICAgICAgIC8vIFN1cmZhY2UgRm9yXG4gICAgICAgIHZhciBzZWxlY3Rpb25MaXN0RWxlbWVudCA9IFsnYWxsJ10uY29uY2F0KHN0YXRlTWFuYWdlci5nZXRTZWxlY3Rpb25MaXN0KCkpO1xuICAgICAgICB2YXIgc3VyZmFjZUZvciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGxhYmVsU3VyZmFjZUZvciA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGxhYmVsU3VyZmFjZUZvci50ZXh0KCdTaG93IEF0b21zJyk7XG4gICAgICAgIGxhYmVsU3VyZmFjZUZvci5jc3MoZGVmYXVsdFRleHRTdHlsZSk7XG5cbiAgICAgICAgdmFyIGxpc3RTdXJmYWNlRm9yID0gbmV3ICQzRG1vbC5VSS5Gb3JtLkxpc3RJbnB1dChjb250cm9sLnN1cmZhY2VGb3IsIHNlbGVjdGlvbkxpc3RFbGVtZW50KTtcbiAgICAgICAgbGlzdFN1cmZhY2VGb3Iuc2V0VmFsdWUoJ2FsbCcpO1xuXG4gICAgICAgIHN1cmZhY2VGb3IuYXBwZW5kKGxhYmVsU3VyZmFjZUZvciwgbGlzdFN1cmZhY2VGb3IudWkpO1xuICAgICAgICBzdXJmYWNlUHJvcGVydHlCb3guYXBwZW5kKHN1cmZhY2VGb3IpO1xuXG4gICAgICAgIHZhciBhbGVydEJveCA9IG5ldyBBbGVydEJveCgpO1xuICAgICAgICBzdXJmYWNlUHJvcGVydHlCb3guYXBwZW5kKGFsZXJ0Qm94LnVpKTtcblxuICAgICAgICAvLyBDb250cm9sIEJ1dHRvblxuICAgICAgICB2YXIgY29udHJvbEJ1dHRvbiA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIHZhciBzdWJtaXQgPSBuZXcgYnV0dG9uKGljb25zLnRpY2ssIDE2LCB7IGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Z3JlZW4nLCB0b29sdGlwOiAnU3VibWl0JyB9KTtcbiAgICAgICAgdmFyIGNhbmNlbCA9IG5ldyBidXR0b24oaWNvbnMuY3Jvc3MsIDE2LCB7IGJhY2tncm91bmRDb2xvcjogJ2xpZ2h0Y29yYWwnLCB0b29sdGlwOiAnQ2FuY2VsJyB9KTtcbiAgICAgICAgY29udHJvbEJ1dHRvbi5hcHBlbmQoc3VibWl0LnVpKTtcbiAgICAgICAgY29udHJvbEJ1dHRvbi5hcHBlbmQoY2FuY2VsLnVpKTtcbiAgICAgICAgc3VyZmFjZVByb3BlcnR5Qm94LmFwcGVuZChjb250cm9sQnV0dG9uKTtcblxuICAgICAgICAvLyBGdW5jdGlvbmFsaXR5IFxuICAgICAgICByZW1vdmVCdXR0b24udWkub24oJ2NsaWNrJywgeyBzdXJmYWNlQm94OiBzdXJmYWNlQm94IH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIGlkID0gZS5kYXRhLnN1cmZhY2VCb3guZGF0YSgnc3VyZi1pZCcpO1xuICAgICAgICAgIHN1cmZhY2VCb3gucmVtb3ZlKCk7XG4gICAgICAgICAgc3RhdGVNYW5hZ2VyLnJlbW92ZVN1cmZhY2UoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBlZGl0QnV0dG9uLnVpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdXJmYWNlUHJvcGVydHlCb3gudG9nZ2xlKCk7XG5cbiAgICAgICAgICAvLyBBZnRlciBjcmVhdGlvbiBvZiB0aGUgc3VyZmFjZSBib3ggYWxsIHRoZSBjaGFuZ2VzIHdpbGwgYmUgZWRpdCB0byB0aGUgc3VyZmFjZXMgc28gb24gZmlyc3Qgc3VibWl0IHRvb2xCdXR0b25zLmVkaXRNb2RlID09IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZvcm0gVmFsaWRhdGlvbiBcblxuICAgICAgICB2YXIgdmFsaWRhdGVJbnB1dCA9IHRoaXMudmFsaWRhdGVJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmICghbGlzdFN1cmZhY2VGb3IudmFsaWRhdGUoKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFsaXN0U3VyZmFjZU9mLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghbGlzdFN1cmZhY2VUeXBlLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghZm9ybVN1cmZhY2VTdHlsZS52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWRpdCB0aGlzIGNvZGUgdG8gYWRkIG9uIGVkaXQgc2VsZWN0aW9uIG9wdGlvbiB0byB3b3JrXG4gICAgICAgIC8vIGJvdW5kaW5nQm94Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICBzZWxlY3Rpb25zID0gc3RhdGVNYW5hZ2VyLmdldFNlbGVjdGlvbkxpc3QoKTtcbiAgICAgICAgLy8gICBzZWxlY3Rpb25MaXN0RWxlbWVudCA9IHNlbGVjdGlvbnMubWFwKCAobSk9PntcbiAgICAgICAgLy8gICAgIHJldHVybiBtLmlkO1xuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyAgIGxpc3RTdXJmYWNlRm9yLnVwZGF0ZUxpc3Qoc2VsZWN0aW9uTGlzdEVsZW1lbnQpO1xuICAgICAgICAvLyAgIGxpc3RTdXJmYWNlT2YudXBkYXRlTGlzdChzZWxlY3Rpb25MaXN0RWxlbWVudCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmFsaXplKGlkKSB7XG4gICAgICAgICAgLy8gZWxlbWVudCBwcm9wZXJ0aWVzXG4gICAgICAgICAgc3VyZmFjZUJveC5kYXRhKCdzdXJmLWlkJywgaWQpO1xuICAgICAgICAgIGhlYWRpbmcudGV4dCgnc3VyZiMnICsgaWQpO1xuXG4gICAgICAgICAgaGVhZGVyLnNob3coKTtcbiAgICAgICAgICB0b29sQnV0dG9ucy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgc3VyZmFjZVByb3BlcnR5Qm94LmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1Ym1pdCBcbiAgICAgICAgc3VibWl0LnVpLm9uKCdjbGljaycsIHt9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGlzdFN1cmZhY2VGb3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgICBsaXN0U3VyZmFjZU9mLmdldFZhbHVlKCk7XG4gICAgICAgICAgbGlzdFN1cmZhY2VUeXBlLmdldFZhbHVlKCk7XG4gICAgICAgICAgZm9ybVN1cmZhY2VTdHlsZS5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgaWYgKHZhbGlkYXRlSW5wdXQoKSkge1xuICAgICAgICAgICAgaWYgKHRvb2xCdXR0b25zLmVkaXRNb2RlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB2YXIgaWQgPSBzdGF0ZU1hbmFnZXIuYWRkU3VyZmFjZShjb250cm9sKTtcbiAgICAgICAgICAgICAgY29udHJvbC5pZCA9IGlkO1xuXG4gICAgICAgICAgICAgIGZpbmFsaXplKGlkKTtcblxuICAgICAgICAgICAgICBzdXJmYWNlcy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgICBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBmb3JtU3VyZmFjZVN0eWxlLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgIGNvbnRyb2wuaWQgPSBzdXJmYWNlQm94LmRhdGEoJ3N1cmYtaWQnKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VkaXQgc3VyZmFjZSBjYWxsZWQnKVxuICAgICAgICAgICAgICBzdGF0ZU1hbmFnZXIuZWRpdFN1cmZhY2UoY29udHJvbCk7IC8vIC0+IGFkZCB1cGRhdGVTdXJmYWNlIGZ1bmNpdG9uIHRvIHN1cmZhY2VNZW51XG4gICAgICAgICAgICAgIHN1cmZhY2VQcm9wZXJ0eUJveC5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnRCb3guZXJyb3IoJ0ludmFsaWQgSW5wdXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbmNlbCBFZGl0XG4gICAgICAgIGNhbmNlbC51aS5vbignY2xpY2snLCB7fSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0b29sQnV0dG9ucy5lZGl0TW9kZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgc3VyZmFjZUJveC5kZXRhY2goKTtcbiAgICAgICAgICAgIHN1cmZhY2VCb3gucmVtb3ZlKCk7XG4gICAgICAgICAgICBfZWRpdGluZ0Zvcm0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdXJmYWNlUHJvcGVydHlCb3guaGlkZSgpO1xuICAgICAgICAgICAgdG9vbEJ1dHRvbnMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN1cmZhY2VCb3gub24oJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgc3VibWl0LnVpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluYWxpemVzIHRoZSBzdXJmYWNlIGNhcmQgd2l0aCB2YWx1ZSBzcGVjaWZpZWQgaW4gdGhlIHN1cmZhY2VTcGVjXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAZnVuY3Rpb24gU3VyZmFjZSNlZGl0U3VyZmFjZSBcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIElkIG9mIHRoZSBzdXJmYWNlIGdlbmVyYXRlZCBieSBTdGF0ZU1hbmFnZXJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHN1cmZhY2VTcGVjIERpZmZlcmVudCB2YWx1ZSBvZiB0aGUgc3VyZmFjZSBtZW51XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVkaXRTdXJmYWNlID0gZnVuY3Rpb24gKGlkLCBzdXJmYWNlU3BlYykge1xuICAgICAgICAgIGZpbmFsaXplKGlkKTtcbiAgICAgICAgICBsaXN0U3VyZmFjZVR5cGUuc2V0VmFsdWUoc3VyZmFjZVNwZWMuc3VyZmFjZVR5cGUudmFsdWUpO1xuICAgICAgICAgIGZvcm1TdXJmYWNlU3R5bGUuc2V0VmFsdWUoc3VyZmFjZVNwZWMuc3VyZmFjZVN0eWxlLnZhbHVlKTtcbiAgICAgICAgICBsaXN0U3VyZmFjZU9mLnNldFZhbHVlKHN1cmZhY2VTcGVjLnN1cmZhY2VPZi52YWx1ZSk7XG4gICAgICAgICAgbGlzdFN1cmZhY2VGb3Iuc2V0VmFsdWUoc3VyZmFjZVNwZWMuc3VyZmFjZUZvci52YWx1ZSk7XG5cbiAgICAgICAgICBsaXN0U3VyZmFjZUZvci5nZXRWYWx1ZSgpO1xuICAgICAgICAgIGxpc3RTdXJmYWNlT2YuZ2V0VmFsdWUoKTtcbiAgICAgICAgICBsaXN0U3VyZmFjZVR5cGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICBmb3JtU3VyZmFjZVN0eWxlLmdldFZhbHVlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIC8vIEZ1bmN0aW9uYWxpdHlcblxuICAgICAgLy8gU3VyZmFjZSBhZGRpdGlvblxuXG4gICAgICBhZGRCdXR0b24udWkub24oJ2NsaWNrJywgeyBzdXJmYWNlczogdGhpcyB9LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCFfZWRpdGluZ0Zvcm0pIHtcbiAgICAgICAgICB2YXIgbmV3U3VyZmFjZSA9IG5ldyBTdXJmYWNlKCk7XG4gICAgICAgICAgbmV3U3VyZmFjZVNwYWNlLmFwcGVuZChuZXdTdXJmYWNlLnVpKTtcbiAgICAgICAgICBfZWRpdGluZ0Zvcm0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0Qm94Lndhcm5pbmcoJ1BsZWFzZSBjb21wbGV0ZSB0aGUgcHJldmlvdXMgZm9ybSBmaXJzdCcpO1xuICAgICAgICB9XG5cblxuICAgICAgfSk7XG5cbiAgICAgIHN1cmZhY2VCdXR0b24udWkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkaXNwbGF5Qm94LnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2xlYXIgYWxsIHRoZSBzdXJmYWNlIGNhcmRzIFxuICAgICAgICogQGZ1bmN0aW9uIFN1cmZhY2VNZW51I2VtcHR5XG4gICAgICAgKi9cblxuICAgICAgdGhpcy5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbmV3U3VyZmFjZVNwYWNlLmVtcHR5KCk7XG4gICAgICAgIF9lZGl0aW5nRm9ybSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEFkZCBTdXJmYWNlIGluIHRoZSBTdXJmYWNlIE1lbnUgXG4gICAgICAgKiBcbiAgICAgICAqIEBmdW5jdGlvbiBTdXJmYWNlTWVudSNhZGRTdXJmYWNlXG4gICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgSWQgb2YgdGhlIHN1cmZhY2UgZ2VuZXJhdGVkIGluIHRoZSBTdGF0ZU1hbmFnZXJcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdXJmYWNlU3BlYyBWYWx1ZXMgb2YgZGlmZmVyZW50IHByb3BlcnR5IHJlcXVpcmVkIGZvciBzZXR0aW5nIHZhbHVlcyBpbiBzdXJmYWNlIG1lbnVcbiAgICAgICAqL1xuICAgICAgdGhpcy5hZGRTdXJmYWNlID0gZnVuY3Rpb24gKGlkLCBzdXJmYWNlU3BlYykge1xuICAgICAgICB2YXIgbmV3U3VyZmFjZSA9IG5ldyBTdXJmYWNlKCk7XG4gICAgICAgIG5ld1N1cmZhY2VTcGFjZS5hcHBlbmQobmV3U3VyZmFjZS51aSk7XG5cbiAgICAgICAgbmV3U3VyZmFjZS5lZGl0U3VyZmFjZShpZCwgc3VyZmFjZVNwZWMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogU2V0cyB0aGUgY3NzIHBvc2l0aW9uIHByb3BlcnR5IGxlZnQgYW5kIHRvcCBmb3IgdGhlIGVsZW1lbnRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gc2V0UG9zaXRpb25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0ganF1ZXJ5IGh0bWwgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IDogY3NzIGxlZnQgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9wIDogY3NzIHRvcCBwZXJvcGVydHlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRQb3NpdGlvbihlbGUsIGxlZnQsIHRvcCkge1xuICAgICAgZWxlLmNzcygnbGVmdCcsIGxlZnQpO1xuICAgICAgZWxlLmNzcygndG9wJywgdG9wKTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICAqIFNldHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBlbGVtZW50IHJlbGF0aXZlIHRvIHRoZSBwYXJzZUludFxuICAgICAgKiBhcyBwZXIgcG9zaXRpb24gdHlwZXNcbiAgICAgICogQGZ1bmN0aW9uIHNldExvY2F0aW9uXG4gICAgICAqIFxuICAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHBhcmVudCBqcXVlcnkgb2JqZWN0XG4gICAgICAqIEBwYXJhbSAge09iamVjdH0gY2hpbGQgIGpxdWVyeSBvYmplY3RcbiAgICAgICogQHBhcmFtICB7U3RyaW5nfSB4X3R5cGUgJ2xlZnR8cmlnaHQnXG4gICAgICAqIEBwYXJhbSAge1N0cmluZ30geV90eXBlICd0b3B8Ym90dG9tJ1xuICAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHhfb2Zmc2V0IE9mZnNldCB4IHZhbHVlcyBpbiBwaXhlbHNcbiAgICAgICogQHBhcmFtICB7TnVtYmVyfSB5X29mZnNldCBPZmZzZXQgeSB2YWx1ZXMgaW4gcGl4ZWxzIFxuICAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRMb2NhdGlvbihwYXJlbnQsIGNoaWxkLCB4X3R5cGUgPSAnbGVmdCcsIHlfdHlwZSA9ICd0b3AnLCB4X29mZnNldCA9IDAsIHlfb2Zmc2V0ID0gMCkge1xuXG4gICAgICAvLyBwXyBzdGFuZHMgZm9yIHBhcmVudFxuICAgICAgY2hpbGQuY3NzKCd6LWluZGV4JywgOTkpO1xuXG5cbiAgICAgIHZhciBwX3dpZHRoID0gZ2V0V2lkdGgocGFyZW50KTtcbiAgICAgIHZhciBwX2hlaWdodCA9IGdldEhlaWdodChwYXJlbnQpO1xuXG4gICAgICAvLyBjXyBzdGFuZCBmb3IgY2hpbGRcbiAgICAgIHZhciBjX3dpZHRoID0gY2hpbGQub3V0ZXJXaWR0aCgpOyAvLyBpbmNsdWRlcyBwYWRkaW5nIGFuZCBtYXJnaW5cbiAgICAgIHZhciBjX2hlaWdodCA9IGNoaWxkLm91dGVySGVpZ2h0KCk7IC8vIGluY2x1ZGVzIHBhZGRpbmcgYW5kIG1hcmdpblxuXG4gICAgICB2YXIgcGFkZGluZyA9IHBhcnNlSW50KHBhcmVudC5jc3MoJ3BhZGRpbmcnKS5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICBwYWRkaW5nID0gKHBhZGRpbmcpID8gcGFkZGluZyA6IDA7XG5cbiAgICAgIC8vIFNldHRpbmcgcG9zaXRpb25cbiAgICAgIHZhciBjX3Bvc2l0aW9uID0ge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDBcbiAgICAgIH07XG5cbiAgICAgIGlmICh4X3R5cGUgPT0gJ2xlZnQnKSB7XG4gICAgICAgIGNfcG9zaXRpb24ubGVmdCA9IHBhZGRpbmcgKyB4X29mZnNldDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHhfdHlwZSA9PSAnY2VudGVyJykge1xuICAgICAgICBjX3Bvc2l0aW9uLmxlZnQgPSBwX3dpZHRoIC8gMiAtIGNfd2lkdGggLyAyICsgeF9vZmZzZXQ7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh4X3R5cGUgPT0gJ3JpZ2h0Jykge1xuICAgICAgICBjX3Bvc2l0aW9uLmxlZnQgPSBwX3dpZHRoIC0gY193aWR0aCAtIHBhZGRpbmcgKyB4X29mZnNldDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjX3Bvc2l0aW9uLmxlZnQgPSB4X29mZnNldCArIHBhZGRpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmICh5X3R5cGUgPT0gJ3RvcCcpIHtcbiAgICAgICAgY19wb3NpdGlvbi50b3AgPSB5X29mZnNldCArIHBhZGRpbmc7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh5X3R5cGUgPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgY19wb3NpdGlvbi50b3AgPSBwX2hlaWdodCAvIDIgLSBjX2hlaWdodCAvIDIgKyB5X29mZnNldDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHlfdHlwZSA9PSAnYm90dG9tJykge1xuICAgICAgICBjX3Bvc2l0aW9uLnRvcCA9IHBfaGVpZ2h0IC0gY19oZWlnaHQgLSB5X29mZnNldCAtIHBhZGRpbmc7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY19wb3NpdGlvbi50b3AgPSB5X29mZnNldCArIHBhZGRpbmc7XG4gICAgICB9XG5cbiAgICAgIHNldFBvc2l0aW9uKGNoaWxkLCBjX3Bvc2l0aW9uLmxlZnQsIGNfcG9zaXRpb24udG9wKTtcbiAgICB9XG5cbiAgICAvLyBDb3BpZWQgZnJvbSBnbHZpZXdlci5qc1xuICAgIGZ1bmN0aW9uIGdldFJlY3QoY29udGFpbmVyKSB7XG4gICAgICBsZXQgZGl2ID0gY29udGFpbmVyWzBdO1xuICAgICAgbGV0IHJlY3QgPSBkaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAocmVjdC53aWR0aCA9PSAwICYmIHJlY3QuaGVpZ2h0ID09IDAgJiYgZGl2LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICBsZXQgb2xkcG9zID0gZGl2LnN0eWxlLnBvc2l0aW9uO1xuICAgICAgICBsZXQgb2xkdmlzID0gZGl2LnN0eWxlLnZpc2liaWxpdHk7XG4gICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgcmVjdCA9IGRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRpdi5zdHlsZS52aXNpYmlsaXR5ID0gb2xkdmlzO1xuICAgICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSBvbGRwb3M7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVjdDtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldEhlaWdodChjb250YWluZXIpIHtcbiAgICAgIHJldHVybiBnZXRSZWN0KGNvbnRhaW5lcikuaGVpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdpZHRoKGNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIGdldFJlY3QoY29udGFpbmVyKS53aWR0aDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgKiBidXR0b24gLSBnZW5lcmF0ZXMgYnV0dG9uIHdpdGggdGhlIGdpdmVuIG1hcmt1cCBhcyBjb250ZW50c1xuICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3ZnIFNWRyBtYXJrdXAgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGNvbnRlbnQgb2YgdGhlIGJ1dHRvblxuICAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IEhlaWdodCBvZiB0aGUgY29udGVudFxuICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFZhcmlvdXMgcHJvcGVydGllcyB0byBkZWZpbmUgdGhlIGJ1dHRvbiBcbiAgICAgICogXG4gICAgICAqL1xuICAgIGZ1bmN0aW9uIGJ1dHRvbihzdmcsIGhlaWdodCwgY29uZmlnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICB2YXIgYm9yZGVyUmFkaXVzID0gY29uZmlnLmJmciAqIGhlaWdodCB8fCAoaGVpZ2h0IC8gNCk7IC8vIGJvZHkgcmFkaXVzIGZhY3RvclxuICAgICAgdmFyIGJnQ29sb3IgPSBjb25maWcuYmFja2dyb3VuZENvbG9yIHx8ICdyZ2IoMTc3LCAxOTQsIDIwMyknO1xuICAgICAgdmFyIGNvbG9yID0gY29uZmlnLmNvbG9yIHx8ICdibGFjayc7XG4gICAgICB2YXIgaG92ZXJhYmxlID0gY29uZmlnLmhvdmVyYWJsZSB8fCAndHJ1ZSc7XG4gICAgICB2YXIgdG9vbHRpcFRleHQgPSBjb25maWcudG9vbHRpcCB8fCBudWxsO1xuXG4gICAgICAvLyBCdXR0b24gaW5zdGFuY2VcbiAgICAgIHZhciBidXR0b24gPSB0aGlzLnVpID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgIHZhciBpbm5lckJ1dHRvbiA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBidXR0b24uYXBwZW5kKGlubmVyQnV0dG9uKTtcblxuICAgICAgLy8gQ1NTXG4gICAgICBidXR0b24uY3NzKCdib3gtc2l6aW5nJywgJ2JvcmRlci1ib3gnKTtcbiAgICAgIGJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICBidXR0b24uY3NzKCdtYXJnaW4nLCAnM3B4Jyk7XG4gICAgICBidXR0b24uY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgYnV0dG9uLmNzcygnd2lkdGgnLCBoZWlnaHQpO1xuICAgICAgYnV0dG9uLmNzcygnYm9yZGVyLXJhZGl1cycsIGJvcmRlclJhZGl1cyArICdweCcpO1xuXG4gICAgICAvLyAgYnV0dG9uLmNzcygncGFkZGluZycsICczcHgnKTtcbiAgICAgIGJ1dHRvbi5jc3MoJ2NvbG9yJywgY29sb3IpO1xuICAgICAgYnV0dG9uLmNzcygnYmFja2dyb3VuZCcsIGJnQ29sb3IpO1xuXG4gICAgICBpbm5lckJ1dHRvbi5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgaW5uZXJCdXR0b24uY3NzKCdqdXN0aWZ5LWNvbnRlbnQnLCAnY2VudGVyJyk7XG4gICAgICBpbm5lckJ1dHRvbi5jc3MoJ2FsaWduLWl0ZW1zJywgJ2NlbnRlcicpO1xuICAgICAgaW5uZXJCdXR0b24uY3NzKCdwYWRkaW5nJywgJzJweCcpO1xuXG4gICAgICAvLyBjb250ZW50XG4gICAgICB0aGlzLnNldFNWRyA9IGZ1bmN0aW9uIChzdmcpIHtcbiAgICAgICAgaW5uZXJCdXR0b24uZW1wdHkoKTtcbiAgICAgICAgdmFyIGZvcm1hdHRlZF9jb250ZW50ID0gJChzdmcpO1xuICAgICAgICBpbm5lckJ1dHRvbi5hcHBlbmQoZm9ybWF0dGVkX2NvbnRlbnQpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U1ZHKHN2Zyk7XG5cbiAgICAgIC8vIEhvdmVyXG5cbiAgICAgIC8vIFNldHRpbmcgdXAgdG9vbCB0aXBcbiAgICAgIGJ1dHRvbi5jc3Moe1xuICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBzZXR0aW5nIHVwIHRvb2wgdGlwXG4gICAgICBpZiAodG9vbHRpcFRleHQgIT0gbnVsbCkge1xuICAgICAgICBidXR0b24uYXR0cigndGl0bGUnLCB0b29sdGlwVGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChob3ZlcmFibGUgPT0gJ3RydWUnKSB7XG4gICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlcicsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmNzcygnYm94LXNoYWRvdycsICcwcHggMHB4IDNweCBibGFjaycpO1xuXG4gICAgICAgICAgfSkub24oJ21vdXNlbGVhdmUnLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBidXR0b24uY3NzKCdib3gtc2hhZG93JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgLy8gY2xpY2tcbiAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmNzcygnYm94LXNoYWRvdycsICcwcHggMHB4IDFweCBibGFjaycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBidXR0b24ub24oJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmNzcygnYm94LXNoYWRvdycsICcwcHggMHB4IDNweCBibGFjaycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBidXR0b24ub24oJ21vdXNlbW92ZScsICgpID0+IHtcbiAgICAgICAgICAvLyBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgICAgICAgLy8gbW91c2VZID0gZS5jbGllbnRZO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBVSTtcbn0pKCk7XG4iLCJcbi8qXG4gKiAkM0Rtb2wuU3RhdGVNYW5hZ2VyIC0gU3RhdGVNYW5hZ2VyIGNyZWF0ZXMgdGhlIHNwYWNlIHRvIHByZXNlcnZlIHRoZSBzdGF0ZSBvZiB0aGUgdWkgYW5kIHN5bmMgaXQgd2l0aCB0aGUgR0xWaWV3ZXJcbiAqIEBjb25zdHJ1Y3RvciBcbiAqIEBwYXJhbSB7JDNEbW9sLkdMVmlld2VyfSBnbHZpZXdlciBTdGF0ZU1hbmFnZXIgaXMgcmVxdWlyZWQgdG8gaGF2ZSBpbnRlcmFjdGlvbiBiZXR3ZWVuIGdsdmlld2VyIGFuZCB0aGUgdWkuIFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBMb2FkcyB0aGUgdXNlciBkZWZpbmVkIHBhcmFtZXRlcnMgdG8gZ2VuZXJhdGUgdGhlIHVpIGFuZCBoYW5kbGUgc3RhdGVcbiAqL1xuJDNEbW9sLlN0YXRlTWFuYWdlciA9IChmdW5jdGlvbigpe1xuXG4gIGZ1bmN0aW9uIFN0YXRlcyhnbHZpZXdlciwgY29uZmlnKXtcbiAgICBjb25maWcgPSBjb25maWcgfHwgZ2x2aWV3ZXIuZ2V0Q29uZmlnKCk7XG4gICAgY29uZmlnLnVpID0gdHJ1ZTtcblxuICAgIHZhciBjYW52YXMgPSAkKGdsdmlld2VyLmdldENhbnZhcygpKTtcbiAgICB2YXIgcGFyZW50RWxlbWVudCA9ICQoZ2x2aWV3ZXIuY29udGFpbmVyKTtcblxuICAgIHZhciBoZWlnaHQgPSBwYXJlbnRFbGVtZW50LmhlaWdodCgpO1xuICAgIHZhciB3aWR0aCA9IHBhcmVudEVsZW1lbnQud2lkdGgoKTtcbiAgICB2YXIgb2Zmc2V0ID0gY2FudmFzLm9mZnNldCgpO1xuXG4gICAgdmFyIHVpT3ZlcmxheUNvbmZpZyA9IHtcbiAgICAgIGhlaWdodCA6IGhlaWdodCxcbiAgICAgIHdpZHRoIDogd2lkdGgsXG4gICAgICBvZmZzZXQgOiBvZmZzZXQsXG4gICAgICB1aSA6IGNvbmZpZy51aSB8fCB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBTZWxlY3Rpb24gSGFuZGxlcnNcbiAgICB2YXIgc2VsZWN0aW9ucyA9IHt9O1xuXG4gICAgLy8gU3VyZmFjZSBoYW5kbGVyc1xuICAgIHZhciBzdXJmYWNlcyA9IHt9O1xuXG4gICAgLy8gTGFiZWwgSGFuZGxlcnNcbiAgICB2YXIgbGFiZWxzID0ge307XG5cbiAgICB2YXIgYXRvbUxhYmVsID0ge307XG5cbiAgICAvKipcbiAgICAgKiBBZGQgU2VsZWN0aW9uIGZyb20gdGhlIHVpIHRvIGdsdmlld2VyXG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjYWRkU2VsZWN0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNwZWMgT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIG91dHB1dCBmcm9tIHRoZSBmb3JtIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzaWQgSWYgc3VyZmFjZSBpZCBiZWluZyBlZGl0ZWQgdGhlbiBzaWQgaXMgc2V0IHRvIHNvbWUgc3RyaW5nXG4gICAgICogQHJldHVybnMgU3RyaW5nXG4gICAgICovXG4gICAgdGhpcy5hZGRTZWxlY3Rpb24gPSBmdW5jdGlvbihzcGVjLCBzaWQgPSBudWxsKXtcblxuICAgICAgdmFyIGlkID0gc2lkIHx8IG1ha2VpZCg0KTtcblxuICAgICAgdmFyIHNlbGVjdGlvblNwZWMgPSB7XG4gICAgICAgIHNwZWMgOiBzcGVjLFxuICAgICAgICBzdHlsZXMgOiB7fSxcbiAgICAgICAgaGlkZGVuIDogZmFsc2VcbiAgICAgIH07XG5cbiAgICAgIGlmKHNpZCA9PSBudWxsKVxuICAgICAgICBzZWxlY3Rpb25zW2lkXSA9IHNlbGVjdGlvblNwZWM7XG4gICAgICBlbHNlIFxuICAgICAgICBzZWxlY3Rpb25zW2lkXS5zcGVjID0gc2VsZWN0aW9uU3BlYy5zcGVjO1xuXG4gICAgICByZW5kZXIoKTtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgc2VsZWN0aW9ucyBjb250YWluIGF0IGxlYXN0IG9uZSBhdG9tXG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjY2hlY2tBdG9tc1xuICAgICAqIEBwYXJhbSB7QXRvbVNlbGVjdGlvblNwZWN9IHNlbCBBdG9tIHNlbGVjdGlvbiBzcGVjXG4gICAgICogQHJldHVybnMgQm9vbGVhblxuICAgICAqL1xuICAgIHRoaXMuY2hlY2tBdG9tcyA9IGZ1bmN0aW9uKHNlbCl7XG4gICAgICB2YXIgYXRvbXMgPSBnbHZpZXdlci5zZWxlY3RlZEF0b21zKHNlbCk7XG4gICAgICBpZiggYXRvbXMubGVuZ3RoID4gMClcbiAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgaGlkZGVuIHByb3BlcnR5IG9mIHRoZSBzZWxlY3Rpb24gXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjdG9nZ2xlSGlkZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzaWQgU2VsZWN0aW9uIGlkXG4gICAgICovXG4gICAgdGhpcy50b2dnbGVIaWRlID0gZnVuY3Rpb24oc2lkKXtcbiAgICAgIHNlbGVjdGlvbnNbc2lkXS5oaWRkZW4gPSAhc2VsZWN0aW9uc1tzaWRdLmhpZGRlbjtcbiAgICAgIHJlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNlbGVjdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBTZWxlY3Rpb24gaWRcbiAgICAgKi9cbiAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICBkZWxldGUgc2VsZWN0aW9uc1tpZF07XG4gICAgICByZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc3R5bGUgYW5kIHJlbmRlcnMgaXQgaW50byB0aGUgdmlld3BvcnRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNhZGRTdHlsZSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3BlYyBPdXRwdXQgb2JqZWN0IG9mIHN0eWxlIGZvcm0gXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNpZCBTZWxlY3Rpb24gSWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RpZCBTdHlsZSBJZFxuICAgICAqIEByZXR1cm5zIFN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMuYWRkU3R5bGUgPSBmdW5jdGlvbiggc3BlYywgc2lkLCBzdGlkID0gbnVsbCl7XG4gICAgICB2YXIgc2VsZWN0aW9uID0gc2VsZWN0aW9uc1tzaWRdO1xuICAgICAgXG4gICAgICBcbiAgICAgIHZhciBzdHlsZVNwZWMgPSB7XG4gICAgICAgIHNwZWMgOiBzcGVjLFxuICAgICAgICBoaWRkZW4gOiBmYWxzZVxuICAgICAgfVxuICAgICAgXG4gICAgICB2YXIgaWQgPSBudWxsOyBcbiAgICAgIFxuICAgICAgaWYoc3RpZCA9PSBudWxsKSB7XG4gICAgICAgIGlkID0gbWFrZWlkKDQpO1xuICAgICAgICBzZWxlY3Rpb24uc3R5bGVzW2lkXSA9IHN0eWxlU3BlY1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlkID0gc3RpZDtcbiAgICAgICAgc2VsZWN0aW9uLnN0eWxlc1tpZF0uc3BlYyA9IHNwZWM7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJlbmRlcigpO1xuXG4gICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3R5bGUgc3BlY2lmaWVkIGJ5IHN0aWRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNyZW1vdmVTdHlsZSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2lkIFNlbGVjdGlvbiBpZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdGlkIFN0eWxlIElkXG4gICAgICovXG4gICAgdGhpcy5yZW1vdmVTdHlsZSA9IGZ1bmN0aW9uKHNpZCwgc3RpZCl7XG4gICAgICBkZWxldGUgc2VsZWN0aW9uc1tzaWRdLnN0eWxlc1tzdGlkXTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGhpZGRlbiBwcm9wZXJ0eSBvZiBhIHN0eWxlIFxuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI3RvZ2dsZUhpZGVTdHlsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzaWQgU2VsZWN0aW9uIElkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0aWQgU3R5bGUgSWQgXG4gICAgICovXG4gICAgdGhpcy50b2dnbGVIaWRlU3R5bGUgPSBmdW5jdGlvbihzaWQsIHN0aWQpe1xuICAgICAgc2VsZWN0aW9uc1tzaWRdLnN0eWxlc1tzdGlkXS5oaWRkZW4gPSAhc2VsZWN0aW9uc1tzaWRdLnN0eWxlc1tzdGlkXS5oaWRkZW47XG4gICAgICByZW5kZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHN1cmZhY2UgdG8gdGhlIHZpZXdwb3J0XG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjYWRkU3VyZmFjZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0eSBTdXJmYWNlIG91dHB1dCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIFN0cmluZ1xuICAgICAqL1xuICAgIHRoaXMuYWRkU3VyZmFjZSA9IGZ1bmN0aW9uKHByb3BlcnR5LCBjYWxsYmFjayl7XG4gICAgICB2YXIgaWQgPSBtYWtlaWQoNCk7XG4gICAgICBwcm9wZXJ0eS5pZCA9IGlkO1xuXG4gICAgICB2YXIgc3R5bGUgPSBwcm9wZXJ0eS5zdXJmYWNlU3R5bGUudmFsdWU7XG4gICAgICBpZihzdHlsZSA9PSBudWxsKVxuICAgICAgICBzdHlsZSA9IHt9O1xuXG4gICAgICB2YXIgc2VsID0gKHByb3BlcnR5LnN1cmZhY2VGb3IudmFsdWUgPT0gJ2FsbCcpID8geyBzcGVjIDoge30gfSA6IHNlbGVjdGlvbnNbcHJvcGVydHkuc3VyZmFjZUZvci52YWx1ZV07XG5cbiAgICAgIHZhciBnZW5lcmF0b3JBdG9tID0gKHByb3BlcnR5LnN1cmZhY2VPZi52YWx1ZSA9PSAnc2VsZicpPyBzZWwuc3BlYyA6IHt9O1xuXG5cbiAgICAgIGdsdmlld2VyLmFkZFN1cmZhY2UoXG4gICAgICAgICQzRG1vbC5TdXJmYWNlVHlwZVtwcm9wZXJ0eS5zdXJmYWNlVHlwZS52YWx1ZV0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgICBzZWwuc3BlYyxcbiAgICAgICAgZ2VuZXJhdG9yQXRvbVxuICAgICAgKS50aGVuKChzdXJmUGFyYW0pPT57XG4gICAgICAgIHN1cmZhY2VzW2lkXSA9IHN1cmZQYXJhbVswXTtcblxuICAgICAgICBpZihjYWxsYmFjayAhPSB1bmRlZmluZWQpXG4gICAgICAgICAgY2FsbGJhY2soaWQsIHN1cmZQYXJhbVswXSk7XG4gICAgICB9LCAoKT0+e1xuXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgc3VyZmFjZSBmcm9tIHRoZSB2aWV3cG9ydCBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNyZW1vdmVTdXJmYWNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIFN1cmZhY2UgSWRcbiAgICAgKi9cbiAgICB0aGlzLnJlbW92ZVN1cmZhY2UgPSBmdW5jdGlvbihpZCl7XG4gICAgICBnbHZpZXdlci5yZW1vdmVTdXJmYWNlKHN1cmZhY2VzW2lkXSlcblxuICAgICAgZGVsZXRlIHN1cmZhY2VzW2lkXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVkaXQgdGhlIGV4aXNpdGluZyBzdXJmYWNlIGluIHRoZSB2aWV3cG9ydFxuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI2VkaXRTdXJmYWNlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHN1cmZhY2VQcm9wZXJ0eSBTdXJmYWNlIFN0eWxlXG4gICAgICovXG4gICAgdGhpcy5lZGl0U3VyZmFjZSA9IGZ1bmN0aW9uKHN1cmZhY2VQcm9wZXJ0eSl7XG4gICAgICB2YXIgc3R5bGUgPSBzdXJmYWNlUHJvcGVydHkuc3VyZmFjZVN0eWxlLnZhbHVlIHx8IHt9XG5cbiAgICAgIHZhciBzZWwgPSAoc3VyZmFjZVByb3BlcnR5LnN1cmZhY2VGb3IudmFsdWUgPT0gJ2FsbCcpID8geyBzcGVjIDoge30gfSA6IHNlbGVjdGlvbnNbc3VyZmFjZVByb3BlcnR5LnN1cmZhY2VGb3IudmFsdWVdO1xuICAgICAgdmFyIGdlbmVyYXRvckF0b20gPSAoc3VyZmFjZVByb3BlcnR5LnN1cmZhY2VPZi52YWx1ZSA9PSAnc2VsZicpPyBzZWwuc3BlYyA6IHt9O1xuXG4gICAgICBnbHZpZXdlci5yZW1vdmVTdXJmYWNlKHN1cmZhY2VzW3N1cmZhY2VQcm9wZXJ0eS5pZF0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhzdXJmYWNlUHJvcGVydHkpO1xuICAgICAgZ2x2aWV3ZXIuYWRkU3VyZmFjZShcbiAgICAgICAgJDNEbW9sLlN1cmZhY2VUeXBlW3N1cmZhY2VQcm9wZXJ0eS5zdXJmYWNlVHlwZS52YWx1ZV0sXG4gICAgICAgIHN0eWxlLFxuICAgICAgICBzZWwuc3BlYyxcbiAgICAgICAgZ2VuZXJhdG9yQXRvbVxuICAgICAgKS50aGVuKChzdXJmSWQpPT57XG4gICAgICAgIHN1cmZhY2VzW3N1cmZhY2VQcm9wZXJ0eS5pZF0gPSBzdXJmSWRbMF07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0IG9mIGlkcyBvZiBzZWxlY3Rpb25zIHRoYXQgYXJlIGNyZWF0ZWQgc28gZmFyXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjZ2V0U2VsZWN0aW9uTGlzdFxuICAgICAqIEByZXR1cm5zIDxBcnJheSBvZiBzZWxlY3Rpb24gaWRzPlxuICAgICAqL1xuICAgIHRoaXMuZ2V0U2VsZWN0aW9uTGlzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2VsZWN0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgY29udGV4dCBtZW51IHdoZW4gY2FsbGVkIGZyb20gZ2x2aWV3ZXJcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNvcGVuQ29udGV4dE1lbnVcbiAgICAgKiBAcGFyYW0ge0F0b21TcGVjfSBhdG9tIEF0b20gc3BlYyBvYnRhaW5lZCBmcm9tIGNvbnRleHQgbWVudSBldmVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4IHggY29vcmRpbmF0ZSBvZiBtb3VzZSBvbiB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5IHkgY29vcmRpbmF0ZSBvZiBtb3VzZSBvbiB0aGUgdmlld3BvcnRcbiAgICAgKi9cbiAgICB0aGlzLm9wZW5Db250ZXh0TWVudSA9IGZ1bmN0aW9uKGF0b20sIHgsIHkpeyBcbiAgICAgIHZhciBhdG9tRXhpc3QgPSBmYWxzZTtcblxuICAgICAgaWYoYXRvbSl7XG4gICAgICAgIGF0b21FeGlzdCA9IE9iamVjdC5rZXlzKGF0b21MYWJlbCkuZmluZCgoaSk9PntcbiAgICAgICAgICBpZiAoaSA9PSBhdG9tLmluZGV4KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gIFxuICAgICAgICBpZihhdG9tRXhpc3QgIT0gdW5kZWZpbmVkIClcbiAgICAgICAgICBhdG9tRXhpc3QgPSB0cnVlO1xuICAgICAgICBlbHNlIFxuICAgICAgICAgIGF0b21FeGlzdCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy51aSkgdGhpcy51aS50b29scy5jb250ZXh0TWVudS5zaG93KHgsIHksIGF0b20sIGF0b21FeGlzdCk7ICAgIFxuICAgIH1cblxuICAgIGdsdmlld2VyLnVzZXJDb250ZXh0TWVudUhhbmRsZXIgPSB0aGlzLm9wZW5Db250ZXh0TWVudS5iaW5kKHRoaXMpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBMYWJlbCB0byB0aGUgdmlld3BvcnQgc3BlY2lmaWMgdG8gdGhlIHNlbGVjdGlvblxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI2FkZExhYmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxhYmVsVmFsdWUgT3V0cHV0IG9iamVjdCBmcm9tIGxhYmVsIGZvcm0gb2YgQ29udGV4dCBNZW51XG4gICAgICovXG4gICAgdGhpcy5hZGRMYWJlbCA9IGZ1bmN0aW9uKGxhYmVsVmFsdWUpe1xuICAgICAgbGFiZWxzW2xhYmVsVmFsdWUuc2VsLnZhbHVlXSA9IGxhYmVsc1tsYWJlbFZhbHVlLnNlbC52YWx1ZV0gfHwgW107XG5cbiAgICAgIHZhciBsYWJlbFByb3AgPSAkM0Rtb2wubGFiZWxTdHlsZXNbbGFiZWxWYWx1ZS5zdHlsZS52YWx1ZV07XG4gICAgICB2YXIgc2VsZWN0aW9uID0gc2VsZWN0aW9uc1tsYWJlbFZhbHVlLnNlbC52YWx1ZV07XG5cbiAgICAgIHZhciBvZmZzZXQgPSBsYWJlbHNbbGFiZWxWYWx1ZS5zZWwudmFsdWVdLmxlbmd0aDtcbiAgICAgIGxhYmVsUHJvcFsnc2NyZWVuT2Zmc2V0J10gPSBuZXcgJDNEbW9sLlZlY3RvcjIoMCwgLTEqb2Zmc2V0KjM1KTtcblxuICAgICAgbGFiZWxzW2xhYmVsVmFsdWUuc2VsLnZhbHVlXS5wdXNoKGdsdmlld2VyLmFkZExhYmVsKGxhYmVsVmFsdWUudGV4dC52YWx1ZSwgbGFiZWxQcm9wLCBzZWxlY3Rpb24uc3BlYykpO1xuXG4gICAgICB0aGlzLnVpLnRvb2xzLmNvbnRleHRNZW51LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGF0b20gbGFiZWwgdG8gdGhlIHZpZXdwb3J0XG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjYWRkQXRvbUxhYmVsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxhYmVsVmFsdWUgT3V0cHV0IG9iamVjdCBmcm9tIHByb3BlcnR5TWVudSBmb3JtIG9mIENvbnRleHQgTWVudVxuICAgICAqIEBwYXJhbSB7QXRvbVNwZWN9IGF0b20gQXRvbSBzcGVjIHRoYXQgYXJlIHRvIGJlIGFkZGVkIGluIHRoZSBsYWJlbCBcbiAgICAgKi9cbiAgICB0aGlzLmFkZEF0b21MYWJlbCA9IGZ1bmN0aW9uKGxhYmVsVmFsdWUsIGF0b20sIHN0eWxlTmFtZT0nbWlsaycpe1xuICAgICAgdmFyIGF0b21FeGlzdCA9IE9iamVjdC5rZXlzKGF0b21MYWJlbCkuZmluZCgoaSk9PntcbiAgICAgICAgaWYgKGkgPT0gYXRvbS5pbmRleClcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgZWxzZSBcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgaWYoYXRvbUV4aXN0ICE9IHVuZGVmaW5lZCApXG4gICAgICAgIGF0b21FeGlzdCA9IHRydWU7XG4gICAgICBlbHNlIFxuICAgICAgICBhdG9tRXhpc3QgPSBmYWxzZTtcblxuXG4gICAgICBpZihhdG9tRXhpc3Qpe1xuICAgICAgICB0aGlzLnJlbW92ZUF0b21MYWJlbChhdG9tKTtcbiAgICAgIH1cblxuICAgICAgXG4gICAgICBhdG9tTGFiZWxbYXRvbS5pbmRleF0gPSBhdG9tTGFiZWxbYXRvbS5pbmRleF0gfHwgbnVsbDtcbiAgICAgIFxuICAgICAgdmFyIGxhYmVsUHJvcCA9ICQzRG1vbC5kZWVwQ29weSgkM0Rtb2wubGFiZWxTdHlsZXNbc3R5bGVOYW1lXSk7XG4gICAgICBsYWJlbFByb3AucG9zaXRpb24gPSB7XG4gICAgICAgIHggOiBhdG9tLngsIHkgOiBhdG9tLnksIHogOiBhdG9tLnpcbiAgICAgIH1cblxuICAgICAgdmFyIGxhYmVsVGV4dCA9IFtdO1xuICAgICAgZm9yIChsZXQga2V5IGluIGxhYmVsVmFsdWUpe1xuICAgICAgICBsYWJlbFRleHQucHVzaChgJHtrZXl9IDogJHtsYWJlbFZhbHVlW2tleV19YCk7XG4gICAgICB9XG4gICAgICBsYWJlbFRleHQgPSBsYWJlbFRleHQuam9pbignXFxuJyk7XG5cbiAgICAgIGF0b21MYWJlbFthdG9tLmluZGV4XSA9IGdsdmlld2VyLmFkZExhYmVsKGxhYmVsVGV4dCwgbGFiZWxQcm9wKTtcbiAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIGhpZGUgY29udGV4dCBtZW51IGFuZCBwcm9jZXNzIHRoZSBsYWJlbCBpZiBuZWVkZWRcbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNleGl0Q29udGV4dE1lbnVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByb2Nlc3NDb250ZXh0TWVudSBTcGVjaWZ5IHRoZSBuZWVkIHRvIHByb2Nlc3MgdGhlIHZhbHVlcyBpbiB0aGUgY29udGV4dCBtZW51XG4gICAgICovXG4gICAgdGhpcy5leGl0Q29udGV4dE1lbnUgPSBmdW5jdGlvbihwcm9jZXNzQ29udGV4dE1lbnUgPSBmYWxzZSl7XG4gICAgICAgIGlmKHRoaXMudWkpIHtcbiAgICAgICAgICAgIHRoaXMudWkudG9vbHMuY29udGV4dE1lbnUuaGlkZShwcm9jZXNzQ29udGV4dE1lbnUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2x2aWV3ZXIuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgdGhpcy5leGl0Q29udGV4dE1lbnUuYmluZCh0aGlzKSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxhYmVsIHNwZWNpZmljIHRvIHRoZSBzZWxlY3Rpb24gXG4gICAgICogXG4gICAgICogKHVuZGVyIGRldmVsb3BtZW50KVxuICAgICAqL1xuICAgIHRoaXMucmVtb3ZlTGFiZWwgPSBmdW5jdGlvbigpe1xuICAgICAgLy8gQWRkIGNvZGUgdG8gcmVtb3ZlIGxhYmVsIFxuICAgICAgdGhpcy51aS50b29scy5jb250ZXh0TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgYXRvbSBsYWJlbCBmcm9tIHRoZSB2aWV3cG9lciBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNyZW1vdmVBdG9tTGFiZWxcbiAgICAgKiBAcGFyYW0ge0F0b21TcGVjfSBhdG9tIEF0b20gc3BlY1xuICAgICAqL1xuICAgIHRoaXMucmVtb3ZlQXRvbUxhYmVsID0gZnVuY3Rpb24oYXRvbSl7XG4gICAgICB2YXIgbGFiZWwgPSBhdG9tTGFiZWxbYXRvbS5pbmRleF07XG4gICAgICBnbHZpZXdlci5yZW1vdmVMYWJlbChsYWJlbCk7XG4gICAgICBkZWxldGUgYXRvbUxhYmVsW2F0b20uaW5kZXhdOyBcbiAgICAgIFxuICAgICAgdGhpcy51aS50b29scy5jb250ZXh0TWVudS5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG1vZGVsIHRvIHRoZSB2aWV3cG9ydFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI2FkZE1vZGVsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsRGVzYyBNb2RlbCBUb29sYmFyIG91dHB1dFxuICAgICAqL1xuICAgIHRoaXMuYWRkTW9kZWwgPSBmdW5jdGlvbihtb2RlbERlc2Mpe1xuICAgICAgZ2x2aWV3ZXIucmVtb3ZlQWxsTW9kZWxzKCk7XG4gICAgICBnbHZpZXdlci5yZW1vdmVBbGxTdXJmYWNlcygpO1xuICAgICAgZ2x2aWV3ZXIucmVtb3ZlQWxsTGFiZWxzKCk7XG4gICAgICBnbHZpZXdlci5yZW1vdmVBbGxTaGFwZXMoKTtcblxuICAgICAgdmFyIHF1ZXJ5ID0gbW9kZWxEZXNjLnVybFR5cGUudmFsdWUgKyAnOicgKyBtb2RlbERlc2MudXJsLnZhbHVlO1xuICAgICAgJDNEbW9sLmRvd25sb2FkKHF1ZXJ5LCBnbHZpZXdlciwge30sICgpPT57XG4gICAgICAgIHRoaXMudWkudG9vbHMubW9kZWxUb29sQmFyLnNldE1vZGVsKG1vZGVsRGVzYy51cmwudmFsdWUudG9VcHBlckNhc2UoKSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gUmVtb3ZlIGFsbCBTZWxlY3Rpb25zXG4gICAgICBzZWxlY3Rpb25zID0ge307XG4gICAgICBzdXJmYWNlcyA9IHt9O1xuICAgICAgYXRvbUxhYmVsID0ge307XG4gICAgICBsYWJlbHMgPSB7fTtcblxuICAgICAgLy8gUmVzZXQgVUlcbiAgICAgIHRoaXMudWkudG9vbHMuc2VsZWN0aW9uQm94LmVtcHR5KCk7XG4gICAgICB0aGlzLnVpLnRvb2xzLnN1cmZhY2VNZW51LmVtcHR5KCk7XG4gICAgfVxuXG4gICAgLy8gU3RhdGUgTWFuYWdlbWVudCBoZWxwZXIgZnVuY3Rpb24gXG4gICAgZnVuY3Rpb24gZmluZFNlbGVjdGlvbkJ5U3BlYyhzcGVjKXtcbiAgICAgIHZhciBpZHMgPSBPYmplY3Qua2V5cyhzZWxlY3Rpb25zKTtcbiAgICAgIHZhciBtYXRjaGluZ09iamVjdElkcyA9IG51bGw7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgdmFyIGxvb2tTZWxlY3Rpb24gPSBzZWxlY3Rpb25zW2lkc1tpXV0uc3BlYztcblxuICAgICAgICB2YXIgbWF0Y2ggPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgLy8gbG9va2luZyBmb3Igc2FtZSBwYXJhbWV0ZXJzIGxlbmd0aCBcbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBPYmplY3Qua2V5cyhzcGVjKTtcblxuICAgICAgICBpZiggT2JqZWN0LmtleXMobG9va1NlbGVjdGlvbikubGVuZ3RoID09IHBhcmFtZXRlcnMubGVuZ3RoKXtcbiAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcGFyYW1ldGVycy5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICBpZiggbG9va1NlbGVjdGlvbltwYXJhbWV0ZXJzW2pdXSAhPSBzcGVjW3BhcmFtZXRlcnNbal1dKXtcbiAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hdGNoID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtYXRjaCl7XG4gICAgICAgICAgbWF0Y2hpbmdPYmplY3RJZHMgPSBpZHNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hdGNoaW5nT2JqZWN0SWRzO1xuICAgIH1cblxuICAgIC8vIFN0YXRlIG1hbmFnbWVudCBmdW5jdGlvbiBcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIHZhcmlhYmxlIGZvciBzZWxlY3Rpb25zIGFuZCBzdHlsZXMgYW5kIHRyaWdnZXIgdWkgdG8gc2hvdyB0aGUgXG4gICAgICogdWkgZWxlbWVudHMgZm9yIHRoZXNlIHNlbGVjdGlvbnMgYW5kIHN0eWxlcy5cbiAgICAgKiBcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlN0YXRlTWFuYWdlciNjcmVhdGVTZWxlY3Rpb25BbmRTdHlsZVxuICAgICAqIEBwYXJhbSB7QXRvbVNlbGVjdGlvblNwZWN9IHNlbFNwZWMgQXRvbSBTZWxlY3Rpb24gU3BlY1xuICAgICAqIEBwYXJhbSB7QXRvbVN0eWxlU3BlY30gc3R5bGVTcGVjIEF0b20gU3R5bGUgU3BlY1xuICAgICAqL1xuICAgIHRoaXMuY3JlYXRlU2VsZWN0aW9uQW5kU3R5bGUgPSBmdW5jdGlvbihzZWxTcGVjLCBzdHlsZVNwZWMpe1xuXG4gICAgICB2YXIgc2VsSWQgPSBmaW5kU2VsZWN0aW9uQnlTcGVjKHNlbFNwZWMpO1xuXG4gICAgICBpZihzZWxJZCA9PSBudWxsKXtcbiAgICAgICAgc2VsSWQgPSB0aGlzLmFkZFNlbGVjdGlvbihzZWxTcGVjKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlSWQgPSBudWxsO1xuXG4gICAgICBpZihPYmplY3Qua2V5cyhzdHlsZVNwZWMpLmxlbmd0aCAhPSAwKXtcbiAgICAgICAgc3R5bGVJZCA9IHRoaXMuYWRkU3R5bGUoc3R5bGVTcGVjLCBzZWxJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudWkudG9vbHMuc2VsZWN0aW9uQm94LmVkaXRTZWxlY3Rpb24oc2VsSWQsIHNlbFNwZWMsIHN0eWxlSWQsIHN0eWxlU3BlYyk7XG4gICAgICBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBzZWxlY3Rpb24gYW5kIGFkZCBzdXJmYWNlIHdpdGggcmVmZXJlbmNlIHRvIHRoYXQgc2VsZWN0aW9uIFxuICAgICAqIGFuZCB0cmlnZ2VycyB1cGRhdGVzIGluIHRoZSB1aVxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI2NyZWF0ZVN1cmZhY2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3VyZmFjZVR5cGUgVHlwZSBvZiBzdXJmYWNlIHRvIGJlIGNyZWF0ZWRcbiAgICAgKiBAcGFyYW0ge0F0b21TZWxlY3Rpb25TcGVjfSBzZWwgQXRvbSBzZWxlY3Rpb24gc3BlY1xuICAgICAqIEBwYXJhbSB7QXRvbVN0eWxlU3BlY30gc3R5bGUgQXRvbSBzdHlsZSBzcGVjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNpZCBzZWxlY3Rpb24gaWRcbiAgICAgKi9cbiAgICB0aGlzLmNyZWF0ZVN1cmZhY2UgPSBmdW5jdGlvbihzdXJmYWNlVHlwZSwgc2VsLCBzdHlsZSwgc2lkKXtcbiAgICAgIHZhciBzZWxJZCA9IGZpbmRTZWxlY3Rpb25CeVNwZWMoc2VsKTtcbiAgICAgIFxuICAgICAgaWYoc2VsSWQgPT0gbnVsbCl7XG4gICAgICAgIHNlbElkID0gdGhpcy5hZGRTZWxlY3Rpb24oKTtcblxuICAgICAgfVxuICAgICAgdGhpcy51aS50b29scy5zZWxlY3Rpb25Cb3guZWRpdFNlbGVjdGlvbihzZWxJZCwgc2VsLCBudWxsKTtcblxuICAgICAgc3VyZmFjZVR5cGUgPSBPYmplY3Qua2V5cyhzdHlsZSlbMF07XG5cbiAgICAgIHZhciBzdXJmYWNlSW5wdXQgPSB7XG4gICAgICAgIHN1cmZhY2VUeXBlIDoge1xuICAgICAgICAgIHZhbHVlIDogc3VyZmFjZVR5cGVcbiAgICAgICAgfSxcblxuICAgICAgICBzdXJmYWNlU3R5bGUgOiB7XG4gICAgICAgICAgdmFsdWUgOiBzdHlsZVtzdXJmYWNlVHlwZV0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3VyZmFjZU9mIDoge1xuICAgICAgICAgIHZhbHVlIDogJ3NlbGYnXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3VyZmFjZUZvciA6IHtcbiAgICAgICAgICB2YWx1ZSA6IHNlbElkXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN1cmZJZCA9IG1ha2VpZCg0KTtcbiAgICAgIHN1cmZhY2VzW3N1cmZJZF0gPSBzaWQ7XG5cbiAgICAgIHRoaXMudWkudG9vbHMuc3VyZmFjZU1lbnUuYWRkU3VyZmFjZShzdXJmSWQsIHN1cmZhY2VJbnB1dCk7XG5cbiAgICAgIC8vIENyZWF0ZSBTdXJmYWNlIFVJXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIG9mIHRpdGxlIGluIE1vZGVsVG9vbEJhclxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuU3RhdGVNYW5hZ2VyI3NldE1vZGVsVGl0bGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgTW9kZWwgdGl0bGVcbiAgICAgKi9cbiAgICB0aGlzLnNldE1vZGVsVGl0bGUgPSBmdW5jdGlvbih0aXRsZSl7XG4gICAgICB0aGlzLnVpLnRvb2xzLm1vZGVsVG9vbEJhci5zZXRNb2RlbCh0aXRsZSk7XG4gICAgfVxuXG4gICAgY2FudmFzLm9uKCdjbGljaycsICgpPT57XG4gICAgICBpZih0aGlzLnVpICYmIHRoaXMudWkudG9vbHMuY29udGV4dE1lbnUuaGlkZGVuID09IGZhbHNlKXtcbiAgICAgICAgdGhpcy51aS50b29scy5jb250ZXh0TWVudS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gU2V0dGluZyB1cCBVSSBnZW5lcmF0aW9uIFxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgdWkgYW5kIHJldHVybnMgaXRzIHJlZmVyZW5jZVxuICAgICAqIEByZXR1cm5zICQzRG1vbC5VSVxuICAgICAqL1xuICAgIHRoaXMuc2hvd1VJID0gZnVuY3Rpb24oKXtcbiAgICAgIHZhciB1aSA9IG5ldyAkM0Rtb2wuVUkodGhpcywgdWlPdmVybGF5Q29uZmlnLCBwYXJlbnRFbGVtZW50KTsgIFxuICAgICAgcmV0dXJuIHVpO1xuICAgIH07XG5cbiAgICBpZihjb25maWcudWkgPT0gdHJ1ZSl7XG4gICAgIHRoaXMudWkgPSB0aGlzLnNob3dVSSgpOyBcbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYXRlVUkgPSBmdW5jdGlvbigpe1xuICAgICAgdGhpcy51aSA9IG5ldyAkM0Rtb2wuVUkodGhpcywgdWlPdmVybGF5Q29uZmlnLCBwYXJlbnRFbGVtZW50KTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBVSSBvbiB2aWV3cG9ydCBjaGFuZ2UgXG4gICAgICogXG4gICAgICogQGZ1bmN0aW9uICQzRG1vbC5TdGF0ZU1hbmFnZXIjdXBkYXRlVUlcbiAgICAgKi9cbiAgICB0aGlzLnVwZGF0ZVVJID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKHRoaXMudWkpe1xuICAgICAgICB0aGlzLnVpLnJlc2l6ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMudXBkYXRlVUkuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAodHlwZW9mICh3aW5kb3cuUmVzaXplT2JzZXJ2ZXIpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHRoaXMuZGl2d2F0Y2hlciA9IG5ldyB3aW5kb3cuUmVzaXplT2JzZXJ2ZXIodGhpcy51cGRhdGVVSS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kaXZ3YXRjaGVyLm9ic2VydmUoZ2x2aWV3ZXIuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBcbiAgICAvLyBVSSBjaGFuZ2VzXG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKXtcbiAgICAgIC8vIGdsdmlld2VyLigpO1xuICAgICAgZ2x2aWV3ZXIuc2V0U3R5bGUoe30pO1xuXG4gICAgICBsZXQgc2VsTGlzdCA9IE9iamVjdC5rZXlzKHNlbGVjdGlvbnMpO1xuXG4gICAgICBzZWxMaXN0LmZvckVhY2goIChzZWxLZXkpID0+e1xuICAgICAgICB2YXIgc2VsID0gc2VsZWN0aW9uc1tzZWxLZXldO1xuXG4gICAgICAgIGlmKCAhc2VsLmhpZGRlbiApIHtcbiAgICAgICAgICB2YXIgc3R5bGVMaXN0ID0gT2JqZWN0LmtleXMoc2VsLnN0eWxlcyk7XG4gICAgICAgICAgXG4gICAgICAgICAgc3R5bGVMaXN0LmZvckVhY2goKHN0eWxlS2V5KT0+e1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gc2VsLnN0eWxlc1tzdHlsZUtleV07XG5cbiAgICAgICAgICAgIGlmKCAhc3R5bGUuaGlkZGVuKXtcbiAgICAgICAgICAgICAgZ2x2aWV3ZXIuYWRkU3R5bGUoc2VsLnNwZWMsIHN0eWxlLnNwZWMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ2x2aWV3ZXIuc2V0Q2xpY2thYmxlKHNlbC5zcGVjLCB0cnVlLCAoKT0+e30pO1xuICAgICAgICAgIGdsdmlld2VyLmVuYWJsZUNvbnRleHRNZW51KHNlbC5zcGVjLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBnbHZpZXdlci5zZXRDbGlja2FibGUoc2VsLnNwZWMsIGZhbHNlLCAoKT0+e30pO1xuICAgICAgICAgIGdsdmlld2VyLmVuYWJsZUNvbnRleHRNZW51KHNlbC5zcGVjLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSlcblxuICAgICAgZ2x2aWV3ZXIucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZWlkKGxlbmd0aCkge1xuICAgICAgdmFyIHJlc3VsdCAgICAgICAgICAgPSAnJztcbiAgICAgIHZhciBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICAgIHZhciBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICAgfVxuICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBTdGF0ZXM7XG59KSgpXG4iLCIvKipcbiAqIEdlbmVyYXRlcyB0aGUgb2JqZWN0IHRvIGhvbGQgZGlmZmVyZW50IGljb25zIHByZXNlbnQgSWNvbnMgOiBtb3ZlLCByb3RhdGUsIHBlbmNpbCwgbGlzdEFycm93LCBvcHRpb24sIG1pbnVzLCBwbHVzLCBwYWluYnJ1c2gsIHNlbGVjdCwgbW92aWUucGxheSwgbW92ZS5wYXVzZSwgbW92aWUuc3RvcCwgbW92aWUubmV4dCwgbW92ZS5wcmV2aW91cywgdGljaywgY3Jvc3MsIGVkaXQsIHJlbW92ZSwgbGlzdCwgc3R5bGUsIHZpc2libGUsIGludmlzaWJsZSwgbW91c2UsIG5vbW91c2UsIGxhYmVsLCBzdXJmYWNlLCBtb2xlY3VsZSwgY2hhbmdlXG4gKiBAZnVuY3Rpb24gJDNEbW9sLlVJI0ljb25zXG4gKiBcbiAqIFxuICovXG4kM0Rtb2wuVUkuSWNvbnMgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBJY29ucygpIHtcbiAgICB0aGlzLm1vdmUgPSBgPHN2ZyAgaWQ9XCJMYXllcl8xXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMyIDMyO1wiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDMyIDMyXCIgIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuICAgIDxwYXRoIGQ9XCJNMzEuMzM4LDE0LjUzOEwyNy4zOCwxMC41OEMyNi45OTQsMTAuMTkzLDI2LjUzMSwxMCwyNiwxMGMtMS4xODgsMC0yLDEuMDE2LTIsMmMwLDAuNTE2LDAuMTg2LDAuOTg2LDAuNTgsMS4zOEwyNS4yLDE0SDE4ICBWNi44bDAuNjIsMC42MkMxOS4wMTQsNy44MTQsMTkuNDg0LDgsMjAsOGMwLjk4NCwwLDItMC44MTMsMi0yYzAtMC41MzEtMC4xOTMtMC45OTQtMC41OC0xLjM4bC0zLjk3My0zLjk3NCAgQzE3LjA4LDAuMjc5LDE2LjcyOSwwLDE2LDBzLTEuMTM1LDAuMzM0LTEuNDYzLDAuNjYyTDEwLjU4LDQuNjJDMTAuMTkzLDUuMDA2LDEwLDUuNDY5LDEwLDZjMCwxLjE4OCwxLjAxNiwyLDIsMiAgYzAuNTE2LDAsMC45ODYtMC4xODYsMS4zOC0wLjU4TDE0LDYuOFYxNEg2LjhsMC42Mi0wLjYyQzcuODE0LDEyLjk4Niw4LDEyLjUxNiw4LDEyYzAtMC45ODQtMC44MTMtMi0yLTIgIGMtMC41MzEsMC0wLjk5NCwwLjE5My0xLjM4LDAuNThsLTMuOTU4LDMuOTU4QzAuMzM0LDE0Ljg2NiwwLDE1LjI3MSwwLDE2czAuMjc5LDEuMDgsMC42NDYsMS40NDdMNC42MiwyMS40MiAgQzUuMDA2LDIxLjgwNyw1LjQ2OSwyMiw2LDIyYzEuMTg4LDAsMi0xLjAxNiwyLTJjMC0wLjUxNi0wLjE4Ni0wLjk4Ni0wLjU4LTEuMzhMNi44LDE4SDE0djcuMmwtMC42Mi0wLjYyICBDMTIuOTg2LDI0LjE4NiwxMi41MTYsMjQsMTIsMjRjLTAuOTg0LDAtMiwwLjgxMy0yLDJjMCwwLjUzMSwwLjE5MywwLjk5NCwwLjU4LDEuMzhsMy45NTcsMy45NThDMTQuODY1LDMxLjY2NiwxNS4yNzEsMzIsMTYsMzIgIHMxLjA4LTAuMjc5LDEuNDQ3LTAuNjQ2bDMuOTczLTMuOTc0QzIxLjgwNywyNi45OTQsMjIsMjYuNTMxLDIyLDI2YzAtMS4xODgtMS4wMTYtMi0yLTJjLTAuNTE2LDAtMC45ODYsMC4xODYtMS4zOCwwLjU4TDE4LDI1LjJWMTggIGg3LjJsLTAuNjIsMC42MkMyNC4xODYsMTkuMDE0LDI0LDE5LjQ4NCwyNCwyMGMwLDAuOTg0LDAuODEzLDIsMiwyYzAuNTMxLDAsMC45OTQtMC4xOTMsMS4zOC0wLjU4bDMuOTc0LTMuOTczICBDMzEuNzIxLDE3LjA4LDMyLDE2LjcyOSwzMiwxNlMzMS42NjYsMTQuODY2LDMxLjMzOCwxNC41Mzh6XCIvPlxuICAgIDwvc3ZnPlxuICAgIGA7XG5cblxuICAgIHRoaXMucm90YXRlID0gYDxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiSWNvbnNcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgMzIgMzJcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO31cbiAgICA8L3N0eWxlPlxuICAgIDxwb2x5bGluZSBjbGFzcz1cInN0MFwiIHBvaW50cz1cIjE5LDE5IDI0LDE5IDI0LDI0IFwiLz5cbiAgICA8cG9seWxpbmUgY2xhc3M9XCJzdDBcIiBwb2ludHM9XCI2LDIzIDExLDIzIDExLDE4IFwiLz5cbiAgICA8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMjQsMTkuNGMtMC43LDAuOC0xLjQsMS42LTIuMiwyLjRjLTcsNy0xNS4zLDEwLjItMTguNSw3cy0wLjEtMTEuNSw3LTE4LjVzMTUuMy0xMC4yLDE4LjUtN1xuICAgIGMxLjQsMS40LDEuNiwzLjYsMC44LDYuM1wiLz5cbiAgICA8cGF0aCBjbGFzcz1cInN0MFwiIGQ9XCJNMTEsMjIuNWMtMC4zLTAuMi0wLjUtMC41LTAuOC0wLjhjLTctNy0xMC4yLTE1LjMtNy0xOC41czExLjUtMC4xLDE4LjUsN3MxMC4yLDE1LjMsNywxOC41XG4gICAgYy0xLjcsMS43LTQuOCwxLjYtOC40LDAuMVwiLz5cbiAgICA8L3N2Zz5gO1xuXG4gICAgdGhpcy5wZW5jaWwgPSBgXG4gICAgPHN2Z1xuICAgdmlld0JveD1cIjAgMCA3LjQwODMzMzIgNy40MDgzMzM1XCJcbiAgIHZlcnNpb249XCIxLjFcIlxuICAgaWQ9XCJzdmc0NjQ1OFwiXG4gICBpbmtzY2FwZTp2ZXJzaW9uPVwiMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKVwiXG4gICBzb2RpcG9kaTpkb2NuYW1lPVwicGVuY2lsLnN2Z1wiXG4gICB4bWxuczppbmtzY2FwZT1cImh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGVcIlxuICAgeG1sbnM6c29kaXBvZGk9XCJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZFwiXG4gICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgIHhtbG5zOnN2Zz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gIDxzb2RpcG9kaTpuYW1lZHZpZXdcbiAgICAgaWQ9XCJuYW1lZHZpZXc0NjQ2MFwiXG4gICAgIHBhZ2Vjb2xvcj1cIiNmZmZmZmZcIlxuICAgICBib3JkZXJjb2xvcj1cIiM2NjY2NjZcIlxuICAgICBib3JkZXJvcGFjaXR5PVwiMS4wXCJcbiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz1cIjJcIlxuICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT1cIjAuMFwiXG4gICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9XCIwXCJcbiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9XCJtbVwiXG4gICAgIHNob3dncmlkPVwiZmFsc2VcIlxuICAgICB1bml0cz1cInB4XCJcbiAgICAgaW5rc2NhcGU6em9vbT1cIjExLjg1OTAzNVwiXG4gICAgIGlua3NjYXBlOmN4PVwiMzkuMjUyNzczXCJcbiAgICAgaW5rc2NhcGU6Y3k9XCItMC41NDgxMDUzMlwiXG4gICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD1cIjE5MjBcIlxuICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PVwiMTAxN1wiXG4gICAgIGlua3NjYXBlOndpbmRvdy14PVwiLThcIlxuICAgICBpbmtzY2FwZTp3aW5kb3cteT1cIi04XCJcbiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD1cIjFcIlxuICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPVwibGF5ZXIxXCIgLz5cbiAgPGRlZnNcbiAgICAgaWQ9XCJkZWZzNDY0NTVcIiAvPlxuICA8Z1xuICAgICBpbmtzY2FwZTpsYWJlbD1cIkxheWVyIDFcIlxuICAgICBpbmtzY2FwZTpncm91cG1vZGU9XCJsYXllclwiXG4gICAgIGlkPVwibGF5ZXIxXCI+XG4gICAgPGdcbiAgICAgICBpZD1cImc0NjM2OVwiXG4gICAgICAgc3R5bGU9XCJvcGFjaXR5OjAuODgzOTkxXCJcbiAgICAgICB0cmFuc2Zvcm09XCJtYXRyaXgoMS40ODkyNjYyLC0wLjE1Njg2NjU1LDAuMTU2ODY2NTUsMS40ODkyNjYyLC01My4yNjUzOTQsLTExOS45MjM1MilcIj5cbiAgICAgIDxnXG4gICAgICAgICBpZD1cImc0OTE1MFwiXG4gICAgICAgICB0cmFuc2Zvcm09XCJtYXRyaXgoMC45MTc0MzU0MSwwLDAsMC45MTc0MzU0MSwyMy42NDgyNTcsLTQuMjAyNDIwOClcIlxuICAgICAgICAgc3R5bGU9XCJvcGFjaXR5OjAuODgzOTkxXCI+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgIHN0eWxlPVwiZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjFcIlxuICAgICAgICAgICBkPVwibSAzLjgwMjAyNjgsMTAwLjIwOTQ0IDAuNDg5MDU3MywtMS4zMjUxOTEgMy4xNTUyMDkyLC0yLjQ2MTA2MSAwLjgyMDM1NDMsMS4wMDk2NjYgLTMuMjM0MDg5MywyLjQ3NjgzOCB6XCJcbiAgICAgICAgICAgaWQ9XCJwYXRoNDcxNjNcIlxuICAgICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9XCJjY2NjY2NcIiAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgICBzdHlsZT1cImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxXCJcbiAgICAgICAgICAgZD1cIm0gNC43MDEyNjExLDk4LjUzNzE3OCAtMC4yNzM4NzE2LDAuNTM1Njc3IDAuNTE4NDAwNiwtMC4xMjU0OTkgLTAuMTg5MzEyNiwwLjUxMjcyMiAwLjUwNDgzMzQsLTAuMTAyNTQ2IC0wLjIyODc1MjYsMC41NTIxNlwiXG4gICAgICAgICAgIGlkPVwicGF0aDQ3MTY3XCJcbiAgICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPVwiY2NjY2NjXCIgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICAgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjg4Mzk1cHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MVwiXG4gICAgICAgICAgIGQ9XCJtIDQuMDE0MzkyOCw5OS44MDM3NjMgMC4xODkxNTgsMC4yNTc5MzcgLTAuNDAxNTMxNywwLjE0Nzc0IHpcIlxuICAgICAgICAgICBpZD1cInBhdGg0NjA2MVwiIC8+XG4gICAgICA8L2c+XG4gICAgICA8cGF0aFxuICAgICAgICAgc3R5bGU9XCJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MVwiXG4gICAgICAgICBkPVwibSAyOS45MTA2ODQsODQuODA2ODQ0IDAuNjkxNjIxLDAuODQ3ODA0XCJcbiAgICAgICAgIGlkPVwicGF0aDQ2MTc2XCIgLz5cbiAgICA8L2c+XG4gIDwvZz5cbjwvc3ZnPlxuXG4gICAgYDtcblxuICAgIHRoaXMubGlzdEFycm93ID0gYFxuICAgIDxzdmdcbiAgICB2aWV3Qm94PVwiMCAwIDcuNDA4MzMzMiA3LjQwODMzMzVcIlxuICAgIHZlcnNpb249XCIxLjFcIlxuICAgIGlkPVwic3ZnNDE2MDNcIlxuICAgIGlua3NjYXBlOnZlcnNpb249XCIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpXCJcbiAgICBzb2RpcG9kaTpkb2NuYW1lPVwibGlzdEFycm93LnN2Z1wiXG4gICAgeG1sbnM6aW5rc2NhcGU9XCJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlXCJcbiAgICB4bWxuczpzb2RpcG9kaT1cImh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkXCJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB4bWxuczpzdmc9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgPHNvZGlwb2RpOm5hbWVkdmlld1xuICAgICAgaWQ9XCJuYW1lZHZpZXc0MTYwNVwiXG4gICAgICBwYWdlY29sb3I9XCIjZmZmZmZmXCJcbiAgICAgIGJvcmRlcmNvbG9yPVwiIzY2NjY2NlwiXG4gICAgICBib3JkZXJvcGFjaXR5PVwiMS4wXCJcbiAgICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9XCIyXCJcbiAgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PVwiMC4wXCJcbiAgICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9XCIwXCJcbiAgICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPVwibW1cIlxuICAgICAgc2hvd2dyaWQ9XCJmYWxzZVwiXG4gICAgICB1bml0cz1cInB4XCJcbiAgICAgIGlua3NjYXBlOnpvb209XCIxNi43NzEyMDhcIlxuICAgICAgaW5rc2NhcGU6Y3g9XCIxNi42MzU2NTNcIlxuICAgICAgaW5rc2NhcGU6Y3k9XCIxMS4xMjAyNDhcIlxuICAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPVwiMTkyMFwiXG4gICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PVwiMTAxN1wiXG4gICAgICBpbmtzY2FwZTp3aW5kb3cteD1cIi04XCJcbiAgICAgIGlua3NjYXBlOndpbmRvdy15PVwiLThcIlxuICAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD1cIjFcIlxuICAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj1cImxheWVyMVwiIC8+XG4gICA8ZGVmc1xuICAgICAgaWQ9XCJkZWZzNDE2MDBcIiAvPlxuICAgPGdcbiAgICAgIGlua3NjYXBlOmxhYmVsPVwiTGF5ZXIgMVwiXG4gICAgICBpbmtzY2FwZTpncm91cG1vZGU9XCJsYXllclwiXG4gICAgICBpZD1cImxheWVyMVwiPlxuICAgICA8cGF0aFxuICAgICAgICBzdHlsZT1cImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MVwiXG4gICAgICAgIGQ9XCJNIDEuOTkxMTk4LDAuODkzMDE4OTMgNS43MTY2NDU5LDMuNzA0MTY2NyAxLjk5MTE5OCw2LjUxNTMxNDUgWlwiXG4gICAgICAgIGlkPVwicGF0aDQyMjk3XCJcbiAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPVwiY2NjY1wiIC8+XG4gICA8L2c+XG4gPC9zdmc+XG4gXG4gICAgYDtcblxuICAgIHRoaXMub3B0aW9uID0gYCA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+Njkub3B0aW9uPC90aXRsZT48ZyBpZD1cIl82OS5vcHRpb25cIiBkYXRhLW5hbWU9XCI2OS5vcHRpb25cIj48cmVjdCBjbGFzcz1cImNscy0xXCIgeD1cIjFcIiB5PVwiMVwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjlcIiByeD1cIjJcIiByeT1cIjJcIi8+PHJlY3QgY2xhc3M9XCJjbHMtMVwiIHg9XCIxNFwiIHk9XCIxXCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiOVwiIHJ4PVwiMlwiIHJ5PVwiMlwiLz48cmVjdCBjbGFzcz1cImNscy0xXCIgeD1cIjE0XCIgeT1cIjE0XCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiOVwiIHJ4PVwiMlwiIHJ5PVwiMlwiLz48cmVjdCBjbGFzcz1cImNscy0xXCIgeD1cIjFcIiB5PVwiMTRcIiB3aWR0aD1cIjlcIiBoZWlnaHQ9XCI5XCIgcng9XCIyXCIgcnk9XCIyXCIvPjwvZz48L3N2Zz5gO1xuXG4gICAgdGhpcy5taW51cyA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBjbGFzcz1cImZlYXRoZXIgZmVhdGhlci1taW51c1wiPjxsaW5lIHgxPVwiNVwiIHkxPVwiMTJcIiB4Mj1cIjE5XCIgeTI9XCIxMlwiPjwvbGluZT48L3N2Zz5gO1xuXG4gICAgdGhpcy5wbHVzID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiICAgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwiZmVhdGhlciBmZWF0aGVyLXBsdXNcIj48bGluZSB4MT1cIjEyXCIgeTE9XCI1XCIgeDI9XCIxMlwiIHkyPVwiMTlcIj48L2xpbmU+PGxpbmUgeDE9XCI1XCIgeTE9XCIxMlwiIHgyPVwiMTlcIiB5Mj1cIjEyXCI+PC9saW5lPjwvc3ZnPmA7XG5cbiAgICB0aGlzLnBhaW50YnJ1c2ggPSBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cbiAgICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+XG4gICAgPCFET0NUWVBFIHN2ZyBQVUJMSUMgXCItLy9XM0MvL0RURCBTVkcgMS4xLy9FTlwiIFwiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkXCI+XG4gICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgNDQ0Ljg5MiA0NDQuODkyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ0NC44OTIgNDQ0Ljg5MjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgIDxnIGlkPVwiWE1MSURfNDc2X1wiPlxuICAgIDxwYXRoIGlkPVwiWE1MSURfNTAzX1wiIGQ9XCJNNDQwLjQ5OCwxNzMuMTAzYzUuODU4LTUuODU3LDUuODU4LTE1LjM1NSwwLTIxLjIxM2wtMjIuNTExLTIyLjUxMWMtNS4wOTEtNS4wOTEtMTMuMDg0LTUuODQ2LTE5LjAzOC0xLjhcbiAgICBsLTQ3LjMzMiwzMi4xN2wzMS45NzUtNDcuNjUyYzMuOTkzLTUuOTUxLDMuMjE5LTEzLjg5Ny0xLjg1LTE4Ljk2NGwtNDguODMtNDguODNjLTQuNTA4LTQuNTA4LTExLjM3Mi01LjY3NS0xNy4xMTQtMi45MDhcbiAgICBsLTguNDQzLDQuMDY1bDQuMDQzLTguOTdjMi41NjMtNS42ODUsMS4zNDEtMTIuMzYxLTMuMDY4LTE2Ljc3MUwyOTMuMDAyLDQuMzkzYy01Ljg1Ny01Ljg1Ny0xNS4zNTUtNS44NTctMjEuMjEzLDBcbiAgICBsLTExOS4wNiwxMTkuMDU5bDE2OC43MSwxNjguNzFMNDQwLjQ5OCwxNzMuMTAzelwiLz5cbiAgICA8cGF0aCBpZD1cIlhNTElEXzExOTlfXCIgZD1cIk0xMzAuNTYsMTQ1LjYyMmwtMzQuNDY2LDM0LjQ2NmMtMi44MTMsMi44MTMtNC4zOTQsNi42MjgtNC4zOTQsMTAuNjA2czEuNTgsNy43OTQsNC4zOTQsMTAuNjA2XG4gICAgbDMyLjY5NCwzMi42OTRjNi4yOTksNi4yOTksOS4zNTQsMTQuOTkyLDguMzgyLDIzLjg0OWMtMC45NzEsOC44NTEtNS44NDMsMTYuNjc3LTEzLjM2NiwyMS40NzNcbiAgICBDMjcuNzM2LDM0MC41NTQsMTguNzgxLDM0OS41MSwxNS44MzksMzUyLjQ1M2MtMjEuMTE5LDIxLjExOC0yMS4xMTksNTUuNDgsMCw3Ni42YzIxLjE0LDIxLjE0LDU1LjUwNCwyMS4wOTgsNzYuNiwwXG4gICAgYzIuOTQ0LTIuOTQzLDExLjkwMi0xMS45MDIsNzMuMTM2LTEwNy45NjVjNC43ODQtNy41MDUsMTIuNjA3LTEyLjM2NiwyMS40NjItMTMuMzM5YzguODgzLTAuOTY5LDE3LjU3NSwyLjA3MSwyMy44NTksOC4zNTRcbiAgICBsMzIuNjk0LDMyLjY5NGM1Ljg1Nyw1Ljg1NywxNS4zNTYsNS44NTcsMjEuMjEzLDBsMzQuNDY3LTM0LjQ2N0wxMzAuNTYsMTQ1LjYyMnogTTcwLjA1LDQwNC44MjVjLTguMjgsOC4yOC0yMS43MDQsOC4yOC0yOS45ODMsMFxuICAgIGMtOC4yOC04LjI4LTguMjgtMjEuNzA0LDAtMjkuOTgzYzguMjgtOC4yOCwyMS43MDQtOC4yOCwyOS45ODMsMEM3OC4zMywzODMuMTIxLDc4LjMzLDM5Ni41NDUsNzAuMDUsNDA0LjgyNXpcIi8+XG4gICAgPC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPlxuICAgIGA7XG5cbiAgICB0aGlzLnNlbGVjdCA9IGBcbiAgICA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJpc28tODg1OS0xXCI/PlxuICAgIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT5cbiAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgICA8Zz5cbiAgICA8Zz5cbiAgICA8cGF0aCBkPVwiTTQxNiwxNDkuMzMzYy04Ljc2OCwwLTE2LjkzOSwyLjY2Ny0yMy43MjMsNy4yMTFDMzg2LjQzMiwxMzkuOTQ3LDM3MC41ODEsMTI4LDM1MiwxMjhcbiAgICBjLTguNzY4LDAtMTYuOTM5LDIuNjY3LTIzLjcyMyw3LjIxMWMtNS44NDUtMTYuNTk3LTIxLjY5Ni0yOC41NDQtNDAuMjc3LTI4LjU0NGMtNy43NjUsMC0xNS4wNjEsMi4wOTEtMjEuMzMzLDUuNzM5VjQyLjY2N1xuICAgIEMyNjYuNjY3LDE5LjEzNiwyNDcuNTMxLDAsMjI0LDBzLTQyLjY2NywxOS4xMzYtNDIuNjY3LDQyLjY2N3YyNDkuNDA4bC01OC42NDUtMjkuMzMzQzExMy44NTYsMjU4LjMyNSwxMDMuOTU3LDI1Niw5NC4wOCwyNTZcbiAgICBjLTIyLjQ4NSwwLTQwLjc0NywxOC4yODMtNDAuNzQ3LDQwLjg3NWMwLDEwLjkwMSw0LjI0NSwyMS4xMiwxMS45NDcsMjguODIxbDEzNy45NDEsMTM3Ljk0MUMyMzQuMzg5LDQ5NC44MjcsMjc1Ljg4Myw1MTIsMzIwLDUxMlxuICAgIGM3Ni40NTksMCwxMzguNjY3LTYyLjIwOCwxMzguNjY3LTEzOC42NjdWMTkyQzQ1OC42NjcsMTY4LjQ2OSw0MzkuNTMxLDE0OS4zMzMsNDE2LDE0OS4zMzN6IE00MzcuMzMzLDM3My4zMzNcbiAgICBjMCw2NC43MDQtNTIuNjUxLDExNy4zMzMtMTE3LjM1NSwxMTcuMzMzYy0zOC40MjEsMC03NC41MTctMTQuOTU1LTEwMS42NTMtNDIuMTMzTDgwLjM2MywzMTAuNTkyXG4gICAgYy0zLjY2OS0zLjY0OC01LjY5Ni04LjUzMy01LjY5Ni0xMy44NDVjMC0xMC43MDksOC43MDQtMTkuNDEzLDE5LjQxMy0xOS40MTNjNi41OTIsMCwxMy4xNjMsMS41NTcsMTkuMDcyLDQuNTAxbDc0LjA5MSwzNy4wMzVcbiAgICBjMy4zMDcsMS42NDMsNy4yNTMsMS40NzIsMTAuMzY4LTAuNDY5YzMuMTM2LTEuOTQxLDUuMDU2LTUuMzc2LDUuMDU2LTkuMDY3VjQyLjY2N2MwLTExLjc1NSw5LjU1Ny0yMS4zMzMsMjEuMzMzLTIxLjMzM1xuICAgIHMyMS4zMzMsOS41NzksMjEuMzMzLDIxLjMzM3YyMDIuNjY3YzAsNS44ODgsNC43NzksMTAuNjY3LDEwLjY2NywxMC42NjdjNS44ODgsMCwxMC42NjctNC43NzksMTAuNjY3LTEwLjY2N3YtOTZcbiAgICBjMC0xMS43NTUsOS41NTctMjEuMzMzLDIxLjMzMy0yMS4zMzNzMjEuMzMzLDkuNTc5LDIxLjMzMywyMS4zMzN2OTZjMCw1Ljg4OCw0Ljc3OSwxMC42NjcsMTAuNjY3LDEwLjY2N1xuICAgIHMxMC42NjctNC43NzksMTAuNjY3LTEwLjY2N3YtNzQuNjY3YzAtMTEuNzU1LDkuNTU3LTIxLjMzMywyMS4zMzMtMjEuMzMzczIxLjMzMyw5LjU3OSwyMS4zMzMsMjEuMzMzdjc0LjY2N1xuICAgIGMwLDUuODg4LDQuNzc5LDEwLjY2NywxMC42NjcsMTAuNjY3YzUuODg4LDAsMTAuNjY3LTQuNzc5LDEwLjY2Ny0xMC42NjdWMTkyYzAtMTEuNzU1LDkuNTU3LTIxLjMzMywyMS4zMzMtMjEuMzMzXG4gICAgczIxLjMzMyw5LjU3OSwyMS4zMzMsMjEuMzMzVjM3My4zMzN6XCIvPlxuICAgIDwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+YDtcblxuICAgIHRoaXMubW92aWUgPSB7fTtcbiAgICB0aGlzLm1vdmllLnBsYXkgPSBgXG4gICAgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cbiAgICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+XG4gICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICB2aWV3Qm94PVwiMCAwIDMzMCAzMzBcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzMwIDMzMDtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgIDxnIGlkPVwiWE1MSURfMjI4X1wiPlxuICAgIDxwYXRoIGlkPVwiWE1MSURfMjI5X1wiIGQ9XCJNMjM2Ljk1LDE1Mi4yODFsLTEwOC02Ny41MDFjLTQuNjI0LTIuODktMTAuNDUzLTMuMDQ0LTE1LjIyMi0wLjRDMTA4Ljk1OSw4Ny4wMjQsMTA2LDkyLjA0NywxMDYsOTcuNXYxMzVcbiAgICBjMCw1LjQ1MywyLjk1OSwxMC40NzYsNy43MjgsMTMuMTJjMi4yNjYsMS4yNTYsNC43NywxLjg4LDcuMjcxLDEuODhjMi43NjMsMCw1LjUyMy0wLjc2Myw3Ljk1LTIuMjhsMTA4LTY3LjQ5OVxuICAgIGM0LjM4Ni0yLjc0MSw3LjA1LTcuNTQ4LDcuMDUtMTIuNzJDMjQ0LDE1OS44MjksMjQxLjMzNiwxNTUuMDIyLDIzNi45NSwxNTIuMjgxelwiLz5cbiAgICA8cGF0aCBpZD1cIlhNTElEXzIzMF9cIiBkPVwiTTE2NSwwQzc0LjAxOSwwLDAsNzQuMDE5LDAsMTY1czc0LjAxOSwxNjUsMTY1LDE2NXMxNjUtNzQuMDE5LDE2NS0xNjVTMjU1Ljk4MSwwLDE2NSwweiBNMTY1LDMwMFxuICAgIGMtNzQuNDQsMC0xMzUtNjAuNTYxLTEzNS0xMzVTOTAuNTYsMzAsMTY1LDMwczEzNSw2MC41NjEsMTM1LDEzNVMyMzkuNDM5LDMwMCwxNjUsMzAwelwiLz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcblxuICAgIHRoaXMubW92aWUuc3RvcCA9IGBcbiAgICA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJpc28tODg1OS0xXCI/PlxuICAgIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT5cbiAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgMzMwIDMzMFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMzAgMzMwO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgPGcgaWQ9XCJYTUxJRF8yMjNfXCI+XG4gICAgPHBhdGggaWQ9XCJYTUxJRF8yMjRfXCIgZD1cIk0yMjUuNzUsODkuMjVoLTEyMS41Yy04LjI4NCwwLTE1LDYuNzE2LTE1LDE1djEyMS41YzAsOC4yODQsNi43MTYsMTUsMTUsMTVoMTIxLjVjOC4yODQsMCwxNS02LjcxNiwxNS0xNVxuICAgIHYtMTIxLjVDMjQwLjc1LDk1Ljk2NiwyMzQuMDM0LDg5LjI1LDIyNS43NSw4OS4yNXpcIi8+XG4gICAgPHBhdGggaWQ9XCJYTUxJRF8yMjVfXCIgZD1cIk0xNjUsMEM3NC4wMTksMCwwLDc0LjAxOSwwLDE2NXM3NC4wMTksMTY1LDE2NSwxNjVzMTY1LTc0LjAxOSwxNjUtMTY1UzI1NS45ODEsMCwxNjUsMHogTTE2NSwzMDBcbiAgICBjLTc0LjQzOSwwLTEzNS02MC41NjEtMTM1LTEzNVM5MC41NjEsMzAsMTY1LDMwczEzNSw2MC41NjEsMTM1LDEzNVMyMzkuNDM5LDMwMCwxNjUsMzAwelwiLz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcblxuICAgIHRoaXMubW92aWUucGF1c2UgPSBgXG4gICAgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cbiAgICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+XG4gICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgMjcxLjk1MyAyNzEuOTUzXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI3MS45NTMgMjcxLjk1MztcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgIDxnPlxuICAgIDxnPlxuICAgIDxwYXRoIHN0eWxlPVwiZmlsbDojMDEwMDAyO1wiIGQ9XCJNMTM1Ljk3NywyNzEuOTUzYzc1LjA5NywwLDEzNS45NzctNjAuODc5LDEzNS45NzctMTM1Ljk3N1MyMTEuMDc0LDAsMTM1Ljk3NywwUzAsNjAuODc5LDAsMTM1Ljk3N1xuICAgIFM2MC44NzksMjcxLjk1MywxMzUuOTc3LDI3MS45NTN6IE0xMzUuOTc3LDIxLjc1NmM2Mi45NzksMCwxMTQuMjIsNTEuMjQxLDExNC4yMiwxMTQuMjJzLTUxLjI0MSwxMTQuMjItMTE0LjIyLDExNC4yMlxuICAgIHMtMTE0LjIyLTUxLjI0MS0xMTQuMjItMTE0LjIyUzcyLjk5MiwyMS43NTYsMTM1Ljk3NywyMS43NTZ6XCIvPlxuICAgIDxwYXRoIHN0eWxlPVwiZmlsbDojMDEwMDAyO1wiIGQ9XCJNMTEwLjcwNywyMDAuMTE0YzcuNTExLDAsMTMuNTk4LTYuMDg2LDEzLjU5OC0xMy41OThWODMuMTc0YzAtNy41MTEtNi4wODYtMTMuNTk4LTEzLjU5OC0xMy41OThcbiAgICBjLTcuNTExLDAtMTMuNTk4LDYuMDg2LTEzLjU5OCwxMy41OTh2MTAzLjM0MkM5Ny4xMDksMTk0LjAyOCwxMDMuMTk1LDIwMC4xMTQsMTEwLjcwNywyMDAuMTE0elwiLz5cbiAgICA8cGF0aCBzdHlsZT1cImZpbGw6IzAxMDAwMjtcIiBkPVwiTTE2NS4wOTcsMjAwLjExNGM3LjUxMSwwLDEzLjU5OC02LjA4NiwxMy41OTgtMTMuNTk4VjgzLjE3NGMwLTcuNTExLTYuMDg2LTEzLjU5OC0xMy41OTgtMTMuNTk4XG4gICAgUzE1MS41LDc1LjY2MywxNTEuNSw4My4xNzR2MTAzLjM0MkMxNTEuNSwxOTQuMDI4LDE1Ny41ODYsMjAwLjExNCwxNjUuMDk3LDIwMC4xMTR6XCIvPlxuICAgIDwvZz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcbiAgICB0aGlzLm1vdmllLm5leHQgPSBgXG4gICAgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIiBzdGFuZGFsb25lPVwibm9cIj8+XG4gICAgPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPlxuXG4gICAgPHN2Z1xuICAgIHZlcnNpb249XCIxLjFcIlxuICAgIGlkPVwiQ2FwYV8xXCJcbiAgICB4PVwiMHB4XCJcbiAgICB5PVwiMHB4XCJcbiAgICB2aWV3Qm94PVwiMCAwIDMwLjA1IDMwLjA1XCJcbiAgICBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAuMDUgMzAuMDU7XCJcbiAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gICAgc29kaXBvZGk6ZG9jbmFtZT1cIm5leHQuc3ZnXCJcbiAgICBpbmtzY2FwZTp2ZXJzaW9uPVwiMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKVwiXG4gICAgeG1sbnM6aW5rc2NhcGU9XCJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlXCJcbiAgICB4bWxuczpzb2RpcG9kaT1cImh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkXCJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB4bWxuczpzdmc9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxkZWZzXG4gICAgaWQ9XCJkZWZzNzNcIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXdcbiAgICBpZD1cIm5hbWVkdmlldzcxXCJcbiAgICBwYWdlY29sb3I9XCIjZmZmZmZmXCJcbiAgICBib3JkZXJjb2xvcj1cIiM2NjY2NjZcIlxuICAgIGJvcmRlcm9wYWNpdHk9XCIxLjBcIlxuICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9XCIyXCJcbiAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT1cIjAuMFwiXG4gICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD1cIjBcIlxuICAgIHNob3dncmlkPVwiZmFsc2VcIlxuICAgIGlua3NjYXBlOnpvb209XCIxOS44NTEzNDdcIlxuICAgIGlua3NjYXBlOmN4PVwiMTEuOTM4NzM3XCJcbiAgICBpbmtzY2FwZTpjeT1cIjE1Ljc5MjM4XCJcbiAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9XCIxOTIwXCJcbiAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PVwiMTAxN1wiXG4gICAgaW5rc2NhcGU6d2luZG93LXg9XCItOFwiXG4gICAgaW5rc2NhcGU6d2luZG93LXk9XCItOFwiXG4gICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD1cIjFcIlxuICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9XCJDYXBhXzFcIiAvPlxuICAgIDxnXG4gICAgaWQ9XCJnMzhcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8cGF0aFxuICAgIGQ9XCJtIDIwLjgxNCwxMSBjIC0wLjE5MywtMC4xMDIgLTAuNDMsLTAuMDg2IC0wLjYwNCwwLjA0MSBsIC0yLjM4MywxLjczIHYgLTEuMjU4IGMgMCwtMC4yMTcgLTAuMTIxLC0wLjQyIC0wLjMyLC0wLjUxNCAtMC4xOTEsLTAuMTAyIC0wLjQyNCwtMC4wODYgLTAuNjAyLDAuMDQxIGwgLTQuODM0LDMuNTEyIGMgLTAuMTUsMC4xMDkgLTAuMjQyLDAuMjg3IC0wLjI0MiwwLjQ3MyAwLDAuMTg0IDAuMDkyLDAuMzU3IDAuMjQyLDAuNDcxIGwgNC44MzQsMy41MDggYyAwLjEwMiwwLjA3NiAwLjIyMSwwLjExMSAwLjM0MiwwLjExMSAwLjA4OCwwIDAuMTgsLTAuMDE4IDAuMjYsLTAuMDY2IDAuMTk5LC0wLjEgMC4zMiwtMC4yOTUgMC4zMiwtMC41MTYgdiAtMS4yNiBsIDIuMzgzLDEuNzMgYyAwLjA5OCwwLjA3NiAwLjIyMSwwLjExMSAwLjM0LDAuMTExIDAuMDk0LDAgMC4xODIsLTAuMDE4IDAuMjY0LC0wLjA2NiAwLjE5NywtMC4xIDAuMzE4LC0wLjI5NSAwLjMxOCwtMC41MTYgdiAtNy4wMiBDIDIxLjEzMywxMS4yOTcgMjEuMDEyLDExLjA5NCAyMC44MTQsMTEgWlwiXG4gICAgaWQ9XCJwYXRoMlwiIC8+XG4gICAgPHBhdGhcbiAgICBkPVwiTSAxNS4wMjcsMCBDIDYuNzI5LDAgMCw2LjcyOSAwLDE1LjAyNSAwLDIzLjMyNiA2LjcyOSwzMC4wNSAxNS4wMjcsMzAuMDUgMjMuMzI1LDMwLjA1IDMwLjA1LDIzLjMyNSAzMC4wNSwxNS4wMjUgMzAuMDUxLDYuNzI5IDIzLjMyNiwwIDE1LjAyNywwIFogbSAwLDI3LjUzOSBDIDguMTE1LDI3LjUzOSAyLjUwOSwyMS45MzUgMi41MDksMTUuMDI1IDIuNTA5LDguMTE1IDguMTE1LDIuNTEgMTUuMDI3LDIuNTEgYyA2LjkxNCwwIDEyLjUxNiw1LjYwNSAxMi41MTYsMTIuNTE2IDAsNi45MTEgLTUuNjAyLDEyLjUxMyAtMTIuNTE2LDEyLjUxMyB6XCJcbiAgICBpZD1cInBhdGg0XCIgLz5cbiAgICA8cGF0aFxuICAgIGQ9XCJNIDEwLjYxNywxMS4xNDYgSCA5LjIyNSBjIC0wLjE2OCwwIC0wLjMwNSwwLjEzNyAtMC4zMDUsMC4zMDUgdiA3LjE0NiBjIDAsMC4xNjggMC4xMzcsMC4zMDkgMC4zMDUsMC4zMDkgaCAxLjM5MyBjIDAuMTcsMCAwLjMwNywtMC4xNDEgMC4zMDcsLTAuMzA5IHYgLTcuMTQ2IGMgLTAuMDAxLC0wLjE2OCAtMC4xMzgsLTAuMzA1IC0wLjMwOCwtMC4zMDUgelwiXG4gICAgaWQ9XCJwYXRoNlwiIC8+XG4gICAgPGdcbiAgICBpZD1cImc4XCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnMTBcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImcxMlwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzE0XCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnMTZcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImcxOFwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzIwXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnMjJcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImcyNFwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzI2XCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnMjhcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImczMFwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzMyXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnMzRcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImczNlwiPlxuICAgIDwvZz5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImc0MFwiXG4gICAgdHJhbnNmb3JtPVwicm90YXRlKDE4MCwxNS4wMjUsMTUuMDI1KVwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzQyXCJcbiAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLDE1LjAyNSwxNS4wMjUpXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnNDRcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImc0NlwiXG4gICAgdHJhbnNmb3JtPVwicm90YXRlKDE4MCwxNS4wMjUsMTUuMDI1KVwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzQ4XCJcbiAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLDE1LjAyNSwxNS4wMjUpXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnNTBcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImc1MlwiXG4gICAgdHJhbnNmb3JtPVwicm90YXRlKDE4MCwxNS4wMjUsMTUuMDI1KVwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzU0XCJcbiAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLDE1LjAyNSwxNS4wMjUpXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnNTZcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImc1OFwiXG4gICAgdHJhbnNmb3JtPVwicm90YXRlKDE4MCwxNS4wMjUsMTUuMDI1KVwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzYwXCJcbiAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLDE1LjAyNSwxNS4wMjUpXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnNjJcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8L2c+XG4gICAgPGdcbiAgICBpZD1cImc2NFwiXG4gICAgdHJhbnNmb3JtPVwicm90YXRlKDE4MCwxNS4wMjUsMTUuMDI1KVwiPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgIGlkPVwiZzY2XCJcbiAgICB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLDE1LjAyNSwxNS4wMjUpXCI+XG4gICAgPC9nPlxuICAgIDxnXG4gICAgaWQ9XCJnNjhcIlxuICAgIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsMTUuMDI1LDE1LjAyNSlcIj5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcbiAgICB0aGlzLm1vdmllLnByZXZpb3VzID0gYFxuICAgIDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cImlzby04ODU5LTFcIj8+XG4gICAgPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPlxuICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICB2aWV3Qm94PVwiMCAwIDMwLjA1IDMwLjA1XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwLjA1IDMwLjA1O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgPGc+XG4gICAgPHBhdGggZD1cIk0yMC44MTQsMTFjLTAuMTkzLTAuMTAyLTAuNDMtMC4wODYtMC42MDQsMC4wNDFsLTIuMzgzLDEuNzN2LTEuMjU4YzAtMC4yMTctMC4xMjEtMC40Mi0wLjMyLTAuNTE0XG4gICAgYy0wLjE5MS0wLjEwMi0wLjQyNC0wLjA4Ni0wLjYwMiwwLjA0MWwtNC44MzQsMy41MTJjLTAuMTUsMC4xMDktMC4yNDIsMC4yODctMC4yNDIsMC40NzNjMCwwLjE4NCwwLjA5MiwwLjM1NywwLjI0MiwwLjQ3MVxuICAgIGw0LjgzNCwzLjUwOGMwLjEwMiwwLjA3NiwwLjIyMSwwLjExMSwwLjM0MiwwLjExMWMwLjA4OCwwLDAuMTgtMC4wMTgsMC4yNi0wLjA2NmMwLjE5OS0wLjEsMC4zMi0wLjI5NSwwLjMyLTAuNTE2di0xLjI2XG4gICAgbDIuMzgzLDEuNzNjMC4wOTgsMC4wNzYsMC4yMjEsMC4xMTEsMC4zNCwwLjExMWMwLjA5NCwwLDAuMTgyLTAuMDE4LDAuMjY0LTAuMDY2YzAuMTk3LTAuMSwwLjMxOC0wLjI5NSwwLjMxOC0wLjUxNnYtNy4wMlxuICAgIEMyMS4xMzMsMTEuMjk3LDIxLjAxMiwxMS4wOTQsMjAuODE0LDExelwiLz5cbiAgICA8cGF0aCBkPVwiTTE1LjAyNywwQzYuNzI5LDAsMCw2LjcyOSwwLDE1LjAyNUMwLDIzLjMyNiw2LjcyOSwzMC4wNSwxNS4wMjcsMzAuMDVTMzAuMDUsMjMuMzI1LDMwLjA1LDE1LjAyNVxuICAgIEMzMC4wNTEsNi43MjksMjMuMzI2LDAsMTUuMDI3LDB6IE0xNS4wMjcsMjcuNTM5Yy02LjkxMiwwLTEyLjUxOC01LjYwNC0xMi41MTgtMTIuNTE0UzguMTE1LDIuNTEsMTUuMDI3LDIuNTFcbiAgICBjNi45MTQsMCwxMi41MTYsNS42MDUsMTIuNTE2LDEyLjUxNlMyMS45NDEsMjcuNTM5LDE1LjAyNywyNy41Mzl6XCIvPlxuICAgIDxwYXRoIGQ9XCJNMTAuNjE3LDExLjE0Nkg5LjIyNWMtMC4xNjgsMC0wLjMwNSwwLjEzNy0wLjMwNSwwLjMwNXY3LjE0NmMwLDAuMTY4LDAuMTM3LDAuMzA5LDAuMzA1LDAuMzA5aDEuMzkzXG4gICAgYzAuMTcsMCwwLjMwNy0wLjE0MSwwLjMwNy0wLjMwOXYtNy4xNDZDMTAuOTI0LDExLjI4MywxMC43ODcsMTEuMTQ2LDEwLjYxNywxMS4xNDZ6XCIvPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgICBgO1xuXG5cbiAgICB0aGlzLnRpY2sgPSBgXG4gICAgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cbiAgICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+XG4gICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgICB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgIDxnPlxuICAgICAgPGc+XG4gICAgICAgIDxwYXRoIGQ9XCJNMjU2LDBDMTE0LjYxNSwwLDAsMTE0LjYxNSwwLDI1NnMxMTQuNjE1LDI1NiwyNTYsMjU2czI1Ni0xMTQuNjE1LDI1Ni0yNTZTMzk3LjM4NSwwLDI1NiwweiBNMzg2LjU5NCwyMjYuNjY0XG4gICAgICAgICAgTDI1Mi43NDcsMzYwLjUxMWMtNy41NTEsNy41NTEtMTcuNzk1LDExLjc5NC0yOC40NzUsMTEuNzk0cy0yMC45MjMtNC4yNDMtMjguNDc1LTExLjc5NWwtNzAuMzg4LTcwLjM4OVxuICAgICAgICAgIGMtMTUuNzI2LTE1LjcyNi0xNS43MjYtNDEuMjIzLDAuMDAxLTU2Ljk1YzE1LjcyNy0xNS43MjUsNDEuMjI0LTE1LjcyNiw1Ni45NSwwLjAwMWw0MS45MTMsNDEuOTE1bDEwNS4zNzEtMTA1LjM3MVxuICAgICAgICAgIGMxNS43MjctMTUuNzI2LDQxLjIyMy0xNS43MjYsNTYuOTUxLDAuMDAxQzQwMi4zMTksMTg1LjQ0LDQwMi4zMTksMjEwLjkzOCwzODYuNTk0LDIyNi42NjR6XCIvPlxuICAgICAgPC9nPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgICBgO1xuXG4gICAgdGhpcy5jcm9zcyA9IGBcbiAgICA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJpc28tODg1OS0xXCI/PlxuICAgIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT5cbiAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgICAgIHZpZXdCb3g9XCIwIDAgNDU1IDQ1NVwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUgNDU1O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgPGc+XG4gICAgICA8Zz5cbiAgICAgICAgPHBhdGggZD1cIk0yMjcuNSwwQzEwMS43NjEsMCwwLDEwMS43NSwwLDIyNy41QzAsMzUzLjIzOSwxMDEuNzUsNDU1LDIyNy41LDQ1NUMzNTMuMjM5LDQ1NSw0NTUsMzUzLjI1LDQ1NSwyMjcuNVxuICAgICAgICAgIEM0NTUuMDAxLDEwMS43NjEsMzUzLjI1MSwwLDIyNy41LDB6IE0zMTAuNzU5LDI2OC4zMzNjMTEuNzE1LDExLjcxNiwxMS43MTUsMzAuNzExLDAsNDIuNDI3XG4gICAgICAgICAgYy01Ljg1OCw1Ljg1OC0xMy41MzYsOC43ODctMjEuMjEzLDguNzg3cy0xNS4zNTUtMi45MjktMjEuMjEzLTguNzg3TDIyNy41LDI2OS45MjdsLTQwLjgzMiw0MC44MzJcbiAgICAgICAgICBjLTUuODU4LDUuODU4LTEzLjUzNiw4Ljc4Ny0yMS4yMTMsOC43ODdzLTE1LjM1NS0yLjkyOS0yMS4yMTMtOC43ODdjLTExLjcxNS0xMS43MTYtMTEuNzE1LTMwLjcxMSwwLTQyLjQyN2w0MC44MzItNDAuODMyXG4gICAgICAgICAgbC00MC44MzItNDAuODMyYy0xMS43MTUtMTEuNzE2LTExLjcxNS0zMC43MTEsMC00Mi40MjdjMTEuNzE2LTExLjcxNiwzMC43MTEtMTEuNzE2LDQyLjQyNywwbDQwLjgzMiw0MC44MzJsNDAuODMyLTQwLjgzMlxuICAgICAgICAgIGMxMS43MTYtMTEuNzE2LDMwLjcxMS0xMS43MTYsNDIuNDI3LDBjMTEuNzE1LDExLjcxNiwxMS43MTUsMzAuNzExLDAsNDIuNDI3TDI2OS45MjcsMjI3LjVMMzEwLjc1OSwyNjguMzMzelwiLz5cbiAgICAgIDwvZz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcblxuICAgIHRoaXMuZWRpdCA9IGBcbiAgICA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJpc28tODg1OS0xXCI/PlxuICAgIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT5cbiAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkNhcGFfMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiXG4gICAgICAgdmlld0JveD1cIjAgMCA0OTAuMDA4IDQ5MC4wMDhcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkwLjAwOCA0OTAuMDA4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICAgPGc+XG4gICAgICA8Zz5cbiAgICAgICAgPGc+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNTYuNywxNDIuODY1aDg4LjZjMTEuNSwwLDIwLjgtOS40LDIwLjgtMjAuOXMtOS40LTIwLjktMjAuOC0yMC45aC04OC42Yy0xMS41LDAtMjAuOCw5LjQtMjAuOCwyMC45XG4gICAgICAgICAgICBDMTM1LjksMTMzLjQ2NSwxNDUuMywxNDIuODY1LDE1Ni43LDE0Mi44NjV6XCIvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMjY2LjEsMjIzLjE2NWMwLTExLjUtOS40LTIwLjktMjAuOC0yMC45aC04OC42Yy0xMS41LDAtMjAuOCw5LjQtMjAuOCwyMC45czkuNCwyMC45LDIwLjgsMjAuOWg4OC42XG4gICAgICAgICAgICBDMjU2LjgsMjQ0LjA2NSwyNjYuMSwyMzQuNjY1LDI2Ni4xLDIyMy4xNjV6XCIvPlxuICAgICAgICAgIDxlbGxpcHNlIGN4PVwiOTQuMlwiIGN5PVwiMTIyLjA2NVwiIHJ4PVwiMjAuNVwiIHJ5PVwiMjAuNVwiLz5cbiAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjk0LjJcIiBjeT1cIjIyMy4xNjVcIiByeD1cIjIwLjVcIiByeT1cIjIwLjVcIi8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgPHBhdGggZD1cIk00ODMuNywyNTguOTY1bC04MS4zLTgxLjNjLTguMy04LjMtMjAuOC04LjMtMjkuMiwwbC0yNC4zLDI0LjJ2LTE2OC41YzAtMTguNC0xNC45LTMzLjMtMzMuMy0zMy4zSDMzLjNcbiAgICAgICAgICBjLTE4LjQsMC0zMy4zLDE1LTMzLjMsMzMuM3YyODFjMCwxOC40LDE0LjksMzMuMywzMy4zLDMzLjNoMTY5bC00LjEsNGMtMi4xLDMuMS00LjIsNi4zLTUuMiwxMC40bC0yMC44LDEwMi4yXG4gICAgICAgICAgYy0zLjksMjAuMSwxMC40LDI4LjIsMjQsMjVsMTAyLjEtMjAuOWM0LjIsMCw3LjMtMi4xLDEwLjQtNS4ybDE3NS0xNzUuMUM0ODcuOSwyODQuMDY1LDQ5NS41LDI3Mi4xNjUsNDgzLjcsMjU4Ljk2NXogTTQwLDMwNy43NjVcbiAgICAgICAgICB2LTI2Ny43aDI2OXYyMDEuNWwtNjYuNSw2Ni4xSDQwVjMwNy43NjV6IE0yODMuNyw0MjguOTY1bC02NS42LDEzLjZsMTMuNS02NS43bDE1NS4yLTE1NS4zbDUzLjEsNTIuMUwyODMuNyw0MjguOTY1elwiLz5cbiAgICAgIDwvZz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPGc+XG4gICAgPC9nPlxuICAgIDxnPlxuICAgIDwvZz5cbiAgICA8Zz5cbiAgICA8L2c+XG4gICAgPC9zdmc+XG4gICAgYDtcblxuICAgIHRoaXMucmVtb3ZlID0gYFxuICAgIFxuPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cbjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT5cbjwhRE9DVFlQRSBzdmcgUFVCTElDIFwiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZFwiPlxuPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuXHQgdmlld0JveD1cIjAgMCAzMTAuMjg1IDMxMC4yODVcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEwLjI4NSAzMTAuMjg1O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48cGF0aCBkPVwiTTE1NS4xNDMsMC4wMDFDNjkuNTk3LDAuMDAxLDAsNjkuNTk3LDAsMTU1LjE0M2MwLDg1LjU0NSw2OS41OTcsMTU1LjE0MiwxNTUuMTQzLDE1NS4xNDJzMTU1LjE0My02OS41OTcsMTU1LjE0My0xNTUuMTQyXG5cdEMzMTAuMjg1LDY5LjU5NywyNDAuNjg5LDAuMDAxLDE1NS4xNDMsMC4wMDF6IE0yNDQuMTQzLDE3MS40OThjMCw0LjQxMS0zLjU4OSw4LTgsOGgtMTYzYy00LjQxMSwwLTgtMy41ODktOC04di0zMlxuXHRjMC00LjQxMSwzLjU4OS04LDgtOGgxNjNjNC40MTEsMCw4LDMuNTg5LDgsOFYxNzEuNDk4elwiLz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjwvc3ZnPlxuXG4gICAgYDtcblxuICAgIHRoaXMubGlzdCA9IGBcbiAgIDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cImlzby04ODU5LTFcIj8+XG4gICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+XG4gICA8IURPQ1RZUEUgc3ZnIFBVQkxJQyBcIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGRcIj5cbiAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIGlkPVwiQ2FwYV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgICAgIHZpZXdCb3g9XCIwIDAgNDU4LjE4IDQ1OC4xOFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTguMTggNDU4LjE4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG4gICA8Zz5cbiAgICAgPHBhdGggZD1cIk0zNi4wOSw1Ljk0OGMtMTguODAzLDAtMzQuMDUyLDE1LjI0OC0zNC4wNTIsMzQuMDUxYzAsMTguODAzLDE1LjI0OSwzNC4wNTIsMzQuMDUyLDM0LjA1MlxuICAgICAgIGMxOC44MDMsMCwzNC4wNTItMTUuMjUsMzQuMDUyLTM0LjA1MkM3MC4xNDIsMjEuMTk2LDU0Ljg5Myw1Ljk0OCwzNi4wOSw1Ljk0OHpcIi8+XG4gICAgIDxwYXRoIGQ9XCJNMTQ3LjUzNyw4MGgyNjguNjA0YzIyLjA5MiwwLDQwLTE3LjkwOCw0MC00MHMtMTcuOTA4LTQwLTQwLTQwSDE0Ny41MzdjLTIyLjA5MiwwLTQwLDE3LjkwOC00MCw0MFMxMjUuNDQ1LDgwLDE0Ny41MzcsODB6XG4gICAgICAgXCIvPlxuICAgICA8cGF0aCBkPVwiTTM2LjA5LDEzMi4wMDhjLTE4LjgwMywwLTM0LjA1MiwxNS4yNDgtMzQuMDUyLDM0LjA1MXMxNS4yNDksMzQuMDUyLDM0LjA1MiwzNC4wNTJjMTguODAzLDAsMzQuMDUyLTE1LjI0OSwzNC4wNTItMzQuMDUyXG4gICAgICAgUzU0Ljg5MywxMzIuMDA4LDM2LjA5LDEzMi4wMDh6XCIvPlxuICAgICA8cGF0aCBkPVwiTTQxNi4xNDIsMTI2LjA2SDE0Ny41MzdjLTIyLjA5MiwwLTQwLDE3LjkwOC00MCw0MHMxNy45MDgsNDAsNDAsNDBoMjY4LjYwNGMyMi4wOTIsMCw0MC0xNy45MDgsNDAtNDBcbiAgICAgICBTNDM4LjIzMywxMjYuMDYsNDE2LjE0MiwxMjYuMDZ6XCIvPlxuICAgICA8cGF0aCBkPVwiTTM2LjA5LDI1OC4wNjhjLTE4LjgwMywwLTM0LjA1MiwxNS4yNDgtMzQuMDUyLDM0LjA1MWMwLDE4LjgwMywxNS4yNDksMzQuMDUyLDM0LjA1MiwzNC4wNTJcbiAgICAgICBjMTguODAzLDAsMzQuMDUyLTE1LjI0OSwzNC4wNTItMzQuMDUyQzcwLjE0MiwyNzMuMzE2LDU0Ljg5MywyNTguMDY4LDM2LjA5LDI1OC4wNjh6XCIvPlxuICAgICA8cGF0aCBkPVwiTTQxNi4xNDIsMjUyLjExOUgxNDcuNTM3Yy0yMi4wOTIsMC00MCwxNy45MDgtNDAsNDBzMTcuOTA4LDQwLDQwLDQwaDI2OC42MDRjMjIuMDkyLDAsNDAtMTcuOTA4LDQwLTQwXG4gICAgICAgUzQzOC4yMzMsMjUyLjExOSw0MTYuMTQyLDI1Mi4xMTl6XCIvPlxuICAgICA8cGF0aCBkPVwiTTM2LjA5LDM4NC4xMjhjLTE4LjgwMywwLTM0LjA1MiwxNS4yNDgtMzQuMDUyLDM0LjA1MXMxNS4yNDksMzQuMDUzLDM0LjA1MiwzNC4wNTNjMTguODAzLDAsMzQuMDUyLTE1LjI1LDM0LjA1Mi0zNC4wNTNcbiAgICAgICBTNTQuODkzLDM4NC4xMjgsMzYuMDksMzg0LjEyOHpcIi8+XG4gICAgIDxwYXRoIGQ9XCJNNDE2LjE0MiwzNzguMThIMTQ3LjUzN2MtMjIuMDkyLDAtNDAsMTcuOTA4LTQwLDQwczE3LjkwOCw0MCw0MCw0MGgyNjguNjA0YzIyLjA5MiwwLDQwLTE3LjkwOCw0MC00MFxuICAgICAgIFM0MzguMjMzLDM3OC4xOCw0MTYuMTQyLDM3OC4xOHpcIi8+XG4gICA8L2c+XG4gICA8Zz5cbiAgIDwvZz5cbiAgIDxnPlxuICAgPC9nPlxuICAgPGc+XG4gICA8L2c+XG4gICA8Zz5cbiAgIDwvZz5cbiAgIDxnPlxuICAgPC9nPlxuICAgPGc+XG4gICA8L2c+XG4gICA8Zz5cbiAgIDwvZz5cbiAgIDxnPlxuICAgPC9nPlxuICAgPGc+XG4gICA8L2c+XG4gICA8Zz5cbiAgIDwvZz5cbiAgIDxnPlxuICAgPC9nPlxuICAgPGc+XG4gICA8L2c+XG4gICA8Zz5cbiAgIDwvZz5cbiAgIDxnPlxuICAgPC9nPlxuICAgPGc+XG4gICA8L2c+XG4gICA8L3N2Zz5cbiAgIGA7XG5cbiAgICB0aGlzLnN0eWxlID0gYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEzIDIxVjEzSDIxVjIxSDEzWk0xNSAxNUgxOUwxOSAxOUgxNVYxNVpcIiBmaWxsPVwiYmxhY2tcIi8+XG4gICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMyAxMUwzIDNMMTEgM1YxMUgzWk01IDVMOSA1VjlMNSA5TDUgNVpcIiBmaWxsPVwiYmxhY2tcIi8+XG4gICA8cGF0aCBkPVwiTTE4IDZWMTJIMTZWOEwxMiA4VjZMMTggNlpcIiBmaWxsPVwiYmxhY2tcIi8+XG4gICA8cGF0aCBkPVwiTTEyIDE4SDZMNiAxMkg4TDggMTZIMTJWMThaXCIgZmlsbD1cImJsYWNrXCIvPlxuICAgPC9zdmc+XG4gICBgO1xuXG5cbiAgICB0aGlzLnZpc2libGUgPSBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICB2aWV3Qm94PVwiMCAwIDk4LjQ4IDk4LjQ4XCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk4LjQ4IDk4LjQ4O1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiA+XG48Zz5cbiA8cGF0aCBkPVwiTTk3LjIwNCw0NS43ODhjLTAuODY1LTEuMDItMjEuNTM3LTI0Ljk0NS00Ny45NjMtMjQuOTQ1Yy0yNi40MjcsMC00Ny4wOTgsMjMuOTI1LTQ3Ljk2NSwyNC45NDZcbiAgIGMtMS43MDEsMi0xLjcwMSw0LjkwMiwwLjAwMSw2LjkwNGMwLjg2NiwxLjAyLDIxLjUzNywyNC45NDQsNDcuOTY0LDI0Ljk0NGMyNi40MjYsMCw0Ny4wOTgtMjMuOTI2LDQ3Ljk2NC0yNC45NDZcbiAgIEM5OC45MDYsNTAuNjkxLDk4LjkwNiw0Ny43ODksOTcuMjA0LDQ1Ljc4OHogTTU3LjMxMywzNS4yMTVjMS43NzctMC45Nyw0LjI1NSwwLjE0Myw1LjUzNCwyLjQ4NVxuICAgYzEuMjc5LDIuMzQzLDAuODc1LDUuMDI5LTAuOTAyLDUuOTk5Yy0xLjc3NiwwLjk3MS00LjI1NS0wLjE0My01LjUzNS0yLjQ4NUM1NS4xMzIsMzguODcxLDU1LjUzNSwzNi4xODUsNTcuMzEzLDM1LjIxNXpcbiAgICBNNDkuMjQxLDY4Ljk2OWMtMTguNDYsMC0zMy45OTUtMTQuMTc3LTM5LjM3Mi0xOS43MjljMy42MzEtMy43NSwxMS44OTgtMTEuNDI5LDIyLjU2Ny0xNi4wMjFcbiAgIGMtMi4wODEsMy4xNjYtMy4zMDEsNi45NDktMy4zMDEsMTEuMDIxYzAsMTEuMTA0LDkuMDAxLDIwLjEwNSwyMC4xMDUsMjAuMTA1czIwLjEwNi05LjAwMSwyMC4xMDYtMjAuMTA1XG4gICBjMC00LjA3Mi0xLjIxOS03Ljg1NS0zLjMtMTEuMDIxQzc2LjcxNSwzNy44MTIsODQuOTgxLDQ1LjQ5LDg4LjYxMiw0OS4yNEM4My4yMzUsNTQuNzk1LDY3LjcsNjguOTY5LDQ5LjI0MSw2OC45Njl6XCIvPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPjwvc3ZnPmA7XG5cbiAgICB0aGlzLmludmlzaWJsZSA9IGA8c3ZnXG52ZXJzaW9uPVwiMS4xXCJcbmlkPVwiQ2FwYV8xXCJcbng9XCIwcHhcIlxueT1cIjBweFwiXG52aWV3Qm94PVwiMCAwIDk4LjQ4IDk4LjQ4MVwiXG5zdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgOTguNDggOTguNDgxO1wiXG54bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG5zb2RpcG9kaTpkb2NuYW1lPVwiaW52aXNpYmxlLnN2Z1wiXG5pbmtzY2FwZTp2ZXJzaW9uPVwiMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKVwiXG54bWxuczppbmtzY2FwZT1cImh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGVcIlxueG1sbnM6c29kaXBvZGk9XCJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZFwiXG54bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbnhtbG5zOnN2Zz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGRlZnNcbmlkPVwiZGVmczQ1XCIgLz48c29kaXBvZGk6bmFtZWR2aWV3XG5pZD1cIm5hbWVkdmlldzQzXCJcbnBhZ2Vjb2xvcj1cIiNmZmZmZmZcIlxuYm9yZGVyY29sb3I9XCIjNjY2NjY2XCJcbmJvcmRlcm9wYWNpdHk9XCIxLjBcIlxuaW5rc2NhcGU6cGFnZXNoYWRvdz1cIjJcIlxuaW5rc2NhcGU6cGFnZW9wYWNpdHk9XCIwLjBcIlxuaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD1cIjBcIlxuc2hvd2dyaWQ9XCJmYWxzZVwiXG5pbmtzY2FwZTp6b29tPVwiMi45ODY5MzU3XCJcbmlua3NjYXBlOmN4PVwiNC44NTQ0NzM1XCJcbmlua3NjYXBlOmN5PVwiNDEuMzQ2NzIyXCJcbmlua3NjYXBlOndpbmRvdy13aWR0aD1cIjE5MjBcIlxuaW5rc2NhcGU6d2luZG93LWhlaWdodD1cIjEwMTdcIlxuaW5rc2NhcGU6d2luZG93LXg9XCItOFwiXG5pbmtzY2FwZTp3aW5kb3cteT1cIi04XCJcbmlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9XCIxXCJcbmlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9XCJnOFwiIC8+XG48Z1xuaWQ9XCJnMTBcIj5cbjxnXG5pZD1cImc4XCI+XG4gXG4gXG4gPGdcbmlkPVwiZzg0M1wiPjxwYXRoXG4gIGQ9XCJNNjkuMzIyLDQ0LjcxNkw0OS43MTUsNjQuMzIzQzYwLjQzOCw2NC4wNzIsNjkuMDcxLDU1LjQzOCw2OS4zMjIsNDQuNzE2elwiXG4gIGlkPVwicGF0aDJcIiAvPjxwYXRoXG4gIGQ9XCJNOTcuMjA0LDQ1Ljc4OWMtMC40NDktMC41MjktNi4yNDUtNy4yMy0xNS40MDItMTMuNTU0bC02LjIsNi4yYzUuOTksMy45NTQsMTAuNTU5LDguMjc1LDEzLjAxMSwxMC44MDYgICAgQzgzLjIzNSw1NC43OTUsNjcuNyw2OC45NjksNDkuMjQxLDY4Ljk2OWMtMS4zMzQsMC0yLjY1MS0wLjA4Mi0zLjk1Mi0wLjIyMmwtNy40MzksNy40MzhjMy42MzksMC45MSw3LjQ0OSwxLjQ1MSwxMS4zOTEsMS40NTEgICAgYzI2LjQyNiwwLDQ3LjA5OC0yMy45MjcsNDcuOTY0LTI0Ljk0NkM5OC45MDYsNTAuNjkyLDk4LjkwNiw0Ny43OSw5Ny4yMDQsNDUuNzg5elwiXG4gIGlkPVwicGF0aDRcIiAvPjxwYXRoXG4gIGQ9XCJNOTAuNjUxLDE1LjkwMWMwLTAuMjY2LTAuMTA0LTAuNTItMC4yOTMtMC43MDdsLTcuMDcxLTcuMDdjLTAuMzkxLTAuMzkxLTEuMDIyLTAuMzkxLTEuNDE0LDBMNjYuMDQ1LDIzLjk1MiAgICBjLTUuMjAyLTEuODkzLTEwLjg1NS0zLjEwOC0xNi44MDQtMy4xMDhjLTI2LjQyNywwLTQ3LjA5OCwyMy45MjYtNDcuOTY1LDI0Ljk0NmMtMS43MDEsMi0xLjcwMSw0LjkwMiwwLjAwMSw2LjkwMyAgICBjMC41MTcsMC42MDYsOC4wODMsOS4zNTQsMTkuNzA3LDE2LjMxOWwtMTIuODYsMTIuODZjLTAuMTg4LDAuMTg4LTAuMjkzLDAuNDQxLTAuMjkzLDAuNzA3YzAsMC4yNjcsMC4xMDUsMC41MjEsMC4yOTMsMC43MDcgICAgbDcuMDcxLDcuMDdjMC4xOTUsMC4xOTQsMC40NTEsMC4yOTMsMC43MDcsMC4yOTNjMC4yNTYsMCwwLjUxMi0wLjA5OSwwLjcwNy0wLjI5M2w3My43NS03My43NSAgICBDOTAuNTQ2LDE2LjQyMSw5MC42NTEsMTYuMTY3LDkwLjY1MSwxNS45MDF6IE05Ljg2OSw0OS4yNDFDMTMuNSw0NS40OSwyMS43NjcsMzcuODEyLDMyLjQzNiwzMy4yMiAgICBjLTIuMDgxLDMuMTY2LTMuMzAxLDYuOTQ5LTMuMzAxLDExLjAyMWMwLDQuNjY1LDEuNjAxLDguOTQ1LDQuMjcsMTIuMzUybC02LjEyNCw2LjEyM0MxOS4xMjksNTguMTk2LDEyLjg5LDUyLjM2MSw5Ljg2OSw0OS4yNDF6XCJcbiAgaWQ9XCJwYXRoNlwiIC8+PC9nPlxuPC9nPlxuPC9nPlxuPGdcbmlkPVwiZzEyXCI+XG48L2c+XG48Z1xuaWQ9XCJnMTRcIj5cbjwvZz5cbjxnXG5pZD1cImcxNlwiPlxuPC9nPlxuPGdcbmlkPVwiZzE4XCI+XG48L2c+XG48Z1xuaWQ9XCJnMjBcIj5cbjwvZz5cbjxnXG5pZD1cImcyMlwiPlxuPC9nPlxuPGdcbmlkPVwiZzI0XCI+XG48L2c+XG48Z1xuaWQ9XCJnMjZcIj5cbjwvZz5cbjxnXG5pZD1cImcyOFwiPlxuPC9nPlxuPGdcbmlkPVwiZzMwXCI+XG48L2c+XG48Z1xuaWQ9XCJnMzJcIj5cbjwvZz5cbjxnXG5pZD1cImczNFwiPlxuPC9nPlxuPGdcbmlkPVwiZzM2XCI+XG48L2c+XG48Z1xuaWQ9XCJnMzhcIj5cbjwvZz5cbjxnXG5pZD1cImc0MFwiPlxuPC9nPjwvc3ZnPmA7XG4gICAgdGhpcy5tb3VzZSA9IGA8c3ZnXG4gIHZlcnNpb249XCIxLjFcIlxuICBpZD1cIkNhcGFfMVwiXG4gIHg9XCIwcHhcIlxuICB5PVwiMHB4XCJcbiAgdmlld0JveD1cIjAgMCAyNjAuMzY2IDI2MC4zNjZcIlxuICBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjYwLjM2NiAyNjAuMzY2O1wiXG4gIHhtbDpzcGFjZT1cInByZXNlcnZlXCJcbiAgc29kaXBvZGk6ZG9jbmFtZT1cImFycm93LXN2Z3JlcG8tY29tLnN2Z1wiXG4gIGlua3NjYXBlOnZlcnNpb249XCIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpXCJcbiAgeG1sbnM6aW5rc2NhcGU9XCJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlXCJcbiAgeG1sbnM6c29kaXBvZGk9XCJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZFwiXG4gIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICB4bWxuczpzdmc9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxkZWZzXG4gIGlkPVwiZGVmczM3XCIgLz48c29kaXBvZGk6bmFtZWR2aWV3XG4gIGlkPVwibmFtZWR2aWV3MzVcIlxuICBwYWdlY29sb3I9XCIjZmZmZmZmXCJcbiAgYm9yZGVyY29sb3I9XCIjNjY2NjY2XCJcbiAgYm9yZGVyb3BhY2l0eT1cIjEuMFwiXG4gIGlua3NjYXBlOnBhZ2VzaGFkb3c9XCIyXCJcbiAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9XCIwLjBcIlxuICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPVwiMFwiXG4gIHNob3dncmlkPVwiZmFsc2VcIlxuICBpbmtzY2FwZTp6b29tPVwiMy4yMzM5MDkyXCJcbiAgaW5rc2NhcGU6Y3g9XCIxMzAuMTgzXCJcbiAgaW5rc2NhcGU6Y3k9XCIxMzAuMzM3NjFcIlxuICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9XCIxOTIwXCJcbiAgaW5rc2NhcGU6d2luZG93LWhlaWdodD1cIjEwMjdcIlxuICBpbmtzY2FwZTp3aW5kb3cteD1cIi04XCJcbiAgaW5rc2NhcGU6d2luZG93LXk9XCItOFwiXG4gIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9XCIxXCJcbiAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj1cIkNhcGFfMVwiIC8+XG4gIDxwYXRoXG4gIGQ9XCJNMjU1Ljk3MiwxODkuNDYzbC00Ny4zNDctNDcuMzQ4bDQxLjA4Mi00MS4wODJjMy42NzUtMy42NzUsNS4xODYtOC45ODksMy45OTMtMTQuMDQ3Yy0xLjE5MS01LjA1OS00LjkxNy05LjE0LTkuODQ2LTEwLjc4NiAgTDE5Ljc1NCwxLjMxNmMtNS4zOTMtMS44MDQtMTEuMzQxLTAuNDAxLTE1LjM2LDMuNjJjLTQuMDIxLDQuMDIxLTUuNDIyLDkuOTY4LTMuNjIsMTUuMzZsNzQuODg1LDIyNC4xMDEgIGMxLjY0Niw0LjkyOSw1LjcyOCw4LjY1NCwxMC43ODYsOS44NDZjNS4wNTMsMS4xOTMsMTAuMzcxLTAuMzE3LDE0LjA0Ny0zLjk5M2w0Mi4xNjUtNDIuMTY1bDQ3LjM0OCw0Ny4zNDcgIGMyLjkyOSwyLjkyOSw2Ljc2OCw0LjM5NCwxMC42MDYsNC4zOTRzNy42NzgtMS40NjUsMTAuNjA2LTQuMzk0bDQ0Ljc1NS00NC43NTVDMjYxLjgzLDIwNC44MTksMjYxLjgzLDE5NS4zMjEsMjU1Ljk3MiwxODkuNDYzeiAgIE0yMDAuNjExLDIyMy42MTJsLTQ3LjM0OC00Ny4zNDdjLTIuOTI5LTIuOTI5LTYuNzY4LTQuMzk0LTEwLjYwNi00LjM5NHMtNy42NzgsMS40NjUtMTAuNjA2LDQuMzk0bC0zNS42MjQsMzUuNjI0TDM4Ljc1MiwzOS4yOTQgIGwxNzIuNTk1LDU3LjY3NGwtMzQuNTQxLDM0LjU0MWMtNS44NTgsNS44NTctNS44NTgsMTUuMzU1LDAsMjEuMjEzbDQ3LjM0Nyw0Ny4zNDhMMjAwLjYxMSwyMjMuNjEyelwiXG4gIGlkPVwicGF0aDJcIlxuICBzdHlsZT1cImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MVwiIC8+XG4gIDxnXG4gIGlkPVwiZzRcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImc2XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnOFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzEwXCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMTJcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcxNFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzE2XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMThcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcyMFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzIyXCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMjRcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcyNlwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzI4XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMzBcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImczMlwiPlxuICA8L2c+XG4gIDxwYXRoXG4gIHN0eWxlPVwiZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDozOC4zMTg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZVwiXG4gIGQ9XCJtIDE3Ni4yNTcyNywxOTguODYzMyBjIC0yMy42ODc3MiwtMjMuNjQ2NzQgLTI0LjQ5OTA2LC0yNC40MTk5MSAtMjYuNzUwMywtMjUuNDkxNzUgLTQuNTUyMTYsLTIuMTY3MzMgLTkuMTEzODgsLTIuMTcwNTUgLTEzLjYwMzM0LC0wLjAxIC0yLjIyMDQ2LDEuMDY4NzggLTMuMTA4OTEsMS45MDQwMyAtMjAuODcyNTcsMTkuNjIyNjIgTCA5Ni40Nzc2NjIsMjExLjQ5MDg3IDY3Ljg5ODM2NCwxMjUuOTIyMjUgQyA1Mi4xNzk3NSw3OC44NTk1MTQgMzkuMjU4MzY2LDQwLjE3ODk0MyAzOS4xODQxNzcsMzkuOTY1NDI4IDM5LjA3NzY5NiwzOS42NTg5NzcgMjEwLjE5MSw5Ni41NTE3MTUgMjEwLjcxOTcsOTYuOTk4NTQ4IGMgMC4wNzYzLDAuMDY0NDUgLTcuODcyMzQsOC4xNDg3MTIgLTE3LjY2MzU2LDE3Ljk2NTAxMiAtMTEuMjk1MzMsMTEuMzI0MjggLTE4LjExMjMxLDE4LjM4ODc1IC0xOC42NTA2MSwxOS4zMjc3MiAtMi42MjE3Nyw0LjU3MzIxIC0yLjcxNDM4LDEwLjI1OTQ0IC0wLjI0Nzg2LDE1LjIxODE3IDAuNTk3MTYsMS4yMDA1MyA2LjIzOTE5LDcuMDI0MDggMjUuMjQyLDI2LjA1NDA3IGwgMjQuNDcyOTQsMjQuNTA3OTYgLTExLjU5MzM1LDExLjU4OTEgLTExLjU5MzM1LDExLjU4OTExIHpcIlxuICBpZD1cInBhdGgxMjUyXCIgLz48L3N2Zz5gO1xuXG4gICAgdGhpcy5ub21vdXNlID0gYDxzdmdcbiAgdmVyc2lvbj1cIjEuMVwiXG4gIGlkPVwiQ2FwYV8xXCJcbiAgeD1cIjBweFwiXG4gIHk9XCIwcHhcIlxuICB2aWV3Qm94PVwiMCAwIDI2MC4zNjYgMjYwLjM2NlwiXG4gIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNjAuMzY2IDI2MC4zNjY7XCJcbiAgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICBzb2RpcG9kaTpkb2NuYW1lPVwibm9hcnJvdy5zdmdcIlxuICBpbmtzY2FwZTp2ZXJzaW9uPVwiMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKVwiXG4gIHhtbG5zOmlua3NjYXBlPVwiaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZVwiXG4gIHhtbG5zOnNvZGlwb2RpPVwiaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGRcIlxuICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgeG1sbnM6c3ZnPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48ZGVmc1xuICBpZD1cImRlZnMzN1wiIC8+PHNvZGlwb2RpOm5hbWVkdmlld1xuICBpZD1cIm5hbWVkdmlldzM1XCJcbiAgcGFnZWNvbG9yPVwiI2ZmZmZmZlwiXG4gIGJvcmRlcmNvbG9yPVwiIzY2NjY2NlwiXG4gIGJvcmRlcm9wYWNpdHk9XCIxLjBcIlxuICBpbmtzY2FwZTpwYWdlc2hhZG93PVwiMlwiXG4gIGlua3NjYXBlOnBhZ2VvcGFjaXR5PVwiMC4wXCJcbiAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD1cIjBcIlxuICBzaG93Z3JpZD1cImZhbHNlXCJcbiAgaW5rc2NhcGU6em9vbT1cIjMuMjMzOTA5MlwiXG4gIGlua3NjYXBlOmN4PVwiMTQ4LjExNzk1XCJcbiAgaW5rc2NhcGU6Y3k9XCIxNjkuOTE4MTlcIlxuICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9XCIxOTIwXCJcbiAgaW5rc2NhcGU6d2luZG93LWhlaWdodD1cIjEwMjdcIlxuICBpbmtzY2FwZTp3aW5kb3cteD1cIi04XCJcbiAgaW5rc2NhcGU6d2luZG93LXk9XCItOFwiXG4gIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9XCIxXCJcbiAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj1cIkNhcGFfMVwiIC8+XG5cbiAgPGdcbiAgaWQ9XCJnNFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzZcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImc4XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMTBcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcxMlwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzE0XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMTZcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcxOFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzIwXCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMjJcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcyNFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzI2XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMjhcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImczMFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzMyXCI+XG4gIDwvZz5cbiAgPHJlY3RcbiAgc3R5bGU9XCJmaWxsOiMwMDAwMDA7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjQ2LjMzOTtzdHJva2UtbGluZWNhcDpyb3VuZFwiXG4gIGlkPVwicmVjdDg1OVwiXG4gIHdpZHRoPVwiMC43NDg2OTU1NVwiXG4gIGhlaWdodD1cIjI4MC45MTQxMlwiXG4gIHg9XCIxNzkuNzc1ODhcIlxuICB5PVwiLTEyNy41OTgwOFwiXG4gIHJ4PVwiMTIuMTA2MDY5XCJcbiAgcnk9XCIxMi4wODA0NjJcIlxuICB0cmFuc2Zvcm09XCJtYXRyaXgoMC43NDQxOTk5MywwLjY2Nzk1NjkzLC0wLjY4Njg2MjMxLDAuNzI2Nzg3NTYsMCwwKVwiIC8+PGdcbiAgaWQ9XCJnMTMyN1wiPjxwYXRoXG4gICAgZD1cIk0yNTUuOTcyLDE4OS40NjNsLTQ3LjM0Ny00Ny4zNDhsNDEuMDgyLTQxLjA4MmMzLjY3NS0zLjY3NSw1LjE4Ni04Ljk4OSwzLjk5My0xNC4wNDdjLTEuMTkxLTUuMDU5LTQuOTE3LTkuMTQtOS44NDYtMTAuNzg2ICBMMTkuNzU0LDEuMzE2Yy01LjM5My0xLjgwNC0xMS4zNDEtMC40MDEtMTUuMzYsMy42MmMtNC4wMjEsNC4wMjEtNS40MjIsOS45NjgtMy42MiwxNS4zNmw3NC44ODUsMjI0LjEwMSAgYzEuNjQ2LDQuOTI5LDUuNzI4LDguNjU0LDEwLjc4Niw5Ljg0NmM1LjA1MywxLjE5MywxMC4zNzEtMC4zMTcsMTQuMDQ3LTMuOTkzbDQyLjE2NS00Mi4xNjVsNDcuMzQ4LDQ3LjM0NyAgYzIuOTI5LDIuOTI5LDYuNzY4LDQuMzk0LDEwLjYwNiw0LjM5NHM3LjY3OC0xLjQ2NSwxMC42MDYtNC4zOTRsNDQuNzU1LTQ0Ljc1NUMyNjEuODMsMjA0LjgxOSwyNjEuODMsMTk1LjMyMSwyNTUuOTcyLDE4OS40NjN6ICAgTTIwMC42MTEsMjIzLjYxMmwtNDcuMzQ4LTQ3LjM0N2MtMi45MjktMi45MjktNi43NjgtNC4zOTQtMTAuNjA2LTQuMzk0cy03LjY3OCwxLjQ2NS0xMC42MDYsNC4zOTRsLTM1LjYyNCwzNS42MjRMMzguNzUyLDM5LjI5NCAgbDE3Mi41OTUsNTcuNjc0bC0zNC41NDEsMzQuNTQxYy01Ljg1OCw1Ljg1Ny01Ljg1OCwxNS4zNTUsMCwyMS4yMTNsNDcuMzQ3LDQ3LjM0OEwyMDAuNjExLDIyMy42MTJ6XCJcbiAgICBpZD1cInBhdGgyXCJcbiAgICBzdHlsZT1cImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MVwiIC8+PHBhdGhcbiAgICBzdHlsZT1cImZpbGw6IzAwMDAwMDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6NDcuMzk1MztzdHJva2UtbGluZWNhcDpyb3VuZFwiXG4gICAgZD1cIk0gMTc1LjU0MjI0LDE5Ny44MTM5NSBDIDE0MS40OTE2MSwxNjMuNzYzMzIgMTQzLjIyNjcsMTYzLjkzNjkxIDExNS4wODIzMywxOTEuNzY1MTQgTCA5Ni40Nzc2NjIsMjEwLjE2MDgyIDY4LjM2MjQxNywxMjUuODc3MzcgQyA1Mi44OTkwMzEsNzkuNTIxNDc0IDQwLjQxMTA0LDQxLjQzMDA1NCA0MC42MTEzMjQsNDEuMjI5NzcgNDAuODExNjA3LDQxLjAyOTQ4NiA3OC45MTUxOTUsNTMuNTE3NDc4IDEyNS4yODU5Niw2OC45ODA4NjMgbCA4NC4zMTA0OSwyOC4xMTUyNDYgLTE3Ljc4Mzk5LDE3LjkzNDk1MSBjIC0xOS4wOTg2NiwxOS4yNjA3OCAtMjEuNDkxOTMsMjMuMTYwNTEgLTE5LjE3Mzg4LDMxLjI0MzA4IDAuNzkxMDEsMi43NTgwOSA4Ljc1NjgyLDExLjYwNDk4IDI1Ljg4ODMsMjguNzUxNzggbCAyNC43NDU3MywyNC43Njc4MyAtMTEuNDYxNDcsMTEuNDEzODEgLTExLjQ2MTQ3LDExLjQxMzgyIHpcIlxuICAgIGlkPVwicGF0aDEwNThcIiAvPjwvZz48L3N2Zz5gO1xuXG4gICAgdGhpcy5ub2xhYmVsID0gYDxzdmdcbiAgdmVyc2lvbj1cIjEuMVwiXG4gIGlkPVwiQ2FwYV8xXCJcbiAgeD1cIjBweFwiXG4gIHk9XCIwcHhcIlxuICB2aWV3Qm94PVwiMCAwIDM3LjYyOCAzNy42MjhcIlxuICBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzcuNjI4IDM3LjYyODtcIlxuICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiXG4gIHNvZGlwb2RpOmRvY25hbWU9XCJub2xhYmVsLnN2Z1wiXG4gIGlua3NjYXBlOnZlcnNpb249XCIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpXCJcbiAgeG1sbnM6aW5rc2NhcGU9XCJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlXCJcbiAgeG1sbnM6c29kaXBvZGk9XCJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZFwiXG4gIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICB4bWxuczpzdmc9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxkZWZzXG4gIGlkPVwiZGVmczM5XCIgLz48c29kaXBvZGk6bmFtZWR2aWV3XG4gIGlkPVwibmFtZWR2aWV3MzdcIlxuICBwYWdlY29sb3I9XCIjZmZmZmZmXCJcbiAgYm9yZGVyY29sb3I9XCIjNjY2NjY2XCJcbiAgYm9yZGVyb3BhY2l0eT1cIjEuMFwiXG4gIGlua3NjYXBlOnBhZ2VzaGFkb3c9XCIyXCJcbiAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9XCIwLjBcIlxuICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPVwiMFwiXG4gIHNob3dncmlkPVwiZmFsc2VcIlxuICBpbmtzY2FwZTp6b29tPVwiMTEuMTg4NDc3XCJcbiAgaW5rc2NhcGU6Y3g9XCI3LjE1MDIxMzVcIlxuICBpbmtzY2FwZTpjeT1cIjE0LjUyMzg3MVwiXG4gIGlua3NjYXBlOndpbmRvdy14PVwiLThcIlxuICBpbmtzY2FwZTp3aW5kb3cteT1cIi04XCJcbiAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD1cIjFcIlxuICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPVwiQ2FwYV8xXCIgLz5cbiAgPGdcbiAgaWQ9XCJnNFwiPlxuICA8cGF0aFxuICBkPVwiTTM2Ljg5NSwyMy43NThMMjUuMDkyLDM1LjU2MmMtMC40ODgsMC40ODctMS4xMjgsMC43MzEtMS43NywwLjczMWMtMC4yMTEsMC0wLjQxOS0wLjAzNy0wLjYyNS0wLjA4OSAgIGMwLjQxOC0wLjEwNywwLjgxNS0wLjMxNSwxLjE0NS0wLjY0NGwxMS44MDMtMTEuODA0YzAuOTc5LTAuOTc3LDAuOTc5LTIuNTYsMC0zLjUzNEwxNy40ODgsMi4wNjcgICBjLTAuMzMzLTAuMzMzLTAuNzUyLTAuNTQ2LTEuMTk5LTAuNjUxbDAuMjQzLTAuMDQzYzAuODA3LTAuMTQyLDEuNjI5LDAuMTE2LDIuMjA2LDAuNjk0bDE4LjE1NiwxOC4xNTYgICBDMzcuODcyLDIxLjE5OSwzNy44NzIsMjIuNzgyLDM2Ljg5NSwyMy43NTh6IE0zNC4yMjgsMjMuNzU4TDIyLjQyNSwzNS41NjJjLTAuNDg4LDAuNDg3LTEuMTI4LDAuNzMxLTEuNzcsMC43MzEgICBjLTAuNjQsMC0xLjI3OS0wLjI0NC0xLjc2OC0wLjczMUwwLjczMiwxNy40MDVjLTAuNTc4LTAuNTc4LTAuODM3LTEuNDAxLTAuNjk0LTIuMjA2TDEuODIyLDUuMTgxICAgYzAuMTg0LTEuMDMxLDAuOTkyLTEuODM5LDIuMDIzLTIuMDIzbDEwLjAxOS0xLjc4NGMwLjgwNy0wLjE0MiwxLjYyOSwwLjExNiwyLjIwNiwwLjY5NGwxOC4xNTYsMTguMTU2ICAgQzM1LjIwNiwyMS4xOTksMzUuMjA2LDIyLjc4MiwzNC4yMjgsMjMuNzU4eiBNOS40NTQsNy4xOTNjLTAuOTg1LTEtMi41OTUtMS4wMTItMy41OTUtMC4wMjdzLTEuMDExLDIuNTk1LTAuMDI2LDMuNTk1ICAgYzAuOTg1LDAuOTk5LDIuNTk0LDEuMDEyLDMuNTk0LDAuMDI2QzEwLjQyNiw5LjgwMiwxMC40MzgsOC4xOTIsOS40NTQsNy4xOTN6XCJcbiAgaWQ9XCJwYXRoMlwiIC8+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnNlwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzhcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcxMFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzEyXCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMTRcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcxNlwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzE4XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMjBcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcyMlwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzI0XCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMjZcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImcyOFwiPlxuICA8L2c+XG4gIDxnXG4gIGlkPVwiZzMwXCI+XG4gIDwvZz5cbiAgPGdcbiAgaWQ9XCJnMzJcIj5cbiAgPC9nPlxuICA8Z1xuICBpZD1cImczNFwiPlxuICA8L2c+XG4gIDxyZWN0XG4gIHN0eWxlPVwiZmlsbDojMDAwMDAwO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxMDYuOTQ4O3N0cm9rZS1saW5lY2FwOnJvdW5kXCJcbiAgaWQ9XCJyZWN0MTA2MlwiXG4gIHdpZHRoPVwiNi40ODc1MDExXCJcbiAgaGVpZ2h0PVwiNDYuODg2MjI3XCJcbiAgeD1cIjIzLjYwNjE0NlwiXG4gIHk9XCItMjMuNzE1MTU1XCJcbiAgcng9XCIzLjExODk5MDlcIlxuICByeT1cIjMuMjQyMTMyN1wiXG4gIHRyYW5zZm9ybT1cIm1hdHJpeCgwLjY4OTQwMzU0LDAuNzI0Mzc3NSwtMC43MjA3NjM5MywwLjY5MzE4MDYxLDAsMClcIiAvPjwvc3ZnPlxuICBgO1xuXG4gICAgdGhpcy5sYWJlbCA9IGA8IURPQ1RZUEUgc3ZnIFBVQkxJQyBcIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOXCIgXCJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGRcIj5cbiAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJDYXBhXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIlxuICAgIHZpZXdCb3g9XCIwIDAgMzcuNjI4IDM3LjYyOFwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNy42MjggMzcuNjI4O1wiXG4gICAgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0zNi44OTUsMjMuNzU4TDI1LjA5MiwzNS41NjJjLTAuNDg4LDAuNDg3LTEuMTI4LDAuNzMxLTEuNzcsMC43MzFjLTAuMjExLDAtMC40MTktMC4wMzctMC42MjUtMC4wODlcbiAgICAgIGMwLjQxOC0wLjEwNywwLjgxNS0wLjMxNSwxLjE0NS0wLjY0NGwxMS44MDMtMTEuODA0YzAuOTc5LTAuOTc3LDAuOTc5LTIuNTYsMC0zLjUzNEwxNy40ODgsMi4wNjdcbiAgICAgIGMtMC4zMzMtMC4zMzMtMC43NTItMC41NDYtMS4xOTktMC42NTFsMC4yNDMtMC4wNDNjMC44MDctMC4xNDIsMS42MjksMC4xMTYsMi4yMDYsMC42OTRsMTguMTU2LDE4LjE1NlxuICAgICAgQzM3Ljg3MiwyMS4xOTksMzcuODcyLDIyLjc4MiwzNi44OTUsMjMuNzU4eiBNMzQuMjI4LDIzLjc1OEwyMi40MjUsMzUuNTYyYy0wLjQ4OCwwLjQ4Ny0xLjEyOCwwLjczMS0xLjc3LDAuNzMxXG4gICAgICBjLTAuNjQsMC0xLjI3OS0wLjI0NC0xLjc2OC0wLjczMUwwLjczMiwxNy40MDVjLTAuNTc4LTAuNTc4LTAuODM3LTEuNDAxLTAuNjk0LTIuMjA2TDEuODIyLDUuMTgxXG4gICAgICBjMC4xODQtMS4wMzEsMC45OTItMS44MzksMi4wMjMtMi4wMjNsMTAuMDE5LTEuNzg0YzAuODA3LTAuMTQyLDEuNjI5LDAuMTE2LDIuMjA2LDAuNjk0bDE4LjE1NiwxOC4xNTZcbiAgICAgIEMzNS4yMDYsMjEuMTk5LDM1LjIwNiwyMi43ODIsMzQuMjI4LDIzLjc1OHogTTkuNDU0LDcuMTkzYy0wLjk4NS0xLTIuNTk1LTEuMDEyLTMuNTk1LTAuMDI3cy0xLjAxMSwyLjU5NS0wLjAyNiwzLjU5NVxuICAgICAgYzAuOTg1LDAuOTk5LDIuNTk0LDEuMDEyLDMuNTk0LDAuMDI2QzEwLjQyNiw5LjgwMiwxMC40MzgsOC4xOTIsOS40NTQsNy4xOTN6XCIvPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDxnPlxuICA8L2c+XG4gIDwvc3ZnPmA7XG5cbiAgICB0aGlzLnN1cmZhY2UgPSBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbiAgdmlld0JveD1cIjAgMCA1MTIuMDExIDUxMi4wMTFcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAxMSA1MTIuMDExO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+XG48Zz5cbiA8Zz5cbiAgIDxnPlxuICAgICA8cGF0aCBkPVwiTTkuODgxLDE4OC42NzJsMjM0LjY2NywxNDkuMzMzYzMuNDk5LDIuMjE5LDcuNDg4LDMuMzI4LDExLjQ1NiwzLjMyOGMzLjk4OSwwLDcuOTU3LTEuMTA5LDExLjQ1Ni0zLjMyOGwyMzQuNjY3LTE0OS4zMzNcbiAgICAgICBjNi4xNDQtMy45MjUsOS44NzctMTAuNzA5LDkuODc3LTE4LjAwNWMwLTcuMjk2LTMuNzMzLTE0LjA4LTkuODc3LTE3Ljk4NEwyNjcuNDU5LDMuMzI4Yy02Ljk5Ny00LjQzNy0xNS45MTUtNC40MzctMjIuOTEyLDBcbiAgICAgICBMOS44ODEsMTUyLjY4M2MtNi4xNDQsMy45MDQtOS44NzcsMTAuNjg4LTkuODc3LDE3Ljk4NEMwLjAwMywxNzcuOTYzLDMuNzM3LDE4NC43NDcsOS44ODEsMTg4LjY3MnpcIi8+XG4gICAgIDxwYXRoIGQ9XCJNNTAyLjEzLDMyMy4zMzlsLTY2LjA2OS00Mi4wNDhsLTE0NS42ODUsOTIuNzE1Yy0xMC4zNDcsNi41NDktMjIuMjA4LDEwLjAwNS0zNC4zNjgsMTAuMDA1cy0yNC4wMjEtMy40NTYtMzQuMzA0LTkuOTg0XG4gICAgICAgTDc1Ljk1NCwyODEuMjkxTDkuODg1LDMyMy4zMzljLTYuMTQ0LDMuOTI1LTkuODc3LDEwLjcwOS05Ljg3NywxOC4wMDVjMCw3LjI5NiwzLjczMywxNC4wOCw5Ljg3NywxNy45ODRsMjM0LjY2NywxNDkuMzU1XG4gICAgICAgYzMuNDk5LDIuMjE5LDcuNDY3LDMuMzI4LDExLjQ1NiwzLjMyOGMzLjk2OCwwLDcuOTU3LTEuMTA5LDExLjQ1Ni0zLjMyOEw1MDIuMTMsMzU5LjMyOGM2LjE0NC0zLjkwNCw5Ljg3Ny0xMC42ODgsOS44NzctMTcuOTg0XG4gICAgICAgQzUxMi4wMDgsMzM0LjA0OCw1MDguMjc0LDMyNy4yNjQsNTAyLjEzLDMyMy4zMzl6XCIvPlxuICAgPC9nPlxuIDwvZz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjwvc3ZnPlxuYDtcblxuICAgIHRoaXMubW9sZWN1bGUgPSBgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCJcbnZpZXdCb3g9XCIwIDAgNTEyLjAwMiA1MTIuMDAyXCIgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDIgNTEyLjAwMjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuPGc+XG48Zz5cbiA8cGF0aCBkPVwiTTM2MS40NjEsMjI1LjI5NmMtMTEuMzMtOC45ODgtMjAuNjk0LTIwLjMzMi0yNy4zNTgtMzMuMjk2bC02NS44ODcsNTQuMDY0Yy0xMy44ODktMTEuNzI3LTMwLjY3My0yMC40MjMtNDkuNTgyLTI0LjczNlxuICAgYy0yNS4yOTgtNS43NzMtNTEuMTktMy4xMDgtNzQuNDMxLDcuMzkybC04LjU2My0xMi4wMjdjLTkuMjkyLDExLjA4Ni0yMS4zNDEsMTkuNzc1LTM1LjA4MywyNS4wMjFsOC4yMjUsMTEuNTUzXG4gICBjLTE1LjM1MiwxNS40NDktMjYuMTQ2LDM0Ljg5Mi0zMS4xMSw1Ni42NTJjLTE0LjQzOSw2My4yODgsMjUuMzAyLDEyNi41MjQsODguNTkxLDE0MC45NjNjOC43NzksMi4wMDQsMTcuNTQ5LDIuOTYzLDI2LjE5NywyLjk2M1xuICAgYzUzLjY4NywwLDEwMi4zMjktMzcuMDQ3LDExNC43NjUtOTEuNTU0YzYuNjcyLTI5LjI1LDEuNzUyLTU4LjQ3OS0xMS42OTctODIuODk0TDM2MS40NjEsMjI1LjI5NnogTTE4Mi40NTgsMzkxLjg4NVxuICAgYy0xLjgyMyw3Ljk5MS04LjkyNiwxMy40MDgtMTYuNzg5LDEzLjQwOGMtMS4yNywwLTIuNTYtMC4xNDItMy44NS0wLjQzN2MtMzIuMzY3LTcuMzg1LTUyLjY5MS0zOS43MjMtNDUuMzA2LTcyLjA4OVxuICAgYzIuMTE3LTkuMjgxLDExLjM1OC0xNS4wOSwyMC42MzgtMTIuOTcxYzkuMjgxLDIuMTE3LDE1LjA4OCwxMS4zNTgsMTIuOTcxLDIwLjYzOGMtMS41MjgsNi43MDEtMC4zNTYsMTMuNTk3LDMuMzAxLDE5LjQxNlxuICAgYzMuNjU3LDUuODIsOS4zNjMsOS44NjcsMTYuMDYzLDExLjM5NkMxNzguNzY4LDM3My4zNjQsMTg0LjU3NSwzODIuNjA1LDE4Mi40NTgsMzkxLjg4NXpcIi8+XG48L2c+XG48L2c+XG48Zz5cbjxnPlxuIDxwYXRoIGQ9XCJNNDQzLjg3OCw2MC4zODJjLTIyLjgxLTUuMjAxLTQ2LjI4My0xLjIxMi02Ni4wOTQsMTEuMjM3Yy0xOS44MSwxMi40NTEtMzMuNTg2LDMxLjg3LTM4Ljc4OSw1NC42OFxuICAgYy0xMC43NDQsNDcuMDksMTguODI2LDk0LjE0LDY1LjkxNywxMDQuODg0djAuMDAxYzYuNTMzLDEuNDksMTMuMDU3LDIuMjAzLDE5LjQ5MiwyLjIwM2MzOS45NDcsMCw3Ni4xMzktMjcuNTY1LDg1LjM5My02OC4xMjJcbiAgIEM1MjAuNTM4LDExOC4xNzgsNDkwLjk2OCw3MS4xMjcsNDQzLjg3OCw2MC4zODJ6XCIvPlxuPC9nPlxuPC9nPlxuPGc+XG48Zz5cbiA8cGF0aCBkPVwiTTEyOS42NTEsMTI0LjU4NmMtOS45NzctMTUuODc3LTI1LjU0Mi0yNi45MTgtNDMuODI0LTMxLjA4OGMtMzcuNzQyLTguNjExLTc1LjQ0OSwxNS4wOS04NC4wNiw1Mi44M1xuICAgczE1LjA4OCw3NS40NDksNTIuODI4LDg0LjA1OWM1LjIzNiwxLjE5NSwxMC40NjYsMS43NjcsMTUuNjIyLDEuNzY3YzMyLjAxNiwwLDYxLjAyMi0yMi4wOTIsNjguNDM4LTU0LjU5N1xuICAgQzE0Mi44MjcsMTU5LjI3NCwxMzkuNjMsMTQwLjQ2MywxMjkuNjUxLDEyNC41ODZ6XCIvPlxuPC9nPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPGc+XG48L2c+XG48Zz5cbjwvZz5cbjxnPlxuPC9nPlxuPC9zdmc+YDtcblxuICAgIHRoaXMuY2hhbmdlID0gYDxzdmdcbiAgdmVyc2lvbj1cIjEuMVwiXG4gIGlkPVwiTGF5ZXJfMVwiXG4gIHg9XCIwcHhcIlxuICB5PVwiMHB4XCJcbiAgdmlld0JveD1cIjAgMCA1MTIgNTEyXCJcbiAgc3R5bGU9XCJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7XCJcbiAgeG1sOnNwYWNlPVwicHJlc2VydmVcIlxuICBzb2RpcG9kaTpkb2NuYW1lPVwiY2hhbmdlLnN2Z1wiXG4gIGlua3NjYXBlOnZlcnNpb249XCIxLjEgKGM2OGUyMmMzODcsIDIwMjEtMDUtMjMpXCJcbiAgeG1sbnM6aW5rc2NhcGU9XCJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlXCJcbiAgeG1sbnM6c29kaXBvZGk9XCJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZFwiXG4gIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICB4bWxuczpzdmc9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxkZWZzXG4gIGlkPVwiZGVmczQ3XCIgLz48c29kaXBvZGk6bmFtZWR2aWV3XG4gIGlkPVwibmFtZWR2aWV3NDVcIlxuICBwYWdlY29sb3I9XCIjZmZmZmZmXCJcbiAgYm9yZGVyY29sb3I9XCIjNjY2NjY2XCJcbiAgYm9yZGVyb3BhY2l0eT1cIjEuMFwiXG4gIGlua3NjYXBlOnBhZ2VzaGFkb3c9XCIyXCJcbiAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9XCIwLjBcIlxuICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPVwiMFwiXG4gIHNob3dncmlkPVwiZmFsc2VcIlxuICBpbmtzY2FwZTp6b29tPVwiMVwiXG4gIGlua3NjYXBlOmN4PVwiMjI2XCJcbiAgaW5rc2NhcGU6Y3k9XCIyNTYuNVwiXG4gIGlua3NjYXBlOndpbmRvdy13aWR0aD1cIjE5MjBcIlxuICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PVwiMTAyN1wiXG4gIGlua3NjYXBlOndpbmRvdy14PVwiLThcIlxuICBpbmtzY2FwZTp3aW5kb3cteT1cIi04XCJcbiAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD1cIjFcIlxuICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPVwiTGF5ZXJfMVwiIC8+XG5cblxuPGdcbiAgaWQ9XCJnMTRcIj5cbjwvZz5cbjxnXG4gIGlkPVwiZzE2XCI+XG48L2c+XG48Z1xuICBpZD1cImcxOFwiPlxuPC9nPlxuPGdcbiAgaWQ9XCJnMjBcIj5cbjwvZz5cbjxnXG4gIGlkPVwiZzIyXCI+XG48L2c+XG48Z1xuICBpZD1cImcyNFwiPlxuPC9nPlxuPGdcbiAgaWQ9XCJnMjZcIj5cbjwvZz5cbjxnXG4gIGlkPVwiZzI4XCI+XG48L2c+XG48Z1xuICBpZD1cImczMFwiPlxuPC9nPlxuPGdcbiAgaWQ9XCJnMzJcIj5cbjwvZz5cbjxnXG4gIGlkPVwiZzM0XCI+XG48L2c+XG48Z1xuICBpZD1cImczNlwiPlxuPC9nPlxuPGdcbiAgaWQ9XCJnMzhcIj5cbjwvZz5cbjxnXG4gIGlkPVwiZzQwXCI+XG48L2c+XG48Z1xuICBpZD1cImc0MlwiPlxuPC9nPlxuPGdcbiAgaWQ9XCJnMTgwMFwiXG4gIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtMC4xNTM3MjI1LC00LjMwMzgwNzUpXCI+PHBhdGhcbiAgICBzdHlsZT1cImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjIuNDE2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxXCJcbiAgICBkPVwibSAxMDIuNDYxNzIsMTI4LjMwMzAyIDc2LjAwODU5LC03Ni4wMTA1MTUgMC4xNTY1OCwzOC4wMDU3NjYgMC4xNTY2LDM4LjAwNTc2OSBoIDE1My41MzQ2MiAxNTMuNTM0NjIgdiAzOC4wMDQ3NSAzOC4wMDQ3NSBIIDI1Ni4xNTI5MyAyNi40NTMxMzEgWlwiXG4gICAgaWQ9XCJwYXRoMTE3MVwiIC8+PHBhdGhcbiAgICBzdHlsZT1cImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjIuNDE2O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxXCJcbiAgICBkPVwibSA0MDkuODQ1NzMsMzkyLjMwNDYgLTc2LjAwODU5LDc2LjAxMDUxIC0wLjE1NjU4LC0zOC4wMDU3NiAtMC4xNTY2LC0zOC4wMDU3NyBIIDE3OS45ODkzNCAyNi40NTQ3MTUgViAzNTQuMjk4ODMgMzE2LjI5NDA4IEggMjU2LjE1NDUyIDQ4NS44NTQzMSBaXCJcbiAgICBpZD1cInBhdGgxNzk2XCIgLz48L2c+PC9zdmc+YDtcblxuICB9XG5cbiAgcmV0dXJuIEljb25zO1xufSkoKTsiLCIvKipcbiAqIFRoaXMgaXMgYSBjb2xlY3Rpb24gb2YgY29udHJ1Y3RvciB0byBtYWtlIGRpZmZlcmVudCBpbnB1dCBlbGVtZW50XG4gKiBAZnVuY3Rpb24gJDNEbW9sLlVJI0Zvcm1cbiAqL1xuJDNEbW9sLlVJLkZvcm0gPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBDb2xvciBpbnB1dFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybS5Db2xvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdXRlckNvbnRyb2wgUmVmZXJlbmNlIG9iamVjdCB0byBzdG9yZSB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICBGb3JtLkNvbG9yID0gZnVuY3Rpb24gKG91dGVyQ29udHJvbCkge1xuICAgICAgICB2YXIgcmVkRG90ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgcmVkRG90LmhlaWdodCgxMCk7XG4gICAgICAgIHJlZERvdC53aWR0aCgxMCk7XG4gICAgICAgIHJlZERvdC5jc3MoJ2JvcmRlci1yYWRpdXMnLCAnNTAlJyk7XG4gICAgICAgIHJlZERvdC5jc3MoJ2JhY2tncm91bmQnLCAncmVkJyk7XG4gICAgICAgIHJlZERvdC5jc3MoJ21hcmdpbi1yaWdodCcsICczcHgnKTtcblxuICAgICAgICB2YXIgYmx1ZURvdCA9IHJlZERvdC5jbG9uZSgpO1xuICAgICAgICBibHVlRG90LmNzcygnYmFja2dyb3VuZCcsICdibHVlJyk7XG5cbiAgICAgICAgdmFyIGdyZWVuRG90ID0gcmVkRG90LmNsb25lKCk7XG4gICAgICAgIGdyZWVuRG90LmNzcygnYmFja2dyb3VuZCcsICdncmVlbicpO1xuXG4gICAgICAgIHZhciBjb250cm9sID0gdGhpcy5jb250cm9sID0ge1xuICAgICAgICAgICAgUjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDI1NSxcbiAgICAgICAgICAgICAgICBsYWJlbDogcmVkRG90XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRzoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDI1NSxcbiAgICAgICAgICAgICAgICBsYWJlbDogZ3JlZW5Eb3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBCOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMjU1LFxuICAgICAgICAgICAgICAgIGxhYmVsOiBibHVlRG90XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdXJyb3VuZGluZ0JveCA9IHRoaXMudWkgPSAkKCc8ZGl2PjwvZGl2PicpXG4gICAgICAgIHZhciBib3VuZGluZ0JveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgc3Vycm91bmRpbmdCb3guYXBwZW5kKGJvdW5kaW5nQm94KTtcblxuICAgICAgICB2YXIgc3BlY3RydW1Db250cm9sID0ge1xuICAgICAgICAgICAga2V5OiAnU3BlY3RydW0nLFxuICAgICAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzcGVjdHJ1bSA9IG5ldyBGb3JtLkNoZWNrYm94KHNwZWN0cnVtQ29udHJvbCk7XG5cbiAgICAgICAgYm91bmRpbmdCb3guYXBwZW5kKHNwZWN0cnVtLnVpKTtcblxuICAgICAgICBzcGVjdHJ1bS51aS5jc3Moe1xuICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogJzJweCdcbiAgICAgICAgfSlcblxuXG4gICAgICAgIHZhciBSVmFsdWUgPSBuZXcgRm9ybS5TbGlkZXIoY29udHJvbC5SKTtcbiAgICAgICAgdmFyIEdWYWx1ZSA9IG5ldyBGb3JtLlNsaWRlcihjb250cm9sLkcpO1xuICAgICAgICB2YXIgQlZhbHVlID0gbmV3IEZvcm0uU2xpZGVyKGNvbnRyb2wuQik7XG5cbiAgICAgICAgdmFyIHNsaWRlcnMgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICBzbGlkZXJzLmFwcGVuZChSVmFsdWUudWksIEdWYWx1ZS51aSwgQlZhbHVlLnVpKTtcblxuICAgICAgICB2YXIgY29sb3IgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXG4gICAgICAgIGJvdW5kaW5nQm94LmFwcGVuZChzbGlkZXJzKTtcbiAgICAgICAgYm91bmRpbmdCb3guYXBwZW5kKGNvbG9yKTtcblxuXG4gICAgICAgIC8vIENTU1xuXG4gICAgICAgIFJWYWx1ZS5zbGlkZS5jc3MoJ2NvbG9yJywgJ3JlZCcpO1xuXG4gICAgICAgIC8vIEdWYWx1ZS51aS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgR1ZhbHVlLnNsaWRlLmNzcygnY29sb3InLCAnZ3JlZW4nKTtcblxuICAgICAgICAvLyBCVmFsdWUudWkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIEJWYWx1ZS5zbGlkZS5jc3MoJ2NvbG9yJywgJ2JsdWUnKTtcblxuICAgICAgICBjb2xvci5oZWlnaHQoMTUpO1xuICAgICAgICAvLyBjb2xvci53aWR0aCg1MCk7XG4gICAgICAgIGNvbG9yLmNzcygnbWFyZ2luLXRvcCcsICc2cHgnKTtcbiAgICAgICAgY29sb3IuY3NzKCdtYXJnaW4tYm90dG9tJywgJzZweCcpO1xuICAgICAgICBjb2xvci5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgZ3JleScpO1xuICAgICAgICBjb2xvci5jc3MoJ2JvcmRlci1yYWRpdXMnLCAnNTAwcHgnKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIEZ1bmN0aW9uYWxpdHlcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUHJldmlldygpIHtcbiAgICAgICAgICAgIHZhciBjID0gYHJnYigke2NvbnRyb2wuUi52YWx1ZX0sICR7Y29udHJvbC5HLnZhbHVlfSwgJHtjb250cm9sLkIudmFsdWV9KWA7XG4gICAgICAgICAgICBjb2xvci5jc3MoJ2JhY2tncm91bmQnLCBjKTtcbiAgICAgICAgICAgIG91dGVyQ29udHJvbC52YWx1ZSA9IGM7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZShjb250cm9sKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFJWYWx1ZS51cGRhdGUgPSBHVmFsdWUudXBkYXRlID0gQlZhbHVlLnVwZGF0ZSA9IHVwZGF0ZVByZXZpZXc7XG4gICAgICAgIHVwZGF0ZVByZXZpZXcoKTtcblxuICAgICAgICBzcGVjdHJ1bS51cGRhdGUgPSBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgc2xpZGVycy50b2dnbGUoKTtcblxuICAgICAgICAgICAgaWYgKHYudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb2xvci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZCc6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJlZCwgb3JhbmdlLCB5ZWxsb3csIGdyZWVuLCBibHVlLCBpbmRpZ28sIHZpb2xldCknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb3V0ZXJDb250cm9sLnZhbHVlID0gJ3NwZWN0cnVtJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJldmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBvdXRlckNvbnRyb2w7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFZhbHVlID0gZnVuY3Rpb24gKGNvbG9yVmFsdWUpIHtcblxuICAgICAgICAgICAgaWYgKGNvbG9yVmFsdWUgPT0gJ3NwZWN0cnVtJykge1xuICAgICAgICAgICAgICAgIHNwZWN0cnVtLnNldFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgIHNwZWN0cnVtLnVwZGF0ZShzcGVjdHJ1bUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIHNsaWRlcnMuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgb3V0ZXJDb250cm9sLnZhbHVlID0gJ3NwZWN0cnVtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNwZWN0cnVtLnVpLmhpZGUoKTtcblxuICAgICAgICB0aGlzLmVuYWJsZVNwZWN0cnVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3BlY3RydW0udWkuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIExpc3RJbnB1dCBpbnB1dFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybS5MaXN0SW5wdXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbCBSZWZlcmVuY2Ugb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RFbGVtZW50cyBsaXN0IG9mIHRoZSBlbGVtZW50cyB0aHJvdWdoIHdoaWNoIG9wdGlvbnMgYXJlIGdlbmVyYXRlZFxuICAgICAqL1xuICAgIEZvcm0uTGlzdElucHV0ID0gZnVuY3Rpb24gKGNvbnRyb2wsIGxpc3RFbGVtZW50cykge1xuICAgICAgICAvLyB2YXIgbGFiZWwgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICAvLyBsYWJlbC50ZXh0KGNvbnRyb2wua2V5KTtcblxuICAgICAgICB2YXIgc3Vycm91bmRpbmdCb3ggPSB0aGlzLnVpID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbGlzdEVsZW1lbnRzO1xuICAgICAgICAvLyBzdXJyb3VuZGluZ0JveC5hcHBlbmQobGFiZWwpO1xuICAgICAgICBzdXJyb3VuZGluZ0JveC5hcHBlbmQoYm91bmRpbmdCb3gpO1xuXG4gICAgICAgIHZhciBzZWxlY3QgPSAkKCc8c2VsZWN0Pjwvc2VsZWN0PicpO1xuICAgICAgICBzZWxlY3QuY3NzKCQzRG1vbC5kZWZhdWx0Q1NTLkxpc3RJbnB1dC5zZWxlY3QpO1xuXG4gICAgICAgIGJvdW5kaW5nQm94LmFwcGVuZChzZWxlY3QpO1xuXG4gICAgICAgIHRoaXMuc2hvd0FsZXJ0Qm94ID0gdHJ1ZTtcbiAgICAgICAgdmFyIGZhaWxNZXNzYWdlID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgZmFpbE1lc3NhZ2UudGV4dCgnUGxlYXNlIHNlbGVjdCBzb21lIHZhbHVlJyk7XG4gICAgICAgIGZhaWxNZXNzYWdlLmNzcyh7XG4gICAgICAgICAgICAnY29sb3InOiAnY3JpbXNvbicsXG4gICAgICAgICAgICAnZm9udC1mYW1pbHknOiAnQXJpYWwnLFxuICAgICAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnLFxuICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4J1xuICAgICAgICB9KTtcbiAgICAgICAgZmFpbE1lc3NhZ2UuaGlkZSgpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoZmFpbE1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge31cblxuICAgICAgICBzZWxlY3Qub24oJ2NsaWNrJywge1xuICAgICAgICAgICAgcGFyZW50OiB0aGlzXG4gICAgICAgIH0sIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZSA9IHNlbGVjdC5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgICAgICAgICBldmVudC5kYXRhLnBhcmVudC51cGRhdGUoY29udHJvbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZ2V0VmFsdWUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMucHJldmVudEFsZXJ0Qm94ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIHNob3dcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSA9PSAnc2VsZWN0JyB8fCBjb250cm9sLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAodGhpcy5zaG93QWxlcnRCb3gpID8gZmFpbE1lc3NhZ2Uuc2hvdygpOiBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGVjdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnYm94LXNoYWRvdyc6ICcwcHggMHB4IDJweCByZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYWlsTWVzc2FnZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYm91bmRpbmdCb3guY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ2JveC1zaGFkb3cnOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAobGlzdEVsZW1lbnRzLmluZGV4T2YodmFsKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0T3B0aW9uID0gJCgnPG9wdGlvbj48L29wdGlvbj4nKTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9uLnRleHQoJ3NlbGVjdCcpO1xuXG4gICAgICAgICAgICAgICAgaXRlbUxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJCgnPG9wdGlvbj48L29wdGlvbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyKCd2YWx1ZScsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3QuYXBwZW5kKG9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24ucHJvcCgnc2VsZWN0ZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29udHJvbC52YWx1ZSA9IHNlbGVjdC5jaGlsZHJlbignb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VJOjpGb3JtOjpMaXN0SW5wdXQ6aW5jb3JyZWN0IHZhbHVlJywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCA9IGZ1bmN0aW9uIChuZXdMaXN0KSB7XG4gICAgICAgICAgICBzZWxlY3QuZW1wdHkoKTtcblxuICAgICAgICAgICAgdmFyIGRlZmF1bHRPcHRpb24gPSAkKCc8b3B0aW9uPjwvb3B0aW9uPicpO1xuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbi50ZXh0KCdzZWxlY3QnKTtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb24uYXR0cigndmFsdWUnLCAnc2VsZWN0Jyk7XG5cbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmQoZGVmYXVsdE9wdGlvbik7XG5cbiAgICAgICAgICAgIGl0ZW1MaXN0ID0gbmV3TGlzdDtcbiAgICAgICAgICAgIGl0ZW1MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9uID0gJCgnPG9wdGlvbj48L29wdGlvbj4nKTtcbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dChpdGVtKTtcbiAgICAgICAgICAgICAgICBvcHRpb24uYXR0cigndmFsdWUnLCBpdGVtKTtcbiAgICAgICAgICAgICAgICBzZWxlY3QuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTGlzdChpdGVtTGlzdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRleHQsIG51bWVyaWMgb3IgcmFuZ2UgSW5wdXRcbiAgICAgKiBAZnVuY3Rpb24gJDNEbW9sLlVJI0Zvcm0uSW5wdXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbCBSZWZlcmVuY2Ugb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIEZvcm0uSW5wdXQgPSBmdW5jdGlvbiAoY29udHJvbCkge1xuICAgICAgICB2YXIgc3Vycm91bmRpbmdCb3ggPSB0aGlzLnVpID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgLy8gc3Vycm91bmRpbmdCb3guYXBwZW5kKGxhYmVsKTtcbiAgICAgICAgc3Vycm91bmRpbmdCb3guYXBwZW5kKGJvdW5kaW5nQm94KTtcblxuICAgICAgICB2YXIgdmFsaWRhdGlvblR5cGUgPSB0aGlzLnZhbGlkYXRpb25UeXBlID0gJ3RleHQnO1xuXG4gICAgICAgIHN1cnJvdW5kaW5nQm94LmNzcyh7XG4gICAgICAgICAgICAnd2lkdGgnOiAnMTAwJScsXG4gICAgICAgICAgICAnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBpbnB1dCA9IHRoaXMuZG9tRWxlbWVudCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiPicpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoaW5wdXQpO1xuXG4gICAgICAgIHZhciBhbGVydEJveCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGFsZXJ0Qm94LmNzcyh7XG4gICAgICAgICAgICAnYm9yZGVyJzogJzFweCBzb2xpZCBkYXJrcmVkJyxcbiAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzNweCcsXG4gICAgICAgICAgICAnZm9udC1mYW1pbHknOiAnQXJpYWwnLFxuICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJyxcbiAgICAgICAgICAgICdtYXJnaW4nOiAnMnB4JyxcbiAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6ICc0cHgnLFxuICAgICAgICAgICAgJ3BhZGRpbmcnOiAnMnB4JyxcbiAgICAgICAgICAgICdjb2xvcic6ICdkYXJrcmVkJyxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kJzogJ2xpZ2h0Y29yYWwnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBhbGVydE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0IHBsZWFzZSBjaGVjayB0aGUgdmFsdWUgZW50ZXJlZCcsXG4gICAgICAgIH1cblxuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoYWxlcnRCb3gpO1xuICAgICAgICBhbGVydEJveC5oaWRlKCk7XG5cbiAgICAgICAgdGhpcy5zZXRXaWR0aCA9IGZ1bmN0aW9uICh3aWR0aCkge1xuICAgICAgICAgICAgaW5wdXQud2lkdGgod2lkdGggLSA2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0V2lkdGgoNzUpO1xuXG4gICAgICAgIGlucHV0LmNzcyh7XG4gICAgICAgICAgICAvLyAnbWFyZ2luLWxlZnQnOiAnNHB4J1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQub24oJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIGNvbnRyb2w6IGNvbnRyb2xcbiAgICAgICAgfSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXRTdHJpbmcgPSBpbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgaWYgKGlucHV0U3RyaW5nW2lucHV0U3RyaW5nLmxlbmd0aCAtIDFdID09ICcsJykge1xuICAgICAgICAgICAgICAgIGlucHV0U3RyaW5nID0gaW5wdXRTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvblR5cGUgPT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudmFsdWUgPSBpbnB1dFN0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLnZhbHVlID0gaW5wdXRTdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhbGxpbmcgdXBkYXRlIGZ1bmN0aW9uIFxuICAgICAgICAgICAgZXZlbnQuZGF0YS5wYXJlbnQudXBkYXRlKGNvbnRyb2wpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpbnB1dC5vbignc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAvLyBzZWxlY3RlZFRleHQgPSBpbnB1dC52YWwoKS5zdWJzdHJpbmcoZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQsIGUudGFyZ2V0LnNlbGVjdGlvbkVuZCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5nZXRWYWx1ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb250cm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5lcnJvciA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGFsZXJ0Qm94LnNob3coKTtcbiAgICAgICAgICAgIGFsZXJ0Qm94LnRleHQobXNnKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25UeXBlID09ICdyYW5nZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHZhbC5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKHRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbC52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0lucHV0RmxvYXQoKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRTdHJpbmcgPSBpbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgdmFyIGRvdHMgPSBpbnB1dFN0cmluZy5tYXRjaCgvXFwuL2cpIHx8IFtdO1xuICAgICAgICAgICAgdmFyIGNoZWNrU3RyaW5nID0gaW5wdXRTdHJpbmcucmVwbGFjZUFsbCgvXFwuL2csICcnKS5yZXBsYWNlQWxsKC9bMC05XS9nLCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChkb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrU3RyaW5nICE9ICcnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChpc05hTihwYXJzZUZsb2F0KGlucHV0U3RyaW5nKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tJbnB1dE51bWJlcigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dFN0cmluZyA9IGlucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICB2YXIgY2hlY2tTdHJpbmcgPSBpbnB1dFN0cmluZy5yZXBsYWNlQWxsKC9bMC05XS9nLCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChjaGVja1N0cmluZyAhPSAnJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoaXNOYU4ocGFyc2VJbnQoaW5wdXRTdHJpbmcpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBJbnB1dCBSYW5nZSBGdW5jdGlvbnNcblxuICAgICAgICAvLyBDaGVja3Mgb25seSBudW1iZXIsIGNvbW1hIGFuZCBoeXBoZW4gcHJlc2VudFxuICAgICAgICBmdW5jdGlvbiBjaGVja1JhbmdlVG9rZW5zKGlucHV0U3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgZmluYWxTdHJpbmcgPSBpbnB1dFN0cmluZy5yZXBsYWNlQWxsKCcsJywgJycpLnJlcGxhY2VBbGwoJy0nLCAnJykucmVwbGFjZUFsbCgvWzAtOV0vZywgJycpLnJlcGxhY2VBbGwoJyAnLCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChmaW5hbFN0cmluZyA9PSAnJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0xpc3QoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIGlucHV0U3RyaW5nID0gaW5wdXRTdHJpbmcucmVwbGFjZUFsbCgnICcsICcnKTtcblxuICAgICAgICAgICAgaWYgKGlucHV0U3RyaW5nW2lucHV0U3RyaW5nLmxlbmd0aCAtIDFdID09ICcsJykge1xuICAgICAgICAgICAgICAgIGlucHV0U3RyaW5nID0gaW5wdXRTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHZhciByYW5nZUxpc3QgPSBpbnB1dFN0cmluZy5zcGxpdCgnLCcpO1xuXG4gICAgICAgICAgICAvLyBJZiBkdWJsaWNhdGUgY29tbWEgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKC8sLC9nLmV4ZWMoaW5wdXRTdHJpbmcpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIElmIGZpcnN0IGVsZW1lbnQgbm90IGEgbnVtYmVyIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpc05hTihwYXJzZUludChyYW5nZUxpc3RbMF0pKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgdmFsaWRSYW5nZUxpc3QgPSByYW5nZUxpc3QubWFwKChyYW5nZUlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrUmFuZ2VJbnB1dChyYW5nZUlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRSYW5nZUxpc3QuZmluZCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlID09IGZhbHNlXG4gICAgICAgICAgICB9KSA9PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja1JhbmdlSW5wdXQoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciByYW5nZUlucHV0cyA9IGlucHV0U3RyaW5nLnNwbGl0KCctJyk7XG4gICAgICAgICAgICBpZiAocmFuZ2VJbnB1dHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlSW5wdXRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2VJbnB1dHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFuZ2VJbnB1dHMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlSW50KHJhbmdlSW5wdXRzWzBdKSkgfHwgaXNOYU4ocGFyc2VJbnQocmFuZ2VJbnB1dHNbMV0pKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGVja0lucHV0ID0gdGhpcy5jaGVja0lucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0U3RyaW5nID0gaW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uVHlwZSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0lucHV0TnVtYmVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcihhbGVydE1lc3NhZ2VbJ2ludmFsaWQtaW5wdXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25UeXBlID09ICdmbG9hdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJbnB1dEZsb2F0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcihhbGVydE1lc3NhZ2VbJ2ludmFsaWQtaW5wdXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25UeXBlID09ICdyYW5nZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tSYW5nZVRva2VucyhpbnB1dFN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrTGlzdChpbnB1dFN0cmluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0Qm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYWxlcnRNZXNzYWdlWydpbnZhbGlkLWlucHV0J10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IoYWxlcnRNZXNzYWdlWydpbnZhbGlkLWlucHV0J10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZU9ubHlOdW1iZXIgPSBmdW5jdGlvbiAoZmxvYXRUeXBlID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChmbG9hdFR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uVHlwZSA9ICdmbG9hdCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25UeXBlID0gJ251bWJlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0Lm9uKCdrZXlkb3duIGtleXVwIHBhc3RlIGN1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjaGVja0lucHV0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZUlucHV0UmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uVHlwZSA9ICdyYW5nZSc7XG5cbiAgICAgICAgICAgIGlucHV0Lm9uKCdrZXlkb3duIGtleXVwIHBhc3RlIGN1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja0lucHV0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgoY29udHJvbC5hY3RpdmUgPT0gdHJ1ZSAmJiBjb250cm9sLnZhbHVlICE9IG51bGwgJiYgY29udHJvbC52YWx1ZSAhPSBcIlwiICYmIGNoZWNrSW5wdXQoKSkgfHwgKGNvbnRyb2wuYWN0aXZlID09IGZhbHNlKSkge1xuICAgICAgICAgICAgICAgIGlucHV0LmNzcygnYm94LXNoYWRvdycsICdub25lJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY3NzKCdib3gtc2hhZG93JywgJzBweCAwcHggMnB4IHJlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENTUyBcblxuICAgICAgICBpbnB1dC5jc3MoJDNEbW9sLmRlZmF1bHRDU1MuSW5wdXQuaW5wdXQpO1xuICAgICAgICBib3VuZGluZ0JveC5jc3MoJDNEbW9sLmRlZmF1bHRDU1MuSW5wdXQuYm91bmRpbmdCb3gpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIENoZWNrYm94IGlucHV0IGZvciBib29sZWFuIHZhbHVlc1xuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybS5DaGVja2JveFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250cm9sIFJlZmVyZW5jZSBvYmplY3QgdG8gc3RvcmUgdGhlIHZhbHVlXG4gICAgICovXG4gICAgRm9ybS5DaGVja2JveCA9IGZ1bmN0aW9uIChjb250cm9sKSB7XG4gICAgICAgIHZhciBsYWJlbCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGxhYmVsLnRleHQoY29udHJvbC5rZXkpO1xuICAgICAgICBsYWJlbC5jc3MoJDNEbW9sLmRlZmF1bHRDU1MuVGV4dERlZmF1bHQpO1xuXG4gICAgICAgIHZhciBzdXJyb3VuZGluZ0JveCA9IHRoaXMudWkgPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICB2YXIgYm91bmRpbmdCb3ggPSAkKCc8ZGl2PjwvZGl2PicpO1xuICAgICAgICBzdXJyb3VuZGluZ0JveC5hcHBlbmQoYm91bmRpbmdCb3gpO1xuICAgICAgICBzdXJyb3VuZGluZ0JveC5hcHBlbmQobGFiZWwpO1xuXG4gICAgICAgIHZhciBjaGVja2JveCA9ICQoJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAvPicpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoY2hlY2tib3gpO1xuXG4gICAgICAgIHRoaXMuY2xpY2sgPSAoKSA9PiB7fTtcblxuICAgICAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRWYWx1ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb250cm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hlY2tib3gub24oJ2NsaWNrJywge1xuICAgICAgICAgICAgcGFyZW50OiB0aGlzXG4gICAgICAgIH0sIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZSA9IGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIGV2ZW50LmRhdGEucGFyZW50LnVwZGF0ZShjb250cm9sKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ1NTXG4gICAgICAgIGxhYmVsLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICAgICAgYm91bmRpbmdCb3guY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpXG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB2YWwpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoY29udHJvbCk7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGlucHV0IGZvciB2YWx1ZXMgYmV0d2VlbiB0d28gbnVtYmVyc1xuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybS5TbGlkZXJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbCBSZWZlcmVuY2Ugb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIEZvcm0uU2xpZGVyID0gZnVuY3Rpb24gKGNvbnRyb2wpIHtcbiAgICAgICAgdmFyIHN1cnJvdW5kaW5nQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgc3Vycm91bmRpbmdCb3guYXBwZW5kKGJvdW5kaW5nQm94KTtcblxuICAgICAgICBib3VuZGluZ0JveC5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlID0gJCgnPGlucHV0IHR5cGU9XCJyYW5nZVwiPicpO1xuICAgICAgICBzbGlkZS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcblxuICAgICAgICB2YXIgbWluID0gY29udHJvbC5taW4gfHwgMDtcbiAgICAgICAgdmFyIG1heCA9IGNvbnRyb2wubWF4IHx8IDEwMDtcbiAgICAgICAgdmFyIHN0ZXAgPSBjb250cm9sLnN0ZXAgfHwgMTtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGNvbnRyb2wuZGVmYXVsdCB8fCBtaW47XG4gICAgICAgIHZhciBsYWJlbENvbnRlbnQgPSBjb250cm9sLmxhYmVsIHx8ICcnO1xuXG4gICAgICAgIHZhciBsYWJlbCA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGxhYmVsLmFwcGVuZChsYWJlbENvbnRlbnQpO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQobGFiZWwpO1xuXG4gICAgICAgIHNsaWRlLmF0dHIoJ21pbicsIG1pbik7XG4gICAgICAgIHNsaWRlLmF0dHIoJ21heCcsIG1heCk7XG4gICAgICAgIHNsaWRlLmF0dHIoJ3N0ZXAnLCBzdGVwKTtcbiAgICAgICAgc2xpZGUuYXR0cigndmFsdWUnLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgICBjb250cm9sLnZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoc2xpZGUpO1xuXG4gICAgICAgIHZhciBzZXRWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRWYWx1ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb250cm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGUub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgICAgIHNldFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2xpZGUub24oJ21vdXNlbW92ZScsIHtcbiAgICAgICAgICAgIHBhcmVudDogdGhpc1xuICAgICAgICB9LCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wudmFsdWUgPSBzbGlkZS52YWwoKTtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLnBhcmVudC51cGRhdGUoY29udHJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNsaWRlLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ1NTXG4gICAgICAgIGJvdW5kaW5nQm94LmNzcygnYWxpZ24taXRlbXMnLCAnY2VudGVyJyk7XG4gICAgICAgIGJvdW5kaW5nQm94LmhlaWdodCgnMjFweCcpO1xuICAgICAgICAvLyBib3VuZGluZ0JveC5jc3MoJ2JvcmRlci1yYWRpdXMnLCAnMnB4Jyk7XG4gICAgICAgIC8vIGxhYmVsLmNzcygnbGluZS1oZWlnaHQnLCAnMjFweCcpO1xuICAgICAgICBzbGlkZS5jc3MoJ3BhZGRpbmcnLCAnMHB4Jyk7XG4gICAgICAgIHNsaWRlLmNzcygnbWFyZ2luJywgJzBweCcpO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBzbGlkZS52YWwodmFsKTtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWUgPSBzbGlkZS52YWwoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgZW1wdHkgZWxlbWVudCB1c2VkIGZvciBwcm9wZXJ0eSB0aGF0IHdob3NlIGlucHV0IGNhbm5vdCBiZSB0YWtlblxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybS5FbXB0eUVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29udHJvbCBSZWZlcmVuY2Ugb2JqZWN0IHRvIHN0b3JlIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIEZvcm0uRW1wdHlFbGVtZW50ID0gZnVuY3Rpb24gKGNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0VmFsdWUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1haW5Db250cm9sIHBhcmFtIHdpbGwgYmUgdXNlZCB0byB0YWtlIGluIHNwZWNOYW1lXG4gICAgLy8gaW4gdGhlIGZvcm0gb2Yga2V5IFxuICAgIC8vIHR5cGUgd2lsbCBiZSAnZm9ybSdcbiAgICAvLyBhY3RpdmUgd2lsbCBiZSB1c2VkIHRvIGFjdGl2YXRlIGRlYWN0aXZhdGUgZm9ybSBpZiBtb3JlIHRoYW4gb25lIGZvcm1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIEZvcm0gaW5wdXQgdGhhdCB0YWtlcyBpbnB1dCBmcm9tIGRpZmZlcmVudCBpbnB1dCBlbGVtZW50IFxuICAgICAqIFxuICAgICAqIEBmdW5jdGlvbiAkM0Rtb2wuVUkjRm9ybVxuICAgICAqIEBwYXJhbSB7dmFsaWRTZWxlY3Rpb25TcGVjfHZhbGlkU3R5bGVTcGVjfHZhbGlkQXRvbVNwZWN9IHNwZWNzIHRoZSBkZWZpbmF0aW9uIG9mIHNwZWMgaXMgdXNlZCBhcyBhbiBpbnB1dCB0byBnZW5lcmF0ZSB0aGUgZm9ybVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYWluQ29udHJvbCBSZWZlcmVuY2Ugb2YgdmFyaWFibGUgdG8gc3RvcmUgdGhlIHZhbHVlIGZyb20gdGhlIGZvcm1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBGb3JtKHNwZWNzLCBtYWluQ29udHJvbCkge1xuICAgICAgICBzcGVjcyA9IHNwZWNzIHx8IHt9O1xuICAgICAgICB2YXIgYm91bmRpbmdCb3ggPSB0aGlzLnVpID0gJCgnPGRpdj48L2Rpdj4nKTtcblxuICAgICAgICB2YXIgaGVhZGluZyA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgIGhlYWRpbmcudGV4dChtYWluQ29udHJvbC5rZXkpO1xuXG4gICAgICAgIC8vIFN0eWxpbmcgaGVhZGluZyBcbiAgICAgICAgaGVhZGluZy5jc3Moe1xuICAgICAgICAgICAgJ2JvcmRlci1ib3R0b20nOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICdmb250LWZhbWlseSc6ICdBcmlhbCcsXG4gICAgICAgICAgICAnZm9udC1zaXplJzogJzE0cHgnLFxuICAgICAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnLFxuICAgICAgICAgICAgJ3BhZGRpbmctdG9wJzogJzJweCcsXG4gICAgICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnNHB4J1xuICAgICAgICB9KTtcblxuICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQoaGVhZGluZyk7XG4gICAgICAgIGJvdW5kaW5nQm94LmFkZENsYXNzKCdmb3JtJyk7XG5cbiAgICAgICAgdmFyIGlucHV0cyA9IHRoaXMuaW5wdXRzID0gW107XG4gICAgICAgIC8vIGJvZHkuYXBwZW5kKGJvdW5kaW5nQm94KTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNwZWNzKTtcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChzcGVjc1trZXldLmd1aSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gbmV3IFByb3BlcnR5KGtleSwgc3BlY3Nba2V5XS50eXBlKTtcbiAgICAgICAgICAgICAgICBpbnB1dHMucHVzaChwcm9wKTtcbiAgICAgICAgICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQocHJvcC51aSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7fVxuXG4gICAgICAgIHZhciB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIH07XG5cblxuICAgICAgICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGlucHV0LnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWFpbkNvbnRyb2wudmFsdWUgPSB7fTtcblxuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBpbnB1dC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlucHV0VmFsdWUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW5Db250cm9sLnZhbHVlW2lucHV0VmFsdWUua2V5XSA9IGlucHV0VmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYWluQ29udHJvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cGRhdGVWYWx1ZXMgPSBmdW5jdGlvbiAoaW5wdXRDb250cm9sKSB7XG4gICAgICAgICAgICBtYWluQ29udHJvbC52YWx1ZVtpbnB1dENvbnRyb2wua2V5XSA9IG1haW5Db250cm9sLnZhbHVlOyAvL2NvbnRyb2wgPT9cbiAgICAgICAgICAgIHVwZGF0ZShtYWluQ29udHJvbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRpb25zID0gaW5wdXRzLm1hcCgoaSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGkuYWN0aXZlLmdldFZhbHVlKCkudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkucGxhY2Vob2xkZXIudmFsaWRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbnMuZmluZChlID0+IGUgPT0gZmFsc2UpID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IGlucHV0cy5maW5kKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmNvbnRyb2wua2V5ID09IGtleXNbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICBpbnB1dC5wbGFjZWhvbGRlci5zZXRWYWx1ZSh2YWxba2V5c1tpXV0pO1xuICAgICAgICAgICAgICAgIGlucHV0LmFjdGl2ZS5zZXRWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5wbGFjZWhvbGRlci51aS5zaG93KCk7XG4gICAgICAgICAgICAgICAgaW5wdXQuY29udHJvbC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYWluQ29udHJvbC52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKG1haW5Db250cm9sKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0SW5wdXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIFByb3BlcnR5KGtleSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRyb2wgPSB0aGlzLmNvbnRyb2wgPSB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGJvdW5kaW5nQm94ID0gdGhpcy51aSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0ge1xuICAgICAgICAgICAgICAgIHVpOiAkKCc8ZGl2PjwvZGl2PicpXG4gICAgICAgICAgICB9OyAvLyBkZWZhdWx0IHZhbHVlIGZvciB1aSBlbGVtZW50IFxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBuZXcgRm9ybS5DaGVja2JveCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtleToga2V5XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAoc3BlY3Nba2V5XS50eXBlID09ICdzdHJpbmcnIHx8IHNwZWNzW2tleV0udHlwZSA9PSAnZWxlbWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbmV3IEZvcm0uSW5wdXQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci51aS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BlY3Nba2V5XS50eXBlID09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVyID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3BlY3Nba2V5XS5taW4gIT0gdW5kZWZpbmVkICYmIHNwZWNzW2tleV0ubWF4ICE9IHVuZGVmaW5lZCAmJiBzcGVjc1trZXldLmRlZmF1bHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiggc3BlY3Nba2V5XS5taW4gJiYgc3BlY1trZXldLm1heCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wubWluID0gc3BlY3Nba2V5XS5taW47XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wubWF4ID0gc3BlY3Nba2V5XS5tYXg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wuZGVmYXVsdCA9IHNwZWNzW2tleV0uZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5zdGVwID0gc3BlY3Nba2V5XS5zdGVwIHx8ICgoY29udHJvbC5tYXggLSBjb250cm9sLm1heCkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG5ldyBGb3JtLlNsaWRlcihjb250cm9sKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbmV3IEZvcm0uSW5wdXQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIudWkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIudmFsaWRhdGVPbmx5TnVtYmVyKHNwZWNzW2tleV0uZmxvYXRUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNzW2tleV0udHlwZSA9PSAnYXJyYXlfcmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG5ldyBGb3JtLklucHV0KGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIudWkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci52YWxpZGF0ZUlucHV0UmFuZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BlY3Nba2V5XS50eXBlID09ICdjb2xvcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbmV3IEZvcm0uQ29sb3IoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWNzW2tleV0uc3BlY3RydW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci5lbmFibGVTcGVjdHJ1bSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzcGVjc1trZXldLnR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG5ldyBGb3JtLkNoZWNrYm94KGNvbnRyb2wpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNzW2tleV0udHlwZSA9PSAncHJvcGVydGllcycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbmV3IEZvcm0uSW5wdXQoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci51aS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzcGVjc1trZXldLnR5cGUgPT0gJ2NvbG9yc2NoZW1lJykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBuZXcgRm9ybS5MaXN0SW5wdXQoY29udHJvbCwgT2JqZWN0LmtleXMoJDNEbW9sLmJ1aWx0aW5Db2xvclNjaGVtZXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyLnVpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNzW2tleV0udHlwZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BlY3Nba2V5XS52YWxpZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBuZXcgRm9ybS5MaXN0SW5wdXQoY29udHJvbCwgc3BlY3Nba2V5XS52YWxpZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BlY3Nba2V5XS50eXBlID09ICdmb3JtJykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBuZXcgRm9ybShzcGVjc1trZXldLnZhbGlkSXRlbXMsIGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIudWkuYXBwZW5kKCQoJzxkaXY+PC9kaXY+JykuY3NzKCQzRG1vbC5kZWZhdWx0Q1NTLkxpbmtCcmVhaykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbmV3IEZvcm0uRW1wdHlFbGVtZW50KGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiBuZXcgRm9ybS5FbXB0eUVsZW1lbnQoY29udHJvbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlci5nZXRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8vIEFkZGluZyBhY3RpdmUgY29udHJvbCBmb3IgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyO1xuXG4gICAgICAgICAgICBpZiAodHlwZSAhPSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlci51aS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYm91bmRpbmdCb3guYXBwZW5kKHRoaXMuYWN0aXZlLnVpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZS51cGRhdGUgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICAoYy52YWx1ZSkgPyBwbGFjZWhvbGRlci51aS5zaG93KCk6IHBsYWNlaG9sZGVyLnVpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbC5hY3RpdmUgPSBjLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlci51cGRhdGUgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLmFjdGl2ZSA9IGMudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib3VuZGluZ0JveC5hcHBlbmQodGhpcy5wbGFjZWhvbGRlci51aSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyLm9uVXBkYXRlKVxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIub25VcGRhdGUodXBkYXRlVmFsdWVzKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIEZvcm07XG59KSgpOyIsIiQzRG1vbC5sYWJlbFN0eWxlcyA9IHtcbiAgcHVycGxlIDoge1xuICAgIGJhY2tncm91bmRDb2xvcjogMHg4MDAwODAsIFxuICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLjhcbiAgfSxcblxuICBtaWxrIDoge1xuICAgIGZvbnQgOiAnQXJpYWwnLFxuICAgIGZvbnRTaXplOiAxMixcbiAgICBmb250Q29sb3I6ICQzRG1vbC5odG1sQ29sb3JzWydibGFjayddLFxuICAgIGJvcmRlclRoaWNrbmVzczogMSxcbiAgICBib3JkZXJDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2F6dXJlJ10sXG4gICAgYmFja2dyb3VuZENvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1snYWxpY2VibHVlJ10sXG4gICAgYmFja2dyb3VuZE9wYWNpdHk6IDAuOVxuICB9LFxuXG4gIGJsdWUgOiB7XG4gICAgZm9udCA6ICdBcmlhbCcsXG4gICAgZm9udFNpemU6IDEyLFxuICAgIGZvbnRDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2FsaWNlYmx1ZSddLFxuICAgIGJvcmRlclRoaWNrbmVzczogMSxcbiAgICBib3JkZXJDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2Rhcmt2aW9sZXQnXSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICQzRG1vbC5odG1sQ29sb3JzWydkYXJrYmx1ZSddLFxuICAgIGJhY2tncm91bmRPcGFjaXR5OiAwLjlcbiAgfSxcblxuICBjaG9jb2xhdGUgOiB7XG4gICAgZm9udCA6ICdBcmlhbCcsXG4gICAgZm9udFNpemU6IDEyLFxuICAgIGZvbnRDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2FsaWNlYmx1ZSddLFxuICAgIGJvcmRlclRoaWNrbmVzczogMSxcbiAgICBib3JkZXJDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2Jyb3duJ10sXG4gICAgYmFja2dyb3VuZENvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1snY2hvY29sYXRlJ10sXG4gICAgYmFja2dyb3VuZE9wYWNpdHk6IDAuOVxuICB9LFxuXG4gIGxpbWUgOiB7XG4gICAgZm9udCA6ICdBcmlhbCcsXG4gICAgZm9udFNpemU6IDEyLFxuICAgIGZvbnRDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2JsYWNrJ10sXG4gICAgYm9yZGVyVGhpY2tuZXNzOiAxLFxuICAgIGJvcmRlckNvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1snbGlnaHRncmVlbiddLFxuICAgIGJhY2tncm91bmRDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2xpbWUnXSxcbiAgICBiYWNrZ3JvdW5kT3BhY2l0eTogMC45XG4gIH0sXG5cbiAgcm9zZSA6IHtcbiAgICBmb250IDogJ0FyaWFsJyxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgZm9udENvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1snYmxhY2snXSxcbiAgICBib3JkZXJUaGlja25lc3M6IDEsXG4gICAgYm9yZGVyQ29sb3I6ICQzRG1vbC5odG1sQ29sb3JzWydtaW50Y3JlYW0nXSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICQzRG1vbC5odG1sQ29sb3JzWydtaXN0eXJvc2UnXSxcbiAgICBiYWNrZ3JvdW5kT3BhY2l0eTogMC45XG4gIH0sXG5cbiAgeWVsbG93IDoge1xuXG4gICAgZm9udCA6ICdBcmlhbCcsXG4gICAgZm9udFNpemU6IDEyLFxuICAgIGZvbnRDb2xvcjogJDNEbW9sLmh0bWxDb2xvcnNbJ2JsYWNrJ10sXG4gICAgYm9yZGVyVGhpY2tuZXNzOiAxLFxuICAgIGJvcmRlckNvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1snb3JhbmdlJ10sXG4gICAgYmFja2dyb3VuZENvbG9yOiAkM0Rtb2wuaHRtbENvbG9yc1sneWVsbG93J10sXG4gICAgYmFja2dyb3VuZE9wYWNpdHk6IDAuOVxuICB9LFxuXG59O1xuXG4kM0Rtb2wubG9uZ1ByZXNzRHVyYXRpb24gPSAxNTAwO1xuXG4kM0Rtb2wuZGVmYXVsdENTUyA9IHtcbiAgTGlzdElucHV0IDoge1xuICAgIHNlbGVjdCA6IHtcbiAgICAgICd3aWR0aCcgOiAnYXV0bycsXG4gICAgICAnYm9yZGVyJyA6ICdub25lJyxcbiAgICAgICdtYXJnaW4nIDogJzBweCcsXG4gICAgICAnZm9udC1mYW1pbHknIDogJ0FyaWFsJyxcbiAgICAgICdwYWRkaW5nJyA6ICcwcHgnLFxuICAgICAgJ2hlaWdodCcgOiAnMjBweCcsXG4gICAgICAnYm9yZGVyLXJhZGl1cycgOiAnNHB4JyxcbiAgICAgICdib3gtc2l6aW5nJyA6ICdib3JkZXItYm94J1xuICAgIH1cbiAgfSxcbiAgSW5wdXQgOiB7XG4gICAgaW5wdXQgOiB7XG4gICAgICAnbWFyZ2luLWJvdHRvbScgOiAnMHB4JyxcbiAgICAgICdwYWRkaW5nJyA6ICcwcHgnLFxuICAgICAgJ2JvcmRlci1yYWRpdXMnIDogJzRweCcsXG4gICAgICAnZm9udC1mYW1pbHknIDogJ0FyaWFsJyxcbiAgICAgICd3aWR0aCcgOiAnOTYlJ1xuICAgIH0sXG5cbiAgICBib3VuZGluZ0JveCA6IHtcbiAgICAgICdtYXJnaW4tbGVmdCcgOiAnNHB4JyxcbiAgICAgICdtYXJnaW4tcmlnaHQnIDogJycsXG4gICAgfVxuICB9LFxuICBDaGVja2JveCA6IHt9LFxuICBTbGlkZXIgOiB7fSxcbiAgQ29sb3IgOiB7fSxcbiAgVGV4dERlZmF1bHQgOiB7XG4gICAgJ2ZvbnQtZmFtaWx5JyA6ICdBcmlhbCcsXG4gICAgJ21hcmdpbi1sZWZ0JyA6ICc0cHgnXG4gIH0sXG5cbiAgTGlua0JyZWFrIDoge1xuICAgICdoZWlnaHQnIDogJzNweCcsXG4gICAgJ2JvcmRlci1ib3R0b20nIDogJzFweCBzb2xpZCAjNjg3MTkzJ1xuICB9XG5cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=