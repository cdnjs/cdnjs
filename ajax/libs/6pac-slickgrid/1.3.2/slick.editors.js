(function($) {

var SlickEditor =  {

    SelectorCellFormatter : function(row, cell, value, columnDef, dataContext) {
        return (!dataContext ? "" : row);
    },

    PercentCompleteCellFormatter : function(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "")
            return "-";
        else if (value < 50)
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        else
            return "<span style='color:green'>" + value + "%</span>";
    },

    GraphicalPercentCompleteCellFormatter : function(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "")
            return "";

        var color;

        if (value < 30)
            color = "red";
        else if (value < 70)
            color = "silver";
        else
            color = "green";

        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    },

    YesNoCellFormatter : function(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    },

    BoolCellFormatter : function(row, cell, value, columnDef, dataContext) {
        return value ? "<img src='../images/tick.png'>" : "";
    },

    TaskNameFormatter : function(row, cell, value, columnDef, dataContext) {
        // todo:  html encode
        var spacer = "<span style='display:inline-block;height:1px;width:" + (2 + 15 * dataContext["indent"]) + "px'></span>";
        return spacer + " <img src='../images/expand.gif'>&nbsp;" + value;
    },

    ResourcesFormatter : function(row, cell, value, columnDef, dataContext) {
        var resources = dataContext["resources"];

        if (!resources || resources.length == 0)
            return "";

        if (columnDef.width < 50)
            return (resources.length > 1 ? "<center><img src='../images/user_identity_plus.gif' " : "<center><img src='../images/user_identity.gif' ") +
                    " title='" + resources.join(", ") + "'></center>";
        else
            return resources.join(", ");
    },

    StarFormatter : function(row, cell, value, columnDef, dataContext) {
        return (value) ? "<img src='../images/bullet_star.png' align='absmiddle'>" : "";
    },


    TextCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-text' />");

            if (value != null)
            {
                $input[0].defaultValue = value;
                $input.val(defaultValue);
            }

            $input.appendTo($container);

            $input.bind("keydown.nav", function(e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });
            
            $input.focus().select();
        };

        this.destroy = function() {
            $input.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            $input.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            return $input.val();
        };

        this.isValueChanged = function() {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function() {
            if (columnDef.validator)
            {
                var validationResults = columnDef.validator(scope.getValue());
                if (!validationResults.valid)
                    return validationResults;
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    IntegerCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-text' />");

            if (value != null)
            {
                $input[0].defaultValue = value;
                $input.val(defaultValue);
            }

            $input.bind("keydown.nav", function(e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });

            $input.appendTo($container);
            $input.focus().select();
        };


        this.destroy = function() {
            $input.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            $input.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            var val = $.trim($input.val());
            return (val == "") ? 0 : parseInt($input.val(), 10);
        };

        this.isValueChanged = function() {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function() {
            if (isNaN($input.val()))
                return {
                    valid: false,
                    msg: "Please enter a valid integer"
                };

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    DateCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-text' />");

            if (value != null)
            {
                $input[0].defaultValue = value;
                $input.val(defaultValue);
            }

            $input.appendTo($container);
            $input.focus().select();
            $input.datepicker({
                showOn: "button",
                buttonImageOnly: true,
                buttonImage: "../images/calendar.gif"
            });
            $input.width($input.width() - 18);
        };


        this.destroy = function() {
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };


        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            $input.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            return $input.val();
        };

        this.isValueChanged = function() {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    YesNoSelectCellEditor : function($container, columnDef, value, dataContext) {
        var $select;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");

            if (defaultValue)
                $select.val('yes');
            else
                $select.val('no');

            $select.appendTo($container);

            $select.focus();
        };


        this.destroy = function() {
            $select.remove();
        };


        this.focus = function() {
            $select.focus();
        };

        this.setValue = function(value) {
            $select.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            return ($select.val() == 'yes');
        };

        this.isValueChanged = function() {
            return ($select.val() != defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    YesNoCheckboxCellEditor : function($container, columnDef, value, dataContext) {
        var $select;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");

            if (defaultValue)
                $select.attr("checked", "checked");

            $select.appendTo($container);
            $select.focus();
        };


        this.destroy = function() {
            $select.remove();
        };


        this.focus = function() {
            $select.focus();
        };

        this.setValue = function(value) {
            if (value)
                $select.attr("checked", "checked");
            else
                $select.removeAttr("checked");

            defaultValue = value;
        };

        this.getValue = function() {
            return $select.attr("checked");
        };

        this.isValueChanged = function() {
            return (scope.getValue() != defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    PercentCompleteCellEditor : function($container, columnDef, value, dataContext) {
        var $input, $picker;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-percentcomplete' />");

            if (value != null)
            {
                $input[0].defaultValue = value;
                $input.val(defaultValue);
            }

            $input.width($container.innerWidth() - 25);
            $input.appendTo($container);

            $picker = $("<div class='editor-percentcomplete-picker' />").appendTo($container);

            $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

            $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

            $input.focus().select();

            $picker.find(".editor-percentcomplete-slider").slider({
                orientation: "vertical",
                range: "min",
                value: defaultValue,
                slide: function(event, ui) {
                    $input.val(ui.value)
                }
            });

            $picker.find(".editor-percentcomplete-buttons button").bind("click", function(e) {
                $input.val($(this).attr("val"));
                $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
            })
        };


        this.destroy = function() {
            $input.remove();
            $picker.remove();
        };


        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            $input.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            var val = $.trim($input.val());
            return (val == "") ? 0 : parseInt($input.val(), 10);
        };

        this.isValueChanged = function() {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function() {
            if (isNaN($input.val()))
                return {
                    valid: false,
                    msg: "Please enter a valid positive number"
                };

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    TaskNameCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = value;
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-text' />");

            if (value != null)
            {
                $input[0].defaultValue = value;
                $input.val(defaultValue);
            }

            $input.bind("keydown.nav", function(e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });
            $input.appendTo($container);
            $input.focus().select();
        };

        this.destroy = function() {
            $input.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            $input.val(value);
            defaultValue = value;
        };

        this.getValue = function() {
            return $input.val();
        };

        this.isValueChanged = function() {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function() {
            if (columnDef.validator)
            {
                var validationResults = columnDef.validator(scope.getValue());
                if (!validationResults.valid)
                    return validationResults;
            }

            if ($input.val() == "")
                return {
                    valid: false,
                    msg: "This field cannot be empty"
                };

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    ResourcesCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = [];
        var scope = this;

        this.init = function() {
            $input = $("<INPUT type=text class='editor-text' />");

            var resources = dataContext ? dataContext["resources"] : null;

            defaultValue = resources ? resources.concat() : [];

            if (resources != null)
            {
                $input[0].defaultValue = defaultValue.join(", ");
                $input.val(defaultValue.join(", "));
            }

            $input.bind("keydown.nav", function(e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });
            $input.appendTo($container);
            $input.focus().select();
        };

        this.destroy = function() {
            $input.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            defaultValue = value ? value : [];
            $input.val(defaultValue.join(", "));
        };

        this.getValue = function() {
            if ($input.val() == "")
                return [];

            var names = $input.val().split(",");

            for (var i = 0; i < names.length; i++)
                names[i] = $.trim(names[i]);

            return names;
        };

        this.isValueChanged = function() {
            // todo:  implement
            return true;
        };

        this.validate = function() {
            if (columnDef.validator)
            {
                var validationResults = columnDef.validator(scope.getValue());
                if (!validationResults.valid)
                    return validationResults;
            }

            // todo:  implement

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    },

    StarCellEditor : function($container, columnDef, value, dataContext) {
        var $input;
        var defaultValue = value;
        var scope = this;

        function toggle(e) {
            if (e.type == "keydown" && e.which != 32) return;

            if ($input.css("opacity") == "1")
                $input.css("opacity", 0.5);
            else
                $input.css("opacity", 1);

            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        this.init = function() {
            $input = $("<IMG src='../images/bullet_star.png' align=absmiddle tabIndex=0 title='Click or press Space to toggle' />");

            if (defaultValue)
                $input.css("opacity", 1);
            else
                $input.css("opacity", 0.5);

            $input.bind("click keydown", toggle);

            $input.appendTo($container);
            $input.focus();
        };

        this.destroy = function() {
            $input.unbind("click keydown", toggle);
            $input.remove();
        };

        this.focus = function() {
            $input.focus();
        };

        this.setValue = function(value) {
            defaultValue = value;

            if (defaultValue)
                $input.css("opacity", 1);
            else
                $input.css("opacity", 0.2);
        };

        this.getValue = function() {
            return $input.css("opacity") == "1";
        };

        this.isValueChanged = function() {
            return (defaultValue == true) != scope.getValue();
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
      }
  };

  $.extend(window, SlickEditor);

})(jQuery);
