'use strict';

module.exports = (apiFactory, ResponseProcessorService, User) => {

    const _commitRegistration = (data) => {
        return apiFactory.all('CellarixStore').all('CommitRegistration').customPOST(data)
            .then((response) => {
                var res = ResponseProcessorService.getResponseOrUndefined(response);
                if (res && res.token) {
                    User.setJwt(res.token);
                    User.setUser(response.userDetails);
                }
                return res;
            });
    };

    const _createAccountGuest = (data) => {
        return apiFactory.all('CellarixStore').all('CreateAccountGuestAPI').customPOST(data)
            .then((response) => {
                var res = ResponseProcessorService.getResponseOrUndefined(response);
                if (res && res.token) {
                    User.setJwt(res.token);
                    User.setUser(response.userDetails);
                }
                return res;
            });
    };


    return {
        commitRegistration: _commitRegistration,
        createAccountGuest: _createAccountGuest
    };

};
