'use strict';

const angular = require('angular');

module.exports = ($scope, User, $state, $location, AuthenticationService, $stateParams, $localStorage, VerificationService) => {

    $scope.phoneNumberExists = true;
    $scope.reset = {
        region: 2
    };
    $scope.resetPasswordRequestInProgress = false;

    $scope.validatePhoneNumber = (phoneNumber) => {
        if (!phoneNumber || phoneNumber.length < 10) {
            return;
        }
        VerificationService.validatePhoneNumber(phoneNumber)
            .then((response) => {
                $scope.phoneNumberExists = response;
            });
    };

    $scope.resetPassword = () => {
        $scope.resetPasswordRequestInProgress = true;
        AuthenticationService.resetPassword($scope.reset)
            .then((response) => {
                $state.go('main.login');
            })
            .finally(() => {
                $scope.resetPasswordRequestInProgress = false;
            });
    };
};
