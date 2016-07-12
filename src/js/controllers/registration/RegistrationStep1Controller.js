'use strict';

module.exports = ($scope, $state, RegistrationService, VerificationService, $stateParams) => {

    //Initialize
    $scope.phoneNumberIsBeingValidated = false;
    $scope.idNumberIsBeingValidated = false;
    $scope.showPhoneNumberValidationIndicator = true;
    $scope.showIdNumberValidationIndicator = true;
    $scope.passedSteps.data[1] = false;
    
    //Functions
    $scope.initRegistration = () => {
        $scope.passedSteps.data[1] = true;
        $state.go('main.registration.step2');
    };

    $scope.togglePromotionalCodeField = () => {
        $scope.isHavePromotionalCode = !$scope.isHavePromotionalCode;
        if (!$scope.isHavePromotionalCode) {
            $scope.commitRegistration.data.promotionalCode = undefined;
        }
    };

    // Used to pass data from guest payment
    $scope.initializeParams = () => {
        var sp = $stateParams;
        if (sp.userData) {
            $scope.commitRegistration.data.cellphoneNumber = $stateParams.userData.cellphoneNumber;
            $scope.commitRegistration.data.email = $stateParams.userData.email;
            $scope.commitRegistration.data.firstName = $stateParams.userData.firstName;
            $scope.commitRegistration.data.lastName = $stateParams.userData.lastName;
        }
        if (sp.creditCardData) {
            $scope.addCreditCard.data = $stateParams.creditCardData;
            $scope.commitRegistration.data.idNumber = $stateParams.creditCardData.creditCardOwnerIdNumber;
        }
    };
    $scope.initializeParams();


    //Watchers

    $scope.$watch(() => {
        return $scope.registrationFormStepOne.$valid;
    }, (newValue) => {
        if (newValue) {
            $scope.errors.visible = true;
        }
        $scope.validForms.data[1] = newValue;
    });
};
