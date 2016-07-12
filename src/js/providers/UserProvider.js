'use strict';

/**
 * User provider class
 * @param $localStorageProvider
 */
module.exports = function UserProvider($localStorageProvider) {

    // jwt token
    let _jwtToken;
    let _user;

    const _getJwt = () => {
        return _jwtToken || $localStorageProvider.get('Authorization');
    };

    const _logout = () => {
        _jwtToken = null;
        delete $localStorageProvider.Authorization;
        delete $localStorageProvider.CurrentUser;
    };

    this.getJwt = _getJwt;

    /**
     * Section for service
     * @type {*[]}
     */
    this.$get = ['$localStorage', 'Restangular', ($localStorage, Restangular) => {

        const _logout = () => {
            _jwtToken = null;
            delete $localStorage.Authorization;
            delete $localStorage.CurrentUser;
        };

        /**
         * Set jwt
         * @param jwt
         * @private
         */
        const _setJwt = (jwt) => {
            _jwtToken = jwt;
            $localStorage.Authorization = jwt;
        };

        /**
         * Set user
         * @param user
         * @private
         */
        const _setUser = (user) => {
            _user = user;
            $localStorage.CurrentUser = user;
        };

        /**
         * get user
         * @returns {*}
         * @private
         */
        const _getUser = () => {
            return _user || $localStorageProvider.get('CurrentUser');
        };

        /**
         * final return
         */
        return {
            getJwt:             _getJwt,
            setJwt:             _setJwt,
            setUser:            _setUser,
            getUser:            _getUser,
            logout:             _logout
        };
    }];

};
