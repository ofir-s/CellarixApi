'use strict';

module.exports = (AlertService) => {

    const _processResponse = (response) => {
        if (response && response.results.resultType === "OK") {
            return true;
        }
        if (response) {
            AlertService.errorAlert(response.results.resultDescription);
        } else {
            AlertService.errorAlert();
        }

        return false;
    };

    const _getResponseOrUndefined = (response, responseType) => {
        if (response) {
            var plainResponse = response.plain();
            if (_processResponse(plainResponse)) {
                return plainResponse;
            }
        }
        return undefined;
    };

    return {
        getResponseOrUndefined: _getResponseOrUndefined
    };

};
