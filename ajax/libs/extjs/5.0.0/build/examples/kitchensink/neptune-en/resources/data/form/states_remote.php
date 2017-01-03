<?php
// This script was created for demonstrating remote querying for the first combobox example
// in examples/form/combos.html. It doesn't take into account start or limit or any other
// querystring param, but it could be easily extended to do so.

$states = array(
    "Alabama" => array("AL", "Alabama", "The Heart of Dixie"),
    "Alaska" => array("AK", "Alaska", "The Land of the Midnight Sun"),
    "Arkansas" => array("AR", "Arkansas", "The Natural State"),
    "Arizona" => array("AZ", "Arizona", "The Grand Canyon State"),
    "California" => array("CA", "California", "The Golden State"),
    "Colorado" => array("CO", "Colorado", "The Mountain State"),
    "Connecticut" => array("CT", "Connecticut", "The Constitution State"),
    "Delaware" => array("DE", "Delaware", "The First State"),
    "Florida" => array("FL", "Florida", "The Sunshine State"),
    "Georgia" => array("GA", "Georgia", "The Peach State"),
    "Hawaii" => array("HI", "Hawaii", "The Aloha State"),
    "Idaho" => array("ID", "Idaho", "Famous Potatoes"),
    "Illinois" => array("IL", "Illinois", "The Prairie State"),
    "Indiana" => array("IN", "Indiana", "The Hospitality State"),
    "Iowa" => array("IA", "Iowa", "The Corn State"),
    "Kansas" => array("KS", "Kansas", "The Sunflower State"),
    "Kentucky" => array("KY", "Kentucky", "The Bluegrass State"),
    "Louisiana" => array("LA", "Louisiana", "The Bayou State"),
    "Maine" => array("ME", "Maine", "The Pine Tree State"),
    "Maryland" => array("MD", "Maryland", "Chesapeake State"),
    "Massachusetts" => array("MA", "Massachusetts", "The Spirit of America"),
    "Michigan" => array("MI", "Michigan", "Great Lakes State"),
    "Minnesota" => array("MN", "Minnesota", "North Star State"),
    "Mississippi" => array("MS", "Mississippi", "Magnolia State"),
    "Missouri" => array("MO", "Missouri", "Show Me State"),
    "Montana" => array("MT", "Montana", "Big Sky Country"),
    "Nebraska" => array("NE", "Nebraska", "Beef State"),
    "Nevada" => array("NV", "Nevada", "Silver State"),
    "New Hampshire" => array("NH", "New Hampshire", "Granite State"),
    "New Jersey" => array("NJ", "New Jersey", "Garden State"),
    "New Mexico" => array("NM", "New Mexico", "Land of Enchantment"),
    "New York" => array("NY", "New York", "Empire State"),
    "North Carolina" => array("NC", "North Carolina", "First in Freedom"),
    "North Dakota" => array("ND", "North Dakota", "Peace Garden State"),
    "Ohio" => array("OH", "Ohio", "The Heart of it All"),
    "Oklahoma" => array("OK", "Oklahoma", "Oklahoma is OK"),
    "Oregon" => array("OR", "Oregon", "Pacific Wonderland"),
    "Pennsylvania" => array("PA", "Pennsylvania", "Keystone State"),
    "Rhode Island" => array("RI", "Rhode Island", "Ocean State"),
    "South Carolina" => array("SC", "South Carolina", "Nothing Could be Finer"),
    "South Dakota" => array("SD", "South Dakota", "Great Faces, Great Places"),
    "Tennessee" => array("TN", "Tennessee", "Volunteer State"),
    "Texas" => array("TX", "Texas", "Lone Star State"),
    "Utah" => array("UT", "Utah", "Salt Lake State"),
    "Vermont" => array("VT", "Vermont", "Green Mountain State"),
    "Virginia" => array("VA", "Virginia", "Mother of States"),
    "Washington" => array("WA", "Washington", "Green Tree State"),
    "West Virginia" => array("WV", "West Virginia", "Mountain State"),
    "Wisconsin" => array("WI", "Wisconsin", "America's Dairyland")
);

$query = '/^' . $_GET['q'] . '/i';
$found = array();

function filter_states($val, $i) {
    if (preg_match($GLOBALS['query'], $i)) {
        array_push($GLOBALS['found'], $GLOBALS['states'][$i]);
    }
}

array_walk($states, "filter_states");

echo json_encode(array(
    "total" => count($found),
    "data" => $found
));

?>
