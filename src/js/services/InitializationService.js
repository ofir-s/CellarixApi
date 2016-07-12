'use strict';

module.exports = (apiFactory, Deal) => {

    /**
     * _getApiCellarixByToken
     * @returns {*}
     * @private
     */
    const _getApiCellarixByToken = () => {
        var data = {
            PurchaseURL: Deal.getDealKey()
        };
        return apiFactory.all("CellarixStore").all("GetApiCellarixByToken").customPOST(data)
            .then((response) => {
                if (response) {
                    return response.plain();
                }
                return undefined;
            });
    };

    return {
        getApiCellarixByToken: _getApiCellarixByToken
    };

};
