/**
 * German Translation / Deutsche Übersetzung
 * @author JPG & Mace <dev@flying-datacenter.de>
 * @author tora60 from pragmaMx.org
 * @author Timo-Linde <info@timo-linde.de>
 * @author OSWorX <https://osworx.net>
 * @author Maximilian Schwarz <info@deefuse.de>
 * @author SF Webdesign <webdesign@stephan-frank.de>
 * @version 2019-12-13
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['elfinder'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('elfinder'));
	} else {
		factory(root.elFinder);
	}
}(this, function(elFinder) {
	elFinder.prototype.i18.de = {
		translator : 'JPG & Mace &lt;dev@flying-datacenter.de&gt;, tora60 from pragmaMx.org, Timo-Linde &lt;info@timo-linde.de&gt;, OSWorX &lt;info@osworx.net&gt;, Maximilian Schwarz &lt;info@deefuse.de&gt;, SF Webdesign &lt;webdesign@stephan-frank.de&gt;',
		language   : 'Deutsch',
		direction  : 'ltr',
		dateFormat : 'j. F Y H:i', // 3. März 2020 14:58
		fancyDateFormat : '$1 H:i', // will produce smth like: Today 12:25 PM
		nonameDateFormat : 'ymd-His', // to apply if upload file is noname: 120513172700
		messages : {

			/********************************** errors **********************************/
			'error'                : 'Fehler',
			'errUnknown'           : 'Unbekannter Fehler.',
			'errUnknownCmd'        : 'Unbekannter Befehl.',
			'errJqui'              : 'Ungültige jQuery UI-Konfiguration. Die Komponenten Selectable, Draggable und Droppable müssen inkludiert sein.',
			'errNode'              : 'Für elFinder muss das DOM-Element erstellt werden.',
			'errURL'               : 'Ungültige elFinder-Konfiguration! Die URL-Option ist nicht gesetzt.',
			'errAccess'            : 'Zugriff verweigert.',
			'errConnect'           : 'Verbindung zum Backend fehlgeschlagen.',
			'errAbort'             : 'Verbindung abgebrochen.',
			'errTimeout'           : 'Zeitüberschreitung der Verbindung.',
			'errNotFound'          : 'Backend nicht gefunden.',
			'errResponse'          : 'Ungültige Backend-Antwort.',
			'errConf'              : 'Ungültige Backend-Konfiguration.',
			'errJSON'              : 'PHP JSON-Modul nicht vorhanden.',
			'errNoVolumes'         : 'Keine lesbaren Laufwerke vorhanden.',
			'errCmdParams'         : 'Ungültige Parameter für Befehl: "$1".',
			'errDataNotJSON'       : 'Daten nicht im JSON-Format.',
			'errDataEmpty'         : 'Daten sind leer.',
			'errCmdReq'            : 'Backend-Anfrage benötigt Befehl.',
			'errOpen'              : 'Kann "$1" nicht öffnen.',
			'errNotFolder'         : 'Objekt ist kein Ordner.',
			'errNotFile'           : 'Objekt ist keine Datei.',
			'errRead'              : 'Kann "$1" nicht öffnen.',
			'errWrite'             : 'Kann nicht in "$1" schreiben.',
			'errPerm'              : 'Zugriff verweigert.',
			'errLocked'            : '"$1" ist gesperrt und kann nicht umbenannt, verschoben oder gelöscht werden.',
			'errExists'            : 'Die Datei "$1" existiert bereits.',
			'errInvName'           : 'Ungültiger Dateiname.',
			'errInvDirname'        : 'Ungültiger Ordnername.',  // from v2.1.24 added 12.4.2017
			'errFolderNotFound'    : 'Ordner nicht gefunden.',
			'errFileNotFound'      : 'Datei nicht gefunden.',
			'errTrgFolderNotFound' : 'Zielordner "$1" nicht gefunden.',
			'errPopup'             : 'Der Browser hat das Pop-Up-Fenster unterbunden. Um die Datei zu öffnen, Pop-Ups in den Browsereinstellungen aktivieren.',
			'errMkdir'             : 'Kann Ordner "$1" nicht erstellen.',
			'errMkfile'            : 'Kann Datei "$1" nicht erstellen.',
			'errRename'            : 'Kann "$1" nicht umbenennen.',
			'errCopyFrom'          : 'Kopieren von Dateien von "$1" nicht erlaubt.',
			'errCopyTo'            : 'Kopieren von Dateien nach "$1" nicht erlaubt.',
			'errMkOutLink'         : 'Der Link kann nicht außerhalb der Partition führen.', // from v2.1 added 03.10.2015
			'errUpload'            : 'Upload-Fehler.',  // old name - errUploadCommon
			'errUploadFile'        : 'Kann "$1" nicht hochladen.', // old name - errUpload
			'errUploadNoFiles'     : 'Keine Dateien zum Hochladen gefunden.',
			'errUploadTotalSize'   : 'Gesamtgröße überschreitet die Maximalgröße.', // old name - errMaxSize
			'errUploadFileSize'    : 'Die Datei überschreitet die Maximalgröße.', //  old name - errFileMaxSize
			'errUploadMime'        : 'Dateiart (mime) nicht zulässig.',
			'errUploadTransfer'    : '"$1" Übertragungsfehler.',
			'errUploadTemp'        : 'Kann temporäre Datei nicht erstellen.', // from v2.1 added 26.09.2015
			'errNotReplace'        : 'Das Objekt "$1" existiert bereits an dieser Stelle und kann nicht durch ein Objekt eines anderen Typs ersetzt werden.', // new
			'errReplace'           : 'Kann "$1" nicht ersetzen.',
			'errSave'              : 'Kann "$1" nicht speichern.',
			'errCopy'              : 'Kann "$1" nicht kopieren.',
			'errMove'              : 'Kann "$1" nicht verschieben.',
			'errCopyInItself'      : '"$1" kann sich nicht in sich selbst kopieren.',
			'errRm'                : 'Kann "$1" nicht entfernen.',
			'errTrash'             : 'Kann Objekt nicht in Mülleimer legen.', // from v2.1.24 added 30.4.2017
			'errRmSrc'             : 'Kann Quelldatei(en) nicht entfernen.',
			'errExtract'           : 'Kann "$1" nicht entpacken.',
			'errArchive'           : 'Archiv konnte nicht erstellt werden.',
			'errArcType'           : 'Archivtyp nicht untersützt.',
			'errNoArchive'         : 'Bei der Datei handelt es sich nicht um ein Archiv, oder die Archivart wird nicht unterstützt.',
			'errCmdNoSupport'      : 'Das Backend unterstützt diesen Befehl nicht.',
			'errReplByChild'       : 'Der Ordner "$1" kann nicht durch etwas ersetzt werden, das ihn selbst enthält.',
			'errArcSymlinks'       : 'Aus Sicherheitsgründen ist es verboten, ein Archiv mit symbolischen Links zu extrahieren.', // edited 24.06.2012
			'errArcMaxSize'        : 'Die Archivdateien übersteigen die maximal erlaubte Größe.',
			'errResize'            : 'Größe von "$1" kann nicht geändert werden.',
			'errResizeDegree'      : 'Ungültiger Rotationswert.',  // added 7.3.2013
			'errResizeRotate'      : 'Bild konnte nicht gedreht werden.',  // added 7.3.2013
			'errResizeSize'        : 'Ungültige Bildgröße.',  // added 7.3.2013
			'errResizeNoChange'    : 'Bildmaße nicht geändert.',  // added 7.3.2013
			'errUsupportType'      : 'Nicht unterstützte Dateiart.',
			'errNotUTF8Content'    : 'Die Datei "$1" ist nicht im UTF-8-Format und kann nicht bearbeitet werden.',  // added 9.11.2011
			'errNetMount'          : 'Verbindung mit "$1" nicht möglich.', // added 17.04.2012
			'errNetMountNoDriver'  : 'Nicht unterstütztes Protokoll.',     // added 17.04.2012
			'errNetMountFailed'    : 'Verbindung fehlgeschlagen.',         // added 17.04.2012
			'errNetMountHostReq'   : 'Host benötigt.', // added 18.04.2012
			'errSessionExpires'    : 'Diese Sitzung ist aufgrund von Inaktivität abgelaufen.',
			'errCreatingTempDir'   : 'Erstellung des temporären Ordners nicht möglich: "$1"',
			'errFtpDownloadFile'   : 'Download der Datei über FTP nicht möglich: "$1"',
			'errFtpUploadFile'     : 'Upload der Datei zu FTP nicht möglich: "$1"',
			'errFtpMkdir'          : 'Erstellung des Remote-Ordners mit FTP nicht möglich: "$1"',
			'errArchiveExec'       : 'Fehler beim Archivieren der Dateien: "$1"',
			'errExtractExec'       : 'Fehler beim Extrahieren der Dateien: "$1"',
			'errNetUnMount'        : 'Kann nicht ausgehängt werden.', // from v2.1 added 30.04.2012
			'errConvUTF8'          : 'Kann nicht zu UTF-8 konvertiert werden.', // from v2.1 added 08.04.2014
			'errFolderUpload'      : 'Ordner kann nich hochladen werden, eventuell mit Google Chrome versuchen.', // from v2.1 added 26.6.2015
			'errSearchTimeout'     : 'Zeitüberschreitung während der Suche nach "$1". Suchergebnis ist unvollständig.', // from v2.1 added 12.1.2016
			'errReauthRequire'     : 'Erneutes Anmelden ist erforderlich.', // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : 'Die maximale Anzahl auswählbarer Elemente ist $1', // from v2.1.17 added 17.10.2016
			'errRestore'           : 'Datei konnte nicht aus Mülleimer wieder hergestellt werden bzw. Ziel für Wiederherstellung nicht gefunden.', // from v2.1.24 added 3.5.2017
			'errEditorNotFound'    : 'Kein Editor für diesen Dateityp gefunden.', // from v2.1.25 added 23.5.2017
			'errServerError'       : 'Ein serverseitiger Fehler trat auf.', // from v2.1.25 added 16.6.2017
			'errEmpty'             : 'Konnte Ordner "$1" nicht Leeren.', // from v2.1.25 added 22.6.2017
			'moreErrors'           : 'Es sind noch $1 weitere Fehler.', // from v2.1.44 added 13.12.2019

			/******************************* commands names ********************************/
			'cmdarchive'   : 'Archiv erstellen',
			'cmdback'      : 'Zurück',
			'cmdcopy'      : 'Kopieren',
			'cmdcut'       : 'Ausschneiden',
			'cmddownload'  : 'Herunterladen',
			'cmdduplicate' : 'Duplizieren',
			'cmdedit'      : 'Datei bearbeiten',
			'cmdextract'   : 'Archiv entpacken',
			'cmdforward'   : 'Vorwärts',
			'cmdgetfile'   : 'Datei auswählen',
			'cmdhelp'      : 'Über diese Software',
			'cmdhome'      : 'Startordner',
			'cmdinfo'      : 'Informationen',
			'cmdmkdir'     : 'Neuer Ordner',
			'cmdmkdirin'   : 'In neuen Ordner', // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : 'Neuer Datei',
			'cmdopen'      : 'Öffnen',
			'cmdpaste'     : 'Einfügen',
			'cmdquicklook' : 'Vorschau',
			'cmdreload'    : 'Aktualisieren',
			'cmdrename'    : 'Umbenennen',
			'cmdrm'        : 'Löschen',
			'cmdtrash'     : 'In den Mülleimer legen', //from v2.1.24 added 29.4.2017
			'cmdrestore'   : 'Wiederherstellen', //from v2.1.24 added 3.5.2017
			'cmdsearch'    : 'Suchen',
			'cmdup'        : 'In übergeordneten Ordner wechseln',
			'cmdupload'    : 'Datei hochladen',
			'cmdview'      : 'Ansehen',
			'cmdresize'    : 'Größe ändern & drehen',
			'cmdsort'      : 'Sortieren',
			'cmdnetmount'  : 'Verbinde mit Netzwerkspeicher', // added 18.04.2012
			'cmdnetunmount': 'Abhängen', // from v2.1 added 30.04.2012
			'cmdplaces'    : 'Favoriten', // added 28.12.2014
			'cmdchmod'     : 'Berechtigung ändern', // from v2.1 added 20.6.2015
			'cmdopendir'   : 'Einen Ordner öffnen', // from v2.1 added 13.1.2016
			'cmdcolwidth'  : 'Spaltenbreite zurücksetzen', // from v2.1.13 added 12.06.2016
			'cmdfullscreen': 'Vollbild', // from v2.1.15 added 03.08.2016
			'cmdmove'      : 'Verschieben', // from v2.1.15 added 21.08.2016
			'cmdempty'     : 'Ordner Leeren', // from v2.1.25 added 22.06.2017
			'cmdundo'      : 'Rückgängig', // from v2.1.27 added 31.07.2017
			'cmdredo'      : 'Wiederholen', // from v2.1.27 added 31.07.2017
			'cmdpreference': 'Einstellungen', // from v2.1.27 added 03.08.2017
			'cmdselectall' : 'Alle auswählen', // from v2.1.28 added 15.08.2017
			'cmdselectnone': 'Keine auswählen', // from v2.1.28 added 15.08.2017
			'cmdselectinvert': 'Auswahl rückgängig machen', // from v2.1.28 added 15.08.2017
			'cmdopennew'   : 'In neuem Fenster öffnen', // from v2.1.38 added 3.4.2018
			'cmdhide'      : 'Verstecken', // from v2.1.41 added 13.12.2019

			/*********************************** buttons ***********************************/
			'btnClose'  : 'Schließen',
			'btnSave'   : 'Speichern',
			'btnRm'     : 'Entfernen',
			'btnApply'  : 'Anwenden',
			'btnCancel' : 'Abbrechen',
			'btnNo'     : 'Nein',
			'btnYes'    : 'Ja',
			'btnDiscard': 'Änderungen verwerfen',
			'btnMount'  : 'Verbinden',  // added 18.04.2012
			'btnApprove': 'Gehe zu $1 und genehmige', // from v2.1 added 26.04.2012
			'btnUnmount': 'Auswerfen', // from v2.1 added 30.04.2012
			'btnConv'   : 'Konvertieren', // from v2.1 added 08.04.2014
			'btnCwd'    : 'Arbeitspfad',      // from v2.1 added 22.5.2015
			'btnVolume' : 'Partition',    // from v2.1 added 22.5.2015
			'btnAll'    : 'Alle',       // from v2.1 added 22.5.2015
			'btnMime'   : 'MIME-Typ', // from v2.1 added 22.5.2015
			'btnFileName':'Dateiname',  // from v2.1 added 22.5.2015
			'btnSaveClose': 'Speichern & Schließen', // from v2.1 added 12.6.2015
			'btnBackup' : 'Sicherung', // fromv2.1 added 28.11.2015
			'btnRename'    : 'Umbenennen',      // from v2.1.24 added 6.4.2017
			'btnRenameAll' : 'Alle Umbenennen', // from v2.1.24 added 6.4.2017
			'btnPrevious' : 'Zurück ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnNext'     : 'Weiter ($1/$2)', // from v2.1.24 added 11.5.2017
			'btnSaveAs'   : 'Speichern als', // from v2.1.25 added 24.5.2017

			/******************************** notifications ********************************/
			'ntfopen'     : 'Öffne Ordner',
			'ntffile'     : 'Öffne Datei',
			'ntfreload'   : 'Ordnerinhalt neu',
			'ntfmkdir'    : 'Erstelle Ordner',
			'ntfmkfile'   : 'Erstelle Dateien',
			'ntfrm'       : 'Lösche Dateien',
			'ntfcopy'     : 'Kopiere Dateien',
			'ntfmove'     : 'Verschiebe Dateien',
			'ntfprepare'  : 'Kopiervorgang initialisieren',
			'ntfrename'   : 'Benenne Dateien um',
			'ntfupload'   : 'Dateien hochladen',
			'ntfdownload' : 'Dateien herunterladen',
			'ntfsave'     : 'Speichere Datei',
			'ntfarchive'  : 'Erstelle Archiv',
			'ntfextract'  : 'Entpacke Dateien',
			'ntfsearch'   : 'Suche',
			'ntfresize'   : 'Bildgrößen ändern',
			'ntfsmth'     : 'Bin beschäftigt ..',
			'ntfloadimg'  : 'Lade Bild ..',
			'ntfnetmount' : 'Mit Netzwerkspeicher verbinden', // added 18.04.2012
			'ntfnetunmount': 'Netzwerkspeicher auswerfen', // from v2.1 added 30.04.2012
			'ntfdim'      : 'Bildgröße erfassen', // added 20.05.2013
			'ntfreaddir'  : 'Lese Ordnerinformationen', // from v2.1 added 01.07.2013
			'ntfurl'      : 'Hole URL von Link', // from v2.1 added 11.03.2014
			'ntfchmod'    : 'Ändere Dateiberechtigungen', // from v2.1 added 20.6.2015
			'ntfpreupload': 'Upload-Dateinamen überprüfen', // from v2.1 added 31.11.2015
			'ntfzipdl'    : 'Erstelle Datei zum Download', // from v2.1.7 added 23.1.2016
			'ntfparents'  : 'Beziehe Pfad Informationen', // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': 'Upload läuft', // from v2.1.17 added 2.11.2016
			'ntftrash'    : 'Bewege in den Mülleimer', // from v2.1.24 added 2.5.2017
			'ntfrestore'  : 'Wiederherstellung aus Mülleimer', // from v2.1.24 added 3.5.2017
			'ntfchkdir'   : 'Prüfe Zielordner', // from v2.1.24 added 3.5.2017
			'ntfundo'     : 'Vorherige Operation rückgängig machen', // from v2.1.27 added 31.07.2017
			'ntfredo'     : 'Wiederherstellen', // from v2.1.27 added 31.07.2017
			'ntfchkcontent' : 'Überprüfe Inhalte', // from v2.1.41 added 13.12.2019

			/*********************************** volumes *********************************/
			'volume_Trash' : 'Mülleimer', //from v2.1.24 added 29.4.2017

			/************************************ dates **********************************/
			'dateUnknown' : 'unbekannt',
			'Today'       : 'Heute',
			'Yesterday'   : 'Gestern',
			'msJan'       : 'Jan',
			'msFeb'       : 'Feb',
			'msMar'       : 'Mär',
			'msApr'       : 'Apr',
			'msMay'       : 'Mai',
			'msJun'       : 'Jun',
			'msJul'       : 'Jul',
			'msAug'       : 'Aug',
			'msSep'       : 'Sep',
			'msOct'       : 'Okt',
			'msNov'       : 'Nov',
			'msDec'       : 'Dez',
			'January'     : 'Januar',
			'February'    : 'Februar',
			'March'       : 'März',
			'April'       : 'April',
			'May'         : 'Mai',
			'June'        : 'Juni',
			'July'        : 'Juli',
			'August'      : 'August',
			'September'   : 'September',
			'October'     : 'Oktober',
			'November'    : 'November',
			'December'    : 'Dezember',
			'Sunday'      : 'Sonntag',
			'Monday'      : 'Montag',
			'Tuesday'     : 'Dienstag',
			'Wednesday'   : 'Mittwoch',
			'Thursday'    : 'Donnerstag',
			'Friday'      : 'Freitag',
			'Saturday'    : 'Samstag',
			'Sun'         : 'So',
			'Mon'         : 'Mo',
			'Tue'         : 'Di',
			'Wed'         : 'Mi',
			'Thu'         : 'Do',
			'Fri'         : 'Fr',
			'Sat'         : 'Sa',

			/******************************** sort variants ********************************/
			'sortname'          : 'nach Name',
			'sortkind'          : 'nach Art',
			'sortsize'          : 'nach Größe',
			'sortdate'          : 'nach Datum',
			'sortFoldersFirst'  : 'Ordner zuerst',
			'sortperm'          : 'nach Berechtigung', // from v2.1.13 added 13.06.2016
			'sortmode'          : 'nach Modus',       // from v2.1.13 added 13.06.2016
			'sortowner'         : 'nach Besitzer',      // from v2.1.13 added 13.06.2016
			'sortgroup'         : 'nach Gruppe',      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : 'auch Baumansicht',  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : 'Neues Textdokument (.txt)', // added 10.11.2015
			'untitled folder'   : 'Neuer Ordner',   // added 10.11.2015
			'Archive'           : 'Neues Archiv',  // from v2.1 added 10.11.2015
			'untitled file'     : 'Neue Datei $1',  // from v2.1.41 added 13.12.2019
			'extentionfile'     : '$1: Datei',    // from v2.1.41 added 13.12.2019
			'extentiontype'     : '$1: $2',      // from v2.1.43 added 13.12.2018

			/********************************** messages **********************************/
			'confirmReq'      : 'Bestätigung benötigt',
			'confirmRm'       : 'Sollen die Dateien gelöscht werden?<br>Vorgang ist endgültig!',
			'confirmRepl'     : 'Datei ersetzen?',
			'confirmRest'     : 'Vorhandenes Element durch das Element aus Mülleimer ersetzen?', // fromv2.1.24 added 5.5.2017
			'confirmConvUTF8' : 'Nicht UTF-8 kodiert<br>Zu UTF-8 konvertieren?<br>Inhalte werden zu UTF-8 konvertiert bei Speicherung.', // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : 'Die Zeichencodierung dieser Datei konnte nicht erkannt werden. Es muss vorübergehend in UTF-8 zur Bearbeitung konvertiert werden.<br> Bitte eine Zeichenkodierung dieser Datei auswählen.', // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : 'Die Datei wurde geändert.<br>Änderungen gehen verloren, wenn nicht gespeichert wird.', // from v2.1 added 15.7.2015
			'confirmTrash'    : 'Sicher diese Elemente in den Mülleimer verschieben?', // from v2.1.24 added 29.4.2017
			'confirmMove'     : 'Sicher alle Elemente nach "$1" verschieben?', // from v2.1.50 added 13.12.2019
			'apllyAll'        : 'Alles bestätigen',
			'name'            : 'Name',
			'size'            : 'Größe',
			'perms'           : 'Berechtigungen',
			'modify'          : 'Geändert',
			'kind'            : 'Typ',
			'read'            : 'Lesen',
			'write'           : 'Schreiben',
			'noaccess'        : 'Kein Zugriff',
			'and'             : 'und',
			'unknown'         : 'unbekannt',
			'selectall'       : 'Alle Dateien auswählen',
			'selectfiles'     : 'Dateien auswählen',
			'selectffile'     : 'Erste Datei auswählen',
			'selectlfile'     : 'Letzte Datei auswählen',
			'viewlist'        : 'Spaltenansicht',
			'viewicons'       : 'Symbolansicht',
			'viewSmall'       : 'Kleine Icons', // from v2.1.39 added 13.12.2019
			'viewMedium'      : 'Medium Icons', // from v2.1.39 added 13.12.2019
			'viewLarge'       : 'Große Icons', // from v2.1.39 added 13.12.2019
			'viewExtraLarge'  : 'Extragroße Icons', // from v2.1.39 added 13.12.2019
			'places'          : 'Favoriten',
			'calc'            : 'Berechne',
			'path'            : 'Pfad',
			'aliasfor'        : 'Verknüpfung zu',
			'locked'          : 'Gesperrt',
			'dim'             : 'Bildgröße',
			'files'           : 'Dateien',
			'folders'         : 'Ordner',
			'items'           : 'Objekte',
			'yes'             : 'ja',
			'no'              : 'nein',
			'link'            : 'Link',
			'searcresult'     : 'Suchergebnisse',
			'selected'        : 'Objekte ausgewählt',
			'about'           : 'Über',
			'shortcuts'       : 'Tastenkombinationen',
			'help'            : 'Hilfe',
			'webfm'           : 'Web-Dateiverwaltung',
			'ver'             : 'Version',
			'protocolver'     : 'Protokoll-Version',
			'homepage'        : 'Projekt-Webseite',
			'docs'            : 'Dokumentation',
			'github'          : 'Forke uns auf Github',
			'twitter'         : 'Folge uns auf twitter',
			'facebook'        : 'Begleite uns auf facebook',
			'team'            : 'Team',
			'chiefdev'        : 'Chefentwickler',
			'developer'       : 'Entwickler',
			'contributor'     : 'Unterstützer',
			'maintainer'      : 'Maintainer',
			'translator'      : 'Übersetzer',
			'icons'           : 'Icons',
			'dontforget'      : 'und vergiss nicht .. morgen ist auch noch ein Tag ..',
			'shortcutsof'     : 'Tastenkombinationen deaktiviert',
			'dropFiles'       : 'Dateien hier ablegen',
			'or'              : 'oder',
			'selectForUpload' : 'Dateien zum Upload auswählen',
			'moveFiles'       : 'Dateien verschieben',
			'copyFiles'       : 'Dateien kopieren',
			'restoreFiles'    : 'Elemente wiederherstellen', // from v2.1.24 added 5.5.2017
			'rmFromPlaces'    : 'Lösche von Favoriten',
			'aspectRatio'     : 'Seitenverhältnis',
			'scale'           : 'Maßstab',
			'width'           : 'Breite',
			'height'          : 'Höhe',
			'resize'          : 'Größe ändern',
			'crop'            : 'Zuschneiden',
			'rotate'          : 'Drehen',
			'rotate-cw'       : 'Drehe 90° im Uhrzeigersinn',
			'rotate-ccw'      : 'Drehe 90° gegen Uhrzeigersinn',
			'degree'          : '°',
			'netMountDialogTitle' : 'verbinde Netzwerkspeicher', // added 18.04.2012
			'protocol'            : 'Protokoll', // added 18.04.2012
			'host'                : 'Host', // added 18.04.2012
			'port'                : 'Port', // added 18.04.2012
			'user'                : 'Benutzer', // added 18.04.2012
			'pass'                : 'Passwort', // added 18.04.2012
			'confirmUnmount'      : 'Soll "$1" ausgehängt werden',  // from v2.1 added 30.04.2012
			'dropFilesBrowser': 'Dateien in den Browser ziehen', // from v2.1 added 30.05.2012
			'dropPasteFiles'  : 'Dateien hier loslassen', // from v2.1 added 07.04.2014
			'encoding'        : 'Kodierung', // from v2.1 added 19.12.2014
			'locale'          : 'Lokal',   // from v2.1 added 19.12.2014
			'searchTarget'    : 'Ziel: $1',                // from v2.1 added 22.5.2015
			'searchMime'      : 'Suche nach MIME-Typ', // from v2.1 added 22.5.2015
			'owner'           : 'Besitzer', // from v2.1 added 20.6.2015
			'group'           : 'Gruppe', // from v2.1 added 20.6.2015
			'other'           : 'Andere', // from v2.1 added 20.6.2015
			'execute'         : 'Ausführen', // from v2.1 added 20.6.2015
			'perm'            : 'Berechtigung', // from v2.1 added 20.6.2015
			'mode'            : 'Modus', // from v2.1 added 20.6.2015
			'emptyFolder'     : 'Der Ordner ist leer', // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : 'Der Ordner ist leer\\A Elemente durch Ziehen hinzufügen', // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : 'Der Ordner ist leer\\A Elemente durch langes Tippen hinzufügen', // from v2.1.6 added 30.12.2015
			'quality'         : 'Qualität', // from v2.1.6 added 5.1.2016
			'autoSync'        : 'Automatische Synchronisation',  // from v2.1.6 added 10.1.2016
			'moveUp'          : 'Nach oben bewegen',  // from v2.1.6 added 18.1.2016
			'getLink'         : 'URL-Link holen', // from v2.1.7 added 9.2.2016
			'selectedItems'   : 'Ausgewählte Objekte ($1)', // from v2.1.7 added 2.19.2016
			'folderId'        : 'Ordner-ID', // from v2.1.10 added 3.25.2016
			'offlineAccess'   : 'Offline-Zugriff erlauben', // from v2.1.10 added 3.25.2016
			'reAuth'          : 'Erneut anmelden', // from v2.1.10 added 3.25.2016
			'nowLoading'      : 'Wird geladen...', // from v2.1.12 added 4.26.2016
			'openMulti'       : 'mehrere Dateien öffnen', // from v2.1.12 added 5.14.2016
			'openMultiConfirm': 'Es wird versucht die $1 Dateien zu öffnen .. sicher im Browser öffnen?', // from v2.1.12 added 5.14.2016
			'emptySearch'     : 'Kein Suchergebnis', // from v2.1.12 added 5.16.2016
			'editingFile'     : 'Datei wird bearbeitet.', // from v2.1.13 added 6.3.2016
			'hasSelected'     : '$1 Objekt(e) ausgewählt.', // from v2.1.13 added 6.3.2016
			'hasClipboard'    : '$1 Objekte im Clipboard.', // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : 'Inkrementelle Suche bezieht sich nur auf die aktuelle Ansicht.', // from v2.1.13 added 6.30.2016
			'reinstate'       : 'Wiederherstellen', // from v2.1.15 added 3.8.2016
			'complete'        : '$1 abgeschlossen', // from v2.1.15 added 21.8.2016
			'contextmenu'     : 'Kontextmenü', // from v2.1.15 added 9.9.2016
			'pageTurning'     : 'Seite umblättern', // from v2.1.15 added 10.9.2016
			'volumeRoots'     : 'Volume-Rootverzeichnisse', // from v2.1.16 added 16.9.2016
			'reset'           : 'Neustart', // from v2.1.16 added 1.10.2016
			'bgcolor'         : 'Hintergrund Farbe', // from v2.1.16 added 1.10.2016
			'colorPicker'     : 'Farbauswahl', // from v2.1.16 added 1.10.2016
			'8pxgrid'         : '8px Raster', // from v2.1.16 added 4.10.2016
			'enabled'         : 'Ein', // from v2.1.16 added 4.10.2016
			'disabled'        : 'Aus', // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : 'Keine Ergebnisse in der aktuellen Anzeige', // from v2.1.16 added 5.10.2016
			'emptyLetSearch'  : 'Die Ergebnisse der ersten Buchstabensuche sind in der aktuellen Ansicht leer.', // from v2.1.23 added 24.3.2017
			'textLabel'       : 'Text Bezeichnung', // from v2.1.17 added 13.10.2016
			'minsLeft'        : '$1 Minuten übrig', // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : 'Wiedereröffnen mit ausgewählter Codierung', // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : 'Speichern mit der gewählten Kodierung', // from v2.1.19 added 2.12.2016
			'selectFolder'    : 'Verzeichnis auswählen', // from v2.1.20 added 13.12.2016
			'firstLetterSearch': 'Erster Buchstabe suche', // from v2.1.23 added 24.3.2017
			'presets'         : 'Voreinstellungen', // from v2.1.25 added 26.5.2017
			'tooManyToTrash'  : 'Zu viele Elemente auf einmal für den Mülleimer.', // from v2.1.25 added 9.6.2017
			'TextArea'        : 'Textbereich', // from v2.1.25 added 14.6.2017
			'folderToEmpty'   : 'Leere Ordner "$1".', // from v2.1.25 added 22.6.2017
			'filderIsEmpty'   : 'Es befinden sich keine Elemente im Ordner "$1".', // from v2.1.25 added 22.6.2017
			'preference'      : 'Einstellungen', // from v2.1.26 added 28.6.2017
			'language'        : 'Spracheinstellungen', // from v2.1.26 added 28.6.2017
			'clearBrowserData': 'Initialisiere die Einstellungen, welche in diesem Browser gespeichert sind', // from v2.1.26 added 28.6.2017
			'toolbarPref'     : 'Toolbareinstellung', // from v2.1.27 added 2.8.2017
			'charsLeft'       : '... $1 Zeichen übrig',  // from v2.1.29 added 30.8.2017
			'sum'             : 'Summe', // from v2.1.29 added 28.9.2017
			'roughFileSize'   : 'Ungefähre Dateigröße', // from v2.1.30 added 2.11.2017
			'autoFocusDialog' : 'Fokussierung auf das Element Dialog mit Mouseover',  // from v2.1.30 added 2.11.2017
			'select'          : 'Auswählen', // from v2.1.30 added 23.11.2017
			'selectAction'    : 'Aktion bei der Auswahl der Datei', // from v2.1.30 added 23.11.2017
			'useStoredEditor' : 'Öffnen mit dem zuletzt verwendeten Editor', // from v2.1.30 added 23.11.2017
			'selectinvert'    : 'Auswahl umkehren', // from v2.1.30 added 25.11.2017
			'renameMultiple'  : 'Sicher $1 ausgewählte Elemente in $2 umbenennen?<br>Rückgängig nicht möglich!', // from v2.1.31 added 4.12.2017
			'batchRename'     : 'Stapelumbenennung', // from v2.1.31 added 8.12.2017
			'plusNumber'      : '+ Nummer', // from v2.1.31 added 8.12.2017
			'asPrefix'        : 'Vorzeichen hinzufügen', // from v2.1.31 added 8.12.2017
			'asSuffix'        : 'Nachzeichen hinzufügen', // from v2.1.31 added 8.12.2017
			'changeExtention' : 'Erweiterung ändern', // from v2.1.31 added 8.12.2017
			'columnPref'      : 'Spalteneinstellungen (Listenansicht)', // from v2.1.32 added 6.2.2018
			'reflectOnImmediate' : 'Alle Änderungen werden sofort im Archiv angewendet.', // from v2.1.33 added 2.3.2018
			'reflectOnUnmount'   : 'Alle Änderungen werden nicht angewendet bis dieses Volume entfernt wird.', // from v2.1.33 added 2.3.2018
			'unmountChildren' : 'Die folgenden Datenträger, die auf diesem Datenträger eingehängt sind, werden ebenfalls ausgehängt. Sicher dass alle aushängt werden sollen?', // from v2.1.33 added 5.3.2018
			'selectionInfo'   : 'Auswahl Info', // from v2.1.33 added 7.3.2018
			'hashChecker'     : 'Datei-Hash-Algorithmen', // from v2.1.33 added 10.3.2018
			'infoItems'       : 'Info-Elemente (Auswahl-Info-Panel)', // from v2.1.38 added 28.3.2018
			'pressAgainToExit': 'Drücken Sie erneut, um zu beenden.', // from v2.1.38 added 1.4.2018
			'toolbar'         : 'Symbolleiste', // from v2.1.38 added 4.4.2018
			'workspace'       : 'Arbeitsplatz', // from v2.1.38 added 4.4.2018
			'dialog'          : 'Dialog', // from v2.1.38 added 4.4.2018
			'all'             : 'Alle', // from v2.1.38 added 4.4.2018
			'iconSize'        : 'Icongröße (Symbolansicht)', // form v2.1.39 added 7.5.2018
			'editorMaximized' : 'Öffne Editorfenster in voller Größe', // from v2.1.40 added 30.6.2018
			'editorConvNoApi' : 'Aktuell keine API zur Bearbeitung verfügbar, bitte auf Webseite bearbeiten', //from v2.1.40 added 13.12.2019
			'editorConvNeedUpload' : 'Um zu speichern nach der Bearbeitung Element entweder mit URL hochladen oder mit herunter geladener Datei', // from v2.1.40 added 13.12.2019
			'convertOn'       : 'Bearbeiten auf Seite $1', // from v2.1.40 added 13.12.2019
			'integrations'    : 'Integrationen', // from v2.1.40 added 13.12.2019
			'integrationWith' : 'Diese Software hat folgende externe Dienste integriert. Vor Anwendung bitte die jeweiligen Nutzungsbedingungen usw. beachten', // from v2.1.40 added 13.12.2019
			'showHidden'      : 'Zeige versteckte Elemente', // from v2.1.41 added 13.12.2019
			'hideHidden'      : 'Verberge versteckte Elemente', // from v2.1.41 added 13.12.2019
			'toggleHidden'    : 'Zeige/Verberge versteckte Elemente', // from v2.1.41 added 13.12.2019
			'makefileTypes'   : 'Dateiarten bei "Neue Datei" aktivieren', // from v2.1.41 added 13.12.2019
			'typeOfTextfile'  : 'Art der Textdatei', // from v2.1.41 added 13.12.2019
			'add'             : 'Neu', // from v2.1.41 added 13.12.2019
			'theme'           : 'Thema', // from v2.1.43 added 13.12.2019
			'default'         : 'Standard', // from v2.1.43 added 13.12.2019
			'description'     : 'Beschreibung', // from v2.1.43 added 13.12.2019
			'website'         : 'Webseite', // from v2.1.43 added 13.12.2019
			'author'          : 'Autor', // from v2.1.43 added 13.12.2019
			'email'           : 'Email', // from v2.1.43 added 13.12.2019
			'license'         : 'Lizenz', // from v2.1.43 added 13.12.2019
			'exportToSave'    : 'Dieses Element kann nicht gespeichert werden. Um Änderungen nicht zu verlieren, muss es auf den lokalen PC exportiert werden', // from v2.1.44 added 13.12.2019
			'dblclickToSelect': 'Doppelt auf Datei klicken um auszuwählen', // from v2.1.47 added 13.12.2019
			'useFullscreen'   : 'Gesamter Bildschirm', // from v2.1.47 added 13.12.2019

			/********************************** mimetypes **********************************/
			'kindUnknown'     : 'Unbekannt',
			'kindRoot'        : 'Stammverzeichnis', // from v2.1.16 added 16.10.2016
			'kindFolder'      : 'Ordner',
			'kindSelects'     : 'Auswahlkriterien', // from v2.1.29 added 29.8.2017
			'kindAlias'       : 'Verknüpfung',
			'kindAliasBroken' : 'Defekte Verknüpfung',
			// applications
			'kindApp'         : 'Programm',
			'kindPostscript'  : 'Postscript-Dokument',
			'kindMsOffice'    : 'MS Office-Dokument',
			'kindMsWord'      : 'MS Word-Dokument',
			'kindMsExcel'     : 'MS Excel-Dokument',
			'kindMsPP'        : 'MS Powerpoint-Präsentation',
			'kindOO'          : 'Open Office-Dokument',
			'kindAppFlash'    : 'Flash',
			'kindPDF'         : 'Portables Dokumentenformat (PDF)',
			'kindTorrent'     : 'Bittorrent-Datei',
			'kind7z'          : '7z-Archiv',
			'kindTAR'         : 'TAR-Archiv',
			'kindGZIP'        : 'GZIP-Archiv',
			'kindBZIP'        : 'BZIP-Archiv',
			'kindXZ'          : 'XZ-Archiv',
			'kindZIP'         : 'ZIP-Archiv',
			'kindRAR'         : 'RAR-Archiv',
			'kindJAR'         : 'Java JAR-Datei',
			'kindTTF'         : 'True Type-Schrift',
			'kindOTF'         : 'Open Type-Schrift',
			'kindRPM'         : 'RPM-Paket',
			// fonts
			'kindFont'        : 'Schriftart',
			'kindSFNT'        : 'SFNT-Schrift',
			'kindEOT'         : 'Embedded-Open-Type-Schrift',
			'kindWOFF'        : 'Web-Open-Font-Format-Schrift',
			'kindWOFF2'       : 'Web-Open-Font-Format-2-Schrift',
			// texts
			'kindText'        : 'Text-Dokument',
			'kindTextPlain'   : 'Text-Dokument',
			'kindPHP'         : 'PHP-Quelltext',
			'kindCSS'         : 'CSS Stilvorlage',
			'kindHTML'        : 'HTML-Dokument',
			'kindJS'          : 'Javascript-Quelltext',
			'kindRTF'         : 'Formatierte Textdatei',
			'kindC'           : 'C-Quelltext',
			'kindCHeader'     : 'C Header-Quelltext',
			'kindCPP'         : 'C++ Quelltext',
			'kindCPPHeader'   : 'C++ Header-Quelltext',
			'kindShell'       : 'Unix-Shell-Skript',
			'kindPython'      : 'Python-Quelltext',
			'kindJava'        : 'Java-Quelltext',
			'kindRuby'        : 'Ruby-Quelltext',
			'kindPerl'        : 'Perl Script',
			'kindSQL'         : 'SQL-Quelltext',
			'kindXML'         : 'XML-Dokument',
			'kindAWK'         : 'AWK-Quelltext',
			'kindCSV'         : 'Kommagetrennte Daten',
			'kindDOCBOOK'     : 'Docbook XML-Dokument',
			'kindMarkdown'    : 'Markdown-Text', // added 20.7.2015
			// images
			'kindImage'       : 'Bild',
			'kindBMP'         : 'Bitmap-Bild',
			'kindJPEG'        : 'JPEG-Bild',
			'kindGIF'         : 'GIF-Bild',
			'kindPNG'         : 'PNG-Bild',
			'kindTIFF'        : 'TIFF-Bild',
			'kindTGA'         : 'TGA-Bild',
			'kindPSD'         : 'Adobe Photoshop-Dokument',
			'kindXBITMAP'     : 'X Bitmap-Bild',
			'kindPXM'         : 'Pixelmator-Bild',
			// media
			'kindAudio'       : 'Audiodatei',
			'kindAudioMPEG'   : 'MPEG Audio',
			'kindAudioMPEG4'  : 'MPEG-4 Audio',
			'kindAudioMIDI'   : 'MIDI Audio',
			'kindAudioOGG'    : 'Ogg Vorbis Audio',
			'kindAudioWAV'    : 'WAV Audio',
			'AudioPlaylist'   : 'MP3-Playlist',
			'kindVideo'       : 'Videodatei',
			'kindVideoDV'     : 'DV Film',
			'kindVideoMPEG'   : 'MPEG Film',
			'kindVideoMPEG4'  : 'MPEG4 Film',
			'kindVideoAVI'    : 'AVI Film',
			'kindVideoMOV'    : 'QuickTime Film',
			'kindVideoWM'     : 'Windows Media Film',
			'kindVideoFlash'  : 'Flash Film',
			'kindVideoMKV'    : 'Matroska Film',
			'kindVideoOGG'    : 'Ogg Film'
		}
	};
}));
