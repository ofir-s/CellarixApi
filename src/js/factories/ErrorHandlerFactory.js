'use strict';
const swal = require('sweetalert');
/**
 * Interceptor for catching response codes
 * @param $injector
 * @param $q
 */
module.exports = ($injector, $q, AlertService) => {
    const $rootScope = $injector.get('$rootScope');
    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        const $state = $injector.get('$state');
        if (error.status === 401 || error.status === 403) {
            $state.go('main.login', { dealKey: toParams.dealKey || '' });
        }
    });

    return {
        responseError: (response) => {
            switch (response.status) {
                case 500:
                    AlertService.errorAlert();
                    break;

                default:
                    if (response && response.results && response.results.resultDescription) {
                        AlertService.errorAlert(response.results.resultDescription);
                    } else {
                        AlertService.errorAlert();
                    }
                    break;
            }

            return $q.reject(response);
        }
    };
};
