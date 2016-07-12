'use strict';

module.exports = ($scope, $state, $stateParams, $window, $timeout) => {
    $scope.initializeParams = () => {
        $scope.chargeResponse = $stateParams.chargeResponse;
        $scope.guestPayment = $stateParams.guestPayment;
        $scope.callbackUrl = $stateParams.callbackUrl;
    };
    $scope.initializeParams();

    $scope.goToCallbackUrl = () => {
        if ($scope.guestPayment)
            $scope.logout();
        $window.location.href = $scope.callbackUrl;
    };

    $timeout(() => {
        $scope.goToCallbackUrl();
    }, 5000);
};
