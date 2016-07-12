'use strict';

module.exports = (apiFactory, ResponseProcessorService) => {

    const _validateCreditCard = (data) => {
        return apiFactory.all("CellarixStore").all("ValidateCreditCard").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    const _validatePhoneNumber = (data) => {
        return apiFactory.all("CellarixStore").all("ValidateCellphoneNumber").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    const _validateIdNumber = (data) => {
        return apiFactory.all("CellarixStore").all("ValidateIdNumber").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    const _getVerificationCode = (data) => {
        return apiFactory.all("CellarixStore").all("GetVerificationCode").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    return {
        validateCreditCard: _validateCreditCard,
        validatePhoneNumber: _validatePhoneNumber,
        validateIdNumber: _validateIdNumber,
        getVerificationCode: _getVerificationCode
    };

};
