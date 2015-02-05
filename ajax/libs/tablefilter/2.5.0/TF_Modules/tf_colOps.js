/*------------------------------------------------------------------------
	- HTML Table Filter Generator 
	- Columns Operations feature v1.0
	- By Max Guglielmi (tablefilter.free.fr)
	- Licensed under the MIT License
	- Special credit to Nuovella Williams
-------------------------------------------------------------------------*/

TF.prototype.SetColOperation = function()
/*====================================================
	- Calculates values of a column
	- params are stored in 'colOperation' table's
	attribute
		- colOperation['id'] contains ids of elements 
		showing result (array)
		- colOperation['col'] contains index of 
		columns (array)
		- colOperation['operation'] contains operation
		type (array, values: sum, mean)
		- colOperation['write_method'] array defines 
		which method to use for displaying the 
		result (innerHTML, setValue, createTextNode).
		Note that innerHTML is the default value.
		- colOperation['tot_row_index'] defines in 
		which row results are displayed (integers array)
		
	- changes made by nuovella: 
	(1) optimized the routine (now it will only 
	process each column once),
	(2) added calculations for the median, lower and 
	upper quartile.
=====================================================*/
{
	if( !this.isFirstLoad && !this.hasGrid ) return;
	
	if(this.onBeforeOperation) this.onBeforeOperation.call(null,this);
	
	var labelId = this.colOperation['id'];
	var colIndex = this.colOperation['col'];
	var operation = this.colOperation['operation'];
	var outputType = this.colOperation['write_method'];
	var totRowIndex = this.colOperation['tot_row_index'];
	var excludeRow = this.colOperation['exclude_row'];
	var decimalPrecision = this.colOperation['decimal_precision']!=undefined
							? this.colOperation['decimal_precision'] : 2;
	
	//nuovella: determine unique list of columns to operate on
	var ucolIndex =[]; 
	var ucolMax=0;
	
	ucolIndex[ucolMax]=colIndex[0];
	
	for(var i=1; i<colIndex.length; i++)
	{
		saved=0;
		//see if colIndex[i] is already in the list of unique indexes
		for(var j=0; j<=ucolMax; j++ )
		{
			if (ucolIndex[j]==colIndex[i])
				saved=1;
		}
		if (saved==0)
		{//if not saved then, save the index;
			ucolMax++;
			ucolIndex[ucolMax]=colIndex[i];
		}
	}// for i
	
	if( (typeof labelId).tf_LCase()=='object' 
		&& (typeof colIndex).tf_LCase()=='object' 
		&& (typeof operation).tf_LCase()=='object' )
	{
		var row = this.tbl.rows;
		var colvalues = [];
		
		for(var ucol=0; ucol<=ucolMax; ucol++)
		{
			//this retrieves col values 
			//use ucolIndex because we only want to pass through this loop once for each column
			//get the values in this unique column
			colvalues.push( this.GetColValues(ucolIndex[ucol],true,excludeRow) );
			
		   //next: calculate all operations for this column
		   var result, nbvalues=0,  temp;
		   var meanValue=0, sumValue=0, minValue=null, maxValue=null, q1Value=null, medValue=null, q3Value=null;
		   var meanFlag=0, sumFlag=0, minFlag=0, maxFlag=0, q1Flag=0, medFlag=0, q3Flag=0;
		   var theList=[];
		   var opsThisCol=[], decThisCol=[], labThisCol=[], oTypeThisCol=[];
		   var mThisCol=-1;
			
			for(var i=0; i<colIndex.length; i++)
			{
				 if (colIndex[i]==ucolIndex[ucol])
				 {
					mThisCol++;
					opsThisCol[mThisCol]=operation[i].tf_LCase();
					decThisCol[mThisCol]=decimalPrecision[i];
					labThisCol[mThisCol]=labelId[i]; 
					oTypeThisCol = (outputType != undefined && (typeof outputType).tf_LCase()=='object') 
										? outputType[i] : null;
					
					switch( opsThisCol[mThisCol] )
					{			
						case 'mean':
							meanFlag=1;
						break;
						case 'sum':
							sumFlag=1;
						break;
						case 'min':
							minFlag=1;
						break;
						case 'max':
							maxFlag=1;
						break;
						case 'median':
							medFlag=1;	
							break;
						case 'q1':
							q1Flag=1;
						break;
						case 'q3':
							q3Flag=1;
						break;
					}
				}		
			}
			
			for(var j=0; j<colvalues[ucol].length; j++ )
			{
				if ((q1Flag==1)||(q3Flag==1) || (medFlag==1))
				{//sort the list for calculation of median and quartiles
					if (j<colvalues[ucol].length -1)
					{
						for(k=j+1;k<colvalues[ucol].length; k++) {
			  
							if( eval(colvalues[ucol][k]) < eval(colvalues[ucol][j]))
							{
								temp = colvalues[ucol][j];            
								colvalues[ucol][j] = colvalues[ucol][k];              
								colvalues[ucol][k] = temp;            
							}
						}
					}
				}
				var cvalue = parseFloat(colvalues[ucol][j]);
				theList[j]=parseFloat( cvalue );

				if( !isNaN(cvalue) )
				{
					nbvalues++;
					if ((sumFlag==1)|| (meanFlag==1)) sumValue += parseFloat( cvalue );
					if (minFlag==1) 
					{
						if (minValue==null)
						{
							minValue = parseFloat( cvalue );
						}
						else minValue= parseFloat( cvalue )<minValue? parseFloat( cvalue ): minValue;
					}
					if (maxFlag==1) {
						if (maxValue==null)
						{maxValue = parseFloat( cvalue );}
					else {maxValue= parseFloat( cvalue )>maxValue? parseFloat( cvalue ): maxValue;}
					}
				}
			}//for j
			if (meanFlag==1) meanValue = sumValue/nbvalues;
			if (medFlag==1)
			{
					var aux = 0;
					if(nbvalues%2 == 1) 
					{
						aux = Math.floor(nbvalues/2);
						medValue = theList[aux];   
					}
				else medValue = (theList[nbvalues/2]+theList[((nbvalues/2)-1)])/2;
			}
			if (q1Flag==1)
			{	
				var posa=0.0;
				posa = Math.floor(nbvalues/4);
				if (4*posa == nbvalues) {q1Value = (theList[posa-1] + theList[posa])/2;}
				else {q1Value = theList[posa];}
			}
			if (q3Flag==1)
			{
				var posa=0.0;
				var posb=0.0;
				posa = Math.floor(nbvalues/4);
				if (4*posa == nbvalues)
				{
					posb = 3*posa;
					q3Value = (theList[posb] + theList[posb-1])/2;  
				}
				else
					q3Value = theList[nbvalues-posa-1];
			}
			
			for(var i=0; i<=mThisCol; i++ )
			{
			   switch( opsThisCol[i] )
			   {			
					case 'mean':
						result=meanValue;
					break;
					case 'sum':
						result=sumValue;
					break;
					case 'min':
						result=minValue;
					break;
					case 'max':
						result=maxValue;
					break;
					case 'median':
						result=medValue;	
						break;
					case 'q1':
						result=q1Value;
					break;
					case 'q3':
						result=q3Value;
					break;
			  }		
				
			var precision = decThisCol[i]!=undefined && !isNaN( decThisCol[i] )
								? decThisCol[i] : 2;

			if(oTypeThisCol!=null && result)
			{//if outputType is defined
				result = result.toFixed( precision );
				if( tf_Id( labThisCol[i] )!=undefined )
				{
					switch( oTypeThisCol.tf_LCase() )
					{
						case 'innerhtml':							
							if (isNaN(result) || !isFinite(result) || (nbvalues==0)) 
								tf_Id( labThisCol[i] ).innerHTML = '.';
							else
								tf_Id( labThisCol[i] ).innerHTML = result;
						break;
						case 'setvalue':
							tf_Id( labThisCol[i] ).value = result;
						break;
						case 'createtextnode':
							var oldnode = tf_Id( labThisCol[i] ).firstChild;
							var txtnode = tf_CreateText( result );
							tf_Id( labThisCol[i] ).replaceChild( txtnode,oldnode );
						break;
					}//switch
				}
			} else {
				try
				{      
					if (isNaN(result) || !isFinite(result) || (nbvalues==0)) 
						tf_Id( labThisCol[i] ).innerHTML = '.';
					else
						 tf_Id( labThisCol[i] ).innerHTML = result.toFixed( precision );
				} catch(e){ }//catch
			}//else
		 }//for i
		//eventual row(s) with result are always visible
		if(totRowIndex!=undefined && row[totRowIndex[ucol]]) 
			row[totRowIndex[ucol]].style.display = '';
		}//for ucol
	}//if typeof
	
	if(this.onAfterOperation) this.onAfterOperation.call(null,this);
}

