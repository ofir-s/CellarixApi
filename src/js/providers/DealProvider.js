'use strict';

/**
 * User provider class
 * @param $localStorageProvider
 */
module.exports = function UserProvider($localStorageProvider) {

    // DealKey token
    let _dealKeyToken;

    const _getDealKey = () => {
        return _dealKeyToken || $localStorageProvider.get('DealKey');
    };

    const _clearDealKey = () => {
        _dealKeyToken = null;
        delete $localStorageProvider.DealKey;
    };

    this.getDealKey = _getDealKey;

    /**
     * Section for service
     * @type {*[]}
     */
    this.$get = ['$localStorage', 'Restangular', ($localStorage, Restangular) => {

        const _clearDealKey = () => {
            _dealKeyToken = null;
            delete $localStorage.DealKey;
        };

        /**
         * Set dealKey
         * @param dealKey
         * @private
         */
        const _setDealKey = (dealKey) => {
            _dealKeyToken = dealKey;
            $localStorage.DealKey = dealKey;
        };

        /**
         * final return
         */
        return {
            getDealKey: _getDealKey,
            setDealKey: _setDealKey,
            clearDealKey: _clearDealKey
        };
    }];
};
