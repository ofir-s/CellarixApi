'use strict';

module.exports = ($scope, $state, paymentMethods) => {

    //Initialize
    $scope.$state = $state;
    $scope.paymentMethods = paymentMethods.paymentMethods;  
    
    $scope.validForms = {
        data: []
    };

    $scope.sumIsFullyPaid = {
        value: false
    };

    $scope.totalPaymentMethods = {
        creditCards: {},
        coupons: {},
        cellarixCash: {}
    };

    $scope.chargeData = {
        data: {}
    };

    //Functions
    $scope.goToStep = (stepNum) => {
        if (!stepNum || !$scope.validForms.data[stepNum - 1]) {
            return;
        }
        $state.go('main.payments.step' + stepNum);
    };

    $scope.goToSecondStep = () => {
        if (!$scope.sumIsFullyPaid.value) {
            return;
        }
        
        $state.go('main.payments.step2');
    };
};
