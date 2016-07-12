'use strict';

module.exports = ($scope, $state, $window, PaymentsService, User) => {

    $scope.chargeRequestInProgress = false;
    $scope.processCompleted = false;
    $scope.user = User.getUser();

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

    $scope.prepareCellarixCashCharge = () => {
        if (!$scope.totalPaymentMethods.cellarixCash) {
            return [];
        }
        var id = Object.keys($scope.totalPaymentMethods.cellarixCash)[0];
        if ($scope.totalPaymentMethods.cellarixCash[id] && $scope.totalPaymentMethods.cellarixCash[id] !== 0) {
            return [{
                paymentMethodId: id,
                amount: $scope.totalPaymentMethods.cellarixCash[id]
            }];
        }
        return [];
    };

    $scope.prepareArrayForCharge = (paymentType) => {
        if (!$scope.totalPaymentMethods[paymentType]) {
            return [];
        }
        var res = [];

        var keys = Object.keys($scope.totalPaymentMethods[paymentType]);
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            var value = $scope.totalPaymentMethods[paymentType][keys[i]];
            if (value === 0 || !value) {
                continue;
            }

            var cc = {
                paymentMethodId: key,
                amount: value,
                creditType: 2
            };

            res.push(cc);
        }

        return res;
    };


    $scope.goToFinalStep = () => {
        var obj = {
            chargeType: 1,
            supplierKey: $scope.dealData.data.supplierKey,
            userAccountId: $scope.user.accountId,
            paymentMethods: {
                balances: $scope.prepareCellarixCashCharge(),
                creditCards: $scope.prepareArrayForCharge('creditCards'),
                coupons: $scope.prepareArrayForCharge('coupons')
            },
            confirmCharge: $scope.dealData.data.confirmCharge
        };
        $scope.chargeRequestInProgress = true;
        PaymentsService.chargeCellarixApi(obj)
            .then((response) => {
                $scope.processCompleted = true;
                $scope.chargeData.data = response;
                $scope.$state.go('main.paymentStepFinal', {
                    chargeResponse: $scope.chargeData.data.results.chargeResponse,
                    guestPayment: null,
                    callbackUrl: $scope.dealData.data.supplierConfiguration.callBackURL
                });
            })
            .finally(() => {
                $scope.chargeRequestInProgress = false;
            });
    };

};
