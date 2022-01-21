/**
 * jQuery DataTables jPaginator plugin v1.0 - integration between DataTables and
 * jPaginator
 * by Ernani Azevedo <azevedo@intellinews.com.br>
 *
 * You'll need jQuery DataTables (http://datatables.net/) and jPaginator
 * (http://remylab.github.com/jpaginator/) loaded before load this one.
 *
 * See:
 * https://github.com/ernaniaz/dataTables-jPaginator/blob/master/dataTables.jPaginator.js
 *
 *  @license MIT
 *  @example
 *   // Initialise DataTables with jPaginator paging
 *   $('#example').dataTable ( {
 *     'sPaginationType': 'jPaginator'
 *   } );
 */

// API method to get paging information (Got idea from Twitter Bootstrap plugin):
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings)
{
  if ( oSettings)
  {
    return {
      "iStart":         oSettings._iDisplayStart,
      "iEnd":           oSettings.fnDisplayEnd (),
      "iLength":        oSettings._iDisplayLength,
      "iTotal":         oSettings.fnRecordsTotal (),
      "iFilteredTotal": oSettings.fnRecordsDisplay (),
      "iPage":          Math.ceil ( oSettings._iDisplayStart / oSettings._iDisplayLength),
      "iTotalPages":    Math.ceil ( oSettings.fnRecordsDisplay () / oSettings._iDisplayLength)};
  } else {
    return {
      "iStart": 0,          
      "iEnd": 0,        
      "iLength": 0,
      "iTotal": 0,      
      "iFilteredTotal": 0,
      "iPage": 0,
      "iTotalPages": 0
    }
  }
};

// Extends DataTable to support jPaginator pagination style:
$.fn.dataTableExt.oPagination.jPaginator = {
  'paginator': $('<span>').html ( '<nav id="m_left"></nav><nav id="o_left"></nav><div class="paginator_p_wrap"><div class="paginator_p_bloc"><!--<a class="paginator_p"></a>--></div></div><nav id="o_right"></nav><nav id="m_right"></nav><div class="paginator_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><a class="ui-slider-handle ui-state-default ui-corner-all" href="#"></a></div>'),
  'fnInit': function ( oSettings, nPaging, fnCallbackDraw) {
    $(nPaging).prepend ( this.paginator);
    $(this.paginator).jPaginator ( {
      selectedPage: 1,
      nbPages: 1,
      nbVisible: 6,
      overBtnLeft: '#o_left',
      overBtnRight: '#o_right',
      maxBtnLeft: '#m_left',
      maxBtnRight: '#m_right',
      minSlidesForSlider: 2,
      onPageClicked: function ( a, num) {
        if ( num - 1 == Math.ceil ( oSettings._iDisplayStart / oSettings._iDisplayLength)) {
          return;
        }
        oSettings._iDisplayStart = ( num - 1) * oSettings._iDisplayLength;
        fnCallbackDraw ( oSettings);
      }
    }).addClass ( 'jPaginator');
  },
  'fnUpdate': function ( oSettings, fnCallbackDraw) {
    if ( ! oSettings.aanFeatures.p) {
      return;
    }
    var oPaging = oSettings.oInstance.fnPagingInfo ();
    $(this.paginator).trigger ( 'reset', { nbVisible: 6, selectedPage: oPaging.iPage + 1, nbPages: oPaging.iTotalPages});
  }
};
