'use strict';

module.exports = ($scope, $state, VerificationService) => {
    $scope.validateCreditCardRequestInProgress = false;
    //Functions
    $scope.goToFinalStep = () => {
        var data = {
            requestType: 1,
            addCreditCard: {
                creditCardNumber: $scope.addCreditCard.data.creditCardNumber,
                creditCardExpirationYear: $scope.addCreditCard.data.creditCardExpirationYear,
                creditCardExpirationMonth: $scope.addCreditCard.data.creditCardExpirationMonth,
                cvv: $scope.addCreditCard.data.cvv,
                creditCardName: $scope.addCreditCard.data.creditCardName,
                creditCardOwnerIdNumber: $scope.addCreditCard.data.creditCardOwnerIdNumber
            }
        };
        $scope.validateCreditCardRequestInProgress = true;
        VerificationService.validateCreditCard(data)
            .then((response) => {
                if (response) {
                    $state.go('main.payments.step1');
                    $scope.passedSteps[4] = true;
                }
            })
            .finally(() => {
                $scope.validateCreditCardRequestInProgress = false;
            });
    };

    //Watchers
    $scope.$watch(() => {
        return $scope.registrationFormStepFour.$valid;
    }, (newValue) => {
        $scope.validForms.data[4] = newValue;
    });
};
