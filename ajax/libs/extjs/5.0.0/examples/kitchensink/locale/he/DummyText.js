Ext.define('KitchenSink.locale.DummyText', function() {
    var shortText = "החלה חרטומים לוח של. את חפש ליום מונחונים האנציקלופדיה. ב עמוד חינוך אדריכלות צעד. רקטות הקהילה לוח אל. או בהשחתה והגולשים בדף, של זכר הגרפים תקשורת.",
        extraText = "רבה הטבע שפות טיפול בה, של הרוח המשפט שער, קהילה לטיפול שיתופית ויש את.",
        mediumText = shortText + extraText;

    return {
        override: 'KitchenSink.DummyText',
        shortText: shortText,
        mediumText: mediumText,
        longText: mediumText + mediumText,
        extraLongText: mediumText + mediumText + mediumText
    };
}());
