/**
 * @namespace Plone CMS extender for mobilize.js
 *
 * @extends mobilize
 */
var mobilizePlone = {

	/**
	 * createNavigationBox() helper function to turn Plone news / event content 
	 * to sane jQuery Mobile mark up
	 */
	outputCollectionLink : function(list, input, a) {
	    
	    var output = jq("<li>"); 
	    
	    var heading = jq("<h3>");
	    a.appendTo(heading);
	    heading.appendTo(output);
	    
	    var info = jq('<p class="ui-li-aside">');
	    jq(input).find(".info").appendTo(info);
	    info.appendTo(output);
		
		list.append(output);
	}	
};

jq.extend(mobilize, mobilizePlone);