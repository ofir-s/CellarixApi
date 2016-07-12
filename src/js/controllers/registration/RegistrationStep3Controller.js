'use strict';

module.exports = ($scope, $state, $timeout, $uibModal, VERIFICATION_CODE_RESEND_TIMEOUT_SECONDS, VerificationService, RegistrationService) => {

    //Functions
    $scope.initialize = () => {
        $scope.getVerificationCode(1);
    };

    $scope.resendVerificationCode = () => {
        if ($scope.didNotReceivedTheCode) {
            $scope.getVerificationCode(2);
        }
    };

    $scope.getVerificationCode = (requestType) => {
        var data = {
            requestType: requestType,
            cellPhoneNumber: $scope.commitRegistration.data.cellphoneNumber
        };
        $scope.didNotReceivedTheCode = false;
        VerificationService.getVerificationCode(data)
            .then((response) => {
                $scope.verificationCodeResendTimeoutPromise = $timeout(() => {
                    $scope.didNotReceivedTheCode = true;
                }, VERIFICATION_CODE_RESEND_TIMEOUT_SECONDS);
            });
    };

    $scope.displayTerms = () => {
        var instance = $uibModal.open({
            templateUrl: 'views\\terms.html'
        });
    };

    $scope.commitRegistrationCall = () => {
        $scope.commitRegistrationRequestInProgress.value = true;
        if ($scope.verificationCodeResendTimeoutPromise) {
            $timeout.cancel($scope.verificationCodeResendTimeoutPromise);
        }
        RegistrationService.commitRegistration($scope.commitRegistration.data)
            .then((response) => {
                if (response) {
                    $scope.passedSteps.data[3] = true;
                    $state.go('main.registration.step4');
                } else {
                    $state.go('main.registration.stepFinal');
                }
            })
            .finally(() => {
                $scope.commitRegistrationRequestInProgress.value = false;
            });
    };

    //Initialize
    $scope.initialize();

    //Watchers
    $scope.$watch(() => {
        return $scope.registrationFormStepThree.$valid;
    }, (newValue) => {
        $scope.validForms.data[3] = newValue;
    });
};
