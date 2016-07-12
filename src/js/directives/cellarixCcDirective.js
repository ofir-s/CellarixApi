const angular = require('angular');

module.exports = () => {
    return {
        require: '^form',
        restrict: 'E',
        templateUrl: 'views/partials/cellarixCcDirective.html',
        scope: {
            addCreditCardData: '=',
            formName: '=',
            tabIndex: '='
        },
        controller: ['$scope', ($scope) => {
            $scope.getCCclass = () => {
                switch ($scope.formName.creditCardNumber.$ccEagerType) {
                    case 'Visa':
                        return 'cc-visa';
                    case 'American Express':
                        return 'cc-amex';
                    case 'MasterCard':
                        return 'cc-mastercard';
                    default:
                        return 'fa-credit-card';
                }
            };
        }]
    };
};
