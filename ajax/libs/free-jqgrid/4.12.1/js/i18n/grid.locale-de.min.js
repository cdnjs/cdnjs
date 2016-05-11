/*
 jqGrid German Translation
 Version 1.0.0 (developed for jQuery Grid 3.3.1)
 Olaf Klöppel opensource@blue-hit.de
 http://blue-hit.de/

 Updated for jqGrid 3.8
 Andreas Flack
 http://www.contentcontrol-berlin.de

 Updated for jQuery 4.4 and for 4.8 by
 Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 the format corresponds now the format from
 https://github.com/jquery/globalize/blob/master/lib/cultures/globalize.culture.de.js

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?a(require("jquery")):a(jQuery)})(function(a){var b={isRTL:!1,defaults:{recordtext:"Zeige {0} - {1} von {2}",emptyrecords:"Keine Datensätze vorhanden",loadtext:"Ladevorgang...",pgtext:"Seite {0} von {1}",pgfirst:"Erste Seite",pglast:"Letzte Seite",pgnext:"Nächste Seite",pgprev:"Vorherige Seite",pgrecs:"Datensätze pro Seite",showhide:"Tabelle auf- oder zuklappen",savetext:"Wird gespeichert..."},search:{caption:"Suche...",
Find:"Suchen",Reset:"Zurücksetzen",odata:[{oper:"eq",text:"gleich"},{oper:"ne",text:"ungleich"},{oper:"lt",text:"kleiner"},{oper:"le",text:"kleiner gleich"},{oper:"gt",text:"größer"},{oper:"ge",text:"größer gleich"},{oper:"bw",text:"beginnt mit"},{oper:"bn",text:"beginnt nicht mit"},{oper:"in",text:"ist in"},{oper:"ni",text:"ist nicht in"},{oper:"ew",text:"endet mit"},{oper:"en",text:"endet nicht mit"},{oper:"cn",text:"enthält"},{oper:"nc",text:"enthält nicht"},{oper:"nu",text:"ist Null"},{oper:"nn",
text:"ist nicht Null"}],groupOps:[{op:"AND",text:"alle"},{op:"OR",text:"mindestens eine"}],addGroupTitle:"Gruppe hinzufügen",deleteGroupTitle:"Gruppe löschen",addRuleTitle:"Regel hinzufügen",deleteRuleTitle:"Regel löschen",operandTitle:"Klicken Sie, um die Suchoperation zu wählen.",resetTitle:"Suchwert zurücksetzen"},edit:{addCaption:"Datensatz hinzufügen",editCaption:"Datensatz bearbeiten",bSubmit:"Speichern",bCancel:"Abbrechen",bClose:"Schließen",saveData:"Daten wurden geändert! Änderungen speichern?",
bYes:"ja",bNo:"nein",bExit:"abbrechen",msg:{required:"Feld ist erforderlich",number:"Bitte geben Sie eine Zahl ein",minValue:"Wert muss größer oder gleich sein, als ",maxValue:"Wert muss kleiner oder gleich sein, als ",email:"ist keine gültige E-Mail-Adresse",integer:"Bitte geben Sie eine Ganzzahl ein",date:"Bitte geben Sie ein gültiges Datum ein",url:"ist keine gültige URL. Präfix muss eingegeben werden ('http://' oder 'https://')",nodefined:" ist nicht definiert!",novalue:" Rückgabewert ist erforderlich!",
customarray:"Benutzerdefinierte Funktion sollte ein Array zurückgeben!",customfcheck:"Benutzerdefinierte Funktion sollte im Falle der benutzerdefinierten Überprüfung vorhanden sein!"}},view:{caption:"Datensatz anzeigen",bClose:"Schließen"},del:{caption:"Löschen",msg:"Ausgewählte Datensätze löschen?",bSubmit:"Löschen",bCancel:"Abbrechen"},nav:{edittext:"",edittitle:"Ausgewählte Zeile bearbeiten",addtext:"",addtitle:"Neue Zeile einfügen",deltext:"",deltitle:"Ausgewählte Zeile löschen",searchtext:"",
searchtitle:"Datensatz suchen",refreshtext:"",refreshtitle:"Tabelle neu laden",alertcap:"Warnung",alerttext:"Bitte Zeile auswählen",viewtext:"",viewtitle:"Ausgewählte Zeile anzeigen",savetext:"",savetitle:"Änderungen speichern",canceltext:"",canceltitle:"Bearbeitung der Zeile abbrechen"},col:{caption:"Spalten auswählen",bSubmit:"Speichern",bCancel:"Abbrechen"},errors:{errcap:"Fehler",nourl:"Keine URL angegeben",norecords:"Keine Datensätze zu bearbeiten",model:"colNames und colModel sind unterschiedlich lang!"},
formatter:{integer:{thousandsSeparator:".",defaultValue:"0"},number:{decimalSeparator:",",thousandsSeparator:".",decimalPlaces:2,defaultValue:"0,00"},currency:{decimalSeparator:",",thousandsSeparator:".",decimalPlaces:2,prefix:"",suffix:" €",defaultValue:"0,00"},date:{dayNames:"So Mo Di Mi Do Fr Sa Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" "),monthNames:"Jan Feb Mar Apr Mai Jun Jul Aug Sep Okt Nov Dez Januar Februar März April Mai Juni Juli August September Oktober November Dezember".split(" "),
AmPm:["","","",""],S:function(){return"."},srcformat:"Y-m-d",newformat:"d.m.Y",masks:{ShortDate:"d.m.Y",LongDate:"l, j. F Y",FullDateTime:"l, j. F Y H:i:s",MonthDay:"d F",ShortTime:"H:i",LongTime:"H:i:s",YearMonth:"F Y"}}}};a.jgrid=a.jgrid||{};a.extend(!0,a.jgrid,{defaults:{locale:"de-DE"},locales:{de:a.extend({},b,{name:"Deutsch",nameEnglish:"German"}),"de-DE":a.extend({},b,{name:"Deutsch (Deutschland)",nameEnglish:"German (Germany)"})}})});
//# sourceMappingURL=grid.locale-de.min.map
