'use strict';

module.exports = (apiFactory, ResponseProcessorService) => {

    /**
     * Get payment methods
     * @returns {*}
     * @private
     */
    const _getPaymentMethods = () => {

        return apiFactory.all("CellarixStore").all("getPaymentMethods").customPOST({})
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    const _chargeCellarixApi = (data) => {
        return apiFactory.all("CellarixStore").all("ChargeCellarixAPI").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    return {
        getPaymentMethods: _getPaymentMethods,
        chargeCellarixApi: _chargeCellarixApi
    };

};
