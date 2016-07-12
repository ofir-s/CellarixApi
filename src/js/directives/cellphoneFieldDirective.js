const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/cellphoneFieldDirective.html',
        scope: {
            cellphoneField: '=',
            formName: '=',
            tabIndex: '=',
            isLarge: '=',
            isVerify: '='
        },
        controller: ['$scope', 'VerificationService', ($scope, VerificationService) => {

            $scope.validatePhoneNumber = () => {
                if (!$scope.isVerify || !$scope.cellphoneField || $scope.cellphoneField.lenght < 10 || !$scope.isPhoneNumberChanged) {
                    return;
                }

                $scope.phoneNumberIsBeingValidated = true;
                $scope.isPhoneNumberChanged = false;
                $scope.showPhoneNumberValidationIndicator = true;

                VerificationService.validatePhoneNumber({ phoneNumber: $scope.cellphoneField })
                    .then((response) => {})
                    .finally(() => {
                        $scope.phoneNumberIsBeingValidated = false;
                    });
            };

            if ($scope.isVerify) {
                $scope.$watch(() => {
                    return $scope.cellphoneField;
                }, () => {
                    $scope.isPhoneNumberChanged = true;
                    $scope.showPhoneNumberValidationIndicator = false;
                });
            };
        }]
    };
};