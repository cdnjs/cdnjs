/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Highlight keywords feature v1.2
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
-------------------------------------------------------------------------*/

TF.prototype.UnhighlightAll = function()
/*====================================================
	- removes keyword highlighting
=====================================================*/
{
	if( this.highlightKeywords && this.searchArgs!=null ){
		for(var y=0; y<this.searchArgs.length; y++){
			tf_UnhighlightWord(this, this.searchArgs[y], this.highlightCssClass);
		}
		this.highlightedNodes = [];
	}
}

function tf_HighlightWord( node,word,cssClass,o )
/*====================================================
	- highlights keyword found in passed node
	- accepts the following params:
		- node
		- word to search
		- css class name for highlighting
=====================================================*/
{
	// Iterate into this nodes childNodes
	if(node.hasChildNodes) 
		for( var i=0; i<node.childNodes.length; i++ )
			tf_HighlightWord(node.childNodes[i],word,cssClass,o);

	// And do this node itself
	if(node.nodeType == 3) 
	{ // text node
		var tempNodeVal = node.nodeValue.tf_LCase();
		var tempWordVal = word.tf_LCase();
		if(tempNodeVal.indexOf(tempWordVal) != -1) 
		{
			var pn = node.parentNode;
			if(pn && pn.className != cssClass) 
			{
				// word has not already been highlighted!
				var nv = node.nodeValue;
				var ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				var before = tf_CreateText(nv.substr(0,ni));
				var docWordVal = nv.substr(ni,word.length);
				var after = tf_CreateText(nv.substr(ni+word.length));
				var hiwordtext = tf_CreateText(docWordVal);
				var hiword = tf_CreateElm('span');
				hiword.className = cssClass;
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
				o.highlightedNodes.push(hiword.firstChild);
			}
		}
	}// if node.nodeType == 3
}

function tf_UnhighlightWord( o,word,cssClass )
/*====================================================
	- removes highlights found in passed node
	- accepts the following params:
		- node
		- word to search
		- css class name for highlighting
=====================================================*/
{
	var arrRemove = [];
	for(var i=0; i<o.highlightedNodes.length; i++){
		var n = o.highlightedNodes[i];
		if(!n){ continue; }
		var tempNodeVal = n.nodeValue.tf_LCase();
		var tempWordVal = word.tf_LCase();	
		if(tempNodeVal.indexOf(tempWordVal) != -1){
			var pn = n.parentNode;
			if(pn && pn.className == cssClass){
				var prevSib = pn.previousSibling;
				var nextSib = pn.nextSibling;
				if(!prevSib || !nextSib){ continue; } 
				nextSib.nodeValue = prevSib.nodeValue + n.nodeValue + nextSib.nodeValue;
				prevSib.nodeValue = '';
				n.nodeValue = '';
				arrRemove.push(i);
			}
		}
	}
	for(var k=0; k<arrRemove.length; k++){
		o.highlightedNodes.splice(arrRemove[k], 1);
	}
}