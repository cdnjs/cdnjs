const VERBOSE = false;

var diff = require('../diff');

function log() {
  VERBOSE && console.log.apply(console, arguments);
}

describe('#createPatch', function() {
  it('should handle files with the last line changed', function() {
    diff.createPatch('test', 'line2\nline3\nline5\n', 'line2\nline3\nline4\nline5\n', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,3 +1,4 @@\n'
      + ' line2\n'
      + ' line3\n'
      + '+line4\n'
      + ' line5\n');

    diff.createPatch('test', 'line2\nline3\nline4\n', 'line2\nline3\nline4\nline5\n', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,3 +1,4 @@\n'
      + ' line2\n'
      + ' line3\n'
      + ' line4\n'
      + '+line5\n');

    diff.createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline44\n', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,4 +1,4 @@\n'
      + ' line1\n'
      + ' line2\n'
      + ' line3\n'
      + '+line44\n'
      + '-line4\n');

    diff.createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline44\nline5\n', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,4 +1,5 @@\n'
      + ' line1\n'
      + ' line2\n'
      + ' line3\n'
      + '+line44\n'
      + '+line5\n'
      + '-line4\n');
  });

  it('should output no newline at end of file message', function() {
    diff.createPatch('test', 'line1\nline2\nline3\nline4\n', 'line1\nline2\nline3\nline4', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,4 +1,4 @@\n'
      + ' line1\n'
      + ' line2\n'
      + ' line3\n'
      + '+line4\n'
      + '\\ No newline at end of file\n'
      + '-line4\n');

    diff.createPatch('test', 'line1\nline2\nline3\nline4', 'line1\nline2\nline3\nline4\n', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,4 +1,4 @@\n'
      + ' line1\n'
      + ' line2\n'
      + ' line3\n'
      + '+line4\n'
      + '-line4\n'
      + '\\ No newline at end of file\n');

    diff.createPatch('test', 'line11\nline2\nline3\nline4', 'line1\nline2\nline3\nline4', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,4 +1,4 @@\n'
      + '+line1\n'
      + '-line11\n'
      + ' line2\n'
      + ' line3\n'
      + ' line4\n'
      + '\\ No newline at end of file\n');

    diff.createPatch('test', 'line11\nline2\nline3\nline4\nline4\nline4\nline4', 'line1\nline2\nline3\nline4\nline4\nline4\nline4', 'header1', 'header2').should.equal(
      'Index: test\n'
      + '===================================================================\n'
      + '--- test\theader1\n'
      + '+++ test\theader2\n'
      + '@@ -1,5 +1,5 @@\n'
      + '+line1\n'
      + '-line11\n'
      + ' line2\n'
      + ' line3\n'
      + ' line4\n'
      + ' line4\n');
  });

  it('should diff large content blocks', function() {
    var random = 42;
    var mult = 134775813, range = Math.pow(2, 32);
    function nextRandom() {
      random = ((random * mult) + 1) % range;
      return random;
    }
    var largeTest = '.hbh9asgiidc {ehaahc9:ses;bhg9hc:ses;idgaag-hi9aa:cdca;ihgd9gdgca-gdadg:ighchehgaci;ggghdg:edhciag;daagsada:ahhhiaa;ahai7:hgid;}.hbh9asgiidc.hchgihaa {ggghdg:hgid;}.igiidchbh9ah {ihgd9gdgca-hbh9a:gga('
      + 'hbh9ah/igiidcfhbh9ah.9hs);ihgd9gdgca-gaeahi:cd-gaeahi;7ah97i:7des;bhg9hc-gh97i:ses;ahai7:7des;ihgd9gdgca-edhhihdc:ses ses;}.igiidcfgde9 {ihgd9gdgca-edhhihdc:ses ses;}.bdghadaag .igiidcfgde9 {ihgd9gdgc'
      + 'a-edhhihdc:-7des ses;}.hchgihaa .igiidcfgde9 {ihgd9gdgca-edhhihdc:-dses ses;}.igiidcfaaaaia {ihgd9gdgca-edhhihdc:-bdes ses;}.bdghadaag .igiidcfaaaaia {ihgd9gdgca-edhhihdc:-9sses ses;}.hchgihaa .igiidc'
      + 'faaaaia {ihgd9gdgca-edhhihdc:-97des ses;}.igiidcfadacadha {ihgd9gdgca-edhhihdc:-9dses ses;}.bdghadaag .igiidcfadacadha {ihgd9gdgca-edhhihdc:-9bdes ses;}.hchgihaa .igiidcfadacadha {ihgd9gdgca-edhhihdc:'
      + '-7sses ses;}.igiidcfabhha {ihgd9gdgca-edhhihdc:-77des ses;}.bdghadaag .igiidcfabhha {ihgd9gdgca-edhhihdc:-7dses ses;}.hchgihaa .igiidcfabhha {ihgd9gdgca-edhhihdc:-7bdes ses;}.igiidcfbdaa {ihgd9gdgca-e'
      + 'dhhihdc:-d7des ses;}.bdghadaag .igiidcfbdaa {ihgd9gdgca-edhhihdc:-ddses ses;}.hchgihaa .igiidcfbdaa {ihgd9gdgca-edhhihdc:-dbdes ses;}.igiidcfcaasdaaag {ihgd9gdgca-edhhihdc:-abdes ses;}.bdghadaag .igii'
      + 'dcfcaasdaaag {ihgd9gdgca-edhhihdc:-bsses ses;}.hchgihaa .igiidcfcaasdaaag {ihgd9gdgca-edhhihdc:-b7des ses;}.igiidcfgachba {ihgd9gdgca-edhhihdc:-dbdes ses;}.bdghadaag .igiidcfgachba {ihgd9gdgca-edhhihd'
      + 'c:-9ssses ses;}.hchgihaa .igiidcfgachba {ihgd9gdgca-edhhihdc:-9s7des ses;}.igiidcfghh {ihgd9gdgca-edhhihdc:-9sdses ses;}.bdghadaag .igiidcfghh {ihgd9gdgca-edhhihdc:-9sbdes ses;}.hchgihaa .igiidcfghh {'
      + 'ihgd9gdgca-edhhihdc:-99sses ses;}.igiidcfh7hga {ihgd9gdgca-edhhihdc:-97bdes ses;}.bdghadaag .igiidcfh7hga {ihgd9gdgca-edhhihdc:-9hsses ses;}.hchgihaa .igiidcfh7hga {ihgd9gdgca-edhhihdc:-9h7des ses;}.i'
      + 'giidcfgeadha {ihgd9gdgca-edhhihdc:-9hdses ses;}.bdghadaag .igiidcfgeadha {ihgd9gdgca-edhhihdc:-9hbdes ses;}.hchgihaa .igiidcfgeadha {ihgd9gdgca-edhhihdc:-9gsses ses;}.igiidcfaaisdaaag {ihgd9gdgca-edhh'
      + 'ihdc:-9dsses ses;}.bdghadaag .igiidcfaaisdaaag {ihgd9gdgca-edhhihdc:-9d7des ses;}.hchgihaa .igiidcfaaisdaaag {ihgd9gdgca-edhhihdc:-9ddses ses;}.igiidcfabei9ighh7 {ihgd9gdgca-edhhihdc:-hsses ses;}.bdgh'
      + 'adaag .igiidcfabei9ighh7 {ihgd9gdgca-edhhihdc:-h7des ses;}.hchgihaa .igiidcfabei9ighh7 {ihgd9gdgca-edhhihdc:-hdses ses;}.igiidcfadgd {ihgd9gdgca-edhhihdc:-hbdes ses;}.bdghadaag .igiidcfadgd {ihgd9gdgc'
      + 'a-edhhihdc:-gsses ses;}.hchgihaa .igiidcfadgd {ihgd9gdgca-edhhihdc:-g7des ses;}.igiidcfbhch9a {ihgd9gdgca-edhhihdc:-gdses ses;}.bdghadaag .igiidcfbhch9a {ihgd9gdgca-edhhihdc:-gbdes ses;}.hchgihaa .igi'
      + 'idcfbhch9a {ihgd9gdgca-edhhihdc:-dsses ses;}.igiidcfcaaahdh {ihgd9gdgca-edhhihdc:-bdses ses;}.bdghadaag .igiidcfcaaahdh {ihgd9gdgca-edhhihdc:-bbdes ses;}.hchgihaa .igiidcfcaaahdh {ihgd9gdgca-edhhihdc:'
      + '-csses ses;}.igiidcfhhaahahgg7gahgaih {ihgd9gdgca-edhhihdc:-97sses ses;}.bdghadaag .igiidcfhhaahahgg7gahgaih {ihgd9gdgca-edhhihdc:-977des ses;}.hchgihaa .igiidcfhhaahahgg7gahgaih {ihgd9gdgca-edhhihdc:'
      + '-97dses ses;}.igiidcfhhaahahgg7 {ihgd9gdgca-edhhihdc:-997des ses;}.bdghadaag .igiidcfhhaahahgg7 {ihgd9gdgca-edhhihdc:-99dses ses;}.hchgihaa .igiidcfhhaahahgg7 {ihgd9gdgca-edhhihdc:-99bdes ses;}.igiidc'
      + 'fcaaidddbhgd {ihgd9gdgca-edhhihdc:-asses ses;}.bdghadaag .igiidcfcaaidddbhgd {ihgd9gdgca-edhhihdc:-a7des ses;}.hchgihaa .igiidcfcaaidddbhgd {ihgd9gdgca-edhhihdc:-adses ses;}.igiidcfdeac {ihgd9gdgca-ed'
      + 'hhihdc:-c7des ses;}.bdghadaag .igiidcfdeac {ihgd9gdgca-edhhihdc:-cdses ses;}.hchgihaa .igiidcfdeac {ihgd9gdgca-edhhihdc:-cbdes ses;}.igiidcfdaagaghia {ihgd9gdgca-edhhihdc:-9hdses ses;}.bdghadaag .igii'
      + 'dcfdaagaghia {ihgd9gdgca-edhhihdc:-9hbdes ses;}.hchgihaa .igiidcfdaagaghia {ihgd9gdgca-edhhihdc:-9gsses ses;}.igiidcfahaa {ihgd9gdgca-edhhihdc:-9g7des ses;}.bdghadaag .igiidcfahaa {ihgd9gdgca-edhhihdc'
      + ':-9gdses ses;}.hchgihaa .igiidcfahaa {ihgd9gdgca-edhhihdc:-9gbdes ses;}.igiidcfih9 {ihgd9gdgca-edhhihdc:-9dbdes ses;}.bdghadaag .igiidcfih9 {ihgd9gdgca-edhhihdc:-9asses ses;}.hchgihaa .igiidcfih9 {ihg'
      + 'd9gdgca-edhhihdc:-9a7des ses;}.igiidcfhgihgghia {ihgd9gdgca-edhhihdc:-9b7des ses;}.bdghadaag .igiidcfhgihgghia {ihgd9gdgca-edhhihdc:-9bdses ses;}.hchgihaa .igiidcfhgihgghia {ihgd9gdgca-edhhihdc:-9bbde'
      + 's ses;}.igiidcfhgeaggaaa {ihgd9gdgca-edhhihdc:-9csses ses;}.bdghadaag .igiidcfhgeaggaaa {ihgd9gdgca-edhhihdc:-9c7des ses;}.hchgihaa .igiidcfhgeaggaaa {ihgd9gdgca-edhhihdc:-9cdses ses;}.igiidcfggahiaha'
      + 'ghah {ihgd9gdgca-edhhihdc:-9csses ses;}.bdghadaag .igiidcfggahiahaghah {ihgd9gdgca-edhhihdc:-9c7des ses;}.hchgihaa .igiidcfggahiahaghah {ihgd9gdgca-edhhihdc:-9cdses ses;}.igiidcfggahiagagdgaghia9dg9 {'
      + 'ihgd9gdgca-edhhihdc:-9cbdes ses;}.bdghadaag .igiidcfggahiagagdgaghia9dg9 {ihgd9gdgca-edhhihdc:-9dsses ses;}.hchgihaa .igiidcfggahiagagdgaghia9dg9 {ihgd9gdgca-edhhihdc:-9d7des ses;}.igiidcfggahiagagdga'
      + 'sdaaag {ihgd9gdgca-edhhihdc:-9ddses ses;}.bdghadaag .igiidcfggahiagagdgasdaaag {ihgd9gdgca-edhhihdc:-9dbdes ses;}.hchgihaa .igiidcfggahiagagdgasdaaag {ihgd9gdgca-edhhihdc:-7ssses ses;}.igiidcfggahiaga'
      + 'gdga {ihgd9gdgca-edhhihdc:-7s7des ses;}.bdghadaag .igiidcfggahiagagdga {ihgd9gdgca-edhhihdc:-7sdses ses;}.hchgihaa .igiidcfggahiagagdga {ihgd9gdgca-edhhihdc:-7sbdes ses;}.igiidcfggahiae79hhghagagdga {'
      + 'ihgd9gdgca-edhhihdc:-79bdes ses;}.bdghadaag .igiidcfggahiae79hhghagagdga {ihgd9gdgca-edhhihdc:-77sses ses;}.hchgihaa .igiidcfggahiae79hhghagagdga {ihgd9gdgca-edhhihdc:-777des ses;}.igiidcfbhdagagdga {'
      + 'ihgd9gdgca-edhhihdc:-77dses ses;}.bdghadaag .igiidcfbhdagagdga {ihgd9gdgca-edhhihdc:-77bdes ses;}.hchgihaa .igiidcfbhdagagdga {ihgd9gdgca-edhhihdc:-7hsses ses;}.igiidcfggahiagagdgaaaghhdc {ihgd9gdgca-'
      + 'edhhihdc:-79sses ses;}.bdghadaag .igiidcfggahiagagdgaaaghhdc {ihgd9gdgca-edhhihdc:-797des ses;}.hchgihaa .igiidcfggahiagagdgaaaghhdc {ihgd9gdgca-edhhihdc:-79dses ses;}.igiidcfgaea9abhha {ihgd9gdgca-ed'
      + 'hhihdc:-7h7des ses;}.bdghadaag .igiidcfgaea9abhha {ihgd9gdgca-edhhihdc:-7hdses ses;}.hchgihaa .igiidcfgaea9abhha {ihgd9gdgca-edhhihdc:-7hbdes ses;}.igiidcfsdgahgaabhha {ihgd9gdgca-edhhihdc:-9b7des ses'
      + ';}.bdghadaag .igiidcfsdgahgaabhha {ihgd9gdgca-edhhihdc:-9bdses ses;}.hchgihaa .igiidcfsdgahgaabhha {ihgd9gdgca-edhhihdc:-9bbdes ses;}.igiidcfegiihgdabhha {ihgd9gdgca-edhhihdc:-7d7des ses;}.bdghadaag .'
      + 'igiidcfegiihgdabhha {ihgd9gdgca-edhhihdc:-7ddses ses;}.hchgihaa .igiidcfegiihgdabhha {ihgd9gdgca-edhhihdc:-7dbdes ses;}.igiidcfhhaa {ihgd9gdgca-edhhihdc:-7a7des ses;}.bdghadaag .igiidcfhhaa {ihgd9gdgc'
      + 'a-edhhihdc:-7adses ses;}.hchgihaa .igiidcfhhaa {ihgd9gdgca-edhhihdc:-7abdes ses;}.igiidcfhhaa {ihgd9gdgca-edhhihdc:-7a7des ses;}.bdghadaag .igiidcfhhaa {ihgd9gdgca-edhhihdc:-7adses ses;}.hchgihaa .igi'
      + 'idcfhhaa {ihgd9gdgca-edhhihdc:-7abdes ses;}.igiidcfaahi {ihgd9gdgca-edhhihdc:-h9shes ses;}.bdghadaag .igiidcfaahi {ihgd9gdgca-edhhihdc:-h97ces ses;}.hchgihaa .igiidcfaahi {ihgd9gdgca-edhhihdc:-h9dhes '
      + 'ses;}.igiidcfhaagdaa {ihgd9gdgca-edhhihdc:-h9bces ses;}.bdghadaag .igiidcfhaagdaa {ihgd9gdgca-edhhihdc:-h7shes ses;}.hchgihaa .igiidcfhaagdaa {ihgd9gdgca-edhhihdc:-h77ces ses;}.igiidcfcaagdcihgi {ihgd'
      + '9gdgca-edhhihdc:-h7dhes ses;}.bdghadaag .igiidcfcaagdcihgi {ihgd9gdgca-edhhihdc:-h7bces ses;}.hchgihaa .igiidcfcaagdcihgi {ihgd9gdgca-edhhihdc:-hhshes ses;}.igiidcfcaa9gdge {ihgd9gdgca-edhhihdc:-hh7ce'
      + 's ses;}.bdghadaag .igiidcfcaa9gdge {ihgd9gdgca-edhhihdc:-hhdhes ses;}.hchgihaa .igiidcfcaa9gdge {ihgd9gdgca-edhhihdc:-hhbces ses;}.igiidcf7aae {ihgd9gdgca-edhhihdc:-hgshes ses;}.bdghadaag .igiidcf7aae'
      + ' {ihgd9gdgca-edhhihdc:-hg7ces ses;}.igiidcfagdebacg {ihgd9gdgca-edhhihdc:-hscces ses;ahai7:9ges;}.bdghadaag .igiidcfagdebacg {ihgd9gdgca-edhhihdc:-hsbges ses;}.hchgihaa .igiidcfagdebacg {ihgd9gdgca-ed'
      + 'hhihdc:-hscces ses;}.igiidcfighchsaghc {ihgd9gdgca-edhhihdc:-7bbdes ses;}.bdghadaag .igiidcfighchsaghc {ihgd9gdgca-edhhihdc:-7csses ses;}.hchgihaa .igiidcfighchsaghc {ihgd9gdgca-edhhihdc:-7c7des ses;}'
      + '.igiidcfhihgiadgdsada {ihgd9gdgca-edhhihdc:-hgdhes ses;}.bdghadaag .igiidcfhihgiadgdsada {ihgd9gdgca-edhhihdc:-hgbces ses;}.hchgihaa .igiidcfhihgiadgdsada {ihgd9gdgca-edhhihdc:-hdshes ses;}.igiidcfgas'
      + 'gah7 {ihgd9gdgca-edhhihdc:-hd7ces ses;}.bdghadaag .igiidcfgasgah7 {ihgd9gdgca-edhhihdc:-hddhes ses;}.hchgihaa .igiidcfgasgah7 {ihgd9gdgca-edhhihdc:-hdbces ses;}.igiidcfgadhaagdeids {ihgd9gdgca-edhhihd'
      + 'c:-hashes ses;}.bdghadaag .igiidcfgadhaagdeids {ihgd9gdgca-edhhihdc:-ha7ces ses;}.hchgihaa .igiidcfgadhaagdeids {ihgd9gdgca-edhhihdc:-hadhes ses;}.igiidcfdeacagdeids {ihgd9gdgca-edhhihdc:-habces ses;}'
      + '.bdghadaag .igiidcfdeacagdeids {ihgd9gdgca-edhhihdc:-hbshes ses;}.hchgihaa .igiidcfdeacagdeids {ihgd9gdgca-edhhihdc:-hb7ces ses;}.igiidcfcaaagdeids {ihgd9gdgca-edhhihdc:-hbdges ses;}.bdghadaag .igiidc'
      + 'fcaaagdeids {ihgd9gdgca-edhhihdc:-hbbdes ses;}.hchgihaa .igiidcfcaaagdeids {ihgd9gdgca-edhhihdc:-hcsges ses;}.igiidcfighh7gahidga {ihgd9gdgca-edhhihdc:-hc7des ses;}.bdghadaag .igiidcfighh7gahidga {ihg'
      + 'd9gdgca-edhhihdc:-hcdges ses;}.hchgihaa .igiidcfighh7gahidga {ihgd9gdgca-edhhihdc:-hcbdes ses;}.hgdchbh9ah {ihgd9gdgca-hbh9a:gga(hbh9ah/hgdcfhbh9ah.9hs);ihgd9gdgca-gaeahi:cd-gaeahi;7ah97i:77es;ahca-7a'
      + 'h97i:77es;bhg9hc-gh97i:ses;ahai7:7des;ihgd9gdgca-edhhihdc:ses ses;}.hgdcfidddbhgdggggaci {ihgd9gdgca-edhhihdc:-ses ses;}.hgdcfidddbhgdggggacif7daag {ihgd9gdgca-edhhihdc:-7des ses;}.hgdcfidddbhgdggggac'
      + 'ifhchgihaa {ihgd9gdgca-edhhihdc:-dses ses;}.hgdcfasehca {ihgd9gdgca-edhhihdc:-bdes ses;}.hgdcfasehcaf7daag {ihgd9gdgca-edhhihdc:-9sses ses;}.hgdcfbhch9aggggaci {ihgd9gdgca-edhhihdc:-97des ses;}.hgdcfb'
      + 'hch9aggggacif7daag {ihgd9gdgca-edhhihdc:-9dses ses;}.hgdcfbhch9aggggacifhchgihaa {ihgd9gdgca-edhhihdc:-9bges ses;}.hgdcfgasgah7ggggaci {ihgd9gdgca-edhhihdc:-7sses ses;}.hgdcfgasgah7ggggacifhchgihaa {i'
      + 'hgd9gdgca-edhhihdc:-ah9es ses;}.hgdcfgasgah7ggggacif7daag {ihgd9gdgca-edhhihdc:-77des ses;}.hgdcfidddbhgdh {ahai7:7ses;ihgd9gdgca-edhhihdc:-7dses ses;}.hgdcfidddbhgdhf7daag {ahai7:7ses;ihgd9gdgca-edhh'
      + 'ihdc:-7bses ses;}.hgdcfge {ahai7:7ses;ihgd9gdgca-edhhihdc:-7cdes ses;}.hgdcfgef7daag {ahai7:7ses;ihgd9gdgca-edhhihdc:-hsdes ses;}.hgdcfgefhchgihaa {ahai7:7ses;ihgd9gdgca-edhhihdc:-h7des ses;}.hgdcfhah'
      + 'gg7 {ihgd9gdgca-edhhihdc:-hgdes ses;}.hgdcfhahgg7fhchgihaa {ihgd9gdgca-edhhihdc:-asaes ses;}.hgdcfhahgg7f7daag {ihgd9gdgca-edhhihdc:-hbges ses;}.hgdcfgdaaheha {ihgd9gdgca-edhhihdc:-gaaes ses;}.hgdcfgd'
      + 'aahehaf7daag {ihgd9gdgca-edhhihdc:-gd9es ses;}.hgdcfaggdg {ihgd9gdgca-edhhihdc:-g9hes ses;7ah97i:9ges;}.hgdcf7aae {ihgd9gdgca-edhhihdc:-gh9es ses;7ah97i:9ces;}.hgdcfhcsd {ihgd9gdgca-edhhihdc:-ggdes se'
      + 's;7ah97i:9ges;}.hgdcfgddisdaaag {ihgd9gdgca-edhhihdc:-gades ses;7ah97i:7ses;}.hgdcfihgd {ihgd9gdgca-edhhihdc:-d9aes ses;ahai7 :7ses;}.hgdcfihgdf7daag {ihgd9gdgca-edhhihdc:-dhaes ses;ahai7 :7ses;}.hgdc'
      + 'fgadhafhahgg7 {ihgd9gdgca-edhhihdc:-ddaes ses;ahai7 :7des;}.hgdcfgadhafhahgg7f7daag {ihgd9gdgca-edhhihdc:-dc9es ses;ahai7:7des;}.gbhgdc {ihgd9gdgca-hbh9a:gga(hbh9ah/hgdchfaf.9hs);ihgd9gdgca-gaeahi:cd-'
      + 'gaeahi;7ah97i:7ses;bhg9hc-gh97i:ses;aagihgha-hah9c:bhaaaa;ahai7:7ses;ihgd9gdgca-edhhihdc:ses ses;}.haghah {ihgd9gdgca-edhhihdc:-ses ses;}.gagfghia9dg9 {ihgd9gdgca-edhhihdc:-7ses ses;}.gagfsdaaag {ihgd'
      + '9gdgca-edhhihdc:-gses ses;}.gagfsdaaagfhahhifsa {ihgd9gdgca-edhhihdc:-9gses ses;}.gagfsdaaagfahhedhaa {ihgd9gdgca-edhhihdc:-9ases ses;}.gagfsdaaagfsgd7ac {ihgd9gdgca-edhhihdc:-97ses ses;}.gagdgafe79hh'
      + 'gha {ihgd9gdgca-edhhihdc:-9sses ses;}.gagdgafabhha {ihgd9gdgca-edhhihdc:-cses ses;}.gagdga {ihgd9gdgca-edhhihdc:-ases ses;}.gagdgafhahhifsa {ihgd9gdgca-edhhihdc:-7sses ses;}.gagdgafahhedhaa {ihgd9gdgc'
      + 'a-edhhihdc:-77ses ses;}.gagdgafsgd7ac {ihgd9gdgca-edhhihdc:-9cses ses;}.gbhgdc {ihgd9gdgca-hbh9a:gga(hbh9ah/hgdchfaf.9hs);ihgd9gdgca-gaeahi:cd-gaeahi;7ah97i:7ses;bhg9hc-gh97i:ses;aagihgha-hah9c:bhaaaa'
      + ';ahai7:7ses;ihgd9gdgca-edhhihdc:ses ses;}.haghah {ihgd9gdgca-edhhihdc:-ses ses;}.gagfghia9dg9 {ihgd9gdgca-edhhihdc:-7ses ses;}.gagfsdaaag {ihgd9gdgca-edhhihdc:-gses ses;}.gagfsdaaagfhahhifsa {ihgd9gdg'
      + 'ca-edhhihdc:-9gses ses;}.gagfsdaaagfahhedhaa {ihgd9gdgca-edhhihdc:-9ases ses;}.gagfsdaaagfsgd7ac {ihgd9gdgca-edhhihdc:-97ses ses;}.gagdgafe79hhgha {ihgd9gdgca-edhhihdc:-9sses ses;}.gagdgafabhha {ihgd9'
      + 'gdgca-edhhihdc:-cses ses;}.gagdga {ihgd9gdgca-edhhihdc:-ases ses;}.gagdgafhahhifsa {ihgd9gdgca-edhhihdc:-7sses ses;}.gagdgafahhedhaa {ihgd9gdgca-edhhihdc:-77ses ses;}.gagdgafsgd7ac {ihgd9gdgca-edhhihd'
      + 'c:-9cses ses;}.shaahgdc {ihgd9gdgca-hbh9a:gga(hbh9ah/gdcghiachihdc.9hs);ihgd9gdgca-gaeahi:cd-gaeahi;7ah97i:7ses;bhg9hc-gh97i:ses;aagihgha-hah9c:bhaaaa;ahai7:7ses;ihgd9gdgca-edhhihdc:ses ses;}.shaa{ihg'
      + 'd9gdgca-edhhihdc:ses ses;}.shaafhggdihi{ihgd9gdgca-edhhihdc:-7ses ses;}.shaafheeaa{ihgd9gdgca-edhhihdc:-gses ses;}.shaafheeahghihdc{ihgd9gdgca-edhhihdc:-ases ses;}.shaafhgahd{ihgd9gdgca-edhhihdc:-cses'
      + ' ses;}.shaafasgaa{ihgd9gdgca-edhhihdc:-9sses ses;}.shaaf7iba{ihgd9gdgca-edhhihdc:-97ses ses;}.shaafhbh9a{ihgd9gdgca-edhhihdc:-9gses ses;}.shaafghah{ihgd9gdgca-edhhihdc:-9ases ses;}.shaafghahhgghei{ihg'
      + 'd9gdgca-edhhihdc:-9cses ses;}.shaafbhadga{ihgd9gdgca-edhhihdc:-7sses ses;}.shaafeei{ihgd9gdgca-edhhihdc:-77ses ses;}.shaafegdgagi{ihgd9gdgca-edhhihdc:-7gses ses;}.shaaffghgdihba{ihgd9gdgca-edhhihdc:-7'
      + 'ases ses;}.shaafiasi{ihgd9gdgca-edhhihdc:-7cses ses;}.shaafahaad{ihgd9gdgca-edhhihdc:-hsses ses;}.ahdh{ihgd9gdgca-edhhihdc:-hcses ses;}.shaafsba{ihgd9gdgca-edhhihdc:-h7ses ses;}.shaaf7he{ihgd9gdgca-ed'
      + 'hhihdc:-hgses ses;}.sdaaag{ihgd9gdgca-edhhihdc:-hases ses;}.shaafagdeids {ihgd9gdgca-edhhihdc:-gsses ses;}.aaaaiafhbhaa{ihgd9gdgca-edhhihdc:-ggses ses;ggghdg:edhciag;}.egiahgfh7hga{ihgd9gdgca-edhhihdc'
      + ':-gases ses;}.h7hga{ihgd9gdgca-edhhihdc:-gcses ses;}.eghahia{ihgd9gdgca-edhhihdc:-dsses ses;}.gddisdaaag{ihgd9gdgca-edhhihdc:-dcses ses;}.adacfhggda{ihgd9gdgca-edhhihdc:-a77es ses;ahai7:9ces;}.7aae{ih'
      + 'gd9gdgca-edhhihdc:-agses ses;}.ighh7 {ihgd9gdgca-edhhihdc:-acses ses;}.hggdafgh97i {ihgd9gdgca-edhhihdc:-bs7es ses;ahai7:9ces;}.igahagggbih {a7hia-hehga:cdaghe;}.igahagggbih .igahagggbihfgddi {aagihgh'
      + 'a-hah9c:bhaaaa;ehaahc9:s;}.igahagggbih .igahagggbihfhggda {aagihgha-hah9c:bhaaaa;ehaahc9-aasi:7es;}.igahagggbih .igahagggbihfahgchba {aagihgha-hah9c:bhaaaa;ehaahc9-aasi:7es;sdci-shbha9:aghha,aaaaaihgh'
      + ',hhch-haghs;sdci-hh7a:9ab;}.igahagggbih .igahagggbihfahgchba hcegi {ihgd9gdgca:ighchehgaci;idgaag:cdca;ehaahc9:ses;bhg9hc:ses;ahai7:9ss%;}a {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;}a:ahcd {iasi'
      + '-aagdghihdc:cdca;gdadg:#ssssss;}a:ahhhiaa {iasi-aagdghihdc:cdca;gdadg:#ssssss;}a:hgihaa {iasi-aagdghihdc:cdca;gdadg:#ssssss;}a:ahcd.iddaihgfigiidcfahcd {iasi-aagdghihdc:cdca;gdadg:#ssssss;}a:ahhhiaa.i'
      + 'ddaihgfigiidcfahcd  {iasi-aagdghihdc:cdca;gdadg:#ssssss;}a:hgihaa.iddaihgfigiidcfahcd  {iasi-aagdghihdc:cdca;gdadg:#ssssss;}a:7daag.iddaihgfigiidcfahcd  {iasi-aagdghihdc:cdca;gdadg:#ggbggg;ggghdg:edhc'
      + 'iag;}a:ahcd.aaaaa9fiasi {iasi-aagdghihdc:cdca;gdadg:#gggggg;sdci-hh7a:dd%;}a:ahhhiaa.aaaaa9fiasi {iasi-aagdghihdc:cdca;gdadg:#gggggg;sdci-hh7a:dd%;}a:hgihaa.aaaaa9fiasi {iasi-aagdghihdc:gcaagahca;gdad'
      + 'g:#ssssss;sdci-hh7a:dd%;}a:7daag.aaaaa9fiasi {iasi-aagdghihdc:cdca;gdadg:#ggbggg;sdci-hh7a:dd%;ggghdg:edhciag;}a:ahcd.aaaaa9fhgihaafhagihdc {iasi-aagdghihdc:cdca;gdadg:#gggggg;sdci-aah97i:idaa;sdci-hh'
      + '7a:dd%;}a:ahhhiaa.aaaaa9fhgihaafhagihdc {iasi-aagdghihdc:cdca;gdadg:#gggggg;sdci-aah97i:idaa;sdci-hh7a:dd%;}a:hgihaa.aaaaa9fhgihaafhagihdc {iasi-aagdghihdc:gcaagahca;gdadg:#ssssss;sdci-aah97i:idaa;sdc'
      + 'i-hh7a:dd%;}a:7daag.aaaaa9fhgihaafhagihdc {iasi-aagdghihdc:cdca;gdadg:#ggbggg;sdci-hh7a:dd%;sdci-aah97i:idaa;ggghdg:edhciag;}a:ahcd.aaaaa7fiasi {iasi-aagdghihdc:cdca;gdadg:#cdcdcd;}a:ahhhiaa.aaaaa7fia'
      + 'si {iasi-aagdghihdc:cdca;gdadg:#cdcdcd;}a:hgihaa.aaaaa7fiasi {iasi-aagdghihdc:gcaagahca;gdadg:#cdcdcd;}a:7daag.aaaaa7fiasi {iasi-aagdghihdc:gcaagahca;gdadg:#ggbggg;ggghdg:edhciag;}a:ahcd.aaaaahfiasi {'
      + 'iasi-aagdghihdc:cdca;gdadg:#cdcdcd;ahca-7ah97i:7ses;}a:ahhhiaa.aaaaahfiasi {iasi-aagdghihdc:cdca;gdadg:#cdcdcd;ahca-7ah97i:7ses;}a:hgihaa.aaaaahfiasi {iasi-aagdghihdc:gcaagahca;gdadg:#cdcdcd;ahca-7ah9'
      + '7i:7ses;}a:7daag.aaaaahfiasi {iasi-aagdghihdc:cdca;gdadg:#ggbggg;ggghdg:edhciag;ahca-7ah97i:7ses;}a:ahcd.gcaagahca {gdadg:#ssssss;iasi-aagdghihdc:gcaagahca;ggghdg:edhciag;}a:ahhhiaa.gcaagahca {gdadg:#'
      + 'ssssss;iasi-aagdghihdc:gcaagahca;}a:hgihaa.gcaagahca {iasi-aagdghihdc:gcaagahca;gdadg:#ssssss;}a:7daag.gcaagahca {iasi-aagdghihdc:gcaagahca;gdadg:#ggbggg;}.igahagggbih hcegi {ggghdg:edhciag;}.igahaggg'
      + 'bih hcegi:7daag.hchgihaa {ggghdg:aashgai;gdadg:#adadad;}a:7daag,a.sdggh,a:ahcd.sdggh,a:ahhhiaa.sdggh,a:7daag.sdggh,a:hgihaa.sdggh,.ihiehhi igiidc:7daag,.igahagggbih hcegi:7daag {iasi-aagdghihdc:cdca;g'
      + 'dadg:#ggbggg;ggghdg:edhciag;}h hb9 {idgaag:cdca;}ida9 {ehaahc9-gh97i:ses;ehaahc9-aasi:ses;ehaahc9-idiidb:ses;ehaahc9-ide:ses;bhg9hc-gh97i:ses;bhg9hc-aasi:ses;bhg9hc-ide:ses;bhg9hc-idiidb:ses;ihgd9gdgc'
      + 'a-gdadg:#gggggg;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:bg%;}ihiaa {sdci-hh7a:9ab;}ihiaa ihiaa {sdci-hh7a:9ss%;}.aasigadhi  {sadhi:aasi;}i  {sdci-aah97i:idaa;}.igiidc {sdci-shbha9:sh7d'
      + 'bh,aghha,aaaaaihgh,hhch-haghs;ehaahc9:des;iasi-hah9c:gaciag;sadhi:aasi;}.ihhhgsgiidc {ehaahc9:ses;bhg9hc:ses;idgaag-hi9aa:cdca;ihgd9gdgca-gdadg:ighchehgaci;ggghdg:edhciag;}.ihhhgsgiidc .igiidcfiasi {a'
      + 'hca-7ah97i:7ses;sdci-hh7a:9ab;}.ihhhgsgiidc.bdghadaag .igiidcfiasi {gdadg:#ggbggg;}.ihhhgsgiidc.hchgihaa .igiidcfiasi {gdadg:#sgsgsg;ggghdg:aashgai;}.aasifigiidc {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hh'
      + 'ch-haghs;sdci-hh7a:s.dab;ehaahc9-ide:des;ehaahc9-aasi:des;ehaahc9-gh97i:des;iasi-hah9c:gaciag;sadhi:aasi;bhc-ahai7:dses;}.gh97ifigiidc {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:s.dab;eh'
      + 'aahc9:des;iasi-hah9c:gaciag;sadhi:gh97i;}.gdagbcf7ahaag {sdci-aah97i:idaa;sdci-hh7a:dd%;ahca-7ah97i:9des;gdadg:#ssssss;ehaahc9-ide:7es;ehaahc9-aasi:7es;ehaahc9-gh97i:7es;a7hia-hehga:cdaghe;iasi-hah9c:'
      + 'aasi;}.hgdcfgdagbcf7ahaag {ehaahc9-aasi:7des;}.ahihfgda i7 {iasi-hah9c:aasi;sdci-aah97i:cdgbha;}.ahihfgda .cd7hih {iasi-hah9c:gaciag;}#idddbhgdfihiaa i7 h {ehaahc9-aasi:9ses;}.ahihfgda {7ah97i:7des;ih'
      + 'gd9gdgca-gdadg:#gggggg;}.ahihfahhi9dagbc    {ehaahc9-aasi:des;ehaahc9-gh97i:des;ahca-7ah97i:7des;}.agdeadac {idgaag-idiidb:9es iahgd;idgaag-gh97i:9es iahgd;idgaag-aasi:9es #9s9s9s;idgaag-ide:9es #9s9s'
      + '9s;ahhhihahi9:7haaac;edhhihdc:hihdagia;ahai7:7sses;7-hcaas:9;ehaahc9:ses;ggghdg:edhciag;}.haaagi {ihgd9gdgca-gdadg:#g9gdga;sadhi:aasi;}haaagi.gghiaghh {sdci-hh7a:s.dab;ahai7:9cses;}.hbhaa {sdci-hh7a:d'
      + 'd%;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;}.ihiaaaehgag  {ahai7:7ses;}.iasihcegi  {ehaahc9:des;bhg9hc:ses;aagihgha-hah9c:ide;}i7 {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-aah97i:idaa;'
      + 'sdci-hh7a:dd%;}.ihiaa  {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;sdci-aah97i:idaa;}.ahaga  {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;}.aaaaafiddaihg {gaahg:idi7;a'
      + 'hai7:hgid;7ah97i:gces;ihgd9gdgca-gdadg:#d77ahc;}.iddaihgfaasi {sadhi:aasi;ahai7:hgid;iasi-hah9c:gaciag;}.iddaihgfgh97i {sadhi:gh97i;ahai7:hgid;iasi-hah9c:gaciag;}aha.iddaihg {sadhi:aasi;}.iddaihgfid9f'
      + 'aasi {sadhi:aasi;}.iddaihgfid9 {gdadg:#ssssss;sadhi:aasi;}.iddaihgfid9fgh97i {sadhi:aasi;}.iddaihgfigiidc {sadhi:aasi;iasi-hah9c:gaciag;ggghdg:edhciag;ehaahc9:ces ses ces ses;bhg9hc:ses;idgaag:ses cdc'
      + 'a;ihgd9gdgca-gdadg:ighchehgaci;}.iddaihgfigiidc.hchgihaa {ggghdg:hgid;}.iddaihgfigiidcfhgdc {gaahg:gh97i;sadhi:cdca;bhg9hc-aasi:hgid;bhg9hc-gh97i:hgid;idgaag:ses;}.iddaihgfigiidc .igiidcfiasi,.iddaihg'
      + 'figiidc hehc {ahheah9:iadgd;sdci-hh7a:s.cab;ehaahc9-aasi:des;ehaahc9-gh97i:des;sdci-shbha9:aghha,aaaaaihgh,hhch-haghs;ahca-7ah97i:s.cab;iasi-aagdghihdc:cdca;}.iddaihgfigiidc.bdghadaag .igiidcfiasi {gd'
      + 'adg:#ggbggg;}.iddaihgfigiidc.hchgihaa .igiidcfiasi {gdadg:9gh9;}.iicfahih9dcigdafaasi  {sadhi:aasi;ehaahc9-aasi:des;}.cdaghe,.cdaghe ia,.iaehiaa {a7hia-hehga:cdaghe;}ihiaa.cdaghe,ihiaa.cdaghe ig,ia.ag'
      + 'he {a7hia-hehga:cdgbha;}.ihifhbhaafaasi {sadhi:aasi;}.ihifhbhaafgh97i  {sadhi:aasi;}.ihifhbhaafid9  {sadhi:aasi;sdci-hh7a:dd%;}.ihifhbhaafid9 h {ahca-7ah97i:7ses;ehaahc9-ide:7es;}.ihifhbhaafdssfaasi {'
      + 'sadhi:aasi;ahai7:7ses;ehaahc9-ide:7es;}.ihifhbhaafdssfgh97i  {sadhi:aasi;ehaahc9-ide:7es;}.ihifhbhaafdssfid9  {sadhi:aasi;sdci-hh7a:dd%;ehaahc9-ide:7es;}aha.ihifhbhaa {idgaag-aasi:9es hdaha #7a77hh;id'
      + 'gaag-gh97i:9es hdaha #7a77hh;idgaag-idiidb:9es hdaha #7a77hh;}aha.aaaaa9 {ahai7:hgid;gaahg:idi7;}aha.aaaaa9faasi  {sadhi:aasi;ehaahc9-aasi:des;ehaahc9-ide:7es;ehaahc9-idiidb:7es;7ah97i:9ges;}aha.aaaaa'
      + '9fgh97i {sadhi:gh97i;ehaahc9-aasi:des;ehaahc9-ide:7es;ehaahc9-idiidb:7es;7ah97i:9ges;}.aaaaa9fiasi {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;gdadg:#gggggg;sdci-hh7a:dd%;ehaahc9-aasi:7es;ehaahc9-g'
      + 'h97i:7es;}.aaaaa9fad9hc {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;gdadg:#gggggg;sdci-hh7a:dd%;sdci-aah97i:idaa;ehaahc9-aasi:des;ehaahc9-gh97i:des;}.aaaaa9fad9dgi {bhg9hc-gh97i:7es;}aha.ad9d  {sad'
      + 'hi:aasi;}.aaaaa7fiasi {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;gdadg:#i7i7i7;sdci-aah97i:idaa;ehaahc9-aasi:des;ehaahc9-gh97i:des;ahca-7ah97i:hhes;}.aaaaafadghihdc {gaahg:idi7;ahai7:hgid;7ah97i:7'
      + 'ces;ihgd9gdgca-gdadg:#d77ahc;edhhihdc:gaahihaa;}.adghihdcfaasi {bhg9hc-aasi:hes;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;}.aaaaafigahagggbi {gaahg:idi7;ahai7:hgid;7ah97i:7ces;ihgd9g'
      + 'dgca-gdadg:#d77ahc;}.igahagggbifaasi {ahai7:hgid;bhg9hc-gh97i:7dses;}.igahagggbifgh97i {sadhi:gh97i;ahai7:hgid;ahai7:7gces;}.igahagggbifigiidc {sadhi:aasi;bhg9hc-aasi:ses;bhg9hc-gh97i:ses;bhg9hc-ide:9'
      + 'es;ggghdg:edhciag;7ah97i:7ces;ihgd9gdgca-gdadg:ighchehgaci;idgaag:cdca;ehaahc9:ses;}.igahagggbifhbh9a {bhg9hc-aasi:hes;bhg9hc-gh97i:hes;bhg9hc-ide:9es;ggghdg:edhciag;7ah97i:7ces;idgaag:cdca;}.igahaggg'
      + 'bifehi7fgdcihhcag {ihgd9gdgca-gdadg:a7hia;ahai7:hgid;ehaahc9-ide:ses;ehaahc9-idiidb:ses;}.igahagggbihcah {ahai7:bes;7ah97i:7ces;ihgd9gdgca-gdadg:#d77ahc;}.igahagggbifehi7figiidc {sadhi:aasi;bhg9hc-gh9'
      + '7i:9es;bhg9hc-ide:9es;bhg9hc-aasi:ses;}.cdsdgaag {idgaag:cdca;}.igahagggbifehi7fahcd {idgaag:cdca;}.igahagggbifehi7 {sadhi:aasi;}.igahagggbifehi7faasi,.igahagggbifehi7fgh97i {sdci-shbha9:sh7dbh,aghha,'
      + 'aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;}.igahagggbifehi7fiasi {iasi-aagdghihdc:cdca;gdadg:#ssssss;sdci-hh7a:s.dab;ahca-7ah97i:7ges;bhg9hc-aasi:hes;}.hahgg7fehi7fgdcihhcag7 {sadhi:gh97i;ihgd9gdgca-gdadg:a7'
      + 'hia;gdadg:9gh9;ehaahc9-ide:ses;ehaahc9-idiidb:ses;7ah97i:7ges;idgaag:7es hdaha #d77ahc;}.hahgg7fhcegi7 {sadhi:aasi;ahai7:9gces;aagihgha-hah9c:bhaaaa;bhg9hc-aasi:9es;idgaag:7es hdaha a7hia;ihgd9gdgca-g'
      + 'dadg:a7hia;}#hahgg7iasi {sdci-shbha9:sh7dbh,dacaah,hhch-haghs;sdci-hh7a:9ab;}#hahgg7sddaihg {sdci-hh7a:9ab;}.hahgg7fehi7figiidc {sadhi:aasi;bhg9hc-aasi:ses;bhg9hc-ide:9es;bhg9hc-gh97i:9es;ggghdg:edhci'
      + 'ag;idgaag:cdca;}.ahgagidg9fehi7  {sadhi:aasi;}aha.ehi7faasi,aha.ehi7fgh97i {sadhi:aasi;sdci-aah97i:cdgbha;bhg9hc:ses;ahca-7ah97i:7des;ihgd9gdgca-gdadg:#d77ahc;}aha.ggggacifehi7figiidch  {ihgd9gdgca-gd'
      + 'adg:#d77ahc;sadhi:aasi;}aha.idddbhgdh {sadhi:aasi;ihgd9gdgca-gdadg:#d77ahc;7ah97i:7des;ahca-7ah97i:7des;}ga.idddbhgd {ihgd9gdgca-gdadg:#gsg9g9;}ah.idddbhgd {ahhi-hi9aa:cdca;ehaahc9-aasi:des;ehaahc9-id'
      + 'e:7es;ehaahc9-idiidb:ses;ehaahc9-gh97i:des;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:s.dab;}ah.bhch9afidddbhgdh {ahhi-hi9aa:cdca;ehaahc9-aasi:des;ehaahc9-ide:7es;ehaahc9-idiidb:ses;ehaah'
      + 'c9-gh97i:des;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;idgaag-ide:9es hdaha #7d7d7d;sdci-hh7a:s.dab;}aha.hahgg7  {sadhi:aasi;ahai7:hgid;ihgd9gdgca-gdadg:#d77ahc;}aha.9dd9aafhahgg7 {sadhi:gh97i;ihg'
      + 'd9gdgca-gdadg:#d77ahc;}aha.hahgg7fids  {sdci-aah97i:cdgbha;bhg9hc:ses;ahca-7ah97i:7des;sadhi:aasi;ihgd9gdgca-gdadg:#d77ahc;}.bacg {idgaag-idiidb:9es hdaha #cscscs;idgaag-gh97i:9es hdaha #cscscs;idgaag'
      + '-ide:9es hdaha #gggggg;idgaag-aasi:9es hdaha #gggggg;ihgd9gdgca-gdadg:#gggggg;sdci-shbha9:aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:s.dab;ehaahc9:ses;}aha.shaafbhch9ag  {ehaahc9:ses;ihgd9gdgca-gdadg:#s7sca'
      + '7;idgaag:9es hdaha #sgsgsg;ahai7:9ss%;sadhi:aasi;}aha.sddiag  {ahai7:hgid;sadhi:gh97i;ehaahc9-ide:7es;ehaahc9-idiidb:ses;}aha.bahhh9a {sadhi:aasi;sdci-aah97i:cdgbha;sdci-hh7a:dd%;gdadg:iahgd;bhg9hc:se'
      + 's;ahca-7ah97i:77es;ahai7:hgid;ehaahc9:7es;}.gh97ifgahgd {idgaag:9es hdaha #9s9s9s;ihgd9gdgca-gdadg:#gsgggg;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:s.dab;ahhhihahi9:7haaac;edhhihdc:hihd'
      + 'agia;ahai7:97ses;7-hcaas:9;ehaahc9:9ses;ggghdg:edhciag;}aha.ehgdehhi {ihgd9gdgca-gdadg:#gggggg;idgaag:9es hdaha #b99h7h;ehaahc9:des;}aha.ehgdehhiagah {gaahg:idi7;ehaahc9:9ses;}.bhch9afeh9a {ihgd9gdgca'
      + '-gdadg:#ghghgh;}.gdbbaci {edhhihdc:gaahihaa;bhg9hc-ide:7es;ehaahc9:9ses;gaahg:gh97i;}.aaac9dbbaci {ihgd9gdgca:#gggggg;}.daa9dbbaci {ihgd9gdgca-gdadg:#ghghgh;idgaag-ide:#sgsgsg;idgaag-idiidb:#sgsgsg;}.'
      + 'haa9dbbaciagah {bhg9hc-idiidb:des;}.gdbbaciagi7dg {sdci-hh7a:9ab;sdci-aah97i:idaa;ehaahc9-idiidb:des;}.gdbbacisasi {sdci-hh7a:dd%;ehaahc9-idiidb:9es;}.gdbbacishbahihbe {sdci-hh7a:s.cab;}.gdbbaci7aaaia'
      + '97agdids {edhhihdc:hihdagia;gh97i:9ses;ide:9ses;ggghdg:edhciag;}aha.eh9afihiaa  {gaahg:idi7;ahai7:hgid;}aha.hhaafchah9hihdc {bhg9hc-ide:ses;}ia.hhaafchah9hihdc {ihgd9gdgca-hbh9a:gga(hi9aah/hhaafchafid'
      + '9.ge9);ihgd9gdgca-gaeahi:gaeahi-s;ahai7:9bdes;idgaag-gh97i:9es hdaha #sgsgsg;}.ihiehhi {bhg9hc-aasi:7ses;bhg9hc-ide:7ses;bhg9hc-idiidb:7ses;ehaahc9-aasi:9bes;}.ihiehhi igiidc {ihgd9gdgca-gdadg:ighcheh'
      + 'gaci;idgaag:ses cdca;bhg9hc:ses;ehaahc9:ses;ggghdg:edhciag;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;iasi-hah9c:aasi;}.ihiehhi ah {ehaahc9-aasi:ses;ehaahc9-ide:ses;ehaahc9-gh97i:ses;'
      + 'ehaahc9-idiidb:ges;ahhi-hi9aa-i9ea:cdca;sdci-hh7a:s.dab;}.aaihfhiabfhgihaa {ahhi-hi9aa-hbh9a:gga(hbh9ah/haaagiaafhgihdc.9hs);}.aaihfhiabfhgihaa igiidc {sdci-aah97i:idaa;}aha.gh97ifeh9afgdciaci  {ahai7'
      + ':hgid;ihgd9gdgca-gdadg:a7hia;}aha.hbhaafhgifiddaihg {ihgd9gdgca-gdadg:#9s9s9s;7ah97i:7des;ehaahc9-idiidb:des;}aha.hgifigiidc  {sdci-hh7a:s.dab;ehaahc9-aasi:7es;ehaahc9-gh97i:7es;sadhi:aasi;iasi-hah9c:'
      + 'gaciag;}aha.eh9afihiaa  {bhg9hc:ses;}.eh9afihiaa hcegi,.eh9afihiaa hgibhi,.eh9afihiaa haaagi,.eh9afihiaa iasihgah,.sdgbfgdciaci iasihgah {sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;}a'
      + 'ha.eh9afahih {bhg9hc:9ses;sadhi:aasi;}aha.bdahafsdgb  {idgaag:9es hdaha #a9a9a9;bhc-ahai7:gases;}aha.sdgbfgdciaci  {bhg9hc:7as;gaahg:idi7;ahai7:hgid;}.sdgbfgdciaci h {sdci-hh7a:9ab;}aha.sdgbfihiaafihg'
      + '  {idgaag-aasi:9es hdaha #b99h7h;idgaag-gh97i:9es hdaha #b99h7h;gaahg:idi7;}.sdgbfihiaafiasi  {ahca-7ah97i:7aes;sdci-shbha9:sh7dbh,aghha,aaaaaihgh,hhch-haghs;sdci-hh7a:9ab;sdci-aah97i:idaa;gdadg:#hhhh'
      + 'hh;sdci-aah97i:idaa;aagihgha-hah9c:ihhaahca;bhg9hc:ses;ehaahc9-aasi:des;}.iicfeh9a9dcigdafaasi  {ehaahc9-ide:ges;sadhi:aasi;}.iicfeh9a9dcigdafgh97i {ehaahc9-ide:ges;sadhi:gh97i;}aha.sdgbfgdcigdah {gaa'
      + 'hg:idi7;}aha.ghahdfigiidch  {ehaahc9:des;}.aaig9sdgaag {idgaag:9es hdaha gaa;}.aaig9 {idgaag:9es hdaha #iii;}.haahcgaafhahgg7  {ahai7:hgid;gaahg:idi7;bhg9hc:9ses;ihgd9gdgca-gdadg:#ac7ahs;edhhihdc:gaah'
      + 'ihaa;}aha.hahgg7fid9  {edhhihdc:gaahihaa;ihgd9gdgca-gdadg:#h9h9h9;idgaag-idiidb:7es hdaha #d9a9sb;}.hahgg7fgdcihhcag {ahai7:hgid;bhg9hc-aasi:7ses;ehaahc9-ide:9ses;}aha.hahgg7fgefaasifgdgcag  {sadhi:aa'
      + 'si;}aha.hahgg7fgefgh97ifgdgcag {sadhi:gh97i;}.hahgg7fihiaa {sdci-hh7a:dd%;sdci-aah97i:idaa;ehaahc9-aasi:des;ehaahc9-ide:des;}.hahgg7fgghiaghh {ehaahc9-aasi:9ses;ehaahc9-gh97i:ses;ehaahc9-ide:des;sdci-'
      + 'hh7a:dd%;ihgd9gdgca-gdadg:#gggggg;idgaag:9es hdaha #sgsgsg;}aha.hahgg7figiidcfgda {ehaahc9-ide:des;idgaag-ide:9es hdaha #sgsgsg;sadhi:aasi;ahai7:9ss%;}aha.hahgg7figiidcfgdcihhcag {sadhi:gh97i;}aha.hah'
      + 'gg7fhaa9ghiaghhfgda {idgaag-idiidb:9es hdaha #sgsgsg;sadhi:aasi;ahai7:9ss%;7ah97i:7des;}aha.hahgg7fgghiaghhfgdcihhcag {idgaag:7es hdaha #d9a9sb;ehaahc9:des;}.hgdcehiaafiasi {sadhi:aasi;bhg9hc:ses;7ah9'
      + '7i:7des;ahca-7ah97i:7des;ehaahc9-gh97i:des;sdci-hh7a:dd%;sdci-aah97i:idaa;}aha.hgdc    {ahai7:7des;7ah97i:7des;sadhi:aasi;}a:ahcd.hahgg79ghiaghhfiasi {iasi-aagdghihdc:gcaagahca;gdadg:#ssssss;sdci-hh7a'
      + '{sadhi:aasi;ahhi-hi9aa:cdca;bhg9hc-ide:hes;}.7aae9dcihhcag {edhhihdc:hihdagia;ide:7es;gh97i:7es;bhg9hc:ses;ehaahc9:ses;idgaag:ses cdca;7-hcaas:g;ggghdg:edhciag;ahhhihahi9:hc7aghi;ihgd9gdgca-gdadg:ighc'
      + 'hehgaci;}.7aae9dcihhcagaihihg {bhg9hc:ses;ehaahc9:ses;ggghdg:edhciag;ahhhihahi9:hc7aghi;}.9gh-bdagaa .7aae9dcihhcag {gh97i:ges;}.9gh-ahhad9 .9gh-ehcaa .7aae9dcihhcag {gh97i:7ses;}.sdgb7hih  {sdci-hh7a'
      + ':9ab;}ihiaa.cdihs9shiaa {idgaag:ses;}ihiaa.cdihs9shiaa .aasi9dagbc {iasi-hah9c:gh97i;aagihgha-hah9c:ide;sdci-aah97i:idaa;}ihiaa.cdihs9shiaa .gh97i9dagbc {iasi-hah9c:aasi;}ihiaa.hgeagihiaa {bhg9hc:s s '
      + 's 7es;}ihiaa.hgeagihiaa iida9 ig ia.geadhaf7ahaag {idgaag-ide:9es hdaha g9i(9g7,9g7,9g7);idgaag-gh97i:9es hdaha g9i(9g7,9g7,9g7);idgaag-idiidb:cdca;idgaag-aasi:9es hdaha g9i(9g7,9g7,9g7);ihgd9gdgca:g9'
      + 'i(77d,77d,77d);ehaahc9:s;sdci-hh7a:s;7ah97i:hses;}ihiaa.hgeagihiaa iida9 ig ia.geadhaf7ahaag ihiaa {sdci-aah97i:ass;sdci-hh7a:9ab;ihgd9gdgca:ighchehgaci;gdadg:iahgd;ahai7:9ss%;bhg9hc:s;}ihiaa.hgeagihi'
      + 'aa iida9 ig ia.gdcihhchfgeadha {bhg9hc:s;ehaahc9-aasi:s;}aha.geadha {bhg9hc:s;ehaahc9:s;daagsada:hgid;7ah97i:7hses;ahai7:asses;idgaag:9es hdaha g9i(9g7,9g7,9g7);ihgd9gdgca:a7hia;}aha.geadha ihiaa {7ah'
      + '97i:9ss%;idgaag:cdca;}.geadha-daagaghia {}aha.geadha ihiaa iida9 ig {7ah97i:7des;}aha.geadha ihiaa iida9 ig#geadhafiahcdgda {7ah97i:hgid;}.geadhafsddiag {idgaag-ide:cdca;idgaag-gh97i:9es hdaha g9i(9g7'
      + ',9g7,9g7);idgaag-idiidb:9es hdaha g9i(9g7,9g7,9g7);idgaag-aasi:9es hdaha g9i(9g7,9g7,9g7);7ah97i:hses;ihgd9gdgca:g9i(77d,77d,77d);}.iaehiaa {sdci-aah97i:idaa;}.ihiaaf7ahaag {sdci-aah97i:idaa;sdci-hh7a'
      + ':9ab;gdadg:#ssssss;ahca-7ah97i:7hes;ahai7:9ss%;}.gh97ifihiaaf7ahaag {ahca-7ah97i:7hes;ahai7:hes;sdci-aah97i:idaa;gdadg:#ssssss;sdci-hh7a:9ab;}.aasifihiaaf7ahaag {ahca-7ah97i:7hes;ahai7:ges;sdci-aah97i'
      + '{ihgd9gdgca-gdadg:#gggggg;ia77bgd-abdas:ses;ia77bgd-ehgs:ses;ia77bgd-shsshf:ses;ia77bgd-shi:hces;faadbg-abdas:des;faadbg-ehgs:des;faadbg-shi:hces;faadbg-shsshf:ses;ghgs-abah:9ss%;}.aabhcfhaiahiaa    {'
      + 'sdci-hh7a:9ab;}#shaahgdgb {edhhihdc:hihdagia;ide:ses;aasi:ses;ahai7:ses;7ah97i:ses;}.aaaaafhgiihih    {ihgd9gdgca-gdadg:#gggggg;7ah97i:7ses;}.gdagbcf7ahaagfadc9 {sdci-hh7a:dd%;7ah97i:hses;gdadg:#sssss'
      + 's;}aha.ihifhaafeagbhhhhdch,aha.ihifihhhgfeagbhhhhdch {sadhi:aasi;ahai7:hgid;iasi-hah9c:gaciag;}aha.eagbhhhhdchbhhaehhi {bhg9hc:ses;ehaahc9-aasi:7ses;ehaahc9-ide:des;ehaahc9-idiidb:des;}aha.eagbhhhhdch'
      + 'bhhaehhi ga {bhg9hc:ses;ehaahc9:ses ses ses 9ses;}aha.hgdcehiaafiasi {sadhi:aasi;bhg9hc:ses;7ah97i:7des;ahca-7ah97i:7des;ehaahc9-gh97i:des;sdci-aah97i:idaa;}aha.hgdc    {ahai7:7des;7ah97i:7des;sadhi:a'
      + 'asi;}a.ahia {gdadg:#ggssss;sdci-aah97i:cdgbha;}a:ahhhiaa.ahia {gdadg:#ggssss;sdci-aah97i:cdgbha;}a:7daag.ahia {gdadg:#ggssss;sdci-aah97i:cdgbha;}a:hgihaa.ahia {gdadg:#ggssss;sdci-aah97i:cdgbha;}.ahia'
      + '{9heha:#ggssss;ghgs-hhbdas:idaa;}.gh97ifiddaihg {sadhi:gh97i;ehaahc9-gh97i:des;}aha.asfhahgg7fid9  {bhg9hc-aasi:hes;bhg9hc-gh97i:hes;bhg9hc-idiidb:9ses;idgaag-idiidb:7es hdaha #d9a9sb;}.asfhahgg7  {ah'
      + 'ai7:hgid;gaahg:idi7;7ah97i:9hses;ehaahc9-ide:ses;bhg9hc:ses;ihgd9gdgca-gdadg:#d77ahc;}aha.asfhahgg7faasiaca  {sadhi:aasi;}aha.asfhahgg7fgh97iaca {sadhi:gh97i;}.ahih h {sdci-hh7a:9ab;}.asfhahgg7fgdcihh'
      + 'cag {sadhi:aasi;bhg9hc-ide:des;}ia.asfhahgg7fiasi {sdci-hh7a:s.dab;}.asfhahgg7fiasi hcegi {sdci-hh7a:s.dab;}.asfhahgg7fiasi haaagi {sdci-hh7a:s.dab;}ia.asfihiaaaehgag {ahai7:9ses;}.asfihiaa9aaa {ehaah'
      + 'c9-aasi:9ses;ehaahc9-gh97i:des;}aha.hgihdcfhiae {ehaahc9-ide:7es;ehaahc9-idiidb:7es;ehaahc9-aasi:des;ehaahc9-gh97i:9ses;bhg9hc-gh97i:9des;ihgd9gdgca-gdadg:a7hia;idgaag-idiidb:7es dgihai;idgaag-gh97i:7'
      + 'es dgihai;ahai7:dd%;}aha.aaghhhdcfhiae  {ehaahc9-ide:7es;ehaahc9-idiidb:7es;ehaahc9-aasi:des;ehaahc9-gh97i:des;ihgd9gdgca-gdadg:a7hia;idgaag-idiidb:7es dgihai;idgaag-gh97i:7es dgihai;ahai7:dd%;}aha.i7'
      + 'ac  {ihgd9gdgca:#hhgggh;ehaahc9-ide:7es;ehaahc9-idiidb:7es;ehaahc9-aasi:7es;ehaahc9-gh97i:des;idgaag-idiidb:7es dgihai;idgaag-gh97i:7es dgihai;ahai7:dd%;}aha.i7acfida9 {ehaahc9-ide:des;ehaahc9-idiidb:'
      + 'des;ehaahc9-aasi:9ses;ehaahc9-gh97i:des;ahai7:dd%;}aha.aaha {ihgd9gdgca:#hhgggh;ehaahc9-ide:7es;ehaahc9-idiidb:7es;ehaahc9-aasi:7es;ehaahc9-gh97i:des;idgaag-idiidb:7es dgihai;idgaag-gh97i:7es dgihai;a'
      + 'hai7:dd%;}aha.aahafida9 {ehaahc9-ide:des;ehaahc9-idiidb:des;ehaahc9-aasi:9ses;ehaahc9-gh97i:des;ahai7:dd%;}aha.haafhiae {ehaahc9-ide:9ses;ehaahc9-idiidb:9ses;iasi-hah9c:gaciag;}aha.casifhiae  {ihgd9gd'
      + 'gca:#hhgggh;ehaahc9-ide:7es;ehaahc9-idiidb:7es;ehaahc9-aasi:7es;ehaahc9-gh97i:des;idgaag-idiidb:7es dgihai;idgaag-gh97i:7es dgihai;ahai7:dd%;}aha.hsfida9 {ehaahc9-ide:des;ehaahc9-idiidb:des;ehaahc9-aa'
      + 'si:9ses;ehaahc9-gh97i:des;ahai7:dd%;}aha.ehghbaiagh {ehaahc9-ide:des;ehaahc9-idiidb:des;ehaahc9-aasi:9ses;ehaahc9-gh97i:des;ahai7:dd%;}aha.eh9afida9  {ehaahc9-ide:9ses;ehaahc9-aasi:9ses;}aha.h7dgifhgi'
      + 'hdcfchba  {sdci-hh7a:9ss%;}aha.h7dgifaaghhhdcfchba  {sdci-hh7a:9ss%;}.gahaagfcdihshghihdc {ahheah9:cdca;}.gahaaghaabaci {edhhihdc:hihdagia;ide:-9es;aasi:-9ses;7ah97i:9es;ahca-7ah97i:9es;idgaag:cdca;eh'
      + 'aahc9:ses;bhg9hc:ses;ahai7:9es;daagsada:7haaac;}ihiaa.dig i7 aha {edhhihdc:gaahihaa;ide:-9ses;7ah97i:9es;daagsada:7haaac;}.idaaehiaah ahiaa,.ahiaa {sdci-aah97i:idaa;sdci-hh7a:9ab;}shaaahai.ghahddgdge '
      + '{ehaahc9:ses;idgaag:cdca;iasi-hah9c:aasi;}shaaahai.ghahddgdge aa9aca {ehaahc9:ses;}shaaahai.ghahddgdge aha {ehaahc9-aasi:7ses;ehaahc9-idiidb:des;}shaaahai.ghahddgdge ahiaa {ahheah9:iadgd;bhg9hc-aasi:9'
      + '79.ihiaa,77.ihiaa {bhg9hc:ses;}.9gh-bdagaa,.ahdhfihi7haa9dciaci,.hahgg7fid9,.haahcgaafhahgg7 {7ddb:9;}.eghcghehaehhi {ahhi-hi9aa-i9ea:cdca;}.ihiehhi igiidc,.aaaaa7fbacg igiidc,.aaaaahfbacg igiidc,.ihh'
      + 'hgsgiidc,.iddaihgfigiidc,.igahagggbihfahgchba hcegi,.shaaa9hiabsgdahagsgaa hcegi {ahai7:hgid;daagsada:ahhhiaa;}.gbaiaeaahahc9h {ehaahc9-aasi:7ses;sdci-aah97i:idaa;sdci-hh7a:9ss%;}.9ghaids {ahai7:9ss%;'
      + 'sdci-shbha9:sh7dbh,dacaah,hhch-haghs;sdci-hh7a:9ss%;ehaahc9:ses;bhg9hc:ses;idgaag-idiidb:ses;idgaag-aasi:ses;idgaag-gh97i:ses;ihgd9gdgca-gdadg:#gshghg;daagsada:7haaac;}.digids hcegi {ggghdg:aashgai;}.'
      + 'bgaihehhi {sadhi:aasi;ahheah9:hcahca;ehaahc9:s 7ses;bhg9hc:s;}.bgaihehhi .cd7hagah {ahhi-hi9aa:cdca;}.s9fgaciagidhhihdc {bhg9hc:ses hgid;}.ahdhfeh9a9dciaci {ihgd9gdgca-hbh9a:gga(hi9aah/ahdhfid9.ge9);i'
      + 'hgd9gdgca-gaeahi:gaeahi-9;}shca9haghaaaaagihdc,.asfhahgg7fid9,#aaaaa7,.aaaaa7fihifshaafaasi,.iddaihg,.iddaihgfid9,.aaaaa7fihih,.aaaaa7fbacg .ihifbha,.aaaaa7fihifshaafgh97i,aha.aaaaa7fhgihaa .ihifbha,.'
      + 'ahdhfaaaaa9,.gdagbcf7ahaagfadc9,.ahdhfeh9ashiaa,.ahdhfeh9agddiag,.igahagggbifehi7fgdcihhcag,.ggggacifehi7figiidch,.hahgg7fids,#aaaaah,.aaaaahfchah9hihdc,.aaaaahfhgihaa .ihifbha,.ahdhfihi .ihisd9,.ahdh'
      + 'fihi .haaagiaa .ihisd9,.ahdhfihighaa,#aaaaa9,.aaaaa9,aha.9ghaids .s7ag,aha.9ghaids .sig,aha.9ghaids .sig ia,.gdagbcf7ahaag,.ihifhbhaafid9,.ihifhbhaafdssfid9,.eagbfihifhaaagiaa .ihifhbhaafid9,.ahdhfaaa'
      + 'aah {ihgd9gdgca-hbh9a:gga(heghiahfgfd.ec9);ihgd9gdgca-gaeahi:gaeahi-s;}shca9haghaaaaagihdc {ihgd9gdgca-edhhihdc:-ses -ses;7ah97i:9gces;}.asfhahgg7fid9 {ihgd9gdgca-edhhihdc:-ses -9gces;7ah97i:97ses;}#a'
      + 'aaaa7,.aaaaa7fihifshaafaasi {ihgd9gdgca-edhhihdc:-ses -7aces;7ah97i:gces;}.iddaihg,.iddaihgfid9 {ihgd9gdgca-edhhihdc:-ses -h9aes;7ah97i:gces;}a.aaaaa7fihih,.aaaaa7fbacg .ihifbha,.aaaaa7fihifshaafgh97i'
      + ' {ihgd9gdgca-edhhihdc:-ses -hages;7ah97i:hhes;}aha.aaaaa7fhgihaa .ihifbha {ihgd9gdgca-edhhihdc:-ses -hdbes;7ah97i:hhes;}.ahdhfaaaaa9 {ihgd9gdgca-edhhihdc:-ses -ghses;7ah97i:h7es;}.gdagbcf7ahaagfadc9 {'
      + 'ihgd9gdgca-edhhihdc:-ses -ga7es;7ah97i:hses;}.ahdhfeh9ashiaa {ihgd9gdgca-edhhihdc:-ses -gd7es;7ah97i:7des;}.hahgg7fgefgh97ifgdgcag {ihgd9gdgca-edhhihdc:-h9es -99ges;ahai7:9ses;7ah97i:ces;}.hahgg7fid9 '
      + '{ihgd9gdgca-hbh9a:gga(hi9aah/haahcgaafehcaafid9.ge9);ihgd9gdgca-gaeahi:gaeahi-s;}.eh9afihiaa,aha.eh9afgdcigdah,aha.sdgbfgdcigdah,aha.9gh-ahhad9 aha.9gh-bdagaa aha.si,aha.gh97ifeh9afgdciaci aha.9gh-bda'
      + 'gaa aha.7a,aha.ggahiahh7hga9dciaciagah aha.9gh-bdagaa aha.si,aha.cdihs99dciaciagah aha.9gh-bdagaa aha.si,aha.agdesdshh7hga9dciaciagah aha.9gh-bdagaa aha.si,.sdgbfihiaafihg,aha.9gh-ahhad9 aha.9gh-bdaga'
      + 'a aha.7a,.hcaggaacfihiaashg,.ihiaaf7ahaag,.gh97ifihiaaf7ahaag,.aasifihiaaf7ahaag,.igiidcfid9,.hchgihaa .igiidcfid9 {ihgd9gdgca-hbh9a:gga(ihhaaeghiahfgfd.ec9);ihgd9gdgca-gaeahi:gaeahi-s;}.eh9afihiaa,ah'
      + 'a.eh9afgdcigdah,aha.sdgbfgdcigdah,aha.9gh-ahhad9 aha.9gh-bdagaa aha.si,aha.gh97ifeh9afgdciaci aha.9gh-bdagaa aha.7a,aha.ggahiahh7hga9dciaciagah aha.9gh-bdagaa aha.si,aha.cdihs99dciaciagah aha.9gh-bdag'
      + 'aa aha.si,aha.agdesdshh7hga9dciaciagah aha.9gh-bdagaa aha.si {ihgd9gdgca-edhhihdc:-ses -ses;7ah97i:7des;}.sdgbfihiaafihg,aha.9gh-ahhad9 aha.9gh-bdagaa aha.7a,.hcaggaacfihiaashg,.ihiaaf7ahaag,.gh97ifih'
      + 'iaaf7ahaag,.aasifihiaaf7ahaag {ihgd9gdgca-edhhihdc:-ses -7des;7ah97i:7aes;}.igiidcfid9 {edhhihdc:gaahihaa;bhg9hc-gh97i:7es;ehaahc9-gh97i:9hes;ehaahc9-aasi:9hes;bhg9hc-aasi:7es;a7hia-hehga:cdaghe;ihgd9'
      + 'gdgca-edhhihdc:-ses -ddes;7ah97i:77es;}.hchgihaa .igiidcfid9 {ihgd9gdgca-edhhihdc:-ses -bbes;7ah97i:77es;}.aashgaifad9d,.hchgihaa .igiidcfaasi,.igiidcfaasi,.igiidcfgh97i,.hchgihaa .igiidcfgh97i,.hgdcf'
      + 'hcsd,.hgdcfaggdg {ihgd9gdgca-hbh9a:gga(ihhaaeghiahfghgh.ec9);ihgd9gdgca-gaeahi:cd-gaeahi;}.aashgaifad9d {ihgd9gdgca-edhhihdc:-ses -ses;ahai7:c7es;7ah97i:hdes;}.hchgihaa .igiidcfaasi {ihgd9gdgca-edhhih'
      + 'dc:-c7es -ses;ahai7:9ges;7ah97i:77es;}.igiidcfaasi {edhhihdc:hihdagia;ide:ses;aasi:-7es;ihgd9gdgca-edhhihdc:-daes -ses;ahai7:9hes;7ah97i:77es;}.igiidcfgh97i {edhhihdc:hihdagia;ide:ses;gh97i:-7es;ihgd9'
      + 'gdgca-edhhihdc:-9sdes -ses;ahai7:9hes;7ah97i:77es;}.hchgihaa .igiidcfgh97i {ihgd9gdgca-edhhihdc:-977es -ses;ahai7:9hes;7ah97i:77es;}.hgdcfhcsd {ihgd9gdgca-edhhihdc:-c7es -77es;ahai7:9ges;7ah97i:9des;}'
      + '.hgdcfaggdg {ihgd9gdgca-edhhihdc:-daes -77es;ahai7:9ges;7ah97i:9ges;}';

    var largeNewValue = largeTest,
        len = largeTest.length,
        count = nextRandom() % 20,
        removeBound = len-(count*100),
        logData = [];
    for (; count > 0; count--) {
    var removePos = nextRandom() % removeBound,
        removeLength = 1+nextRandom()%100;
    logData.push('(' + removePos + ', ' + removeLength + ')');
    largeNewValue = largeNewValue.substring(0, removePos)
        + largeNewValue.substring(removePos + removeLength);
    }
    log('len: ' + len + ' count: ' + count + ' removed ( ' + logData.join(', ') + ' )');

    var diffResult = diff.diffWords(largeTest, largeNewValue);
    log('diffResult length: ' + diffResult.length);
    var removeCount = 0;
    var removeChanges = [], addChanges = [];
    for (var i = 0; i < diffResult.length; i++) {
      if (diffResult[i].removed) {
        log('remove Change ' + i, diffResult[i]);
        removeChanges.push(diffResult[i].value);
      } else if (diffResult[i].added) {
        log('add Change ' + i, diffResult[i]);
        addChanges.push(diffResult[i].value);
      } else {
        log('no Change ' + i, diffResult[i]);
        removeChanges.push(diffResult[i].value);
        addChanges.push(diffResult[i].value);
      }
    }

    log('diffResult remove length: ' + removeCount);
    function stripSpace(value) {
      return value.replace(/s+/g, '');
    }
    stripSpace(removeChanges.join('')).should.equal(stripSpace(largeTest));
    stripSpace(addChanges.join('')).should.equal(stripSpace(largeNewValue));
  });

  // Create patch
  var oldFile =
    'value\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'remove value\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'remove value\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'value\n'
    + 'context\n'
    + 'context';
  var newFile =
    'new value\n'
    + 'new value 2\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'add value\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'context\n'
    + 'new value\n'
    + 'new value 2\n'
    + 'context\n'
    + 'context';

  it('should generate a patch', function() {
    var expectedResult =
      'Index: testFileName\n'
      + '===================================================================\n'
      + '--- testFileName\tOld Header\n'
      + '+++ testFileName\tNew Header\n'
      + '@@ -1,5 +1,6 @@\n'
      + '+new value\n'
      + '+new value 2\n'
      + '-value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '@@ -7,9 +8,8 @@\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '-remove value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '@@ -17,20 +17,21 @@\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '-remove value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '+add value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '+new value\n'
      + '+new value 2\n'
      + '-value\n'
      + ' context\n'
      + ' context\n'
      + '\\ No newline at end of file\n';

    var diffResult = diff.createPatch('testFileName', oldFile, newFile, 'Old Header', 'New Header');
    diffResult.should.equal(expectedResult);
  });

  it('should output headers only for identical files', function() {
    var expectedResult =
      'Index: testFileName\n'
      + '===================================================================\n'
      + '--- testFileName\tOld Header\n'
      + '+++ testFileName\tNew Header\n';
    var diffResult = diff.createPatch('testFileName', oldFile, oldFile, 'Old Header', 'New Header');
    diffResult.should.equal(expectedResult);
  });
});
