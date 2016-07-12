const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/tzFieldDirective.html',
        scope: {
            idField: '=',
            formName: '=',
            initField: '@',
            tabIndex: '=',
            isVerify: '=',
            isDisabled: '='
        },
        controller: ['$scope', 'VerificationService', ($scope, VerificationService) => {

            $scope.validateIdNumber = () => {
                if (!$scope.isVerify || !$scope.idField || $scope.idField.lenght < 9 || !$scope.isIdNumberChanged) {
                    return;
                }

                $scope.idNumberIsBeingValidated = true;
                $scope.isIdNumberChanged = false;
                $scope.showIdNumberValidationIndicator = true;

                VerificationService.validateIdNumber({ IdNumber: $scope.idField })
                    .then((response) => {})
                    .finally(() => {
                        $scope.idNumberIsBeingValidated = false;
                    });
            };

            if ($scope.isVerify) {
                $scope.$watch(() => {
                    return $scope.idField;
                }, () => {
                    $scope.isIdNumberChanged = true;
                    $scope.showIdNumberValidationIndicator = false;
                });
            }
        }]
    };
};
