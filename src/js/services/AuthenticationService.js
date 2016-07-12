'use strict';

module.exports = (apiFactory, User, ResponseProcessorService) => {

    /**
     * Log in
     * @param data as json contains Phone,Password
     * @returns {*}
     * @private
     */
    const _connect = (data) => {
        return apiFactory.all("CellarixStore").all("login").customPOST(data)
            .then((response) => {
                var res = ResponseProcessorService.getResponseOrUndefined(response);
                if (res && res.token) {
                    User.setJwt(res.token);
                    User.setUser(response.userDetails);
                }
                return res;
            });
    };

    /**
     * Log out
     * @private
     */
    const _disconnect = () => {
        User.logout();
        return;
    };

    /**
     * Reset Password
     * @param data as json contains Phone number
     * @returns {*}
     * @private
     */
    const _resetPassword = (data) => {
        return apiFactory.all("CellarixStore").all("ResetPassword").customPOST(data)
            .then((response) => {
                return ResponseProcessorService.getResponseOrUndefined(response);
            });
    };

    return {
        connect: _connect,
        disconnect: _disconnect,
        resetPassword: _resetPassword
    };

};
