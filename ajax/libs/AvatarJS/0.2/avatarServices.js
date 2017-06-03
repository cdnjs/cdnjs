/*! Created by Innovapath on 2016-06-29 */
var avatar = angular.module('avatar', [
    'ui.bootstrap',
    'ngTouch',
    'ngCookies',
    'ui.grid',
    'ui.grid.cellNav',
    'ui.grid.edit',
    'ui.grid.resizeColumns',
    'ui.grid.pinning',
    'ui.grid.selection',
    'ui.grid.moveColumns',
    'ui.grid.exporter',
    'ui.grid.importer',
    'ui.grid.grouping',
    'ui.grid.pagination',
    'ngAnimate',
    'ngResource',
    'ui.router',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngQuill',
    'ngTable',
    'schemaForm',
    'satellizer',
    'commonService',
    'ngStorage'

]);

var apiURL="http://130.211.190.15";
avatar
    .config(function ($stateProvider, $urlRouterProvider,$authProvider){
        $urlRouterProvider.otherwise("/home");
//fb login
        $authProvider.facebook({
            clientId: '1772137439672496'
        });
        $authProvider.google({
            clientId: '357540165806-tntmgoha44qrcj4bm1753s5p2qjifecr.apps.googleusercontent.com'
        });
        $stateProvider
            //------------------------------
            // HOME
            //------------------------------
        
            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }
                }
            })


            //toggle test

            .state ('testing', {
            url: '/widgets',
            templateUrl: 'views/home.html'
        })
            .state ('controls', {
            url: '/contorls',
            template: 'views/home.html'
        })
            .state ('controls.widget-templates', {
            url: '/entities',
            templateUrl: 'common/entity/entity.html'
        })

          /*  .state ('widgets.controls.widget-templates', {
            url: '/entities',
            templateUrl: 'common/entity/entity.html'
        })
*/

            //------------------------------
            // TABLES
            //------------------------------


           /* .state ('training', {
            url: '/training',
            templateUrl: 'views/common.html'
        })*/

            .state ('tables', {
                url: '/quiz',
                templateUrl: 'views/common.html'
            })
            
            .state ('tables.subject', {
                url: '/subjects',
                templateUrl: 'quiz/subject/subject.html'
            })
            
            .state ('tables.subject_category', {
                url: '/subjects/categories',
                templateUrl: 'quiz/subjectCategory/subjectCategory.html'
            })

            .state ('tables.choice_questions', {
            url: '/choice/questions',
            templateUrl: 'quiz/quizQuestion/quizQuestion.html'
        })

            .state ('tables.video_questions', {
            url: '/video/questions',
            templateUrl: 'quiz/videoQuestions/videoQuestion.html'
        })


 //login


            .state ('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        })

            //common

            .state ('commons', {
            url: '/common',
            templateUrl: 'views/common.html'
        })

            .state ('commons.common_entity', {
            url: '/entities',
            templateUrl: 'common/entity/entity.html'
        })

            .state ('commons.common_categories', {
            url: '/categories',
            templateUrl: 'common/category/category.html'
        })
            .state ('commons.common_level', {
            url: '/levels',
            templateUrl: 'common/level/level.html'
        })
            .state ('commons.common_status', {
            url: '/status',
            templateUrl: 'common/status/status.html'
        })
            .state ('commons.common_company', {
            url: '/companies',
            templateUrl: 'common/company/company.html'
        })
            .state ('commons.common_address', {
            url: '/address',
            templateUrl: 'common/address/address.html'
        })
            .state ('commons.common_employee', {
            url: '/employees',
            templateUrl: 'common/employee/employee.html'
        })
            .state ('commons.common_contact', {
            url: '/contacts',
            templateUrl: 'common/contact/contact.html'
        })
            .state ('commons.common_types', {
            url: '/types',
            templateUrl: 'common/types/types.html'
        })

            //lookup

            .state ('admin', {
            url: '/admin',
            templateUrl: 'views/common.html'
        })
            .state ('admin.employees', {
            url: '/employees',
            templateUrl: 'views/avadress-contact.html'
        })
            .state ('admin.employees.about', {
            url: '/:id',
            templateUrl: 'views/avContact.html'
        })
            .state ('admin.employees.second', {
            url: '/:id',
            templateUrl: 'views/avAddress.html'
        })
            .state ('admin.employees.social', {
            url: '/:id',
            templateUrl: 'views/profile-photos.html'
        })
            .state ('admin.contacts', {
            url: '/contacts/:id',
            templateUrl: 'views/avCommonContact.html'
        })
            .state ('admin.test', {
            url: '/test',
            templateUrl: 'views/test.html'
        })
            .state ('admin.testContactdirective', {
            url: '/testdirective',
            templateUrl: 'views/testContactdirective.html'
        })
            .state ('admin.companies', {
            url: '/companies/:id',
            templateUrl: 'views/avCommonCompany.html'
        })
            .state ('lookup', {
            url: '/lookup',
            templateUrl: 'views/common.html'
        })
            .state ('lookup.universities', {
            url: '/universities',
            templateUrl: 'lookups/university/university.html'
        })

            .state ('lookup.education', {
            url: '/education/levels',
            templateUrl: 'lookups/educationLevels/education.html'
        })
            .state ('lookup.workstatus', {
            url: '/workstatus',
            templateUrl: 'lookups/workStatus/workStatus.html'
        })
            .state ('lookup.cities', {
            url: '/cities',
            templateUrl: 'lookups/cities/cities.html'
        })
            .state ('lookup.countries', {
            url: '/countries',
            templateUrl: 'lookups/country/country.html'
        })
            .state ('lookup.employeedesignation', {
            url: '/employee/designations',
            templateUrl: 'lookups/empDesignation/empDesignation.html'
        })
            .state ('lookup.empsalaryunit', {
            url: '/employee/salaryunit',
            templateUrl: 'lookups/empSalary/empSalary.html'
        })
            .state ('lookup.mine', {
            url: '/mine',
            templateUrl: 'quiz/mine/mine.html'
        })
            // myData table.......................................myEdit
            //------------------------------

            .state ('tables.userData', {
            url: '/userData',
            templateUrl: 'views/userData.html'
            })


            //Test
            .state ('exam', {
            url: '/test',
            templateUrl: 'views/common.html'
        })
            .state ('exam.test', {
            url: '/test',
            templateUrl: 'views/common.html'
        })

            .state ('exam.test.countries', {
            url: '/countriess',
            templateUrl: 'lookups/countries/countries.html'
        })


            //appMgmt

            .state ('appMgmt', {
            url: '/appmanagement',
            templateUrl: 'views/common.html'
        })
            .state ('appMgmt.company', {
            url: '/company',
            templateUrl: 'appMgmt/company/company.html'
        })

            .state ('appMgmt.employee', {
            url: '/employees',
            templateUrl: 'appMgmt/employee/employee.html'
        })

            //ui-sref

            .state ('employeeDetails', {
            url: '/admin/employees/:id',
            templateUrl: 'views/avContact.html'

        })
            .state ('contactDetails', {
            url: '/admin/employees/:email',
            templateUrl: 'views/avContact.html'

        })


            //-----------------------------


            // FORMS
            //------------------------------
            .state ('form', {
                url: '/form',
                templateUrl: 'views/common.html'
            })

            .state ('form.basic-form-elements', {
                url: '/basic-form-elements',
                templateUrl: 'views/form-elements.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-components', {
                url: '/form-components',
                templateUrl: 'views/form-components.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    'vendors/farbtastic/farbtastic.css',
                                    'vendors/bower_components/summernote/dist/summernote.css',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/input-mask/input-mask.min.js',
                                    'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/bower_components/summernote/dist/summernote.min.js',
                                    'vendors/fileinput/fileinput.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('form.form-examples', {
                url: '/form-examples',
                templateUrl: 'views/form-examples.html'
            })
        
            .state ('form.form-validations', {
                url: '/form-validations',
                templateUrl: 'views/form-validations.html'
            })
        
            
            //------------------------------
            // USER INTERFACE
            //------------------------------
        
            .state ('user-interface', {
                url: '/user-interface',
                templateUrl: 'views/common.html'
            })
        
            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: 'views/ui-bootstrap.html'
            })

            .state ('user-interface.colors', {
                url: '/colors',
                templateUrl: 'views/colors.html'
            })

            .state ('user-interface.animations', {
                url: '/animations',
                templateUrl: 'views/animations.html'
            })
        
            .state ('user-interface.box-shadow', {
                url: '/box-shadow',
                templateUrl: 'views/box-shadow.html'
            })
        
            .state ('user-interface.buttons', {
                url: '/buttons',
                templateUrl: 'views/buttons.html'
            })
        
            .state ('user-interface.icons', {
                url: '/icons',
                templateUrl: 'views/icons.html'
            })
        
            .state ('user-interface.alerts', {
                url: '/alerts',
                templateUrl: 'views/alerts.html'
            })
        
            .state ('user-interface.notifications-dialogs', {
                url: '/notifications-dialogs',
                templateUrl: 'views/notification-dialog.html'
            })
        
            .state ('user-interface.media', {
                url: '/media',
                templateUrl: 'views/media.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('user-interface.other-components', {
                url: '/other-components',
                templateUrl: 'views/other-components.html'
            })
            
        
            //------------------------------
            // CHARTS
            //------------------------------
            
            .state ('charts', {
                url: '/charts',
                templateUrl: 'views/common.html'
            })

            .state ('charts.flot-charts', {
                url: '/flot-charts',
                templateUrl: 'views/flot-charts.html'
            })

            .state ('charts.other-charts', {
                url: '/other-charts',
                templateUrl: 'views/other-charts.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // CALENDAR
            //------------------------------
            
            .state ('calendar', {
                url: '/calendar',
                templateUrl: 'views/calendar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // PHOTO GALLERY
            //------------------------------
            
             .state ('photo-gallery', {
                url: '/photo-gallery',
                templateUrl: 'views/common.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            //Default
        
            .state ('photo-gallery.photos', {
                url: '/photos',
                templateUrl: 'views/photos.html'
            })
        
            //Timeline
    
            .state ('photo-gallery.timeline', {
                url: '/timeline',
                templateUrl: 'views/photo-timeline.html'
            })
        
        
            //------------------------------
            // GENERIC CLASSES
            //------------------------------
            
            .state ('generic-classes', {
                url: '/generic-classes',
                templateUrl: 'views/generic-classes.html'
            })
        
            
            //------------------------------
            // PAGES
            //------------------------------
            
            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common.html'
            })
            
        
            //Profile
        
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views/avadress-contact.html'
            })
        
            /*.state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: 'views/avContact.html'
            })
*/
            /*.state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/avAddress.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
*/
            .state ('pages.profile.profile-photos', {
                url: '/profile-photos',
                templateUrl: 'views/profile-photos.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('pages.profile.profile-connections', {
                url: '/profile-connections',
                templateUrl: 'views/profile-connections.html'
            })


            //-------------------------------
        
            .state ('pages.listview', {
                url: '/listview',
                templateUrl: 'views/list-view.html'
            })
        
            .state ('pages.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html'
            })
        
            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: 'views/pricing-table.html'
            })
        
            .state ('pages.contacts', {
                url: '/contacts',
                templateUrl: 'views/contacts.html'
            })
        
            .state ('pages.invoice', {
                url: '/invoice',
                templateUrl: 'views/invoice.html'
            })
                                
            .state ('pages.wall', {
                url: '/wall',
                templateUrl: 'views/wall.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
            
            //------------------------------
            // BREADCRUMB DEMO
            //------------------------------
            .state ('breadcrumb-demo', {
                url: '/breadcrumb-demo',
                templateUrl: 'views/breadcrumb-demo.html'
            })
    });

avatar.controller('AddressCtrl', AddressCtrl);
AddressCtrl.$inject = ['$scope','addressService','addressServiceById'];
function AddressCtrl ($scope,addressService,addressServiceById) {
    var vm = this;
    vm.titleName="Address";
    vm.commonService = addressService;
    vm.commonServiceById = addressServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            address1: { type: 'string', title: 'Address1' },
            address2: { type: 'string', title: 'Address2' },
            city:{type:'string',title:'City'},
            usercity:{type:'string',title:'UserCity'},
            region: { type: 'string', title: 'Region' },
            country:{type:'string',title:'Country'}
        },
        "required":[
            "address1",
            "city",
            "region",
            "country"
        ]
    };
    vm.gridOptions =
    {
        columnDefs:[
            {name: 'id', width: 40},
            {name:'address1'},
            {name: 'address2'},
            {name: 'city',field:'city.cityname',avDependencyKeyId:'"id"'},
            {name:'usercity'},
            {name: 'region',field:'city.region'},
            {name: 'country',field:'country.short_name',avDependencyKeyId:'"id"'}
        ],
        excelfile:'Addresses.csv',
        PdfHeader: { text: "Address List", style: 'headerStyle' },
    };
    vm.form = [
        {
            key: 'address1',
            placeholder: 'Enter Address1'
        },
        {
            key: 'address2',
            placeholder: 'Enter Address2'
        },
        {
            "key": "id",
            "type": "select",
            "title": "City",
            "avDependency":"true",
            "avDependencyField": 'city.id',
            "avUri":apiURL + '/api/v1/dropdowns/cities',
            "titleMap":[]
        },
        {
            key: 'usercity',
            placeholder: 'Enter Usercity'
        },
        {
            key: 'region',
            placeholder: 'Enter Region'
        },
        {
            "key": "id",
            "type": "select",
            "title": "Country",
            "avDependency":"true",
            "avDependencyField": 'country.id',
            "avUri":apiURL + '/api/v1/dropdowns/countries',
            "titleMap":[]
        }
    ];

}


avatar.controller('addressDisplay',function($scope,$timeout){
    $scope.title = "Primary";

    $scope.init = function(bool) {
        $scope.basicGetAddress();
        if(bool == 'true')
      {
          $scope.editAddressInfo();
      }
        else{
      }
    $scope.boolValue = bool;
    }

  $scope.basicGetAddress = function () {
      $scope.addressTitle =true;
      $scope.addressInfoDisplay = true;

  }

    //1st edit section 1
    $scope.basicEdit=function(){
        $scope.basicdisplay=false;
        $scope.basicEditDisplay=true;
    };

    $scope.updateContact=function(){
        $scope.basicdisplay=true;
        $scope.basicEditDisplay=false;
    };
    //1st cancel section 1
    $scope.basicCancel=function(){
        $scope.basicdisplay=true;
        $scope.basicEditDisplay=false;
    };


    //2nd edit section 2
    $scope.editAddressInfo=function(){
        $scope.addressInfoDisplay=false;
        $scope.addressInfoEditDisplay=true;
    };

    //2nd cancel section 2
    $scope.addressInfoCancel=function(){
        $scope.addressInfoDisplay=true;
        $scope.addressInfoEditDisplay=false;
    };

    $scope.saveClose = function(){
        $scope.addressInfoDisplay=true;
        $scope.addressInfoEditDisplay=false;
    }
 //3rd
});



avatar.controller('companyDisplay',function($scope){
    $scope.init = function(){
        $scope.companyabout();
    }
    $scope.companycontact = function(){
        $scope.companyTitle = false;
        $scope.companyInfodisplay =false;
        $scope.companyInfoEditdisplay = false;
        $scope.addressInfoEditDisplay = false;
        $scope.addressTitle = false;
        $scope.miniContactTitle = true;
        $scope.miniContactInfoDisplay = true;
        $scope.socialCompanydisplay =false;
        $scope.socialCompanyTitle = false;
        $scope.companyotherInfodisplay=false;
        $scope.companyotherTitle=false;
    };
    $scope.companyabout = function(){
        $scope.title = "Primary";
        $scope.companyInfodisplay =true;
        $scope.companyInfoEditdisplay = false;
        $scope.addressTitle = true;
        $scope.addressInfoDisplay = true;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.companyTitle = true;
        $scope.socialCompanydisplay =false;
        $scope.socialCompanyTitle = false;
        $scope.companyotherInfodisplay=false;
        $scope.companyotherTitle=false;
    };
    $scope.companysocialinfo=function(){
        $scope.socialTitle = "Social";
        $scope.companyTitle = false;
        $scope.socialCompanydisplay =true;
        $scope.companyInfoEditdisplay = false;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.socialCompanyTitle = true;
        $scope.socialcompanyEditDisplay=false;
        $scope.companyotherInfodisplay=false;
        $scope.companyotherTitle=false;

    };
    $scope.companyother=function(){
        $scope.companyotherTitle="Other";
        $scope.companyotherInfodisplay=true;
        $scope.companyTitle = false;
        $scope.companyInfodisplay =false;
        $scope.companyInfoEditdisplay = false;
        $scope.addressInfoEditDisplay = false;
        $scope.addressTitle = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.socialCompanydisplay =false;
        $scope.socialCompanyTitle = false;
    };
    $scope.companyEdit = function () {
        $scope.companyInfodisplay = false;
        $scope.companyInfoEditdisplay = true;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.companyTitle = false;
        $scope.socialCompanyTitle=false;
    }

    $scope.editCompanyInfo=function(){
        $scope.companyInfodisplay=false;
        $scope.companyInfoEditdisplay=true;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.socialCompanydisplay =false;
        $scope.socialCompanyTitle = false;
        $scope.socialcompanyEditDisplay=false;
        $scope.socialCompanyTitle = false;
    };
    $scope.editCompanySocialInfo=function(){
        $scope.companyInfodisplay =false;
        $scope.companyInfoEditdisplay = false;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.companyTitle = false;
        $scope.socialCompanydisplay =false;
        $scope.socialCompanyTitle = true;
        $scope.socialcompanyEditDisplay=true;
        $scope.socialCompanyTitle = false;
    };
    $scope.companyInfoCancel=function(){
        /*alert("cancel");*/
        console.log($scope.boolValue);
        $scope.companyInfodisplay=true;
        $scope.companyInfoEditdisplay=false;
    };

    $scope.saveClose = function(){
        /* alert("save");*/
        $scope.companyInfodisplay=true;
        $scope.companyInfoEditdisplay=false;
    }

});

avatar.controller('ContactCtrl', ContactCtrl);
ContactCtrl.$inject = ['$scope','avContactService','avContactServiceById'];
function ContactCtrl($scope,avContactService,avContactServiceById) {
    var vm = this;
    vm.titleName = "Contacts";
    vm.commonService = avContactService;
    vm.commonServiceById = avContactServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            firstname: { type: 'string', title: 'FirstName' },
            lastname: { type: 'string', title: 'LastName' },
            middlename: { type: 'string', title: 'MiddleName' },
            email: { type: 'string', title: 'Email' },
            phone: { type: 'number', title: 'Phone' },
            common_contact: { type: 'string', title: 'CommonContact' },
            address: { type: 'string', title: 'Address' },
            secondaryemail: { type: 'string', title: 'SecondaryEmail' },
            secondaryphone: { type: 'number', title: 'SecondaryPhone' },
            workemail: { type: 'string', title: 'WorkEmail' },
            workphone: { type: 'number', title: 'WorkPhone' },
            designation: { type: 'string', title: 'Designation' },
            dob:{type:'string',title:'DOB'},
            secondarycontactid: { type: 'number', title: 'SecondaryContactID' },
            sourcecontactid: { type: 'number', title: 'SourceContactID' },
            entrydate:{type:'string',title:'EntryDate'},
            workaddress: { type: 'string', title: 'WorkAddress' },
            linkedin: { type: 'string', title: 'Linkedin' },
            skype: { type: 'string', title: 'Skype' },
            facebook: { type: 'string', title: 'Facebook' },
            twitter: { type: 'string', title: 'Twitter' }
        },
        "required":[
            "firstname",
            "email",
            "phone",
            "address",
            "workaddress"
        ]
    };
    vm.gridOptions =
    {
        columnDefs: [
            {name: 'id', width: 40},
            {name:'firstname'},
            {name: 'lastname'},
            {name: 'middlename'},
            {name: 'email',avType:'email'},
            {name: 'phone',avType:'phone'},
            {name: 'common_contact'},
            {name: 'address'},
            {name: 'secondaryemail',avType:'email'},
            {name: 'secondaryphone'},
            {name: 'workemail'},
            {name: 'workphone'},
            {name:'designation'},
            {name: 'dob'},
            {name: 'secondarycontactid'},
            {name: 'sourcecontactid'},
            {name: 'entrydate'},
            {name: 'workaddress'},
            {name: 'linkedin'},
            {name: 'skype'},
            {name: 'facebook'},
            {name: 'twitter'}
        ], enableGridMenu: false,
        /* exporterCsvFilename:'Subjects.csv',*/
        excelfile:'Subjects.csv',
        PdfHeader: { text: "Subjects List", style: 'headerStyle' },
    };
    vm.form = [
        {
            key: 'firstname',
            placeholder: 'Enter FirstName'
        },
        {
            key: 'lastname',
            placeholder: 'Enter LastName'
        },
        {
            key: 'middlename',
            placeholder: 'Enter MiddleName'
        },
        {
            key: 'email',
            placeholder: 'Enter Email'
        },
        {
            key: 'phone',
            placeholder: 'Enter Phone'
        },
        {
            key: 'common_contact',
            placeholder: 'Enter CommonContact'
        },
        {
            "key": "addressid",
            "type": "select",
            "title": "Address",
            "avUri":apiURL + '/api/v1/dropdowns/addresses',
            "titleMap":[]
        },
        {
            key: 'secondaryemail',
            placeholder: 'Enter SecondaryEmail'
        },
        {
            key: 'secondaryphone',
            placeholder: 'Enter SecondaryPhone'
        },
        {
            key: 'workemail',
            placeholder: 'Enter WorkEmail'
        },
        {
            key: 'workphone',
            placeholder: 'Enter WorkPhone'
        },
        {
            key: 'designation',
            placeholder: 'Enter Designation'
        },
        {
            key: 'dob',
            placeholder: 'Enter DOB'
        },
        {
            key: 'secondarycontactid',
            placeholder: 'Enter SecondaryContactId'
        },
        {
            key: 'sourcecontactid',
            placeholder: 'Enter SourceContactId'
        },
        {
            key: 'entrydate',
            placeholder: 'Enter EntryDate'
        },
        {
            "key": "workaddressid",
            "type": "select",
            "avUri":apiURL + '/api/v1/dropdowns/addresses',
            "titleMap":[]
        },
        {
            key: 'linkedin',
            placeholder: 'Enter linkedin'
        },
        {
            key: 'skype',
            placeholder: 'Enter Skype'
        },
        {
            key: 'facebook',
            placeholder: 'Enter Facebook'
        },
        {
            key: 'twitter',
            placeholder: 'Enter Twitter'
        }
    ];
}


avatar.controller('contactDisplay',function($scope){
$scope.init = function(){
    $scope.basicGet();
}
    $scope.basicGet=function(){
        $scope.title = "Primary";
        $scope.primaryInfoEditDisplay = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.workContactTitle =false;
        $scope.workContactInfoDisplay = false;
        $scope.primaryTitle = true;
        $scope.primaryInfoDisplay = true;
        $scope.addressTitle = true;
        $scope.addressInfoDisplay = true;

    };

    $scope.primaryContactEdit = function () {

        $scope.primaryInfoDisplay = false;
        $scope.secondaryInfoDisplay = false;
        $scope.primaryInfoEditDisplay = true;
    }

    $scope.secondaryContactInfo = function(){
        $scope.primaryTitle = false;
        $scope.primaryInfoDisplay = false;
        $scope.primaryInfoEditDisplay = false;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.addressInfoEditDisplay = false;
        $scope.workContactTitle =false;
        $scope.workContactInfoDisplay = false;
        $scope.miniContactTitle = true;
        $scope.miniContactInfoDisplay = true;

    }
    $scope.workContactInfo = function(){
       $scope.workTitle = "Work";
        $scope.primaryTitle = false;
        $scope.primaryInfoDisplay = false;
        $scope.addressTitle = false;
        $scope.addressInfoDisplay = false;
        $scope.addressInfoEditDisplay = false;
        $scope.miniContactTitle = false;
        $scope.miniContactInfoDisplay = false;
        $scope.workContactEditDisplay = false;
        $scope.workContactTitle =true;
        $scope.workContactInfoDisplay = true;

    }
    $scope.workContactEdit = function(){
        $scope.workContactTitle =false;
        $scope.workContactInfoDisplay = false;
        $scope.workContactEditDisplay = true;
    }
});

/*
    avatar
        .constant('EmployeeSchema', {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            contactname: { type: 'string', title: 'ContactId',required:true},
            hiredate: {type: 'string', format:'date', title: 'HireDate',required:true },
            startdate: {type: 'string', format:'date', title: 'StartDate',required:true },
            loginid: {type: 'number', title: 'LoginId',required:true }
        },
            "required": [
                "hiredate",
                "startdate",
                "loginid"
            ]
    })
    .controller('EmployeeController', EmployeeController)
    .controller('EmployeeRowEditCtrl', EmployeeRowEditCtrl)
    .controller('EmployeeRowDeleteCtrl', EmployeeRowDeleteCtrl)
    .service('EmployeeRowEditor', EmployeeRowEditor)
    .service('EmployeeRowRemover', EmployeeRowRemover);
var entity=null;
EmployeeController.$inject = ['$scope','$http', '$modal','$filter','EmployeeRowEditor', 'EmployeeRowRemover', 'EmployeeSchema','uiGridExporterConstants'];
function EmployeeController ($scope, $http, $modal,$filter,EmployeeRowEditor, EmployeeRowRemover,EmployeeSchema,uiGridExporterConstants) {
    var vm = this;
    vm.schema = EmployeeSchema;
    vm.searchData=[];
    vm.model={};
    vm.editRow = EmployeeRowEditor.editRow;
    vm.deleteRow = EmployeeRowRemover.deleteRow;
    vm.gridOptions = {
        enableFiltering: false,
        paginationPageSizes: [100, 500, 1000, 2000, 5000],
        paginationPageSize: 100,
        multiRowSelection: false,
        enableRowSelection: true,
        columnDefs: [
            {field: 'dd', name: '',enableSorting:false,cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid, row)"><i class="glyphicon glyphicon-trash"></i></i></button></div>',width: 68},
            {name: 'id', width: 40},
            {name: 'contactname'},
            {name: 'hiredate'},
            {name: 'startdate'},
            {name: 'loginid'}
        ],
        //enableGridMenu: true,
        enableGridMenu: false,
        exporterCsvFilename: 'employee.csv',
        exporterPdfDefaultStyle: {fontSize: 9},
        exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        exporterPdfHeader: { text: "Employees List", style: 'headerStyle' },
        exporterPdfFooter: function ( currentPage, pageCount ) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function ( docDefinition ) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        //exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,

        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
        }

    };
    var gridColName = vm.gridOptions.columnDefs;
    vm.searchGrid = function(searchTerm){
        vm.gridOptions.data = $filter('filter')( vm.searchData, searchTerm  , undefined );
    };

    //get

    $http.get(apiURL+'/api/v1/common/employees')
        .success(function (data) {
            if(data[0].status=="404" || data[0].status=="500"){
                vm.detailedErrorMessage = data[0].message;
            }else{
                vm.gridOptions.data = data;
                vm.searchData = data;}
        });
    $scope.refresh = function(){
        $http.get(apiURL+'/api/v1/common/employees')
            .success(function (data) {
                if(data[0].status=="404" || data[0].status=="500"){
                    vm.detailedErrorMessage = data[0].message;
                }else {
                    vm.gridOptions.data = data;
                    vm.searchData = data;
                    vm.successDeleteMessage = true;
                    vm.successUpdateMessage = true;
                    vm.successAddMessage = true;
                    vm.detailedErrorMessage = "";
                }
            });
    };
    $http.get(apiURL+'/api/v1/common/contacts')
        .success(function (data) {
            var count=0;
            data.forEach(function(row){
                if(count===0)
                {
                    entity='{"'+row.id+'":"'+row.firstname+'"';
                    count++;
                }
                else{
                    entity=entity.concat(',"'+row.id+'":"'+row.firstname+'"');
                }

            });
            entity=entity.concat('}');
        });

    if(vm.entity){
        console.log(vm.entity);
        var value=JSON.parse(entity);
        for(var a in value){
            if(value[a]==vm.entity.contactname){
                vm.entity.contactid=a;
            }
        }}
    vm.form = [
        {
            "key": "contactid",
            "type": "select",
            "title": "Contactname",
            "titleMap":JSON.parse(entity)
        },
        {
            key: 'hiredate',
            "format": "yyyy-mm-dd",
            placeholder: 'Enter Hire Date'
        },
        {
            key: 'startdate',
            placeholder: 'Enter Start Date'
        },
        {
            key: 'loginid',
            placeholder: 'Enter Login Id'
        },
        {
            "type": "submit",
            "title": "Save"
        }
    ];

//excel download

$scope.excelDownload = function(){
    $scope.gridApi.exporter.csvExport(uiGridExporterConstants.VISIBLE,uiGridExporterConstants.ALL);
};

//pdf download
$scope.pdfDownload = function(){
    $scope.gridApi.exporter.pdfExport(uiGridExporterConstants.VISIBLE,uiGridExporterConstants.ALL);
};

    vm.successDeleteMessage=true;
    vm.successAddMessage=true;
    vm.successUpdateMessage=true;
    //add

    $scope.addRow = function () {
        var service={id:0};
        var rowTemp={};
        rowTemp.entity=service;
       vm.editRow($scope.vm, rowTemp);

    };
}

//edit

EmployeeRowEditor.$inject = ['$rootScope', '$modal','$http'];
    function EmployeeRowEditor($rootScope, $modal,$http) {
    var service = {};
    service.editRow = editRow;
    function editRow(grid, row) {
        $modal.open({
            templateUrl: 'common/employee/employeeEdit.html',
            controller: ['$modalInstance', 'EmployeeSchema','$scope','grid', 'row','$http','$q','$timeout', EmployeeRowEditCtrl],
            controllerAs: 'vm',
            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }

            }
        });

    }
    return service;
}

function EmployeeRowEditCtrl($modalInstance, EmployeeSchema,$scope, grid, row,$http,$q,$timeout) {
    var vm = this;
    vm.schema = EmployeeSchema;
    vm.entity = angular.copy(row.entity);
    var value=JSON.parse(entity);
    for(var a in value){
        if(value[a]==vm.entity.contactname){
            vm.entity.contactid=a;
        }
    }
    vm.form = [
        {
            "key": "contactid",
            "type": "select",
            "title": "ContatName",
            "titleMap":JSON.parse(entity)
        },
        {
            key: 'hiredate',
            placeholder: 'Enter hiredate'
        },
        {
            key: 'startdate',
            placeholder: 'Enter startdate'
        },
        {
            key: 'loginid',
            placeholder: 'Enter loginid'
        }

    ];
   /!* vm.save = save;*!/
    $scope.submitForm = function(form) {
        grid.detailedErrorMessage="";
            // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            if (row.entity.id == 0) {
                $scope.nameRequired="";
                $http.post(apiURL+'/api/v1/common/employees', vm.entity)
                    .success(function (data) {
                        var value=JSON.parse(entity);
                        for(var a in value){
                            if(a==vm.entity.contactid){
                                vm.entity.contactname=value[a];
                            }
                        }
                        row.entity = angular.extend(row.entity, vm.entity);
                        row.entity.id = data.insertId;
                        grid.gridOptions.data.push(row.entity);
                        grid.searchData.push(row.entity);
                        $modalInstance.close(row.entity);
                        grid.successAddMessage = false;
                        grid.successDeleteMessage = true;
                        grid.successUpdateMessage = true;
                        grid.detailedErrorMessage = "";
                    }).error(function(data,status) {
                        if (data.status === 500) {
                            $scope.employeeAddErrorMessage = "You Cannot Insert This Record";
                            grid.detailedErrorMessage = data.detailed_message;
                            grid.successDeleteMessage = true;
                            grid.successUpdateMessage = true;
                            grid.successAddMessage = true;
                        }
                    });
            }

            else {
                $http.put(apiURL+'/api/v1/common/employees', vm.entity)
                    .success(function (data) {
                        var value=JSON.parse(entity);
                        for(var a in value){
                            if(a==vm.entity.contactid){
                                vm.entity.contactname=value[a];
                            }
                        }
                        row.entity = angular.extend(row.entity, vm.entity);
                        var index=grid.appScope.vm.gridOptions.data.indexOf(row.entity);
                        row.grid.appScope.vm.searchData[index]=vm.entity;
                        $modalInstance.close(row.entity);
                        grid.appScope.vm.successUpdateMessage = false;
                        grid.appScope.vm.successAddMessage = true;
                        grid.appScope.vm.successDeleteMessage = true;
                        grid.appScope.vm.detailedErrorMessage = "";
                    }).error(function(data,status){
                        if(data.status===500){
                            console.log(grid);
                            $scope.employeeAddErrorMessage="You Cannot Update this Record";
                            grid.appScope.vm.detailedErrorMessage=data.detailed_message;
                            grid.appScope.vm.successUpdateMessage = false;
                            grid.appScope.vm.successDeleteMessage=true;
                            grid.appScope.vm.successAddMessage = true;

                        }
                    });
            }
        }

    }
}

//delete

EmployeeRowRemover.$inject = ['$rootScope', '$modal','$http'];
function EmployeeRowRemover($rootScope, $modal,$http) {
    var service = {};
    service.deleteRow = deleteRow;

    function deleteRow(grid, row) {
        $modal.open({
            templateUrl: 'common/employee/employeeDelete.html',
            controller: ['$scope','$modalInstance', 'EmployeeSchema', 'grid', 'row', '$http', EmployeeRowDeleteCtrl],
            controllerAs: 'vm',
            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }
            }
        });
    }
    return service;
}

function EmployeeRowDeleteCtrl($scope,$modalInstance, EmployeeSchema, grid, row, $http) {
    var vm = this;
    vm.schema = EmployeeSchema;
    vm.entity = angular.copy(row.entity);
    vm.successDeleteMessage=true;
    vm.form = [
        'name',
        'description'
    ];
    vm.remove = remove;
    function remove() {
        row.entity = angular.extend(row.entity, vm.entity);
        var index=grid.appScope.vm.gridOptions.data.indexOf(row.entity);
        $http.delete(apiURL+'/api/v1/common/employees/'+vm.entity.id)
            .success(function(data){
                grid.appScope.vm.gridOptions.data.splice(index, 1);
                grid.appScope.vm.successDeleteMessage=false;
                grid.appScope.vm.successUpdateMessage = true;
                grid.appScope.vm.successAddMessage = true;
                grid.appScope.vm.detailedErrorMessage = "";
                $modalInstance.close(row.entity);
            }).error(function(data,status){
               if(data.status===500){
                   $scope.employeeErrorMessage="You Cannot Delete this Record";
                   grid.appScope.vm.detailedErrorMessage=data.detailed_message;
                   grid.appScope.vm.successDeleteMessage=true;
                   grid.appScope.vm.successUpdateMessage = true;
                   grid.appScope.vm.successAddMessage = true;
               }
                else if(data.status===404){
                   $scope.employeeErrorMessage="You Cannot Delete this Record";
                   grid.appScope.vm.successDeleteMessage=true;
                   grid.appScope.vm.successUpdateMessage = true;
                   grid.appScope.vm.successAddMessage = true;
                   grid.appScope.vm.detailedErrorMessage = "";
               }
                else{
                   $scope.employeeErrorMessage="Something went wrong..";
                   grid.appScope.vm.successDeleteMessage=true;
                   grid.appScope.vm.successUpdateMessage = true;
                   grid.appScope.vm.successAddMessage = true;
                   grid.appScope.vm.detailedErrorMessage = "";
               }

            });


    }
}


//add

*/
avatar.controller('EmployeeCtrl', EmployeeCtrl);
EmployeeCtrl.$inject = ['$scope','employeeService','employeeServiceById'];
function EmployeeCtrl($scope,employeeService,employeeServiceById) {
    var vm = this;
    vm.titleName = "Employees";
   /* vm.url = apiURL + '/api/v1/common/employees';*/
    vm.commonService = employeeService;
    vm.commonServiceById = employeeServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            contactname: { type: 'select', title: 'Contact',required:true},
            hiredate: {type: 'string', format:'date', title: 'HireDate',required:true },
            startdate: {type: 'string', format:'date', title: 'StartDate',required:true },
            loginid: {type: 'number', title: 'LoginId',required:true }
        },
        "required": [
            "hiredate",
            "startdate",
            "loginid"
        ]
    };
   /* vm.model = {};*/
    vm.gridOptions =
    {
        columnDefs: [
            {name: 'id', avLink:"employeeDetails({id:{{ COL_FIELD }}})", width: 40/*cellTemplate: '<div class="ui-grid-cell-contents"><a data-ui-sref="employeeDetails({id:{{ COL_FIELD }}})">{{ COL_FIELD }}</a></div>'*/},
            {name: 'contactname',avDependencyKeyId:'"contactid"',avDependencyKeyName:'contactid'},
            {name: 'hiredate',avType:'date'},
            {name: 'startdate',avType:'date'},
            {name: 'loginid'}
        ],
        enableGridMenu: false,
        excelfile:'Employees.csv',
        PdfHeader: { text: "Employees List", style: 'headerStyle' },
    };
    vm.form = [
        {
            "key": "contactid",
            "type": "select",
            "title": "Contactname",
            "avUri":apiURL + '/api/v1/dropdowns/contacts',
            "titleMap":[]
        },
        {
            key: 'hiredate',
            placeholder: 'Enter Hire Date'
        },
        {
            key: 'startdate',
            placeholder: 'Enter Start Date'
        },
        {
            key: 'loginid',
            placeholder: 'Enter Login Id'
        }
    ];
    /*$scope.editRow = commonEditService.editRow;
    $scope.deleteRow = commonDeleteService.deleteRow;*/

}

avatar.controller('miniContactDisplay',function($scope,$location){
    $scope.editMiniContactInfo = function(){

        $scope.miniContactInfoDisplay = false;
        $scope.miniContactEditDisplay = true;
    }

  /*  $scope.updateMiniInfo = function(){
        $scope.miniContactInfoDisplay = true;
        $scope.miniContactEditDisplay = false;
    }

    $scope.basicMiniGet = function(){
        $scope.miniContactInfoDisplay = true;
        $scope.miniContactEditDisplay = false;
    }*/



});

/**
 * Created by Sampath on 3/31/2016.
 */
avatar.controller('fbcontroller', ['$scope', '$location', '$auth', '$state', '$cookieStore', function ($scope, $location, $auth, $state, $cookieStore) {
    $scope.authenticate = function (provider) {
        $auth.authenticate(provider)
            .then(function (response) {
                if (response.data[0].status == 400 || response.data[0].status == 403 || response.data[0].status == 404 || response.data[0].status == 500) {
                    $scope.errormessage = "You Don't Have Access To This Site";
                }
                else {
                    var userdata = {
                        email: response.data[0].row.email,
                        name: response.data[0].row.firstname
                    };
                    $cookieStore.put("avatarSession", response);
                    $scope.CompanyName = response.data[0].row[0].alias;
                    $scope.email = response.data[0].row[0].email;
                    var url = '/#/home';
                    $location.url(url);
                }
            })
            .catch(function (error) {
                if (error.error) {
                    console.log(error.error);
                } else if (error.data) {
                    console.log(error.status);
                } else {
                    console.log(error);
                }
            });
    }

}])

    .controller('popupcontroller',['$rootScope','$scope','$http','$cookieStore', '$modal','ngQuillConfig',function($rootScope,$scope,$http,$cookieStore,$modal,ngQuillConfig) {

       /* if ($cookieStore.get("avatarSession")) {
            var sessionData = $cookieStore.get("avatarSession");
            console.log(sessionData.data[0].profile.email);
            $rootScope.composeEmailfrom = sessionData.data[0].profile.email;
        };*/

       /* $rootScope.showComposePopup = function (size) {
            alert("sasasa");
            $modal.open({
                templateUrl: 'views/popup.html',
                    size:size,
                controller:function($scope){
                    $scope.showToolbar = false;

                    $scope.translations = angular.extend({}, ngQuillConfig.translations, {
                        10: 'smallest'
                    });
                    $scope.editorCallback = function (editor, name) {
                        console.log('createCallback', editor, name);
                    };
                    // Event after an editor is created --> gets the editor instance on optional the editor name if set
                    $scope.$on('editorCreated', function (event, editor, name) {
                        console.log('createEvent', editor, name);
                        editor.innerHtml="Hi Hello";
                    });
                }
            });

        }*/
              /* $rootScope.sendEmail = function () {
                var jsondata = {
                    from: $rootScope.composeEmailfrom,
                    to: $scope.composeEmailto,
                    subject: $scope.composeEmailsubject,
                    content: $scope.composeEmailbody,
                    source: "",
                    contenttype: "text/plain"
                }
                $http.post("apiURL+'/api/v1/common/status", jsondata)
                    .success(function (data) {
                        //console.log(data);
                    });
        }*/

    }]);

avatar.controller('EducationCtrl', EducationCtrl);
EducationCtrl.$inject = ['$scope','avEducationService','avEducationServiceById'];
function EducationCtrl($scope,avEducationService,avEducationServiceById) {
    var vm = this;
    vm.titleName = "Contacts";
    vm.commonService = avEducationService;
    vm.commonServiceById = avEducationServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID'},
            name: { type: 'string', title: 'Name' },
            description: {type: 'string', title: 'Description' }
        },
    };
    vm.gridOptions =
    {
        columnDefs: [
            {name: 'id', width: 40},
            {name: 'name'},
            {name: 'description'}
        ], enableGridMenu: false,
        excelfile:'EducationLevels.csv',
        PdfHeader: { text: "EducationLevels List", style: 'headerStyle' },
    };
    vm.form = [
        {
            key: 'name',
            placeholder: 'Enter Education Level Name'
        },
        {
            key: 'description',
            placeholder: 'Enter Description'
        }
    ];

}



avatar

    .controller('logoutController',function($scope,$cookieStore,$location){
        $scope.logout=function(){
            $cookieStore.remove('avatarSession');
            $location.url("/login");
        }
    })
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', function($timeout, $state, growlService,$cookieStore,$location,avCountryService,$localStorage){
        if(!$cookieStore.get('avatarSession')){
            $location.url("/login");
        }
        avCountryService.show().$promise.then(function (data) {
            /*cache.put("countryData",data);*/
            $localStorage.countryData  = data;
        }, function(error) {
            console.log(error);
        })
        //Welcome Message
       /* if(!$cookieStore.get('avatarSession')){
            $location.url("/#/login");}*/
       // growlService.growl('Welcome back Mallinda!', 'inverse')
       /* avAddressDropService.show().$promise.then(function (data) {
           /!* $scope.dropDownCities=data;*!/
            console.log(data);

        });*/
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           /*angular.element('html').addClass('ismobile');*/
            angular.element('html');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
        
        //Listview Search (Check listview pages)
        this.listviewSearchStat = false;
        
        this.lvSearch = function() {
            this.listviewSearchStat = true; 
        }
        
        //Listview menu toggle in small screens
        this.lvMenuStat = false;
        
        //Blog
        this.wallCommenting = [];
        
        this.wallImage = false;
        this.wallVideo = false;
        this.wallLink = false;
    })


    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($scope,$timeout, messageService,$cookieStore,$location){
        if(!$cookieStore.get('avatarSession')){
            $location.url("/login");
        }
         // Top Search
        this.openSearch = function(){
           angular.element('#header').addClass('search-toggled');
            //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
        }
        this.autoComplete = function(){
            console.log($scope.searchData);
        }
        this.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }
        
        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }
        
        // Clear Local Storage
        this.clearLocalStorage = function() {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#F44336",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        this.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }
    
    })



    // =========================================================================
    // Best Selling Widget
    // =========================================================================

    .controller('bestsellingCtrl', function(bestsellingService){
        // Get Best Selling widget Data
        this.img = bestsellingService.img;
        this.name = bestsellingService.name;
        this.range = bestsellingService.range; 
        
        this.bsResult = bestsellingService.getBestselling(this.img, this.name, this.range);
    })

 
    // =========================================================================
    // Todo List Widget
    // =========================================================================

    .controller('todoCtrl', function(todoService){
        
        //Get Todo List Widget Data
        this.todo = todoService.todo;
        
        this.tdResult = todoService.getTodo(this.todo);
        
        //Add new Item (closed by default)
        this.addTodoStat = false;
    })


    // =========================================================================
    // Recent Items Widget
    // =========================================================================

    .controller('recentitemCtrl', function(recentitemService){
        
        //Get Recent Items Widget Data
        this.id = recentitemService.id;
        this.name = recentitemService.name;
        this.parseInt = recentitemService.price;
        
        this.riResult = recentitemService.getRecentitem(this.id, this.name, this.price);
    })


    // =========================================================================
    // Recent Posts Widget
    // =========================================================================
    
    .controller('recentpostCtrl', function(recentpostService){
        
        //Get Recent Posts Widget Items
        this.img = recentpostService.img;
        this.user = recentpostService.user;
        this.text = recentpostService.text;
        
        this.rpResult = recentpostService.getRecentpost(this.img, this.user, this.text);
    })


    //=================================================
    // Profile
    //=================================================

    .controller('profileCtrl', function(growlService){
        
        //Get Profile Information from profileService Service
        
        //User
        this.profileSummary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";
    
        this.fullName = "Mallinda Hollaway";
        this.gender = "female";
        this.birthDay = "23/06/1988";
        this.martialStatus = "Single";
        this.mobileNumber = "00971123456789";
        this.emailAddress = "malinda.h@gmail.com";
        this.twitter = "@malinda";
        this.twitterUrl = "twitter.com/malinda";
        this.skype = "malinda.hollaway";
        this.addressSuite = "10098 ABC Towers";
        this.addressCity = "Dubai Silicon Oasis, Dubai";
        this.addressCountry = "United Arab Emirates";
    
    
        //Edit
        this.editSummary = 0;
        this.editInfo = 0;
        this.editContact = 0;
    
        
        this.submit = function(item, message) {            
            if(item === 'profileSummary') {
                this.editSummary = 0;
            }
            
            if(item === 'profileInfo') {
                this.editInfo = 0;
            }
            
            if(item === 'profileContact') {
                this.editContact = 0;
            }
            
            growlService.growl(message+' has updated Successfully!', 'inverse'); 
        }

    })



    //=================================================
    // LOGIN
    //=================================================

    .controller('loginCtrl', function(){
        
        //Status
    
        this.login = 1;
        this.register = 0;
        this.forgot = 0;
    })


    //=================================================
    // CALENDAR
    //=================================================
    
    .controller('calendarCtrl', function($modal){
    
        //Create and add Action button with dropdown in Calendar header. 
        this.month = 'month';
    
        this.actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                            '<li class="dropdown" dropdown>' +
                                '<a href="" dropdown-toggle><i class="zmdi zmdi-more-vert"></i></a>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li class="active">' +
                                        '<a data-calendar-view="month" href="">Month View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicWeek" href="">Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaWeek" href="">Agenda Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicDay" href="">Day View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaDay" href="">Agenda Day View</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>';

            
        //Open new event modal on selecting a day
        this.onSelect = function(argStart, argEnd) {            
            var modalInstance  = $modal.open({
                templateUrl: 'addEvent.html',
                controller: 'addeventCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendarData: function() {
                        var x = [argStart, argEnd];
                        return x;
                    }
                }
            });
        }
    })

    //Add event Controller (Modal Instance)
    .controller('addeventCtrl', function($scope, $modalInstance, calendarData){
        
        //Calendar Event Data
        $scope.calendarData = {
            eventStartDate: calendarData[0],
            eventEndDate:  calendarData[1]
        };
    
        //Tags
        $scope.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ]
        
        //Select Tag
        $scope.currentTag = '';
        
        $scope.onTagClick = function(tag, $index) {
            $scope.activeState = $index;
            $scope.activeTagColor = tag;
        } 
        
        //Add new event
        $scope.addEvent = function() {
            if ($scope.calendarData.eventName) {

                //Render Event
                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: $scope.activeTagColor

                },true ); //Stick the event

                $scope.activeState = -1;
                $scope.calendarData.eventName = '';     
                $modalInstance.close();
            }
        }
        
        //Dismiss 
        $scope.eventDismiss = function() {
            $modalInstance.dismiss();
        }
    })

    // =========================================================================
    // COMMON FORMS
    // =========================================================================

    .controller('formCtrl', function(){
    
        //Input Slider
        this.nouisliderValue = 4;
        this.nouisliderFrom = 25;
        this.nouisliderTo = 80;
        this.nouisliderRed = 35;
        this.nouisliderBlue = 90;
        this.nouisliderCyan = 20;
        this.nouisliderAmber = 60;
        this.nouisliderGreen = 75;
    
        //Color Picker
        this.color = '#03A9F4';
        this.color2 = '#8BC34A';
        this.color3 = '#F44336';
        this.color4 = '#FFC107';
    })


    // =========================================================================
    // PHOTO GALLERY
    // =========================================================================

    .controller('photoCtrl', function(){
        
        //Default grid size (2)
        this.photoColumn = 'col-md-2';
        this.photoColumnSize = 2;
    
        this.photoOptions = [
            { value: 2, column: 6 },
            { value: 3, column: 4 },
            { value: 4, column: 3 },
            { value: 1, column: 12 },
        ]
    
        //Change grid
        this.photoGrid = function(size) {
            this.photoColumn = 'col-md-'+size;
            this.photoColumnSize = size;
        }
    
    })


    // =========================================================================
    // ANIMATIONS DEMO
    // =========================================================================
    .controller('animCtrl', function($timeout){
        
        //Animation List
        this.attentionSeekers = [
            { animation: 'bounce', target: 'attentionSeeker' },
            { animation: 'flash', target: 'attentionSeeker' },
            { animation: 'pulse', target: 'attentionSeeker' },
            { animation: 'rubberBand', target: 'attentionSeeker' },
            { animation: 'shake', target: 'attentionSeeker' },
            { animation: 'swing', target: 'attentionSeeker' },
            { animation: 'tada', target: 'attentionSeeker' },
            { animation: 'wobble', target: 'attentionSeeker' }
        ]
        this.flippers = [
            { animation: 'flip', target: 'flippers' },
            { animation: 'flipInX', target: 'flippers' },
            { animation: 'flipInY', target: 'flippers' },
            { animation: 'flipOutX', target: 'flippers' },
            { animation: 'flipOutY', target: 'flippers'  }
        ]
         this.lightSpeed = [
            { animation: 'lightSpeedIn', target: 'lightSpeed' },
            { animation: 'lightSpeedOut', target: 'lightSpeed' }
        ]
        this.special = [
            { animation: 'hinge', target: 'special' },
            { animation: 'rollIn', target: 'special' },
            { animation: 'rollOut', target: 'special' }
        ]
        this.bouncingEntrance = [
            { animation: 'bounceIn', target: 'bouncingEntrance' },
            { animation: 'bounceInDown', target: 'bouncingEntrance' },
            { animation: 'bounceInLeft', target: 'bouncingEntrance' },
            { animation: 'bounceInRight', target: 'bouncingEntrance' },
            { animation: 'bounceInUp', target: 'bouncingEntrance'  }
        ]
        this.bouncingExits = [
            { animation: 'bounceOut', target: 'bouncingExits' },
            { animation: 'bounceOutDown', target: 'bouncingExits' },
            { animation: 'bounceOutLeft', target: 'bouncingExits' },
            { animation: 'bounceOutRight', target: 'bouncingExits' },
            { animation: 'bounceOutUp', target: 'bouncingExits'  }
        ]
        this.rotatingEntrances = [
            { animation: 'rotateIn', target: 'rotatingEntrances' },
            { animation: 'rotateInDownLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInDownRight', target: 'rotatingEntrances' },
            { animation: 'rotateInUpLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInUpRight', target: 'rotatingEntrances'  }
        ]
        this.rotatingExits = [
            { animation: 'rotateOut', target: 'rotatingExits' },
            { animation: 'rotateOutDownLeft', target: 'rotatingExits' },
            { animation: 'rotateOutDownRight', target: 'rotatingExits' },
            { animation: 'rotateOutUpLeft', target: 'rotatingExits' },
            { animation: 'rotateOutUpRight', target: 'rotatingExits'  }
        ]
        this.fadeingEntrances = [
            { animation: 'fadeIn', target: 'fadeingEntrances' },
            { animation: 'fadeInDown', target: 'fadeingEntrances' },
            { animation: 'fadeInDownBig', target: 'fadeingEntrances' },
            { animation: 'fadeInLeft', target: 'fadeingEntrances' },
            { animation: 'fadeInLeftBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInRight', target: 'fadeingEntrances'  },
            { animation: 'fadeInRightBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInUp', target: 'fadeingEntrances'  },
            { animation: 'fadeInBig', target: 'fadeingEntrances'  }
        ]
        this.fadeingExits = [
            { animation: 'fadeOut', target: 'fadeingExits' },
            { animation: 'fadeOutDown', target: 'fadeingExits' },
            { animation: 'fadeOutDownBig', target: 'fadeingExits' },
            { animation: 'fadeOutLeft', target: 'fadeingExits' },
            { animation: 'fadeOutLeftBig', target: 'fadeingExits'  },
            { animation: 'fadeOutRight', target: 'fadeingExits'  },
            { animation: 'fadeOutRightBig', target: 'fadeingExits'  },
            { animation: 'fadeOutUp', target: 'fadeingExits'  },
            { animation: 'fadeOutUpBig', target: 'fadeingExits'  }
        ]
        this.zoomEntrances = [
            { animation: 'zoomIn', target: 'zoomEntrances' },
            { animation: 'zoomInDown', target: 'zoomEntrances' },
            { animation: 'zoomInLeft', target: 'zoomEntrances' },
            { animation: 'zoomInRight', target: 'zoomEntrances' },
            { animation: 'zoomInUp', target: 'zoomEntrances'  }
        ]
        this.zoomExits = [
            { animation: 'zoomOut', target: 'zoomExits' },
            { animation: 'zoomOutDown', target: 'zoomExits' },
            { animation: 'zoomOutLeft', target: 'zoomExits' },
            { animation: 'zoomOutRight', target: 'zoomExits' },
            { animation: 'zoomOutUp', target: 'zoomExits'  }
        ]

        //Animate    
        this.ca = '';
    
        this.setAnimation = function(animation, target) {
            if (animation === "hinge") {
                animationDuration = 2100;
            }
            else {
                animationDuration = 1200;
            }
            
            angular.element('#'+target).addClass(animation);
            
            $timeout(function(){
                angular.element('#'+target).removeClass(animation);
            }, animationDuration);
        }
    
    })
    .directive('aboutUsDirective',function(){
        return{
            restrict:"E",
            templateUrl:  "views/avContact.html"
        }
    })
 /* .directive('seconInfoDirective',function(){
    return{
        restrict:"E",
        templateUrl:  "views/avAddress.html"
    }

})*/
    .directive('socialInfoDirective',function(){
        return{
            restrict:"E",
            templateUrl:  "views/profile-photos.html"
        }
        })
(function () {
    'use strict';
    var app;
    // declare ngQuill module
    app = angular.module('ngQuill', []);
    app.provider('ngQuillConfig', function () {
        var config = {
            // default fontFamilies
            fontSizes: [{
                size: '10px',
                alias: 'small'
            }, {
                size: '13px',
                alias: 'normal'
            }, {
                size: '18px',
                alias: 'large'
            }, {
                size: '32px',
                alias: 'huge'
            }],
            // default fontFamilies
            fontFamilies: [{
                label: 'Sans Serif',
                alias: 'sans-serif'
            }, {
                label: 'Serif',
                alias: 'serif'
            }, {
                label: 'Monospace',
                alias: 'monospace'
            }],
            // formats list
            formats: [
                'link',
                'image',
                'bold',
                'italic',
                'underline',
                'strike',
                'color',
                'background',
                'align',
                'font',
                'size',
                'bullet',
                'list'
            ],
            // default translations
            translations: {
                font: 'Font',
                size: 'Size',
                small: 'Small',
                normal: 'Normal',
                large: 'Large',
                huge: 'Huge',
                bold: 'Bold',
                italic: 'Italic',
                underline: 'Underline',
                strike: 'Strikethrough',
                textColor: 'Text Color',
                backgroundColor: 'Background Color',
                list: 'List',
                bullet: 'Bullet',
                textAlign: 'Text Align',
                left: 'Left',
                center: 'Center',
                right: 'Right',
                justify: 'Justify',
                link: 'Link',
                image: 'Image',
                visitURL: 'Visit URL',
                change: 'Change',
                done: 'Done',
                cancel: 'Cancel',
                remove: 'Remove',
                insert: 'Insert',
                preview: 'Preview'
            }
        };

        this.set = function (fontSizes, fontFamilies) {
            if (fontSizes) {
                config.fontSizes = fontSizes;
            }
            if (fontFamilies) {
                config.fontFamilies = fontFamilies;
            }
        };

        this.$get = function () {
            return config;
        };
    });

    app.service('ngQuillService', ['ngQuillConfig', function (ngQuillConfig) {
        // validate formats
        this.validateFormats = function (checkFormats) {
            var correctFormats = [],
                i = 0;

            for (i; i < checkFormats.length; i = i + 1) {
                if (ngQuillConfig.formats.indexOf(checkFormats[i]) !== -1) {
                    correctFormats.push(checkFormats[i]);
                }
            }

            return correctFormats;
        };
    }]);

    app.directive('ngQuillEditor', [
        '$timeout',
        'ngQuillService',
        'ngQuillConfig',
        function ($timeout, ngQuillService, ngQuillConfig) {
            return {
                scope: {
                    'toolbarEntries': '@?',
                    'toolbar': '@?',
                    'showToolbar': '=?',
                    'fontfamilyOptions': '=?',
                    'fontsizeOptions': '=?',
                    'linkTooltip': '@?',
                    'imageTooltip': '@?',
                    'theme': '@?',
                    'save': '@?',
                    'translations': '=?',
                    'required': '@?editorRequired',
                    'readOnly': '&?',
                    'errorClass': '@?',
                    'ngModel': '=',
                    'callback': '&?',
                    'name': '@?',
                    'editorStyles': '=?'
                },
                require: 'ngModel',
                restrict: 'E',
                templateUrl: 'ngQuill/template.html',
                link: function ($scope, element, attr, ngModel) {
                    var config = {
                            theme: $scope.theme || 'snow',
                            save: $scope.save || 'html',
                            readOnly: $scope.readOnly || false,
                            formats: $scope.toolbarEntries ? ngQuillService.validateFormats($scope.toolbarEntries.split(' ')) : ngQuillConfig.formats,
                            modules: {},
                            styles: $scope.editorStyles || false
                        },
                        changed = false,
                        editor,
                        setClass = function () {
                            // if editor content length <= 1 and content is required -> add custom error clas and ng-invalid
                            if ($scope.required && (!$scope.modelLength || $scope.modelLength <= 1)) {
                                element.addClass('ng-invalid');
                                element.removeClass('ng-valid');
                                // if form was reseted and input field set to empty
                                if ($scope.errorClass && changed && element.hasClass('ng-dirty')) {
                                    element.children().addClass($scope.errorClass);
                                }
                            } else { // set to valid
                                element.removeClass('ng-invalid');
                                element.addClass('ng-valid');
                                if ($scope.errorClass) {
                                    element.children().removeClass($scope.errorClass);
                                }
                            }
                        };

                    // set required flag (if text editor is required)
                    if ($scope.required && $scope.required === 'true') {
                        $scope.required = true;
                    } else {
                        $scope.required = false;
                    }

                    // overwrite global settings dynamically
                    $scope.fontsizeOptions = $scope.fontsizeOptions || ngQuillConfig.fontSizes;
                    $scope.fontfamilyOptions = $scope.fontfamilyOptions || ngQuillConfig.fontFamilies;

                    // default translations
                    $scope.dict = ngQuillConfig.translations;

                    $scope.shouldShow = function (formats) {
                        var okay = false,
                            i = 0;
                        for (i; i < formats.length; i = i + 1) {
                            if (config.formats.indexOf(formats[i]) !== -1) {
                                okay = true;
                                break;
                            }
                        }

                        return okay;
                    };

                    // if there are custom translations
                    if ($scope.translations) {
                        $scope.dict = $scope.translations;
                    }

                    // add tooltip modules
                    if ($scope.linkTooltip && $scope.linkTooltip === 'true') {
                        config.modules['link-tooltip'] = {
                            template: '<span class="title">' + $scope.dict.visitURL + ':&nbsp;</span>'
                            + '<a href="#" class="url" target="_blank" href="about:blank"></a>'
                            + '<input class="input" type="text">'
                            + '<span>&nbsp;&#45;&nbsp;</span>'
                            + '<a href="javascript:;" class="change">' + $scope.dict.change + '</a>'
                            + '<a href="javascript:;" class="remove">' + $scope.dict.remove + '</a>'
                            + '<a href="javascript:;" class="done">' + $scope.dict.done + '</a>'
                        };
                    }
                    if ($scope.imageTooltip && $scope.imageTooltip === 'true') {
                        config.modules['image-tooltip'] = {
                            template: '<input class="input" type="textbox">'
                            + '<div class="preview">'
                            + '    <span>' + $scope.dict.preview + '</span>'
                            + '</div>'
                            + '<a href="javascript:;" class="cancel">' + $scope.dict.cancel + '</a>'
                            + '<a href="javascript:;" class="insert">' + $scope.dict.insert + '</a>'
                        };
                    }

                    // init editor
                    editor = new Quill(element[0].querySelector('.advanced-wrapper .editor-container'), config);

                    // mark model as touched if editor lost focus
                    editor.on('selection-change', function (range) {
                        if (range) {
                            return;
                        }
                        $timeout(function () {
                            ngModel.$setTouched();
                        });
                    });

                    // add toolbar afterwards with a timeout to be sure that translations has replaced.
                    if ($scope.toolbar && $scope.toolbar === 'true') {
                        $timeout(function () {
                            editor.addModule('toolbar', {
                                container: element[0].querySelector('.advanced-wrapper .toolbar-container')
                            });
                            $scope.toolbarCreated = true;
                            $scope.showToolbar = $scope.hasOwnProperty('showToolbar') ? $scope.showToolbar : true;
                        }, 0);
                    }

                    // provide event to get recognized when editor is created -> pass editor object.
                    $timeout(function(){
                        $scope.$emit('editorCreated', editor, $scope.name);

                        if ($scope.callback) {
                            $scope.callback({
                                editor: editor,
                                name: $scope.name
                            });
                        }

                        // clear history of undo manager to avoid removing inital model value via ctrl + z
                        editor.getModule('undo-manager').clear();
                    });

                    var updateFromPlugin = false;
                    var updateInPlugin = false;

                    // set initial value
                    $scope.$watch(function () {
                        return $scope.ngModel;
                    }, function (newText) {
                        if (updateFromPlugin) {
                            return;
                        }

                        if (newText) {
                            updateInPlugin = true;
                            if (config.save === 'text') {
                                editor.setText(newText);
                            } else if (config.save === 'contents') {
                                editor.setContents(newText);
                            } else {
                                editor.setHTML(newText);
                            }
                        }
                    });

                    // toggle readOnly
                    if ($scope.readOnly) {
                        $scope.$watch(function () {
                            return $scope.readOnly();
                        }, function (readOnly) {
                            editor.editor[readOnly ? 'disable' : 'enable']();
                        });
                    }

                    $scope.regEx = /^([2-9]|[1-9][0-9]+)$/;

                    // Update model on textchange
                    editor.on('text-change', function () {
                        var oldChange = changed;
                        changed = true;
                        updateFromPlugin = true;
                        if (!updateInPlugin) {
                            $scope.$apply(function () {
                                // Calculate content length
                                $scope.modelLength = editor.getLength();
                                // Check if error class should be set
                                if (oldChange) {
                                    setClass();
                                }
                                var setValue;
                                if (config.save === 'text') {
                                    setValue = editor.getText();
                                } else if (config.save === 'contents') {
                                    setValue = editor.getContents();
                                } else {
                                    setValue = editor.getHTML();
                                }
                                // Set new model value
                                if(editor.getLength() <= 1) {
                                    ngModel.$setViewValue('');
                                } else {
                                    ngModel.$setViewValue(setValue);
                                }
                            });
                        }
                        updateInPlugin = false;
                        updateFromPlugin = false;
                    });

                    // Clean-up
                    element.on('$destroy', function () {
                        editor.destroy();
                    });
                }
            };
        }
    ]);

    app.run([
        '$templateCache',
        '$rootScope',
        '$window',
        function ($templateCache) {
            // put template in template cache
            return $templateCache.put('ngQuill/template.html',
                '<div id="content-container">' +
                '<div class="advanced-wrapper">' +
                '<div class="toolbar toolbar-container" >' +
                '<span class="ql-format-group" ng-if="shouldShow([\'font\', \'size\'])">' +
                '<select title="{{dict.font}}" class="ql-font" ng-if="shouldShow([\'font\'])">' +
                '<option ng-repeat="option in fontfamilyOptions" value="{{option.alias}}">{{option.label}}</option>' +
                '</select>' +
                '<select title="{{dict.size}}" class="ql-size" ng-if="shouldShow([\'size\'])">' +
                '<option ng-repeat="option in fontsizeOptions" ng-selected="$index === 1" value="{{option.size}}">{{dict[option.alias] || option.alias}}</option>' +
                '</select>' +
                '</span>' +
                '<span class="ql-format-group" ng-if="shouldShow([\'bold\', \'italic\', \'underline\', \'strike\'])">' +
                '<span title="{{dict.bold}}" class="ql-format-button ql-bold" ng-if="shouldShow([\'bold\'])"></span>' +
                '<span title="{{dict.italic}}" class="ql-format-button ql-italic" ng-if="shouldShow([\'italic\'])"></span>' +
                '<span title="{{dict.underline}}" class="ql-format-button ql-underline" ng-if="shouldShow([\'underline\'])"></span>' +
                '<span title="{{dict.strike}}" class="ql-format-button ql-strike" ng-if="shouldShow([\'strike\'])"></span>' +
                '</span>' +
                '<span class="ql-format-group" ng-if="shouldShow([\'color\', \'background\'])">' +
                '<select title="{{dict.textColor}}" class="ql-color" ng-if="shouldShow([\'color\'])">' +
                '<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>' +
                '<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>' +
                '<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>' +
                '<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>' +
                '<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>' +
                '<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>' +
                '<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>' +
                '<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>' +
                '<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>' +
                '<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>' +
                '<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>' +
                '<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>' +
                '<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>' +
                '<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>' +
                '<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>' +
                '<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>' +
                '<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>' +
                '<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>' +
                '<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>' +
                '<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>' +
                '<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>' +
                '<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>' +
                '<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>' +
                '<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>' +
                '<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>' +
                '<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>' +
                '<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>' +
                '<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>' +
                '<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>' +
                '<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>' +
                '<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>' +
                '<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>' +
                '<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>' +
                '<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>' +
                '<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>' +
                '</select>' +
                '<select title="{{dict.backgroundColor}}" class="ql-background" ng-if="shouldShow([\'background\'])">' +
                '<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>' +
                '<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>' +
                '<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>' +
                '<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>' +
                '<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>' +
                '<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>' +
                '<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>' +
                '<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>' +
                '<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>' +
                '<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>' +
                '<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>' +
                '<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>' +
                '<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>' +
                '<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>' +
                '<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>' +
                '<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>' +
                '<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>' +
                '<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>' +
                '<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>' +
                '<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>' +
                '<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>' +
                '<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>' +
                '<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>' +
                '<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>' +
                '<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>' +
                '<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>' +
                '<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>' +
                '<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>' +
                '<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>' +
                '<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>' +
                '<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>' +
                '<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>' +
                '<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>' +
                '<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>' +
                '<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>' +
                '</select>' +
                '</span>' +
                '<span class="ql-format-group" ng-if="shouldShow([\'list\', \'bullet\'])">' +
                '<span title="{{dict.list}}" class="ql-format-button ql-list" ng-if="shouldShow([\'list\'])"></span>' +
                '<span title="{{dict.bullet}}" class="ql-format-button ql-bullet" ng-if="shouldShow([\'bullet\'])"></span>' +
                '</span>' +
                '<span class="ql-format-group" ng-if="shouldShow([\'align\'])">' +
                '<select title="{{dict.textAlign}}" class="ql-align">' +
                '<option value="left" label="{{dict.left}}" selected=""></option>' +
                '<option value="center" label="{{dict.center}}"></option>' +
                '<option value="right" label="{{dict.right}}"></option>' +
                '<option value="justify" label="{{dict.justify}}"></option>' +
                '</select>' +
                '</span>' +
                '<span class="ql-format-group" ng-if="shouldShow([\'link\', \'image\'])">' +
                '<span title="{{dict.link}}" class="ql-format-button ql-link" ng-if="shouldShow([\'link\'])"></span>' +
                '<span title="{{dict.image}}" class="ql-format-button ql-image" ng-if="shouldShow([\'image\'])"></span>' +
                '</span>' +
                '</div>' +
                '<div class="editor-container"></div>' +
                '</div>' +
                '</div>');
        }
    ]);
}).call(this);
/*
avatar
    .controller('quizQuestionController',['$rootScope','$scope','$filter','$modal','quizQuestionService','quizQuestionServicebyid',function($rootScope,$scope,$filter,$modal,quizQuestionService,quizQuestionServicebyid){
        $scope.add=function(){
            var   modalInstance= $modal.open({
                templateUrl: 'quiz/quizQuestion/quizQuestionAdd.html',
                controller:  'quizQuestionAddController'
            });
            modalInstance.result.then(function(){},function(){});
        };

        $scope.edit = function(){
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            if(rowCol !== null) {
                $scope.items=[];
                $scope.items=rowCol.row.entity;
                var modalInstance=$modal.open({
                    templateUrl: 'quiz/quizQuestion/quizQuestionEdit.html',
                    controller:'quizQuestionUpdateController',
                    scope:$scope

                });


            }
        };
        $scope.delete=function(){
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            if(rowCol !== null) {
                $scope.id=rowCol.row.entity.id;
                var modalInstance=$modal.open({
                    templateUrl: 'quiz/quizQuestion/quizQuestionDelete.html',
                    controller:'quizQuestionDeleteController',
                    scope: $scope
                });

            }
        };

        $scope.refresh=function(){
            quizQuestionService.query().then(function(data){
                $scope.myData = [];
                data.forEach(function(row){
                    $scope.myData.push(row);
                });

            });
        };

        $scope.myData = [];
        $scope.gridOptions = {};
        $scope.gridOptions.data = 'myData';
        $scope.gridOptions.enableColumnResizing = true;
        $scope.gridOptions.fastWatch = true;
        $scope.gridOptions.paginationPageSizes= [100, 500, 1000];
        $scope.gridOptions.paginationPageSize= 100;
        $scope.gridOptions.columnDefs = [
            { name:'#',cellTemplate:' <div class="ui-grid-cell-contents"><button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.edit()"><i class="glyphicon glyphicon-pencil"></i> </button><button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.delete()"><i class="glyphicon glyphicon-trash"></i> </button></div>',width:75},
            { name:'id',displayName:'ID', width:75,enableCellEdit: false  },
            { name:'subjectcategoryid',displayName:'SubCategoryID', width:100,enableCellEdit: false  },
            { name:'question',displayName:'Question', width:125,enableCellEdit: false  },
            { name:'answer1',displayName:'Option1', width:150,enableCellEdit: false  },
            { name:'answer2',displayName:'Option2', width:150,enableCellEdit: false  },
            { name:'answer3',displayName:'Option3', width:150,enableCellEdit: false  },
            { name:'answer4',displayName:'Option4', width:150,enableCellEdit: false  },
            { name:'answer',displayName:'Correct Option', width:150,enableCellEdit: false  },
            { name:'severity',displayName:'Severity', width:150,enableCellEdit: false  },
            { name:'weightage',displayName:'Weightage', width:150,enableCellEdit: false  },
            { name:'reviewed',displayName:'Reviewed', width:150,enableCellEdit: false  },
            { name:'approved',displayName:'Approved', width:150,enableCellEdit: false  },
            { name:'timerequired',displayName:'Time Required', width:150,enableCellEdit: false  }
        ];

       /!*quizQuestionService.getQuizQuestion().then(function(data){
            console.log(data);
            data.forEach(function(row){
                $scope.myData.push(row);
            });

        });*!/
        quizQuestionService.query().$promise.then(function (data) {
            $scope.myData=data;
            console.log("grid data:"+$scope.myData);
        });
        $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
        };
    }]);

avatar.controller('quizQuestionAddController',['$scope','quizQuestionService','subjectCategoryService','quizQuestionServicebyid',function($scope,quizQuestionService,subjectCategoryService,quizQuestionServicebyid) {
    $scope.subjects=[];
    subjectCategoryService.getSubjectCategory().then(function(response){
        response.forEach(function(rows){
            $scope.subjects.push(rows);
        });
    });
    $scope.add = function () {
        if(!$scope.items.question){
            $scope.items.question=null;
        }
        if(!$scope.items.answer1){
            $scope.items.answer1=null;
        }
        if(!$scope.items.answer2)        {
            $scope.items.answer2=null;
        }
        if(!$scope.items.answer3)        {
            $scope.items.answer3=null;
        }
        if(!$scope.items.answer4)        {
            $scope.items.answer4=null;
        }
        if(!$scope.items.answer)        {
            $scope.items.answer=null;
        }
        if(!$scope.items.severity)        {
            $scope.items.severity=null;
        }
        if(!$scope.items.weightage)        {
            $scope.items.weightage=null;
        }
        if(!$scope.items.reviewed)        {
            $scope.items.reviewed=null;
        }
        if(!$scope.items.approved)        {
            $scope.items.approved=null;
        }
        if(!$scope.items.timerequired)        {
            $scope.items.timerequired=null;
        }
        var jsonData = {
            subjectcategoryid:$scope.dropSubject,
            question: $scope.items.question,
            answer1: $scope.items.answer1,
            answer2: $scope.items.answer2,
            answer3: $scope.items.answer3,
            answer4: $scope.items.answer4,
            answer: $scope.items.answer,
            severity: $scope.items.severity,
            weightage: $scope.items.weightage,
            reviewed: $scope.items.reviewed,
            approved: $scope.items.approved,
            timerequired: $scope.items.timerequired
        };
        console.log(jsonData);
        quizQuestionService.create(jsonData).$promise.then(function (data) {

        });
    };

}]);

avatar.controller('quizQuestionUpdateController', ['$scope','quizQuestionService', function($scope,quizQuestionService) {
    $scope.update=function(id){
        var jsonData={
            id:id,
            question: $scope.items.question,
            answer1: $scope.items.answer1,
            answer2: $scope.items.answer2,
            answer3: $scope.items.answer3,
            answer4: $scope.items.answer4,
            answer: $scope.items.answer,
            severity: $scope.items.severity,
            weightage: $scope.items.weightage,
            reviewed: $scope.items.reviewed,
            approved: $scope.items.approved,
            timerequired: $scope.items.timerequired
        };
        quizQuestionService.updateQuizQuestion(jsonData).then(function(data){
            console.log(data);
        });
    };

}]);

avatar
    .controller('quizQuestionDeleteController', ['$scope','quizQuestionService', function($scope,quizQuestionService) {
        $scope.delete=function(id){
            quizQuestionService.deleteQuizQuestion(id).then(function(data){
                console.log(data);
            });
        };

    }]);

*/
avatar.controller('QuizQuestionCtrl', QuizQuestionCtrl);
var subject = null;
QuizQuestionCtrl.$inject = ['$scope','quizQuestionService','quizQuestionServiceById'];
function QuizQuestionCtrl ($scope,quizQuestionService,quizQuestionServiceById) {
    var vm = this;
    vm.titleName = "Quiz Question";
   /* vm.url = apiURL + '/api/v1/quizquestions';*/
    vm.commonService = quizQuestionService;
    vm.commonServiceById = quizQuestionServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: {type: 'number', title: 'ID'},
            SubjectCategory: {type: 'string', title: 'subjectcategoryid'},
            question: {type: 'string', title: 'question'},
            answer1: {type: 'string', title: 'answer1'},
            answer2: {type: 'string', title: 'answer2'},
            answer3: {type: 'string', title: 'answer3'},
            answer4: {type: 'string', title: 'answer4'},
            answer: {type: 'string', title: 'answer'},
            severity: {type: 'number', title: 'severity'},
            weightage: {type: 'number', title: 'weightage'},
            reviewed: {type: 'number', title: 'reviewed'},
            approved: {type: 'number', title: 'approved'},
            timerequired: {type: 'number', title: 'timerequired'}
        }
    };
    vm.gridOptions =
    {
        columnDefs: [
            {name: 'id', width: 40},
            {name: 'SubjectCategory',avDependencyKeyName:'"subjectcategoryid"',avDependencyKey:'SubjectCategory'},
            {name: 'question'},
            {name: 'answer1'},
            {name: 'answer2'},
            {name: 'answer3'},
            {name: 'answer4'},
            {name: 'answer'},
            {name: 'severity'},
            {name: 'weightage'},
            {name: 'reviewed'},
            {name: 'approved'},
            {name: 'timerequired'}
        ],
        excelfile: 'QuizQuestions.csv',
        PdfHeader: {text: "QuizQuestions List", style: 'headerStyle'},
    };
    vm.form = [
        {
            "key": "subjectcategoryid",
            "type": "select",
            "title": "Subject Category",
            "avUri":apiURL + '/api/v1/dropdowns/subjectcategories',
            "titleMap":[]
        },
        {
            key: 'question',
            placeholder: 'Enter question'
        },
        {
            key: 'answer1',
            placeholder: 'Enter answer1'
        },
        {
            key: 'answer2',
            placeholder: 'Enter answer2'
        },
        {
            key: 'answer3',
            placeholder: 'Enter answer3'
        },
        {
            key: 'answer4',
            placeholder: 'Enter answer4'
        },
        {
            key: 'answer',
            placeholder: 'Enter answer'
        },
        {
            key: 'severity',
            placeholder: 'Enter severity'
        },
        {
            key: 'weightage',
            placeholder: 'Enter weightage'
        },
        {
            key: 'reviewed',
            placeholder: 'Enter reviewed'
        },
        {
            key: 'approved',
            placeholder: 'Enter approved'
        },
        {
            key: 'timerequired',
            placeholder: 'Enter timerequired'
        }
    ];
}



avatar.controller('SubjectCategoryCtrl', SubjectCategoryCtrl);
var entity =null;
SubjectCategoryCtrl.$inject = ['$scope','$http', '$modal','$filter', 'commonEditService','commonDeleteService','uiGridExporterConstants'];
function SubjectCategoryCtrl ($scope, $http, $modal,$filter,commonEditService,commonDeleteService,uiGridExporterConstants) {
    var vm = this;
    vm.titleName="Subject Categories";
    vm.url=apiURL + '/api/v1/subjectcategories';
    vm.schema = {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            subject: { type: 'string', title: 'subjectid' },
            name: { type: 'string', title: 'name' },
            description: { type: 'string', title: 'description' }
        }
    };
    vm.model = {};
    vm.gridOptions =
    {
        columnDefs:[
            {
                field: 'dd',
                name: '',
                cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid.appScope, row)"><i class="glyphicon glyphicon-trash"></i></i></button></div>',
                width: 68
            },
            {name: 'id', width: 40},
            {name: 'subject'},
            {name: 'name'},
            {name: 'description'}
        ],
        exporterCsvFilename:'SubjectCategory.csv',
        exporterPdfHeader: { text: "SubjectCategories List", style: 'headerStyle' },
    };
    $http.get(apiURL+'/api/v1/subjects')
        .success(function (data) {
            var count=0;
            data.forEach(function(row){
                if(count===0)
                {
                    entity='{"'+row.id+'":"'+row.name+'"';
                    count++;
                }
                else{
                    entity=entity.concat(',"'+row.id+'":"'+row.name+'"');
                }

            });
            entity=entity.concat('}');

        });
    vm.commonEditDropDown = function(vm) {
        vm.form=[
            {
                "key": "subjectid",
                "type": "select",
                "title": "subject",
                "titleMap":JSON.parse(entity)
            },
            {
                key: 'name',
                placeholder: 'Enter name'
            },
            {
                key: 'description',
                placeholder: 'Enter Description'
            }
        ];
        var value=JSON.parse(entity);
        for(var a in value){
            if(value[a]==vm.entity.subject){
                vm.entity.subjectid=a;
            }
        }
    }
    vm.commonSaveDropDown = function(vm){
        var value=JSON.parse(entity);
        for(var a in value){
            if(a==vm.entity.subjectid){
                vm.entity.subject=value[a];
            }
        }
    }
    $scope.editRow =commonEditService.editRow;
    $scope.deleteRow = commonDeleteService.deleteRow;

}

/*
avatar
    .constant('SubjectCategorySchema', {
        type: 'object',
        properties: {
            id: { type: 'number', title: 'ID' },
            subject: { type: 'string', title: 'subjectid' },
            name: { type: 'string', title: 'name' },
            description: { type: 'string', title: 'description' }
        }
    })
    .controller('SubjectCategoryCtrl', SubjectCategoryCtrl)
    .controller('SubjectCategoryEditCtrl', SubjectCategoryEditCtrl)
    .controller('SubjectCategoryDeleteCtrl', SubjectCategoryDeleteCtrl)
    //.controller('RowAddCtrl', RowAddCtrl)
    .service('SubjectCategoryEditor', SubjectCategoryEditor)
    .service('SubjectCategoryRemover', SubjectCategoryRemover)
    //.service('RowAdder',RowAdder)
;

var subject = null;
SubjectCategoryCtrl.$inject = ['$scope','$http', '$modal','$filter','SubjectCategoryEditor', 'SubjectCategoryRemover', 'SubjectCategorySchema','subjectCategoryService'];
function SubjectCategoryCtrl ($scope, $http, $modal,$filter ,SubjectCategoryEditor, SubjectCategoryRemover,SubjectCategorySchema,subjectCategoryService) {

    $scope.titleName="Subject Category";
    var vm = this;
    vm.schema = SubjectCategorySchema;
    vm.successDeleteMessage = true;
    vm.successAddMessage = true;
    vm.successUpdateMessage = true;
    vm.model = {};
    vm.searchData =[];
   /!* vm.searchData;*!/
    vm.editRow = SubjectCategoryEditor.editRow;
    vm.deleteRow = SubjectCategoryRemover.deleteRow;
    vm.gridOptions =
    {
        columnDefs:[
            {
                field: 'dd',
                name: '',
                cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid, row)"><i class="glyphicon glyphicon-trash"></i></i></button></div>',
                width: 68
            },
            {name: 'id', width: 40},
            {name: 'subject'},
            {name: 'name'},
            {name: 'description'}
        ]
    };

    //get

    /!*$http.get(apiURL + '/api/v1/subjectcategories')
        .success(function (data) {
            vm.gridOptions.data = data;
        });*!/


    subjectCategoryService.getSubjectCategory().then(function(data){
        vm.gridOptions.data = data;
        vm.searchData=data;
    });

    vm.searchGrid = function(searchTerm){
         console.log(vm.searchData);
        vm.gridOptions.data = $filter('filter')( vm.searchData, searchTerm , undefined );

    };

    $http.get(apiURL+'/api/v1/subjects')
        .success(function (data) {
            var count=0;
            data.forEach(function(row){
                if(count===0)
                {
                    subject='{"'+row.id+'":"'+row.name+'"';
                    count++;
                }
                else{
                    subject=subject.concat(',"'+row.id+'":"'+row.name+'"');
                }

            });
            subject=subject.concat('}');
        });





    $scope.refresh = function () {
        $http.get(apiURL + '/api/v1/subjectcategories')
            .success(function (data) {
                vm.gridOptions.data = data;
            });
    };

    //add
    $scope.addRow = function () {
        var service = {id: 0};
        var rowTemp = {};
        rowTemp.entity = service;
        vm.editRow($scope.vm.gridOptions, rowTemp);
    };
/!*
    subjectCategoryService.addSubjectCategory().then(function(data){
        console.log(data);

    });

    subjectCategoryService.updateSubjectCategory().then(function(data){
        console.log(data);

    });
*!/


}
//edit

SubjectCategoryEditor.$inject = ['$rootScope', '$modal','$http'];
function SubjectCategoryEditor($rootScope, $modal,$http) {
    var service = {};
    service.editRow = editRow;
    function editRow(grid, row) {
        $modal.open({
            templateUrl: 'quiz/subjectCategory/subjectCategoryEdit.html',
            controller: ['$scope','$modalInstance', 'SubjectCategorySchema', 'grid', 'row', '$http','subjectCategoryService', SubjectCategoryEditCtrl],
            controllerAs: 'vm',
            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }
            }
        });
    }

    return service;
}

function SubjectCategoryEditCtrl($scope,$modalInstance, SubjectCategorySchema, grid, row, $http,subjectCategoryService) {
    var vm = this;
    vm.schema = SubjectCategorySchema;
    vm.entity = angular.copy(row.entity);
    var value=JSON.parse(subject);
    for(var a in value){
        if(value[a]==vm.entity.subject){
            vm.entity.subjectid=a;
        }
    }
    vm.form = [
        {
            "key": "subjectid",
            "type": "select",
            "title": "subject",
            "titleMap":JSON.parse(subject)
        },
        {
            key: 'name',
            placeholder: 'Enter name'
        },
        {
            key: 'description',
            placeholder: 'Enter Description'
        }
    ];
    $scope.submitForm = function(form) {
        grid.detailedErrorMessage="";
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            if (row.entity.id == 0) {
               /!* $http.post(apiURL+'/api/v1/common/levels', vm.entity)
                    .success(function (data) {
                        var value=JSON.parse(entity);
                        for(var a in value){
                            if(a==vm.entity.entityid){
                                vm.entity.entityname=value[a];
                            }
                        }
                        row.entity.enabled=1;
                        row.entity = angular.extend(row.entity, vm.entity);
                        row.entity.id=data.insertId;
                        //grid.gridOptions.data.push(row.entity);
                        grid.searchData.push(row.entity);
                        grid.successAddMessage = false;
                        grid.successUpdateMessage = true;
                        grid.successDeleteMessage=true;

                        $modalInstance.close(row.entity);
                    }).error(function(data,status) {
                        if (data.status === 500) {
                            $scope.levelAddErrorMessage = "Please select Entity";
                            grid.successDeleteMessage = true;
                            grid.detailedErrorMessage = data.detailed_message;
                            grid.successUpdateMessage = true;
                            grid.successAddMessage = true;
                        }
                    });*!/
                subjectCategoryService.addSubjectCategory(vm.entity).then(function (data) {
                    var value=JSON.parse(subject);
                    for(var a in value){
                        if(a==vm.entity.subjectid){
                            vm.entity.subject=value[a];
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    row.entity.id=data.insertId;

                    grid.data.push(row.entity);
                    $modalInstance.close(row.entity)

                });
            }
            else {
                subjectCategoryService.updateSubjectCategory(vm.entity).then(function(data){
                    console.log(row.entity);
                    var value=JSON.parse(entity);
                    for(var a in value){
                        if(a==vm.entity.subjectid){
                            vm.entity.subject=value[a];
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    var index=grid.appScope.vm.gridOptions.data.indexOf(row.entity);
                    row.grid.appScope.vm.searchData[index]=vm.entity;
                    $modalInstance.close(row.entity);
                });
            }
        }

    }

}

//delete

SubjectCategoryRemover.$inject = ['$rootScope', '$modal','$http'];
function SubjectCategoryRemover($rootScope, $modal,$http) {
    var service = {};
    service.deleteRow = deleteRow;

    function deleteRow(grid, row) {
        $modal.open({
            templateUrl: 'quiz/subjectCategory/subjectCategoryDelete.html',
            controller: ['$modalInstance', 'SubjectCategorySchema', 'grid', 'row', '$http','subjectCategoryService', SubjectCategoryDeleteCtrl],
            controllerAs: 'vm',
            resolve: {
                grid: function () { return grid; },
                row: function () { return row; }
            }
        });
    }

    return service;
}

function SubjectCategoryDeleteCtrl($modalInstance, SubjectCategorySchema, grid, row, $http,subjectCategoryService) {
    var vm = this;

    vm.schema = SubjectCategorySchema;
    vm.entity = angular.copy(row.entity);
    // console.log(vm.entity);
    vm.form = [
        'subjectid',
        'name',
        'description'
    ];

    vm.remove = remove;

    function remove() {
        row.entity = angular.extend(row.entity, vm.entity);
        var index=grid.appScope.vm.gridOptions.data.indexOf(row.entity);
        subjectCategoryService.deleteSubjectCategory( row.entity.id).then(function(data){
            grid.appScope.vm.gridOptions.data.splice(index,1);
            $modalInstance.close(row.entity);
        });
    }
}
*/
/* var jsonData;
 $http.get('avatargrid.json').success(function (response) {
 jsonData = response;
 for (var i = 0; i < response.titleName.length; i++) {
 if (response.titleName[i].variable === "s") {
 $scope.titleName = jsonData.titleName[i].name;
 }

 }
 });*/
/*
avatar
    .controller('subjectCategoryController',['$rootScope','$scope','$filter','$modal','subjectCategoryService',function($rootScope,$scope,$filter,$modal,subjectCategoryService){
        $scope.add=function(){
            var   modalInstance= $modal.open({
                templateUrl: 'quiz/subjectCategory/subjectCategoryAdd.html',
                controller:  'subjectCategoryAddController'
            });
            modalInstance.result.then(function(){},function(){});
        };

        $scope.edit = function(row){
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            if(rowCol !== null) {
                $scope.items=[];
                $scope.items=rowCol.row.entity;
                var modalInstance=$modal.open({
                    templateUrl: 'quiz/subjectCategory/subjectCategoryEdit.html',
                    controller:'subjectCategoryUpdateController',
                    scope:$scope

                });


            }
        };
        $scope.delete=function(){
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            if(rowCol !== null) {
                $scope.id=rowCol.row.entity.id;
                var modalInstance=$modal.open({
                    templateUrl: 'quiz/subjectCategory/subjectCategoryDelete.html',
                    controller:'subjectCategoryDeleteController',
                    scope: $scope
                });

            }
        };

        $scope.refresh=function(){
            subjectCategoryService.getSubjectCategory().then(function(data){
                $scope.myData = [];
                data.forEach(function(row){
                    $scope.myData.push(row);
                });

            });
        };

        $scope.myData = [];
        $scope.gridOptions = {};
        $scope.gridOptions.data = 'myData';
        $scope.gridOptions.enableColumnResizing = true;
        $scope.gridOptions.fastWatch = true;
        $scope.gridOptions.paginationPageSizes= [100, 500, 1000];
        $scope.gridOptions.paginationPageSize= 100;
        $scope.gridOptions.columnDefs = [
            { name:'#',cellTemplate:' <div class="ui-grid-cell-contents"><button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.edit(grid, row)"><i class="glyphicon glyphicon-pencil"></i> </button><button type="button" class="btn btn-sm btn-default" ng-click="grid.appScope.delete()"><i class="glyphicon glyphicon-trash"></i> </button></div>',width:75},
            { name:'id',displayName:'ID', width:100,enableCellEdit: false  },
            { name:'subjectid',displayName:'SubjectID', width:100,enableCellEdit: false  },
            { name:'name',displayName:'Name', width:125,enableCellEdit: false  },
            { name:'description',displayName:'Description', width:250,enableCellEdit: false  }
        ];

       subjectCategoryService.getSubjectCategory().then(function(data){
            data.forEach(function(row){
                $scope.myData.push(row);
            });

        });
      
        $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
        };
    }]);

avatar.controller('subjectCategoryAddController',['$scope','subjectCategoryService','subjectService',function($scope,subjectCategoryService,subjectService) {
    $scope.subjects=[];
    subjectService.getSubject().then(function(response){
        response.forEach(function(rows){
            $scope.subjects.push(rows);
        });
    });


    $scope.add = function () {
        if(!$scope.items.name){
            $scope.items.name=null;
        }
        if(!$scope.items.description){
            $scope.items.description=null;
        }
        var jsonData = {
            subjectid: $scope.dropSubject,
            name: $scope.items.name,
            description: $scope.items.description

        };
        console.log(jsonData);
        subjectCategoryService.addSubjectCategory(jsonData).then(function (data) {

        });
    };

}]);

avatar.controller('subjectCategoryUpdateController', ['$scope','subjectCategoryService', function($scope,subjectCategoryService) {
    $scope.update=function(id){
        var jsonData={
            id:id,
            name:$scope.items.name,
            description:$scope.items.description,
            lastmoddatetime:$scope.items.lastmoddatetime

        };
        subjectCategoryService.updateSubjectCategory(jsonData).then(function(data){
            console.log(data);
        });
    };

}]);

avatar
    .controller('subjectCategoryDeleteController', ['$scope','subjectCategoryService', function($scope,subjectCategoryService) {
        $scope.delete=function(id){
            subjectCategoryService.deleteSubjectCategory(id).then(function(data){
                console.log(data);
            });
        };

    }]);

*/

avatar.controller('SubjectCtrl', SubjectCtrl);
SubjectCtrl.$inject = ['$scope','subjectService','subjectServiceById'];
function SubjectCtrl($scope,subjectService,subjectServiceById) {
    var vm = this;
    vm.titleName = "Subjects";
    vm.commonService = subjectService;
    vm.commonServiceById = subjectServiceById;
    vm.schema = {
        type: 'object',
        properties: {
            id: {type: 'number', title: 'ID'},
            category: {type: 'string', title: 'Category'},
            name: {type: 'string', title: 'Name'},
            description: {type: 'string', title: 'Description'},
            icon_class: {type: 'string', title: 'Icon_class'},
            icon_svg: {type: 'string', title: 'Icon_svg'},
            icon_url: {type: 'string', title: 'Icon_url'}
        },
        "required":[
            "category",
            "name"
        ]
    };
    vm.gridOptions =
    {
        columnDefs: [
            {name: 'id', width: 40},
            {name: 'category',field:'category.categoryname',avDependencyKeyId:'"categoryid"'},
            {name: 'name'},
            {name: 'description'},
            {name: 'icon_class'},
            {name: 'icon_svg'},
            {name: 'icon_url'}
        ], enableGridMenu: false,
        excelfile:'Subjects.csv',
        PdfHeader: { text: "Subjects List", style: 'headerStyle' },
    };
    vm.form = [
        {
            "key": "categoryid",
            "type": "select",
            "title": "category",
            "avDependency":"true",
            "avDependencyField": 'category.categoryid',
            "avUri":apiURL + '/api/v1/dropdowns/categories',
            "titleMap":[]

        },
        {
            key: 'name',
            placeholder: 'Enter name'
        },
        {
            key: 'description',
            placeholder: 'Enter Description'
        },
        {
            key: 'icon_class',
            placeholder: 'Enter icon_class'
        },
        {
            key: 'icon_svg',
            placeholder: 'Enter icon_svg'
        },
        {
            key: 'icon_url',
            placeholder: 'Enter icon_url'
        }
    ];
}







 avatar
 .controller('sidebarController',['$rootScope','$scope','$location','sidebarService',function($rootScope,$scope,$location,sidebarService){

 sidebarService.getSideBar().then(function(data){
 $scope.menuData=data[0].menu;
 });
 $scope.pageload=function(state){
 $location.url(state);
 }
 }]);



avatar
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService) {
        var data = tableService.data;
        
        //Basic Example
        this.tableBasic = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Sorting
        this.tableSorting = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
    
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Filtering
        this.tableFilter = new ngTableParams({
            page: 1,            // show first page
            count: 10
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;

                this.id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.username = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.contact = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(this.id, this.name, this.email, this.username, this.contact);
            }
        })
        
        //Editable
        this.tableEdit = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    })


avatar
    .controller('tableController',['$scope',function ($scope, tableSrv) {



        var value = tableSrv.getUsers($scope.username,$scope.password);
        console.log(value);


        $scope.users = [{
            firstName: 'Sam',
            lastName: 'sam',
           username: 'sam@gmail.com',
            password: '2501'
        },
            {
                firstName: 'pam',
                lastName: 'Pam',
                userName: 'sam@gmail.com',
                password: '2501'
            },
            {
                firstName: 'Sandy',
                lastName: 'Sandy',
                userName: 'sam@gmail.com',
                password: '2501'
            },
            {
                firstName: 'ram',
                lastName: 'ram',
                userName: 'sam@gmail.com',
                password: '2501'
            }];


    }]);

avatar

    //====================================
    // ALERT
    //====================================

    .controller('AlertDemoCtrl', function ($scope) {
        $scope.alerts = [
            { type: 'info', msg: "Well done! You successfully read this important alert message." },
            { type: 'success', msg: "Well done! You successfully read this important alert message." },
            { type: 'warning', msg: "Warning! Better check yourself, you're not looking too good." },
            { type: 'danger', msg: "Oh snap! Change a few things up and try submitting again." }
        ];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    })

    
    //====================================
    // BUTTONS
    //====================================

    .controller('ButtonsDemoCtrl', function ($scope) {
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };
    })

    
    //====================================
    // CAROUSEL
    //====================================

    .controller('CarouselDemoCtrl', function ($scope) {
        $scope.myInterval = 0;
        $scope.slides = [
            {
                img: 'c-1.jpg',
                title: 'First Slide Label',
                text: 'Some sample text goes here...'
            },
            {
                img: 'c-2.jpg',
                title: 'Second Slide Label',
                text: 'Some sample text goes here...'
            },
            {
                img: 'c-3.jpg'
            }
        ];

    })


    //====================================
    // CAROUSEL
    //====================================

    .controller('CollapseDemoCtrl', function ($scope) {
        $scope.isCollapsed = false;
    })


    //====================================
    // DROPDOWN
    //====================================

    .controller('DropdownDemoCtrl', function ($scope) {
        $scope.items = [
            { name: 'The first choice!', icon: 'home' },
            { name: 'And another choice', icon: 'account' },
            { name: 'But wait! A third!', icon: 'email' },
            { name: 'And fourth on here', icon: 'pin' }
        ];
    })

    
    //====================================
    // MODAL
    //====================================
    .controller('ModalDemoCtrl', function ($scope, $modal, $log) {

        $scope.modalContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis ullamcorper. Integer dapibus, mi ac tempor varius, purus nibh mattis erat, vitae porta nunc nisi non tellus. Vivamus mollis ante non massa egestas fringilla. Vestibulum egestas consectetur nunc at ultricies. Morbi quis consectetur nunc.';
    
        //Create Modal
        function modalInstances(animation, size, backdrop, keyboard) {
            var modalInstance = $modal.open({
                animation: animation,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    content: function () {
                        return $scope.modalContent;
                    }
                }
            
            });
        }
        
        //Custom Sizes
        $scope.open = function (size) {
            modalInstances(true, size, true, true)
        }
        
        //Without Animation
        $scope.openWithoutAnimation = function() {
            modalInstances(false, '', true, true)
        }
        
        //Prevent Outside Click
        $scope.openStatic = function () {
            modalInstances(true, '', 'static', true)
        };
    
        //Disable Keyboard
        $scope.openKeyboard = function () {
            modalInstances(true, '', true, false)
        };

    })

    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.

    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, content) {

          $scope.modalContent = content;

          $scope.ok = function () {
            $modalInstance.close();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
    })
    

    //====================================
    // PAGINATION
    //====================================

    .controller('PaginationDemoCtrl', function ($scope, $log) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    })


    //====================================
    // POPOVER
    //====================================

    .controller('PopoverDemoCtrl', function ($scope) {
        $scope.dynamicPopover = {
            templateUrl: 'myPopoverTemplate.html',
        };
    })

    //====================================
    // PROGRESSBAR
    //====================================

    .controller('ProgressDemoCtrl', function ($scope) {
        $scope.max = 200;

        $scope.random = function() {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } 
            else if (value < 50) {
                  type = 'info';
            } 
            else if (value < 75) {
                  type = 'warning';
            } 
            else {
                  type = 'danger';
            }

            $scope.showWarning = (type === 'danger' || type === 'warning');

            $scope.dynamic = value;
            $scope.type = type;
        };

        $scope.random();

        $scope.randomStacked = function() {
            $scope.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                $scope.stacked.push({
                    value: Math.floor((Math.random() * 30) + 1),
                    type: types[index]
                });
            }
        };
    
        $scope.randomStacked();
    })


    //====================================
    // TABS
    //====================================

    .controller('TabsDemoCtrl', function ($scope, $window) {
        $scope.tabs = [
            { 
                title:'Home', 
                content:'In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nam eget dui. In ac felis quis tortor malesuada pretium. Phasellus consectetuer vestibulum elit. Duis lobortis massa imperdiet quam. Pellentesque commodo eros a enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Phasellus a est. Pellentesque commodo eros a enim. Cras ultricies mi eu turpis hendrerit fringilla. Donec mollis hendrerit risus. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Praesent egestas neque eu enim. In hac habitasse platea dictumst.' 
            },
            { 
                title:'Profile', 
                content:'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nulla sit amet est. Praesent ac massa at ligula laoreet iaculis. Vivamus aliquet elit ac nisl. Nulla porta dolor. Cras dapibus. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.', 
            },
            { 
                title:'Messages', 
                content:'Etiam rhoncus. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Cras id dui. Curabitur turpis. Etiam ut purus mattis mauris sodales aliquam. Aenean viverra rhoncus pede. Nulla sit amet est. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Praesent ac sem eget est egestas volutpat. Cras varius. Morbi mollis tellus ac sapien. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce vel dui.Morbi mattis ullamcorper velit. Etiam rhoncus. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Cras id dui. Curabitur turpis. Etiam ut purus mattis mauris sodales aliquam. Aenean viverra rhoncus pede. Nulla sit amet est. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Praesent ac sem eget est egestas volutpat. Cras varius. Morbi mollis tellus ac sapien. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Fusce vel dui.', 
            },
            { 
                title:'Settings', 
                content:'Praesent turpis. Phasellus magna. Fusce vulputate eleifend sapien. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.', 
            }
        ];

    })

    
    //====================================
    // TOOLTIPS
    //====================================

    .controller('TooltipDemoCtrl', function ($scope, $sce) {
          $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');
    })

    
    //====================================
    // DATE PICKER
    //====================================
    .controller('DatepickerDemoCtrl', function ($scope) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();


        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[opened] = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    })  



    //====================================
    // TYPEAHEAD
    //====================================
    .controller('TypeaheadCtrl', function($scope, $http) {

        $scope.selected = undefined;
        $scope.states = [
            'Alabama', 
            'Alaska', 
            'Arizona', 
            'Arkansas', 
            'California', 
            'Colorado', 
            'Connecticut', 
            'Delaware', 
            'Florida', 
            'Georgia', 
            'Hawaii', 
            'Idaho', 
            'Illinois', 
            'Indiana', 
            'Iowa', 
            'Kansas', 
            'Kentucky',                       
            'Louisiana', 
            'Maine', 
            'Maryland',
            'Massachusetts',
            'Michigan',
            'Minnesota', 
            'Mississippi',
            'Missouri',
            'Montana', 
            'Nebraska', 
            'Nevada',
            'New Hampshire',
            'New Jersey',
            'New Mexico', 
            'New York', 
            'North Dakota', 
            'North Carolina',
            'Ohio', 
            'Oklahoma',
            'Oregon', 
            'Pennsylvania',
            'Rhode Island', 
            'South Carolina',
            'South Dakota',
            'Tennessee', 
            'Texas', 
            'Utah',
            'Vermont',
            'Virginia', 
            'Washington',
            'West Virginia',
            'Wisconsin',
            'Wyoming'
        ];
    
        // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function(val) {
            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function(response){
                return response.data.results.map(function(item){
                    return item.formatted_address;
                });
            });
        }
    }) 
var dependentEntities = null;
avatar
    .controller('avGridRowEditController', avGridRowEditController)
    .controller('avGridRowDeleteController', avGridRowDeleteController)
    .service("avGridRowEditService", avGridRowEditService)
    .service('avGridRowDeleteService', avGridRowDeleteService)
    .directive('avGrid', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/uiGrid.html',
            controller: function ($scope, $http, $filter, avGridRowEditService, avGridRowDeleteService, uiGridExporterConstants) {
                $scope.dependentEntities = [];
                var formArray = [];
                var formCount = 0;
                $scope.form = $scope.vm.form;
                var countArray = 0;
                for (var i = 0; i < $scope.vm.form.length; i++) {
                    if ($scope.form[i].avUri) {
                        formArray[countArray] = i;
                        countArray++;
                        function getDropDownData(formCount, i, callback) {
                            $http.get($scope.form[i].avUri)
                                .success(function (data) {
                                    var dropdownData;
                                    var count = 0;
                                    data.forEach(function (rowData) {
                                        if (count === 0) {
                                            dropdownData = '{"' + rowData.id + '":"' + rowData.name + '"';
                                            count++;
                                        }
                                        else {
                                            dropdownData = dropdownData.concat(',"' + rowData.id + '":"' + rowData.name + '"');
                                        }
                                    });
                                    $scope.dependentEntities[formArray[formCount]] = dropdownData.concat('}');
                                    $scope.form[formArray[formCount]].titleMap = JSON.parse($scope.dependentEntities[formArray[formCount]]);
                                    callback(dropdownData.concat('}'));
                                });
                        };
                        getDropDownData(formCount, i, function (data) {
                        });
                        formCount++;

                    }
                }
                $scope.vm.searchData = [];
                $scope.vm.successDeleteMessage = true;
                $scope.vm.successAddMessage = true;
                $scope.vm.successUpdateMessage = true;

                $scope.vm.gridOptions.columnDefs.unshift({
                    field: 'dd',
                    name: '',
                    cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid.appScope, row)"><i class="glyphicon glyphicon-trash"></i></i></button></div>',
                    width: 68
                });
                for (var i = 0; i < $scope.vm.gridOptions.columnDefs.length; i++) {
                    if ($scope.vm.gridOptions.columnDefs[i].avLink) {
                        var sref = $scope.vm.gridOptions.columnDefs[i].avLink;
                        var temp = '<div class="ui-grid-cell-contents"><a style="text-decoration: underline;color: blue" data-ui-sref="' + sref + '">{{ COL_FIELD }}</a></div>';
                        $scope.vm.gridOptions.columnDefs[i].cellTemplate = temp;
                    }
                    if ($scope.vm.gridOptions.columnDefs[i].avType == "email") {
                        $scope.vm.gridOptions.columnDefs[i].cellTemplate = '<div class="ui-grid-cell-contents"><a style="text-decoration: underline;color: blue" href="mailto:{{ COL_FIELD }}" av-email>{{ COL_FIELD }}</a></div>';
                    }
                    if ($scope.vm.gridOptions.columnDefs[i].avType == "date") {
                        $scope.vm.gridOptions.columnDefs[i].cellFilter = 'date:\'yyyy-MMMM-dd\'';
                    }
                    if ($scope.vm.gridOptions.columnDefs[i].avType === 'phone') {
                        $scope.vm.gridOptions.columnDefs[i].cellTemplate = '<div class="ui-grid-cell-contents"><a style="text-decoration: underline;color: blue"  href="tel:{{ COL_FIELD }}" >{{ COL_FIELD }}</a></div>';
                    }
                    if ($scope.vm.gridOptions.columnDefs[i].avType === 'url') {
                        $scope.vm.gridOptions.columnDefs[i].cellTemplate = '<div class="ui-grid-cell-contents"><a style="text-decoration: underline;color: blue"  href="{{ COL_FIELD }}" >{{ COL_FIELD }}</a></div>';
                    }


                }
                $scope.vm.gridOptions = {
                    columnDefs: $scope.vm.gridOptions.columnDefs,
                    exporterPdfDefaultStyle: {fontSize: 9},
                    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
                    exporterCsvFilename: $scope.vm.gridOptions.excelfile,
                    exporterPdfHeader: {text: $scope.vm.gridOptions.PdfHeader.text, style: 'headerStyle'},
                    exporterPdfFooter: function (currentPage, pageCount) {
                        return {text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle'};
                    },
                    exporterPdfCustomFormatter: function (docDefinition) {
                        docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                        docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                        return docDefinition;
                    },
                    //exporterPdfOrientation: 'portrait',
                    exporterPdfPageSize: 'LETTER',
                    exporterPdfMaxGridWidth: 500,
                    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                    }
                }
                $scope.vm.editRow = avGridRowEditService.editRow;
                $scope.vm.deleteRow = avGridRowDeleteService.deleteRow;
                $scope.addRow = function () {
                    var service = {id: 0};
                    var rowTemp = {};
                    rowTemp.entity = service;
                    $scope.vm.editRow($scope, rowTemp);

                };
                $scope.vm.commonService.query().$promise.then(function (data) {
                    if (data[0].status == "404" || data[0].status == "500") {
                        $scope.vm.detailedErrorMessage = data[0].message;
                    } else {
                        $scope.vm.gridOptions.data = data;
                        $scope.vm.searchData = data;
                    }
                });

                $scope.refresh = function () {
                    $scope.vm.commonService.query().$promise.then(function (data) {
                        if (data[0].status == "404" || data[0].status == "500") {
                            $scope.vm.detailedErrorMessage = data[0].message;
                        } else {
                            $scope.vm.gridOptions.data = data;
                            $scope.vm.searchData = data;
                        }
                    });

                };
                var gridColName = $scope.vm.gridOptions.columnDefs;
                $scope.vm.searchGrid = function (searchTerm) {
                    $scope.vm.gridOptions.data = $filter('filter')($scope.vm.searchData, searchTerm, undefined);
                };
                //excel download
                $scope.excelDownload = function () {
                    $scope.gridApi.exporter.csvExport(uiGridExporterConstants.VISIBLE, uiGridExporterConstants.ALL);
                };

                //pdf download
                $scope.pdfDownload = function () {
                    $scope.gridApi.exporter.pdfExport(uiGridExporterConstants.VISIBLE, uiGridExporterConstants.ALL);
                };

            }
        }
    });

avGridRowEditService.$inject = ['$rootScope', '$modal', '$http'];
function avGridRowEditService($rootScope, $modal, $http) {
    var service = {};
    service.editRow = editRow;
    function editRow(grid, row) {
        $modal.open({
            templateUrl: 'js/directives/views/edit.html',
            /*controller: ['$scope', '$modalInstance', 'grid','row', '$http',avGridRowEditController],
            controllerAs: 'vm',*/
            controller:'avGridRowEditController as vm',
            resolve: {
                grid: function () {
                    return grid;
                },
                row: function () {
                    return row;
                }
            }
        });
    }

    return service;
}
function avGridRowEditController($scope, $modalInstance, grid, row, $http) {
    function getItemFromObject(obj, path) {
        var params = path.split('.');
        var newObj = obj;
        for (var param in params) {
            newObj = getPropertyFromObject(newObj, params[param]);
        }
        return newObj;
    }
    function getPropertyFromObject(obj, param) {
        if (obj.hasOwnProperty(param)) {
            return obj[param];
        }
        return obj;
    }
    var vm = this;
    vm.titleName = grid.vm.titleName;
    vm.schema = grid.vm.schema;
    vm.entity = angular.copy(row.entity);
    vm.form = grid.vm.form;
    if (grid.dependentEntities.length > 0) {
        for (var i = 0; i < vm.form.length; i++) {
            if (vm.form[i].avDependency === 'true') {
                var value = JSON.parse(grid.dependentEntities[i]);
                var param = vm.form[i].avDependencyField;
                var returnValue = getItemFromObject(vm.entity, param);
                for (var a in value) {
                    if (a == returnValue) {
                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                            if (grid.vm.gridOptions.columnDefs[j].avDependencyKeyId) {
                                var dependentId = grid.vm.gridOptions.columnDefs[j].avDependencyKeyId;
                                dependentId = dependentId.replace(/"/g, '');
                                if (dependentId == vm.form[i].key) {
                                    vm.entity[dependentId] = a;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    $scope.submitForm = function (form) {
        grid.detailedErrorMessage = "";
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            if (row.entity.id == 0) {
                grid.vm.commonService.create(vm.entity).$promise.then(function (data) {
                    if (grid.dependentEntities.length > 0) {
                        for (var i = 0; i < vm.form.length; i++) {
                            if (vm.form[i].avDependency === 'true') {
                                var value = JSON.parse(grid.dependentEntities[i]);
                                var param = vm.form[i].avDependencyField;
                                var returnValue = getItemFromObject(vm.entity, param);
                                for (var a in value) {
                                    if (a == returnValue) {
                                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                                            if (grid.vm.gridOptions.columnDefs[j].field) {
                                                var dependentName = grid.vm.gridOptions.columnDefs[j].field;
                                                createObject(vm.entity,dependentName);
                                                var objCount=1;
                                                function createObject(obj, path) {
                                                    var params = path.split('.');
                                                    var newObj = obj;
                                                    for (var param in params) {
                                                        newObj = bindProperty(newObj, params[param],params.length);
                                                    }
                                                    return newObj;
                                                }
                                                function bindProperty(obj, param,length) {
                                                       if(objCount == length)
                                                        {
                                                            return obj[param]=value[a];
                                                        }
                                                        else{
                                                           objCount++;
                                                            return obj[param]={};
                                                        }
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    row.entity.id = data.rows.insertId;
                    /* grid.gridOptions.data.push(row.entity);*/
                    grid.vm.searchData.push(row.entity);
                    grid.vm.successAddMessage = false;
                    grid.vm.detailedErrorMessage = "";
                    grid.vm.successUpdateMessage = true;
                    grid.vm.successDeleteMessage = true;
                    $modalInstance.close(row.entity);
                })
            }
            else {
                grid.vm.commonServiceById.update(vm.entity).$promise.then(function (data) {
                    if (grid.dependentEntities.length > 0) {
                        for (var i = 0; i < vm.form.length; i++) {
                            if (vm.form[i].avDependency === 'true') {
                                var value = JSON.parse(grid.dependentEntities[i]);
                                var param = vm.form[i].avDependencyField;
                                var returnValue = getItemFromObject(vm.entity, param);
                                for (var a in value) {
                                    if (a == returnValue) {
                                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                                            if (grid.vm.gridOptions.columnDefs[j].field) {
                                                var dependentName = grid.vm.gridOptions.columnDefs[j].field;
                                                createObject(vm.entity,dependentName);
                                                var objCount=1;
                                                function createObject(obj, path) {
                                                    var params = path.split('.');
                                                    var newObj = obj;
                                                    for (var param in params) {
                                                        newObj = bindProperty(newObj, params[param],params.length);
                                                    }
                                                    return newObj;
                                                }
                                                function bindProperty(obj, param,length) {
                                                    if(objCount == length)
                                                    {
                                                        return obj[param]=value[a];
                                                    }
                                                    else{
                                                        objCount++;
                                                        return obj[param]={};
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    var index = grid.vm.gridOptions.data.indexOf(row.entity);
                    row.grid.appScope.vm.searchData[index] = vm.entity;
                    $modalInstance.close(row.entity);
                    grid.vm.successUpdateMessage = false;
                    grid.vm.detailedErrorMessage = "";
                    grid.vm.successDeleteMessage = true;
                    grid.vm.successAddMessage = true;

                });
            }
        }

    }

}
avGridRowDeleteService.$inject = ['$rootScope', '$modal', '$http'];
function avGridRowDeleteService($rootScope, $modal, $http) {
    var service = {};
    service.deleteRow = deleteRow;

    function deleteRow(grid, row) {
        $modal.open({
            templateUrl: 'js/directives/views/delete.html',
            /*controller: ['$scope', '$modalInstance', 'grid', 'row', '$http', avGridRowDeleteController],
            controllerAs: 'vm',*/
            controller:'avGridRowDeleteController as vm',
            resolve: {
                grid: function () {
                    return grid;
                },
                row: function () {
                    return row;
                }
            }
        });
    }

    return service;
}
function avGridRowDeleteController($scope, $modalInstance, grid, row, $http) {
    var vm = this;
    /*vm.schema = grid.schema;*/
    vm.entity = angular.copy(row.entity);
    vm.remove = remove;
    function remove() {
        row.entity = angular.extend(row.entity, vm.entity);
        var index = grid.vm.gridOptions.data.indexOf(row.entity);
        grid.vm.commonServiceById.delete({id: vm.entity.id}).$promise.then(function (data) {
            grid.vm.gridOptions.data.splice(index, 1);
            grid.vm.successDeleteMessage = false;
            grid.vm.successUpdateMessage = true;
            grid.vm.successAddMessage = true;
            grid.vm.detailedErrorMessage = "";
            $modalInstance.close(row.entity);
        })
    }
}

/**
 * Created by RECRUITING2 on 5/25/2016.
 */
avatar.controller("testController", function($scope) {

    $("#mylink").hover(
        function(){
            $('#submenu').show();
        }, function(){
            setTimeout(function(){$('#submenu').hide();}, 1000);
        }
    );

});

/**
 * Created by RECRUITING2 on 5/27/2016.
 */

avatar
    /* .directive("tooltip",function(){
     return {
     restrict:'E',
     templateUrl:'views/avEmail.html',
     transclude: true,
     scope: {
     composeEmailto: '@avemail'
     },
     controller:function($scope,$modal,$cookieStore){
     $scope.popoverIsVisible=false;
     if ($cookieStore.get("avatarSession")) {
     var sessionData = $cookieStore.get("avatarSession");
     console.log(sessionData.data[0].profile.email);
     $scope.composeEmailfrom = sessionData.data[0].profile.email;
     };
     $scope.showOptionDetails=function(){
     $scope.popoverIsVisible=false;
     $scope.popoverIsVisible=true;
     setTimeout(function(){
     $scope.popoverIsVisible=false;
     },400);
     }
     $scope.Emailpopup=function(){
     console.log($scope);
     $modal.open({
     template:'<email-pop-up></email-pop-up>',
     size:'lg',
     scope:$scope


     });
     }
     }
     }

     })*/

    .directive('avEmail', function ($compile, $modal, $cookieStore) {
        return {
            restrict: 'A',
            replace: false,
            scope: true,
            link: function link(scope, element, attr) {
                element.attr('popover-placement', 'bottom');
                element.attr('popover-template', 'views/avEmail.html');
                element.attr('popover-trigger', 'mouseenter');
                element.removeAttr("av-email");
                $compile(element)(scope);
                scope.Emailpopup = function () {
                    var email;
                    if ($cookieStore.get("avatarSession")) {
                        var sessionData = $cookieStore.get("avatarSession");
                        console.log(sessionData.data[0].profile.email);
                        email = sessionData.data[0].profile.email;
                    };
                    scope.popup = {};
                    scope.popup.from = email;
                    scope.popup.to = attr.$$element[0].text;
                    $modal.open({
                        template: '<email-pop-up></email-pop-up>',
                        size: 'lg',
                        scope: scope


                    });
                }
            }
        }
    })
    .directive("emailPopUp", function () {
        return {
            restrict: 'E',
            templateUrl: 'views/Emailpopup.html',
            controller: function ($scope, $http) {
                //write functionality
                $scope.sendEmail = function () {
                    console.log($scope);
                    var jsondata = {
                        from: $scope.composeEmailfrom,
                        to: $scope.composeEmailto,
                        subject: $scope.composeEmailsubject,
                        content: $scope.composeEmailbody,
                        source: "",
                        contenttype: "text/plain"
                    }
                    $http.post("apiURL+'/api/v1/common/status", jsondata)
                        .success(function (data) {
                        });
                }

            }
        }
    })
/*.directive("myTooltipTemplate", function($compile){
 var contentContainer;
 return {
 restrict: "A",
 scope: {
 myTooltipScope: "="
 },
 link: function(scope, element, attrs){
 var templateUrl = attrs.myTooltipTemplate;

 scope.hidden = true;

 var tooltipElement = angular.element("<div ng-hide='hidden'>");
 tooltipElement.append("<div ng-include='\"" + templateUrl + "\"'></div>");

 element.parent().append(tooltipElement);
 element
 .on('mouseenter', function(){scope.hidden = false; scope.$digest();} )
 .on('mouseleave', function(){scope.hidden = true; scope.$digest();});

 var toolTipScope = scope.$new(true);
 angular.extend(toolTipScope, scope.myTooltipScope);
 $compile(tooltipElement.contents())(toolTipScope);
 $compile(tooltipElement)(scope);
 }
 };

 });*/



avatar
    .directive('avAddress', ['avAddressServiceById','avAddressService','avCityService','$localStorage','$http','$timeout','$rootScope','limitToFilter', function (avAddressServiceById,avAddressService,avCityService,$localStorage,$http,$timeout,$rootScope,limitToFilter) {

        return {
            restrict: 'E',
            templateUrl: 'views/avAddress.html',
            link:function(scope,element,attr){
                    /*scope.on('attr.id',function(){
                        console.log(attr.id);
                       /!* if(attr.id === 0 || attr.id == undefined  || attr.id == ''){
                            scope.addressInfoDisplay=false;
                            scope.addressInfoEditDisplay=true;
                        }else{
                            var jsonData={id:attr.id,type:"all"};
                            avAddressServiceById.show(jsonData).$promise.then(function (data) {
                                scope.address1 = data.address1;
                                scope.address2 = data.address2;
                                scope.city= data.city.cityname;
                                scope.zipcode = data.city.zipcode;
                                scope.country = data.country.short_name;
                                scope.region = data.city.region;
                                scope.countries.select=data.country.id;
                            }, function(error) {
                                console.log(error);
                            });
                        }*!/
                    });*/
                scope.updateAddressSuccess = true;
                scope.updateAddressError = true;
                scope.addressInfoDisplay = true;
                scope.countries=$localStorage.countryData;
                console.log(scope.countries);
                scope.$watch(function() {
                    console.log("attr.id"+attr.id);
                    console.log("attr.workaddressid"+attr.workaddressid);
                    return element.attr('id');
                }, function(newValue){
                    console.log("address");
                    console.log(newValue);
                    console.log(attr.id);
                    if(attr.id === 0|| attr.id === undefined || attr.id === ''){
                        console.log(scope);
                        scope.addressInfoDisplay = false;
                        $rootScope.editAddressInfoTest();
                    }

                    else{
                        if(newValue == attr.id)
                        {
                            var jsonData={id:attr.id,type:"all"};

                            avAddressServiceById.show(jsonData).$promise.then(function (data) {
                                console.log(data);
                                scope.address1 = data.address1;
                                scope.address2 = data.address2;
                                scope.city= data.city.cityname;
                                scope.cityid = data.city.id;
                                scope.zipcode = data.city.zipcode;
                                scope.country = data.country.short_name;
                                scope.region = data.city.region;
                                scope.countries.select=data.country.id;

                            }, function(error) {
                                console.log(error);
                            });
                        }
                    }


                });
                scope.cityData = function(cityName) {
                    var countryFullDate = scope.countries;
                    for(var count=0;count <countryFullDate.length;count++)
                    {
                        if(countryFullDate[count].id==scope.countries.select)
                        {
                            countryIso = countryFullDate[count].iso2;
                        }
                    }
                    return $http.jsonp("//gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter="+countryIso+"&q="+cityName).then(function(response){
                        var splitCities = response.data;
                        var splitCity = [];
                        for (var i=0;i<splitCities.length;i++){
                            splitCity.push(splitCities[i].split(",")[0]);
                        }
                        return limitToFilter(splitCity, 15);
                    });
                }, function(error) {
                    console.log(error);
                };
                scope.onSelect = function (getCity) {
                    scope.city = getCity;
                    avCityService.show({countryid:scope.countries.select,cityname:scope.city}).$promise.then(function(data){

                        scope.cityid = data[0].id;
                        scope.region=data[0].region;
                        scope.zipcode = data[0].zipcode;

                    });

                };
                scope.updateAddress = function () {
                    var jsonData = {
                        id:this.addressId,
                        address1: this.address1,
                        address2: this.address2,
                        cityid: this.cityid,
                        countryid: this.countries.select,
                        region:this.region
                    };
                    if(scope.addressId == 0 || scope.addressId == undefined || scope.addressId == ''){
                        scope.newCreatedAddressId = "";
                        avAddressService.create(jsonData).$promise.then(function (data) {
                            console.log(data);
                            scope.newCreatedAddressId = data.id;
                            scope.$emit('newAddressId',{message:scope.newCreatedAddressId});
                            scope.updateAddressSuccess = false;
                            $timeout( function(){
                                scope.updateAddressSuccess = true;
                                scope.basicGetAddress();

                            }, 3000);
                        }, function(error) {
                            console.log(error);
                            scope.updateAddressError = false;
                            $timeout( function(){
                                scope.updateAddressError = true;
                            }, 3000);
                        });
                    }else{
                        console.log(jsonData);
                        avAddressServiceById.update(jsonData).$promise.then(function (data) {
                            scope.updateAddressSuccess = false;
                            $timeout( function(){
                                scope.updateAddressSuccess = true;
                                scope.basicGetAddress();

                            }, 3000);
                        }, function(error) {
                            console.log(error);
                            scope.updateAddressError = false;
                            $timeout( function(){
                                scope.updateAddressError = true;
                            }, 3000);
                        });
                    }

                }
            }
           /* controller: function ($rootScope, $scope, $http,avCityServiceById, avAddressServiceById, avCityService,avCountryService,avAddressService,$location,limitToFilter,$localStorage,$timeout) {
                $scope.updateSuccess =true;
                $scope.updateError = true;
                $scope.countries=$localStorage.countryData;
                setTimeout(function(){
                    console.log($scope.addressId);
                    if($scope.addressId === 0 || $scope.addressId == undefined  || $scope.addressId== ''){
                        $scope.addressInfoDisplay=false;
                        $scope.addressInfoEditDisplay=true;
                    }else{
                        avAddressServiceById.show({id:$scope.addressId}).$promise.then(function (data) {
                            $scope.address1 = data.address1;
                            $scope.address2 = data.address2;
                            $scope.city= data.city.cityname;
                            $scope.zipcode = data.city.zipcode;
                            $scope.country = data.country.short_name;
                            $scope.region = data.city.region;
                            $scope.countries.select=data.country.id;
                            /!* for(var i=0;i<data.length;i++){
                             if(data[i].id == empId){
                             $scope.address1 = data[empId].address1;
                             $scope.address2 = data[empId].address2;
                             $scope.city= data[empId].city.cityname;
                             $scope.zipcode = data[empId].city.zipcode;
                             $scope.country = data[empId].country.short_name;
                             $scope.region = data[empId].city.region;
                             $scope.countries.select=data[empId].country.id;
                             }
                             }*!/

                        }, function(error) {
                            console.log(error);
                        });
                    }
                    var qs = $location.search();
                    var jsonData={city:qs.city,limit:qs.limit,id:$scope.addressId,type:"all"};

                },300);


                $scope.countryData= function(info){

                }
                $scope.cityData = function(cityName) {
                    var countryFullDate = $scope.countries;
                    for(var count=0;count <countryFullDate.length;count++)
                    {
                        if(countryFullDate[count].id==$scope.countries.select)
                        {
                            countryIso = countryFullDate[count].iso2;
                        }
                    }
                        return $http.jsonp("//gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter="+countryIso+"&q="+cityName).then(function(response){
                            var splitCities = response.data;
                            var splitCity = [];
                            for (var i=0;i<splitCities.length;i++){
                                splitCity.push(splitCities[i].split(",")[0]);
                            }
                            return limitToFilter(splitCity, 15);
                        });
                }, function(error) {
                    console.log(error);
                };
                $scope.onSelect = function (getCity) {
                    console.log($scope.countries.select);
                    console.log(getCity);
                    $scope.city = getCity;
                    avCityService.show({countryid:$scope.countries.select,cityname:$scope.city}).$promise.then(function(data){
                        $scope.cityid = data[0].id;
                        $scope.region=data[0].region;
                        $scope.zipcode = data[0].zipcode;

                    });

                };
                $scope.updateAddress = function () {
                    var jsonData = {
                        id:$scope.addressId,
                        address1: $scope.address1,
                        address2: $scope.address2,
                        cityid: $scope.cityid,
                        countryid: $scope.countries.select,
                        region:$scope.region
                    };
                    if($scope.addressId == 0 || $scope.addressId == undefined || $scope.addressId == ''){
                        console.log("posting...");
                    }else{
                        console.log(jsonData);
                        avAddressServiceById.update(jsonData).$promise.then(function (data) {
                            $scope.updateSuccess = false;
                            $timeout( function(){
                                $scope.updateSuccess = true;
                                console.log($scope);
                                $scope.basicGetAddress();

                            }, 3000);
                        }, function(error) {
                            console.log(error);
                            $scope.updateError = false;
                            $timeout( function(){
                                $scope.updateError = true;
                            }, 3000);
                        });
                    }

                }
            }*/

        }
    }]);
avatar
    .directive('avCompany', ['avCompanyService',function(){
        return {
            restrict: 'E',
            templateUrl: 'views/avCompany.html',
            controller: function ($scope, avCompanyServiceById,$stateParams,avCompanyService,$timeout) {
                $scope.updateCompanySuccess = true;
                $scope.updateCompanyError = true;
                console.log("$stateParams");
                console.log($stateParams.id);
               $scope.companyId = $stateParams.id;
                avCompanyServiceById.show({id: $scope.companyId}).$promise.then(function (data) {
                    console.log(data);
                    $scope.name = data.name;
                    $scope.email = data.email;
                    $scope.phone = data.phone;
                    $scope.url = data.url;
                    $scope.logo_url = data.logo_url;
                    $scope.fax=data.fax,
                    $scope.headquatersid=data.headquatersid,
                        $scope.hrcontactid=data.hrcontactid,
                        $scope.mgrcontactid=data.mgrcontactid,
                        $scope.secondaryaddressid=data.secondaryaddressid,
                        $scope.secondarycontactid=data.secondarycontactid,
                        $scope.facebook=data.facebook,
                        $scope.linkedin=data.linkedin,
                        $scope.twitter=data.twitter

                });
                $scope.updatecompanyPrimaryInfo = function () {
                    var jsonData = {
                        id:this.companyId,
                        name:this.name,
                        email:this.email,
                        phone:this.phone,
                        fax:this.fax,
                        url: this.url,
                        logo_url : this.logo_url,
                        headquatersid:this.headquatersid,
                        hrcontactid:this.hrcontactid,
                        mgrcontactid:this.mgrcontactid,
                        secondaryaddressid:this.secondaryaddressid,
                        secondarycontactid:this.secondarycontactid,
                        facebook:this.facebook,
                        linkedin:this.linkedin,
                        twitter:this.twitter
                    };
                    console.log(jsonData);
                    avCompanyServiceById.update(jsonData).$promise.then(function (data) {
                        $scope.updateCompanySuccess = false;
                        $timeout( function(){
                            $scope.updateCompanySuccess = true;
                            $scope.companyInfoEditdisplay = false;
                            $scope.primaryTitle = true;
                            $scope.companyInfodisplay = true;
                        }, 3000);
                    }, function(error) {
                        console.log(error);
                        $scope.updateCompanyError = false;
                        $timeout( function(){
                            $scope.updateCompanyError = true;
                        }, 3000);
                    });
                }
            }
        }
    }]);

avatar
    .directive('avContact', ['avContactService',function(){
        return {
            restrict: 'E',
            templateUrl: 'views/avContact.html',
            controller: function($rootScope, $scope, $stateParams,  avContactService,avContactServiceById,$timeout){
                $scope.updateContactSuccess =true;
                $scope.updateContactError = true;
                $scope.contactid = $stateParams.id;
                avContactServiceById.show({id:$scope.contactid}).$promise.then(function (data) {
                            $scope.secondaryContactId = data.secondarycontactid;
                            $scope.addressId = data.addressid;
                            $scope.firstName = data.firstname;
                                $scope.middleName = data.middlename;
                                $scope.lastName = data.lastname;
                                $scope.phoneNumber = data.phone;
                                $scope.emailAddress = data.email;
                                $scope.secEmailAddress = data.secondaryemail;
                                $scope.secondaryPhone = data.secondaryphone;
                                $scope.birthDay = data.dob;
                                $scope.workEmail = data.workemail;
                                $scope.workPhone = data.workphone;
                                $scope.workAddress = data.workaddress;
                                $scope.linkedin = data.linkedin;
                                $scope.skype = data.skype;
                                $scope.facebook = data.facebook;
                                $scope.twitter = data.twitter;

                    });
                    $scope.updatePrimaryInfo = function () {
                        var jsonData = {
                            id:this.contactid,
                            addressid:this.addressId,
                            firstname: this.firstName,
                            middlename: this.middleName,
                            lastname: this.lastName,
                            phone: this.phoneNumber,
                            email: this.emailAddress,
                            secondaryemail: this.secEmailAddress,
                            secondaryphone: this.secondaryPhone,
                            dob: this.birthDay,
                            workemail: this.workEmail,
                            workphone: this.workPhone,
                            workaddress: this.workAddress,
                            linkedin: this.linkedin,
                            skype: this.skype,
                            facebook: this.facebook,
                            twitter: this.twitter
                        };
                        avContactServiceById.update(jsonData).$promise.then(function (data) {
                            $scope.updateContactSuccess = false;
                            console.log($scope);
                            $timeout( function(){
                                $scope.updateContactSuccess = true;
                                $scope.primaryInfoEditDisplay = false;
                                $scope.primaryTitle = true;
                                $scope.primaryInfoDisplay = true;
                            }, 3000);
                        }, function(error) {
                            console.log(error);
                            $scope.updateContactError = false;
                            $timeout( function(){
                                $scope.updateContactError = true;
                            }, 3000);
                        });
                    }
                    /*$scope.updateSecondaryInfo = function(){
                        var jsonData = {
                            id:$scope.contactid,
                            addressid:$scope.addressId,
                            firstname: $scope.firstName,
                            middlename: $scope.middleName,
                            lastname: $scope.lastName,
                            phone: $scope.phoneNumber,
                            email: $scope.emailAddress,
                            secondaryemail: $scope.secEmailAddress,
                            secondaryphone: $scope.secondaryPhone,
                            dob: $scope.birthDay,
                            workemail: $scope.workEmail,
                            workphone: $scope.workPhone,
                            workaddress: $scope.workAddress,
                            linkedin: $scope.linkedin,
                            skype: $scope.skype,
                            facebook: $scope.facebook,
                            twitter: $scope.twitter
                        };
                        avContactServiceById.update(jsonData).$promise.then(function (data) {
                            $scope.updateSuccess = false;
                            $timeout( function(){
                                $scope.updateSuccess = true;
                                $scope.secondaryInfo();
                            }, 3000);
                        }, function(error) {
                            console.log(error);
                            $scope.updateError = false;
                            $timeout( function(){
                                $scope.updateError = true;
                            }, 3000);
                        });
                    }*/
            }
        }

    }]);
avatar
    .directive('avMiniContact', ['avContactServiceById',function(avContactServiceById){
        return {
            restrict: 'E',
            templateUrl: 'views/avMiniContact.html',
            link:function(scope,element,attr){
                scope.$watch(function() {
                    return element.attr('secondarycontactid');

                }, function(newValue){
                    console.log(newValue);
                    if(newValue == attr.secondarycontactid)
                    {
                        avContactServiceById.show({id:attr.secondarycontactid}).$promise.then(function (data) {
                            scope.miniFirstName= data.firstname;
                            scope.miniMiddleName = data.middlename;
                            scope.miniLastName = data.lastname;
                            scope.miniEmail = data.email;
                            scope.addressId = data.addressid;
                        },function(error){
                            console.log(error);
                        });
                    }
                    scope.updateMiniInfo= function(){
                        var jsonData = {
                            id:this.secondarycontactid,
                            firstname: this.miniFirstName,
                            middlename: this.miniMiddleName,
                            lastname: this.miniLastName,
                            email: this.miniEmail,
                            addressid:this.addressId
                        };
                        if(jsonData['id'] == 0|| jsonData['id']==undefined || jsonData['id'] == ''){
                            avContactService.create(jsonData).$promise.then(function (data) {
                                console.log(data);
                            });
                        }else{
                            avContactServiceById.update(jsonData).$promise.then(function (data) {
                                console.log(data);
                            });
                        }

                    }

                });
            }
           /*controller:function($scope,avContactServiceById){
               setTimeout(function(){
                   avContactServiceById.show({id:$scope.secondaryContactid}).$promise.then(function (data) {
                     console.log(data);
                       $scope.miniFirstName= data.firstname;
                       $scope.miniMiddleName = data.middlename;
                       $scope.miniLastName = data.lastname;
                       $scope.miniEmail = data.email;
                       $scope.addressId = data.addressid;
                   });
               },1000);

               $scope.updateMiniInfo= function(){
                   var jsonData = {
                       id:'',
                       firstname: this.miniFirstName,
                       middlename: this.miniMiddleName,
                       lastname: this.miniLastName,
                       email: this.miniEmail,
                       addressid:$scope.addressId
                   };
                   if(jsonData['id'] == ''){
                       avContactService.create(jsonData).$promise.then(function (data) {
                           console.log(data);
                       });
                   }else{
                       avContactServiceById.update(jsonData).$promise.then(function (data) {
                           console.log(data);
                       });
                   }

               }


           }*/
        }

    }]);

avatar

    // =========================================================================
    // CALENDAR WIDGET
    // =========================================================================

    .directive('fullCalendar', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.fullCalendar({
                    contentHeight: 'auto',
                    theme: true,
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },
                    defaultDate: '2014-06-12',
                    editable: true,
                    events: [
                        {
                            title: 'All Day',
                            start: '2014-06-01',
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Long Event',
                            start: '2014-06-07',
                            end: '2014-06-10',
                            className: 'bgm-orange'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-09',
                            className: 'bgm-lightgreen'
                        },
                        {
                            id: 999,
                            title: 'Repeat',
                            start: '2014-06-16',
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Meet',
                            start: '2014-06-12',
                            end: '2014-06-12',
                            className: 'bgm-teal'
                        },
                        {
                            title: 'Lunch',
                            start: '2014-06-12',
                            className: 'bgm-gray'
                        },
                        {
                            title: 'Birthday',
                            start: '2014-06-13',
                            className: 'bgm-pink'
                        },
                        {
                            title: 'Google',
                            url: 'http://google.com/',
                            start: '2014-06-28',
                            className: 'bgm-bluegray'
                        }
                    ]
                });
            }
        }
    })
    

    // =========================================================================
    // MAIN CALENDAR
    // =========================================================================

    .directive('calendar', function($compile){
        return {
            restrict: 'A',
            scope: {
                select: '&',
                actionLinks: '=',
            },
            link: function(scope, element, attrs) {
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                //Generate the Calendar
                element.fullCalendar({
                    header: {
                        right: '',
                        center: 'prev, title, next',
                        left: ''
                    },

                    theme: true, //Do not remove this as it ruin the design
                    selectable: true,
                    selectHelper: true,
                    editable: true,

                    //Add Events
                    events: [
                        {
                            title: 'Hangout with friends',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Meeting with client',
                            start: new Date(y, m, 10),
                            allDay: true,
                            className: 'bgm-red'
                        },
                        {
                            title: 'Repeat Event',
                            start: new Date(y, m, 18),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Semester Exam',
                            start: new Date(y, m, 20),
                            allDay: true,
                            className: 'bgm-green'
                        },
                        {
                            title: 'Soccor match',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 21),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                        {
                            title: 'IT Meeting',
                            start: new Date(y, m, 5),
                            allDay: true,
                            className: 'bgm-cyan'
                        },
                        {
                            title: 'Brunch at Beach',
                            start: new Date(y, m, 1),
                            allDay: true,
                            className: 'bgm-purple'
                        },
                        {
                            title: 'Live TV Show',
                            start: new Date(y, m, 15),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Software Conference',
                            start: new Date(y, m, 25),
                            allDay: true,
                            className: 'bgm-blue'
                        },
                        {
                            title: 'Coffee time',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-orange'
                        },
                        {
                            title: 'Job Interview',
                            start: new Date(y, m, 30),
                            allDay: true,
                            className: 'bgm-dark'
                        },
                    ],

                    //On Day Select
                    select: function(start, end, allDay) {
                        scope.select({
                            start: start, 
                            end: end
                        });
                    }
                });
                
                  
                //Add action links in calendar header
                element.find('.fc-toolbar').append($compile(scope.actionLinks)(scope));
            }
        }
    })
    

    //Change Calendar Views
    .directive('calendarView', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(){
                    $('#calendar').fullCalendar('changeView', attrs.calendarView);  
                })
            }
        }
    })


avatar
    
    // =========================================================================
    // Curved Line Chart 
    // =========================================================================

    .directive('curvedlineChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                
                /* Make some random data for the Chart*/

                var d1 = [];
                var d2 = [];
                var d3 = [];
                
                for (var i = 0; i <= 10; i += 1) {
                    d1.push([i, parseInt(Math.random() * 30)]);
                }
                
                for (var i = 0; i <= 20; i += 1) {
                    d2.push([i, parseInt(Math.random() * 30)]);
                }    
                
                for (var i = 0; i <= 10; i += 1) {
                    d3.push([i, parseInt(Math.random() * 30)]);
                }
    
                
                /* Chart Options */
    
                var options = {
                    series: {
                        shadowSize: 0,
                        curvedLines: { //This is a third party plugin to make curved lines
                            apply: true,
                            active: true,
                            monotonicFit: true
                        },
                        lines: {
                            show: false,
                            lineWidth: 0,
                        },
                    },
                    grid: {
                        borderWidth: 0,
                        labelMargin:10,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6,

                    },
                    xaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    yaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    legend: {
                        show: false
                    }
                };
    
                /* Let's create the chart */

                $.plot($(element), [
                    {data: d1, lines: { show: true, fill: 0.98 }, label: 'Product 1', stack: true, color: '#e3e3e3' },
                    {data: d3, lines: { show: true, fill: 0.98 }, label: 'Product 2', stack: true, color: '#f1dd2c' }
                ], options);

                /* Tooltips for Flot Charts */

                if ($(".flot-chart")[0]) {
                    $(".flot-chart").bind("plothover", function (event, pos, item) {
                        if (item) {
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
                        }
                        else {
                            $(".flot-tooltip").hide();
                        }
                    });

                    $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                }
            }
        }
    })

    
    // =========================================================================
    // Regular Line Charts
    // =========================================================================
    
    .directive('lineChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                
                /* Make some random data for Recent Items chart */

                var data = [];
                var totalPoints = 100;
                var updateInterval = 30;

                function getRandomData() {
                    if (data.length > 0)
                        data = data.slice(1);

                    while (data.length < totalPoints) {

                        var prev = data.length > 0 ? data[data.length - 1] : 50,
                            y = prev + Math.random() * 10 - 5;
                        if (y < 0) {
                            y = 0;
                        } else if (y > 90) {
                            y = 90;
                        }

                        data.push(y);
                    }

                    var res = [];
                    for (var i = 0; i < data.length; ++i) {
                        res.push([i, data[i]])
                    }

                    return res;
                }

                /* Make some random data for Flot Line Chart */

                var d1 = [];
                var d2 = [];
                var d3 = [];
                
                for (var i = 0; i <= 10; i += 1) {
                    d1.push([i, parseInt(Math.random() * 30)]);
                }
                
                for (var i = 0; i <= 20; i += 1) {
                    d2.push([i, parseInt(Math.random() * 30)]);
                }    
                
                for (var i = 0; i <= 10; i += 1) {
                    d3.push([i, parseInt(Math.random() * 30)]);
                }

                /* Chart Options */

                var options = {
                    series: {
                        shadowSize: 0,
                        lines: {
                            show: false,
                            lineWidth: 0,
                        },
                    },
                    grid: {
                        borderWidth: 0,
                        labelMargin:10,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6,

                    },
                    xaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    yaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    legend: {
                        show: false
                    }
                };

                /* Regular Line Chart */
                if ($("#line-chart")[0]) {
                    $.plot($("#line-chart"), [
                        {data: d1, lines: { show: true, fill: 0.98 }, label: 'Product 1', stack: true, color: '#e3e3e3' },
                        {data: d3, lines: { show: true, fill: 0.98 }, label: 'Product 2', stack: true, color: '#FFC107' }
                    ], options);
                }

                /* Recent Items Table Chart */
                if ($("#recent-items-chart")[0]) {
                    $.plot($("#recent-items-chart"), [
                        {data: getRandomData(), lines: { show: true, fill: 0.8 }, label: 'Items', stack: true, color: '#00BCD4' },
                    ], options);
                }
            }
        }
    })



    //-----------------------------------------------
    // BAR CHART
    //-----------------------------------------------

    .directive('barChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var data1 = [[1,60], [2,30], [3,50], [4,100], [5,10], [6,90], [7,85]];
                var data2 = [[1,20], [2,90], [3,60], [4,40], [5,100], [6,25], [7,65]];
                var data3 = [[1,100], [2,20], [3,60], [4,90], [5,80], [6,10], [7,5]];

                /* Create an Array push the data + Draw the bars*/

                var barData = new Array();

                barData.push({
                    data : data1,
                    label: 'Tokyo',
                    bars : {
                        show : true,
                        barWidth : 0.08,
                        order : 1,
                        lineWidth: 0,
                        fillColor: '#8BC34A'
                    }
                });

                barData.push({
                    data : data2,
                    label: 'Seoul',
                    bars : {
                        show : true,
                        barWidth : 0.08,
                        order : 2,
                        lineWidth: 0,
                        fillColor: '#00BCD4'
                    }
                });

                barData.push({
                    data : data3,
                    label: 'Beijing',
                    bars : {
                        show : true,
                        barWidth : 0.08,
                        order : 3,
                        lineWidth: 0,
                        fillColor: '#FF9800'
                    }
                });
                
                /* Let's create the chart */
                $.plot($(element), barData, {
                    grid : {
                            borderWidth: 1,
                            borderColor: '#eee',
                            show : true,
                            hoverable : true,
                            clickable : true
                    },

                    yaxis: {
                        tickColor: '#eee',
                        tickDecimals: 0,
                        font :{
                            lineHeight: 13,
                            style: "normal",
                            color: "#9f9f9f",
                        },
                        shadowSize: 0
                    },

                    xaxis: {
                        tickColor: '#fff',
                        tickDecimals: 0,
                        font :{
                            lineHeight: 13,
                            style: "normal",
                            color: "#9f9f9f"
                        },
                        shadowSize: 0,
                    },

                    legend:{
                        container: '.flc-bar',
                        backgroundOpacity: 0.5,
                        noColumns: 0,
                        backgroundColor: "white",
                        lineWidth: 0
                    }
                });
            }
        }
    })



    //-----------------------------------------------
    // DYNAMIC CHART
    //-----------------------------------------------

    .directive('dynamicChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
            
                /* Make some random data*/
    
                var data = [];
                var totalPoints = 300;
                var updateInterval = 30;

                function getRandomData() {
                    if (data.length > 0)
                        data = data.slice(1);

                    while (data.length < totalPoints) {

                        var prev = data.length > 0 ? data[data.length - 1] : 50,
                            y = prev + Math.random() * 10 - 5;
                        if (y < 0) {
                            y = 0;
                        } else if (y > 90) {
                            y = 90;
                        }

                        data.push(y);
                    }

                    var res = [];
                    for (var i = 0; i < data.length; ++i) {
                        res.push([i, data[i]])
                    }

                    return res;
                }

                /* Create Chart */

                var plot = $.plot(element, [ getRandomData() ], {
                    series: {
                        label: "Server Process Data",
                        lines: {
                            show: true,
                            lineWidth: 0.2,
                            fill: 0.6
                        },

                        color: '#00BCD4',
                        shadowSize: 0,
                    },
                    yaxis: {
                        min: 0,
                        max: 100,
                        tickColor: '#eee',
                        font :{
                            lineHeight: 13,
                            style: "normal",
                            color: "#9f9f9f",
                        },
                        shadowSize: 0,

                    },
                    xaxis: {
                        tickColor: '#eee',
                        show: true,
                        font :{
                            lineHeight: 13,
                            style: "normal",
                            color: "#9f9f9f",
                        },
                        shadowSize: 0,
                        min: 0,
                        max: 250
                    },
                    grid: {
                        borderWidth: 1,
                        borderColor: '#eee',
                        labelMargin:10,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6,
                    },
                    legend:{
                        container: '.flc-dynamic',
                        backgroundOpacity: 0.5,
                        noColumns: 0,
                        backgroundColor: "white",
                        lineWidth: 0
                    }
                });

                /* Update */    
                function update() {
                    plot.setData([getRandomData()]);
                    // Since the axes don't change, we don't need to call plot.setupGrid()

                    plot.draw();
                    setTimeout(update, updateInterval);
                }
                update();
            }
        }
    })


    //-----------------------------------------------
    // PIE AND DONUT
    //-----------------------------------------------

    .directive('pieDonut', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var pieData = [
                    {data: 1, color: '#F44336', label: 'Toyota'},
                    {data: 2, color: '#03A9F4', label: 'Nissan'},
                    {data: 3, color: '#8BC34A', label: 'Hyundai'},
                    {data: 4, color: '#FFEB3B', label: 'Scion'},
                    {data: 4, color: '#009688', label: 'Daihatsu'},
                ];

                /* Pie Chart */

                if($('#pie-chart')[0]){
                    $.plot('#pie-chart', pieData, {
                        series: {
                            pie: {
                                show: true,
                                stroke: { 
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-pie',
                            backgroundOpacity: 0.5,
                            noColumns: 0,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }

                    });
                }

                /* Donut Chart */

                if($('#donut-chart')[0]){
                    $.plot('#donut-chart', pieData, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: { 
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-donut',
                            backgroundOpacity: 0.5,
                            noColumns: 0,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }

                    });
                }
            }
        }
    })


    
    

avatar

    // =========================================================================
    // SPARKLINE CHARTS
    // =========================================================================
    
    //Bar Chart

    .directive('sparklineBar', function(){

        return {
            restrict: 'A',
            link: function(scope, element) {
                function sparkLineBar(selector, values, height, barWidth, barColor, barSpacing) {
                   $(selector).sparkline(values, {
                        type: 'bar',
                        height: height,
                        barWidth: barWidth,
                        barColor: barColor,
                        barSpacing: barSpacing
                   });
                }
                
                sparkLineBar('.stats-bar', [6,4,8,6,5,6,7,8,3,5,9,5,8,4,3,6,8], '45px', 3, '#fff', 2);
                sparkLineBar('.stats-bar-2', [4,7,6,2,5,3,8,6,6,4,8,6,5,8,2,4,6], '45px', 3, '#fff', 2);
            }
        }
    })
    

    //Line Chart

    .directive('sparklineLine', function(){

        return {
            restrict: 'A',
            link: function(scope, element) {
                function sparkLineLine(selector, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
                    $(selector).sparkline(values, {
                        type: 'line',
                        width: width,
                        height: height,
                        lineColor: lineColor,
                        fillColor: fillColor,
                        lineWidth: lineWidth,
                        maxSpotColor: maxSpotColor,
                        minSpotColor: minSpotColor,
                        spotColor: spotColor,
                        spotRadius: spotRadius,
                        highlightSpotColor: hSpotColor,
                        highlightLineColor: hLineColor
                    });
                }

                sparkLineLine('.stats-line', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
                sparkLineLine('.stats-line-2', [5,6,3,9,7,5,4,6,5,6,4,9], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
                sparkLineLine('.dash-widget-visits', [9,4,6,5,6,4,5,7,9,3,6,5], '100%', '95px', 'rgba(255,255,255,0.7)', 'rgba(0,0,0,0)', 2, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 5, 'rgba(255,255,255,0.4)', '#fff');

            }
        }
    })

    
    // Pie Charts

    .directive('sparklinePie', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function sparklinePie(select, values, width, height, sliceColors) {
                    $(select).sparkline(values, {
                        type: 'pie',
                        width: width,
                        height: height,
                        sliceColors: sliceColors,
                        offset: 0,
                        borderWidth: 0
                    });
                }   
                
                if ($('.stats-pie')[0]) {
                    sparklinePie('.stats-pie', [20, 35, 30, 5], 45, 45, ['#fff', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']);
                }
            }
        }
    })



    // =========================================================================
    // EASY PIE CHARTS
    // =========================================================================
    
    .directive('easypieChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                function easyPieChart(selector, trackColor, scaleColor, barColor, lineWidth, lineCap, size) {
                    $(selector).easyPieChart({
                        trackColor: trackColor,
                        scaleColor: scaleColor,
                        barColor: barColor,
                        lineWidth: lineWidth,
                        lineCap: lineCap,
                        size: size
                    });
                }

                easyPieChart('.main-pie', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.7)', 7, 'butt', 148);
                easyPieChart('.sub-pie-1', '#eee', '#ccc', '#2196F3', 4, 'butt', 95);
                easyPieChart('.sub-pie-2', '#eee', '#ccc', '#FFC107', 4, 'butt', 95);
            }
        }
    })
avatar

    // =========================================================================
    // WEATHER WIDGET
    // =========================================================================

    .directive('weatherWidget', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                $.simpleWeather({
                    location: 'Austin, TX',
                    woeid: '',
                    unit: 'f',
                    success: function(weather) {
                        html = '<div class="weather-status">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
                        html += '<ul class="weather-info"><li>'+weather.city+', '+weather.region+'</li>';
                        html += '<li class="currently">'+weather.currently+'</li></ul>';
                        html += '<div class="weather-icon wi-'+weather.code+'"></div>';
                        html += '<div class="dash-widget-footer"><div class="weather-list tomorrow">';
                        html += '<span class="weather-list-icon wi-'+weather.forecast[2].code+'"></span><span>'+weather.forecast[1].high+'/'+weather.forecast[1].low+'</span><span>'+weather.forecast[1].text+'</span>';
                        html += '</div>';
                        html += '<div class="weather-list after-tomorrow">';
                        html += '<span class="weather-list-icon wi-'+weather.forecast[2].code+'"></span><span>'+weather.forecast[2].high+'/'+weather.forecast[2].low+'</span><span>'+weather.forecast[2].text+'</span>';
                        html += '</div></div>';
                        $("#weather-widget").html(html);
                    },
                    error: function(error) {
                        $("#weather-widget").html('<p>'+error+'</p>');
                    }
                });
            }
        }
        
    })



    // =========================================================================
    // SWEATALERT
    // =========================================================================

    //Basic
    .directive('swalBasic', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Here's a message!");
                });
            }
        }
    })
    
    //A title with a text under
    .directive('swalText', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")

                });
            }
        }
    })

    //Success Message
    .directive('swalSuccess', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")

                });
            }
        }
    })

    //Warning Message
    .directive('swalWarning', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Are you sure?",   
                        text: "You will not be able to recover this imaginary file!",   
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Yes, delete it!",   
                        closeOnConfirm: false 
                    }, function(){   
                        swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
                    });
                });
            }
        }
    })

    //Parameter
    .directive('swalParams', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Are you sure?",   
                        text: "You will not be able to recover this imaginary file!",   
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "Yes, delete it!",   
                        cancelButtonText: "No, cancel plx!",   
                        closeOnConfirm: false,   
                        closeOnCancel: false 
                    }, function(isConfirm){   
                        if (isConfirm) {     
                            swal("Deleted!", "Your imaginary file has been deleted.", "success");   
                        } else {     
                            swal("Cancelled", "Your imaginary file is safe :)", "error");   
                        } 
                    });
                });
            }
        }
    })

    //Custom Image
    .directive('swalImg', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    swal({   
                        title: "Sweet!",   
                        text: "Here's a custom image.",   
                        imageUrl: "img/thumbs-up.png" 
                    });
                });
            }
        }
    })
            
    //Auto Close Timer
    .directive('swalTimer', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                     swal({   
                        title: "Auto close alert!",   
                        text: "I will close in 2 seconds.",   
                        timer: 2000,   
                        showConfirmButton: false 
                    });
                });
            }
        }
    })

    

    // =========================================================================
    // GROWL
    // =========================================================================

    .directive('growlDemo', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                function notify(from, align, icon, type, animIn, animOut){
                    $.growl({
                        icon: icon,
                        title: ' Bootstrap Growl ',
                        message: 'Turning standard Bootstrap alerts into awesome notifications',
                        url: ''
                    },{
                            element: 'body',
                            type: type,
                            allow_dismiss: true,
                            placement: {
                                    from: from,
                                    align: align
                            },
                            offset: {
                                x: 20,
                                y: 85
                            },
                            spacing: 10,
                            z_index: 1031,
                            delay: 2500,
                            timer: 1000,
                            url_target: '_blank',
                            mouse_over: false,
                            animate: {
                                    enter: animIn,
                                    exit: animOut
                            },
                            icon_type: 'class',
                            template: '<div data-growl="container" class="alert" role="alert">' +
                                            '<button type="button" class="close" data-growl="dismiss">' +
                                                '<span aria-hidden="true">&times;</span>' +
                                                '<span class="sr-only">Close</span>' +
                                            '</button>' +
                                            '<span data-growl="icon"></span>' +
                                            '<span data-growl="title"></span>' +
                                            '<span data-growl="message"></span>' +
                                            '<a href="#" data-growl="url"></a>' +
                                        '</div>'
                    });
                }
                
                element.on('click', function(e){
                    e.preventDefault();
                    
                    var nFrom = attrs.from;
                    var nAlign = attrs.align;
                    var nIcons = attrs.icon;
                    var nType = attrs.type;
                    var nAnimIn = attrs.animationIn;
                    var nAnimOut = attrs.animationOut;

                    notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
            
                })
                
                
            }
        }
    })







    
avatar

    // =========================================================================
    // INPUT FEILDS MODIFICATION
    // =========================================================================

    //Add blue animated border and remove with condition when focus and blur

    .directive('fgLine', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if($('.fg-line')[0]) {
                    $('body').on('focus', '.form-control', function(){
                        $(this).closest('.fg-line').addClass('fg-toggled');
                    })

                    $('body').on('blur', '.form-control', function(){
                        var p = $(this).closest('.form-group');
                        var i = p.find('.form-control').val();

                        if (p.hasClass('fg-float')) {
                            if (i.length == 0) {
                                $(this).closest('.fg-line').removeClass('fg-toggled');
                            }
                        }
                        else {
                            $(this).closest('.fg-line').removeClass('fg-toggled');
                        }
                    });
                }
    
            }
        }
        
    })

    

    // =========================================================================
    // AUTO SIZE TEXTAREA
    // =========================================================================
    
    .directive('autoSize', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                if (element[0]) {
                   autosize(element);
                }
            }
        }
    })
    

    // =========================================================================
    // BOOTSTRAP SELECT
    // =========================================================================

    .directive('selectPicker', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //if (element[0]) {
                    element.selectpicker();
                //}
            }
        }
    })
    

    // =========================================================================
    // INPUT MASK
    // =========================================================================

    .directive('inputMask', function(){
        return {
            restrict: 'A',
            scope: {
              inputMask: '='
            },
            link: function(scope, element){
                element.mask(scope.inputMask.mask);
            }
        }
    })

    
    // =========================================================================
    // COLOR PICKER
    // =========================================================================

    .directive('colordPicker', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).each(function(){
                    var colorOutput = $(this).closest('.cp-container').find('.cp-value');
                    $(this).farbtastic(colorOutput);
                });
                
            }
        }
    })



    // =========================================================================
    // PLACEHOLDER FOR IE 9 (on .form-control class)
    // =========================================================================

    .directive('formControl', function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs) {
                if(angular.element('html').hasClass('ie9')) {
                    $('input, textarea').placeholder({
                        customClass: 'ie9-placeholder'
                    });
                }
            }
            
        }
    })

avatar

    // =========================================================================
    // MEDIA ELEMENT
    // =========================================================================
    
    .directive('mediaElement', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.mediaelementplayer();
            }
        }
        
    })


    // =========================================================================
    // LIGHTBOX
    // =========================================================================
    
    .directive('lightbox', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.lightGallery({
                    enableTouch: true
                }); 
            }
        }
        
    })
/*!
 * Date picker for pickadate.js v3.5.6
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function ( factory ) {

    // AMD.
    if ( typeof define == 'function' && define.amd )
        define( ['picker', 'jquery'], factory )

    // Node.js/browserify.
    else if ( typeof exports == 'object' )
        module.exports = factory( require('./picker.js'), require('jquery') )

    // Browser globals.
    else factory( Picker, jQuery )

}(function( Picker, $ ) {


    /**
     * Globals and constants
     */
    var DAYS_IN_WEEK = 7,
        WEEKS_IN_CALENDAR = 6,
        _ = Picker._



    /**
     * The date picker constructor
     */
    function DatePicker( picker, settings ) {

        var calendar = this,
            element = picker.$node[ 0 ],
            elementValue = element.value,
            elementDataValue = picker.$node.data( 'value' ),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format,
            isRTL = function() {

                return element.currentStyle ?

                    // For IE.
                element.currentStyle.direction == 'rtl' :

                    // For normal browsers.
                getComputedStyle( picker.$root[0] ).direction == 'rtl'
            }

        calendar.settings = settings
        calendar.$node = picker.$node

        // The queue of methods that will be used to build item objects.
        calendar.queue = {
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse navigate create validate',
            view: 'parse create validate viewset',
            disable: 'deactivate',
            enable: 'activate'
        }

        // The component's item object.
        calendar.item = {}

        calendar.item.clear = null
        calendar.item.disable = ( settings.disable || [] ).slice( 0 )
        calendar.item.enable = -(function( collectionDisabled ) {
            return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1
        })( calendar.item.disable )

        calendar.
            set( 'min', settings.min ).
            set( 'max', settings.max ).
            set( 'now' )

        // When there�s a value, set the `select`, which in turn
        // also sets the `highlight` and `view`.
        if ( valueString ) {
            calendar.set( 'select', valueString, {
                format: formatString,
                defaultValue: true
            })
        }

        // If there�s no value, default to highlighting �today�.
        else {
            calendar.
                set( 'select', null ).
                set( 'highlight', calendar.item.now )
        }


        // The keycode to movement mapping.
        calendar.key = {
            40: 7, // Down
            38: -7, // Up
            39: function() { return isRTL() ? -1 : 1 }, // Right
            37: function() { return isRTL() ? 1 : -1 }, // Left
            go: function( timeChange ) {
                var highlightedObject = calendar.item.highlight,
                    targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
                calendar.set(
                    'highlight',
                    targetDate,
                    { interval: timeChange }
                )
                this.render()
            }
        }


        // Bind some picker events.
        picker.
            on( 'render', function() {
                picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {
                    var value = this.value
                    if ( value ) {
                        picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )
                        picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )
                    }
                })
                picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {
                    var value = this.value
                    if ( value ) {
                        picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )
                        picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )
                    }
                })
            }, 1 ).
            on( 'open', function() {
                var includeToday = ''
                if ( calendar.disabled( calendar.get('now') ) ) {
                    includeToday = ':not(.' + settings.klass.buttonToday + ')'
                }
                picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )
            }, 1 ).
            on( 'close', function() {
                picker.$root.find( 'button, select' ).attr( 'disabled', true )
            }, 1 )

    } //DatePicker


    /**
     * Set a datepicker item object.
     */
    DatePicker.prototype.set = function( type, value, options ) {

        var calendar = this,
            calendarItem = calendar.item

        // If the value is `null` just set it immediately.
        if ( value === null ) {
            if ( type == 'clear' ) type = 'select'
            calendarItem[ type ] = value
            return calendar
        }

        // Otherwise go through the queue of methods, and invoke the functions.
        // Update this as the time unit, and set the final value as this item.
        // * In the case of `enable`, keep the queue but set `disable` instead.
        //   And in the case of `flip`, keep the queue but set `enable` instead.
        calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
            value = calendar[ method ]( type, value, options )
            return value
        }).pop()

        // Check if we need to cascade through more updates.
        if ( type == 'select' ) {
            calendar.set( 'highlight', calendarItem.select, options )
        }
        else if ( type == 'highlight' ) {
            calendar.set( 'view', calendarItem.highlight, options )
        }
        else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {
            if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {
                calendar.set( 'select', calendarItem.select, options )
            }
            if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {
                calendar.set( 'highlight', calendarItem.highlight, options )
            }
        }

        return calendar
    } //DatePicker.prototype.set


    /**
     * Get a datepicker item object.
     */
    DatePicker.prototype.get = function( type ) {
        return this.item[ type ]
    } //DatePicker.prototype.get


    /**
     * Create a picker date object.
     */
    DatePicker.prototype.create = function( type, value, options ) {

        var isInfiniteValue,
            calendar = this

        // If there�s no value, use the type as the value.
        value = value === undefined ? type : value


        // If it�s infinity, update the value.
        if ( value == -Infinity || value == Infinity ) {
            isInfiniteValue = value
        }

        // If it�s an object, use the native date object.
        else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {
            value = value.obj
        }

        // If it�s an array, convert it into a date and make sure
        // that it�s a valid date � otherwise default to today.
        else if ( $.isArray( value ) ) {
            value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )
            value = _.isDate( value ) ? value : calendar.create().obj
        }

        // If it�s a number or date object, make a normalized date.
        else if ( _.isInteger( value ) || _.isDate( value ) ) {
            value = calendar.normalize( new Date( value ), options )
        }

        // If it�s a literal true or any other case, set it to now.
        else /*if ( value === true )*/ {
            value = calendar.now( type, value, options )
        }

        // Return the compiled object.
        return {
            year: isInfiniteValue || value.getFullYear(),
            month: isInfiniteValue || value.getMonth(),
            date: isInfiniteValue || value.getDate(),
            day: isInfiniteValue || value.getDay(),
            obj: isInfiniteValue || value,
            pick: isInfiniteValue || value.getTime()
        }
    } //DatePicker.prototype.create


    /**
     * Create a range limit object using an array, date object,
     * literal �true�, or integer relative to another time.
     */
    DatePicker.prototype.createRange = function( from, to ) {

        var calendar = this,
            createDate = function( date ) {
                if ( date === true || $.isArray( date ) || _.isDate( date ) ) {
                    return calendar.create( date )
                }
                return date
            }

        // Create objects if possible.
        if ( !_.isInteger( from ) ) {
            from = createDate( from )
        }
        if ( !_.isInteger( to ) ) {
            to = createDate( to )
        }

        // Create relative dates.
        if ( _.isInteger( from ) && $.isPlainObject( to ) ) {
            from = [ to.year, to.month, to.date + from ];
        }
        else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {
            to = [ from.year, from.month, from.date + to ];
        }

        return {
            from: createDate( from ),
            to: createDate( to )
        }
    } //DatePicker.prototype.createRange


    /**
     * Check if a date unit falls within a date range object.
     */
    DatePicker.prototype.withinRange = function( range, dateUnit ) {
        range = this.createRange(range.from, range.to)
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
    }


    /**
     * Check if two date range objects overlap.
     */
    DatePicker.prototype.overlapRanges = function( one, two ) {

        var calendar = this

        // Convert the ranges into comparable dates.
        one = calendar.createRange( one.from, one.to )
        two = calendar.createRange( two.from, two.to )

        return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||
            calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )
    }


    /**
     * Get the date today.
     */
    DatePicker.prototype.now = function( type, value, options ) {
        value = new Date()
        if ( options && options.rel ) {
            value.setDate( value.getDate() + options.rel )
        }
        return this.normalize( value, options )
    }


    /**
     * Navigate to next/prev month.
     */
    DatePicker.prototype.navigate = function( type, value, options ) {

        var targetDateObject,
            targetYear,
            targetMonth,
            targetDate,
            isTargetArray = $.isArray( value ),
            isTargetObject = $.isPlainObject( value ),
            viewsetObject = this.item.view/*,
         safety = 100*/


        if ( isTargetArray || isTargetObject ) {

            if ( isTargetObject ) {
                targetYear = value.year
                targetMonth = value.month
                targetDate = value.date
            }
            else {
                targetYear = +value[0]
                targetMonth = +value[1]
                targetDate = +value[2]
            }

            // If we�re navigating months but the view is in a different
            // month, navigate to the view�s year and month.
            if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {
                targetYear = viewsetObject.year
                targetMonth = viewsetObject.month
            }

            // Figure out the expected target year and month.
            targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )
            targetYear = targetDateObject.getFullYear()
            targetMonth = targetDateObject.getMonth()

            // If the month we�re going to doesn�t have enough days,
            // keep decreasing the date until we reach the month�s last date.
            while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {
                targetDate -= 1
                /*safety -= 1
                 if ( !safety ) {
                 throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
                 }*/
            }

            value = [ targetYear, targetMonth, targetDate ]
        }

        return value
    } //DatePicker.prototype.navigate


    /**
     * Normalize a date by setting the hours to midnight.
     */
    DatePicker.prototype.normalize = function( value/*, options*/ ) {
        value.setHours( 0, 0, 0, 0 )
        return value
    }


    /**
     * Measure the range of dates.
     */
    DatePicker.prototype.measure = function( type, value/*, options*/ ) {

        var calendar = this

        // If it�s anything false-y, remove the limits.
        if ( !value ) {
            value = type == 'min' ? -Infinity : Infinity
        }

        // If it�s a string, parse it.
        else if ( typeof value == 'string' ) {
            value = calendar.parse( type, value )
        }

        // If it's an integer, get a date relative to today.
        else if ( _.isInteger( value ) ) {
            value = calendar.now( type, value, { rel: value } )
        }

        return value
    } ///DatePicker.prototype.measure


    /**
     * Create a viewset object based on navigation.
     */
    DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {
        return this.create([ dateObject.year, dateObject.month, 1 ])
    }


    /**
     * Validate a date as enabled and shift if needed.
     */
    DatePicker.prototype.validate = function( type, dateObject, options ) {

        var calendar = this,

        // Keep a reference to the original date.
            originalDateObject = dateObject,

        // Make sure we have an interval.
            interval = options && options.interval ? options.interval : 1,

        // Check if the calendar enabled dates are inverted.
            isFlippedBase = calendar.item.enable === -1,

        // Check if we have any enabled dates after/before now.
            hasEnabledBeforeTarget, hasEnabledAfterTarget,

        // The min & max limits.
            minLimitObject = calendar.item.min,
            maxLimitObject = calendar.item.max,

        // Check if we�ve reached the limit during shifting.
            reachedMin, reachedMax,

        // Check if the calendar is inverted and at least one weekday is enabled.
            hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {

                    // If there�s a date, check where it is relative to the target.
                    if ( $.isArray( value ) ) {
                        var dateTime = calendar.create( value ).pick
                        if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true
                        else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true
                    }

                    // Return only integers for enabled weekdays.
                    return _.isInteger( value )
                }).length/*,

         safety = 100*/



        // Cases to validate for:
        // [1] Not inverted and date disabled.
        // [2] Inverted and some dates enabled.
        // [3] Not inverted and out of range.
        //
        // Cases to **not** validate for:
        // � Navigating months.
        // � Not inverted and date enabled.
        // � Inverted and all dates disabled.
        // � ..and anything else.
        if ( !options || (!options.nav && !options.defaultValue) ) if (
            /* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||
            /* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
            /* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
        ) {


            // When inverted, flip the direction if there aren�t any enabled weekdays
            // and there are no enabled dates in the direction of the interval.
            if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
                interval *= -1
            }


            // Keep looping until we reach an enabled date.
            while ( /*safety &&*/ calendar.disabled( dateObject ) ) {

                /*safety -= 1
                 if ( !safety ) {
                 throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
                 }*/


                // If we�ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
                if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
                    dateObject = originalDateObject
                    interval = interval > 0 ? 1 : -1
                }


                // If we�ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
                if ( dateObject.pick <= minLimitObject.pick ) {
                    reachedMin = true
                    interval = 1
                    dateObject = calendar.create([
                        minLimitObject.year,
                        minLimitObject.month,
                        minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
                    ])
                }
                else if ( dateObject.pick >= maxLimitObject.pick ) {
                    reachedMax = true
                    interval = -1
                    dateObject = calendar.create([
                        maxLimitObject.year,
                        maxLimitObject.month,
                        maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
                    ])
                }


                // If we�ve reached both limits, just break out of the loop.
                if ( reachedMin && reachedMax ) {
                    break
                }


                // Finally, create the shifted date using the interval and keep looping.
                dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])
            }

        } //endif


        // Return the date object settled on.
        return dateObject
    } //DatePicker.prototype.validate


    /**
     * Check if a date is disabled.
     */
    DatePicker.prototype.disabled = function( dateToVerify ) {

        var
            calendar = this,

        // Filter through the disabled dates to check if this is one.
            isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {

                // If the date is a number, match the weekday with 0index and `firstDay` check.
                if ( _.isInteger( dateToDisable ) ) {
                    return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7
                }

                // If it�s an array or a native JS date, create and match the exact date.
                if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {
                    return dateToVerify.pick === calendar.create( dateToDisable ).pick
                }

                // If it�s an object, match a date within the �from� and �to� range.
                if ( $.isPlainObject( dateToDisable ) ) {
                    return calendar.withinRange( dateToDisable, dateToVerify )
                }
            })

        // If this date matches a disabled date, confirm it�s not inverted.
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {
                return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||
                    $.isPlainObject( dateToDisable ) && dateToDisable.inverted
            }).length

        // Check the calendar �enabled� flag and respectively flip the
        // disabled state. Then also check if it�s beyond the min/max limits.
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
        dateToVerify.pick < calendar.item.min.pick ||
        dateToVerify.pick > calendar.item.max.pick

    } //DatePicker.prototype.disabled


    /**
     * Parse a string into a usable type.
     */
    DatePicker.prototype.parse = function( type, value, options ) {

        var calendar = this,
            parsingObject = {}

        // If it�s already parsed, we�re good.
        if ( !value || typeof value != 'string' ) {
            return value
        }

        // We need a `.format` to parse the value with.
        if ( !( options && options.format ) ) {
            options = options || {}
            options.format = calendar.settings.format
        }

        // Convert the format into an array and then map through it.
        calendar.formats.toArray( options.format ).map( function( label ) {

            var
            // Grab the formatting label.
                formattingLabel = calendar.formats[ label ],

            // The format length is from the formatting label function or the
            // label length without the escaping exclamation (!) mark.
                formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length

            // If there's a format label, split the value up to the format length.
            // Then add it to the parsing object with appropriate label.
            if ( formattingLabel ) {
                parsingObject[ label ] = value.substr( 0, formatLength )
            }

            // Update the value as the substring from format length to end.
            value = value.substr( formatLength )
        })

        // Compensate for month 0index.
        return [
            parsingObject.yyyy || parsingObject.yy,
            +( parsingObject.mm || parsingObject.m ) - 1,
            parsingObject.dd || parsingObject.d
        ]
    } //DatePicker.prototype.parse


    /**
     * Various formats to display the object in.
     */
    DatePicker.prototype.formats = (function() {

        // Return the length of the first word in a collection.
        function getWordLengthFromCollection( string, collection, dateObject ) {

            // Grab the first word from the string.
            // Regex pattern from http://stackoverflow.com/q/150033
            var word = string.match( /[^\x00-\x7F]+|\w+/ )[ 0 ]

            // If there's no month index, add it to the date object
            if ( !dateObject.mm && !dateObject.m ) {
                dateObject.m = collection.indexOf( word ) + 1
            }

            // Return the length of the word.
            return word.length
        }

        // Get the length of the first word in a string.
        function getFirstWordLength( string ) {
            return string.match( /\w+/ )[ 0 ].length
        }

        return {

            d: function( string, dateObject ) {

                // If there's string, then get the digits length.
                // Otherwise return the selected date.
                return string ? _.digits( string ) : dateObject.date
            },
            dd: function( string, dateObject ) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected date with a leading zero.
                return string ? 2 : _.lead( dateObject.date )
            },
            ddd: function( string, dateObject ) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the short selected weekday.
                return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]
            },
            dddd: function( string, dateObject ) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the full selected weekday.
                return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]
            },
            m: function( string, dateObject ) {

                // If there's a string, then get the length of the digits
                // Otherwise return the selected month with 0index compensation.
                return string ? _.digits( string ) : dateObject.month + 1
            },
            mm: function( string, dateObject ) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected month with 0index and leading zero.
                return string ? 2 : _.lead( dateObject.month + 1 )
            },
            mmm: function( string, dateObject ) {

                var collection = this.settings.monthsShort

                // If there's a string, get length of the relevant month from the short
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
            },
            mmmm: function( string, dateObject ) {

                var collection = this.settings.monthsFull

                // If there's a string, get length of the relevant month from the full
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
            },
            yy: function( string, dateObject ) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected year by slicing out the first 2 digits.
                return string ? 2 : ( '' + dateObject.year ).slice( 2 )
            },
            yyyy: function( string, dateObject ) {

                // If there's a string, then the length is always 4.
                // Otherwise return the selected year.
                return string ? 4 : dateObject.year
            },

            // Create an array by splitting the formatting string passed.
            toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },

            // Format an object into a string using the formatting options.
            toString: function ( formatString, itemObject ) {
                var calendar = this
                return calendar.formats.toArray( formatString ).map( function( label ) {
                    return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
                }).join( '' )
            }
        }
    })() //DatePicker.prototype.formats




    /**
     * Check if two date units are the exact.
     */
    DatePicker.prototype.isDateExact = function( one, two ) {

        var calendar = this

        // When we�re working with weekdays, do a direct comparison.
        if (
            ( _.isInteger( one ) && _.isInteger( two ) ) ||
            ( typeof one == 'boolean' && typeof two == 'boolean' )
        ) {
            return one === two
        }

        // When we�re working with date representations, compare the �pick� value.
        if (
            ( _.isDate( one ) || $.isArray( one ) ) &&
            ( _.isDate( two ) || $.isArray( two ) )
        ) {
            return calendar.create( one ).pick === calendar.create( two ).pick
        }

        // When we�re working with range objects, compare the �from� and �to�.
        if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
            return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )
        }

        return false
    }


    /**
     * Check if two date units overlap.
     */
    DatePicker.prototype.isDateOverlap = function( one, two ) {

        var calendar = this,
            firstDay = calendar.settings.firstDay ? 1 : 0

        // When we�re working with a weekday index, compare the days.
        if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {
            one = one % 7 + firstDay
            return one === calendar.create( two ).day + 1
        }
        if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {
            two = two % 7 + firstDay
            return two === calendar.create( one ).day + 1
        }

        // When we�re working with range objects, check if the ranges overlap.
        if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
            return calendar.overlapRanges( one, two )
        }

        return false
    }


    /**
     * Flip the �enabled� state.
     */
    DatePicker.prototype.flipEnable = function(val) {
        var itemObject = this.item
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
    }


    /**
     * Mark a collection of dates as �disabled�.
     */
    DatePicker.prototype.deactivate = function( type, datesToDisable ) {

        var calendar = this,
            disabledItems = calendar.item.disable.slice(0)


        // If we�re flipping, that�s all we need to do.
        if ( datesToDisable == 'flip' ) {
            calendar.flipEnable()
        }

        else if ( datesToDisable === false ) {
            calendar.flipEnable(1)
            disabledItems = []
        }

        else if ( datesToDisable === true ) {
            calendar.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the dates to disable.
        else {

            datesToDisable.map(function( unitToDisable ) {

                var matchFound

                // When we have disabled items, check for matches.
                // If something is matched, immediately break out.
                for ( var index = 0; index < disabledItems.length; index += 1 ) {
                    if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {
                        matchFound = true
                        break
                    }
                }

                // If nothing was found, add the validated unit to the collection.
                if ( !matchFound ) {
                    if (
                        _.isInteger( unitToDisable ) ||
                        _.isDate( unitToDisable ) ||
                        $.isArray( unitToDisable ) ||
                        ( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )
                    ) {
                        disabledItems.push( unitToDisable )
                    }
                }
            })
        }

        // Return the updated collection.
        return disabledItems
    } //DatePicker.prototype.deactivate


    /**
     * Mark a collection of dates as �enabled�.
     */
    DatePicker.prototype.activate = function( type, datesToEnable ) {

        var calendar = this,
            disabledItems = calendar.item.disable,
            disabledItemsCount = disabledItems.length

        // If we�re flipping, that�s all we need to do.
        if ( datesToEnable == 'flip' ) {
            calendar.flipEnable()
        }

        else if ( datesToEnable === true ) {
            calendar.flipEnable(1)
            disabledItems = []
        }

        else if ( datesToEnable === false ) {
            calendar.flipEnable(-1)
            disabledItems = []
        }

        // Otherwise go through the disabled dates.
        else {

            datesToEnable.map(function( unitToEnable ) {

                var matchFound,
                    disabledUnit,
                    index,
                    isExactRange

                // Go through the disabled items and try to find a match.
                for ( index = 0; index < disabledItemsCount; index += 1 ) {

                    disabledUnit = disabledItems[index]

                    // When an exact match is found, remove it from the collection.
                    if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {
                        matchFound = disabledItems[index] = null
                        isExactRange = true
                        break
                    }

                    // When an overlapped match is found, add the �inverted� state to it.
                    else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {
                        if ( $.isPlainObject( unitToEnable ) ) {
                            unitToEnable.inverted = true
                            matchFound = unitToEnable
                        }
                        else if ( $.isArray( unitToEnable ) ) {
                            matchFound = unitToEnable
                            if ( !matchFound[3] ) matchFound.push( 'inverted' )
                        }
                        else if ( _.isDate( unitToEnable ) ) {
                            matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
                        }
                        break
                    }
                }

                // If a match was found, remove a previous duplicate entry.
                if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                    if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {
                        disabledItems[index] = null
                        break
                    }
                }

                // In the event that we�re dealing with an exact range of dates,
                // make sure there are no �inverted� dates because of it.
                if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                    if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {
                        disabledItems[index] = null
                        break
                    }
                }

                // If something is still matched, add it into the collection.
                if ( matchFound ) {
                    disabledItems.push( matchFound )
                }
            })
        }

        // Return the updated collection.
        return disabledItems.filter(function( val ) { return val != null })
    } //DatePicker.prototype.activate


    /**
     * Create a string for the nodes in the picker.
     */
    DatePicker.prototype.nodes = function( isOpen ) {

        var
            calendar = this,
            settings = calendar.settings,
            calendarItem = calendar.item,
            nowObject = calendarItem.now,
            selectedObject = calendarItem.select,
            highlightedObject = calendarItem.highlight,
            viewsetObject = calendarItem.view,
            disabledCollection = calendarItem.disable,
            minLimitObject = calendarItem.min,
            maxLimitObject = calendarItem.max,


        // Create the calendar table head using a copy of weekday labels collection.
        // * We do a copy so we don't mutate the original array.
            tableHead = (function( collection, fullCollection ) {

                // If the first day should be Monday, move Sunday to the end.
                if ( settings.firstDay ) {
                    collection.push( collection.shift() )
                    fullCollection.push( fullCollection.shift() )
                }

                // Create and return the table head group.
                return _.node(
                    'thead',
                    _.node(
                        'tr',
                        _.group({
                            min: 0,
                            max: DAYS_IN_WEEK - 1,
                            i: 1,
                            node: 'th',
                            item: function( counter ) {
                                return [
                                    collection[ counter ],
                                    settings.klass.weekdays,
                                    'scope=col title="' + fullCollection[ counter ] + '"'
                                ]
                            }
                        })
                    )
                ) //endreturn
            })( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead


        // Create the nav for next/prev month.
            createMonthNav = function( next ) {

                // Otherwise, return the created month tag.
                return _.node(
                    'div',
                    ' ',
                    settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (

                        // If the focused month is outside the range, disabled the button.
                        ( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
                        ( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
                        ' ' + settings.klass.navDisabled : ''
                    ),
                    'data-nav=' + ( next || -1 ) + ' ' +
                    _.ariaAttr({
                        role: 'button',
                        controls: calendar.$node[0].id + '_table'
                    }) + ' ' +
                    'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'
                ) //endreturn
            }, //createMonthNav


        // Create the month label.
            createMonthLabel = function() {

                var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull

                // If there are months to select, add a dropdown menu.
                if ( settings.selectMonths ) {

                    return _.node( 'select',
                        _.group({
                            min: 0,
                            max: 11,
                            i: 1,
                            node: 'option',
                            item: function( loopedMonth ) {

                                return [

                                    // The looped month and no classes.
                                    monthsCollection[ loopedMonth ], 0,

                                    // Set the value and selected index.
                                    'value=' + loopedMonth +
                                    ( viewsetObject.month == loopedMonth ? ' selected' : '' ) +
                                    (
                                        (
                                            ( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
                                            ( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
                                        ) ?
                                            ' disabled' : ''
                                    )
                                ]
                            }
                        }),
                        settings.klass.selectMonth,
                        ( isOpen ? '' : 'disabled' ) + ' ' +
                        _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelMonthSelect + '"'
                    )
                }

                // If there's a need for a month selector
                return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )
            }, //createMonthLabel


        // Create the year label.
            createYearLabel = function() {

                var focusedYear = viewsetObject.year,

                // If years selector is set to a literal "true", set it to 5. Otherwise
                // divide in half to get half before and half after focused year.
                    numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )

                // If there are years to select, add a dropdown menu.
                if ( numberYears ) {

                    var
                        minYear = minLimitObject.year,
                        maxYear = maxLimitObject.year,
                        lowestYear = focusedYear - numberYears,
                        highestYear = focusedYear + numberYears

                    // If the min year is greater than the lowest year, increase the highest year
                    // by the difference and set the lowest year to the min year.
                    if ( minYear > lowestYear ) {
                        highestYear += minYear - lowestYear
                        lowestYear = minYear
                    }

                    // If the max year is less than the highest year, decrease the lowest year
                    // by the lower of the two: available and needed years. Then set the
                    // highest year to the max year.
                    if ( maxYear < highestYear ) {

                        var availableYears = lowestYear - minYear,
                            neededYears = highestYear - maxYear

                        lowestYear -= availableYears > neededYears ? neededYears : availableYears
                        highestYear = maxYear
                    }

                    return _.node( 'select',
                        _.group({
                            min: lowestYear,
                            max: highestYear,
                            i: 1,
                            node: 'option',
                            item: function( loopedYear ) {
                                return [

                                    // The looped year and no classes.
                                    loopedYear, 0,

                                    // Set the value and selected index.
                                    'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )
                                ]
                            }
                        }),
                        settings.klass.selectYear,
                        ( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelYearSelect + '"'
                    )
                }

                // Otherwise just return the year focused
                return _.node( 'div', focusedYear, settings.klass.year )
            } //createYearLabel


        // Create and return the entire calendar.
        return _.node(
                'div',
                ( settings.selectYears ? createYearLabel() + createMonthLabel() : createMonthLabel() + createYearLabel() ) +
                createMonthNav() + createMonthNav( 1 ),
                settings.klass.header
            ) + _.node(
                'table',
                tableHead +
                _.node(
                    'tbody',
                    _.group({
                        min: 0,
                        max: WEEKS_IN_CALENDAR - 1,
                        i: 1,
                        node: 'tr',
                        item: function( rowCounter ) {

                            // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                            var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0

                            return [
                                _.group({
                                    min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                                    max: function() {
                                        return this.min + DAYS_IN_WEEK - 1
                                    },
                                    i: 1,
                                    node: 'td',
                                    item: function( targetDate ) {

                                        // Convert the time date from a relative date to a target date.
                                        targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])

                                        var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                                            isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                                            isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                                            formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )

                                        return [
                                            _.node(
                                                'div',
                                                targetDate.date,
                                                (function( klasses ) {

                                                    // Add the `infocus` or `outfocus` classes based on month in view.
                                                    klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )

                                                    // Add the `today` class if needed.
                                                    if ( nowObject.pick == targetDate.pick ) {
                                                        klasses.push( settings.klass.now )
                                                    }

                                                    // Add the `selected` class if something's selected and the time matches.
                                                    if ( isSelected ) {
                                                        klasses.push( settings.klass.selected )
                                                    }

                                                    // Add the `highlighted` class if something's highlighted and the time matches.
                                                    if ( isHighlighted ) {
                                                        klasses.push( settings.klass.highlighted )
                                                    }

                                                    // Add the `disabled` class if something's disabled and the object matches.
                                                    if ( isDisabled ) {
                                                        klasses.push( settings.klass.disabled )
                                                    }

                                                    return klasses.join( ' ' )
                                                })([ settings.klass.day ]),
                                                'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                                                    role: 'gridcell',
                                                    label: formattedDate,
                                                    selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                                                    activedescendant: isHighlighted ? true : null,
                                                    disabled: isDisabled ? true : null
                                                })
                                            ),
                                            '',
                                            _.ariaAttr({ role: 'presentation' })
                                        ] //endreturn
                                    }
                                })
                            ] //endreturn
                        }
                    })
                ),
                settings.klass.table,
                'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
                    role: 'grid',
                    controls: calendar.$node[0].id,
                    readonly: true
                })
            ) +

                // * For Firefox forms to submit, make sure to set the buttons� `type` attributes as �button�.
            _.node(
                'div',
                _.node( 'button', settings.today, settings.klass.buttonToday,
                    'type=button data-pick=' + nowObject.pick +
                    ( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id }) ) +
                _.node( 'button', settings.clear, settings.klass.buttonClear,
                    'type=button data-clear=1' +
                    ( isOpen ? '' : ' disabled' ) + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id }) ) +
                _.node('button', settings.close, settings.klass.buttonClose,
                    'type=button data-close=true ' +
                    ( isOpen ? '' : ' disabled' ) + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id }) ),
                settings.klass.footer
            ) //endreturn
    } //DatePicker.prototype.nodes




    /**
     * The date picker defaults.
     */
    DatePicker.defaults = (function( prefix ) {

        return {

            // The title label to use for the month nav buttons
            labelMonthNext: 'Next month',
            labelMonthPrev: 'Previous month',

            // The title label to use for the dropdown selectors
            labelMonthSelect: 'Select a month',
            labelYearSelect: 'Select a year',

            // Months and weekdays
            monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
            monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
            weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],

            // Today and clear
            today: 'Today',
            clear: 'Clear',
            close: 'Close',

            // Picker close behavior
            closeOnSelect: true,
            closeOnClear: true,

            // The format to show on the `input` element
            format: 'd mmmm, yyyy',

            // Classes
            klass: {

                table: prefix + 'table',

                header: prefix + 'header',

                navPrev: prefix + 'nav--prev',
                navNext: prefix + 'nav--next',
                navDisabled: prefix + 'nav--disabled',

                month: prefix + 'month',
                year: prefix + 'year',

                selectMonth: prefix + 'select--month',
                selectYear: prefix + 'select--year',

                weekdays: prefix + 'weekday',

                day: prefix + 'day',
                disabled: prefix + 'day--disabled',
                selected: prefix + 'day--selected',
                highlighted: prefix + 'day--highlighted',
                now: prefix + 'day--today',
                infocus: prefix + 'day--infocus',
                outfocus: prefix + 'day--outfocus',

                footer: prefix + 'footer',

                buttonClear: prefix + 'button--clear',
                buttonToday: prefix + 'button--today',
                buttonClose: prefix + 'button--close'
            }
        }
    })( Picker.klasses().picker + '__' )





    /**
     * Extend the picker to add the date picker.
     */
    Picker.extend( 'pickadate', DatePicker )


}));




/*
 angular.module("schemaForm").run(["$templateCache",
 function($templateCache) {
 $templateCache.put("directives/decorators/bootstrap/datepicker/datepicker.html", "<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n    <input ng-show=\"form.key\"\n           style=\"background-color: white\"\n           type=\"text\"\n           class=\"form-control {{form.fieldHtmlClass}}\"\n           schema-validate=\"form\"\n           ng-model=\"$$value$$\"\n           ng-disabled=\"form.readonly\"\n           pick-a-date=\"form.pickadate\"\n           min-date=\"form.minDate\"\n           max-date=\"form.maxDate\"\n           name=\"{{form.key.slice(-1)[0]}}\"\n           format=\"form.format\" />\n    <span ng-if=\"form.fieldAddonRight\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonRight\"></span>\n  </div>\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");
 }]);*/

angular.module('schemaForm').directive('pickADate', function() {

    //String dates for min and max is not supported
    //https://github.com/amsul/pickadate.js/issues/439
    //So strings we create dates from
    var formatDate = function(value) {
        //Strings or timestamps we make a date of
        if (angular.isString(value) || angular.isNumber(value)) {
            return new Date(value);
        }
        return value;
        //We hope it's a date object
    };

    return {
        restrict : 'A',
        require : 'ngModel',
        scope : {
            ngModel : '=',
            pickADate : '=',
            minDate : '=',
            maxDate : '=',
            format : '=',
            rangeStartDateField : '=',
            rangeEndDateField : '=',
            rangeSelector : '='
        },
        link : function(scope, element, attrs, ngModel) {
            //Bail out gracefully if pickadate is not loaded.
            if (!element.pickadate) {
                return;
            }

            //By setting formatSubmit to null we inhibit the
            //hidden field that pickadate likes to create.
            //We use ngModel formatters instead to format the value.
            var opts = {
                onClose : function() {
                    element.blur();
                },
                formatSubmit : null
            };
            if (scope.pickADate) {
                angular.extend(opts, scope.pickADate);
            }
            element.pickadate(opts);

            //Defaultformat is for json schema date-time is ISO8601
            //i.e.  "yyyy-mm-dd"
            var defaultFormat = 'yyyy-mm-dd';

            //View format on the other hand we get from the pickadate translation file
            var viewFormat = $.fn.pickadate.defaults.format;

            var picker = element.pickadate('picker');

            //The view value
            ngModel.$formatters.push(function(value) {
                if (angular.isUndefined(value) || value === null) {
                    return value;
                }

                //We set 'view' and 'highlight' instead of 'select'
                //since the latter also changes the input, which we do not want.
                picker.set('view', value, {
                    format : scope.format || defaultFormat
                });
                picker.set('highlight', value, {
                    format : scope.format || defaultFormat
                });

                /*
                 range selector
                 */
                if (angular.isDefined(scope.$parent.form.rangeSelector) && scope.$parent.form.rangeSelector === "true") {
                    /*
                     selected start date should be set as min date for end date field
                     $emit the event
                     */
                    var key = scope.$parent.form.key[0];
                    if (angular.isDefined(key) && angular.isDefined(scope.$parent.form.rangeStartDateField) && key === scope.$parent.form.rangeStartDateField) {
                        var rangeEndDateField = {};
                        rangeEndDateField.minDate = value;
                        rangeEndDateField.key = scope.$parent.form.rangeEndDateField;
                        scope.$root.$emit("rangeEndDateField", rangeEndDateField);

                    }
                    /*
                     selected end date should be set as max date for start date field
                     $emit the event
                     */
                    else if (angular.isDefined(key) && angular.isDefined(scope.$parent.form.rangeEndDateField) && key === scope.$parent.form.rangeEndDateField) {
                        var rangeStartDateField = {};
                        rangeStartDateField.maxDate = value;
                        rangeStartDateField.key = scope.$parent.form.rangeStartDateField;
                        scope.$root.$emit("rangeStartDateField", rangeStartDateField);
                    }
                }

                //piggy back on highlight to and let pickadate do the transformation.
                return picker.get('highlight', viewFormat);
            });

            ngModel.$parsers.push(function() {
                /*
                 range selector
                 */
                if (angular.isDefined(scope.$parent.form.rangeSelector) && scope.$parent.form.rangeSelector === "true") {
                    /*
                     selected start date should be set as min date for end date field
                     $emit the event
                     */
                    var key = scope.$parent.form.key[0];
                    if (angular.isDefined(key) && angular.isDefined(scope.$parent.form.rangeStartDateField) && key === scope.$parent.form.rangeStartDateField) {
                        var rangeEndDateField = {};
                        rangeEndDateField.minDate = picker.get('select', scope.format || defaultFormat);
                        rangeEndDateField.key = scope.$parent.form.rangeEndDateField;
                        scope.$root.$emit("rangeEndDateField", rangeEndDateField);

                    }
                    /*
                     selected end date should be set as max date for start date field
                     $emit the event
                     */
                    else if (angular.isDefined(key) && angular.isDefined(scope.$parent.form.rangeEndDateField) && key === scope.$parent.form.rangeEndDateField) {
                        var rangeStartDateField = {};
                        rangeStartDateField.maxDate = picker.get('select', scope.format || defaultFormat);
                        rangeStartDateField.key = scope.$parent.form.rangeStartDateField;
                        scope.$root.$emit("rangeStartDateField", rangeStartDateField);
                    }
                }

                return picker.get('select', scope.format || defaultFormat);
            });

            /*
             listener for the event rangeEndDateField
             */
            if (angular.isDefined(scope.$root) && scope.$root !== null) {
                scope.$root.$on("rangeEndDateField", function(event, data) {
                    var key = scope.$parent.form.key[0];
                    if (angular.isDefined(key) && key === data.key) {
                        picker.set('min', formatDate(data.minDate));
                    }
                });
            }

            /*
             listener for the event rangeStartDateField
             */
            if (angular.isDefined(scope.$root) && scope.$root !== null) {
                scope.$root.$on("rangeStartDateField", function(event, data) {
                    var key = scope.$parent.form.key[0];
                    if (angular.isDefined(key) && key === data.key) {
                        picker.set('max', formatDate(data.maxDate));
                    }
                });
            }

            //bind once.
            if (angular.isDefined(attrs.minDate)) {

                var onceMin = scope.$watch('minDate', function(value) {
                    if (value) {
                        picker.set('min', formatDate(value));
                        onceMin();
                    }
                }, true);
            }

            if (angular.isDefined(attrs.maxDate)) {
                var onceMax = scope.$watch('maxDate', function(value) {
                    if (value) {
                        picker.set('max', formatDate(value));
                        onceMax();
                    }
                }, true);
            }
        }
    };
});

angular.module('schemaForm').config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var datepicker = function(name, schema, options) {
            if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'datepicker';
                f.rangeStartDateField = options.rangeStartDateField;
                f.rangeEndDateField = options.rangeEndDateField;
                f.rangeSelector = options.rangeSelector;
                console.log("angular schema form >  addon > datepicker > form definition > ", f);
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.string.unshift(datepicker);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'datepicker', 'datepicker.html');
        schemaFormDecoratorsProvider.createDirective('datepicker', 'datepicker.html');
    }]);


/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.10.0 - 2014-01-13
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdownToggle","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/popup.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/popover/popover.html","template/popover/popover-template.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
    .factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

        var $transition = function(element, trigger, options) {
            options = options || {};
            var deferred = $q.defer();
            var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

            var transitionEndHandler = function(event) {
                $rootScope.$apply(function() {
                    element.unbind(endEventName, transitionEndHandler);
                    deferred.resolve(element);
                });
            };

            if (endEventName) {
                element.bind(endEventName, transitionEndHandler);
            }

            // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
            $timeout(function() {
                if ( angular.isString(trigger) ) {
                    element.addClass(trigger);
                } else if ( angular.isFunction(trigger) ) {
                    trigger(element);
                } else if ( angular.isObject(trigger) ) {
                    element.css(trigger);
                }
                //If browser does not support transitions, instantly resolve
                if ( !endEventName ) {
                    deferred.resolve(element);
                }
            });

            // Add our custom cancel function to the promise that is returned
            // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
            // i.e. it will therefore never raise a transitionEnd event for that transition
            deferred.promise.cancel = function() {
                if ( endEventName ) {
                    element.unbind(endEventName, transitionEndHandler);
                }
                deferred.reject('Transition cancelled');
            };

            return deferred.promise;
        };

        // Work out the name of the transitionEnd event
        var transElement = document.createElement('trans');
        var transitionEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'transition': 'transitionend'
        };
        var animationEndEventNames = {
            'WebkitTransition': 'webkitAnimationEnd',
            'MozTransition': 'animationend',
            'OTransition': 'oAnimationEnd',
            'transition': 'animationend'
        };
        function findEndEventName(endEventNames) {
            for (var name in endEventNames){
                if (transElement.style[name] !== undefined) {
                    return endEventNames[name];
                }
            }
        }
        $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
        $transition.animationEndEventName = findEndEventName(animationEndEventNames);
        return $transition;
    }]);

angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

    .directive('collapse', ['$transition', function ($transition, $timeout) {

        return {
            link: function (scope, element, attrs) {

                var initialAnimSkip = true;
                var currentTransition;

                function doTransition(change) {
                    var newTransition = $transition(element, change);
                    if (currentTransition) {
                        currentTransition.cancel();
                    }
                    currentTransition = newTransition;
                    newTransition.then(newTransitionDone, newTransitionDone);
                    return newTransition;

                    function newTransitionDone() {
                        // Make sure it's this transition, otherwise, leave it alone.
                        if (currentTransition === newTransition) {
                            currentTransition = undefined;
                        }
                    }
                }

                function expand() {
                    if (initialAnimSkip) {
                        initialAnimSkip = false;
                        expandDone();
                    } else {
                        element.removeClass('collapse').addClass('collapsing');
                        doTransition({ height: element[0].scrollHeight + 'px' }).then(expandDone);
                    }
                }

                function expandDone() {
                    element.removeClass('collapsing');
                    element.addClass('collapse in');
                    element.css({height: 'auto'});
                }

                function collapse() {
                    if (initialAnimSkip) {
                        initialAnimSkip = false;
                        collapseDone();
                        element.css({height: 0});
                    } else {
                        // CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
                        element.css({ height: element[0].scrollHeight + 'px' });
                        //trigger reflow so a browser realizes that height was updated from auto to a specific value
                        var x = element[0].offsetWidth;

                        element.removeClass('collapse in').addClass('collapsing');

                        doTransition({ height: 0 }).then(collapseDone);
                    }
                }

                function collapseDone() {
                    element.removeClass('collapsing');
                    element.addClass('collapse');
                }

                scope.$watch(attrs.collapse, function (shouldCollapse) {
                    if (shouldCollapse) {
                        collapse();
                    } else {
                        expand();
                    }
                });
            }
        };
    }]);

angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

    .constant('accordionConfig', {
        closeOthers: true
    })

    .controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

        // This array keeps track of the accordion groups
        this.groups = [];

        // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
        this.closeOthers = function(openGroup) {
            var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
            if ( closeOthers ) {
                angular.forEach(this.groups, function (group) {
                    if ( group !== openGroup ) {
                        group.isOpen = false;
                    }
                });
            }
        };

        // This is called from the accordion-group directive to add itself to the accordion
        this.addGroup = function(groupScope) {
            var that = this;
            this.groups.push(groupScope);

            groupScope.$on('$destroy', function (event) {
                that.removeGroup(groupScope);
            });
        };

        // This is called from the accordion-group directive when to remove itself
        this.removeGroup = function(group) {
            var index = this.groups.indexOf(group);
            if ( index !== -1 ) {
                this.groups.splice(this.groups.indexOf(group), 1);
            }
        };

    }])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
    .directive('accordion', function () {
        return {
            restrict:'EA',
            controller:'AccordionController',
            transclude: true,
            replace: false,
            templateUrl: 'template/accordion/accordion.html'
        };
    })

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
    .directive('accordionGroup', ['$parse', function($parse) {
        return {
            require:'^accordion',         // We need this directive to be inside an accordion
            restrict:'EA',
            transclude:true,              // It transcludes the contents of the directive into the template
            replace: true,                // The element containing the directive will be replaced with the template
            templateUrl:'template/accordion/accordion-group.html',
            scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
            controller: function() {
                this.setHeading = function(element) {
                    this.heading = element;
                };
            },
            link: function(scope, element, attrs, accordionCtrl) {
                var getIsOpen, setIsOpen;

                accordionCtrl.addGroup(scope);

                scope.isOpen = false;

                if ( attrs.isOpen ) {
                    getIsOpen = $parse(attrs.isOpen);
                    setIsOpen = getIsOpen.assign;

                    scope.$parent.$watch(getIsOpen, function(value) {
                        scope.isOpen = !!value;
                    });
                }

                scope.$watch('isOpen', function(value) {
                    if ( value ) {
                        accordionCtrl.closeOthers(scope);
                    }
                    if ( setIsOpen ) {
                        setIsOpen(scope.$parent, value);
                    }
                });
            }
        };
    }])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
    .directive('accordionHeading', function() {
        return {
            restrict: 'EA',
            transclude: true,   // Grab the contents to be used as the heading
            template: '',       // In effect remove this element!
            replace: true,
            require: '^accordionGroup',
            compile: function(element, attr, transclude) {
                return function link(scope, element, attr, accordionGroupCtrl) {
                    // Pass the heading to the accordion-group controller
                    // so that it can be transcluded into the right place in the template
                    // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
                    accordionGroupCtrl.setHeading(transclude(scope, function() {}));
                };
            }
        };
    })

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
    .directive('accordionTransclude', function() {
        return {
            require: '^accordionGroup',
            link: function(scope, element, attr, controller) {
                scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
                    if ( heading ) {
                        element.html('');
                        element.append(heading);
                    }
                });
            }
        };
    });

angular.module("ui.bootstrap.alert", [])

    .controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
        $scope.closeable = 'close' in $attrs;
    }])

    .directive('alert', function () {
        return {
            restrict:'EA',
            controller:'AlertController',
            templateUrl:'template/alert/alert.html',
            transclude:true,
            replace:true,
            scope: {
                type: '=',
                close: '&'
            }
        };
    });

angular.module('ui.bootstrap.bindHtml', [])

    .directive('bindHtmlUnsafe', function () {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
            scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    });
angular.module('ui.bootstrap.buttons', [])

    .constant('buttonConfig', {
        activeClass: 'active',
        toggleEvent: 'click'
    })

    .controller('ButtonsController', ['buttonConfig', function(buttonConfig) {
        this.activeClass = buttonConfig.activeClass || 'active';
        this.toggleEvent = buttonConfig.toggleEvent || 'click';
    }])

    .directive('btnRadio', function () {
        return {
            require: ['btnRadio', 'ngModel'],
            controller: 'ButtonsController',
            link: function (scope, element, attrs, ctrls) {
                var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                //model -> UI
                ngModelCtrl.$render = function () {
                    element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
                };

                //ui->model
                element.bind(buttonsCtrl.toggleEvent, function () {
                    if (!element.hasClass(buttonsCtrl.activeClass)) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
                            ngModelCtrl.$render();
                        });
                    }
                });
            }
        };
    })

    .directive('btnCheckbox', function () {
        return {
            require: ['btnCheckbox', 'ngModel'],
            controller: 'ButtonsController',
            link: function (scope, element, attrs, ctrls) {
                var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                function getTrueValue() {
                    return getCheckboxValue(attrs.btnCheckboxTrue, true);
                }

                function getFalseValue() {
                    return getCheckboxValue(attrs.btnCheckboxFalse, false);
                }

                function getCheckboxValue(attributeValue, defaultValue) {
                    var val = scope.$eval(attributeValue);
                    return angular.isDefined(val) ? val : defaultValue;
                }

                //model -> UI
                ngModelCtrl.$render = function () {
                    element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
                };

                //ui->model
                element.bind(buttonsCtrl.toggleEvent, function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                        ngModelCtrl.$render();
                    });
                });
            }
        };
    });

/**
 * @ngdoc overview
 * @name ui.bootstrap.carousel
 *
 * @description
 * AngularJS version of an image carousel.
 *
 */
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
        var self = this,
            slides = self.slides = [],
            currentIndex = -1,
            currentTimeout, isPlaying;
        self.currentSlide = null;

        var destroyed = false;
        /* direction: "prev" or "next" */
        self.select = function(nextSlide, direction) {
            var nextIndex = slides.indexOf(nextSlide);
            //Decide direction if it's not given
            if (direction === undefined) {
                direction = nextIndex > currentIndex ? "next" : "prev";
            }
            if (nextSlide && nextSlide !== self.currentSlide) {
                if ($scope.$currentTransition) {
                    $scope.$currentTransition.cancel();
                    //Timeout so ng-class in template has time to fix classes for finished slide
                    $timeout(goNext);
                } else {
                    goNext();
                }
            }
            function goNext() {
                // Scope has been destroyed, stop here.
                if (destroyed) { return; }
                //If we have a slide to transition from and we have a transition type and we're allowed, go
                if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                    //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
                    nextSlide.$element.addClass(direction);
                    var reflow = nextSlide.$element[0].offsetWidth; //force reflow

                    //Set all other slides to stop doing their stuff for the new transition
                    angular.forEach(slides, function(slide) {
                        angular.extend(slide, {direction: '', entering: false, leaving: false, active: false});
                    });
                    angular.extend(nextSlide, {direction: direction, active: true, entering: true});
                    angular.extend(self.currentSlide||{}, {direction: direction, leaving: true});

                    $scope.$currentTransition = $transition(nextSlide.$element, {});
                    //We have to create new pointers inside a closure since next & current will change
                    (function(next,current) {
                        $scope.$currentTransition.then(
                            function(){ transitionDone(next, current); },
                            function(){ transitionDone(next, current); }
                        );
                    }(nextSlide, self.currentSlide));
                } else {
                    transitionDone(nextSlide, self.currentSlide);
                }
                self.currentSlide = nextSlide;
                currentIndex = nextIndex;
                //every time you change slides, reset the timer
                restartTimer();
            }
            function transitionDone(next, current) {
                angular.extend(next, {direction: '', active: true, leaving: false, entering: false});
                angular.extend(current||{}, {direction: '', active: false, leaving: false, entering: false});
                $scope.$currentTransition = null;
            }
        };
        $scope.$on('$destroy', function () {
            destroyed = true;
        });

        /* Allow outside people to call indexOf on slides array */
        self.indexOfSlide = function(slide) {
            return slides.indexOf(slide);
        };

        $scope.next = function() {
            var newIndex = (currentIndex + 1) % slides.length;

            //Prevent this user-triggered transition from occurring if there is already one in progress
            if (!$scope.$currentTransition) {
                return self.select(slides[newIndex], 'next');
            }
        };

        $scope.prev = function() {
            var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;

            //Prevent this user-triggered transition from occurring if there is already one in progress
            if (!$scope.$currentTransition) {
                return self.select(slides[newIndex], 'prev');
            }
        };

        $scope.select = function(slide) {
            self.select(slide);
        };

        $scope.isActive = function(slide) {
            return self.currentSlide === slide;
        };

        $scope.slides = function() {
            return slides;
        };

        $scope.$watch('interval', restartTimer);
        $scope.$on('$destroy', resetTimer);

        function restartTimer() {
            resetTimer();
            var interval = +$scope.interval;
            if (!isNaN(interval) && interval>=0) {
                currentTimeout = $timeout(timerFn, interval);
            }
        }

        function resetTimer() {
            if (currentTimeout) {
                $timeout.cancel(currentTimeout);
                currentTimeout = null;
            }
        }

        function timerFn() {
            if (isPlaying) {
                $scope.next();
                restartTimer();
            } else {
                $scope.pause();
            }
        }

        $scope.play = function() {
            if (!isPlaying) {
                isPlaying = true;
                restartTimer();
            }
        };
        $scope.pause = function() {
            if (!$scope.noPause) {
                isPlaying = false;
                resetTimer();
            }
        };

        self.addSlide = function(slide, element) {
            slide.$element = element;
            slides.push(slide);
            //if this is the first slide or the slide is set to active, select it
            if(slides.length === 1 || slide.active) {
                self.select(slides[slides.length-1]);
                if (slides.length == 1) {
                    $scope.play();
                }
            } else {
                slide.active = false;
            }
        };

        self.removeSlide = function(slide) {
            //get the index of the slide inside the carousel
            var index = slides.indexOf(slide);
            slides.splice(index, 1);
            if (slides.length > 0 && slide.active) {
                if (index >= slides.length) {
                    self.select(slides[index-1]);
                } else {
                    self.select(slides[index]);
                }
            } else if (currentIndex > index) {
                currentIndex--;
            }
        };

    }])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *
 * @example
 <example module="ui.bootstrap">
 <file name="index.html">
 <carousel>
 <slide>
 <img src="http://placekitten.com/150/150" style="margin:auto;">
 <div class="carousel-caption">
 <p>Beautiful!</p>
 </div>
 </slide>
 <slide>
 <img src="http://placekitten.com/100/150" style="margin:auto;">
 <div class="carousel-caption">
 <p>D'aww!</p>
 </div>
 </slide>
 </carousel>
 </file>
 <file name="demo.css">
 .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
 </file>
 </example>
 */
    .directive('carousel', [function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            controller: 'CarouselController',
            require: 'carousel',
            templateUrl: 'template/carousel/carousel.html',
            scope: {
                interval: '=',
                noTransition: '=',
                noPause: '='
            }
        };
    }])

/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 *
 * @example
 <example module="ui.bootstrap">
 <file name="index.html">
 <div ng-controller="CarouselDemoCtrl">
 <carousel>
 <slide ng-repeat="slide in slides" active="slide.active">
 <img ng-src="{{slide.image}}" style="margin:auto;">
 <div class="carousel-caption">
 <h4>Slide {{$index}}</h4>
 <p>{{slide.text}}</p>
 </div>
 </slide>
 </carousel>
 <div class="row-fluid">
 <div class="span6">
 <ul>
 <li ng-repeat="slide in slides">
 <button class="btn btn-mini" ng-class="{'btn-info': !slide.active, 'btn-success': slide.active}" ng-disabled="slide.active" ng-click="slide.active = true">select</button>
 {{$index}}: {{slide.text}}
 </li>
 </ul>
 <a class="btn" ng-click="addSlide()">Add Slide</a>
 </div>
 <div class="span6">
 Interval, in milliseconds: <input type="number" ng-model="myInterval">
 <br />Enter a negative number to stop the interval.
 </div>
 </div>
 </div>
 </file>
 <file name="script.js">
 function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/200',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' '
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) $scope.addSlide();
}
 </file>
 <file name="demo.css">
 .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
 </file>
 </example>
 */

    .directive('slide', ['$parse', function($parse) {
        return {
            require: '^carousel',
            restrict: 'EA',
            transclude: true,
            replace: true,
            templateUrl: 'template/carousel/slide.html',
            scope: {
            },
            link: function (scope, element, attrs, carouselCtrl) {
                //Set up optional 'active' = binding
                if (attrs.active) {
                    var getActive = $parse(attrs.active);
                    var setActive = getActive.assign;
                    var lastValue = scope.active = getActive(scope.$parent);
                    scope.$watch(function parentActiveWatch() {
                        var parentActive = getActive(scope.$parent);

                        if (parentActive !== scope.active) {
                            // we are out of sync and need to copy
                            if (parentActive !== lastValue) {
                                // parent changed and it has precedence
                                lastValue = scope.active = parentActive;
                            } else {
                                // if the parent can be assigned then do so
                                setActive(scope.$parent, parentActive = lastValue = scope.active);
                            }
                        }
                        return parentActive;
                    });
                }

                carouselCtrl.addSlide(scope, element);
                //when the scope is destroyed then remove the slide from the current slides array
                scope.$on('$destroy', function() {
                    carouselCtrl.removeSlide(scope);
                });

                scope.$watch('active', function(active) {
                    if (active) {
                        carouselCtrl.select(scope);
                    }
                });
            }
        };
    }]);

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
    .factory('$position', ['$document', '$window', function ($document, $window) {

        function getStyle(el, cssprop) {
            if (el.currentStyle) { //IE
                return el.currentStyle[cssprop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(el)[cssprop];
            }
            // finally try and get inline style
            return el.style[cssprop];
        }

        /**
         * Checks if a given element is statically positioned
         * @param element - raw DOM element
         */
        function isStaticPositioned(element) {
            return (getStyle(element, "position") || 'static' ) === 'static';
        }

        /**
         * returns the closest, non-statically positioned parentOffset of a given element
         * @param element
         */
        var parentOffsetEl = function (element) {
            var docDomEl = $document[0];
            var offsetParent = element.offsetParent || docDomEl;
            while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || docDomEl;
        };

        return {
            /**
             * Provides read-only equivalent of jQuery's position function:
             * http://api.jquery.com/position/
             */
            position: function (element) {
                var elBCR = this.offset(element);
                var offsetParentBCR = { top: 0, left: 0 };
                var offsetParentEl = parentOffsetEl(element[0]);
                if (offsetParentEl != $document[0]) {
                    offsetParentBCR = this.offset(angular.element(offsetParentEl));
                    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
                    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
                }

                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: elBCR.top - offsetParentBCR.top,
                    left: elBCR.left - offsetParentBCR.left
                };
            },

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * http://api.jquery.com/offset/
             */
            offset: function (element) {
                var boundingClientRect = element[0].getBoundingClientRect();
                return {
                    width: boundingClientRect.width || element.prop('offsetWidth'),
                    height: boundingClientRect.height || element.prop('offsetHeight'),
                    top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
                    left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft  || $document[0].documentElement.scrollLeft)
                };
            }
        };
    }]);

angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position'])

    .constant('datepickerConfig', {
        dayFormat: 'dd',
        monthFormat: 'MMMM',
        yearFormat: 'yyyy',
        dayHeaderFormat: 'EEE',
        dayTitleFormat: 'MMMM yyyy',
        monthTitleFormat: 'yyyy',
        showWeeks: true,
        startingDay: 0,
        yearRange: 20,
        minDate: null,
        maxDate: null
    })

    .controller('DatepickerController', ['$scope', '$attrs', 'dateFilter', 'datepickerConfig', function($scope, $attrs, dateFilter, dtConfig) {
        var format = {
                day:        getValue($attrs.dayFormat,        dtConfig.dayFormat),
                month:      getValue($attrs.monthFormat,      dtConfig.monthFormat),
                year:       getValue($attrs.yearFormat,       dtConfig.yearFormat),
                dayHeader:  getValue($attrs.dayHeaderFormat,  dtConfig.dayHeaderFormat),
                dayTitle:   getValue($attrs.dayTitleFormat,   dtConfig.dayTitleFormat),
                monthTitle: getValue($attrs.monthTitleFormat, dtConfig.monthTitleFormat)
            },
            startingDay = getValue($attrs.startingDay,      dtConfig.startingDay),
            yearRange =   getValue($attrs.yearRange,        dtConfig.yearRange);

        this.minDate = dtConfig.minDate ? new Date(dtConfig.minDate) : null;
        this.maxDate = dtConfig.maxDate ? new Date(dtConfig.maxDate) : null;

        function getValue(value, defaultValue) {
            return angular.isDefined(value) ? $scope.$parent.$eval(value) : defaultValue;
        }

        function getDaysInMonth( year, month ) {
            return new Date(year, month, 0).getDate();
        }

        function getDates(startDate, n) {
            var dates = new Array(n);
            var current = startDate, i = 0;
            while (i < n) {
                dates[i++] = new Date(current);
                current.setDate( current.getDate() + 1 );
            }
            return dates;
        }

        function makeDate(date, format, isSelected, isSecondary) {
            return { date: date, label: dateFilter(date, format), selected: !!isSelected, secondary: !!isSecondary };
        }

        this.modes = [
            {
                name: 'day',
                getVisibleDates: function(date, selected) {
                    var year = date.getFullYear(), month = date.getMonth(), firstDayOfMonth = new Date(year, month, 1);
                    var difference = startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
                        firstDate = new Date(firstDayOfMonth), numDates = 0;

                    if ( numDisplayedFromPreviousMonth > 0 ) {
                        firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );
                        numDates += numDisplayedFromPreviousMonth; // Previous
                    }
                    numDates += getDaysInMonth(year, month + 1); // Current
                    numDates += (7 - numDates % 7) % 7; // Next

                    var days = getDates(firstDate, numDates), labels = new Array(7);
                    for (var i = 0; i < numDates; i ++) {
                        var dt = new Date(days[i]);
                        days[i] = makeDate(dt, format.day, (selected && selected.getDate() === dt.getDate() && selected.getMonth() === dt.getMonth() && selected.getFullYear() === dt.getFullYear()), dt.getMonth() !== month);
                    }
                    for (var j = 0; j < 7; j++) {
                        labels[j] = dateFilter(days[j].date, format.dayHeader);
                    }
                    return { objects: days, title: dateFilter(date, format.dayTitle), labels: labels };
                },
                compare: function(date1, date2) {
                    return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
                },
                split: 7,
                step: { months: 1 }
            },
            {
                name: 'month',
                getVisibleDates: function(date, selected) {
                    var months = new Array(12), year = date.getFullYear();
                    for ( var i = 0; i < 12; i++ ) {
                        var dt = new Date(year, i, 1);
                        months[i] = makeDate(dt, format.month, (selected && selected.getMonth() === i && selected.getFullYear() === year));
                    }
                    return { objects: months, title: dateFilter(date, format.monthTitle) };
                },
                compare: function(date1, date2) {
                    return new Date( date1.getFullYear(), date1.getMonth() ) - new Date( date2.getFullYear(), date2.getMonth() );
                },
                split: 3,
                step: { years: 1 }
            },
            {
                name: 'year',
                getVisibleDates: function(date, selected) {
                    var years = new Array(yearRange), year = date.getFullYear(), startYear = parseInt((year - 1) / yearRange, 10) * yearRange + 1;
                    for ( var i = 0; i < yearRange; i++ ) {
                        var dt = new Date(startYear + i, 0, 1);
                        years[i] = makeDate(dt, format.year, (selected && selected.getFullYear() === dt.getFullYear()));
                    }
                    return { objects: years, title: [years[0].label, years[yearRange - 1].label].join(' - ') };
                },
                compare: function(date1, date2) {
                    return date1.getFullYear() - date2.getFullYear();
                },
                split: 5,
                step: { years: yearRange }
            }
        ];

        this.isDisabled = function(date, mode) {
            var currentMode = this.modes[mode || 0];
            return ((this.minDate && currentMode.compare(date, this.minDate) < 0) || (this.maxDate && currentMode.compare(date, this.maxDate) > 0) || ($scope.dateDisabled && $scope.dateDisabled({date: date, mode: currentMode.name})));
        };
    }])

    .directive( 'datepicker', ['dateFilter', '$parse', 'datepickerConfig', '$log', function (dateFilter, $parse, datepickerConfig, $log) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/datepicker.html',
            scope: {
                dateDisabled: '&'
            },
            require: ['datepicker', '?^ngModel'],
            controller: 'DatepickerController',
            link: function(scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0], ngModel = ctrls[1];

                if (!ngModel) {
                    return; // do nothing if no ng-model
                }

                // Configuration parameters
                var mode = 0, selected = new Date(), showWeeks = datepickerConfig.showWeeks;

                if (attrs.showWeeks) {
                    scope.$parent.$watch($parse(attrs.showWeeks), function(value) {
                        showWeeks = !! value;
                        updateShowWeekNumbers();
                    });
                } else {
                    updateShowWeekNumbers();
                }

                if (attrs.min) {
                    scope.$parent.$watch($parse(attrs.min), function(value) {
                        datepickerCtrl.minDate = value ? new Date(value) : null;
                        refill();
                    });
                }
                if (attrs.max) {
                    scope.$parent.$watch($parse(attrs.max), function(value) {
                        datepickerCtrl.maxDate = value ? new Date(value) : null;
                        refill();
                    });
                }

                function updateShowWeekNumbers() {
                    scope.showWeekNumbers = mode === 0 && showWeeks;
                }

                // Split array into smaller arrays
                function split(arr, size) {
                    var arrays = [];
                    while (arr.length > 0) {
                        arrays.push(arr.splice(0, size));
                    }
                    return arrays;
                }

                function refill( updateSelected ) {
                    var date = null, valid = true;

                    if ( ngModel.$modelValue ) {
                        date = new Date( ngModel.$modelValue );

                        if ( isNaN(date) ) {
                            valid = false;
                            $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                        } else if ( updateSelected ) {
                            selected = date;
                        }
                    }
                    ngModel.$setValidity('date', valid);

                    var currentMode = datepickerCtrl.modes[mode], data = currentMode.getVisibleDates(selected, date);
                    angular.forEach(data.objects, function(obj) {
                        obj.disabled = datepickerCtrl.isDisabled(obj.date, mode);
                    });

                    ngModel.$setValidity('date-disabled', (!date || !datepickerCtrl.isDisabled(date)));

                    scope.rows = split(data.objects, currentMode.split);
                    scope.labels = data.labels || [];
                    scope.title = data.title;
                }

                function setMode(value) {
                    mode = value;
                    updateShowWeekNumbers();
                    refill();
                }

                ngModel.$render = function() {
                    refill( true );
                };

                scope.select = function( date ) {
                    if ( mode === 0 ) {
                        var dt = ngModel.$modelValue ? new Date( ngModel.$modelValue ) : new Date(0, 0, 0, 0, 0, 0, 0);
                        dt.setFullYear( date.getFullYear(), date.getMonth(), date.getDate() );
                        ngModel.$setViewValue( dt );
                        refill( true );
                    } else {
                        selected = date;
                        setMode( mode - 1 );
                    }
                };
                scope.move = function(direction) {
                    var step = datepickerCtrl.modes[mode].step;
                    selected.setMonth( selected.getMonth() + direction * (step.months || 0) );
                    selected.setFullYear( selected.getFullYear() + direction * (step.years || 0) );
                    refill();
                };
                scope.toggleMode = function() {
                    setMode( (mode + 1) % datepickerCtrl.modes.length );
                };
                scope.getWeekNumber = function(row) {
                    return ( mode === 0 && scope.showWeekNumbers && row.length === 7 ) ? getISO8601WeekNumber(row[0].date) : null;
                };

                function getISO8601WeekNumber(date) {
                    var checkDate = new Date(date);
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
                    var time = checkDate.getTime();
                    checkDate.setMonth(0); // Compare with Jan 1
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
                }
            }
        };
    }])

    .constant('datepickerPopupConfig', {
        dateFormat: 'yyyy-MM-dd',
        currentText: 'Today',
        toggleWeeksText: 'Weeks',
        clearText: 'Clear',
        closeText: 'Done',
        closeOnDateSelection: true,
        appendToBody: false,
        showButtonBar: true
    })

    .directive('datepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'datepickerPopupConfig', 'datepickerConfig',
        function ($compile, $parse, $document, $position, dateFilter, datepickerPopupConfig, datepickerConfig) {
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function(originalScope, element, attrs, ngModel) {
                    var scope = originalScope.$new(), // create a child scope so we are not polluting original one
                        dateFormat,
                        closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? originalScope.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
                        appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? originalScope.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;

                    attrs.$observe('datepickerPopup', function(value) {
                        dateFormat = value || datepickerPopupConfig.dateFormat;
                        ngModel.$render();
                    });

                    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? originalScope.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

                    originalScope.$on('$destroy', function() {
                        $popup.remove();
                        scope.$destroy();
                    });

                    attrs.$observe('currentText', function(text) {
                        scope.currentText = angular.isDefined(text) ? text : datepickerPopupConfig.currentText;
                    });
                    attrs.$observe('toggleWeeksText', function(text) {
                        scope.toggleWeeksText = angular.isDefined(text) ? text : datepickerPopupConfig.toggleWeeksText;
                    });
                    attrs.$observe('clearText', function(text) {
                        scope.clearText = angular.isDefined(text) ? text : datepickerPopupConfig.clearText;
                    });
                    attrs.$observe('closeText', function(text) {
                        scope.closeText = angular.isDefined(text) ? text : datepickerPopupConfig.closeText;
                    });

                    var getIsOpen, setIsOpen;
                    if ( attrs.isOpen ) {
                        getIsOpen = $parse(attrs.isOpen);
                        setIsOpen = getIsOpen.assign;

                        originalScope.$watch(getIsOpen, function updateOpen(value) {
                            scope.isOpen = !! value;
                        });
                    }
                    scope.isOpen = getIsOpen ? getIsOpen(originalScope) : false; // Initial state

                    function setOpen( value ) {
                        if (setIsOpen) {
                            setIsOpen(originalScope, !!value);
                        } else {
                            scope.isOpen = !!value;
                        }
                    }

                    var documentClickBind = function(event) {
                        if (scope.isOpen && event.target !== element[0]) {
                            scope.$apply(function() {
                                setOpen(false);
                            });
                        }
                    };

                    var elementFocusBind = function() {
                        scope.$apply(function() {
                            setOpen( true );
                        });
                    };

                    // popup element used to display calendar
                    var popupEl = angular.element('<div datepicker-popup-wrap><div datepicker></div></div>');
                    popupEl.attr({
                        'ng-model': 'date',
                        'ng-change': 'dateSelection()'
                    });
                    var datepickerEl = angular.element(popupEl.children()[0]),
                        datepickerOptions = {};
                    if (attrs.datepickerOptions) {
                        datepickerOptions = originalScope.$eval(attrs.datepickerOptions);
                        datepickerEl.attr(angular.extend({}, datepickerOptions));
                    }

                    // TODO: reverse from dateFilter string to Date object
                    function parseDate(viewValue) {
                        if (!viewValue) {
                            ngModel.$setValidity('date', true);
                            return null;
                        } else if (angular.isDate(viewValue)) {
                            ngModel.$setValidity('date', true);
                            return viewValue;
                        } else if (angular.isString(viewValue)) {
                            var date = new Date(viewValue);
                            if (isNaN(date)) {
                                ngModel.$setValidity('date', false);
                                return undefined;
                            } else {
                                ngModel.$setValidity('date', true);
                                return date;
                            }
                        } else {
                            ngModel.$setValidity('date', false);
                            return undefined;
                        }
                    }
                    ngModel.$parsers.unshift(parseDate);

                    // Inner change
                    scope.dateSelection = function(dt) {
                        if (angular.isDefined(dt)) {
                            scope.date = dt;
                        }
                        ngModel.$setViewValue(scope.date);
                        ngModel.$render();

                        if (closeOnDateSelection) {
                            setOpen( false );
                        }
                    };

                    element.bind('input change keyup', function() {
                        scope.$apply(function() {
                            scope.date = ngModel.$modelValue;
                        });
                    });

                    // Outter change
                    ngModel.$render = function() {
                        var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
                        element.val(date);
                        scope.date = ngModel.$modelValue;
                    };

                    function addWatchableAttribute(attribute, scopeProperty, datepickerAttribute) {
                        if (attribute) {
                            originalScope.$watch($parse(attribute), function(value){
                                scope[scopeProperty] = value;
                            });
                            datepickerEl.attr(datepickerAttribute || scopeProperty, scopeProperty);
                        }
                    }
                    addWatchableAttribute(attrs.min, 'min');
                    addWatchableAttribute(attrs.max, 'max');
                    if (attrs.showWeeks) {
                        addWatchableAttribute(attrs.showWeeks, 'showWeeks', 'show-weeks');
                    } else {
                        scope.showWeeks = 'show-weeks' in datepickerOptions ? datepickerOptions['show-weeks'] : datepickerConfig.showWeeks;
                        datepickerEl.attr('show-weeks', 'showWeeks');
                    }
                    if (attrs.dateDisabled) {
                        datepickerEl.attr('date-disabled', attrs.dateDisabled);
                    }

                    function updatePosition() {
                        scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                        scope.position.top = scope.position.top + element.prop('offsetHeight');
                    }

                    var documentBindingInitialized = false, elementFocusInitialized = false;
                    scope.$watch('isOpen', function(value) {
                        if (value) {
                            updatePosition();
                            $document.bind('click', documentClickBind);
                            if(elementFocusInitialized) {
                                element.unbind('focus', elementFocusBind);
                            }
                            element[0].focus();
                            documentBindingInitialized = true;
                        } else {
                            if(documentBindingInitialized) {
                                $document.unbind('click', documentClickBind);
                            }
                            element.bind('focus', elementFocusBind);
                            elementFocusInitialized = true;
                        }

                        if ( setIsOpen ) {
                            setIsOpen(originalScope, value);
                        }
                    });

                    scope.today = function() {
                        scope.dateSelection(new Date());
                    };
                    scope.clear = function() {
                        scope.dateSelection(null);
                    };

                    var $popup = $compile(popupEl)(scope);
                    if ( appendToBody ) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }
                }
            };
        }])

    .directive('datepickerPopupWrap', function() {
        return {
            restrict:'EA',
            replace: true,
            transclude: true,
            templateUrl: 'template/datepicker/popup.html',
            link:function (scope, element, attrs) {
                element.bind('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    });

/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
 <li class="dropdown">
 <a class="dropdown-toggle">My Dropdown Menu</a>
 <ul class="dropdown-menu">
 <li ng-repeat="choice in dropChoices">
 <a ng-href="{{choice.href}}">{{choice.text}}</a>
 </li>
 </ul>
 </li>
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
    var openElement = null,
        closeMenu   = angular.noop;
    return {
        restrict: 'CA',
        link: function(scope, element, attrs) {
            scope.$watch('$location.path', function() { closeMenu(); });
            element.parent().bind('click', function() { closeMenu(); });
            element.bind('click', function (event) {

                var elementWasOpen = (element === openElement);

                event.preventDefault();
                event.stopPropagation();

                if (!!openElement) {
                    closeMenu();
                }

                if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                    element.parent().addClass('open');
                    openElement = element;
                    closeMenu = function (event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind('click', closeMenu);
                        element.parent().removeClass('open');
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind('click', closeMenu);
                }
            });
        }
    };
}]);

angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
    .factory('$$stackedMap', function () {
        return {
            createNew: function () {
                var stack = [];

                return {
                    add: function (key, value) {
                        stack.push({
                            key: key,
                            value: value
                        });
                    },
                    get: function (key) {
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                return stack[i];
                            }
                        }
                    },
                    keys: function() {
                        var keys = [];
                        for (var i = 0; i < stack.length; i++) {
                            keys.push(stack[i].key);
                        }
                        return keys;
                    },
                    top: function () {
                        return stack[stack.length - 1];
                    },
                    remove: function (key) {
                        var idx = -1;
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                idx = i;
                                break;
                            }
                        }
                        return stack.splice(idx, 1)[0];
                    },
                    removeTop: function () {
                        return stack.splice(stack.length - 1, 1)[0];
                    },
                    length: function () {
                        return stack.length;
                    }
                };
            }
        };
    })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
    .directive('modalBackdrop', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/modal/backdrop.html',
            link: function (scope) {

                scope.animate = false;

                //trigger CSS transitions
                $timeout(function () {
                    scope.animate = true;
                });
            }
        };
    }])

    .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
        return {
            restrict: 'EA',
            scope: {
                index: '@',
                animate: '='
            },
            replace: true,
            transclude: true,
            templateUrl: 'template/modal/window.html',
            link: function (scope, element, attrs) {
                scope.windowClass = attrs.windowClass || '';

                $timeout(function () {
                    // trigger CSS transitions
                    scope.animate = true;
                    // focus a freshly-opened modal
                    element[0].focus();
                });

                scope.close = function (evt) {
                    var modal = $modalStack.getTop();
                    if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        $modalStack.dismiss(modal.key, 'backdrop click');
                    }
                };
            }
        };
    }])

    .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
        function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

            var OPENED_MODAL_CLASS = 'modal-open';

            var backdropDomEl, backdropScope;
            var openedWindows = $$stackedMap.createNew();
            var $modalStack = {};

            function backdropIndex() {
                var topBackdropIndex = -1;
                var opened = openedWindows.keys();
                for (var i = 0; i < opened.length; i++) {
                    if (openedWindows.get(opened[i]).value.backdrop) {
                        topBackdropIndex = i;
                    }
                }
                return topBackdropIndex;
            }

            $rootScope.$watch(backdropIndex, function(newBackdropIndex){
                if (backdropScope) {
                    backdropScope.index = newBackdropIndex;
                }
            });

            function removeModalWindow(modalInstance) {

                var body = $document.find('body').eq(0);
                var modalWindow = openedWindows.get(modalInstance).value;

                //clean up the stack
                openedWindows.remove(modalInstance);

                //remove window DOM element
                removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, checkRemoveBackdrop);
                body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
            }

            function checkRemoveBackdrop() {
                //remove backdrop if no longer needed
                if (backdropDomEl && backdropIndex() == -1) {
                    var backdropScopeRef = backdropScope;
                    removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
                        backdropScopeRef.$destroy();
                        backdropScopeRef = null;
                    });
                    backdropDomEl = undefined;
                    backdropScope = undefined;
                }
            }

            function removeAfterAnimate(domEl, scope, emulateTime, done) {
                // Closing animation
                scope.animate = false;

                var transitionEndEventName = $transition.transitionEndEventName;
                if (transitionEndEventName) {
                    // transition out
                    var timeout = $timeout(afterAnimating, emulateTime);

                    domEl.bind(transitionEndEventName, function () {
                        $timeout.cancel(timeout);
                        afterAnimating();
                        scope.$apply();
                    });
                } else {
                    // Ensure this call is async
                    $timeout(afterAnimating, 0);
                }

                function afterAnimating() {
                    if (afterAnimating.done) {
                        return;
                    }
                    afterAnimating.done = true;

                    domEl.remove();
                    if (done) {
                        done();
                    }
                }
            }

            $document.bind('keydown', function (evt) {
                var modal;

                if (evt.which === 27) {
                    modal = openedWindows.top();
                    if (modal && modal.value.keyboard) {
                        $rootScope.$apply(function () {
                            $modalStack.dismiss(modal.key);
                        });
                    }
                }
            });

            $modalStack.open = function (modalInstance, modal) {

                openedWindows.add(modalInstance, {
                    deferred: modal.deferred,
                    modalScope: modal.scope,
                    backdrop: modal.backdrop,
                    keyboard: modal.keyboard
                });

                var body = $document.find('body').eq(0),
                    currBackdropIndex = backdropIndex();

                if (currBackdropIndex >= 0 && !backdropDomEl) {
                    backdropScope = $rootScope.$new(true);
                    backdropScope.index = currBackdropIndex;
                    backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
                    body.append(backdropDomEl);
                }

                var angularDomEl = angular.element('<div modal-window></div>');
                angularDomEl.attr('window-class', modal.windowClass);
                angularDomEl.attr('index', openedWindows.length() - 1);
                angularDomEl.attr('animate', 'animate');
                angularDomEl.html(modal.content);

                var modalDomEl = $compile(angularDomEl)(modal.scope);
                openedWindows.top().value.modalDomEl = modalDomEl;
                body.append(modalDomEl);
                body.addClass(OPENED_MODAL_CLASS);
            };

            $modalStack.close = function (modalInstance, result) {
                var modalWindow = openedWindows.get(modalInstance).value;
                if (modalWindow) {
                    modalWindow.deferred.resolve(result);
                    removeModalWindow(modalInstance);
                }
            };

            $modalStack.dismiss = function (modalInstance, reason) {
                var modalWindow = openedWindows.get(modalInstance).value;
                if (modalWindow) {
                    modalWindow.deferred.reject(reason);
                    removeModalWindow(modalInstance);
                }
            };

            $modalStack.dismissAll = function (reason) {
                var topModal = this.getTop();
                while (topModal) {
                    this.dismiss(topModal.key, reason);
                    topModal = this.getTop();
                }
            };

            $modalStack.getTop = function () {
                return openedWindows.top();
            };

            return $modalStack;
        }])

    .provider('$modal', function () {

        var $modalProvider = {
            options: {
                backdrop: true, //can be also false or 'static'
                keyboard: true
            },
            $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
                function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

                    var $modal = {};

                    function getTemplatePromise(options) {
                        return options.template ? $q.when(options.template) :
                            $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                                return result.data;
                            });
                    }

                    function getResolvePromises(resolves) {
                        var promisesArr = [];
                        angular.forEach(resolves, function (value, key) {
                            if (angular.isFunction(value) || angular.isArray(value)) {
                                promisesArr.push($q.when($injector.invoke(value)));
                            }
                        });
                        return promisesArr;
                    }

                    $modal.open = function (modalOptions) {

                        var modalResultDeferred = $q.defer();
                        var modalOpenedDeferred = $q.defer();

                        //prepare an instance of a modal to be injected into controllers and returned to a caller
                        var modalInstance = {
                            result: modalResultDeferred.promise,
                            opened: modalOpenedDeferred.promise,
                            close: function (result) {
                                $modalStack.close(modalInstance, result);
                            },
                            dismiss: function (reason) {
                                $modalStack.dismiss(modalInstance, reason);
                            }
                        };

                        //merge and clean up options
                        modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                        modalOptions.resolve = modalOptions.resolve || {};

                        //verify options
                        if (!modalOptions.template && !modalOptions.templateUrl) {
                            throw new Error('One of template or templateUrl options is required.');
                        }

                        var templateAndResolvePromise =
                            $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


                        templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

                            var modalScope = (modalOptions.scope || $rootScope).$new();
                            modalScope.$close = modalInstance.close;
                            modalScope.$dismiss = modalInstance.dismiss;

                            var ctrlInstance, ctrlLocals = {};
                            var resolveIter = 1;

                            //controllers
                            if (modalOptions.controller) {
                                ctrlLocals.$scope = modalScope;
                                ctrlLocals.$modalInstance = modalInstance;
                                angular.forEach(modalOptions.resolve, function (value, key) {
                                    ctrlLocals[key] = tplAndVars[resolveIter++];
                                });

                                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                            }

                            $modalStack.open(modalInstance, {
                                scope: modalScope,
                                deferred: modalResultDeferred,
                                content: tplAndVars[0],
                                backdrop: modalOptions.backdrop,
                                keyboard: modalOptions.keyboard,
                                windowClass: modalOptions.windowClass
                            });

                        }, function resolveError(reason) {
                            modalResultDeferred.reject(reason);
                        });

                        templateAndResolvePromise.then(function () {
                            modalOpenedDeferred.resolve(true);
                        }, function () {
                            modalOpenedDeferred.reject(false);
                        });

                        return modalInstance;
                    };

                    return $modal;
                }]
        };

        return $modalProvider;
    });

angular.module('ui.bootstrap.pagination', [])

    .controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
        var self = this,
            setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

        this.init = function(defaultItemsPerPage) {
            if ($attrs.itemsPerPage) {
                $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                    self.itemsPerPage = parseInt(value, 10);
                    $scope.totalPages = self.calculateTotalPages();
                });
            } else {
                this.itemsPerPage = defaultItemsPerPage;
            }
        };

        this.noPrevious = function() {
            return this.page === 1;
        };
        this.noNext = function() {
            return this.page === $scope.totalPages;
        };

        this.isActive = function(page) {
            return this.page === page;
        };

        this.calculateTotalPages = function() {
            var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };

        this.getAttributeValue = function(attribute, defaultValue, interpolate) {
            return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
        };

        this.render = function() {
            this.page = parseInt($scope.page, 10) || 1;
            if (this.page > 0 && this.page <= $scope.totalPages) {
                $scope.pages = this.getPages(this.page, $scope.totalPages);
            }
        };

        $scope.selectPage = function(page) {
            if ( ! self.isActive(page) && page > 0 && page <= $scope.totalPages) {
                $scope.page = page;
                $scope.onSelectPage({ page: page });
            }
        };

        $scope.$watch('page', function() {
            self.render();
        });

        $scope.$watch('totalItems', function() {
            $scope.totalPages = self.calculateTotalPages();
        });

        $scope.$watch('totalPages', function(value) {
            setNumPages($scope.$parent, value); // Readonly variable

            if ( self.page > value ) {
                $scope.selectPage(value);
            } else {
                self.render();
            }
        });
    }])

    .constant('paginationConfig', {
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        rotate: true
    })

    .directive('pagination', ['$parse', 'paginationConfig', function($parse, config) {
        return {
            restrict: 'EA',
            scope: {
                page: '=',
                totalItems: '=',
                onSelectPage:' &'
            },
            controller: 'PaginationController',
            templateUrl: 'template/pagination/pagination.html',
            replace: true,
            link: function(scope, element, attrs, paginationCtrl) {

                // Setup configuration parameters
                var maxSize,
                    boundaryLinks  = paginationCtrl.getAttributeValue(attrs.boundaryLinks,  config.boundaryLinks      ),
                    directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks     ),
                    firstText      = paginationCtrl.getAttributeValue(attrs.firstText,      config.firstText,     true),
                    previousText   = paginationCtrl.getAttributeValue(attrs.previousText,   config.previousText,  true),
                    nextText       = paginationCtrl.getAttributeValue(attrs.nextText,       config.nextText,      true),
                    lastText       = paginationCtrl.getAttributeValue(attrs.lastText,       config.lastText,      true),
                    rotate         = paginationCtrl.getAttributeValue(attrs.rotate,         config.rotate);

                paginationCtrl.init(config.itemsPerPage);

                if (attrs.maxSize) {
                    scope.$parent.$watch($parse(attrs.maxSize), function(value) {
                        maxSize = parseInt(value, 10);
                        paginationCtrl.render();
                    });
                }

                // Create page object used in template
                function makePage(number, text, isActive, isDisabled) {
                    return {
                        number: number,
                        text: text,
                        active: isActive,
                        disabled: isDisabled
                    };
                }

                paginationCtrl.getPages = function(currentPage, totalPages) {
                    var pages = [];

                    // Default page limits
                    var startPage = 1, endPage = totalPages;
                    var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

                    // recompute if maxSize
                    if ( isMaxSized ) {
                        if ( rotate ) {
                            // Current page is displayed in the middle of the visible ones
                            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
                            endPage   = startPage + maxSize - 1;

                            // Adjust if limit is exceeded
                            if (endPage > totalPages) {
                                endPage   = totalPages;
                                startPage = endPage - maxSize + 1;
                            }
                        } else {
                            // Visible pages are paginated with maxSize
                            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

                            // Adjust last page if limit is exceeded
                            endPage = Math.min(startPage + maxSize - 1, totalPages);
                        }
                    }

                    // Add page number links
                    for (var number = startPage; number <= endPage; number++) {
                        var page = makePage(number, number, paginationCtrl.isActive(number), false);
                        pages.push(page);
                    }

                    // Add links to move between page sets
                    if ( isMaxSized && ! rotate ) {
                        if ( startPage > 1 ) {
                            var previousPageSet = makePage(startPage - 1, '...', false, false);
                            pages.unshift(previousPageSet);
                        }

                        if ( endPage < totalPages ) {
                            var nextPageSet = makePage(endPage + 1, '...', false, false);
                            pages.push(nextPageSet);
                        }
                    }

                    // Add previous & next links
                    if (directionLinks) {
                        var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
                        pages.unshift(previousPage);

                        var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
                        pages.push(nextPage);
                    }

                    // Add first & last links
                    if (boundaryLinks) {
                        var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
                        pages.unshift(firstPage);

                        var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
                        pages.push(lastPage);
                    }

                    return pages;
                };
            }
        };
    }])

    .constant('pagerConfig', {
        itemsPerPage: 10,
        previousText: '� Previous',
        nextText: 'Next �',
        align: true
    })

    .directive('pager', ['pagerConfig', function(config) {
        return {
            restrict: 'EA',
            scope: {
                page: '=',
                totalItems: '=',
                onSelectPage:' &'
            },
            controller: 'PaginationController',
            templateUrl: 'template/pagination/pager.html',
            replace: true,
            link: function(scope, element, attrs, paginationCtrl) {

                // Setup configuration parameters
                var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
                    nextText         = paginationCtrl.getAttributeValue(attrs.nextText,     config.nextText,     true),
                    align            = paginationCtrl.getAttributeValue(attrs.align,        config.align);

                paginationCtrl.init(config.itemsPerPage);

                // Create page object used in template
                function makePage(number, text, isDisabled, isPrevious, isNext) {
                    return {
                        number: number,
                        text: text,
                        disabled: isDisabled,
                        previous: ( align && isPrevious ),
                        next: ( align && isNext )
                    };
                }

                paginationCtrl.getPages = function(currentPage) {
                    return [
                        makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false),
                        makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true)
                    ];
                };
            }
        };
    }]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'ui.bootstrap.tooltip', [ 'ui.bootstrap.position', 'ui.bootstrap.bindHtml' ] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
    .provider( '$tooltip', function () {
        // The default options tooltip and popover.
        var defaultOptions = {
            placement: 'top',
            animation: true,
            popupDelay: 0
        };

        // Default hide triggers for each show trigger
        var triggerMap = {
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur'
        };

        // The options specified to the provider globally.
        var globalOptions = {};

        /**
         * `options({})` allows global configuration of all tooltips in the
         * application.
         *
         *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
         */
        this.options = function( value ) {
            angular.extend( globalOptions, value );
        };

        /**
         * This allows you to extend the set of trigger mappings available. E.g.:
         *
         *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
         */
        this.setTriggers = function setTriggers ( triggers ) {
            angular.extend( triggerMap, triggers );
        };

        /**
         * This is a helper function for translating camel-case to snake-case.
         */
        function snake_case(name){
            var regexp = /[A-Z]/g;
            var separator = '-';
            return name.replace(regexp, function(letter, pos) {
                return (pos ? separator : '') + letter.toLowerCase();
            });
        }

        /**
         * Returns the actual instance of the $tooltip service.
         * TODO support multiple triggers
         */
        this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ( $window, $compile, $timeout, $parse, $document, $position, $interpolate ) {
            return function $tooltip ( type, prefix, defaultTriggerShow ) {
                var options = angular.extend( {}, defaultOptions, globalOptions );

                /**
                 * Returns an object of show and hide triggers.
                 *
                 * If a trigger is supplied,
                 * it is used to show the tooltip; otherwise, it will use the `trigger`
                 * option passed to the `$tooltipProvider.options` method; else it will
                 * default to the trigger supplied to this directive factory.
                 *
                 * The hide trigger is based on the show trigger. If the `trigger` option
                 * was passed to the `$tooltipProvider.options` method, it will use the
                 * mapped trigger from `triggerMap` or the passed trigger if the map is
                 * undefined; otherwise, it uses the `triggerMap` value of the show
                 * trigger; else it will just use the show trigger.
                 */
                function getTriggers ( trigger ) {
                    var show = trigger || options.trigger || defaultTriggerShow;
                    var hide = triggerMap[show] || show;
                    return {
                        show: show,
                        hide: hide
                    };
                }

                var directiveName = snake_case( type );

                var startSym = $interpolate.startSymbol();
                var endSym = $interpolate.endSymbol();
                var template =
                    '<div '+ directiveName +'-popup '+
                    'title="'+startSym+'tt_title'+endSym+'" '+
                    'content="'+startSym+'tt_content'+endSym+'" '+
                    'placement="'+startSym+'tt_placement'+endSym+'" '+
                    'animation="tt_animation" '+
                    'is-open="tt_isOpen"'+
                    'compile-scope="$parent"'+
                    '>'+
                    '</div>';

                return {
                    restrict: 'EA',
                    scope: true,
                    compile: function (tElem, tAttrs) {
                        var tooltipLinker = $compile( template );

                        return function link ( scope, element, attrs ) {
                            var tooltip;
                            var transitionTimeout;
                            var popupTimeout;
                            var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;
                            var triggers = getTriggers( undefined );
                            var hasRegisteredTriggers = false;
                            var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);

                            var positionTooltip = function (){
                                var position,
                                    ttWidth,
                                    ttHeight,
                                    ttPosition;
                                // Get the position of the directive element.
                                position = appendToBody ? $position.offset( element ) : $position.position( element );

                                // Get the height and width of the tooltip so we can center it.
                                ttWidth = tooltip.prop( 'offsetWidth' );
                                ttHeight = tooltip.prop( 'offsetHeight' );

                                // Calculate the tooltip's top and left coordinates to center it with
                                // this directive.
                                switch ( scope.tt_placement ) {
                                   /* case 'right':
                                        ttPosition = {
                                            top: position.top + position.height / 2.5 - ttHeight / 2.5,
                                            left: position.left + position.width
                                        };
                                        break;
                                    case 'bottom':
                                        ttPosition = {
                                            top: position.top + position.height/2,
                                            left: position.left + position.width / 2 - ttWidth / 2
                                        };
                                        break;
                                    case 'left':
                                        ttPosition = {
                                            top: position.top + position.height /2.5 - ttHeight /2.5,
                                            left: position.left - ttWidth/2
                                        };
                                        break;*/
                                    default:
                                        ttPosition = {
                                            top: position.top - ttHeight/2,
                                            left: position.left + position.width / 2 - ttWidth / 2
                                        };
                                        break;
                                }

                                ttPosition.top += 'px';
                                ttPosition.left += 'px';

                                // Now set the calculated positioning.
                                tooltip.css( ttPosition );

                            };

                            // By default, the tooltip is not open.
                            // TODO add ability to start tooltip opened
                            scope.tt_isOpen = false;

                            function toggleTooltipBind () {
                                if ( ! scope.tt_isOpen ) {
                                    showTooltipBind();
                                } else {
                                    hideTooltipBind();
                                }
                            }

                            // Show the tooltip with delay if specified, otherwise show it immediately
                            function showTooltipBind() {
                                if(hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {
                                    return;
                                }
                                if ( scope.tt_popupDelay ) {
                                    popupTimeout = $timeout( show, scope.tt_popupDelay, false );
                                    popupTimeout.then(function(reposition){reposition();});
                                } else {

                                    show()();
                                }
                            }

                            function hideTooltipBind () {
                                scope.$apply(function () {
                                    setTimeout(function(){
                                        hide();
                                    },400);

                                });


                            }

                            // Show the tooltip popup element.
                            function show() {


                                // Don't show empty tooltips.
                                if ( ! scope.tt_content ) {
                                    return angular.noop;
                                }

                                createTooltip();

                                // If there is a pending remove transition, we must cancel it, lest the
                                // tooltip be mysteriously removed.
                                if ( transitionTimeout ) {
                                    $timeout.cancel( transitionTimeout );
                                }

                                // Set the initial positioning.
                                tooltip.css({ top: 0, left: 0, display: 'block' });

                                // Now we add it to the DOM because need some info about it. But it's not
                                // visible yet anyway.
                                if ( appendToBody ) {
                                    $document.find( 'body' ).append( tooltip );
                                } else {
                                    element.after( tooltip );
                                }

                                positionTooltip();

                                // And show the tooltip.
                                scope.tt_isOpen = true;
                                scope.$digest(); // digest required as $apply is not called

                                // Return positioning function as promise callback for correct
                                // positioning after draw.
                                return positionTooltip;
                            }

                            // Hide the tooltip popup element.
                            function hide() {
                                // First things first: we don't show it anymore.
                                scope.tt_isOpen = false;

                                //if tooltip is going to be shown after delay, we must cancel this
                                $timeout.cancel( popupTimeout );

                                // And now we remove it from the DOM. However, if we have animation, we
                                // need to wait for it to expire beforehand.
                                // FIXME: this is a placeholder for a port of the transitions library.
                                if ( scope.tt_animation ) {
                                    transitionTimeout = $timeout(removeTooltip, 500);
                                } else {
                                    removeTooltip();
                                }
                            }

                            function createTooltip() {
                                // There can only be one tooltip element per directive shown at once.
                                if (tooltip) {
                                    return;
                                }
                                tooltip = tooltipLinker(scope, function () {});

                                // Get contents rendered into the tooltip
                                scope.$digest();
                            }

                            function removeTooltip( destroy ) {
                                if (tooltip) {
                                    if (destroy) {
                                        tooltip.remove();
                                        tooltip = null;
                                    } else {
                                        // equals to "tooltip.detach();"
                                        angular.forEach( tooltip, function( e ) {
                                            if (e.parentNode) {
                                                e.parentNode.removeChild( e );
                                            }
                                        } );
                                    }
                                }
                            }

                            /**
                             * Observe the relevant attributes.
                             */
                            attrs.$observe( type, function ( val ) {
                                scope.tt_content = val;

                                if (!val && scope.tt_isOpen ) {
                                    hide();
                                }
                            });

                            attrs.$observe( prefix+'Title', function ( val ) {
                                scope.tt_title = val;
                            });

                            attrs.$observe( prefix+'Placement', function ( val ) {
                                scope.tt_placement = angular.isDefined( val ) ? val : options.placement;
                            });

                            attrs.$observe( prefix+'PopupDelay', function ( val ) {
                                var delay = parseInt( val, 10);
                                scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
                            });

                            var unregisterTriggers = function() {
                                if (hasRegisteredTriggers) {
                                    element.unbind( triggers.show, showTooltipBind );
                                    element.unbind( triggers.hide, hideTooltipBind );
                                }
                            };

                            attrs.$observe( prefix+'Trigger', function ( val ) {
                                unregisterTriggers();

                                triggers = getTriggers( val );

                                if ( triggers.show === triggers.hide ) {
                                    element.bind( triggers.show, toggleTooltipBind );
                                } else {
                                    element.bind( triggers.show, showTooltipBind );
                                    element.bind( triggers.hide, hideTooltipBind );
                                }

                                hasRegisteredTriggers = true;
                            });

                            var animation = scope.$eval(attrs[prefix + 'Animation']);
                            scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;

                            attrs.$observe( prefix+'AppendToBody', function ( val ) {
                                appendToBody = angular.isDefined( val ) ? $parse( val )( scope ) : appendToBody;
                            });

                            // if a tooltip is attached to <body> we need to remove it on
                            // location change as its parent scope will probably not be destroyed
                            // by the change.
                            if ( appendToBody ) {
                                scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
                                    if ( scope.tt_isOpen ) {
                                        hide();
                                    }
                                });
                            }

                            // Make sure tooltip is destroyed and removed.
                            scope.$on('$destroy', function onDestroyTooltip() {
                                $timeout.cancel( transitionTimeout );
                                $timeout.cancel( popupTimeout );
                                unregisterTriggers();
                                removeTooltip( true );
                            });
                        };
                    }
                };
            };
        }];
    })

    .directive( 'tooltipPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/tooltip/tooltip-popup.html'
        };
    })

    .directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
    }])

    .directive( 'tooltipHtmlUnsafePopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
        };
    })

    .directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
    }]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )

    .directive( 'popoverPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/popover/popover.html'
        };
    })

    .directive( 'popover', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'popover', 'popover', 'click' );
    }])

    .directive( 'popoverTemplatePopup', [ '$http', '$templateCache', '$compile', '$timeout', function ( $http, $templateCache, $compile, $timeout ) {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&', compileScope: '&' },
            templateUrl: 'template/popover/popover-template.html',
            link: function( scope, iElement ) {
                scope.$watch( 'content', function( templateUrl ) {
                    if ( !templateUrl ) { return; }
                    $http.get( templateUrl, { cache: $templateCache } )
                        .then( function( response ) {
                            var contentEl = angular.element( iElement[0].querySelector( '.popover-content' ) );
                            contentEl.children().remove();
                            contentEl.append( $compile( response.data.trim() )( scope.compileScope() ) );
                            $timeout(function(){ scope.compileScope().$digest(); });
                        });
                });
            }
        };
    }])

    .directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {
        return $tooltip( 'popoverTemplate', 'popover', 'click' );
    }]);

angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition'])

    .constant('progressConfig', {
        animate: true,
        max: 100
    })

    .controller('ProgressController', ['$scope', '$attrs', 'progressConfig', '$transition', function($scope, $attrs, progressConfig, $transition) {
        var self = this,
            bars = [],
            max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max,
            animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

        this.addBar = function(bar, element) {
            var oldValue = 0, index = bar.$parent.$index;
            if ( angular.isDefined(index) &&  bars[index] ) {
                oldValue = bars[index].value;
            }
            bars.push(bar);

            this.update(element, bar.value, oldValue);

            bar.$watch('value', function(value, oldValue) {
                if (value !== oldValue) {
                    self.update(element, value, oldValue);
                }
            });

            bar.$on('$destroy', function() {
                self.removeBar(bar);
            });
        };

        // Update bar element width
        this.update = function(element, newValue, oldValue) {
            var percent = this.getPercentage(newValue);

            if (animate) {
                element.css('width', this.getPercentage(oldValue) + '%');
                $transition(element, {width: percent + '%'});
            } else {
                element.css({'transition': 'none', 'width': percent + '%'});
            }
        };

        this.removeBar = function(bar) {
            bars.splice(bars.indexOf(bar), 1);
        };

        this.getPercentage = function(value) {
            return Math.round(100 * value / max);
        };
    }])

    .directive('progress', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            controller: 'ProgressController',
            require: 'progress',
            scope: {},
            template: '<div class="progress" ng-transclude></div>'
            //templateUrl: 'template/progressbar/progress.html' // Works in AngularJS 1.2
        };
    })

    .directive('bar', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^progress',
            scope: {
                value: '=',
                type: '@'
            },
            templateUrl: 'template/progressbar/bar.html',
            link: function(scope, element, attrs, progressCtrl) {
                progressCtrl.addBar(scope, element);
            }
        };
    })

    .directive('progressbar', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            controller: 'ProgressController',
            scope: {
                value: '=',
                type: '@'
            },
            templateUrl: 'template/progressbar/progressbar.html',
            link: function(scope, element, attrs, progressCtrl) {
                progressCtrl.addBar(scope, angular.element(element.children()[0]));
            }
        };
    });
angular.module('ui.bootstrap.rating', [])

    .constant('ratingConfig', {
        max: 5,
        stateOn: null,
        stateOff: null
    })

    .controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function($scope, $attrs, $parse, ratingConfig) {

        this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
        this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
        this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

        this.createRateObjects = function(states) {
            var defaultOptions = {
                stateOn: this.stateOn,
                stateOff: this.stateOff
            };

            for (var i = 0, n = states.length; i < n; i++) {
                states[i] = angular.extend({ index: i }, defaultOptions, states[i]);
            }
            return states;
        };

        // Get objects used in template
        $scope.range = angular.isDefined($attrs.ratingStates) ?  this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))): this.createRateObjects(new Array(this.maxRange));

        $scope.rate = function(value) {
            if ( $scope.value !== value && !$scope.readonly ) {
                $scope.value = value;
            }
        };

        $scope.enter = function(value) {
            if ( ! $scope.readonly ) {
                $scope.val = value;
            }
            $scope.onHover({value: value});
        };

        $scope.reset = function() {
            $scope.val = angular.copy($scope.value);
            $scope.onLeave();
        };

        $scope.$watch('value', function(value) {
            $scope.val = value;
        });

        $scope.readonly = false;
        if ($attrs.readonly) {
            $scope.$parent.$watch($parse($attrs.readonly), function(value) {
                $scope.readonly = !!value;
            });
        }
    }])

    .directive('rating', function() {
        return {
            restrict: 'EA',
            scope: {
                value: '=',
                onHover: '&',
                onLeave: '&'
            },
            controller: 'RatingController',
            templateUrl: 'template/rating/rating.html',
            replace: true
        };
    });

/**
 * @ngdoc overview
 * @name ui.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('ui.bootstrap.tabs', [])

    .controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function(tab) {
            angular.forEach(tabs, function(tab) {
                tab.active = false;
            });
            tab.active = true;
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            if (tabs.length === 1 || tab.active) {
                ctrl.select(tab);
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected
            if (tab.active && tabs.length > 1) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };
    }])

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
 <example module="ui.bootstrap">
 <file name="index.html">
 <tabset>
 <tab heading="Tab 1"><b>First</b> Content!</tab>
 <tab heading="Tab 2"><i>Second</i> Content!</tab>
 </tabset>
 <hr />
 <tabset vertical="true">
 <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
 <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
 </tabset>
 <tabset justified="true">
 <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>
 <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>
 </tabset>
 </file>
 </example>
 */
    .directive('tabset', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {},
            controller: 'TabsetController',
            templateUrl: 'template/tabs/tabset.html',
            link: function(scope, element, attrs) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
                scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
            }
        };
    })

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
 <example module="ui.bootstrap">
 <file name="index.html">
 <div ng-controller="TabsDemoCtrl">
 <button class="btn btn-small" ng-click="items[0].active = true">
 Select item 1, using active binding
 </button>
 <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
 Enable/disable item 2, using disabled binding
 </button>
 <br />
 <tabset>
 <tab heading="Tab 1">First Tab</tab>
 <tab select="alertMe()">
 <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
 Second Tab, with alert callback and html heading!
 </tab>
 <tab ng-repeat="item in items"
 heading="{{item.title}}"
 disabled="item.disabled"
 active="item.active">
 {{item.content}}
 </tab>
 </tabset>
 </div>
 </file>
 <file name="script.js">
 function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
 </file>
 </example>
 */

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
 <example module="ui.bootstrap">
 <file name="index.html">
 <tabset>
 <tab>
 <tab-heading><b>HTML</b> in my titles?!</tab-heading>
 And some content, too!
 </tab>
 <tab>
 <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
 That's right.
 </tab>
 </tabset>
 </file>
 </example>
 */
    .directive('tab', ['$parse', function($parse) {
        return {
            require: '^tabset',
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/tabs/tab.html',
            transclude: true,
            scope: {
                heading: '@',
                onSelect: '&select', //This callback is called in contentHeadingTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            controller: function() {
                //Empty controller so other directives can require being 'under' a tab
            },
            compile: function(elm, attrs, transclude) {
                return function postLink(scope, elm, attrs, tabsetCtrl) {
                    var getActive, setActive;
                    if (attrs.active) {
                        getActive = $parse(attrs.active);
                        setActive = getActive.assign;
                        scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
                            // Avoid re-initializing scope.active as it is already initialized
                            // below. (watcher is called async during init with value ===
                            // oldVal)
                            if (value !== oldVal) {
                                scope.active = !!value;
                            }
                        });
                        scope.active = getActive(scope.$parent);
                    } else {
                        setActive = getActive = angular.noop;
                    }

                    scope.$watch('active', function(active) {
                        // Note this watcher also initializes and assigns scope.active to the
                        // attrs.active expression.
                        setActive(scope.$parent, active);
                        if (active) {
                            tabsetCtrl.select(scope);
                            scope.onSelect();
                        } else {
                            scope.onDeselect();
                        }
                    });

                    scope.disabled = false;
                    if ( attrs.disabled ) {
                        scope.$parent.$watch($parse(attrs.disabled), function(value) {
                            scope.disabled = !! value;
                        });
                    }

                    scope.select = function() {
                        if ( ! scope.disabled ) {
                            scope.active = true;
                        }
                    };

                    tabsetCtrl.addTab(scope);
                    scope.$on('$destroy', function() {
                        tabsetCtrl.removeTab(scope);
                    });


                    //We need to transclude later, once the content container is ready.
                    //when this link happens, we're inside a tab heading.
                    scope.$transcludeFn = transclude;
                };
            }
        };
    }])

    .directive('tabHeadingTransclude', [function() {
        return {
            restrict: 'A',
            require: '^tab',
            link: function(scope, elm, attrs, tabCtrl) {
                scope.$watch('headingElement', function updateHeadingElement(heading) {
                    if (heading) {
                        elm.html('');
                        elm.append(heading);
                    }
                });
            }
        };
    }])

    .directive('tabContentTransclude', function() {
        return {
            restrict: 'A',
            require: '^tabset',
            link: function(scope, elm, attrs) {
                var tab = scope.$eval(attrs.tabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function(contents) {
                    angular.forEach(contents, function(node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };
        function isTabHeading(node) {
            return node.tagName &&  (
                    node.hasAttribute('tab-heading') ||
                    node.hasAttribute('data-tab-heading') ||
                    node.tagName.toLowerCase() === 'tab-heading' ||
                    node.tagName.toLowerCase() === 'data-tab-heading'
                );
        }
    })

;

angular.module('ui.bootstrap.timepicker', [])

    .constant('timepickerConfig', {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: true,
        meridians: null,
        readonlyInput: false,
        mousewheel: true
    })

    .directive('timepicker', ['$parse', '$log', 'timepickerConfig', '$locale', function ($parse, $log, timepickerConfig, $locale) {
        return {
            restrict: 'EA',
            require:'?^ngModel',
            replace: true,
            scope: {},
            templateUrl: 'template/timepicker/timepicker.html',
            link: function(scope, element, attrs, ngModel) {
                if ( !ngModel ) {
                    return; // do nothing if no ng-model
                }

                var selected = new Date(),
                    meridians = angular.isDefined(attrs.meridians) ? scope.$parent.$eval(attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;

                var hourStep = timepickerConfig.hourStep;
                if (attrs.hourStep) {
                    scope.$parent.$watch($parse(attrs.hourStep), function(value) {
                        hourStep = parseInt(value, 10);
                    });
                }

                var minuteStep = timepickerConfig.minuteStep;
                if (attrs.minuteStep) {
                    scope.$parent.$watch($parse(attrs.minuteStep), function(value) {
                        minuteStep = parseInt(value, 10);
                    });
                }

                // 12H / 24H mode
                scope.showMeridian = timepickerConfig.showMeridian;
                if (attrs.showMeridian) {
                    scope.$parent.$watch($parse(attrs.showMeridian), function(value) {
                        scope.showMeridian = !!value;

                        if ( ngModel.$error.time ) {
                            // Evaluate from template
                            var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
                            if (angular.isDefined( hours ) && angular.isDefined( minutes )) {
                                selected.setHours( hours );
                                refresh();
                            }
                        } else {
                            updateTemplate();
                        }
                    });
                }

                // Get scope.hours in 24H mode if valid
                function getHoursFromTemplate ( ) {
                    var hours = parseInt( scope.hours, 10 );
                    var valid = ( scope.showMeridian ) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
                    if ( !valid ) {
                        return undefined;
                    }

                    if ( scope.showMeridian ) {
                        if ( hours === 12 ) {
                            hours = 0;
                        }
                        if ( scope.meridian === meridians[1] ) {
                            hours = hours + 12;
                        }
                    }
                    return hours;
                }

                function getMinutesFromTemplate() {
                    var minutes = parseInt(scope.minutes, 10);
                    return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;
                }

                function pad( value ) {
                    return ( angular.isDefined(value) && value.toString().length < 2 ) ? '0' + value : value;
                }

                // Input elements
                var inputs = element.find('input'), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);

                // Respond on mousewheel spin
                var mousewheel = (angular.isDefined(attrs.mousewheel)) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
                if ( mousewheel ) {

                    var isScrollingUp = function(e) {
                        if (e.originalEvent) {
                            e = e.originalEvent;
                        }
                        //pick correct delta variable depending on event
                        var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
                        return (e.detail || delta > 0);
                    };

                    hoursInputEl.bind('mousewheel wheel', function(e) {
                        scope.$apply( (isScrollingUp(e)) ? scope.incrementHours() : scope.decrementHours() );
                        e.preventDefault();
                    });

                    minutesInputEl.bind('mousewheel wheel', function(e) {
                        scope.$apply( (isScrollingUp(e)) ? scope.incrementMinutes() : scope.decrementMinutes() );
                        e.preventDefault();
                    });
                }

                scope.readonlyInput = (angular.isDefined(attrs.readonlyInput)) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
                if ( ! scope.readonlyInput ) {

                    var invalidate = function(invalidHours, invalidMinutes) {
                        ngModel.$setViewValue( null );
                        ngModel.$setValidity('time', false);
                        if (angular.isDefined(invalidHours)) {
                            scope.invalidHours = invalidHours;
                        }
                        if (angular.isDefined(invalidMinutes)) {
                            scope.invalidMinutes = invalidMinutes;
                        }
                    };

                    scope.updateHours = function() {
                        var hours = getHoursFromTemplate();

                        if ( angular.isDefined(hours) ) {
                            selected.setHours( hours );
                            refresh( 'h' );
                        } else {
                            invalidate(true);
                        }
                    };

                    hoursInputEl.bind('blur', function(e) {
                        if ( !scope.validHours && scope.hours < 10) {
                            scope.$apply( function() {
                                scope.hours = pad( scope.hours );
                            });
                        }
                    });

                    scope.updateMinutes = function() {
                        var minutes = getMinutesFromTemplate();

                        if ( angular.isDefined(minutes) ) {
                            selected.setMinutes( minutes );
                            refresh( 'm' );
                        } else {
                            invalidate(undefined, true);
                        }
                    };

                    minutesInputEl.bind('blur', function(e) {
                        if ( !scope.invalidMinutes && scope.minutes < 10 ) {
                            scope.$apply( function() {
                                scope.minutes = pad( scope.minutes );
                            });
                        }
                    });
                } else {
                    scope.updateHours = angular.noop;
                    scope.updateMinutes = angular.noop;
                }

                ngModel.$render = function() {
                    var date = ngModel.$modelValue ? new Date( ngModel.$modelValue ) : null;

                    if ( isNaN(date) ) {
                        ngModel.$setValidity('time', false);
                        $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                    } else {
                        if ( date ) {
                            selected = date;
                        }
                        makeValid();
                        updateTemplate();
                    }
                };

                // Call internally when we know that model is valid.
                function refresh( keyboardChange ) {
                    makeValid();
                    ngModel.$setViewValue( new Date(selected) );
                    updateTemplate( keyboardChange );
                }

                function makeValid() {
                    ngModel.$setValidity('time', true);
                    scope.invalidHours = false;
                    scope.invalidMinutes = false;
                }

                function updateTemplate( keyboardChange ) {
                    var hours = selected.getHours(), minutes = selected.getMinutes();

                    if ( scope.showMeridian ) {
                        hours = ( hours === 0 || hours === 12 ) ? 12 : hours % 12; // Convert 24 to 12 hour system
                    }
                    scope.hours =  keyboardChange === 'h' ? hours : pad(hours);
                    scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
                    scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
                }

                function addMinutes( minutes ) {
                    var dt = new Date( selected.getTime() + minutes * 60000 );
                    selected.setHours( dt.getHours(), dt.getMinutes() );
                    refresh();
                }

                scope.incrementHours = function() {
                    addMinutes( hourStep * 60 );
                };
                scope.decrementHours = function() {
                    addMinutes( - hourStep * 60 );
                };
                scope.incrementMinutes = function() {
                    addMinutes( minuteStep );
                };
                scope.decrementMinutes = function() {
                    addMinutes( - minuteStep );
                };
                scope.toggleMeridian = function() {
                    addMinutes( 12 * 60 * (( selected.getHours() < 12 ) ? 1 : -1) );
                };
            }
        };
    }]);

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
    .factory('typeaheadParser', ['$parse', function ($parse) {

        //                      00000111000000000000022200000000000000003333333333333330000000000044000
        var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

        return {
            parse:function (input) {

                var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
                if (!match) {
                    throw new Error(
                        "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
                        " but got '" + input + "'.");
                }

                return {
                    itemName:match[3],
                    source:$parse(match[4]),
                    viewMapper:$parse(match[2] || match[1]),
                    modelMapper:$parse(match[1])
                };
            }
        };
    }])

    .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
        function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

            var HOT_KEYS = [9, 13, 27, 38, 40];

            return {
                require:'ngModel',
                link:function (originalScope, element, attrs, modelCtrl) {

                    //SUPPORTED ATTRIBUTES (OPTIONS)

                    //minimal no of characters that needs to be entered before typeahead kicks-in
                    var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

                    //minimal wait time after last character typed before typehead kicks-in
                    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

                    //should it restrict model values to the ones selected from the popup only?
                    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

                    //binding to a variable that indicates if matches are being retrieved asynchronously
                    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

                    //a callback executed when a match is selected
                    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

                    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

                    var appendToBody =  attrs.typeaheadAppendToBody ? $parse(attrs.typeaheadAppendToBody) : false;

                    //INTERNAL VARIABLES

                    //model setter executed upon match selection
                    var $setModelValue = $parse(attrs.ngModel).assign;

                    //expressions used by typeahead
                    var parserResult = typeaheadParser.parse(attrs.typeahead);

                    var hasFocus;

                    //pop-up element used to display matches
                    var popUpEl = angular.element('<div typeahead-popup></div>');
                    popUpEl.attr({
                        matches: 'matches',
                        active: 'activeIdx',
                        select: 'select(activeIdx)',
                        query: 'query',
                        position: 'position'
                    });
                    //custom item template
                    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
                    }

                    //create a child scope for the typeahead directive so we are not polluting original scope
                    //with typeahead-specific data (matches, query etc.)
                    var scope = originalScope.$new();
                    originalScope.$on('$destroy', function(){
                        scope.$destroy();
                    });

                    var resetMatches = function() {
                        scope.matches = [];
                        scope.activeIdx = -1;
                    };

                    var getMatchesAsync = function(inputValue) {

                        var locals = {$viewValue: inputValue};
                        isLoadingSetter(originalScope, true);
                        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

                            //it might happen that several async queries were in progress if a user were typing fast
                            //but we are interested only in responses that correspond to the current view value
                            if (inputValue === modelCtrl.$viewValue && hasFocus) {
                                if (matches.length > 0) {

                                    scope.activeIdx = 0;
                                    scope.matches.length = 0;

                                    //transform labels
                                    for(var i=0; i<matches.length; i++) {
                                        locals[parserResult.itemName] = matches[i];
                                        scope.matches.push({
                                            label: parserResult.viewMapper(scope, locals),
                                            model: matches[i]
                                        });
                                    }

                                    scope.query = inputValue;
                                    //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                    //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                    //due to other elements being rendered
                                    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                                    scope.position.top = scope.position.top + element.prop('offsetHeight');

                                } else {
                                    resetMatches();
                                }
                                isLoadingSetter(originalScope, false);
                            }
                        }, function(){
                            resetMatches();
                            isLoadingSetter(originalScope, false);
                        });
                    };

                    resetMatches();

                    //we need to propagate user's query so we can higlight matches
                    scope.query = undefined;

                    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
                    var timeoutPromise;

                    //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                    //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                    modelCtrl.$parsers.unshift(function (inputValue) {

                        hasFocus = true;

                        if (inputValue && inputValue.length >= minSearch) {
                            if (waitTime > 0) {
                                if (timeoutPromise) {
                                    $timeout.cancel(timeoutPromise);//cancel previous timeout
                                }
                                timeoutPromise = $timeout(function () {
                                    getMatchesAsync(inputValue);
                                }, waitTime);
                            } else {
                                getMatchesAsync(inputValue);
                            }
                        } else {
                            isLoadingSetter(originalScope, false);
                            resetMatches();
                        }

                        if (isEditable) {
                            return inputValue;
                        } else {
                            if (!inputValue) {
                                // Reset in case user had typed something previously.
                                modelCtrl.$setValidity('editable', true);
                                return inputValue;
                            } else {
                                modelCtrl.$setValidity('editable', false);
                                return undefined;
                            }
                        }
                    });

                    modelCtrl.$formatters.push(function (modelValue) {

                        var candidateViewValue, emptyViewValue;
                        var locals = {};

                        if (inputFormatter) {

                            locals['$model'] = modelValue;
                            return inputFormatter(originalScope, locals);

                        } else {

                            //it might happen that we don't have enough info to properly render input value
                            //we need to check for this situation and simply return model value if we can't apply custom formatting
                            locals[parserResult.itemName] = modelValue;
                            candidateViewValue = parserResult.viewMapper(originalScope, locals);
                            locals[parserResult.itemName] = undefined;
                            emptyViewValue = parserResult.viewMapper(originalScope, locals);

                            return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
                        }
                    });

                    scope.select = function (activeIdx) {
                        //called from within the $digest() cycle
                        var locals = {};
                        var model, item;

                        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                        model = parserResult.modelMapper(originalScope, locals);
                        $setModelValue(originalScope, model);
                        modelCtrl.$setValidity('editable', true);

                        onSelectCallback(originalScope, {
                            $item: item,
                            $model: model,
                            $label: parserResult.viewMapper(originalScope, locals)
                        });

                        resetMatches();

                        //return focus to the input element if a mach was selected via a mouse click event
                        element[0].focus();
                    };

                    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                    element.bind('keydown', function (evt) {

                        //typeahead is open and an "interesting" key was pressed
                        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                            return;
                        }

                        evt.preventDefault();

                        if (evt.which === 40) {
                            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                            scope.$digest();

                        } else if (evt.which === 38) {
                            scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                            scope.$digest();

                        } else if (evt.which === 13 || evt.which === 9) {
                            scope.$apply(function () {
                                scope.select(scope.activeIdx);
                            });

                        } else if (evt.which === 27) {
                            evt.stopPropagation();

                            resetMatches();
                            scope.$digest();
                        }
                    });

                    element.bind('blur', function (evt) {
                        hasFocus = false;
                    });

                    // Keep reference to click handler to unbind it.
                    var dismissClickHandler = function (evt) {
                        if (element[0] !== evt.target) {
                            resetMatches();
                            scope.$digest();
                        }
                    };

                    $document.bind('click', dismissClickHandler);

                    originalScope.$on('$destroy', function(){
                        $document.unbind('click', dismissClickHandler);
                    });

                    var $popup = $compile(popUpEl)(scope);
                    if ( appendToBody ) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }
                }
            };

        }])

    .directive('typeaheadPopup', function () {
        return {
            restrict:'EA',
            scope:{
                matches:'=',
                query:'=',
                active:'=',
                position:'=',
                select:'&'
            },
            replace:true,
            templateUrl:'template/typeahead/typeahead-popup.html',
            link:function (scope, element, attrs) {

                scope.templateUrl = attrs.templateUrl;

                scope.isOpen = function () {
                    return scope.matches.length > 0;
                };

                scope.isActive = function (matchIdx) {
                    return scope.active == matchIdx;
                };

                scope.selectActive = function (matchIdx) {
                    scope.active = matchIdx;
                };

                scope.selectMatch = function (activeIdx) {
                    scope.select({activeIdx:activeIdx});
                };
            }
        };
    })

    .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
        return {
            restrict:'EA',
            scope:{
                index:'=',
                match:'=',
                query:'='
            },
            link:function (scope, element, attrs) {
                var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
                $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
                    element.replaceWith($compile(tplContent.trim())(scope));
                });
            }
        };
    }])

    .filter('typeaheadHighlight', function() {

        function escapeRegexp(queryToEscape) {
            return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }

        return function(matchItem, query) {
            return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
        };
    });
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/accordion/accordion-group.html",
        "<div class=\"panel panel-default\">\n" +
        "  <div class=\"panel-heading\">\n" +
        "    <h4 class=\"panel-title\">\n" +
        "      <a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\" accordion-transclude=\"heading\">{{heading}}</a>\n" +
        "    </h4>\n" +
        "  </div>\n" +
        "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
        "	  <div class=\"panel-body\" ng-transclude></div>\n" +
        "  </div>\n" +
        "</div>");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/accordion/accordion.html",
        "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/alert/alert.html",
        "<div class='alert' ng-class='\"alert-\" + (type || \"warning\")'>\n" +
        "    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
        "    <div ng-transclude></div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/carousel/carousel.html",
        "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\">\n" +
        "    <ol class=\"carousel-indicators\" ng-show=\"slides().length > 1\">\n" +
        "        <li ng-repeat=\"slide in slides()\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
        "    </ol>\n" +
        "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
        "    <a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides().length > 1\"><span class=\"icon-prev\"></span></a>\n" +
        "    <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides().length > 1\"><span class=\"icon-next\"></span></a>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/carousel/slide.html",
        "<div ng-class=\"{\n" +
        "    'active': leaving || (active && !entering),\n" +
        "    'prev': (next || active) && direction=='prev',\n" +
        "    'next': (next || active) && direction=='next',\n" +
        "    'right': direction=='prev',\n" +
        "    'left': direction=='next'\n" +
        "  }\" class=\"item text-center\" ng-transclude></div>\n" +
        "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/datepicker.html",
        "<table>\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th colspan=\"{{rows[0].length - 2 + showWeekNumbers}}\"><button type=\"button\" class=\"btn btn-default btn-sm btn-block\" ng-click=\"toggleMode()\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "    <tr ng-show=\"labels.length > 0\" class=\"h6\">\n" +
        "      <th ng-show=\"showWeekNumbers\" class=\"text-center\">#</th>\n" +
        "      <th ng-repeat=\"label in labels\" class=\"text-center\">{{label}}</th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr ng-repeat=\"row in rows\">\n" +
        "      <td ng-show=\"showWeekNumbers\" class=\"text-center\"><em>{{ getWeekNumber(row) }}</em></td>\n" +
        "      <td ng-repeat=\"dt in row\" class=\"text-center\">\n" +
        "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\"><span ng-class=\"{'text-muted': dt.secondary}\">{{dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/datepicker/popup.html",
        "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
        "	<li ng-transclude></li>\n" +
        "	<li ng-show=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
        "		<span class=\"btn-group\">\n" +
        "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"today()\">{{currentText}}</button>\n" +
        "			<button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"showWeeks = ! showWeeks\" ng-class=\"{active: showWeeks}\">{{toggleWeeksText}}</button>\n" +
        "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"clear()\">{{clearText}}</button>\n" +
        "		</span>\n" +
        "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"isOpen = false\">{{closeText}}</button>\n" +
        "	</li>\n" +
        "</ul>\n" +
        "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/modal/backdrop.html",
        "<div class=\"modal-backdrop fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1040 + index*10}\"></div>");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/modal/window.html",
        "<div tabindex=\"-1\" class=\"modal fade {{ windowClass }}\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
        "    <div class=\"modal-dialog\"><div class=\"modal-content\" ng-transclude></div></div>\n" +
        "</div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pager.html",
        "<ul class=\"pager\">\n" +
        "  <li ng-repeat=\"page in pages\" ng-class=\"{disabled: page.disabled, previous: page.previous, next: page.next}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
        "</ul>");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/pagination/pagination.html",
        "<ul class=\"pagination\">\n" +
        "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\"><a ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
        "</ul>");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
        "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
        "  <div class=\"tooltip-arrow\"></div>\n" +
        "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tooltip/tooltip-popup.html",
        "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
        "  <div class=\"tooltip-arrow\"></div>\n" +
        "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover.html",
        "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
        "  <div class=\"arrow\"></div>\n" +
        "\n" +
        "  <div class=\"popover-inner\">\n" +
        "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
        "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/popover/popover-template.html",
        "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
        "  <div class=\"arrow\"></div>\n" +
        "\n" +
        "  <div class=\"popover-inner\">\n" +
        "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
        "      <div class=\"popover-content\"></div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/bar.html",
        "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/progress.html",
        "<div class=\"progress\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/progressbar/progressbar.html",
        "<div class=\"progress\"><div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" ng-transclude></div></div>");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/rating/rating.html",
        "<span ng-mouseleave=\"reset()\">\n" +
        "    <i ng-repeat=\"r in range\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < val && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\"></i>\n" +
        "</span>");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tab.html",
        "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
        "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
        "</li>\n" +
        "");
}]);

angular.module("template/tabs/tabset-titles.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tabset-titles.html",
        "<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n" +
        "</ul>\n" +
        "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tabset.html",
        "\n" +
        "<div class=\"tabbable\">\n" +
        "  <ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
        "  <div class=\"tab-content\">\n" +
        "    <div class=\"tab-pane\" \n" +
        "         ng-repeat=\"tab in tabs\" \n" +
        "         ng-class=\"{active: tab.active}\"\n" +
        "         tab-content-transclude=\"tab\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>\n" +
        "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/timepicker/timepicker.html",
        "<table>\n" +
        "	<tbody>\n" +
        "		<tr class=\"text-center\">\n" +
        "			<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
        "			<td>&nbsp;</td>\n" +
        "			<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
        "			<td ng-show=\"showMeridian\"></td>\n" +
        "		</tr>\n" +
        "		<tr>\n" +
        "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +
        "				<input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
        "			</td>\n" +
        "			<td>:</td>\n" +
        "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
        "				<input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
        "			</td>\n" +
        "			<td ng-show=\"showMeridian\"><button type=\"button\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\">{{meridian}}</button></td>\n" +
        "		</tr>\n" +
        "		<tr class=\"text-center\">\n" +
        "			<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
        "			<td>&nbsp;</td>\n" +
        "			<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
        "			<td ng-show=\"showMeridian\"></td>\n" +
        "		</tr>\n" +
        "	</tbody>\n" +
        "</table>\n" +
        "");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-match.html",
        "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/typeahead/typeahead-popup.html",
        "<ul class=\"dropdown-menu\" ng-style=\"{display: isOpen()&&'block' || 'none', top: position.top+'px', left: position.left+'px'}\">\n" +
        "    <li ng-repeat=\"match in matches\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\">\n" +
        "        <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
        "    </li>\n" +
        "</ul>");
}]);

avatar

    // =========================================================================
    // LAYOUT
    // =========================================================================
    
    .directive('changeLayout', function(){
        
        return {
            restrict: 'A',
            scope: {
                changeLayout: '='
            },
            
            link: function(scope, element, attr) {
                
                //Default State
                if(scope.changeLayout === '1') {
                    element.prop('checked', true);
                }
                
                //Change State
                element.on('change', function(){
                    if(element.is(':checked')) {
                        localStorage.setItem('ma-layout-status', 1);
                        scope.$apply(function(){
                            scope.changeLayout = '1';
                        })
                    }
                    else {
                        localStorage.setItem('ma-layout-status', 0);
                        scope.$apply(function(){
                            scope.changeLayout = '0';
                        })
                    }
                })
            }
        }
    })



    // =========================================================================
    // MAINMENU COLLAPSE
    // =========================================================================

    .directive('toggleSidebar', function(){

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },
            
            link: function(scope, element, attr) {
                element.on('click', function(){
 
                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }
                    
                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function(){
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelRight = false;
                            })
                        }
                        
                    }
                })
            }
        }
    
    })
    

    
    // =========================================================================
    // SUBMENU TOGGLE
    // =========================================================================

    .directive('toggleSubmenu', function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.click(function(){
                    element.parent().toggleClass('toggled');
                    element.parent().find('ul').stop(true, false).slideToggle(200);
                })
            }
        }
    })


    // =========================================================================
    // STOP PROPAGATION
    // =========================================================================
    
    .directive('stopPropagate', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.preventDefault();
                });
            }
        }
    })


    // =========================================================================
    // PRINT
    // =========================================================================
    
    .directive('print', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.click(function(){
                    window.print();
                })   
            }
        }
    })

   
avatar

    // =========================================================================
    // NICE SCROLL
    // =========================================================================

    //Html

    .directive('html', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'E',
            link: function(scope, element) {

                if (!element.hasClass('ismobile')) {
                    if (!$('.login-content')[0]) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                    }
                }
            }
        }
    }])


    //Table

    .directive('tableResponsive', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])


    //Chosen

    .directive('chosenResults', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])


    //Tabs

    .directive('tabNav', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '2px');
                }
            }
        }
    }])


    //For custom class

    .directive('cOverflow', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.5)', '5px');
                }
            }
        }
    }])


    // =========================================================================
    // WAVES
    // =========================================================================

    // For .btn classes
    .directive('btn', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if(element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                    Waves.attach(element, ['waves-circle']);
                }

                else if(element.hasClass('btn-light')) {
                    Waves.attach(element, ['waves-light']);
                }

                else {
                    Waves.attach(element);
                }

                Waves.init();
            }
        }
    })

/**
 * Created by Whitebox on 2/22/2016.
 */
/**
 * Satellizer 0.13.2
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

// CommonJS package manager support.
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    module.exports = 'satellizer';
}

(function(window, angular, undefined) {
    'use strict';

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.host;
    }

    angular.module('satellizer', [])
        .constant('SatellizerConfig', {
            httpInterceptor: function() { return true; },
            withCredentials: false,
            tokenRoot: null,
            cordova: false,
            baseUrl: apiURL+'/api/v1/avatar/social',
            loginUrl: '/login',
            signupUrl: '/signup',
            unlinkUrl: '/auth/unlink/',
            tokenName: 'token',
            tokenPrefix: 'satellizer',
            authHeader: 'Authorization',
            authToken: 'Bearer',
            storageType: 'localStorage',
            providers: {
                facebook: {
                    name: 'facebook',
                    url: '/facebook',
                    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                    redirectUri:'http://techprep.me/' ,
                    requiredUrlParams: ['display', 'scope'],
                    scope: ['email'],
                    scopeDelimiter: ',',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: { width: 580, height: 400 }
                },
                google: {
                    name: 'google',
                    url: '/google',
                    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                    redirectUri: 'http://techprep.me',
                    requiredUrlParams: ['scope'],
                    optionalUrlParams: ['display'],
                    scope: ['profile', 'email'],
                    scopePrefix: 'openid',
                    scopeDelimiter: ' ',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: { width: 452, height: 633 }
                },
                github: {
                    name: 'github',
                    url: '/github',
                    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
                    redirectUri: 'http://104.197.42.165/talentscreen/angular/#/login',
                    optionalUrlParams: ['scope'],
                    scope: ['user:email'],
                    scopeDelimiter: ' ',
                    type: '2.0',
                    popupOptions: { width: 1020, height: 618 }
                },
                instagram: {
                    name: 'instagram',
                    url: '/auth/instagram',
                    authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    scope: ['basic'],
                    scopeDelimiter: '+',
                    type: '2.0'
                },
                linkedin: {
                    name: 'linkedin',
                    url: '/linkedin',
                    authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                    redirectUri: 'http://104.197.42.165/talentscreen/angular/',
                    requiredUrlParams: ['state'],
                    scope: ['r_emailaddress'],
                    scopeDelimiter: ' ',
                    state: 'STATE',
                    type: '2.0',
                    popupOptions: { width: 527, height: 582 }
                },
                twitter: {
                    name: 'twitter',
                    url: '/twitter',
                    authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
                    redirectUri:'http://104.197.42.165/talentscreen/angular/',
                    type: '1.0',
                    popupOptions: { width: 495, height: 645 }
                },
                twitch: {
                    name: 'twitch',
                    url: '/auth/twitch',
                    authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    scope: ['user_read'],
                    scopeDelimiter: ' ',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: { width: 500, height: 560 }
                },
                live: {
                    name: 'live',
                    url: '/auth/live',
                    authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['display', 'scope'],
                    scope: ['wl.emails'],
                    scopeDelimiter: ' ',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: { width: 500, height: 560 }
                },
                yahoo: {
                    name: 'yahoo',
                    url: '/auth/yahoo',
                    authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
                    redirectUri: window.location.origin,
                    scope: [],
                    scopeDelimiter: ',',
                    type: '2.0',
                    popupOptions: { width: 559, height: 519 }
                },
                bitbucket: {
                    name: 'bitbucket',
                    url: '/auth/bitbucket',
                    authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
                    redirectUri: window.location.origin + '/',
                    requiredUrlParams: ['scope'],
                    scope: ['email'],
                    scopeDelimiter: ',',
                    type: '2.0',
                    popupOptions: { width: 1028, height: 529 }
                }
            }
        })
        .provider('$auth', ['SatellizerConfig', function(config) {
            Object.defineProperties(this, {
                httpInterceptor: {
                    get: function() { return config.httpInterceptor; },
                    set: function(value) {
                        if (typeof value === 'function') {
                            config.httpInterceptor = value;
                        } else {
                            config.httpInterceptor = function() {
                                return value;
                            };
                        }
                    }
                },
                baseUrl: {
                    get: function() { return config.baseUrl; },
                    set: function(value) { config.baseUrl = value; }
                },
                loginUrl: {
                    get: function() { return config.loginUrl; },
                    set: function(value) { config.loginUrl = value; }
                },
                signupUrl: {
                    get: function() { return config.signupUrl; },
                    set: function(value) { config.signupUrl = value; }
                },
                tokenRoot: {
                    get: function() { return config.tokenRoot; },
                    set: function(value) { config.tokenRoot = value; }
                },
                tokenName: {
                    get: function() { return config.tokenName; },
                    set: function(value) { config.tokenName = value; }
                },
                tokenPrefix: {
                    get: function() { return config.tokenPrefix; },
                    set: function(value) { config.tokenPrefix = value; }
                },
                unlinkUrl: {
                    get: function() { return config.unlinkUrl; },
                    set: function(value) { config.unlinkUrl = value; }
                },
                authHeader: {
                    get: function() { return config.authHeader; },
                    set: function(value) { config.authHeader = value; }
                },
                authToken: {
                    get: function() { return config.authToken; },
                    set: function(value) { config.authToken = value; }
                },
                withCredentials: {
                    get: function() { return config.withCredentials; },
                    set: function(value) { config.withCredentials = value; }
                },
                cordova: {
                    get: function() { return config.cordova; },
                    set: function(value) { config.cordova = value; }
                },
                storageType: {
                    get: function() { return config.storageType; },
                    set: function(value) { config.storageType = value; }
                }
            });

            angular.forEach(Object.keys(config.providers), function(provider) {
                this[provider] = function(params) {
                    return angular.extend(config.providers[provider], params);
                };
            }, this);

            var oauth = function(params) {
                config.providers[params.name] = config.providers[params.name] || {};
                angular.extend(config.providers[params.name], params);
            };

            this.oauth1 = function(params) {
                oauth(params);
                config.providers[params.name].type = '1.0';
            };

            this.oauth2 = function(params) {
                oauth(params);
                config.providers[params.name].type = '2.0';
            };

            this.$get = [
                '$q',
                'SatellizerShared',
                'SatellizerLocal',
                'SatellizerOauth',
                function($q, shared, local, oauth) {
                    var $auth = {};

                    $auth.login = function(user, opts) {
                        return local.login(user, opts);
                    };

                    $auth.signup = function(user, options) {
                        return local.signup(user, options);
                    };

                    $auth.logout = function() {
                        return shared.logout();
                    };

                    $auth.authenticate = function(name, userData) {
                        return oauth.authenticate(name, userData);
                    };

                    $auth.link = function(name, userData) {
                        return oauth.authenticate(name, userData);
                    };

                    $auth.unlink = function(provider, opts) {
                        return oauth.unlink(provider, opts);
                    };

                    $auth.isAuthenticated = function() {
                        return shared.isAuthenticated();
                    };

                    $auth.getToken = function() {
                        return shared.getToken();
                    };

                    $auth.setToken = function(token) {
                        shared.setToken({ access_token: token });
                    };

                    $auth.removeToken = function() {
                        return shared.removeToken();
                    };

                    $auth.getPayload = function() {
                        return shared.getPayload();
                    };

                    $auth.setStorageType = function(type) {
                        return shared.setStorageType(type);
                    };

                    return $auth;
                }];
        }])
        .factory('SatellizerShared', [
            '$q',
            '$window',
            '$log',
            'SatellizerConfig',
            'SatellizerStorage',
            function($q, $window, $log, config, storage) {
                var Shared = {};

                var tokenName = config.tokenPrefix ? [config.tokenPrefix, config.tokenName].join('_') : config.tokenName;

                Shared.getToken = function() {
                    return storage.get(tokenName);
                };

                Shared.getPayload = function() {
                    var token = storage.get(tokenName);

                    if (token && token.split('.').length === 3) {
                        try {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
                        } catch(e) {
                            return undefined;
                        }
                    }
                };

                Shared.setToken = function(response) {
                    if (!response) {
                        return $log.warn('Can\'t set token without passing a value');
                    }

                    var accessToken = response && response.access_token;
                    var token;

                    if (accessToken) {
                        if (angular.isObject(accessToken) && angular.isObject(accessToken.data)) {
                            response = accessToken;
                        } else if (angular.isString(accessToken)) {
                            token = accessToken;
                        }
                    }

                    if (!token && response) {
                        var tokenRootData = config.tokenRoot && config.tokenRoot.split('.').reduce(function(o, x) { return o[x]; }, response.data);
                        token = tokenRootData ? tokenRootData[config.tokenName] : response.data[config.tokenName];
                    }

                    if (!token) {
                        var tokenPath = config.tokenRoot ? config.tokenRoot + '.' + config.tokenName : config.tokenName;
                        return $log.warn('Expecting a token named "' + tokenPath);
                    }

                    storage.set(tokenName, token);
                };

                Shared.removeToken = function() {
                    storage.remove(tokenName);
                };

                /**
                 * @returns {boolean}
                 */
                Shared.isAuthenticated = function() {
                    var token = storage.get(tokenName);

                    // A token is present
                    if (token) {
                        // Token with a valid JWT format XXX.YYY.ZZZ
                        if (token.split('.').length === 3) {
                            // Could be a valid JWT or an access token with the same format
                            try {
                                var base64Url = token.split('.')[1];
                                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                                var exp = JSON.parse($window.atob(base64)).exp;
                                // JWT with an optonal expiration claims
                                if (exp) {
                                    var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                                    if (isExpired) {
                                        // FAIL: Expired token
                                        storage.remove(tokenName);
                                        return false;
                                    } else {
                                        // PASS: Non-expired token
                                        return true;
                                    }
                                }
                            } catch(e) {
                                // PASS: Non-JWT token that looks like JWT
                                return true;
                            }
                        }
                        // PASS: All other tokens
                        return true;
                    }
                    // FAIL: No token at all
                    return false;
                };

                Shared.logout = function() {
                    storage.remove(tokenName);
                    return $q.when();
                };

                Shared.setStorageType = function(type) {
                    config.storageType = type;
                };

                return Shared;
            }])
        .factory('SatellizerOauth', [
            '$q',
            '$http',
            'SatellizerConfig',
            'SatellizerUtils',
            'SatellizerShared',
            'SatellizerOauth1',
            'SatellizerOauth2',
            function($q, $http, config, utils, shared, Oauth1, Oauth2) {
                var Oauth = {};

                Oauth.authenticate = function(name, userData) {
                    var provider = config.providers[name].type === '1.0' ? new Oauth1() : new Oauth2();
                    var deferred = $q.defer();

                    provider.open(config.providers[name], userData || {})
                        .then(function(response) {
                            // This is for a scenario when someone wishes to opt out from
                            // Satellizer's magic by doing authorization code exchange and
                            // saving a token manually.
                            if (config.providers[name].url) {
                                shared.setToken(response, false);
                            }
                            deferred.resolve(response);
                        })
                        .catch(function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                };

                Oauth.unlink = function(provider, opts) {
                    opts = opts || {};
                    opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.unlinkUrl);
                    opts.data = { provider: provider } || opts.data;
                    opts.method = opts.method || 'POST';

                    return $http(opts);
                    console.log(opts);
                };

                return Oauth;
            }])
        .factory('SatellizerLocal', [
            '$http',
            'SatellizerUtils',
            'SatellizerShared',
            'SatellizerConfig',
            function($http, utils, shared, config) {
                var Local = {};

                Local.login = function(user, opts) {
                    opts = opts || {};
                    opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.loginUrl);
                    opts.data = user || opts.data;
                    opts.method = opts.method || 'POST';

                    return $http(opts).then(function(response) {
                        shared.setToken(response);
                        return response;
                    });
                };

                Local.signup = function(user, opts) {
                    opts = opts || {};
                    opts.url = opts.url ? opts.url : utils.joinUrl(config.baseUrl, config.signupUrl);
                    opts.data = user || opts.data;
                    opts.method = opts.method || 'POST';

                    return $http(opts);
                };

                return Local;
            }])
        .factory('SatellizerOauth2', [
            '$q',
            '$http',
            '$window',
            'SatellizerPopup',
            'SatellizerUtils',
            'SatellizerConfig',
            'SatellizerStorage',
            function($q, $http, $window, popup, utils, config, storage) {
                return function() {
                    var Oauth2 = {};

                    var defaults = {
                        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
                        responseType: 'code',
                        responseParams: {
                            code: 'code',
                            clientId: 'clientId',
                            redirectUri: 'redirectUri'
                        }
                    };

                    Oauth2.open = function(options, userData) {
                        defaults = utils.merge(options, defaults);

                        var url;
                        var openPopup;
                        var stateName = defaults.name + '_state';

                        if (angular.isFunction(defaults.state)) {
                            storage.set(stateName, defaults.state());
                        } else if (angular.isString(defaults.state)) {
                            storage.set(stateName, defaults.state);
                        }

                        url = [defaults.authorizationEndpoint, Oauth2.buildQueryString()].join('?');

                        if (config.cordova) {
                            openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).eventListener(defaults.redirectUri);
                        } else {
                            openPopup = popup.open(url, defaults.name, defaults.popupOptions, defaults.redirectUri).pollPopup();
                        }

                        return openPopup
                            .then(function(oauthData) {
                                // When no server URL provided, return popup params as-is.
                                // This is for a scenario when someone wishes to opt out from
                                // Satellizer's magic by doing authorization code exchange and
                                // saving a token manually.
                                if (defaults.responseType === 'token' || !defaults.url) {
                                    return oauthData;
                                }

                                if (oauthData.state && oauthData.state !== storage.get(stateName)) {
                                    return $q.reject('OAuth "state" mismatch');
                                }

                                return Oauth2.exchangeForToken(oauthData, userData);
                            });
                    };

                    Oauth2.exchangeForToken = function(oauthData, userData) {
                        var data = angular.extend({}, userData);

                        angular.forEach(defaults.responseParams, function(value, key) {
                            switch (key) {
                                case 'code':
                                    data[value] = oauthData.code;
                                    break;
                                case 'clientId':
                                    data[value] = defaults.clientId;
                                    break;
                                case 'redirectUri':
                                    data[value] = defaults.redirectUri;
                                    break;
                                default:
                                    data[value] = oauthData[key]
                            }
                        });

                        if (oauthData.state) {
                            data.state = oauthData.state;
                        }

                        var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;

                        return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
                    };

                    Oauth2.buildQueryString = function() {
                        var keyValuePairs = [];
                        var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

                        angular.forEach(urlParams, function(params) {

                            angular.forEach(defaults[params], function(paramName) {
                                var camelizedName = utils.camelCase(paramName);
                                var paramValue = angular.isFunction(defaults[paramName]) ? defaults[paramName]() : defaults[camelizedName];

                                if (paramName === 'state') {
                                    var stateName = defaults.name + '_state';
                                    paramValue = encodeURIComponent(storage.get(stateName));
                                }

                                if (paramName === 'scope' && Array.isArray(paramValue)) {
                                    paramValue = paramValue.join(defaults.scopeDelimiter);

                                    if (defaults.scopePrefix) {
                                        paramValue = [defaults.scopePrefix, paramValue].join(defaults.scopeDelimiter);
                                    }
                                }

                                keyValuePairs.push([paramName, paramValue]);
                            });
                        });

                        return keyValuePairs.map(function(pair) {
                            return pair.join('=');
                        }).join('&');
                    };

                    return Oauth2;
                };
            }])
        .factory('SatellizerOauth1', [
            '$q',
            '$http',
            'SatellizerPopup',
            'SatellizerConfig',
            'SatellizerUtils',
            function($q, $http, popup, config, utils) {
                return function() {
                    var Oauth1 = {};

                    var defaults = {
                        url: null,
                        name: null,
                        popupOptions: null,
                        redirectUri: null,
                        authorizationEndpoint: null
                    };

                    Oauth1.open = function(options, userData) {
                        angular.extend(defaults, options);
                        var popupWindow;
                        var serverUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;

                        if (!config.cordova) {
                            popupWindow = popup.open('', defaults.name, defaults.popupOptions, defaults.redirectUri);
                        }

                        return $http.post(serverUrl, defaults)
                            .then(function(response) {
                                if (config.cordova) {
                                    popupWindow = popup.open([defaults.authorizationEndpoint, Oauth1.buildQueryString(response.data)].join('?'), defaults.name, defaults.popupOptions, defaults.redirectUri);
                                } else {
                                    popupWindow.popupWindow.location = [defaults.authorizationEndpoint, Oauth1.buildQueryString(response.data)].join('?');
                                }

                                var popupListener = config.cordova ? popupWindow.eventListener(defaults.redirectUri) : popupWindow.pollPopup();

                                return popupListener
                                    .then(function(response) {
                                        return Oauth1.exchangeForToken(response, userData);
                                    });
                            });

                    };

                    Oauth1.exchangeForToken = function(oauthData, userData) {
                        var data = angular.extend({}, userData, oauthData);
                        var exchangeForTokenUrl = config.baseUrl ? utils.joinUrl(config.baseUrl, defaults.url) : defaults.url;
                        return $http.post(exchangeForTokenUrl, data, { withCredentials: config.withCredentials });
                    };

                    Oauth1.buildQueryString = function(obj) {
                        var str = [];

                        angular.forEach(obj, function(value, key) {
                            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                        });

                        return str.join('&');
                    };

                    return Oauth1;
                };
            }])
        .factory('SatellizerPopup', [
            '$q',
            '$interval',
            '$window',
            'SatellizerConfig',
            'SatellizerUtils',
            function($q, $interval, $window, config, utils) {
                var Popup = {};

                Popup.url = '';
                Popup.popupWindow = null;

                Popup.open = function(url, name, options) {
                    Popup.url = url;

                    var stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
                    var UA = $window.navigator.userAgent;
                    var windowName = (config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;

                    Popup.popupWindow = $window.open(url, windowName, stringifiedOptions);

                    $window.popup = Popup.popupWindow;

                    if (Popup.popupWindow && Popup.popupWindow.focus) {
                        Popup.popupWindow.focus();
                    }

                    return Popup;
                };

                Popup.eventListener = function(redirectUri) {
                    var deferred = $q.defer();

                    Popup.popupWindow.addEventListener('loadstart', function(event) {
                        if (event.url.indexOf(redirectUri) !== 0) {
                            return;
                        }

                        var parser = document.createElement('a');
                        parser.href = event.url;

                        if (parser.search || parser.hash) {
                            var queryParams = parser.search.substring(1).replace(/\/$/, '');
                            var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                            var hash = utils.parseQueryString(hashParams);
                            var qs = utils.parseQueryString(queryParams);

                            angular.extend(qs, hash);

                            if (!qs.error) {
                                deferred.resolve(qs);
                            }

                            Popup.popupWindow.close();
                        }
                    });

                    Popup.popupWindow.addEventListener('loaderror', function() {
                        deferred.reject('Authorization Failed');
                    });

                    return deferred.promise;
                };

                Popup.pollPopup = function() {
                    var deferred = $q.defer();

                    var polling = $interval(function() {
                        try {
                            var documentOrigin = document.location.host;
                            var popupWindowOrigin = Popup.popupWindow.location.host;

                            if (popupWindowOrigin === documentOrigin && (Popup.popupWindow.location.search || Popup.popupWindow.location.hash)) {
                                var queryParams = Popup.popupWindow.location.search.substring(1).replace(/\/$/, '');
                                var hashParams = Popup.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                                var hash = utils.parseQueryString(hashParams);
                                var qs = utils.parseQueryString(queryParams);

                                angular.extend(qs, hash);

                                if (qs.error) {
                                    deferred.reject(qs);
                                } else {
                                    deferred.resolve(qs);
                                }

                                $interval.cancel(polling);

                                Popup.popupWindow.close();
                            }
                        } catch (error) {
                            // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                        }

                        if (!Popup.popupWindow || Popup.popupWindow.closed || Popup.popupWindow.closed === undefined) {
                            $interval.cancel(polling);
                        }
                    }, 50);

                    return deferred.promise;
                };

                Popup.prepareOptions = function(options) {
                    options = options || {};
                    var width = options.width || 500;
                    var height = options.height || 500;

                    return angular.extend({
                        width: width,
                        height: height,
                        left: $window.screenX + (($window.outerWidth - width) / 2),
                        top: $window.screenY + (($window.outerHeight - height) / 2.5)
                    }, options);
                };

                Popup.stringifyOptions = function(options) {
                    var parts = [];
                    angular.forEach(options, function(value, key) {
                        parts.push(key + '=' + value);
                    });
                    return parts.join(',');
                };

                return Popup;
            }])
        .service('SatellizerUtils', function() {
            this.camelCase = function(name) {
                return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
                    return offset ? letter.toUpperCase() : letter;
                });
            };

            this.parseQueryString = function(keyValue) {
                var obj = {}, key, value;
                angular.forEach((keyValue || '').split('&'), function(keyValue) {
                    if (keyValue) {
                        value = keyValue.split('=');
                        key = decodeURIComponent(value[0]);
                        obj[key] = angular.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
                    }
                });
                return obj;
            };

            this.joinUrl = function(baseUrl, url) {
                if (/^(?:[a-z]+:)?\/\//i.test(url)) {
                    return url;
                }

                var joined = [baseUrl, url].join('/');

                var normalize = function(str) {
                    return str
                        .replace(/[\/]+/g, '/')
                        .replace(/\/\?/g, '?')
                        .replace(/\/\#/g, '#')
                        .replace(/\:\//g, '://');
                };

                return normalize(joined);
            };

            this.merge = function(obj1, obj2) {
                var result = {};
                for (var i in obj1) {
                    if (obj1.hasOwnProperty(i)) {
                        if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
                            result[i] = this.merge(obj1[i], obj2[i]);
                        } else {
                            result[i] = obj1[i];
                        }
                    }
                }
                for (i in obj2) {
                    if (obj2.hasOwnProperty(i)) {
                        if (i in result) {
                            continue;
                        }
                        result[i] = obj2[i];
                    }

                }
                return result;
            }
        })
        .factory('SatellizerStorage', ['$window', '$log', 'SatellizerConfig', function($window, $log, config) {

            var store = {};

            var isStorageAvailable = (function() {
                try {
                    var supported = config.storageType in $window && $window[config.storageType] !== null;

                    if (supported) {
                        var key = Math.random().toString(36).substring(7);
                        $window[config.storageType].setItem(key, '');
                        $window[config.storageType].removeItem(key);
                    }

                    return supported;
                } catch (e) {
                    return false;
                }
            })();

            if (!isStorageAvailable) {
                $log.warn(config.storageType + ' is not available.');
            }

            return {
                get: function(key) {
                    return isStorageAvailable ? $window[config.storageType].getItem(key) : store[key];
                },
                set: function(key, value) {
                    return isStorageAvailable ? $window[config.storageType].setItem(key, value) : store[key] = value;
                },
                remove: function(key) {
                    return isStorageAvailable ? $window[config.storageType].removeItem(key): delete store[key];
                }
            };

        }])
        .factory('SatellizerInterceptor', [
            '$q',
            'SatellizerConfig',
            'SatellizerStorage',
            'SatellizerShared',
            function($q, config, storage, shared) {
                return {
                    request: function(request) {
                        if (request.skipAuthorization) {
                            return request;
                        }

                        if (shared.isAuthenticated() && config.httpInterceptor(request)) {
                            var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
                            var token = storage.get(tokenName);

                            if (config.authHeader && config.authToken) {
                                token = config.authToken + ' ' + token;
                            }

                            request.headers[config.authHeader] = token;
                        }

                        return request;
                    },
                    responseError: function(response) {
                        return $q.reject(response);
                    }
                };
            }])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('SatellizerInterceptor');
        }]);

})(window, window.angular);


avatar

    // =========================================================================
    // Header Messages and Notifications list Data
    // =========================================================================

    .service('messageService', ['$resource', function($resource){
        this.getMessage = function(img, user, text) {
            var gmList = $resource("data/messages-notifications.json");
            
            return gmList.get({
                img: img,
                user: user,
                text: text
            });
        }
    }])
    

    // =========================================================================
    // Best Selling Widget Data (Home Page)
    // =========================================================================

    .service('bestsellingService', ['$resource', function($resource){
        this.getBestselling = function(img, name, range) {
            var gbList = $resource("data/best-selling.json");
            
            return gbList.get({
                img: img,
                name: name,
                range: range
            });
        }
    }])

    
    // =========================================================================
    // Todo List Widget Data
    // =========================================================================

    .service('todoService', ['$resource', function($resource){
        this.getTodo = function(todo) {
            var todoList = $resource("data/todo.json");
            
            return todoList.get({
                todo: todo
            });
        }
    }])


    // =========================================================================
    // Recent Items Widget Data
    // =========================================================================
    
    .service('recentitemService', ['$resource', function($resource){
        this.getRecentitem = function(id, name, price) {
            var recentitemList = $resource("data/recent-items.json");
            
            return recentitemList.get ({
                id: id,
                name: name,
                price: price
            })
        }
    }])


    // =========================================================================
    // Recent Posts Widget Data
    // =========================================================================
    
    .service('recentpostService', ['$resource', function($resource){
        this.getRecentpost = function(img, user, text) {
            var recentpostList = $resource("data/messages-notifications.json");
            
            return recentpostList.get ({
                img: img,
                user: user,
                text: text
            })
        }
    }])
    
    // =========================================================================
    // Data Table
    // =========================================================================
    
    .service('tableService', [function(){
        this.data = [
            {
                "id": 10238,
                "name": "Marc Barnes",
                "email": "marc.barnes54@example.com",
                "username": "MarcBarnes",
                "contact": "(382)-122-5003"
            },
            {   
                "id": 10243,
                "name": "Glen Curtis",
                "email": "glen.curtis11@example.com",
                "username": "GlenCurtis",
                "contact": "(477)-981-4948"
            },
            {
                "id": 10248,
                "name": "Beverly Gonzalez",
                "email": "beverly.gonzalez54@example.com",
                "username": "BeverlyGonzalez",
                "contact": "(832)-255-5161"
            },
            {
                "id": 10253,
                "name": "Yvonne Chavez",
                "email": "yvonne.chavez@example.com",
                "username": "YvonneChavez",
                "contact": "(477)-446-3715"
            },
            {
                "id": 10234,
                "name": "Melinda Mitchelle",
                "email": "melinda@example.com",
                "username": "MelindaMitchelle",
                "contact": "(813)-716-4996"
                
            },
            {
                "id": 10239,
                "name": "Shannon Bradley",
                "email": "shannon.bradley42@example.com",
                "username": "ShannonBradley",
                "contact": "(774)-291-9928"
            },
            {
                "id": 10244,
                "name": "Virgil Kim",
                "email": "virgil.kim81@example.com",
                "username": "VirgilKim",
                "contact": "(219)-181-7898"
            },
            {
                "id": 10249,
                "name": "Letitia Robertson",
                "email": "letitia.rober@example.com",
                "username": "Letitia Robertson",
                "contact": "(647)-209-4589"
            },
            {
                "id": 10237,
                "name": "Claude King",
                "email": "claude.king22@example.com",
                "username": "ClaudeKing",
                "contact": "(657)-988-8701"
            },
            {
                "id": 10242,
                "name": "Roland Craig",
                "email": "roland.craig47@example.com",
                "username": "RolandCraig",
                "contact": "(932)-935-9471"
            },
            {
                "id": 10247,
                "name": "Colleen Parker",
                "email": "colleen.parker38@example.com",
                "username": "ColleenParker",
                "contact": "(857)-459-2792"
            },
            {
                "id": 10252,
                "name": "Leah Jensen",
                "email": "leah.jensen27@example.com",
                "username": "LeahJensen",
                "contact": "(861)-275-4686"
            },
            {
                "id": 10236,
                "name": "Harold Martinez",
                "email": "martinez67@example.com",
                "username": "HaroldMartinez",
                "contact": "(836)-634-9133"
            },
            {
                "id": 10241,
                "name": "Keith Lowe",
                "email": "keith.lowe96@example.com",
                "username": "KeithLowe",
                "contact": "(778)-787-3100"
            },
            {
                "id": 10246,
                "name": "Charles Walker",
                "email": "charles.walker90@example.com",
                "username": "CharlesWalker",
                "contact": "(486)-440-4716"
            },
            {
                "id": 10251,
                "name": "Lillie Curtis",
                "email": "lillie.curtis12@example.com",
                "username": "LillieCurtis",
                "contact": "(342)-510-2258"
            },
            {
                "id": 10235,
                "name": "Genesis Reynolds",
                "email": "genesis@example.com",
                "username": "GenesisReynolds",
                "contact": "(339)-375-1858"
            },
            {
                "id": 10240,
                "name": "Oscar Palmer",
                "email": "oscar.palmer24@example.com",
                "username": "OscarPalmer",
                "contact": "(544)-270-9912"
            },
            {
                "id": 10245,
                "name": "Lena Bishop",
                "email": "Lena Bishop",
                "username": "LenaBishop",
                "contact": "(177)-521-1556"
            },
            {
                "id": 10250,
                "name": "Kent Nguyen",
                "email": "kent.nguyen34@example.com",
                "username": "KentNguyen",
                "contact": "(506)-533-6801"
            }
        ];
    }])


    // =========================================================================
    // Nice Scroll - Custom Scroll bars
    // =========================================================================
    .service('nicescrollService', function() {
        var ns = {};
        ns.niceScroll = function(selector, color, cursorWidth) {
            
            $(selector).niceScroll({
                cursorcolor: color,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorwidth: cursorWidth,
                bouncescroll: true,
                mousescrollstep: 100,
                autohidemode: false
            });
        }
        
        return ns;
    })


    //==============================================
    // BOOTSTRAP GROWL
    //==============================================

    .service('growlService', function(){
        var gs = {};
        gs.growl = function(message, type) {
            $.growl({
                message: message
            },{
                type: type,
                allow_dismiss: false,
                label: 'Cancel',
                className: 'btn-xs btn-inverse',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                delay: 2500,
                animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                },
                offset: {
                    x: 20,
                    y: 85
                }
            });
        }
        
        return gs;
    })


var commonService = angular.module('commonService', []);
var apiURL="http://130.211.190.15";
var searchApiURL = "http://130.211.163.54";
commonService

    //common Address

    .factory("avAddressService",function($resource){
        return $resource(apiURL+'/api/v1/common/addresses', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })


    .factory("avAddressServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/addresses/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: false},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })




    .factory("avSearch",function($resource){
        return $resource(searchApiURL+'/search/', {}, {
            show: {method: 'GET', isArray: true}
        });
    })

    //common Contact

    .factory("avContactService",function($resource){
        return $resource(apiURL+'/api/v1/common/contacts', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })
    .factory("avContactServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/contacts/:id', {}, {
            show: {method: 'GET', isArray: false},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

    //common Company

    .factory("avCompanyService",function($resource){
        return $resource(apiURL+'/api/v1/common/companies', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avCompanyServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/companies/:id', {}, {
            show: {method: 'GET', isArray: false},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })
   /* .factory( 'cache', function($cacheFactory) {
        var cache = $cacheFactory('myCache');
        return cache;
    });
*/

    //common Employees

    .factory("avEmployeeService",function($resource){
        return $resource(apiURL+'/api/v1/common/employees', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })


    .factory("avEmployeeServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/employees/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


    //common Category

    .factory("avCategoryService",function($resource){
        return $resource(apiURL+'/api/v1/common/categories', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })


    .factory("avCategoryServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/categories/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

     //common Candidate

    .factory("avCandidateService",function($resource){
        return $resource(apiURL+'/api/v1/common/candidates', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avCandidateServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/candidates/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

    //common Employee Details

    .factory("avEmpDetailsService",function($resource){
        return $resource(apiURL+'/api/v1/common/empdetails', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avEmpDetailsServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/empdetails/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

   //common Entity

    .factory("avEntityService",function($resource){
        return $resource(apiURL+'/api/v1/common/entities', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avEntityServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/entities/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

   //common Level

    .factory("avLevelService",function($resource){
        return $resource(apiURL+'/api/v1/common/levels', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avLevelServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/levels/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })



    //common Status

    .factory("avStatusService",function($resource){
        return $resource(apiURL+'/api/v1/common/statuses', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avStatusServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/statuses/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


    //common Types

    .factory("avTypesService",function($resource){
        return $resource(apiURL+'/api/v1/common/types', {}, {
            show: {method: 'GET',isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avTypesServiceById",function($resource){
        return $resource(apiURL+'/api/v1/common/types/:id', {}, {
            show: {method: 'GET',params:{type:'all'},isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })



    /*lookups*/

    // lookups Country

    .factory("avCountryService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/countries', {}, {
            show: {method: 'GET', params:{type:'all'}, isArray: true},
            create: {method: 'POST'}
        });
    })



    .factory("avCountryServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/countries/:id', {}, {
            show: {method: 'GET',isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


    //lookups City

    .factory("avCityService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/cities', {}, {
            show: {method: 'GET', isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avCityServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/cities/:id', {}, {
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


    //lookups Education

    .factory("avEducationService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/education/levels', {}, {
            show: {method: 'GET', isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avEducationServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/education/levels/:id', {}, {
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })

    //lookups Work Status

    .factory("avWorkStatusService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/workStatus', {}, {
            show: {method: 'GET', isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avWorkStatusServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/workStatus/:id', {}, {
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


//lookups Employee Designations

    .factory("avEmpDesignationsService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/employee/designations', {}, {
            show: {method: 'GET', isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avEmpDesignationServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/employee/designations/:id', {}, {
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


//lookups Employee Salary Unit

    .factory("avEmpSalaryUnitService",function($resource){
        return $resource(apiURL+'/api/v1/lookup/employee/salaryunits', {}, {
            show: {method: 'GET', isArray: true},
            create: {method: 'POST'}
        });
    })

    .factory("avEmpSalaryUnitServiceById",function($resource){
        return $resource(apiURL+'/api/v1/lookup/employee/salaryunits', {}, {
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })
avatar
    .service('commoncategoryService',['$http',function($http){

        var sourcePath = "http://104.197.157.127/api/v1/subjects";

        this.getCommonCategory=function(){
            var jsonData=$http({
                method: 'GET',
                url: sourcePath,
                contentType:"application/json"
            }).then(function(response){

                return response.data;
            });
            return jsonData;
        };

        this.addCommonCategory=function(element){
            var jsonData=$http({
                method: 'POST',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.updateCommonCategory=function(element){
            var jsonData=$http({
                method: 'PUT',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.deleteCommonCategory=function(element){
            var jsonData=$http({
                method: 'DELETE',
                url:sourcePath+"/"+element,
                contentType:"application/json"
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };
    }]);
avatar
    .factory("quizQuestionService",function($resource){

        return $resource(apiURL+'/api/v1/quizquestions', {}, {
            query: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


.factory("quizQuestionServiceById",function($resource){

    return $resource(apiURL+'/api/v1/quizquestions/:id', {}, {
        query: {method: 'GET', isArray: true},
        create: {method: 'POST'},
        show: {method: 'GET', isArray: true},
        update: {method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id:'@id'}}
    });
});






/*
avatar
    .service('quizQuestionService',['$http',function($http){

        var sourcePath = "http://104.197.157.127/api/v1/quizquestions";

        this.getQuizQuestion=function(){
            var jsonData=$http({
                method: 'GET',
                url: sourcePath,
                contentType:"application/json"
            }).then(function(response){

                return response.data;
            });
            return jsonData;
        };

        this.addQuizQuestion=function(element){
            var jsonData=$http({
                method: 'POST',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.updateQuizQuestion=function(element){
            var jsonData=$http({
                method: 'PUT',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.deleteQuizQuestion=function(element){
            var jsonData=$http({
                method: 'DELETE',
                url:sourcePath+"/"+element,
                contentType:"application/json"
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };
    }]);*/

avatar
    .service('subjectCategoryService',['$http',function($http){

        var sourcePath = "http://104.197.157.127/api/v1/subjectcategories";

        this.getSubjectCategory=function(){
            var jsonData=$http({
                method: 'GET',
                url: sourcePath,
                contentType:"application/json"
            }).then(function(response){

                return response.data;
            });
            return jsonData;
        };

        this.addSubjectCategory=function(element){
            var jsonData=$http({
                method: 'POST',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.updateSubjectCategory=function(element){
            var jsonData=$http({
                method: 'PUT',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.deleteSubjectCategory=function(element){
            var jsonData=$http({
                method: 'DELETE',
                url:sourcePath+"/"+element,
                contentType:"application/json"
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };
    }]);
avatar
    .factory("subjectService",function($resource){

        return $resource(apiURL+'/api/v1/newSubjects', {}, {
            query: {method: 'GET',params:{type:'all'}, isArray: true},
            create: {method: 'POST'},
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id: '@id'}}
        });
    })


    .factory("subjectServiceById",function($resource){

        return $resource(apiURL+'/api/v1/newSubjects/:id', {}, {
            query: {method: 'GET', isArray: true},
            create: {method: 'POST'},
            show: {method: 'GET', isArray: true},
            update: {method: 'PUT', params: {id: '@id'}},
            delete: {method: 'DELETE', params: {id:'@id'}}
        });
    });


avatar
    .service('videoQuestionService',['$http',function($http){

        var sourcePath = "http://104.197.157.127/api/v1/video/questions";

        this.getVideoQuestion=function(){
            var jsonData=$http({
                method: 'GET',
                url: sourcePath,
                contentType:"application/json"
            }).then(function(response){

                return response.data;
            });
            return jsonData;
        };

        this.addVideoQuestion=function(element){
            var jsonData=$http({
                method: 'POST',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.updateVideoQuestion=function(element){
            var jsonData=$http({
                method: 'PUT',
                url: sourcePath+"/"+element,
                contentType:"application/json",
                data:element
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };

        this.deleteVideoQuestion=function(element){
            var jsonData=$http({
                method: 'DELETE',
                url:sourcePath+"/"+element,
                contentType:"application/json"
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };
    }]);
avatar
    .service('sidebarService',['$http',function($http){
        this.getSideBar=function(){
            var jsonData=$http({
                method: 'GET',
                url: 'http://130.211.190.15/api/v1/avatar/sidebar',
                contentType:"application/json"
            }).then(function(response){
                return response.data;
            });
            return jsonData;
        };
    }]);

/**avatar.service('tableSrv', ['$resource', function($resource){
        this.getUsers = function(a,b) {
            if(a=="admin" && b=="admin")
            {
                return 401;
            }
            else
            {
                return 402;
            }
            /* var leadsList = $resource("http://localhost:60262/leads?start=10&limit=10");
             var leads =  leadsList.get();
             console.log(leads);
             return leads;
        }
    }]);
 */

avatar
    .service('tableService', ['$http', '$q',
        function ($http, $q) {
            var contributorsFile = 'http://104.197.181.5/courses';
            var contributors = [];

            function getContributors() {
                var deferred = $q.defer();

                $http.get(contributorsFile)
                    .then(function (result) {
                        contributors = result.data;
                        deferred.resolve(contributors);
                    },

                    function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getTables: getContributors
            };
        }
    ]);
angular.module('avatar').run(['$templateCache', function($templateCache) {
    'use strict';

    /* $templateCache.put('template/chat.html',
     "<div class=\"chat-search\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control\" placeholder=\"Search People\"></div></div><div class=\"listview\"><a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"img/profile-pics/2.jpg\" alt=\"\"> <i class=\"chat-status-busy\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Jonathan Morris</div><small class=\"lv-small\">Available</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"img/profile-pics/1.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">David Belle</div><small class=\"lv-small\">Last seen 3 hours ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"img/profile-pics/3.jpg\" alt=\"\"> <i class=\"chat-status-online\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Fredric Mitchell Jr.</div><small class=\"lv-small\">Availble</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"img/profile-pics/4.jpg\" alt=\"\"> <i class=\"chat-status-online\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Glenn Jecobs</div><small class=\"lv-small\">Availble</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"img/profile-pics/5.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">Bill Phillips</div><small class=\"lv-small\">Last seen 3 days ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" src=\"img/profile-pics/6.jpg\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">Wendy Mitchell</div><small class=\"lv-small\">Last seen 2 minutes ago</small></div></div></a> <a class=\"lv-item\" href=\"\"><div class=\"media\"><div class=\"pull-left p-relative\"><img class=\"lv-img-sm\" src=\"img/profile-pics/7.jpg\" alt=\"\"> <i class=\"chat-status-busy\"></i></div><div class=\"media-body\"><div class=\"lv-title\">Teena Bell Ann</div><small class=\"lv-small\">Busy</small></div></div></a></div>"
     );*/


    /*$templateCache.put('template/footer.html',
     "Copyright &copy; 2016 INNOVAPATH, INC.<ul class=\"f-menu\"><li><a href=\"\">Home</a></li><li><a href=\"\">Contact</a></li></ul>"
     );*/



    $templateCache.put('template/header.html',
        "<ul class=\"header-inner\"><li id=\"menu-trigger\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"mactrl.sidebarToggle.left\" data-ng-class=\"{ 'open': mactrl.sidebarToggle.left === true }\"><div class=\"line-wrap\"><div class=\"line top\"></div><div class=\"line center\"></div><div class=\"line bottom\"></div></div></li><li class=\"logo hidden-xs\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\"><!--Avatar--> {{PresentCompany}} <!--{{ layoutSS }}--></a></li><li class=\"pull-right\"><ul class=\"top-menu\"><li id=\"toggle-width\"><div class=\"toggle-switch\"><input id=\"tw-switch\" type=\"checkbox\" hidden data-change-layout=\"mactrl.layoutType\"><label for=\"tw-switch\" class=\"ts-helper\"></label></div></li><li id=\"top-search\"><a class=\"tm-search\" href=\"\" data-ng-click=\"hctrl.openSearch()\"></a></li></ul></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><input type=\"text\"> <i id=\"top-search-close\" data-ng-click=\"hctrl.closeSearch()\">&times;</i></div>"
        /* "<ul class=\"header-inner\"><li id=\"menu-trigger\" data-target=\"mainmenu\" data-toggle-sidebar data-model-left=\"mactrl.sidebarToggle.left\" data-ng-class=\"{ 'open': mactrl.sidebarToggle.left === true }\"><div class=\"line-wrap\"><div class=\"line top\"></div><div class=\"line center\"></div><div class=\"line bottom\"></div></div></li><li class=\"logo hidden-xs\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\">Material Admin {{ layoutSS }}</a></li><li class=\"pull-right\"><ul class=\"top-menu\"><li id=\"toggle-width\"><div class=\"toggle-switch\"><input id=\"tw-switch\" type=\"checkbox\" hidden data-change-layout=\"mactrl.layoutType\"><label for=\"tw-switch\" class=\"ts-helper\"></label></div></li><li id=\"top-search\"><a class=\"tm-search\" href=\"\" data-ng-click=\"hctrl.openSearch()\"></a></li><li class=\"dropdown\" dropdown><a dropdown-toggle class=\"tm-message\" href=\"\"><i class=\"tmn-counts\">6</i></a><div class=\"dropdown-menu dropdown-menu-lg stop-propagate pull-right\"><div class=\"listview\"><div class=\"lv-header\">Messages</div><div class=\"lv-body\"><a class=\"lv-item\" ng-href=\"\" ng-repeat=\"w in hctrl.messageResult.list\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" ng-src=\"img/profile-pics/{{ w.img }}\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">{{ w.user }}</div><small class=\"lv-small\">{{ w.text }}</small></div></div></a></div><div class=\"clearfix\"></div><a class=\"lv-footer\" href=\"\">View All</a></div></div></li><li class=\"dropdown\" dropdown><a dropdown-toggle class=\"tm-notification\" href=\"\"><i class=\"tmn-counts\">9</i></a><div class=\"dropdown-menu dropdown-menu-lg stop-propagate pull-right\"><div class=\"listview\" id=\"notifications\"><div class=\"lv-header\">Notification<ul class=\"actions\"><li><a href=\"\" data-ng-click=\"hctrl.clearNotification($event)\"><i class=\"zmdi zmdi-check-all\"></i></a></li></ul></div><div class=\"lv-body\"><a class=\"lv-item\" ng-href=\"\" ng-repeat=\"w in hctrl.messageResult.list\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" ng-src=\"img/profile-pics/{{ w.img }}\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">{{ w.user }}</div><small class=\"lv-small\">{{ w.text }}</small></div></div></a></div><div class=\"clearfix\"></div><a class=\"lv-footer\" href=\"\">View Previous</a></div></div></li><li class=\"dropdown hidden-xs\" dropdown><a dropdown-toggle class=\"tm-task\" href=\"\"><i class=\"tmn-counts\">2</i></a><div class=\"dropdown-menu pull-right dropdown-menu-lg\"><div class=\"listview\"><div class=\"lv-header\">Tasks</div><div class=\"lv-body\"><div class=\"lv-item\"><div class=\"lv-title m-b-5\">HTML5 Validation Report</div><div class=\"progress\"><div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"95\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 95%\"><span class=\"sr-only\">95% Complete (success)</span></div></div></div><div class=\"lv-item\"><div class=\"lv-title m-b-5\">Google Chrome Extension</div><div class=\"progress\"><div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\"><span class=\"sr-only\">80% Complete (success)</span></div></div></div><div class=\"lv-item\"><div class=\"lv-title m-b-5\">Social Intranet Projects</div><div class=\"progress\"><div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 20%\"><span class=\"sr-only\">20% Complete</span></div></div></div><div class=\"lv-item\"><div class=\"lv-title m-b-5\">Bootstrap Admin Template</div><div class=\"progress\"><div class=\"progress-bar progress-bar-warning\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%\"><span class=\"sr-only\">60% Complete (warning)</span></div></div></div><div class=\"lv-item\"><div class=\"lv-title m-b-5\">Youtube Client App</div><div class=\"progress\"><div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\"><span class=\"sr-only\">80% Complete (danger)</span></div></div></div></div><div class=\"clearfix\"></div><a class=\"lv-footer\" href=\"\">View All</a></div></div></li><li class=\"dropdown\" dropdown><a dropdown-toggle class=\"tm-settings\" href=\"\"></a><ul class=\"dropdown-menu dm-icon pull-right\"><li class=\"hidden-xs\"><a data-ng-click=\"hctrl.fullScreen()\" href=\"\"><i class=\"zmdi zmdi-fullscreen\"></i> Toggle Fullscreen</a></li><li><a data-ng-click=\"hctrl.clearLocalStorage()\" href=\"\"><i class=\"zmdi zmdi-delete\"></i> Clear Local Storage</a></li><li><a href=\"\"><i class=\"zmdi zmdi-face\"></i> Privacy Settings</a></li><li><a href=\"\"><i class=\"zmdi zmdi-settings\"></i> Other Settings</a></li></ul></li><li class=\"hidden-xs\" data-target=\"chat\" data-toggle-sidebar data-model-right=\"mactrl.sidebarToggle.right\" data-ng-class=\"{ 'open': mactrl.sidebarToggle.right === true }\"><a class=\"tm-chat\" href=\"\"></a></li></ul></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><input type=\"text\"> <i id=\"top-search-close\" data-ng-click=\"hctrl.closeSearch()\">&times;</i></div>"*/
    );


    $templateCache.put('template/profile-menu.html',
        "<li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.profile-about\">About</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.profile-timeline\">Timeline</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.profile-photos\">Photos</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"pages.profile.profile-connections\">Connections</a></li>"
    );


    /*  $templateCache.put('template/sidebar-left.html',
     "<div class=\"sidebar-inner c-overflow\"><div class=\"profile-menu\"><a href=\"\" toggle-submenu><div class=\"profile-info\">Account Info <i class=\"zmdi zmdi-caret-down\"></i></div></a><ul class=\"main-menu\"><li><a data-ui-sref=\"pages.profile.profile-about\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-account\"></i> View Profile</a></li><li><a href=\"\"><i class=\"zmdi zmdi-input-antenna\"></i> Privacy Settings</a></li><li><a href=\"\"><i class=\"zmdi zmdi-settings\"></i> Settings</a></li><li><a href=\"\"><i class=\"zmdi zmdi-time-restore\"></i> Logout</a></li></ul></div><ul class=\"main-menu\"><li data-ui-sref-active=\"active\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i> Home</a></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('lookup') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi zmdi-account\"></i>Admin</a><ul style='margin-top: -14px'><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('lookup') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi zmdi-view-list\"></i> Lookup</a><ul style='margin-left: 50px'><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.education\" data-ng-click=\"mactrl.sidebarStat($event)\">Education Levels</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.workstatus\" data-ng-click=\"mactrl.sidebarStat($event)\">Work Status</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.employeedesignation\" data-ng-click=\"mactrl.sidebarStat($event)\">Employee Designation</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.empsalaryunit\" data-ng-click=\"mactrl.sidebarStat($event)\">Employee Salary Unit</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.cities\" data-ng-click=\"mactrl.sidebarStat($event)\">Cities</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"lookup.countries\" data-ng-click=\"mactrl.sidebarStat($event)\">Countries</a></li></li></ul><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('commons') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi zmdi-view-list\"></i> Common</a><ul style='margin-left: 50px'><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_entity\" data-ng-click=\"mactrl.sidebarStat($event)\">Entities</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_categories\" data-ng-click=\"mactrl.sidebarStat($event)\">Categories</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_level\" data-ng-click=\"mactrl.sidebarStat($event)\">Levels</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_status\" data-ng-click=\"mactrl.sidebarStat($event)\">Status</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_company\" data-ng-click=\"mactrl.sidebarStat($event)\"> Companies</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_address\" data-ng-click=\"mactrl.sidebarStat($event)\"> Address</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_contact\" data-ng-click=\"mactrl.sidebarStat($event)\"> Contacts</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"commons.common_employee\" data-ng-click=\"mactrl.sidebarStat($event)\"> Employees</a></li></li></ul></li></ul></li></li>" +
     "<li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('tables') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-menu\"></i> Training</a><ul><li class=\"sub-menu\"><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('tables') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi zmdi-view-list\"></i> Quiz</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.subjects\" data-ng-click=\"\">Subjects</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.subject_category\" data-ng-click=\"mactrl.sidebarStat($event)\">Subjects Categories</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.choice_questions\" data-ng-click=\"mactrl.sidebarStat($event)\">Choice Questions</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.video_questions\" data-ng-click=\"mactrl.sidebarStat($event)\">Video Questions</a></li></ul></ul></li></li></ul></li></div>"
     );*/
    /*$templateCache.put('template/carousel/carousel.html',
     "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\"><ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\"><li ng-repeat=\"slide in slides | orderBy:'index' track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li></ol><div class=\"carousel-inner\" ng-transclude></div><a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-left\"></span></a> <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-right\"></span></a></div>"
     );
     $templateCache.put('template/datepicker/day.html',
     "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table dpt-day\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr><tr class=\"tr-dpday\"><th ng-if=\"showWeeks\" class=\"text-center\"></th><th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpday btn-dpbody\" ng-class=\"{'dp-today': dt.current, 'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-muted': dt.secondary, 'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
     );
     $templateCache.put('template/datepicker/month.html',
     "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
     );
     $templateCache.put('template/datepicker/popup.html',
     "<ul class=\"dropdown-menu\" ng-keydown=\"keydown($event)\"><li ng-transclude></li><li ng-if=\"showButtonBar\" class=\"dp-actions clearfix\"><button type=\"button\" class=\"btn btn-link\" ng-click=\"select('today')\">{{ getText('current') }}</button> <button type=\"button\" class=\"btn btn-link\" ng-click=\"close()\">{{ getText('close') }}</button></li></ul>"
     );
     $templateCache.put('template/datepicker/year.html',
     "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"w-100 btn-dp\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
     );
     $templateCache.put('template/pagination/pager.html',
     "<ul class=\"pager\"><li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">Previous</a></li><li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">Next</a></li></ul>"
     );
     $templateCache.put('template/pagination/pagination.html',
     "<ul class=\"pagination\"><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1, $event)\"><i class=\"zmdi zmdi-chevron-left\"></i></a></li><li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1, $event)\"><i class=\"zmdi zmdi-chevron-right\"></i></a></li><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li></ul>"
     );
     $templateCache.put('template/tabs/tabset.html',
     "<div class=\"clearfix\"><ul class=\"tab-nav\" ng-class=\"{'tn-vertical': vertical, 'tn-justified': justified, 'tab-nav-right': right}\" ng-transclude></ul><div class=\"tab-content\"><div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" tab-content-transclude=\"tab\"></div></div></div>"
     );
     */
}]);
/*! Video.js v4.1.0 Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
 (function() {var b=void 0,f=!0,h=null,l=!1;function m(){return function(){}}function p(a){return function(){return this[a]}}function r(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");document.createElement("track");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.va[a])return u.va[a];a=u.r(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.C(a,c,d)}var v=u;
window.Bd=window.Cd=u;u.Qb="4.1";u.yc="https:"==document.location.protocol?"https://":"http://";u.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{}}};"GENERATED_CDN_VSN"!==u.Qb&&(v.options.flash.swf=u.yc+"vjs.zencdn.net/"+u.Qb+"/video-js.swf");u.va={};u.ka=u.CoreObject=m();
u.ka.extend=function(a){var c,d;a=a||{};c=a.init||a.g||this.prototype.init||this.prototype.g||m();d=function(){c.apply(this,arguments)};d.prototype=u.i.create(this.prototype);d.prototype.constructor=d;d.extend=u.ka.extend;d.create=u.ka.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};u.ka.create=function(){var a=u.i.create(this.prototype);this.apply(a,arguments);return a};
u.d=function(a,c,d){var e=u.getData(a);e.z||(e.z={});e.z[c]||(e.z[c]=[]);d.u||(d.u=u.u++);e.z[c].push(d);e.T||(e.disabled=l,e.T=function(c){if(!e.disabled){c=u.hc(c);var d=e.z[c.type];if(d)for(var d=d.slice(0),k=0,q=d.length;k<q&&!c.nc();k++)d[k].call(a,c)}});1==e.z[c].length&&(document.addEventListener?a.addEventListener(c,e.T,l):document.attachEvent&&a.attachEvent("on"+c,e.T))};
u.t=function(a,c,d){if(u.mc(a)){var e=u.getData(a);if(e.z)if(c){var g=e.z[c];if(g){if(d){if(d.u)for(e=0;e<g.length;e++)g[e].u===d.u&&g.splice(e--,1)}else e.z[c]=[];u.ec(a,c)}}else for(g in e.z)c=g,e.z[c]=[],u.ec(a,c)}};u.ec=function(a,c){var d=u.getData(a);0===d.z[c].length&&(delete d.z[c],document.removeEventListener?a.removeEventListener(c,d.T,l):document.detachEvent&&a.detachEvent("on"+c,d.T));u.Bb(d.z)&&(delete d.z,delete d.T,delete d.disabled);u.Bb(d)&&u.sc(a)};
u.hc=function(a){function c(){return f}function d(){return l}if(!a||!a.Cb){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&"layerY"!==g&&(a[g]=e[g]);a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.Ab=c};a.Ab=d;a.stopPropagation=function(){e.stopPropagation&&e.stopPropagation();a.cancelBubble=f;a.Cb=c};a.Cb=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&
e.stopImmediatePropagation();a.nc=c;a.stopPropagation()};a.nc=d;if(a.clientX!=h){g=document.documentElement;var j=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||j&&j.scrollLeft||0)-(g&&g.clientLeft||j&&j.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||j&&j.scrollTop||0)-(g&&g.clientTop||j&&j.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=h&&(a.button=a.button&1?0:a.button&4?1:a.button&2?2:0)}return a};
u.k=function(a,c){var d=u.mc(a)?u.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=u.hc(c);d.T&&d.T.call(a,c);if(e&&!c.Cb())u.k(e,c);else if(!e&&!c.Ab()&&(d=u.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.Ab()};u.R=function(a,c,d){u.d(a,c,function(){u.t(a,c,arguments.callee);d.apply(this,arguments)})};var w=Object.prototype.hasOwnProperty;
u.e=function(a,c){var d=document.createElement(a||"div"),e;for(e in c)w.call(c,e)&&(-1!==e.indexOf("aria-")||"role"==e?d.setAttribute(e,c[e]):d[e]=c[e]);return d};u.Z=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};u.i={};u.i.create=Object.create||function(a){function c(){}c.prototype=a;return new c};u.i.ra=function(a,c,d){for(var e in a)w.call(a,e)&&c.call(d||this,e,a[e])};u.i.B=function(a,c){if(!c)return a;for(var d in c)w.call(c,d)&&(a[d]=c[d]);return a};
u.i.gc=function(a,c){var d,e,g;a=u.i.copy(a);for(d in c)w.call(c,d)&&(e=a[d],g=c[d],a[d]=u.i.oc(e)&&u.i.oc(g)?u.i.gc(e,g):c[d]);return a};u.i.copy=function(a){return u.i.B({},a)};u.i.oc=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};u.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.u||(c.u=u.u++);e.u=d?d+"_"+c.u:c.u;return e};u.pa={};u.u=1;u.expando="vdata"+(new Date).getTime();
u.getData=function(a){var c=a[u.expando];c||(c=a[u.expando]=u.u++,u.pa[c]={});return u.pa[c]};u.mc=function(a){a=a[u.expando];return!(!a||u.Bb(u.pa[a]))};u.sc=function(a){var c=a[u.expando];if(c){delete u.pa[c];try{delete a[u.expando]}catch(d){a.removeAttribute?a.removeAttribute(u.expando):a[u.expando]=h}}};u.Bb=function(a){for(var c in a)if(a[c]!==h)return l;return f};u.p=function(a,c){-1==(" "+a.className+" ").indexOf(" "+c+" ")&&(a.className=""===a.className?c:a.className+" "+c)};
u.w=function(a,c){if(-1!=a.className.indexOf(c)){for(var d=a.className.split(" "),e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};u.ma=u.e("video");u.G=navigator.userAgent;u.Cc=/iPhone/i.test(u.G);u.Bc=/iPad/i.test(u.G);u.Dc=/iPod/i.test(u.G);u.Ub=u.Cc||u.Bc||u.Dc;var aa=u,x;var y=u.G.match(/OS (\d+)_/i);x=y&&y[1]?y[1]:b;aa.td=x;u.ab=/Android/i.test(u.G);var ba=u,z;var A=u.G.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),B,C;
A?(B=A[1]&&parseFloat(A[1]),C=A[2]&&parseFloat(A[2]),z=B&&C?parseFloat(A[1]+"."+A[2]):B?B:h):z=h;ba.zc=z;u.Ec=u.ab&&/webkit/i.test(u.G)&&2.3>u.zc;u.Ac=/Firefox/i.test(u.G);u.ud=/Chrome/i.test(u.G);u.xb=function(a){var c={};if(a&&a.attributes&&0<a.attributes.length)for(var d=a.attributes,e,g,j=d.length-1;0<=j;j--){e=d[j].name;g=d[j].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==h?f:l;c[e]=g}return c};
u.xd=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};u.zb=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};u.Ob={};u.r=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)};
u.Ka=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),j=Math.floor(c/60%60),k=Math.floor(c/3600),g=0<g||0<k?g+":":"";return g+(((g||10<=j)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};u.Ic=function(){document.body.focus();document.onselectstart=r(l)};u.od=function(){document.onselectstart=r(f)};u.trim=function(a){return a.toString().replace(/^\s+/,"").replace(/\s+$/,"")};u.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)};
u.tb=function(a,c){return{length:1,start:function(){return a},end:function(){return c}}};
u.get=function(a,c,d){var e=0===a.indexOf("file:")||0===window.location.href.indexOf("file:")&&-1===a.indexOf("http");"undefined"===typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest.");});var g=new XMLHttpRequest;try{g.open("GET",a)}catch(j){d(j)}g.onreadystatechange=
function(){4===g.readyState&&(200===g.status||e&&0===g.status?c(g.responseText):d&&d())};try{g.send()}catch(k){d&&d(k)}};u.gd=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?u.log("LocalStorage Full (VideoJS)",d):18==d.code?u.log("LocalStorage not allowed (VideoJS)",d):u.log("LocalStorage Error (VideoJS)",d)}};u.kc=function(a){a.match(/^https?:\/\//)||(a=u.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a};
u.log=function(){u.log.history=u.log.history||[];u.log.history.push(arguments);window.console&&window.console.log(Array.prototype.slice.call(arguments))};u.Qc=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0),top:c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0)}};
u.c=u.ka.extend({g:function(a,c,d){this.a=a;this.f=u.i.copy(this.f);c=this.options(c);this.O=c.id||(c.el&&c.el.id?c.el.id:a.id()+"_component_"+u.u++);this.Vc=c.name||h;this.b=c.el||this.e();this.H=[];this.rb={};this.S={};if((a=this.f)&&a.children){var e=this;u.i.ra(a.children,function(a,c){c!==l&&!c.loadEvent&&(e[a]=e.Y(a,c))})}this.P(d)}});t=u.c.prototype;
t.D=function(){if(this.H)for(var a=this.H.length-1;0<=a;a--)this.H[a].D&&this.H[a].D();this.S=this.rb=this.H=h;this.t();this.b.parentNode&&this.b.parentNode.removeChild(this.b);u.sc(this.b);this.b=h};t.bd=p("a");t.options=function(a){return a===b?this.f:this.f=u.i.gc(this.f,a)};t.e=function(a,c){return u.e(a,c)};t.r=p("b");t.id=p("O");t.name=p("Vc");t.children=p("H");
t.Y=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||u.Z(e),c.name=e,d=new window.videojs[d](this.a||this,c)):d=a;this.H.push(d);"function"===typeof d.id&&(this.rb[d.id()]=d);(e=e||d.name&&d.name())&&(this.S[e]=d);"function"===typeof d.el&&d.el()&&(this.qa||this.b).appendChild(d.el());return d};
t.removeChild=function(a){"string"===typeof a&&(a=this.S[a]);if(a&&this.H){for(var c=l,d=this.H.length-1;0<=d;d--)if(this.H[d]===a){c=f;this.H.splice(d,1);break}c&&(this.rb[a.id]=h,this.S[a.name]=h,(c=a.r())&&c.parentNode===(this.qa||this.b)&&(this.qa||this.b).removeChild(a.r()))}};t.Q=r("");t.d=function(a,c){u.d(this.b,a,u.bind(this,c));return this};t.t=function(a,c){u.t(this.b,a,c);return this};t.R=function(a,c){u.R(this.b,a,u.bind(this,c));return this};t.k=function(a,c){u.k(this.b,a,c);return this};
t.P=function(a){a&&(this.aa?a.call(this):(this.Ra===b&&(this.Ra=[]),this.Ra.push(a)));return this};t.Ta=function(){this.aa=f;var a=this.Ra;if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.Ra=[];this.k("ready")}};t.p=function(a){u.p(this.b,a);return this};t.w=function(a){u.w(this.b,a);return this};t.show=function(){this.b.style.display="block";return this};t.v=function(){this.b.style.display="none";return this};t.$=function(){this.w("vjs-fade-out");this.p("vjs-fade-in");return this};
t.ta=function(){this.w("vjs-fade-in");this.p("vjs-fade-out");return this};t.pc=function(){this.p("vjs-lock-showing");return this};t.Ua=function(){this.w("vjs-lock-showing");return this};t.disable=function(){this.v();this.show=m();this.$=m()};t.width=function(a,c){return D(this,"width",a,c)};t.height=function(a,c){return D(this,"height",a,c)};t.Mc=function(a,c){return this.width(a,f).height(c)};
function D(a,c,d,e){if(d!==b)return a.b.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.k("resize"),a;if(!a.b)return 0;d=a.b.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.b["offset"+u.Z(c)],10)}
u.o=u.c.extend({g:function(a,c){u.c.call(this,a,c);var d=l;this.d("touchstart",function(){d=f});this.d("touchmove",function(){d=l});var e=this;this.d("touchend",function(a){d&&e.n(a);a.preventDefault();a.stopPropagation()});this.d("click",this.n);this.d("focus",this.Na);this.d("blur",this.Ma)}});t=u.o.prototype;
t.e=function(a,c){c=u.i.B({className:this.Q(),innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+(this.oa||"Need Text")+"</span></div>",dd:"button","aria-live":"polite",tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.Q=function(){return"vjs-control "+u.c.prototype.Q.call(this)};t.n=m();t.Na=function(){u.d(document,"keyup",u.bind(this,this.ba))};t.ba=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.n()};
t.Ma=function(){u.t(document,"keyup",u.bind(this,this.ba))};u.M=u.c.extend({g:function(a,c){u.c.call(this,a,c);this.Hc=this.S[this.f.barName];this.handle=this.S[this.f.handleName];a.d(this.qc,u.bind(this,this.update));this.d("mousedown",this.Oa);this.d("touchstart",this.Oa);this.d("focus",this.Na);this.d("blur",this.Ma);this.d("click",this.n);this.a.d("controlsvisible",u.bind(this,this.update));a.P(u.bind(this,this.update));this.N={}}});t=u.M.prototype;
t.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=u.i.B({dd:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return u.c.prototype.e.call(this,a,c)};t.Oa=function(a){a.preventDefault();u.Ic();this.N.move=u.bind(this,this.Hb);this.N.end=u.bind(this,this.Ib);u.d(document,"mousemove",this.N.move);u.d(document,"mouseup",this.N.end);u.d(document,"touchmove",this.N.move);u.d(document,"touchend",this.N.end);this.Hb(a)};
t.Ib=function(){u.od();u.t(document,"mousemove",this.N.move,l);u.t(document,"mouseup",this.N.end,l);u.t(document,"touchmove",this.N.move,l);u.t(document,"touchend",this.N.end,l);this.update()};t.update=function(){if(this.b){var a,c=this.yb(),d=this.handle,e=this.Hc;isNaN(c)&&(c=0);a=c;if(d){a=this.b.offsetWidth;var g=d.r().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.r().style.left=u.round(100*c,2)+"%"}e.r().style.width=u.round(100*a,2)+"%"}};
function E(a,c){var d,e,g,j;d=a.b;e=u.Qc(d);j=g=d.offsetWidth;d=a.handle;if(a.f.pd)return j=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.r().offsetHeight,j+=d/2,g-=d),Math.max(0,Math.min(1,(j-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.r().offsetWidth,g+=d/2,j-=d);return Math.max(0,Math.min(1,(e-g)/j))}t.Na=function(){u.d(document,"keyup",u.bind(this,this.ba))};
t.ba=function(a){37==a.which?(a.preventDefault(),this.vc()):39==a.which&&(a.preventDefault(),this.wc())};t.Ma=function(){u.t(document,"keyup",u.bind(this,this.ba))};t.n=function(a){a.stopImmediatePropagation();a.preventDefault()};u.ga=u.c.extend();u.ga.prototype.defaultValue=0;u.ga.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=u.i.B({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return u.c.prototype.e.call(this,"div",c)};u.la=u.c.extend();
function ca(a,c){a.Y(c);c.d("click",u.bind(a,function(){this.Ua()}))}u.la.prototype.e=function(){var a=this.options().Kc||"ul";this.qa=u.e(a,{className:"vjs-menu-content"});a=u.c.prototype.e.call(this,"div",{append:this.qa,className:"vjs-menu"});a.appendChild(this.qa);u.d(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};u.L=u.o.extend({g:function(a,c){u.o.call(this,a,c);this.selected(c.selected)}});
u.L.prototype.e=function(a,c){return u.o.prototype.e.call(this,"li",u.i.B({className:"vjs-menu-item",innerHTML:this.f.label},c))};u.L.prototype.n=function(){this.selected(f)};u.L.prototype.selected=function(a){a?(this.p("vjs-selected"),this.b.setAttribute("aria-selected",f)):(this.w("vjs-selected"),this.b.setAttribute("aria-selected",l))};
u.ea=u.o.extend({g:function(a,c){u.o.call(this,a,c);this.ua=this.Ja();this.Y(this.ua);this.J&&0===this.J.length&&this.v();this.d("keyup",this.ba);this.b.setAttribute("aria-haspopup",f);this.b.setAttribute("role","button")}});t=u.ea.prototype;t.na=l;t.Ja=function(){var a=new u.la(this.a);this.options().title&&a.r().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.Z(this.A),md:-1}));if(this.J=this.sb())for(var c=0;c<this.J.length;c++)ca(a,this.J[c]);return a};t.sb=m();
t.Q=function(){return this.className+" vjs-menu-button "+u.o.prototype.Q.call(this)};t.Na=m();t.Ma=m();t.n=function(){this.R("mouseout",u.bind(this,function(){this.ua.Ua();this.b.blur()}));this.na?F(this):G(this)};t.ba=function(a){a.preventDefault();32==a.which||13==a.which?this.na?F(this):G(this):27==a.which&&this.na&&F(this)};function G(a){a.na=f;a.ua.pc();a.b.setAttribute("aria-pressed",f);a.J&&0<a.J.length&&a.J[0].r().focus()}function F(a){a.na=l;a.ua.Ua();a.b.setAttribute("aria-pressed",l)}
u.C=u.c.extend({g:function(a,c,d){this.F=a;c=u.i.B(da(a),c);this.s={};this.rc=c.poster;this.Ia=c.controls;c.customControlsOnMobile!==f&&(u.Ub||u.ab)?(a.controls=c.controls,this.Ia=l):a.controls=l;u.c.call(this,this,c,d);this.R("play",function(a){u.k(this.b,{type:"firstplay",target:this.b})||(a.preventDefault(),a.stopPropagation(),a.stopImmediatePropagation())});this.d("ended",this.Xc);this.d("play",this.Kb);this.d("firstplay",this.Yc);this.d("pause",this.Jb);this.d("progress",this.$c);this.d("durationchange",
this.Wc);this.d("error",this.Gb);this.d("fullscreenchange",this.Zc);u.va[this.O]=this;c.plugins&&u.i.ra(c.plugins,function(a,c){this[a](c)},this)}});t=u.C.prototype;t.f=u.options;t.D=function(){u.va[this.O]=h;this.F&&this.F.player&&(this.F.player=h);this.b&&this.b.player&&(this.b.player=h);clearInterval(this.Qa);this.xa();this.h&&this.h.D();u.c.prototype.D.call(this)};
function da(a){var c={sources:[],tracks:[]};u.i.B(c,u.xb(a));if(a.hasChildNodes()){var d,e,g,j;a=a.childNodes;g=0;for(j=a.length;g<j;g++)d=a[g],e=d.nodeName.toLowerCase(),"source"===e?c.sources.push(u.xb(d)):"track"===e&&c.tracks.push(u.xb(d))}return c}
t.e=function(){var a=this.b=u.c.prototype.e.call(this,"div"),c=this.F;c.removeAttribute("width");c.removeAttribute("height");if(c.hasChildNodes()){var d,e,g,j,k;d=c.childNodes;e=d.length;for(k=[];e--;)g=d[e],j=g.nodeName.toLowerCase(),("source"===j||"track"===j)&&k.push(g);for(d=0;d<k.length;d++)c.removeChild(k[d])}c.id=c.id||"vjs_video_"+u.u++;a.id=c.id;a.className=c.className;c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.p("vjs-paused");this.width(this.f.width,f);this.height(this.f.height,
f);c.parentNode&&c.parentNode.insertBefore(a,c);u.zb(c,a);return a};
function H(a,c,d){a.h?(a.aa=l,a.h.D(),a.Eb&&(a.Eb=l,clearInterval(a.Qa)),a.Fb&&I(a),a.h=l):"Html5"!==c&&a.F&&(a.b.removeChild(a.F),a.F.player=h,a.F=h);a.ya=c;a.aa=l;var e=u.i.B({source:d,parentEl:a.b},a.f[c.toLowerCase()]);d&&(d.src==a.s.src&&0<a.s.currentTime&&(e.startTime=a.s.currentTime),a.s.src=d.src);a.h=new window.videojs[c](a,e);a.h.P(function(){this.a.Ta();if(!this.j.Mb){var a=this.a;a.Eb=f;a.Qa=setInterval(u.bind(a,function(){this.s.mb<this.buffered().end(0)?this.k("progress"):1==this.Ha()&&
(clearInterval(this.Qa),this.k("progress"))}),500);a.h.R("progress",function(){this.j.Mb=f;var a=this.a;a.Eb=l;clearInterval(a.Qa)})}this.j.Pb||(a=this.a,a.Fb=f,a.d("play",a.xc),a.d("pause",a.xa),a.h.R("timeupdate",function(){this.j.Pb=f;I(this.a)}))})}function I(a){a.Fb=l;a.xa();a.t("play",a.xc);a.t("pause",a.xa)}t.xc=function(){this.fc&&this.xa();this.fc=setInterval(u.bind(this,function(){this.k("timeupdate")}),250)};t.xa=function(){clearInterval(this.fc)};
t.Xc=function(){this.f.loop&&(this.currentTime(0),this.play())};t.Kb=function(){u.w(this.b,"vjs-paused");u.p(this.b,"vjs-playing")};t.Yc=function(){this.f.starttime&&this.currentTime(this.f.starttime)};t.Jb=function(){u.w(this.b,"vjs-playing");u.p(this.b,"vjs-paused")};t.$c=function(){1==this.Ha()&&this.k("loadedalldata")};t.Wc=function(){this.duration(J(this,"duration"))};t.Gb=function(a){u.log("Video Error",a)};t.Zc=function(){this.I?this.p("vjs-fullscreen"):this.w("vjs-fullscreen")};
function K(a,c,d){if(a.h&&!a.h.aa)a.h.P(function(){this[c](d)});else try{a.h[c](d)}catch(e){throw u.log(e),e;}}function J(a,c){if(a.h.aa)try{return a.h[c]()}catch(d){throw a.h[c]===b?u.log("Video.js: "+c+" method not defined for "+a.ya+" playback technology.",d):"TypeError"==d.name?(u.log("Video.js: "+c+" unavailable on "+a.ya+" playback technology element.",d),a.h.aa=l):u.log(d),d;}}t.play=function(){K(this,"play");return this};t.pause=function(){K(this,"pause");return this};
t.paused=function(){return J(this,"paused")===l?l:f};t.currentTime=function(a){return a!==b?(this.s.zd=a,K(this,"setCurrentTime",a),this.Fb&&this.k("timeupdate"),this):this.s.currentTime=J(this,"currentTime")||0};t.duration=function(a){return a!==b?(this.s.duration=parseFloat(a),this):this.s.duration};t.buffered=function(){var a=J(this,"buffered"),c=this.s.mb=this.s.mb||0;a&&(0<a.length&&a.end(0)!==c)&&(c=a.end(0),this.s.mb=c);return u.tb(0,c)};
t.Ha=function(){return this.duration()?this.buffered().end(0)/this.duration():0};t.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.s.volume=a,K(this,"setVolume",a),u.gd(a),this;a=parseFloat(J(this,"volume"));return isNaN(a)?1:a};t.muted=function(a){return a!==b?(K(this,"setMuted",a),this):J(this,"muted")||l};t.Sa=function(){return J(this,"supportsFullScreen")||l};
t.wa=function(){var a=u.Ob.wa;this.I=f;a?(u.d(document,a.vb,u.bind(this,function(c){this.I=document[a.I];this.I===l&&u.t(document,a.vb,arguments.callee);this.k("fullscreenchange")})),this.b[a.tc]()):this.h.Sa()?K(this,"enterFullScreen"):(this.Sc=f,this.Nc=document.documentElement.style.overflow,u.d(document,"keydown",u.bind(this,this.ic)),document.documentElement.style.overflow="hidden",u.p(document.body,"vjs-full-window"),this.k("enterFullWindow"),this.k("fullscreenchange"));return this};
t.pb=function(){var a=u.Ob.wa;this.I=l;if(a)document[a.ob]();else this.h.Sa()?K(this,"exitFullScreen"):(L(this),this.k("fullscreenchange"));return this};t.ic=function(a){27===a.keyCode&&(this.I===f?this.pb():L(this))};function L(a){a.Sc=l;u.t(document,"keydown",a.ic);document.documentElement.style.overflow=a.Nc;u.w(document.body,"vjs-full-window");a.k("exitFullWindow")}
t.src=function(a){if(a instanceof Array){var c;a:{c=a;for(var d=0,e=this.f.techOrder;d<e.length;d++){var g=u.Z(e[d]),j=window.videojs[g];if(j.isSupported())for(var k=0,q=c;k<q.length;k++){var n=q[k];if(j.canPlaySource(n)){c={source:n,h:g};break a}}}c=l}c?(a=c.source,c=c.h,c==this.ya?this.src(a):H(this,c,a)):this.b.appendChild(u.e("p",{innerHTML:'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'}))}else a instanceof
Object?window.videojs[this.ya].canPlaySource(a)?this.src(a.src):this.src([a]):(this.s.src=a,this.aa?(K(this,"src",a),"auto"==this.f.preload&&this.load(),this.f.autoplay&&this.play()):this.P(function(){this.src(a)}));return this};t.load=function(){K(this,"load");return this};t.currentSrc=function(){return J(this,"currentSrc")||this.s.src||""};t.Pa=function(a){return a!==b?(K(this,"setPreload",a),this.f.preload=a,this):J(this,"preload")};
t.autoplay=function(a){return a!==b?(K(this,"setAutoplay",a),this.f.autoplay=a,this):J(this,"autoplay")};t.loop=function(a){return a!==b?(K(this,"setLoop",a),this.f.loop=a,this):J(this,"loop")};t.poster=function(a){a!==b&&(this.rc=a);return this.rc};t.controls=function(a){a!==b&&this.Ia!==a&&(this.Ia=!!a,this.k("controlschange"));return this.Ia};t.error=function(){return J(this,"error")};var M,N,O;O=document.createElement("div");N={};
O.vd!==b?(N.tc="requestFullscreen",N.ob="exitFullscreen",N.vb="fullscreenchange",N.I="fullScreen"):(document.mozCancelFullScreen?(M="moz",N.I=M+"FullScreen"):(M="webkit",N.I=M+"IsFullScreen"),O[M+"RequestFullScreen"]&&(N.tc=M+"RequestFullScreen",N.ob=M+"CancelFullScreen"),N.vb=M+"fullscreenchange");document[N.ob]&&(u.Ob.wa=N);
u.da=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.controls()||this.disable();a.R("play",u.bind(this,function(){var a,c=u.bind(this,this.$),g=u.bind(this,this.ta);this.$();"ontouchstart"in window||(this.a.d("mouseover",c),this.a.d("mouseout",g),this.a.d("pause",u.bind(this,this.pc)),this.a.d("play",u.bind(this,this.Ua)));a=l;this.a.d("touchstart",function(){a=f});this.a.d("touchmove",function(){a=l});this.a.d("touchend",u.bind(this,function(c){var e;a&&(e=this.r().className.search("fade-in"),-1!==
e?this.ta():this.$());a=l;this.a.paused()||c.preventDefault()}))}))}});u.da.prototype.f={Ad:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{}}};u.da.prototype.e=function(){return u.e("div",{className:"vjs-control-bar"})};u.da.prototype.$=function(){u.c.prototype.$.call(this);this.a.k("controlsvisible")};u.da.prototype.ta=function(){u.c.prototype.ta.call(this);this.a.k("controlshidden")};
u.Xb=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.d("play",u.bind(this,this.Kb));a.d("pause",u.bind(this,this.Jb))}});t=u.Xb.prototype;t.oa="Play";t.Q=function(){return"vjs-play-control "+u.o.prototype.Q.call(this)};t.n=function(){this.a.paused()?this.a.play():this.a.pause()};t.Kb=function(){u.w(this.b,"vjs-paused");u.p(this.b,"vjs-playing");this.b.children[0].children[0].innerHTML="Pause"};
t.Jb=function(){u.w(this.b,"vjs-playing");u.p(this.b,"vjs-paused");this.b.children[0].children[0].innerHTML="Play"};u.Ya=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ba))}});
u.Ya.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};
u.Ya.prototype.Ba=function(){var a=this.a.Nb?this.a.s.currentTime:this.a.currentTime();this.content.innerHTML='<span class="vjs-control-text">Current Time </span>'+u.Ka(a,this.a.duration())};u.Za=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ba))}});
u.Za.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};u.Za.prototype.Ba=function(){this.a.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Duration Time </span>'+u.Ka(this.a.duration()))};
u.ac=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});u.ac.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};u.gb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("timeupdate",u.bind(this,this.Ba))}});
u.gb.prototype.e=function(){var a=u.c.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.content=u.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',"aria-live":"off"});a.appendChild(u.e("div").appendChild(this.content));return a};
u.gb.prototype.Ba=function(){this.a.duration()&&this.a.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+u.Ka(this.a.duration()-this.a.currentTime()))};u.Da=u.o.extend({g:function(a,c){u.o.call(this,a,c)}});u.Da.prototype.oa="Fullscreen";u.Da.prototype.Q=function(){return"vjs-fullscreen-control "+u.o.prototype.Q.call(this)};
u.Da.prototype.n=function(){this.a.I?(this.a.pb(),this.b.children[0].children[0].innerHTML="Fullscreen"):(this.a.wa(),this.b.children[0].children[0].innerHTML="Non-Fullscreen")};u.fb=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});u.fb.prototype.f={children:{seekBar:{}}};u.fb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};u.Yb=u.M.extend({g:function(a,c){u.M.call(this,a,c);a.d("timeupdate",u.bind(this,this.Aa));a.P(u.bind(this,this.Aa))}});
t=u.Yb.prototype;t.f={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};t.qc="timeupdate";t.e=function(){return u.M.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})};t.Aa=function(){var a=this.a.Nb?this.a.s.currentTime:this.a.currentTime();this.b.setAttribute("aria-valuenow",u.round(100*this.yb(),2));this.b.setAttribute("aria-valuetext",u.Ka(a,this.a.duration()))};
t.yb=function(){return this.a.currentTime()/this.a.duration()};t.Oa=function(a){u.M.prototype.Oa.call(this,a);this.a.Nb=f;this.qd=!this.a.paused();this.a.pause()};t.Hb=function(a){a=E(this,a)*this.a.duration();a==this.a.duration()&&(a-=0.1);this.a.currentTime(a)};t.Ib=function(a){u.M.prototype.Ib.call(this,a);this.a.Nb=l;this.qd&&this.a.play()};t.wc=function(){this.a.currentTime(this.a.currentTime()+5)};t.vc=function(){this.a.currentTime(this.a.currentTime()-5)};
u.bb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("progress",u.bind(this,this.update))}});u.bb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})};u.bb.prototype.update=function(){this.b.style&&(this.b.style.width=u.round(100*this.a.Ha(),2)+"%")};u.Wb=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});
u.Wb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})};u.hb=u.ga.extend();u.hb.prototype.defaultValue="00:00";u.hb.prototype.e=function(){return u.ga.prototype.e.call(this,"div",{className:"vjs-seek-handle"})};u.jb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.h&&(a.h.j&&a.h.j.U===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.U===l?this.p("vjs-hidden"):this.w("vjs-hidden")}))}});
u.jb.prototype.f={children:{volumeBar:{}}};u.jb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};u.ib=u.M.extend({g:function(a,c){u.M.call(this,a,c);a.d("volumechange",u.bind(this,this.Aa));a.P(u.bind(this,this.Aa));setTimeout(u.bind(this,this.update),0)}});t=u.ib.prototype;t.Aa=function(){this.b.setAttribute("aria-valuenow",u.round(100*this.a.volume(),2));this.b.setAttribute("aria-valuetext",u.round(100*this.a.volume(),2)+"%")};
t.f={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"};t.qc="volumechange";t.e=function(){return u.M.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};t.Hb=function(a){this.a.volume(E(this,a))};t.yb=function(){return this.a.muted()?0:this.a.volume()};t.wc=function(){this.a.volume(this.a.volume()+0.1)};t.vc=function(){this.a.volume(this.a.volume()-0.1)};u.bc=u.c.extend({g:function(a,c){u.c.call(this,a,c)}});
u.bc.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};u.kb=u.ga.extend();u.kb.prototype.defaultValue="00:00";u.kb.prototype.e=function(){return u.ga.prototype.e.call(this,"div",{className:"vjs-volume-handle"})};
u.fa=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.j&&a.h.j.U===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.U===l?this.p("vjs-hidden"):this.w("vjs-hidden")}))}});u.fa.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.fa.prototype.n=function(){this.a.muted(this.a.muted()?l:f)};
u.fa.prototype.update=function(){var a=this.a.volume(),c=3;0===a||this.a.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.a.muted()?"Unmute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Mute");for(a=0;4>a;a++)u.w(this.b,"vjs-vol-"+a);u.p(this.b,"vjs-vol-"+c)};
u.Fa=u.ea.extend({g:function(a,c){u.ea.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.h&&(a.h.j&&a.h.j.U===l)&&this.p("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.h.j&&a.h.j.U===l?this.p("vjs-hidden"):this.w("vjs-hidden")}));this.p("vjs-menu-button")}});u.Fa.prototype.Ja=function(){var a=new u.la(this.a,{Kc:"div"}),c=new u.ib(this.a,u.i.B({pd:f},this.f.Dd));a.Y(c);return a};u.Fa.prototype.n=function(){u.fa.prototype.n.call(this);u.ea.prototype.n.call(this)};
u.Fa.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.Fa.prototype.update=u.fa.prototype.update;u.eb=u.o.extend({g:function(a,c){u.o.call(this,a,c);(!a.poster()||!a.controls())&&this.v();a.d("play",u.bind(this,this.v))}});
u.eb.prototype.e=function(){var a=u.e("div",{className:"vjs-poster",tabIndex:-1}),c=this.a.poster();c&&("backgroundSize"in a.style?a.style.backgroundImage='url("'+c+'")':a.appendChild(u.e("img",{src:c})));return a};u.eb.prototype.n=function(){this.a.play()};
u.Vb=u.c.extend({g:function(a,c){u.c.call(this,a,c);a.d("canplay",u.bind(this,this.v));a.d("canplaythrough",u.bind(this,this.v));a.d("playing",u.bind(this,this.v));a.d("seeked",u.bind(this,this.v));a.d("seeking",u.bind(this,this.show));a.d("seeked",u.bind(this,this.v));a.d("error",u.bind(this,this.show));a.d("waiting",u.bind(this,this.show))}});u.Vb.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};
u.Wa=u.o.extend({g:function(a,c){u.o.call(this,a,c);a.controls()||this.v();a.d("play",u.bind(this,this.v))}});u.Wa.prototype.e=function(){return u.o.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:"<span></span>","aria-label":"play video"})};u.Wa.prototype.n=function(){this.a.play()};u.q=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d)}});u.q.prototype.n=u.ab?m():function(){this.a.controls()&&(this.a.paused()?this.a.play():this.a.pause())};u.q.prototype.j={U:f,jc:l,Mb:l,Pb:l};
u.media={};u.media.Va="play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");
function ea(){var a=u.media.Va[i];return function(){throw Error('The "'+a+"\" method is not available on the playback technology's API");}}for(var i=u.media.Va.length-1;0<=i;i--)u.q.prototype[u.media.Va[i]]=ea();
u.m=u.q.extend({g:function(a,c,d){this.j.U=u.m.Jc();this.j.Uc=!u.Ub;this.j.jc=f;u.q.call(this,a,c,d);(c=c.source)&&this.b.currentSrc==c.src?a.k("loadstart"):c&&(this.b.src=c.src);a.P(function(){this.F&&(this.f.autoplay&&this.paused())&&(delete this.F.poster,this.play())});this.d("click",this.n);for(a=u.m.$a.length-1;0<=a;a--)u.d(this.b,u.m.$a[a],u.bind(this.a,this.Pc));this.Ta()}});t=u.m.prototype;t.D=function(){u.q.prototype.D.call(this)};
t.e=function(){var a=this.a,c=a.F;if(!c||this.j.Uc===l)c?(c.player=h,a.F=h,a.r().removeChild(c),c=c.cloneNode(l)):c=u.e("video",{id:a.id()+"_html5_api",className:"vjs-tech"}),c.player=a,u.zb(c,a.r());for(var d=["autoplay","preload","loop","muted"],e=d.length-1;0<=e;e--){var g=d[e];a.f[g]!==h&&(c[g]=a.f[g])}return c};t.Pc=function(a){this.k(a);a.stopPropagation()};t.play=function(){this.b.play()};t.pause=function(){this.b.pause()};t.paused=function(){return this.b.paused};t.currentTime=function(){return this.b.currentTime};
t.fd=function(a){try{this.b.currentTime=a}catch(c){u.log(c,"Video is not ready. (Video.js)")}};t.duration=function(){return this.b.duration||0};t.buffered=function(){return this.b.buffered};t.volume=function(){return this.b.volume};t.ld=function(a){this.b.volume=a};t.muted=function(){return this.b.muted};t.jd=function(a){this.b.muted=a};t.width=function(){return this.b.offsetWidth};t.height=function(){return this.b.offsetHeight};
t.Sa=function(){return"function"==typeof this.b.webkitEnterFullScreen&&(/Android/.test(u.G)||!/Chrome|Mac OS X 10.5/.test(u.G))?f:l};t.src=function(a){this.b.src=a};t.load=function(){this.b.load()};t.currentSrc=function(){return this.b.currentSrc};t.Pa=function(){return this.b.Pa};t.kd=function(a){this.b.Pa=a};t.autoplay=function(){return this.b.autoplay};t.ed=function(a){this.b.autoplay=a};t.loop=function(){return this.b.loop};t.hd=function(a){this.b.loop=a};t.error=function(){return this.b.error};
u.m.isSupported=function(){return!!u.ma.canPlayType};u.m.nb=function(a){try{return!!u.ma.canPlayType(a.type)}catch(c){return""}};u.m.Jc=function(){var a=u.ma.volume;u.ma.volume=a/2+0.1;return a!==u.ma.volume};u.m.$a="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
u.Ec&&(document.createElement("video").constructor.prototype.canPlayType=function(a){return a&&-1!=a.toLowerCase().indexOf("video/mp4")?"maybe":""});
u.l=u.q.extend({g:function(a,c,d){u.q.call(this,a,c,d);d=c.source;var e=c.parentEl,g=this.b=u.e("div",{id:a.id()+"_temp_flash"}),j=a.id()+"_flash_api";a=a.f;var k=u.i.B({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.Pa,loop:a.loop,muted:a.muted},c.flashVars),q=u.i.B({wmode:"opaque",bgcolor:"#000000"},c.params),n=u.i.B({id:j,name:j,"class":"vjs-tech"},c.attributes);d&&(k.src=encodeURIComponent(u.kc(d.src)));
u.zb(g,e);c.startTime&&this.P(function(){this.load();this.play();this.currentTime(c.startTime)});if(c.iFrameMode===f&&!u.Ac){var s=u.e("iframe",{id:j+"_iframe",name:j+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});k.readyFunction="ready";k.eventProxyFunction="events";k.errorEventProxyFunction="errors";u.d(s,"load",u.bind(this,function(){var a,d=s.contentWindow;a=s.contentDocument?s.contentDocument:s.contentWindow.document;a.write(u.l.lc(c.swf,k,q,n));d.player=
this.a;d.ready=u.bind(this.a,function(c){c=a.getElementById(c);var d=this.h;d.b=c;u.d(c,"click",d.bind(d.n));u.l.qb(d)});d.events=u.bind(this.a,function(a,c){this&&"flash"===this.ya&&this.k(c)});d.errors=u.bind(this.a,function(a,c){u.log("Flash Error",c)})}));g.parentNode.replaceChild(s,g)}else u.l.Oc(c.swf,g,k,q,n)}});t=u.l.prototype;t.D=function(){u.q.prototype.D.call(this)};t.play=function(){this.b.vjs_play()};t.pause=function(){this.b.vjs_pause()};
t.src=function(a){a=u.kc(a);this.b.vjs_src(a);if(this.a.autoplay()){var c=this;setTimeout(function(){c.play()},0)}};t.load=function(){this.b.vjs_load()};t.poster=function(){this.b.vjs_getProperty("poster")};t.buffered=function(){return u.tb(0,this.b.vjs_getProperty("buffered"))};t.Sa=r(l);var P=u.l.prototype,Q="preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),R="error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");
function fa(){var a=Q[S],c=a.charAt(0).toUpperCase()+a.slice(1);P["set"+c]=function(c){return this.b.vjs_setProperty(a,c)}}function T(a){P[a]=function(){return this.b.vjs_getProperty(a)}}var S;for(S=0;S<Q.length;S++)T(Q[S]),fa();for(S=0;S<R.length;S++)T(R[S]);u.l.isSupported=function(){return 10<=u.l.version()[0]};u.l.nb=function(a){if(a.type in u.l.Rc)return"maybe"};u.l.Rc={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};
u.l.onReady=function(a){a=u.r(a);var c=a.player||a.parentNode.player,d=c.h;a.player=c;d.b=a;d.d("click",d.n);u.l.qb(d)};u.l.qb=function(a){a.r().vjs_getProperty?a.Ta():setTimeout(function(){u.l.qb(a)},50)};u.l.onEvent=function(a,c){u.r(a).player.k(c)};u.l.onError=function(a,c){u.r(a).player.k("error");u.log("Flash Error",c,a)};
u.l.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")};
u.l.Oc=function(a,c,d,e,g){a=u.l.lc(a,d,e,g);a=u.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);var j=d.childNodes[0];setTimeout(function(){j.style.display="block"},1E3)};
u.l.lc=function(a,c,d,e){var g="",j="",k="";c&&u.i.ra(c,function(a,c){g+=a+"="+c+"&amp;"});d=u.i.B({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);u.i.ra(d,function(a,c){j+='<param name="'+a+'" value="'+c+'" />'});e=u.i.B({data:a,width:"100%",height:"100%"},e);u.i.ra(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash"'+k+">"+j+"</object>"};
u.Fc=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d);if(!a.f.sources||0===a.f.sources.length){c=0;for(d=a.f.techOrder;c<d.length;c++){var e=u.Z(d[c]),g=window.videojs[e];if(g&&g.isSupported()){H(a,e);break}}}else a.src(a.f.sources)}});function U(a){a.za=a.za||[];return a.za}function V(a,c,d){for(var e=a.za,g=0,j=e.length,k,q;g<j;g++)k=e[g],k.id()===c?(k.show(),q=k):d&&(k.K()==d&&0<k.mode())&&k.disable();(c=q?q.K():d?d:l)&&a.k(c+"trackchange")}
u.V=u.c.extend({g:function(a,c){u.c.call(this,a,c);this.O=c.id||"vjs_"+c.kind+"_"+c.language+"_"+u.u++;this.uc=c.src;this.Lc=c["default"]||c.dflt;this.nd=c.title;this.yd=c.srclang;this.Tc=c.label;this.ha=[];this.cc=[];this.ia=this.ja=0;this.a.d("fullscreenchange",u.bind(this,this.Gc))}});t=u.V.prototype;t.K=p("A");t.src=p("uc");t.ub=p("Lc");t.title=p("nd");t.label=p("Tc");t.readyState=p("ja");t.mode=p("ia");t.Gc=function(){this.b.style.fontSize=this.a.I?140*(screen.width/this.a.width())+"%":""};
t.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-"+this.A+" vjs-text-track"})};t.show=function(){W(this);this.ia=2;u.c.prototype.show.call(this)};t.v=function(){W(this);this.ia=1;u.c.prototype.v.call(this)};t.disable=function(){2==this.ia&&this.v();this.a.t("timeupdate",u.bind(this,this.update,this.O));this.a.t("ended",u.bind(this,this.reset,this.O));this.reset();this.a.S.textTrackDisplay.removeChild(this);this.ia=0};
function W(a){0===a.ja&&a.load();0===a.ia&&(a.a.d("timeupdate",u.bind(a,a.update,a.O)),a.a.d("ended",u.bind(a,a.reset,a.O)),("captions"===a.A||"subtitles"===a.A)&&a.a.S.textTrackDisplay.Y(a))}t.load=function(){0===this.ja&&(this.ja=1,u.get(this.uc,u.bind(this,this.ad),u.bind(this,this.Gb)))};t.Gb=function(a){this.error=a;this.ja=3;this.k("error")};
t.ad=function(a){var c,d;a=a.split("\n");for(var e="",g=1,j=a.length;g<j;g++)if(e=u.trim(a[g])){-1==e.indexOf("--\x3e")?(c=e,e=u.trim(a[++g])):c=this.ha.length;c={id:c,index:this.ha.length};d=e.split(" --\x3e ");c.startTime=X(d[0]);c.sa=X(d[1]);for(d=[];a[++g]&&(e=u.trim(a[g]));)d.push(e);c.text=d.join("<br/>");this.ha.push(c)}this.ja=2;this.k("loaded")};
function X(a){var c=a.split(":");a=0;var d,e,g;3==c.length?(d=c[0],e=c[1],c=c[2]):(d=0,e=c[0],c=c[1]);c=c.split(/\s+/);c=c.splice(0,1)[0];c=c.split(/\.|,/);g=parseFloat(c[1]);c=c[0];a+=3600*parseFloat(d);a+=60*parseFloat(e);a+=parseFloat(c);g&&(a+=g/1E3);return a}
t.update=function(){if(0<this.ha.length){var a=this.a.currentTime();if(this.Lb===b||a<this.Lb||this.La<=a){var c=this.ha,d=this.a.duration(),e=0,g=l,j=[],k,q,n,s;a>=this.La||this.La===b?s=this.wb!==b?this.wb:0:(g=f,s=this.Db!==b?this.Db:c.length-1);for(;;){n=c[s];if(n.sa<=a)e=Math.max(e,n.sa),n.Ga&&(n.Ga=l);else if(a<n.startTime){if(d=Math.min(d,n.startTime),n.Ga&&(n.Ga=l),!g)break}else g?(j.splice(0,0,n),q===b&&(q=s),k=s):(j.push(n),k===b&&(k=s),q=s),d=Math.min(d,n.sa),e=Math.max(e,n.startTime),
n.Ga=f;if(g)if(0===s)break;else s--;else if(s===c.length-1)break;else s++}this.cc=j;this.La=d;this.Lb=e;this.wb=k;this.Db=q;a=this.cc;c="";d=0;for(e=a.length;d<e;d++)c+='<span class="vjs-tt-cue">'+a[d].text+"</span>";this.b.innerHTML=c;this.k("cuechange")}}};t.reset=function(){this.La=0;this.Lb=this.a.duration();this.Db=this.wb=0};u.Rb=u.V.extend();u.Rb.prototype.A="captions";u.Zb=u.V.extend();u.Zb.prototype.A="subtitles";u.Tb=u.V.extend();u.Tb.prototype.A="chapters";
u.$b=u.c.extend({g:function(a,c,d){u.c.call(this,a,c,d);if(a.f.tracks&&0<a.f.tracks.length){c=this.a;a=a.f.tracks;var e;for(d=0;d<a.length;d++){e=a[d];var g=c,j=e.kind,k=e.label,q=e.language,n=e;e=g.za=g.za||[];n=n||{};n.kind=j;n.label=k;n.language=q;j=u.Z(j||"subtitles");g=new window.videojs[j+"Track"](g,n);e.push(g)}}}});u.$b.prototype.e=function(){return u.c.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};
u.X=u.L.extend({g:function(a,c){var d=this.ca=c.track;c.label=d.label();c.selected=d.ub();u.L.call(this,a,c);this.a.d(d.K()+"trackchange",u.bind(this,this.update))}});u.X.prototype.n=function(){u.L.prototype.n.call(this);V(this.a,this.ca.O,this.ca.K())};u.X.prototype.update=function(){this.selected(2==this.ca.mode())};u.cb=u.X.extend({g:function(a,c){c.track={K:function(){return c.kind},bd:a,label:function(){return c.kind+" off"},ub:r(l),mode:r(l)};u.X.call(this,a,c);this.selected(f)}});
u.cb.prototype.n=function(){u.X.prototype.n.call(this);V(this.a,this.ca.O,this.ca.K())};u.cb.prototype.update=function(){for(var a=U(this.a),c=0,d=a.length,e,g=f;c<d;c++)e=a[c],e.K()==this.ca.K()&&2==e.mode()&&(g=l);this.selected(g)};u.W=u.ea.extend({g:function(a,c){u.ea.call(this,a,c);1>=this.J.length&&this.v()}});u.W.prototype.sb=function(){var a=[],c;a.push(new u.cb(this.a,{kind:this.A}));for(var d=0;d<U(this.a).length;d++)c=U(this.a)[d],c.K()===this.A&&a.push(new u.X(this.a,{track:c}));return a};
u.Ca=u.W.extend({g:function(a,c,d){u.W.call(this,a,c,d);this.b.setAttribute("aria-label","Captions Menu")}});u.Ca.prototype.A="captions";u.Ca.prototype.oa="Captions";u.Ca.prototype.className="vjs-captions-button";u.Ea=u.W.extend({g:function(a,c,d){u.W.call(this,a,c,d);this.b.setAttribute("aria-label","Subtitles Menu")}});u.Ea.prototype.A="subtitles";u.Ea.prototype.oa="Subtitles";u.Ea.prototype.className="vjs-subtitles-button";
u.Sb=u.W.extend({g:function(a,c,d){u.W.call(this,a,c,d);this.b.setAttribute("aria-label","Chapters Menu")}});t=u.Sb.prototype;t.A="chapters";t.oa="Chapters";t.className="vjs-chapters-button";t.sb=function(){for(var a=[],c,d=0;d<U(this.a).length;d++)c=U(this.a)[d],c.K()===this.A&&a.push(new u.X(this.a,{track:c}));return a};
t.Ja=function(){for(var a=U(this.a),c=0,d=a.length,e,g,j=this.J=[];c<d;c++)if(e=a[c],e.K()==this.A&&e.ub()){if(2>e.readyState()){this.wd=e;e.d("loaded",u.bind(this,this.Ja));return}g=e;break}a=this.ua=new u.la(this.a);a.b.appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.Z(this.A),md:-1}));if(g){e=g.ha;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new u.Xa(this.a,{track:g,cue:k}),j.push(k),a.Y(k)}0<this.J.length&&this.show();return a};
u.Xa=u.L.extend({g:function(a,c){var d=this.ca=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.sa;u.L.call(this,a,c);d.d("cuechange",u.bind(this,this.update))}});u.Xa.prototype.n=function(){u.L.prototype.n.call(this);this.a.currentTime(this.cue.startTime);this.update(this.cue.startTime)};u.Xa.prototype.update=function(){var a=this.cue,c=this.a.currentTime();this.selected(a.startTime<=c&&c<a.sa)};
u.i.B(u.da.prototype.f.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
if("undefined"!==typeof window.JSON&&"function"===window.JSON.parse)u.JSON=window.JSON;else{u.JSON={};var Y=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;u.JSON.parse=function(a,c){function d(a,e){var k,q,n=a[e];if(n&&"object"===typeof n)for(k in n)Object.prototype.hasOwnProperty.call(n,k)&&(q=d(n,k),q!==b?n[k]=q:delete n[k]);return c.call(a,e,n)}var e;a=String(a);Y.lastIndex=0;Y.test(a)&&(a=a.replace(Y,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));
if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}}
u.dc=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,g=d.length;e<g;e++)if((c=d[e])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==h&&(a=u.JSON.parse(a||"{}"),v(c,a)));else{u.lb();break}else u.rd||u.lb()};u.lb=function(){setTimeout(u.dc,1)};u.R(window,"load",function(){u.rd=f});u.lb();u.cd=function(a,c){u.C.prototype[a]=c};var Z=this;Z.sd=f;function $(a,c){var d=a.split("."),e=Z;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",u);$("_V_",u);$("videojs.options",u.options);$("videojs.players",u.va);$("videojs.cache",u.pa);$("videojs.Component",u.c);u.c.prototype.dispose=u.c.prototype.D;u.c.prototype.createEl=u.c.prototype.e;u.c.prototype.el=u.c.prototype.r;u.c.prototype.addChild=u.c.prototype.Y;u.c.prototype.children=u.c.prototype.children;u.c.prototype.on=u.c.prototype.d;u.c.prototype.off=u.c.prototype.t;u.c.prototype.one=u.c.prototype.R;u.c.prototype.trigger=u.c.prototype.k;u.c.prototype.triggerReady=u.c.prototype.Ta;
u.c.prototype.show=u.c.prototype.show;u.c.prototype.hide=u.c.prototype.v;u.c.prototype.width=u.c.prototype.width;u.c.prototype.height=u.c.prototype.height;u.c.prototype.dimensions=u.c.prototype.Mc;u.c.prototype.ready=u.c.prototype.P;u.c.prototype.fadeIn=u.c.prototype.$;u.c.prototype.fadeOut=u.c.prototype.ta;$("videojs.Player",u.C);u.C.prototype.dispose=u.C.prototype.D;u.C.prototype.requestFullScreen=u.C.prototype.wa;u.C.prototype.cancelFullScreen=u.C.prototype.pb;u.C.prototype.bufferedPercent=u.C.prototype.Ha;
$("videojs.MediaLoader",u.Fc);$("videojs.TextTrackDisplay",u.$b);$("videojs.ControlBar",u.da);$("videojs.Button",u.o);$("videojs.PlayToggle",u.Xb);$("videojs.FullscreenToggle",u.Da);$("videojs.BigPlayButton",u.Wa);$("videojs.LoadingSpinner",u.Vb);$("videojs.CurrentTimeDisplay",u.Ya);$("videojs.DurationDisplay",u.Za);$("videojs.TimeDivider",u.ac);$("videojs.RemainingTimeDisplay",u.gb);$("videojs.Slider",u.M);$("videojs.ProgressControl",u.fb);$("videojs.SeekBar",u.Yb);$("videojs.LoadProgressBar",u.bb);
$("videojs.PlayProgressBar",u.Wb);$("videojs.SeekHandle",u.hb);$("videojs.VolumeControl",u.jb);$("videojs.VolumeBar",u.ib);$("videojs.VolumeLevel",u.bc);$("videojs.VolumeHandle",u.kb);$("videojs.MuteToggle",u.fa);$("videojs.PosterImage",u.eb);$("videojs.Menu",u.la);$("videojs.MenuItem",u.L);$("videojs.SubtitlesButton",u.Ea);$("videojs.CaptionsButton",u.Ca);$("videojs.ChaptersButton",u.Sb);$("videojs.MediaTechController",u.q);u.q.prototype.features=u.q.prototype.j;u.q.prototype.j.volumeControl=u.q.prototype.j.U;
u.q.prototype.j.fullscreenResize=u.q.prototype.j.jc;u.q.prototype.j.progressEvents=u.q.prototype.j.Mb;u.q.prototype.j.timeupdateEvents=u.q.prototype.j.Pb;$("videojs.Html5",u.m);u.m.Events=u.m.$a;u.m.isSupported=u.m.isSupported;u.m.canPlaySource=u.m.nb;u.m.prototype.setCurrentTime=u.m.prototype.fd;u.m.prototype.setVolume=u.m.prototype.ld;u.m.prototype.setMuted=u.m.prototype.jd;u.m.prototype.setPreload=u.m.prototype.kd;u.m.prototype.setAutoplay=u.m.prototype.ed;u.m.prototype.setLoop=u.m.prototype.hd;
$("videojs.Flash",u.l);u.l.isSupported=u.l.isSupported;u.l.canPlaySource=u.l.nb;u.l.onReady=u.l.onReady;$("videojs.TextTrack",u.V);u.V.prototype.label=u.V.prototype.label;$("videojs.CaptionsTrack",u.Rb);$("videojs.SubtitlesTrack",u.Zb);$("videojs.ChaptersTrack",u.Tb);$("videojs.autoSetup",u.dc);$("videojs.plugin",u.cd);$("videojs.createTimeRange",u.tb);})();//@ sourceMappingURL=video.js.map
!function(t,a,e,n,m){m=a.location,t.src="//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-2&utmn=1&utmhn="+n(m.hostname)+"&utmsr="+a.screen.availWidth+"x"+a.screen.availHeight+"&utmul="+(e.language||e.userLanguage||"").toLowerCase()+"&utmr="+n(m.href)+"&utmp="+n(m.hostname+m.pathname)+"&utmcc=__utma%3D1."+Math.floor(1e10*Math.random())+".1.1.1.1%3B"+"&utme=8(vjsv)9(v4.1.0)"}(new Image,window,navigator,encodeURIComponent);
