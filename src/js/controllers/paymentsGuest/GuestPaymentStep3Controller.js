'use strict';

module.exports = ($scope, $state, $window, PaymentsService) => {

    $scope.chargeRequestInProgress = false;
    $scope.processCompleted = false;

    $scope.goToRedirectUrl = () => {
        $scope.tryGoBack();
    };

    $scope.getDate = () => {
        return new Date();
    };

    $scope.getFloor = (num) => {
        return Math.floor(num);
    };

    $scope.getDigitsClass = () => {
        if (!$scope.dealData || !$scope.dealData.data || !$scope.dealData.data.cart.cartTotal.totalAmountToBeCharge) {
            return '';
        }
        var sum = Math.floor($scope.dealData.data.cart.cartTotal.totalAmountToBeCharge);
        if (sum > 9999) {
            return 'digits-5';
        }
        if (sum > 999) {
            return 'digits-4';
        }
        if (sum > 99) {
            return 'digits-3';
        }
        return '';
    };

    $scope.goToFinalStep = () => {
        var addCreditCardData = $scope.guestPayment.addCreditCardData;
        var obj = {
            chargeType: 2,
            supplierKey: $scope.dealData.data.supplierKey,
            paymentMethods: {
                creditCards: [{
                    paymentMethodId: $scope.newPaymentMethod.data.paymentMethodId,
                    amount: $scope.dealData.data.cart.cartTotal.totalAmountToBeCharge,
                    numOfPayments: 1,
                    firstPaymentAmount: $scope.dealData.data.cart.cartTotal.totalAmountToBeCharge
                }]
            },
            confirmCharge: $scope.dealData.data.confirmCharge ? $scope.dealData.data.confirmCharge : {}
        };

        obj.confirmCharge.remarksForSeller = $scope.guestPayment.remarksForSeller;

        $scope.chargeRequestInProgress = true;
        PaymentsService.chargeCellarixApi(obj)
            .then((response) => {
                $scope.processCompleted = true;
                $scope.passedSteps.data[3] = true;
                $scope.chargeData.data = response;
                $scope.$state.go('main.paymentStepFinal', {
                    chargeResponse: $scope.chargeData.data.results.chargeResponse,
                    guestPayment: $scope.guestPayment,
                    callbackUrl: $scope.dealData.data.supplierConfiguration.callBackURL
                });
            })
            .finally(() => {
                $scope.chargeRequestInProgress = false;
            });
    };

};
