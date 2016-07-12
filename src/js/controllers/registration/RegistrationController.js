'use strict';

module.exports = ($scope, $state) => {

    //Initialize
    $scope.$state = $state;
    $scope.validForms = {
        data: []
    };
    $scope.passedSteps = {
        data: []
    };
    $scope.commitRegistrationRequestInProgress = { value: false };
    $scope.addCreditCard = { data: {} };

    //Dev-Only ------------------------------------------------------------------------------
    $scope.commitRegistration = {
        data: {      }
    };
    //Dev-Only ------------------------------------------------------------------------------

    //Functions
    $scope.goToStep = (stepNum) => {
        if (stepNum !== 1) {
            if (!stepNum || !$scope.validForms.data[stepNum - 1]) {
                return;
            }
            if (stepNum === 4 && !$scope.passedSteps.data[3]) {
                return;
            }
        }
        $state.go('main.registration.step' + stepNum);
    };
};
