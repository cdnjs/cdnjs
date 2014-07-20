<?php
	$date_format = 'Y-j-m';
	
	/**
	 * Returns an array containing a random data type and the editor
	 * associated with that type, used by the generateData function.
	 */
	function generateType($index) {
		global $date_format;
		$rand = $index === 0 ? 1 : rand(0, 4);
		
		switch ($rand) {
			case 0:
				return array('data' => 'string', 'editor' => array(
					'xtype' => 'textfield',
					'allowBlank' => false
				));
			case 1:
				return array('data' => 'int', 'editor' => array(
					'xtype' => 'numberfield',
					'minValue' => 1,
					'maxValue' => 200
				));
			case 2:
				return array('data' => 'date', 'editor' => array(
					'xtype' => 'datefield',
					'format' => $date_format
				));
			case 3:
				return array('data' => 'float', 'editor' => array(
					'xtype' => 'numberfield',
					'minValue' => 400,
					'maxValue' => 800
				));
			case 4:
				return array('data' => 'bool', 'editor' => array(
					'xtype' => 'checkbox'
				));
		}
	}
    
	/**
	 * Returns a hard-coded data value matching the type passed in.
	 */
	function getDataValue($type) {
		global $date_format;
		switch ($type['data']) {
			case 'string':
				return 'data';
			case 'int':
				return 123;
			case 'date':
				return date($date_format);
			case 'float':
				return 456.78;
			case 'bool':
				return true;
		}
		return $type;
	}
	
	/**
	 * Generates all of the test data and field/column definitions that will
	 * make up the data and metadata for this request.
	 */
    function generateData() {
		global $date_format;
	    $row_count = rand(10, 30);
		$col_count = rand(3, 7);
		$types = array();
        $data['data'] = array();
		$fields = array();
		$columns = array();
		$defineFields = true;
        
        for ($i=0; $i<$row_count; $i++) {
			
			for ($j=0; $j<$col_count; $j++) {
				// first pass through columns only, define fields and columns
				if ($defineFields) {
					// generate a random data type for the field/column
					$type = generateType($j);
					array_push($types, $type);
					
					// =====================================================================
					// define the default placeholder field definition. this fields
					// config is supported by the metachange handling in Ext by default
					// to reconfigure the data store's field definitions.
					$field = array(
						'name' => 'field-'.($j+1),
						'type' => $type['data']
					);
					// add any type-specific field attributes
					if ($type['data'] === 'date') {
						$field['dateFormat'] = $date_format;
					}
					// add the field to the fields list
					array_push($fields, $field);
					
					// =====================================================================
					// define the default placeholder column definition to match the field.
					// note that this columns block only applies to grids. in the past the 
					// fields config was reused both by the store and also by grids, but since
					// it is usually preferable to add column-specific metadata that the store
					// doesn't care about, it's usually better to split the two definitions.
					$col = array(
						'dataIndex' => 'field-'.($j+1)
					);
					// add in column-specific attributes
					if ($j === 0) {
						// special config for the id column, fixed width and non-editable
						$col['text'] = 'ID';
						$col['width'] = 40;
					}
					else {
						$col['text'] = 'Field '.($j+1).' ('.$type['data'].')';
						$col['editor'] = $type['editor'];
						$col['flex'] = 1;
					}
					// add in type-specific column attributes
					switch ($type['data']) {
						case 'date':
							$col['xtype'] = 'datecolumn';
							$col['format'] = $date_format;
							break;
						case 'float':
							$col['xtype'] = 'numbercolumn';
							$col['format'] = '$0.00';
							break;
						case 'bool':
							//$col['xtype'] = 'checkcolumn';
							break;
					}
					// finally, add the column to the columns list
					array_push($columns, $col);
				}
				
				// every row/col pass, load up some data
				$row['field-'.($j+1)] = $j == 0 ? ($i+1) : getDataValue($types[$j]);
			}
			
			// flip this flag after the first column pass since the fields are defined
			$defineFields = false;
			
			// add the row of generated data to the top-level data object
			// that will be returned in the response
			array_push($data['data'], $row);
        }
		
		// assemble the metadata
		$meta = array();
		$meta['fields'] = $fields;
		$meta['columns'] = $columns;
		$meta['root'] = 'data';
		$meta['idProperty'] = 'field-1';
		$meta['messageProperty'] = 'msg';
		
		// assemble the top-level data object being returned.
		// the data is already in $data['data'] at this point.
		$data['metaData'] = $meta;
        $data['total'] = $row_count;
		$data['msg'] = 'Success!';
		
        return $data;
    }
    
    echo json_encode(generateData());
?>