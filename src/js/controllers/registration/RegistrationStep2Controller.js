'use strict';

module.exports = ($scope, $state) => {

    //Dev-Only ------------------------------------------------------------------------------
    //$scope.confirmPassword = '123456q';
    //Dev-Only ------------------------------------------------------------------------------

    //Functions
    $scope.goToThirdStep = () => {
        $state.go('main.registration.step3');
    };

    //Watchers
    $scope.$watch(() => {
        return $scope.registrationFormStepTwo.$valid;
    }, (newValue) => {
        $scope.validForms.data[2] = newValue;
    });
};
