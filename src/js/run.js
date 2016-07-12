'use strict';

module.exports = ($rootScope, UserProvider, $state, jwtHelper) => {

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {

        // Close sidebar menu for every state change.
        $rootScope.toggleSidebar = false;

        const config = toState.config || {};

        const loginState = 'main.login';
        const mainState = 'main.index';

        let isAuthenticated = true;

        try {
            const jwtToken = UserProvider.getJwt();
            if (!jwtToken) {
                isAuthenticated = false;
            }
            // if (jwtHelper.isTokenExpired(jwtToken)) {
            //     isAuthenticated = false;
            // }
        } catch (e) {
            isAuthenticated = false;
        }

        if (config.hasOwnProperty('authenticate') && config.authenticate) {
            if (!isAuthenticated) {
                $rootScope.isAuthenticated = isAuthenticated;
                event.preventDefault();
                UserProvider.logout();
                $state.go(loginState);
            }
        } else if (config.hasOwnProperty('hideIfAuthenticated') && config.hideIfAuthenticated) {
            if (isAuthenticated) {
                $rootScope.isAuthenticated = isAuthenticated;
                event.preventDefault();
                $state.go(mainState);
            }
        }
        $rootScope.isAuthenticated = isAuthenticated;

    });
};
