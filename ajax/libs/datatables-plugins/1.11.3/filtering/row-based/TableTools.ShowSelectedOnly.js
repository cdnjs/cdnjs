/**
 * Used in combination with TableTools and selectable rows, this will allow you
 * to switch between showing all rows and just the selected ones.
 *
 *  @name Show selected only
 *  @summary Show only selected rows, or all rows, through filtering
 *  @requires TableTools
 *  @author [Caleb Harrelson](http://stackoverflow.com/users/8507/phloopy)
 *
 *  @example
 *  $('#example').dataTable({
 *      "sDom": 'T<"clear">Sfrtip',
 *      "oTableTools": {
 *          "sRowSelect": "multi",
 *      },
 *      "oLanguage": {
 *          "oFilterSelectedOptions": {
 *              AllText: "All Widgets",
 *              SelectedText: "Selected Widgets"
 *          }
 *      }
 *  });
 */

(function (window, document, $, undefined) {

    $.fn.dataTable.SelectedLengthMenu = function(oSettings) {
        if (oSettings.oScroll.bInfinite) {
            return null;
        }

        /* This can be overruled by not using the _MENU_ var/macro in the language variable */
        var sName = 'name="' + oSettings.sTableId + '_length"';
        var sStdMenu = '<select size="1" ' + sName + '>';
        var i, iLen;
        var aLengthMenu = oSettings.aLengthMenu;

        if (aLengthMenu.length == 2 && typeof aLengthMenu[0] === 'object' &&
            typeof aLengthMenu[1] === 'object') {
            for (i = 0, iLen = aLengthMenu[0].length; i < iLen; i++) {
                sStdMenu += '<option value="' + aLengthMenu[0][i] + '">' + aLengthMenu[1][i] + '</option>';
            }
        } else {
            for (i = 0, iLen = aLengthMenu.length; i < iLen; i++) {
                sStdMenu += '<option value="' + aLengthMenu[i] + '">' + aLengthMenu[i] + '</option>';
            }
        }
        sStdMenu += '</select>';

        // select box to show all or only selected items
        var oFilterSelectedOptions = oSettings.oLanguage.oFilterSelectedOptions;
        if (!oFilterSelectedOptions)
            oFilterSelectedOptions = { "AllText": "All Items", "SelectedText": "Selected Items" };

        var sSelectedMenu = '<select name="' + oSettings.sTableId + '_selectedFilter">';
        if (typeof oFilterSelectedOptions === 'object') {
            sSelectedMenu += '<option value="All">' + oFilterSelectedOptions.AllText + '</option>';
            sSelectedMenu += '<option value="Selected">' + oFilterSelectedOptions.SelectedText + '</option>';
        } else {
            sSelectedMenu += '<option value="All">' + oFilterSelectedOptions[0] + '</option>';
            sSelectedMenu += '<option value="Selected">' + oFilterSelectedOptions[1] + '</option>';
        }
        sSelectedMenu += '</select>';



        var nLength = document.createElement('div');
        if (!oSettings.aanFeatures.l) {
            nLength.id = oSettings.sTableId + '_length';
        }
        nLength.className = oSettings.oClasses.sLength;
        var sLengthMenu = oSettings.oLanguage.sLengthMenu;
        if (sLengthMenu == 'Show _MENU_ entries')
            sLengthMenu = 'Show _MENU_ of _SELECTEDMENU_';

        nLength.innerHTML = '<span>' + sLengthMenu.replace('_MENU_', sStdMenu).replace('_SELECTEDMENU_', sSelectedMenu) + '</span>';

        var $lengthSelect = $('select[name="' + oSettings.sTableId + '_length"]', nLength);
        if ($lengthSelect.length == 0)
            $lengthSelect = $('select :eq(0)', nLength);
        
        /*
         * Set the length to the current display length - thanks to Andrea Pavlovic for this fix,
         * and Stefan Skopnik for fixing the fix!
         */
        $lengthSelect.find('option[value="' + oSettings._iDisplayLength + '"]', nLength).attr("selected", true);


        $lengthSelect.bind('change.DT', function(e) {
            var iVal = $(this).val();

            /* Update all other length options for the new display */
            var n = oSettings.aanFeatures.S;
            for (i = 0, iLen = n.length; i < iLen; i++) {
                if (n[i] != this.parentNode) {
                    $('select', n[i]).val(iVal);
                }
            }

            /* Redraw the table */
            oSettings._iDisplayLength = parseInt(iVal, 10);
            oSettings.oApi._fnCalculateEnd(oSettings);

            /* If we have space to show extra rows (backing up from the end point - then do so */
            if (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) {
                oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength;
                if (oSettings._iDisplayStart < 0) {
                    oSettings._iDisplayStart = 0;
                }
            }

            if (oSettings._iDisplayLength == -1) {
                oSettings._iDisplayStart = 0;
            }

            oSettings.oApi._fnDraw(oSettings);
        });


        var $filterSelectedSelect = $('select[name="' + oSettings.sTableId + '_selectedFilter"]', nLength);
        if ($filterSelectedSelect.length == 0)
            $filterSelectedSelect = $('select :eq(1)', nLength);

        $filterSelectedSelect.find('option[value="' + oSettings._sFilterSelected + '"]', nLength).attr('selected', true);

        $filterSelectedSelect.on('change', function () {
            oSettings._sFilterSelected = $(this).val();
            $('#' + oSettings.sTableId).dataTable().fnDraw();
        });
        

        $('select', nLength).attr('aria-controls', oSettings.sTableId);

        return nLength;
    };

    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var $filterSelectedSelect = $('select[name="' + oSettings.sTableId + '_selectedFilter"]');
            if ($filterSelectedSelect.length == 0)
                return true; // feature not enabled

            if ($filterSelectedSelect.val() == 'All')
                return true; // all items selected


            var oTable = $('#' + oSettings.sTableId).dataTable();
            var row = oTable.fnGetNodes(iDataIndex);
            var oTableTools = TableTools.fnGetInstance(oSettings.sTableId);
            var isSelected = oTableTools.fnIsSelected(row);

            return isSelected;
        }
    );


    // Subscribe the feature plug-in to DataTables, ready for use
    $.fn.dataTableExt.aoFeatures.push({
        "fnInit": function (oSettings) {
            return new $.fn.dataTable.SelectedLengthMenu(oSettings);
        },
        "cFeature": "O",
        "sFeature": "SelectedLengthMenu"
    });
    


})(window, document, jQuery);