'use strict';

const moment = require('moment');
global.moment = moment;
const heLocale = require('./../../node_modules/moment/locale/he.js');
moment.locale('he');

const _ = require('lodash');
global._ = _;

const jQuery = require('jquery');
global.$ = jQuery;
global.jQuery = jQuery;

const bootstrap = require('bootstrap');
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const restangular = require('restangular');
const daterangepicker = require('bootstrap-daterangepicker');
const uiBootstrap = require('angular-ui-bootstrap');
const ngLocalStorage = require('ngstorage');
const sticky = require('ui-router-extras');
const AngularJWT = require('angular-jwt');
const angularLoadingBar = require('angular-loading-bar');
const angularAnimate = require('angular-animate');
const angularMessages = require('angular-messages');
const uiSwitch = require('angular-ui-switch');
const ngSweetAlert = require('angular-sweetalert');
const ngSanitize = require('angular-sanitize');
const sweetAlert = require('sweetalert');
const angularUiDate = require('angular-ui-date');
const infiniteScroll = require('ng-infinite-scroll');
const templates = require('./templates');
const angularValidationMatch = require('angular-validation-match');
const angularCreditCards = require('angular-credit-cards');
const sbDateSelect = require('./vendor/sb-date-select_MODIFIED.js');
const angularAria = require('angular-aria');


const angularTimer = require('angular-timer');

const humanizeDuration = require('humanize-duration');
global.humanizeDuration = humanizeDuration;

angular.module('cellarixPaymentApp', [
        'ui.router', 'restangular', 'ui.bootstrap', 'ngStorage',
        'ct.ui.router.extras', 'angular-jwt', 'angular-loading-bar', 'ngAnimate', 'ui.bootstrap.modal', 'ngMessages',
        'uiSwitch', 'oitozero.ngSweetAlert', 'ui.date', 'timer', 'ngSanitize', 'infinite-scroll', 'templates', 'validation.match', 'credit-cards',
        'sbDateSelect', 'ngAria'
    ])
    .service(require('./services'))
    .controller(require('./controllers'))
    .directive(require('./directives'))
    .filter(require('./filters'))
    .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', require('./routes')])
    .config(['RestangularProvider', '$httpProvider', 'cfpLoadingBarProvider', '$locationProvider', '$localStorageProvider', require('./config')])
    .provider(require('./providers'))
    .factory(require('./factories'))
    .run(['$rootScope', 'User', '$state', 'jwtHelper', require('./run')])
    .value('THROTTLE_MILLISECONDS', 250)
    .constant('VERIFICATION_CODE_RESEND_TIMEOUT_SECONDS', 30000);
