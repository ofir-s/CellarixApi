'use strict';

const angular = require('angular');

module.exports = ($scope, User, $state, $location, AuthenticationService, $stateParams, $localStorage, VerificationService) => {

    $scope.phoneNumberExists = true;
    $scope.login = {};
    $scope.loginRequestInProgress = false;

    $scope.$on('$stateChangeStart', () => {
        // Reset errors between states.
        $scope.errors.visible = false;
    });

    $scope.validatePhoneNumber = (phoneNumber) => {
        if (!phoneNumber || phoneNumber.length < 10) {
            return;
        }

        var data = {
            "phoneNumber": phoneNumber
        };


        VerificationService.validatePhoneNumber(data)
            .then((response) => {
                $scope.phoneNumberExists = response;
            });
    };

    $scope.connect = () => {
        $scope.loginRequestInProgress = true;
        AuthenticationService.connect($scope.login)
            .then((response) => {
                if (response) {
                    $state.go("main.payments.step1");
                    User.setJwt(response.token);
                    User.setUser(response.userDetails);
                }
            })
            .finally(() => {
                $scope.loginRequestInProgress = false;
            });
    };

    $scope.displayErrors = () => {
        $scope.errors.visible = true;
    };
};
