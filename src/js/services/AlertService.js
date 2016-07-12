'use strict';
module.exports = ($rootScope) => {

    const _defaultMessage = 'תקלה לא ידועה, אנא נסה מאוחר יותר';

    const _errorAlert = (message) => {
        if (!message) { message = _defaultMessage; }
        console.log(message);

        $rootScope.$broadcast('errorAlert', {
            visible: true,
            message: message
        });
    };

    return {
        errorAlert: _errorAlert
    };

};
