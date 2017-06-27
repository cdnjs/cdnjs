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

    var geodatasource_data = [["AD","Andorra","Parròquia d'Andorra la Vella|Parròquia d'Escaldes-Engordany"],["AE","United Arab Emirates","Abū Z̧aby|Ajman|Al Fujayrah|Ash Shāriqah|Dubayy|Raʼs al Khaymah|Umm al Qaywayn"],["AF","Afghanistan","Badakhshan|Badghis|Baghlān|Balkh|Bāmīān|Farah|Faryab|Ghaznī|Ghowr|Helmand|Herat|Jowzjān|Kabul|Kandahār|Khowst|Konar|Kunduz|Laghmān|Lowgar|Nangarhār|Nīmrūz|Paktia|Panjshir|Parvān|Samangān|Sar-e Pol|Takhār"],["AG","Antigua And Barbuda","Saint John"],["AL","Albania","Berat|Dibër|Durrës|Elbasan|Fier|Gjirokastër|Korçë|Kukës|Lezhë|Shkodër|Tiranë|Vlorë"],["AM","Armenia","Aragatsotn|Ararat|Armavir|Gegharkʼunikʼ|Kotaykʼ|Lorri|Shirak|Syunikʼ|Yerevan"],["AO","Angola","Bengo|Benguela|Bié|Cabinda|Cuando Cubango|Cuanza Norte|Cuanza Sul|Huambo|Huíla|Luanda|Lunda Norte|Lunda Sul|Malanje|Moxico|Namibe|Uíge|Zaire"],["AR","Argentina","Buenos Aires|Buenos Aires F.D.|Catamarca|Chaco|Chubut|Corrientes|Córdoba|Entre Ríos|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquén|Río Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucumán"],["AS","American Samoa","Eastern District"],["AT","Austria","Carinthia|Lower Austria|Salzburg|Styria|Tyrol|Upper Austria|Vienna|Vorarlberg"],["AU","Australia","Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia"],["AW","Aruba","Aruba"],["AZ","Azerbaijan","Abşeron|Astara|Ağcabǝdi|Ağdam|Ağdaş|Ağsu|Baki|Beyləqan|Bilǝsuvar|Bǝrdǝ|Cəlilabad|Dǝvǝçi|Füzuli|Goygol Rayon|Göyçay|Gǝncǝ|Hacıqabul|Kürdǝmir|Lənkəran|Mingǝcevir|Nakhichevan|Neftçala|Qazax|Quba|Qusar|Saatlı|Sabirabad|Salyan|Shaki City|Sumqayit|Tǝrtǝr|Ucar|Xankǝndi|Xaçmaz|Yevlax City|Zaqatala|İmişli|Şamaxı|Şuşa|Şǝmkir|Əli Bayramli"],["BA","Bosnia And Herzegovina","Brčko|Federation of Bosnia and Herzegovina|Republika Srpska"],["BD","Bangladesh","Barisāl|Chittagong|Dhaka|Khulna|Rangpur|Rājshāhi|Sylhet"],["BE","Belgium","Brussels Capital Region|Flanders|Walloon Region"],["BF","Burkina Faso","Boucle du Mouhoun|Cascades|Centre|Centre-Est|Centre-Nord|Centre-Ouest|Centre-Sud|Est|Hauts-Bassins|Nord|Plateau-Central|Sahel|Sud-Ouest"],["BG","Bulgaria","Blagoevgrad|Burgas|Dobrich|Gabrovo|Khaskovo|Kyustendil|Kŭrdzhali|Lovech|Montana|Oblast Sofiya-Grad|Pazardzhit|Pernik|Pleven|Plovdiv|Razgrad|Ruse|Shumen|Silistra|Sliven|Sofiya|Stara Zagora|Tŭrgovishte|Varna|Veliko Tŭrnovo|Vidin|Vratsa|Yambol"],["BH","Bahrain","Capital Governorate|Central Governorate|Muharraq|Southern Governorate"],["BI","Burundi","Bujumbura Mairie|Bururi|Gitega|Kayanza|Makamba|Muramvya|Muyinga|Ngozi|Rutana|Ruyigi"],["BJ","Benin","Alibori|Atakor|Atlantique|Borgou|Collines|Donga|Kouffo|Littoral|Mono|Plateau|Quémé|Zou"],["BM","Bermuda","Hamilton city"],["BN","Brunei Darussalam","Belait|Brunei and Muara|Tutong"],["BO","Bolivia, Plurinational State Of","Chuquisaca|Cochabamba|El Beni|La Paz|Oruro|Pando|Potosí|Santa Cruz|Tarija"],["BR","Brazil","Acre|Alagoas|Amapá|Amazonas|Bahia|Ceará|Distrito Federal|Estado de Minas Gerais|Estado de Pernambuco|Estado do Espírito Santo|Goiás|Maranhão|Mato Grosso|Mato Grosso do Sul|Paraná|Paraíba|Pará|Piauí|Rio Grande do Norte|Rio Grande do Sul|Rio de Janeiro|Rondônia|Roraima|Santa Catarina|Sergipe|São Paulo|Tocantins"],["BS","Bahamas","Freeport|New Providence"],["BT","Bhutan","Chhukha|Chirang|Punakha|Thimphu"],["BW","Botswana","Central|Kgatleng|Kweneng|North East|North West|South East|Southern"],["BY","Belarus","Brestskaya Voblastsʼ|Homyelʼskaya Voblastsʼ|Horad Minsk|Hrodzyenskaya Voblastsʼ|Mahilyowskaya Voblastsʼ|Minskaya Voblastsʼ|Vitsyebskaya Voblastsʼ"],["BZ","Belize","Belize|Cayo|Orange Walk"],["CA","Canada","Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Northwest Territories|Nova Scotia|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon"],["CD","Congo, The Democratic Republic Of The","Bandundu|Bas-Congo|Kasaï-Occidental|Kasaï-Oriental|Katanga|Kinshasa|Maniema|Nord-Kivu|Orientale|Sud-Kivu|Équateur"],["CF","Central African Republic","Bangui|Basse-Kotto|Haute-Kotto|Kémo|Lobaye|Mambéré-Kadéï|Mbomou|Nana-Grébizi|Nana-Mambéré|Ombella-Mpoko|Ouaka|Ouham|Ouham-Pendé|Sangha-Mbaéré"],["CG","Congo","Bouenza|Brazzaville|Cuvette|Likouala|Likouala|Lékoumou|Niari|Plateaux|Pointe-Noire|Sangha"],["CH","Switzerland","Aargau|Appenzell Ausserrhoden|Basel-Country|Basle-Ville|Bern|Fribourg|Geneva|Graubünden|Lucerne|Neuchâtel|Saint Gallen|Schaffhausen|Solothurn|Thurgau|Ticino|Valais|Vaud|Zug|Zurich"],["CI","Cote d'Invoire","Bas-Sassandra|Denguélé|Dix-Huit Montagnes|Lacs|Lagunes|Savanes|Sud-Comoé|Vallée du Bandama|Zanzan"],["CL","Chile","Aisén del General Carlos Ibáñez del Campo|Antofagasta|Araucanía|Atacama|Bío-Bío|Coquimbo|Libertador General Bernardo OʼHiggins|Los Lagos|Magallanes y Antártica Chilena|Maule|Región Metropolitana|Región de Arica y Parinacota|Región de Los Ríos|Tarapacá|Valparaíso"],["CM","Cameroon","Adamaoua ProvinceCentre Region|East Province|Far North Province|Littoral Province|North Province|North-West Region|South Province|South-West Region|West Province"],["CN","China","Anhui Sheng|Beijing|Chongqing Shi|Fujian|Gansu Sheng|Guangdong Sheng|Guangxi Zhuangzu Zizhiqu|Guizhou Sheng|Hainan|Hebei|Heilongjiang Sheng|Henan Sheng|HubeiHunan|Inner Mongolia|Jiangsu Sheng|Jiangxi|Jilin Sheng|Liaoning|Ningxia Huizu Zizhiqu|Qinghai Sheng|Shaanxi Sheng|Shandong Sheng|Shanghai Shi|Shanxi Sheng|Sichuan|Tianjin Shi|Tibet Autonomous Region|Xinjiang Uygur Zizhiqu|Yunnan|Zhejiang Sheng"],["CO","Colombia","Amazonas|Antioquia|Arauca|Archipiélago de San Andrés, Providencia y Santa Catalina|Atlántico|Bogota D.C.|Bolívar|Boyacá|Caldas|Caquetá|Casanare|Cauca|Cesar|Chocó|Cundinamarca|Córdoba|Guaviare|Huila|La Guajira|Magdalena|Meta|Nariño|Norte de Santander|Putumayo|Quindío|Risaralda|Santander|Sucre|Tolima|Valle del Cauca"],["CR","Costa Rica","Alajuela|Cartago|Guanacaste|Heredia|Limón|Puntarenas|San José"],["CU","Cuba","Artemisa|Camagüey|Ciego de Ávila|Cienfuegos|Ciudad de La Habana|Granma|Guantánamo|Holguín|Isla de la Juventud|Las Tunas|Matanzas|Mayabeque|Pinar del Río|Sancti Spíritus|Santiago de Cuba|Villa Clara"],["CV","Cape Verde","Concelho de Santa Catarina do Fogo|Praia|Sal|São Vicente"],["CY","Cyprus","Famagusta|Kyrenia|Larnaca|Limassol|Nicosia|Paphos"],["CZ","Czech Republic","Hlavní Mesto Praha|Jihočeský Kraj|Karlovarský Kraj|Královéhradecký Kraj|Liberecký Kraj|Moravskoslezský Kraj|Olomoucký Kraj|Pardubický Kraj|Plzeňský Kraj|South Moravian Region|Středočeský Kraj|Vysočina Kraj|Zlínský Kraj|Ústecký Kraj"],["DE","Germany","Baden-Württemberg|Bayern|Berlin|Brandenburg|Bremen|Hamburg|Hessen|Mecklenburg-Vorpommern|Niedersachsen|Nordrhein-Westfalen|Rheinland-Pfalz|Saarland|Sachsen|Sachsen-Anhalt|Schleswig-Holstein|Thüringen"],["DJ","Djibouti","Ali Sabieh|Djibouti|Obock|Tadjourah"],["DK","Denmark","Capital Region|Central Jutland|North Jutland|South Denmark|Zealand"],["DM","Dominica","Saint George"],["DO","Dominican Republic","Azua|Baoruco|Barahona|Dajabón|Distrito Nacional|Duarte|El Seíbo|Espaillat|Hato Mayor|Hermanas Mirabal|La Altagracia|La Romana|La Vega|María Trinidad Sánchez|Monseñor Nouel|Monte Cristi|Monte Plata|Peravia|Puerto Plata|San Cristóbal|San José de Ocoa|San Juan|San Pedro de Macorís|Santiago|Santiago Rodríguez|Santo Domingo|Sánchez Ramírez|Valverde"],["DZ","Algeria","Adrar|Alger|Annaba|Aïn Defla|Aïn Temouchent|Batna|Bejaïa|Biskra|Blida|Bordj Bou Arréridj|Bouira|Boumerdes|Béchar|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaïa|Guelma|Jijel|Khenchela|Laghouat|Mascara|Mila|Mostaganem|Médéa|Mʼsila|Naama النعامة|Oran|Ouargla|Oum el Bouaghi|Relizane|Saïda|Sidi Bel Abbès|Skikda|Souk Ahras|Sétif|Tamanghasset|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen|Tébessa"],["EC","Ecuador","Azuay|Bolívar|Carchi|Cañar|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Guayas|Imbabura|Loja|Los Ríos|Manabí|Morona-Santiago|Napo|Orellana|Pastaza|Pichincha|Santa Elena|Santo Domingo de los Tsáchilas|Sucumbios|Tungurahua|Zamora-Chinchipe"],["EE","Estonia","Harjumaa|Ida-Virumaa|Lääne-Virumaa|Pärnumaa|Tartumaa|Viljandimaa"],["EG","Egypt","Ad Daqahlīyah|Al Baḩr al Aḩmar|Al Buḩayrah|Al Fayyūm|Al Gharbīyah|Al Ismā‘īlīyah|Al Jīzah|Al Minyā|Al Minūfīyah|Al Qalyūbīyah|Al Qāhirah|Al Wādī al Jadīd|Alexandria|As Suways|Aswān|Asyūţ|Banī Suwayf|Būr Sa‘īd|Dumyāţ|Eastern Province|Kafr ash Shaykh|Maţrūḩ|Muḩāfaz̧at al Uqşur|Qinā|Shamāl Sīnāʼ|Sūhāj"],["EH","Western Sahara","Oued Ed-Dahab-Lagouira"],["ER","Eritrea","Debub|Debubawī Kʼeyih Bahrī|Gash Barka|Maʼākel|Semēnawī Kʼeyih Bahrī|Ānseba"],["ES","Spain","Andalusia|Aragon|Asturias|Autonomous Region of Navarre|Balearic Islands|Basque Country|Canary Islands|Cantabria|Castille and León|Castille-La Mancha|Catalonia|Ceuta|Extremadura|Galicia|La Rioja|Madrid|Melilla|Murcia|Valencia"],["ET","Ethiopia","Afar|Amhara|Benshangul-Gumaz|Dire Dawa|Gambela|Harari|Oromia|SSNPR|Somalia|Tigray|Ādīs Ābeba"],["FI","Finland","Central Finland|Central Ostrobothnia|Finland Proper|Kainuu|Kymenlaakso|Lapland|Northern Ostrobothnia|Northern Savonia|Ostrobothnia|Pirkanmaa|Päijät-Häme|Satakunta|South Karelia|Southern Ostrobothnia|Southern Savonia|Tavastia Proper|Uusimaa"],["FJ","Fiji","Central|Northern|Western"],["FM","Micronesia, Federated States Of","Pohnpei"],["FO","Faroe Islands","Streymoy"],["FR","France","Alsace-Champagne-Ardenne-Lorraine|Aquitaine-Limousin-Poitou-Charentes|Auvergne-Rhône-Alpes|Bourgogne-Franche-Comté|Brittany|Centre|Corsica|Hauts-de-France|Languedoc-Roussillon-Midi-Pyrénées|Normandy|Pays de la Loire|Provence-Alpes-Côte d'Azur|Île-de-France"],["GA","Gabon","Estuaire|Haut-Ogooué|Moyen-Ogooué|Ngounié|Nyanga|Ogooué-Lolo|Ogooué-Maritime|Woleu-Ntem"],["GB","United Kingdom","England|N Ireland|Scotland|Wales"],["GD","Grenada","Saint George"],["GE","Georgia","Abkhazia|Ajaria|Guria|Imereti|Kakheti|Kvemo Kartli|Samegrelo and Zemo Svaneti|Samtskhe-Javakheti|Shida Kartli|T'bilisi"],["GF","French Guiana","Guyane"],["GG","Guernsey","Guernsey"],["GH","Ghana","Ashanti|Brong-Ahafo|Central|Eastern|Greater Accra|Northern|Upper East|Upper West|Volta|Western"],["GL","Greenland","Sermersooq"],["GM","Gambia","Banjul|North Bank|Western"],["GN","Guinea","Boké|Conakry|Faranah|Kankan|Kindia|Labé|Mamou|Nzérékoré"],["GP","Guadeloupe","Guadeloupe"],["GQ","Equatorial Guinea","Bioko Norte|Kié-Ntem|Litoral"],["GR","Greece","Chios|Nomós Achaḯas|Nomós Aitolías kai Akarnanías|Nomós Argolídos|Nomós Arkadías|Nomós Attikís|Nomós Chaniás|Nomós Dodekanísou|Nomós Drámas|Nomós Evvoías|Nomós Florínis|Nomós Fthiótidos|Nomós Ileías|Nomós Imathías|Nomós Ioannínon|Nomós Irakleíou|Nomós Kardhítsas|Nomós Kaválas|Nomós Kerkýras|Nomós Kilkís|Nomós Korinthías|Nomós Kozánis|Nomós Lakonías|Nomós Larísis|Nomós Lésvou|Nomós Magnisías|Nomós Messinías|Nomós Pierías|Nomós Prevézis|Nomós Péllis|Nomós Rethýmnis|Nomós Rodópis|Nomós Serrón|Nomós Thessaloníkis|Nomós Voiotías|Nomós Xánthis|Nomós Ártas|Nomós Évrou|Trikala"],["GT","Guatemala","Alta Verapaz|Baja Verapaz|Chimaltenango|Chiquimula|El Progreso|Escuintla|Guatemala|Huehuetenango|Izabal|Jalapa|Jutiapa|Petén|Quetzaltenango|Quiché|Retalhuleu|Sacatepéquez|San Marcos|Santa Rosa|Sololá|Suchitepéquez|Totonicapán|Zacapa"],["GU","Guam","Dededo Municipality|Hagåtña Municipality|Mangilao Municipality|Tamuning-Tumon-Harmon Municipality|Yigo Municipality"],["GW","Guinea-Bissau","Bafatá|Bissau Autonomous Region"],["GY","Guyana","Demerara-Mahaica|East Berbice-Corentyne|Upper Demerara-Berbice"],["HK","Hong Kong","Central and Western|Islands|Kowloon City|Sha Tin|Tai Po|Tsuen Wan|Tuen Mun|Yuen Long"],["HN","Honduras","Atlántida|Choluteca|Colón|Comayagua|Copán|Cortés|El Paraíso|Francisco Morazán|La Paz|Olancho|Santa Bárbara|Valle|Yoro"],["HR","Croatia","Bjelovarsko-Bilogorska|Brodsko-Posavska|Dubrovačko-Neretvanska|Grad Zagreb|Istarska|Karlovačka|Koprivničko-Križevačka|Međimurska|Osječko-Baranjska|Požeško-Slavonska|Primorsko-Goranska|Sisačko-Moslavačka|Splitsko-Dalmatinska|Varaždinska|Virovitičk-Podravska|Vukovarsko-Srijemska|Zadarska|Zagrebačka|Šibensko-Kniniska"],["HT","Haiti","Artibonite|Centre|GrandʼAnse|Nippes|Nord|Nord-Ouest|Ouest|Sud|Sud-Est"],["HU","Hungary","Baranya|Borsod-Abaúj-Zemplén|Budapest|Bács-Kiskun|Békés|Csongrád|Fejér|Győr-Moson-Sopron|Hajdú-Bihar|Heves|Jász-Nagykun-Szolnok|Komárom-Esztergom|Nógrád|Pest|Somogy|Szabolcs-Szatmár-Bereg|Tolna|Vas|Veszprém|Zala"],["ID","Indonesia","Aceh|Bali|Bangka-Belitung|Banten|Bengkulu|Central Java|Central Sulawesi|Daerah Istimewa Yogyakarta|East Java|East Kalimantan|East Nusa Tenggara|Gorontalo|Irian Jaya Barat|Jakarta Raya|Jambi|Kalimantan Tengah|Lampung|Maluku|Maluku Utara|North Sulawesi|North Sumatra|Nusa Tenggara Barat|Papua|Riau|Riau Islands|South Kalimantan|South Sulawesi|South Sumatra|Sulawesi Barat|Sulawesi Tenggara|West Java|West Kalimantan|West Sumatra"],["IE","Ireland","Connaught|Leinster|Munster|Ulster"],["IL","Israel","Central District|Haifa|Jerusalem District|Northern District|Southern District|Tel Aviv"],["IM","Isle Of Man","Isle Of Man"],["IN","India","Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bengal|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kashmir|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|NCT|Nagaland|Orissa|Puducherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal"],["IQ","Iraq","Al Başrah|Al Muthanná|Al Qādisīyah|An Najaf|Anbar|Arbīl|As Sulaymānīyah|At Taʼmīm|Baghdād|Bābil|Dahūk|Dhi Qar|Diyala|Karbalāʼ|Maysan|Nīnawá|Wāsiţ|Şalāḩ ad Dīn"],["IR","Iran, Islamic Republic Of","Ardabīl|Bushehr|Chahār Maḩāll va Bakhtīārī|East Azarbaijan|Eşfahān|Fārs|Golestān|Gīlān|Hamadān|Hormozgān|Kermān|Kermānshāh|Khorāsān-e Jonūbī|Khorāsān-e Shomālī|Khūzestān|Kohgīlūyeh va Būyer Aḩmad|Kordestān|Lorestān|Markazi|Māzandarān|Ostān-e Alborz|Qazvīn|Qom|Razavi Khorasan|Semnān|Sīstān va Balūchestān|Tehrān|Yazd|Zanjan|Āz̄ārbāyjān-e Gharbī|Īlām"],["IS","Iceland","Capital Region|Northeast"],["IT","Italy","Abruzzo|Aosta Valley|Apulia|Basilicate|Calabria|Campania|Emilia-Romagna|Friuli Venezia Giulia|Latium|Liguria|Lombardy|Molise|Piedmont|Sardinia|Sicily|The Marches|Trentino-Alto Adige|Tuscany|Umbria|Veneto"],["JE","Jersey","Jersey"],["JM","Jamaica","Clarendon|Kingston|Manchester|Saint Andrew|Saint Catherine|Saint James|Westmoreland"],["JO","Jordan","Ajlun|Amman|Aqaba|Balqa|Irbid|Jerash|Karak|Madaba|Mafraq|Ma’an|Tafielah|Zarqa"],["JP","Japan","Aichi|Akita|Aomori|Chiba|Ehime|Fukui|Fukuoka|Fukushima|Gifu|Gunma|Hiroshima|Hokkaidō|Hyōgo|Ibaraki|Ishikawa|Iwate|Kagawa|Kagoshima|Kanagawa|Kumamoto Prefecture|Kyōto|Kōchi|Mie|Miyagi|Miyazaki|Nagano|Nagasaki|Nara|Niigata|Okayama|Okinawa|Saga|Saitama|Shiga|Shimane|Shizuoka|Tochigi|Tokushima|Tottori|Toyama|Tōkyō|Wakayama|Yamagata|Yamaguchi|Yamanashi|Ōita|Ōsaka"],["KE","Kenya","Baringo|Bungoma|Busia|Embu|Garissa|Homa Bay|Isiolo|Kakamega|Kericho|Kiambu|Kilifi|Kirinyaga|Kisii|Kisumu|Kitui|Laikipia|Lamu|Machakos|Makueni|Mandera|Marsabit|Meru|Migori|Mombasa|Murang'A|Nairobi Area|Nakuru|Narok|Nyandarua|Nyeri|Samburu|Siaya|Taita Taveta|Trans Nzoia|Turkana|Uasin Gishu|Vihiga|Wajir|West Pokot"],["KG","Kyrgyzstan","Batken|Bishkek|Chüy|Jalal-Abad|Naryn|Osh|Talas|Ysyk-Köl"],["KH","Cambodia","Kaôh Kŏng|Khétt Bântéay Méan Choăy|Khétt Bătdâmbâng|Khétt Kâmpóng Spœ|Khétt Kâmpôt|Khétt Pailĭn|Khétt Preăh Seihânŭ|Khétt Siĕm Réab|Khêtt Rôtânôkiri|Krâchéh|Krŏng Phnum Pénh|Kâmpóng Cham|Kâmpóng Chhnăng|Kâmpóng Thum|Kândal|Poŭthĭsăt|Prey Vêng|Preăh Vĭhéar|Stœ̆ng Trêng|Svay Riĕng|Takêv|Ŏtâr Méanchey"],["KI","Kiribati","Gilbert Islands"],["KM","Comoros","Anjouan|Grande Comore"],["KN","Saint Kitts And Nevis","Saint George Basseterre"],["KP","Korea, Democratic People's Republic Of","Chagang-do|Gangwon|Hamgyŏng-bukto|Hamgyŏng-namdo|Hwanghae-bukto|Hwanghae-namdo|Najin Sŏnbong-si|P'yŏngan-bukto|P'yŏngan-namdo|P'yŏngyang-si|Yanggang-do"],["KR","Korea, Republic Of","Busan|Daegu|Daejeon|Gangwon|Gwangju|Gyeonggi|Incheon|Jeju|North Chungcheong|North Gyeongsang|North Jeolla|Seoul|South Chungcheong|South Gyeongsang|South Jeolla|Ulsan"],["KW","Kuwait","Al Aḩmadī|Al Farwaniyah|Al Jahrāʼ|Al ‘Āşimah|Muḩāfaz̧at Mubārak al Kabīr|Ḩawallī"],["KZ","Kazakhstan","Almaty|Almaty Qalasy|Aqmola|Aqtöbe|Astana Qalasy|Atyraū|Batys Qazaqstan|Bayqongyr Qalasy|East Kazakhstan|Mangghystaū|Ongtüstik Qazaqstan|Pavlodar|Qaraghandy|Qostanay|Qyzylorda|Soltüstik Qazaqstan|Zhambyl"],["LA","Lao People's Democratic Republic","Bokèo|Bolikhamxai|Champasak|Houaphan|Khammouan|Khouèng Viangchan|Louangphabang|Oudômxai|Savannahkhét|Viangchan|Xiangkhoang"],["LB","Lebanon","Baalbek-Hermel|Beyrouth|Béqaa|Liban-Nord|Liban-Sud|Mont-Liban|Nabatîyé"],["LC","Saint Lucia","Castries"],["LI","Liechtenstein","Vaduz"],["LK","Sri Lanka","Central|North Central|North Western|Northern Province|Sabaragamuwa|Southern|Uva|Western"],["LR","Liberia","Bong|Grand Bassa|Grand Gedeh|Lofa|Margibi|Maryland|Montserrado|Nimba|Sinoe"],["LS","Lesotho","Butha-Buthe|Leribe|Mafeteng|Maseru|Mohaleʼs Hoek|Qachaʼs Nek|Quthing"],["LT","Lithuania","Alytaus Apskritis|Kauno Apskritis|Klaipėdos Apskritis|Marijampolės Apskritis|Panevėžio Apskritis|Tauragės Apskritis|Telšių Apskritis|Utenos Apskritis|Vilniaus Apskritis|Šiaulių Apskritis"],["LU","Luxembourg","Luxembourg"],["LV","Latvia","Cēsu Rajons|Daugavpils Rajons|Jelgava|Jēkabpils Rajons|Jūrmala|Liepāja|Ogres Rajons|Rēzekne|Rīga|Salaspils Novads|Tukuma Rajons|Valmieras Rajons|Ventspils"],["LY","Libyan Arab Jamahiriya","Al Jabal al Akhḑar|Al Jufrah|Al Kufrah|Al Marj|An Nuqāţ al Khams|Ash Shāţiʼ|Az Zāwiyah|Banghāzī|Darnah|Ghāt|Mişrātah|Murzuq|Nālūt|Sabhā|Sha‘bīyat Wādī al Ḩayāt|Sha‘bīyat al Buţnān|Sha‘bīyat al Jabal al Gharbī|Sha‘bīyat al Marqab|Sha‘bīyat al Wāḩāt|Surt|Ţarābulus"],["MA","Morocco","Chaouia-Ouardigha|Doukkala-Abda|Fès-Boulemane|Gharb-Chrarda-Beni Hssen|Grand Casablanca|Guelmim-Es Smara|Marrakech-Tensift-Al Haouz|Meknès-Tafilalet|Oriental|Oued ed Dahab-Lagouira|Rabat-Salé-Zemmour-Zaër|Souss-Massa-Drâa|Tadla-Azilal|Tanger-Tétouan|Taza-Al Hoceima-Taounate"],["MC","Monaco","Commune de Monaco"],["MD","Moldova, Republic Of","Bender|Bălţi|Chişinău|Căuşeni|Găgăuzia|Raionul Cahul|Raionul Drochia|Raionul Edineţ|Raionul Floreşti|Raionul Hînceşti|Raionul Orhei|Raionul Soroca|Raionul Străşeni|Raionul Sîngerei|Raionul Teleneşti|Raionul Ungheni|Stînga Nistrului"],["ME","Montenegro","Opština Bar|Opština Bijelo Polje|Opština Budva|Opština Cetinje|Opština Herceg Novi|Opština Nikšić|Opština Pljevlja|Opština Podgorica"],["MH","Marshall Islands","Majuro Atoll"],["MK","Macedonia, The Former Yugoslav Republic Of","Bitola|Bogovinje|Brvenica|Centar Župa|Debar|Delčevo|Gevgelija|Gostivar|Ilinden|Karpoš|Kavadarci|Kisela Voda|Kičevo|Kočani|Kriva Palanka|Kumanovo|Negotino|Ohrid|Opstina Lipkovo|Opština Butel|Prilep|Radoviš|Resen|Saraj|Struga|Strumica|Studeničani|Tearce|Tetovo|Veles|Vinica|Vrapčište|Čair|Štip|Šuto Orizari|Želino"],["ML","Mali","Bamako|Gao|Kayes|Koulikoro|Mopti|Sikasso|Ségou|Tombouctou"],["MM","Myanmar","Ayeyarwady|Bago|Chin|Kachin|Kayah|Kayin|Magway|Mandalay|Mon|Rakhine|Sagain|Shan|Tanintharyi|Yangon"],["MN","Mongolia","Bayan-Ölgiy|Bayanhongor|Bulgan|Central Aymag|Darhan Uul|Dzavhan|East Gobi Aymag|Govĭ-Altay|Hovd|Hövsgöl|Middle Govĭ|Orhon|Selenge|South Gobi Aymag|Sühbaatar|Ulaanbaatar|Uvs|Övörhangay"],["MO","Macao","Macau"],["MP","Northern Mariana Islands","Saipan Municipality"],["MQ","Martinique","Fort-de-France|Le Marin|Le Trinité"],["MR","Mauritania","Adrar|Assaba|Brakna|Dakhlet Nouadhibou|Gorgol|Guidimaka|Hodh ech Chargui|Nouakchott|Tiris Zemmour|Trarza"],["MS","Montserrat","Saint Anthony|Saint Peter"],["MT","Malta","Birkirkara|Il-Belt Valletta|Il-Mosta|Qormi|Ħaż-Żabbar"],["MU","Mauritius","Flacq|Grand Port|Moka|Pamplemousses|Plaines Wilhems|Port Louis|Rivière du Rempart"],["MV","Maldives","Kaafu Atholhu"],["MW","Malawi","Central Region|Northern Region|Southern Region"],["MX","Mexico","Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila|Colima|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Michoacán|Morelos|México|Nayarit|Nuevo León|Oaxaca|Puebla|Querétaro|Quintana Roo|San Luis Potosí|Sinaloa|Sonora|Tabasco|Tamaulipas|The Federal District|Tlaxcala|Veracruz-Llave|Yucatán|Zacatecas"],["MY","Malaysia","Johor|Kedah|Kelantan|Kuala Lumpur|Labuan|Melaka|Negeri Sembilan|Pahang|Perak|Perlis|Pulau Pinang|Putrajaya|Sabah|Sarawak|Selangor|Terengganu"],["MZ","Mozambique","Cabo Delgado|Gaza|Inhambane|Manica|Maputo|Maputo City|Nampula|Niassa|Sofala|Tete|Zambézia"],["NA","Namibia","Caprivi|Erongo|Hardap|Karas|Khomas|Omaheke|Oshana|Otjozondjupa"],["NC","New Caledonia","Province Sud"],["NE","Niger","Agadez|Diffa|Dosso|Maradi|Niamey|Tahoua|Tillabéri|Zinder"],["NG","Nigeria","Abia|Abuja Federal Capital Territory|Adamawa|Akwa Ibom|Anambra|Bauchi|Bayelsa|Benue State|Borno|Cross River|Delta|Ebonyi|Edo|Ekiti|Enugu|Gombe|Imo|Jigawa State|Kaduna|Kano|Katsina|Kebbi|Kogi|Kwara|Lagos|Nassarawa|Niger|Ogun|Ondo|Osun|Oyo|Plateau|Rivers|Sokoto|Taraba|Yobe|Zamfara"],["NI","Nicaragua","Atlántico Norte|Atlántico Sur|Boaco|Carazo|Chinandega|Chontales|Estelí|Granada|Jinotega|León|Madriz|Managua|Masaya|Matagalpa|Nueva Segovia|Rivas"],["NL","Netherlands","Drenthe|Flevoland|Gelderland|Limburg|North Brabant|North Holland|Overijssel|Province of Groningen|Provincie Friesland|South Holland|Utrecht|Zeeland"],["NO","Norway","Aust-Agder county|Buskerud county|Hedmark county|Hordaland|Møre og Romsdal|Nord-Trøndelag|Nordland|Oppland county|Oslo|Rogaland|Sør-Trøndelag|Telemark county|Troms|Vest-Agder|Vestfold county|Østfold"],["NP","Nepal","Central Region|Eastern Region|Far Western Region|Mid Western Region|Western Region"],["NR","Nauru","Yaren"],["NZ","New Zealand","Auckland|Bay of Plenty|Canterbury|Gisborne|Hawke's Bay|Manawatu-Wanganui|Marlborough|Nelson|Northland|Otago|Southland|Taranaki|Waikato|Wellington"],["OM","Oman","Ad Dākhilīyah|Al Bāţinah|Ash Sharqīyah|Az̧ Z̧āhirah|Masqaţ|Muḩāfaz̧at Musandam|Muḩāfaz̧at al Buraymī|Z̧ufār"],["PA","Panama","Bocas del Toro|Chiriquí|Coclé|Colón|Herrera|Panamá|Veraguas"],["PE","Peru","Amazonas|Ancash|Apurímac|Arequipa|Ayacucho|Cajamarca|Callao|Cusco|Huancavelica|Huanuco|Ica|Junín|La Libertad|Lambayeque|Lima|Loreto|Madre de Dios|Moquegua|Pasco|Piura|Puno|San Martín|Tacna|Tumbes|Ucayali"],["PF","French Polynesia","Îles du Vent"],["PG","Papua New Guinea","Bougainville|East New Britain|East Sepik|Eastern Highlands|Madang|Morobe|National Capital District|Northern Province|Southern Highlands|West New Britain|Western Highlands|Western Province"],["PH","Philippines","Autonomous Region in Muslim Mindanao|Bicol|Cagayan Valley|Calabarzon|Caraga|Central Luzon|Central Visayas|Cordillera Administrative Region|Davao|Eastern Visayas|Ilocos|Mimaropa|National Capital Region|Northern Mindanao|Soccsksargen|Western Visayas|Zamboanga Peninsula"],["PK","Pakistan","Azad Kashmir|Balochistān|Islāmābād|North West Frontier Province|Punjab|Sindh"],["PL","Poland","Greater Poland Voivodeship|Kujawsko-Pomorskie|Lesser Poland Voivodeship|Lower Silesian Voivodeship|Lublin Voivodeship|Lubusz|Masovian Voivodeship|Opole Voivodeship|Podlasie|Pomeranian Voivodeship|Silesian Voivodeship|Subcarpathian Voivodeship|Warmian-Masurian Voivodeship|West Pomeranian Voivodeship|Łódź Voivodeship|Świętokrzyskie"],["PR","Puerto Rico","Aguadilla|Arecibo|Barceloneta|Bayamón|Caguas|Carolina|Catano|Cayey|Fajardo|Guayama|Guaynabo|Humacao|Manati|Mayaguez|Ponce|San Juan|Toa Baja|Trujillo Alto|Vega Baja|Yauco"],["PS","Palestine, State Of","Gaza Strip|West Bank"],["PT","Portugal","Aveiro|Azores|Beja|Braga|Bragança|Castelo Branco|Coimbra|Faro|Guarda|Leiria|Lisbon|Madeira|Portalegre|Porto|Santarém|Setúbal|Viana do Castelo|Vila Real|Viseu|Évora"],["PW","Palau","Melekeok"],["PY","Paraguay","Alto Paraná|Amambay|Asunción|Caaguazú|Caazapá|Central|Concepción|Cordillera|Guairá|Itapúa|Misiones|Presidente Hayes|Ñeembucú"],["QA","Qatar","Ad Dawḩah|Al Khawr|Al Wakrah|Ar Rayyān|Umm Şalāl"],["RE","Reunion","Réunion"],["RO","Romania","Alba|Arad|Argeş|Bacău|Bihor|Bistriţa-Năsăud|Botoşani|Braşov|Brăila|Bucureşti|Buzău|Caraş-Severin|Cluj|Constanţa|Covasna|Călăraşi|Dolj|Dâmboviţa|Galaţi|Giurgiu|Gorj|Harghita|Hunedoara|Ialomiţa|Iaşi|Ilfov|Maramureş|Mehedinţi|Mureş|Neamţ|Olt|Prahova|Satu Mare|Sibiu|Suceava|Sălaj|Teleorman|Timiş|Tulcea|Vaslui|Vrancea|Vâlcea"],["RS","Serbia","Autonomna Pokrajina Vojvodina|Central Serbia"],["RU","Russian Federation","Adygeya|Altay|Altayskiy|Amur|Arkhangelskaya|Astrakhan|Bashkortostan|Belgorod|Brjansk|Buryatiya|Chechnya|Chelyabinsk Oblast|Chuvashia|Dagestan|Ingushetiya|Irkutsk|Ivanovo|Jaroslavl|Jewish Autonomous Oblast|Kabardino-Balkariya|Kaliningrad|Kalmykiya|Kaluga|Kamtsjatka|Karachayevo-Cherkesiya|Kareliya|Kemerovo|Khabarovsk Krai|Khakasiya|Khanty-Mansiyskiy Avtonomnyy Okrug|Kirov|Komi|Kostroma|Krasnodarskiy|Krasnoyarskiy|Kurgan|Kursk|Leningrad|Lipetsk|Magadan|Mariy-El|Mordoviya|Moscow|Moskovskaya|Murmansk|Nenetskiy Avtonomnyy Okrug|Nizjnij Novgorod|North Ossetia|Novgorod|Novosibirsk|Omsk|Orenburg|Orjol|Penza|Perm|Primorskiy|Pskov|Rjazan|Rostov|Sakha|Sakhalin|Samara|Sankt-Peterburg|Saratov|Smolensk|Stavropol'skiy|Sverdlovsk|Tambov|Tatarstan|Tjumen|Tomsk|Tula|Tverskaya|Tyva|Udmurtiya|Uljanovsk|Vladimir|Volgograd|Vologda|Voronezj|Yamalo-Nenetskiy Avtonomnyy Okrug|Zabaykal’skiy Kray"],["RW","Rwanda","Eastern Province|Kigali City|Northern Province|Southern Province|Western Province"],["SA","Saudi Arabia","Al Bāḩah|Al Jawf|Al Madīnah|Al Qaşīm|Ar Riyāḑ|Ash Sharqīyah|Jīzān|Makkah|Minţaqat ‘Asīr|Najrān|Northern Borders Region|Tabūk|Ḩāʼil"],["SB","Solomon Islands","Guadalcanal"],["SC","Seychelles","English River"],["SD","Sudan","Al Qadarif|Blue Nile|Gezira|Kassala State|Khartoum|NilevNorthern Darfur State|Northern Kordofan State|Northern State|Red Sea|Sinnar State|Southern Kordofan|Western Darfur|White Nile"],["SE","Sweden","Blekinge|Dalarna|Gotland|Gävleborg|Halland|Jämtland|Jönköping|Kalmar|Kronoberg|Norrbotten|Skåne|Stockholm|Södermanland|Uppsala|Värmland|Västerbotten|Västernorrland|Västmanland|Västra Götaland|Örebro|Östergötland"],["SG","Singapore","Singapore"],["SH","Saint Helena","Saint Helena"],["SI","Slovenia","Celje|Koper-Capodistria|Kranj|Ljubljana|Maribor|Novo Mesto|Ptuj|Trbovlje|Velenje"],["SJ","Svalbard And Jan Mayen","Svalbard"],["SK","Slovakia","Banskobystrický|Bratislavský|Košický|Nitriansky|Prešovský|Trenčiansky|Trnavský|Žilinský"],["SL","Sierra Leone","Eastern Province|Northern Province|Southern Province|Western Area"],["SM","San Marino","San Marino"],["SN","Senegal","Dakar|Diourbel|Fatick|Kaffrine|Kaolack|Kolda|Kédougou|Louga|Matam|Saint-Louis|Sédhiou|Tambacounda|Thiès|Ziguinchor"],["SO","Somalia","Awdal|Banaadir|Bari|Bay|Galguduud|Gedo|Hiiraan|Lower Juba|Middle Juba|Middle Shabele|Mudug|Nugaal|Sanaag|Shabeellaha Hoose|Sool|Togdheer|Woqooyi Galbeed"],["SR","Suriname","Paramaribo|Wanica"],["ST","Sao Tome And Principe","São Tomé"],["SV","El Salvador","Ahuachapán|Cabañas|Chalatenango|Cuscatlán|La Libertad|La Paz|La Unión|Morazán|San Miguel|San Salvador|San Vicente|Santa Ana|Sonsonate|Usulután"],["SY","Syrian Arab Republic","Al-Hasakah|Aleppo|Ar-Raqqah|As-Suwayda|Damascus City|Daraa|Deir ez-Zor|Hama|Homs|Idlib|Latakia|Quneitra|Rif-dimashq|Tartus"],["SZ","Swaziland","Hhohho|Manzini"],["TD","Chad","Batha|Chari-Baguirmi|Guéra|Kanem|Logone Occidental|Logone Oriental|Mayo-Kébbi|Moyen-Chari|Ouaddaï|Région du Barh el Gazel|Région du Hadjer-Lamis|Région du Mandoul|Région du Mayo-Kébbi Ouest|Salamat|Tandjilé"],["TF","French Southern Territories","Kerguelen"],["TG","Togo","Centrale|Kara|Maritime|Plateaux|Savanes"],["TH","Thailand","Amnat Charoen|Ang Thong|Bangkok|Buriram|Chachoengsao|Chai Nat|Chaiyaphum|Chanthaburi|Chiang Mai|Chiang Rai|Chon Buri|Chumphon|Kalasin|Kamphaeng Phet|Kanchanaburi|Khon Kaen|Krabi|Lampang|Lamphun|Loei|Lop Buri|Maha Sarakham|Mukdahan|Nakhon Nayok|Nakhon Pathom|Nakhon Phanom|Nakhon Ratchasima|Nakhon Sawan|Nakhon Si Thammarat|Nan|Narathiwat|Nong Bua Lamphu|Nong Khai|Nonthaburi|Pathum Thani|Pattani|Phatthalung|Phayao|Phetchabun|Phetchaburi|Phichit|Phitsanulok|Phra Nakhon Si Ayutthaya|Phrae|Phuket Province|Prachin Buri|Prachuap Khiri Khan|Ranong|Ratchaburi|Rayong|Roi Et|Sa Kaeo|Sakon Nakhon|Samut Prakan|Samut Sakhon|Samut Songkhram|Sara Buri|Satun|Sing Buri|Sisaket|Songkhla|Sukhothai|Suphan Buri|Surat Thani|Surin|Tak|Trang|Trat|Ubon Ratchathani|Udon Thani|Uthai Thani|Uttaradit|Yala|Yasothon"],["TJ","Tajikistan","Dushanbe|Gorno-Badakhshan|Khatlon|Region of Republican Subordination|Sughd"],["TL","Timor-Leste","Aileu|Baucau|Bobonaro|Cova Lima|Díli|Lautém|Liquiçá|Manufahi"],["TM","Turkmenistan","Ahal|Balkan|Daşoguz|Lebap|Mary"],["TN","Tunisia","Al Mahdīyah|Al Munastīr|Al Qayrawān|Al Qaşrayn|Ariana|Banzart|Bin ‘Arūs|Bājah|Gouvernorat de la Manouba|Jundūbah|Kef|Madanīn|Nābul|Qafşah|Qibilī|Qābis|Silyānah|Sīdī Bū Zayd|Sūsah|Tawzar|Taţāwīn|Tūnis|Zaghwān|Şafāqis"],["TO","Tonga","Tongatapu"],["TR","Turkey","Adana|Adıyaman|Afyonkarahisar|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydın|Ağrı|Balıkesir|Bartın|Batman|Bayburt|Bilecik|Bingöl|Bitlis|Bolu|Burdur|Bursa|Denizli|Diyarbakır|Düzce|Edirne|Elazığ|Erzincan|Erzurum|Eskişehir|Gaziantep|Giresun|Gümüşhane|Hakkâri|Hatay|Isparta|Istanbul|Iğdır|Kahramanmaraş|Karabük|Karaman|Kars|Kastamonu|Kayseri|Kilis|Kocaeli|Konya|Kütahya|Kırklareli|Kırıkkale|Kırşehir|Malatya|Manisa|Mardin|Mersin|Muğla|Muş|Nevşehir|Niğde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Siirt|Sinop|Sivas|Tekirdağ|Tokat|Trabzon|Tunceli|Uşak|Van|Yalova|Yozgat|Zonguldak|Çanakkale|Çankırı|Çorum|İzmir|Şanlıurfa|Şırnak"],["TT","Trinidad And Tobago","Arima|Chaguanas|Mayaro|Point Fortin|Port-of-Spain|San Fernando|San Juan/Laventille|Sangre Grande|Tobago|Tunapuna/Piarco"],["TV","Tuvalu","Funafuti"],["TW","Taiwan","Fukien|Kaohsiung|Taichung|Tainan|Taipei|Taiwan|Taoyuan"],["TZ","Tanzania, United Republic Of","Arusha|Dar es Salaam|Dodoma|Geita|Iringa|Kagera|Katavi|Kigoma|Kilimanjaro|Lindi|Manyara|Mara|Mbeya|Morogoro|Mtwara|Mwanza|Njombe|Pemba North|Pemba South|Pwani|Rukwa|Ruvuma|Shinyanga|Simiyu|Singida|Tabora|Tanga|Zanzibar Central/South|Zanzibar Urban/West"],["UA","Ukraine","Avtonomna Respublika Krym|Cherkas'ka|Chernihivs'ka|Chernivets'ka|Dnipropetrovska|Donets'ka|Ivano-Frankivs'ka|Kharkivs'ka|Kherson|Khmel'nyts'ka|Kiev|Kirovohrads'ka|L'vivs'ka|Luhans'ka|Misto Kyyiv|Misto Sevastopol|Mykolayivs'ka|Odessa|Poltava|Rivnens'ka|Sumy|Ternopil's'ka|Vinnyts'ka|Volyns'ka|Zakarpats'ka|Zaporiz'ka|Zhytomyrs'ka"],["UG","Uganda","Central Region|Eastern Region|Northern Region|Western Region"],["US","United States","Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|Washington, D.C.|West Virginia|Wisconsin|Wyoming"],["UY","Uruguay","Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandú|Rivera|Rocha|Río Negro|Salto|San José|Soriano|Tacuarembó|Treinta y Tres"],["UZ","Uzbekistan","Andijon|Buxoro|Fergana|Jizzax|Karakalpakstan|Namangan|Navoiy|Qashqadaryo|Samarqand|Sirdaryo|Surxondaryo|Toshkent|Toshkent Shahri|Xorazm"],["VC","Saint Vincent And The Grenadines","Saint George"],["VE","Venezuela, Bolivarian Republic Of","Amazonas|Anzoátegui|Apure|Aragua|Barinas|Bolívar|Carabobo|Cojedes|Delta Amacuro|Distrito Capital|Falcón|Guárico|Isla Margarita|Lara|Miranda|Monagas|Mérida|Portuguesa|Sucre|Trujillo|Táchira|Vargas|Yaracuy|Zulia"],["VI","Virgin Islands, U.S.","Saint Croix Islan|Saint Thomas Island"],["VN","Viet Nam","An Giang|Bà Rịa-Vũng Tàu|Bình Dương|Bình Phước|Bình Thuận|Bình Ðịnh|Bạc Liêu|Bắc Giang|Bắc Kạn|Bắc Ninh|Bến Tre|Cao Bằng|Cà Mau|Cần Thơ|Gia Lai|Ha Nội|Hau Giang|Huyện Ðiện Biên|Hà Giang|Hà Nam|Hà Tĩnh|Hòa Bình|Hưng Yên|Hải Dương|Hải Phòng|Hồ Chí Minh|Khánh Hòa|Kiến Giang|Kon Tum|Long An|Lào Cai|Lâm Ðồng|Lạng Sơn|Nam Ðịnh|Nghệ An|Ninh Bình|Ninh Thuận|Phú Thọ|Phú Yên|Quảng Bình|Quảng Nam|Quảng Ngãi|Quảng Ninh|Quảng Trị|Sóc Trăng|Sơn La|Thanh Hóa|Thái Bình|Thái Nguyên|Thừa Thiên-Huế|Tiền Giang|Trà Vinh|Tuyên Quang|Tây Ninh|Vĩnh Long|Vĩnh Phúc|Yên Bái|Ðà Nẵng|Ðắc Lắk|Ðồng Nai|Ðồng Tháp"],["VU","Vanuatu","Shefa"],["WF","Wallis And Futuna","Circonscription d'Uvéa"],["WS","Samoa","Tuamasaga"],["XK","Kosovo","Komuna e Deçanit|Komuna e Dragashit|Komuna e Drenasit|Komuna e Ferizajt|Komuna e Gjakovës|Komuna e Gjilanit|Komuna e Istogut|Komuna e Leposaviqit|Komuna e Malisheves|Komuna e Mitrovicës|Komuna e Pejës|Komuna e Prishtinës|Komuna e Prizrenit|Komuna e Rahovecit|Komuna e Shtimes|Komuna e Thërandës|Komuna e Vitisë|Opština Kosovo Polje|Opština Podujevo|Opština Vučitrn|Opština Zvečan"],["YE","Yemen","Abyan|Aden|Al Bayḑāʼ|Al Ḩudaydah|Muḩāfaz̧at Dhamār|Muḩāfaz̧at Ibb|Muḩāfaz̧at Laḩij|Muḩāfaz̧at Ma’rib|Muḩāfaz̧at Shabwah|Muḩāfaz̧at Ta‘izz|Muḩāfaz̧at al Jawf|Muḩāfaz̧at Şa‘dah|Muḩāfaz̧at Ḩajjah|Omran|Sanaa|Ḩaḑramawt"],["ZA","South Africa","Eastern Cape|Free State|Gauteng|KwaZulu-Natal|Limpopo|Mpumalanga|North-West|Northern Cape|Western Cape"],["ZM","Zambia","Central|Copperbelt|Eastern|Luapula|Lusaka|North-Western|Northern|Southern|Western"],["ZW","Zimbabwe","Bulawayo|Harare Province|Manicaland|Mashonaland Central|Mashonaland East|Mashonaland West|Masvingo|Matabeleland North|Matabeleland South|Midlands"]];

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
            if (defaultCountrySelectedValue != null && defaultCountrySelectedValue === value) {
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