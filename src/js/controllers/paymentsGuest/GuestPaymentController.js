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

    $scope.newPaymentMethod = {
        data: {}
    };

    $scope.chargeData = {
        data: {}
    };

    $scope.guestPayment = {
        createAccountGuestData: {},
        addCreditCardData: {},
        confirmCharge: {}
    };

    //Functions
    $scope.goToStep = (stepNum) => {
        if (stepNum !== 1) {
            if (!stepNum || !$scope.passedSteps.data[stepNum - 1]) {
                return;
            }
        }
        $state.go('main.guestPayment.step' + stepNum);
    };
};
