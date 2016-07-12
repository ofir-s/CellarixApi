'use strict';

module.exports = ($rootScope, Restangular, User, Deal) => {

    return Restangular.withConfig((c) => {
        /**
         * Interceptor for responses
         * Server may return new token inside the Authorization header (for longer expiration time)
         */
        c.addResponseInterceptor((data, operation, what, url, response, deferred) => {
            if (response.headers('Authorization')) {
                User.setJwt(response.headers('Authorization'));
            }
            return response.data;
        });

        /**
         * Interceptor for request
         * Set Authorization header in case exists in local storage
         */
        c.addFullRequestInterceptor((headers, params, element, httpConfig, sendHeaders) => {
            $rootScope.$broadcast('errorAlert', {
                visible: false,
                message: ''
            });

            const Auth = User.getJwt();
            if (Auth) {
                sendHeaders.Token = Auth;
            }
            const DealKey = Deal.getDealKey();
            if (DealKey) {
                sendHeaders.DealKey = DealKey;
            }
        });
    });

};
