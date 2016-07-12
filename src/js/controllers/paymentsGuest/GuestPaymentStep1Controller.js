'use strict';

module.exports = ($scope, $state, RegistrationService, VerificationService) => {

    //Initialize
    $scope.passedSteps.data[1] = false;
    $scope.guestPaymentRequestInProgress = false;
    $scope.passedSteps.data[1] = false;

    //Functions
    $scope.createAccountGuest = (data) => {
        $scope.guestPaymentRequestInProgress = true;
        RegistrationService.createAccountGuest(data)
            .then((response) => {
                if (response) {
                    $scope.passedSteps.data[1] = true;
                    $scope.goToStep(2);
                }
            })
            .finally(() => {
                $scope.guestPaymentRequestInProgress = false;
            });
    };

    //Watchers
    $scope.$watch(() => {
        return $scope.guestPaymentFormStepOne.$valid;
    }, (newValue) => {
        $scope.validForms.data[1] = newValue;
    });
    $scope.$watch(() => {
        return $scope.guestPayment.createAccountGuestData.cellphoneNumber;
    }, () => {
        $scope.isPhoneNumberChanged = true;
        $scope.showPhoneNumberValidationIndicator = false;
    });
};
