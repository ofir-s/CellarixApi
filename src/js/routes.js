'use strict';

/**
 * Project routes
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param RestangularProvider
 */
module.exports = ($stateProvider, $urlRouterProvider, RestangularProvider) => {

    $urlRouterProvider.otherwise('/index');

    $stateProvider
        .state('main', {
            url: '/{dealKey}',
            abstract: true,
            templateUrl: 'views/layout.html',
            controller: 'LayoutController',
            resolve: {
                dealData: ['InitializationService', 'Deal', '$stateParams',
                    function(InitializationService, Deal, $stateParams) {
                        if ($stateParams.dealKey && $stateParams.dealKey !== '') {
                            Deal.setDealKey($stateParams.dealKey);
                        }
                        return InitializationService.getApiCellarixByToken();
                    }
                ]
            }
        })
        .state('main.index', {
            url: '/index'
        })
        .state('main.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('main.resetPassword', {
            url: '/resetPassword',
            templateUrl: 'views/resetPassword.html',
            controller: 'ResetPasswordController'
        })
        .state('main.payments', {
            abstract: true,
            url: '/payments',
            templateUrl: 'views/payments/abstract.html',
            controller: 'PaymentsController',
            config: {
                // authenticate: true
            },
            resolve: {
                paymentMethods: ['PaymentsService',
                    function(PaymentsService) {
                        return PaymentsService.getPaymentMethods();
                    }
                ]
            }
        })
        .state('main.payments.step1', {
            url: '/',
            sticky: true,
            config: {
                // authenticate: true
            },
            views: {
                'step1': {
                    templateUrl: 'views/payments/step1.html',
                    controller: 'PaymentsStep1Controller'
                }
            }
        })
        .state('main.payments.step2', {
            sticky: true,
            url: '/',
            config: {
                authenticate: true
            },
            views: {
                'step2': {
                    templateUrl: 'views/payments/step2.html',
                    controller: 'PaymentsStep2Controller'
                }
            }
        })
        .state('main.registration', {
            abstract: true,
            url: '/registration',
            templateUrl: 'views/registration/abstract.html',
            controller: 'RegistrationController'
        })
        .state('main.registration.step1', {
            sticky: true,
            url: '/',
            views: {
                'step1': {
                    templateUrl: 'views/registration/step1.html',
                    controller: 'RegistrationStep1Controller'
                }
            },
            params: {
                userData: null,
                creditCardData: null
            }
        })
        .state('main.registration.step2', {
            sticky: true,
            url: '/',
            views: {
                'step2': {
                    templateUrl: 'views/registration/step2.html',
                    controller: 'RegistrationStep2Controller'
                }
            }
        })
        .state('main.registration.step3', {
            sticky: true,
            url: '/',
            views: {
                'step3': {
                    templateUrl: 'views/registration/step3.html',
                    controller: 'RegistrationStep3Controller'
                }
            }
        })
        .state('main.registration.step4', {
            sticky: true,
            url: '/',
            views: {
                'step4': {
                    templateUrl: 'views/registration/step4.html',
                    controller: 'RegistrationStep4Controller'
                }
            }
        })
        .state('main.registration.stepFinal', {
            sticky: true,
            url: '/',
            views: {
                'stepFinal': {
                    templateUrl: 'views/registration/final.html',
                    controller: 'RegistrationStepFinalController'
                }
            }
        })
        .state('main.guestPayment', {
            abstract: true,
            url: '/guestPayment',
            templateUrl: 'views/paymentsGuest/abstract.html',
            controller: 'GuestPaymentController'
        })
        .state('main.guestPayment.step1', {
            sticky: true,
            url: '/',
            views: {
                'step1': {
                    templateUrl: 'views/paymentsGuest/step1.html',
                    controller: 'GuestPaymentStep1Controller'
                }
            }
        })
        .state('main.guestPayment.step2', {
            sticky: true,
            url: '/',
            views: {
                'step2': {
                    templateUrl: 'views/paymentsGuest/step2.html',
                    controller: 'GuestPaymentStep2Controller'
                }
            }
        })
        .state('main.guestPayment.step3', {
            sticky: true,
            url: '/',
            views: {
                'step3': {
                    templateUrl: 'views/paymentsGuest/step3.html',
                    controller: 'GuestPaymentStep3Controller'
                }
            }
        })
        .state('main.paymentStepFinal', {
            url: '/paymentSteps/final',
            templateUrl: 'views/final.html',
            controller: 'FinalController',
            params: {
                chargeResponse: null,
                guestPayment: null,
                callbackUrl: null
            }
        });
};
