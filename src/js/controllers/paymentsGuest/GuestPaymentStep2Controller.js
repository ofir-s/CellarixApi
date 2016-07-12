'use strict';

module.exports = ($scope, $state, VerificationService) => {

    //Initialize
    $scope.passedSteps.data[2] = false;
    $scope.createCreditCardForGuestRequestInProgress = false;

    //Functions
    $scope.createCreditCardForGuest = () => {
        var cellphoneNumber = $scope.guestPayment.createAccountGuestData.cellphoneNumber;
        var addCreditCardData = $scope.guestPayment.addCreditCardData;

        if (!addCreditCardData || !cellphoneNumber || $scope.guestPaymentFormStepTwo.$invalid) {
            var message = 'אנא מלא את כל השדות המסומנים ב*';
            $scope.errors = {
                visible: true,
                message: message
            };
            return;
        }
        $scope.createCreditCardForGuestRequestInProgress = true;
        var data = {
            requestType: 2,
            guestUser: {
                guestCellphoneNumber: cellphoneNumber
            },
            addCreditCard: {
                CreditCardNumber: addCreditCardData.creditCardNumber,
                CreditCardExpirationMonth: addCreditCardData.creditCardExpirationMonth,
                CreditCardExpirationYear: addCreditCardData.creditCardExpirationYear,
                CVV: addCreditCardData.cvv,
                CreditCardOwnerIdNumber: addCreditCardData.creditCardOwnerIdNumber,
                CreditCardName: $scope.guestPayment.createAccountGuestData.creditCardName
            }
        };

        VerificationService.validateCreditCard(data)
            .then((response) => {
                if (response) {
                    $scope.newPaymentMethod.data = response;
                    $scope.passedSteps.data[2] = true;
                    $scope.goToStep(3);
                }
            })
            .finally(() => {
                $scope.createCreditCardForGuestRequestInProgress = false;
            });

    };
};
