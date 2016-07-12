'use strict';

module.exports = ($scope, $state, VerificationService) => {

    // $scope.showCreditCardBlock = $scope.dealData.data.supplierConfiguration.applicablePaymentMethods.paymentMethodTypes.includes(2);
    // $scope.showCouponsBlock = $scope.dealData.data.supplierConfiguration.applicablePaymentMethods.paymentMethodTypes.includes(4);
    // $scope.showCellarixCashBlock = $scope.dealData.data.supplierConfiguration.applicablePaymentMethods.paymentMethodTypes.includes(1);

    if (!$scope.dealData || !$scope.dealData.data || !$scope.dealData.data.cart || !$scope.paymentMethods) {
        console.warn('No deal data or payment methods provided. Initialization cancelled!');
        return;
    }

    $scope.SUBSTRACT_ADD_STEP = 50;

    $scope.totalCreditCards = 0;
    $scope.totalCoupons = 0;
    $scope.totalCellarixCash = 0;

    $scope.creditCardsMessage = '';
    $scope.couponsMessage = '';
    $scope.cellarixCashMessage = '';

    $scope.currentTotalAmount = 0;

    $scope.requiredTotalAmount = $scope.dealData.data.cart.cartTotal.totalAmountToBeCharge;

    $scope.getNum = function(num) {
        if (num === undefined || num === NaN || num === '' || num === 0) {
            return 0;
        };

        return parseFloat(parseFloat(num, 10).toFixed(2));
    };

    $scope.getCouponsBalance = () => {
        var sum = 0;
        for (var i = $scope.paymentMethods.coupons.length - 1; i >= 0; i--) {
            if ($scope.paymentMethods && $scope.paymentMethods.coupons[i]) {
                sum += $scope.getNum($scope.paymentMethods.coupons[i].currentBalance  - $scope.getNum($scope.totalPaymentMethods.coupons[$scope.paymentMethods.coupons[i].paymentMethodId]));
            }
        }
        return sum;
    };

    $scope.payByCreditCards = function(paymentMethodId) {
        var currentAmount = $scope.getNum($scope.totalPaymentMethods.creditCards[paymentMethodId]);
        // the current total amount without this amount
        var oldCurrentTotalAmount = $scope.getNum($scope.sumTotalAmountAllPayments()) - $scope.getNum(currentAmount);
        // the current total amount for coupons without this amount
        var currentCreditCardsAmount = $scope.getNum($scope.sumTotalAmountPayment('creditCards')) - currentAmount;
        var message = '';

        if (!$scope.totalPaymentMethods.creditCards.hasOwnProperty(paymentMethodId)) {
            return;
        }
        // case NAN
        if (!$scope.totalPaymentMethods.creditCards[paymentMethodId]) {
            $scope.totalPaymentMethods.creditCards[paymentMethodId] = undefined;
        }
        // case enter minus number
        if ($scope.totalPaymentMethods.creditCards[paymentMethodId] < 0) {
            $scope.totalPaymentMethods.creditCards[paymentMethodId] = undefined;
            message = 'אינך יכול להכניס סכום מתחת ל 0';
        }

        // check that user does not enter num more than his balance
        if ($scope.totalPaymentMethods.creditCards[paymentMethodId] > ($scope.requiredTotalAmount - oldCurrentTotalAmount)) {
            console.log('bigger than current total');
            var leftToPay = $scope.getNum($scope.requiredTotalAmount - oldCurrentTotalAmount);
            $scope.totalPaymentMethods.creditCards[paymentMethodId] = leftToPay === 0 ? undefined : leftToPay;
            message = 'הסכום שהוכנס גדול מהסכום שנותר לשלם';
        }
        // calc current total creditCardsAmount
        currentCreditCardsAmount += $scope.getNum($scope.totalPaymentMethods.creditCards[paymentMethodId]);

        $scope.totalCreditCards = currentCreditCardsAmount;
        $scope.creditCardsMessage = message;

        // total of all payments methods
        $scope.currentTotalAmount = $scope.totalCreditCards + $scope.totalCoupons + $scope.totalCellarixCash;
    };

    $scope.payByCoupons = function(paymentMethodId, maxBalance) {

        var currentAmount = $scope.getNum($scope.totalPaymentMethods.coupons[paymentMethodId]);
        // the current total amount without this amount
        var oldCurrentTotalAmount = $scope.getNum($scope.sumTotalAmountAllPayments()) - currentAmount;
        // the current total amount for coupons without this amount
        var currentCouponsAmount = $scope.getNum($scope.sumTotalAmountPayment('coupons')) - currentAmount;
        var maxCoupons = maxBalance;
        var message = '';

        if (!$scope.totalPaymentMethods.coupons.hasOwnProperty(paymentMethodId)) {
            return;
        }
        // case NAN
        if (!$scope.totalPaymentMethods.coupons[paymentMethodId]) {
            $scope.totalPaymentMethods.coupons[paymentMethodId] = undefined;
        }
        // case enter minus number
        if ($scope.totalPaymentMethods.coupons[paymentMethodId] < 0) {
            $scope.totalPaymentMethods.coupons[paymentMethodId] = undefined;
            message = 'אינך יכול להכניס סכום מתחת ל 0';
        }
        // check that user does not enter num bigger than his balance
        if ($scope.totalPaymentMethods.coupons[paymentMethodId] > maxCoupons) {
            $scope.totalPaymentMethods.coupons[paymentMethodId] = maxCoupons;
            message = 'הסכום שהוכנס גדול מהיתרה הקיימת בתו';
        }
        // check that user does not enter num more than his balance
        if ($scope.totalPaymentMethods.coupons[paymentMethodId] > ($scope.requiredTotalAmount - oldCurrentTotalAmount)) {
            var leftToPay = $scope.getNum($scope.requiredTotalAmount - oldCurrentTotalAmount);
            $scope.totalPaymentMethods.coupons[paymentMethodId] = leftToPay === 0 ? undefined : leftToPay;
            message = 'הסכום שהוכנס גדול מהסכום שנותר לשלם';
        }
        // calc current total couponsAmount
        currentCouponsAmount += $scope.getNum($scope.totalPaymentMethods.coupons[paymentMethodId]);

        $scope.totalCoupons = currentCouponsAmount;
        $scope.couponsMessage = message;

        // total of all payments methods
        $scope.currentTotalAmount = $scope.totalCreditCards + $scope.totalCoupons + $scope.totalCellarixCash;
    };

    $scope.payByCellarixCash = function(paymentMethodId) {

        var currentCellarixCashAmount = 0;
        var maxCellarixCash = $scope.paymentMethods.cellarixCash.balance;
        // the current total amount without this amount
        var oldCurrentTotalAmount = $scope.getNum($scope.sumTotalAmountAllPayments()) - $scope.getNum($scope.totalPaymentMethods.cellarixCash[paymentMethodId]);
        var message = '';

        if (!$scope.totalPaymentMethods.cellarixCash.hasOwnProperty(paymentMethodId)) {
            return;
        }
        // case NAN
        if (!$scope.totalPaymentMethods.cellarixCash[paymentMethodId]) {
            $scope.totalPaymentMethods.cellarixCash[paymentMethodId] = undefined;
        }
        // case enter minus number
        if ($scope.totalPaymentMethods.cellarixCash[paymentMethodId] < 0) {
            $scope.totalPaymentMethods.cellarixCash[paymentMethodId] = undefined;
            message = 'אינך יכול להכניס סכום מתחת ל 0';
        }
        // check that user does not enter num bigger than his balance
        if ($scope.totalPaymentMethods.cellarixCash[paymentMethodId] > maxCellarixCash) {
            $scope.totalPaymentMethods.cellarixCash[paymentMethodId] = maxCellarixCash;
            message = 'הסכום שהוכנס גדול מהיתרה הקיימת בארנק';
        }
        // check that user does not enter num more than his balance
        if ($scope.totalPaymentMethods.cellarixCash[paymentMethodId] > ($scope.requiredTotalAmount - oldCurrentTotalAmount)) {
            var leftToPay = $scope.getNum($scope.requiredTotalAmount - oldCurrentTotalAmount);
            $scope.totalPaymentMethods.cellarixCash[paymentMethodId] = leftToPay === 0 ? undefined : leftToPay;
            message = 'הסכום שהוכנס גדול מהסכום שנותר לשלם';
        }
        // calc current total cellarixCashAmount
        currentCellarixCashAmount += $scope.getNum($scope.totalPaymentMethods.cellarixCash[paymentMethodId]);

        $scope.totalCellarixCash = currentCellarixCashAmount;
        $scope.cellarixCashMessage = message;

        // total of all payments methods
        $scope.currentTotalAmount = $scope.totalCreditCards + $scope.totalCoupons + $scope.totalCellarixCash;
    };

    // Init Total Payment Methods
    $scope.initsummaryPaymentMethods = () => {
        for (var i in $scope.paymentMethods.creditCards) {
            //$scope.totalPaymentMethods.creditCards[$scope.paymentMethods.creditCards[i].paymentMethodId] = 0;
        }

    };

    // sum total amount per payment method
    $scope.sumTotalAmountPayment = (paymentMethod) => {
        var totalAmount = 0;
        for (var key in $scope.totalPaymentMethods[paymentMethod]) {
            if (!$scope.totalPaymentMethods[paymentMethod].hasOwnProperty(key)) {
                continue;
            }
            totalAmount += $scope.getNum($scope.totalPaymentMethods[paymentMethod][key]);
        }
        return totalAmount;
    };

    // sum total amount for all payment methods
    $scope.sumTotalAmountAllPayments = () => {
        var totalAmount = 0;
        for (var method in $scope.totalPaymentMethods) {
            if (!$scope.totalPaymentMethods.hasOwnProperty(method)) {
                continue;
            }
            totalAmount += $scope.sumTotalAmountPayment(method);
        }
        return totalAmount;
    };

    $scope.substractFromPayment = (paymentMethodType, paymentMethodId) => {
        $scope.totalPaymentMethods[paymentMethodType][paymentMethodId] =
            parseFloat(
                parseFloat(
                    (Math.max(0,
                        ($scope.totalPaymentMethods[paymentMethodType][paymentMethodId] || 0) - $scope.SUBSTRACT_ADD_STEP)).toFixed(2)));
    };

    $scope.addToPayment = (paymentMethodType, paymentMethodId, callback) => {
        $scope.totalPaymentMethods[paymentMethodType][paymentMethodId] =
            parseFloat(
                parseFloat(
                    (($scope.totalPaymentMethods[paymentMethodType][paymentMethodId] || 0) + $scope.SUBSTRACT_ADD_STEP)).toFixed(2));
    };

    $scope.initsummaryPaymentMethods();

    $scope.$watch(() => {
        return $scope.paymentsFormStepOne.$valid;
    }, (newValue) => {
        $scope.validForms.data[1] = newValue;
    });

    $scope.$watch(() => {
            return $scope.requiredTotalAmount === $scope.currentTotalAmount;
        },
        (newValue) => {
            $scope.sumIsFullyPaid.value = newValue;
        });

    $scope.$watch(() =>{
        return $scope.currentTotalAmount;
    }, ()=>{
        $scope.getCouponsBalance();
    });
};
