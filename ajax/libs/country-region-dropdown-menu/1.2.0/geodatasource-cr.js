(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        try {
            module.exports = factory(require());
        } catch (e) {
            module.exports = factory();
        }
    } else {
        root.gds = factory(root);
    }
}(this, function() {
    "use strict";

    var gdsClass = "gds-cr";
    var countryString = "Please select a country.";
    var regionString = "Please select a region.";
    var showEmptyCountryOption = true;
    var showEmptyRegionOption = true;
    var country_region = [];

    var geodatasource_data = [["AD","Andorra","Andorra la Vella|Escaldes-Engordany"],["AE","United Arab Emirates","Abu Zaby|Ajman|Al Fujayrah|Ash Shariqah|Dubayy|Ra's al Khaymah|Umm al Qaywayn"],["AF","Afghanistan","Badakhshan|Badghis|Baghlan|Balkh|Bamyan|Farah|Faryab|Ghazni|Ghor|Helmand|Herat|Jowzjan|Kabul|Kandahar|Khost|Kunar|Kunduz|Laghman|Logar|Nangarhar|Nimroz|Paktia|Panjshayr|Parwan|Samangan|Sar-e Pul|Takhar"],["AG","Antigua And Barbuda","Saint John"],["AI","Anguilla","-"],["AL","Albania","Berat|Diber|Durres|Elbasan|Fier|Gjirokaster|Korce|Kukes|Lezhe|Shkoder|Tirane|Vlore"],["AM","Armenia","Aragacotn|Ararat|Armavir|Erevan|Gegark'unik'|Kotayk'|Lori|Sirak|Syunik'"],["AO","Angola","Bengo|Benguela|Bie|Cabinda|Huambo|Huila|Kuando Kubango|Kwanza Norte|Kwanza Sul|Luanda|Lunda Norte|Lunda Sul|Malange|Moxico|Namibe|Uige|Zaire"],["AQ","Antarctica","Antarctica"],["AR","Argentina","Buenos Aires|Catamarca|Chaco|Chubut|Cordoba|Corrientes|Entre Rios|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquen|Rio Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucuman"],["AS","American Samoa","Eastern District"],["AT","Austria","Karnten|Niederosterreich|Oberosterreich|Salzburg|Steiermark|Tirol|Vorarlberg|Wien"],["AU","Australia","Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia"],["AW","Aruba","Aruba"],["AX","Aland Islands","Alands skargard|Alands landsbygd|Mariehamns stad"],["AZ","Azerbaijan","Abseron|Agcabadi|Agdam|Agdas|Agsu|Astara|Baki|Barda|Beylaqan|Bilasuvar|Calilabad|Fuzuli|Ganca|Goycay|Goygol|Haciqabul|Imisli|Kurdamir|Lankaran|Mingacevir|Naxcivan|Neftcala|Qazax|Quba|Qusar|Saatli|Sabirabad|Saki|Salyan|Samaxi|Samkir|Sirvan|Sumqayit|Susa|Tartar|Ucar|Xacmaz|Xankandi|Yevlax|Zaqatala"],["BA","Bosnia And Herzegovina","Brcko distrikt|Federacija Bosne i Hercegovine|Republika Srpska"],["BB","Barbados","Saint Michael"],["BD","Bangladesh","Barisal|Chittagong|Dhaka|Khulna|Rajshahi|Rangpur|Sylhet"],["BE","Belgium","Antwerpen|Brussels Hoofdstedelijk Gewest|Hainaut|Liege|Limburg|Namur|Oost-Vlaanderen|West-Vlaanderen"],["BF","Burkina Faso","Boulgou|Kourweogo|Passore|Seno|Soum|Sourou|Tuy"],["BG","Bulgaria","Blagoevgrad|Burgas|Dobrich|Gabrovo|Haskovo|Kardzhali|Kyustendil|Lovech|Montana|Pazardzhik|Pernik|Pleven|Plovdiv|Razgrad|Ruse|Shumen|Silistra|Sliven|Smolyan|Sofia|Sofia (stolitsa)|Stara Zagora|Targovishte|Varna|Veliko Tarnovo|Vidin|Vratsa|Yambol"],["BH","Bahrain","Al 'Asimah|Al Janubiyah|Al Muharraq|Ash Shamaliyah"],["BI","Burundi","Bujumbura Mairie|Bururi|Gitega|Kayanza|Makamba|Muramvya|Muyinga|Ngozi|Rutana|Ruyigi"],["BJ","Benin","Alibori|Atacora|Atlantique|Borgou|Collines|Couffo|Donga|Littoral|Mono|Oueme|Plateau|Zou"],["BL","Saint Barthelemy","-"],["BM","Bermuda","Hamilton city"],["BN","Brunei Darussalam","Belait|Brunei-Muara|Tutong"],["BO","Bolivia, Plurinational State Of","Chuquisaca|Cochabamba|El Beni|La Paz|Oruro|Pando|Potosi|Santa Cruz|Tarija"],["BQ","Bonaire, Sint Eustatius and Saba","Bonaire|Saba|Sint Eustatius"],["BR","Brazil","Acre|Alagoas|Amapa|Amazonas|Bahia|Ceara|Distrito Federal|Espirito Santo|Goias|Maranhao|Mato Grosso|Mato Grosso do Sul|Minas Gerais|Para|Paraiba|Parana|Pernambuco|Piaui|Rio Grande do Norte|Rio Grande do Sul|Rio de Janeiro|Rondonia|Roraima|Santa Catarina|Sao Paulo|Sergipe|Tocantins"],["BS","Bahamas","City of Freeport|New Providence"],["BT","Bhutan","Chhukha|Punakha|Thimphu|Tsirang"],["BW","Botswana","Central|Kgatleng|Kweneng|North East|North West|South East|Southern"],["BY","Belarus","Brestskaya voblasts'|Homyel'skaya voblasts'|Horad Minsk|Hrodzenskaya voblasts'|Mahilyowskaya voblasts'|Minskaya voblasts'|Vitsyebskaya voblasts'"],["BZ","Belize","Belize|Cayo|Orange Walk"],["CA","Canada","Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Northwest Territories|Nova Scotia|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon"],["CC","Cocos (Keeling) Islands","-"],["CD","Congo, The Democratic Republic Of The","Bas-Uele|Equateur|Haut-Katanga|Haut-Lomani|Haut-Uele|Ituri|Kasai|Kasai Central|Kasai Oriental|Kinshasa|Kongo Central|Kwango|Kwilu|Lomami|Lualaba|Mai-Ndombe|Maniema|Mongala|Nord-Kivu|Nord-Ubangi|Sankuru|Sud-Kivu|Sud-Ubangi|Tanganyika|Tshopo|Tshuapa"],["CF","Central African Republic","Bangui|Basse-Kotto|Gribingui|Haute-Kotto|Kemo-Gribingui|Lobaye|Mambere-Kadei|Mbomou|Nana-Mambere|Ombella-Mpoko|Ouaka|Ouham|Ouham-Pende|Sangha"],["CG","Congo","Bouenza|Brazzaville|Cuvette|Lekoumou|Likouala|Niari|Plateaux|Sangha"],["CH","Switzerland","Aargau|Appenzell Ausserrhoden|Basel-Landschaft|Basel-Stadt|Bern|Fribourg|Geneve|Graubunden|Luzern|Neuchatel|Sankt Gallen|Schaffhausen|Solothurn|Thurgau|Ticino|Valais|Vaud|Zug|Zurich"],["CI","Cote d'Invoire","Abidjan|Bas-Sassandra|Comoe|Denguele|Goh-Djiboua|Lacs|Lagunes|Montagnes|Sassandra-Marahoue|Savanes|Vallee du Bandama|Woroba|Zanzan"],["CK","Cook Islands","-"],["CL","Chile","Aisen del General Carlos Ibanez del Campo|Antofagasta|Arica y Parinacota|Atacama|Biobio|Coquimbo|La Araucania|Libertador General Bernardo O'Higgins|Los Lagos|Los Rios|Magallanes|Maule|Region Metropolitana de Santiago|Tarapaca|Valparaiso"],["CM","Cameroon","Adamaoua|Centre|Est|Extreme-Nord|Littoral|Nord|Nord-Ouest|Ouest|Sud|Sud-Ouest"],["CN","China","Anhui|Beijing|Chongqing|Fujian|Gansu|Guangdong|Guangxi|Guizhou|Hainan|Hebei|Heilongjiang|Henan|Hubei|Hunan|Jiangsu|Jiangxi|Jilin|Liaoning|Nei Mongol|Ningxia|Qinghai|Shaanxi|Shandong|Shanghai|Shanxi|Sichuan|Tianjin|Xinjiang|Xizang|Yunnan|Zhejiang"],["CO","Colombia","Amazonas|Antioquia|Arauca|Atlantico|Bolivar|Boyaca|Caldas|Caqueta|Casanare|Cauca|Cesar|Choco|Cordoba|Cundinamarca|Distrito Capital de Bogota|Guaviare|Huila|La Guajira|Magdalena|Meta|Narino|Norte de Santander|Putumayo|Quindio|Risaralda|San Andres, Providencia y Santa Catalina|Santander|Sucre|Tolima|Valle del Cauca"],["CR","Costa Rica","Alajuela|Cartago|Guanacaste|Heredia|Limon|Puntarenas|San Jose"],["CU","Cuba","Artemisa|Camaguey|Ciego de Avila|Cienfuegos|Granma|Guantanamo|Holguin|Isla de la Juventud|La Habana|Las Tunas|Matanzas|Mayabeque|Pinar del Rio|Sancti Spiritus|Santiago de Cuba|Villa Clara"],["CV","Cabo Verde","Praia|Sal|Santa Catarina do Fogo|Sao Vicente"],["CW","Curacao","-"],["CX","Christmas Island","-"],["CY","Cyprus","Ammochostos|Keryneia|Larnaka|Lefkosia|Lemesos|Pafos"],["CZ","Czechia","Jihocesky kraj|Jihomoravsky kraj|Karlovarsky kraj|Kraj Vysocina|Kralovehradecky kraj|Liberecky kraj|Moravskoslezsky kraj|Olomoucky kraj|Pardubicky kraj|Plzensky kraj|Praha, Hlavni mesto|Stredocesky kraj|Ustecky kraj|Zlinsky kraj"],["DE","Germany","Baden-Wurttemberg|Bayern|Berlin|Brandenburg|Bremen|Hamburg|Hessen|Mecklenburg-Vorpommern|Niedersachsen|Nordrhein-Westfalen|Rheinland-Pfalz|Saarland|Sachsen|Sachsen-Anhalt|Schleswig-Holstein|Thuringen"],["DJ","Djibouti","Ali Sabieh|Djibouti|Obock|Tadjourah"],["DK","Denmark","Hovedstaden|Midtjylland|Nordjylland|Sjelland|Syddanmark"],["DM","Dominica","Saint George"],["DO","Dominican Republic","Azua|Baoruco|Barahona|Dajabon|Distrito Nacional (Santo Domingo)|Duarte|El Seibo|Espaillat|Hato Mayor|Hermanas Mirabal|La Altagracia|La Romana|La Vega|Maria Trinidad Sanchez|Monsenor Nouel|Monte Cristi|Monte Plata|Peravia|Puerto Plata|San Cristobal|San Jose de Ocoa|San Juan|San Pedro de Macoris|Sanchez Ramirez|Santiago|Santiago Rodriguez|Valverde"],["DZ","Algeria","Adrar|Ain Defla|Ain Temouchent|Alger|Annaba|Batna|Bechar|Bejaia|Biskra|Blida|Bordj Bou Arreridj|Bouira|Boumerdes|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaia|Guelma|Jijel|Khenchela|Laghouat|M'sila|Mascara|Medea|Mila|Mostaganem|Naama|Oran|Ouargla|Oum el Bouaghi|Relizane|Saida|Setif|Sidi Bel Abbes|Skikda|Souk Ahras|Tamanrasset|Tebessa|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen"],["EC","Ecuador","Azuay|Bolivar|Canar|Carchi|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Guayas|Imbabura|Loja|Los Rios|Manabi|Morona-Santiago|Napo|Orellana|Pastaza|Pichincha|Santa Elena|Santo Domingo de los Tsachilas|Sucumbios|Tungurahua|Zamora-Chinchipe"],["EE","Estonia","Harjumaa|Ida-Virumaa|Laane-Virumaa|Parnumaa|Tartumaa|Viljandimaa"],["EG","Egypt","Ad Daqahliyah|Al Bahr al Ahmar|Al Buhayrah|Al Fayyum|Al Gharbiyah|Al Iskandariyah|Al Isma'iliyah|Al Jizah|Al Minufiyah|Al Minya|Al Qahirah|Al Qalyubiyah|Al Uqsur|Al Wadi al Jadid|As Suways|Aswan|Asyut|Bani Suwayf|Bur Sa'id|Dumyat|Kafr ash Shaykh|Matruh|Qina|Shamal Sina'|Suhaj"],["EH","Western Sahara","Oued Ed-Dahab-Lagouira"],["ER","Eritrea","Al Awsat|Al Janubi|Ansaba|Janubi al Bahri al Ahmar|Qash-Barkah|Shimali al Bahri al Ahmar"],["ES","Spain","Andalucia|Aragon|Asturias, Principado de|Canarias|Cantabria|Castilla y Leon|Castilla-La Mancha|Catalunya|Ceuta|Extremadura|Galicia|Illes Balears|La Rioja|Madrid, Comunidad de|Melilla|Murcia, Region de|Navarra, Comunidad Foral de|Pais Vasco"],["ET","Ethiopia","Adis Abeba|Afar|Amara|Binshangul Gumuz|Dire Dawa|Gambela Hizboch|Hareri Hizb|Oromiya|Sumale|Tigray|YeDebub Biheroch Bihereseboch na Hizboch"],["FI","Finland","Kanta-Hame|Uusimaa"],["FJ","Fiji","Central|Northern|Western"],["FK","Falkland Islands (Malvinas)","-"],["FM","Micronesia, Federated States Of","Pohnpei"],["FO","Faroe Islands","Streymoy"],["FR","France","Auvergne-Rhone-Alpes|Bourgogne-Franche-Comte|Bretagne|Centre-Val de Loire|Corse|Grand-Est|Hauts-de-France|Ile-de-France|Normandie|Nouvelle-Aquitaine|Occitanie|Pays-de-la-Loire|Provence-Alpes-Cote d'Azur"],["GA","Gabon","Estuaire|Haut-Ogooue|Moyen-Ogooue|Ngounie|Nyanga|Ogooue-Lolo|Ogooue-Maritime|Woleu-Ntem"],["GB","United Kingdom","England|Northern Ireland|Scotland|Wales"],["GD","Grenada","Saint George"],["GE","Georgia","Abkhazia|Ajaria|Guria|Imereti|K'akheti|Kvemo Kartli|Samegrelo-Zemo Svaneti|Samtskhe-Javakheti|Shida Kartli|Tbilisi"],["GF","French Guiana","Guyane"],["GG","Guernsey","Guernsey"],["GH","Ghana","Ashanti|Brong-Ahafo|Central|Eastern|Greater Accra|Northern|Upper East|Upper West|Volta|Western"],["GI","Gibraltar","-"],["GL","Greenland","Kommuneqarfik Sermersooq"],["GM","Gambia","Banjul|North Bank|Western"],["GN","Guinea","Boke|Faranah|Kankan|Kindia|Labe|Mamou|Nzerekore"],["GP","Guadeloupe","Guadeloupe"],["GQ","Equatorial Guinea","Bioko Norte|Kie-Ntem|Litoral"],["GR","Greece","Attiki"],["GS","South Georgia and the South Sandwich Islands","-"],["GT","Guatemala","Alta Verapaz|Baja Verapaz|Chimaltenango|Chiquimula|El Progreso|Escuintla|Guatemala|Huehuetenango|Izabal|Jalapa|Jutiapa|Peten|Quetzaltenango|Quiche|Retalhuleu|Sacatepequez|San Marcos|Santa Rosa|Solola|Suchitepequez|Totonicapan|Zacapa"],["GU","Guam","Dededo Municipality|Hagåtña Municipality|Mangilao Municipality|Tamuning-Tumon-Harmon Municipality|Yigo Municipality"],["GW","Guinea-Bissau","Bafata|Bissau"],["GY","Guyana","Demerara-Mahaica|East Berbice-Corentyne|Upper Demerara-Berbice"],["HK","Hong Kong","Central and Western|Islands|Kowloon City|Sha Tin|Tai Po|Tsuen Wan|Tuen Mun|Yuen Long"],["HN","Honduras","Atlantida|Choluteca|Colon|Comayagua|Copan|Cortes|El Paraiso|Francisco Morazan|La Paz|Olancho|Santa Barbara|Valle|Yoro"],["HR","Croatia","Bjelovarsko-bilogorska zupanija|Brodsko-posavska zupanija|Dubrovacko-neretvanska zupanija|Grad Zagreb|Istarska zupanija|Karlovacka zupanija|Koprivnicko-krizevacka zupanija|Medimurska zupanija|Osjecko-baranjska zupanija|Pozesko-slavonska zupanija|Primorsko-goranska zupanija|Sibensko-kninska zupanija|Sisacko-moslavacka zupanija|Splitsko-dalmatinska zupanija|Varazdinska zupanija|Viroviticko-podravska zupanija|Vukovarsko-srijemska zupanija|Zadarska zupanija|Zagrebacka zupanija"],["HT","Haiti","Artibonite|Centre|Grande'Anse|Nippes|Nord|Nord-Ouest|Ouest|Sud|Sud-Est"],["HU","Hungary","Bacs-Kiskun|Baranya|Bekes|Borsod-Abauj-Zemplen|Budapest|Csongrad|Fejer|Gyor-Moson-Sopron|Hajdu-Bihar|Heves|Jasz-Nagykun-Szolnok|Komarom-Esztergom|Nograd|Pest|Somogy|Szabolcs-Szatmar-Bereg|Tolna|Vas|Veszprem|Zala"],["ID","Indonesia","Aceh|Bali|Banten|Bengkulu|Gorontalo|Jakarta Raya|Jambi|Jawa Barat|Jawa Tengah|Jawa Timur|Kalimantan Barat|Kalimantan Selatan|Kalimantan Tengah|Kalimantan Timur|Kepulauan Bangka Belitung|Kepulauan Riau|Lampung|Maluku|Maluku Utara|Nusa Tenggara Barat|Papua|Riau|Sulawesi Barat|Sulawesi Selatan|Sulawesi Tengah|Sulawesi Tenggara|Sulawesi Utara|Sumatera Barat|Sumatera Selatan|Sumatera Utara|Yogyakarta"],["IE","Ireland","Donegal|Dublin|Louth|Tipperary"],["IL","Israel","HaDarom|HaMerkaz|HaTsafon|Hefa|Tel Aviv|Yerushalayim"],["IM","Isle Of Man","Isle of Man"],["IN","India","Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Puducherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal"],["IO","British Indian Ocean Territory","-|British Indian Ocean Territory"],["IQ","Iraq","Al Anbar|Al Basrah|Al Muthanna|Al Qadisiyah|An Najaf|Arbil|As Sulaymaniyah|Babil|Baghdad|Dahuk|Dhi Qar|Diyala|Karbala'|Kirkuk|Maysan|Ninawa|Salah ad Din|Wasit"],["IR","Iran, Islamic Republic Of","Alborz|Ardabil|Azarbayjan-e Gharbi|Azarbayjan-e Sharqi|Bushehr|Chahar Mahal va Bakhtiari|Esfahan|Fars|Gilan|Golestan|Hamadan|Hormozgan|Ilam|Kerman|Kermanshah|Khorasan-e Jonubi|Khorasan-e Razavi|Khorasan-e Shomali|Khuzestan|Kohgiluyeh va Bowyer Ahmad|Kordestan|Lorestan|Markazi|Mazandaran|Qazvin|Qom|Semnan|Sistan va Baluchestan|Tehran|Yazd|Zanjan"],["IS","Iceland","Hofudborgarsvaedi utan Reykjavikur|Nordurland eystra"],["IT","Italy","Abruzzo|Basilicata|Calabria|Campania|Emilia-Romagna|Friuli-Venezia Giulia|Lazio|Liguria|Lombardia|Marche|Molise|Piemonte|Puglia|Sardegna|Sicilia|Toscana|Trentino-Alto Adige|Umbria|Valle d'Aosta|Veneto"],["JE","Jersey","Jersey"],["JM","Jamaica","Clarendon|Kingston|Manchester|Saint Andrew|Saint Catherine|Saint James|Westmoreland"],["JO","Jordan","Ajlun|Al 'Aqabah|Al 'Asimah|Al Balqa'|Al Karak|Al Mafraq|At Tafilah|Az Zarqa'|Irbid|Jarash|Ma'an|Madaba"],["JP","Japan","Aichi|Akita|Aomori|Chiba|Ehime|Fukui|Fukuoka|Fukushima|Gifu|Gunma|Hiroshima|Hokkaido|Hyogo|Ibaraki|Ishikawa|Iwate|Kagawa|Kagoshima|Kanagawa|Kochi|Kumamoto|Kyoto|Mie|Miyagi|Miyazaki|Nagano|Nagasaki|Nara|Niigata|Oita|Okayama|Okinawa|Osaka|Saga|Saitama|Shiga|Shimane|Shizuoka|Tochigi|Tokushima|Tokyo|Tottori|Toyama|Wakayama|Yamagata|Yamaguchi|Yamanashi"],["KE","Kenya","Baringo|Bungoma|Busia|Embu|Garissa|Homa Bay|Isiolo|Kakamega|Kericho|Kiambu|Kilifi|Kirinyaga|Kisii|Kisumu|Kitui|Laikipia|Lamu|Machakos|Makueni|Mandera|Marsabit|Meru|Migori|Mombasa|Murang'a|Nairobi City|Nakuru|Narok|Nyandarua|Nyeri|Samburu|Siaya|Taita/Taveta|Trans Nzoia|Turkana|Uasin Gishu|Vihiga|Wajir|West Pokot"],["KG","Kyrgyzstan","Batken|Bishkek|Chuy|Jalal-Abad|Naryn|Osh|Talas|Ysyk-Kol"],["KH","Cambodia","Baat Dambang|Banteay Mean Chey|Kampong Chaam|Kampong Chhnang|Kampong Spueu|Kampong Thum|Kampot|Kandaal|Kaoh Kong|Kracheh|Krong Pailin|Krong Preah Sihanouk|Otdar Mean Chey|Phnom Penh|Pousaat|Preah Vihear|Prey Veaeng|Rotanak Kiri|Siem Reab|Stueng Traeng|Svaay Rieng|Taakaev"],["KI","Kiribati","Gilbert Islands"],["KM","Comoros","Anjouan|Grande Comore"],["KN","Saint Kitts And Nevis","Saint George Basseterre"],["KP","Korea, Democratic People's Republic Of","Chagang-do|Hamgyong-bukto|Hamgyong-namdo|Hwanghae-bukto|Hwanghae-namdo|Kangwon-do|Nason|P'yongan-bukto|P'yongan-namdo|P'yongyang|Yanggang-do"],["KR","Korea, Republic Of","Busan-gwangyeoksi|Chungcheongnam-do|Daegu-gwangyeoksi|Daejeon-gwangyeoksi|Gangwon-do|Gwangju-gwangyeoksi|Gyeonggi-do|Gyeongsangbuk-do|Gyeongsangnam-do|Incheon-gwangyeoksi|Jeju-teukbyeoljachido|Jeollabuk-do|Jeollanam-do|Seoul-teukbyeolsi|Ulsan-gwangyeoksi"],["KW","Kuwait","Al 'Asimah|Al Ahmadi|Al Farwaniyah|Al Jahra|Hawalli|Mubarak al Kabir"],["KY","Cayman Islands","-"],["KZ","Kazakhstan","Almaty|Almaty oblysy|Aqmola oblysy|Aqtobe oblysy|Astana|Atyrau oblysy|Batys Qazaqstan oblysy|Bayqongyr|Mangghystau oblysy|Ongtustik Qazaqstan oblysy|Pavlodar oblysy|Qaraghandy oblysy|Qostanay oblysy|Qyzylorda oblysy|Shyghys Qazaqstan oblysy|Soltustik Qazaqstan oblysy|Zhambyl oblysy"],["LA","Lao People's Democratic Republic","Bokeo|Bolikhamxai|Champasak|Houaphan|Khammouan|Louangphabang|Oudomxai|Savannakhet|Viangchan|Xiangkhouang"],["LB","Lebanon","Baalbek-Hermel|Beqaa|Beyrouth|Liban-Nord|Liban-Sud|Mont-Liban|Nabatiye"],["LC","Saint Lucia","Castries"],["LI","Liechtenstein","Vaduz"],["LK","Sri Lanka","Central Province|North Central Province|North Western Province|Northern Province|Sabaragamuwa Province|Southern Province|Uva Province|Western Province"],["LR","Liberia","Bong|Grand Bassa|Grand Gedeh|Lofa|Margibi|Maryland|Montserrado|Nimba|Sinoe"],["LS","Lesotho","Butha-Buthe|Leribe|Mafeteng|Maseru|Mohale's Hoek|Qacha's Nek|Quthing"],["LT","Lithuania","Alytaus apskritis|Kauno apskritis|Klaipedos apskritis|Marijampoles apskritis|Panevezio apskritis|Siauliu apskritis|Taurages apskritis|Telsiu apskritis|Utenos apskritis|Vilniaus apskritis"],["LU","Luxembourg","-"],["LV","Latvia","Cesu novads|Daugavpils novads|Jekabpils novads|Jelgava|Jurmala|Liepaja|Malpils novads|Ogres novads|Rezekne|Riga|Tukuma novads|Valmiera|Ventspils novads"],["LY","Libya","Al Butnan|Al Jabal al Akhdar|Al Jabal al Gharbi|Al Jufrah|Al Kufrah|Al Marj|Al Marqab|Al Wahat|An Nuqat al Khams|Az Zawiyah|Banghazi|Darnah|Ghat|Misratah|Murzuq|Nalut|Sabha|Surt|Tarabulus|Wadi al Hayat|Wadi ash Shati'"],["MA","Morocco","Oued ed Dahab-Lagouira"],["MC","Monaco","Monaco-Ville"],["MD","Moldova, Republic Of","Balti|Bender|Cahul|Causeni|Chisinau|Drochia|Edinet|Floresti|Gagauzia, Unitatea teritoriala autonoma|Hincesti|Orhei|Singerei|Soroca|Stinga Nistrului, unitatea teritoriala din|Straseni|Ungheni"],["ME","Montenegro","Bar|Bijelo Polje|Budva|Cetinje|Herceg-Novi|Niksic|Pljevlja|Podgorica"],["MF","Saint Martin","-"],["MG","Madagascar","Antsiranana"],["MH","Marshall Islands","Majuro"],["MK","Macedonia, The Former Yugoslav Republic Of","Bitola|Bogovinje|Brvenica|Centar Zupa|Debar|Delcevo|Gevgelija|Gostivar|Ilinden|Kavadarci|Kicevo|Kocani|Kriva Palanka|Kumanovo|Lipkovo|Negotino|Ohrid|Prilep|Radovis|Resen|Skopje|Stip|Struga|Strumica|Studenicani|Tearce|Tetovo|Veles|Vinica|Vrapciste|Zelino"],["ML","Mali","Bamako|Gao|Kayes|Koulikoro|Mopti|Segou|Sikasso|Tombouctou"],["MM","Myanmar","Ayeyarwady|Bago|Chin|Kachin|Kayah|Kayin|Magway|Mandalay|Mon|Rakhine|Sagaing|Shan|Tanintharyi|Yangon"],["MN","Mongolia","Bayan-Olgiy|Bayanhongor|Bulgan|Darhan uul|Dornogovi|Dundgovi|Dzavhan|Govi-Altay|Hovd|Hovsgol|Omnogovi|Orhon|Ovorhangay|Selenge|Suhbaatar|Tov|Ulaanbaatar|Uvs"],["MO","Macao","Macau"],["MP","Northern Mariana Islands","Saipan Municipality"],["MQ","Martinique","Le Trinite|Le Marin|Fort-de-France|Saint-Pierre"],["MR","Mauritania","Adrar|Assaba|Brakna|Dakhlet Nouadhibou|Gorgol|Guidimaka|Hodh ech Chargui|Tiris Zemmour|Trarza"],["MS","Montserrat","Saint Anthony|Saint Peter"],["MT","Malta","Birkirkara|Haz-Zabbar|Mosta|Qormi|Valletta"],["MU","Mauritius","Flacq|Grand Port|Moka|Pamplemousses|Plaines Wilhems|Port Louis|Riviere du Rempart"],["MV","Maldives","Kaafu"],["MW","Malawi","Mzimba|Salima"],["MX","Mexico","Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Ciudad de Mexico|Coahuila de Zaragoza|Colima|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz de Ignacio de la Llave|Yucatan|Zacatecas"],["MY","Malaysia","Johor|Kedah|Kelantan|Melaka|Negeri Sembilan|Pahang|Perak|Perlis|Pulau Pinang|Sabah|Sarawak|Selangor|Terengganu|Wilayah Persekutuan Kuala Lumpur|Wilayah Persekutuan Labuan|Wilayah Persekutuan Putrajaya"],["MZ","Mozambique","Cabo Delgado|Gaza|Inhambane|Manica|Maputo|Nampula|Niassa|Sofala|Tete|Zambezia"],["NA","Namibia","Erongo|Hardap|Karas|Khomas|Omaheke|Oshana|Otjozondjupa|Zambezi"],["NC","New Caledonia","Province Sud"],["NE","Niger","Agadez|Diffa|Dosso|Maradi|Niamey|Tahoua|Tillaberi|Zinder"],["NF","Norfolk Island","-"],["NG","Nigeria","Abia|Abuja Federal Capital Territory|Adamawa|Akwa Ibom|Anambra|Bauchi|Bayelsa|Benue|Borno|Cross River|Delta|Ebonyi|Edo|Ekiti|Enugu|Gombe|Imo|Jigawa|Kaduna|Kano|Katsina|Kebbi|Kogi|Kwara|Lagos|Nasarawa|Niger|Ogun|Ondo|Osun|Oyo|Plateau|Rivers|Sokoto|Taraba|Yobe|Zamfara"],["NI","Nicaragua","Atlantico Norte|Atlantico Sur|Boaco|Carazo|Chinandega|Chontales|Esteli|Granada|Jinotega|Leon|Madriz|Managua|Masaya|Matagalpa|Nueva Segovia|Rivas"],["NL","Netherlands","Drenthe|Flevoland|Fryslan|Gelderland|Groningen|Limburg|Noord-Brabant|Noord-Holland|Overijssel|Utrecht|Zeeland|Zuid-Holland"],["NO","Norway","Aust-Agder|Buskerud|Hedmark|Hordaland|More og Romsdal|Nord-Trondelag|Nordland|Oppland|Oslo|Ostfold|Rogaland|Sor-Trondelag|Telemark|Troms|Vest-Agder|Vestfold"],["NP","Nepal","Lumbini"],["NR","Nauru","Yaren"],["NU","Niue","-"],["NZ","New Zealand","Auckland|Bay of Plenty|Canterbury|Gisborne|Hawke's Bay|Manawatu-Wanganui|Marlborough|Nelson|Northland|Otago|Southland|Taranaki|Waikato|Wellington"],["OM","Oman","Ad Dakhiliyah|Al Buraymi|Az Zahirah|Janub al Batinah|Janub ash Sharqiyah|Masqat|Musandam|Zufar"],["PA","Panama","Bocas del Toro|Chiriqui|Cocle|Colon|Herrera|Panama|Veraguas"],["PE","Peru","Amazonas|Ancash|Apurimac|Arequipa|Ayacucho|Cajamarca|Cusco|El Callao|Huancavelica|Huanuco|Ica|Junin|La Libertad|Lambayeque|Lima|Loreto|Madre de Dios|Moquegua|Pasco|Piura|Puno|San Martin|Tacna|Tumbes|Ucayali"],["PF","French Polynesia","Îles du Vent"],["PG","Papua New Guinea","Bougainville|East New Britain|East Sepik|Eastern Highlands|Madang|Morobe|National Capital District (Port Moresby)|Northern|Southern Highlands|West New Britain|Western|Western Highlands"],["PH","Philippines","Bukidnon|Bulacan|Cagayan|Camarines Sur|Compostela Valley|Cotabato|Lanao del Norte|Mindoro Occidental|National Capital Region|Nueva Ecija|Pampanga|Pangasinan|Quezon|Sultan Kudarat|Surigao del Norte|Zamboanga del Sur"],["PK","Pakistan","Azad Kashmir|Balochistan|Islamabad|Khyber Pakhtunkhwa|Punjab|Sindh"],["PL","Poland","Dolnoslaskie|Kujawsko-pomorskie|Lodzkie|Lubelskie|Lubuskie|Malopolskie|Mazowieckie|Opolskie|Podkarpackie|Podlaskie|Pomorskie|Slaskie|Swietokrzyskie|Warminsko-mazurskie|Wielkopolskie|Zachodniopomorskie"],["PM","Saint Pierre and Miquelon","Saint-Pierre"],["PN","Pitcairn","-"],["PR","Puerto Rico","Aguadilla|Arecibo|Barceloneta|Bayamón|Caguas|Carolina|Catano|Cayey|Fajardo|Guayama|Guaynabo|Humacao|Manati|Mayaguez|Ponce|San Juan|Toa Baja|Trujillo Alto|Vega Baja|Yauco"],["PS","Palestine, State Of","Gaza|West Bank"],["PT","Portugal","Aveiro|Beja|Braga|Braganca|Castelo Branco|Coimbra|Evora|Faro|Guarda|Leiria|Lisboa|Portalegre|Porto|Regiao Autonoma da Madeira|Regiao Autonoma dos Acores|Santarem|Setubal|Viana do Castelo|Vila Real|Viseu"],["PW","Palau","Melekeok"],["PY","Paraguay","Alto Parana|Amambay|Asuncion|Caaguazu|Caazapa|Central|Concepcion|Cordillera|Guaira|Itapua|Misiones|Neembucu|Presidente Hayes"],["QA","Qatar","Ad Dawhah|Al Khawr wa adh Dhakhirah|Al Wakrah|Ar Rayyan|Umm Salal"],["RE","Reunion","Réunion"],["RO","Romania","Alba|Arad|Arges|Bacau|Bihor|Bistrita-Nasaud|Botosani|Braila|Brasov|Bucuresti|Buzau|Calarasi|Caras-Severin|Cluj|Constanta|Covasna|Dambovita|Dolj|Galati|Giurgiu|Gorj|Harghita|Hunedoara|Ialomita|Iasi|Ilfov|Maramures|Mehedinti|Mures|Neamt|Olt|Prahova|Salaj|Satu Mare|Sibiu|Suceava|Teleorman|Timis|Tulcea|Valcea|Vaslui|Vrancea"],["RS","Serbia","Pomoravski okrug"],["RU","Russian Federation","Adygeya, Respublika|Altay, Respublika|Altayskiy kray|Amurskaya oblast'|Arkhangel'skaya oblast'|Astrakhanskaya oblast'|Bashkortostan, Respublika|Belgorodskaya oblast'|Bryanskaya oblast'|Buryatiya, Respublika|Chechenskaya Respublika|Chelyabinskaya oblast'|Chuvashskaya Respublika|Dagestan, Respublika|Ingushetiya, Respublika|Irkutskaya oblast'|Ivanovskaya oblast'|Kabardino-Balkarskaya Respublika|Kaliningradskaya oblast'|Kalmykiya, Respublika|Kaluzhskaya oblast'|Kamchatskiy kray|Karachayevo-Cherkesskaya Respublika|Kareliya, Respublika|Kemerovskaya oblast'|Khabarovskiy kray|Khakasiya, Respublika|Khanty-Mansiyskiy avtonomnyy okrug|Kirovskaya oblast'|Komi, Respublika|Kostromskaya oblast'|Krasnodarskiy kray|Krasnoyarskiy kray|Kurganskaya oblast'|Kurskaya oblast'|Leningradskaya oblast'|Lipetskaya oblast'|Magadanskaya oblast'|Mariy El, Respublika|Mordoviya, Respublika|Moskovskaya oblast'|Moskva|Murmanskaya oblast'|Nenetskiy avtonomnyy okrug|Nizhegorodskaya oblast'|Novgorodskaya oblast'|Novosibirskaya oblast'|Omskaya oblast'|Orenburgskaya oblast'|Orlovskaya oblast'|Penzenskaya oblast'|Permskiy kray|Primorskiy kray|Pskovskaya oblast'|Rostovskaya oblast'|Ryazanskaya oblast'|Saha, Respublika|Sakhalinskaya oblast'|Samarskaya oblast'|Sankt-Peterburg|Saratovskaya oblast'|Severnaya Osetiya, Respublika|Smolenskaya oblast'|Stavropol'skiy kray|Sverdlovskaya oblast'|Tambovskaya oblast'|Tatarstan, Respublika|Tomskaya oblast'|Tul'skaya oblast'|Tverskaya oblast'|Tyumenskaya oblast'|Tyva, Respublika|Udmurtskaya Respublika|Ul'yanovskaya oblast'|Vladimirskaya oblast'|Volgogradskaya oblast'|Vologodskaya oblast'|Voronezhskaya oblast'|Yamalo-Nenetskiy avtonomnyy okrug|Yaroslavskaya oblast'|Yevreyskaya avtonomnaya oblast'|Zabaykal'skiy kray"],["RW","Rwanda","Est|Nord|Ouest|Sud|Ville de Kigali"],["SA","Saudi Arabia","'Asir|Al Bahah|Al Hudud ash Shamaliyah|Al Jawf|Al Madinah al Munawwarah|Al Qasim|Ar Riyad|Ash Sharqiyah|Ha'il|Jazan|Makkah al Mukarramah|Najran|Tabuk"],["SB","Solomon Islands","Guadalcanal"],["SC","Seychelles","English River"],["SD","Sudan","Blue Nile|Gedaref|Gezira|Kassala|Khartoum|North Darfur|North Kordofan|Northern|Red Sea|Sennar|South Kordofan|West Darfur|White Nile"],["SE","Sweden","Blekinge lan|Dalarnas Lan|Gavleborgs lan|Gotlands lan|Hallands lan|Jamtlands Lan|Jonkopings Lan|Kalmar lan|Kronobergs lan|Norrbottens lan|Orebro lan|Ostergotlands lan|Skane lan|Sodermanlands lan|Stockholms lan|Uppsala lan|Varmlands lan|Vasterbottens lan|Vasternorrlands lan|Vastmanlands lan|Vastra Gotalands lan"],["SG","Singapore","Singapore"],["SH","Saint Helena, Ascension And Tristan Da Cunha","Saint Helena"],["SI","Slovenia","Celje|Koper|Kranj|Ljubljana|Maribor|Novo Mesto|Ptuj|Trbovlje|Velenje"],["SJ","Svalbard And Jan Mayen","Svalbard"],["SK","Slovakia","Banskobystricky kraj|Bratislavsky kraj|Kosicky kraj|Nitriansky kraj|Presovsky kraj|Trenciansky kraj|Trnavsky kraj|Zilinsky kraj"],["SL","Sierra Leone","Eastern|Northern|Southern|Western Area"],["SM","San Marino","San Marino"],["SN","Senegal","Dakar|Diourbel|Fatick|Kaffrine|Kaolack|Kedougou|Kolda|Louga|Matam|Saint-Louis|Sedhiou|Tambacounda|Thies|Ziguinchor"],["SO","Somalia","Awdal|Banaadir|Bari|Bay|Galguduud|Gedo|Hiiraan|Jubbada Dhexe|Jubbada Hoose|Mudug|Nugaal|Sanaag|Shabeellaha Dhexe|Shabeellaha Hoose|Sool|Togdheer|Woqooyi Galbeed"],["SR","Suriname","Paramaribo|Wanica"],["SS","South Sudan","Aweil|Aweil East|Central Equatoria|Central Upper Nile|Gbudwe|Gogrial|Imatong|Jonglei|Jubek|Kapoeta|Lol|Maridi|Northern Liech|Southern Liech|Tambura|Tonj|Wau|Western Lakes|Yei River"],["ST","Sao Tome And Principe","Sao Tome"],["SV","El Salvador","Ahuachapan|Cabanas|Chalatenango|Cuscatlan|La Libertad|La Paz|La Union|Morazan|San Miguel|San Salvador|San Vicente|Santa Ana|Sonsonate|Usulutan"],["SX","Sint Maarten","-"],["SY","Syrian Arab Republic","Al Hasakah|Al Ladhiqiyah|Al Qunaytirah|Ar Raqqah|As Suwayda'|Dar'a|Dayr az Zawr|Halab|Hamah|Hims|Idlib|Rif Dimashq|Tartus"],["SZ","Swaziland","Hhohho|Manzini"],["TC","Turks and Caicos Islands","-"],["TD","Chad","Bahr el Gazel|Batha|Chari-Baguirmi|Guera|Hadjer Lamis|Kanem|Logone-Occidental|Logone-Oriental|Mandoul|Mayo-Kebbi-Est|Mayo-Kebbi-Ouest|Moyen-Chari|Ouaddai|Salamat|Tandjile"],["TF","French Southern Territories","Kerguelen"],["TG","Togo","Centrale|Kara|Maritime|Plateaux|Savannes"],["TH","Thailand","Amnat Charoen|Ang Thong|Bueng Kan|Buri Ram|Chachoengsao|Chai Nat|Chaiyaphum|Chanthaburi|Chiang Mai|Chiang Rai|Chon Buri|Chumphon|Kalasin|Kamphaeng Phet|Kanchanaburi|Khon Kaen|Krabi|Krung Thep Maha Nakhon|Lampang|Lamphun|Loei|Lop Buri|Maha Sarakham|Mukdahan|Nakhon Nayok|Nakhon Pathom|Nakhon Phanom|Nakhon Ratchasima|Nakhon Sawan|Nakhon Si Thammarat|Nan|Narathiwat|Nong Bua Lam Phu|Nong Khai|Nonthaburi|Pathum Thani|Pattani|Phatthalung|Phayao|Phetchabun|Phetchaburi|Phichit|Phitsanulok|Phra Nakhon Si Ayutthaya|Phrae|Phuket|Prachin Buri|Prachuap Khiri Khan|Ranong|Ratchaburi|Rayong|Roi Et|Sa Kaeo|Sakon Nakhon|Samut Prakan|Samut Sakhon|Samut Songkhram|Saraburi|Satun|Si Sa Ket|Sing Buri|Songkhla|Sukhothai|Suphan Buri|Surat Thani|Surin|Tak|Trang|Trat|Ubon Ratchathani|Udon Thani|Uthai Thani|Uttaradit|Yala|Yasothon"],["TJ","Tajikistan","Khatlon|Kuhistoni Badakhshon|Sughd"],["TK","Tokelau","Atafu|Fakaofo|Nukunonu"],["TL","Timor-Leste","Aileu|Baucau|Bobonaro|Cova Lima|Dili|Lautem|Liquica|Manufahi"],["TM","Turkmenistan","Ahal|Balkan|Dasoguz|Lebap|Mary"],["TN","Tunisia","Beja|Ben Arous|Bizerte|Gabes|Gafsa|Jendouba|Kairouan|Kasserine|Kebili|L'Ariana|La Manouba|Le Kef|Mahdia|Medenine|Monastir|Nabeul|Sfax|Sidi Bouzid|Siliana|Sousse|Tataouine|Tozeur|Tunis|Zaghouan"],["TO","Tonga","Tongatapu"],["TR","Turkey","Adana|Adiyaman|Afyonkarahisar|Agri|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydin|Balikesir|Bartin|Batman|Bayburt|Bilecik|Bingol|Bitlis|Bolu|Burdu|Bursa|Canakkale|Cankiri|Corum|Denizli|Diyarbakir|Duzce|Edirne|Elazig|Erzincan|Erzurum|Eskisehir|Gaziantep|Giresun|Gumushane|Hakkari|Hatay|Igdir|Isparta|Istanbul|Izmir|Kahramanmaras|Karabuk|Karaman|Kars|Kastamonu|Kayseri|Kilis|Kirikkale|Kirklareli|Kirsehir|Kocaeli|Konya|Kutahya|Malatya|Manisa|Mardin|Mersin|Mugla|Mus|Nevsehir|Nigde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Sanliurfa|Siirt|Sinop|Sirnak|Sivas|Tekirdag|Tokat|Trabzon|Tunceli|Usak|Van|Yalova|Yozgat|Zonguldak"],["TT","Trinidad And Tobago","Arima|Chaguanas|Mayaro-Rio Claro|Point Fortin|Port of Spain|San Fernando|San Juan-Laventille|Sangre Grande|Tobago|Tunapuna-Piarco"],["TV","Tuvalu","Funafuti"],["TW","Taiwan","Tainan"],["TZ","Tanzania, United Republic Of","Arusha|Dar es Salaam|Dodoma|Geita|Iringa|Kagera|Kaskazini Pemba|Katavi|Kigoma|Kilimanjaro|Kusini Pemba|Kusini Unguja|Lindi|Manyara|Mara|Mbeya|Mjini Magharibi|Morogoro|Mtwara|Mwanza|Njombe|Pwani|Rukwa|Ruvuma|Shinyanga|Simiyu|Singida|Tabora|Tanga"],["UA","Ukraine","Avtonomna Respublika Krym|Cherkaska oblast|Chernihivska oblast|Chernivetska oblast|Dnipropetrovska oblast|Donetska oblast|Ivano-Frankivska oblast|Kharkivska oblast|Khersonska oblast|Khmelnytska oblast|Kirovohradska oblast|Kyiv|Luhanska oblast|Lvivska oblast|Mykolaivska oblast|Odeska oblast|Poltavska oblast|Rivnenska oblast|Sevastopol'|Sumska oblast|Ternopilska oblast|Vinnytska oblast|Volynska oblast|Zakarpatska oblast|Zaporizka oblast|Zhytomyrska oblast"],["UG","Uganda","Adjumani|Kabarole|Kanungu|Masindi"],["UM","United States Minor Outlying Islands","Howland Island|Baker Island|Jarvis Island"],["US","United States","Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming"],["UY","Uruguay","Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandu|Rio Negro|Rivera|Rocha|Salto|San Jose|Soriano|Tacuarembo|Treinta y Tres"],["UZ","Uzbekistan","Andijon|Buxoro|Farg'ona|Jizzax|Namangan|Navoiy|Qashqadaryo|Qoraqalpog'iston Respublikasi|Samarqand|Sirdaryo|Surxondaryo|Toshkent|Xorazm"],["VA","Holy See","-"],["VC","Saint Vincent And The Grenadines","Saint George"],["VE","Venezuela, Bolivarian Republic Of","Amazonas|Anzoategui|Apure|Aragua|Barinas|Bolivar|Carabobo|Cojedes|Delta Amacuro|Distrito Capital|Falcon|Guarico|Lara|Merida|Miranda|Monagas|Nueva Esparta|Portuguesa|Sucre|Tachira|Trujillo|Vargas|Yaracuy|Zulia"],["VG","Virgin Islands, British","-"],["VI","Virgin Islands, U.S.","Saint Croix Island|Saint Thomas Island"],["VN","Viet Nam","An Giang|Ba Ria-Vung Tau|Bac Giang|Bac Kan|Bac Lieu|Bac Ninh|Ben Tre|Binh Dinh|Binh Duong|Binh Phuoc|Binh Thuan|Ca Mau|Can Tho|Cao Bang|Da Nang|Dak Lak|Dien Bien|Dong Nai|Dong Thap|Gia Lai|Ha Giang|Ha Nam|Ha Noi|Ha Tinh|Hai Duong|Hai Phong|Hau Giang|Ho Chi Minh|Hoa Binh|Hung Yen|Khanh Hoa|Kien Giang|Kon Tum|Lam Dong|Lang Son|Lao Cai|Long An|Nam Dinh|Nghe An|Ninh Binh|Ninh Thuan|Phu Tho|Phu Yen|Quang Binh|Quang Nam|Quang Ngai|Quang Ninh|Quang Tri|Soc Trang|Son La|Tay Ninh|Thai Binh|Thai Nguyen|Thanh Hoa|Thua Thien-Hue|Tien Giang|Tra Vinh|Tuyen Quang|Vinh Long|Vinh Phuc|Yen Bai"],["VU","Vanuatu","Shefa"],["WF","Wallis and Futuna","Uvea|Sigave"],["WS","Samoa","Tuamasaga"],["YE","Yemen","Abyan|Adan|Al Bayda'|Al Hudaydah|Al Jawf|Amran|Dhamar|Hadramawt|Hajjah|Ibb|Lahij|Ma'rib|Sa'dah|San'a'|Shabwah|Ta'izz"],["YT","Mayotte","Acoua|Bandraboua|Bandrele|Boueni|Chiconi|Chirongui|Dembeni|Dzaoudzi|Kani-Keli|Koungou|M'Tsangamouji|Mamoudzou|Mtsamboro|Ouangani|Pamandzi|Tsingoni"],["ZA","South Africa","Eastern Cape|Free State|Gauteng|Kwazulu-Natal|Limpopo|Mpumalanga|North-West|Northern Cape|Western Cape"],["ZM","Zambia","Central|Copperbelt|Eastern|Luapula|Lusaka|North-Western|Northern|Southern|Western"],["ZW","Zimbabwe","Bulawayo|Harare|Manicaland|Mashonaland Central|Mashonaland East|Mashonaland West|Masvingo|Matabeleland North|Matabeleland South|Midlands"]];

    var initialise = function() {
        var countryDropDownList = document.getElementsByClassName(gdsClass);
        for (var i=0; i<countryDropDownList.length; i++) {
            generateCountryField(countryDropDownList[i]);
        }

        // jQuery to display country flag
        jQuery.widget("custom.iconselectmenu", jQuery.ui.selectmenu, {
            _renderItem: function(ul, item) {
                var li = jQuery("<li>"),
                    wrapper = jQuery("<div>", {text: item.label});

                if (item.disabled) {
                    li.addClass("ui-state-disabled");
                }

                jQuery("<span>", {
                    style: item.element.attr("data-style"),
                    "class": "ui-icon " + item.element.attr("data-class")
                }).appendTo(wrapper);

                return li.append(wrapper).appendTo(ul);
            }
        });
        jQuery(".gds-countryflag").iconselectmenu().iconselectmenu("menuWidget").addClass("ui-menu-icons customicons");
        jQuery(".gds-countryflag").iconselectmenu({ change: function(event) {
            var el = (event.target);
            var countryElement;
            for (var i=0; i<countryDropDownList.length; i++) {
                var ddl = countryDropDownList[i];
                if(ddl === el) {
                    countryElement = ddl;
                }
            }
            var regionID = countryElement.getAttribute("country-data-region-id");
            var regionElement = document.getElementById(regionID);
            generateRegionField(countryElement, regionElement);
        }});
    };

    var generateCountryField = function(countryElement) {
        var loaded = countryElement.getAttribute("data-gds-loaded");
        if (loaded === "true") {
            return;
        }

        countryElement.length = 0;
        var customCountryOptionString = countryElement.getAttribute("country-data-default-option");
        var defaultCountryOptionString = customCountryOptionString ? customCountryOptionString : countryString;
        var defaultCountrySelectedValue = countryElement.getAttribute("country-data-default-value");
        var foundIndex = 0;

        if (showEmptyCountryOption) {
            countryElement.options[0] = new Option(defaultCountryOptionString, '');
        }

        country_region = geodatasource_data;
        initialiseRegion();

        for (var i=0; i<country_region.length; i++) {
            var value = country_region[i][1];
            var cc_iso = country_region[i][0];
            (countryElement.options[countryElement.length] = new Option(country_region[i][1], value)).setAttribute("data-class", cc_iso.toLowerCase());
            if (defaultCountrySelectedValue != null && (defaultCountrySelectedValue === value || defaultCountrySelectedValue === cc_iso)) {
                foundIndex = i;
                if (showEmptyCountryOption) {
                    foundIndex++;
                }
            }
        }

        countryElement.selectedIndex = foundIndex;

        var regionID = countryElement.getAttribute("country-data-region-id");
        if (!regionID) {
            console.error("Missing data-region-id on country field.");
            return;
        }
        var regionElement = document.getElementById(regionID);

        if (regionElement) {
            initialiseRegionField(regionElement);

            countryElement.onchange = function() {
                generateRegionField(countryElement, regionElement);
            };

            if (defaultCountrySelectedValue !== null && countryElement.selectedIndex > 0) {
                generateRegionField(countryElement, regionElement);
                var defaultRegionSelectedValue = regionElement.getAttribute("region-data-default-value");
                if (defaultRegionSelectedValue !== null) {
                    var index = (showEmptyCountryOption) ? countryElement.selectedIndex - 1: countryElement.selectedIndex;
                    var data = country_region[index][3];
                    setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
                }
            } else if (showEmptyCountryOption === false) {
                generateRegionField(countryElement, regionElement);
            }
        } else {
            console.error("Region field with ID " + regionID + " not found.");
        }

        countryElement.setAttribute("data-gds-loaded", "true");
    };

    var initialiseRegion = function() {
        for (var i=0; i<country_region.length; i++) {
            var regionData = {
                regions: []
            };
            var regions = country_region[i][2].split("|");
            for (var j=0; j<regions.length; j++) {
                var parts = [];
                parts.push(regions[j]);
                regionData.regions.push(parts);
            }
            country_region[i][3] = regionData;
        }
    };

    var initialiseRegionField = function(regionElement) {
        var customRegionBlankOptionString = regionElement.getAttribute("region-data-blank-option");
        var defaultRegionBlankOptionString = customRegionBlankOptionString ? customRegionBlankOptionString : "-";
        regionElement.length = 0;
        if (showEmptyRegionOption) {
            regionElement.options[0] = new Option(defaultRegionBlankOptionString, "");
            regionElement.selectedIndex = 0;
        }
    };

    var generateRegionField = function(countryElement, regionElement) {
        var selectedCountryIndex = (showEmptyCountryOption) ? countryElement.selectedIndex - 1 : countryElement.selectedIndex;
        var customRegionOptionString = regionElement.getAttribute("region-data-default-option");
        var defaultRegionOptionString = customRegionOptionString ? customRegionOptionString : regionString;
        
        if (countryElement.value === "") {
            initialiseRegionField(regionElement);
        } else {
            regionElement.length = 0;
            if (showEmptyRegionOption) {
                regionElement.options[0] = new Option(defaultRegionOptionString, "");
            }
            var regionData = country_region[selectedCountryIndex][3];
            for (var i=0; i<regionData.regions.length; i++) {
                var value = regionData.regions[i];
                regionElement.options[regionElement.length] = new Option(regionData.regions[i], value);
            }
            regionElement.selectedIndex = 0;
        }
    };

    var setDefaultRegionValue = function(regionElement, data, defaultRegionSelectedValue) {
        for (var i=0; i<data.regions.length; i++) {
            var currVal = data.regions[i][0];
            if (currVal === defaultRegionSelectedValue) {
                regionElement.selectedIndex = (showEmptyRegionOption) ? i + 1 : i;
                break;
            }
        }
    };

    /*
     * contentloaded.js
     */
    var contentLoaded = function(win, fn) {
        var done = false, top = true,
        doc = win.document,
        root = doc.documentElement,
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    };

    contentLoaded(window, initialise);

    return { init: initialise };
}));